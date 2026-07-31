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
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 min-h-[460px] space-y-8">
          
          {/* Top Header Row with Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
            
            <h2 className="text-base font-extrabold text-[#673391]">
              Select Payee
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              
              {/* Transaction History link text */}
              <button 
                type="button" 
                onClick={() => toast.success('Opening Transaction History')}
                className="text-xs font-bold text-[#673391] hover:underline flex items-center gap-1 mr-2"
              >
                <History size={14} />
                <span>Transaction History</span>
              </button>

              {/* + Add Payee purple solid pill button */}
              <button
                type="button"
                onClick={() => toast.success('Opening Add Payee form')}
                className="bg-[#673391] text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-[#561578] transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>Add Payee</span>
              </button>

              {/* + Manage Payee purple solid pill button */}
              <button
                type="button"
                onClick={() => toast.success('Opening Manage Payee list')}
                className="bg-[#673391] text-white text-xs font-bold py-2 px-5 rounded-full hover:bg-[#561578] transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>Manage Payee</span>
              </button>

            </div>

          </div>

          {/* Subsection 1: Recently Paid */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-800 tracking-wide">
              Recently Paid
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recentlyPaidPayees.map((payee) => (
                <div
                  key={payee.id}
                  onClick={() => {
                    setSelectedPayee(payee.name);
                    toast.success(`Selected ${payee.name} for fund transfer`);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedPayee === payee.name
                      ? 'border-[#673391] bg-purple-50/70 shadow-xs'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{payee.name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{payee.bank} • {payee.accNo}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-[#673391] flex items-center justify-center text-xs font-bold">
                      {payee.name[0]}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 mt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 text-[10px]">Last: {payee.date}</span>
                    <span className="font-bold text-[#673391]">{payee.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subsection 2: Transfer to Other Payees */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            
            <h3 className="text-xs font-extrabold text-slate-800 tracking-wide">
              Transfer to Other Payees
            </h3>

            {/* Search Input Box */}
            <div className="relative max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-[#673391] bg-slate-50/50"
              />
            </div>

            {/* Other Payees Table / List */}
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
              {filteredOtherPayees.map((payee) => (
                <div
                  key={payee.id}
                  onClick={() => {
                    setSelectedPayee(payee.name);
                    toast.success(`Selected ${payee.name} for transfer`);
                  }}
                  className={`p-3.5 flex items-center justify-between transition-colors cursor-pointer text-xs ${
                    selectedPayee === payee.name ? 'bg-purple-50/80 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-purple-200 bg-white text-[#673391] flex items-center justify-center font-bold text-xs">
                      {payee.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{payee.name}</div>
                      <div className="text-[11px] text-slate-500">{payee.bank} ({payee.ifsc})</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-600">{payee.accNo}</span>
                    <button
                      type="button"
                      className="py-1 px-3 text-[11px] font-bold rounded-full bg-[#673391] text-white hover:bg-[#561578] transition-colors"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#240b36] text-white/70 py-3 text-xs border-t border-purple-900 mt-auto">
        <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
          <div>© State Bank of India (APM Id:Serv_Tran_564)</div>
          <div>Site best viewed at 1280 × 720 resolution</div>
        </div>
      </footer>

    </div>
  );
}
