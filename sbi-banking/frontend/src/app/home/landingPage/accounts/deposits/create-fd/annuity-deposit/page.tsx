'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function OpenAnnuityDepositPage() {
  const router = useRouter();
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const durationOptions = [
    { label: '10 Years', rate: '6.05%' },
    { label: '7 Years', rate: '6.05%' },
    { label: '5 Years', rate: '6.05%' },
    { label: '3 Years', rate: '6.30%' },
  ];

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
          <Link href="/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true" className="hover:underline">
            Deposits
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700">Annuity Deposit</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-16 flex-1">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#673391] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Open Annuity Deposit
        </h1>

        {/* Main Form Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
          <h2 className="text-xl font-extrabold text-[#673391] mb-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Annuity Deposit Details
          </h2>

          {/* 1. Debit Account & Enter Amount Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-start">
            
            {/* Left: Debit Account Card */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Debit account
              </label>
              <div className="border border-slate-200 rounded-2xl p-4 flex items-center gap-3 bg-white hover:border-purple-300 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#00a0e3] text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      XXXXXXX7054
                    </span>
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

          {/* 2. Duration & Deposit Duration Options (2x2 Grid with Rates) */}
          <div className="mb-8">
            <h3 className="text-base font-bold text-slate-900 mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Duration
            </h3>
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Deposit Duration</h4>
            <p className="text-xs font-medium text-slate-500 mb-4">
              The interest rates differ based on duration of the deposit. Select your preferred duration.
            </p>

            {/* 2x2 Grid Cards (Matching Screenshot 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {durationOptions.map((opt) => (
                <div
                  key={opt.label}
                  onClick={() => setSelectedDuration(opt.label)}
                  className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                    selectedDuration === opt.label
                      ? 'border-[#673391] bg-[#f4edf9]/40 shadow-xs'
                      : 'border-slate-200 hover:border-purple-300 bg-white'
                  }`}
                >
                  <span className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {opt.label}
                  </span>
                  <div className="border-l border-slate-200 pl-4">
                    <span className="font-extrabold text-[#673391] text-lg" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {opt.rate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* 3. Output Summary Cards (Rate of Interest, Maturity Date, Monthly Payout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#f4edf9]/60 rounded-xl p-4 text-center">
              <div className="text-xl font-extrabold text-slate-400 mb-1">-</div>
              <div className="text-xs font-bold text-slate-700">Rate of Interest</div>
            </div>
            <div className="bg-[#f4edf9]/60 rounded-xl p-4 text-center">
              <div className="text-xl font-extrabold text-slate-400 mb-1">-</div>
              <div className="text-xs font-bold text-slate-700">Maturity Date</div>
            </div>
            <div className="bg-[#f4edf9]/60 rounded-xl p-4 text-center">
              <div className="text-xl font-extrabold text-slate-400 mb-1">-</div>
              <div className="text-xs font-bold text-slate-700">Monthly Payout</div>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom Sticky Action Footer Bar (Matching Screenshots 1 & 2) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 py-3 px-6 z-40 shadow-lg">
        <div className="max-w-[1280px] mx-auto flex items-center justify-end gap-4">
          <div className="text-right">
            <div className="text-[11px] font-semibold text-slate-500">up next</div>
            <div className="text-xs font-bold text-slate-800">Nominee details</div>
          </div>
          <button
            type="button"
            onClick={() => toast.success('Proceeding to Nominee details')}
            className="bg-slate-200 text-slate-400 font-bold px-8 py-2.5 rounded-full text-sm flex items-center gap-2 cursor-not-allowed"
          >
            <span>Proceed</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
