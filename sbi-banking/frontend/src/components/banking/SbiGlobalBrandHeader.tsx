'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  ChevronDown,
  HelpCircle,
  Gift,
  Building2,
  MessageSquare
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
  const [hoveredNavTab, setHoveredNavTab] = useState<NavTabId | null>(null);
  const [liteMode, setLiteMode] = useState(false);

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
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Customer Care Support', href: '/settings', icon: '📞' },
        { label: 'Download Tax Certificates', href: '/settings', icon: '📑' },
      ]
    }
  ];

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
              onClick={() => toast.success('YONO Rewards portal active')}
              className="text-white/80 hover:text-white px-3 py-1 text-xs flex items-center gap-1"
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

      {/* 2. MAIN WHITE BRAND NAVBAR WITH INTERACTIVE MEGA DROPDOWN HOVER MENU */}
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
          <nav className="relative flex items-center gap-1">
            {navTabs.map((tab) => {
              const isHovered = hoveredNavTab === tab.id;
              const isActive = activeNav === tab.id;

              return (
                <div 
                  key={tab.id}
                  className="relative"
                  onMouseEnter={() => setHoveredNavTab(tab.id)}
                  onMouseLeave={() => setHoveredNavTab(null)}
                >
                  <button
                    type="button"
                    onClick={() => router.push(tab.href)}
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

                  {/* Mega Dropdown Hover Card (Exact Match to User Reference Screenshot) */}
                  {isHovered && (
                    <div className="absolute top-full left-0 mt-1 w-[460px] bg-white rounded-2xl p-5 shadow-2xl border border-purple-100/80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="grid grid-cols-2 gap-5">
                        
                        {/* Column 1: Main Category Items */}
                        <div>
                          <h4 className="text-xs font-extrabold text-[#30135d] mb-2.5 pb-1.5 border-b border-purple-100">
                            {tab.col1Title}
                          </h4>
                          <div className="space-y-1">
                            {tab.col1Items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-[#f4edf9]/60 transition-all group border-b border-slate-50"
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

                        {/* Column 2: Quick Links */}
                        <div>
                          <h4 className="text-xs font-extrabold text-[#30135d] mb-2.5 pb-1.5 border-b border-purple-100">
                            {tab.col2Title}
                          </h4>
                          <div className="space-y-1">
                            {tab.col2Items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-2.5 py-1.5 px-2 rounded-xl hover:bg-[#f4edf9]/60 transition-all group border-b border-slate-50"
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
