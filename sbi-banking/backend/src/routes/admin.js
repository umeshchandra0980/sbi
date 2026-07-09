const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.use(authenticate, requireAdmin);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [users, accounts, transactions, balance, today, locked] = await Promise.all([
      db.query('SELECT COUNT(*) FROM users WHERE role=\'customer\''),
      db.query('SELECT COUNT(*) FROM accounts WHERE is_active=true'),
      db.query('SELECT COUNT(*) FROM transactions'),
      db.query('SELECT SUM(balance) FROM accounts WHERE is_active=true'),
      db.query('SELECT COUNT(*) FROM transactions WHERE created_at::date=CURRENT_DATE'),
      db.query('SELECT COUNT(*) FROM users WHERE is_locked=true'),
    ]);
    res.json({
      success: true,
      data: {
        totalUsers: parseInt(users.rows[0].count),
        activeAccounts: parseInt(accounts.rows[0].count),
        totalTransactions: parseInt(transactions.rows[0].count),
        totalBalance: parseFloat(balance.rows[0].sum || 0),
        todayTransactions: parseInt(today.rows[0].count),
        lockedUsers: parseInt(locked.rows[0].count),
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const { page = 1, limit = 15, search = '' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = "WHERE role != 'admin'";
    const params = [];
    if (search) {
      where += ` AND (full_name ILIKE $1 OR username ILIKE $1 OR email ILIKE $1 OR phone ILIKE $1)`;
      params.push(`%${search}%`);
    }
    const countRes = await db.query(`SELECT COUNT(*) FROM users ${where}`, params);
    const dataRes = await db.query(
      `SELECT id,username,full_name,email,phone,role,is_active,is_locked,last_login,created_at FROM users ${where} ORDER BY created_at DESC LIMIT $${params.length+1} OFFSET $${params.length+2}`,
      [...params, parseInt(limit), offset]
    );
    res.json({ success: true, data: dataRes.rows, total: parseInt(countRes.rows[0].count) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// PATCH /api/admin/users/:id
router.patch('/users/:id', async (req, res) => {
  try {
    const { is_active, is_locked } = req.body;
    const updates = [];
    const params = [];
    let idx = 1;
    if (is_active !== undefined) { updates.push(`is_active=$${idx++}`); params.push(is_active); }
    if (is_locked !== undefined) { updates.push(`is_locked=$${idx++}`); params.push(is_locked); if (!is_locked) { updates.push(`failed_login_attempts=0`); } }
    if (!updates.length) return res.status(400).json({ success: false, message: 'No fields to update' });
    params.push(req.params.id);
    await db.query(`UPDATE users SET ${updates.join(',')} WHERE id=$${idx}`, params);
    res.json({ success: true, message: 'User updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
});

// GET /api/admin/transactions
router.get('/transactions', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, type, status, from, to } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let where = 'WHERE 1=1';
    const params = [];
    let idx = 1;
    if (search) { where += ` AND (t.reference_number ILIKE $${idx} OR t.description ILIKE $${idx})`; params.push(`%${search}%`); idx++; }
    if (type)   { where += ` AND t.transaction_type=$${idx++}`; params.push(type); }
    if (status) { where += ` AND t.status=$${idx++}`; params.push(status); }
    if (from)   { where += ` AND t.created_at >= $${idx++}`; params.push(from); }
    if (to)     { where += ` AND t.created_at <= $${idx++}`; params.push(to + ' 23:59:59'); }
    const countRes = await db.query(`SELECT COUNT(*) FROM transactions t ${where}`, params);
    const dataRes = await db.query(
      `SELECT t.* FROM transactions t ${where} ORDER BY t.created_at DESC LIMIT $${idx++} OFFSET $${idx}`,
      [...params, parseInt(limit), offset]
    );
    res.json({ success: true, data: dataRes.rows, total: parseInt(countRes.rows[0].count) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
});

module.exports = router;
