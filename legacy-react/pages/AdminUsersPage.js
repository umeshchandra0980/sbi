import React, { useEffect, useState } from 'react';
import { DashboardHeader, SiteFooter } from '../components/Header';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';

export default function AdminUsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      if (search) params.append('search', search);
      const r = await api.get(`/admin/users?${params}`);
      setUsers(r.data.data || []);
      setTotal(r.data.total || 0);
    } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, [page]);

  const toggle = async (id, field, current) => {
    try {
      await api.patch(`/admin/users/${id}`, { [field]: !current });
      toast.success('User updated');
      load();
    } catch { toast.error('Update failed'); }
  };

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)', padding: '15px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 15, color: '#1a5276', marginBottom: 12, fontWeight: 'bold' }}>Manage Users</h2>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="card-body" style={{ padding: 10, display: 'flex', gap: 10 }}>
              <input className="form-control" placeholder="Search by name, username, email, phone..." value={search}
                onChange={e => setSearch(e.target.value)} style={{ maxWidth: 360 }} />
              <button className="btn btn-primary btn-sm" onClick={() => { setPage(1); load(); }}>Search</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setSearch(''); setPage(1); load(); }}>Reset</button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Users ({total})</div>
            {loading ? <div style={{ textAlign: 'center', padding: 30 }}><div className="spinner" /></div> : (
              <>
                <table className="table">
                  <thead><tr><th>#</th><th>Name</th><th>Username</th><th>Email</th><th>Phone</th><th>Role</th><th>Active</th><th>Locked</th><th>Actions</th></tr></thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr><td colSpan={9} style={{ textAlign: 'center', padding: 30, color: '#888' }}>No users found</td></tr>
                    ) : users.map((u, i) => (
                      <tr key={u.id}>
                        <td>{(page - 1) * 15 + i + 1}</td>
                        <td style={{ fontWeight: 'bold' }}>{u.full_name}</td>
                        <td style={{ fontFamily: 'monospace' }}>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td><span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>{u.role}</span></td>
                        <td>
                          <button className={`btn btn-sm ${u.is_active ? 'btn-success' : 'btn-secondary'}`}
                            onClick={() => toggle(u.id, 'is_active', u.is_active)}>
                            {u.is_active ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td>
                          <button className={`btn btn-sm ${u.is_locked ? 'btn-danger' : 'btn-secondary'}`}
                            onClick={() => toggle(u.id, 'is_locked', u.is_locked)}>
                            {u.is_locked ? '🔒 Locked' : '🔓 Open'}
                          </button>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm"
                            onClick={() => toast.info(`Last login: ${u.last_login ? new Date(u.last_login).toLocaleString('en-IN') : 'Never'}`)}>
                            Info
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {total > 15 && (
                  <div style={{ padding: '10px 15px', display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
                    <span style={{ padding: '4px 12px', fontSize: 12 }}>Page {page} of {Math.ceil(total / 15)}</span>
                    <button className="btn btn-secondary btn-sm" disabled={page >= Math.ceil(total / 15)} onClick={() => setPage(p => p + 1)}>Next ›</button>
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
