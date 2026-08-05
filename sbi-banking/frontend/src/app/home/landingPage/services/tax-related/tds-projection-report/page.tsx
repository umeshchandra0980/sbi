'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, Eye, EyeOff, Info, ChevronDown } from 'lucide-react';

export default function TdsProjectionReportPage() {
  const router = useRouter();
  const [showCif, setShowCif] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const yearOptions = [
    { value: '2026-2027', label: 'FY 2026 - 2027' },
    { value: '2025-2026', label: 'FY 2025 - 2026' },
    { value: '2024-2025', label: 'FY 2024 - 2025' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col justify-between">
      <div>
        {/* Header */}
        <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

        {/* Main Container */}
        <main className="max-w-[1280px] w-full mx-auto px-4 py-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
            <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
              <Home size={14} className="text-[#673391]" />
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="hover:text-[#673391] cursor-pointer">Profile</span>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="hover:text-[#673391] cursor-pointer">Access Services</span>
            <ChevronRight size={13} className="text-slate-400" />
            <Link href="/home/landingPage/services/tax-related" className="hover:text-[#673391] text-slate-600 font-medium">
              Tax Related
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#673391] font-bold">Tds Projection Report</span>
          </div>

          {/* Page Heading */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#673391] mb-6 tracking-tight">
            TDS Projection Report
          </h1>

          {/* Two-Column Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Column Card */}
            <div className="md:col-span-4 bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between min-h-[380px]">
              <div>
                {/* CIF Number */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    CIF number
                  </label>
                  <div className="flex items-center gap-2.5 font-extrabold text-sm text-slate-800">
                    <span>{showCif ? '9012345720' : '*******5720'}</span>
                    <button
                      type="button"
                      onClick={() => setShowCif(!showCif)}
                      className="text-[#673391] hover:opacity-80 cursor-pointer"
                      aria-label="Toggle CIF visibility"
                    >
                      {showCif ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Select Financial Year Dropdown */}
                <div className="mb-6 relative">
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    Financial Year
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                      className="w-full bg-white border-b-2 border-slate-300 hover:border-[#673391] py-2.5 pr-8 text-left text-sm font-semibold text-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className={selectedYear ? 'text-slate-800 font-bold' : 'text-slate-400 font-medium'}>
                        {selectedYear ? yearOptions.find(y => y.value === selectedYear)?.label : 'Select Financial Year'}
                      </span>
                      <ChevronDown size={16} className={`text-slate-500 transition-transform ${isYearDropdownOpen ? 'rotate-180 text-[#673391]' : ''}`} />
                    </button>

                    {isYearDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-purple-100 rounded-2xl shadow-xl z-30 overflow-hidden animate-in fade-in duration-100">
                        <div className="py-1">
                          {yearOptions.map(opt => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setSelectedYear(opt.value);
                                setIsYearDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-[#f4edf9] hover:text-[#673391] transition-colors cursor-pointer"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Info Banner */}
              <div className="bg-[#f4edf9]/80 border border-purple-200/80 rounded-2xl p-4 flex gap-3 text-xs text-slate-700 mt-4">
                <Info size={16} className="text-[#673391] flex-shrink-0 mt-0.5" />
                <div>
                  <span>To report any discrepancy in your Tax Projection Report please visit:</span>
                  <a
                    href="https://crh.sbi.bank.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#673391] font-bold underline hover:opacity-80 block mt-1"
                  >
                    https://crh.sbi.bank.in/
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Preview Box */}
            <div className="md:col-span-8 bg-white rounded-3xl p-8 shadow-xs border border-slate-100 min-h-[380px] flex flex-col items-center justify-center">
              <div className="relative mb-4">
                <svg className="w-28 h-28" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="50" r="35" fill="#fae8ff" />
                  <path d="M25 55 H85 V90 C85 95, 80 100, 75 100 H35 C30 100, 25 95, 25 90 Z" fill="#c084fc" opacity="0.7" />
                  <path d="M30 45 H75 C80 45, 83 48, 82 53 L78 88 H32 L28 53 C27 48, 30 45, 35 45 Z" fill="#ffffff" stroke="#a21caf" strokeWidth="2" />
                  <circle cx="60" cy="70" r="10" fill="#dc2626" />
                  <path d="M55 65 L65 75 M65 65 L55 75" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <p className="text-xs md:text-sm font-semibold text-slate-600 text-center max-w-md">
                Select Financial Year to view your TDS Projection Report.
              </p>
            </div>

          </div>

        </main>
      </div>

      {/* Bottom Fixed Action Bar */}
      <footer className="max-w-[1280px] w-full mx-auto px-4 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push('/home/landingPage/services/tax-related')}
          className="bg-white border border-[#673391] text-[#673391] hover:bg-purple-50 font-bold text-xs md:text-sm py-2.5 px-10 rounded-full transition-all cursor-pointer shadow-2xs"
        >
          Back
        </button>

        <button
          type="button"
          disabled={!selectedYear}
          onClick={() => {
            if (selectedYear) {
              toast.success(`Generating TDS Projection Report for ${selectedYear}`);
            }
          }}
          className={`font-extrabold text-xs md:text-sm py-2.5 px-10 rounded-full transition-all flex items-center gap-1.5 ${
            selectedYear
              ? 'bg-[#673391] text-white hover:bg-[#561578] shadow-md cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Submit</span>
          <span>&rarr;</span>
        </button>
      </footer>
    </div>
  );
}
