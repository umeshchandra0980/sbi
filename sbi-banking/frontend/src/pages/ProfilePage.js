import React, { useEffect, useState } from 'react';
import { DashboardHeader, SiteFooter } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';

export default function ProfilePage() {
  const { user } = useAuth();
  const toast = useToast();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    api.get('/auth/profile').then(r => { setProfile(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handlePwChange = async e => {
    e.preventDefault();
    if (pwForm.new_password !== pwForm.confirm_password) return toast.error('Passwords do not match');
    if (pwForm.new_password.length < 8) return toast.error('Password must be at least 8 characters');
    setPwLoading(true);
    try {
      await api.put('/auth/change-password', pwForm);
      toast.success('Password changed successfully');
      setPwForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    }
    setPwLoading(false);
  };

  if (loading) return <div className="page-wrapper"><DashboardHeader /><div style={{ textAlign: 'center', padding: 60 }}><div className="spinner" /></div></div>;

  return (
    <div className="page-wrapper">
      <DashboardHeader />
      <div style={{ background: '#f0f5fb', minHeight: 'calc(100vh - 90px)', padding: '15px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 15, color: '#1a5276', marginBottom: 15, fontWeight: 'bold' }}>My Profile</h2>
          <div style={{ display: 'flex', gap: 15, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div className="card" style={{ marginBottom: 15 }}>
                <div className="card-header">Personal Information</div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 30px', fontSize: 13 }}>
                    {[
                      ['Full Name', profile?.full_name],
                      ['Username', profile?.username],
                      ['Email', profile?.email],
                      ['Mobile', profile?.phone?.replace(/(\d{2})\d{6}(\d{2})/, '$1XXXXXX$2')],
                      ['Date of Birth', profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString('en-IN') : '—'],
                      ['Role', profile?.role?.toUpperCase()],
                      ['Member Since', profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-IN') : '—'],
                      ['Last Login', profile?.last_login ? new Date(profile.last_login).toLocaleString('en-IN') : 'First Login'],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: 11, color: '#888', fontWeight: 'bold', marginBottom: 2 }}>{k}</div>
                        <div style={{ color: '#333' }}>{v || '—'}</div>
                      </div>
                    ))}
                  </div>
                  {profile?.address && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #eee' }}>
                      <div style={{ fontSize: 11, color: '#888', fontWeight: 'bold', marginBottom: 4 }}>Address</div>
                      <div style={{ fontSize: 13 }}>{profile.address}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ width: 320, flexShrink: 0 }}>
              <div className="card">
                <div className="card-header">Change Password</div>
                <div className="card-body">
                  <form onSubmit={handlePwChange}>
                    {[['current_password','Current Password'],['new_password','New Password'],['confirm_password','Confirm New Password']].map(([k,l]) => (
                      <div className="form-group" key={k}>
                        <label>{l}*</label>
                        <input className="form-control" type="password" value={pwForm[k]} onChange={e => setPwForm(f => ({ ...f, [k]: e.target.value }))} required />
                      </div>
                    ))}
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 12 }}>Password must be min 8 chars with uppercase, lowercase, digit and special char.</div>
                    <button type="submit" className="btn btn-primary" disabled={pwLoading}>{pwLoading ? 'Updating...' : 'Update Password'}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
