'use client'

import React, { useState, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Eye, EyeOff, Search, Bell, HelpCircle, ChevronRight, ChevronLeft,
  Phone, Smartphone, Zap, Car, X
} from 'lucide-react';
import { MOCK_USER, MOCK_ACCOUNTS } from '@/lib/mockData';
import { RelationshipOverviewCards } from '@/components/banking/RelationshipOverviewCards';
import { QuickFeatureBanners } from '@/components/banking/QuickFeatureBanners';
import './dashboard.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function DashboardPage() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [paymentsSubTab, setPaymentsSubTab] = useState<'transfer' | 'bills'>('transfer');
  const [hoveredNavTab, setHoveredNavTab] = useState<string | null>(null);
  
  // Banner Carousel State
  const [bannerSlide, setBannerSlide] = useState(0);
  const [isInsuranceExpanded, setIsInsuranceExpanded] = useState(false);
  const [isLoansExpanded, setIsLoansExpanded] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [isInvestmentsExpanded, setIsInvestmentsExpanded] = useState(false);

  // Instagram Story Modal State
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);

  const storiesList = [
    { 
      id: 1, 
      label: 'Welcome to Yono', 
      logo: '/stories/story1.jpg',
      fullImage: '/stories/story1.jpg',
      subtitle: 'Official Announcement'
    },
    { 
      id: 2, 
      label: 'Fraud Awareness', 
      logo: '/stories/story2.jpg',
      fullImage: '/stories/story2.jpg',
      subtitle: 'Security Tip'
    },
    { 
      id: 3, 
      label: 'Tax Related Services', 
      logo: '/stories/story3.jpg',
      fullImage: '/stories/story3.jpg',
      subtitle: 'Go to Services > Tax Related'
    },
    { 
      id: 4, 
      label: 'e - Secure Lock', 
      logo: '/stories/story4.png',
      fullImage: '/stories/story4.png',
      subtitle: 'Instant Lock / Unlock'
    },
    { 
      id: 5, 
      label: 'Sustainability', 
      logo: '/stories/story5.jpg',
      fullImage: '/stories/story5.jpg',
      subtitle: 'Track Carbon Footprint'
    },
    { 
      id: 6, 
      label: 'SIP', 
      logo: '/stories/story1.jpg',
      fullImage: '/stories/story1.jpg',
      subtitle: 'Smart Investments'
    },
    { 
      id: 7, 
      label: 'Credit Card', 
      logo: '/stories/story2.jpg',
      fullImage: '/stories/story2.jpg',
      subtitle: 'Exclusive SBI Rewards'
    },
    { 
      id: 8, 
      label: 'Invest Now', 
      logo: '/stories/story3.jpg',
      fullImage: '/stories/story3.jpg',
      subtitle: 'Wealth Management'
    },
  ];

  // Animated Progress Loader Timer (5 Seconds Per Story)
  React.useEffect(() => {
    if (activeStoryIndex === null) return;
    setStoryProgress(0);

    const progressInterval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          if (activeStoryIndex < storiesList.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
        return prev + 2; // 50 * 2 = 100% over 5 seconds (5000ms)
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [activeStoryIndex, storiesList.length]);

  const handleNextStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex < storiesList.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setStoryProgress(0);
    } else {
      setActiveStoryIndex(null);
    }
  };

  const handlePrevStory = () => {
    if (activeStoryIndex !== null && activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setStoryProgress(0);
    }
  };

  const bannerImages = [
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/credit_card_web_873x203",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/873_by_203",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/pabl_banner",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/feedback_banner_2_2_873x203"
  ];

  const currentUser = user || MOCK_USER;
  const fullName = currentUser.full_name || 'DUMPALA VISHNU VARDHAN';
  const nameParts = fullName.split(' ');
  const initials = nameParts.map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'DU';

  const primaryAccount = MOCK_ACCOUNTS[0];

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeNav="Overview" />

      {/* ================= MAIN DASHBOARD OVERVIEW BODY (SBI 8-Col / 4-Col Grid) ================= */}
      <main className="dash-body-container">
        <div className="dash-container-xxl">
          <div className="dash-row">
            
            {/* LEFT MAIN COLUMN (8 Columns = 66.66%) */}
            <div className="dash-col-8">
              
              {/* Salutation Greeting & Quick Links Carousel */}
              <div className="salutation-box">
                <div className="salutation-txt-box">
                  Hello <span className="font-extrabold">{fullName.split(' ')[0]}</span>, Let&apos;s get started!
                </div>

                <div className="scroll-container">
                  {storiesList.map((story, sIdx) => (
                    <div key={sIdx} className="circle-container" onClick={() => setActiveStoryIndex(sIdx)}>
                      <div className="circle">
                        <img src={story.logo} alt={story.label} />
                      </div>
                      <p className="storyname">{story.label}</p>
                    </div>
                  ))}

                  <button type="button" className="story-next-btn" aria-label="Next Stories">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Relationship Overview Section */}
              <div className="mb-4">
                <RelationshipOverviewCards
                  combinedBalance={primaryAccount.balance}
                  onViewAllClick={() => router.push('/accounts?view=all')}
                />
              </div>

              {/* Payments & Transfers (Left 6 Columns) + Upcoming Payments (Right 6 Columns) - ABOVE Credit Score */}
              <div className="dash-inner-row mb-6">
                
                {/* Payments & Transfers (Left 6 Columns) */}
                <div className="dash-col-6">
                  <div className="main-container-pt">
                    <div>
                      <h1 className="title-pt">Payments &amp; Transfers</h1>
                      
                      <div className="tabs-conatiner-pt">
                        <button 
                          type="button" 
                          onClick={() => setPaymentsSubTab('transfer')}
                          className={`pt-tab ${paymentsSubTab === 'transfer' ? 'active' : ''}`}
                        >
                          Fund Transfer
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setPaymentsSubTab('bills')}
                          className={`pt-tab ${paymentsSubTab === 'bills' ? 'active' : ''} flex items-center gap-1.5`}
                        >
                          <svg className="w-3.5 h-4 shrink-0" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Vertical left stem */}
                            <rect x="1" y="2" width="2.5" height="16" rx="0.5" fill="#005691" />
                            {/* Top curve */}
                            <path d="M3.5 3.5h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H3.5" stroke="#005691" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Bottom curve */}
                            <path d="M3.5 11.5h5c2.2 0 4 1.8 4 4s-1.8 4-4 4H3.5" stroke="#005691" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Arrow inside top curve */}
                            <path d="M7 6l2.5 1.5L7 9" stroke="#005691" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Arrow inside bottom curve */}
                            <path d="M9 14l-2.5 1.5L9 17" stroke="#005691" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Bill payments</span>
                        </button>
                      </div>

                      {paymentsSubTab === 'transfer' ? (
                        <div className="optionsFT flex items-center justify-start gap-8 py-2 px-2">
                          <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => router.push('/home/landingPage/fund-transfer/quick-transfer/bank-selection')}>
                            <div className="w-11 h-11 flex items-center justify-center text-[#702082] group-hover:scale-105 transition-transform mb-1 shrink-0 bg-transparent">
                              <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 2a10 10 0 0 1 8 4M20 6h-4M20 6V2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 22a10 10 0 0 1-8-4M4 18h4M4 18v4" strokeLinecap="round" strokeLinejoin="round" />
                                <text x="12" y="15.5" fontSize="10" fontWeight="900" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                              </svg>
                            </div>
                            <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">Quick Transfer</span>
                            <span className="pt-subTitle text-[10px] font-normal text-slate-500 text-center leading-tight">Upto ₹50,000</span>
                          </div>

                          <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => toast.success("Send Money To own/other account")}>
                            <div className="w-11 h-11 flex items-center justify-center text-[#702082] group-hover:scale-105 transition-transform mb-1 shrink-0 bg-transparent">
                              <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="7" y="2" width="10" height="20" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 12h5m0 0l-2.5-2.5M19 12l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <text x="12" y="13" fontSize="8" fontWeight="900" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                              </svg>
                            </div>
                            <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">Send Money</span>
                            <span className="pt-subTitle text-[10px] font-normal text-slate-500 text-center leading-tight">To own/other account</span>
                          </div>

                          <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => toast.success("Send Money Abroad")}>
                            <div className="w-11 h-11 flex items-center justify-center text-[#702082] group-hover:scale-105 transition-transform mb-1 shrink-0 bg-transparent">
                              <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="7" strokeDasharray="1.5 1.5" />
                                <ellipse cx="12" cy="12" rx="3" ry="7" strokeDasharray="1.5 1.5" />
                                <line x1="5" y1="12" x2="19" y2="12" strokeDasharray="1.5 1.5" />
                                <path d="M4 10h16M20 10l-3-3M4 14h16M4 14l3 3" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">Send Money Abroad</span>
                          </div>

                          <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => toast.success("Schedule Payments")}>
                            <div className="w-11 h-11 flex items-center justify-center text-[#702082] group-hover:scale-105 transition-transform mb-1 shrink-0 bg-transparent">
                              <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="9" y1="2" x2="9" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="15" y1="2" x2="15" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                                <line x1="4" y1="9" x2="20" y2="9" strokeLinecap="round" strokeLinejoin="round" />
                                <text x="12" y="16.5" fontSize="9" fontWeight="900" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                              </svg>
                            </div>
                            <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">Schedule Payments</span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-2">
                          <div className="optionsFT flex items-center justify-start gap-8 py-2 px-2">
                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => router.push('/home/landingPage/fund-transfer/bill-payments')}>
                              <div className="w-11 h-11 flex items-center justify-center text-[#702082] group-hover:scale-105 transition-transform mb-1 shrink-0">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
                                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                                  <line x1="9" y1="6" x2="15" y2="6" />
                                </svg>
                              </div>
                              <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">Mobile<br />Prepaid</span>
                            </div>

                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => router.push('/home/landingPage/fund-transfer/bill-payments')}>
                              <div className="w-11 h-11 flex items-center justify-center text-[#702082] group-hover:scale-105 transition-transform mb-1 shrink-0">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
                                  <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                                </svg>
                              </div>
                              <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">Mobile<br />Postpaid</span>
                            </div>

                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => router.push('/home/landingPage/fund-transfer/bill-payments')}>
                              <div className="w-11 h-11 flex items-center justify-center text-[#702082] group-hover:scale-105 transition-transform mb-1 shrink-0">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                                  <line x1="9" y1="18" x2="15" y2="18" />
                                  <path d="m11 7 2 3h-3l2 3" stroke="#702082" strokeWidth="1.5" />
                                </svg>
                              </div>
                              <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">Electricity</span>
                            </div>

                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => router.push('/home/landingPage/fund-transfer/bill-payments')}>
                              <div className="w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-transform mb-1 shrink-0">
                                <svg className="w-10 h-6 shrink-0" viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M4 2h42l-4 20H2L4 2z" fill="#009639" />
                                  <path d="M44 2h34l-4 20H40l4-20z" fill="#F26A21" />
                                  <text x="7" y="16" fill="#FFFFFF" fontSize="12" fontWeight="900" fontStyle="italic" fontFamily="sans-serif">FAST</text>
                                  <text x="47" y="16" fill="#FFFFFF" fontSize="12" fontWeight="900" fontStyle="italic" fontFamily="sans-serif">ag</text>
                                </svg>
                              </div>
                              <span className="pt-title text-[11px] font-medium text-slate-800 mt-2 text-center leading-tight">FASTag</span>
                            </div>
                          </div>

                          <div className="flex justify-end pt-1 pe-4">
                            <button 
                              type="button" 
                              onClick={() => router.push('/home/landingPage/fund-transfer/bill-payments')} 
                              className="text-xs font-bold text-[#702082] hover:underline"
                            >
                              View All
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="first-transfer-box">
                      <div className="max-w-[220px]">
                        <p className="text-xs text-slate-700 font-medium leading-relaxed m-0">
                          You&apos;re yet to make your first <span className="font-bold text-slate-900">transfer</span>. Start now with our quick and easy options!
                        </p>
                        <button type="button" onClick={() => router.push('/home/landingPage/fund-transfer/quick-transfer/bank-selection')} className="try-now-button">
                          Try now <ChevronRight size={14} />
                        </button>
                      </div>
                      <div className="relative w-28 h-20 flex items-center justify-center shrink-0">
                        <svg className="w-full h-full" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Baseline */}
                          <line x1="5" y1="80" x2="95" y2="80" stroke="#e2e8f0" strokeWidth="1.5" />
                          
                          {/* Phone in background */}
                          <rect x="25" y="10" width="45" height="70" rx="4" fill="#ebe6f2" stroke="#d8d2e2" strokeWidth="1.5" />
                          <circle cx="47.5" cy="15" r="1.5" fill="#a78bfa" />
                          <rect x="42" y="73" width="11" height="3" rx="1.5" fill="#a78bfa" />

                          {/* Cash bills sticking out of wallet */}
                          <g transform="translate(15, 12)">
                            {/* Bill 1 */}
                            <rect x="20" y="25" width="22" height="32" rx="1" fill="#c7d2fe" transform="rotate(-15 20 25)" stroke="#93c5fd" strokeWidth="0.8" />
                            {/* Bill 2 */}
                            <rect x="35" y="23" width="22" height="32" rx="1" fill="#e0e7ff" transform="rotate(5 35 23)" stroke="#93c5fd" strokeWidth="0.8" />
                            {/* Bill 3 with rupee symbol */}
                            <rect x="42" y="22" width="22" height="32" rx="1" fill="#b4c6fc" transform="rotate(25 42 22)" stroke="#818cf8" strokeWidth="0.8" />
                            <text x="53" y="38" fill="#4f46e5" fontSize="8" fontWeight="bold" transform="rotate(25 53 38)" textAnchor="middle">₹</text>
                          </g>

                          {/* Wallet in foreground */}
                          <rect x="30" y="48" width="55" height="32" rx="3" fill="#3f3d56" stroke="#2c2a3e" strokeWidth="1" />
                          <path d="M30 55h55" stroke="#2c2a3e" strokeWidth="1" />
                          <rect x="70" y="58" width="15" height="10" rx="1.5" fill="#2c2a3e" />
                          <circle cx="74" cy="63" r="1.5" fill="#fbbf24" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Payments (Right 6 Columns) */}
                <div className="dash-col-6">
                  <div className="upcoming-payment-container">
                    <h1 className="title-pt w-full text-left">Upcoming Payments</h1>
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
                      <div className="w-32 h-28 mb-2 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* Baseline */}
                          <line x1="5" y1="78" x2="105" y2="78" stroke="#cbd5e1" strokeWidth="1" />
                          
                          {/* Phone in background */}
                          <rect x="35" y="8" width="40" height="70" rx="4" fill="#f1eef6" stroke="#e2dbe8" strokeWidth="1" />
                          <circle cx="55" cy="38" r="8" fill="#d1fae5" />
                          <path d="M52.5 38l1.5 1.5 3.5-3.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                          {/* Roll of paper bill sheets on left */}
                          <path d="M18 78v-20c0-2 2-4 4-4h8v24h-12z" fill="#cbd5e1" />
                          <path d="M22 74h8M22 70h8M22 66h8" stroke="#94a3b8" strokeWidth="0.8" />
                          <path d="M12 78v-6c0-2 2-3 4-3h14v9h-18z" fill="#e2e8f0" />
                          <circle cx="28" cy="74" r="1.5" fill="#94a3b8" />

                          {/* Calendar in foreground */}
                          {/* Calendar shadow */}
                          <rect x="42" y="27" width="48" height="42" rx="2" fill="#525c99" />
                          <rect x="40" y="29" width="48" height="40" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                          {/* Calendar header */}
                          <path d="M40 31c0-1 1-2 2-2h44c1 0 2 1 2 2v6H40v-6z" fill="#525c99" />
                          {/* Calendar rings */}
                          <path d="M48 25c0-2 2-3 4-3s4 1 4 3" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
                          <path d="M72 25c0-2 2-3 4-3s4 1 4 3" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />

                          {/* Calendar Grid */}
                          {/* Row 1 */}
                          <rect x="45" y="43" width="7" height="6" rx="0.5" fill="#cbd5e1" />
                          <rect x="55" y="43" width="7" height="6" rx="0.5" fill="#cbd5e1" />
                          <rect x="65" y="43" width="7" height="6" rx="0.5" fill="#cbd5e1" />
                          <rect x="75" y="43" width="7" height="6" rx="0.5" fill="#cbd5e1" />
                          {/* Row 2 */}
                          <rect x="45" y="53" width="7" height="6" rx="0.5" fill="#cbd5e1" />
                          <rect x="55" y="53" width="7" height="6" rx="0.5" fill="#cbd5e1" />
                          {/* Active alert date: pink box with checkmark */}
                          <rect x="65" y="52" width="9" height="8" rx="1" fill="#b81d6c" />
                          <path d="M68 56l1 1 2-2" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="77" y="53" width="7" height="6" rx="0.5" fill="#cbd5e1" />

                          {/* Small flower pot on right */}
                          <path d="M91 67l2 11h6l2-11h-10z" fill="#dfafcf" />
                          <path d="M93 67c-1-2 0-4 1-4s2 2 1 4z" fill="#a7f3d0" />
                          <path d="M97 67c1-2 2-4 3-4s1 2-1 4z" fill="#a7f3d0" />
                        </svg>
                      </div>
                      <div className="font-extrabold text-slate-900 text-sm">Never Miss Your Payments Now</div>
                      <p className="text-xs text-slate-600 mt-1 mb-4">Track and get reminder for your upcoming Payments</p>
                      <button 
                        type="button" 
                        onClick={() => router.push('/home/landingPage/fund-transfer/bill-payments')} 
                        className="pay-bills-btn"
                      >
                        Pay Bills
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Quick Feature Banners (Check Credit Score & PFM) + Offer Carousel - BELOW Payments & Transfers */}
              <div className="mb-6 space-y-4">
                <QuickFeatureBanners 
                  onCreditScoreClick={() => toast.success('Checking your Credit Score... CIBIL Score: 785')}
                />

                {/* Promo Banner Carousel (873x203 DOM Exact) */}
                <div className="banner-page-carousel">
                  <img 
                    src={bannerImages[bannerSlide]} 
                    alt="SBI Promo Banner" 
                    className="banner-img-main" 
                  />

                  <div className="carousel-indicators-dots">
                    {bannerImages.map((_, bIdx) => (
                      <span 
                        key={bIdx} 
                        onClick={() => setBannerSlide(bIdx)}
                        className={`dot-indicator ${bannerSlide === bIdx ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR COLUMN (4 Columns = 33.33%) */}
            <div className="dash-col-4 space-y-4">
              
              {/* Pre-Approved offers for you Panel */}
              <div className="rightside-content-box shadow-xs">
                <div className="rightside-header-row mb-4">
                  <h1 className="rightside-title text-slate-800 text-[14.5px] font-bold font-sans">
                    Pre-Approved offers for you
                  </h1>
                </div>
                <div 
                  onClick={() => toast.success("Checking Business Loan Eligibility...")}
                  className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col items-center select-none cursor-pointer hover:bg-slate-50 transition-all"
                >
                  <div className="w-full bg-[#fdf5f7] rounded-xl py-6 flex items-center justify-center mb-3">
                    <svg className="w-16 h-16 text-[#e06287]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="16" y="8" width="32" height="44" rx="4" fill="#fde8ee" stroke="#e06287" strokeWidth="2" />
                      <line x1="24" y1="20" x2="40" y2="20" stroke="#e06287" strokeWidth="2" strokeLinecap="round" />
                      <line x1="24" y1="28" x2="40" y2="28" stroke="#e06287" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="32" cy="40" r="6" fill="#e06287" />
                      <text x="32" y="43" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif">%</text>
                    </svg>
                  </div>
                  <div className="text-[14px] font-bold text-slate-800 text-center font-sans">
                    Business Loan
                  </div>
                  <div className="text-[11px] text-[#681d82] text-center font-medium font-sans mt-2">
                    Click here to check your eligibility.
                  </div>
                </div>
              </div>

              {/* Investments Panel */}
              <div className="rightside-content-box shadow-xs">
                <div className="rightside-header-row">
                  <h1 className="rightside-title text-slate-800 text-[14.5px] font-bold font-sans">Investments</h1>
                  <span 
                    className="viewAll-side text-[#702082] hover:underline font-bold font-sans cursor-pointer" 
                    onClick={() => setIsInvestmentsExpanded(!isInvestmentsExpanded)}
                  >
                    {isInvestmentsExpanded ? 'View Less' : 'View All'}
                  </span>
                </div>

                {isInvestmentsExpanded ? (
                  <div className="rightside-grid">
                    {/* Mutual Funds */}
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path d="M12 6V3M9 4.5c1.5-1.5 3-1.5 3-1.5s0 1.5-1.5 3M12 6c1.5-1.5 3-1.5 3-1.5s0 1.5-1.5 3" />
                          <path d="M12 12v9" />
                          <circle cx="12" cy="15" r="3" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">Mutual Funds</span>
                    </div>

                    {/* Demat & Securities */}
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="7" width="18" height="13" rx="2" />
                          <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                          <path d="M12 12v3" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans font-semibold">Demat &amp;<br />Securities</span>
                    </div>

                    {/* NPS */}
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M9 16V8h4v8" />
                          <path d="M6 18c3 2 9 2 12 0" />
                          <path d="M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                          <path d="M8 8H6" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">NPS</span>
                    </div>

                    {/* PPF */}
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 3v12M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="18" r="3" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">PPF</span>
                    </div>

                    {/* IPO */}
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" />
                          <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
                          <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" />
                          <path d="M3 11l6-6 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">IPO</span>
                    </div>
                  </div>
                ) : (
                  <div className="rightside-grid">
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_mutual_funds.svg" alt="Mutual Funds" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">Mutual Funds</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_demat_account.svg" alt="Demat Account" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans font-semibold">Demat &amp;<br />Securities</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_nps.svg" alt="NPS" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">NPS</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/investments/mutual-fund')}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_ppf.svg" alt="PPF" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">PPF</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Loans Panel */}
              <div className="rightside-content-box shadow-xs">
                <div className="rightside-header-row">
                  <h1 className="rightside-title text-slate-800 text-[14.5px] font-bold font-sans">Loans</h1>
                  <span 
                    className="viewAll-side text-[#702082] hover:underline font-bold font-sans cursor-pointer" 
                    onClick={() => setIsLoansExpanded(!isLoansExpanded)}
                  >
                    {isLoansExpanded ? 'View Less' : 'View All'}
                  </span>
                </div>
                
                {isLoansExpanded ? (
                  <div className="rightside-grid">
                    <div className="rightside-item" onClick={() => toast.success("Personal Loan")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_personal_loan.svg" alt="Personal Loan" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">Personal Loan</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("Loan Against Mutual Fund")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_loan_against_mutual_fund.svg" alt="Loan Against Mutual Fund" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans font-semibold">Loan Against<br />Mutual Fund</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("Home Loan")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_home_loan.svg" alt="Home Loan" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">Home Loan</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("Gold Loan")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_gold_loan.svg" alt="Gold Loan" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">Gold Loan</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("Education Loan Setup")}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" strokeLinecap="round" strokeLinejoin="round" />
                          <text x="12" y="9" fontSize="6" fontWeight="bold" fill="#702082" stroke="none" fontFamily="sans-serif">%</text>
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">Education<br />Loan</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("OD against FD Setup")}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="10" y="11" width="4" height="4" rx="1" fill="#702082" stroke="none" />
                          <path d="M11 11V9a1 1 0 0 1 2 0v2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">OD against FD</span>
                    </div>
                  </div>
                ) : (
                  <div className="rightside-grid">
                    <div className="rightside-item" onClick={() => toast.success("Personal Loan")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_personal_loan.svg" alt="Personal Loan" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">Personal Loan</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("Loan Against Mutual Fund")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_loan_against_mutual_fund.svg" alt="Loan Against Mutual Fund" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans font-semibold">Loan Against<br />Mutual Fund</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("Home Loan")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_home_loan.svg" alt="Home Loan" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">Home Loan</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("Gold Loan")}>
                      <div className="rightside-icon-box">
                        <img src="/images/category-icons/ic_gold_loan.svg" alt="Gold Loan" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="rightside-item-name font-sans">Gold Loan</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Deposits Panel */}
              <div className="rightside-content-box shadow-xs">
                <div className="rightside-header-row">
                  <h1 className="rightside-title text-slate-800 text-[14.5px] font-bold font-sans">Deposits</h1>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => router.push('/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true')}>
                    <div className="rightside-icon-box">
                      <img src="/images/category-icons/ic_fixed_deposit.svg" alt="Fixed Deposit" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="rightside-item-name font-sans">Fixed Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => router.push('/home/landingPage/accounts/deposits/create-fd/recurring-deposit')}>
                    <div className="rightside-icon-box">
                      <img src="/images/category-icons/ic_recurring_deposit.svg" alt="Recurring Deposit" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="rightside-item-name font-sans">Recurring Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => router.push('/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true')}>
                    <div className="rightside-icon-box">
                      <img src="/images/category-icons/ic_annuity_deposit.svg" alt="Annuity Deposit" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="rightside-item-name font-sans">Annuity Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => router.push('/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true')}>
                    <div className="rightside-icon-box">
                      <img src="/images/category-icons/ic_auto_sweep.svg" alt="Auto Sweep" className="w-5 h-5 object-contain" />
                    </div>
                    <span className="rightside-item-name font-sans">Auto Sweep</span>
                  </div>
                </div>
              </div>

              {/* Insurance Panel */}
              <div className="rightside-content-box shadow-xs">
                <div className="rightside-header-row">
                  <h1 className="rightside-title text-slate-800 text-[14.5px] font-bold font-sans">Insurance</h1>
                  <span 
                    className="viewAll-side text-[#702082] hover:underline font-bold font-sans cursor-pointer" 
                    onClick={() => setIsInsuranceExpanded(!isInsuranceExpanded)}
                  >
                    {isInsuranceExpanded ? 'View Less' : 'View All'}
                  </span>
                </div>
                
                {isInsuranceExpanded ? (
                  <div className="w-full flex flex-col items-start mt-2">
                    {/* Life Insurance Sub-section */}
                    <h2 className="text-[12px] font-bold text-[#702082] text-left mt-1 mb-3 font-sans w-full">Life Insurance</h2>
                    <div className="rightside-grid w-full mb-5">
                      <div className="rightside-item" onClick={() => toast.success("Opening Protection Plans")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 12v7a2 2 0 0 0 4 0" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12A9 9 0 0 0 3 12Z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 12h18" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Protection<br />Plans</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Wealth Creation")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 19V5M12 9c3-1.5 5-4 5-4M12 12c-3-1.5-5-4-5-4" strokeLinecap="round" />
                            <circle cx="12" cy="19" r="2" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Wealth<br />Creation</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Savings Plans")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 11h-4a2 2 0 0 0 0 4h4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Savings<br />Plans</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Child Plans")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="7" />
                            <path d="M9 10a1 1 0 0 1 2 0M13 10a1 1 0 0 1 2 0" />
                            <path d="M10 15c.5.5 1.5 1 2 1s1.5-.5 2-1" strokeLinecap="round" />
                            <path d="M12 5a3 3 0 0 1 3 3" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Child<br />Plans</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Retirement Plans")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="5" r="2" />
                            <path d="M9 21v-6c0-1.5 1.5-2.5 3-2.5h1l2 6" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17 12.5V21" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Retirement<br />Plans</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Group Plans")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Group<br />Plans</span>
                      </div>
                    </div>

                    {/* General Insurance Sub-section */}
                    <h2 className="text-[12px] font-bold text-[#702082] text-left mt-1 mb-3 font-sans w-full">General Insurance</h2>
                    <div className="rightside-grid w-full">
                      <div className="rightside-item" onClick={() => toast.success("Opening Health Plans")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 11h2.5l1.5-3 2 6 1.5-3H16" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Health<br />Plans</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Motor Insurance")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.8C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="7.5" cy="16.5" r="2.5" />
                            <circle cx="16.5" cy="16.5" r="2.5" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Motor<br />Insurance</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Travel Insurance")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="5" y="7" width="14" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="9" y1="11" x2="9" y2="15" />
                            <line x1="15" y1="11" x2="15" y2="15" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Travel<br />Insurance</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Accident Insurance")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="5" r="2" />
                            <path d="M9 13v6M15 13v6M6 10h12v3H6z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Accident<br />Insurance</span>
                      </div>

                      <div className="rightside-item" onClick={() => toast.success("Opening Group Plans")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Group<br />Plans</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rightside-grid">
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/insurance/insurance')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">Life</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/insurance/insurance')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6 11h2.5l1.5-3 2 6 1.5-3H16" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">Health</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/insurance/insurance')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="5" r="2" />
                          <path d="M9 13v6M15 13v6M6 10h12v3H6z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">Accident</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/home/landingPage/manageRelationship/insurance/insurance')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.8C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="7.5" cy="16.5" r="2.5" />
                          <circle cx="16.5" cy="16.5" r="2.5" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">Motor</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cards Panel */}
              <div className="rightside-content-box shadow-xs">
                <div className="rightside-header-row">
                  <h1 className="rightside-title text-slate-800 text-[14.5px] font-bold font-sans">Cards</h1>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => router.push('/home/landingPage/creditCards/cc-landing')}>
                    <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                      <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="6" width="18" height="12" rx="2" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <span className="rightside-item-name font-sans">Credit Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => router.push('/home/landingPage/accounts/debit-cards/debit-card-landing')}>
                    <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                      <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="6" width="18" height="12" rx="2" />
                        <rect x="6" y="9" width="3" height="2" rx="0.5" />
                      </svg>
                    </div>
                    <span className="rightside-item-name font-sans">Debit Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => router.push('/home/landingPage/jointVentures/superapps/forex/forex-landing')}>
                    <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                      <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="6" width="18" height="12" rx="2" />
                        <text x="12" y="15" fontSize="8" fontWeight="bold" fill="#702082" stroke="none" textAnchor="middle" fontFamily="sans-serif">$</text>
                      </svg>
                    </div>
                    <span className="rightside-item-name font-sans">Forex Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Opening Prepaid Cards setup")}>
                    <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                      <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="6" width="18" height="12" rx="2" />
                        <path d="M6 13h4M14 13h4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="rightside-item-name font-sans">Prepaid Cards</span>
                  </div>
                </div>
              </div>

              {/* Services Panel */}
              <div className="rightside-content-box shadow-xs">
                <div className="rightside-header-row">
                  <h1 className="rightside-title text-slate-800 text-[14.5px] font-bold font-sans">Services</h1>
                  <span 
                    className="viewAll-side text-[#702082] hover:underline font-bold font-sans cursor-pointer" 
                    onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  >
                    {isServicesExpanded ? 'View Less' : 'View All'}
                  </span>
                </div>

                {isServicesExpanded ? (
                  <div className="w-full flex flex-col items-start mt-2">
                    {/* Quick Services Sub-section */}
                    <h2 className="text-[12px] font-bold text-[#702082] text-left mt-1 mb-3 font-sans w-full">Quick Services</h2>
                    <div className="rightside-grid w-full mb-5">
                      {/* Stop Cheque */}
                      <div className="rightside-item" onClick={() => toast.success("Stop Cheque requested")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="6" width="18" height="12" rx="1" />
                            <line x1="6" y1="12" x2="12" y2="12" />
                            <path d="M14 10v4" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Stop<br />Cheque</span>
                      </div>

                      {/* Block Card */}
                      <div className="rightside-item" onClick={() => toast.success("Block Card requested")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="6" width="18" height="12" rx="2" />
                            <line x1="3" y1="11" x2="21" y2="11" />
                            <line x1="3" y1="3" x2="21" y2="21" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Block<br />Card</span>
                      </div>

                      {/* Report Unauthorized Transactions */}
                      <div className="rightside-item" onClick={() => toast.success("Report Unauthorized Transactions")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Report<br />Unauthorized<br />Transactions</span>
                      </div>

                      {/* e-Secure Lock */}
                      <div className="rightside-item" onClick={() => toast.success("e-Secure Lock activated")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="5" y="11" width="14" height="10" rx="2" />
                            <path d="M12 2a5 5 0 0 0-5 5v4h10V7a5 5 0 0 0-5-5z" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">e-Secure<br />Lock</span>
                      </div>
                    </div>

                    {/* Other Services Sub-section */}
                    <h2 className="text-[12px] font-bold text-[#702082] text-left mt-1 mb-3 font-sans w-full">Other Services</h2>
                    <div className="rightside-grid w-full">
                      {/* Account Related */}
                      <div className="rightside-item" onClick={() => toast.success("Account Related Services")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                            <rect x="10" y="14" width="4" height="7" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Account<br />Related</span>
                      </div>

                      {/* Pension Related */}
                      <div className="rightside-item" onClick={() => toast.success("Pension Related Services")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="6" r="3" />
                            <path d="M12 9v7l-2 4M14 16h-3M16 21v-8l-2-2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Pension<br />Related</span>
                      </div>

                      {/* Tax Related */}
                      <div className="rightside-item" onClick={() => toast.success("Tax Related Services")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <line x1="8" y1="7" x2="16" y2="7" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                            <circle cx="12" cy="17" r="1.5" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Tax<br />Related</span>
                      </div>

                      {/* Cheque Services */}
                      <div className="rightside-item" onClick={() => toast.success("Cheque Services Requested")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="6" width="18" height="12" rx="1" />
                            <line x1="6" y1="12" x2="12" y2="12" />
                            <path d="m14 10 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Cheque<br />Services</span>
                      </div>

                      {/* Doorstep Banking */}
                      <div className="rightside-item" onClick={() => toast.success("Doorstep Banking requested")}>
                        <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        </div>
                        <span className="rightside-item-name font-sans">Doorstep<br />Banking</span>
                      </div>

                      {/* Apply/Manage FASTag */}
                      <div className="rightside-item" onClick={() => toast.success("FASTag Services")}>
                        <div className="rightside-icon-box bg-transparent flex flex-col items-center justify-center text-center w-9 h-9">
                          {/* FASTag orange/green color logo style */}
                          <div className="flex flex-col items-center justify-center text-[7px] font-black tracking-tight leading-none italic font-mono uppercase bg-slate-50 px-1 border border-slate-200 rounded">
                            <span className="text-orange-500">Fas</span>
                            <span className="text-emerald-500">Tag</span>
                          </div>
                        </div>
                        <span className="rightside-item-name font-sans">Apply/Manage<br />FASTag</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rightside-grid">
                    <div className="rightside-item" onClick={() => router.push('/settings')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 21h18M5 21V10l7-5 7 5v11" />
                          <rect x="10" y="14" width="4" height="7" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans font-semibold">Account<br />Related</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/settings')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="4" y="2" width="16" height="20" rx="2" />
                          <line x1="8" y1="7" x2="16" y2="7" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                          <circle cx="12" cy="17" r="1.5" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">Tax Related</span>
                    </div>
                    <div className="rightside-item" onClick={() => router.push('/settings')}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="6" width="18" height="12" rx="1" />
                          <line x1="6" y1="12" x2="12" y2="12" />
                          <path d="m14 10 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans font-semibold">Cheque<br />Services</span>
                    </div>
                    <div className="rightside-item" onClick={() => toast.success("e-Secure Lock activated")}>
                      <div className="rightside-icon-box bg-transparent flex items-center justify-center text-[#702082] w-9 h-9">
                        <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="5" y="11" width="14" height="10" rx="2" />
                          <path d="M12 2a5 5 0 0 0-5 5v4h10V7a5 5 0 0 0-5-5z" />
                        </svg>
                      </div>
                      <span className="rightside-item-name font-sans">e-Secure Lock</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="dash-footer">
        <div className="dash-footer-links">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">Privacy Policy</a>
        </div>
      </footer>

      {/* ================= INSTAGRAM-STYLE STORY VIEWER MODAL ================= */}
      {activeStoryIndex !== null && (
        <div className="insta-story-overlay" onClick={() => setActiveStoryIndex(null)}>
          
          {/* External Left Navigation Arrow (Desktop) */}
          {activeStoryIndex > 0 && (
            <button 
              type="button" 
              className="insta-story-ext-nav insta-story-ext-prev" 
              onClick={(e) => { e.stopPropagation(); handlePrevStory(); }}
              aria-label="Previous Story"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* External Right Navigation Arrow (Desktop) */}
          {activeStoryIndex < storiesList.length - 1 && (
            <button 
              type="button" 
              className="insta-story-ext-nav insta-story-ext-next" 
              onClick={(e) => { e.stopPropagation(); handleNextStory(); }}
              aria-label="Next Story"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Main Story Card (380px x 640px, rounded-2xl) */}
          <div className="insta-story-card" onClick={(e) => e.stopPropagation()}>
            
            {/* White Circular Close Button at Top-Right of Card (Matching Screenshot) */}
            <button 
              type="button" 
              onClick={() => setActiveStoryIndex(null)} 
              className="insta-story-topright-close"
              aria-label="Close Story"
            >
              <X size={20} />
            </button>

            {/* Top Header Row with Single White Line Indicator & Profile */}
            <div className="insta-story-header">
              
              {/* Single White Animated Progress Loader Line for Current Active Story */}
              <div className="insta-story-single-line-container">
                <div 
                  className="insta-story-single-line-fill" 
                  style={{ width: `${storyProgress}%` }}
                />
              </div>

              {/* User Avatar & Title */}
              <div className="insta-story-user-info">
                <img 
                  src={storiesList[activeStoryIndex].logo} 
                  alt={storiesList[activeStoryIndex].label} 
                  className="insta-story-avatar" 
                />
                <div>
                  <div className="insta-story-title">
                    {storiesList[activeStoryIndex].label}
                  </div>
                </div>
              </div>
            </div>

            {/* Click/Touch Navigation Zones */}
            <div className="insta-story-nav-prev" onClick={handlePrevStory} />
            <div className="insta-story-nav-next" onClick={handleNextStory} />

            {/* Story Full Screen Image */}
            <div className="insta-story-image-container">
              <img 
                src={storiesList[activeStoryIndex].fullImage} 
                alt={storiesList[activeStoryIndex].label} 
                className="insta-story-img"
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
