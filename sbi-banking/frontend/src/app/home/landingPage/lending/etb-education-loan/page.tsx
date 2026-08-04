'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronRight, 
  Home, 
  GraduationCap, 
  Sliders, 
  Clock, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';

export default function EtbEducationLoanPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Features' | 'KnowMore' | 'Calculator'>('Features');
  const [loanAmount, setLoanAmount] = useState(100000); // 1,00,000 as in screenshot
  const [tenureYears, setTenureYears] = useState(1); // 1 Years as in screenshot
  const [rateOfInterest, setRateOfInterest] = useState(8); // 8% as in screenshot

  const calculateEmi = () => {
    const P = loanAmount;
    const r = rateOfInterest / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return Math.round(P / n);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Loans" activeTopTab="Banking" />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-7">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/etbPersonalLoan/description" className="hover:underline">Loans</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-500 font-normal">Education Loan</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Education Loan
        </h1>

        {/* Sub-Tabs Bar (Features / Know more / Calculator) */}
        <div className="mb-6">
          <div className="flex border-b border-slate-300 gap-8 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('Features')}
              className={`pb-2.5 text-sm font-extrabold transition-all relative cursor-pointer ${
                activeTab === 'Features' ? 'text-[#5b2e80]' : 'text-slate-500 hover:text-[#5b2e80]'
              }`}
            >
              <span>Features</span>
              {activeTab === 'Features' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                window.open('https://sbi.bank.in/web/personal-banking/loans/education-loans', '_blank', 'noopener,noreferrer');
              }}
              className={`pb-2.5 text-sm font-extrabold transition-all relative cursor-pointer ${
                activeTab === 'KnowMore' ? 'text-[#5b2e80]' : 'text-slate-500 hover:text-[#5b2e80]'
              }`}
            >
              <span>Know more</span>
              {activeTab === 'KnowMore' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('Calculator')}
              className={`pb-2.5 text-sm font-extrabold transition-all relative cursor-pointer ${
                activeTab === 'Calculator' ? 'text-[#5b2e80]' : 'text-slate-500 hover:text-[#5b2e80]'
              }`}
            >
              <span>Calculator</span>
              {activeTab === 'Calculator' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Box (Matching Screenshot 4 Exactly) */}
        <div className="bg-white rounded-2xl border border-purple-100/70 p-8 shadow-sm mb-8 min-h-[360px] relative">
          
          {/* FEATURES TAB (4 Cards Grid) */}
          {activeTab === 'Features' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 flex flex-col items-start justify-start min-h-[140px]">
                  <GraduationCap size={28} className="text-[#5b2e80] mb-4" />
                  <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                    Up to 100% financing
                  </h4>
                </div>

                {/* Card 2 */}
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 flex flex-col items-start justify-start min-h-[140px]">
                  <Sliders size={28} className="text-[#5b2e80] mb-4" />
                  <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                    Loan based on your needs
                  </h4>
                </div>

                {/* Card 3 */}
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 flex flex-col items-start justify-start min-h-[140px]">
                  <Clock size={28} className="text-[#5b2e80] mb-4" />
                  <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                    Repayment tenure up to 15 years
                  </h4>
                </div>

                {/* Card 4 */}
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 flex flex-col items-start justify-start min-h-[140px]">
                  <TrendingUp size={28} className="text-[#5b2e80] mb-4" />
                  <h4 className="text-sm font-extrabold text-slate-800 leading-snug">
                    Attractive interest rates
                  </h4>
                </div>

              </div>
            </div>
          )}

          {/* CALCULATOR TAB (MATCHING USER SCREENSHOT 1:1) */}
          {activeTab === 'Calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: 3 Sliders (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Select loan amount */}
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-slate-700">Select loan amount</span>
                    <span className="text-[14px] font-extrabold text-[#5b2e80] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">
                      ₹ {new Intl.NumberFormat('en-IN').format(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={30000000}
                    step={100000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>100000</span>
                    <span>30000000</span>
                  </div>
                </div>

                {/* 2. Loan Tenure */}
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-slate-700">Loan Tenure</span>
                    <span className="text-[14px] font-extrabold text-[#5b2e80] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">
                      {tenureYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>1</span>
                    <span>15</span>
                  </div>
                </div>

                {/* 3. Select Rate of Interest */}
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-slate-700">Select Rate of Interest</span>
                    <span className="text-[14px] font-extrabold text-[#5b2e80] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">
                      {rateOfInterest} %
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={18}
                    step={0.25}
                    value={rateOfInterest}
                    onChange={(e) => setRateOfInterest(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>5 %</span>
                    <span>18 %</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Estimated EMI Card + Disclaimer Note (5 Cols) */}
              <div className="lg:col-span-5 bg-[#f4f2f8] rounded-2xl p-8 border border-purple-100/70 flex flex-col items-center justify-center text-center min-h-[380px] space-y-6">
                
                {/* Large ₹8,699 EMI Display */}
                <div>
                  <span className="text-4xl md:text-5xl font-black text-[#5b2e80] tracking-tight block mb-2">
                    ₹{new Intl.NumberFormat('en-IN').format(calculateEmi())}
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    Estimated EMI (per month)
                  </span>
                </div>

                {/* Disclaimer Box */}
                <div className="bg-white border border-purple-200/80 rounded-xl p-5 text-left text-[12px] font-medium text-slate-600 leading-relaxed shadow-2xs flex gap-3">
                  <span className="text-[#5b2e80] font-bold text-base">ⓘ</span>
                  <p>
                    The final offer including the maximum amount, tenure, Rate of Interest and EMI shall be finalized post further assessment as per bank&apos;s policies. You may select required loan amount and appropriate tenure at a later stage.
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* Bottom Right Floating Proceed Button (Matching Screenshot 4) */}
          <div className="flex justify-end pt-8">
            <button
              type="button"
              onClick={() => {
                window.open('https://sbi.bank.in/web/personal-banking/loans/education-loans', '_blank', 'noopener,noreferrer');
              }}
              className="bg-[#5b2e80] hover:bg-[#4b1774] text-white font-extrabold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-xs cursor-pointer"
            >
              <span>Proceed</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

      </main>

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
