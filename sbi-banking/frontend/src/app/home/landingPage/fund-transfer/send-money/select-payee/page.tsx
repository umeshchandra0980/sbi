'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Search,
  ChevronLeft,
  Plus
} from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function SendMoneySelectPayeePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentStep] = useState(0);

  const steps = [
    { label: 'Select Payee' },
    { label: 'Transaction details' },
    { label: 'Review' },
    { label: 'Authentication' },
    { label: 'Receipt' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-sans">
      {/* Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Payments" />

      {/* Page Container */}
      <main className="max-w-[1200px] w-full mx-auto px-6 py-5 flex-1">
        
        {/* Back Link */}
        <div className="mb-1.5">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#673391] hover:underline"
          >
            <ChevronLeft size={12} className="text-[#673391]" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Title */}
        <h1 className="text-[26px] font-bold text-[#673391] tracking-tight mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Send Money
        </h1>

        {/* Progress Bar Steps */}
        <div className="flex items-start gap-0 mb-5">
          {steps.map((step, index) => (
            <div key={step.label} className="flex-1 flex flex-col">
              <div className="h-[2px] rounded-full overflow-hidden bg-slate-200">
                <div 
                  className={`h-full rounded-full ${index === 0 ? 'bg-[#673391]' : 'bg-transparent'}`}
                  style={{ width: index === 0 ? '30%' : '0%' }}
                />
              </div>
              <div className="mt-1.5">
                <span 
                  className={`text-[11px] ${index === 0 ? 'text-[#673391] font-semibold' : 'text-slate-400 font-normal'}`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content White Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          
          {/* Header Row: Select Payee Title Left + Action Buttons Right */}
          <div className="flex items-center justify-between mb-4">
            {/* Left: Select Payee Title */}
            <h2 className="text-[20px] font-bold text-[#681d82]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Select Payee
            </h2>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={() => toast.success('Opening Transaction History')}
                className="text-[13px] font-semibold text-[#681d82] hover:underline cursor-pointer bg-transparent border-none"
              >
                Transaction History
              </button>

              <button
                type="button"
                onClick={() => toast.success('Opening Add Payee form')}
                className="bg-[#681d82] hover:bg-[#57166f] text-white text-[12px] font-semibold py-2.5 px-5 rounded-full transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} className="text-white" />
                <span>Add Payee</span>
              </button>

              <button
                type="button"
                onClick={() => toast.success('Opening Manage Payee list')}
                className="bg-[#681d82] hover:bg-[#57166f] text-white text-[12px] font-semibold py-2.5 px-5 rounded-full transition-all flex items-center gap-1 cursor-pointer min-w-[140px] justify-center"
              >
                <Plus size={14} className="text-white" />
                <span>Manage Payee</span>
              </button>
            </div>
          </div>

          {/* Recently Paid Section */}
          <div className="mb-4">
            <h3 className="text-[15px] font-bold text-slate-800">
              Recently Paid
            </h3>
          </div>

          {/* Transfer to Other Payees Section */}
          <div className="mb-4">
            <h3 className="text-[15px] font-bold text-slate-800 mb-3">
              Transfer to Other Payees
            </h3>
            
            {/* Search Input */}
            <div className="max-w-[300px] flex items-center gap-2 border-b border-slate-300 pb-2">
              <Search size={16} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search here..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-[13px] w-full text-slate-800 placeholder-slate-400" 
              />
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#2c2c2c] text-white/80 text-[11px] py-3 px-6 flex justify-center items-center mt-auto shrink-0">
        <div className="flex items-center gap-3">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span className="text-white/40">|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span className="text-white/40">|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
