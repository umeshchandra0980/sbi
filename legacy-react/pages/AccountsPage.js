import React, { useEffect, useState } from 'react';
import { DashboardHeader, SiteFooter } from '../components/Header';
import api from '../utils/api';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/accounts').then(r => { setAccounts(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)', padding: '15px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 15, color: '#1a5276', marginBottom: 15, fontWeight: 'bold' }}>My Accounts</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" /></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 15 }}>
              {accounts.map(acc => (
                <div key={acc.id} className="card">
                  <div style={{
                    background: acc.account_type === 'savings' ? 'linear-gradient(135deg, #1a5276, #2471a3)' :
                      acc.account_type === 'current' ? 'linear-gradient(135deg, #1e8449, #27ae60)' :
                        'linear-gradient(135deg, #6c3483, #8e44ad)',
                    color: '#fff', padding: '16px 18px', borderRadius: '4px 4px 0 0'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1 }}>{acc.account_type?.toUpperCase()} ACCOUNT</div>
                        <div style={{ fontSize: 20, fontWeight: 'bold', marginTop: 4 }}>{formatCurrency(acc.balance)}</div>
                        <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>Available Balance</div>
                      </div>
                      <span style={{ background: acc.is_active ? 'rgba(255,255,255,0.2)' : 'rgba(255,0,0,0.3)', padding: '3px 8px', borderRadius: 10, fontSize: 10 }}>
                        {acc.is_active ? '● Active' : '● Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="card-body" style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 0', fontSize: 11 }}>
                      {[
                        ['Account Number', acc.account_number ? 'XXXX XXXX ' + acc.account_number.slice(-4) : '—'],
                        ['IFSC Code', acc.ifsc_code],
                        ['Branch', acc.branch_name],
                        ['Currency', acc.currency || 'INR'],
                        ['Interest Rate', acc.interest_rate + '%'],
                        ['Daily Limit', formatCurrency(acc.daily_transfer_limit)],
                      ].map(([label, value]) => (
                        <React.Fragment key={label}>
                          <div style={{ color: '#888', fontWeight: 'bold' }}>{label}</div>
                          <div style={{ color: '#333' }}>{value}</div>
                        </React.Fragment>
                      ))}
                    </div>
                    {acc.nominee_name && (
                      <div style={{ marginTop: 10, padding: '6px 10px', background: '#f9f9f9', borderRadius: 3, fontSize: 11 }}>
                        <span style={{ color: '#888' }}>Nominee: </span><span style={{ color: '#333' }}>{acc.nominee_name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
