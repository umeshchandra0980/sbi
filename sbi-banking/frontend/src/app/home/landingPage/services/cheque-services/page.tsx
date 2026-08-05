'use client';

import React from 'react';
import Link from 'next/link';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight } from 'lucide-react';

export default function ChequeServicesPage() {
  const chequeOptions = [
    {
      id: 'requestDispatch',
      title: 'Request Cheque Book / Dispatch Status',
      href: '/home/landingPage/services/cheque-services/request-dispatch',
    },
    {
      id: 'enquireStopRevoke',
      title: 'Enquire / Stop Cheque / Revoke Stop Cheque',
      href: '/home/landingPage/services/cheque-services/enquire-stop-revoke',
    },
    {
      id: 'positivePay',
      title: 'Positive Pay System',
      href: '/home/landingPage/services/cheque-services/positive-pay',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col">
      {/* Header */}
      <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
          <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
            <Home size={14} className="text-[#673391]" />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="hover:text-[#673391] text-slate-600 cursor-pointer">Services</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#673391] font-bold">Cheque Services</span>
        </div>

        {/* Page Heading */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#673391] mb-6 tracking-tight">
          Cheque Services
        </h1>

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 min-h-[300px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chequeOptions.map((opt) => (
              <Link
                key={opt.id}
                href={opt.href}
                className="bg-[#f8f6fb] hover:bg-[#f4edf9] border border-slate-200/80 hover:border-[#673391] rounded-2xl flex items-center justify-between p-4 transition-all duration-150 hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-purple-100/80 flex items-center justify-center text-[#673391] shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                    <svg className="w-6 h-6 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <line x1="6" y1="10" x2="14" y2="10" />
                      <line x1="6" y1="14" x2="10" y2="14" />
                      <circle cx="17" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-slate-800 group-hover:text-[#673391] transition-colors leading-snug">
                    {opt.title}
                  </span>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#673391] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
