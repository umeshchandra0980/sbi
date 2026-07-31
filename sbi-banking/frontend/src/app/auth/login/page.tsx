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
  const [showNoticesModal, setShowNoticesModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState<'savings' | 'current' | 'term' | 'kyc'>('savings');

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
        <nav className="navbar navbar-expand-lg d-none d-xl-block navbar-sbi animate-fadeIn" aria-label="navbar">
          <div className="container-xxl navbar-sbi-inner flex items-center justify-between max-w-[1400px] mx-auto px-4">
            <div className="bottom-col-left col-auto p-0 col-lg-2 pt-2">
              <Link href="/">
                <img 
                  loading="lazy" 
                  className="header-logo" 
                  src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                  alt="YONOSBILogo" 
                />
              </Link>
            </div>

            <div id="navbarNavDarkDropdown" className="custom-navbar2 collapse navbar-collapse col-lg-8">
              <div className="linksbottom" style={{ display: 'flex', height: '30px', marginLeft: '-76px' }}>
                
                {/* Home Link */}
                <ul className="navbar-nav m-0 p-0 list-none">
                  <div className="linkitem activeBack">
                    <li className="nav-item dropdown relative">
                      <Link href="/" className="nav-link nav-link-sbi active" style={{ padding: '5px 18px 0' }}>
                        Home
                      </Link>
                      <div className="base-line active">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" stroke="#673391" className="base-line-svg"></path>
                        </svg>
                      </div>
                    </li>
                  </div>
                </ul>

                {/* Accounts & Deposits */}
                <ul className="navbar-nav m-0 p-0 list-none">
                  <div className={`linkitem ${activeDropdown === 'accounts' ? 'activeBack' : ''}`}>
                    <li 
                      className="nav-item dropdown relative"
                      onMouseEnter={() => setActiveDropdown('accounts')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'accounts' ? null : 'accounts'); }} 
                        className={`nav-link nav-link-sbi ${activeDropdown === 'accounts' ? 'active' : ''}`}
                        style={{ padding: '5px 18px 0' }}
                      >
                        Accounts &amp; Deposits
                      </a>
                      
                      <div className={`base-line ${activeDropdown === 'accounts' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" stroke="#673391" className="base-line-svg"></path>
                        </svg>
                      </div>

                      {activeDropdown === 'accounts' && (
                        <div className="drawer-dropdown-two-column text-left">
                          <div className="drawer-dropdown-two-column-inner">
                            {/* Left Menu Items Column */}
                            <div className="drawer-left-col">
                              <div 
                                className={`drawer-left-item ${hoveredSubItem === 'savings' ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredSubItem('savings')}
                                onClick={() => setHoveredSubItem('savings')}
                              >
                                <div className="item-icon-text">
                                  <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18">
                                    <rect x="3" y="10" width="18" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 5 L3 10 L21 10 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <circle cx="12" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                  </svg>
                                  <span>Savings Account</span>
                                </div>
                                <ChevronRight size={14} className="chevron-arrow" />
                              </div>

                              <div 
                                className={`drawer-left-item ${hoveredSubItem === 'current' ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredSubItem('current')}
                                onClick={() => setHoveredSubItem('current')}
                              >
                                <div className="item-icon-text">
                                  <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18">
                                    <path d="M3 10 h18 v2 h-18 z" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 4 L3 10 L21 10 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M5 12 v8 h14 v-8" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M1 18 h22" stroke="currentColor" strokeWidth="2"/>
                                  </svg>
                                  <span>Current Account</span>
                                </div>
                                <ChevronRight size={14} className="chevron-arrow" />
                              </div>

                              <div 
                                className={`drawer-left-item ${hoveredSubItem === 'term' ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredSubItem('term')}
                                onClick={() => setHoveredSubItem('term')}
                              >
                                <div className="item-icon-text">
                                  <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18">
                                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 7 v10 M9 10 h6 M9 14 h6" stroke="currentColor" strokeWidth="2"/>
                                  </svg>
                                  <span>Term Deposits</span>
                                </div>
                                <ChevronRight size={14} className="chevron-arrow" />
                              </div>

                              <div 
                                className={`drawer-left-item ${hoveredSubItem === 'kyc' ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredSubItem('kyc')}
                                onClick={() => setHoveredSubItem('kyc')}
                              >
                                <div className="item-icon-text">
                                  <svg className="menu-icon" viewBox="0 0 24 24" width="18" height="18">
                                    <rect x="5" y="2" width="14" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
                                    <circle cx="12" cy="18" r="1.5" fill="currentColor"/>
                                    <path d="M9 5 h6" stroke="currentColor" strokeWidth="2"/>
                                  </svg>
                                  <span>Update KYC</span>
                                </div>
                                <ChevronRight size={14} className="chevron-arrow" />
                              </div>
                            </div>

                            {/* Right Details Column */}
                            <div className="drawer-right-col text-left">
                              {hoveredSubItem === 'savings' && (
                                <div className="drawer-details-content">
                                  <div className="details-header">
                                    <span>Digital Savings Account</span>
                                    <ChevronRight size={14} />
                                  </div>
                                  <ul className="details-bullets">
                                    <li>Effortless, Paperless Account Opening with No Branch Visit Needed.</li>
                                    <li>Conveniently access and manage your account through YONO.</li>
                                  </ul>

                                  <div className="details-header mt-4">
                                    <span>3-in-1 Account</span>
                                    <ChevronRight size={14} />
                                  </div>
                                  <ul className="details-bullets">
                                    <li>Simplify your financial journey with 3-in-1 account opening.</li>
                                    <li>All in one product that provide savings, demat and trading account.</li>
                                  </ul>
                                </div>
                              )}

                              {hoveredSubItem === 'current' && (
                                <div className="drawer-details-content">
                                  <div className="details-header">
                                    <span>Open Now</span>
                                    <ChevronRight size={14} />
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
                                    <span>Fixed Deposits</span>
                                    <ChevronRight size={14} />
                                  </div>
                                  <ul className="details-bullets">
                                    <li>Earn assured returns. Invest in Deposits with us.</li>
                                    <li>Save and earn more with guaranteed returns on FD.</li>
                                  </ul>

                                  <div className="details-header mt-4">
                                    <span>Recurring Deposits</span>
                                    <ChevronRight size={14} />
                                  </div>
                                  <ul className="details-bullets">
                                    <li>Grow your savings securely with our Recurring deposit scheme. Invest a fixed amount for a chosen tenure and earn assured returns with attractive interest rates, ensuring safety and steady growth.</li>
                                  </ul>
                                </div>
                              )}

                              {hoveredSubItem === 'kyc' && (
                                <div className="drawer-details-content">
                                  <div className="details-header">
                                    <span>KYC</span>
                                    <ChevronRight size={14} />
                                  </div>
                                  <ul className="details-bullets">
                                    <li>Keep your KYC details updated to enjoy uninterrupted banking services.</li>
                                    <li>Timely KYC updation helps protect your account and ensures regulatory compliance.</li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="drawer-dropdown-footer">
                            Please register / login to explore more.
                          </div>
                        </div>
                      )}
                    </li>
                  </div>
                </ul>

                {/* Loans */}
                <ul className="navbar-nav m-0 p-0 list-none">
                  <div className={`linkitem ${activeDropdown === 'loans' ? 'activeBack' : ''}`}>
                    <li 
                      className="nav-item dropdown relative"
                      onMouseEnter={() => setActiveDropdown('loans')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'loans' ? null : 'loans'); }} 
                        className={`nav-link nav-link-sbi ${activeDropdown === 'loans' ? 'active' : ''}`}
                        style={{ padding: '5px 18px 0' }}
                      >
                        Loans
                      </a>

                      <div className={`base-line ${activeDropdown === 'loans' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" stroke="#673391" className="base-line-svg"></path>
                        </svg>
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
                  </div>
                </ul>

                {/* Cards */}
                <ul className="navbar-nav m-0 p-0 list-none">
                  <div className={`linkitem ${activeDropdown === 'cards' ? 'activeBack' : ''}`}>
                    <li 
                      className="nav-item dropdown relative"
                      onMouseEnter={() => setActiveDropdown('cards')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'cards' ? null : 'cards'); }} 
                        className={`nav-link nav-link-sbi ${activeDropdown === 'cards' ? 'active' : ''}`}
                        style={{ padding: '5px 18px 0' }}
                      >
                        Cards
                      </a>

                      <div className={`base-line ${activeDropdown === 'cards' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" stroke="#673391" className="base-line-svg"></path>
                        </svg>
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
                  </div>
                </ul>

                {/* Investments */}
                <ul className="navbar-nav m-0 p-0 list-none">
                  <div className={`linkitem ${activeDropdown === 'investments' ? 'activeBack' : ''}`}>
                    <li 
                      className="nav-item dropdown relative"
                      onMouseEnter={() => setActiveDropdown('investments')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'investments' ? null : 'investments'); }} 
                        className={`nav-link nav-link-sbi ${activeDropdown === 'investments' ? 'active' : ''}`}
                        style={{ padding: '5px 18px 0' }}
                      >
                        Investments
                      </a>

                      <div className={`base-line ${activeDropdown === 'investments' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="4" viewBox="0 0 21 4" fill="none">
                          <path d="M1.5 2H19.5" strokeWidth="2.5" strokeLinecap="round" stroke="#673391" className="base-line-svg"></path>
                        </svg>
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
                    <div className="text-start">
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
                    <div className="text-start">
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

            <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <ShieldAlert size={24} />
              </div>
              <span className="qa-label">Report Unauthorized transaction</span>
            </a>

            <a href="https://www.psballiance.com/doorstep-banking.html" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <Building2 size={24} />
              </div>
              <span className="qa-label">Doorstep Banking</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <HelpCircle size={24} />
              </div>
              <span className="qa-label">FAQ</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <Shield size={24} />
              </div>
              <span className="qa-label">Cyber Fraud</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <Keyboard size={24} />
              </div>
              <span className="qa-label">Password Management</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <Lock size={24} />
              </div>
              <span className="qa-label">Security Tips</span>
            </a>

            <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="qa-item">
              <div className="qa-circle">
                <AlertTriangle size={24} />
              </div>
              <span className="qa-label">Report Phishing</span>
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
                      <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); setShowNoticesModal(true); }} aria-label="View All Important Notices">
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
                      <a href="javascript:void(0);" onClick={(e) => { e.preventDefault(); setShowSecurityModal(true); }} aria-label="View All Security Best Practices">
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

    </div>
  );
}
