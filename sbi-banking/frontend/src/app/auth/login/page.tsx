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
import { useAuthStore } from '@/store/authStore';
import { MOCK_USER } from '@/lib/mockData';
import './login.css';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  captcha: z.string().min(1, 'Please enter captcha'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setTokens, setUser, setSessionToken } = useAuthStore();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  
  // Captcha State
  const [captchaText, setCaptchaText] = useState('1AFLO');
  const [demoOTP, setDemoOTP] = useState('123456');
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
      img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64"
    },
    {
      title: "Confidentiality",
      desc: "SBI never asks for confidential information such as PIN or OTP...",
      img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/yp_secure_lock_banner_sbi_thumbnail_64x64_23_11zon"
    },
    {
      title: "Beware of Phishing attacks",
      desc: "Phishing is a fraudulent attempt, usually made through email...",
      img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/fraudawareness2_thumbnail_64x6"
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

  useEffect(() => {
    setCaptchaText(generateRandomCaptcha());
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
    setCaptchaText(generateRandomCaptcha());
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
    setTimeout(() => {
      setSessionToken('session_mock_123');
      setDemoOTP('123456');
      setUserNameGreeting(data.username.toUpperCase() || 'DUMPALA');
      setOtpDigits(['', '', '', '', '', '']);
      setResendTimer(39);
      toast.success('OTP sent to your registered mobile number +91 ***** ***33');
      setStep('otp');
      setLoading(false);
    }, 400);
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

    setLoading(true);
    setTimeout(() => {
      setTokens('mock_access_token', 'mock_refresh_token');
      setUser(MOCK_USER);
      toast.success(`Welcome, ${MOCK_USER.full_name}!`);
      router.push('/dashboard');
      setLoading(false);
    }, 400);
  }

  async function handleDemoLogin() {
    setTokens('mock_access_token', 'mock_refresh_token');
    setUser(MOCK_USER);
    toast.success(`Welcome back, ${MOCK_USER.full_name}!`);
    router.push('/dashboard');
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
                src="/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/new_horz_logo_net_banking_svg" 
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
                    <Link href="/settings" className="optionsWithImage">
                      <div className="sublinks-header-icon"><FileText size={16} /></div>
                      <span>Savings Account</span>
                    </Link>
                    <Link href="/settings" className="optionsWithImage">
                      <div className="sublinks-header-icon"><Building2 size={16} /></div>
                      <span>Current Account</span>
                    </Link>
                    <Link href="/settings" className="optionsWithImage">
                      <div className="sublinks-header-icon"><Lock size={16} /></div>
                      <span>Term Deposits</span>
                    </Link>
                    <Link href="/settings" className="optionsWithImage">
                      <div className="sublinks-header-icon"><Shield size={16} /></div>
                      <span>Update KYC</span>
                    </Link>
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
                    <Link href="/settings" className="optionsWithImage">Personal Loan</Link>
                    <Link href="/settings" className="optionsWithImage">Home Loan</Link>
                    <Link href="/settings" className="optionsWithImage">Gold Loan</Link>
                    <Link href="/settings" className="optionsWithImage">Loan Against Mutual Fund</Link>
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
                    <Link href="/dashboard" className="optionsWithImage">Credit Card</Link>
                    <Link href="/dashboard" className="optionsWithImage">Prepaid Card</Link>
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
                    <Link href="/dashboard" className="optionsWithImage">PPF Account</Link>
                    <Link href="/dashboard" className="optionsWithImage">Demat &amp; Securities</Link>
                    <Link href="/dashboard" className="optionsWithImage">3-in-1 Account</Link>
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
                  onClick={handleDemoLogin} 
                  className="solid-button"
                  aria-label="Register Now"
                >
                  Register Now
                </button>
                <button 
                  type="button" 
                  onClick={handleDemoLogin} 
                  className="non-solid-button"
                  aria-label="Activate Username"
                >
                  Activate Username
                </button>
              </div>

              <div className="text-account">
                Don’t have an account with SBI?{' '}
                <span onClick={handleDemoLogin} className="openNowText cursor-pointer">
                  Open Now
                </span>
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
                      <span onClick={handleDemoLogin} className="link-purple cursor-pointer">
                        Forgot Username?
                      </span>
                    </div>
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
                      <span onClick={handleDemoLogin} className="link-purple cursor-pointer">
                        Forgot Password?
                      </span>
                    </div>
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
                        <span className="captcha-text-styled">{captchaText}</span>
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
                    <span onClick={handleDemoLogin} className="link-purple cursor-pointer">
                      Lock/Unlock User
                    </span>
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

          {/* Quick Demo Access Bar */}
          <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-300 animate-pulse" />
                <span className="font-bold text-sm">Instant Demo Portal (Standalone Offline Mode)</span>
              </div>
              <span className="text-xs text-purple-200">Click below to enter dashboard directly:</span>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full bg-white text-purple-950 font-bold py-3 rounded-xl hover:bg-purple-50 transition-all text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <Play size={16} />
              <span>Enter Logged-in YONO SBI Dashboard (Dumpala Vishnu Vardhan)</span>
            </button>
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

              <div className="mt-2 text-xs font-mono bg-white/20 px-3 py-1.5 rounded-md inline-block text-white font-bold">
                Demo OTP: {demoOTP}
              </div>

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
            <div onClick={handleDemoLogin} className="qa-item">
              <div className="qa-circle">
                <FileText size={24} />
              </div>
              <span className="qa-label">Complaints</span>
            </div>

            <div onClick={handleDemoLogin} className="qa-item">
              <div className="qa-circle">
                <Lock size={24} />
              </div>
              <span className="qa-label">Lock/Unlock User</span>
            </div>

            <div onClick={handleDemoLogin} className="qa-item">
              <div className="qa-circle">
                <Building2 size={24} />
              </div>
              <span className="qa-label">Doorstep Banking</span>
            </div>

            <div onClick={handleDemoLogin} className="qa-item">
              <div className="qa-circle">
                <Phone size={24} />
              </div>
              <span className="qa-label">Contact Us</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= IMPORTANT NOTICES & SECURITY BEST PRACTICES & DO'S AND DON'TS ================= */}
      <div className="containerBox">
        <div className="custom-container container-xxl pt-4">
          
          <aside aria-label="Important Notes & Security Best Practices">
            <div id="ImpNotice" className="pt-4 ImpNotice">
              <div id="impnoticescontainer" className="imp-notices-container mb-4">
                <div className="row">
                  
                  {/* Left Column: Important Notices */}
                  <div className="col-12 col-sm-12 col-md-6 borderCont">
                    <div className="d-flex align-items-baseline mb-3">
                      <div className="col-8">
                        <p className="headTxt">Important Notices</p>
                      </div>
                      <div className="col-md-4 d-flex justify-content-end tabText">
                        <a role="link" aria-label="View All Important Notices" tabIndex={0} onClick={handleDemoLogin}>View All</a>
                      </div>
                    </div>

                    <div className="container-card">
                      <ul>
                        <li className="mt-4 flex items-start gap-3">
                          <img loading="lazy" alt="arrow" className="bullet-arrow" src="/assets/images/registration/bulletArrow.svg" />
                          <p className="imp-notice-txt m-0 pe-4">
                            Customers can now deposit Income Tax/Corporate Taxes using all Bank Debit Cards and Credit Cards under State Bank Payment Gateway.
                          </p>
                        </li>
                        <li className="mt-4 flex items-start gap-3">
                          <img loading="lazy" alt="arrow" className="bullet-arrow" src="/assets/images/registration/bulletArrow.svg" />
                          <p className="imp-notice-txt m-0 pe-4">
                            Call us toll free on 1800 1234 and 1800 2100 and get a wide range of services through SBI Contact Centre.&nbsp;
                          </p>
                        </li>
                        <li className="mt-4 flex items-start gap-3">
                          <img loading="lazy" alt="arrow" className="bullet-arrow" src="/assets/images/registration/bulletArrow.svg" />
                          <p className="imp-notice-txt m-0 pe-4">
                            SBI never asks for your Card/PIN/OTP/CVV details on phone, message or email. Please do not click on links received on your email or mobile asking your Bank/Card details.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Security Best Practices Carousel */}
                  <div className="col-12 col-sm-12 col-md-6 borderContBox">
                    <div className="d-flex align-items-baseline mb-3">
                      <div className="col-8">
                        <p className="headSecurityTxt">Security Best Practices</p>
                      </div>
                      <div className="col-md-4 d-flex justify-content-end tabText">
                        <a role="link" aria-label="View All Security Best Practices" tabIndex={0} onClick={handleDemoLogin}>View All</a>
                      </div>
                    </div>

                    <div className="row">
                      <div className="carousel-container ms-1">
                        <img 
                          loading="lazy" 
                          alt="carousel-arrow" 
                          className="nav-arrow arrow-space cursor-pointer" 
                          src="/assets/images/login/BackwordArrow.svg" 
                          tabIndex={0}
                          onClick={() => setSecuritySlide(prev => (prev - 1 + securityCards.length) % securityCards.length)}
                        />
                        <div className="carousel">
                          <div className="card-box">
                            <div className="card-content">
                              <div className="row mb-2 imageBox">
                                <img 
                                  loading="lazy" 
                                  alt="carousel-img" 
                                  src={securityCards[securitySlide].img} 
                                />
                              </div>
                              <div className="row pt-2">
                                <p className="headingText mt-2">{securityCards[securitySlide].title}</p>
                                <div className="carousel-card-desc row">
                                  <p className="textWrap" title={securityCards[securitySlide].desc}>
                                    {securityCards[securitySlide].desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <img 
                          loading="lazy" 
                          alt="ForwardArrow" 
                          className="nav-arrow cursor-pointer" 
                          src="/assets/images/login/forwardArrow.svg" 
                          tabIndex={0}
                          onClick={() => setSecuritySlide(prev => (prev + 1) % securityCards.length)}
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </aside>

          {/* Do's & Don'ts Section */}
          <aside aria-label="Do's &amp; Don'ts">
            <div>
              <h1 className="headTxt py-3 ms-1">Do&apos;s &amp; Don&apos;ts</h1>
            </div>
            <div className="dos-donts-container px-2">
              <div className="row cardContainerTab">
                
                <div className="col-6 col-md-3 px-2 ps-2 do-card-margin">
                  <div className="do-card d-flex">
                    <div className="container">
                      <div className="row card-boxx">
                        <div className="col-3 d-flex align-item-center do-card-left p-1 p-md-2">
                          <img loading="lazy" alt="img-alt" className="img-fluid" src="/assets/images/login/dosymbol.svg" />
                        </div>
                        <div className="col-9 p-3 px-2 cardBox">
                          <div className="do-card-right p-2">
                            <div className="dos-card-header">Always </div>
                            <span className="dos-card-content">keep your computer free of malware</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 px-2 do-card-margin">
                  <div className="do-card d-flex">
                    <div className="container">
                      <div className="row card-boxx">
                        <div className="col-3 d-flex align-item-center do-card-left p-1 p-md-2">
                          <img loading="lazy" alt="img-alt" className="img-fluid" src="/assets/images/login/dosymbol.svg" />
                        </div>
                        <div className="col-9 p-3 px-2 cardBox">
                          <div className="do-card-right p-2">
                            <div className="dos-card-header">Always </div>
                            <span className="dos-card-content">change your passwords periodically</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 px-2 do-card-margin">
                  <div className="dont-card d-flex">
                    <div className="container">
                      <div className="row">
                        <div className="col-3 d-flex align-item-center dont-card-left p-1 p-md-2">
                          <img loading="lazy" alt="img-alt" className="img-fluid" src="/assets/images/login/dontsymbol.svg" />
                        </div>
                        <div className="col-9 p-3 px-2 cardBox">
                          <div className="do-card-right p-2">
                            <div className="donts-card-header pt-1">Never </div>
                            <span className="donts-card-content">respond to communication seeking your passwords</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-3 px-2 pe-2 do-card-margin">
                  <div className="dont-card d-flex">
                    <div className="container">
                      <div className="row">
                        <div className="col-3 d-flex align-item-center dont-card-left p-1 p-md-2">
                          <img loading="lazy" alt="img-alt" className="img-fluid" src="/assets/images/login/dontsymbol.svg" />
                        </div>
                        <div className="col-9 p-3 px-2 cardBox">
                          <div className="do-card-right p-2">
                            <div className="donts-card-header pt-1">Never </div>
                            <span className="donts-card-content">reveal your passwords or card details to anyone</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ================= LEGAL FOOTER BAR ================= */}
      <footer className="sbi-legal-footer">
        <div className="sbi-legal-footer-links">
          <span onClick={handleDemoLogin} className="sbi-legal-footer-link cursor-pointer">RBI Limited Liability Policy</span>
          <span>|</span>
          <span onClick={handleDemoLogin} className="sbi-legal-footer-link cursor-pointer">Privacy Statement</span>
          <span>|</span>
          <span onClick={handleDemoLogin} className="sbi-legal-footer-link cursor-pointer">Terms of Service (Terms &amp; Conditions)</span>
          <span>|</span>
          <span onClick={handleDemoLogin} className="sbi-legal-footer-link cursor-pointer">Disclosure</span>
        </div>
      </footer>

    </div>
  );
}
