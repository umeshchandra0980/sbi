'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Search,
  ChevronLeft,
  HelpCircle,
  ChevronDown,
  UserPlus,
  Settings,
  History,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import './send-money.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function SendMoneySelectPayeePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayee, setSelectedPayee] = useState<string | null>(null);

  const recentlyPaidPayees = [
    { id: '1', name: 'Ramesh Kumar', bank: 'SBI', accNo: 'XXXXXX4892', amount: '₹5,000', date: '28 Jul' },
    { id: '2', name: 'Priya Sharma', bank: 'HDFC Bank', accNo: 'XXXXXX1024', amount: '₹12,500', date: '25 Jul' },
    { id: '3', name: 'Tech Solutions Pvt Ltd', bank: 'ICICI Bank', accNo: 'XXXXXX8821', amount: '₹24,000', date: '20 Jul' },
  ];

  const otherPayees = [
    { id: '4', name: 'Anil Verma', bank: 'Axis Bank', accNo: 'XXXXXX9912', ifsc: 'UTIB0000104' },
    { id: '5', name: 'Sunita Reddy', bank: 'Kotak Bank', accNo: 'XXXXXX3311', ifsc: 'KKBK0000451' },
    { id: '6', name: 'Vijay Enterprises', bank: 'Bank of Baroda', accNo: 'XXXXXX7789', ifsc: 'BARB0MAIN' },
  ];

  const filteredOtherPayees = otherPayees.filter(
    (p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.accNo.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#f3f4f9] flex flex-col font-sans">
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeNav="Payments" />

      {/* ================= PAGE CONTAINER ================= */}
      <main className="max-w-[1400px] w-full mx-auto p-6 space-y-6 flex-1">
        
        {/* Back Link */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-1 text-xs font-bold text-[#673391] hover:underline"
        >
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-2xl font-extrabold text-[#673391] tracking-tight">
          Send Money
        </h1>

        {/* Horizontal Progress Bar Steps (Matching Screenshot 2 & 3) */}
        <div className="grid grid-cols-5 gap-2 border-b border-slate-200 pb-2">
          
          {/* Step 1 */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#673391]">Select Payee</div>
            <div className="h-1 bg-[#673391] rounded-full"></div>
          </div>

          {/* Step 2 */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400">Transaction details</div>
            <div className="h-1 bg-slate-200 rounded-full"></div>
          </div>

          {/* Step 3 */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400">Review</div>
            <div className="h-1 bg-slate-200 rounded-full"></div>
          </div>

          {/* Step 4 */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400">Authentication</div>
            <div className="h-1 bg-slate-200 rounded-full"></div>
          </div>

          {/* Step 5 */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-400">Receipt</div>
            <div className="h-1 bg-slate-200 rounded-full"></div>
          </div>

        </div>

        {/* Main Content White Card (Matching Screenshot 2 & 3) */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-slate-200/80 min-h-[420px] flex flex-col justify-between">
          
          {/* Main Select Payee Area with Actions Side-by-Side */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
            
            {/* Left Side: Select Payee title, sub-headings and search */}
            <div className="flex-1 flex flex-col items-start max-w-md">
              <h2 className="text-[26px] font-bold text-[#681d82] tracking-tight mb-7 font-sans">
                Select Payee
              </h2>
              
              <div className="space-y-6 w-full">
                <div className="text-[14.5px] font-bold text-slate-800 font-sans tracking-wide">
                  Recently Paid
                </div>
                
                <div className="space-y-4 w-full">
                  <div className="text-[14.5px] font-bold text-slate-800 font-sans tracking-wide">
                    Transfer to Other Payees
                  </div>
                  
                  {/* Search input with bottom border line */}
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
                </div>
              </div>
            </div>

            {/* Right Side: Action Buttons inline */}
            <div className="flex items-center gap-4 shrink-0 select-none">
              <button 
                type="button" 
                onClick={() => toast.success('Opening Transaction History')}
                className="text-xs font-bold text-[#681d82] hover:underline cursor-pointer bg-transparent border-none font-sans"
              >
                Transaction History
              </button>

              <button
                type="button"
                onClick={() => toast.success('Opening Add Payee form')}
                className="bg-[#681d82] hover:bg-[#57166f] text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all shadow-xs flex items-center justify-center cursor-pointer font-sans"
              >
                + Add Payee
              </button>

              <button
                type="button"
                onClick={() => toast.success('Opening Manage Payee list')}
                className="bg-[#681d82] hover:bg-[#57166f] text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all shadow-xs flex items-center justify-center cursor-pointer font-sans"
              >
                + Manage Payee
              </button>
            </div>

          </div>

          {/* Blank space below to match the screenshot layout */}
          <div className="flex-1"></div>

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
