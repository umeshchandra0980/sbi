'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight } from 'lucide-react';

export default function BalanceCertificatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'get' | 'past'>('get');

  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }); // e.g. 05/08/2026

  return (
    <div className="min-h-screen bg-[#f4f0f8] text-slate-800 flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600 mb-4">
          <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
            <Home size={14} className="text-[#673391]" />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/services/tax-related" className="hover:text-[#673391] text-slate-600 font-medium">
            Tax Related
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#673391] font-bold">Balance Certificate</span>
        </div>

        {/* Page Title */}
        <h1 className="text-[18px] font-bold text-[#673391] mb-6 tracking-tight">
          Balance Certificate
        </h1>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 min-h-[460px] flex flex-col justify-between">
          <div>
            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-slate-200 mb-6 pb-1">
              <button
                type="button"
                onClick={() => setActiveTab('get')}
                className={`pb-3 font-semibold text-[18px] cursor-pointer transition-colors ${
                  activeTab === 'get'
                    ? 'border-b-2 border-[#673391] text-[#673391]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Get Certificate
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('past')}
                className={`pb-3 font-semibold text-[18px] cursor-pointer transition-colors ${
                  activeTab === 'past'
                    ? 'border-b-2 border-[#673391] text-[#673391]'
                    : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Past Certificates
              </button>
            </div>

            {/* TAB 1: GET CERTIFICATE (Image 1) */}
            {activeTab === 'get' && (
              <div>
                <p className="text-[14px] font-medium text-slate-600 mb-4">
                  Get balance certificate as on
                </p>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Radio Option Card */}
                  <div className="md:col-span-4 bg-[#f4edf9]/70 border-2 border-[#673391] rounded-2xl p-4 flex items-start gap-3 cursor-pointer shadow-2xs">
                    <div className="w-5 h-5 rounded-full border-2 border-[#673391] flex items-center justify-center mt-0.5 flex-shrink-0 bg-white">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#673391]" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-slate-800">
                        {todayDate}
                      </div>
                      <div className="text-xs font-medium text-slate-500">
                        Current Date
                      </div>
                    </div>
                  </div>

                  {/* Right Preview Card */}
                  <div className="md:col-span-8 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[250px] bg-slate-50/40">
                    <div className="relative mb-3">
                      {/* Document & Folder Illustration */}
                      <svg className="w-24 h-24 text-[#673391]" viewBox="0 0 100 100" fill="none">
                        <rect x="25" y="15" width="50" height="65" rx="6" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
                        <line x1="33" y1="28" x2="60" y2="28" stroke="#a21caf" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="33" y1="36" x2="67" y2="36" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
                        <line x1="33" y1="44" x2="52" y2="44" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
                        
                        {/* Purple Folder Accent */}
                        <path d="M15 45 C15 40, 20 38, 25 38 H40 L48 45 H85 C90 45, 92 48, 92 53 V82 C92 87, 88 90, 83 90 H20 C15 90, 15 85, 15 80 Z" fill="#e9d5ff" opacity="0.9" />
                        <path d="M18 50 H87 C91 50, 93 52, 92 57 L87 83 C86 87, 83 90, 78 90 H23 C18 90, 16 87, 17 83 L21 57 C22 52, 24 50, 28 50 Z" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="text-sm font-bold text-[#673391]">
                      Balance Certificate
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {todayDate}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 2: PAST CERTIFICATES (Image 2) */}
            {activeTab === 'past' && (
              <div className="flex flex-col items-center justify-center py-12">
                {/* Empty State Folder Icon */}
                <div className="relative mb-4">
                  <svg className="w-28 h-28" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="50" r="35" fill="#fae8ff" />
                    <path d="M25 55 H85 V90 C85 95, 80 100, 75 100 H35 C30 100, 25 95, 25 90 Z" fill="#c084fc" opacity="0.7" />
                    <path d="M30 45 H75 C80 45, 83 48, 82 53 L78 88 H32 L28 53 C27 48, 30 45, 35 45 Z" fill="#ffffff" stroke="#a21caf" strokeWidth="2" />
                    <circle cx="60" cy="70" r="10" fill="#dc2626" />
                    <path d="M55 65 L65 75 M65 65 L55 75" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                
                <h3 className="text-base md:text-lg font-bold text-[#673391]">
                  No Record Available
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {todayDate}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action Bar (Image 1) */}
          {activeTab === 'get' && (
            <div className="flex justify-end pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => toast.success('Processing Balance Certificate...')}
                className="bg-[#673391] hover:bg-[#561578] text-white font-extrabold text-sm py-3 px-12 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Proceed
              </button>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
