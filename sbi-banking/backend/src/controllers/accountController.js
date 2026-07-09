const { query } = require('../config/database');
const { maskAccountNumber } = require('../utils/helpers');

const getAccounts = async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM accounts WHERE user_id = $1 AND is_active = true ORDER BY created_at',
      [req.user.id]
    );
    res.json({ success: true, accounts: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching accounts' });
  }
};

const getAccountDetails = async (req, res) => {
  try {
    const { accountId } = req.params;
    const result = await query(
      'SELECT * FROM accounts WHERE id = $1 AND user_id = $2',
      [accountId, req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.json({ success: true, account: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching account' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { page = 1, limit = 20, from, to, type } = req.query;
    const offset = (page - 1) * limit;

    // Verify account belongs to user
    const accResult = await query(
      'SELECT id FROM accounts WHERE id = $1 AND user_id = $2',
      [accountId, req.user.id]
    );
    if (accResult.rows.length === 0) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    let whereClause = '(t.from_account_id = $1 OR t.to_account_id = $1)';
    const params = [accountId];
    let paramIdx = 2;

    if (from) { whereClause += ` AND t.created_at >= $${paramIdx++}`; params.push(from); }
    if (to) { whereClause += ` AND t.created_at <= $${paramIdx++}`; params.push(to); }
    if (type) { whereClause += ` AND t.transaction_type = $${paramIdx++}`; params.push(type); }

    const countResult = await query(
      `SELECT COUNT(*) FROM transactions t WHERE ${whereClause}`,
      params
    );

    const transResult = await query(
      `SELECT t.*, 
        CASE WHEN t.from_account_id = $1 THEN 'debit' ELSE 'credit' END as direction,
        fa.account_number as from_account_number,
        ta.account_number as to_account_number
       FROM transactions t
       LEFT JOIN accounts fa ON t.from_account_id = fa.id
       LEFT JOIN accounts ta ON t.to_account_id = ta.id
       WHERE ${whereClause}
       ORDER BY t.created_at DESC
       LIMIT $${paramIdx++} OFFSET $${paramIdx++}`,
      [...params, parseInt(limit), offset]
    );

    res.json({
      success: true,
      transactions: transResult.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      pages: Math.ceil(countResult.rows[0].count / limit),
    });
  } catch (error) {
    console.error('Transactions error:', error);
    res.status(500).json({ success: false, message: 'Error fetching transactions' });
  }
};

const getMiniStatement = async (req, res) => {
  try {
    const { accountId } = req.params;
    const accResult = await query(
      'SELECT * FROM accounts WHERE id = $1 AND user_id = $2',
      [accountId, req.user.id]
    );
    if (accResult.rows.length === 0) return res.status(403).json({ success: false, message: 'Access denied' });

    const txResult = await query(
      `SELECT t.*, 
        CASE WHEN t.from_account_id = $1 THEN 'debit' ELSE 'credit' END as direction
       FROM transactions t
       WHERE t.from_account_id = $1 OR t.to_account_id = $1
       ORDER BY t.created_at DESC LIMIT 10`,
      [accountId]
    );

    res.json({
      success: true,
      account: accResult.rows[0],
      transactions: txResult.rows,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching mini statement' });
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    const accountsResult = await query(
      'SELECT * FROM accounts WHERE user_id = $1 AND is_active = true',
      [req.user.id]
    );

    const totalBalance = accountsResult.rows.reduce((sum, acc) => sum + parseFloat(acc.balance), 0);

    // Recent 5 transactions across all accounts
    const accountIds = accountsResult.rows.map(a => a.id);
    let recentTx = [];
    if (accountIds.length > 0) {
      const txResult = await query(
        `SELECT t.*, CASE WHEN t.from_account_id = ANY($1::uuid[]) THEN 'debit' ELSE 'credit' END as direction
         FROM transactions t
         WHERE t.from_account_id = ANY($1::uuid[]) OR t.to_account_id = ANY($1::uuid[])
         ORDER BY t.created_at DESC LIMIT 5`,
        [accountIds]
      );
      recentTx = txResult.rows;
    }

    // Unread notifications
    const notifResult = await query(
      'SELECT * FROM notifications WHERE user_id = $1 AND is_read = false ORDER BY created_at DESC LIMIT 5',
      [req.user.id]
    );

    res.json({
      success: true,
      summary: {
        totalBalance,
        accountCount: accountsResult.rows.length,
        accounts: accountsResult.rows,
        recentTransactions: recentTx,
        notifications: notifResult.rows,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Error fetching dashboard' });
  }
};

module.exports = { getAccounts, getAccountDetails, getTransactions, getMiniStatement, getDashboardSummary };
