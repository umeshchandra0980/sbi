import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const SBILogo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{
      background: '#fff', border: '2px solid #1a5276', borderRadius: '50%',
      width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <span style={{ color: '#1a5276', fontWeight: 'bold', fontSize: 16 }}>◉</span>
    </div>
    <div>
      <div style={{ color: '#1a5276', fontWeight: 'bold', fontSize: 18, lineHeight: 1 }}>SBI</div>
      <div style={{ color: '#555', fontSize: 9, letterSpacing: 1 }}>ONLINE</div>
    </div>
  </div>
);

export const TopBar = () => (
  <div style={{
    background: '#fff', borderBottom: '1px solid #ddd', padding: '5px 15px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  }}>
    <div style={{ fontSize: 11, color: '#555' }}>
      <a href="#skip" style={{ marginRight: 12, color: '#1a5276' }}>Skip to main content</a>
      <a href="#" style={{ marginRight: 12, color: '#1a5276' }}>About OnlineSBI</a>
      <a href="#" style={{ marginRight: 12, color: '#1a5276' }}>Forms</a>
      <a href="#" style={{ color: '#1a5276' }}>Net Banking Branches</a>
    </div>
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <a href="#" style={{ background: '#2471a3', color: '#fff', padding: '4px 10px', borderRadius: 3, fontSize: 11 }}>
        🏠 SBI Home Loan
      </a>
      <button style={{ background: '#777', color: '#fff', padding: '4px 10px', borderRadius: 3, fontSize: 11, border: 'none', cursor: 'pointer' }}>
        Language ▾
      </button>
    </div>
  </div>
);

export const MainNav = () => (
  <div style={{ background: '#1a5276', display: 'flex', padding: '0 10px' }}>
    {['Home', 'Products & Services', 'How Do I (Help)', 'Manage Debit Card E-Mandate', 'Contact Us'].map(item => (
      <a key={item} href="#" style={{
        color: '#fff', fontSize: 12, padding: '8px 14px', display: 'inline-block'
      }}
      onMouseOver={e => e.target.style.background = '#154360'}
      onMouseOut={e => e.target.style.background = 'transparent'}
      >{item}</a>
    ))}
  </div>
);

export const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    await logout();
    toast.success('You have been logged out securely');
    navigate('/');
  };

  return (
    <div style={{ background: '#fff', borderBottom: '2px solid #1a5276', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 15px' }}>
        <Link to="/dashboard"><SBILogo /></Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <span style={{ fontSize: 12, color: '#555' }}>
            Welcome, <strong style={{ color: '#1a5276' }}>{user?.full_name}</strong>
          </span>
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <Link to="/admin" style={{
              background: '#6c3483', color: '#fff', padding: '4px 10px',
              borderRadius: 3, fontSize: 11
            }}>Admin Panel</Link>
          )}
          <button onClick={handleLogout} style={{
            background: '#c0392b', color: '#fff', border: 'none',
            padding: '5px 14px', borderRadius: 3, fontSize: 12, cursor: 'pointer'
          }}>Logout</button>
        </div>
      </div>
      <div style={{ background: '#1a5276', display: 'flex', padding: '0 10px', flexWrap: 'wrap' }}>
        {[
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'My Accounts', path: '/accounts' },
          { label: 'Transactions', path: '/transactions' },
          { label: 'Fund Transfer', path: '/transfer' },
          { label: 'Beneficiaries', path: '/beneficiaries' },
          { label: 'Profile', path: '/profile' },
        ].map(item => (
          <Link key={item.path} to={item.path} style={{
            color: '#fff', fontSize: 12, padding: '8px 14px', display: 'inline-block',
            textDecoration: 'none',
            background: window.location.pathname === item.path ? '#154360' : 'transparent'
          }}
          onMouseOver={e => e.currentTarget.style.background = '#154360'}
          onMouseOut={e => e.currentTarget.style.background = window.location.pathname === item.path ? '#154360' : 'transparent'}
          >{item.label}</Link>
        ))}
      </div>
    </div>
  );
};

export const SiteFooter = ({ apm = '552' }) => (
  <div style={{
    background: '#f5f5f5', borderTop: '1px solid #ddd', padding: '7px 15px',
    display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#777'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ border: '1px solid #aaa', padding: '2px 8px', fontSize: 11, fontStyle: 'italic', color: '#555', borderRadius: 2 }}>✓eriSign</div>
      © State Bank of India (APM Id: Serv_Tran_{apm})
    </div>
    <div>Site best viewed at 1024 x 768 resolution in Microsoft Edge 79+, Mozilla 96+, Google Chrome 97+</div>
  </div>
);

export default SBILogo;
