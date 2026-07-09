import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TopBar, MainNav, SiteFooter } from '../components/Header';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpDemo, setOtpDemo] = useState('');
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({
    full_name: '', username: '', email: '', phone: '',
    password: '', confirm_password: '', date_of_birth: '', address: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = 'Full name is required';
    if (!form.username.trim() || form.username.length < 6) e.username = 'Username must be at least 6 characters';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!/^\d{10}$/.test(form.phone)) e.phone = '10-digit mobile number required';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password))
      e.password = 'Password must have uppercase, lowercase, number and special char';
    if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      if (data.success) {
        setUserId(data.data.userId);
        setOtpDemo(data.data.otpDemo);
        setStep(2);
        toast.success('Registration successful! Please verify your mobile number.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async e => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error('Enter 6-digit OTP');
    // For demo just navigate to login
    toast.success('Mobile verified! You can now login.');
    navigate('/login');
  };

  const Field = ({ name, label, type = 'text', placeholder = '' }) => (
    <div className="form-group">
      <label>{label}*</label>
      <input className="form-control" type={type} value={form[name]} placeholder={placeholder}
        onChange={e => setForm(f => ({ ...f, [name]: e.target.value }))} />
      {errors[name] && <div className="form-error">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="page-wrapper">
      <TopBar />
      <MainNav />
      <div style={{ maxWidth: 700, margin: '20px auto', padding: '0 15px' }}>
        {step === 1 ? (
          <div className="card">
            <div className="card-header">New User Registration - OnlineSBI</div>
            <div className="card-body">
              <div className="alert alert-info" style={{ marginBottom: 14 }}>
                Please fill in your details to register for Internet Banking. Your account will be created after mobile OTP verification.
              </div>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
                  <Field name="full_name" label="Full Name (as per bank records)" />
                  <Field name="username" label="Choose Username (min 6 chars)" />
                  <Field name="email" label="Email Address" type="email" />
                  <Field name="phone" label="Registered Mobile Number" placeholder="10-digit number" />
                  <Field name="password" label="Password" type="password" />
                  <Field name="confirm_password" label="Confirm Password" type="password" />
                  <Field name="date_of_birth" label="Date of Birth" type="date" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea className="form-control" value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    rows={2} style={{ resize: 'none' }} />
                </div>
                <div style={{ background: '#fef9e7', border: '1px solid #f9e79f', padding: 10, borderRadius: 3, fontSize: 11, marginBottom: 14 }}>
                  <strong>Password Policy:</strong> Minimum 8 characters with at least one uppercase, one lowercase, one digit and one special character (@$!%*?&).
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <><span className="spinner" style={{ width: 14, height: 14 }} /> Registering...</> : 'Submit & Send OTP'}
                  </button>
                  <Link to="/login" style={{ fontSize: 12, color: '#1a5276' }}>Already have an account? Login</Link>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-header">Verify Mobile Number</div>
            <div className="card-body" style={{ maxWidth: 360 }}>
              <div className="alert alert-success">OTP sent to your registered mobile number.</div>
              {otpDemo && (
                <div className="alert alert-warning" style={{ fontSize: 11 }}>
                  <strong>Demo Mode OTP:</strong> <span style={{ fontSize: 18, fontWeight: 'bold' }}>{otpDemo}</span>
                </div>
              )}
              <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                  <label>Enter 6-digit OTP*</label>
                  <input className="form-control" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6} style={{ letterSpacing: 8, fontSize: 20, fontWeight: 'bold', width: 200 }} />
                </div>
                <button type="submit" className="btn btn-primary">Verify & Activate</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
