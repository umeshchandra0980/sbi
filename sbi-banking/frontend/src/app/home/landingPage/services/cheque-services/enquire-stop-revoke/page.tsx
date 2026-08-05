'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, Eye, EyeOff, Info, ChevronDown } from 'lucide-react';

export default function EnquireStopRevokePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'enquire' | 'stop' | 'revoke'>('enquire');
  const [showAccount, setShowAccount] = useState(false);

  // Form states
  const [fromCheque, setFromCheque] = useState('');
  const [toCheque, setToCheque] = useState('');
  const [stopReason, setStopReason] = useState('');
  const [isReasonOpen, setIsReasonOpen] = useState(false);

  const stopReasons = [
    'Cheque Lost / Stolen',
    'Payment Cancelled',
    'Incorrect Amount',
    'Signature Mismatch',
    'Others'
  ];

  return (
    <div className="min-h-screen bg-[#f4f0f8] text-slate-800 flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation (Exact match to Images 3, 4, 5) */}
        <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-600 mb-4">
          <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
            <Home size={14} className="text-[#673391]" />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/services/cheque-services" className="hover:text-[#673391] text-slate-600 font-medium">
            Cheque Services
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#673391] font-bold">Enquire / Stop Cheque / Revoke Stop Cheque</span>
        </div>

        {/* Page Heading */}
        <h1 className="text-[18px] font-bold text-[#673391] mb-6 tracking-tight">
          Enquire / Stop Cheque / Revoke Stop Cheque
        </h1>

        {/* Main Card Box */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 min-h-[460px]">
          
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-200 mb-6 pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('enquire')}
              className={`pb-3 font-semibold text-[18px] cursor-pointer transition-colors ${
                activeTab === 'enquire'
                  ? 'border-b-2 border-[#673391] text-[#673391]'
                  : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Enquire Cheque
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stop')}
              className={`pb-3 font-semibold text-[18px] cursor-pointer transition-colors ${
                activeTab === 'stop'
                  ? 'border-b-2 border-[#673391] text-[#673391]'
                  : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Stop Cheque
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('revoke')}
              className={`pb-3 font-semibold text-[18px] cursor-pointer transition-colors ${
                activeTab === 'revoke'
                  ? 'border-b-2 border-[#673391] text-[#673391]'
                  : 'border-b-2 border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Revoke Stop Cheque
            </button>
          </div>

          {/* Account Selection Card */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-500 mb-2">
              Select Account
            </label>
            
            <div className="border border-slate-300 hover:border-[#673391] rounded-2xl p-3 bg-white max-w-sm flex items-center justify-between shadow-2xs transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00a3e0] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="#00a3e0" />
                    <circle cx="12" cy="12" r="4" fill="#ffffff" />
                    <rect x="11" y="12" width="2" height="7" fill="#ffffff" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 font-extrabold text-sm text-slate-800">
                    <span>{showAccount ? '30987657054' : 'XXXXXXX7054'}</span>
                    <button
                      type="button"
                      onClick={() => setShowAccount(!showAccount)}
                      className="text-[#673391] hover:opacity-80 cursor-pointer"
                      aria-label="Toggle Account visibility"
                    >
                      {showAccount ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Savings Account
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-dashed border-slate-200 my-6" />

          {/* TAB 1: ENQUIRE CHEQUE (Image 3) */}
          {activeTab === 'enquire' && (
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-4">
                <span>Search by Cheque Number</span>
                <Info size={14} className="text-[#673391] cursor-pointer" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-xs text-slate-500 font-medium mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    value={fromCheque}
                    onChange={(e) => setFromCheque(e.target.value)}
                    placeholder=""
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#673391] py-1.5 text-sm font-semibold text-slate-800 outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs text-slate-500 font-medium mb-1">
                    To (Optional)
                  </label>
                  <input
                    type="text"
                    value={toCheque}
                    onChange={(e) => setToCheque(e.target.value)}
                    placeholder=""
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#673391] py-1.5 text-sm font-semibold text-slate-800 outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-4 flex justify-start sm:justify-end">
                  <button
                    type="button"
                    disabled={!fromCheque}
                    onClick={() => toast.success(`Searching cheque status for ${fromCheque}...`)}
                    className={`font-bold text-xs md:text-sm py-2.5 px-10 rounded-full transition-all ${
                      fromCheque
                        ? 'bg-[#673391] text-white hover:bg-[#561578] shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STOP CHEQUE (Image 4) */}
          {activeTab === 'stop' && (
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-4">
                <span>Enter Cheque Number to Stop Cheque</span>
                <Info size={14} className="text-[#673391] cursor-pointer" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start mb-4">
                <div className="sm:col-span-5">
                  <label className="block text-xs text-slate-500 font-medium mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    value={fromCheque}
                    onChange={(e) => setFromCheque(e.target.value)}
                    placeholder=""
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#673391] py-1.5 text-sm font-semibold text-slate-800 outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-5">
                  <label className="block text-xs text-slate-500 font-medium mb-1">
                    To (Optional)
                  </label>
                  <input
                    type="text"
                    value={toCheque}
                    onChange={(e) => setToCheque(e.target.value)}
                    placeholder=""
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#673391] py-1.5 text-sm font-semibold text-slate-800 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <a
                  href="#lost-cheque"
                  onClick={(e) => {
                    e.preventDefault();
                    toast('Contacting SBI support for lost cheque book...', { icon: '📞' });
                  }}
                  className="text-[#673391] font-bold text-xs underline cursor-pointer hover:opacity-80 inline-block mb-4"
                >
                  Lost your Cheque Book?
                </a>

                {/* Stop Cheque Reason Dropdown */}
                <div className="max-w-md relative">
                  <button
                    type="button"
                    onClick={() => setIsReasonOpen(!isReasonOpen)}
                    className="w-full bg-white border-b border-slate-300 hover:border-[#673391] py-2 text-left text-sm font-semibold text-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className={stopReason ? 'text-slate-800 font-bold' : 'text-slate-400 font-medium'}>
                      {stopReason || 'Stop cheque reason'}
                    </span>
                    <ChevronDown size={16} className={`text-slate-500 transition-transform ${isReasonOpen ? 'rotate-180 text-[#673391]' : ''}`} />
                  </button>

                  {isReasonOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-purple-100 rounded-2xl shadow-xl z-30 overflow-hidden animate-in fade-in duration-100">
                      <div className="py-1">
                        {stopReasons.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              setStopReason(r);
                              setIsReasonOpen(false);
                            }}
                            className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-[#f4edf9] hover:text-[#673391] transition-colors cursor-pointer"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Banner at Bottom */}
              <div className="bg-[#f4edf9]/80 border border-purple-200/80 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-700 font-medium">
                <Info size={16} className="text-[#673391] flex-shrink-0" />
                <span>
                  A service charge of ₹100 + GST per cheque leaf, maximum ₹500 + GST per instance will be levied from your account
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: REVOKE STOP CHEQUE (Image 5) */}
          {activeTab === 'revoke' && (
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-4">
                <span>Search by Cheque Number</span>
                <Info size={14} className="text-[#673391] cursor-pointer" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-end">
                <div className="sm:col-span-4">
                  <label className="block text-xs text-slate-500 font-medium mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    value={fromCheque}
                    onChange={(e) => setFromCheque(e.target.value)}
                    placeholder=""
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#673391] py-1.5 text-sm font-semibold text-slate-800 outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs text-slate-500 font-medium mb-1">
                    To (Optional)
                  </label>
                  <input
                    type="text"
                    value={toCheque}
                    onChange={(e) => setToCheque(e.target.value)}
                    placeholder=""
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#673391] py-1.5 text-sm font-semibold text-slate-800 outline-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-4 flex justify-start sm:justify-end">
                  <button
                    type="button"
                    disabled={!fromCheque}
                    onClick={() => toast.success(`Searching stop cheque records for ${fromCheque}...`)}
                    className={`font-bold text-xs md:text-sm py-2.5 px-10 rounded-full transition-all ${
                      fromCheque
                        ? 'bg-[#673391] text-white hover:bg-[#561578] shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
