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
  const [showNoticesModal, setShowNoticesModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState<'savings' | 'current' | 'term' | 'kyc'>('savings');

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.navbar-sbi')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

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

  function clearAllStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        loginForm.reset({ username: '', password: '', captcha: '' });
        toast.success('localStorage & sessionStorage cleared!');
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    // Automatically clear localStorage & sessionStorage on mount for clean recording
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
      } catch (err) {
        console.error(err);
      }
    }
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

  function fillDemoCredentials() {
    loginForm.setValue('username', 'dumpala', { shouldValidate: true });
    loginForm.setValue('password', 'SBI@1234', { shouldValidate: true });
    loginForm.setValue('captcha', captchaText, { shouldValidate: true });
    toast.success('Demo credentials filled!');
  }

  function fillDemoOTP() {
    setOtpDigits(['1', '2', '3', '4', '5', '6']);
    toast.success('Demo OTP filled!');
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
            <div className="top-row-left-wrapper">
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
        <nav className="navbar navbar-expand-lg navbar-sbi" aria-label="navbar">
          <div className="container-xxl navbar-sbi-inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%' }}>
            <div className="bottom-col-left col-auto p-0 col-lg-2 pt-2">
              <Link href="/">
                <img loading="lazy" className="header-logo" src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" alt="YONOSBILogo" />
              </Link>
            </div>

            <div id="navbarNavDarkDropdown" className="custom-navbar2">
              <div className="linksbottom">

                {/* Home */}
                <ul className="navbar-nav">
                  <div className={`linkitem ${activeDropdown === null ? 'activeBack' : ''}`}>
                    <li className="nav-item dropdown">
                      <Link 
                        href="/" 
                        onClick={() => setActiveDropdown(null)} 
                        className={`nav-link ${activeDropdown === null ? 'active' : ''}`} 
                        aria-label="Home"
                      >
                        Home
                      </Link>
                      <div className={`base-line ${activeDropdown === null ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" className="base-line-svg"></path>
                        </svg>
                      </div>
                    </li>
                  </div>
                </ul>

                {/* Accounts & Deposits */}
                <ul className="navbar-nav">
                  <div className={`linkitem ${activeDropdown === 'accounts' ? 'activeBack' : ''}`}>
                    <li className="nav-item dropdown">
                      <a 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          setActiveDropdown(activeDropdown === 'accounts' ? null : 'accounts'); 
                        }} 
                        className={`nav-link ${activeDropdown === 'accounts' ? 'active' : ''}`} 
                        aria-label="Accounts &amp; Deposits"
                      >
                        Accounts &amp; Deposits
                      </a>
                      <div className={`base-line ${activeDropdown === 'accounts' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" className="base-line-svg"></path>
                        </svg>
                      </div>
                      {/* Accounts Dropdown - Opened on Click */}
                      <div className={`drawer-dropdown-two-column text-left ${activeDropdown === 'accounts' ? 'open' : ''}`}>
                        <div className="drawer-dropdown-two-column-inner">
                          <div className="drawer-left-col">
                            <div className={`drawer-left-item ${hoveredSubItem === 'savings' ? 'active' : ''}`} onMouseEnter={() => setHoveredSubItem('savings')}>
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18"><rect x="3" y="10" width="18" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 5 L3 10 L21 10 Z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                                <span>Savings Account</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                            <div className={`drawer-left-item ${hoveredSubItem === 'current' ? 'active' : ''}`} onMouseEnter={() => setHoveredSubItem('current')}>
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18"><path d="M3 10 h18 v2 h-18 z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 4 L3 10 L21 10 Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M5 12 v8 h14 v-8" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                                <span>Current Account</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                            <div className={`drawer-left-item ${hoveredSubItem === 'term' ? 'active' : ''}`} onMouseEnter={() => setHoveredSubItem('term')}>
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 7 v10 M9 10 h6 M9 14 h6" stroke="currentColor" strokeWidth="2"/></svg>
                                <span>Term Deposits</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                            <div className={`drawer-left-item ${hoveredSubItem === 'kyc' ? 'active' : ''}`} onMouseEnter={() => setHoveredSubItem('kyc')}>
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18"><rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="18" r="1.5" fill="currentColor"/><path d="M9 5 h6" stroke="currentColor" strokeWidth="2"/></svg>
                                <span>Update KYC</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                          </div>
                          <div className="drawer-right-col text-left">
                            {hoveredSubItem === 'savings' && (<div className="drawer-details-content"><div className="details-header"><span>Digital Savings Account</span><ChevronRight size={14} /></div><ul className="details-bullets"><li>Effortless, Paperless Account Opening with No Branch Visit Needed.</li><li>Conveniently access and manage your account through YONO.</li></ul><div className="details-header mt-4"><span>3-in-1 Account</span><ChevronRight size={14} /></div><ul className="details-bullets"><li>Simplify your financial journey with 3-in-1 account opening.</li></ul></div>)}
                            {hoveredSubItem === 'current' && (<div className="drawer-details-content"><div className="details-header"><span>Open Now</span><ChevronRight size={14} /></div><ul className="details-bullets"><li>Effortless, Paperless Account Opening with No Branch Visit Needed.</li><li>Conveniently access and manage your account through YONO.</li></ul></div>)}
                            {hoveredSubItem === 'term' && (<div className="drawer-details-content"><div className="details-header"><span>Fixed Deposits</span><ChevronRight size={14} /></div><ul className="details-bullets"><li>Earn assured returns. Invest in Deposits with us.</li><li>Save and earn more with guaranteed returns on FD.</li></ul></div>)}
                            {hoveredSubItem === 'kyc' && (<div className="drawer-details-content"><div className="details-header"><span>KYC</span><ChevronRight size={14} /></div><ul className="details-bullets"><li>Keep your KYC details updated to enjoy uninterrupted banking services.</li></ul></div>)}
                          </div>
                        </div>
                        <div className="drawer-dropdown-footer">Please register / login to explore more.</div>
                      </div>
                    </li>
                  </div>
                </ul>

                {/* Loans */}
                <ul className="navbar-nav">
                  <div className={`linkitem ${activeDropdown === 'loans' ? 'activeBack' : ''}`}>
                    <li className="nav-item dropdown">
                      <a 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          setActiveDropdown(activeDropdown === 'loans' ? null : 'loans'); 
                        }} 
                        className={`nav-link ${activeDropdown === 'loans' ? 'active' : ''}`} 
                        aria-label="Loans"
                      >
                        Loans
                      </a>
                      <div className={`base-line ${activeDropdown === 'loans' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" className="base-line-svg"></path>
                        </svg>
                      </div>
                      <div className={`drawer-dropdown ${activeDropdown === 'loans' ? 'open' : ''}`}>
                        <div className="outerDiv col-12">
                          <div className="sublinks-header pt-0">
                            <div className="sublinks-header_list">
                              <div className="optionsWithImage"><span className="menu-text-item">Personal Loan</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">OD against FD</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">Home Loan</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">Gold Loan</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">Loan Against Mutual Fund</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">Education Loan</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-footer">Please register / login to explore more.</div>
                      </div>
                    </li>
                  </div>
                </ul>

                {/* Cards */}
                <ul className="navbar-nav">
                  <div className={`linkitem ${activeDropdown === 'cards' ? 'activeBack' : ''}`}>
                    <li className="nav-item dropdown">
                      <a 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          setActiveDropdown(activeDropdown === 'cards' ? null : 'cards'); 
                        }} 
                        className={`nav-link ${activeDropdown === 'cards' ? 'active' : ''}`} 
                        aria-label="Cards"
                      >
                        Cards
                      </a>
                      <div className={`base-line ${activeDropdown === 'cards' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" className="base-line-svg"></path>
                        </svg>
                      </div>
                      <div className={`drawer-dropdown ${activeDropdown === 'cards' ? 'open' : ''}`}>
                        <div className="outerDiv col-12">
                          <div className="sublinks-header pt-0">
                            <div className="sublinks-header_list">
                              <div className="optionsWithImage"><span className="menu-text-item">Credit Card</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">Prepaid Card</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-footer">Please register / login to explore more.</div>
                      </div>
                    </li>
                  </div>
                </ul>

                {/* Investments */}
                <ul className="navbar-nav">
                  <div className={`linkitem ${activeDropdown === 'investments' ? 'activeBack' : ''}`}>
                    <li className="nav-item dropdown">
                      <a 
                        href="#" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          setActiveDropdown(activeDropdown === 'investments' ? null : 'investments'); 
                        }} 
                        className={`nav-link ${activeDropdown === 'investments' ? 'active' : ''}`} 
                        aria-label="Investments"
                      >
                        Investments
                      </a>
                      <div className={`base-line ${activeDropdown === 'investments' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" className="base-line-svg"></path>
                        </svg>
                      </div>
                      <div className={`drawer-dropdown ${activeDropdown === 'investments' ? 'open' : ''}`}>
                        <div className="outerDiv col-12">
                          <div className="sublinks-header pt-0">
                            <div className="sublinks-header_list">
                              <div className="optionsWithImage"><span className="menu-text-item">PPF Account</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">Demat &amp; Securities</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                              <div className="optionsWithImage"><span className="menu-text-item">3-in-1 Account</span><ChevronRight size={14} className="menu-arrow-icon" /></div>
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-footer">Please register / login to explore more.</div>
                      </div>
                    </li>
                  </div>
                </ul>

              </div>
            </div>
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
              </button>

              <div className="tabcontent">
                
                {/* Demo Credentials & Clear Storage Banner */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 mb-4 text-xs">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-purple-900 flex items-center gap-1.5 text-xs">
                      <Sparkles size={14} className="text-purple-600" /> Demo Credentials
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={clearAllStorage}
                        className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded-md text-[11px] hover:bg-red-200 transition-colors"
                        title="Clear localStorage & sessionStorage"
                      >
                        Clear Storage
                      </button>
                      <button
                        type="button"
                        onClick={fillDemoCredentials}
                        className="bg-purple-700 text-white font-bold px-2.5 py-1 rounded-md text-[11px] hover:bg-purple-800 transition-colors shadow-sm"
                      >
                        Auto-Fill
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700 font-mono text-[11px]">
                    <div>Username: <span className="font-bold text-purple-900">dumpala</span></div>
                    <div>Password: <span className="font-bold text-purple-900">SBI@1234</span></div>
                  </div>
                </div>

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
                    <div className="text-start">
                      <Link href="/auth/activate" className="link-purple" aria-label="Forgot Username">
                        Forgot Username?
                      </Link>
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
                    <div className="text-start">
                      <Link href="/auth/activate" className="link-purple" aria-label="Forgot Password">
                        Forgot Password?
                      </Link>
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

                  <div className="flex justify-end mt-2">
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

              <div className="mt-3 flex items-center justify-between bg-white/20 px-3.5 py-1.5 rounded-lg text-white">
                <span className="text-xs font-mono font-bold">Demo OTP: {demoOTP}</span>
                <button
                  type="button"
                  onClick={fillDemoOTP}
                  className="bg-white text-purple-900 font-bold px-2.5 py-1 rounded-md text-[11px] hover:bg-purple-100 transition-colors shadow-sm"
                >
                  Auto-Fill OTP
                </button>
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
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="Complaints" src="/assets/images/registration/Mate IC_Complaints.svg" />
                </div>
              </div>
              <span className="qa-label">Complaints</span>
            </div>

            <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="Report Unauthorized transaction" src="/assets/images/registration/Mate IC_Report_unauthorized.svg" />
                </div>
              </div>
              <span className="qa-label">Report Unauthorized transaction</span>
            </a>

            <div onClick={handleDemoLogin} className="qa-item">
              <div className="qa-circle">
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="Doorstep Banking" src="/assets/images/registration/Mate IC_Doorstep_banking.svg" />
                </div>
              </div>
              <span className="qa-label">Doorstep Banking</span>
            </div>

            <div onClick={handleDemoLogin} className="qa-item">
              <div className="qa-circle">
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="FAQ" src="/assets/images/registration/Mate IC_FAQ.svg" />
                </div>
              </div>
              <span className="qa-label">FAQ</span>
            </div>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="Cyber Fraud" src="/assets/images/registration/Mate IC_Cyber_fraud.svg" />
                </div>
              </div>
              <span className="qa-label">Cyber Fraud</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="Password Management" src="/assets/images/registration/Mate IC_Password_management.svg" />
                </div>
              </div>
              <span className="qa-label">Password Management</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="Security Tips" src="/assets/images/registration/Mate IC_Security_tips.svg" />
                </div>
              </div>
              <span className="qa-label">Security Tips</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <div className="anchorLink" tabIndex={-1}>
                  <img loading="lazy" alt="Mate IC_Report  phishing" src="/assets/images/registration/Mate IC_Report  phishing.svg" />
                </div>
              </div>
              <span className="qa-label">Report Phishing</span>
            </a>
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
                        <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); setShowNoticesModal(true); }} aria-label="View All Important Notices">
                          View All
                        </a>
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
                        <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); setShowSecurityModal(true); }} aria-label="View All Security Best Practices">
                          View All
                        </a>
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

      {/* ================= MODAL: IMPORTANT NOTICES ================= */}
      {showNoticesModal && (
        <div className="sbi-modal-overlay" onClick={() => setShowNoticesModal(false)}>
          <div className="sbi-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="sbi-modal-header">
              <h3 className="sbi-modal-title">Important Notices</h3>
              <button 
                type="button" 
                onClick={() => setShowNoticesModal(false)} 
                className="sbi-modal-close-btn"
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="sbi-modal-body">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bullet-arrow-circle">
                    <ArrowRight size={14} />
                  </div>
                  <p className="imp-notice-txt m-0 font-semibold text-gray-700">
                    Customers can now deposit Income Tax/Corporate Taxes using all Bank Debit Cards and Credit Cards under State Bank Payment Gateway.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bullet-arrow-circle">
                    <ArrowRight size={14} />
                  </div>
                  <p className="imp-notice-txt m-0 font-semibold text-gray-700">
                    Call us toll free on 1800 1234 and 1800 2100 and get a wide range of services through SBI Contact Centre.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bullet-arrow-circle">
                    <ArrowRight size={14} />
                  </div>
                  <p className="imp-notice-txt m-0 font-semibold text-gray-700">
                    SBI never asks for your Card/PIN/OTP/CVV details on phone, message or email. Please do not click on links received on your email or mobile asking your Bank/Card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: SECURITY BEST PRACTICES ================= */}
      {showSecurityModal && (
        <div className="sbi-modal-overlay" onClick={() => setShowSecurityModal(false)}>
          <div className="sbi-modal-box max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sbi-modal-header">
              <h3 className="sbi-modal-title">Security Best Practices</h3>
              <button 
                type="button" 
                onClick={() => setShowSecurityModal(false)} 
                className="sbi-modal-close-btn"
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="sbi-modal-body modal-scrollable">
              <div className="space-y-6 text-[13px] text-gray-600 pr-2">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1.5">1. Be Vigilant. Be Safe.</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>It is important that you remain informed and vigilant.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1.5">2. Confidentiality</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Any such call can be made only by a fraudster. Please do not share personal info.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1.5">3. Beware of Phishing attacks</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="leading-relaxed">
                      State Bank or any of its representatives never sends you email/SMS or calls you over phone to get your personal information, password, MPIN, Easy Pin, Secure Code or one time SMS (high security) password. Any such e-mail/SMS or phone call is an attempt to fraudulently withdraw money from your account through Internet Banking or Mobile Application. Never respond to such email/SMS or phone call. Please report immediately on report.phishing@sbi.co.in if you receive any such email/SMS or Phone call. Please lock your user access immediately, if you have accidentally revealed your credentials. Lock option is available in the pre-login screens in Internet Banking and Mobile Applications.
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1.5">4. OTP / Secure Code</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Mandatory login password change after 180 days for added security.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1.5">5. Before Login.</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>The address or status bar displays the padlock symbol.</li>
                    <li>Click the padlock to view and verify the security certificate.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1.5">6. Control & security</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>For better control & security of your account, you can Lock or Unlock your YONO Web access through link &ldquo;Lock & Unlock User&rdquo; on this Page.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER BAR ================= */}
      <footer className="footer-copyright-sbi mt-auto">
        <div className="container-xxl max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between items-center px-4 py-2 text-white">
          <div className="copyright-left text-center lg:text-start mb-1 mb-lg-0">
            <p className="p-0 m-0">© State Bank of India (APM Id:Scrv_Tran_564)</p>
          </div>
          <div className="col-12 col-lg-8 text-center text-lg-end">
            <p className="p-0 m-0">Site best viewed at 1280 × 720 resolution in Microsoft Edge 100+, Mozilla 100+, Google Chrome 111+</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
