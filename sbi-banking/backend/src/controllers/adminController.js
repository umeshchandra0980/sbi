const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { generateAccountNumber } = require('../utils/helpers');

const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await query('SELECT * FROM admins WHERE username = $1 AND is_active = true', [username]);
    if (result.rows.length === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const admin = result.rows[0];
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    await query('UPDATE admins SET last_login = NOW() WHERE id = $1', [admin.id]);

    const token = jwt.sign({ adminId: admin.id, type: 'admin', role: admin.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({
      success: true,
      token,
      admin: { id: admin.id, username: admin.username, fullName: admin.full_name, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getDashboard = async (req, res) => {
  try {
    const [users, accounts, txToday, txTotal, totalBalance] = await Promise.all([
      query('SELECT COUNT(*) FROM users'),
      query('SELECT COUNT(*) FROM accounts WHERE is_active = true'),
      query('SELECT COUNT(*), SUM(amount) FROM transactions WHERE created_at >= CURRENT_DATE'),
      query('SELECT COUNT(*), SUM(amount) FROM transactions'),
      query('SELECT SUM(balance) FROM accounts WHERE is_active = true'),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers: parseInt(users.rows[0].count),
        totalAccounts: parseInt(accounts.rows[0].count),
        todayTransactions: parseInt(txToday.rows[0].count),
        todayVolume: parseFloat(txToday.rows[0].sum || 0),
        totalTransactions: parseInt(txTotal.rows[0].count),
        totalVolume: parseFloat(txTotal.rows[0].sum || 0),
        totalBalance: parseFloat(totalBalance.rows[0].sum || 0),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching dashboard' });
  }
};

const getUsers = async (req, res) => {
  const { page = 1, limit = 20, search, status } = req.query;
  const offset = (page - 1) * limit;
  try {
    let where = 'WHERE 1=1';
    const params = [];
    let idx = 1;

    if (search) {
      where += ` AND (username ILIKE $${idx} OR full_name ILIKE $${idx} OR email ILIKE $${idx} OR mobile ILIKE $${idx})`;
      params.push(`%${search}%`);
      idx++;
    }
    if (status === 'active') { where += ` AND is_active = true AND is_locked = false`; }
    else if (status === 'locked') { where += ` AND is_locked = true`; }
    else if (status === 'inactive') { where += ` AND is_active = false`; }

    const countResult = await query(`SELECT COUNT(*) FROM users ${where}`, params);
    const usersResult = await query(
      `SELECT u.id, u.username, u.full_name, u.email, u.mobile, u.is_active, u.is_locked, u.last_login, u.created_at,
        COUNT(a.id) as account_count, SUM(a.balance) as total_balance
       FROM users u
       LEFT JOIN accounts a ON a.user_id = u.id
       ${where}
       GROUP BY u.id ORDER BY u.created_at DESC LIMIT $${idx++} OFFSET $${idx++}`,
      [...params, parseInt(limit), offset]
    );

    res.json({
      success: true,
      users: usersResult.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      pages: Math.ceil(countResult.rows[0].count / limit),
    });
  } catch (error) {
    console.error('Admin getUsers error:', error);
    res.status(500).json({ success: false, message: 'Error fetching users' });
  }
};

const getUserDetail = async (req, res) => {
  const { userId } = req.params;
  try {
    const userResult = await query(
      'SELECT id, username, full_name, email, mobile, date_of_birth, address, pan_number, is_active, is_locked, last_login, created_at FROM users WHERE id = $1',
      [userId]
    );
    if (userResult.rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });

    const accountsResult = await query('SELECT * FROM accounts WHERE user_id = $1', [userId]);

    res.json({ success: true, user: userResult.rows[0], accounts: accountsResult.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
};

const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { action } = req.body; // 'lock', 'unlock', 'activate', 'deactivate'

  try {
    let updateQuery = '';
    if (action === 'lock') updateQuery = 'UPDATE users SET is_locked = true WHERE id = $1';
    else if (action === 'unlock') updateQuery = 'UPDATE users SET is_locked = false, failed_login_attempts = 0 WHERE id = $1';
    else if (action === 'activate') updateQuery = 'UPDATE users SET is_active = true WHERE id = $1';
    else if (action === 'deactivate') updateQuery = 'UPDATE users SET is_active = false WHERE id = $1';
    else return res.status(400).json({ success: false, message: 'Invalid action' });

    await query(updateQuery, [userId]);
    await query(
      'INSERT INTO audit_logs (user_id, action) VALUES ($1, $2)',
      [req.admin.id, `admin_${action}_user_${userId}`]
    );

    res.json({ success: true, message: `User ${action}ed successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating user status' });
  }
};

const createUserAccount = async (req, res) => {
  const { userId, accountType } = req.body;
  try {
    const accountNumber = generateAccountNumber();
    const result = await query(
      'INSERT INTO accounts (user_id, account_number, account_type) VALUES ($1, $2, $3) RETURNING *',
      [userId, accountNumber, accountType]
    );
    res.json({ success: true, account: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating account' });
  }
};

const getTransactions = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const countResult = await query('SELECT COUNT(*) FROM transactions');
    const txResult = await query(
      `SELECT t.*, fa.account_number as from_acc, ta.account_number as to_acc,
        u.full_name as from_user
       FROM transactions t
       LEFT JOIN accounts fa ON t.from_account_id = fa.id
       LEFT JOIN accounts ta ON t.to_account_id = ta.id
       LEFT JOIN users u ON fa.user_id = u.id
       ORDER BY t.created_at DESC LIMIT $1 OFFSET $2`,
      [parseInt(limit), offset]
    );
    res.json({
      success: true,
      transactions: txResult.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      pages: Math.ceil(countResult.rows[0].count / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching transactions' });
  }
};

const creditAccount = async (req, res) => {
  const { accountId, amount, description } = req.body;
  const { generateTransactionRef } = require('../utils/helpers');

  try {
    const accResult = await query('SELECT * FROM accounts WHERE id = $1', [accountId]);
    if (accResult.rows.length === 0) return res.status(404).json({ success: false, message: 'Account not found' });

    const account = accResult.rows[0];
    const newBalance = parseFloat(account.balance) + parseFloat(amount);
    await query('UPDATE accounts SET balance = $1 WHERE id = $2', [newBalance, accountId]);

    const txRef = generateTransactionRef();
    await query(
      'INSERT INTO transactions (transaction_ref, to_account_id, transaction_type, amount, balance_after, description) VALUES ($1, $2, $3, $4, $5, $6)',
      [txRef, accountId, 'credit', parseFloat(amount), newBalance, description || 'Admin credit']
    );

    res.json({ success: true, message: 'Account credited', newBalance, txRef });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error crediting account' });
  }
};

module.exports = { adminLogin, getDashboard, getUsers, getUserDetail, updateUserStatus, createUserAccount, getTransactions, creditAccount };
