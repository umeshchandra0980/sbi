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
      href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection',
      col1Title: 'Fund Transfer',
      col1Items: [
        { label: 'Quick Transfer', href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection', icon: '🔄' },
        { label: 'Send Money', href: '/home/landingPage/fund-transfer/send-money/select-payee', icon: '📲' },
        { label: 'Manage Payee', href: '/home/landingPage/fund-transfer/send-money/select-payee', icon: '👤' },
        { label: 'Schedule Payments', href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection', icon: '📅' },
        { label: 'Send Money Abroad', href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection', icon: '🔀' },
        { label: 'Bill Payments', href: '/dashboard', icon: '🧾' },
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
    switch (label) {
      // Loans
      case 'Personal Loan':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
            <text x="13" y="10" fontSize="8" fontWeight="bold" fill="#5b2e80" stroke="none">%</text>
          </svg>
        );
      case 'Loan Against Mutual Fund':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
            <path d="M7 18h11a2 2 0 0 0 2-2v-5" />
            <circle cx="12" cy="6" r="3" />
          </svg>
        );
      case 'Home Loan':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <text x="10" y="18" fontSize="8" fontWeight="bold" fill="#5b2e80" stroke="none">%</text>
          </svg>
        );
      case 'Overdraft against Deposit':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <rect x="9" y="10" width="6" height="6" rx="1" />
          </svg>
        );
      case 'Education Loan':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
            <text x="10" y="8" fontSize="8" fontWeight="bold" fill="#5b2e80" stroke="none">%</text>
          </svg>
        );
      case 'Gold Loan':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 17h20v4H2zM4 11h16v4H4zM7 5h10v4H7z" />
            <text x="10" y="14" fontSize="8" fontWeight="bold" fill="#5b2e80" stroke="none">%</text>
          </svg>
        );
      case 'View Existing Loans':
      case 'Manage Loans':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3L2 10h20L12 3z" />
          </svg>
        );
      case 'Check your Credit Score':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 14l3-3" />
            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
          </svg>
        );
      case 'Calculate Loan EMI':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <path d="M8 12h8M8 16h8" />
          </svg>
        );

      // Cards & Accounts & Others
      case 'Credit Cards':
      case 'Debit Cards':
      case 'Forex Cards':
      case 'Prepaid Cards':
      case 'Manage Credit Card':
      case 'Manage Debit Card':
      case 'Manage Forex Card':
      case 'SBI Credit Cards':
      case 'Debit Card Management':
      case 'Credit Card':
      case 'Prepaid Card':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
            <line x1="6" y1="15" x2="10" y2="15" />
          </svg>
        );
      case 'Block / Unblock Card':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        );
      case 'Generate PIN':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="M11.5 11.5L21 2M18 5l3 3M15 8l3 3" />
          </svg>
        );
      case 'Card Rewards Points':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        );
      case 'Manage Card Limits':
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );

      default:
        return (
          <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3L2 10h20L12 3z" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full bg-white font-sans z-50">
      
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
      <header className="bg-white border-b border-slate-200/80 px-6 py-2 shadow-xs relative">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <img 
              src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/yono_logo.svg'; }}
              alt="YONO SBI NET-BANKING" 
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Nav Items Row */}
          <nav ref={navRef} className="relative flex items-center gap-1">
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
                      setOpenNavTab(isOpen ? null : tab.id);
                    }}
                    className={`relative block px-4 py-2 text-xs font-bold transition-all rounded-t-xl cursor-pointer ${
                      isActive 
                        ? 'bg-[#f4edf9] text-[#673391]' 
                        : 'text-slate-600 hover:text-[#673391] hover:bg-slate-50'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#673391] rounded-full" />
                    )}
                  </button>

                  {/* Mega Dropdown Click Card */}
                  {isOpen && (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-full left-0 mt-1 w-[480px] bg-[#f8f6fb] rounded-2xl p-5 shadow-2xl border border-purple-200/80 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        
                        {/* Column 1: Main Category Items */}
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-800 mb-3 pb-1 border-b border-purple-200/60">
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
                                <span className="text-[12px] font-bold text-slate-800 group-hover:text-[#673391]">
                                  {item.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-800 mb-3 pb-1 border-b border-purple-200/60">
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
                                <span className="text-[11.5px] font-bold text-slate-700 group-hover:text-[#673391]">
                                  {item.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </nav>

          {/* Profile Circle Pill */}
          <div 
            onClick={() => router.push('/profile')}
            className="flex items-center gap-2 bg-[#673391] text-white py-1 px-3 rounded-full text-xs font-bold shadow-xs cursor-pointer hover:bg-[#561578] transition-colors"
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
