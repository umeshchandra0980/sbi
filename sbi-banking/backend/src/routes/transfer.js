const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

router.use(authenticate);

const generateRef = () => 'SBI' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2,6).toUpperCase();

// POST /api/transfer/initiate — validate + send OTP
router.post('/initiate', async (req, res) => {
  try {
    const { from_account_id, to_account_number, to_ifsc, to_name, amount, transaction_type, remarks } = req.body;

    if (!from_account_id || !to_account_number || !amount)
      return res.status(400).json({ success: false, message: 'Missing required fields' });

    const accRes = await db.query(
      'SELECT * FROM accounts WHERE id=$1 AND user_id=$2 AND is_active=true',
      [from_account_id, req.user.id]
    );
    if (!accRes.rows.length)
      return res.status(404).json({ success: false, message: 'Source account not found' });

    const account = accRes.rows[0];
    if (parseFloat(account.available_balance) < parseFloat(amount))
      return res.status(400).json({ success: false, message: 'Insufficient balance' });

    // Store pending transfer in OTPs table meta (use otp purpose=transfer)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const transactionId = uuidv4();

    await db.query("UPDATE otps SET is_used=true WHERE user_id=$1 AND purpose='transfer' AND is_used=false", [req.user.id]);
    await db.query(
      `INSERT INTO otps (id,user_id,phone,otp_code,purpose,expires_at) VALUES ($1,$2,$3,$4,'transfer',NOW()+INTERVAL '5 minutes')`,
      [transactionId, req.user.id, req.user.phone, otp]
    );

    console.log(`[OTP] Transfer OTP: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent to your registered mobile',
      data: { transactionId, otpDemo: otp }
    });
  } catch (err) {
    console.error('Transfer initiate error:', err);
    res.status(500).json({ success: false, message: 'Failed to initiate transfer' });
  }
});

// POST /api/transfer/confirm — verify OTP + process transfer
router.post('/confirm', async (req, res) => {
  const client = await db.pool.connect();
  try {
    const { transactionId, otp, from_account_id, to_account_number, to_ifsc, to_name, amount, transaction_type, remarks } = req.body;

    const otpRes = await db.query(
      `SELECT * FROM otps WHERE id=$1 AND user_id=$2 AND purpose='transfer' AND is_used=false AND expires_at>NOW()`,
      [transactionId, req.user.id]
    );
    if (!otpRes.rows.length || otpRes.rows[0].otp_code !== otp)
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    await client.query('BEGIN');

    const accRes = await client.query('SELECT * FROM accounts WHERE id=$1 AND user_id=$2 FOR UPDATE', [from_account_id, req.user.id]);
    if (!accRes.rows.length) throw new Error('Account not found');
    const fromAcc = accRes.rows[0];

    if (parseFloat(fromAcc.available_balance) < parseFloat(amount)) throw new Error('Insufficient balance');

    const newBalance = parseFloat(fromAcc.balance) - parseFloat(amount);
    await client.query('UPDATE accounts SET balance=$1,available_balance=$1 WHERE id=$2', [newBalance, from_account_id]);

    // Check if destination is internal
    const toAccRes = await client.query('SELECT * FROM accounts WHERE account_number=$1 FOR UPDATE', [to_account_number]);
    let toAccountId = null;
    if (toAccRes.rows.length) {
      const toAcc = toAccRes.rows[0];
      const newToBal = parseFloat(toAcc.balance) + parseFloat(amount);
      await client.query('UPDATE accounts SET balance=$1,available_balance=$1 WHERE id=$2', [newToBal, toAcc.id]);
      toAccountId = toAcc.id;
      // Credit transaction
      const refCredit = generateRef() + 'C';
      await client.query(
        `INSERT INTO transactions (from_account_id,to_account_id,transaction_type,amount,balance_after,description,reference_number,status,narration,channel)
         VALUES ($1,$2,'credit',$3,$4,$5,$6,'completed',$7,'internet_banking')`,
        [from_account_id, toAcc.id, amount, newToBal, `Credit from ${req.user.full_name}`, refCredit, `NEFT/SBI/${req.user.username}`]
      );
    }

    // Debit transaction
    const ref = generateRef();
    await client.query(
      `INSERT INTO transactions (from_account_id,to_account_id,transaction_type,amount,balance_after,description,reference_number,status,narration,channel)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'completed',$8,'internet_banking')`,
      [from_account_id, toAccountId, transaction_type || 'transfer', amount, newBalance,
       `Transfer to ${to_name} (${to_account_number})${remarks ? ' - ' + remarks : ''}`, ref, `${transaction_type?.toUpperCase() || 'NEFT'}/${to_ifsc}/${to_account_number}`]
    );

    await client.query('UPDATE otps SET is_used=true WHERE id=$1', [transactionId]);
    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Transfer successful',
      data: { referenceNumber: ref, newBalance, amount }
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Transfer confirm error:', err);
    res.status(500).json({ success: false, message: err.message || 'Transfer failed' });
  } finally {
    client.release();
  }
});

module.exports = router;
