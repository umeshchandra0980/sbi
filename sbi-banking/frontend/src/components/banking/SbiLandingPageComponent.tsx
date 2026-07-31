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
  ArrowRight,
  Eye,
  EyeOff,
  Play,
  Volume2,
  X
} from 'lucide-react';
import './SbiLandingPageComponent.css';
import SbiGlobalBrandHeader from './SbiGlobalBrandHeader';

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

  // Transaction sub-tabs & Statements form state (Matching User Reference Images 1, 2, 3, 4)
  const [txSubTab, setTxSubTab] = useState<'Account Summary' | 'Transactions' | 'Statements' | 'Spend Analysis'>('Transactions');
  const [stmtOption, setStmtOption] = useState<'duration' | 'fy'>('duration');
  const [stmtDuration, setStmtDuration] = useState('1 Month');
  const [stmtFy, setStmtFy] = useState('2025-2026');
  const [stmtFormat, setStmtFormat] = useState('PDF');
  const [includeAllSummary, setIncludeAllSummary] = useState(false);
  const [includeNominee, setIncludeNominee] = useState(false);
  const [showAccountNo, setShowAccountNo] = useState(false);
  const [spendSubTab, setSpendSubTab] = useState<'Tutorials' | 'FAQs'>('Tutorials');
  const [showNoRequestsModal, setShowNoRequestsModal] = useState(false);

  // Hover Mega Dropdown state
  const [hoveredNavTab, setHoveredNavTab] = useState<string | null>(null);

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
      
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeNav="Accounts" />

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

          {/* ================= MODAL: NO PENDING REQUESTS (EXACT MATCH TO SCREENSHOT 2) ================= */}
          {showNoRequestsModal && (
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150"
              onClick={() => setShowNoRequestsModal(false)}
            >
              <div 
                className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button X */}
                <button
                  type="button"
                  onClick={() => setShowNoRequestsModal(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                {/* Modal Title */}
                <h3 className="text-base font-extrabold text-[#673391] mb-6">
                  No pending requests
                </h3>

                {/* Triangle Pole Warning Graphic & Text */}
                <div className="flex flex-col md:flex-row items-center gap-6 py-2">
                  <div className="w-40 h-32 relative flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                      {/* Soft Background Hills */}
                      <path d="M10 120 C40 100 80 110 120 120 Z" fill="#f5edfc" />
                      <path d="M70 120 C100 95 130 110 150 120 Z" fill="#eee3fa" />

                      {/* Ground Base */}
                      <line x1="5" y1="120" x2="155" y2="120" stroke="#d8c5f2" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Pole */}
                      <line x1="75" y1="50" x2="75" y2="120" stroke="#702082" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Triangle Sign */}
                      <path 
                        d="M75 15 L100 55 L50 55 Z" 
                        fill="#ffffff" 
                        stroke="#702082" 
                        strokeWidth="3.5" 
                        strokeLinejoin="round" 
                      />
                      {/* Exclamation Point */}
                      <path d="M75 28 L75 41" stroke="#702082" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="75" cy="48" r="1.8" fill="#702082" />

                      {/* Cactus Graphic at Base */}
                      <g transform="translate(58, 95)">
                        <rect x="8" y="6" width="5" height="20" rx="2.5" fill="#a855f7" fillOpacity="0.4" />
                        <path d="M4 12 C4 18 8 18 8 18" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" fill="none" />
                        <path d="M17 14 C17 20 13 20 13 20" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" fill="none" />
                      </g>
                    </svg>
                  </div>

                  <div className="flex-1 text-slate-700 text-xs font-medium leading-relaxed">
                    There are no pending requests that requires your approval (BSTDC038)
                  </div>
                </div>

                {/* Bottom Okay Action Button */}
                <div className="flex justify-end pt-4 mt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowNoRequestsModal(false)}
                    className="px-6 py-1.5 text-xs font-bold text-[#673391] border border-[#673391] rounded-full hover:bg-purple-50 transition-colors"
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          )}

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

                {/* Requests Accordion Card (Matching Screenshot 1 & 2) */}
                <div 
                  onClick={() => setShowNoRequestsModal(true)}
                  className="sbi-menu-card flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
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

                    {/* Main Content inside Investments (Matching Screenshot 4) */}
                    <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                      
                      {/* Mobile Phone Vector Illustration with Hourglass & Progress Bar */}
                      <div className="w-56 h-48 relative mb-4 flex items-center justify-center">
                        <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          {/* Soft Purple Background Oval */}
                          <ellipse cx="100" cy="115" rx="75" ry="25" fill="#f3e8ff" opacity="0.6" />
                          
                          {/* Hourglass in Background */}
                          <path d="M125 45 C125 45 155 45 155 70 C155 85 140 95 140 95 C140 95 155 105 155 120 C155 145 125 145 125 145 L125 45 Z" fill="#fce7f3" opacity="0.7" />
                          <path d="M130 50 L150 50 L140 80 Z" fill="#ec4899" opacity="0.3" />
                          
                          {/* Mobile Phone Container */}
                          <rect x="75" y="25" width="50" height="95" rx="8" fill="#ffffff" stroke="#30135d" strokeWidth="3" />
                          <rect x="90" y="29" width="20" height="3" rx="1.5" fill="#e2e8f0" />
                          <circle cx="100" cy="112" r="3" fill="#e2e8f0" />

                          {/* Pink Loading Progress Bar on Phone Screen */}
                          <rect x="83" y="70" width="34" height="6" rx="3" fill="#fce7f3" />
                          <rect x="83" y="70" width="22" height="6" rx="3" fill="#d92588" />
                          <circle cx="87" cy="73" r="1" fill="#ffffff" />
                          <circle cx="92" cy="73" r="1" fill="#ffffff" />
                          <circle cx="97" cy="73" r="1" fill="#ffffff" />

                          {/* Curved Dotted Flight Arrow Path */}
                          <path d="M50 100 C40 60 70 40 75 50" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                          <path d="M130 90 C150 70 140 50 145 60" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                        </svg>
                      </div>

                      <h2 className="text-lg font-extrabold text-[#30135d] mb-1.5">
                        Coming Soon
                      </h2>

                      <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                        We are preparing to help you access this Service shortly
                      </p>

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
          {/* TAB 5: TRANSACTION ACCOUNTS (EXACT MATCH TO REFERENCE IMAGES 1, 2, 3, 4) */}
          {/* ========================================================================= */}
          {activeTab === 'Transaction' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Sidebar Column (3/12 width) */}
              <div className="md:col-span-3 space-y-4">
                
                {/* Search Box */}
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

                {/* Savings Account Card */}
                <div>
                  <div className="text-xs font-bold text-gray-700 mb-2">Savings Account</div>
                  <div className="bg-[#673391] text-white p-3.5 rounded-xl shadow-sm space-y-1">
                    <div className="text-[11px] font-medium opacity-90">A/C Number</div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs tracking-wider">
                        {showAccountNo ? '10849207054' : 'XXXXXXX7054'}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setShowAccountNo(!showAccountNo)}
                        className="text-white hover:opacity-80 transition-opacity"
                        title={showAccountNo ? "Hide Account Number" : "Show Account Number"}
                      >
                        {showAccountNo ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <button
                  type="button"
                  onClick={() => router.push('/accounts/open-savings-account')}
                  className="w-full text-left bg-[#f4edf9] text-[#673391] text-xs font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-between hover:bg-[#e9ddf2] transition-colors"
                >
                  <span>Apply for a new Savings Account</span>
                  <ChevronRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => toast('Opening Joint Savings Account Application')}
                  className="w-full text-left bg-[#f4edf9] text-[#673391] text-xs font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-between hover:bg-[#e9ddf2] transition-colors"
                >
                  <span>Apply for Joint Savings Account</span>
                  <ChevronRight size={14} />
                </button>

                {/* Current Account Section */}
                <div>
                  <div className="text-xs font-bold text-gray-700 mb-2 mt-4">Current Account</div>
                  <button
                    type="button"
                    onClick={() => toast('Opening Current Account Application')}
                    className="w-full text-left bg-[#f4edf9] text-[#673391] text-xs font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-between hover:bg-[#e9ddf2] transition-colors"
                  >
                    <span>Apply for a new Current Account</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Additional Links */}
                <div className="pt-2 space-y-2 text-xs font-bold text-[#673391]">
                  <button type="button" onClick={() => toast('Add a New Account')} className="block hover:underline">
                    Add a New Account +
                  </button>
                  <button type="button" onClick={() => toast('Add a New Credit Card')} className="block hover:underline">
                    Add a New Credit Card +
                  </button>
                </div>

              </div>

              {/* Right Main Workspace Column (9/12 width) */}
              <div className="md:col-span-9 space-y-4">
                
                {/* Account Top Purple Strip Header */}
                <div className="bg-[#673391] text-white py-2.5 px-4 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-4 text-xs font-bold tracking-wide">
                    <span>SAVINGS A/C</span>
                    <span className="font-mono opacity-90">XXXXXXX7054</span>
                    <button type="button" onClick={() => setShowAccountNo(!showAccountNo)} className="hover:opacity-80">
                      {showAccountNo ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button type="button" onClick={() => toast('Manage Account Settings')} className="text-xs font-bold text-white hover:underline flex items-center gap-1">
                    <span>Manage Account</span>
                  </button>
                </div>

                {/* Sub-Tabs Bar (Account Summary | Transactions | Statements | Spend Analysis) */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[460px]">
                  
                  <div className="flex items-center gap-6 border-b border-slate-200 pb-3 mb-6">
                    {(['Account Summary', 'Transactions', 'Statements', 'Spend Analysis'] as const).map((subTab) => {
                      const isSubActive = txSubTab === subTab;
                      return (
                        <button
                          key={subTab}
                          type="button"
                          onClick={() => setTxSubTab(subTab)}
                          className={`text-xs font-bold transition-all relative pb-2 ${
                            isSubActive ? 'text-[#673391]' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>{subTab}</span>
                          {isSubActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* SUB-VIEW 1: TRANSACTIONS (EXACT MATCH TO IMAGE 1) */}
                  {txSubTab === 'Transactions' && (
                    <div className="space-y-4">
                      {/* Search & Filter Control Bar */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                        <div className="relative flex-1 w-full">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search by name, amount, cheque no.,remarks"
                            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#673391]"
                          />
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                          <button type="button" onClick={() => toast('Sort option')} className="flex items-center gap-1 hover:text-[#673391]">
                            <span>↑↓ Sort</span>
                          </button>
                          <button type="button" onClick={() => toast('Select Duration option')} className="flex items-center gap-1 hover:text-[#673391]">
                            <span>📅 Select Duration</span>
                          </button>
                          <button type="button" onClick={() => toast('Filters option')} className="flex items-center gap-1 hover:text-[#673391]">
                            <span>Y Filters</span>
                          </button>
                        </div>
                      </div>

                      {/* Transactions Table (Matching Screenshot 1 Exact Rows) */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-purple-50/60 text-slate-700 font-bold border-b border-purple-100">
                              <th className="py-2.5 px-3">Date</th>
                              <th className="py-2.5 px-3">Description</th>
                              <th className="py-2.5 px-3 text-right">Amount (Rs.)</th>
                              <th className="py-2.5 px-3 text-right">Balance (Rs.)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            <tr>
                              <td className="py-3 px-3 font-semibold text-slate-800">22/07/2026</td>
                              <td className="py-3 px-3 max-w-md leading-relaxed text-slate-600">
                                UPI- TRANSFER TO 4897692162094 UPI/DR/656929883020/Navi Fin/UTIB/navifinser/Paid
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-red-600">↗ 17,049.00</td>
                              <td className="py-3 px-3 text-right font-bold text-slate-800">₹0.09</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-3 font-semibold text-slate-800">22/07/2026</td>
                              <td className="py-3 px-3 max-w-md leading-relaxed text-slate-600">
                                UPI- TRANSFER TO 4897692162094 UPI/DR/656911895062/DUMPALA /HDFC/9959662775/Paid
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-red-600">↗ 15,000.00</td>
                              <td className="py-3 px-3 text-right font-bold text-slate-800">₹17,049.09</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-3 font-semibold text-slate-800">22/07/2026</td>
                              <td className="py-3 px-3 max-w-md leading-relaxed text-slate-600">
                                IMPS- TRANSFER FROM 4698313162099 IMPS/620317465123/ICN-XX876-KRAZYBEE/Disbursal
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-emerald-600">↙ 32,047.00</td>
                              <td className="py-3 px-3 text-right font-bold text-slate-800">₹32,049.09</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-3 font-semibold text-slate-800">18/07/2026</td>
                              <td className="py-3 px-3 max-w-md leading-relaxed text-slate-600">
                                IMPS- TRANSFER FROM 4698328162092 IMPS/619902229627/hsb-XX002-PAYU FIN/PennyDrop
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-emerald-600">↙ 1.00</td>
                              <td className="py-3 px-3 text-right font-bold text-slate-800">₹2.09</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-3 font-semibold text-slate-800">17/07/2026</td>
                              <td className="py-3 px-3 max-w-md leading-relaxed text-slate-600">
                                UPI- TRANSFER TO 4897694162092 UPI/DR/656419153122/MRS TANV/YESB/q879963732/Paid
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-red-600">↗ 25.00</td>
                              <td className="py-3 px-3 text-right font-bold text-slate-800">₹1.09</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 2: STATEMENTS (EXACT MATCH TO IMAGE 2) */}
                  {txSubTab === 'Statements' && (
                    <div className="space-y-5 max-w-2xl">
                      <h3 className="text-sm font-bold text-[#673391]">Request Statement</h3>
                      
                      {/* Radio Select Row */}
                      <div className="flex items-center gap-8 text-xs font-semibold text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="stmtOption"
                            checked={stmtOption === 'duration'}
                            onChange={() => setStmtOption('duration')}
                            className="accent-[#673391]"
                          />
                          <span>Select Duration</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="stmtOption"
                            checked={stmtOption === 'fy'}
                            onChange={() => setStmtOption('fy')}
                            className="accent-[#673391]"
                          />
                          <span>Select Financial Year</span>
                        </label>
                      </div>

                      {/* Dropdown Selectors Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Duration</label>
                          <select 
                            value={stmtDuration}
                            onChange={(e) => setStmtDuration(e.target.value)}
                            disabled={stmtOption !== 'duration'}
                            className="w-full py-2 px-3 text-xs border-b border-slate-300 focus:outline-none focus:border-[#673391] bg-transparent"
                          >
                            <option value="1 Month">1 Month</option>
                            <option value="3 Months">3 Months</option>
                            <option value="6 Months">6 Months</option>
                            <option value="1 Year">1 Year</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Financial Year</label>
                          <select 
                            value={stmtFy}
                            onChange={(e) => setStmtFy(e.target.value)}
                            disabled={stmtOption !== 'fy'}
                            className="w-full py-2 px-3 text-xs border-b border-slate-300 focus:outline-none focus:border-[#673391] bg-transparent"
                          >
                            <option value="2025-2026">2025 - 2026</option>
                            <option value="2024-2025">2024 - 2025</option>
                            <option value="2023-2024">2023 - 2024</option>
                          </select>
                        </div>
                      </div>

                      {/* Format Selector */}
                      <div className="max-w-xs pt-2">
                        <label className="block text-[11px] text-slate-500 mb-1">Format</label>
                        <select 
                          value={stmtFormat}
                          onChange={(e) => setStmtFormat(e.target.value)}
                          className="w-full py-2 px-3 text-xs border-b border-slate-300 focus:outline-none focus:border-[#673391] bg-transparent"
                        >
                          <option value="PDF">PDF</option>
                          <option value="Excel">Excel</option>
                          <option value="Text">Text</option>
                        </select>
                      </div>

                      {/* Checkboxes */}
                      <div className="space-y-2 pt-2 text-xs font-semibold text-slate-700">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeAllSummary}
                            onChange={(e) => setIncludeAllSummary(e.target.checked)}
                            className="rounded accent-[#673391]"
                          />
                          <span>Include all account summary ⓘ</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeNominee}
                            onChange={(e) => setIncludeNominee(e.target.checked)}
                            className="rounded accent-[#673391]"
                          />
                          <span>Include nominee details</span>
                        </label>
                      </div>

                      {/* Password Logic Info Callout Box */}
                      <div className="bg-purple-50/70 border border-purple-100 rounded-xl p-3.5 text-xs text-slate-700 space-y-1">
                        <div className="font-bold text-[#673391]">Password Logic ⓘ</div>
                        <div className="text-[11px] text-slate-600 leading-relaxed">
                          ⓘ Maximum 5 downloads per account in day. 2000 transactions per download.
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="flex items-center gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => toast.success('Statement uploaded to DigiLocker successfully!')}
                          className="py-2 px-5 text-xs font-bold rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Upload to Digilocker
                        </button>
                        <button
                          type="button"
                          onClick={() => toast.success('Statement sent to registered email!')}
                          className="py-2 px-5 text-xs font-bold rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          Email
                        </button>
                        <button
                          type="button"
                          onClick={() => toast.success('Statement downloaded successfully!')}
                          className="py-2 px-6 text-xs font-bold rounded-full bg-[#673391] text-white hover:bg-[#561578] transition-colors shadow-sm"
                        >
                          Download
                        </button>
                      </div>

                    </div>
                  )}

                  {/* SUB-VIEW 3: SPEND ANALYSIS (EXACT MATCH TO IMAGE 3 & 4) */}
                  {txSubTab === 'Spend Analysis' && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-extrabold text-[#673391] tracking-tight">
                        Welcome to your Spend Analysis!
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        
                        {/* Left Card Callout */}
                        <div className="bg-[#fcf5ff] border border-purple-100 rounded-2xl p-6 space-y-3 shadow-sm">
                          <h3 className="text-sm font-bold text-slate-800">Take control of your Spendings!</h3>
                          <ul className="space-y-2 text-xs font-medium text-slate-600">
                            <li className="flex items-center gap-2">
                              <span className="text-[#673391] text-base">•</span>
                              <span>Smarter Insights. Better Decisions</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-[#673391] text-base">•</span>
                              <span>View Spend Summary</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-[#673391] text-base">•</span>
                              <span>Interactive Graphs</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-[#673391] text-base">•</span>
                              <span>Manage Budget</span>
                            </li>
                          </ul>
                        </div>

                        {/* Right Graphic SVG Illustration */}
                        <div className="flex justify-center items-center">
                          <div className="w-64 h-48 relative flex items-center justify-center">
                            <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                              {/* Background Soft Purple Circle */}
                              <circle cx="120" cy="90" r="70" fill="#f3e8ff" opacity="0.6" />
                              
                              {/* Notepad / Clipboard */}
                              <rect x="70" y="30" width="70" height="110" rx="8" fill="#ffffff" stroke="#673391" strokeWidth="3" />
                              <rect x="80" y="24" width="50" height="12" rx="4" fill="#673391" />
                              
                              {/* Rupee Circle Badge */}
                              <circle cx="125" cy="45" r="10" fill="#d92588" />
                              <text x="125" y="49" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle">₹</text>

                              {/* Checklist items inside notepad */}
                              <rect x="80" y="65" width="12" height="12" rx="3" fill="#fbcfe8" />
                              <line x1="98" y1="71" x2="128" y2="71" stroke="#673391" strokeWidth="2.5" strokeLinecap="round" />

                              <rect x="80" y="85" width="12" height="12" rx="3" fill="#fbcfe8" />
                              <line x1="98" y1="91" x2="128" y2="91" stroke="#673391" strokeWidth="2.5" strokeLinecap="round" />

                              <rect x="80" y="105" width="12" height="12" rx="3" fill="#fbcfe8" />
                              <line x1="98" y1="111" x2="128" y2="111" stroke="#673391" strokeWidth="2.5" strokeLinecap="round" />

                              {/* Wallet & Calculator Graphics */}
                              <rect x="135" y="90" width="45" height="55" rx="6" fill="#302985" />
                              <circle cx="145" cy="115" r="4" fill="#ffffff" />
                              <path d="M150 70 L180 70 L170 90 Z" fill="#d92588" opacity="0.4" />
                            </svg>
                          </div>
                        </div>

                      </div>

                      {/* Tutorials & FAQs Sub-Tabs (Matching User Image 2) */}
                      <div className="pt-6 border-t border-slate-100">
                        <div className="flex items-center gap-6 mb-4">
                          <button
                            type="button"
                            onClick={() => setSpendSubTab('Tutorials')}
                            className={`text-xs font-bold transition-all relative pb-2 ${
                              spendSubTab === 'Tutorials' ? 'text-[#673391]' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <span>Tutorials</span>
                            {spendSubTab === 'Tutorials' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSpendSubTab('FAQs')}
                            className={`text-xs font-bold transition-all relative pb-2 ${
                              spendSubTab === 'FAQs' ? 'text-[#673391]' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <span>FAQs</span>
                            {spendSubTab === 'FAQs' && (
                              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                            )}
                          </button>
                        </div>

                        {spendSubTab === 'Tutorials' ? (
                          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
                            {/* Learn More about Spend Analysis Card Box */}
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-bold text-slate-800">Learn More about Spend Analysis</h3>
                              <button
                                type="button"
                                onClick={() => toast.success('Opening all Spend Analysis tutorials')}
                                className="text-xs font-bold text-[#673391] hover:underline"
                              >
                                View All
                              </button>
                            </div>

                            {/* 4 Video Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              
                              {/* Card 1 */}
                              <div className="flex flex-col space-y-2 group cursor-pointer" onClick={() => toast.success('Playing: Get to Know Your Spending Patterns')}>
                                <div className="bg-gradient-to-br from-[#2a0845] to-[#642b73] h-32 rounded-xl relative p-3 flex flex-col justify-between overflow-hidden shadow-xs group-hover:shadow-md transition-shadow">
                                  <div className="flex justify-end">
                                    <span className="text-white/70 hover:text-white text-xs">⋮</span>
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                      <Play size={18} className="fill-white ml-0.5" />
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-white/80 text-[10px]">
                                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                      <div className="w-1/3 h-full bg-[#d92588]"></div>
                                    </div>
                                    <Volume2 size={12} className="ml-2" />
                                  </div>
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#673391] transition-colors leading-tight">
                                  Get to Know Your Spending Patterns
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                                  See how Spend Analysis breaks down your daily expenses in a clear, simple way for better financial insights.
                                </p>
                              </div>

                              {/* Card 2 */}
                              <div className="flex flex-col space-y-2 group cursor-pointer" onClick={() => toast.success('Playing: Easy Way to Manage Your Budget')}>
                                <div className="bg-gradient-to-br from-[#2a0845] to-[#642b73] h-32 rounded-xl relative p-3 flex flex-col justify-between overflow-hidden shadow-xs group-hover:shadow-md transition-shadow">
                                  <div className="flex justify-end">
                                    <span className="text-white/70 hover:text-white text-xs">⋮</span>
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                      <Play size={18} className="fill-white ml-0.5" />
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-white/80 text-[10px]">
                                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                      <div className="w-1/2 h-full bg-[#d92588]"></div>
                                    </div>
                                    <Volume2 size={12} className="ml-2" />
                                  </div>
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#673391] transition-colors leading-tight">
                                  Easy Way to Manage Your Budget
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                                  A quick guide to setting up, tracking, and staying on top of your monthly budget.
                                </p>
                              </div>

                              {/* Card 3 */}
                              <div className="flex flex-col space-y-2 group cursor-pointer" onClick={() => toast.success('Playing: All Your Spending, in One Visual View')}>
                                <div className="bg-gradient-to-br from-[#2a0845] to-[#642b73] h-32 rounded-xl relative p-3 flex flex-col justify-between overflow-hidden shadow-xs group-hover:shadow-md transition-shadow">
                                  <div className="flex justify-end">
                                    <span className="text-white/70 hover:text-white text-xs">⋮</span>
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                      <Play size={18} className="fill-white ml-0.5" />
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-white/80 text-[10px]">
                                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                      <div className="w-2/3 h-full bg-[#d92588]"></div>
                                    </div>
                                    <Volume2 size={12} className="ml-2" />
                                  </div>
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#673391] transition-colors leading-tight">
                                  All Your Spending, in One Visual View
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                                  Explore the features and visuals that give you a clear, meaningful view of your money.
                                </p>
                              </div>

                              {/* Card 4 */}
                              <div className="flex flex-col space-y-2 group cursor-pointer" onClick={() => toast.success('Playing: Turn Your Card Statements into Quick Insights')}>
                                <div className="bg-gradient-to-br from-[#2a0845] to-[#642b73] h-32 rounded-xl relative p-3 flex flex-col justify-between overflow-hidden shadow-xs group-hover:shadow-md transition-shadow">
                                  <div className="flex justify-end">
                                    <span className="text-white/70 hover:text-white text-xs">⋮</span>
                                  </div>
                                  <div className="flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                      <Play size={18} className="fill-white ml-0.5" />
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-white/80 text-[10px]">
                                    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                      <div className="w-1/4 h-full bg-[#d92588]"></div>
                                    </div>
                                    <Volume2 size={12} className="ml-2" />
                                  </div>
                                </div>
                                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#673391] transition-colors leading-tight">
                                  Turn Your Card Statements into Quick Insights
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-normal line-clamp-3">
                                  Gain a complete, integrated view of your spending by uploading your credit card statements.
                                </p>
                              </div>

                            </div>
                          </div>
                        ) : (
                          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-3 text-xs text-slate-700">
                            <h3 className="text-sm font-bold text-slate-800">Frequently Asked Questions (FAQs)</h3>
                            <div className="space-y-2">
                              <p className="font-semibold text-[#673391]">Q: How is Spend Analysis calculated?</p>
                              <p className="text-slate-600">Spend Analysis automatically categorizes your debit and credit transactions into intuitive spending buckets like Shopping, Travel, Bills, and Investments.</p>
                              <p className="font-semibold text-[#673391]">Q: Can I set custom monthly budget limits?</p>
                              <p className="text-slate-600">Yes, you can define budget thresholds per category and receive notifications when you reach 80% or 100% of your limit.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 4: ACCOUNT SUMMARY */}
                  {txSubTab === 'Account Summary' && (
                    <div className="space-y-4">
                      <div className="bg-[#fcf5ff] border border-purple-100 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xs text-slate-500 font-semibold">Primary Account</div>
                            <div className="text-sm font-extrabold text-[#673391]">Savings Bank Account</div>
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                            Active
                          </span>
                        </div>
                        <div className="text-2xl font-black text-slate-900 pt-1">₹ 1,45,280.50</div>
                        <div className="text-xs text-slate-600 pt-2 border-t border-purple-100 flex justify-between">
                          <span>Branch: Main Branch, Hyderabad</span>
                          <span>IFSC: SBIN0001048</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </main>

      {/* Official Dark Navy Blue SBI Footer Bar */}
      <footer className="footer-copyright-sbi bg-[#0c3666] text-white py-2.5 px-6 text-xs font-normal w-full mt-auto border-t border-blue-900/30">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="copyright-left text-center md:text-left">
            <p className="p-0 m-0">© State Bank of India (APM Id:Serv_Tran_564)</p>
          </div>
          <div className="text-center md:text-right opacity-90">
            <p className="p-0 m-0">Site best viewed at 1280 × 720 resolution in Microsoft Edge 100+, Mozilla 100+, Google Chrome 111+</p>
          </div>
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
