const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { generateOTP, generateAccountNumber, hashToken } = require('../utils/helpers');
const { sendOTPEmail } = require('../utils/email');

// Step 1: Validate username/password, send OTP
const login = async (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip || req.connection.remoteAddress;

  try {
    const userResult = await query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    const user = userResult.rows[0];

    if (user.is_locked) {
      return res.status(403).json({ success: false, message: 'Your account is locked. Please contact SBI support.' });
    }

    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'Account is inactive.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      const attempts = user.failed_login_attempts + 1;
      const locked = attempts >= 3;
      await query(
        'UPDATE users SET failed_login_attempts = $1, is_locked = $2 WHERE id = $3',
        [attempts, locked, user.id]
      );
      if (locked) {
        return res.status(403).json({ success: false, message: 'Too many failed attempts. Account locked.' });
      }
      return res.status(401).json({ success: false, message: `Invalid credentials. ${3 - attempts} attempts remaining.` });
    }

    // Reset failed attempts
    await query('UPDATE users SET failed_login_attempts = 0 WHERE id = $1', [user.id]);

    // Generate and send OTP
    const otp = generateOTP();
    await query('UPDATE otps SET is_used = true WHERE user_id = $1 AND otp_type = $2 AND is_used = false', [user.id, 'login']);
    await query(
      'INSERT INTO otps (user_id, otp_code, otp_type, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL \'10 minutes\')',
      [user.id, otp, 'login']
    );

    await sendOTPEmail(user.email, otp, 'login');

    // Audit log
    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address) VALUES ($1, $2, $3)',
      [user.id, 'login_attempt', ip]
    );

    res.json({
      success: true,
      message: 'OTP sent to your registered email/mobile',
      userId: user.id,
      maskedEmail: user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      maskedMobile: user.mobile.replace(/(\d{2})(\d+)(\d{2})/, '$1****$3'),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Step 2: Verify OTP and issue JWT
const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];

  try {
    const otpResult = await query(
      'SELECT * FROM otps WHERE user_id = $1 AND otp_type = $2 AND is_used = false AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
      [userId, 'login']
    );

    if (otpResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'OTP expired or not found. Please login again.' });
    }

    const otpRecord = otpResult.rows[0];

    if (otpRecord.attempts >= 3) {
      await query('UPDATE otps SET is_used = true WHERE id = $1', [otpRecord.id]);
      return res.status(400).json({ success: false, message: 'Too many OTP attempts. Please login again.' });
    }

    if (otpRecord.otp_code !== otp) {
      await query('UPDATE otps SET attempts = attempts + 1 WHERE id = $1', [otpRecord.id]);
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Mark OTP used
    await query('UPDATE otps SET is_used = true WHERE id = $1', [otpRecord.id]);

    // Get user
    const userResult = await query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    // Generate JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await query(
      'INSERT INTO sessions (user_id, token_hash, ip_address, user_agent, expires_at) VALUES ($1, $2, $3, $4, $5)',
      [user.id, tokenHash, ip, userAgent, expiresAt]
    );

    await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    await query(
      'INSERT INTO audit_logs (user_id, action, ip_address) VALUES ($1, $2, $3)',
      [user.id, 'login_success', ip]
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
        mobile: user.mobile,
        lastLogin: user.last_login,
      },
    });
  } catch (error) {
    console.error('OTP verify error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Register new user
const register = async (req, res) => {
  const { username, password, fullName, email, mobile, dateOfBirth, address, panNumber } = req.body;

  try {
    // Check duplicates
    const existingUser = await query(
      'SELECT id FROM users WHERE username = $1 OR email = $2 OR mobile = $3',
      [username, email, mobile]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'Username, email or mobile already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userResult = await query(
      `INSERT INTO users (username, password_hash, full_name, email, mobile, date_of_birth, address, pan_number)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, username, full_name, email`,
      [username, passwordHash, fullName, email, mobile, dateOfBirth || null, address || null, panNumber || null]
    );

    const user = userResult.rows[0];

    // Create default savings account
    const accountNumber = generateAccountNumber();
    await query(
      `INSERT INTO accounts (user_id, account_number, account_type, balance)
       VALUES ($1, $2, $3, $4)`,
      [user.id, accountNumber, 'savings', 10000.00]
    );

    // Welcome notification
    await query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
      [user.id, 'Welcome to SBI Online Banking!', `Dear ${fullName}, your account has been created successfully. Account No: ${accountNumber}`, 'success']
    );

    // Send OTP for registration verification
    const otp = generateOTP();
    await query(
      'INSERT INTO otps (user_id, otp_code, otp_type, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL \'10 minutes\')',
      [user.id, otp, 'registration']
    );
    await sendOTPEmail(email, otp, 'registration');

    res.status(201).json({
      success: true,
      message: 'Registration successful! OTP sent to your email.',
      userId: user.id,
      accountNumber,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
};

const logout = async (req, res) => {
  try {
    await query('UPDATE sessions SET is_active = false WHERE token_hash = $1', [req.tokenHash]);
    await query('INSERT INTO audit_logs (user_id, action) VALUES ($1, $2)', [req.user.id, 'logout']);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Logout error' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userResult = await query(
      'SELECT id, username, full_name, email, mobile, date_of_birth, address, pan_number, last_login, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    res.json({ success: true, user: userResult.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching profile' });
  }
};

module.exports = { login, verifyOTP, register, logout, getProfile };
