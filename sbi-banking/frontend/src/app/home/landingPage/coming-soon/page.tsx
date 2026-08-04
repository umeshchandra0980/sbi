'use client';

import React from 'react';
import Link from 'next/link';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ComingSoonPage() {
  const searchParams = useSearchParams();
  const insuranceType = searchParams.get('insuranceType');

  return (
    <div className="min-h-screen bg-[#faf8fd] font-sans text-slate-800 flex flex-col relative">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav={insuranceType ? 'Insurance' : 'Insurance'} activeTopTab="Banking" />

      {/* Main Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-6 py-6">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/dashboard" className="text-xs md:text-sm font-bold text-[#673391] hover:underline flex items-center gap-1.5 w-fit">
            <ChevronLeft size={16} strokeWidth={2.5} className="text-[#673391]" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* Coming Soon Center Content View (Exact Match to User Reference Screenshot) */}
        <div className="flex flex-col items-center justify-center text-center py-12">
          
          {/* Smartphone & Hourglass Illustration */}
          <div className="w-80 h-56 relative mb-6 flex items-center justify-center">
            <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Background Cloud Waves */}
              <ellipse cx="65" cy="160" rx="45" ry="22" fill="#ede9fe" opacity="0.8" />
              <ellipse cx="215" cy="160" rx="45" ry="22" fill="#ede9fe" opacity="0.8" />
              <ellipse cx="140" cy="170" rx="110" ry="24" fill="#f3e8ff" />

              {/* Hourglass in Pink Tones */}
              <path d="M175 60 L140 105 L175 155 Z" fill="#fbcfe8" opacity="0.55" />
              <path d="M135 60 L170 105 L135 155 Z" fill="#fbcfe8" opacity="0.55" />
              <path d="M140 105 L170 60 H140 Z" fill="#f472b6" opacity="0.45" />
              <rect x="130" y="55" width="48" height="6" rx="3" fill="#f472b6" />
              <rect x="130" y="154" width="48" height="6" rx="3" fill="#f472b6" />

              {/* Central Smartphone Frame */}
              <rect x="105" y="45" width="66" height="115" rx="12" fill="#ffffff" stroke="#673391" strokeWidth="3.5" />
              <rect x="125" y="52" width="26" height="3" rx="1.5" fill="#673391" />

              {/* Pink Progress Loading Bar inside Phone */}
              <rect x="115" y="85" width="46" height="8" rx="4" fill="#fbcfe8" />
              <rect x="115" y="85" width="28" height="8" rx="4" fill="#db2777" />
              
              {/* Loading Dots */}
              <circle cx="127" cy="100" r="2" fill="#db2777" />
              <circle cx="138" cy="100" r="2" fill="#db2777" />
              <circle cx="149" cy="100" r="2" fill="#db2777" />

              {/* Curved Dotted Arrows */}
              <path d="M68 115 C55 80, 85 55, 100 50" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <path d="M96 48 L103 52 L99 57" fill="#a855f7" />

              <path d="M185 85 C200 115, 175 145, 155 150" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
              <path d="M157 154 L152 147 L160 146" fill="#a855f7" />

              {/* Decorative Cross Sparkles */}
              <path d="M58 70 V76 M55 73 H61" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              <path d="M222 100 V106 M219 103 H225" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>

          <h2 className="text-2xl md:text-[28px] font-bold text-[#673391] mb-2 tracking-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Coming Soon
          </h2>

          <p className="text-sm md:text-base font-normal text-slate-700">
            We are preparing to help you access this Service shortly
          </p>

        </div>

      </main>

      {/* Footer Links Bar */}
      <footer className="bg-[#333333] text-white text-xs py-3.5 px-6 text-center mt-auto">
        <div className="flex items-center justify-center gap-4 text-white/90">
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
