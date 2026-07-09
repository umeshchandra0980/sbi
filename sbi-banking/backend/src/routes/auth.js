const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const generateAccountNumber = () => '1000' + Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, password, full_name, email, phone, date_of_birth, address } = req.body;
    if (!username || !password || !full_name || !email || !phone)
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });

    const existing = await db.query(
      'SELECT id FROM users WHERE username=$1 OR email=$2 OR phone=$3',
      [username, email, phone]
    );
    if (existing.rows.length)
      return res.status(409).json({ success: false, message: 'Username, email or phone already registered' });

    const password_hash = await bcrypt.hash(password, 12);
    const userId = uuidv4();

    await db.query(
      `INSERT INTO users (id,username,password_hash,full_name,email,phone,date_of_birth,address,role)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'customer')`,
      [userId, username, password_hash, full_name, email, phone, date_of_birth || null, address || null]
    );

    const accountNumber = generateAccountNumber();
    await db.query(
      `INSERT INTO accounts (user_id,account_number,account_type,balance,available_balance)
       VALUES ($1,$2,'savings',0.00,0.00)`,
      [userId, accountNumber]
    );

    const otp = generateOTP();
    await db.query(
      `INSERT INTO otps (user_id,phone,otp_code,purpose,expires_at) VALUES ($1,$2,$3,'registration',NOW()+INTERVAL '10 minutes')`,
      [userId, phone, otp]
    );
    console.log(`[OTP] Registration OTP for ${phone}: ${otp}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful. OTP sent to your mobile.',
      data: { userId, accountNumber, otpDemo: otp }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// POST /api/auth/login  (Step 1: credentials → send OTP)
router.post('/login', async (req, res) => {
  try {
    const { username, password, captcha } = req.body;
    if (!captcha) return res.status(400).json({ success: false, message: 'CAPTCHA is required' });

    const result = await db.query('SELECT * FROM users WHERE username=$1', [username]);
    if (!result.rows.length)
      return res.status(401).json({ success: false, message: 'Invalid username or password' });

    const user = result.rows[0];
    if (user.is_locked)
      return res.status(401).json({ success: false, message: 'Account is locked. Use OTP to unlock.' });
    if (!user.is_active)
      return res.status(401).json({ success: false, message: 'Account deactivated. Contact branch.' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      const attempts = user.failed_login_attempts + 1;
      const lock = attempts >= 5;
      await db.query('UPDATE users SET failed_login_attempts=$1,is_locked=$2 WHERE id=$3', [attempts, lock, user.id]);
      return res.status(401).json({
        success: false,
        message: lock ? 'Account locked after 5 failed attempts.' : `Invalid password. ${5 - attempts} attempt(s) remaining.`
      });
    }

    // Invalidate old OTPs then create new one
    await db.query("UPDATE otps SET is_used=true WHERE user_id=$1 AND purpose='login' AND is_used=false", [user.id]);
    const otp = generateOTP();
    await db.query(
      `INSERT INTO otps (user_id,phone,otp_code,purpose,expires_at) VALUES ($1,$2,$3,'login',NOW()+INTERVAL '5 minutes')`,
      [user.id, user.phone, otp]
    );
    console.log(`[OTP] Login OTP for ${user.phone}: ${otp}`);

    const maskedPhone = user.phone.replace(/(\d{2})\d{6}(\d{2})/, '$1XXXXXX$2');
    res.json({
      success: true,
      message: `OTP sent to ${maskedPhone}`,
      data: { userId: user.id, maskedPhone, otpDemo: otp }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// POST /api/auth/verify-otp  (Step 2: verify OTP → issue JWT)
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const otpResult = await db.query(
      `SELECT * FROM otps WHERE user_id=$1 AND purpose='login' AND is_used=false AND expires_at>NOW() ORDER BY created_at DESC LIMIT 1`,
      [userId]
    );
    if (!otpResult.rows.length)
      return res.status(400).json({ success: false, message: 'OTP expired or not found. Please login again.' });

    const record = otpResult.rows[0];
    if (record.otp_code !== otp)
      return res.status(400).json({ success: false, message: 'Invalid OTP' });

    await db.query('UPDATE otps SET is_used=true WHERE id=$1', [record.id]);

    const userResult = await db.query('SELECT * FROM users WHERE id=$1', [userId]);
    const user = userResult.rows[0];
    await db.query('UPDATE users SET failed_login_attempts=0,last_login=NOW() WHERE id=$1', [user.id]);

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'sbi_secret_key',
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: { id: user.id, username: user.username, full_name: user.full_name, email: user.email, phone: user.phone, role: user.role, last_login: user.last_login }
      }
    });
  } catch (err) {
    console.error('OTP verify error:', err);
    res.status(500).json({ success: false, message: 'OTP verification failed' });
  }
});

// GET /api/auth/profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id,username,full_name,email,phone,date_of_birth,address,role,last_login,created_at FROM users WHERE id=$1',
      [req.user.id]
    );
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// PUT /api/auth/change-password
router.put('/change-password', authenticate, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const result = await db.query('SELECT password_hash FROM users WHERE id=$1', [req.user.id]);
    const valid = await bcrypt.compare(current_password, result.rows[0].password_hash);
    if (!valid) return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    const hash = await bcrypt.hash(new_password, 12);
    await db.query('UPDATE users SET password_hash=$1,password_changed_at=NOW() WHERE id=$2', [hash, req.user.id]);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Password change failed' });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticate, async (req, res) => {
  try {
    await db.query("INSERT INTO audit_logs (user_id,action,ip_address) VALUES ($1,'LOGOUT',$2)", [req.user.id, req.ip]);
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
});

module.exports = router;
