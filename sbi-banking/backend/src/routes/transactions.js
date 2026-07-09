const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// GET /api/transactions  (all txns for this user)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 15, accountId, from, to, type } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Get all account IDs for this user
    const accRes = await db.query('SELECT id FROM accounts WHERE user_id=$1', [req.user.id]);
    if (!accRes.rows.length) return res.json({ success: true, data: [], total: 0 });
    const accIds = accRes.rows.map(r => r.id);

    let where = '(t.from_account_id = ANY($1) OR t.to_account_id = ANY($1))';
    const params = [accIds];
    let idx = 2;

    if (accountId) { where += ` AND (t.from_account_id=$${idx} OR t.to_account_id=$${idx})`; params.push(accountId); idx++; }
    if (from)      { where += ` AND t.created_at >= $${idx++}`; params.push(from); }
    if (to)        { where += ` AND t.created_at <= $${idx++}`; params.push(to + ' 23:59:59'); }
    if (type)      { where += ` AND t.transaction_type = $${idx++}`; params.push(type); }

    const countRes = await db.query(`SELECT COUNT(*) FROM transactions t WHERE ${where}`, params);
    const total = parseInt(countRes.rows[0].count);

    const dataRes = await db.query(
      `SELECT t.* FROM transactions t WHERE ${where} ORDER BY t.created_at DESC LIMIT $${idx++} OFFSET $${idx}`,
      [...params, parseInt(limit), offset]
    );

    res.json({ success: true, data: dataRes.rows, total, page: parseInt(page) });
  } catch (err) {
    console.error('Transactions error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
  }
});

module.exports = router;
