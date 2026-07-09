import React, { useEffect, useState } from 'react';
import { DashboardHeader, SiteFooter } from '../components/Header';
import api from '../utils/api';

const fmt = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ search: '', type: '', status: '', from: '', to: '' });

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
      const r = await api.get(`/admin/transactions?${params}`);
      setTransactions(r.data.data || []);
      setTotal(r.data.total || 0);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [page]);

  const typeColor = { credit: '#1e8449', interest: '#1e8449', debit: '#c0392b', transfer: '#2471a3', neft: '#8e44ad', imps: '#e67e22', rtgs: '#1a5276', charges: '#c0392b' };

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)', padding: '15px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 15, color: '#1a5276', marginBottom: 12, fontWeight: 'bold' }}>All Transactions</h2>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="card-body" style={{ padding: 10, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 'bold', display: 'block', marginBottom: 2 }}>Search</label>
                <input className="form-control" placeholder="Reference / description..." value={filters.search} style={{ width: 200 }}
                  onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 'bold', display: 'block', marginBottom: 2 }}>Type</label>
                <select className="form-control" style={{ width: 120 }} value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
                  <option value="">All</option>
                  {['credit','debit','transfer','neft','rtgs','imps','interest','charges'].map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 'bold', display: 'block', marginBottom: 2 }}>Status</label>
                <select className="form-control" style={{ width: 110 }} value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
                  <option value="">All</option>
                  {['completed','pending','failed','reversed'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 'bold', display: 'block', marginBottom: 2 }}>From</label>
                <input className="form-control" type="date" value={filters.from} style={{ width: 130 }} onChange={e => setFilters(f => ({ ...f, from: e.target.value }))} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 'bold', display: 'block', marginBottom: 2 }}>To</label>
                <input className="form-control" type="date" value={filters.to} style={{ width: 130 }} onChange={e => setFilters(f => ({ ...f, to: e.target.value }))} />
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => { setPage(1); load(); }}>Search</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setFilters({ search: '', type: '', status: '', from: '', to: '' }); setPage(1); load(); }}>Reset</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Transactions ({total})</span>
              <span style={{ fontSize: 11, opacity: 0.8 }}>Page {page} of {Math.ceil(total / 20) || 1}</span>
            </div>
            {loading ? <div style={{ textAlign: 'center', padding: 30 }}><div className="spinner" /></div> : (
              <>
                <table className="table">
                  <thead>
                    <tr><th>Date</th><th>Reference</th><th>Description</th><th>Type</th><th style={{ textAlign: 'right' }}>Amount</th><th>Status</th><th>Channel</th></tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr><td colSpan={7} style={{ textAlign: 'center', padding: 30, color: '#888' }}>No transactions found</td></tr>
                    ) : transactions.map(txn => (
                      <tr key={txn.id}>
                        <td style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{fmtDate(txn.created_at)}</td>
                        <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{txn.reference_number}</td>
                        <td style={{ maxWidth: 200 }}>{txn.description || txn.narration}</td>
                        <td><span className="badge" style={{ background: (typeColor[txn.transaction_type] || '#555') + '22', color: typeColor[txn.transaction_type] || '#555' }}>{txn.transaction_type?.toUpperCase()}</span></td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: ['credit','interest'].includes(txn.transaction_type) ? '#1e8449' : '#c0392b' }}>
                          {['credit','interest'].includes(txn.transaction_type) ? '+' : '-'}{fmt(txn.amount)}
                        </td>
                        <td><span className={`badge badge-${txn.status === 'completed' ? 'success' : txn.status === 'failed' ? 'danger' : 'warning'}`}>{txn.status}</span></td>
                        <td style={{ fontSize: 11 }}>{txn.channel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {total > 20 && (
                  <div style={{ padding: '10px 15px', display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
                    <span style={{ padding: '4px 12px', fontSize: 12 }}>Page {page} of {Math.ceil(total / 20)}</span>
                    <button className="btn btn-secondary btn-sm" disabled={page >= Math.ceil(total / 20)} onClick={() => setPage(p => p + 1)}>Next ›</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
