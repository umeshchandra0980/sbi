'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronRight, 
  Home, 
  Sparkles, 
  Sliders, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  X 
} from 'lucide-react';

export default function EtbOdadFeaturesPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Loans" activeTopTab="Banking" />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-7">
        
        {/* Breadcrumb Navigation (Matching Screenshot 3) */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-500 font-normal">OD against Deposit</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Overdraft Against Deposit
        </h1>

        {/* Salient Features Box (Matching Screenshot 2) */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100/70 p-8 md:p-12 mb-9 min-h-[460px] flex items-center">
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Salient Features List (7 Cols) */}
            <div className="lg:col-span-7 pr-0 lg:pr-8 lg:border-r border-purple-100/70">
              <h2 className="text-xl font-extrabold text-[#5b2e80] mb-8">
                Salient features of overdraft against deposit
              </h2>

              <div className="space-y-6">
                
                {/* Feature 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Sparkles size={20} />
                  </div>
                  <span className="text-base font-extrabold text-slate-800">
                    Completely paperless
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Sliders size={20} />
                  </div>
                  <span className="text-base font-extrabold text-slate-800">
                    Attractive interest rates
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Clock size={20} />
                  </div>
                  <span className="text-base font-extrabold text-slate-800">
                    Get an OD in just 5 clicks
                  </span>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-base font-extrabold text-slate-800">
                    Zero processing fees
                  </span>
                </div>

              </div>
            </div>

            {/* Right Illustration & Action Button (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center pl-0 lg:pl-6">
              
              {/* Graphic Illustration Placeholder */}
              <div className="w-full max-w-[300px] h-[200px] bg-[#f8f4fc] rounded-2xl p-6 mb-8 flex flex-col items-center justify-center relative border border-purple-100/60 shadow-2xs">
                <div className="w-20 h-24 bg-white rounded-[20px] border-4 border-[#5b2e80] shadow-md flex items-center justify-center mb-2">
                  <span className="text-2xl font-black text-[#5b2e80]">₹</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span>FD / RD Overdraft</span>
                </div>
              </div>

              {/* Action Button: Avail OD against deposit */}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full max-w-[340px] bg-[#5b2e80] hover:bg-[#4b1774] text-white font-extrabold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Avail OD against deposit</span>
              </button>

            </div>

          </div>

        </div>

      </main>

      {/* NO ELIGIBLE DEPOSITS MODAL (Matching Screenshot 3 Exactly) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-[540px] w-full shadow-2xl overflow-hidden border border-purple-100 animate-in fade-in zoom-in duration-200">
            
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-2">
              <h3 className="text-xl font-extrabold text-[#5b2e80]">
                Sorry!
              </h3>
              <button 
                type="button" 
                onClick={() => setShowModal(false)} 
                className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Graphic & Message */}
            <div className="px-7 py-6 flex flex-col items-center text-center">
              
              {/* Triangle Pole Warning Graphic */}
              <div className="w-48 h-36 relative mb-6 flex items-center justify-center">
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
              <p className="text-xs md:text-sm font-extrabold text-slate-700 leading-relaxed max-w-[380px] mb-6">
                You do not have any eligible deposits to avail yourself of an overdraft.
              </p>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full max-w-[280px] bg-[#5b2e80] hover:bg-[#4b1774] text-white font-extrabold py-3.5 px-6 rounded-full shadow-md transition-all text-xs cursor-pointer"
              >
                Back
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Footer Links Bar */}
      <footer className="bg-[#333333] text-white text-xs py-3.5 px-6 text-center mt-auto">
        <div className="flex items-center justify-center gap-4 text-white/90">
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
