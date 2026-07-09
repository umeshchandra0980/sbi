import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TopBar, MainNav, SiteFooter } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import api from '../utils/api';

const CAPTCHAS = ['rxwk6', 'm4tP9', 'zK7wq', 'Lp3xR', '8nBvQ', 'Yw5cZ', 'Kp7mN', 'Jw2xQ'];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [step, setStep] = useState(1); // 1=credentials, 2=OTP
  const [form, setForm] = useState({ username: '', password: '', captcha: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [captchaText, setCaptchaText] = useState(CAPTCHAS[0]);
  const [userId, setUserId] = useState('');
  const [maskedPhone, setMaskedPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpDemo, setOtpDemo] = useState('');
  const otpRefs = useRef([]);

  const refreshCaptcha = () => setCaptchaText(CAPTCHAS[Math.floor(Math.random() * CAPTCHAS.length)]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleLogin = async e => {
    e.preventDefault();
    if (!form.username.trim()) return toast.error('Please enter your username');
    if (!form.password.trim()) return toast.error('Please enter your password');
    if (!form.captcha.trim()) return toast.error('Please enter the CAPTCHA');

    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', {
        username: form.username,
        password: form.password,
        captcha: form.captcha
      });
      if (data.success) {
        setUserId(data.data.userId);
        setMaskedPhone(data.data.maskedPhone);
        setOtpDemo(data.data.otpDemo);
        setStep(2);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      refreshCaptcha();
      setForm(f => ({ ...f, captcha: '' }));
    }
    setLoading(false);
  };

  const handleVerifyOtp = async e => {
    e.preventDefault();
    const otpVal = otp.join('');
    if (otpVal.length !== 6) return toast.error('Please enter 6-digit OTP');

    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-otp', { userId, otp: otpVal });
      if (data.success) {
        login(data.data.user, data.data.token);
        toast.success('Login successful. Welcome to OnlineSBI!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <TopBar />
      <MainNav />

      <div style={{ maxWidth: 980, margin: '15px auto', padding: '0 15px', display: 'flex', gap: 15, alignItems: 'flex-start' }}>

        {/* Login Form */}
        <div style={{ width: 340, flexShrink: 0 }}>
          {step === 1 ? (
            <div className="card">
              <div className="card-header">Login to OnlineSBI</div>
              <div className="card-body">
                <p style={{ fontSize: 11, color: '#555', marginBottom: 12 }}>(CARE: Username and password are case sensitive.)</p>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Username*</label>
                    <input className="form-control" name="username" value={form.username} onChange={handleChange} autoFocus />
                    <Link to="/register" className="form-link" style={{ fontSize: 11, display: 'block', marginTop: 3 }}>New User? Register here/Activate</Link>
                  </div>
                  <div className="form-group">
                    <label>Password*</label>
                    <input className="form-control" type="password" name="password" value={form.password} onChange={handleChange} />
                    <a href="#" className="form-link" style={{ fontSize: 11, display: 'block', marginTop: 3 }}>Forgot Username / Login Password</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: 12 }}>
                    <input type="checkbox" id="vkb" />
                    <label htmlFor="vkb">Enable Virtual Keyboard</label>
                  </div>
                  <div className="form-group">
                    <label>Enter the text as shown in the image*</label>
                    <input className="form-control" name="captcha" value={form.captcha} onChange={handleChange} style={{ width: 180 }} />
                  </div>
                  <div style={{ marginBottom: 8, fontSize: 12 }}>Select one of the Captcha options*</div>
                  <div style={{ display: 'flex', gap: 15, marginBottom: 10, fontSize: 12 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}><input type="radio" defaultChecked /> Image Captcha</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}><input type="radio" /> Audio Captcha</label>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{
                      background: '#f0f0f0', border: '1px solid #bbb', padding: '5px 12px',
                      fontFamily: 'Courier New', fontSize: 18, fontWeight: 'bold', letterSpacing: 5,
                      color: '#333', fontStyle: 'italic', textDecoration: 'line-through',
                      filter: 'blur(0.3px)', userSelect: 'none'
                    }}>{captchaText}</div>
                    <button type="button" onClick={refreshCaptcha} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#1a5276' }}>↻</button>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : 'Login'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setForm({ username: '', password: '', captcha: '' })}>Reset</button>
                  </div>
                </form>
                <p style={{ fontSize: 11, color: '#555', marginTop: 10 }}>For better security use the Online Virtual Keyboard to login. <a href="#">More ...</a></p>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-header">OTP Verification</div>
              <div className="card-body">
                <div className="alert alert-info" style={{ marginBottom: 14 }}>
                  OTP sent to {maskedPhone}
                </div>
                {otpDemo && (
                  <div className="alert alert-warning" style={{ marginBottom: 14, fontSize: 11 }}>
                    <strong>Demo Mode:</strong> Your OTP is <strong style={{ fontSize: 16 }}>{otpDemo}</strong>
                  </div>
                )}
                <form onSubmit={handleVerifyOtp}>
                  <div className="form-group">
                    <label>Enter 6-digit OTP*</label>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      {otp.map((digit, i) => (
                        <input key={i}
                          ref={el => otpRefs.current[i] = el}
                          value={digit}
                          onChange={e => handleOtpChange(i, e.target.value)}
                          onKeyDown={e => handleOtpKeyDown(i, e)}
                          maxLength={1}
                          style={{
                            width: 42, height: 42, textAlign: 'center', fontSize: 20, fontWeight: 'bold',
                            border: '2px solid #aaa', borderRadius: 4, background: '#fffde7'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : 'Verify OTP'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => { setStep(1); setOtp(['','','','','','']); }}>Back</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Unauthorized Transaction Banner */}
          <div style={{
            marginTop: 12, background: 'linear-gradient(135deg, #1a5276, #2471a3)',
            color: '#fff', borderRadius: 4, padding: '12px 15px', textAlign: 'center', fontSize: 13, fontWeight: 'bold'
          }}>
            UNAUTHORIZED TRANSACTIONS<br />
            <span style={{ color: '#f0e040', fontSize: 15 }}>"ACT FAST"</span><br />
            <span style={{ color: '#f0e040', textDecoration: 'underline', cursor: 'pointer', fontSize: 12 }}>Click here</span>
            <span style={{ fontSize: 12 }}> to Report</span>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ background: '#2471a3', color: '#fff', borderRadius: '50%', width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 'bold' }}>ℹ</span>
            <span style={{ fontSize: 12, color: '#1a5276', fontWeight: 'bold' }}>Welcome to Personal Internet Banking</span>
          </div>

          {/* YONO Banner */}
          <div style={{ background: 'linear-gradient(135deg, #5b2c8d, #6c3483 40%, #1a5276)', color: '#fff', padding: 18, borderRadius: 4, marginBottom: 10, display: 'flex', gap: 15 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 18, marginBottom: 3 }}>
                <span style={{ fontStyle: 'italic', color: '#d7bde2' }}>yono</span>
                <span style={{ fontWeight: 'bold' }}>◉SBI</span>
              </div>
              <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.8, marginBottom: 8 }}>NET-BANKING</div>
              <div style={{ fontSize: 13, fontWeight: 'bold' }}>Your Internet Banking</div>
              <div style={{ fontSize: 13, fontWeight: 'bold' }}>is now live in a new Avatar</div>
              <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9 }}>for a Smoother &</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>Smarter Banking experience.</div>
            </div>
            <div style={{ fontSize: 11, lineHeight: 1.9, minWidth: 210 }}>
              {['No change in URL/Website link.', 'No change in Internet Banking Username and Password.', 'No Registration or Re-registration required.', 'Bank will never be sending any links for login or registration for YONO Net Banking.'].map((item, i) => (
                <div key={i}>• <strong style={{ color: i < 3 ? '#f0e040' : '#fff' }}>{item.split(' ')[0] + (i === 3 ? ' never' : '')}</strong> {item.split(' ').slice(i === 3 ? 2 : 1).join(' ')}</div>
              ))}
              <br /><div style={{ fontSize: 11, opacity: 0.85 }}>Your Internet banking will soon fully move to the upgraded platform</div>
            </div>
          </div>

          {/* Notice Box */}
          <div style={{ background: '#d5f5e3', border: '1px solid #a9dfbf', borderRadius: 4, padding: 12, fontSize: 11.5, color: '#1e8449', lineHeight: 1.7 }}>
            <p><strong>Dear Customer,</strong></p>
            <p>• OTP based login &amp; Mandatory login password change after 180 days introduced for added security.</p>
            <p>• Please do not share OTP/password/user information with anyone. Bank never asks for such information.</p>
            <p>• For better control &amp; security of your account, you can Lock or Unlock your INB access through link "Lock &amp; Unlock User" available at bottom of this Page.</p>
            <p>• <a href="#" style={{ color: '#c0392b' }}><strong>SBI Secure OTP application</strong></a> has been discontinued. For uninterrupted services, Please use OTP received on your registered mobile number or download <a href="#" style={{ color: '#c0392b' }}><strong>SBI Authenticator app</strong></a> from play store or app store.</p>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div style={{ maxWidth: 980, margin: '0 auto 15px', padding: '0 15px', display: 'flex', gap: 15 }}>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 22, color: '#2471a3', marginBottom: 5 }}>ℹ️</div>
          <p style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>NEVER respond to any popup, email, SMS or phone call seeking your personal information such as username, password(s), ATM Card details, etc.</p>
        </div>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: 12 }}>
          {['Complaints', 'Trouble logging in', 'Password Management', 'Security Tips', 'FAQ'].map(l => (
            <a key={l} href="#" style={{ display: 'block', fontSize: 11.5, color: '#1a5276', marginBottom: 4 }}>{l}</a>
          ))}
        </div>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: 12 }}>
          <div style={{ fontSize: 12, color: '#333', fontWeight: 'bold', marginBottom: 8 }}>🔗 Links</div>
          {[['About Phishing', ''], ['Report Phishing', '#c0392b'], ['Lock & Unlock User', '#c0392b'], ['Block ATM Card', '#c0392b'], ['Unlock SBI Authenticator', '#c0392b']].map(([l, c]) => (
            <a key={l} href="#" style={{ display: 'block', fontSize: 11.5, color: c || '#1a5276', marginBottom: 4 }}>{l}</a>
          ))}
        </div>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 22, color: '#27ae60', marginBottom: 5 }}>✅</div>
          <p style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>This site is certified by Verisign as a secure and trusted site. All information sent or received in this site is encrypted using 256-bit encryption.</p>
        </div>
      </div>

      {/* Notes */}
      <div style={{ background: '#f9f9f9', borderTop: '1px solid #ddd', padding: '8px 20px', fontSize: 11, color: '#555' }}>
        <ul style={{ listStyle: 'disc', paddingLeft: 20, lineHeight: 2 }}>
          <li>Mandatory fields are marked with an asterisk (*)</li>
          <li>Do not provide your username and password anywhere other than in this page</li>
          <li>Your username and password are highly confidential. Never part with them. <strong>SBI</strong> will never ask for this information.</li>
        </ul>
      </div>

      <SiteFooter />
    </div>
  );
}
