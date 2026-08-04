'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronRight, 
  User, 
  Sliders, 
  Building2, 
  FileText, 
  FileCheck, 
  Smartphone, 
  ArrowRight,
  Calculator,
  Sprout,
  TrendingUp,
  Gauge,
  Home,
  FileSpreadsheet
} from 'lucide-react';

export default function EtbLamfuDescriptionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Features' | 'Eligibility' | 'KnowMore'>('Features');

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col">
      
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
          <Link href="/home/landingPage/etbPersonalLoan/description" className="hover:underline">Loans</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-600">Loan Against Mutual Fund</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-500 font-normal">New Application</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Loan Against Mutual Fund
        </h1>

        {/* Main Process Container (Steps To Avail + Graphic & Action) */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100/70 p-6 md:p-9 mb-8">
          
          <h2 className="text-xl font-extrabold text-[#5b2e80] mb-7">
            Steps To Avail
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Steps Column with Vertical Dashed Stepper (7 Cols) */}
            <div className="lg:col-span-7 pr-0 lg:pr-6 lg:border-r border-purple-100/70">
              <div className="relative pl-1 space-y-6">
                
                {/* Dashed Connecting Line */}
                <div className="absolute left-[21px] top-5 bottom-5 w-[2px] border-l-2 border-dashed border-purple-200 pointer-events-none" />

                {/* Step 1 */}
                <div className="relative flex items-center gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <User size={18} />
                  </div>
                  <span className="text-[13.5px] font-extrabold text-[#1f2937]">
                    Review your personal details
                  </span>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Sliders size={18} />
                  </div>
                  <span className="text-[13.5px] font-extrabold text-[#1f2937]">
                    Check your eligibility
                  </span>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Building2 size={18} />
                  </div>
                  <span className="text-[13.5px] font-extrabold text-[#1f2937]">
                    Enter loan amount and confirm the required lien amount
                  </span>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <FileText size={18} />
                  </div>
                  <span className="text-[13.5px] font-extrabold text-[#1f2937]">
                    Select Mutual Funds to lien
                  </span>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-center gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <FileCheck size={18} />
                  </div>
                  <span className="text-[13.5px] font-extrabold text-[#1f2937]">
                    Accept Terms &amp; Conditions
                  </span>
                </div>

                {/* Step 6 */}
                <div className="relative flex items-center gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Smartphone size={18} />
                  </div>
                  <span className="text-[13.5px] font-extrabold text-[#1f2937]">
                    Access this Overdraft loan facility
                  </span>
                </div>

              </div>
            </div>

            {/* Right Graphic & Action Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center pl-0 lg:pl-4">
              
              {/* Shield & Money Bag Illustration */}
              <div className="w-full max-w-[320px] h-[220px] bg-[#f8f4fc] rounded-2xl p-5 mb-8 flex flex-col items-center justify-center relative border border-purple-100/60 shadow-xs">
                
                {/* Background Chart Arrow */}
                <div className="absolute inset-4 flex items-center justify-center opacity-30 pointer-events-none">
                  <svg className="w-full h-full text-purple-400" viewBox="0 0 200 150" fill="none" stroke="currentColor">
                    <path d="M10 130 Q 80 80, 180 20" strokeWidth="6" strokeDasharray="8 8" />
                    <path d="M160 20 L180 20 L180 40" strokeWidth="6" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Shield Graphic Badge */}
                <div className="relative z-10 w-24 h-28 bg-white rounded-[24px] border-4 border-[#5b2e80] shadow-xl flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#c026d3] text-white flex items-center justify-center text-xl font-extrabold shadow-md">
                    ₹
                  </div>
                </div>

                {/* Side Money Bag & Person */}
                <div className="absolute right-6 top-8 w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-sm font-bold shadow-md">
                  ₹
                </div>

              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => router.push('/home/landingPage/lending/etb-lamfu/personal-details')}
                className="w-full max-w-[340px] bg-[#5b2e80] hover:bg-[#4b1774] text-white font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm mb-4 cursor-pointer"
              >
                <span>Avail Overdraft Facility</span>
                <ArrowRight size={18} />
              </button>

              {/* Loan Calculator Link */}
              <button
                type="button"
                onClick={() => router.push('/home/landingPage/lending/etb-lamfu/loan-calculator')}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#5b2e80] hover:underline cursor-pointer"
              >
                <Calculator size={16} />
                <span>Loan calculator</span>
              </button>

            </div>

          </div>

        </div>

        {/* Sub-Tabs Bar */}
        <div className="mb-6">
          <div className="flex border-b border-slate-300 gap-7 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('Features')}
              className={`pb-2.5 text-sm font-bold transition-all relative cursor-pointer ${
                activeTab === 'Features' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Features</span>
              {activeTab === 'Features' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('Eligibility')}
              className={`pb-2.5 text-sm font-bold transition-all relative cursor-pointer ${
                activeTab === 'Eligibility' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Eligibility</span>
              {activeTab === 'Eligibility' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                window.open('https://sbi.bank.in/web/personal-banking/loans/personal-loans/real-time-xpress-credit', '_blank', 'noopener,noreferrer');
              }}
              className={`pb-2.5 text-sm font-bold transition-all relative cursor-pointer ${
                activeTab === 'KnowMore' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Know More</span>
              {activeTab === 'KnowMore' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-2xl border border-purple-100/70 p-6 shadow-sm mb-12">
          
          {/* FEATURES TAB (6 Cards Grid) */}
          {activeTab === 'Features' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <Smartphone size={26} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Completely digital process
                </h4>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <FileText size={26} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Instant overdraft facility
                </h4>
              </div>

              {/* Card 3 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <Sprout size={26} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  No need to liquidate your mutual funds
                </h4>
              </div>

              {/* Card 4 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <TrendingUp size={26} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Interest charged only on utilized amount
                </h4>
              </div>

              {/* Card 5 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <FileSpreadsheet size={26} className="text-[#5b2e80] mb-3" />
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  Processing Fee of 0.5% loan amount plus applicable GST with a maximum cap of Rs. 5000 will be applicable. Minimum amount of the Processing Fee shall be Rs. 500 plus applicable GST.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <Gauge size={26} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Avail upto ₹ 10 Lakh for Equity and upto ₹ 5 Crore for Debt
                </h4>
              </div>

            </div>
          )}

          {/* ELIGIBILITY TAB (4 Cards Grid) */}
          {activeTab === 'Eligibility' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <Building2 size={26} className="text-[#5b2e80] mb-4" />
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  Customers with a <span className="font-extrabold text-slate-900">Savings or Current account</span> (single or joint, with Either/Survivor or Former/Survivor or Anyone/Survivor facility)
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <User size={26} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Resident Indians <span className="font-extrabold">above 18 years of age</span>
                </h4>
              </div>

              {/* Card 3 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <Sprout size={26} className="text-[#5b2e80] mb-4" />
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  Mutual Fund holdings with <span className="font-extrabold text-slate-900">CAMS</span> must be in a single name
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <Smartphone size={26} className="text-[#5b2e80] mb-4" />
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  <span className="font-extrabold text-slate-900">PAN and mobile details</span> in bank records must match Mutual Fund records
                </p>
              </div>

            </div>
          )}

          {/* KNOW MORE TAB */}
          {activeTab === 'KnowMore' && (
            <div className="py-8 text-center text-slate-600 text-sm font-medium">
              Additional terms &amp; conditions for <span className="font-bold text-[#5b2e80]">Loan Against Mutual Fund</span> apply. For personalized assistance, contact your local SBI branch or customer support.
            </div>
          )}

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
