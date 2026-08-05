'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, X } from 'lucide-react';

export default function EFileVerifyPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative">
      {/* Header */}
      <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

      {/* Main Page Background (Matching Image 3) */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
          <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
            <Home size={14} className="text-[#673391]" />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#673391] font-bold">Back to Homepage</span>
        </div>

        {/* Page Heading */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#673391] mb-6 tracking-tight">
          E-filing
        </h1>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 min-h-[400px]" />
      </main>

      {/* Centered Modal - PAN & Email ID Required (Exact Match to Image 3) */}
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
            <h2 className="text-xl md:text-2xl font-bold text-[#673391] mb-6 tracking-tight">
              PAN &amp; Email ID Required
            </h2>

            {/* Modal Body with Illustration & Message */}
            <div className="flex flex-col sm:flex-row items-center gap-6 my-4">
              
              {/* Left SBI Desert Warning Graphic */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <svg className="w-36 h-28" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 130 C40 120, 70 140, 100 130 C130 120, 160 140, 190 130 L190 140 L10 140 Z" fill="#f5e6fa" />
                  <path d="M30 135 C60 125, 90 140, 120 132 C150 125, 170 138, 195 135" stroke="#e9cbf7" strokeWidth="2" strokeLinecap="round" />
                  <path d="M70 130 V105 C70 102 65 102 65 105 V115 M70 112 H65" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M70 130 V95 C70 92 75 92 75 95 V108 M70 102 H75" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
                  <ellipse cx="85" cy="132" rx="4" ry="2" fill="#d8b4fe" />
                  <ellipse cx="93" cy="133" rx="3" ry="1.5" fill="#c084fc" />
                  <ellipse cx="102" cy="134" rx="5" ry="2" fill="#d8b4fe" />
                  <path d="M100 35 L135 100 H65 L100 35 Z" stroke="#a21caf" strokeWidth="4" strokeLinejoin="round" fill="none" />
                  <line x1="100" y1="58" x2="100" y2="80" stroke="#a21caf" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="100" cy="91" r="2.5" fill="#a21caf" />
                </svg>
              </div>

              {/* Message Text */}
              <div className="flex-1 text-sm md:text-base font-normal text-slate-700 leading-relaxed text-center sm:text-left">
                PAN &amp; Email ID required to proceed further with Tax Related services.
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleClose}
                className="bg-white border border-[#673391] hover:bg-purple-50 text-[#673391] font-bold text-sm py-2.5 px-10 rounded-full transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="bg-[#673391] hover:bg-[#561578] text-white font-extrabold text-sm py-2.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Update Now
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
