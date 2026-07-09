const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// GET /api/accounts
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM accounts WHERE user_id=$1 ORDER BY created_at',
      [req.user.id]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching accounts' });
  }
});

// GET /api/accounts/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM accounts WHERE id=$1 AND user_id=$2',
      [req.params.id, req.user.id]
    );
    if (!result.rows.length)
      return res.status(404).json({ success: false, message: 'Account not found' });
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching account' });
  }
});

module.exports = router;
