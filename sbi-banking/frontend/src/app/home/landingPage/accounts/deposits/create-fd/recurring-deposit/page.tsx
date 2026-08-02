'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ChevronRight, Calendar, Eye, EyeOff } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function OpenRecurringDepositPage() {
  const router = useRouter();
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [amount, setAmount] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [installmentDate, setInstallmentDate] = useState('');
  const [interestPayout, setInterestPayout] = useState('At Maturity');
  const [maturityInstruction, setMaturityInstruction] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f2f8] font-sans pb-24 relative">
      {/* Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Deposits" />

      {/* Breadcrumb Navigation */}
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#673391]">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </Link>
          <span>&gt;</span>
          <Link href="/home/landingPage/accounts/deposits/create-fd" className="hover:underline">
            Deposits
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700">Recurring Deposit</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-16 flex-1">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#673391] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Open Recurring Deposit</h1>

        {/* Main Form Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
          <h2 className="text-xl font-extrabold text-[#673391] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>Recurring Deposit Details</h2>

          {/* 1. Debit Account & Enter Amount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-start">
            
            {/* Left: Debit Account Card */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Debit account</label>
              <div className="border border-slate-200 rounded-2xl p-4 flex items-center gap-3 bg-white hover:border-purple-300 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#00a0e3] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>XXXXXXX7054</span>
                    <button 
                      type="button" 
                      onClick={() => setShowAccountDetails(!showAccountDetails)}
                      className="text-[#673391] hover:opacity-80"
                    >
                      {showAccountDetails ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5">Savings Account</div>
                  <div className="text-xs font-bold text-slate-700 mt-0.5">Available Balance ₹0.09/-</div>
                </div>
              </div>
            </div>

            {/* Right: Enter Amount Underline Input */}
            <div>
              <div className="pt-6">
                <input 
                  type="text" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount" 
                  className="w-full border-b-2 border-slate-300 pb-2 text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:border-[#673391] transition-colors text-lg"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                />
              </div>
            </div>

          </div>

          <hr className="border-slate-100 my-6" />

          {/* 2. Duration & Interest Rates Row */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-slate-800">Duration</label>
              <button 
                type="button" 
                onClick={() => toast('Showing Interest Rates')}
                className="text-xs font-bold text-[#673391] hover:underline"
              >
                Interest Rates
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Deposit Duration: The interest rates differ based on duration of the deposit. Select your preferred duration.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="Years" 
                className="w-full border-b border-slate-300 pb-2 text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#673391] transition-colors text-sm"
              />
              <input 
                type="text" 
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                placeholder="Months" 
                className="w-full border-b border-slate-300 pb-2 text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#673391] transition-colors text-sm"
              />
            </div>
          </div>

          {/* 3. Installment Date Input */}
          <div className="mb-10 max-w-md">
            <div className="relative border-b border-slate-300 pb-2">
              <input 
                type="text" 
                value={installmentDate}
                onChange={(e) => setInstallmentDate(e.target.value)}
                placeholder="Installment Date (Monthly)" 
                className="w-full text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#673391] transition-colors text-sm pr-8"
              />
              <Calendar size={18} className="absolute right-0 top-1 text-[#673391] pointer-events-none" />
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* 4. Interest & Maturity Details */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4">Interest &amp; Maturity Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Interest Payout Select Dropdown */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Interest Payout</label>
                <div className="relative border-b border-slate-300 pb-2">
                  <select 
                    value={interestPayout}
                    onChange={(e) => setInterestPayout(e.target.value)}
                    className="w-full appearance-none bg-transparent text-slate-800 font-semibold text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="At Maturity">At Maturity</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  <ChevronRight size={16} className="absolute right-0 top-1 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              {/* Maturity Instruction Select Dropdown */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">Maturity Instruction</label>
                <div className="relative border-b border-slate-300 pb-2">
                  <select 
                    value={maturityInstruction}
                    onChange={(e) => setMaturityInstruction(e.target.value)}
                    className="w-full appearance-none bg-transparent text-slate-800 font-semibold text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="">Select Instruction</option>
                    <option value="Pay Principal and Interest">Pay Principal and Interest</option>
                    <option value="Renew Principal">Renew Principal</option>
                  </select>
                  <ChevronRight size={16} className="absolute right-0 top-1 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* 4 Bottom Summary Output Boxes */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#f4edf9]/60 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-slate-400 mb-1">-</div>
                <div className="text-xs font-semibold text-slate-700">Rate of Interest</div>
              </div>
              <div className="bg-[#f4edf9]/60 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-slate-400 mb-1">-</div>
                <div className="text-xs font-semibold text-slate-700">Maturity Date</div>
              </div>
              <div className="bg-[#f4edf9]/60 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-slate-400 mb-1">-</div>
                <div className="text-xs font-semibold text-slate-700">No. of Installments</div>
              </div>
              <div className="bg-[#f4edf9]/60 rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-slate-400 mb-1">-</div>
                <div className="text-xs font-semibold text-slate-700">Maturity Amount</div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Bottom Sticky Action Footer Bar (Matching Screenshot 4) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 py-3 px-6 z-40 shadow-lg">
        <div className="max-w-[1280px] mx-auto flex items-center justify-end gap-4">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-500">up next</div>
            <div className="text-xs font-bold text-slate-800">Nominee Details</div>
          </div>
          <button
            type="button"
            onClick={() => toast.success('Proceeding to Nominee Details')}
            className="bg-slate-200 text-slate-400 font-bold px-8 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-not-allowed"
          >
            <span>Proceed</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
