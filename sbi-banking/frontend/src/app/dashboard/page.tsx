'use client'

import React, { useState, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Eye, EyeOff, Search, Bell, HelpCircle, ChevronRight, ChevronLeft
} from 'lucide-react';
import { MOCK_USER, MOCK_ACCOUNTS } from '@/lib/mockData';
import { RelationshipOverviewCards } from '@/components/banking/RelationshipOverviewCards';
import { QuickFeatureBanners } from '@/components/banking/QuickFeatureBanners';
import './dashboard.css';

export default function DashboardPage() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [paymentsSubTab, setPaymentsSubTab] = useState<'transfer' | 'bills'>('transfer');
  const [hoveredNavTab, setHoveredNavTab] = useState<string | null>(null);
  
  // Banner Carousel State
  const [bannerSlide, setBannerSlide] = useState(0);

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
      
      {/* ================= HEADER (Authentic Multi-Tier Navbar) ================= */}
      <header className="dash-header">
        
        {/* Dark Purple Top Bar */}
        <div className="dash-top-bar">
          <div className="dash-top-bar-inner">
            <div className="dash-top-left-tabs">
              <button type="button" className="dash-top-tab active">
                Banking
              </button>
              <button 
                type="button" 
                className="dash-top-tab"
                onClick={() => router.push('/home/landingPage/lifestyle')}
              >
                Lifestyle
              </button>
              <button type="button" className="dash-top-tab">
                Rewards
              </button>

              <div className="dash-lite-switch">
                <span>YONO Net Banking Lite</span>
                <span className="switch-badge bg-gray-400 text-white">OFF</span>
              </div>
            </div>

            <div className="dash-top-right-info">
              <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white text-xs hover:underline">
                <HelpCircle size={13} />
                Get Help
              </a>
              <span className="helpline-text">
                <b>022-20744646</b> (8AM-8PM) | ynbsupport@sbi.co.in | <b>1800-11-1101</b> (24x7)
              </span>
              <span className="text-xs">English ▾</span>
              <span className="text-xs font-bold cursor-pointer">- A +</span>
              <button type="button" onClick={handleLogout} className="logout-btn-dash">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main White Navbar */}
        <nav className="dash-main-navbar" aria-label="Main Navigation">
          <div className="dash-main-navbar-inner">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img 
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://onlinesbi.sbi.bank.in/sbijava/images/yono_netbanking.png'; }}
                alt="YONO SBI Net-Banking Logo" 
                className="dash-brand-logo"
              />
            </Link>

            <ul className="dash-nav-links relative flex items-center gap-1.5">
              {[
                {
                  id: 'Overview',
                  label: 'Overview',
                  href: '/dashboard',
                  col1Title: 'Quick Overview',
                  col1Items: [
                    { label: 'Dashboard Summary', href: '/dashboard', icon: '📊' },
                    { label: 'Relationship Overview', href: '/dashboard', icon: '🏦' },
                    { label: 'Recent Activity', href: '/dashboard', icon: '⏱' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'View Profile', href: '/profile', icon: '👤' },
                    { label: 'Settings', href: '/settings', icon: '⚙' },
                  ]
                },
                {
                  id: 'Accounts',
                  label: 'Accounts',
                  href: '/home/landingPage/manageRelationship/transactionAccounts',
                  col1Title: 'Accounts Summary',
                  col1Items: [
                    { label: 'Savings Bank Account', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '🏦' },
                    { label: 'Current Bank Account', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '💼' },
                    { label: 'Apply for New Savings Account', href: '/accounts/open-savings-account', icon: '➕' },
                    { label: 'Request Account Statement', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '📄' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'View All Accounts', href: '/accounts', icon: '👁' },
                    { label: 'Spend Analysis', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '📊' },
                  ]
                },
                {
                  id: 'Payments',
                  label: 'Payments',
                  href: '/transfers',
                  col1Title: 'Fund Transfer',
                  col1Items: [
                    { label: 'Quick Transfer', href: '/transfers', icon: '🔄' },
                    { label: 'Send Money', href: '/transfers', icon: '📲' },
                    { label: 'Manage Payee', href: '/transfers', icon: '👤' },
                    { label: 'Schedule Payments', href: '/transfers', icon: '📅' },
                    { label: 'Send Money Abroad', href: '/transfers', icon: '🔀' },
                    { label: 'Bill Payments', href: '/transfers', icon: '🧾' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'Transaction History', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '⇄' },
                    { label: 'Manage Limits', href: '/settings', icon: '⏲' },
                  ]
                },
                {
                  id: 'Deposits',
                  label: 'Deposits',
                  href: '/home/landingPage/manageRelationship/deposits',
                  col1Title: 'Term & Fixed Deposits',
                  col1Items: [
                    { label: 'Fixed Deposit (FD)', href: '/home/landingPage/manageRelationship/deposits', icon: '📈' },
                    { label: 'Recurring Deposit (RD)', href: '/home/landingPage/manageRelationship/deposits', icon: '🔁' },
                    { label: 'Open Fixed Deposit', href: '/home/landingPage/manageRelationship/deposits', icon: '✨' },
                    { label: 'Deposit Interest Certificate', href: '/home/landingPage/manageRelationship/deposits', icon: '📜' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'Sukanya Samriddhi Scheme', href: '/home/landingPage/manageRelationship/deposits', icon: '💡' },
                    { label: 'Tax Saving Deposits', href: '/home/landingPage/manageRelationship/deposits', icon: '📋' },
                  ]
                },
                {
                  id: 'Loans',
                  label: 'Loans',
                  href: '/home/landingPage/manageRelationship/loans/loans',
                  col1Title: 'Loan Products',
                  col1Items: [
                    { label: 'Home Loan', href: '/home/landingPage/manageRelationship/loans/loans', icon: '🏠' },
                    { label: 'Personal Loan', href: '/home/landingPage/manageRelationship/loans/loans', icon: '👤' },
                    { label: 'Gold Loan', href: '/home/landingPage/manageRelationship/loans/loans', icon: '🥇' },
                    { label: 'Business Loan', href: '/home/landingPage/manageRelationship/loans/loans', icon: '💼' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'Loan Eligibility Calculator', href: '/home/landingPage/manageRelationship/loans/loans', icon: '🧮' },
                    { label: 'Loan Account Statement', href: '/home/landingPage/manageRelationship/loans/loans', icon: '📄' },
                  ]
                },
                {
                  id: 'Cards',
                  label: 'Cards',
                  href: '/cards',
                  col1Title: 'Card Services',
                  col1Items: [
                    { label: 'SBI Credit Cards', href: '/cards', icon: '💳' },
                    { label: 'Debit Card Management', href: '/cards', icon: '🎴' },
                    { label: 'Block / Unblock Card', href: '/cards', icon: '🔒' },
                    { label: 'Generate PIN', href: '/cards', icon: '🔑' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'Card Rewards Points', href: '/cards', icon: '🎁' },
                    { label: 'Manage Card Limits', href: '/cards', icon: '📊' },
                  ]
                },
                {
                  id: 'Investments',
                  label: 'Investments',
                  href: '/home/landingPage/manageRelationship/investments/mutual-fund',
                  col1Title: 'Investment Options',
                  col1Items: [
                    { label: 'Mutual Funds', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '📊' },
                    { label: 'Demat & Securities', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '📈' },
                    { label: 'Public Provident Fund (PPF)', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '🐷' },
                    { label: 'National Pension System (NPS)', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '🛡' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'Apply for IPO', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '🚀' },
                    { label: 'Folio Summary', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '📑' },
                  ]
                },
                {
                  id: 'Insurance',
                  label: 'Insurance',
                  href: '/home/landingPage/manageRelationship/insurance',
                  col1Title: 'Insurance Plans',
                  col1Items: [
                    { label: 'SBI Life Insurance', href: '/home/landingPage/manageRelationship/insurance', icon: '🛡' },
                    { label: 'Health Insurance', href: '/home/landingPage/manageRelationship/insurance', icon: '🏥' },
                    { label: 'Motor Insurance', href: '/home/landingPage/manageRelationship/insurance', icon: '🚗' },
                    { label: 'Link Existing Policy', href: '/home/landingPage/manageRelationship/insurance', icon: '🔗' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'Buy New Policy', href: '/home/landingPage/manageRelationship/insurance', icon: '🛒' },
                    { label: 'Download Policy Document', href: '/home/landingPage/manageRelationship/insurance', icon: '📄' },
                  ]
                },
                {
                  id: 'Services',
                  label: 'Services',
                  href: '/settings',
                  col1Title: 'Service Requests',
                  col1Items: [
                    { label: 'Account Settings', href: '/settings', icon: '⚙' },
                    { label: 'Change Login Password', href: '/settings', icon: '🔑' },
                    { label: 'Update Mobile / KYC', href: '/settings', icon: '📱' },
                    { label: 'Lock / Unlock User Access', href: '/settings', icon: '🛡' },
                  ],
                  col2Title: 'Quick Links',
                  col2Items: [
                    { label: 'Customer Care Support', href: '/settings', icon: '📞' },
                    { label: 'Download Tax Certificates', href: '/settings', icon: '📑' },
                  ]
                }
              ].map((tab) => {
                const isHovered = hoveredNavTab === tab.id;
                const isActive = activeTab === tab.id;

                return (
                  <li 
                    key={tab.id}
                    className="relative"
                    onMouseEnter={() => setHoveredNavTab(tab.id)}
                    onMouseLeave={() => setHoveredNavTab(null)}
                  >
                    <button 
                      type="button" 
                      onClick={() => {
                        setActiveTab(tab.id);
                        router.push(tab.href);
                      }}
                      className={`relative px-4 py-2 text-xs font-bold transition-all rounded-t-xl cursor-pointer ${
                        isHovered || isActive 
                          ? 'bg-[#f4edf9] text-[#673391]' 
                          : 'text-slate-600 hover:text-[#673391] hover:bg-slate-50'
                      }`}
                    >
                      <span>{tab.label}</span>
                      {(isHovered || isActive) && (
                        <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#673391] rounded-full" />
                      )}
                    </button>

                    {/* Mega Dropdown Hover Card (Exact Match to User Image) */}
                    {isHovered && (
                      <div className="absolute top-full left-0 mt-1 w-[460px] bg-[#f8f8fc] rounded-2xl p-5 shadow-2xl border border-purple-100/70 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="grid grid-cols-2 gap-5">
                          
                          {/* Column 1 */}
                          <div>
                            <h4 className="text-xs font-extrabold text-[#30135d] mb-2.5 pb-1.5 border-b border-purple-100">
                              {tab.col1Title}
                            </h4>
                            <div className="space-y-1">
                              {tab.col1Items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-white transition-all group border-b border-slate-100/60"
                                >
                                  <div className="w-7 h-7 rounded-full border border-purple-200 bg-white text-[#673391] flex items-center justify-center text-xs shadow-xs group-hover:scale-110 transition-transform">
                                    {item.icon}
                                  </div>
                                  <span className="text-[11px] font-bold text-slate-800 group-hover:text-[#673391]">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2 */}
                          <div>
                            <h4 className="text-xs font-extrabold text-[#30135d] mb-2.5 pb-1.5 border-b border-purple-100">
                              {tab.col2Title}
                            </h4>
                            <div className="space-y-1">
                              {tab.col2Items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-white transition-all group border-b border-slate-100/60"
                                >
                                  <div className="w-7 h-7 rounded-full border border-purple-200 bg-white text-[#673391] flex items-center justify-center text-xs shadow-xs group-hover:scale-110 transition-transform">
                                    {item.icon}
                                  </div>
                                  <span className="text-[11px] font-bold text-slate-800 group-hover:text-[#673391]">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-4">
              <button type="button" className="text-gray-600 hover:text-purple-900" title="Search">
                <Search size={18} />
              </button>
              <button type="button" className="text-gray-600 hover:text-purple-900 relative" title="Notifications">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </button>
              <Link href="/settings" className="dash-user-profile-badge">
                <div className="dash-user-avatar-circle">{initials}</div>
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

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
                  {[
                    { label: 'Welcome to Yono', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64' },
                    { label: 'Fraud Awareness', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/fraudawareness2_thumbnail_64x6' },
                    { label: 'Tax Related Services', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64' },
                    { label: 'e - Secure Lock', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/yp_secure_lock_banner_sbi_thumbnail_64x64_23_11zon' },
                    { label: 'Sustainability', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sustainibility_thumbnail_64x64' },
                    { label: 'SIP', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64' },
                    { label: 'Credit Card', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64' },
                    { label: 'Invest Now', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64' },
                  ].map((story, sIdx) => (
                    <div key={sIdx} className="circle-container" onClick={() => toast.success(`Opening ${story.label}`)}>
                      <div className="circle">
                        <img src={story.img} alt={story.label} />
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
                  onViewAllClick={() => router.push('/accounts')}
                />
              </div>

              {/* Quick Feature Banners (Check Credit Score & PFM) */}
              <div className="mb-6">
                <QuickFeatureBanners 
                  onCreditScoreClick={() => toast.success('Checking your Credit Score... CIBIL Score: 785')}
                />
              </div>

              {/* Lower Row Widgets (Payments & Transfers 6-Col + Upcoming Payments 6-Col) */}
              <div className="dash-inner-row">
                
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
                          className={`pt-tab ${paymentsSubTab === 'bills' ? 'active' : ''}`}
                        >
                          <img src="/assets/images/bill_payments/BBPS Logo.svg" alt="BBPS Logo" className="bbps-tag-img" />
                          Bill payments
                        </button>
                      </div>

                      <div className="optionsFT">
                        <div className="iconWithTitle-pt" onClick={() => router.push('/home/landingPage/fund-transfer/quick-transfer/bank-selection')}>
                          <div className="pt-icon-circle">
                            <img src="/assets/images/landing_page/quicktransfer.svg" alt="Quick Transfer" className="w-5 h-5" />
                          </div>
                          <span className="pt-title">Quick Transfer</span>
                          <span className="pt-subTitle">Upto ₹50,000</span>
                        </div>

                        <div className="iconWithTitle-pt" onClick={() => toast.success("Send Money To own/other account")}>
                          <div className="pt-icon-circle">
                            <img src="/assets/images/landing_page/sendmoney.svg" alt="Send Money" className="w-5 h-5" />
                          </div>
                          <span className="pt-title">Send Money</span>
                          <span className="pt-subTitle">To own/other account</span>
                        </div>

                        <div className="iconWithTitle-pt" onClick={() => toast.success("Send Money Abroad")}>
                          <div className="pt-icon-circle">
                            <img src="/assets/images/landing_page/sendmoneyabroad.svg" alt="Send Money Abroad" className="w-5 h-5" />
                          </div>
                          <span className="pt-title">Send Money Abroad</span>
                        </div>

                        <div className="iconWithTitle-pt" onClick={() => toast.success("Schedule Payments")}>
                          <div className="pt-icon-circle">
                            <img src="/assets/images/landing_page/schedulepayments.svg" alt="Schedule Payments" className="w-5 h-5" />
                          </div>
                          <span className="pt-title">Schedule Payments</span>
                        </div>
                      </div>
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
                      <div className="relative w-24 h-20 flex items-center justify-center">
                        <img 
                          src="/assets/images/landing_page/sendmoney.svg" 
                          alt="Transfer Money Illustration" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Payments (Right 6 Columns) */}
                <div className="dash-col-6">
                  <div className="upcoming-payment-container">
                    <h1 className="title-pt w-full text-left">Upcoming Payments</h1>
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
                      <div className="w-28 h-28 mb-2 flex items-center justify-center">
                        <img src="/assets/images/landing_page/IC_Bill_Payment_Schedule.svg" alt="Calendar Schedule" className="w-full h-full object-contain" />
                      </div>
                      <div className="font-extrabold text-slate-900 text-sm">Never Miss Your Payments Now</div>
                      <p className="text-xs text-slate-600 mt-1 mb-4">Track and get reminder for your upcoming Payments</p>
                      <button 
                        type="button" 
                        onClick={() => toast.success("Opening Pay Bills")} 
                        className="pay-bills-btn"
                      >
                        Pay Bills
                      </button>
                    </div>
                  </div>
                </div>

              </div>

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

            {/* RIGHT SIDEBAR COLUMN (4 Columns = 33.33%) */}
            <div className="dash-col-4">
              
              {/* Investments Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Investments</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Mutual Funds")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newmutualfunds.svg" alt="Mutual Funds" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Mutual Funds</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Demat & Securities")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_demat_20acc.svg" alt="Demat Account" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Demat &amp; Securities</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("NPS")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newnps.svg" alt="NPS" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">NPS</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("PPF")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newppf.svg" alt="PPF" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">PPF</span>
                  </div>
                </div>
              </div>

              {/* Loans Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Loans</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Personal Loan")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newpersonalloan.svg" alt="Personal Loan" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Personal Loan</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Loan Against Mutual Fund")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newpersonalloan.svg" alt="Loan Against Mutual Fund" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Loan Against Mutual Fund</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Home Loan")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newhomeloan.svg" alt="Home Loan" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Home Loan</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Gold Loan")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newgoldloan.svg" alt="Gold Loan" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Gold Loan</span>
                  </div>
                </div>
              </div>

              {/* Deposits Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Deposits</h1>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Fixed Deposit")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_fixeddeposit.svg" alt="Fixed Deposit" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Fixed Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Recurring Deposit")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newrecurringdeposit.svg" alt="Recurring Deposit" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Recurring Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Annuity Deposit")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_annuity_20deposit.svg" alt="Annuity Deposit" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Annuity Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Auto Sweep")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_autosweep.svg" alt="Auto Sweep" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Auto Sweep</span>
                  </div>
                </div>
              </div>

              {/* Insurance Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Insurance</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Life Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newlifeinsurance.svg" alt="Life Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Life</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Health Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newhealthinsurance.svg" alt="Health Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Health</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Accident Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newaccidentinsurance.svg" alt="Accident Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Accident</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Motor Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newcarinsurance.svg" alt="Motor Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Motor</span>
                  </div>
                </div>
              </div>

              {/* Cards Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Cards</h1>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => router.push('/cards')}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newcreditcard.svg" alt="Credit Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Credit Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Debit Cards")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newdebitcard.svg" alt="Debit Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Debit Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Forex Cards")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newforexcard.svg" alt="Forex Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Forex Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Prepaid Cards")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ncmc_card.svg" alt="Prepaid Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Prepaid Cards</span>
                  </div>
                </div>
              </div>

              {/* Services Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Services</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Account Related Services")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_app_20experience.svg" alt="Account Related" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Account Related</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Tax Related Services")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_taxrelated.svg" alt="Tax Related" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Tax Related</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Cheque Services")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cheque_services_icon_n.svg" alt="Cheque Services" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Cheque Services</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("e-Secure Lock")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_esecure_20lock.svg" alt="e-Secure Lock" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">e-Secure Lock</span>
                  </div>
                </div>
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

    </div>
  );
}
