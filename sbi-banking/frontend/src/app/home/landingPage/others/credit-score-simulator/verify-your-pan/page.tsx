'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, X } from 'lucide-react';

export default function CreditScorePage() {
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(true);

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative">
      
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
          <span className="text-slate-500 font-normal">Credit Score</span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#5b2e80] mb-6">
          Credit Score
        </h1>

        {/* Outer Background Card */}
        <div className="bg-white rounded-2xl border border-purple-100/70 p-10 min-h-[460px] relative shadow-2xs">
        </div>

      </main>

      {/* TECHNICAL ERROR MODAL (Matching Screenshot 2 Exactly) */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-[560px] w-full shadow-2xl overflow-hidden border border-purple-100 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 pt-7 pb-2">
              <h3 className="text-xl font-extrabold text-[#5b2e80]">
                Technical Error
              </h3>
            </div>

            {/* Modal Content */}
            <div className="px-8 py-6 flex items-center justify-between gap-6 border-b border-slate-100 pb-8">
              
              {/* Warning Graphic */}
              <div className="w-40 h-28 relative shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M20 150 C60 120 110 135 160 150 Z" fill="#f5edfc" />
                  <path d="M100 150 C150 110 190 130 230 150 Z" fill="#eee3fa" />
                  <line x1="10" y1="150" x2="230" y2="150" stroke="#d8c5f2" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="120" y1="50" x2="120" y2="150" stroke="#702082" strokeWidth="3" strokeLinecap="round" />
                  <path d="M120 10 L155 65 L85 65 Z" fill="#ffffff" stroke="#702082" strokeWidth="5" strokeLinejoin="round" />
                  <path d="M120 27 L120 45" stroke="#702082" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="120" cy="54" r="2.5" fill="#702082" />
                </svg>
              </div>

              {/* Error Message */}
              <div className="flex-1 text-left">
                <p className="text-xs md:text-sm font-extrabold text-slate-700 leading-snug">
                  Please update Email in your account to avail this facility <span className="text-[10px] font-normal text-slate-400">(BS000001)</span>
                </p>
              </div>

            </div>

            {/* Modal Footer Button */}
            <div className="px-8 py-5 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  router.push('/settings');
                }}
                className="bg-[#5b2e80] hover:bg-[#4b1774] text-white font-extrabold py-3 px-8 rounded-full shadow-md transition-all text-xs cursor-pointer"
              >
                Update Email
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Floating Bottom Up Next Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-purple-100 py-3 px-8 z-40 flex items-center justify-end gap-4 shadow-lg">
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">up next</span>
          <span className="text-xs font-extrabold text-[#5b2e80]">Credit Score</span>
        </div>
        <button
          type="button"
          disabled
          className="bg-slate-100 text-slate-400 font-extrabold text-xs py-2.5 px-7 rounded-full cursor-not-allowed border border-slate-200"
        >
          Proceed &rarr;
        </button>
      </div>

    </div>
  );
}
