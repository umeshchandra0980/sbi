'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronRight, 
  Home,
  CreditCard as CardIcon,
  Lock,
  Ban,
  RefreshCw,
  Sliders,
  FileCheck,
  Plus
} from 'lucide-react';

export default function CREDITCardLandingPage() {
  const router = useRouter();

  // Security Toggle State
  const [tempBlock, setTempBlock] = useState(false);

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
          <span className="text-slate-600">Manage Credit Card</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Manage Credit Card
        </h1>

        {/* Main Grid Layout (2 Columns: Card Info Left, Security & Manage Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          
          {/* Left Column: Account & CREDIT Card Graphic (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 border border-purple-100/70 shadow-sm flex flex-col justify-between min-h-[460px]">
            
            <div>
              {/* Card Number Header */}
              <h2 className="text-sm font-extrabold text-[#222222] mb-6">
                Card Number <span className="font-extrabold text-slate-900 tracking-wider">XXXX-XXXX-XXXX-6729</span>
              </h2>

              {/* SBI Credit Card Graphic */}
              <div className="w-full max-w-[340px] mx-auto flex items-center justify-center filter drop-shadow-xl mb-4">
                <img 
                  src="https://www.sbicard.com/static-resources/img/card/card-face-assets/for-website/front/horizontal/elite-sbi-card.png" 
                  alt="SBI Elite Credit Card" 
                  className="w-full h-auto object-contain rounded-2xl" 
                />
              </div>
            </div>

            {/* Request New Card + Link */}
            <div>
              <button
                type="button"
                onClick={() => toast.success("Opening Request New Credit Card form...")}
                className="text-[#5b2e80] font-extrabold text-sm hover:underline cursor-pointer mt-6 inline-flex items-center gap-1"
              >
                <span>Request New Card</span>
                <Plus size={16} />
              </button>
            </div>

          </div>

          {/* Right Column: Security & Manage Panels (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Card 1: Security Box */}
            <div className="bg-white rounded-2xl p-6 md:p-7 border border-purple-100/70 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#5b2e80] mb-5">
                Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Temporary Block */}
                <div className="bg-[#f8f6fb] rounded-2xl p-4 border border-purple-100/70 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-[#5b2e80] flex items-center justify-center flex-shrink-0">
                      <CardIcon size={20} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 leading-tight">
                      Temporary<br />Block
                    </span>
                  </div>
                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => {
                      setTempBlock(!tempBlock);
                      toast.success(tempBlock ? "Credit Card Unblocked" : "Credit Card Temporarily Blocked");
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      tempBlock ? 'bg-[#5b2e80]' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      tempBlock ? 'translate-x-5' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* 2. Permanent Block */}
                <div 
                  onClick={() => toast.success("Opening Permanent Block confirmation...")}
                  className="bg-[#f8f6fb] rounded-2xl p-4 border border-purple-100/70 flex items-center justify-between cursor-pointer hover:bg-purple-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-[#5b2e80] flex items-center justify-center flex-shrink-0">
                      <Ban size={20} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 leading-tight">
                      Permanent<br />Block
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

                {/* 3. Set / Reset Pin (Full Width in row 2) */}
                <div 
                  onClick={() => toast.success("Opening Set/Reset ATM PIN modal...")}
                  className="bg-[#f8f6fb] rounded-2xl p-4 border border-purple-100/70 flex items-center justify-between cursor-pointer hover:bg-purple-50/50 transition-colors md:col-span-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-[#5b2e80] flex items-center justify-center flex-shrink-0">
                      <RefreshCw size={20} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">
                      Set / Reset Pin
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

              </div>
            </div>

            {/* Card 2: Manage Box */}
            <div className="bg-white rounded-2xl p-6 md:p-7 border border-purple-100/70 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#5b2e80] mb-5">
                Manage
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Transaction Limits */}
                <div 
                  onClick={() => toast.success("Opening Transaction Limits settings...")}
                  className="bg-[#f8f6fb] rounded-2xl p-4 border border-purple-100/70 flex items-center justify-between cursor-pointer hover:bg-purple-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-[#5b2e80] flex items-center justify-center flex-shrink-0">
                      <Sliders size={20} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800 leading-tight">
                      Transaction<br />Limits
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

                {/* 2. Mandates */}
                <div 
                  onClick={() => toast.success("Opening e-Mandates overview...")}
                  className="bg-[#f8f6fb] rounded-2xl p-4 border border-purple-100/70 flex items-center justify-between cursor-pointer hover:bg-purple-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-[#5b2e80] flex items-center justify-center flex-shrink-0">
                      <FileCheck size={20} />
                    </div>
                    <span className="text-xs font-extrabold text-slate-800">
                      Mandates
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

              </div>
            </div>

          </div>

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
