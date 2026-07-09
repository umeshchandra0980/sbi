const express = require('express');
const userRouter = express.Router();
const notifRouter = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');
const bcrypt = require('bcrypt');

// ─── USERS ────────────────────────────────────────────────────────────────────
userRouter.get('/profile', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, username, full_name, email, mobile, date_of_birth, address, city, state, pincode, 
              pan_number, last_login, created_at FROM users WHERE id=$1`,
      [req.user.id]
    );
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

userRouter.put('/profile', authenticate, async (req, res) => {
  const { full_name, email, address, city, state, pincode } = req.body;
  try {
    const result = await db.query(
      `UPDATE users SET full_name=$1, email=$2, address=$3, city=$4, state=$5, pincode=$6, updated_at=NOW()
       WHERE id=$7 RETURNING id, full_name, email, address, city, state, pincode`,
      [full_name, email, address, city, state, pincode, req.user.id]
    );
    res.json({ user: result.rows[0], message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

userRouter.post('/change-password', authenticate, async (req, res) => {
  const { current_password, new_password } = req.body;
  if (!current_password || !new_password) return res.status(400).json({ error: 'Both passwords required' });
  if (new_password.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters' });
  try {
    const userRes = await db.query('SELECT password_hash FROM users WHERE id=$1', [req.user.id]);
    const valid = await bcrypt.compare(current_password, userRes.rows[0].password_hash);
    if (!valid) return res.status(400).json({ error: 'Current password is incorrect' });

    const newHash = await bcrypt.hash(new_password, 12);
    await db.query('UPDATE users SET password_hash=$1, password_changed_at=NOW() WHERE id=$2', [newHash, req.user.id]);
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
notifRouter.get('/', authenticate, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 50',
      [req.user.id]
    );
    res.json({ notifications: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

notifRouter.put('/:id/read', authenticate, async (req, res) => {
  try {
    await db.query('UPDATE notifications SET is_read=true WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

notifRouter.put('/read/all', authenticate, async (req, res) => {
  try {
    await db.query('UPDATE notifications SET is_read=true WHERE user_id=$1', [req.user.id]);
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark all read' });
  }
});

module.exports = { userRouter, notifRouter };
