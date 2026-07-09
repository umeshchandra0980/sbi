'use client'

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { RefreshCw, Globe, Play, UserCheck, ShieldAlert, Sparkles, UserPlus } from 'lucide-react';
import { authApi, captchaApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import './login.css';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  captcha: z.string().min(1, 'Please enter the captcha'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type LoginForm = z.infer<typeof loginSchema>;
type OTPForm = z.infer<typeof otpSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setTokens, setUser, setSessionToken, sessionToken } = useAuthStore();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaSrc, setCaptchaSrc] = useState('');
  const [demoOTP, setDemoOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaType, setCaptchaType] = useState<'IMG' | 'AUD'>('IMG');

  const loginForm = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const otpForm = useForm<OTPForm>({ resolver: zodResolver(otpSchema) });

  async function loadCaptcha(type: 'IMG' | 'AUD' = 'IMG') {
    try {
      const res = await captchaApi.image();
      const token = res.headers['x-captcha-token'] as string;
      const url = URL.createObjectURL(res.data);
      setCaptchaToken(token);
      setCaptchaSrc(url);
      if (type === 'AUD') playAudio(token);
    } catch {
      toast.error('Failed to load captcha');
    }
  }

  function playAudio(token: string) {
    captchaApi.audio(token).then((res) => {
      const url = URL.createObjectURL(res.data);
      const audio = new Audio(url);
      audio.play().catch(() => {});
    });
  }

  useEffect(() => {
    loadCaptcha('IMG');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshCaptcha() {
    if (captchaSrc) URL.revokeObjectURL(captchaSrc);
    loadCaptcha(captchaType);
  }

  async function handleLogin(data: LoginForm) {
    // Verify captcha with backend first
    try {
      await captchaApi.verify(captchaToken, data.captcha);
    } catch {
      loginForm.setError('captcha', { message: 'Incorrect captcha. Please try again.' });
      refreshCaptcha();
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.login({ username: data.username, password: data.password });
      setSessionToken(res.data.session_token);
      setDemoOTP(res.data.message?.match(/Demo OTP: (\d+)/)?.[1] || '');
      toast.success('OTP sent to your registered mobile number');
      setStep('otp');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Login failed');
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  }

  async function handleOTP(data: OTPForm) {
    if (!sessionToken) {
      toast.error('Session expired. Please login again.');
      setStep('login');
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.verifyOTP({ session_token: sessionToken, otp: data.otp });
      setTokens(res.data.access_token, res.data.refresh_token);
      setUser(res.data.user);
      toast.success(`Welcome, ${res.data.user.full_name}!`);
      if (res.data.user.role === 'admin') router.push('/admin');
      else router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin(type: 'mock' | 'customer' | 'admin' | 'create_new') {
    setLoading(true);
    try {
      if (type === 'mock') {
        Cookies.set('access_token', 'mock-access-token', { expires: 1 });
        Cookies.set('refresh_token', 'mock-refresh-token', { expires: 7 });
        setUser({
          id: 'mock-user-id',
          username: 'demo.bypass',
          email: 'demo.bypass@example.com',
          full_name: 'Bypassed Demo User',
          role: 'customer',
          status: 'active',
          is_verified: true,
          created_at: new Date().toISOString()
        });
        toast.success('Bypassed Authentication (Mock Mode)!');
        router.push('/dashboard');
        return;
      }

      let payload: { username?: string; create_new?: boolean } = {};
      if (type === 'customer') {
        payload = { username: 'rahul.sharma' };
      } else if (type === 'admin') {
        payload = { username: 'admin' };
      } else if (type === 'create_new') {
        payload = { create_new: true };
      }

      const res = await authApi.demoLogin(payload);
      setTokens(res.data.access_token, res.data.refresh_token);
      setUser(res.data.user);
      toast.success(
        type === 'create_new'
          ? `Generated & Logged in as ${res.data.user.full_name}!`
          : `Welcome back, ${res.data.user.full_name}!`
      );
      if (res.data.user.role === 'admin') router.push('/admin');
      else router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Demo login failed. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page-wrapper">
      
      {/* Top Header layout */}
      <header className="login-header">
        <div className="login-logo-left">
          <a href="/" title="Logo" aria-label="SBI Logo">
            <img src="/images/logo.png" alt="SBI Logo" />
          </a>
        </div>
        <div>
          <ul className="login-header-links">
            <li><a href="#mainContent" className="login-header-link">Skip to main content</a></li>
            <li className="login-header-divider">|</li>
            <li><a href="/" className="login-header-link">About OnlineSBI</a></li>
            <li className="login-header-divider">|</li>
            <li><a href="/" className="login-header-link">Forms</a></li>
            <li className="login-header-divider">|</li>
            <li><a href="/" className="login-header-link">Net Banking Branches</a></li>
            <li className="login-header-divider">|</li>
            <li className="login-home-loan-btn">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <img src="/images/HomeLoanButton.png" alt="SBI Home Loan" />
              </a>
            </li>
            <li className="login-header-divider">|</li>
            <li>
              <button className="bg-gray-500 text-white px-3 py-1 rounded text-xs flex items-center gap-1">
                <Globe size={10} /> Language ▾
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="login-navbar" aria-label="Main menu">
        <ul className="login-navbar-list">
          <li className="login-navbar-item">
            <a className="login-navbar-link" href="/">Home</a>
          </li>
          <li className="login-navbar-item">
            <a className="login-navbar-link" href="/" onClick={(e) => { e.preventDefault(); }}>Products &amp; Services</a>
          </li>
          <li className="login-navbar-item">
            <a className="login-navbar-link" href="/" target="_blank" rel="noopener noreferrer">How Do I (Help)</a>
          </li>
          <li className="login-navbar-item">
            <a className="login-navbar-link" href="/" target="_blank" rel="noopener noreferrer">Manage Debit Card E-Mandate</a>
          </li>
          <li className="login-navbar-item">
            <a className="login-navbar-link" href="/" target="_blank" rel="noopener noreferrer">Contact Us</a>
          </li>
        </ul>
      </nav>

      {/* Sub Header bar */}
      <div className="login-sub-header">
        <h1 className="login-sub-header-title">Login to OnlineSBI</h1>
        <div className="login-sub-header-welcome">Welcome to Personal Internet Banking</div>
      </div>

      {/* Main Form container */}
      <main id="mainContent" className="login-main-container">
        
        {/* Step: Login Form */}
        {step === 'login' ? (
          <div className="login-content-grid">
            
            {/* Left side form */}
            <div className="login-form-side">
              <p className="login-care-text">
                (<span>CARE:</span> Username and password are case sensitive.)
              </p>

              <form onSubmit={loginForm.handleSubmit(handleLogin)}>
                <div className="login-fields-and-links">
                  
                  {/* Left inputs column */}
                  <div>
                    <div className="login-form-group">
                      <label htmlFor="username">Username*</label>
                      <input 
                        id="username"
                        {...loginForm.register('username')} 
                        type="text" 
                        className="login-input-field" 
                        autoComplete="username"
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="login-form-group">
                      <label htmlFor="password">Password*</label>
                      <input 
                        id="password"
                        {...loginForm.register('password')} 
                        type="password" 
                        className="login-input-field" 
                        autoComplete="current-password"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="login-form-group">
                      <label htmlFor="captcha">Enter the text as shown in the image*</label>
                      <input 
                        id="captcha"
                        {...loginForm.register('captcha')} 
                        type="text" 
                        className="login-input-field"
                      />
                      {loginForm.formState.errors.captcha && (
                        <p className="text-red-500 text-xs mt-1">{loginForm.formState.errors.captcha.message}</p>
                      )}
                    </div>

                    <div className="login-captcha-options">
                      <span className="login-captcha-options-label">Select one of the Captcha options*</span>
                      <div className="login-captcha-options-radios">
                        <label>
                          <input 
                            type="radio" 
                            name="captchaOpt" 
                            checked={captchaType === 'IMG'} 
                            onChange={() => { setCaptchaType('IMG'); if (!captchaSrc) loadCaptcha('IMG'); }}
                          />
                          Image Captcha
                        </label>
                        <label>
                          <input 
                            type="radio" 
                            name="captchaOpt" 
                            checked={captchaType === 'AUD'} 
                            onChange={() => { setCaptchaType('AUD'); playAudio(captchaToken); }}
                          />
                          Audio Captcha
                        </label>
                      </div>
                    </div>

                    {captchaType === 'IMG' ? (
                      <div className="login-captcha-display-row">
                        <div className="login-captcha-image-box">
                          {captchaSrc ? (
                            <img src={captchaSrc} alt="CAPTCHA" className="login-captcha-image" />
                          ) : (
                            <span>Loading...</span>
                          )}
                        </div>
                        <button 
                          type="button" 
                          onClick={refreshCaptcha} 
                          className="login-captcha-refresh-btn"
                          aria-label="Refresh Captcha"
                        >
                          <RefreshCw size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => playAudio(captchaToken)}
                          className="login-btn-reset"
                        >
                          ▶ Play Audio Captcha
                        </button>
                      </div>
                    )}

                    <div className="login-buttons-row">
                      <button type="submit" disabled={loading} className="login-btn-submit">
                        {loading ? 'Please wait...' : 'Login'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => { loginForm.reset(); refreshCaptcha(); }} 
                        className="login-btn-reset"
                      >
                        Reset
                      </button>
                    </div>

                  </div>

                  {/* Right sub links column */}
                  <div className="login-quick-links-panel">
                    <a className="login-quick-link-item" href="/auth/register">
                      New User ? Register here/Activate
                    </a>
                    <a className="login-quick-link-item" href="/auth/activate">
                      Forgot Username / Login Password
                    </a>

                    <label className="login-vk-checkbox-label">
                      <input type="checkbox" id="vk-kb" />
                      Enable Virtual Keyboard
                    </label>

                    <div className="login-actfast-box">
                      <a href="/" target="_blank" rel="noopener noreferrer">
                        <img src="/images/actfast.png" alt="ACT FAST" />
                      </a>
                    </div>
                  </div>

                </div>
              </form>

              <div className="text-xs text-gray-500 border-t pt-3 mt-4">
                For better security use the Online Virtual Keyboard to login. <a href="/" className="text-sbi-blue font-bold hover:underline">More ...</a>
              </div>
            </div>

            {/* Right side banner panel */}
            <div className="login-banner-side">
              <div className="login-right-yono-banner">
                <img src="/images/Yono-login-Banner.jpg" alt="Internet Banking is now live in new avatar" />
              </div>
              <div className="login-right-notice-box">
                <p><strong>Dear Customer,</strong></p>
                <ul>
                  <li>OTP based login &amp; Mandatory login password change after 180 days introduced for added security.</li>
                  <li>Please do not share OTP/password/user information with anyone. Bank never asks for such information.</li>
                  <li>For better control &amp; security of your account, you can Lock or Unlock your INB access through link &quot;Lock &amp; Unlock User&quot; available at bottom of this Page.</li>
                  <li><strong>SBI Secure OTP application</strong> has been discontinued. For uninterrupted services, Please use OTP received on your registered mobile number or download <strong>SBI Authenticator app</strong> from play store or app store.</li>
                </ul>
              </div>
            </div>

          </div>
        ) : (
          /* Step: OTP Verification Form */
          <div className="login-content-grid" style={{ gridTemplateColumns: '1fr', maxWidth: '600px', margin: '0 auto 24px' }}>
            <div className="p-4">
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-xs text-sbi-blue mb-4">
                <p className="font-bold text-sm mb-1">OTP Verification</p>
                <p>An OTP has been sent to your registered mobile number.</p>
                {demoOTP && (
                  <div className="mt-3 bg-yellow-50 border border-yellow-300 rounded p-2 text-yellow-800">
                    <p className="font-bold">Demo OTP: {demoOTP}</p>
                  </div>
                )}
              </div>
              
              <form onSubmit={otpForm.handleSubmit(handleOTP)} className="space-y-4">
                <div className="login-form-group">
                  <label htmlFor="otp-field" className="block text-xs font-bold mb-1">Enter OTP *</label>
                  <input
                    id="otp-field"
                    {...otpForm.register('otp')}
                    className="login-input-field"
                    maxLength={6}
                    placeholder="6-digit OTP"
                  />
                  {otpForm.formState.errors.otp && (
                    <p className="text-red-500 text-xs mt-1">{otpForm.formState.errors.otp.message}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button type="submit" disabled={loading} className="login-btn-submit">
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button type="button" onClick={() => setStep('login')} className="login-btn-reset">
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Developer & Demo Access Panel */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg p-6 shadow-xl mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-yellow-400 animate-pulse" size={24} />
            <div>
              <h2 className="text-lg font-bold tracking-wide">Developer &amp; Demo Access Portal</h2>
              <p className="text-xs text-blue-200">Bypass standard Captcha/OTP validation and log in directly using one of the modes below.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            
            {/* Mock Client Mode */}
            <button 
              type="button"
              onClick={() => handleDemoLogin('mock')}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg p-4 text-left transition-all duration-200 hover:shadow-lg focus:outline-none"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-slate-700 text-slate-200 text-[10px] uppercase px-2 py-0.5 rounded font-mono">Mock Mode</span>
                <Play size={14} className="text-slate-400" />
              </div>
              <p className="font-bold text-xs">Client-Only Bypass</p>
              <p className="text-[10px] text-slate-400 mt-1">Simulated frontend dashboard with local mock data. Backend server not required.</p>
            </button>

            {/* Seed User - Rahul Sharma */}
            <button 
              type="button"
              onClick={() => handleDemoLogin('customer')}
              className="bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 rounded-lg p-4 text-left transition-all duration-200 hover:shadow-lg focus:outline-none"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-blue-800 text-blue-100 text-[10px] uppercase px-2 py-0.5 rounded font-mono">Seed User</span>
                <UserCheck size={14} className="text-blue-300" />
              </div>
              <p className="font-bold text-xs">Rahul Sharma (Customer)</p>
              <p className="text-[10px] text-blue-300 mt-1">Log in as the primary customer database account (pre-seeded details/balances).</p>
            </button>

            {/* Seed User - Admin */}
            <button 
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="bg-rose-950 hover:bg-rose-900 border border-rose-800 rounded-lg p-4 text-left transition-all duration-200 hover:shadow-lg focus:outline-none"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-rose-800 text-rose-100 text-[10px] uppercase px-2 py-0.5 rounded font-mono">Admin Portal</span>
                <ShieldAlert size={14} className="text-rose-300" />
              </div>
              <p className="font-bold text-xs">SBI Administrator</p>
              <p className="text-[10px] text-rose-300 mt-1">Access the admin features (manage users, lock/unlock accounts, review audit logs).</p>
            </button>

            {/* Create New Dummy User */}
            <button 
              type="button"
              onClick={() => handleDemoLogin('create_new')}
              className="bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-lg p-4 text-left transition-all duration-200 hover:shadow-lg focus:outline-none"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-emerald-800 text-emerald-100 text-[10px] uppercase px-2 py-0.5 rounded font-mono">Dynamic Generator</span>
                <UserPlus size={14} className="text-emerald-300" />
              </div>
              <p className="font-bold text-xs">Generate New Demo User</p>
              <p className="text-[10px] text-emerald-300 mt-1">Register &amp; activate a brand new customer in PostgreSQL with full accounts &amp; history.</p>
            </button>

          </div>
        </div>

        {/* 3 bottom information cards */}
        <div className="login-three-cards-grid">
          
          {/* Card 1: Info icon text */}
          <div className="login-bottom-card text-center">
            <div className="login-bottom-card-icon mx-auto">ℹ</div>
            <p className="login-bottom-card-text">
              NEVER respond to any popup, email, SMS or phone call, no matter how appealing or official looking, seeking your personal information such as username, password(s), mobile number, ATM Card details, etc. Such communications are sent or created by fraudsters to trick you into parting with your credentials.
            </p>
          </div>

          {/* Card 2: Links */}
          <div className="login-bottom-card">
            <div className="login-bottom-card-links">
              <a className="login-bottom-card-link-item" href="https://crh.sbi.bank.in">Complaints</a>
              <a className="login-bottom-card-link-item" href="#">About Phishing</a>
              <a className="login-bottom-card-link-item" href="#">Trouble logging in</a>
              <a className="login-bottom-card-link-item" href="#">Report Phishing</a>
              <a className="login-bottom-card-link-item" href="#">Password Management</a>
              <a className="login-bottom-card-link-item red-link" href="#">Lock &amp; Unlock User</a>
              <a className="login-bottom-card-link-item" href="#">Security Tips</a>
              <a className="login-bottom-card-link-item" href="#">Block ATM Card</a>
              <a className="login-bottom-card-link-item" href="#">FAQ</a>
              <a className="login-bottom-card-link-item red-link" href="#">Unlock SBI Authenticator</a>
            </div>
          </div>

          {/* Card 3: Shield icon text */}
          <div className="login-bottom-card text-center">
            <div className="login-bottom-card-icon mx-auto">🛡</div>
            <p className="login-bottom-card-text">
              This site is certified by Verisign as a secure and trusted site. All information sent or received in this site is encrypted using 256-bit encryption.
            </p>
          </div>

        </div>

        {/* Guidelines List */}
        <ul className="login-guidelines-list">
          <li>Mandatory fields are marked with an asterisk (*)</li>
          <li>Do not provide your username and password anywhere other than in this page.</li>
          <li>Your username and password are highly confidential. Never part with them. <strong>SBI</strong> will never ask for this information.</li>
        </ul>

        {/* Footer info and logos */}
        <footer className="login-footer" id="footer">
          <div className="login-footer-area">
            <div className="login-footer-verisign">
              <img src="/images/veriSign_logo.png" alt="VeriSign" title="VeriSign" />
            </div>
          </div>
          <div className="login-footer-bestview">
            <div className="float-start">
              <p>© State Bank of India (APM Id: Serv_Tran_552)</p>
            </div>
            <div className="float-end login-footer-hidden">
              <p>Site best viewed at 1024 x 768 resolution in Microsoft Edge 79 +, Mozilla 96 +, Google Chrome 97 +</p>
            </div>
          </div>
          <div className="login-footer-scrollup" title="Move To Top" id="scrollup" style={{ display: 'none' }}></div>
        </footer>

      </main>

    </div>
  );
}
