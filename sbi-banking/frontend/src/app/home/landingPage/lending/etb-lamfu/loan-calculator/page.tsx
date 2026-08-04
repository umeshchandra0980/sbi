'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, Info } from 'lucide-react';

export default function LoanCalculatorPage() {
  const router = useRouter();
  const [assetType, setAssetType] = useState<'Equity' | 'Debt'>('Equity');

  // Sliders State
  const [loanAmount, setLoanAmount] = useState(1000000); // 10,00,000 as in screenshot
  const [lienValue, setLienValue] = useState(2000000); // 20,00,000 as in screenshot

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Loans" activeTopTab="Banking" />

      {/* Main Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/etbPersonalLoan/description" className="hover:underline">Loans</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/lending/etb-lamfu/description" className="hover:underline">Loan Against Mutual Fund</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-500 font-normal">Loan calculator</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Loan Against Mutual Fund
        </h1>

        {/* Main Loan Calculator Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100/70 p-6 md:p-9 mb-8">
          
          <h2 className="text-xl font-extrabold text-[#5b2e80] mb-1">
            Loan calculator
          </h2>
          <p className="text-xs font-bold text-slate-500 mb-6">
            Tentative eligibility check
          </p>

          {/* Asset Type Sub-Tabs (Equity / Debt) */}
          <div className="flex border-b border-slate-200 gap-8 mb-8">
            <button
              type="button"
              onClick={() => setAssetType('Equity')}
              className={`pb-2.5 text-sm font-extrabold transition-all relative cursor-pointer ${
                assetType === 'Equity' ? 'text-[#5b2e80]' : 'text-slate-500 hover:text-[#5b2e80]'
              }`}
            >
              <span>Equity</span>
              {assetType === 'Equity' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setAssetType('Debt')}
              className={`pb-2.5 text-sm font-extrabold transition-all relative cursor-pointer ${
                assetType === 'Debt' ? 'text-[#5b2e80]' : 'text-slate-500 hover:text-[#5b2e80]'
              }`}
            >
              <span>Debt</span>
              {assetType === 'Debt' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>
          </div>

          {/* Sliders Row (Matching Screenshots 1 & 2 Exactly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
            
            {/* 1. Select Loan Amount */}
            <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-slate-800">Select loan amount</span>
                <span className="text-[14px] font-extrabold text-[#5b2e80] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">
                  ₹ {formatCurrency(loanAmount)}
                </span>
              </div>

              <input
                type="range"
                min={25000}
                max={1000000}
                step={25000}
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-[#5b2e80] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>₹25,000</span>
                <span>₹10,000,000</span>
              </div>
            </div>

            {/* 2. Value to mark lien */}
            <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-extrabold text-slate-800">Value to mark lien</span>
                <span className="text-[14px] font-extrabold text-[#5b2e80] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">
                  ₹ {formatCurrency(lienValue)}
                </span>
              </div>

              <input
                type="range"
                min={50000}
                max={2000000}
                step={50000}
                value={lienValue}
                onChange={(e) => setLienValue(Number(e.target.value))}
                className="w-full accent-[#5b2e80] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>₹50,000</span>
                <span>₹20,000,000</span>
              </div>
            </div>

          </div>

          {/* Loan to Lien Percentage Banner */}
          <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 flex flex-col items-center justify-center text-center mb-6">
            <span className="text-3xl font-black text-[#5b2e80] mb-1">
              50%
            </span>
            <span className="text-xs font-extrabold text-slate-600">
              Loan to lien percentage
            </span>
          </div>

          {/* Bottom Disclaimer Banner */}
          <div className="bg-[#f8f4fc] border border-purple-200/80 rounded-xl p-4 flex items-center gap-3 text-[12.5px] font-medium text-[#5b2e80] shadow-2xs">
            <Info size={18} className="flex-shrink-0 text-[#5b2e80]" />
            <p>
              Eligibility details are provisional. Final eligibility will be assessed during the loan application process.
            </p>
          </div>

        </div>

      </main>

      {/* Floating Bottom Sticky Navigation Bar (Matching Screenshot 2 Exactly) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 py-3.5 px-6 z-40 shadow-lg">
        <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between">
          
          {/* Previous Pill Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-white border border-[#5b2e80] text-[#5b2e80] font-bold py-2.5 px-6 rounded-full text-xs hover:bg-purple-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>&larr; Previous</span>
          </button>

          {/* Up Next Label & Save & Next Button */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">up next</p>
              <p className="text-xs font-extrabold text-slate-700">Avail Overdraft Facility</p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/home/landingPage/lending/etb-lamfu/personal-details')}
              className="py-2.5 px-8 rounded-full text-xs font-extrabold bg-[#5b2e80] hover:bg-[#4b1774] text-white shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Save &amp; Next</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>

      {/* Footer Links Bar */}
      <footer className="bg-[#333333] text-white text-xs py-3.5 px-6 text-center mt-auto mb-16">
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
