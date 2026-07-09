import React, { useEffect, useState } from 'react';
import { DashboardHeader, SiteFooter } from '../components/Header';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';

export default function BeneficiariesPage() {
  const toast = useToast();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', account_number: '', ifsc_code: '', bank_name: '', nickname: '' });

  const load = () => {
    api.get('/beneficiaries').then(r => { setList(r.data.data || []); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    try {
      await api.post('/beneficiaries', form);
      toast.success('Beneficiary added successfully');
      setShowModal(false);
      setForm({ name: '', account_number: '', ifsc_code: '', bank_name: '', nickname: '' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add beneficiary');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this beneficiary?')) return;
    try {
      await api.delete(`/beneficiaries/${id}`);
      toast.success('Beneficiary removed');
      load();
    } catch { toast.error('Failed to remove'); }
  };

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)', padding: '15px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <h2 style={{ fontSize: 15, color: '#1a5276', fontWeight: 'bold' }}>Manage Beneficiaries</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Beneficiary</button>
          </div>
          <div className="card">
            <div className="card-header">Registered Beneficiaries ({list.length})</div>
            {loading ? <div style={{ textAlign: 'center', padding: 30 }}><div className="spinner" /></div> : (
              <table className="table">
                <thead><tr><th>Name</th><th>Nickname</th><th>Account No.</th><th>IFSC</th><th>Bank</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {list.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign: 'center', padding: 30, color: '#888' }}>No beneficiaries added yet</td></tr>
                  ) : list.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 'bold' }}>{b.name}</td>
                      <td>{b.nickname || '—'}</td>
                      <td style={{ fontFamily: 'monospace' }}>XXXX{b.account_number?.slice(-4)}</td>
                      <td>{b.ifsc_code}</td>
                      <td>{b.bank_name || '—'}</td>
                      <td><span className={`badge ${b.is_verified ? 'badge-success' : 'badge-warning'}`}>{b.is_verified ? 'Verified' : 'Pending'}</span></td>
                      <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.id)}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>Add New Beneficiary</span>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
            </div>
            <form onSubmit={handleAdd}>
              <div className="modal-body">
                {[['name','Full Name'],['account_number','Account Number'],['ifsc_code','IFSC Code'],['bank_name','Bank Name'],['nickname','Nickname (optional)']].map(([k,l]) => (
                  <div className="form-group" key={k}>
                    <label>{l}{k !== 'nickname' ? '*' : ''}</label>
                    <input className="form-control" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} required={k !== 'nickname'} />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Beneficiary</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
  );
}
