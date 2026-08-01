'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronRight, 
  Home,
  Info,
  Smartphone,
  Hourglass
} from 'lucide-react';

export default function ForexCardLandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Cards" activeTopTab="Banking" />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-600">Forex Card</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Forex Card
        </h1>

        {/* Main Upgrade Notice White Container */}
        <div className="bg-white rounded-3xl border border-purple-100/70 shadow-sm p-8 md:p-14 mb-8 flex flex-col items-center justify-center text-center min-h-[440px]">
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-[840px] w-full">
            
            {/* Left Phone & Hourglass Graphic */}
            <div className="relative w-48 h-48 flex items-center justify-center flex-shrink-0">
              
              {/* Dotted Flight Path */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <svg className="w-full h-full text-purple-300" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <path d="M10 50 Q 50 10, 90 50" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M10 50 Q 50 90, 90 50" strokeWidth="2" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* Smartphone Graphic */}
              <div className="w-24 h-40 bg-white rounded-2xl border-4 border-[#5b2e80] shadow-lg p-2 flex flex-col items-center justify-between relative z-10">
                <div className="w-8 h-1 bg-slate-300 rounded-full" />
                
                {/* Progress Loading Bar */}
                <div className="w-full my-auto px-1">
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-purple-200">
                    <div className="w-3/4 h-full bg-gradient-to-r from-pink-500 to-[#5b2e80] rounded-full animate-pulse" />
                  </div>
                  <div className="flex justify-center gap-1 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b2e80]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b2e80]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5b2e80]" />
                  </div>
                </div>

                <div className="w-3 h-3 rounded-full border border-slate-300" />
              </div>

              {/* Hourglass Graphic Next to Phone */}
              <div className="absolute right-0 bottom-4 w-16 h-24 bg-[#f8f4fc] rounded-xl border border-purple-200 shadow-md flex items-center justify-center">
                <Hourglass size={28} className="text-[#5b2e80] animate-spin duration-3000" />
              </div>

            </div>

            {/* Right Message & Notice Box */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-[500px]">
              
              <h2 className="text-xl md:text-2xl font-extrabold text-[#5b2e80] mb-3">
                We're upgrading to serve you better
              </h2>

              <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed mb-6">
                We're enhancing our Foreign Travel Card services to bring you an even better experience! In the meantime, please visit your nearest branch offering Forex services for your assistance.
              </p>

              {/* Branch Locator Inset Box */}
              <div 
                onClick={() => toast.success("Redirecting to SBI Forex Branch Locator...")}
                className="bg-[#f4edf9] text-[#5b2e80] font-bold text-xs md:text-sm p-3.5 px-6 rounded-2xl border border-purple-200/80 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#ebdcf5] transition-colors shadow-2xs w-full"
              >
                <Info size={16} className="text-[#5b2e80]" />
                <span className="underline">Click Here</span>
                <span>to locate your nearest branch!</span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Right Okay Action Button (Matching Screenshot 3) */}
        <div className="flex justify-end mb-12">
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="bg-[#5b2e80] hover:bg-[#4a1c70] text-white font-extrabold py-3.5 px-12 rounded-full shadow-md hover:shadow-lg transition-all text-sm cursor-pointer min-w-[140px]"
          >
            Okay
          </button>
        </div>

      </main>

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
