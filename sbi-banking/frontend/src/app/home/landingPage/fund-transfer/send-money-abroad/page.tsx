'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Search, Home, ChevronRight, Plus } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function SendMoneyAbroadPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f8f9fb] flex flex-col font-sans">
      {/* Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Payments" />

      {/* Main Content Area */}
      <main className="max-w-[1200px] w-full mx-auto px-6 py-5 flex-1 flex flex-col">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-1">
          <Link href="/dashboard" className="hover:opacity-80">
            <Home size={14} className="text-slate-600" />
          </Link>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-[12px] text-slate-600 font-medium">Send Money Abroad</span>
        </div>

        {/* Page Title and Transaction History Button Row */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-[26px] font-bold text-[#673391] tracking-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Send Money Abroad
          </h1>

          {/* Transaction History Button - Right Aligned */}
          <button 
            type="button" 
            onClick={() => toast.success('Opening Transaction History')}
            className="border-2 border-[#681d82] text-[#681d82] text-[13px] font-semibold py-2.5 px-8 rounded-full hover:bg-purple-50 transition-all cursor-pointer bg-transparent"
          >
            Transaction History
          </button>
        </div>

        {/* White Main Card Container */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 min-h-[320px] w-full">
          <h2 className="text-[18px] font-bold text-slate-900 mb-5">
            Added Payees
          </h2>

          {/* Search Box */}
          <div className="max-w-[320px] w-full border border-slate-300 rounded-lg py-2.5 px-4 flex items-center bg-white">
            <Search size={16} className="text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search here..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-[13px] w-full text-slate-800 placeholder-slate-400" 
            />
          </div>
        </div>

        {/* Bottom Actions Row - Right Aligned */}
        <div className="flex justify-end items-center gap-4 mt-6">
          <button 
            type="button" 
            onClick={() => router.push('/home/landingPage/fund-transfer/scheduled-transactions')}
            className="border-2 border-[#681d82] text-[#681d82] text-[13px] font-semibold py-2.5 px-6 rounded-full hover:bg-purple-50 transition-all cursor-pointer bg-transparent"
          >
            My Scheduled Payments
          </button>

          <button 
            type="button" 
            onClick={() => toast.success('Opening Add Payee form')}
            className="bg-[#681d82] hover:bg-[#57166f] text-white text-[13px] font-semibold py-2.5 px-6 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} className="text-white" />
            <span>Add Payee</span>
          </button>
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
