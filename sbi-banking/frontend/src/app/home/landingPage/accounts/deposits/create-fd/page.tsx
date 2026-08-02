'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowRight, ChevronRight, Lock } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function CreateFdPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Interest Rates' | 'Payout Calculator' | 'Know more'>('Interest Rates');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#interest-rates' || window.location.hash.includes('interest-rates')) {
        setActiveTab('Interest Rates');
        setTimeout(() => {
          const el = document.getElementById('interest-rates-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 200);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f2f8] font-sans">
      {/* Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Deposits" />

      {/* Breadcrumb Navigation */}
      <div className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#673391]">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700">Deposits</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-[1280px] w-full mx-auto px-4 md:px-8 pb-16 flex-1">
        
        {/* Title & Manage Deposits Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#673391]" style={{ fontFamily: 'Roboto, sans-serif' }}>Deposits</h1>
          
          {/* Top Right "Manage your Deposits" Pill Card */}
          <div className="bg-white border border-purple-200/80 rounded-2xl py-3 px-5 flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-full bg-[#f4edf9] text-[#673391] flex items-center justify-center">
              <Lock size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Manage your Deposits (00)</div>
              <div className="text-xs font-semibold text-slate-500">Combined Value: ₹0.00</div>
            </div>
            <ChevronRight size={20} className="text-[#673391] ml-2" />
          </div>
        </div>

        {/* Top 2-Column Section: Left "Open New Deposit" & Right "Please choose your preferred type of FD" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Left Column (5/12) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <h2 className="text-xl font-extrabold text-[#673391] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Open New Deposit</h2>
            
            <div className="space-y-4 flex-1">
              
              {/* Card 1: Fixed Deposit (Active Selected State) */}
              <div className="bg-white border-2 border-[#673391] rounded-2xl p-5 shadow-sm flex items-center justify-between cursor-pointer transition-all hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4edf9] flex items-center justify-center flex-shrink-0">
                    <img src="/images/category-icons/ic_fixed_deposit.svg" alt="Fixed Deposit" className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Fixed Deposit</h3>
                    <p className="text-sm font-medium text-slate-600 mt-0.5">Explore a host of FD variants to suit your needs</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#673391] text-white flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={20} />
                </div>
              </div>

              {/* Card 2: Recurring Deposit */}
              <Link href="/home/landingPage/accounts/deposits/create-fd/recurring-deposit" className="block bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between cursor-pointer transition-all hover:border-purple-300 hover:shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4edf9] flex items-center justify-center flex-shrink-0">
                    <img src="/images/category-icons/ic_recurring_deposit.svg" alt="Recurring Deposit" className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Recurring Deposit</h3>
                    <p className="text-sm font-medium text-slate-600 mt-0.5">One-time deposit creation that ensures you save every month</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-purple-300 text-[#673391] flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={20} />
                </div>
              </Link>

              {/* Card 3: Annuity Deposit */}
              <Link href="/home/landingPage/accounts/deposits/create-fd/annuity-deposit" className="block bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between cursor-pointer transition-all hover:border-purple-300 hover:shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4edf9] flex items-center justify-center flex-shrink-0">
                    <img src="/images/category-icons/ic_annuity_deposit.svg" alt="Annuity Deposit" className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Annuity Deposit</h3>
                    <p className="text-sm font-medium text-slate-600 mt-0.5">Invest once and get returns every month</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-purple-300 text-[#673391] flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={20} />
                </div>
              </Link>

              {/* Card 4: Auto Sweep */}
              <div id="autosweep-card" className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between cursor-pointer transition-all hover:border-purple-300 hover:shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4edf9] flex items-center justify-center flex-shrink-0">
                    <img src="/images/category-icons/ic_auto_sweep.svg" alt="Auto Sweep" className="w-7 h-7 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Auto Sweep</h3>
                    <p className="text-sm font-medium text-slate-600 mt-0.5">Let idle funds in your savings account earn more for you</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-purple-300 text-[#673391] flex items-center justify-center flex-shrink-0">
                  <ArrowRight size={20} />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (7/12): FD Variants Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <h2 className="text-xl font-extrabold text-[#673391] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Please choose your preferred type of FD</h2>
            
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex-1 divide-y divide-slate-100">
              
              {/* Variant 1: Regular FD */}
              <div className="py-4 first:pt-0 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 rounded-xl px-2 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#f4edf9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/images/category-icons/ic_fixed_deposit.svg" alt="Regular FD" className="w-6.5 h-6.5 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Regular FD</h3>
                    <ul className="text-sm font-medium text-slate-600 space-y-1.5 mt-2 list-disc list-inside">
                      <li>Duration up to 10 years</li>
                      <li>Withdraw anytime</li>
                      <li>Avail overdraft against regular FD</li>
                    </ul>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 mt-2" />
              </div>

              {/* Variant 2: Tax Saver FD */}
              <div className="py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 rounded-xl px-2 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#f4edf9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/images/category-icons/ic_tax_related.svg" alt="Tax Saver FD" className="w-6.5 h-6.5 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Tax Saver FD</h3>
                    <p className="text-sm font-bold text-[#673391] mt-0.5">Save Tax</p>
                    <ul className="text-sm font-medium text-slate-600 space-y-1.5 mt-2 list-disc list-inside">
                      <li>Save tax under Section 80C</li>
                      <li>Maximum ₹1,50,000 per financial year</li>
                      <li>Minimum 5 years lock-in</li>
                    </ul>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 mt-2" />
              </div>

              {/* Variant 3: Multi Option Deposit FD */}
              <div className="py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 rounded-xl px-2 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#f4edf9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/images/category-icons/ic_esecure_lock.svg" alt="Multi Option Deposit FD" className="w-6.5 h-6.5 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Multi Option Deposit FD</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-0.5">Flexi FD for higher liquidity</p>
                    <ul className="text-sm font-medium text-slate-600 space-y-1.5 mt-2 list-disc list-inside">
                      <li>Minimum ₹15,000</li>
                      <li>Linked to transaction account</li>
                      <li>Automatic partial withdrawal in case of low balance in transaction account</li>
                    </ul>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 mt-2" />
              </div>

              {/* Variant 4: Green FD */}
              <div className="py-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 rounded-xl px-2 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#eef8eb] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-700 font-extrabold text-lg">₹</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-700" style={{ fontFamily: 'Roboto, sans-serif' }}>Green FD</h3>
                    <p className="text-sm font-semibold text-slate-500 mt-0.5">Contribute to a better environment</p>
                    <ul className="text-sm font-medium text-slate-600 space-y-1.5 mt-2 list-disc list-inside">
                      <li>Fixed duration of 1111 days, 1777 days or 2222 days</li>
                      <li>Your funds are used towards environmentally responsible investments</li>
                    </ul>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 mt-2" />
              </div>

              {/* Variant 5: Non-Callable FD */}
              <div className="py-4 last:pb-0 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/80 rounded-xl px-2 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#f4edf9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/images/category-icons/ic_fixed_deposit.svg" alt="Non-Callable FD" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Non-Callable FD</h3>
                    <ul className="text-sm font-medium text-slate-600 space-y-1.5 mt-2 list-disc list-inside">
                      <li>Higher rate of interest</li>
                      <li>Minimum ₹1 Crore</li>
                      <li>Fixed duration of 1 year or 2 years</li>
                    </ul>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-400 mt-2" />
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section: Interest Rates / Payout Calculator / Know More */}
        <div id="interest-rates-section" className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs">
          
          {/* Sub-tabs Header */}
          <div className="flex items-center gap-8 border-b border-slate-100 pb-4 mb-6">
            {(['Interest Rates', 'Payout Calculator', 'Know more'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative font-bold text-base transition-colors ${
                  activeTab === tab ? 'text-[#673391]' : 'text-slate-500 hover:text-slate-800'
                }`}
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content: Interest Rates Tables */}
          {activeTab === 'Interest Rates' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Table 1: Domestic Term Deposit - General */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Domestic Term Deposit - General</h4>
                <div className="border border-purple-100/80 rounded-xl overflow-hidden text-sm">
                  <div className="bg-[#f4edf9] px-4 py-3 flex justify-between font-extrabold text-[#673391]">
                    <span>Terms</span>
                    <span>Interest Rate</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>7 Days to 45 Days</span>
                      <span className="font-bold text-slate-900">3.05%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>46 Days to 180 Days</span>
                      <span className="font-bold text-slate-900">4.90%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>181 Days to 210 Days</span>
                      <span className="font-bold text-slate-900">5.65%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>211 Days to less than 1 Year</span>
                      <span className="font-bold text-slate-900">5.90%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>1 Year to less than 2 Years</span>
                      <span className="font-bold text-slate-900">6.25%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>Amrit Vrishti 444</span>
                      <span className="font-bold text-slate-900">6.45%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>2 Years to less than 3 Years</span>
                      <span className="font-bold text-slate-900">6.40%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>3 Years to less than 5 Years</span>
                      <span className="font-bold text-slate-900">6.30%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>5 Years and upto 10 Years</span>
                      <span className="font-bold text-slate-900">6.05%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table 2: Green Rupee TD - General */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Green Rupee TD - General</h4>
                <div className="border border-purple-100/80 rounded-xl overflow-hidden text-sm">
                  <div className="bg-[#f4edf9] px-4 py-3 flex justify-between font-extrabold text-[#673391]">
                    <span>Terms</span>
                    <span>Interest Rate</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>1111 Days</span>
                      <span className="font-bold text-slate-900">6.30%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>1777 Days</span>
                      <span className="font-bold text-slate-900">6.30%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>2222 Days</span>
                      <span className="font-bold text-slate-900">6.05%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table 3: Non-callable Deposit - General */}
              <div>
                <h4 className="font-extrabold text-slate-900 text-base mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Non-callable Deposit - General</h4>
                <div className="border border-purple-100/80 rounded-xl overflow-hidden text-sm">
                  <div className="bg-[#f4edf9] px-4 py-3 flex justify-between font-extrabold text-[#673391]">
                    <span>Terms</span>
                    <span>Interest Rate</span>
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>1 Year</span>
                      <span className="font-bold text-slate-900">6.55%</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between text-slate-700 font-semibold">
                      <span>2 Years</span>
                      <span className="font-bold text-slate-900">6.80%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Payout Calculator (Matching Screenshots 3 & 4) */}
          {activeTab === 'Payout Calculator' && (
            <div className="space-y-8">
              {/* Select Deposit Type */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Select Deposit Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Deposit Type</label>
                    <div className="relative border-b-2 border-slate-300 pb-2">
                      <select className="w-full appearance-none bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer">
                        <option value="Fixed Deposit">Fixed Deposit</option>
                        <option value="Recurring Deposit">Recurring Deposit</option>
                      </select>
                      <ChevronRight size={16} className="absolute right-0 top-1 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">FD Variant</label>
                    <div className="relative border-b-2 border-slate-300 pb-2">
                      <select className="w-full appearance-none bg-transparent font-bold text-slate-900 text-sm focus:outline-none cursor-pointer">
                        <option value="Regular FD">Regular FD</option>
                        <option value="Tax Saver FD">Tax Saver FD</option>
                      </select>
                      <ChevronRight size={16} className="absolute right-0 top-1 text-slate-400 rotate-90 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Enter Deposit Details */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Enter Deposit Details</h3>
                
                {/* Amount Slider Container */}
                <div className="bg-[#f4edf9]/50 border border-purple-100 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-slate-800">Amount</span>
                    <div className="border-b-2 border-slate-300 pb-1 px-4">
                      <span className="font-extrabold text-[#673391] text-base">₹1,000</span>
                    </div>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="1000"
                    max="29999999"
                    defaultValue="1000"
                    className="w-full accent-[#673391] cursor-pointer h-2 bg-purple-200 rounded-lg"
                  />
                  
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 mt-3">
                    <span>₹1,000</span>
                    <span>₹2,99,99,999</span>
                  </div>
                </div>

                {/* Duration Inputs */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Duration</h4>
                  <div className="grid grid-cols-3 gap-6">
                    <input type="text" placeholder="Years" className="border-b-2 border-slate-300 pb-2 text-sm font-bold placeholder-slate-400 focus:outline-none focus:border-[#673391]" />
                    <input type="text" placeholder="Months" className="border-b-2 border-slate-300 pb-2 text-sm font-bold placeholder-slate-400 focus:outline-none focus:border-[#673391]" />
                    <input type="text" placeholder="Days" className="border-b-2 border-slate-300 pb-2 text-sm font-bold placeholder-slate-400 focus:outline-none focus:border-[#673391]" />
                  </div>
                </div>

                {/* Interest Payout Dropdown */}
                <div className="max-w-md mb-8">
                  <div className="relative border-b-2 border-slate-300 pb-2">
                    <select className="w-full appearance-none bg-transparent font-bold text-slate-800 text-sm focus:outline-none cursor-pointer">
                      <option value="">Interest Payout</option>
                      <option value="At Maturity">At Maturity</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                    <ChevronRight size={16} className="absolute right-0 top-1 text-slate-400 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {/* Calculate Button */}
                <div className="flex justify-center">
                  <button type="button" onClick={() => toast.success('Calculating deposit returns...')} className="bg-slate-200 text-slate-500 font-bold px-12 py-3 rounded-full text-sm hover:bg-[#673391] hover:text-white transition-colors">
                    Calculate
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Tab 3: Know More (Accordion FAQ View Matching Screenshot 5) */}
          {activeTab === 'Know more' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#673391] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Annuity Deposit</h3>
                <div className="divide-y divide-slate-100">
                  {[
                    'What is Annuity Deposit ?',
                    'What will be the maturity amount in Annuity Deposit?',
                    'What is the minimum and maximum limit for Annuity Deposit ?',
                    'Can I set the maturity instructions for annuity deposit account?',
                    'What is the minimum and maximum period of deposit?',
                    'Can senior citizen avail additional rate of interest on Annuity Deposit?'
                  ].map((faq, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center cursor-pointer hover:text-[#673391] transition-colors">
                      <span className="text-sm font-semibold text-slate-800">{faq}</span>
                      <ChevronRight size={16} className="text-slate-500 rotate-90" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Tax Saver FD */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-[#673391] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Tax Saver FD</h3>
                <div className="divide-y divide-slate-100">
                  {[
                    'What is Tax Saver Fixed Deposit?',
                    'I had created Tax Saver Fixed Deposit 2 years back, now I want to close it. How do I close it?',
                    'Can I avail overdraft against Tax Saver Fixed Deposit, like other Fixed Deposit?',
                    'Is there any lock-in period for Tax Saver Fixed Deposit?',
                    'What is the minimum and maximum amount for a Tax Saver Fixed Deposit?',
                    "Can I close my Tax Saving Fixed Deposit scheme before maturity in 'YONO' application?",
                    'Can senior citizen avail additional rate of interest on term deposit under Tax Saving Scheme?'
                  ].map((faq, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center cursor-pointer hover:text-[#673391] transition-colors">
                      <span className="text-sm font-semibold text-slate-800">{faq}</span>
                      <ChevronRight size={16} className="text-slate-500 rotate-90" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Recurring Deposit */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-[#673391] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Recurring Deposit</h3>
                <div className="divide-y divide-slate-100">
                  {[
                    'Can I open a recurring deposit (RD) account through the YONO platform?',
                    'What is the minimum and maximum tenure for an online deposit under Recurring Deposit?',
                    'What are the Interest rates applicable for a recurring deposit?',
                    'What is the minimum amount for a Recurring deposit a/c?',
                    'In whose name will the Recurring deposit (RD) account be opened? What is the mode of operation?',
                    'What are the types of accounts from which I can debit an amount for the deposit?',
                    'Can senior citizen avail additional rate of interest on recurring deposit?',
                    'Is it mandatory to set standing instructions for periodic instalment payment of RD?',
                    'Can I close my RD account online?'
                  ].map((faq, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center cursor-pointer hover:text-[#673391] transition-colors">
                      <span className="text-sm font-semibold text-slate-800">{faq}</span>
                      <ChevronRight size={16} className="text-slate-500 rotate-90" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: MOD */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-[#673391] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>MOD</h3>
                <div className="divide-y divide-slate-100">
                  {[
                    'What is e-TDR/e-STDR (Multi Option Deposit) ?',
                    'What is the tenure for MODs ?',
                    'What are the interest rates for a term deposit?',
                    'What is the minimum amount for a term deposit ?',
                    'Can I generate an MOD account advice ?',
                    'In whose name will the MOD account be opened? What will be the mode of operation?',
                    'What are the types of accounts from which I can debit an amount for the deposit?'
                  ].map((faq, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center cursor-pointer hover:text-[#673391] transition-colors">
                      <span className="text-sm font-semibold text-slate-800">{faq}</span>
                      <ChevronRight size={16} className="text-slate-500 rotate-90" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Green deposit */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-[#673391] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Green deposit</h3>
                <div className="divide-y divide-slate-100">
                  {[
                    'Can I open a SBI Green Term deposit account through YONO?',
                    'What is the tenure for an online SBI Green Term deposit?'
                  ].map((faq, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center cursor-pointer hover:text-[#673391] transition-colors">
                      <span className="text-sm font-semibold text-slate-800">{faq}</span>
                      <ChevronRight size={16} className="text-slate-500 rotate-90" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </main>

      {/* Legal Footer */}
      <footer className="bg-[#333333] text-white text-xs py-3 text-center border-t border-slate-700">
        <div className="flex justify-center items-center gap-3">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
