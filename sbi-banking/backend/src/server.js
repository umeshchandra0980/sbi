require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/accounts',     require('./routes/accounts'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/beneficiaries',require('./routes/beneficiaries'));
app.use('/api/transfer',     require('./routes/transfer'));
app.use('/api/admin',        require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', service: 'SBI Banking API v1.0', time: new Date().toISOString() }));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🏦  SBI Banking API  →  http://localhost:${PORT}`);
  console.log(`    Health check   →  http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
