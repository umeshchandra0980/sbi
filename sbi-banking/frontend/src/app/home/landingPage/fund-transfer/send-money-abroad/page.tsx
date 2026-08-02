'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Search, Home } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function SendMoneyAbroadPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f3f4f9] flex flex-col font-sans">
      {/* Sticky Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Payments" />

      {/* Main Content Area */}
      <main className="max-w-[1360px] w-full mx-auto p-8 space-y-6 flex-1 flex flex-col">
        
        {/* Breadcrumb Navigation (Matching Screenshot 4) */}
        <div className="flex items-center gap-2 select-none text-slate-400 text-xs font-medium">
          <Link href="/dashboard" className="hover:text-purple-800 flex items-center">
            <Home size={16} className="text-[#681d82]" />
          </Link>
          <span>&gt;</span>
          <span className="text-[#681d82] font-semibold font-sans">Send Money Abroad</span>
        </div>

        {/* Title and Top-Right Action Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-2">
          <h1 className="text-[26px] font-bold text-[#681d82] tracking-tight font-sans">
            Send Money Abroad
          </h1>

          <button 
            type="button" 
            onClick={() => toast.success('Opening Transaction History')}
            className="border border-[#681d82] text-[#681d82] text-xs font-bold py-2.5 px-6 rounded-full hover:bg-purple-50 transition-all cursor-pointer font-sans shrink-0"
          >
            Transaction History
          </button>
        </div>

        {/* White Main Card Container */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-slate-200/80 min-h-[380px] w-full flex flex-col justify-start">
          <h2 className="text-[22px] font-bold text-slate-900 font-sans tracking-wide">
            Added Payees
          </h2>

          {/* Search Box in Card (Rectangular with rounded corners) */}
          <div className="max-w-[360px] w-full border border-slate-300 rounded-lg py-2 px-3.5 flex items-center bg-white mt-4 shadow-xs select-none">
            <Search size={16} className="text-slate-400 mr-2.5 shrink-0" />
            <input 
              type="text" 
              placeholder="Search here..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full text-slate-800 placeholder-slate-400 font-sans" 
            />
          </div>
        </div>

        {/* Bottom Actions Row (Aligned to Right below Card) */}
        <div className="flex justify-end items-center gap-4 py-4 mt-auto select-none">
          <button 
            type="button" 
            onClick={() => router.push('/home/landingPage/fund-transfer/scheduled-transactions')}
            className="border border-[#681d82] text-[#681d82] text-xs font-bold py-2.5 px-6 rounded-full hover:bg-purple-50 transition-all cursor-pointer font-sans"
          >
            My Scheduled Payments
          </button>

          <button 
            type="button" 
            onClick={() => toast.success('Opening Add Payee form')}
            className="bg-[#681d82] hover:bg-[#57166f] text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all shadow-xs cursor-pointer font-sans"
          >
            + Add Payee
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#2c2c2c] text-white/90 text-xs py-3.5 px-8 flex justify-center items-center mt-auto shrink-0 select-none font-sans">
        <div className="flex justify-center items-center gap-4">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
