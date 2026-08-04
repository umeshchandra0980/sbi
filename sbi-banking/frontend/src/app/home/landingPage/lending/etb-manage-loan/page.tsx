'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, X } from 'lucide-react';

export default function EtbManageLoanPage() {
  const router = useRouter();
  const [loansSubTab, setLoansSubTab] = useState<'active' | 'closed'>('active');
  const [showEligibilityModal, setShowEligibilityModal] = useState(false);

  const loanProducts = [
    {
      name: 'Loan Against Mutual Fund',
      route: '/home/landingPage/lending/etb-lamfu/description',
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
      route: '/home/landingPage/etbPersonalLoan/description',
      icon: (
        <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: 'Car Loan',
      route: '',
      icon: (
        <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="6" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 11l2-5h10l2 5M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: 'Home Loan',
      route: '/home/landingPage/lending/etb-home-loan/home-loan-steps',
      icon: (
        <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: 'Education Loan',
      route: '/home/landingPage/lending/etb-education-loan',
      icon: (
        <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      name: 'Gold Loan',
      isComingSoon: true,
      icon: (
        <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 20h20M5 17h14M7 14h10M9 11h6M11 8h2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="4" r="2" fill="#702082" />
        </svg>
      )
    },
    {
      name: 'Overdraft Against Deposit',
      route: '/home/landingPage/lending/etb-odad/odad-features',
      icon: (
        <svg className="w-6 h-6 text-[#702082]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2a5 5 0 0 0-5 5v4h10V7a5 5 0 0 0-5-5z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  const handleProductClick = (item: typeof loanProducts[0]) => {
    if (item.isComingSoon) {
      toast('Coming Soon', {
        icon: 'ℹ️',
        position: 'bottom-center',
        style: {
          background: '#333333',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 18px',
        },
      });
    } else if (item.route) {
      router.push(item.route);
    } else {
      toast.success(`Starting application for ${item.name}...`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Loans" activeTopTab="Banking" />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-500 font-normal">Loans</span>
        </div>

        {/* 2-Column Split: Left Side (Banner + View Existing Loans), Right Side (Apply for a new Loan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Apply for a Business Loan Purple Banner (Matching Screenshots 1 & 3) */}
            <div className="bg-gradient-to-r from-[#2c2882] via-[#352f99] to-[#3a33a8] text-white rounded-2xl p-6 md:p-8 shadow-md relative overflow-hidden">
              {/* Soft Waves Graphic in Background */}
              <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 120" fill="none" className="w-full h-full">
                  <path d="M0 60 C50 20 120 100 200 40 L200 120 L0 120 Z" fill="#ffffff" />
                </svg>
              </div>

              <h2 className="text-lg md:text-xl font-extrabold tracking-wide mb-6 relative z-10">
                Apply for a Business Loan
              </h2>

              <button
                type="button"
                onClick={() => setShowEligibilityModal(true)}
                className="bg-white hover:bg-slate-50 text-[#302985] font-extrabold text-xs md:text-sm px-6 py-2.5 rounded-full shadow-xs transition-all relative z-10 cursor-pointer"
              >
                Click here to check your eligibility
              </button>
            </div>

            {/* 2. View Existing Loans Section (Matching Screenshots 1, 2, 4) */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold text-[#5b2e80]">
                View Existing Loans
              </h2>

              {/* Sub-Tabs: Active Loan(s) / Closed Loan(s) */}
              <div className="flex border-b border-slate-200 gap-8">
                <button
                  type="button"
                  onClick={() => setLoansSubTab('active')}
                  className={`pb-2.5 text-xs font-bold transition-all relative cursor-pointer ${
                    loansSubTab === 'active' ? 'text-[#5b2e80]' : 'text-slate-500 hover:text-[#5b2e80]'
                  }`}
                >
                  <span>Active Loan(s)</span>
                  {loansSubTab === 'active' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setLoansSubTab('closed')}
                  className={`pb-2.5 text-xs font-bold transition-all relative cursor-pointer ${
                    loansSubTab === 'closed' ? 'text-[#5b2e80]' : 'text-slate-500 hover:text-[#5b2e80]'
                  }`}
                >
                  <span>Closed Loan(s)</span>
                  {loansSubTab === 'closed' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
                  )}
                </button>
              </div>

              {/* Sub-Tab Content View */}
              {loansSubTab === 'active' ? (
                /* Active Loans Content */
                <div className="bg-white rounded-2xl border border-purple-100/70 p-10 min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 shadow-2xs">
                  {/* Clipboard Vector Graphic */}
                  <div className="w-48 h-48 relative flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                      <path d="M100 20 C140 20 170 30 170 70 C170 120 120 165 100 175 C80 165 30 120 30 70 C30 30 60 20 100 20 Z" fill="#fdf2f8" opacity="0.9" />
                      <path d="M100 25 C135 25 162 34 162 70 C162 115 116 156 100 165 C84 156 38 115 38 70 C38 34 65 25 100 25 Z" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="3 3" />
                      <rect x="65" y="60" width="70" height="95" rx="8" fill="#ffffff" stroke="#5b2e80" strokeWidth="3" />
                      <path d="M85 52 L115 52 A 4 4 0 0 1 119 56 L119 60 L81 60 L81 56 A 4 4 0 0 1 85 52 Z" fill="#5b2e80" />
                      <line x1="80" y1="85" x2="120" y2="85" stroke="#e9d5ff" strokeWidth="3" strokeLinecap="round" />
                      <line x1="80" y1="105" x2="120" y2="105" stroke="#e9d5ff" strokeWidth="3" strokeLinecap="round" />
                      <line x1="80" y1="125" x2="110" y2="125" stroke="#e9d5ff" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-xs md:text-sm font-extrabold text-slate-700">
                    No active loans found.
                  </p>
                </div>
              ) : (
                /* Closed Loans Content (Matching Screenshot 2 Exactly) */
                <div className="bg-white rounded-2xl border border-purple-100/70 p-10 min-h-[300px] flex flex-col items-center justify-center text-center space-y-4 shadow-2xs">
                  {/* Clipboard Vector Graphic with Checkmarks & Rupee/Percent */}
                  <div className="w-52 h-52 relative flex items-center justify-center">
                    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                      <path d="M100 20 C140 20 170 30 170 70 C170 120 120 165 100 175 C80 165 30 120 30 70 C30 30 60 20 100 20 Z" fill="#fdf2f8" opacity="0.9" />
                      <path d="M100 25 C135 25 162 34 162 70 C162 115 116 156 100 165 C84 156 38 115 38 70 C38 34 65 25 100 25 Z" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="3 3" />
                      
                      {/* Clipboard */}
                      <rect x="65" y="60" width="70" height="95" rx="8" fill="#ffffff" stroke="#3b3386" strokeWidth="3" />
                      <path d="M85 52 L115 52 A 4 4 0 0 1 119 56 L119 60 L81 60 L81 56 A 4 4 0 0 1 85 52 Z" fill="#7a6cb4" />
                      <circle cx="100" cy="56" r="2.5" fill="#ffffff" />
                      
                      {/* Checkmarks */}
                      <path d="M78 82 L84 88 L95 77" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="102" y1="84" x2="122" y2="84" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
                      
                      <path d="M78 102 L84 108 L95 97" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="102" y1="104" x2="122" y2="104" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />

                      <path d="M78 122 L84 128 L95 117" stroke="#fb7185" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="102" y1="124" x2="122" y2="124" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />

                      {/* Side Coin Pill Graphic */}
                      <circle cx="55" cy="148" r="13" fill="#7a6cb4" />
                      <text x="55" y="152" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#ffffff">₹</text>

                      <circle cx="82" cy="154" r="11" fill="#fbcfe8" />
                      <text x="82" y="158" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#702082">%</text>
                    </svg>
                  </div>
                  
                  <p className="text-xs md:text-sm font-extrabold text-[#5b2e80] max-w-[280px]">
                    No loans have been closed in the last 24 months.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: Apply for a new Loan (5 Cols) (Matching Screenshot 1 & 5) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-purple-100/70 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[#5b2e80]">
              Apply for a new Loan
            </h3>

            <div className="grid grid-cols-2 gap-3.5">
              {loanProducts.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => handleProductClick(opt)}
                  className="bg-white hover:bg-purple-50/20 border border-slate-200/80 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xs h-28"
                >
                  <div className="w-10 h-10 bg-transparent flex items-center justify-center rounded-full border border-slate-50 shrink-0 mb-2">
                    {opt.icon}
                  </div>
                  <span className="text-[11.5px] font-extrabold text-slate-700 leading-tight">
                    {opt.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* UNABLE TO PROCEED MODAL (Matching Screenshot 3 Exactly) */}
      {showEligibilityModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-[540px] w-full shadow-2xl overflow-hidden border border-purple-100 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-2">
              <h3 className="text-xl font-extrabold text-[#5b2e80]">
                Unable to proceed
              </h3>
              <button 
                type="button" 
                onClick={() => setShowEligibilityModal(false)} 
                className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Graphic & Message */}
            <div className="px-7 py-6 flex flex-col items-center text-center">
              
              {/* Triangle Pole Warning Graphic */}
              <div className="w-48 h-36 relative mb-6 flex items-center justify-center">
                <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M20 150 C60 120 110 135 160 150 Z" fill="#f5edfc" />
                  <path d="M100 150 C150 110 190 130 230 150 Z" fill="#eee3fa" />
                  <line x1="10" y1="150" x2="230" y2="150" stroke="#d8c5f2" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="120" y1="50" x2="120" y2="150" stroke="#702082" strokeWidth="3" strokeLinecap="round" />
                  <path d="M120 10 L155 65 L85 65 Z" fill="#ffffff" stroke="#702082" strokeWidth="5" strokeLinejoin="round" />
                  <path d="M120 27 L120 45" stroke="#702082" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="120" cy="54" r="2.5" fill="#702082" />
                </svg>
              </div>

              {/* Message */}
              <p className="text-xs md:text-sm font-extrabold text-slate-700 leading-relaxed max-w-[380px] mb-8">
                Apologies, this offer is not available for you in the current offer period.
              </p>

              {/* Okay Button */}
              <button
                type="button"
                onClick={() => setShowEligibilityModal(false)}
                className="w-full max-w-[280px] bg-[#5b2e80] hover:bg-[#4b1774] text-white font-extrabold py-3.5 px-6 rounded-full shadow-md transition-all text-xs cursor-pointer"
              >
                Okay
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Footer Links Bar */}
      <footer className="bg-[#333333] text-white text-xs py-3.5 px-6 text-center mt-auto">
        <div className="flex items-center justify-center gap-4 text-white/90">
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
