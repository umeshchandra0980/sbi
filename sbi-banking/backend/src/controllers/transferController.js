const { query, getClient } = require('../config/database');
const { generateOTP, generateTransactionRef } = require('../utils/helpers');
const { sendOTPEmail } = require('../utils/email');

const initiateTransfer = async (req, res) => {
  const { fromAccountId, toAccountNumber, amount, ifscCode, beneficiaryName, remarks, transferType = 'neft' } = req.body;

  try {
    // Validate source account
    const fromResult = await query(
      'SELECT * FROM accounts WHERE id = $1 AND user_id = $2 AND is_active = true',
      [fromAccountId, req.user.id]
    );
    if (fromResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid source account' });
    }

    const fromAccount = fromResult.rows[0];

    if (parseFloat(amount) <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    if (parseFloat(fromAccount.balance) < parseFloat(amount) + parseFloat(fromAccount.minimum_balance)) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Find destination account
    const toResult = await query(
      'SELECT * FROM accounts WHERE account_number = $1 AND is_active = true',
      [toAccountNumber]
    );
    if (toResult.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Destination account not found' });
    }

    if (toResult.rows[0].id === fromAccountId) {
      return res.status(400).json({ success: false, message: 'Cannot transfer to same account' });
    }

    // Send OTP for transfer confirmation
    const otp = generateOTP();
    await query('UPDATE otps SET is_used = true WHERE user_id = $1 AND otp_type = $2 AND is_used = false', [req.user.id, 'transfer']);
    await query(
      'INSERT INTO otps (user_id, otp_code, otp_type, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL \'10 minutes\')',
      [req.user.id, otp, 'transfer']
    );

    const userResult = await query('SELECT email FROM users WHERE id = $1', [req.user.id]);
    await sendOTPEmail(userResult.rows[0].email, otp, 'transfer');

    res.json({
      success: true,
      message: 'OTP sent for transfer confirmation',
      transferPreview: {
        fromAccount: { id: fromAccount.id, number: fromAccount.account_number, balance: fromAccount.balance },
        toAccountNumber,
        beneficiaryName,
        amount,
        transferType,
        remarks,
      },
    });
  } catch (error) {
    console.error('Transfer initiate error:', error);
    res.status(500).json({ success: false, message: 'Error initiating transfer' });
  }
};

const confirmTransfer = async (req, res) => {
  const { fromAccountId, toAccountNumber, amount, remarks, transferType = 'neft', otp } = req.body;
  const ip = req.ip;

  // Verify OTP
  const otpResult = await query(
    'SELECT * FROM otps WHERE user_id = $1 AND otp_type = $2 AND is_used = false AND expires_at > NOW() ORDER BY created_at DESC LIMIT 1',
    [req.user.id, 'transfer']
  );

  if (otpResult.rows.length === 0 || otpResult.rows[0].otp_code !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  await query('UPDATE otps SET is_used = true WHERE id = $1', [otpResult.rows[0].id]);

  const client = await getClient();
  try {
    await client.query('BEGIN');

    // Lock and fetch source account
    const fromResult = await client.query(
      'SELECT * FROM accounts WHERE id = $1 AND user_id = $2 FOR UPDATE',
      [fromAccountId, req.user.id]
    );
    if (fromResult.rows.length === 0) throw new Error('Source account not found');
    const fromAccount = fromResult.rows[0];

    const toResult = await client.query(
      'SELECT * FROM accounts WHERE account_number = $1 FOR UPDATE',
      [toAccountNumber]
    );
    if (toResult.rows.length === 0) throw new Error('Destination account not found');
    const toAccount = toResult.rows[0];

    const amountNum = parseFloat(amount);
    if (parseFloat(fromAccount.balance) < amountNum + parseFloat(fromAccount.minimum_balance)) {
      throw new Error('Insufficient balance');
    }

    const newFromBalance = parseFloat(fromAccount.balance) - amountNum;
    const newToBalance = parseFloat(toAccount.balance) + amountNum;

    await client.query('UPDATE accounts SET balance = $1 WHERE id = $2', [newFromBalance, fromAccount.id]);
    await client.query('UPDATE accounts SET balance = $1 WHERE id = $2', [newToBalance, toAccount.id]);

    const txRef = generateTransactionRef();
    await client.query(
      `INSERT INTO transactions (transaction_ref, from_account_id, to_account_id, transaction_type, amount, balance_after, description, remarks, ip_address)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [txRef, fromAccount.id, toAccount.id, transferType, amountNum, newFromBalance, `Transfer to ${toAccountNumber}`, remarks || '', ip]
    );

    await client.query('COMMIT');

    // Notification
    await query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
      [req.user.id, 'Transfer Successful', `₹${amountNum.toLocaleString('en-IN')} transferred to ${toAccountNumber}. Ref: ${txRef}`, 'transaction']
    );

    res.json({
      success: true,
      message: 'Transfer successful',
      transaction: { ref: txRef, amount: amountNum, fromBalance: newFromBalance },
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Transfer error:', error);
    res.status(400).json({ success: false, message: error.message || 'Transfer failed' });
  } finally {
    client.release();
  }
};

const getBeneficiaries = async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM beneficiaries WHERE user_id = $1 AND is_active = true ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ success: true, beneficiaries: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching beneficiaries' });
  }
};

const addBeneficiary = async (req, res) => {
  const { beneficiaryName, accountNumber, ifscCode, bankName, branchName } = req.body;
  try {
    const result = await query(
      `INSERT INTO beneficiaries (user_id, beneficiary_name, account_number, ifsc_code, bank_name, branch_name)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id, account_number) DO UPDATE SET beneficiary_name = $2, is_active = true
       RETURNING *`,
      [req.user.id, beneficiaryName, accountNumber, ifscCode, bankName || 'SBI', branchName || '']
    );
    res.json({ success: true, beneficiary: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding beneficiary' });
  }
};

module.exports = { initiateTransfer, confirmTransfer, getBeneficiaries, addBeneficiary };
