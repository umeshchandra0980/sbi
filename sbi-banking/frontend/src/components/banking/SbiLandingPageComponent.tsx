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
  X,
  ArrowUpDown,
  Calendar,
  Filter,
  Building2,
  ShieldCheck
} from 'lucide-react';
import './SbiLandingPageComponent.css';
import SbiGlobalBrandHeader from './SbiGlobalBrandHeader';

interface SbiLandingPageComponentProps {
  initialTab?: 'Transaction' | 'Deposits' | 'Loans' | 'Investments' | 'Insurance';
  initialInvestmentSubTab?: 'Mutual Fund' | 'Demat & Securities' | 'PPF' | 'NPS' | 'IPO';
}

// Shield Illustration Component for Demat Onboarding
function ShieldIllustration({ className = "w-72 h-48" }: { className?: string }) {
  return (
    <div className={`${className} relative flex items-center justify-center select-none`}>
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Upward Growth Graph Bar 1 */}
        <rect x="180" y="55" width="22" height="85" rx="3" fill="#f8eef7" />
        {/* Upward Growth Graph Bar 2 */}
        <rect x="208" y="35" width="22" height="105" rx="3" fill="#fcf3fb" />
        
        {/* Upward Pink Trend Arrow */}
        <path d="M140 120 L175 90 L205 60 L235 40" stroke="#eed8ea" strokeWidth="4" strokeLinecap="round" />
        <path d="M225 38 L238 38 L238 51" stroke="#eed8ea" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Padlock on the left */}
        <rect x="25" y="90" width="22" height="18" rx="4" fill="#cbd5e1" />
        <path d="M30 90 V82 C30 76 42 76 42 82 V90" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
        <circle cx="36" cy="99" r="2" fill="#94a3b8" />

        {/* Document on the left */}
        <rect x="58" y="70" width="40" height="54" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
        <line x1="66" y1="82" x2="90" y2="82" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
        <line x1="66" y1="92" x2="86" y2="92" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
        <line x1="66" y1="102" x2="90" y2="102" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
        <line x1="66" y1="112" x2="82" y2="112" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />

        {/* Currency Notes on the right */}
        <rect x="175" y="85" width="50" height="28" rx="3" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" transform="rotate(8 200 99)" />
        <rect x="178" y="88" width="50" height="28" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" transform="rotate(15 203 102)" />
        <text x="203" y="104" fontSize="10" fontWeight="bold" fill="#94a3b8" textAnchor="middle" transform="rotate(15 203 102)">₹</text>

        {/* Base Ground Ellipse */}
        <ellipse cx="140" cy="138" rx="100" ry="6" fill="#e2e8f0" opacity="0.6" />

        {/* Shield (Main Guard) */}
        <path d="M95 62 C95 62 140 50 140 50 C140 50 185 62 185 62 C185 92 185 122 140 142 C95 122 95 92 95 62 Z" fill="#ffffff" stroke="#702082" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Inner Shield Accent */}
        <path d="M102 68 C102 68 140 60 140 60 C140 60 178 68 178 68 C178 92 178 116 140 134 C102 116 102 92 102 68 Z" fill="none" stroke="#eed8ea" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Rupee Circle Badge inside Shield */}
        <circle cx="140" cy="95" r="16" fill="#702082" />
        <text x="140" y="100" fontSize="15" fontWeight="extrabold" fill="#ffffff" textAnchor="middle">₹</text>

        {/* Plant sprouting from Shield Top */}
        <path d="M140 50 Q130 32 124 32" stroke="#702082" strokeWidth="2.5" fill="none" />
        <path d="M140 50 Q150 34 156 34" stroke="#702082" strokeWidth="2.5" fill="none" />
        
        {/* Leaves */}
        <path d="M124 32 C118 28 114 34 124 32 Z" fill="#c084fc" stroke="#702082" strokeWidth="1.5" />
        <path d="M156 34 C162 30 166 36 156 34 Z" fill="#c084fc" stroke="#702082" strokeWidth="1.5" />
      </svg>
    </div>
  );
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
  const [stmtDuration, setStmtDuration] = useState('Duration');
  const [stmtFy, setStmtFy] = useState('Financial Year');
  const [stmtFormat, setStmtFormat] = useState('Format');
  const [includeAllSummary, setIncludeAllSummary] = useState(false);
  const [includeNominee, setIncludeNominee] = useState(false);
  const [showAccountNo, setShowAccountNo] = useState(false);
  const [spendSubTab, setSpendSubTab] = useState<'Tutorials' | 'FAQs'>('Tutorials');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showNoRequestsModal, setShowNoRequestsModal] = useState(false);
  const [showDematDetails, setShowDematDetails] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [detailsSubTab, setDetailsSubTab] = useState<'Features' | 'Eligibility' | 'Documents required' | 'Tutorials'>('Features');
  const [npsCheck, setNpsCheck] = useState(false);
  const [npsTab, setNpsTab] = useState<'Features' | 'Eligibility' | 'Calculator'>('Features');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('showRequestsModal') === 'true') {
        setShowNoRequestsModal(true);
      }
    }
  }, []);

  // Pagination and interactive transaction fake data state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageTransactions: Record<number, Array<{
    date: string;
    description: string;
    amount: string;
    isDebit: boolean;
    balance: string;
  }>> = {
    1: [
      { date: '22/07/2026', description: 'UPI- TRANSFER TO 4897692162094 UPI/DR/656929883020/Navi Fin/UTIB/navifinser/Paid', amount: '17049.00', isDebit: true, balance: '0.09' },
      { date: '22/07/2026', description: 'UPI- TRANSFER TO 4897692162094 UPI/DR/656911895062/DUMPALA /HDFC/9959662775/Paid', amount: '15000.00', isDebit: true, balance: '17049.09' },
      { date: '22/07/2026', description: 'IMPS- TRANSFER FROM 4698313162099 IMPS/620317465123/ICN-XX876-KRAZYBEE/Disbursal', amount: '32047.00', isDebit: false, balance: '32049.09' },
      { date: '18/07/2026', description: 'IMPS- TRANSFER FROM 4698328162092 IMPS/619902229627/hsb-XX002-PAYU FIN/PennyDrop', amount: '1.00', isDebit: false, balance: '2.09' },
      { date: '17/07/2026', description: 'UPI- TRANSFER TO 4897694162092 UPI/DR/656419153122/MRS TANV/YESB/q879963732/Paid', amount: '25.00', isDebit: true, balance: '1.09' },
      { date: '06/07/2026', description: 'OTHER- ACHCr HDFC00678000009461 TATASTEELDIV 2026', amount: '4.00', isDebit: false, balance: '26.09' },
      { date: '25/06/2026', description: 'OTHER- CREDIT INTEREST', amount: '1.00', isDebit: false, balance: '22.09' },
      { date: '15/06/2026', description: 'UPI- TRANSFER TO 4897690162095 UPI/DR/616688224870/Vallurip/YESB/paytm.s1sq/UPI', amount: '20.00', isDebit: true, balance: '21.09' },
      { date: '15/06/2026', description: 'UPI- TRANSFER TO 4897690162095 UPI/DR/616663131408/Mr BOYA/FDRL/bharatpe.9/Pay t', amount: '25.00', isDebit: true, balance: '41.09' },
      { date: '15/06/2026', description: 'UPI- TRANSFER TO 4897690162095 UPI/DR/616662782722/SRINIVAS/YESB/q521049726/UPI', amount: '50.00', isDebit: true, balance: '66.09' }
    ],
    2: [
      { date: '14/06/2026', description: 'UPI- TRANSFER TO ZOMATO/DR/616588224870/Zomato/HDFC/zomato.pay/UPI', amount: '320.00', isDebit: true, balance: '116.09' },
      { date: '12/06/2026', description: 'IMPS- TRANSFER FROM 4698313162094 IMPS/620117465999/KRAZYBEE/Disbursal', amount: '10000.00', isDebit: false, balance: '436.09' },
      { date: '10/06/2026', description: 'ATM WDL/SBI KUNARAM BR/KUNARAM/Cash Withdrawal', amount: '2000.00', isDebit: true, balance: '10436.09' },
      { date: '08/06/2026', description: 'UPI- TRANSFER TO 4897692162094 UPI/DR/615911895062/DUMPALA /HDFC/9959662775/Paid', amount: '5000.00', isDebit: true, balance: '12436.09' },
      { date: '05/06/2026', description: 'NEFT/N2060538219/ELECTRICITY BOARD/SBIN/Bill Payment', amount: '1250.00', isDebit: true, balance: '17436.09' },
      { date: '01/06/2026', description: 'OTHER- ACHCr TATASTEEL DIVIDEND/Dividend Payment', amount: '120.00', isDebit: false, balance: '18686.09' },
      { date: '28/05/2026', description: 'UPI- TRANSFER TO 4897690162095 UPI/DR/614688224870/AmazonPay/AMZN/UPI', amount: '899.00', isDebit: true, balance: '18566.09' },
      { date: '24/05/2026', description: 'IMPS- TRANSFER FROM FRIEND/SBIN/Funds Received', amount: '500.00', isDebit: false, balance: '19465.09' },
      { date: '20/05/2026', description: 'UPI- TRANSFER TO SWIGGY/DR/Swiggy Food Delivery/Paid', amount: '450.00', isDebit: true, balance: '18965.09' },
      { date: '18/05/2026', description: 'OTHER- MONTHLY SAVINGS INTEREST/Interest Received', amount: '15.00', isDebit: false, balance: '19415.09' }
    ],
    3: [
      { date: '15/05/2026', description: 'UPI- TRANSFER TO Airtel Prepaid/Airtel Mobile Recharge/Paid', amount: '299.00', isDebit: true, balance: '19400.09' },
      { date: '10/05/2026', description: 'ATM WDL/SBI KALVASRIRAMPUR/PEDDAPALLI/Cash Withdrawal', amount: '1000.00', isDebit: true, balance: '19699.09' },
      { date: '08/05/2026', description: 'IMPS- TRANSFER FROM MOTHER/HDFC/Pocket Money', amount: '2000.00', isDebit: false, balance: '20699.09' },
      { date: '04/05/2026', description: 'UPI- TRANSFER TO Jio Fiber/Broadband Bill/Paid', amount: '1178.00', isDebit: true, balance: '18699.09' },
      { date: '01/05/2026', description: 'OTHER- CASH DEP PEDDAPALLI BR/Cash Deposit', amount: '5000.00', isDebit: false, balance: '19877.09' },
      { date: '28/04/2026', description: 'UPI- TRANSFER TO Netflix/DR/Netflix Subscription/Paid', amount: '649.00', isDebit: true, balance: '14877.09' },
      { date: '25/04/2026', description: 'OTHER- CREDIT INTEREST/Interest Received', amount: '1.00', isDebit: false, balance: '15526.09' },
      { date: '20/04/2026', description: 'UPI- TRANSFER TO Uber India/DR/Cab Ride/Paid', amount: '320.00', isDebit: true, balance: '15525.09' },
      { date: '15/04/2026', description: 'UPI- TRANSFER TO Swiggy/DR/Food Delivery/Paid', amount: '180.00', isDebit: true, balance: '15845.09' },
      { date: '12/04/2026', description: 'NEFT- CHARGES FOR IMPS/Bank Charges', amount: '5.00', isDebit: true, balance: '16025.09' }
    ]
  };

  const getPageData = (page: number) => {
    const baseList = pageTransactions[page] || pageTransactions[1];
    
    // Extend base list up to 55 items dynamically so rowsPerPage dropdown works up to 50
    const fullList = [...baseList];
    while (fullList.length < 55) {
      const idx = fullList.length;
      const day = String((28 - (idx % 20)) || 1).padStart(2, '0');
      const month = String(((7 - (page % 5) + (idx % 3)) % 12) || 12).padStart(2, '0');
      const amountValue = ((idx + 1) * page * 42.5) % 1500 + 4.5;
      const isDebit = idx % 2 === 0;
      
      fullList.push({
        date: `${day}/${month}/2026`,
        description: isDebit 
          ? `UPI- TRANSFER TO ${4897690162000 + idx} UPI/DR/${656911000000 + idx}/Paid`
          : `IMPS- TRANSFER FROM ${4698313162000 + idx} IMPS/${620317000000 + idx}/Disbursal`,
        amount: amountValue.toFixed(2),
        isDebit,
        balance: (100.09 + (idx * 55)).toFixed(2)
      });
    }
    return fullList;
  };

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
        <div className="sbi-breadcrumb select-none">
          <Link href="/dashboard" className="sbi-bc-home">
            <Home size={15} />
          </Link>
          <span className="sbi-bc-sep">&gt;</span>
          {showDematDetails ? (
            <>
              <span className="sbi-bc-current cursor-pointer hover:underline" onClick={() => setShowDematDetails(false)}>Relationship Overview</span>
              <span className="sbi-bc-sep">&gt;</span>
              <span className="sbi-bc-current">Demat & Securities</span>
            </>
          ) : (
            <span className="sbi-bc-current">Relationship Overview</span>
          )}
        </div>

        {/* 4. SUB-NAVIGATION TABS BAR (Transaction Accounts | Deposits | Loans | Investments | Insurance) */}
        {!showDematDetails && (
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
        )}

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
              {showDematDetails ? (
                /* ----------------- DETAILED ONBOARDING PAGE (Screenshot 3 & 4) ----------------- */
                <div className="space-y-6">
                  {/* Page Title */}
                  <h1 className="text-[26px] font-bold text-[#702082] tracking-tight">
                    Demat & Trading Account
                  </h1>

                  {/* Main Container Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-8 min-h-[480px]">
                    {/* Top Row: Steps on Left, Illustration + Button on Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-100 pb-8 mb-6">
                      
                      {/* Left Column: Steps */}
                      <div className="lg:col-span-6 space-y-6">
                        <h2 className="text-xl font-bold text-[#702082] leading-tight mb-8">
                          Open your Demat Account with SBICAP Securities
                        </h2>

                        <div className="space-y-6 pl-1">
                          {/* Step 1 */}
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full border border-purple-100 bg-[#fcfaff] flex items-center justify-center shrink-0 shadow-2xs">
                              <Building2 size={20} className="text-[#702082]" />
                            </div>
                            <span className="text-[14px] font-semibold text-slate-700 ml-4">
                              Select bank account
                            </span>
                          </div>

                          {/* Step 2 */}
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full border border-purple-100 bg-[#fcfaff] flex items-center justify-center shrink-0 shadow-2xs">
                              <FileText size={20} className="text-[#702082]" />
                            </div>
                            <span className="text-[14px] font-semibold text-slate-700 ml-4">
                              Review and verify details
                            </span>
                          </div>

                          {/* Step 3 */}
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full border border-purple-100 bg-[#fcfaff] flex items-center justify-center shrink-0 shadow-2xs">
                              <ShieldCheck size={20} className="text-[#702082]" />
                            </div>
                            <span className="text-[14px] font-semibold text-slate-700 ml-4">
                              Seamless e-sign
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Graphic & Open Button */}
                      <div className="lg:col-span-6 flex flex-col items-center justify-center pt-4 lg:pt-0">
                        {/* Shield Illustration */}
                        <ShieldIllustration className="w-72 h-48 mb-4" />

                        {/* Open Button */}
                        <button
                          type="button"
                          onClick={() => setShowDisclaimer(true)}
                          className="w-full max-w-sm py-3 px-8 text-sm font-bold rounded-full bg-[#702082] text-white hover:bg-[#5c1a6b] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer mt-4"
                        >
                          Open Demat & Trading Account
                        </button>
                      </div>

                    </div>

                    {/* Features, Eligibility, Documents required, Tutorials Subtabs Block (Screenshot 4) */}
                    <div className="mt-8">
                      <div className="flex items-center gap-8 border-b border-slate-100 pb-2 mb-6">
                        {(['Features', 'Eligibility', 'Documents required', 'Tutorials'] as const).map((tab) => {
                          const isActive = detailsSubTab === tab;
                          return (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setDetailsSubTab(tab)}
                              className={`text-xs font-bold transition-all relative pb-2 ${
                                isActive ? 'text-[#702082]' : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              <span>{tab}</span>
                              {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#702082] rounded-full" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Features Tab Content */}
                      {detailsSubTab === 'Features' ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Feature Card 1 */}
                          <div className="bg-[#fcfaff] border border-[#702082]/10 rounded-xl p-5 shadow-2xs flex flex-col space-y-4 hover:shadow-xs transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#702082] shadow-3xs border border-[#702082]/5">
                              <FileText size={18} />
                            </div>
                            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                              Zero account opening charges and no paperwork
                            </p>
                          </div>

                          {/* Feature Card 2 */}
                          <div className="bg-[#fcfaff] border border-[#702082]/10 rounded-xl p-5 shadow-2xs flex flex-col space-y-4 hover:shadow-xs transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#702082] shadow-3xs border border-[#702082]/5">
                              <ShieldCheck size={18} />
                            </div>
                            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                              Zero maintenance charges for the first year
                            </p>
                          </div>

                          {/* Feature Card 3 */}
                          <div className="bg-[#fcfaff] border border-[#702082]/10 rounded-xl p-5 shadow-2xs flex flex-col space-y-4 hover:shadow-xs transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#702082] shadow-3xs border border-[#702082]/5">
                              <TrendingUp size={18} />
                            </div>
                            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                              Track your investments easily on YONO and get e-statements instantly
                            </p>
                          </div>

                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-xs text-slate-500 font-semibold text-center">
                          Details for {detailsSubTab} will be available shortly.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* ----------------- STANDING MENU/GRID LAYOUT (Screenshot 1 & 2) ----------------- */
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

                    {/* Vertical Menu Buttons */}
                    {(['Mutual Fund', 'Demat & Securities', 'PPF', 'NPS', 'IPO'] as const).map((subItem) => {
                      const isSelected = investmentSubTab === subItem;
                      return (
                        <button
                          key={subItem}
                          type="button"
                          onClick={() => setInvestmentSubTab(subItem)}
                          className={`sbi-inv-menu-btn select-none ${isSelected ? 'selected' : ''}`}
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
                      <div className="sbi-inv-header-tag select-none">
                        {investmentSubTab === 'Demat & Securities' 
                          ? 'Manage Demat & Securities' 
                          : investmentSubTab === 'PPF' 
                            ? 'Public Provident Fund (PPF)' 
                            : investmentSubTab === 'NPS'
                              ? 'National Pension System (NPS)'
                              : investmentSubTab}
                      </div>

                      {/* Content Selection check */}
                      {investmentSubTab === 'Demat & Securities' && (
                        /* Demat & Securities Landing View (Screenshot 1 & 2) */
                        <div className="p-8 flex-1 flex flex-col justify-between items-start text-left bg-white w-full h-full">
                          <h2 className="text-[20px] font-bold text-[#702082] tracking-tight mb-2 pl-4">
                            Open Demat & Trading Account
                          </h2>

                          {/* Centered Graphic and Callouts inside Card */}
                          <div className="w-full flex-1 flex flex-col items-center justify-center py-4">
                            <ShieldIllustration className="w-80 h-52 mb-4" />
                            <p className="text-xs text-slate-500 font-semibold mb-6">
                              Start investing today with SBI Securities!
                            </p>

                            <button
                              type="button"
                              onClick={() => setShowDematDetails(true)}
                              className="py-3 px-12 text-sm font-bold rounded-full bg-[#702082] text-white hover:bg-[#5c1a6b] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                            >
                              Get Started
                            </button>
                            <p className="text-xs text-slate-500 mt-4">Open a Demat & Securities account to trade stocks, mutual funds, and more with SBI Securities.</p>
                            <ul className="list-disc list-inside text-xs text-slate-500 mt-2">
                              <li>Seamless account opening</li>
                              <li>Access to research reports</li>
                              <li>Competitive brokerage rates</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {investmentSubTab === 'PPF' && (
                        /* PPF View (Screenshot 1) */
                        <div className="p-8 flex-1 flex flex-col justify-between items-start text-left bg-white w-full h-full">
                          <h2 className="text-[20px] font-bold text-[#702082] tracking-tight mb-2 pl-4">
                            Open PPF Account
                          </h2>

                          {/* Centered Graphic and Callouts inside Card */}
                          <div className="w-full flex-1 flex flex-col items-center justify-center py-4">
                            {/* PPF SVG Onboarding Illustration */}
                            <div className="w-80 h-52 mb-4 relative flex items-center justify-center select-none">
                              <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                {/* Bank Building in background */}
                                <path d="M50 140 L270 140 M60 140 L60 85 M260 140 L260 85 M80 140 L80 85 M240 140 L240 85 M100 140 L100 85 M220 140 L220 85" stroke="#ebd6ea" strokeWidth="2.5" />
                                <path d="M50 85 L270 85 L160 40 Z" fill="#fcf3fb" stroke="#ebd6ea" strokeWidth="2.5" strokeLinejoin="round" />
                                <circle cx="160" cy="65" r="9" fill="#ffffff" stroke="#ebd6ea" strokeWidth="2" />
                                <rect x="50" y="140" width="220" height="8" fill="#eed8ea" />

                                {/* Base Ground Ellipse */}
                                <ellipse cx="160" cy="155" rx="120" ry="7" fill="#cbd5e1" opacity="0.4" />

                                {/* Piggy Bank on the left */}
                                <ellipse cx="90" cy="120" rx="22" ry="16" fill="#bfdbfe" />
                                <path d="M100 106 C105 106 109 110 109 114" stroke="#1e3a8a" strokeWidth="1.5" />
                                <rect x="74" y="132" width="6" height="8" rx="2" fill="#93c5fd" />
                                <rect x="100" y="132" width="6" height="8" rx="2" fill="#93c5fd" />
                                <circle cx="82" cy="115" r="1.5" fill="#1e3a8a" />
                                <text x="90" y="124" fontSize="10" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">₹</text>

                                {/* Shield on the right */}
                                <path d="M210 105 C210 105 230 100 230 100 C230 100 250 105 250 105 C250 120 250 135 230 145 C210 135 210 120 210 105 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                                <text x="230" y="126" fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">₹</text>

                                {/* Clipboard (Center) */}
                                <rect x="125" y="70" width="70" height="90" rx="6" fill="#ffffff" stroke="#302985" strokeWidth="3" />
                                <rect x="145" y="64" width="30" height="8" rx="3" fill="#302985" />
                                
                                {/* Onboard Profile avatar */}
                                <circle cx="160" cy="98" r="11" fill="#3b82f6" />
                                <circle cx="160" cy="95" r="4.5" fill="#ffffff" />
                                <path d="M152 106 C152 102 155 102 160 102 C165 102 168 102 168 106" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />

                                {/* Checklist lines inside clipboard */}
                                <line x1="135" y1="118" x2="185" y2="118" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                                <line x1="135" y1="126" x2="180" y2="126" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                                <line x1="135" y1="134" x2="170" y2="134" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="135" y1="142" x2="160" y2="142" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

                                {/* Check Badge */}
                                <circle cx="125" cy="72" r="9" fill="#ec4899" />
                                <path d="M121 72 L124 75 L129 70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                                {/* Percentage Badge */}
                                <circle cx="185" cy="142" r="10" fill="#fce7f3" />
                                <text x="185" y="145" fontSize="10" fontWeight="bold" fill="#be185d" textAnchor="middle">%</text>
                              </svg>
                            </div>
                            <p className="text-xs text-slate-500 font-semibold mb-6">
                              Start saving for your future with SBI PPF!
                            </p>

                            <button
                              type="button"
                              onClick={() => toast.success("Opening PPF Account Form...")}
                              className="py-3 px-12 text-sm font-bold rounded-full bg-[#702082] text-white hover:bg-[#5c1a6b] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                            >
                              Get Started
                            </button>
                            {/* Additional content for longer page */}
                            <div className="mt-6 space-y-4">
                              <p className="text-sm text-slate-600">Public Provident Fund (PPF) offers a safe, government‑backed avenue for long‑term savings with tax benefits.</p>
                              <ul className="list-disc list-inside text-sm text-slate-600">
                                <li>Earn attractive interest rates, compounded annually.</li>
                                <li>Tax‑free interest and principal amount.</li>
                                <li>Lock‑in period of 15 years, with partial withdrawals allowed after 5 years.</li>
                              </ul>
                              <p className="text-sm text-slate-600">Start your PPF journey today and secure your financial future with a disciplined savings plan.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {investmentSubTab === 'NPS' && (
                        /* NPS View (Screenshot 2, 3, 4) */
                        <div className="p-8 flex-1 flex flex-col justify-between items-stretch text-left bg-white w-full h-full space-y-6">
                          
                          {/* Title and Contribution Option Box */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-4">
                            <h2 className="text-[20px] font-bold text-[#702082] tracking-tight pl-2">
                              NPS Account
                            </h2>
                            <button
                              type="button"
                              onClick={() => toast.success("Opening NPS Contribution Page...")}
                              className="border border-[#702082]/10 hover:border-[#702082]/40 bg-[#fcfaff] rounded-xl p-3 flex items-center gap-3 transition-colors text-left max-w-md cursor-pointer group shadow-2xs"
                            >
                              <div className="w-8 h-8 rounded-full bg-[#702082]/10 flex items-center justify-center text-[#702082] shrink-0 group-hover:scale-105 transition-transform">
                                <TrendingUp size={16} />
                              </div>
                              <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                                Make one time contribution to self/other NPS Accounts &gt;
                              </span>
                            </button>
                          </div>

                          {/* 3 NPS Info cards in a row */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Card 1: Tax Savings */}
                            <div className="bg-gradient-to-br from-[#a21caf] to-[#b5179e] text-white rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                              <div className="space-y-1 pr-1">
                                <h4 className="text-xs font-bold tracking-wide">Tax savings</h4>
                                <p className="text-[10px] text-purple-100/90 leading-tight">Minimize taxes with smart investment</p>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white font-bold text-lg select-none">
                                %
                              </div>
                            </div>

                            {/* Card 2: Secured Retirements */}
                            <div className="bg-[#702082] text-white rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                              <div className="space-y-1 pr-1">
                                <h4 className="text-xs font-bold tracking-wide">Secured retirements</h4>
                                <p className="text-[10px] text-purple-100/90 leading-tight">Plan carefully for a stable financial future</p>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white">
                                <Building2 size={18} />
                              </div>
                            </div>

                            {/* Card 3: Wealth Creation */}
                            <div className="bg-[#302985] text-white rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                              <div className="space-y-1 pr-1">
                                <h4 className="text-xs font-bold tracking-wide">Wealth creation</h4>
                                <p className="text-[10px] text-indigo-100/90 leading-tight">Invest wisely to build long term prosperity</p>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-white">
                                <ShieldCheck size={18} />
                              </div>
                            </div>
                          </div>

                          {/* Subtabs and features bullet list box */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-6 border-b border-slate-100 pb-2">
                              {(['Features', 'Eligibility', 'Calculator'] as const).map((tab) => {
                                const isActive = npsTab === tab;
                                return (
                                  <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setNpsTab(tab)}
                                    className={`text-xs font-bold transition-all relative pb-2 ${
                                      isActive ? 'text-[#702082]' : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                  >
                                    <span>{tab}</span>
                                    {isActive && (
                                      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#702082] rounded-full" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Subtabs text box */}
                            {npsTab === 'Features' ? (
                              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100/85 text-[11.5px] text-[#475569] leading-relaxed space-y-3 relative font-normal shadow-3xs">
                                <div className="font-bold text-slate-800 text-xs">All Citizen Model</div>
                                <ul className="space-y-2 text-[11px]">
                                  <li className="list-disc pl-1 ml-4">
                                    National Pension System (NPS) is a voluntary retirement savings plan where you can define your contributions.
                                  </li>
                                  <li className="list-disc pl-1 ml-4">
                                    Regulated by the Pension Fund Regulatory and Development Authority (PFRDA).
                                  </li>
                                  <li className="list-disc pl-1 ml-4">
                                    Flexibility to select a Pension Fund Manager (PFM) of your choice and change PFM once every financial year.
                                  </li>
                                  <li className="list-disc pl-1 ml-4">
                                    Option to define your asset allocation and change it up to four times in a financial year.
                                  </li>
                                  <li className="list-disc pl-1 ml-4">
                                    Portable across jobs and geographies.
                                  </li>
                                  <li className="list-disc pl-1 ml-4">
                                    It offers two accounts: Tier-I and Tier-II with three investment options (Active, Auto & Balanced Life Cycle Funds). In active choice, the allocation is decided by the subscriber. In auto choice, subscribers are completely assisted in asset allocation decisions. Balanced Life cycle fund allows automatic rebalancing of the asset classes as per age and risk profile of the subscriber.
                                  </li>
                                </ul>
                                <div className="text-right">
                                  <button type="button" onClick={() => toast.success("Showing more features...")} className="text-[#702082] hover:underline font-bold text-[10px]">
                                    View more ▾
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-xs text-slate-500 font-semibold text-center shadow-3xs">
                                NPS {npsTab} information will be available shortly.
                              </div>
                            )}
                          </div>

                          {/* Pre-existing checkbox declaration and Apply Now footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-slate-100 pt-5 mt-4">
                            <label className="flex items-center gap-2.5 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={npsCheck}
                                onChange={(e) => setNpsCheck(e.target.checked)}
                                className="rounded border-slate-300 text-[#702082] focus:ring-[#702082] w-4 h-4 cursor-pointer accent-[#702082]"
                              />
                              <span className="text-xs text-slate-600 font-medium">I do not hold any pre-existing account under NPS</span>
                            </label>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => toast.success("NPS account verification started")}
                                className="border border-[#702082] hover:bg-[#702082]/5 text-[#702082] px-6 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-3xs"
                              >
                                Add my NPS Account
                              </button>
                              <button
                                type="button"
                                disabled={!npsCheck}
                                onClick={() => toast.success("Opening NPS Onboarding Application Form...")}
                                className={`px-8 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                                  npsCheck 
                                    ? 'bg-[#702082] hover:bg-[#5c1a6b] text-white cursor-pointer' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                              >
                                <span>Apply Now</span>
                                <ArrowRight size={13} />
                              </button>
                            </div>
                          </div>

                        </div>
                      )}

                      {investmentSubTab !== 'Demat & Securities' && investmentSubTab !== 'PPF' && investmentSubTab !== 'NPS' && (
                        /* Standard Coming Soon page for Mutual Fund and IPO tabs */
                        <div className="p-8 flex-1 flex flex-col items-center justify-center text-center">
                          {/* Hourglass/Phone vector */}
                          <div className="w-56 h-48 relative mb-4 flex items-center justify-center">
                            <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                              <ellipse cx="100" cy="115" rx="75" ry="25" fill="#f3e8ff" opacity="0.6" />
                              <path d="M125 45 C125 45 155 45 155 70 C155 85 140 95 140 95 C140 95 155 105 155 120 C155 145 125 145 125 145 L125 45 Z" fill="#fce7f3" opacity="0.7" />
                              <path d="M130 50 L150 50 L140 80 Z" fill="#ec4899" opacity="0.3" />
                              <rect x="75" y="25" width="50" height="95" rx="8" fill="#ffffff" stroke="#30135d" strokeWidth="3" />
                              <rect x="90" y="29" width="20" height="3" rx="1.5" fill="#e2e8f0" />
                              <circle cx="100" cy="112" r="3" fill="#e2e8f0" />
                              <rect x="83" y="70" width="34" height="6" rx="3" fill="#fce7f3" />
                              <rect x="83" y="70" width="22" height="6" rx="3" fill="#d92588" />
                              <circle cx="87" cy="73" r="1" fill="#ffffff" />
                              <circle cx="92" cy="73" r="1" fill="#ffffff" />
                              <circle cx="97" cy="73" r="1" fill="#ffffff" />
                              <path d="M50 100 C40 60 70 40 75 50" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                              <path d="M130 90 C150 70 140 50 145 60" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                            </svg>
                          </div>
                          <h2 className="text-lg font-extrabold text-[#30135d] mb-1.5">Coming Soon</h2>
                          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                            We are preparing to help you access this Service shortly
                          </p>
                          <p className="text-xs text-slate-500 mt-4">
                            Explore Mutual Funds with a variety of options to grow your wealth.
                          </p>
                          <ul className="list-disc list-inside text-xs text-slate-500 mt-2">
                            <li>Diversified portfolio options</li>
                            <li>Professional fund management</li>
                            <li>Easy SIP investments</li>
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              )}

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
            <div className="flex flex-col space-y-6">
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

                {txSubTab === 'Spend Analysis' ? (
                  // Special Sidebar Content for Spend Analysis (Matching Screenshot Exactly)
                  <div className="space-y-4 pt-1">
                    <div className="flex justify-end items-center gap-2.5 text-xs font-semibold text-slate-700 pr-2">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-[#702082] focus:ring-[#702082] w-4 h-4 cursor-pointer accent-[#702082]"
                      />
                      <span>Select All</span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => toast('Add a New Account')}
                        className="text-[#702082] hover:opacity-85 font-bold text-[15px] text-left block transition-opacity"
                      >
                        Add a New Account +
                      </button>
                    </div>

                    <div className="border-b border-slate-200/60 my-4" />

                    <div>
                      <button
                        type="button"
                        onClick={() => toast('Add a New Credit Card')}
                        className="text-[#702082] hover:opacity-85 font-bold text-[15px] text-left block transition-opacity"
                      >
                        Add a New Credit Card +
                      </button>
                    </div>
                  </div>
                ) : (
                  // Standard Sidebar Content for Account Summary, Transactions, and Statements
                  <>
                    {/* Savings Account Card */}
                    <div>
                      <div className="bg-[#702082] text-white py-6.5 px-6 rounded-2xl shadow-xs space-y-1.5">
                        <div className="text-[11px] font-bold opacity-80 uppercase tracking-wide">A/C Number</div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm tracking-wider font-semibold">
                            {showAccountNo ? '10849207054' : 'XXXXXXX7054'}
                          </span>
                          <button 
                            type="button" 
                            onClick={() => setShowAccountNo(!showAccountNo)}
                            className="text-white hover:opacity-80 transition-opacity"
                            title={showAccountNo ? "Hide Account Number" : "Show Account Number"}
                          >
                            {showAccountNo ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <button
                      type="button"
                      onClick={() => router.push('/accounts/open-savings-account')}
                      className="w-full text-left bg-[#f3eef9] text-[#702082] text-[13px] font-bold py-7 px-6 rounded-2xl flex items-center justify-between hover:bg-[#e9ddf2] transition-colors border border-transparent"
                    >
                      <span>Apply for a new Savings Account</span>
                      <ArrowRight size={16} className="text-[#702082]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toast('Opening Joint Savings Account Application')}
                      className="w-full text-left bg-[#f3eef9] text-[#702082] text-[13px] font-bold py-7 px-6 rounded-2xl flex items-center justify-between hover:bg-[#e9ddf2] transition-colors border border-transparent"
                    >
                      <span>Apply for Joint Savings Account</span>
                      <ArrowRight size={16} className="text-[#702082]" />
                    </button>

                    {/* Current Account Section */}
                    <div>
                      <div className="text-sm font-bold text-[#702082] mb-3 mt-6">Current Account</div>
                      <button
                        type="button"
                        onClick={() => toast('Opening Current Account Application')}
                        className="w-full text-left bg-[#f3eef9] text-[#702082] text-[13px] font-bold py-7 px-6 rounded-2xl flex items-center justify-between hover:bg-[#e9ddf2] transition-colors border border-transparent"
                      >
                        <span>Apply for a new Current Account</span>
                        <ArrowRight size={16} className="text-[#702082]" />
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
                  </>
                )}

              </div>

              {/* Right Main Workspace Column (9/12 width) */}
              <div className="md:col-span-9 space-y-4">
                
                {/* Account Top Purple Strip Header */}
                <div className="flex items-center justify-between border-b border-purple-100 pb-0.5">
                  <div className="bg-[#702082] text-white py-2 px-5 rounded-t-xl rounded-b-sm flex items-center gap-4 text-xs font-bold tracking-wide shadow-sm">
                    <span>SAVINGS A/C</span>
                    <span className="font-mono opacity-90">
                      {showAccountNo ? '10849207054' : 'XXXXXXX7054'}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => setShowAccountNo(!showAccountNo)} 
                      className="hover:opacity-85 transition-opacity"
                    >
                      {showAccountNo ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => toast('Manage Account Settings')} 
                    className="text-xs font-bold text-[#702082] hover:underline flex items-center gap-1"
                  >
                    <FileText size={14} className="text-[#702082]" />
                    <span>Manage Account</span>
                  </button>
                </div>

                {/* Sub-Tabs Bar (Account Summary | Transactions | Statements | Spend Analysis) */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[460px]">
                  
                  <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
                    {(['Account Summary', 'Transactions', 'Statements', 'Spend Analysis'] as const).map((subTab) => {
                      const isSubActive = txSubTab === subTab;
                      return (
                        <button
                          key={subTab}
                          type="button"
                          onClick={() => setTxSubTab(subTab)}
                          className={`text-sm font-semibold transition-all relative pb-3 -mb-[1px] ${
                            isSubActive ? 'text-[#702082] font-bold' : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <span>{subTab}</span>
                          {isSubActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#702082] rounded-t" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* SUB-VIEW 1: TRANSACTIONS (EXACT MATCH TO IMAGES 2 & 3) */}
                  {txSubTab === 'Transactions' && (
                    <div className="space-y-4">
                      {/* Search & Filter Control Bar */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                        <div className="relative flex-1 w-full max-w-md">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search by name, amount, cheque no.,remarks"
                            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#702082]"
                          />
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                          <button type="button" onClick={() => toast('Sort option')} className="flex items-center gap-1.5 text-[#702082] hover:opacity-80 transition-opacity">
                            <ArrowUpDown size={13} />
                            <span>Sort</span>
                          </button>
                          <button type="button" onClick={() => toast('Select Duration option')} className="flex items-center gap-1.5 text-[#702082] hover:opacity-80 transition-opacity">
                            <Calendar size={13} />
                            <span>Select Duration</span>
                          </button>
                          <button type="button" onClick={() => toast('Filters option')} className="flex items-center gap-1.5 text-[#702082] hover:opacity-80 transition-opacity">
                            <Filter size={13} />
                            <span>Filters</span>
                          </button>
                        </div>
                      </div>

                      {/* Transactions Table (Matching Screenshot Exact Rows dynamically) */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#f4edf9] text-[#702082] font-bold border-b border-[#e9ddf2]">
                              <th className="py-2.5 px-4">Date</th>
                              <th className="py-2.5 px-4">Description</th>
                              <th className="py-2.5 px-4 text-right">Amount (Rs.)</th>
                              <th className="py-2.5 px-4 text-right">Balance (Rs.)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {getPageData(currentPage).slice(0, rowsPerPage).map((tx, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                                <td className="py-3 px-4 font-semibold text-slate-800">{tx.date}</td>
                                <td className="py-3 px-4 max-w-md leading-relaxed text-slate-600">
                                  {tx.description}
                                </td>
                                <td className={`py-3 px-4 text-right font-bold ${tx.isDebit ? 'text-red-600' : 'text-emerald-600'}`}>
                                  {tx.isDebit ? '↗' : '↙'} ₹ {Number(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-3 px-4 text-right font-bold text-slate-800">
                                  ₹{Number(tx.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Bar (Matching Screenshot 2 Exactly and fully responsive) */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 mt-4 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                        <div className="hidden sm:block w-32"></div>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            type="button" 
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`transition-colors ${currentPage === 1 ? 'text-slate-400 cursor-not-allowed' : 'text-[#702082] hover:underline'}`}
                          >
                            Previous
                          </button>
                          
                          {[1, 2, 3].map((page) => (
                            <button 
                              key={page}
                              type="button" 
                              onClick={() => setCurrentPage(page)}
                              className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-all ${
                                currentPage === page 
                                  ? 'bg-[#702082] text-white' 
                                  : 'text-slate-600 hover:text-[#702082] hover:bg-purple-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          
                          <span className="w-6 h-6 flex items-center justify-center">...</span>
                          
                          <button 
                            type="button" 
                            onClick={() => setCurrentPage(15)}
                            className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-all ${
                              currentPage === 15 
                                ? 'bg-[#702082] text-white' 
                                : 'text-slate-600 hover:text-[#702082] hover:bg-purple-50'
                            }`}
                          >
                            15
                          </button>
                          
                          <button 
                            type="button" 
                            onClick={() => currentPage < 15 && setCurrentPage(currentPage + 1)}
                            disabled={currentPage === 15}
                            className={`text-[#702082] hover:underline flex items-center gap-0.5 ${currentPage === 15 ? 'text-slate-400 cursor-not-allowed' : ''}`}
                          >
                            <span>Next</span>
                            <span>›</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-slate-600 font-semibold">
                          <span>Rows per page</span>
                          <div className="relative">
                            <select 
                              value={rowsPerPage}
                              onChange={(e) => setRowsPerPage(Number(e.target.value))}
                              className="appearance-none border border-slate-200 rounded px-2.5 py-0.5 pr-6 bg-white focus:outline-none focus:border-[#702082] text-xs font-semibold cursor-pointer"
                            >
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={50}>50</option>
                            </select>
                            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 2: STATEMENTS (EXACT MATCH TO IMAGES 1 & 2) */}
                  {txSubTab === 'Statements' && (
                    <div className="space-y-6 max-w-4xl">
                      <h3 className="text-base font-extrabold text-[#702082] tracking-wide">Request Statement</h3>
                      
                      {/* Radio Select Row (Aligned using the exact same grid column layout as the dropdowns below) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                        <label className={`flex items-center gap-2.5 cursor-pointer select-none transition-colors ${stmtOption === 'duration' ? 'text-slate-800 font-medium' : 'text-slate-400 font-normal'}`}>
                          <input
                            type="radio"
                            name="stmtOption"
                            checked={stmtOption === 'duration'}
                            onChange={() => setStmtOption('duration')}
                            className="accent-[#702082] w-4 h-4 cursor-pointer"
                          />
                          <span>Select Duration</span>
                        </label>
                        <label className={`flex items-center gap-2.5 cursor-pointer select-none transition-colors ${stmtOption === 'fy' ? 'text-slate-800 font-medium' : 'text-slate-400 font-normal'}`}>
                          <input
                            type="radio"
                            name="stmtOption"
                            checked={stmtOption === 'fy'}
                            onChange={() => setStmtOption('fy')}
                            className="accent-[#702082] w-4 h-4 cursor-pointer"
                          />
                          <span>Select Financial Year</span>
                        </label>
                      </div>
 
                      {/* Dropdown Selectors Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                        {/* Duration Field */}
                        <div>
                          <div className="relative">
                            <select 
                              value={stmtDuration}
                              onChange={(e) => setStmtDuration(e.target.value)}
                              disabled={stmtOption !== 'duration'}
                              className={`w-full py-2 bg-transparent border-b focus:outline-none pr-8 text-sm font-normal cursor-pointer appearance-none transition-colors opacity-100 disabled:opacity-100 ${
                                stmtOption === 'duration' 
                                  ? 'text-slate-600 border-slate-300 focus:border-[#702082]' 
                                  : 'text-slate-300 border-slate-100'
                              }`}
                            >
                              <option value="Duration">Duration</option>
                              <option value="1 Month">1 Month</option>
                              <option value="3 Months">3 Months</option>
                              <option value="6 Months">6 Months</option>
                              <option value="1 Year">1 Year</option>
                            </select>
                            <ChevronDown 
                              size={16} 
                              className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                                stmtOption === 'duration' ? 'text-[#702082]' : 'text-slate-300'
                              }`} 
                            />
                          </div>
                        </div>
 
                        {/* Financial Year Field */}
                        <div>
                          <div className="relative">
                            <select 
                              value={stmtFy}
                              onChange={(e) => setStmtFy(e.target.value)}
                              disabled={stmtOption !== 'fy'}
                              className={`w-full py-2 bg-transparent border-b focus:outline-none pr-8 text-sm font-normal cursor-pointer appearance-none transition-colors opacity-100 disabled:opacity-100 ${
                                stmtOption === 'fy' 
                                  ? 'text-slate-600 border-slate-300 focus:border-[#702082]' 
                                  : 'text-slate-300 border-slate-100'
                              }`}
                            >
                              <option value="Financial Year">Financial Year</option>
                              <option value="2025-2026">2025 - 2026</option>
                              <option value="2024-2025">2024 - 2025</option>
                              <option value="2023-2024">2023 - 2024</option>
                            </select>
                            <ChevronDown 
                              size={16} 
                              className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                                stmtOption === 'fy' ? 'text-[#702082]' : 'text-slate-300'
                              }`} 
                            />
                          </div>
                        </div>

                        {/* Format Selector */}
                        <div>
                          <div className="relative">
                            <select 
                              value={stmtFormat}
                              onChange={(e) => setStmtFormat(e.target.value)}
                              className="w-full py-2 bg-transparent border-b border-slate-300 focus:outline-none focus:border-[#702082] pr-8 text-sm font-normal text-slate-600 cursor-pointer appearance-none transition-colors"
                            >
                              <option value="Format">Format</option>
                              <option value="PDF">PDF</option>
                              <option value="Excel">Excel</option>
                              <option value="Text">Text</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#702082] pointer-events-none" />
                          </div>
                        </div>

                        {/* Spacer empty cell */}
                        <div className="hidden md:block"></div>
                      </div>
 
                      {/* Checkboxes */}
                      <div className="space-y-4 pt-2 text-[13px] font-normal text-slate-500">
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={includeAllSummary}
                            onChange={(e) => setIncludeAllSummary(e.target.checked)}
                            className="rounded border-slate-300 text-[#702082] focus:ring-[#702082] w-4 h-4 cursor-pointer accent-[#702082]"
                          />
                          <div className="flex items-center gap-1">
                            <span>Include all account summary</span>
                            <span className="text-[#702082] font-normal text-sm cursor-help hover:opacity-80">ⓘ</span>
                          </div>
                        </label>
 
                        <label className="flex items-center gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={includeNominee}
                            onChange={(e) => setIncludeNominee(e.target.checked)}
                            className="rounded border-slate-300 text-[#702082] focus:ring-[#702082] w-4 h-4 cursor-pointer accent-[#702082]"
                          />
                          <span>Include nominee details</span>
                        </label>
                      </div>

                      {/* Password Logic Info Callout Box */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                          <span>Password Logic</span>
                          <span className="text-[#702082] text-[13px] font-bold cursor-help hover:opacity-80">ⓘ</span>
                        </div>
                        <div className="bg-[#f5effa] border border-[#e2d4eb] rounded-lg p-3 text-xs flex items-center gap-2">
                          <span className="text-[#702082] text-sm font-bold">ⓘ</span>
                          <span className="font-semibold text-[#702082]">Maximum 5 downloads per account in day. 2000 transactions per download.</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 3: SPEND ANALYSIS (EXACT MATCH TO IMAGE 3 & 4) */}
                  {txSubTab === 'Spend Analysis' && (
                    <div className="space-y-6">
                      <h2 className="text-3xl font-bold text-[#702082] tracking-tight">
                        Welcome to your Spend Analysis!
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                        
                        {/* Left Card Callout (Fitted with h-full flex layout to stretch alongside the right column) */}
                        <div className="relative overflow-hidden bg-[#f6ecf5] rounded-2xl p-6 py-8 shadow-sm border border-[#702082]/5 h-full flex flex-col justify-center">
                          
                          {/* Beautiful Abstract Pink Waves Background matching screenshot exactly */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                            <svg className="absolute right-0 bottom-0 w-[120%] h-full" viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                              {/* Darker Wave */}
                              <path d="M60 160 C150 115 250 55 360 75 L360 160 Z" fill="#edd6ea" />
                              {/* Lighter Wave */}
                              <path d="M0 160 C100 135 200 95 360 105 L360 160 Z" fill="#f5e1f3" opacity="0.95" />
                              {/* Bottom Left Wave */}
                              <path d="M0 130 C40 130 70 145 90 160 L0 160 Z" fill="#eed8ea" opacity="0.75" />
                            </svg>
                          </div>

                          <div className="relative z-10 space-y-4">
                            <h3 className="text-[15px] font-bold text-slate-800 tracking-wide">Take control of your Spendings!</h3>
                            <ul className="space-y-2.5 text-[13px] font-semibold text-slate-700">
                              <li className="flex items-center gap-2">
                                <span className="text-slate-800 text-lg leading-none">•</span>
                                <span>Smarter Insights. Better Decisions</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-slate-800 text-lg leading-none">•</span>
                                <span>View Spend Summary</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-slate-800 text-lg leading-none">•</span>
                                <span>Interactive Graphs</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="text-slate-800 text-lg leading-none">•</span>
                                <span>Manage Budget</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Right Column: Graphic at the top and Button at the bottom (Stretched to match Left Card height exactly) */}
                        <div className="flex flex-col justify-between h-full py-1">
                          
                          {/* Graphic Container (Aligned to the top) */}
                          <div className="w-full flex justify-center md:justify-end md:pr-4">
                            <div className="w-72 h-44 relative flex items-center justify-center">
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
                          
                          {/* Let's Get Started Button (Aligned to the bottom and matches width of graphic above) */}
                          <div className="w-full flex justify-center md:justify-end md:pr-4">
                            <button
                              type="button"
                              onClick={() => toast.success('Spend Analysis setup started!')}
                              className="py-3 px-10 text-sm font-bold rounded-full bg-[#702082] text-white hover:bg-[#5c1a6b] transition-all flex items-center justify-center gap-2 shadow-sm w-60 sm:w-64 cursor-pointer"
                            >
                              <span>Let's Get Started</span>
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Tutorials & FAQs Sub-Tabs (Matching User Image 2) */}
                      <div className="pt-6">
                        <div className="flex items-center gap-6 mb-4">
                          <button
                            type="button"
                            onClick={() => setSpendSubTab('Tutorials')}
                            className={`text-xs font-bold transition-all relative pb-2 ${
                              spendSubTab === 'Tutorials' ? 'text-[#702082]' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <span>Tutorials</span>
                            {spendSubTab === 'Tutorials' && (
                              <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#702082] rounded-full" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setSpendSubTab('FAQs')}
                            className={`text-xs font-bold transition-all relative pb-2 ${
                              spendSubTab === 'FAQs' ? 'text-[#702082]' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <span>FAQs</span>
                            {spendSubTab === 'FAQs' && (
                              <div className="absolute bottom-0 left-0 right-0 h-[3.5px] bg-[#702082] rounded-full" />
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
                                className="text-xs font-bold text-[#702082] hover:underline"
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
                          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-xs">
                            <div className="divide-y divide-slate-100">
                              {[
                                {
                                  q: "1. What is 'Spend Analysis'?",
                                  a: "Spend Analysis is a personal finance tool that automatically categorizes your transaction records (such as shopping, travel, groceries, utilities, etc.) to give you a clear graphical overview of where your money is spent."
                                },
                                {
                                  q: "2. How do I use spend analytics?",
                                  a: "Simply click on the subtabs under 'Transaction Accounts' to explore interactive charts, track category-wise spend summaries, compare monthly averages, and set budget limits."
                                },
                                {
                                  q: "3. How do I create a budget?",
                                  a: "You can allocate specific monthly budget targets for various categories under Spend Settings. We will notify you dynamically when you approach or exceed these limits."
                                },
                                {
                                  q: "4. How do I see an analysis of my spend across all bank accounts (across all banks - SBI and non SBI)?",
                                  a: "By using the secure Account Aggregator facility, you can consent to link statements from your accounts at other participating banks. The engine will aggregate and display a unified spend analysis across all banks."
                                },
                                {
                                  q: "5. What happens if I overshoot my budget?",
                                  a: "When your spending in any category hits 80% or 100% of your set limit, you will receive real-time alerts so you can take control of further outlays."
                                },
                                {
                                  q: "6. Can I view analytics on my credit card spends?",
                                  a: "Yes, you can view card analytics by linking your SBI Credit Cards or manually importing monthly card statement files."
                                },
                                {
                                  q: "7. How are the insights generated, and can I rely on them for financial planning?",
                                  a: "Insights are computed by an automated classification engine based on merchant category codes and transaction descriptors. While highly reliable for visual budgeting, they should be cross-referenced with bank statements for legal or tax planning."
                                }
                              ].map((faq, index) => {
                                const isExpanded = expandedFaq === index;
                                return (
                                  <div key={index} className="transition-all">
                                    <div
                                      onClick={() => setExpandedFaq(isExpanded ? null : index)}
                                      className="w-full flex items-center justify-between py-4 text-left cursor-pointer select-none group"
                                    >
                                      <span className={`text-[13px] font-medium transition-colors ${isExpanded ? 'text-[#702082] font-semibold' : 'text-slate-700 group-hover:text-[#702082]'}`}>
                                        {faq.q}
                                      </span>
                                      <ChevronDown
                                        size={16}
                                        className={`text-slate-400 group-hover:text-[#702082] transition-all duration-200 shrink-0 ml-4 ${isExpanded ? 'rotate-180 text-[#702082]' : ''}`}
                                      />
                                    </div>
                                    
                                    {isExpanded && (
                                      <div className="pb-4 pt-1 pl-4 pr-4 text-xs text-slate-500 font-normal leading-relaxed bg-[#fcfaff]/80 rounded-lg mb-2">
                                        {faq.a}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 4: ACCOUNT SUMMARY */}
                  {txSubTab === 'Account Summary' && (
                    <div className="space-y-6 pt-2">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left side details (7 columns) */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs text-[#8e8e8e] font-normal">
                          
                          <div className="space-y-4">
                            <div>
                              <div className="mb-0.5">Account Description</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px] leading-snug">
                                REGULAR SB NCHQ-INDIVIDUALS
                              </div>
                            </div>
                            
                            <div>
                              <div className="mb-0.5">Mode of Operation</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px]">
                                Single
                              </div>
                            </div>
                            
                            <div>
                              <div className="mb-0.5">Nominee(s)</div>
                              <button
                                type="button"
                                onClick={() => toast.success("Nominee: D SHYAMSUNDER (Father)")}
                                className="text-[#702082] hover:underline font-bold text-[13px] text-left block"
                              >
                                View Details
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4 font-normal">
                            <div>
                              <div className="mb-0.5">Currency</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px]">
                                Rupees
                              </div>
                            </div>
                            
                            <div>
                              <div className="mb-0.5">Rate of Interest</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px]">
                                2.50%
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Right side balance card box (5 columns) */}
                        <div className="lg:col-span-5">
                          <div className="bg-[#f3f4f7] rounded-xl p-5 space-y-3.5 text-xs text-[#4b5563] font-medium">
                            <div className="flex justify-between items-center">
                              <span>Available Balance</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.09</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Hold/Lien Amount</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Uncleared Balance</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>MOD Balance</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider and Debit Card Button */}
                      <div className="border-t border-slate-200/60 pt-6 mt-4">
                        <button
                          type="button"
                          onClick={() => toast.success("Opening Debit Card Management...")}
                          className="bg-white border border-slate-200/80 hover:border-purple-200 hover:bg-purple-50/10 rounded-xl p-4 flex items-center justify-between w-full max-w-sm shadow-sm transition-all"
                        >
                          <div className="text-left font-medium">
                            <div className="text-[#1a1a1a] font-bold text-sm">Debit Card</div>
                            <div className="text-slate-500 text-xs mt-0.5">View, Apply & Manage</div>
                          </div>
                          <ChevronRight size={16} className="text-slate-400" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </div>

            {/* If subtab is Statements, render the full-width Action Bar below the columns! */}
              {txSubTab === 'Statements' && (
                <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-slate-300 bg-gradient-to-b from-[#ffffff] to-[#eaeaea] py-5 shadow-inner mt-6 overflow-hidden">
                  <div className="max-w-[1360px] mx-auto flex items-center justify-end gap-8 px-8">
                    <button
                      type="button"
                      onClick={() => toast.success('Statement uploaded to DigiLocker successfully!')}
                      className="text-[#4b5563] hover:text-slate-800 text-sm font-bold transition-colors py-2"
                    >
                      Upload to Digilocker
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.success('Statement sent to registered email!')}
                      className="py-2.5 px-10 text-sm font-bold rounded-full border border-slate-400 bg-white/70 text-[#4b5563] hover:bg-slate-50 hover:border-slate-500 transition-all w-36 sm:w-40 shadow-sm text-center cursor-pointer"
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.success('Statement downloaded successfully!')}
                      className="py-2.5 px-10 text-sm font-bold rounded-full border border-slate-400 bg-white/70 text-[#4b5563] hover:bg-slate-50 hover:border-slate-500 transition-all w-36 sm:w-40 shadow-sm text-center cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </main>

      {/* Dark Grey Footer Bar */}
      <footer className="bg-[#333333] text-white py-3 w-full mt-auto border-t border-neutral-800">
        <div className="max-w-[1400px] mx-auto flex justify-center items-center gap-4 text-xs font-medium">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="text-white underline hover:opacity-85">
            About SBI
          </a>
          <span className="opacity-60">|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="text-white underline hover:opacity-85">
            Terms &amp; Conditions
          </a>
          <span className="opacity-60">|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="text-white underline hover:opacity-85">
            Privacy Policy
          </a>
        </div>
      </footer>

      {/* Disclaimer Modal (Exact Match to Screenshot 5) */}
      {showDisclaimer && (
        <div 
          className="fixed inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setShowDisclaimer(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#702082]">Disclaimer</h3>
              <button 
                type="button" 
                onClick={() => setShowDisclaimer(false)}
                className="text-slate-400 hover:text-[#702082] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="text-[11px] text-slate-600 leading-relaxed font-normal mt-4 space-y-4 max-h-[350px] overflow-y-auto pr-1">
              <div>
                <span className="font-bold block text-slate-700 mb-0.5">Registered & Corporate Office:</span>
                <p>
                  SBICAP Securities Limited, Marathon Futurex, Unit No. 1201, B-Wing, 12th Floor, N M Joshi Marg, Mafatlal Mill Compound, Lower Parel East, Mumbai 400013.
                </p>
                <p className="mt-1">
                  Corporate Identification Number (CIN): U65999MH2005PLC155485 | <a href="https://www.sbisecurities.in" target="_blank" rel="noopener noreferrer" className="text-[#702082] hover:underline font-semibold">www.sbisecurities.in</a>
                </p>
                <p className="mt-1">
                  NSE, BSE, MCX-SX & MCX | SEBI Registration No.: Stock Broker: INZ000200032 | DP Registration No.: IN-DP-314-2017
                </p>
                <p className="mt-1">
                  Research Analyst: INH000000602 | IRDA: CA0103 | AMFI ARN No. 0011
                </p>
              </div>

              <p>
                Investment in securities market are subject to market risks, read all the related documents carefully before investing. Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The information is only for consumption by the client and such material should not be redistributed. We are a distributor of Mutual Funds, NCDs, Bonds, IPOs and Corporate FDs. Equity SIP is not an approved product of the Exchange and any dispute related to this will not be dealt at Exchange platform.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-4 border-t border-slate-100 mt-5">
              <button
                type="button"
                onClick={() => {
                  setShowDisclaimer(false);
                  toast.success("Redirecting to SBICAP Securities portal...");
                }}
                className="bg-[#702082] hover:bg-[#5c1a6b] text-white px-8 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Pending Requests Warning Modal (Exact Match to User Screenshot 4) */}
      {showNoRequestsModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setShowNoRequestsModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Top Right */}
            <button 
              type="button" 
              onClick={() => setShowNoRequestsModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Title */}
            <h3 className="text-lg font-bold text-[#673391] mb-6">No pending requests</h3>

            {/* Modal Body with Purple Warning Triangle & Text */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-8">
              <div className="md:col-span-5 flex justify-center">
                <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-40 h-28">
                  {/* Triangle Warning */}
                  <path d="M70 20 L115 90 L25 90 Z" fill="none" stroke="#9d227b" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M70 42 L70 65" stroke="#9d227b" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="70" cy="76" r="2.5" fill="#9d227b" />

                  {/* Ground/Desert details */}
                  <path d="M10 105 Q50 95 90 105 T160 105" stroke="#e2d8ee" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                  <g transform="translate(15, 80)">
                    <path d="M5 25 L5 10 M5 15 L0 12 M5 18 L10 15" stroke="#c0a5d4" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </svg>
              </div>

              <div className="md:col-span-7">
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                  There are no pending requests that requires your approval (BSTDC038)
                </p>
              </div>
            </div>

            {/* Modal Footer: Okay Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setShowNoRequestsModal(false);
                  router.push('/home/landingPage/manageRelationship/deposits');
                }}
                className="border border-[#673391] text-[#673391] hover:bg-[#673391] hover:text-white px-8 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}

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
