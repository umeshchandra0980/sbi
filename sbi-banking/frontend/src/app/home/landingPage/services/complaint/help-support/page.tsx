'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  Home, ChevronRight, Phone, ExternalLink, FileEdit, Flag, Play, Pause, 
  Volume2, Maximize, Tv, ChevronUp, ChevronDown 
} from 'lucide-react';

export default function HelpSupportPage() {
  const [selectedTopic, setSelectedTopic] = useState('How to Create & View Fixed Deposit');
  const [isPlaying, setIsPlaying] = useState(false);

  const selfHelpTopics = [
    'How to Create & View Fixed Deposit',
    'How to Download Interest Certificate & Balance Certificate',
    'How to avail Insta Home Top-Up Loan (IHTL)',
    'How to Manage Debit Card',
    'How to View & Download Deposits & Loan Statements',
    'How to Manage Nominee(s)',
    'Create Goals',
    'Manage Goals',
    'Credit Card Compare Features',
    'Credit Card Network Select',
    'Fund Transfer Quick transfer',
    'Bill Payment Enable Autopay',
    'Bill Payment',
    'Credit Card Block',
    'Saving Account opening without PAN',
    'How To Use e-Secure Functionality',
    'How to Change Password'
  ];

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setIsPlaying(true);
    toast.success(`Playing guide video for "${topic}"`);
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col justify-between">
      <div>
        {/* Header */}
        <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

        {/* Main Container */}
        <main className="max-w-[1280px] w-full mx-auto px-4 py-6">
          
          {/* Breadcrumb Navigation (Exact match to screenshots) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
            <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
              <Home size={14} className="text-[#673391]" />
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#673391] font-bold">Help &amp; Support</span>
          </div>

          {/* Page Heading */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#673391] mb-6 tracking-tight">
            Help &amp; Support
          </h1>

          {/* 2-Column Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Emergency/Fraud Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4">
                  Emergency/Fraud
                </h2>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Phone size={15} className="text-[#673391]" />
                    <span>1800-1111-09</span>
                  </div>
                  <span className="text-slate-300 font-light">|</span>
                  <button
                    type="button"
                    onClick={() => toast('Redirecting to Report Fraud portal...', { icon: '🚨' })}
                    className="text-[#673391] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Report Fraud</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* National Cybercrime Reporting Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-2">
                  National Cybercrime Reporting
                </h2>
                <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                  For any unauthorised transaction, in addition to reporting to the Bank, promptly report the incident to the Ministry of Home Affairs to help prevent further loss and aid swift investigation.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Phone size={15} className="text-[#673391]" />
                    <span>1930</span>
                  </div>
                  <span className="text-slate-300 font-light">|</span>
                  <a
                    href="https://www.cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#673391] font-bold hover:underline flex items-center gap-1.5"
                  >
                    <ExternalLink size={14} />
                    <span>www.cybercrime.gov.in</span>
                  </a>
                </div>
              </div>

              {/* Need support? We're here Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4">
                  Need support? We're here
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Lodge Complaint */}
                  <div 
                    onClick={() => toast.success('Opening Lodge Complaint form...')}
                    className="border border-slate-200 hover:border-[#673391] bg-slate-50/50 hover:bg-[#f4edf9]/40 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-purple-100 text-[#673391] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                      <FileEdit size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-[#673391] transition-colors">
                      Lodge Complaint
                    </span>
                  </div>

                  {/* Track Complaints */}
                  <div 
                    onClick={() => toast.success('Opening Track Complaints portal...')}
                    className="border border-slate-200 hover:border-[#673391] bg-slate-50/50 hover:bg-[#f4edf9]/40 rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-purple-100 text-[#673391] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                      <Flag size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-[#673391] transition-colors">
                      Track Complaints
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#673391]" />
                    <span>1800-1111-01</span>
                    <span className="text-slate-400 font-normal">(For YONO complaints)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-[#673391]" />
                    <span>1800-1234 or 1800-2100</span>
                    <span className="text-slate-400 font-normal">(Please call SBI's 24/7 toll free helpline number)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink size={14} className="text-[#673391]" />
                    <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="text-[#673391] underline hover:opacity-80">
                      crh.sbi.bank.in
                    </a>
                    <span className="text-slate-400 font-normal">(Lodge complaint through web portal)</span>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Video Player Card */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                <h2 className="text-base md:text-lg font-bold text-slate-800 mb-4">
                  {selectedTopic}
                </h2>

                {/* Simulated Video Player */}
                <div className="w-full aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 rounded-2xl overflow-hidden shadow-md relative flex flex-col justify-between p-4 group">
                  
                  {/* Top Branding Badge */}
                  <div className="flex items-center gap-2 z-10">
                    <div className="bg-[#673391] text-white px-2 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase">
                      Yono SBI
                    </div>
                    <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[10px]">
                      SBI
                    </div>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full bg-black/50 hover:bg-[#673391] text-white flex items-center justify-center backdrop-blur-xs transition-all shadow-xl cursor-pointer group-hover:scale-110"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                    </button>
                  </div>

                  {/* Video Title Overlay */}
                  <div className="z-10 text-center text-xs text-purple-200/90 font-medium">
                    {isPlaying ? `Playing: ${selectedTopic}` : `Click play to watch step-by-step guide for ${selectedTopic}`}
                  </div>

                  {/* Video Controls Bar */}
                  <div className="z-10 bg-black/60 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-white text-xs gap-3">
                    <button type="button" onClick={() => setIsPlaying(!isPlaying)} className="hover:text-purple-300 transition-colors">
                      {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>

                    {/* Progress Bar */}
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-[10px] text-slate-300 font-mono">
                        {isPlaying ? '0:12' : '0:00'}
                      </span>
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden relative cursor-pointer">
                        <div className={`h-full bg-[#673391] rounded-full transition-all duration-300 ${isPlaying ? 'w-[40%]' : 'w-0'}`} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">0:31</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300">
                      <Volume2 size={14} className="cursor-pointer hover:text-white" />
                      <Maximize size={14} className="cursor-pointer hover:text-white" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Quick self help Section */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100">
                <div className="flex items-baseline gap-2 mb-4">
                  <h2 className="text-base md:text-lg font-extrabold text-slate-800">
                    Quick self help
                  </h2>
                  <span className="text-xs text-slate-400 font-normal">
                    (Watch videos with step by step guides)
                  </span>
                </div>

                {/* Topics List with Custom Scrollbar (Matching Image 2) */}
                <div className="max-h-[160px] overflow-y-auto pr-3 custom-scrollbar border-t border-slate-200/80">
                  {selfHelpTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectTopic(topic)}
                      className="flex items-center gap-4 py-3.5 px-1 cursor-pointer transition-opacity hover:opacity-80 border-b border-slate-200/80 bg-transparent"
                    >
                      <div className="w-8 h-6 rounded-xs border-2 border-[#673391] text-[#673391] flex items-center justify-center bg-white flex-shrink-0 relative">
                        <div className="w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-[#673391] ml-0.5" />
                      </div>
                      <span className="text-xs md:text-sm font-bold text-[#673391] leading-snug flex-1">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
