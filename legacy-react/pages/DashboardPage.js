import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader, SiteFooter } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

export default function DashboardPage() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [accRes, txnRes] = await Promise.all([
          api.get('/accounts'),
          api.get('/transactions?limit=5')
        ]);
        setAccounts(accRes.data.data || []);
        setTransactions(txnRes.data.data || []);
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const totalBalance = accounts.reduce((sum, a) => sum + parseFloat(a.balance || 0), 0);

  if (loading) return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}><div className="spinner" /></div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <DashboardHeader />

      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)' }}>
        <div className="container" style={{ paddingTop: 15, paddingBottom: 20 }}>

          {/* Welcome Bar */}
          <div style={{ background: '#1a5276', color: '#fff', padding: '12px 20px', borderRadius: 4, marginBottom: 15, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 'bold' }}>Welcome, {user?.full_name}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Last Login: {user?.last_login ? new Date(user.last_login).toLocaleString('en-IN') : 'First Login'}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Total Portfolio Balance</div>
              <div style={{ fontSize: 22, fontWeight: 'bold' }}>{formatCurrency(totalBalance)}</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 15 }}>
            {[
              { icon: '💸', label: 'Fund Transfer', path: '/transfer', color: '#2471a3' },
              { icon: '📋', label: 'Statement', path: '/transactions', color: '#27ae60' },
              { icon: '👥', label: 'Beneficiaries', path: '/beneficiaries', color: '#8e44ad' },
              { icon: '👤', label: 'My Profile', path: '/profile', color: '#e67e22' },
              { icon: '💳', label: 'My Accounts', path: '/accounts', color: '#c0392b' },
            ].map(item => (
              <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', border: '1px solid #ddd', borderRadius: 6,
                  padding: '14px 10px', textAlign: 'center', cursor: 'pointer',
                  transition: 'box-shadow 0.2s', borderTop: `3px solid ${item.color}`
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                  <div style={{ fontSize: 22, marginBottom: 5 }}>{item.icon}</div>
                  <div style={{ fontSize: 11, color: '#555', fontWeight: 'bold' }}>{item.label}</div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 15 }}>
            {/* Accounts */}
            <div style={{ flex: 1 }}>
              <div className="card" style={{ marginBottom: 15 }}>
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>My Accounts</span>
                  <Link to="/accounts" style={{ color: '#aed6f1', fontSize: 11 }}>View All ›</Link>
                </div>
                <div>
                  {accounts.length === 0 ? (
                    <div style={{ padding: 20, textAlign: 'center', color: '#888', fontSize: 12 }}>No accounts found</div>
                  ) : accounts.map((acc, i) => (
                    <div key={acc.id} style={{
                      padding: '12px 16px', borderBottom: i < accounts.length - 1 ? '1px solid #eee' : 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 'bold', color: '#1a5276' }}>
                          {acc.account_type?.toUpperCase()} ACCOUNT
                        </div>
                        <div style={{ fontSize: 11, color: '#888', fontFamily: 'monospace', marginTop: 2 }}>
                          XXXX XXXX {acc.account_number?.slice(-4)}
                        </div>
                        <div style={{ fontSize: 10, color: '#888' }}>{acc.branch_name} | {acc.ifsc_code}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1e8449' }}>
                          {formatCurrency(acc.balance)}
                        </div>
                        <div style={{ fontSize: 10, color: '#888' }}>Available: {formatCurrency(acc.available_balance)}</div>
                        <span className={`badge ${acc.is_active ? 'badge-success' : 'badge-danger'}`}>
                          {acc.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div style={{ width: 380, flexShrink: 0 }}>
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Recent Transactions</span>
                  <Link to="/transactions" style={{ color: '#aed6f1', fontSize: 11 }}>View All ›</Link>
                </div>
                <div>
                  {transactions.length === 0 ? (
                    <div style={{ padding: 20, textAlign: 'center', color: '#888', fontSize: 12 }}>No transactions yet</div>
                  ) : transactions.map((txn, i) => (
                    <div key={txn.id} style={{
                      padding: '10px 14px', borderBottom: i < transactions.length - 1 ? '1px solid #eee' : 'none',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 'bold' }}>{txn.description || txn.narration}</div>
                        <div style={{ fontSize: 10, color: '#888' }}>{formatDate(txn.created_at)} | {txn.reference_number}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{
                          fontSize: 13, fontWeight: 'bold',
                          color: txn.transaction_type === 'credit' || txn.transaction_type === 'interest' ? '#1e8449' : '#c0392b'
                        }}>
                          {txn.transaction_type === 'credit' || txn.transaction_type === 'interest' ? '+' : '-'}
                          {formatCurrency(txn.amount)}
                        </div>
                        <span className={`badge ${txn.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                          {txn.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="alert alert-warning" style={{ marginTop: 15, fontSize: 11 }}>
            <strong>Security Reminder:</strong> SBI will never ask for your Internet Banking credentials, OTP, or card details over phone/email/SMS. Do not share this information with anyone.
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
