import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardHeader, SiteFooter } from '../components/Header';
import api from '../utils/api';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats').then(r => { setStats(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: '👥', color: '#2471a3' },
    { label: 'Active Accounts', value: stats.activeAccounts, icon: '🏦', color: '#27ae60' },
    { label: 'Total Transactions', value: stats.totalTransactions, icon: '💳', color: '#8e44ad' },
    { label: 'Total Balance', value: fmt(stats.totalBalance || 0), icon: '💰', color: '#e67e22' },
    { label: 'Today Transactions', value: stats.todayTransactions, icon: '📊', color: '#c0392b' },
    { label: 'Locked Accounts', value: stats.lockedUsers, icon: '🔒', color: '#7f8c8d' },
  ] : [];

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)', padding: '15px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 15, color: '#1a5276', marginBottom: 15, fontWeight: 'bold' }}>Admin Dashboard</h2>
          {loading ? <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner" /></div> : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15, marginBottom: 20 }}>
                {cards.map(c => (
                  <div key={c.label} className="card" style={{ borderTop: `3px solid ${c.color}` }}>
                    <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                      <div style={{ fontSize: 30 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 'bold', color: c.color }}>{c.value}</div>
                        <div style={{ fontSize: 11, color: '#888' }}>{c.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 15 }}>
                {[
                  { title: 'Manage Users', desc: 'View, activate, deactivate and manage customer accounts', path: '/admin/users', icon: '👥', color: '#2471a3' },
                  { title: 'All Transactions', desc: 'Monitor and review all banking transactions', path: '/admin/transactions', icon: '💳', color: '#27ae60' },
                ].map(item => (
                  <Link key={item.path} to={item.path} style={{ flex: 1, textDecoration: 'none' }}>
                    <div className="card" style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
                      onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
                      <div className="card-body" style={{ textAlign: 'center', padding: 30 }}>
                        <div style={{ fontSize: 40, marginBottom: 10 }}>{item.icon}</div>
                        <div style={{ fontSize: 15, fontWeight: 'bold', color: item.color, marginBottom: 6 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: '#888' }}>{item.desc}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
