'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  ChevronDown,
  HelpCircle,
  Gift
} from 'lucide-react';

export type NavTabId = 'Overview' | 'Accounts' | 'Payments' | 'Deposits' | 'Loans' | 'Cards' | 'Investments' | 'Insurance' | 'Services';

interface SbiGlobalBrandHeaderProps {
  activeNav?: NavTabId;
  activeTopTab?: 'Banking' | 'Lifestyle' | 'Rewards';
}

export default function SbiGlobalBrandHeader({
  activeNav = 'Overview',
  activeTopTab = 'Banking'
}: SbiGlobalBrandHeaderProps) {
  const router = useRouter();
  const [openNavTab, setOpenNavTab] = useState<NavTabId | null>(null);
  const [liteMode, setLiteMode] = useState(false);

  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenNavTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTabs: {
    id: NavTabId;
    label: string;
    href: string;
    col1Title: string;
    col1Items: { label: string; href: string; icon: string }[];
    col2Title: string;
    col2Items: { label: string; href: string; icon: string }[];
  }[] = [
    {
      id: 'Overview',
      label: 'Overview',
      href: '/dashboard',
      col1Title: 'Quick Overview',
      col1Items: [
        { label: 'Dashboard Summary', href: '/dashboard', icon: '📊' },
        { label: 'Relationship Overview', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '🏦' },
        { label: 'Travel & Flights', href: '/home/landingPage/lifestyle', icon: '✈️' },
        { label: 'YONO Rewards & Offers', href: '/home/landingPage/others/rewards-end-point/rewards-endState', icon: '🎁' },
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
      href: '/accounts',
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
      href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection',
      col1Title: 'Fund Transfer',
      col1Items: [
        { label: 'Quick Transfer', href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection', icon: '🔄' },
        { label: 'Send Money', href: '/home/landingPage/fund-transfer/send-money/select-payee', icon: '📲' },
        { label: 'Manage Payee', href: '/home/landingPage/fund-transfer/send-money/select-payee', icon: '👤' },
        { label: 'Schedule Payments', href: '/home/landingPage/fund-transfer/scheduled-transactions', icon: '📅' },
        { label: 'Send Money Abroad', href: '/home/landingPage/fund-transfer/send-money-abroad', icon: '🔀' },
        { label: 'Bill Payments', href: '/home/landingPage/fund-transfer/bill-payments', icon: '🧾' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Transaction History', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '⇄' },
        { label: 'Manage Limits', href: '/settings?tab=Settings', icon: '⏲' },
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
      href: '/home/landingPage/etbPersonalLoan/description',
      col1Title: 'Products',
      col1Items: [
        { label: 'Personal Loan', href: '/home/landingPage/etbPersonalLoan/description', icon: '👤' },
        { label: 'Loan Against Mutual Fund', href: '/home/landingPage/lending/etb-lamfu/description', icon: '💼' },
        { label: 'Home Loan', href: '/home/landingPage/lending/etb-home-loan/home-loan-steps', icon: '🏠' },
        { label: 'Overdraft against Deposit', href: '/home/landingPage/etbPersonalLoan/description', icon: '🔒' },
        { label: 'Education Loan', href: '/home/landingPage/etbPersonalLoan/description', icon: '🎓' },
        { label: 'Gold Loan', href: '/home/landingPage/etbPersonalLoan/description', icon: '🥇' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'View Existing Loans', href: '/home/landingPage/etbPersonalLoan/description', icon: '🏦' },
        { label: 'Manage Loans', href: '/home/landingPage/etbPersonalLoan/description', icon: '🏦' },
        { label: 'Check your Credit Score', href: '/home/landingPage/etbPersonalLoan/description', icon: '⏱' },
        { label: 'Calculate Loan EMI', href: '/home/landingPage/etbPersonalLoan/description', icon: '🧮' },
      ]
    },
    {
      id: 'Cards',
      label: 'Cards',
      href: '/home/landingPage/creditCards/cc-landing',
      col1Title: 'Products',
      col1Items: [
        { label: 'Credit Cards', href: '/home/landingPage/creditCards/cc-landing', icon: '💳' },
        { label: 'Debit Cards', href: '/home/landingPage/accounts/debit-cards/debit-card-landing', icon: '💳' },
        { label: 'Forex Cards', href: '/home/landingPage/jointVentures/superapps/forex/forex-landing', icon: '💳' },
        { label: 'Prepaid Cards', href: 'https://prepaid.sbi.bank.in/', icon: '💳' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Manage Credit Card', href: '/home/landingPage/creditCards/cc-landing', icon: '💳' },
        { label: 'Manage Debit Card', href: '/home/landingPage/accounts/debit-cards/debit-card-landing', icon: '💳' },
        { label: 'Manage Forex Card', href: '/home/landingPage/jointVentures/superapps/forex/forex-landing', icon: '💳' },
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
      href: '/home/landingPage/manageRelationship/insurance/insurance',
      col1Title: 'Insurance Plans',
      col1Items: [
        { label: 'SBI Life Insurance', href: '/home/landingPage/manageRelationship/insurance/insurance', icon: '🛡' },
        { label: 'Health Insurance', href: '/home/landingPage/manageRelationship/insurance/insurance', icon: '🏥' },
        { label: 'Motor Insurance', href: '/home/landingPage/manageRelationship/insurance/insurance', icon: '🚗' },
        { label: 'Link Existing Policy', href: '/home/landingPage/manageRelationship/insurance/insurance', icon: '🔗' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Buy New Policy', href: '/home/landingPage/manageRelationship/insurance/insurance', icon: '🛒' },
        { label: 'Manage Policies', href: '/home/landingPage/manageRelationship/insurance/insurance', icon: '📑' },
      ]
    },
    {
      id: 'Services',
      label: 'Services',
      href: '/settings',
      col1Title: 'Service Requests',
      col1Items: [
        { label: 'Update Profile Details', href: '/profile', icon: '👤' },
        { label: 'ATM / Branch Locator', href: '/settings', icon: '📍' },
        { label: 'Cheque Book Request', href: '/settings', icon: '📝' },
        { label: 'Lock / Unlock User Access', href: '/settings', icon: '🛡' },
      ],
      col2Title: 'Lifestyle & Utilities',
      col2Items: [
        { label: 'Flight, Train & Bus Bookings', href: '/home/landingPage/lifestyle', icon: '✈️' },
        { label: 'Gift Vouchers & Vouchers', href: '/home/landingPage/lifestyle', icon: '🎁' },
        { label: 'ClearTax & YONO Motorz', href: '/home/landingPage/lifestyle', icon: '🚗' },
        { label: 'Customer Care Support', href: '/settings', icon: '📞' },
      ]
    }
  ];

  const renderNavIcon = (label: string) => {
    let iconPath = '';

    switch (label) {
      // Investments
      case 'Mutual Funds':
        iconPath = '/images/category-icons/ic_mutual_funds.svg';
        break;
      case 'Demat & Securities':
        iconPath = '/images/category-icons/ic_demat_account.svg';
        break;
      case 'National Pension System (NPS)':
        iconPath = '/images/category-icons/ic_nps.svg';
        break;
      case 'Public Provident Fund (PPF)':
        iconPath = '/images/category-icons/ic_ppf.svg';
        break;

      // Loans
      case 'Personal Loan':
        iconPath = '/images/category-icons/ic_personal_loan.svg';
        break;
      case 'Loan Against Mutual Fund':
        iconPath = '/images/category-icons/ic_loan_against_mutual_fund.svg';
        break;
      case 'Home Loan':
        iconPath = '/images/category-icons/ic_home_loan.svg';
        break;
      case 'Gold Loan':
        iconPath = '/images/category-icons/ic_gold_loan.svg';
        break;

      // Deposits
      case 'Fixed Deposit (FD)':
        iconPath = '/images/category-icons/ic_fixed_deposit.svg';
        break;
      case 'Recurring Deposit (RD)':
        iconPath = '/images/category-icons/ic_recurring_deposit.svg';
        break;
      case 'Deposit Interest Certificate':
        iconPath = '/images/category-icons/ic_annuity_deposit.svg';
        break;
      case 'Open Fixed Deposit':
        iconPath = '/images/category-icons/ic_auto_sweep.svg';
        break;

      // Insurance
      case 'SBI Life Insurance':
        iconPath = '/images/category-icons/ic_life_insurance.svg';
        break;
      case 'Health Insurance':
        iconPath = '/images/category-icons/ic_health_insurance.svg';
        break;
      case 'Link Existing Policy':
        iconPath = '/images/category-icons/ic_accident_insurance.svg';
        break;
      case 'Motor Insurance':
        iconPath = '/images/category-icons/ic_car_insurance.svg';
        break;

      // Cards
      case 'Credit Cards':
      case 'Manage Credit Card':
        iconPath = '/images/category-icons/ic_credit_card.svg';
        break;
      case 'Debit Cards':
      case 'Manage Debit Card':
        iconPath = '/images/category-icons/ic_debit_card.svg';
        break;
      case 'Forex Cards':
      case 'Manage Forex Card':
        iconPath = '/images/category-icons/ic_forex_card.svg';
        break;
      case 'Prepaid Cards':
        iconPath = '/images/category-icons/ic_ncmc_card.svg';
        break;

      // Services
      case 'Update Profile Details':
        iconPath = '/images/category-icons/ic_profile_details.svg';
        break;
      case 'ATM / Branch Locator':
        iconPath = '/images/category-icons/ic_tax_related.svg';
        break;
      case 'Cheque Book Request':
        iconPath = '/images/category-icons/ic_cheque_services.svg';
        break;
      case 'Lock / Unlock User Access':
        iconPath = '/images/category-icons/ic_esecure_lock.svg';
        break;

      default:
        break;
    }

    if (iconPath) {
      return <img src={iconPath} alt={label} className="w-5 h-5 object-contain" />;
    }

    return (
      <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3L2 10h20L12 3z" />
      </svg>
    );
  };

  const renderPaymentsIcon = (label: string) => {
    switch (label) {
      case 'Quick Transfer':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6" />
            <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        );
      case 'Send Money':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <path d="M12 18h.01" />
            <path d="M2 10h12m-3-3l3 3-3 3" />
          </svg>
        );
      case 'Manage Payee':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case 'Schedule Payments':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case 'Send Money Abroad':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10H4M4 10l4-4M4 10l4 4M4 14h16M20 14l-4-4M20 14l-4 4" />
          </svg>
        );
      case 'Bill Payments':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="16" y2="14" />
            <line x1="8" y1="18" x2="12" y2="18" />
          </svg>
        );
      case 'Transaction History':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10H4M4 10l4-4M4 10l4 4" />
            <path d="M4 14h16M20 14l-4-4M20 14l-4 4" />
          </svg>
        );
      case 'Manage Limits':
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.24 12.24a8 8 0 0 0-16.48 0" />
            <path d="M12 17v-4" />
            <circle cx="12" cy="17" r="1" />
            <path d="m16 13-4-4" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full bg-white font-sans z-50 sticky top-0 shadow-sm">
      {/* Backdrop overlay for dimming the page content when dropdown menu is open */}
      {openNavTab && (
        <div 
          className="fixed inset-0 bg-black/45 backdrop-blur-[1px] z-40 transition-opacity duration-200 cursor-pointer"
          onClick={() => setOpenNavTab(null)}
        />
      )}
      
      {/* 1. TOP PURPLE UTILITY HEADER BAR */}
      <div className="bg-[#302985] text-white text-xs py-1.5 px-6 shadow-xs">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Left Top Tabs */}
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => router.push('/dashboard')}
              className={`px-3.5 py-1 text-xs font-bold rounded-t-md transition-colors ${
                activeTopTab === 'Banking' ? 'bg-white text-[#302985]' : 'text-white/80 hover:text-white'
              }`}
            >
              Banking
            </button>
            <button 
              type="button" 
              onClick={() => router.push('/home/landingPage/lifestyle')}
              className={`px-3.5 py-1 text-xs font-bold rounded-t-md transition-colors ${
                activeTopTab === 'Lifestyle' ? 'bg-white text-[#302985]' : 'text-white/80 hover:text-white'
              }`}
            >
              Lifestyle
            </button>
            <button 
              type="button" 
              onClick={() => router.push('/home/landingPage/others/rewards-end-point/rewards-endState')}
              className={`px-3.5 py-1 text-xs font-bold rounded-t-md transition-colors flex items-center gap-1 ${
                activeTopTab === 'Rewards' ? 'bg-white text-[#302985]' : 'text-white/80 hover:text-white'
              }`}
            >
              <Gift size={13} />
              <span>Rewards</span>
            </button>
            
            <div className="flex items-center gap-2 ml-4 font-semibold text-xs text-white">
              <span>YONO Net Banking Lite</span>
              <button 
                type="button"
                onClick={() => setLiteMode(!liteMode)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                  liteMode ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'
                }`}
              >
                {liteMode ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Right Support & Tools */}
          <div className="flex items-center gap-4 text-xs text-white/90">
            <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <HelpCircle size={13} />
              <span>Get Help</span>
              <span className="font-bold">1800-11-1101</span>
            </a>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>English</span>
              <ChevronDown size={12} />
            </div>
            <span className="font-bold cursor-pointer">– A +</span>
            <button 
              type="button" 
              onClick={() => {
                toast.success('Logged out successfully');
                router.push('/auth/login');
              }}
              className="border border-white/60 hover:bg-white/10 px-2.5 py-0.5 rounded text-xs transition-colors"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN WHITE BRAND NAVBAR WITH INTERACTIVE MEGA DROPDOWN CLICK MENU */}
      <header className="bg-white border-b border-slate-200/80 px-4 md:px-6 py-3.5 shadow-xs relative">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left Group: Logo + Nav Items */}
          <div className="flex items-center gap-16 md:gap-24">
            <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
              <img 
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/yono_logo.svg'; }}
                alt="YONO SBI NET-BANKING" 
                className="h-9.5 w-auto object-contain"
              />
            </Link>

            {/* Nav Items Row */}
            <nav ref={navRef} className="relative flex items-center gap-0.5">
              {navTabs.map((tab) => {
                const isOpen = openNavTab === tab.id;
                const isActive = openNavTab === null ? activeNav === tab.id : openNavTab === tab.id;

                return (
                  <div 
                    key={tab.id}
                    className="relative"
                  >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (tab.id === 'Accounts') {
                        router.push('/accounts');
                        setOpenNavTab(null);
                      } else {
                        setOpenNavTab(isOpen ? null : tab.id);
                      }
                    }}
                    className={`relative block px-3.5 py-2 font-sans font-semibold text-[14px] transition-all rounded-t-xl cursor-pointer ${
                      isActive 
                        ? 'bg-[#f4edf9] text-[#673391]' 
                        : 'text-slate-600 hover:text-[#673391] hover:bg-slate-50'
                    }`}
                    style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#673391] rounded-full" />
                    )}
                  </button>

                  {/* Mega Dropdown Click Card */}
                  {isOpen && (
                    tab.id === 'Payments' ? (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-full left-[-92px] mt-2 w-[420px] bg-[#f2eff4] rounded-2xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-purple-200/40 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="grid grid-cols-[1.1fr_0.9fr] gap-x-8">
                          
                          {/* Column 1: Fund Transfer */}
                          <div>
                            <h4 className="text-[14px] font-bold text-[#1f2937] mb-4 tracking-tight">
                              {tab.col1Title}
                            </h4>
                            <div className="flex flex-col">
                              {tab.col1Items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  target={item.href.startsWith('http') ? '_blank' : undefined}
                                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  onClick={() => setTimeout(() => setOpenNavTab(null), 100)}
                                  className="flex items-center gap-4 py-3.5 border-b border-slate-200 last:border-0 hover:opacity-80 transition-all group"
                                >
                                  <div className="flex-shrink-0">
                                    {renderPaymentsIcon(item.label)}
                                  </div>
                                  <span className="text-[14px] font-semibold text-[#1f2937] group-hover:text-[#702082] transition-colors">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Quick Links */}
                          <div>
                            <h4 className="text-[14px] font-bold text-[#1f2937] mb-4 tracking-tight">
                              {tab.col2Title}
                            </h4>
                            <div className="flex flex-col">
                              {tab.col2Items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  target={item.href.startsWith('http') ? '_blank' : undefined}
                                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  onClick={() => setTimeout(() => setOpenNavTab(null), 100)}
                                  className="flex items-center gap-4 py-3.5 border-b border-slate-200 last:border-0 hover:opacity-80 transition-all group"
                                >
                                  <div className="flex-shrink-0">
                                    {renderPaymentsIcon(item.label)}
                                  </div>
                                  <span className="text-[14px] font-semibold text-[#1f2937] group-hover:text-[#702082] transition-colors">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-full left-0 mt-1 w-[440px] max-w-[90vw] bg-[#f8f6fb] rounded-2xl p-4 md:p-5 shadow-2xl border border-purple-200/80 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          
                          {/* Column 1: Main Category Items */}
                          <div>
                            <h4 className="text-xs font-extrabold text-[#673391] uppercase tracking-wider mb-3 pb-1 border-b border-purple-200/60">
                              {tab.col1Title}
                            </h4>
                            <div className="space-y-1">
                              {tab.col1Items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  target={item.href.startsWith('http') ? '_blank' : undefined}
                                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  onClick={() => setTimeout(() => setOpenNavTab(null), 100)}
                                  className="flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-white transition-all group border-b border-purple-100/40"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white border border-purple-200/70 text-[#673391] flex items-center justify-center text-sm shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                                    {renderNavIcon(item.label)}
                                  </div>
                                  <span 
                                    className="text-[13.5px] font-sans font-semibold text-slate-800 group-hover:text-[#673391] leading-tight tracking-normal"
                                    style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
                                  >
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Quick Links */}
                          <div>
                            <h4 className="text-xs font-extrabold text-[#673391] uppercase tracking-wider mb-3 pb-1 border-b border-purple-200/60">
                              {tab.col2Title}
                            </h4>
                            <div className="space-y-1">
                              {tab.col2Items.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  target={item.href.startsWith('http') ? '_blank' : undefined}
                                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  onClick={() => setTimeout(() => setOpenNavTab(null), 100)}
                                  className="flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-white transition-all group"
                                >
                                  <div className="w-6 h-6 rounded-md bg-white border border-purple-200/70 text-[#673391] flex items-center justify-center text-xs shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
                                    {renderNavIcon(item.label)}
                                  </div>
                                  <span 
                                    className="text-[13.5px] font-sans font-semibold text-slate-700 group-hover:text-[#673391] leading-tight tracking-normal"
                                    style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
                                  >
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>
                    )
                  )}

                </div>
              );
            })}
          </nav>
        </div>

          {/* Profile Circle Pill */}
          <div 
            onClick={() => router.push('/profile')}
            className="flex items-center gap-2 bg-[#673391] text-white py-1 px-3 rounded-full text-xs font-bold shadow-xs cursor-pointer hover:bg-[#561578] transition-colors flex-shrink-0"
          >
            <div className="w-6 h-6 rounded-full bg-amber-200 text-[#673391] flex items-center justify-center text-[10px] font-black">
              DV
            </div>
            <span>My Profile</span>
          </div>

        </div>
      </header>

    </div>
  );
}
