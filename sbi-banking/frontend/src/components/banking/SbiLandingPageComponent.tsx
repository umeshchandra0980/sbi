'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Search,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Bell,
  Home,
  Shield,
  FileText,
  PlusCircle,
  LogOut,
  ShoppingBag,
  Gift,
  AlertTriangle,
  FolderX,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import './SbiLandingPageComponent.css';

interface SbiLandingPageComponentProps {
  initialTab?: 'Transaction' | 'Deposits' | 'Loans' | 'Investments' | 'Insurance';
  initialInvestmentSubTab?: 'Mutual Fund' | 'Demat & Securities' | 'PPF' | 'NPS' | 'IPO';
}

export default function SbiLandingPageComponent({
  initialTab = 'Deposits',
  initialInvestmentSubTab = 'Mutual Fund'
}: SbiLandingPageComponentProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Tab State
  const [activeTab, setActiveTab] = useState<'Transaction' | 'Deposits' | 'Loans' | 'Investments' | 'Insurance'>(initialTab);
  const [investmentSubTab, setInvestmentSubTab] = useState<'Mutual Fund' | 'Demat & Securities' | 'PPF' | 'NPS' | 'IPO'>(initialInvestmentSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [othersOpen, setOthersOpen] = useState(true);
  const [liteMode, setLiteMode] = useState(false);

  // Sync tab with pathname if user navigates via direct URLs
  useEffect(() => {
    if (!pathname) return;
    if (pathname.includes('/loans')) {
      setActiveTab('Loans');
    } else if (pathname.includes('/investments')) {
      setActiveTab('Investments');
      if (pathname.includes('/mutual-fund')) setInvestmentSubTab('Mutual Fund');
    } else if (pathname.includes('/insurance')) {
      setActiveTab('Insurance');
    } else if (pathname.includes('/deposits')) {
      setActiveTab('Deposits');
    } else if (pathname.includes('/transaction')) {
      setActiveTab('Transaction');
    }
  }, [pathname]);

  const handleTabChange = (tab: 'Transaction' | 'Deposits' | 'Loans' | 'Investments' | 'Insurance') => {
    setActiveTab(tab);
    let targetPath = '/home/landingPage/manageRelationship/';
    switch (tab) {
      case 'Deposits':
        targetPath += 'deposits';
        break;
      case 'Loans':
        targetPath += 'loans/loans';
        break;
      case 'Investments':
        targetPath += 'investments/mutual-fund';
        break;
      case 'Insurance':
        targetPath += 'insurance';
        break;
      case 'Transaction':
        targetPath += 'transaction-accounts';
        break;
    }
    router.push(targetPath, { scroll: false });
  };

  return (
    <div className="sbi-portal-wrapper">
      
      {/* 1. TOPMOST PURPLE UTILITY HEADER BAR */}
      <div className="sbi-top-purple-bar">
        <div className="sbi-top-purple-inner">
          
          {/* Left Top Sub-Tabs */}
          <div className="sbi-top-left-nav">
            <button type="button" className="sbi-top-tab active">
              Banking
            </button>
            <button type="button" className="sbi-top-tab flex items-center gap-1.5" onClick={() => toast('SBI Lifestyle')}>
              <ShoppingBag size={13} />
              Lifestyle
            </button>
            <button type="button" className="sbi-top-tab flex items-center gap-1.5" onClick={() => toast('YONO Rewards')}>
              <Gift size={13} />
              Rewards
            </button>
            <div className="sbi-lite-toggle flex items-center gap-2 text-xs text-purple-100 ml-2">
              <span className="font-semibold text-[11px]">YONO Net Banking Lite</span>
              <button 
                type="button"
                onClick={() => setLiteMode(!liteMode)}
                className={`sbi-toggle-btn ${liteMode ? 'on' : 'off'}`}
                aria-label="Toggle YONO Net Banking Lite"
              >
                <span className="sbi-toggle-thumb"></span>
                <span className="sbi-toggle-text">{liteMode ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Right Utilities */}
          <div className="sbi-top-right-nav">
            <div className="sbi-top-util-item">
              <span className="sbi-play-icon">▶</span>
              <span>Get Help</span>
              <span className="font-bold text-white">1800-11-1101</span>
            </div>
            <div className="sbi-top-util-item cursor-pointer">
              <span>English</span>
              <ChevronDown size={12} />
            </div>
            <div className="sbi-top-util-item sbi-font-sizer">
              <button type="button">–</button>
              <button type="button" className="font-bold">A</button>
              <button type="button">+</button>
            </div>
            <button 
              type="button" 
              onClick={() => {
                toast.success('Logged out successfully');
                router.push('/auth/login');
              }}
              className="sbi-top-util-item hover:underline"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN YONO NET-BANKING BRAND BAR */}
      <header className="sbi-brand-header">
        <div className="sbi-brand-header-inner">
          
          {/* Logo */}
          <Link href="/dashboard" className="sbi-brand-logo flex items-center gap-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-[#30135d] tracking-tight">Yono</span>
                {/* Cyan SBI Ring Graphic */}
                <div className="w-5 h-5 rounded-full border-[3.5px] border-[#00a4e4] relative flex items-center justify-center">
                  <div className="w-1.5 h-2.5 bg-[#00a4e4] absolute -bottom-0.5 rounded-sm"></div>
                </div>
                <span className="text-xl font-black text-[#30135d] tracking-normal ml-0.5">SBI</span>
              </div>
              <span className="text-[9px] font-extrabold text-[#30135d] tracking-wider uppercase -mt-1">NET-BANKING</span>
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="sbi-main-nav">
            <Link href="/dashboard" className="sbi-nav-item">Overview</Link>
            <button type="button" className="sbi-nav-item active">Accounts</button>
            <Link href="/transfers" className="sbi-nav-item">Payments</Link>
            <button type="button" onClick={() => handleTabChange('Deposits')} className="sbi-nav-item">Deposits</button>
            <button type="button" onClick={() => handleTabChange('Loans')} className="sbi-nav-item">Loans</button>
            <Link href="/cards" className="sbi-nav-item">Cards</Link>
            <button type="button" onClick={() => handleTabChange('Investments')} className="sbi-nav-item">Investments</button>
            <button type="button" onClick={() => handleTabChange('Insurance')} className="sbi-nav-item">Insurance</button>
            <Link href="/settings" className="sbi-nav-item">Services</Link>
          </nav>

          {/* Right Header Actions */}
          <div className="sbi-header-actions">
            <button type="button" className="sbi-icon-btn" aria-label="Search">
              <Search size={18} />
            </button>
            <button type="button" className="sbi-icon-btn" aria-label="Notifications">
              <Bell size={18} />
            </button>
            
            {/* User Profile Capsule matching screenshot */}
            <Link href="/profile" className="sbi-profile-pill">
              <div className="sbi-avatar-circle">DV</div>
              <span className="sbi-profile-text">My Profile</span>
            </Link>
          </div>

        </div>
      </header>

      {/* 3. BREADCRUMB & MAIN BODY CONTENT */}
      <main className="sbi-main-body">
        
        {/* Breadcrumb */}
        <div className="sbi-breadcrumb">
          <Link href="/dashboard" className="sbi-bc-home">
            <Home size={15} />
          </Link>
          <span className="sbi-bc-sep">›</span>
          <span className="sbi-bc-current">Relationship Overview</span>
        </div>

        {/* 4. SUB-NAVIGATION TABS BAR (Transaction Accounts | Deposits | Loans | Investments | Insurance) */}
        <div className="sbi-tabs-container">
          <div className="sbi-tabs-row">
            {(['Transaction Accounts', 'Deposits', 'Loans', 'Investments', 'Insurance'] as const).map((tabLabel) => {
              const tabKey = (tabLabel === 'Transaction Accounts' ? 'Transaction' : tabLabel) as typeof activeTab;
              const isActive = activeTab === tabKey;

              return (
                <button
                  key={tabLabel}
                  type="button"
                  onClick={() => handleTabChange(tabKey)}
                  className={`sbi-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <span className="sbi-tab-text">{tabLabel}</span>
                  {isActive && <div className="sbi-tab-indicator"></div>}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => router.push('/accounts')}
            className="sbi-view-all-btn"
          >
            <span>View All Accounts</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* 5. ACTIVE TAB MAIN WORKSPACE AREA */}
        <div className="sbi-workspace-area">

          {/* ========================================================================= */}
          {/* TAB 1: DEPOSITS (MATCHING SCREENSHOT 1) */}
          {/* ========================================================================= */}
          {activeTab === 'Deposits' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column (3/12 width) */}
              <div className="md:col-span-3 space-y-4">
                
                {/* Search Box with Magnifying Glass & 3 Dots */}
                <div className="sbi-search-card">
                  <Search size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="sbi-search-input"
                  />
                  <button type="button" className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Requests Accordion Card */}
                <div 
                  onClick={() => toast('Account Requests Section')}
                  className="sbi-menu-card flex items-center justify-between cursor-pointer"
                >
                  <span className="text-xs font-semibold text-gray-700">Requests</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>

                {/* Others (00) Accordion Card */}
                <div className="sbi-menu-card">
                  <div
                    onClick={() => setOthersOpen(!othersOpen)}
                    className="flex items-center justify-between cursor-pointer pb-1"
                  >
                    <span className="text-xs font-bold text-[#30135d]">Others (00)</span>
                    {othersOpen ? (
                      <ChevronUp size={16} className="text-[#30135d]" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>

                  {othersOpen && (
                    <div className="mt-3">
                      {/* Sukanya Samriddhi / Minor PPF Banner Card (Exact match to screenshot 1) */}
                      <div
                        onClick={() => toast('Sukanya Samriddhi / Minor PPF Account Info')}
                        className="sbi-sukanya-banner"
                      >
                        <div className="sbi-sukanya-text-col">
                          <div className="sbi-sukanya-sub flex items-center gap-1">
                            <span>View your Linked</span>
                            <ChevronRight size={10} />
                          </div>
                          <div className="sbi-sukanya-title">
                            Sukanya Samriddhi/ Minor PPF Account
                          </div>
                        </div>

                        {/* Girl with Ball & Shield SVG Illustration */}
                        <div className="sbi-sukanya-graphic">
                          <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            {/* Shield background */}
                            <path d="M85 30 C85 30 105 35 105 55 C105 75 85 85 85 85 C85 85 65 75 65 55 C65 35 85 30 85 30 Z" fill="#ffffff" fillOpacity="0.25" />
                            {/* Kid vector silhouette playing ball */}
                            <circle cx="45" cy="40" r="10" fill="#fbcfe8" />
                            <path d="M45 52 L35 75 L42 75 L48 62 L55 75 L62 75 L52 52 Z" fill="#ffffff" />
                            <circle cx="25" cy="45" r="7" fill="#f472b6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column (9/12 width) */}
              <div className="md:col-span-9 space-y-6">
                <div className="sbi-content-card min-h-[380px] p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                      <div>
                        <h2 className="text-lg font-bold text-[#30135d]">Deposits Summary</h2>
                        <p className="text-xs text-gray-500">View and manage your Term Deposits, Fixed Deposits, and Special Schemes</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toast.success('Redirecting to Open FD page')}
                        className="sbi-btn-primary flex items-center gap-1.5"
                      >
                        <PlusCircle size={15} />
                        <span>Open Fixed Deposit</span>
                      </button>
                    </div>

                    {/* Deposit Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Card 1: FD */}
                      <div className="sbi-deposit-box">
                        <div className="flex justify-between items-start">
                          <span className="sbi-deposit-type">FIXED DEPOSIT (FD)</span>
                          <span className="sbi-badge-active">Active</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">A/C: 39812049182</div>
                        <div className="text-xl font-bold text-gray-900 mt-1">₹ 2,50,000.00</div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-purple-100 text-xs">
                          <span className="text-gray-600">Maturity: 15 Oct 2027 (7.10% p.a.)</span>
                          <button type="button" onClick={() => toast('FD Account Details')} className="text-[#30135d] font-bold hover:underline">
                            Details →
                          </button>
                        </div>
                      </div>

                      {/* Card 2: RD */}
                      <div className="sbi-deposit-box">
                        <div className="flex justify-between items-start">
                          <span className="sbi-deposit-type">RECURRING DEPOSIT (RD)</span>
                          <span className="sbi-badge-active">Active</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Monthly Installment: ₹5,000</div>
                        <div className="text-xl font-bold text-gray-900 mt-1">₹ 60,000.00</div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-purple-100 text-xs">
                          <span className="text-gray-600">Maturity: 01 Mar 2027 (6.80% p.a.)</span>
                          <button type="button" onClick={() => toast('RD Account Details')} className="text-[#30135d] font-bold hover:underline">
                            Details →
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Bottom Certificate Download Bar */}
                  <div className="sbi-info-bar mt-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <FileText size={16} className="text-[#30135d]" />
                      <span>Need deposit interest certificate for IT return filing?</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast.success('Interest Certificate downloaded successfully')}
                      className="sbi-btn-outline"
                    >
                      Download Certificate
                    </button>
                  </div>
                </div>

                {/* Business Loan Banner (Screenshot 5) */}
                <BusinessLoanBanner />
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: LOANS (EXACT MATCH TO SCREENSHOT 2) */}
          {/* ========================================================================= */}
          {activeTab === 'Loans' && (
            <div className="space-y-6">
              <div className="sbi-content-card min-h-[460px] p-8 flex items-center justify-center relative">
                
                {/* 2 Equal Columns Split by Vertical Dotted Border */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6">
                  
                  {/* Left Column: Triangle Warning Pole & Cactus Vector Graphic */}
                  <div className="flex justify-center items-center">
                    <div className="w-64 h-64 relative flex items-center justify-center">
                      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        {/* Soft Purple Mountain Hills in Background */}
                        <path d="M20 200 C60 170 110 185 160 200 Z" fill="#f5edfc" />
                        <path d="M100 200 C150 160 190 180 230 200 Z" fill="#eee3fa" />

                        {/* Base Ground */}
                        <line x1="10" y1="200" x2="230" y2="200" stroke="#d8c5f2" strokeWidth="2" strokeDasharray="4 4" />

                        {/* Pole */}
                        <line x1="110" y1="85" x2="110" y2="200" stroke="#702082" strokeWidth="3" strokeLinecap="round" />

                        {/* Triangle Warning Sign */}
                        <path 
                          d="M110 35 L145 90 L75 90 Z" 
                          fill="#ffffff" 
                          stroke="#702082" 
                          strokeWidth="5" 
                          strokeLinejoin="round" 
                        />
                        {/* Exclamation Mark inside Triangle */}
                        <path d="M110 52 L110 70" stroke="#702082" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="110" cy="79" r="2.5" fill="#702082" />

                        {/* Cactus Plant Graphic at Bottom Left of Pole */}
                        <g transform="translate(85, 160)">
                          <rect x="12" y="10" width="8" height="30" rx="4" fill="#a855f7" fillOpacity="0.4" />
                          <path d="M6 18 C6 26 12 26 12 26" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" fill="none" />
                          <path d="M26 22 C26 30 20 30 20 30" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" fill="none" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  {/* Vertical Dotted Border Divider (Visible on Desktop) */}
                  <div className="hidden md:block absolute left-1/2 top-12 bottom-12 border-r border-dashed border-gray-300 transform -translate-x-1/2 pointer-events-none"></div>

                  {/* Right Column: "No records found" Text */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <p className="text-sm font-semibold text-gray-500 tracking-wide">
                      No records found
                    </p>
                  </div>

                </div>

              </div>

              {/* Business Loan Banner */}
              <BusinessLoanBanner />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: INVESTMENTS (EXACT MATCH TO SCREENSHOT 3) */}
          {/* ========================================================================= */}
          {activeTab === 'Investments' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Sub-Menu Column (3/12 width) */}
                <div className="md:col-span-3 space-y-3">
                  
                  {/* Search Input */}
                  <div className="sbi-search-card">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="sbi-search-input"
                    />
                  </div>

                  {/* Vertical Investment Options Menu */}
                  {(['Mutual Fund', 'Demat & Securities', 'PPF', 'NPS', 'IPO'] as const).map((subItem) => {
                    const isSelected = investmentSubTab === subItem;
                    return (
                      <button
                        key={subItem}
                        type="button"
                        onClick={() => setInvestmentSubTab(subItem)}
                        className={`sbi-inv-menu-btn ${isSelected ? 'selected' : ''}`}
                      >
                        {subItem}
                      </button>
                    );
                  })}

                </div>

                {/* Right Main Content Column (9/12 width) */}
                <div className="md:col-span-9">
                  <div className="sbi-content-card min-h-[460px] p-0 overflow-hidden relative flex flex-col">
                    
                    {/* Top Purple Tab Badge Header */}
                    <div className="sbi-inv-header-tag">
                      {investmentSubTab}
                    </div>

                    {/* Main Content inside Mutual Fund */}
                    <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                      
                      <h2 className="text-xl font-bold text-[#30135d] mb-6">
                        Start {investmentSubTab} Investments
                      </h2>

                      {/* Vector Shield with Rupee & Sprout Plant Illustration */}
                      <div className="w-56 h-48 relative mb-6 flex items-center justify-center">
                        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          
                          {/* Background Upward Arrow */}
                          <path d="M120 100 L150 40 L165 55 M150 40 L135 55" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
                          <path d="M100 130 C120 100 140 70 150 40" stroke="#f472b6" strokeWidth="4" strokeDasharray="4 4" fill="none" opacity="0.6" />

                          {/* Background Folio / Document Card */}
                          <rect x="50" y="70" width="80" height="50" rx="4" fill="#e9d5ff" opacity="0.7" />
                          <circle cx="65" cy="85" r="5" fill="#a855f7" />
                          <line x1="75" y1="83" x2="110" y2="83" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                          <line x1="75" y1="88" x2="98" y2="88" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />

                          {/* Shield Outline & Body */}
                          <path 
                            d="M100 35 C100 35 130 42 130 75 C130 110 100 130 100 130 C100 130 70 110 70 75 C70 42 100 35 100 35 Z" 
                            fill="#ffffff" 
                            stroke="#30135d" 
                            strokeWidth="4" 
                            strokeLinejoin="round" 
                          />

                          {/* Pink Circle inside Shield with ₹ Symbol */}
                          <circle cx="100" cy="80" r="15" fill="#a855f7" />
                          <text x="100" y="86" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold">₹</text>

                          {/* Green & Pink Plant Sprout on top of Shield */}
                          <path d="M100 35 Q92 20 80 25 Q95 30 100 35" fill="#ec4899" />
                          <path d="M100 35 Q108 20 120 25 Q105 30 100 35" fill="#a855f7" />
                        </svg>
                      </div>

                      <p className="text-xs font-medium text-gray-600 mb-6">
                        Start investing today with SBI Mutual Funds
                      </p>

                      <button
                        type="button"
                        onClick={() => toast.success('Redirecting to Create Folio page')}
                        className="sbi-btn-pill-purple"
                      >
                        Create Folio
                      </button>

                    </div>

                  </div>
                </div>

              </div>

              {/* Business Loan Banner */}
              <BusinessLoanBanner />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: INSURANCE (EXACT MATCH TO SCREENSHOT 4) */}
          {/* ========================================================================= */}
          {activeTab === 'Insurance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Sidebar Column (3/12 width) */}
                <div className="md:col-span-3 space-y-4">
                  
                  {/* Search Input */}
                  <div className="sbi-search-card">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="sbi-search-input"
                    />
                  </div>

                  {/* Action Pill Buttons */}
                  <button
                    type="button"
                    onClick={() => toast('Link Policy option selected')}
                    className="sbi-action-pill-btn flex items-center justify-between"
                  >
                    <span>Link Policy</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => toast('Buy New Policy option selected')}
                    className="sbi-action-pill-btn flex items-center justify-between"
                  >
                    <span>Buy New Policy</span>
                    <ChevronRight size={14} />
                  </button>

                </div>

                {/* Right Main Content Column (9/12 width) */}
                <div className="md:col-span-9">
                  <div className="sbi-content-card min-h-[440px] p-8 flex flex-col items-center justify-center text-center">
                    
                    {/* Folder with Cross Icon Vector Illustration */}
                    <div className="w-52 h-44 relative mb-6 flex items-center justify-center">
                      <svg viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        
                        {/* Soft Pink Background Circle */}
                        <circle cx="90" cy="80" r="55" fill="#fce7f3" />

                        {/* Lilac/Purple Folder */}
                        <path d="M50 60 C50 56 53 52 57 52 L80 52 L90 62 L123 62 C127 62 130 65 130 69 L130 110 C130 114 127 118 123 118 L57 118 C53 118 50 114 50 110 Z" fill="#c084fc" opacity="0.85" />
                        
                        {/* Folder Front Flap */}
                        <path d="M45 70 C45 66 48 62 52 62 L128 62 C132 62 135 66 135 70 L135 110 C135 114 132 118 128 118 L52 118 C52 118 45 114 45 110 Z" fill="#a855f7" />

                        {/* Pink Circle with White X Icon */}
                        <circle cx="90" cy="90" r="14" fill="#ec4899" />
                        <path d="M84 84 L96 96 M96 84 L84 96" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

                        {/* Leaf Foliage behind folder */}
                        <path d="M135 95 Q145 90 148 80 Q142 90 135 95" fill="#a855f7" />
                        <path d="M137 100 Q148 100 150 92 Q143 98 137 100" fill="#ec4899" />
                      </svg>
                    </div>

                    <h3 className="text-lg font-bold text-[#30135d] mb-2">
                      No policies found.
                    </h3>

                    <p className="text-xs text-gray-500 max-w-md mb-6 leading-relaxed">
                      You can link your existing SBI Life policies or explore new policies to meet all your insurance needs.
                    </p>

                  </div>
                </div>

              </div>

              {/* Business Loan Banner */}
              <BusinessLoanBanner />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: TRANSACTION ACCOUNTS */}
          {/* ========================================================================= */}
          {activeTab === 'Transaction' && (
            <div className="space-y-6">
              <div className="sbi-content-card min-h-[420px] p-6 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-bold text-[#30135d]">Transaction Accounts</h2>
                    <p className="text-xs text-gray-500">Savings Account & Current Account details</p>
                  </div>
                  <button type="button" onClick={() => router.push('/accounts')} className="sbi-btn-primary">
                    Manage Accounts
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="sbi-deposit-box">
                    <div className="flex justify-between items-start">
                      <span className="sbi-deposit-type">SAVINGS BANK ACCOUNT</span>
                      <span className="sbi-badge-active">Primary</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">A/C: 10849201948</div>
                    <div className="text-xl font-bold text-gray-900 mt-1">₹ 1,45,280.50</div>
                    <div className="flex gap-2 mt-4 pt-3 border-t border-purple-100 text-xs">
                      <button type="button" onClick={() => router.push('/transfers')} className="text-[#30135d] font-bold hover:underline">
                        Transfer Funds
                      </button>
                      <span className="text-gray-300">•</span>
                      <button type="button" onClick={() => router.push('/statements')} className="text-[#30135d] font-bold hover:underline">
                        Mini Statement
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Loan Banner */}
              <BusinessLoanBanner />
            </div>
          )}

        </div>

      </main>

      {/* 6. FOOTER LINKS (About SBI | Terms & Conditions | Privacy Policy) */}
      <footer className="sbi-footer-bar">
        <div className="flex items-center justify-center gap-3 text-xs text-white">
          <Link href="/about" className="hover:underline">About SBI</Link>
          <span>|</span>
          <Link href="/terms" className="hover:underline">Terms &amp; Conditions</Link>
          <span>|</span>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </footer>

    </div>
  );
}

{/* Business Loan Banner Component (Exact Match to Screenshot 5) */}
function BusinessLoanBanner() {
  const router = useRouter();

  return (
    <div className="sbi-business-banner">
      <div className="sbi-bb-content">
        <h3 className="sbi-bb-title">Apply for a Business Loan</h3>
        <button
          type="button"
          onClick={() => {
            toast.success('Checking Business Loan Eligibility...');
            router.push('/home/landingPage/manageRelationship/loans/loans');
          }}
          className="sbi-bb-btn"
        >
          Click here to check your eligibility
        </button>
      </div>

      {/* Decorative Translucent Overlapping Circles Graphic */}
      <div className="sbi-bb-circles">
        <div className="sbi-circle-1"></div>
        <div className="sbi-circle-2"></div>
      </div>
    </div>
  );
}
