'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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
  ShieldCheck,
  Star
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
  const searchParams = useSearchParams();

  // Tab State
  const [activeTab, setActiveTab] = useState<'Transaction' | 'Deposits' | 'Loans' | 'Investments' | 'Insurance'>(initialTab);
  const [investmentSubTab, setInvestmentSubTab] = useState<'Mutual Fund' | 'Demat & Securities' | 'PPF' | 'NPS' | 'IPO'>(initialInvestmentSubTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [othersOpen, setOthersOpen] = useState(true);
  const [liteMode, setLiteMode] = useState(false);
  const [loansSubTab, setLoansSubTab] = useState<'active' | 'closed'>('closed');

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
  const [mfSubTab, setMfSubTab] = useState<'Home' | 'Invest' | 'Portfolio' | 'Ideas' | 'More'>('Home');
  const [mfCarouselIndex, setMfCarouselIndex] = useState(0);

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
      <SbiGlobalBrandHeader activeNav={activeTab === 'Transaction' ? 'Accounts' : activeTab} />

      {/* 3. BREADCRUMB & MAIN BODY CONTENT */}
      <main className="sbi-main-body">
        
        {/* Breadcrumb */}
        <div className="sbi-breadcrumb select-none font-sans">
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
            <span className="sbi-bc-current">
              {searchParams?.get('view') === 'all' && (activeTab === 'Deposits' || activeTab === 'Loans') 
                ? activeTab 
                : 'Relationship Overview'}
            </span>
          )}
        </div>

        {/* Page Header Title Row */}
        {searchParams?.get('view') === 'all' && activeTab === 'Deposits' && (
          <div className="flex justify-between items-center mb-6 mt-3">
            <h1 className="text-[28px] font-bold text-[#302985] font-sans">
              Deposits
            </h1>

            <div className="border border-slate-200 bg-white rounded-xl p-2.5 px-4 flex items-center gap-3 cursor-pointer shadow-2xs hover:bg-slate-50 transition-colors w-full max-w-[280px]">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-[#702082] shrink-0">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M12 2a5 5 0 0 0-5 5v4h10V7a5 5 0 0 0-5-5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-[12px] font-bold text-slate-800 leading-tight">Manage your Deposits (00)</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Combined Value: ₹0.00</div>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </div>
          </div>
        )}

        {/* 4. SUB-NAVIGATION TABS BAR (Transaction Accounts | Deposits | Loans | Investments | Insurance) */}
        {!showDematDetails && !(searchParams?.get('view') === 'all' && (activeTab === 'Deposits' || activeTab === 'Loans')) && (
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
            searchParams?.get('view') === 'all' ? (
              /* ================= VIEW ALL / FROM OVERVIEW DEPOSITS MODE ================= */
              <div className="space-y-6">
                
                {/* Top Card: Open New Deposit options list & illustration */}
                <div className="bg-[#f0f2f5] rounded-3xl border border-slate-200/50 p-8 shadow-sm flex flex-col lg:flex-row items-stretch gap-8">
                  {/* Left Column (Open New Deposit form) */}
                  <div className="flex-1 space-y-4">
                    <h2 className="text-[18px] font-bold text-[#702082] mb-5 tracking-tight font-sans text-left">
                      Open New Deposit
                    </h2>

                    <div className="space-y-4">
                      {/* Fixed Deposit */}
                      <div 
                        onClick={() => toast.success("Opening Fixed Deposit variant selection...")}
                        className="bg-white hover:bg-purple-50/20 border border-slate-200/80 rounded-xl p-4.5 flex items-center justify-between cursor-pointer transition-all w-full shadow-2xs"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-transparent flex items-center justify-center text-[#702082] rounded-full border border-slate-100 shrink-0">
                            <svg className="w-6.5 h-6.5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M6 16c0 3 3 5 6 5s6-2 6-5V8H6v8z" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 2v6" strokeLinecap="round" strokeLinejoin="round" />
                              <text x="12" y="15.2" fontSize="7.5" fontWeight="bold" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                            </svg>
                          </div>
                          <div className="text-left">
                            <div className="text-[14.5px] font-bold text-slate-800 font-sans">Fixed Deposit</div>
                            <div className="text-xs text-slate-500 font-semibold mt-0.5 font-sans">Explore a host of FD variants to suit your needs</div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#702082] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Recurring Deposit */}
                      <div 
                        onClick={() => toast.success("Opening Recurring Deposit creation...")}
                        className="bg-white hover:bg-purple-50/20 border border-slate-200/80 rounded-xl p-4.5 flex items-center justify-between cursor-pointer transition-all w-full shadow-2xs"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-transparent flex items-center justify-center text-[#702082] rounded-full border border-slate-100 shrink-0">
                            <svg className="w-6.5 h-6.5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 2a10 10 0 0 1 8 4M20 6h-4M20 6V2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M12 22a10 10 0 0 1-8-4M4 18h4M4 18v4" strokeLinecap="round" strokeLinejoin="round" />
                              <text x="12" y="15.8" fontSize="9.5" fontWeight="900" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                            </svg>
                          </div>
                          <div className="text-left">
                            <div className="text-[14.5px] font-bold text-slate-800 font-sans">Recurring Deposit</div>
                            <div className="text-xs text-slate-500 font-semibold mt-0.5 font-sans">One-time deposit creation that ensures you save every month</div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#702082] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Annuity Deposit */}
                      <div 
                        onClick={() => toast.success("Opening Annuity Deposit setup...")}
                        className="bg-white hover:bg-purple-50/20 border border-slate-200/80 rounded-xl p-4.5 flex items-center justify-between cursor-pointer transition-all w-full shadow-2xs"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-transparent flex items-center justify-center text-[#702082] rounded-full border border-slate-100 shrink-0">
                            <svg className="w-6.5 h-6.5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="4" y="4" width="16" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="9" y1="2" x2="9" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="15" y1="2" x2="15" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="4" y1="9" x2="20" y2="9" strokeLinecap="round" strokeLinejoin="round" />
                              <text x="12" y="16.5" fontSize="9.5" fontWeight="900" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                            </svg>
                          </div>
                          <div className="text-left">
                            <div className="text-[14.5px] font-bold text-slate-800 font-sans">Annuity Deposit</div>
                            <div className="text-xs text-slate-500 font-semibold mt-0.5 font-sans">Invest once and get returns every month</div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#702082] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Auto Sweep */}
                      <div 
                        onClick={() => toast.success("Opening Auto Sweep setup...")}
                        className="bg-white hover:bg-purple-50/20 border border-slate-200/80 rounded-xl p-4.5 flex items-center justify-between cursor-pointer transition-all w-full shadow-2xs"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-transparent flex items-center justify-center text-[#702082] rounded-full border border-slate-100 shrink-0">
                            <svg className="w-6.5 h-6.5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
                              <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" strokeLinejoin="round" />
                              <text x="12" y="15.5" fontSize="9.5" fontWeight="900" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                            </svg>
                          </div>
                          <div className="text-left">
                            <div className="text-[14.5px] font-bold text-slate-800 font-sans">Auto Sweep</div>
                            <div className="text-xs text-slate-500 font-semibold mt-0.5 font-sans">Let idle funds in your savings account earn more for you</div>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-[#702082] shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Illustration & Caption) */}
                  <div className="w-full lg:w-[45%] flex flex-col items-center justify-center select-none shrink-0 self-center">
                    <div className="w-full max-w-[340px]">
                      <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <ellipse cx="160" cy="200" rx="120" ry="10" fill="#e2e8f0" opacity="0.6" />
                        <path d="M125,160 L125,80 L95,80 L140,25 L185,80 L155,80 L155,160 Z" fill="#edd6ea" opacity="0.8" />
                        <text x="140" y="85" fontSize="24" fontWeight="bold" fill="#ffffff" textAnchor="middle" opacity="0.9">₹</text>
                        <rect x="55" y="110" width="55" height="60" rx="4" fill="#ffffff" stroke="#525c99" strokeWidth="2.5" />
                        <path d="M55,125 H110" stroke="#525c99" strokeWidth="2.5" />
                        <circle cx="65" cy="118" r="2.5" fill="#b81d6c" /><circle cx="100" cy="118" r="2.5" fill="#b81d6c" />
                        <rect x="65" y="135" width="6" height="6" rx="1" fill="#cbd5e1" />
                        <rect x="77" y="135" width="6" height="6" rx="1" fill="#cbd5e1" />
                        <rect x="89" y="135" width="6" height="6" rx="1" fill="#cbd5e1" />
                        <rect x="65" y="147" width="6" height="6" rx="1" fill="#cbd5e1" />
                        <rect x="77" y="147" width="6" height="6" rx="1" fill="#be185d" />
                        <rect x="89" y="147" width="6" height="6" rx="1" fill="#cbd5e1" />
                        <circle cx="100" cy="165" r="14" fill="#b81d6c" />
                        <text x="100" y="170" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif">%</text>
                        <rect x="110" y="100" width="90" height="75" rx="8" fill="#525c99" stroke="#312e81" strokeWidth="2" />
                        <path d="M165,100 H200 V130 H165 Z" fill="#434c85" stroke="#312e81" strokeWidth="2" />
                        <circle cx="178" cy="115" r="3.5" fill="#fbbf24" />
                        <path d="M130,100 L155,75 L180,82 L150,107 Z" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
                        <path d="M142,100 L167,75 L192,82 L162,107 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.5" />
                        <path d="M210,185 C210,135 255,135 255,185 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
                        <rect x="222" y="180" width="22" height="15" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                        <circle cx="233" cy="160" r="10" fill="#702082" />
                        <text x="233" y="164" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#ffffff">₹</text>
                      </svg>
                      
                      <div className="text-center font-bold text-slate-700 text-[16px] mt-4 font-sans leading-tight">
                        Invest today for a<br />
                        <span className="text-[#3b2e81] font-extrabold text-[17.5px]">better tomorrow!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card: Interest Rates / Calculator / Know More */}
                <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm text-left">
                  {/* Tab Selector */}
                  <div className="flex gap-8 border-b border-slate-100 pb-3 mb-6">
                    <button className="text-[13.5px] font-bold text-[#702082] border-b-2 border-b-[#702082] pb-3 -mb-[14px] font-sans">
                      Interest Rates
                    </button>
                    <button className="text-[13.5px] font-semibold text-slate-500 hover:text-slate-800 pb-3 -mb-[14px] font-sans" onClick={() => toast("Payout Calculator feature coming soon")}>
                      Payout Calculator
                    </button>
                    <button className="text-[13.5px] font-semibold text-slate-500 hover:text-slate-800 pb-3 -mb-[14px] font-sans" onClick={() => toast("Information and guidelines loading")}>
                      Know more
                    </button>
                  </div>

                  {/* Grid Column Wrapper */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                    
                    {/* Column 1: Domestic Term Deposit - General */}
                    <div className="lg:col-span-5 space-y-3">
                      <h3 className="text-[13px] font-bold text-slate-700 font-sans tracking-wide">
                        Domestic Term Deposit - General
                      </h3>
                      <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-100 p-2.5 px-4 text-[11px] font-bold text-slate-500 font-sans uppercase">
                          <span>Terms</span>
                          <span className="text-right">Interest Rate</span>
                        </div>
                        {[
                          { term: '7 Days to 45 Days', rate: '3.05%' },
                          { term: '46 Days to 180 Days', rate: '4.90%' },
                          { term: '181 Days to 210 Days', rate: '5.65%' },
                          { term: '211 Days to less than 1 Year', rate: '5.90%' },
                          { term: '1 Year to less than 2 Years', rate: '6.25%' },
                          { term: 'Amrit Vrishiti 444', rate: '6.45%' },
                          { term: '2 Years to less than 3 Years', rate: '6.40%' },
                          { term: '3 Years to less than 5 Years', rate: '6.30%' },
                          { term: '5 Years and upto 10 Years', rate: '6.05%' },
                        ].map((row, idx) => (
                          <div key={idx} className="grid grid-cols-2 p-2.5 px-4 text-xs font-semibold text-slate-700 font-sans border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <span>{row.term}</span>
                            <span className="text-right text-slate-900 font-bold">{row.rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 2: Green Rupee TD - General */}
                    <div className="lg:col-span-4 space-y-3">
                      <h3 className="text-[13px] font-bold text-slate-700 font-sans tracking-wide">
                        Green Rupee TD - General
                      </h3>
                      <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-100 p-2.5 px-4 text-[11px] font-bold text-slate-500 font-sans uppercase">
                          <span>Terms</span>
                          <span className="text-right">Interest Rate</span>
                        </div>
                        {[
                          { term: '1111 Days', rate: '6.30%' },
                          { term: '1777 Days', rate: '6.30%' },
                          { term: '2222 Days', rate: '6.05%' },
                        ].map((row, idx) => (
                          <div key={idx} className="grid grid-cols-2 p-2.5 px-4 text-xs font-semibold text-slate-700 font-sans border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <span>{row.term}</span>
                            <span className="text-right text-slate-900 font-bold">{row.rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Non-callable Deposit - General */}
                    <div className="lg:col-span-3 space-y-3">
                      <h3 className="text-[13px] font-bold text-slate-700 font-sans tracking-wide">
                        Non-callable Deposit - General
                      </h3>
                      <div className="border border-slate-100 rounded-xl overflow-hidden">
                        <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-100 p-2.5 px-4 text-[11px] font-bold text-slate-500 font-sans uppercase">
                          <span>Terms</span>
                          <span className="text-right">Interest Rate</span>
                        </div>
                        {[
                          { term: '1 Year', rate: '6.55%' },
                          { term: '2 Years', rate: '6.80%' },
                        ].map((row, idx) => (
                          <div key={idx} className="grid grid-cols-2 p-2.5 px-4 text-xs font-semibold text-slate-700 font-sans border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <span>{row.term}</span>
                            <span className="text-right text-slate-900 font-bold">{row.rate}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              /* ================= ORIGINAL TABBED DEPOSITS VIEW ================= */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left w-full">
                {/* Left Column (3/12 width) */}
                <div className="md:col-span-3 space-y-4">
                  <div className="sbi-search-card">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search here..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="sbi-search-input font-sans"
                    />
                    <button type="button" className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  <div 
                    onClick={() => setShowNoRequestsModal(true)}
                    className="sbi-menu-card flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs font-semibold text-gray-700 font-sans">Requests</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>

                  <div className="sbi-menu-card">
                    <div
                      onClick={() => setOthersOpen(!othersOpen)}
                      className="flex items-center justify-between cursor-pointer pb-1"
                    >
                      <span className="text-xs font-bold text-[#30135d] font-sans">Others (00)</span>
                      {othersOpen ? (
                        <ChevronUp size={16} className="text-[#30135d]" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </div>

                    {othersOpen && (
                      <div className="mt-3">
                        <div
                          onClick={() => toast('Sukanya Samriddhi / Minor PPF Account Info')}
                          className="sbi-sukanya-banner"
                        >
                          <div className="sbi-sukanya-text-col">
                            <div className="sbi-sukanya-sub flex items-center gap-1 font-sans">
                              <span>View your Linked</span>
                              <ChevronRight size={10} />
                            </div>
                            <div className="sbi-sukanya-title font-sans">
                              Sukanya Samriddhi/ Minor PPF Account
                            </div>
                          </div>
                          <div className="sbi-sukanya-graphic">
                            <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                              <path d="M85 30 C85 30 105 35 105 55 C105 75 85 85 85 85 C85 85 65 75 65 55 C65 35 85 30 85 30 Z" fill="#ffffff" fillOpacity="0.25" />
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
                          <h2 className="text-lg font-bold text-[#30135d] font-sans">Deposits Summary</h2>
                          <p className="text-xs text-gray-500 font-sans">View and manage your Term Deposits, Fixed Deposits, and Special Schemes</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toast.success('Redirecting to Open FD page')}
                          className="sbi-btn-primary flex items-center gap-1.5 font-sans"
                        >
                          <PlusCircle size={15} />
                          <span>Open Fixed Deposit</span>
                        </button>
                      </div>

                      {/* Deposit Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="sbi-deposit-box">
                          <div className="flex justify-between items-start">
                            <span className="sbi-deposit-type font-sans">FIXED DEPOSIT (FD)</span>
                            <span className="sbi-badge-active font-sans">Active</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2 font-sans">A/C: 39812049182</div>
                          <div className="text-xl font-bold text-gray-900 mt-1 font-sans">₹ 2,50,000.00</div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-purple-100 text-xs font-sans">
                            <span className="text-gray-600">Maturity: 15 Oct 2027 (7.10% p.a.)</span>
                            <button type="button" onClick={() => toast('FD Account Details')} className="text-[#30135d] font-bold hover:underline">
                              Details →
                            </button>
                          </div>
                        </div>

                        <div className="sbi-deposit-box">
                          <div className="flex justify-between items-start">
                            <span className="sbi-deposit-type font-sans">RECURRING DEPOSIT (RD)</span>
                            <span className="sbi-badge-active font-sans">Active</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-2 font-sans">Monthly Installment: ₹5,000</div>
                          <div className="text-xl font-bold text-gray-900 mt-1 font-sans">₹ 60,000.00</div>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-purple-100 text-xs font-sans">
                            <span className="text-gray-600">Maturity: 01 Mar 2027 (6.80% p.a.)</span>
                            <button type="button" onClick={() => toast('RD Account Details')} className="text-[#30135d] font-bold hover:underline">
                              Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sbi-info-bar mt-6 font-sans">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <FileText size={16} className="text-[#30135d]" />
                        <span>Need deposit interest certificate for IT return filing?</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toast.success('Interest Certificate downloaded successfully')}
                        className="sbi-btn-outline font-sans"
                      >
                        Download Certificate
                      </button>
                    </div>
                  </div>

                  <BusinessLoanBanner />
                </div>
              </div>
            )
          )}

          {/* ========================================================================= */}
          {/* TAB 2: LOANS (EXACT MATCH TO SCREENSHOT 2) */}
          {/* ========================================================================= */}
          {activeTab === 'Loans' && (
            searchParams?.get('view') === 'all' ? (
              /* ================= VIEW ALL / FROM OVERVIEW LOANS MODE ================= */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start w-full">
                
                {/* Left Column (Approx 65% width / lg:col-span-8) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Business Loan Apply Banner */}
                  <div className="bg-[#1e3c72] bg-gradient-to-r from-[#202967] via-[#2d3a8c] to-[#3a4db2] rounded-3xl p-8 text-white relative overflow-hidden shadow-xs">
                    {/* Abstract Wave Shapes in background */}
                    <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 pointer-events-none select-none">
                      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full object-cover">
                        <path d="M0,100 C50,150 150,50 200,100 L200,200 L0,200 Z" fill="#ffffff" />
                      </svg>
                    </div>

                    <div className="relative z-10 space-y-5">
                      <h2 className="text-[20px] font-bold tracking-tight font-sans">
                        Apply for a Business Loan
                      </h2>
                      <div>
                        <button 
                          onClick={() => toast.success("Checking Business Loan Eligibility...")}
                          className="bg-white hover:bg-slate-50 text-[#302985] font-bold text-[13px] px-6 py-2.5 rounded-full shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all font-sans"
                        >
                          Click here to check your eligibility
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* View Existing Loans Section */}
                  <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm space-y-6">
                    <h3 className="text-[17px] font-bold text-slate-800 tracking-tight font-sans">
                      View Existing Loans
                    </h3>

                    {/* Sub Tab Selector (Active Loan(s) / Closed Loan(s)) */}
                    <div className="flex gap-6 border-b border-slate-100 pb-0">
                      <button 
                        onClick={() => setLoansSubTab('active')}
                        className={`text-[13px] font-bold pb-2.5 transition-all font-sans relative ${
                          loansSubTab === 'active' ? 'text-[#702082]' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        Active Loan(s)
                        {loansSubTab === 'active' && (
                          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#702082] rounded-t-sm" />
                        )}
                      </button>
                      <button 
                        onClick={() => setLoansSubTab('closed')}
                        className={`text-[13px] font-bold pb-2.5 transition-all font-sans relative ${
                          loansSubTab === 'closed' ? 'text-[#702082]' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        Closed Loan(s)
                        {loansSubTab === 'closed' && (
                          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#702082] rounded-t-sm" />
                        )}
                      </button>
                    </div>

                    {/* Sub Tab Content */}
                    {loansSubTab === 'closed' ? (
                      <div className="py-8 flex flex-col items-center justify-center text-center space-y-5 select-none">
                        {/* High Fidelity Clipboard Shield Graphic */}
                        <div className="w-52 h-52 relative flex items-center justify-center">
                          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            {/* Shield background shadow/accent */}
                            <path d="M100 20 C140 20 170 30 170 70 C170 120 120 165 100 175 C80 165 30 120 30 70 C30 30 60 20 100 20 Z" fill="#fdf2f8" opacity="0.9" />
                            <path d="M100 25 C135 25 162 34 162 70 C162 115 116 156 100 165 C84 156 38 115 38 70 C38 34 65 25 100 25 Z" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="3 3" />
                            
                            {/* Clipboard Card */}
                            <rect x="65" y="55" width="70" height="90" rx="6" fill="#ffffff" stroke="#a78bfa" strokeWidth="2.5" />
                            {/* Clipboard Header Clip */}
                            <rect x="85" y="46" width="30" height="15" rx="3" fill="#8b5cf6" />
                            
                            {/* Card text lines */}
                            <line x1="77" y1="75" x2="123" y2="75" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="77" y1="90" x2="123" y2="90" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="77" y1="105" x2="110" y2="105" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />

                            {/* Checkmark details inside clipboard */}
                            <path d="M108 128 L114 134 L125 123" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                            {/* Floating Rupees Coin */}
                            <circle cx="50" cy="140" r="14" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1.5" />
                            <text x="50" y="145" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0891b2" fontFamily="sans-serif">₹</text>

                            {/* Floating Percent Coin */}
                            <circle cx="145" cy="135" r="14" fill="#fbcfe8" stroke="#be185d" strokeWidth="1.5" />
                            <text x="145" y="139" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#be185d" fontFamily="sans-serif">%</text>

                            {/* Smile Pill shape at bottom center */}
                            <rect x="85" y="146" width="30" height="8" rx="4" fill="#cbd5e1" />
                          </svg>
                        </div>
                        <p className="text-[14.5px] font-bold text-slate-700 font-sans tracking-wide">
                          No loans have been closed in the last 24 months.
                        </p>
                      </div>
                    ) : (
                      <div className="py-14 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <p className="text-xs font-semibold text-slate-400 font-sans">
                          No active loans found.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column (Approx 35% width / lg:col-span-4) */}
                <div className="lg:col-span-4 w-full">
                  <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm space-y-5">
                    <h3 className="text-[15.5px] font-bold text-slate-800 tracking-tight font-sans text-left">
                      Apply for a new Loan
                    </h3>

                    {/* 2-Column Grid of Options */}
                    <div className="grid grid-cols-2 gap-3.5 w-full">
                      {[
                        { 
                          name: 'Loan Against Mutual Fund',
                          icon: (
                            <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <circle cx="12" cy="8" r="5" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M3 21h18M12 13v8M19 18l-3 3-3-3" strokeLinecap="round" strokeLinejoin="round" />
                              <text x="12" y="11" fontSize="6.5" fontWeight="bold" textAnchor="middle" fill="#702082" stroke="none" fontFamily="sans-serif">₹</text>
                            </svg>
                          )
                        },
                        { 
                          name: 'Personal Loan',
                          icon: (
                            <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )
                        },
                        { 
                          name: 'Car Loan',
                          icon: (
                            <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <rect x="3" y="11" width="18" height="6" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M5 11l2-5h10l2 5M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )
                        },
                        { 
                          name: 'Home Loan',
                          icon: (
                            <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                              <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )
                        },
                        { 
                          name: 'Education Loan',
                          icon: (
                            <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )
                        },
                        { 
                          name: 'Gold Loan',
                          icon: (
                            <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M2 20h20M5 17h14M7 14h10M9 11h6M11 8h2" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="12" cy="4" r="2" fill="#702082" />
                            </svg>
                          )
                        },
                      ].map((opt, idx) => (
                        <div 
                          key={idx}
                          onClick={() => toast.success(`Starting application for ${opt.name}...`)}
                          className="bg-white hover:bg-purple-50/20 border border-slate-200/80 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97] shadow-2xs h-28 w-full"
                        >
                          <div className="w-10 h-10 bg-transparent flex items-center justify-center rounded-full border border-slate-50 shrink-0 mb-2">
                            {opt.icon}
                          </div>
                          <span className="text-[11.5px] font-bold text-slate-700 leading-tight font-sans">
                            {opt.name}
                          </span>
                        </div>
                      ))}

                      {/* Overdraft Against Deposit (Takes 2 Columns Span) */}
                      <div 
                        onClick={() => toast.success("Starting application for Overdraft Against Deposit...")}
                        className="col-span-2 bg-white hover:bg-purple-50/20 border border-slate-200/80 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shadow-2xs h-28 w-full"
                      >
                        <div className="w-10 h-10 bg-transparent flex items-center justify-center rounded-full border border-slate-50 shrink-0 mb-2">
                          <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="11" width="18" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 2a5 5 0 0 0-5 5v4h10V7a5 5 0 0 0-5-5z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-[11.5px] font-bold text-slate-700 leading-tight font-sans">
                          Overdraft Against Deposit
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* ================= ORIGINAL TABBED LOANS VIEW ================= */
              <div className="space-y-6">
                <div className="sbi-content-card min-h-[460px] p-8 flex items-center justify-center relative">
                  
                  {/* 2 Equal Columns Split by Vertical Dotted Border */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6">
                    
                    {/* Left Column: Triangle Warning Pole & Cactus Vector Graphic */}
                    <div className="flex justify-center items-center">
                      <div className="w-64 h-64 relative flex items-center justify-center">
                        <svg viewBox="0 0 24 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
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
            )
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
                  {investmentSubTab !== 'Mutual Fund' && (
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
                  )}

                  {/* Right Main Content Column */}
                  <div className={investmentSubTab === 'Mutual Fund' ? 'col-span-12' : 'md:col-span-9'}>
                    <div className="sbi-content-card min-h-[460px] p-0 overflow-hidden relative flex flex-col">
                      
                      {/* Top Purple Tab Badge Header */}
                      {investmentSubTab !== 'Mutual Fund' && (
                        <div className="sbi-inv-header-tag select-none">
                          {investmentSubTab === 'Demat & Securities' 
                            ? 'Manage Demat & Securities' 
                            : investmentSubTab === 'PPF' 
                              ? 'Public Provident Fund (PPF)' 
                              : investmentSubTab === 'NPS'
                                ? 'National Pension System (NPS)'
                                : investmentSubTab}
                        </div>
                      )}

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
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-2">
                            <h2 className="text-[28px] font-bold text-[#681d82] tracking-tight pl-2">
                              NPS Account
                            </h2>
                            <button
                              type="button"
                              onClick={() => toast.success("Opening NPS Contribution Page...")}
                              className="flex items-center justify-between gap-4 border border-[#dbcdf0] bg-[#f3effa] hover:bg-[#eae3f5] rounded-xl py-3 px-5 transition-all text-left max-w-xl cursor-pointer group shadow-xs select-none"
                            >
                              <div className="flex items-center gap-3">
                                {/* Custom banknote icon with Rupee sign inside */}
                                <svg className="w-6 h-5 text-[#681d82] shrink-0" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="2" y="4" width="20" height="12" rx="2" />
                                  <circle cx="12" cy="10" r="2.5" strokeWidth="1.5" />
                                  <text x="12" y="12" fontSize="6.5" fontWeight="900" fill="currentColor" textAnchor="middle" stroke="none">₹</text>
                                </svg>
                                <span className="text-[13.5px] font-bold text-[#681d82] leading-tight">
                                  Make one time contribution to self/other NPS Accounts
                                </span>
                              </div>
                              <ChevronRight size={16} className="text-[#681d82] stroke-[2.5px] shrink-0 ml-1" />
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

                      {investmentSubTab === 'IPO' && (
                        <div className="fixed inset-0 z-50 bg-[#f4f3f6] flex flex-col overflow-y-auto">
                          
                          {/* 1. Header Bar */}
                          <header className="bg-white border-b border-slate-200 flex items-stretch h-[75px] w-full shrink-0">
                            {/* SBI Logo */}
                            <div className="flex items-center px-8 bg-white border-r border-slate-100">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-[#00b0f0] flex items-center justify-center relative">
                                  <div className="w-3.5 h-3.5 rounded-full bg-white" />
                                  <div className="absolute bottom-0 left-[16.5px] w-1.5 h-3.5 bg-white" />
                                </div>
                                <span className="text-[30px] font-black text-[#1f70b8] tracking-tight font-sans">SBI</span>
                              </div>
                            </div>

                            {/* Purple Info Bar */}
                            <div className="flex-1 bg-[#1e144f] text-white flex items-center justify-between px-6 py-2 select-none">
                              <div>
                                <h1 className="text-[17px] font-bold tracking-wide font-sans">
                                  SBI IPO & Rights Issue Application Portal
                                </h1>
                              </div>
                              <div className="flex items-center gap-6">
                                <div className="text-right font-sans">
                                  <div className="text-[11px] text-[#ffd200] font-semibold">Welcome Mr. DUMPALA VISHNU VARDHAN</div>
                                  <div className="text-[10px] text-white/80 mt-0.5">Last Login: 31 Jul 2026 11:42:17</div>
                                </div>
                                
                                {/* Logout Button */}
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    toast.success('Logged out from IPO Portal');
                                    setInvestmentSubTab('Mutual Fund');
                                  }}
                                  className="bg-[#ffd200] hover:bg-[#ebd01e] text-slate-900 font-bold px-5 h-[75px] flex items-center gap-2 -mr-6 transition-colors font-sans text-xs uppercase cursor-pointer"
                                >
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                                  </svg>
                                  <span>Logout</span>
                                </button>
                              </div>
                            </div>
                          </header>

                          {/* 2. Menu Bar */}
                          <div className="bg-[#fcfbfd] border-b border-slate-200 py-3 px-8 flex items-center gap-6 text-[13.5px] font-semibold text-slate-700 shadow-xs select-none">
                            <button type="button" onClick={() => toast('Loading IPO applications...')} className="text-[#1e144f] hover:underline font-bold cursor-pointer">Apply IPO</button>
                            <span className="text-slate-300">|</span>
                            <button type="button" onClick={() => toast('Opening applications log...')} className="hover:text-[#1e144f] hover:underline cursor-pointer">View/Delete Applications</button>
                            <span className="text-slate-300">|</span>
                            <button type="button" onClick={() => toast('Opening FAQs...')} className="hover:text-[#1e144f] hover:underline cursor-pointer">FAQ's</button>
                            <span className="text-slate-300">|</span>
                            <button type="button" onClick={() => toast('Loading applicant details...')} className="hover:text-[#1e144f] hover:underline cursor-pointer">Manage IPO Applicant</button>
                            <span className="text-slate-300">|</span>
                            <button type="button" onClick={() => toast('Connecting to Support...')} className="hover:text-[#1e144f] hover:underline cursor-pointer">Customer Support</button>
                          </div>

                          {/* 3. Hero Banner Background */}
                          <div className="relative w-full h-[220px] bg-gradient-to-r from-[#442b78] via-[#351e60] to-[#1f0e3d] flex items-center justify-center overflow-hidden">
                            {/* Abstract coin-stack graphics overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-25 select-none z-0">
                              <svg className="w-full h-full" viewBox="0 0 1000 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                {/* Coin Stacks & Blocks representation */}
                                <ellipse cx="380" cy="180" rx="35" ry="8" fill="#a78bfa" />
                                <ellipse cx="380" cy="172" rx="35" ry="8" fill="#c084fc" />
                                <ellipse cx="380" cy="164" rx="35" ry="8" fill="#d8b4fe" />

                                <ellipse cx="500" cy="190" rx="35" ry="8" fill="#a78bfa" />
                                <ellipse cx="500" cy="182" rx="35" ry="8" fill="#c084fc" />

                                <ellipse cx="620" cy="175" rx="35" ry="8" fill="#a78bfa" />
                                <ellipse cx="620" cy="167" rx="35" ry="8" fill="#c084fc" />
                                <ellipse cx="620" cy="159" rx="35" ry="8" fill="#d8b4fe" />
                                <ellipse cx="620" cy="151" rx="35" ry="8" fill="#f3e8ff" />

                                {/* Cube block outline */}
                                <rect x="345" y="100" width="70" height="40" rx="4" fill="#6d28d9" opacity="0.3" stroke="#d8b4fe" strokeWidth="1" />
                                <rect x="465" y="110" width="70" height="40" rx="4" fill="#6d28d9" opacity="0.3" stroke="#d8b4fe" strokeWidth="1" />
                                <rect x="585" y="95" width="70" height="40" rx="4" fill="#6d28d9" opacity="0.3" stroke="#d8b4fe" strokeWidth="1" />
                                
                                <text x="380" y="130" fontSize="24" fontWeight="black" fill="#ffffff" opacity="0.4" textAnchor="middle">I</text>
                                <text x="500" y="140" fontSize="24" fontWeight="black" fill="#ffffff" opacity="0.4" textAnchor="middle">P</text>
                                <text x="620" y="125" fontSize="24" fontWeight="black" fill="#ffffff" opacity="0.4" textAnchor="middle">O</text>
                              </svg>
                            </div>
                          </div>

                          {/* 4. Three Cards Grid Overlay */}
                          <div className="max-w-[1200px] w-full mx-auto px-6 -mt-[80px] pb-16 relative z-20 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Card 1: IPO (Equity) */}
                              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-8 text-center flex flex-col justify-between items-center min-h-[300px]">
                                <div className="space-y-4">
                                  {/* Custom growth chart + rupee coin icon */}
                                  <svg className="w-16 h-16 text-[#1e144f] mx-auto mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Banknotes outline */}
                                    <rect x="12" y="32" width="22" height="13" rx="1.5" />
                                    <circle cx="23" cy="38.5" r="2.5" />
                                    {/* Growth graph */}
                                    <path d="M44 14 H54 V24 M54 14 L34 34 L22 28 L10 38" strokeWidth="2.2" />
                                    {/* Rupee coin stacks at base */}
                                    <line x1="16" y1="45" x2="16" y2="50" />
                                    <line x1="30" y1="45" x2="30" y2="50" />
                                    <line x1="10" y1="50" x2="32" y2="50" />
                                  </svg>
                                  <h3 className="text-[17px] font-bold text-slate-800 tracking-wide font-sans">
                                    IPO (Equity)
                                  </h3>
                                </div>
                                <div className="w-full border-t border-slate-100 pt-6">
                                  <button 
                                    type="button" 
                                    onClick={() => toast.success("Loading Equity IPO Live Issues...")}
                                    className="text-[#0088cc] hover:text-[#006699] font-bold text-[14px] underline select-none cursor-pointer"
                                  >
                                    6 Live Issues
                                  </button>
                                </div>
                              </div>

                              {/* Card 2: IPO (Debt) */}
                              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-8 text-center flex flex-col justify-between items-center min-h-[300px]">
                                <div className="space-y-4">
                                  {/* Custom document with calculator & coins icon */}
                                  <svg className="w-16 h-16 text-[#1e144f] mx-auto mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Document */}
                                    <path d="M14 6 H38 L48 16 V54 H14 Z" />
                                    <line x1="38" y1="6" x2="38" y2="16" />
                                    <line x1="38" y1="16" x2="48" y2="16" />
                                    {/* Calculator outline */}
                                    <rect x="32" y="28" width="10" height="18" rx="1.5" />
                                    <circle cx="35" cy="32" r="1" fill="currentColor" stroke="none" />
                                    <circle cx="39" cy="32" r="1" fill="currentColor" stroke="none" />
                                    <line x1="34" y1="36" x2="40" y2="36" strokeWidth="1.5" />
                                    {/* Stack of coins */}
                                    <ellipse cx="22" cy="36" rx="4" ry="1.5" />
                                    <ellipse cx="22" cy="40" rx="4" ry="1.5" />
                                    <ellipse cx="22" cy="44" rx="4" ry="1.5" />
                                  </svg>
                                  <h3 className="text-[17px] font-bold text-slate-800 tracking-wide font-sans">
                                    IPO (Debt)
                                  </h3>
                                </div>
                                <div className="w-full border-t border-slate-100 pt-6">
                                  <p className="text-slate-500 font-semibold text-[13.5px] leading-tight select-none">
                                    Currently, no issue available for listing
                                  </p>
                                </div>
                              </div>

                              {/* Card 3: Rights Issue */}
                              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-8 text-center flex flex-col justify-between items-center min-h-[300px]">
                                <div className="space-y-4">
                                  {/* Custom document with chevrons and shield icon */}
                                  <svg className="w-16 h-16 text-[#1e144f] mx-auto mb-2" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Document */}
                                    <path d="M14 6 H38 L48 16 V54 H14 Z" />
                                    {/* Chevrons */}
                                    <path d="M26 22 L30 25 L34 22 M26 28 L30 31 L34 28" strokeWidth="2.2" />
                                    {/* Shield with Rupee */}
                                    <path d="M24 38 C24 38 30 36 30 36 C30 36 36 38 36 38 C36 43 36 47 30 51 C24 47 24 43 24 38 Z" fill="#f5f3ff" />
                                    <text x="30" y="45" fontSize="7" fontWeight="bold" fill="currentColor" textAnchor="middle" stroke="none">₹</text>
                                  </svg>
                                  <h3 className="text-[17px] font-bold text-slate-800 tracking-wide font-sans">
                                    Rights Issue
                                  </h3>
                                </div>
                                <div className="w-full border-t border-slate-100 pt-6">
                                  <button 
                                    type="button" 
                                    onClick={() => toast.success("Loading Rights Issue Live Issues...")}
                                    className="text-[#0088cc] hover:text-[#006699] font-bold text-[14px] underline select-none cursor-pointer"
                                  >
                                    4 Live Issues
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 5. Footer */}
                          <footer className="w-full bg-[#1e144f] text-white/90 text-xs py-3.5 px-8 flex justify-between items-center mt-auto shrink-0 select-none font-sans">
                            <span>© State Bank of India</span>
                            <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">
                              Privacy Policy
                            </a>
                          </footer>

                          {/* Helper float overlay toggle button to quickly jump back to YONO portal */}
                          <button
                            type="button"
                            onClick={() => setInvestmentSubTab('Mutual Fund')}
                            className="fixed bottom-6 right-6 bg-[#702082] hover:bg-[#5c1a6b] text-white font-bold text-xs py-2.5 px-5 rounded-full shadow-lg z-50 flex items-center gap-1.5 transition-all select-none border border-white/20 cursor-pointer"
                          >
                            <span>← Back to YONO</span>
                          </button>
                          
                        </div>
                      )}

                      {investmentSubTab === 'Mutual Fund' && (
                        <div className="p-6 flex-1 flex flex-col bg-[#f8fafc] text-left font-sans w-full">
                          
                          {/* 1. Mutual Funds Page Tab Navigation */}
                          <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-xl select-none w-full">
                            {(['Home', 'Invest', 'Portfolio', 'Ideas', 'More'] as const).map((tab) => {
                              const isActive = mfSubTab === tab;
                              return (
                                <button
                                  key={tab}
                                  type="button"
                                  onClick={() => setMfSubTab(tab)}
                                  className={`font-sans font-semibold text-[13px] px-6 py-3 relative transition-all ${
                                    isActive ? 'text-[#702082] font-bold' : 'text-slate-500 hover:text-slate-800'
                                  }`}
                                >
                                  <span>{tab}</span>
                                  {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#702082] rounded-t" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {mfSubTab === 'Home' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
                              
                              {/* Left Column: Carousel & SIP Returns Calculator (lg:col-span-4) */}
                              <div className="lg:col-span-4 space-y-6 flex flex-col items-stretch justify-start w-full">
                                
                                {/* Carousel Card */}
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between min-h-[340px] w-full self-stretch">
                                  {/* Title */}
                                  <div className="p-4 pb-0 text-[13px] font-bold text-slate-700 font-sans">
                                    Build wealth with ease with SBI Mutual Funds
                                  </div>

                                  {/* Carousel Contents */}
                                  <div className="flex-1 flex flex-col justify-between relative select-none">
                                    
                                    <div className="w-full flex-1 relative min-h-[250px] bg-slate-50 flex items-center justify-center overflow-hidden">
                                      {mfCarouselIndex === 0 && (
                                        <img 
                                          src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.17 PM (1).jpeg" 
                                          alt="Did you start an SIP?" 
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                      {mfCarouselIndex === 1 && (
                                        <img 
                                          src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.33 PM.jpeg" 
                                          alt="Make Salary Day Your SIP Day" 
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                      {mfCarouselIndex === 2 && (
                                        <img 
                                          src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.32 PM.jpeg" 
                                          alt="Jan Nivesh SIP" 
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                    </div>

                                    {/* Indicators (Dots) */}
                                    <div className="py-3 flex justify-center gap-1.5 bg-white border-t border-slate-100 select-none w-full">
                                      {[0, 1, 2].map((idx) => (
                                        <button
                                          key={idx}
                                          type="button"
                                          onClick={() => setMfCarouselIndex(idx)}
                                          className={`w-2 h-2 rounded-full transition-all ${
                                            mfCarouselIndex === idx ? 'bg-[#702082] w-4' : 'bg-slate-300 hover:bg-slate-400'
                                          }`}
                                          aria-label={`Go to slide ${idx + 1}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Jan Nivesh SIP Static Banner (Exact match to reference screenshots) */}
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col w-full self-stretch select-none">
                                  <img 
                                    src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.32 PM.jpeg" 
                                    alt="Jan Nivesh SIP Banner" 
                                    className="w-full h-auto object-cover"
                                  />
                                </div>

                                {/* Returns on Mutual Fund SIP Card (EXACT MATCH TO SCREENSHOT 2/3) */}
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4 text-left flex flex-col items-start justify-start w-full self-stretch">
                                  {/* Badge label */}
                                  <div className="select-none self-start">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0fdf4] text-green-700 text-xs font-bold font-sans">
                                      <Star size={11} className="fill-green-600 text-green-600" />
                                      Returns on Mutual Fund SIP
                                    </span>
                                  </div>

                                  {/* Calculator text */}
                                  <div className="text-slate-700 text-sm font-semibold leading-relaxed font-sans self-start text-left">
                                    SIP of <span className="font-bold text-[#1e293b]">₹10,000/month</span> for <span className="font-bold text-[#1e293b]">20 years</span> at <span className="font-bold text-[#1e293b]">12% per annum</span>
                                  </div>

                                  {/* Highlighted Flag Badge */}
                                  <div className="flex justify-start items-center w-full self-start select-none">
                                    <div className="flex items-center gap-2">
                                      <span className="text-slate-700 text-[13px] font-bold font-sans">Returns</span>
                                      <div className="relative bg-[#16a34a] text-white text-[13px] font-bold px-4 py-1.5 rounded-l font-sans">
                                        ₹1 Crore
                                        {/* Triangle Flag tip shape on right side */}
                                        <div className="absolute left-full top-0 w-0 h-0 border-y-[14px] border-y-transparent border-l-[10px] border-l-[#16a34a]"></div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Area chart representation */}
                                  <div className="pt-2 w-full self-stretch">
                                    <div className="relative h-28 w-full">
                                      <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full">
                                        <defs>
                                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
                                            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                                          </linearGradient>
                                        </defs>
                                        {/* Grid lines */}
                                        <line x1="0" y1="90" x2="200" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                                        <line x1="0" y1="60" x2="200" y2="60" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                                        <line x1="0" y1="30" x2="200" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                                        
                                        {/* Chart Fill Area */}
                                        <path d="M 0 90 Q 50 82 100 68 T 150 42 T 200 10 L 200 90 L 0 90 Z" fill="url(#chartGrad)" />
                                        
                                        {/* Chart Line */}
                                        <path d="M 0 90 Q 50 82 100 68 T 150 42 T 200 10" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                        
                                        {/* Node marker at peak */}
                                        <circle cx="200" cy="10" r="4" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
                                      </svg>
                                      
                                      {/* Custom floating labels */}
                                      <div className="absolute right-0 top-0 text-[10px] font-black text-slate-800 font-sans">
                                        ₹1Cr.
                                      </div>
                                      <div className="absolute right-1 bottom-6 text-[9.5px] font-bold text-slate-500 font-sans bg-white/70 px-1 rounded">
                                        ₹24.0L inv
                                      </div>
                                    </div>

                                    {/* X Axis Timeline Labels */}
                                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium pt-1 font-sans select-none w-full">
                                      <span>Today</span>
                                      <span>5Y</span>
                                      <span>10Y</span>
                                      <span>15Y</span>
                                      <span>20Y</span>
                                    </div>
                                  </div>

                                  {/* Start Investing Sub-card banner */}
                                  <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl p-3.5 flex items-center justify-between w-full self-stretch">
                                    <div className="text-[11.5px] font-medium text-green-800 font-sans leading-normal text-left">
                                      Start investing and achieve your goals faster!
                                    </div>
                                    <button 
                                      type="button"
                                      onClick={() => toast.success("Opening SIP Calculator...")}
                                      className="text-[11px] font-extrabold text-[#16a34a] whitespace-nowrap hover:underline font-sans cursor-pointer flex items-center gap-0.5 ml-2"
                                    >
                                      Calculate SIP Today →
                                    </button>
                                  </div>

                                </div>

                              </div>

                              {/* Right Column: Trending Funds list (lg:col-span-8) */}
                              <div className="lg:col-span-8 space-y-6 w-full">
                                
                                {/* Section Title */}
                                <div className="flex items-center justify-between select-none">
                                  <h2 className="text-[18px] font-extrabold text-[#302985] font-sans">
                                    Trending Funds
                                  </h2>
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#f3effa] text-[#702082] text-[10px] font-bold font-sans select-none shadow-3xs">
                                    ★ CAGR since inception
                                  </span>
                                </div>

                                {/* Trending Funds Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                  
                                  {/* Fund 1: SBI Contra Fund */}
                                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4 text-left flex flex-col justify-between w-full">
                                    <div className="space-y-4 w-full">
                                      <div className="flex items-start justify-between w-full">
                                        <div className="flex items-center gap-3">
                                          <div className="w-9 h-9 rounded-full bg-[#f3effa] text-[#702082] flex items-center justify-center shrink-0">
                                            <Star size={16} className="fill-[#702082] text-[#702082]" />
                                          </div>
                                          <div>
                                            <h3 className="font-bold text-[14px] text-slate-800 font-sans">
                                              SBI Contra Fund
                                            </h3>
                                            <span className="text-[10px] text-slate-500 font-semibold font-sans uppercase">
                                              Equity
                                            </span>
                                          </div>
                                        </div>
                                        <button 
                                          type="button"
                                          onClick={() => toast.success("Navigating to SBI Contra Fund...")}
                                          className="text-[12px] font-extrabold text-[#702082] hover:underline font-sans cursor-pointer"
                                        >
                                          Invest Now
                                        </button>
                                      </div>

                                      {/* Info box */}
                                      <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 grid grid-cols-2 gap-4 w-full">
                                        <div>
                                          <div className="text-[9px] text-slate-500 font-bold uppercase font-sans tracking-wider">
                                            Min. Investment
                                          </div>
                                          <div className="text-[15px] font-extrabold text-slate-800 mt-1 font-sans">
                                            ₹5,000
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-[9px] text-slate-500 font-bold uppercase font-sans tracking-wider">
                                            Returns ★
                                          </div>
                                          <div className="text-[15px] font-extrabold text-green-600 mt-1 font-sans">
                                            18.33%
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5 pl-1 font-sans select-none mt-3">
                                      <span>📈</span>
                                      <span>100k+ invested in last 3 months</span>
                                    </div>
                                  </div>

                                  {/* Fund 2: SBI Equity Hybrid Fund */}
                                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4 text-left flex flex-col justify-between w-full">
                                    <div className="space-y-4 w-full">
                                      <div className="flex items-start justify-between w-full">
                                        <div className="flex items-center gap-3">
                                          <div className="w-9 h-9 rounded-full bg-[#f3effa] text-[#702082] flex items-center justify-center shrink-0">
                                            <Star size={16} className="fill-[#702082] text-[#702082]" />
                                          </div>
                                          <div>
                                            <h3 className="font-bold text-[14px] text-slate-800 font-sans">
                                              SBI Equity Hybrid Fund
                                            </h3>
                                            <span className="text-[10px] text-slate-500 font-semibold font-sans uppercase">
                                              Hybrid
                                            </span>
                                          </div>
                                        </div>
                                        <button 
                                          type="button"
                                          onClick={() => toast.success("Navigating to SBI Equity Hybrid Fund...")}
                                          className="text-[12px] font-extrabold text-[#702082] hover:underline font-sans cursor-pointer"
                                        >
                                          Invest Now
                                        </button>
                                      </div>

                                      {/* Info box */}
                                      <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 grid grid-cols-2 gap-4 w-full">
                                        <div>
                                          <div className="text-[9px] text-slate-500 font-bold uppercase font-sans tracking-wider">
                                            Min. Investment
                                          </div>
                                          <div className="text-[15px] font-extrabold text-slate-800 mt-1 font-sans">
                                            ₹1,000
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-[9px] text-slate-500 font-bold uppercase font-sans tracking-wider">
                                            Returns ★
                                          </div>
                                          <div className="text-[15px] font-extrabold text-green-600 mt-1 font-sans">
                                            14.90%
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5 pl-1 font-sans select-none mt-3">
                                      <span>📈</span>
                                      <span>100k+ invested in last 3 months</span>
                                    </div>
                                  </div>

                                  {/* Fund 3: SBI Gold Fund */}
                                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 space-y-4 text-left flex flex-col justify-between w-full">
                                    <div className="space-y-4 w-full">
                                      <div className="flex items-start justify-between w-full">
                                        <div className="flex items-center gap-3">
                                          <div className="w-9 h-9 rounded-full bg-[#f3effa] text-[#702082] flex items-center justify-center shrink-0">
                                            <Star size={16} className="fill-[#702082] text-[#702082]" />
                                          </div>
                                          <div>
                                            <h3 className="font-bold text-[14px] text-slate-800 font-sans">
                                              SBI Gold Fund
                                            </h3>
                                            <span className="text-[10px] text-slate-500 font-semibold font-sans uppercase">
                                              Other schemes
                                            </span>
                                          </div>
                                        </div>
                                        <button 
                                          type="button"
                                          onClick={() => toast.success("Navigating to SBI Gold Fund...")}
                                          className="text-[12px] font-extrabold text-[#702082] hover:underline font-sans cursor-pointer"
                                        >
                                          Invest Now
                                        </button>
                                      </div>

                                      {/* Info box */}
                                      <div className="bg-[#f8fafc] border border-slate-100 rounded-xl p-4 grid grid-cols-2 gap-4 w-full">
                                        <div>
                                          <div className="text-[9px] text-slate-500 font-bold uppercase font-sans tracking-wider">
                                            Min. Investment
                                          </div>
                                          <div className="text-[15px] font-extrabold text-slate-800 mt-1 font-sans">
                                            ₹5,000
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-[9px] text-slate-500 font-bold uppercase font-sans tracking-wider">
                                            Returns ★
                                          </div>
                                          <div className="text-[15px] font-extrabold text-green-600 mt-1 font-sans">
                                            9.97%
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5 pl-1 font-sans select-none mt-3">
                                      <span>📈</span>
                                      <span>100k+ invested in last 3 months</span>
                                    </div>
                                  </div>

                                  {/* Investment Assistance Card (matching reference images) */}
                                  <div className="bg-[#edf2f7] border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3.5 text-left flex flex-col justify-between w-full">
                                    <div className="space-y-2 w-full">
                                      <div className="flex items-center gap-2.5 w-full">
                                        <div className="w-8 h-8 rounded-lg bg-[#e2e8f0] text-slate-600 flex items-center justify-center shrink-0">
                                          {/* Custom Shield Profile Chart icon */}
                                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <path d="M12 8v4" />
                                            <path d="M12 16h.01" />
                                          </svg>
                                        </div>
                                        <h3 className="font-extrabold text-[14px] text-slate-800 font-sans">
                                          Investment Assistance
                                        </h3>
                                      </div>
                                      <p className="text-[11.5px] text-slate-500 leading-relaxed font-sans font-medium">
                                        Answer simple questions to evaluate your risk profile and get recommendation to right fund allocation
                                      </p>
                                    </div>

                                    <button 
                                      type="button"
                                      onClick={() => toast.success("Starting Risk Profile Assessment...")}
                                      className="self-start text-[12px] font-extrabold text-[#702082] hover:underline font-sans cursor-pointer mt-2"
                                    >
                                      Start Assessment →
                                    </button>
                                  </div>

                                </div>

                                {/* 3. Learn More Video Section (EXACT MATCH TO REFERENCE IMAGES) */}
                                <div className="border-t border-slate-200/60 pt-6 mt-8 w-full">
                                  <div className="flex items-center justify-between mb-4 select-none w-full">
                                    <h3 className="text-[15.5px] font-bold text-slate-800 font-sans">
                                      Learn more about Mutual Funds
                                    </h3>
                                    <button 
                                      type="button"
                                      onClick={() => toast.success("Navigating to all Mutual Fund videos...")}
                                      className="text-[12px] font-bold text-[#702082] hover:underline font-sans cursor-pointer"
                                    >
                                      View All
                                    </button>
                                  </div>

                                  {/* 4 Video cards */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                                    
                                    {/* Video Card 1: What is Mutual Fund */}
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col text-left cursor-pointer group" onClick={() => toast("Opening Video: What is Mutual Fund...")}>
                                      {/* Video Thumbnail */}
                                      <div className="h-32 relative flex items-center justify-center select-none overflow-hidden">
                                        <img 
                                          src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.17 PM.jpeg" 
                                          alt="What is Mutual Fund" 
                                          className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        {/* Play Icon Overlay */}
                                        <div className="w-10 h-10 rounded-full bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform z-10">
                                          <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                          </svg>
                                        </div>
                                      </div>
                                      {/* Video metadata text */}
                                      <div className="p-3 space-y-1">
                                        <h4 className="font-bold text-[12px] text-slate-800 leading-snug group-hover:text-[#702082] transition-colors font-sans truncate">
                                          What is Mutual Fund
                                        </h4>
                                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans line-clamp-2">
                                          What is Mutual Fund _ Mutual Fund Basics _ Learn About Mutual Funds _ SBI Mutual Fund
                                        </p>
                                      </div>
                                    </div>

                                    {/* Video Card 2: Benefits of Mutual Funds */}
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col text-left cursor-pointer group" onClick={() => toast("Opening Video: Benefits of Mutual Funds...")}>
                                      {/* Video Thumbnail */}
                                      <div className="h-32 relative flex items-center justify-center select-none overflow-hidden">
                                        <img 
                                          src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.17 PM.jpeg" 
                                          alt="Benefits of Mutual Funds" 
                                          className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="w-10 h-10 rounded-full bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform z-10">
                                          <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="p-3 space-y-1">
                                        <h4 className="font-bold text-[12px] text-slate-800 leading-snug group-hover:text-[#702082] transition-colors font-sans truncate">
                                          Benefits of Mutual Funds
                                        </h4>
                                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans line-clamp-2">
                                          Benefits of Mutual Funds _ Advantages of Mutual Funds _ SBI Mutual Fund
                                        </p>
                                      </div>
                                    </div>

                                    {/* Video Card 3: Type of Mutual Funds */}
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col text-left cursor-pointer group" onClick={() => toast("Opening Video: Type of Mutual Funds...")}>
                                      {/* Video Thumbnail */}
                                      <div className="h-32 relative flex items-center justify-center select-none overflow-hidden">
                                        <img 
                                          src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.19 PM (1).jpeg" 
                                          alt="Type of Mutual Funds" 
                                          className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="w-10 h-10 rounded-full bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform z-10">
                                          <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="p-3 space-y-1">
                                        <h4 className="font-bold text-[12px] text-slate-800 leading-snug group-hover:text-[#702082] transition-colors font-sans truncate">
                                          Type of Mutual Funds
                                        </h4>
                                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans line-clamp-2">
                                          Type of Mutual Funds _ Choosing the Right Mutual Fund _ SBI Mutual Fund
                                        </p>
                                      </div>
                                    </div>

                                    {/* Video Card 4: What is SIP */}
                                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow flex flex-col text-left cursor-pointer group" onClick={() => toast("Opening Video: What is SIP...")}>
                                      {/* Video Thumbnail */}
                                      <div className="h-32 relative flex items-center justify-center select-none overflow-hidden">
                                        <img 
                                          src="/images/landing/WhatsApp Image 2026-08-01 at 9.07.18 PM.jpeg" 
                                          alt="What is SIP" 
                                          className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="w-10 h-10 rounded-full bg-slate-900/60 text-white flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform z-10">
                                          <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                          </svg>
                                        </div>
                                      </div>
                                      <div className="p-3 space-y-1">
                                        <h4 className="font-bold text-[12px] text-slate-800 leading-snug group-hover:text-[#702082] transition-colors font-sans truncate">
                                          What is SIP
                                        </h4>
                                        <p className="text-[10px] text-slate-500 leading-relaxed font-sans line-clamp-2">
                                          What is SIP (Systematic Investment Plan) _ Advantages of SIP _ SIP Mutual Fund
                                        </p>
                                      </div>
                                    </div>

                                  </div>
                                </div>

                              </div>

                            </div>
                          ) : (
                            /* Other Sub-tabs: placeholder */
                            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 font-medium w-full">
                              Explore details for <span className="font-bold text-[#702082]">{mfSubTab}</span> under SBI Mutual Funds will be available shortly.
                            </div>
                          )}

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
