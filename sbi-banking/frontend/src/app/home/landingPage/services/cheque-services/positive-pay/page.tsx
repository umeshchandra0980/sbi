'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight } from 'lucide-react';

export default function PositivePayPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f4f0f8] text-slate-800 flex flex-col justify-between" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div>
        {/* Header */}
        <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

        {/* Main Container */}
        <main className="max-w-[1280px] w-full mx-auto px-4 py-6 pb-24">
          
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
            <span className="text-[#673391] font-bold">Positive Pay System</span>
          </div>

          {/* Page Heading */}
          <h1 className="text-[18px] font-bold text-[#673391] mb-6 tracking-tight">
            Positive Pay System
          </h1>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xs border border-slate-100 min-h-[420px] flex flex-col justify-between">
            
            {/* Top Notice Paragraph */}
            <p className="text-[14px] font-normal text-slate-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
              As per RBI directives, Positive Pay System (PPS) for cheque payments is a fraud prevention measure to protect customers against forged / altered cheques. Under PPS, the account holder has to share the details of the cheque to the bank which would be cross-checked with the presented cheque at the time of payment processing.
            </p>

            {/* Center Warning Signpost & Message */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-8">
              
              {/* SBI Desert Warning Triangle Signpost Graphic */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <svg className="w-48 h-36" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Desert ground dunes */}
                  <path d="M10 130 C40 120, 70 140, 100 130 C130 120, 160 140, 190 130 L190 140 L10 140 Z" fill="#f5e6fa" />
                  <path d="M30 135 C60 125, 90 140, 120 132 C150 125, 170 138, 195 135" stroke="#e9cbf7" strokeWidth="2" strokeLinecap="round" />
                  
                  {/* Cactus graphics */}
                  <path d="M70 130 V105 C70 102 65 102 65 105 V115 M70 112 H65" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M70 130 V95 C70 92 75 92 75 95 V108 M70 102 H75" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
                  
                  {/* Stones */}
                  <ellipse cx="85" cy="132" rx="5" ry="2.5" fill="#d8b4fe" />
                  <ellipse cx="94" cy="133" rx="4" ry="2" fill="#c084fc" />
                  <ellipse cx="104" cy="134" rx="6" ry="2.5" fill="#d8b4fe" />
                  
                  {/* Signpost Pole */}
                  <line x1="100" y1="35" x2="100" y2="132" stroke="#a21caf" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* Triangle Warning Board */}
                  <path d="M100 25 L135 90 H65 L100 25 Z" stroke="#a21caf" strokeWidth="4" strokeLinejoin="round" fill="none" />
                  <line x1="100" y1="48" x2="100" y2="70" stroke="#a21caf" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="100" cy="80" r="2.5" fill="#a21caf" />
                </svg>
              </div>

              {/* Text Message */}
              <div className="text-[18px] font-semibold text-slate-800 tracking-tight text-center sm:text-left">
                No account available
              </div>

            </div>

            <div />
          </div>

        </main>
      </div>

      {/* Bottom Action Sticky Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-200/80 shadow-[0_-8px_20px_rgba(0,0,0,0.04)] py-4 px-6 md:px-12 z-40 animate-in slide-in-from-bottom duration-200">
        <div className="max-w-[1280px] w-full mx-auto flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-[#673391] hover:bg-[#561578] text-white font-extrabold text-xs md:text-sm py-3 px-10 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
