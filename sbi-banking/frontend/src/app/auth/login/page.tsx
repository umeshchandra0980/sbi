'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { 
  Eye, EyeOff, Keyboard, Volume2, RotateCw, ChevronDown, ChevronLeft, ChevronRight,
  Sparkles, Play, UserCheck, ShieldAlert, UserPlus, HelpCircle, MessageSquare, 
  Building2, Phone, X, Shield, Lock, FileText, ArrowRight, Check, AlertTriangle
} from 'lucide-react';
import { authApi, captchaApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import './login.css';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  captcha: z.string().min(1, 'Please enter captcha'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setTokens, setUser, setSessionToken, sessionToken } = useAuthStore();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  
  // Captcha State
  const [captchaText, setCaptchaText] = useState('1AFLO');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaSrc, setCaptchaSrc] = useState('');
  const [demoOTP, setDemoOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // OTP Modal State (Matching Screenshot 1)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [showOtpText, setShowOtpText] = useState(false);
  const [resendTimer, setResendTimer] = useState(39);
  const [userNameGreeting, setUserNameGreeting] = useState('DUMPALA');
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Security Carousel State
  const [securitySlide, setSecuritySlide] = useState(0);

  const securityCards = [
    {
      title: "Be Vigilant. Be Safe.",
      desc: "While the bank will make every effort to ensure your safety...",
      img: "https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/best_practices_be_vigilent_be_safe"
    },
    {
      title: "Confidentiality",
      desc: "SBI never asks for confidential information such as PIN or OTP...",
      img: "https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/best_practices_confedentiality"
    },
    {
      title: "Beware of Phishing attacks",
      desc: "Phishing is a fraudulent attempt, usually made through email...",
      img: "https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/best_practices_beware_of_phishing"
    }
  ];

  const loginForm = useForm<LoginForm>({ 
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', captcha: '' } 
  });

  const usernameVal = loginForm.watch('username');
  const passwordVal = loginForm.watch('password');
  const captchaVal = loginForm.watch('captcha');

  const isFormValid = usernameVal?.trim().length > 0 && passwordVal?.trim().length > 0 && captchaVal?.trim().length > 0;

  function generateRandomCaptcha() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async function loadCaptcha() {
    try {
      const res = await captchaApi.image();
      const token = res.headers['x-captcha-token'] as string;
      const url = URL.createObjectURL(res.data);
      setCaptchaToken(token);
      setCaptchaSrc(url);
    } catch {
      setCaptchaText(generateRandomCaptcha());
    }
  }

  useEffect(() => {
    loadCaptcha();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  function refreshCaptcha() {
    if (captchaSrc) URL.revokeObjectURL(captchaSrc);
    setCaptchaSrc('');
    setCaptchaText(generateRandomCaptcha());
    loadCaptcha();
  }

  function playAudioCaptcha() {
    if ('speechSynthesis' in window) {
      const textToSpeak = captchaText.split('').join(' ');
      const utterance = new SpeechSynthesisUtterance(`Captcha text is ${textToSpeak}`);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.success(`Captcha code: ${captchaText}`);
    }
  }

  async function handleLogin(data: LoginForm) {
    setLoading(true);
    try {
      if (captchaToken) {
        try {
          await captchaApi.verify(captchaToken, data.captcha);
        } catch {
          loginForm.setError('captcha', { message: 'Incorrect captcha text.' });
          refreshCaptcha();
          setLoading(false);
          return;
        }
      }

      const res = await authApi.login({ username: data.username, password: data.password });
      setSessionToken(res.data.session_token);
      setDemoOTP(res.data.message?.match(/Demo OTP: (\d+)/)?.[1] || '123456');
      setUserNameGreeting(data.username.toUpperCase());
      setOtpDigits(['', '', '', '', '', '']);
      setResendTimer(39);
      toast.success('OTP sent to your registered mobile number');
      setStep('otp');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Login failed. Please check credentials.');
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  }

  async function handleOtpSubmit() {
    const fullOtp = otpDigits.join('');
    if (fullOtp.length !== 6) return;

    if (!sessionToken) {
      toast.error('Session expired. Please login again.');
      setStep('login');
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.verifyOTP({ session_token: sessionToken, otp: fullOtp });
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
          username: 'dumpala',
          email: 'dumpala@example.com',
          full_name: 'Dumpala',
          role: 'customer',
          status: 'active',
          is_verified: true,
          created_at: new Date().toISOString()
        });
        toast.success('LoggedIn via Mock Demo Mode!');
        router.push('/dashboard');
        return;
      }

      let payload: { username?: string; create_new?: boolean } = {};
      if (type === 'customer') payload = { username: 'rahul.sharma' };
      else if (type === 'admin') payload = { username: 'admin' };
      else if (type === 'create_new') payload = { create_new: true };

      const res = await authApi.demoLogin(payload);
      setTokens(res.data.access_token, res.data.refresh_token);
      setUser(res.data.user);
      toast.success(`Welcome back, ${res.data.user.full_name}!`);
      if (res.data.user.role === 'admin') router.push('/admin');
      else router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  }

  function handleVkKeyPress(key: string) {
    const current = loginForm.getValues('password') || '';
    if (key === 'BACKSPACE') {
      loginForm.setValue('password', current.slice(0, -1));
    } else if (key === 'CLEAR') {
      loginForm.setValue('password', '');
    } else {
      loginForm.setValue('password', current + key);
    }
  }

  const keyboardKeys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '@', '.', '#'],
    ['CLEAR', 'BACKSPACE']
  ];

  const isOtpComplete = otpDigits.every(d => d !== '');

  return (
    <div className="login-page-wrapper">
      
      {/* ================= HEADER (app-registration-header) ================= */}
      <header className="header-container p-0">
        
        {/* Top Row: Purple header */}
        <div className="top-row">
          <div className="top-row-inner">
            <div>
              <button type="button" className="top-row-left activebutton" aria-label="Personal Banking">
                Personal Banking
              </button>
            </div>

            <div className="rightSideSection">
              <a href="#mainContent" className="top-row-text cursor-pointer main-content-link" aria-label="Skip to main content">
                Skip to main content
              </a>
              <div className="pipe" />
              <div className="whatsNew top-row-text" aria-label="Corporate website">
                Corporate website
                <Building2 size={13} className="ps-1" />
              </div>
              <div className="pipe" />
              <a className="header-link top-row-text" aria-label="get Help" href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer">
                Get Help
                <HelpCircle size={13} className="ps-1" />
              </a>
              <div className="pipe" />
              <a className="header-link top-row-text" aria-label="WhatsApp" href="https://sbi.bank.in/web/personal-banking/digital/whatsapp-banking" target="_blank" rel="noopener noreferrer">
                WhatsApp
                <MessageSquare size={13} className="ps-1" />
              </a>
              <div className="pipe" />
              <div className="dropdown">
                <button type="button" className="btn lang-dropdown top-row-text" style={{ background: 'none', border: 'none' }}>
                  <span>English</span>
                  <ChevronDown size={12} className="ms-1" />
                </button>
              </div>
              <div className="pipe" />
              <div className="fontSizing">
                <span className="header-link top-row-text smallA" aria-label="A-">A-</span>
                <span className="header-link top-row-text" aria-label="A">A</span>
                <span className="header-link top-row-text bigA" aria-label="A+">A+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="navbar-sbi" aria-label="navbar">
          <div className="navbar-sbi-inner">
            <Link href="/" className="bottom-col-left">
              <img 
                loading="lazy" 
                className="header-logo" 
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                alt="YONOSBILogo" 
              />
            </Link>

            <ul className="navbar-nav-sbi">
              <li className="nav-item-sbi">
                <Link href="/" className="nav-link-sbi active">
                  Home
                </Link>
              </li>

              {/* Accounts & Deposits */}
              <li 
                className="nav-item-sbi"
                onMouseEnter={() => setActiveDropdown('accounts')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="nav-link-sbi">
                  Accounts &amp; Deposits <ChevronDown size={14} />
                </div>
                {activeDropdown === 'accounts' && (
                  <div className="drawer-dropdown">
                    <Link href="/web/personal-banking/accounts/saving-account" className="optionsWithImage">
                      <div className="sublinks-header-icon"><FileText size={16} /></div>
                      <span>Savings Account</span>
                    </Link>
                    <Link href="/web/personal-banking/accounts/saving-account" className="optionsWithImage">
                      <div className="sublinks-header-icon"><Building2 size={16} /></div>
                      <span>Current Account</span>
                    </Link>
                    <Link href="/web/personal-banking/accounts/saving-account" className="optionsWithImage">
                      <div className="sublinks-header-icon"><Lock size={16} /></div>
                      <span>Term Deposits</span>
                    </Link>
                    <a href="https://cdnweb.onlineyono.sbi.bank.in/accounts/re-kyc/kyc-entry" target="_blank" rel="noopener noreferrer" className="optionsWithImage">
                      <div className="sublinks-header-icon"><Shield size={16} /></div>
                      <span>Update KYC</span>
                    </a>
                    <div className="dropdown-footer">
                      Please register / login to explore more.
                    </div>
                  </div>
                )}
              </li>

              {/* Loans */}
              <li 
                className="nav-item-sbi"
                onMouseEnter={() => setActiveDropdown('loans')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="nav-link-sbi">
                  Loans <ChevronDown size={14} />
                </div>
                {activeDropdown === 'loans' && (
                  <div className="drawer-dropdown">
                    <a href="https://onlineapply.sbi.bank.in/personal-banking/personal-loan" target="_blank" rel="noopener noreferrer" className="optionsWithImage">Personal Loan</a>
                    <a href="https://homeloans.sbi.bank.in/" target="_blank" rel="noopener noreferrer" className="optionsWithImage">Home Loan</a>
                    <a href="https://sbi.bank.in/web/personal-banking/loans/gold-loan" target="_blank" rel="noopener noreferrer" className="optionsWithImage">Gold Loan</a>
                    <a href="https://retail.sbi.bank.in/lamf/mflanding.htm" target="_blank" rel="noopener noreferrer" className="optionsWithImage">Loan Against Mutual Fund</a>
                    <div className="dropdown-footer">
                      Please register / login to explore more.
                    </div>
                  </div>
                )}
              </li>

              {/* Cards */}
              <li 
                className="nav-item-sbi"
                onMouseEnter={() => setActiveDropdown('cards')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="nav-link-sbi">
                  Cards <ChevronDown size={14} />
                </div>
                {activeDropdown === 'cards' && (
                  <div className="drawer-dropdown">
                    <a href="http://www.sbicard.com/" target="_blank" rel="noopener noreferrer" className="optionsWithImage">Credit Card</a>
                    <a href="https://prepaid.sbi.bank.in/" target="_blank" rel="noopener noreferrer" className="optionsWithImage">Prepaid Card</a>
                    <div className="dropdown-footer">
                      Please register / login to explore more.
                    </div>
                  </div>
                )}
              </li>

              {/* Investments */}
              <li 
                className="nav-item-sbi"
                onMouseEnter={() => setActiveDropdown('investments')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="nav-link-sbi">
                  Investments <ChevronDown size={14} />
                </div>
                {activeDropdown === 'investments' && (
                  <div className="drawer-dropdown">
                    <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="optionsWithImage">PPF Account</a>
                    <a href="https://www.sbisecurities.in/" target="_blank" rel="noopener noreferrer" className="optionsWithImage">Demat &amp; Securities</a>
                    <a href="https://www.sbisecurities.in/" target="_blank" rel="noopener noreferrer" className="optionsWithImage">3-in-1 Account</a>
                    <div className="dropdown-footer">
                      Please register / login to explore more.
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ================= MAIN HERO BODY (app-welcome-login) ================= */}
      <main id="mainContent" className="bgImageLogin">
        <div className="bgImageLoginWave" />

        <div className="custom-container">
          <div className="login-hero-grid">
            
            {/* Left Hero Section */}
            <div className="border_hello">
              <h1 className="gradient-heading">
                <span>Hello!</span>
              </h1>
              <p className="header-1">Welcome to the world of YONO SBI</p>
              
              <p className="header-2 mb-0">Are you a new user?</p>
              <p className="paragraph-2">Choose one of the following options if you are a new user</p>

              <div className="solid-button-container">
                <button 
                  type="button" 
                  onClick={() => router.push('/auth/register')} 
                  className="solid-button"
                  aria-label="Register Now"
                >
                  Register Now
                </button>
                <button 
                  type="button" 
                  onClick={() => router.push('/auth/activate')} 
                  className="non-solid-button"
                  aria-label="Activate Username"
                >
                  Activate Username
                </button>
              </div>

              <div className="text-account">
                Don’t have an account with SBI?{' '}
                <Link href="/web/personal-banking/accounts/saving-account" className="openNowText">
                  Open Now
                </Link>
              </div>
            </div>

            {/* Right Side Login Card */}
            <div className="login-registration-container">
              
              <button type="button" id="defaultOpen" className="tablink activetab" aria-label="Username / Password">
                <span>Username / Password</span>
                <Lock size={16} />
              </button>

              <div className="tabcontent">
                
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="ng-untouched">
                  
                  {/* Username Field */}
                  <div className="mat-mdc-form-field">
                    <div className="mat-mdc-text-field-wrapper">
                      <input
                        id="mat-input-1"
                        {...loginForm.register('username')}
                        type="text"
                        maxLength={20}
                        className="mat-mdc-input-element"
                        placeholder=" "
                        autoComplete="username"
                      />
                      <label htmlFor="mat-input-1" className="mat-mdc-floating-label">
                        Username
                      </label>
                    </div>
                    <div className="text-end">
                      <Link href="/auth/activate" className="link-purple" aria-label="Forgot Username">
                        Forgot Username?
                      </Link>
                    </div>
                    {loginForm.formState.errors.username && (
                      <p className="text-red-600 text-xs mt-1">{loginForm.formState.errors.username.message}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mat-mdc-form-field">
                    <div className="mat-mdc-text-field-wrapper">
                      <input
                        id="mat-input-2"
                        {...loginForm.register('password')}
                        type={showPassword ? 'text' : 'password'}
                        maxLength={20}
                        className="mat-mdc-input-element"
                        placeholder=" "
                        autoComplete="current-password"
                      />
                      <label htmlFor="mat-input-2" className="mat-mdc-floating-label">
                        Password
                      </label>
                      <div className="mat-mdc-form-field-icon-suffix">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="iconbtn-mat"
                          title={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                          className="iconbtn-mat btn-vk"
                          title="Virtual Keyboard"
                        >
                          <Keyboard size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="text-end">
                      <Link href="/auth/activate" className="link-purple" aria-label="Forgot Password">
                        Forgot Password?
                      </Link>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-red-600 text-xs mt-1">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  {/* Captcha Field */}
                  <div className="mat-mdc-form-field">
                    <div className="mat-mdc-text-field-wrapper mb-2">
                      <input
                        id="mat-input-0"
                        {...loginForm.register('captcha')}
                        type="text"
                        maxLength={5}
                        className="mat-mdc-input-element"
                        placeholder=" "
                      />
                      <label htmlFor="mat-input-0" className="mat-mdc-floating-label">
                        Enter Captcha
                      </label>
                    </div>

                    <div className="captcha-container">
                      <div className="captcha-box">
                        {captchaSrc ? (
                          <img src={captchaSrc} alt="CAPTCHA" className="h-full w-full object-cover" />
                        ) : (
                          <span className="captcha-text-styled">{captchaText}</span>
                        )}
                      </div>
                      <div className="audio-refresh-buttons">
                        <button
                          type="button"
                          onClick={playAudioCaptcha}
                          className="iconbtn"
                          title="Audio Captcha"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          className="iconbtn"
                          title="Refresh Captcha"
                        >
                          <RotateCw size={14} />
                        </button>
                      </div>
                    </div>
                    {loginForm.formState.errors.captcha && (
                      <p className="text-red-600 text-xs mt-1">{loginForm.formState.errors.captcha.message}</p>
                    )}
                  </div>

                  {/* Submit Login Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={isFormValid ? "login-button" : "login-button-invalid"}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                  <div className="d-flex justify-content-end mt-2">
                    <a href="https://retail.sbi.bank.in" className="link-purple">
                      Lock/Unlock User
                    </a>
                  </div>
                </form>

                {/* Virtual Keyboard Popup */}
                {showVirtualKeyboard && (
                  <div className="virtual-keyboard-popup">
                    <div className="d-flex justify-content-between align-items-center mb-2 pb-1 border-bottom">
                      <span className="font-bold text-xs text-purple-900">Virtual Keyboard</span>
                      <button 
                        type="button" 
                        onClick={() => setShowVirtualKeyboard(false)}
                        className="text-gray-500 hover:text-black border-0 bg-none"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="d-flex flex-column gap-1">
                      {keyboardKeys.map((row, rIdx) => (
                        <div key={rIdx} className="d-flex justify-content-center gap-1">
                          {row.map((key) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleVkKeyPress(key)}
                              className={`btn btn-sm btn-light border ${key.length > 1 ? 'px-3 text-xs' : 'px-2'}`}
                              style={{ minWidth: key.length > 1 ? '60px' : '30px' }}
                            >
                              {key}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

          {/* Quick Demo Access Bar for Developers/Reviewers */}
          <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-300 animate-pulse" />
                <span className="font-bold text-sm">Direct Demo Access (Skip Captcha/OTP Verification)</span>
              </div>
              <span className="text-xs text-purple-200">Click any mode to enter dashboard instantly:</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('mock')}
                className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl p-3 text-left transition-all text-xs"
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Mock Mode</span>
                  <Play size={12} />
                </div>
                <p className="text-[10px] text-purple-100">Bypass server &amp; test UI</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl p-3 text-left transition-all text-xs"
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Customer Portal</span>
                  <UserCheck size={12} />
                </div>
                <p className="text-[10px] text-purple-100">Login as Rahul Sharma</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl p-3 text-left transition-all text-xs"
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Admin Panel</span>
                  <ShieldAlert size={12} />
                </div>
                <p className="text-[10px] text-purple-100">Manage bank system</p>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('create_new')}
                className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl p-3 text-left transition-all text-xs"
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>New User</span>
                  <UserPlus size={12} />
                </div>
                <p className="text-[10px] text-purple-100">Auto generate DB user</p>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ================= AUTHENTIC YONO SBI OTP MODAL OVERLAY (Screenshot 1 Exact) ================= */}
      {step === 'otp' && (
        <div className="sbi-otp-overlay">
          <div className="sbi-otp-modal-box">
            
            {/* Upper Header */}
            <div>
              <div className="sbi-otp-header">
                <h2 className="sbi-otp-greeting">Hi {userNameGreeting}</h2>
                <button 
                  type="button" 
                  onClick={() => setStep('login')}
                  className="sbi-otp-close-btn"
                  aria-label="Close OTP Modal"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="sbi-otp-subtitle">
                An OTP has been sent to your registered mobile<br />
                number +91 ***** ***33
              </p>

              {demoOTP && (
                <div className="mt-2 text-xs font-mono bg-white/20 px-3 py-1.5 rounded-md inline-block text-white font-bold">
                  Demo OTP: {demoOTP}
                </div>
              )}

              {/* Digits Input Row */}
              <div className="sbi-otp-inputs-wrapper">
                <div className="sbi-otp-digit-row">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpInputRefs.current[idx] = el; }}
                      type={showOtpText ? 'text' : 'password'}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="sbi-otp-digit-input"
                      autoFocus={idx === 0}
                    />
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={() => setShowOtpText(!showOtpText)}
                    className="sbi-otp-eye-btn"
                    title={showOtpText ? "Hide OTP" : "Show OTP"}
                  >
                    {showOtpText ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="sbi-otp-timer-row">
                  Resend OTP <span className="font-bold">{resendTimer > 0 ? `${resendTimer}s` : 'Now'}</span>
                </div>
              </div>
            </div>

            {/* Lower Action Button */}
            <div>
              <button
                type="button"
                onClick={handleOtpSubmit}
                disabled={!isOtpComplete || loading}
                className={`sbi-otp-proceed-btn ${isOtpComplete && !loading ? 'active' : 'disabled'}`}
              >
                {loading ? 'Verifying...' : 'Proceed'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= QUICK ACTIONS SECTION ================= */}
      <aside className="quick-actions-bg" aria-label="Quick Actions">
        <div className="custom-container">
          <h1 className="header-titleClr">Quick Actions</h1>

          <div className="qa-container">
            <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <FileText size={24} />
              </div>
              <span className="qa-label">Complaints</span>
            </a>

            <a href="https://retail.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <Lock size={24} />
              </div>
              <span className="qa-label">Lock/Unlock User</span>
            </a>

            <a href="https://www.psballiance.com/doorstep-banking.html" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <Building2 size={24} />
              </div>
              <span className="qa-label">Doorstep Banking</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <Phone size={24} />
              </div>
              <span className="qa-label">Contact Us</span>
            </a>
          </div>
        </div>
      </aside>

      {/* ================= IMPORTANT NOTICES & SECURITY BEST PRACTICES & DO'S AND DON'TS (Exact Layout) ================= */}
      <div className="containerBox">
        <div className="custom-container">
          
          {/* Important Notices & Security Best Practices Container Box */}
          <aside aria-label="Important Notes & Security Best Practices">
            <div className="imp-notices-container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Column: Important Notices */}
                <div className="borderCont">
                  <div className="flex justify-between items-baseline mb-4">
                    <h2 className="headTxt">Important Notices</h2>
                    <div className="tabText">
                      <a href="https://retail.sbi.bank.in" target="_blank" rel="noopener noreferrer" aria-label="View All Important Notices">
                        View All
                      </a>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bullet-arrow-circle">
                        <ArrowRight size={14} />
                      </div>
                      <p className="imp-notice-txt m-0">
                        Customers can now deposit Income Tax/Corporate Taxes using all Bank Debit Cards and Credit Cards under State Bank Payment Gateway.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bullet-arrow-circle">
                        <ArrowRight size={14} />
                      </div>
                      <p className="imp-notice-txt m-0">
                        Call us toll free on 1800 1234 and 1800 2100 and get a wide range of services through SBI Contact Centre.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bullet-arrow-circle">
                        <ArrowRight size={14} />
                      </div>
                      <p className="imp-notice-txt m-0">
                        SBI never asks for your Card/PIN/OTP/CVV details on phone, message or email. Please do not click on links received on your email or mobile asking your Bank/Card details.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Right Column: Security Best Practices Carousel */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <h2 className="headSecurityTxt">Security Best Practices</h2>
                    <div className="tabText">
                      <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" aria-label="View All Security Best Practices">
                        View All
                      </a>
                    </div>
                  </div>

                  <div className="security-carousel-row">
                    <button 
                      type="button" 
                      onClick={() => setSecuritySlide(prev => (prev - 1 + securityCards.length) % securityCards.length)}
                      className="nav-arrow-btn"
                      aria-label="Previous Security Tip"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="security-card-box">
                      <img 
                        loading="lazy" 
                        alt="Security Tip" 
                        className="security-img" 
                        src={securityCards[securitySlide].img} 
                      />
                      <h3 className="security-card-title">{securityCards[securitySlide].title}</h3>
                      <p className="security-card-desc">{securityCards[securitySlide].desc}</p>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => setSecuritySlide(prev => (prev + 1) % securityCards.length)}
                      className="nav-arrow-btn"
                      aria-label="Next Security Tip"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* Do's & Don'ts Section */}
          <aside aria-label="Do's & Don'ts">
            <h2 className="headTxt py-3">Do&apos;s &amp; Don&apos;ts</h2>
            
            <div className="dos-donts-grid">
              
              {/* Do Card 1 */}
              <div className="do-card">
                <div className="do-badge-circle">
                  <Check size={24} />
                </div>
                <div>
                  <div className="dos-card-header">Always</div>
                  <span className="dos-card-content">keep your computer free of malware</span>
                </div>
              </div>

              {/* Do Card 2 */}
              <div className="do-card">
                <div className="do-badge-circle">
                  <Check size={24} />
                </div>
                <div>
                  <div className="dos-card-header">Always</div>
                  <span className="dos-card-content">change your passwords periodically</span>
                </div>
              </div>

              {/* Don't Card 1 */}
              <div className="dont-card">
                <div className="dont-badge-circle">
                  <X size={24} />
                </div>
                <div>
                  <div className="donts-card-header">Never</div>
                  <span className="donts-card-content">respond to communication seeking your passwords</span>
                </div>
              </div>

              {/* Don't Card 2 */}
              <div className="dont-card">
                <div className="dont-badge-circle">
                  <X size={24} />
                </div>
                <div>
                  <div className="donts-card-header">Never</div>
                  <span className="donts-card-content">reveal your passwords or card details to anyone</span>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>

      {/* ================= LEGAL FOOTER BAR ================= */}
      <footer className="sbi-legal-footer">
        <div className="sbi-legal-footer-links">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="sbi-legal-footer-link">RBI Limited Liability Policy</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="sbi-legal-footer-link">Privacy Statement</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="sbi-legal-footer-link">Terms of Service (Terms &amp; Conditions)</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="sbi-legal-footer-link">Disclosure</a>
        </div>
      </footer>

    </div>
  );
}
