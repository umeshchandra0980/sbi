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
  const [hoveredLoanItem, setHoveredLoanItem] = useState<'personal' | 'od_fd' | 'home' | 'gold' | 'mutual_fund' | 'education'>('personal');
  const [hoveredCardItem, setHoveredCardItem] = useState<'credit' | 'prepaid'>('credit');
  const [hoveredInvestItem, setHoveredInvestItem] = useState<'ppf' | 'demat' | 'three_in_one'>('ppf');

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.custom-navbar2') && !target.closest('.drawer-dropdown') && !target.closest('.drawer-dropdown-two-column')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
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

  const [capsLock, setCapsLock] = useState(false);

  function handleVkKeyPress(key: string) {
    const current = loginForm.getValues('password') || '';
    if (key === 'BACKSPACE') {
      loginForm.setValue('password', current.slice(0, -1), { shouldValidate: true });
    } else if (key === 'CLEAR') {
      loginForm.setValue('password', '', { shouldValidate: true });
    } else if (key === 'CAPS LOCK') {
      setCapsLock(!capsLock);
    } else {
      const charToInsert = (capsLock && key.length === 1 && /[a-z]/i.test(key)) ? key.toUpperCase() : key;
      loginForm.setValue('password', current + charToInsert, { shouldValidate: true });
    }
  }

  // Accessibility Font Sizing State (A-, A, A+)
  const [fontSizeLevel, setFontSizeLevel] = useState<'small' | 'normal' | 'large'>('normal');

  const keyboardKeysBase = [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'],
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '[', ']', '\\', '/'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', ';', ':', "'", '"'],
    ['CAPS LOCK', 'CLEAR', 'BACKSPACE', '.', '?', ',']
  ];

  const isOtpComplete = otpDigits.every(d => d !== '');

  return (
    <div className={`login-page-wrapper font-scale-${fontSizeLevel}`}>
      
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
                <span 
                  onClick={() => setFontSizeLevel('small')} 
                  className={`header-link top-row-text smallA cursor-pointer ${fontSizeLevel === 'small' ? 'active' : ''}`} 
                  aria-label="A-"
                  title="Decrease font size"
                >
                  A-
                </span>
                <span 
                  onClick={() => setFontSizeLevel('normal')} 
                  className={`header-link top-row-text cursor-pointer ${fontSizeLevel === 'normal' ? 'active' : ''}`} 
                  aria-label="A"
                  title="Reset font size"
                >
                  A
                </span>
                <span 
                  onClick={() => setFontSizeLevel('large')} 
                  className={`header-link top-row-text bigA cursor-pointer ${fontSizeLevel === 'large' ? 'active' : ''}`} 
                  aria-label="A+"
                  title="Increase font size"
                >
                  A+
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="navbar navbar-expand-lg navbar-sbi" aria-label="navbar">
          <div className="container-xxl navbar-sbi-inner" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', width: '100%' }}>
            <div className="bottom-col-left col-auto p-0 col-lg-2 pt-2">
              <Link href="/">
                <img 
                  loading="lazy" 
                  className="header-logo" 
                  src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/yono_logo.svg'; }}
                  alt="YONOSBILogo" 
                />
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
                            <div 
                              className={`drawer-left-item ${hoveredSubItem === 'savings' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredSubItem('savings'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3L2 10h20L12 3z" />
                                </svg>
                                <span>Savings Account</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredSubItem === 'current' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredSubItem('current'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5M12 2L2 7l10 5 10-5 10 5z" />
                                </svg>
                                <span>Current Account</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredSubItem === 'term' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredSubItem('term'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                                <span>Term Deposits</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredSubItem === 'kyc' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredSubItem('kyc'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="5" y="2" width="14" height="20" rx="2" />
                                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
                                </svg>
                                <span>Update KYC</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                          </div>

                          <div className="drawer-right-col text-left">
                            {hoveredSubItem === 'savings' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Digital Savings Account</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Instant Digital Account Opening with Video KYC.</li>
                                  <li>Zero balance facility &amp; attractive interest rates.</li>
                                </ul>
                                <div className="details-header mt-4">
                                  <span>3-in-1 Account</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Simplify your financial journey with 3-in-1 account opening.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredSubItem === 'current' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Open Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Effortless, Paperless Account Opening with No Branch Visit Needed.</li>
                                  <li>Conveniently access and manage your account through YONO.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredSubItem === 'term' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Fixed &amp; Recurring Deposits</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>High-yield interest rates for short &amp; long term tenures.</li>
                                  <li>Instant tax saver FDs &amp; flexible renewal options.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredSubItem === 'kyc' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Re-KYC Online</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Update your KYC details seamlessly online without visiting a branch.</li>
                                  <li>Fast &amp; secure verification to keep services active.</li>
                                </ul>
                              </div>
                            )}
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

                      {/* Loans Dropdown - Opened on Click */}
                      <div className={`drawer-dropdown-two-column text-left ${activeDropdown === 'loans' ? 'open' : ''}`}>
                        <div className="drawer-dropdown-two-column-inner">
                          <div className="drawer-left-col-divided">
                            <div 
                              className={`drawer-left-item ${hoveredLoanItem === 'personal' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredLoanItem('personal'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="12" cy="7" r="4" />
                                  <path d="M5.5 21a8.5 8.5 0 0113 0" />
                                </svg>
                                <span>Personal Loan</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredLoanItem === 'od_fd' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredLoanItem('od_fd'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>OD against FD</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredLoanItem === 'home' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredLoanItem('home'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                  <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                <span>Home Loan</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredLoanItem === 'gold' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredLoanItem('gold'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="2" y="7" width="20" height="14" rx="2" />
                                  <path d="M12 12a3 3 0 100 6 3 3 0 000-6z" />
                                </svg>
                                <span>Gold Loan</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredLoanItem === 'mutual_fund' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredLoanItem('mutual_fund'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                </svg>
                                <span>Loan Against Mutual Fund</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredLoanItem === 'education' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredLoanItem('education'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                                <span>Education Loan</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                          </div>

                          <div className="drawer-right-col text-left">
                            {hoveredLoanItem === 'personal' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Explore More</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Available for customers having Salary Account with us.</li>
                                  <li>Instant credit to your account.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredLoanItem === 'od_fd' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Open Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Instant loan against your Fixed Deposits with SBI.</li>
                                  <li>Flexibility of utilizing the fund by way of overdraft facility.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredLoanItem === 'home' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Explore More</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Make your dream home a reality.</li>
                                  <li>Assurance of largest bank of India for all your worries for your dream home.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredLoanItem === 'gold' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Explore More</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Convenient and speedy processing.</li>
                                  <li>Competitive Interest Rate.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredLoanItem === 'mutual_fund' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Open Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Availability of fund with continuation of returns on investment.</li>
                                  <li>Instant credit of fund.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredLoanItem === 'education' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Explore More</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Avail hassle free education loan through SBI at competitive rates.</li>
                                  <li>Power your path to top-tier education with SBI Education loan through Vidyalakshmi portal.</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="drawer-dropdown-footer">Please register / login to explore more.</div>
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

                      {/* Cards Dropdown - Opened on Click */}
                      <div className={`drawer-dropdown-two-column text-left ${activeDropdown === 'cards' ? 'open' : ''}`}>
                        <div className="drawer-dropdown-two-column-inner">
                          <div className="drawer-left-col-divided">
                            <div 
                              className={`drawer-left-item ${hoveredCardItem === 'credit' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredCardItem('credit'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="2" y="5" width="20" height="14" rx="2" />
                                  <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                                <span>Credit Card</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredCardItem === 'prepaid' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredCardItem('prepaid'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="2" y="5" width="20" height="14" rx="2" />
                                  <line x1="2" y1="10" x2="22" y2="10" />
                                </svg>
                                <span>Prepaid Card</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                          </div>

                          <div className="drawer-right-col text-left">
                            {hoveredCardItem === 'credit' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Apply Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>A seamless, digital-first credit card journey enabling customers to discover, apply, and get approved instantly with minimal effort. End to end credit card issuance and activation in few clicks. All your credit card services, streamlined into one seamless experience.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredCardItem === 'prepaid' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Apply Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Get started instantly and apply for a prepaid card. Issue and manage your card in just a few clicks. Access related services in one place.</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="drawer-dropdown-footer">Please register / login to explore more.</div>
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

                      {/* Investments Dropdown - Opened on Click */}
                      <div className={`drawer-dropdown-two-column text-left ${activeDropdown === 'investments' ? 'open' : ''}`}>
                        <div className="drawer-dropdown-two-column-inner">
                          <div className="drawer-left-col-divided">
                            <div 
                              className={`drawer-left-item ${hoveredInvestItem === 'ppf' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredInvestItem('ppf'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.778-7.778zM15.5 15.5L22 9" />
                                </svg>
                                <span>PPF Account</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredInvestItem === 'demat' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredInvestItem('demat'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="2" y="7" width="20" height="14" rx="2" />
                                </svg>
                                <span>Demat &amp; Securities</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>

                            <div 
                              className={`drawer-left-item ${hoveredInvestItem === 'three_in_one' ? 'active' : ''}`} 
                              onClick={(e) => { e.stopPropagation(); setHoveredInvestItem('three_in_one'); }}
                            >
                              <div className="item-icon-text">
                                <svg className="menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                  <rect x="2" y="7" width="20" height="14" rx="2" />
                                  <circle cx="12" cy="14" r="3" />
                                </svg>
                                <span>3-in-1 Account</span>
                              </div>
                              <ChevronRight size={14} className="chevron-arrow" />
                            </div>
                          </div>

                          <div className="drawer-right-col text-left">
                            {hoveredInvestItem === 'ppf' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Open Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Flexible deposit options between ₹500 to ₹1.5 lakh in a financial year. Government-backed long term investment.</li>
                                  <li>15 year investment with easy extension of 5 years option.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredInvestItem === 'demat' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Open Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Start your seamless digital journey with easy Demat account opening.</li>
                                  <li>Experience a smooth digital journey with hassle-free Demat account opening.</li>
                                </ul>
                              </div>
                            )}

                            {hoveredInvestItem === 'three_in_one' && (
                              <div className="drawer-details-content">
                                <div className="details-header">
                                  <span>Open Now</span>
                                  <ChevronRight size={16} />
                                </div>
                                <ul className="details-bullets">
                                  <li>Simplify your financial journey with 3-in-1 account opening.</li>
                                  <li>All in one product that provide savings, demat and trading account.</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="drawer-dropdown-footer">Please register / login to explore more.</div>
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
            
            {/* Left Hero Section (Matching Console Snippet & Original Website) */}
            <div className="border_hello">
              <div className="col-xs-12 col-md-12 col-lg-8 p-0">
                <h1 className="gradient-heading">
                  <span>Hello!</span>
                </h1>
              </div>
              <p className="header-1">Welcome to the world of YONO SBI</p>
              
              <p className="header-2 mb-0">Are you a new user?</p>
              <p className="paragraph-2">Choose one of the following options if you are a new user</p>

              <div className="row solid-button-container">
                <div className="col-5 custom-sm p-0">
                  <button 
                    type="button" 
                    onClick={handleDemoLogin} 
                    className="solid-button"
                    tabIndex={0}
                    aria-label="Register Now"
                  >
                    Register Now
                  </button>
                </div>
                <div className="col-5 custom-sm p-0">
                  <button 
                    type="button" 
                    onClick={handleDemoLogin} 
                    className="non-solid-button activate-button-set-margin"
                    tabIndex={0}
                    aria-label="Activate Username"
                  >
                    Activate Username
                  </button>
                </div>
              </div>

              <div className="text-account">
                Don’t have an account with SBI?{' '}
                <a onClick={handleDemoLogin} className="openNowText cursor-pointer" tabIndex={0}>
                  Open Now
                </a>
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
                        id="username-input"
                        {...loginForm.register('username')}
                        type="text"
                        maxLength={20}
                        className="mat-mdc-input-element"
                        placeholder=" "
                        autoComplete="username"
                      />
                      <label htmlFor="username-input" className="mat-mdc-floating-label">
                        Username
                      </label>
                    </div>
                    <div className="text-start">
                      <Link href="/auth/activate" className="link-purple" aria-label="Forgot Username">
                        Forgot Username?
                      </Link>
                    </div>
                  </div>

                  {/* Password Field + App Virtual Keyboard (Matching Console Snippet & Original Website) */}
                  <div className="position-relative mb-3">
                    <div className="mat-mdc-form-field">
                      <div className="mat-mdc-text-field-wrapper">
                        <input
                          id="password-input"
                          {...loginForm.register('password')}
                          type={showPassword ? 'text' : 'password'}
                          maxLength={20}
                          className="mat-mdc-input-element"
                          placeholder=" "
                          autoComplete="current-password"
                        />
                        <label htmlFor="password-input" className="mat-mdc-floating-label">
                          Password
                        </label>
                        <div className="mat-mdc-form-field-icon-suffix">
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="iconbtn-eye"
                            title={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff size={18} className="text-slate-800" /> : <Eye size={18} className="text-slate-800" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                            className="iconbtn-keyboard"
                            title="Virtual Keyboard"
                          >
                            <Keyboard size={18} className="text-purple-800" />
                          </button>
                        </div>
                      </div>

                      <div className="text-start">
                        <Link href="/auth/activate" className="link-purple" aria-label="Forgot Password">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>

                    {/* Absolute Popup Virtual Keyboard (Matching Console Code) */}
                    {showVirtualKeyboard && (
                      <div className="absolute-popup">
                        <div className="virtual-keyboard">
                          <table aria-hidden="true">
                            <tbody>
                              <tr>
                                {['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'].map((k) => (
                                  <td key={k}>
                                    <button type="button" id="key" onClick={() => handleVkKeyPress(k)}>{k}</button>
                                  </td>
                                ))}
                              </tr>
                              <tr>
                                {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((k) => (
                                  <td key={k}>
                                    <button type="button" id="key" onClick={() => handleVkKeyPress(k)}>{k}</button>
                                  </td>
                                ))}
                              </tr>
                              <tr>
                                {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|'].map((k) => {
                                  const displayChar = (capsLock && k.length === 1 && /[a-z]/i.test(k)) ? k.toUpperCase() : k;
                                  return (
                                    <td key={k}>
                                      <button type="button" id="key" onClick={() => handleVkKeyPress(k)}>{displayChar}</button>
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr>
                                {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '[', ']', '\\', '/'].map((k) => {
                                  const displayChar = (capsLock && k.length === 1 && /[a-z]/i.test(k)) ? k.toUpperCase() : k;
                                  return (
                                    <td key={k}>
                                      <button type="button" id="key" onClick={() => handleVkKeyPress(k)}>{displayChar}</button>
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr>
                                {['z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', ';', ':', "'", '"'].map((k) => {
                                  const displayChar = (capsLock && k.length === 1 && /[a-z]/i.test(k)) ? k.toUpperCase() : k;
                                  return (
                                    <td key={k}>
                                      <button type="button" id="key" onClick={() => handleVkKeyPress(k)}>{displayChar}</button>
                                    </td>
                                  );
                                })}
                              </tr>
                              <tr>
                                <td colSpan={3}>
                                  <button type="button" id="capslock" className={capsLock ? 'active' : ''} onClick={() => handleVkKeyPress('CAPS LOCK')}>
                                    CAPS LOCK
                                  </button>
                                </td>
                                <td colSpan={3}>
                                  <button type="button" id="clear" onClick={() => handleVkKeyPress('CLEAR')}>
                                    CLEAR
                                  </button>
                                </td>
                                <td colSpan={4}>
                                  <button type="button" id="backspace" onClick={() => handleVkKeyPress('BACKSPACE')}>
                                    BACKSPACE
                                  </button>
                                </td>
                                <td>
                                  <button type="button" id="key" onClick={() => handleVkKeyPress('.')}>.</button>
                                </td>
                                <td>
                                  <button type="button" id="key" onClick={() => handleVkKeyPress('?')}>?</button>
                                </td>
                                <td>
                                  <button type="button" id="key" onClick={() => handleVkKeyPress(',')}>,</button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Captcha Field (Matching Image 1) */}
                  <div className="captcha-field-row">
                    <div className="captcha-input-container">
                      <input
                        id="captcha-input"
                        {...loginForm.register('captcha')}
                        type="text"
                        maxLength={5}
                        className="mat-mdc-input-element"
                        placeholder=" "
                      />
                      <label htmlFor="captcha-input" className="mat-mdc-floating-label">
                        Enter Captcha
                      </label>
                    </div>

                    <div className="captcha-controls-wrapper">
                      <div className="captcha-box">
                        <span className="captcha-text-styled">{captchaText}</span>
                      </div>
                      <div className="audio-refresh-buttons">
                        <button
                          type="button"
                          onClick={playAudioCaptcha}
                          className="iconbtn-captcha"
                          title="Audio Captcha"
                        >
                          <Volume2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          className="iconbtn-captcha"
                          title="Refresh Captcha"
                        >
                          <RotateCw size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Login Button */}
                  <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={`login-button-pill ${isFormValid && !loading ? 'active' : 'disabled'}`}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                  <div className="flex justify-end mt-2 mb-1">
                    <a href="https://retail.sbi.bank.in" className="link-purple">
                      Lock/Unlock User
                    </a>
                  </div>
                </form>

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ================= AUTHENTIC YONO SBI OTP SIDE DRAWER PANEL (Matching User Screenshot & HTML) ================= */}
      {step === 'otp' && (
        <div className="sbi-otp-overlay">
          <div className="sbi-otp-drawer-panel">
            
            {/* Header section */}
            <div className="otp-header">
              <div className="sbi-otp-header">
                <div>
                  <h5 className="mpinHeader">Hi {userNameGreeting}</h5>
                  <p id="dialogue_heading" className="subheading mpinSubHeader">
                    <span>An OTP has been sent to your registered mobile number +91 ***** ***77</span>
                  </p>
                </div>
                <div className="close-btn">
                  <button 
                    type="button" 
                    onClick={() => setStep('login')}
                    className="sbi-otp-close-btn"
                    aria-label="CloseDialogue"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Section: Demo Helper & MPIN / OTP Inputs */}
            <div className="mpin-section">
              {/* Demo Helper Badge */}
              <div className="mb-4 flex items-center justify-between bg-white/20 px-3 py-1.5 rounded-lg text-white">
                <span className="text-xs font-mono font-bold">Demo OTP: {demoOTP}</span>
                <button
                  type="button"
                  onClick={fillDemoOTP}
                  className="bg-white text-purple-900 font-bold px-2 py-0.5 rounded text-[11px] hover:bg-purple-100 transition-colors shadow-sm"
                >
                  Auto-Fill OTP
                </button>
              </div>

              {/* Digits Input Row */}
              <div className="sbi-otp-inputs-wrapper">
                <div className="sbi-otp-digit-row">
                  <div className="sbi-otp-digit-inputs">
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
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => setShowOtpText(!showOtpText)}
                    className="sbi-otp-eye-btn"
                    title={showOtpText ? "Hide OTP" : "Show OTP"}
                  >
                    {showOtpText ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Resend OTP Row */}
                <div className="sbi-otp-timer-row">
                  {resendTimer > 0 ? (
                    <>
                      <span className="opacity-80">Resend OTP</span>
                      <span className="font-bold ml-1">{resendTimer}s</span>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setResendTimer(39);
                        toast.success('New OTP sent to +91 ***** ***77');
                      }}
                      className="sbi-otp-resend-btn"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="submitOtp">
              <button
                type="button"
                onClick={handleOtpSubmit}
                disabled={!isOtpComplete || loading}
                className={`sbi-otp-proceed-btn ${isOtpComplete && !loading ? 'active' : 'disabled'}`}
                style={{ borderRadius: '40px' }}
              >
                {loading ? 'Verifying...' : 'Proceed'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= QUICK ACTIONS SECTION (Matching Console Snippet & Original Website) ================= */}
      <div className="quick-actions-bg">
        <div className="quckatn-Content">
          <div className="row">
            <div>
              <h1 className="header-titleClr">Quick Actions</h1>
            </div>
          </div>
          <div className="qa-container">
            
            {/* Complaints */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink" tabIndex={-1}>
                    <img loading="lazy" alt="Complaints" className="qa-options" src="/images/quick-actions/ic_complaints.png" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" onClick={handleDemoLogin} className="anchorLink card-link-purple cursor-pointer" tabIndex={0}>Complaints</a>
              </div>
            </div>

            {/* Report Unauthorized transaction */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink" tabIndex={-1}>
                    <img loading="lazy" alt="Report Unauthorized transaction" className="qa-options" src="/images/quick-actions/ic_report_unauthorized.svg" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="anchorLink card-link-purple" tabIndex={0}>Report Unauthorized transaction</a>
              </div>
            </div>

            {/* Doorstep Banking */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink" tabIndex={-1}>
                    <img loading="lazy" alt="Doorstep Banking" className="qa-options" src="/images/quick-actions/ic_doorstep_banking.svg" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" onClick={handleDemoLogin} className="anchorLink card-link-purple cursor-pointer" tabIndex={0}>Doorstep Banking</a>
              </div>
            </div>

            {/* FAQ */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink card-link-purple" tabIndex={-1}>
                    <img loading="lazy" alt="FAQ" className="qa-options" src="/images/quick-actions/ic_faqs.svg" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" onClick={handleDemoLogin} className="anchorLink card-link-purple cursor-pointer" tabIndex={0}>FAQ</a>
              </div>
            </div>

            {/* Cyber Fraud */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink" tabIndex={-1}>
                    <img loading="lazy" alt="Cyber Fraud" className="qa-options" src="/images/quick-actions/ic_cyber_fraud.svg" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="anchorLink card-link-purple" tabIndex={0}>Cyber Fraud</a>
              </div>
            </div>

            {/* Password Management */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink" tabIndex={-1}>
                    <img loading="lazy" alt="Password Management" className="qa-options" src="/images/quick-actions/ic_password_management.svg" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="anchorLink card-link-purple" tabIndex={0}>Password Management</a>
              </div>
            </div>

            {/* Security Tips */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink" tabIndex={-1}>
                    <img loading="lazy" alt="Security Tips" className="qa-options" src="/images/quick-actions/ic_security_tips.svg" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="anchorLink card-link-purple" tabIndex={0}>Security Tips</a>
              </div>
            </div>

            {/* Report Phishing */}
            <div className="optionsQAspace">
              <div className="manageImageCenter">
                <div className="qa-circle">
                  <div className="anchorLink" tabIndex={-1}>
                    <img loading="lazy" alt="Report Phishing" className="qa-options" src="/images/quick-actions/ic_report_phishing.svg" />
                  </div>
                </div>
              </div>
              <div className="qa-text">
                <a role="link" href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="anchorLink card-link-purple" tabIndex={0}>Report Phishing</a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= IMPORTANT NOTICES & SECURITY BEST PRACTICES & DO'S AND DON'TS ================= */}
      <div className="containerBox" style={{ backgroundColor: '#E5E5F2', padding: '80px 0' }}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          
          <aside aria-label="Important Notes & Security Best Practices">
            <div id="ImpNotice" className="ImpNotice">
              <div id="impnoticescontainer" className="imp-notices-container mb-[48px]" style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] items-stretch">
                  
                  {/* Left Column: Important Notices */}
                  <div className="borderCont lg:pr-[24px]">
                    <div className="flex justify-between items-center mb-[24px]">
                      <h2 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: '1.5em', lineHeight: '32px', color: '#673391', margin: 0 }}>Important Notices</h2>
                      <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); setShowNoticesModal(true); }} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#673391', textDecoration: 'none' }} className="hover:underline" aria-label="View All Important Notices">
                        View All
                      </a>
                    </div>

                    <div className="container-card">
                      <ul className="m-0 p-0 list-none space-y-[24px]">
                        <li className="flex items-center gap-[16px]">
                          <img src="/images/notices-security/bullet_arrow.svg" alt="" className="w-[20px] h-[20px] flex-shrink-0" />
                          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#646464', margin: 0 }}>
                            Customers can now deposit Income Tax/Corporate Taxes using all Bank Debit Cards and Credit Cards under State Bank Payment Gateway.
                          </p>
                        </li>
                        <li className="flex items-center gap-[16px]">
                          <img src="/images/notices-security/bullet_arrow.svg" alt="" className="w-[20px] h-[20px] flex-shrink-0" />
                          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#646464', margin: 0 }}>
                            Call us toll free on 1800 1234 and 1800 2100 and get a wide range of services through SBI Contact Centre.
                          </p>
                        </li>
                        <li className="flex items-center gap-[16px]">
                          <img src="/images/notices-security/bullet_arrow.svg" alt="" className="w-[20px] h-[20px] flex-shrink-0" />
                          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#646464', margin: 0 }}>
                            SBI never asks for your Card/PIN/OTP/CVV details on phone, message or email. Please do not click on links received on your email or mobile asking your Bank/Card details.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Security Best Practices (Carousel with Snapping) */}
                  <div className="borderContBox lg:pl-[24px]">
                    <div className="flex justify-between items-center mb-[24px]">
                      <h2 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: '1.5em', lineHeight: '32px', color: '#673391', margin: 0 }}>Security Best Practices</h2>
                      <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); setShowSecurityModal(true); }} style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, fontSize: '16px', color: '#673391', textDecoration: 'none' }} className="hover:underline" aria-label="View All Security Best Practices">
                        View All
                      </a>
                    </div>

                    <div className="flex items-center gap-[12px]">
                      <button 
                        type="button" 
                        className="cursor-pointer transition-transform hover:scale-110 flex-shrink-0 border-none bg-transparent p-0"
                        onClick={() => {
                          const container = document.getElementById('sec-carousel-container');
                          if (container) container.scrollBy({ left: -280, behavior: 'smooth' });
                        }}
                        title="Previous"
                      >
                        <img src="/images/notices-security/backward_arrow.svg" alt="Previous" className="w-[32px] h-[32px]" />
                      </button>

                      {/* Horizontal Carousel with Smooth Snap Scrolling */}
                      <div id="sec-carousel-container" className="flex gap-[20px] overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none flex-1">
                        <div onClick={() => setShowSecurityModal(true)} className="w-[260px] flex-shrink-0 snap-start bg-white rounded-[16px] p-[20px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col justify-between">
                          <div className="w-full h-[120px] mb-[20px] flex items-center justify-center overflow-hidden rounded-[12px] bg-slate-50">
                            <img src="/images/notices-security/best_practices_be_vigilent_be_safe.svg" alt="Be Vigilant. Be Safe." className="h-full w-auto object-contain" />
                          </div>
                          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '16px', color: '#313131', marginBottom: '8px' }}>Be Vigilant. Be Safe.</h3>
                          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#646464', margin: 0 }}>While the bank will make every effort to ensure your safety...</p>
                        </div>

                        <div onClick={() => setShowSecurityModal(true)} className="w-[260px] flex-shrink-0 snap-start bg-white rounded-[16px] p-[20px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col justify-between">
                          <div className="w-full h-[120px] mb-[20px] flex items-center justify-center overflow-hidden rounded-[12px] bg-slate-50">
                            <img src="/images/notices-security/best_practices_confedentiality.svg" alt="Confidentiality" className="h-full w-auto object-contain" />
                          </div>
                          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '16px', color: '#313131', marginBottom: '8px' }}>Confidentiality</h3>
                          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#646464', margin: 0 }}>SBI never asks for confidential information such as PIN or OTP...</p>
                        </div>

                        <div onClick={() => setShowSecurityModal(true)} className="w-[260px] flex-shrink-0 snap-start bg-white rounded-[16px] p-[20px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col justify-between">
                          <div className="w-full h-[120px] mb-[20px] flex items-center justify-center overflow-hidden rounded-[12px] bg-slate-50">
                            <img src="/images/notices-security/best_practices_beware_of_phishing.svg" alt="Beware of Phishing" className="h-full w-auto object-contain" />
                          </div>
                          <h3 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '16px', color: '#313131', marginBottom: '8px' }}>Beware of Phishing</h3>
                          <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '22px', color: '#646464', margin: 0 }}>Phishing is a fraudulent attempt made usually through email...</p>
                        </div>
                      </div>

                      <button 
                        type="button" 
                        className="cursor-pointer transition-transform hover:scale-110 flex-shrink-0 border-none bg-transparent p-0"
                        onClick={() => {
                          const container = document.getElementById('sec-carousel-container');
                          if (container) container.scrollBy({ left: 280, behavior: 'smooth' });
                        }}
                        title="Next"
                      >
                        <img src="/images/notices-security/forward_arrow.svg" alt="Next" className="w-[32px] h-[32px]" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </aside>

          {/* Section 2: Do's & Don'ts (Bootstrap Grid col-6 col-md-3 Pixel-Perfect Clone) */}
          <aside aria-label="Do's &amp; Don'ts">
            <div>
              <h1 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 600, fontSize: '1.5em', lineHeight: '32px', color: '#673391', marginBottom: '24px' }}>
                Do&apos;s &amp; Don&apos;ts
              </h1>
            </div>
            <div className="dos-donts-container">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
                
                {/* Do Card 1 */}
                <div className="h-full w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div className="flex items-center h-full">
                    <div className="w-[25%] flex justify-center items-center flex-shrink-0">
                      <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center" style={{ backgroundColor: '#EAF7E7' }}>
                        <img src="https://yonoretail.sbi.bank.in/assets/images/login/dosymbol.svg" alt="Do" className="w-[42px] h-[42px] object-contain" />
                      </div>
                    </div>
                    <div className="w-[75%] pl-[14px]">
                      <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '18px', color: '#51A037', marginBottom: '2px' }}>Always</div>
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '22px', color: '#313131', margin: 0 }}>keep your computer free of malware</p>
                    </div>
                  </div>
                </div>

                {/* Do Card 2 */}
                <div className="h-full w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div className="flex items-center h-full">
                    <div className="w-[25%] flex justify-center items-center flex-shrink-0">
                      <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center" style={{ backgroundColor: '#EAF7E7' }}>
                        <img src="https://yonoretail.sbi.bank.in/assets/images/login/dosymbol.svg" alt="Do" className="w-[42px] h-[42px] object-contain" />
                      </div>
                    </div>
                    <div className="w-[75%] pl-[14px]">
                      <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '18px', color: '#51A037', marginBottom: '2px' }}>Always</div>
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '22px', color: '#313131', margin: 0 }}>change your passwords periodically</p>
                    </div>
                  </div>
                </div>

                {/* Don't Card 1 */}
                <div className="h-full w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div className="flex items-center h-full">
                    <div className="w-[25%] flex justify-center items-center flex-shrink-0">
                      <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDE8E9' }}>
                        <img src="https://yonoretail.sbi.bank.in/assets/images/login/dontsymbol.svg" alt="Don't" className="w-[42px] h-[42px] object-contain" />
                      </div>
                    </div>
                    <div className="w-[75%] pl-[14px]">
                      <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '18px', color: '#ED1C24', marginBottom: '2px' }}>Never</div>
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '22px', color: '#313131', margin: 0 }}>respond to communication seeking passwords</p>
                    </div>
                  </div>
                </div>

                {/* Don't Card 2 */}
                <div className="h-full w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                  <div className="flex items-center h-full">
                    <div className="w-[25%] flex justify-center items-center flex-shrink-0">
                      <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDE8E9' }}>
                        <img src="https://yonoretail.sbi.bank.in/assets/images/login/dontsymbol.svg" alt="Don't" className="w-[42px] h-[42px] object-contain" />
                      </div>
                    </div>
                    <div className="w-[75%] pl-[14px]">
                      <div style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, fontSize: '18px', color: '#ED1C24', marginBottom: '2px' }}>Never</div>
                      <p style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 400, fontSize: '15px', lineHeight: '22px', color: '#313131', margin: 0 }}>reveal passwords or card details to anyone</p>
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

      {/* ================= FOOTER BAR WITH CSS SPRITE SOCIAL ICONS ================= */}
      <footer className="footer-copyright-sbi mt-auto py-3">
        <div className="container-xxl max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
          <div className="copyright-left text-center md:text-start">
            <p className="p-0 m-0">© State Bank of India (APM Id:Scrv_Tran_564)</p>
          </div>
          
          {/* Social Icons using CSS Sprite */}
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" aria-label="Facebook">
              <span className="social-icon facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter / X" aria-label="Twitter">
              <span className="social-icon twitter" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" aria-label="YouTube">
              <span className="social-icon youtube" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
              <span className="social-icon linkedin" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
              <span className="social-icon instagram" />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" title="Pinterest" aria-label="Pinterest">
              <span className="social-icon pinterest" />
            </a>
            <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" title="Contact Us" aria-label="Contact Us">
              <span className="social-icon contact" />
            </a>
            <a href="https://api.whatsapp.com" target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
              <span className="social-icon whatsapp" />
            </a>
          </div>

          <div className="text-center md:text-end">
            <p className="p-0 m-0">Site best viewed at 1280 × 720 resolution in Microsoft Edge 100+, Mozilla 100+, Google Chrome 111+</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
