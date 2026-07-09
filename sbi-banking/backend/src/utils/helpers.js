const crypto = require('crypto');

const generateAccountNumber = () => {
  const prefix = '3000';
  const random = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
  return prefix + random;
};

const generateTransactionRef = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `SBI${timestamp}${random}`.slice(0, 30);
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
const maskAccountNumber = (acc) => acc ? 'XXXX XXXX ' + acc.slice(-4) : '';

module.exports = { generateAccountNumber, generateTransactionRef, generateOTP, hashToken, maskAccountNumber };
