'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Search, ChevronLeft } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function ScheduledTransactionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#f3f4f9] flex flex-col font-sans">
      {/* Sticky Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Payments" />

      {/* Main Content Area */}
      <main className="max-w-[1360px] w-full mx-auto p-8 space-y-6 flex-1">
        
        {/* Back navigation link */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-1 text-xs font-bold text-[#681d82] hover:underline select-none"
        >
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-[26px] font-bold text-[#681d82] tracking-tight font-sans mt-2">
          Scheduled Transactions
        </h1>

        {/* White Main Card Container */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-slate-200/80 min-h-[460px] flex flex-col justify-between">
          
          {/* Header row in the card */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 w-full">
            
            {/* Search Input Box with bottom line */}
            <div className="max-w-[280px] w-full border-b border-slate-300 py-1.5 flex items-center select-none">
              <Search size={16} className="text-slate-400 mr-2.5 shrink-0" />
              <input 
                type="text" 
                placeholder="Search here..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full text-slate-800 placeholder-slate-400 font-sans" 
              />
            </div>

            {/* Schedule New Payment Button */}
            <button 
              type="button" 
              onClick={() => toast.success('Opening schedule payment setup')}
              className="border border-[#681d82] text-[#681d82] text-xs font-bold py-2.5 px-6 rounded-full hover:bg-purple-50 transition-all cursor-pointer font-sans"
            >
              Schedule New Payment
            </button>

          </div>

          {/* Centered 'No Record Found' State */}
          <div className="flex-1 flex flex-col items-center justify-center py-20 select-none">
            <span className="text-[15px] font-semibold text-slate-500 font-sans">
              No Record Found
            </span>
          </div>

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
