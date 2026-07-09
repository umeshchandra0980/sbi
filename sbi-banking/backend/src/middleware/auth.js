const jwt = require('jsonwebtoken');
const db = require('../config/db');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ success: false, message: 'Access token required' });

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sbi_secret_key');

    const result = await db.query(
      'SELECT id,username,full_name,email,phone,role,is_active,is_locked FROM users WHERE id=$1',
      [decoded.userId]
    );
    if (!result.rows.length)
      return res.status(401).json({ success: false, message: 'User not found' });

    const user = result.rows[0];
    if (!user.is_active) return res.status(401).json({ success: false, message: 'Account deactivated' });
    if (user.is_locked)  return res.status(401).json({ success: false, message: 'Account is locked' });

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return res.status(401).json({ success: false, message: 'Token expired' });
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'manager')
    return res.status(403).json({ success: false, message: 'Admin access required' });
  next();
};

module.exports = { authenticate, requireAdmin };
