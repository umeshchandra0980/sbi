'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, X } from 'lucide-react';

export default function RequestDispatchPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    router.push('/dashboard');
  };

  const handleProceed = () => {
    setShowModal(false);
    toast.success('Converting account to Cheque Book type...');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] text-slate-800 flex flex-col relative" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

      {/* Main Page Background (Matching Image 2) */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600 mb-4">
          <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
            <Home size={14} className="text-[#673391]" />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/services/cheque-services" className="hover:text-[#673391] text-slate-600 font-medium">
            Cheque Services
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#673391] font-bold">Request Cheque Book / Dispatch Status</span>
        </div>

        {/* Page Heading */}
        <h1 className="text-[16px] font-extrabold text-[#673391] mb-6 tracking-tight">
          Request Cheque Book / Dispatch Status
        </h1>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 min-h-[400px]" />
      </main>

      {/* Account type is Non-Cheque Book type Modal (Exact Match to Image 2) */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150"
          onClick={handleClose}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close Button */}
            <button 
              type="button" 
              onClick={handleClose}
              className="absolute right-6 top-6 text-[#673391] hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Modal Title */}
            <h2 className="text-[18px] font-semibold text-[#673391] mb-6 tracking-tight">
              Account type is Non-Cheque Book type
            </h2>

            {/* Modal Body */}
            <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
              
              {/* Left Bank Building & Cheque Illustration */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <svg className="w-40 h-32" viewBox="0 0 160 120" fill="none">
                  {/* Bank Building */}
                  <rect x="25" y="45" width="50" height="40" fill="#fae8ff" rx="4" />
                  <path d="M20 45 L50 25 L80 45 Z" fill="#d8b4fe" />
                  <circle cx="50" cy="37" r="4" fill="#ffffff" />
                  <line x1="33" y1="48" x2="33" y2="80" stroke="#c084fc" strokeWidth="3" />
                  <line x1="44" y1="48" x2="44" y2="80" stroke="#c084fc" strokeWidth="3" />
                  <line x1="56" y1="48" x2="56" y2="80" stroke="#c084fc" strokeWidth="3" />
                  <line x1="67" y1="48" x2="67" y2="80" stroke="#c084fc" strokeWidth="3" />
                  
                  {/* Cheque Book Front */}
                  <rect x="55" y="60" width="75" height="40" rx="4" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
                  <line x1="62" y1="70" x2="100" y2="70" stroke="#e9d5ff" strokeWidth="2" />
                  <line x1="62" y1="80" x2="85" y2="80" stroke="#e9d5ff" strokeWidth="2" />
                  <circle cx="115" cy="85" r="4" fill="#673391" opacity="0.6" />

                  {/* Plus Badge */}
                  <circle cx="60" cy="55" r="10" fill="#dc2626" />
                  <path d="M60 49 V61 M54 55 H66" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Message Text */}
              <div className="flex-1 text-[14px] font-normal text-slate-700 leading-relaxed text-center sm:text-left">
                Dear Customer, selected Account type is Non-Cheque Book type. To convert account in Cheque Book type, please click on Proceed or to navigate back click on Cancel.
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                className="bg-white border border-[#673391] hover:bg-purple-50 text-[#673391] font-semibold text-[14px] py-2.5 px-10 rounded-full transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProceed}
                className="bg-[#673391] hover:bg-[#561578] text-white font-semibold text-[14px] py-2.5 px-10 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Proceed
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
