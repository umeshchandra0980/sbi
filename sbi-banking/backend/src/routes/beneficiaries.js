const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

// GET /api/beneficiaries
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM beneficiaries WHERE user_id=$1 AND is_active=true ORDER BY name',
      [req.user.id]
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch beneficiaries' });
  }
});

// POST /api/beneficiaries
router.post('/', async (req, res) => {
  try {
    const { name, account_number, ifsc_code, bank_name, nickname } = req.body;
    if (!name || !account_number || !ifsc_code)
      return res.status(400).json({ success: false, message: 'Name, account number and IFSC are required' });

    const existing = await db.query(
      'SELECT id FROM beneficiaries WHERE user_id=$1 AND account_number=$2',
      [req.user.id, account_number]
    );
    if (existing.rows.length)
      return res.status(409).json({ success: false, message: 'Beneficiary already exists' });

    const result = await db.query(
      `INSERT INTO beneficiaries (user_id,name,account_number,ifsc_code,bank_name,nickname,is_verified)
       VALUES ($1,$2,$3,$4,$5,$6,true) RETURNING *`,
      [req.user.id, name, account_number, ifsc_code, bank_name || null, nickname || null]
    );
    res.status(201).json({ success: true, data: result.rows[0], message: 'Beneficiary added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add beneficiary' });
  }
});

// DELETE /api/beneficiaries/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.query(
      'UPDATE beneficiaries SET is_active=false WHERE id=$1 AND user_id=$2',
      [req.params.id, req.user.id]
    );
    res.json({ success: true, message: 'Beneficiary removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to remove beneficiary' });
  }
});

module.exports = router;
