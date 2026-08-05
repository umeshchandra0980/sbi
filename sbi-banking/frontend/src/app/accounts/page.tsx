'use client'

import React, { useState, Suspense } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  HelpCircle, ChevronDown, ChevronUp, ChevronRight, Home as HomeIcon, Search, Bell,
  FileText, Download, Wallet, CreditCard, Building2, TrendingUp, ShieldCheck
} from 'lucide-react';
import { MOCK_USER, MOCK_ACCOUNTS } from '@/lib/mockData';
import '../dashboard/dashboard.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

function ViewAllAccountsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Accounts');

  // Accordion expanded states
  const [expandedTx, setExpandedTx] = useState(false);
  const [expandedDep, setExpandedDep] = useState(false);
  const [expandedLoans, setExpandedLoans] = useState(false);

  // Original view expanded states
  const [origExpandedTx, setOrigExpandedTx] = useState(true);
  const [origExpandedDep, setOrigExpandedDep] = useState(false);
  const [origExpandedLoans, setOrigExpandedLoans] = useState(false);

  const currentUser = user || MOCK_USER;
  const fullName = currentUser.full_name || 'DUMPALA VISHNU VARDHAN';
  const nameParts = fullName.split(' ');
  const initials = nameParts.map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'DU';

  const primaryAccount = MOCK_ACCOUNTS[0];

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const isViewAll = searchParams?.get('view') === 'all';

  return (
    <div className="dashboard-wrapper min-h-screen flex flex-col bg-[#f3f4f9]">
      
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeNav="Accounts" />

      {isViewAll ? (
        /* ================= VIEW ALL ACCOUNTS MODE (MOCKUP ACCORDION VIEW) ================= */
        <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-normal select-none">
            <Link href="/dashboard" className="text-slate-500 hover:text-[#702082] flex items-center transition-colors">
              <HomeIcon size={14} className="stroke-[1.5px]" />
            </Link>
            <span className="text-slate-400 text-[10px] font-bold">&gt;</span>
            <span className="text-slate-600 font-medium">View All Accounts</span>
          </div>

          {/* Page Header Title */}
          <h1 className="text-[26px] font-bold text-[#302985] mb-5 tracking-tight font-sans">
            View All Accounts
          </h1>

          {/* Main Content Card Container */}
          <div className="bg-[#f0f2f5] rounded-3xl border border-slate-200/50 p-8 space-y-4 shadow-sm min-h-[380px] flex flex-col justify-between">
            
            <div className="space-y-4">
              {/* ================= ACCORDION 1: TRANSACTION ACCOUNTS ================= */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-[6px] border-r-[#e06287] transition-all">
                <div 
                  onClick={() => setExpandedTx(!expandedTx)}
                  className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/10 transition-colors"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-800 font-sans">
                      Transaction Accounts (01)
                    </div>
                    <div className="text-[15px] font-bold text-[#702082] mt-1 font-sans">
                      ₹0.09
                    </div>
                  </div>
                  <div className="text-slate-500 pr-1">
                    <ChevronDown size={18} className={`text-[#702082] transition-transform duration-200 ${expandedTx ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Expanded Content Drawer */}
                {expandedTx && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40">
                    <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4 shadow-2xs">
                      
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left details grid */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs text-[#8e8e8e] font-normal">
                          
                          <div className="space-y-4">
                            <div>
                              <div className="mb-0.5">Account Description</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px] leading-snug">
                                REGULAR SB NCHQ-INDIVIDUALS
                              </div>
                            </div>
                            
                            <div>
                              <div className="mb-0.5">Mode of Operation</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px]">
                                Single
                              </div>
                            </div>
                            
                            <div>
                              <div className="mb-0.5">Nominee(s)</div>
                              <button
                                type="button"
                                onClick={() => toast.success("Nominee: D SHYAMSUNDER (Father)")}
                                className="text-[#702082] hover:underline font-bold text-[13px] text-left block"
                              >
                                View Details
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4 font-normal">
                            <div>
                              <div className="mb-0.5">Currency</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px]">
                                Rupees
                              </div>
                            </div>
                            
                            <div>
                              <div className="mb-0.5">Rate of Interest</div>
                              <div className="text-[#1a1a1a] font-bold text-[13px]">
                                2.50%
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Right balances card box */}
                        <div className="lg:col-span-5">
                          <div className="bg-[#f3f4f7] rounded-xl p-5 space-y-3.5 text-xs text-[#4b5563] font-medium">
                            <div className="flex justify-between items-center">
                              <span>Available Balance</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.09</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Hold/Lien Amount</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Uncleared Balance</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>MOD Balance</span>
                              <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divider and Debit Card Button */}
                      <div className="border-t border-slate-200/60 pt-5 mt-4">
                        <button
                          type="button"
                          onClick={() => toast.success("Opening Debit Card Management...")}
                          className="bg-white border border-slate-200/80 hover:border-purple-200 hover:bg-purple-50/10 rounded-xl p-4 flex items-center justify-between w-full max-w-sm shadow-sm transition-all"
                        >
                          <div className="text-left font-medium">
                            <div className="text-[#1a1a1a] font-bold text-sm">Debit Card</div>
                            <div className="text-slate-500 text-xs mt-0.5">View, Apply & Manage</div>
                          </div>
                          <ChevronRight size={16} className="text-slate-400" />
                        </button>
                      </div>

                      <div className="flex gap-3 border-t border-slate-100 pt-3 text-xs font-bold text-[#702082]">
                        <Link href="/home/landingPage/manageRelationship/transactionAccounts" className="hover:underline">
                          View Statement ›
                        </Link>
                        <span>|</span>
                        <Link href="/home/landingPage/manageRelationship/transactionAccounts" className="hover:underline">
                          Transactions ›
                        </Link>
                        <span>|</span>
                        <Link href="/home/landingPage/manageRelationship/transactionAccounts" className="hover:underline">
                          Share Details ›
                        </Link>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              {/* ================= ACCORDION 2: DEPOSITS ================= */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-[6px] border-r-[#702082] transition-all">
                <div 
                  onClick={() => setExpandedDep(!expandedDep)}
                  className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/10 transition-colors"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-800 font-sans">
                      Deposits (00)
                    </div>
                    <div className="text-[15px] font-bold text-[#702082] mt-1 font-sans">
                      ₹0.00
                    </div>
                  </div>
                  <div className="text-slate-500 pr-1">
                    <ChevronDown size={18} className={`text-[#702082] transition-transform duration-200 ${expandedDep ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {expandedDep && (
                  <div className="px-5 pb-5 pt-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 font-semibold text-center">
                    No active deposits found.
                  </div>
                )}
              </div>

              {/* ================= ACCORDION 3: LOANS ================= */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-[6px] border-r-[#3b82f6] transition-all">
                <div 
                  onClick={() => setExpandedLoans(!expandedLoans)}
                  className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/10 transition-colors"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-800 font-sans">
                      Loans (00)
                    </div>
                    <div className="text-[15px] font-bold text-[#702082] mt-1 font-sans">
                      ₹0.00
                    </div>
                  </div>
                  <div className="text-slate-500 pr-1">
                    <ChevronDown size={18} className={`text-[#702082] transition-transform duration-200 ${expandedLoans ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {expandedLoans && (
                  <div className="px-5 pb-5 pt-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 font-semibold text-center">
                    No active loans found.
                  </div>
                )}
              </div>
            </div>

            {/* Download Summary Button at the bottom right */}
            <div className="flex justify-end pt-6">
              <button 
                type="button" 
                onClick={() => toast.success("Downloading Account Summary PDF")}
                className="bg-[#702082] hover:bg-[#5c1a6b] text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-sm transition-all cursor-pointer font-sans"
              >
                Download Summary
              </button>
            </div>

          </div>

        </main>
      ) : (
        /* ================= ORIGINAL TABBED ACCOUNTS RELATIONSHIP VIEW ================= */
        <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 py-6">
          
          {/* Breadcrumb Navigation (Matching Screenshot breadcrumbs exactly) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-normal select-none">
            <Link href="/dashboard" className="text-slate-500 hover:text-[#702082] flex items-center transition-colors">
              <HomeIcon size={14} className="stroke-[1.5px]" />
            </Link>
            <span className="text-slate-400 text-[10px] font-bold">&gt;</span>
            <span className="text-slate-600 font-medium">View All Accounts</span>
          </div>

          {/* Page Header Title */}
          <h1 className="text-[26px] font-bold text-[#702082] mb-5 tracking-tight">
            View All Accounts
          </h1>

          {/* Sub-Navigation Tabs Bar */}
          <div className="flex justify-between items-center border-b border-slate-200/80 mb-6">
            <div className="flex items-center gap-1">
              {(['Transaction Accounts', 'Deposits', 'Loans', 'Investments', 'Insurance'] as const).map((tabLabel) => {
                const tabHref = tabLabel === 'Transaction Accounts' 
                  ? '/home/landingPage/manageRelationship/transactionAccounts'
                  : `/home/landingPage/manageRelationship/${tabLabel.toLowerCase().replace(' ', '-')}`;
                const isActive = tabLabel === 'Transaction Accounts';
                return (
                  <Link
                    key={tabLabel}
                    href={tabHref}
                    className={`font-sans font-semibold text-[13px] px-[18px] py-[10px] pb-[12px] relative transition-all ${
                      isActive 
                        ? 'text-[#302985] font-bold bg-white rounded-t-xl shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    <span>{tabLabel}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#302985] rounded-t" />
                    )}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/accounts"
              className="flex items-center gap-1 border-[1.5px] border-[#702082] text-[#702082] bg-white hover:bg-[#f3e8ff] rounded-full px-4 py-1.5 text-[12px] font-bold transition-all shadow-xs select-none"
            >
              <span>View All Accounts</span>
              <ChevronRight size={14} className="stroke-[2.5px]" />
            </Link>
          </div>

          {/* Page Header Title */}
          <h1 className="text-[26px] font-bold text-[#702082] mb-5 tracking-tight font-sans">
            View All Accounts
          </h1>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Accordions Container (8/12 width) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Large Rounded White Container */}
              <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 space-y-4 min-h-[420px]">
                
                {/* ================= ACCORDION 1: TRANSACTION ACCOUNTS ================= */}
                <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#702082] transition-all">
                  <div 
                    onClick={() => setOrigExpandedTx(!origExpandedTx)}
                    className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/10 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Transaction Accounts (01)
                      </div>
                      <div className="text-sm font-semibold text-[#702082] mt-1">
                        ₹0.09
                      </div>
                    </div>
                    <div className="text-slate-500 group-hover:text-[#702082] transition-colors pr-1">
                      <ChevronDown size={16} className={`text-[#702082] transition-transform duration-200 ${origExpandedTx ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {origExpandedTx && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40">
                      <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4 shadow-2xs">
                        
                        {/* Account Info Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Left details grid */}
                          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs text-[#8e8e8e] font-normal">
                            
                            <div className="space-y-4">
                              <div>
                                <div className="mb-0.5">Account Description</div>
                                <div className="text-[#1a1a1a] font-bold text-[13px] leading-snug">
                                  REGULAR SB NCHQ-INDIVIDUALS
                                </div>
                              </div>
                              
                              <div>
                                <div className="mb-0.5">Mode of Operation</div>
                                <div className="text-[#1a1a1a] font-bold text-[13px]">
                                  Single
                                </div>
                              </div>
                              
                              <div>
                                <div className="mb-0.5">Nominee(s)</div>
                                <button
                                  type="button"
                                  onClick={() => toast.success("Nominee: D SHYAMSUNDER (Father)")}
                                  className="text-[#702082] hover:underline font-bold text-[13px] text-left block"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>

                            <div className="space-y-4 font-normal">
                              <div>
                                <div className="mb-0.5">Currency</div>
                                <div className="text-[#1a1a1a] font-bold text-[13px]">
                                  Rupees
                                </div>
                              </div>
                              
                              <div>
                                <div className="mb-0.5">Rate of Interest</div>
                                <div className="text-[#1a1a1a] font-bold text-[13px]">
                                  2.50%
                                </div>
                              </div>
                            </div>

                          </div>

                          {/* Right balances card box */}
                          <div className="lg:col-span-5">
                            <div className="bg-[#f3f4f7] rounded-xl p-5 space-y-3.5 text-xs text-[#4b5563] font-medium">
                              <div className="flex justify-between items-center">
                                <span>Available Balance</span>
                                <span className="font-bold text-[13px] text-[#111827]">₹0.09</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Hold/Lien Amount</span>
                                <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>Uncleared Balance</span>
                                <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span>MOD Balance</span>
                                <span className="font-bold text-[13px] text-[#111827]">₹0.00</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Divider and Debit Card Button */}
                        <div className="border-t border-slate-200/60 pt-5 mt-4">
                          <button
                            type="button"
                            onClick={() => toast.success("Opening Debit Card Management...")}
                            className="bg-white border border-slate-200/80 hover:border-purple-200 hover:bg-purple-50/10 rounded-xl p-4 flex items-center justify-between w-full max-w-sm shadow-sm transition-all"
                          >
                            <div className="text-left font-medium">
                              <div className="text-[#1a1a1a] font-bold text-sm">Debit Card</div>
                              <div className="text-slate-500 text-xs mt-0.5">View, Apply & Manage</div>
                            </div>
                            <ChevronRight size={16} className="text-slate-400" />
                          </button>
                        </div>

                        <div className="flex gap-3 border-t border-slate-100 pt-3 text-xs font-bold text-[#702082]">
                          <Link href="/home/landingPage/manageRelationship/transactionAccounts" className="hover:underline">
                            View Statement ›
                          </Link>
                          <span>|</span>
                          <Link href="/home/landingPage/manageRelationship/transactionAccounts" className="hover:underline">
                            Transactions ›
                          </Link>
                          <span>|</span>
                          <Link href="/home/landingPage/manageRelationship/transactionAccounts" className="hover:underline">
                            Share Details ›
                          </Link>
                        </div>

                      </div>
                    </div>
                  )}
                </div>

                {/* ================= ACCORDION 2: DEPOSITS ================= */}
                <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#302985] transition-all">
                  <div 
                    onClick={() => setOrigExpandedDep(!origExpandedDep)}
                    className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/10 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Deposits (00)
                      </div>
                      <div className="text-sm font-semibold text-[#702082] mt-1">
                        ₹0.00
                      </div>
                    </div>
                    <div className="text-slate-500 group-hover:text-[#702082] transition-colors pr-1">
                      <ChevronDown size={16} className={`text-[#702082] transition-transform duration-200 ${origExpandedDep ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Content Drawer for empty state */}
                  {origExpandedDep && (
                    <div className="px-5 pb-5 pt-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 font-semibold text-center rounded-b-xl">
                      No active deposits found.
                    </div>
                  )}
                </div>

                {/* ================= ACCORDION 3: LOANS ================= */}
                <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#1e1866] transition-all">
                  <div 
                    onClick={() => setOrigExpandedLoans(!origExpandedLoans)}
                    className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/10 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Loans (00)
                      </div>
                      <div className="text-sm font-semibold text-[#702082] mt-1">
                        ₹0.00
                      </div>
                    </div>
                    <div className="text-slate-500 group-hover:text-[#702082] transition-colors pr-1">
                      <ChevronDown size={16} className={`text-[#702082] transition-transform duration-200 ${origExpandedLoans ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {/* Expanded Content Drawer for empty state */}
                  {origExpandedLoans && (
                    <div className="px-5 pb-5 pt-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 font-semibold text-center rounded-b-xl">
                      No active loans found.
                    </div>
                  )}
                </div>

              </div>

            </div> {/* End Left Column */}

            {/* Right Column: Promo Card */}
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden bg-[#f6ecf5] rounded-2xl p-6 py-8 border border-[#702082]/10 shadow-xs flex flex-col justify-center min-h-[220px]">
                
                {/* Abstract Pink Waves Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
                  <svg className="absolute right-0 bottom-0 w-[120%] h-full" viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M60 160 C150 115 250 55 360 75 L360 160 Z" fill="#edd6ea" />
                    <path d="M0 160 C100 135 200 95 360 105 L360 160 Z" fill="#f5e1f3" opacity="0.95" />
                    <path d="M0 130 C40 130 70 145 90 160 L0 160 Z" fill="#eed8ea" opacity="0.75" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-[17px] font-bold text-slate-800 tracking-wide font-sans">
                    Take control of your Spendings!
                  </h3>
                  <ul className="space-y-3 text-[14px] font-semibold text-[#5b2170] list-none pl-0">
                    <li className="flex items-center gap-2">
                      <span className="text-[#702082] text-lg leading-none select-none">•</span>
                      <span>Smarter Insights. Better Decisions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#702082] text-lg leading-none select-none">•</span>
                      <span>View Spend Summary</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#702082] text-lg leading-none select-none">•</span>
                      <span>Interactive Graphs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#702082] text-lg leading-none select-none">•</span>
                      <span>Manage Budget</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div> {/* End Grid */}

        </main>
      )}

      {/* Bottom Action Footer Bar (Only shown for original tabbed view) */}
      {!isViewAll && (
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-t border-slate-200/60 shadow-lg py-4 px-8 mt-12">
          <div className="max-w-[1320px] w-full mx-auto flex justify-end">
            <button 
              type="button" 
              onClick={() => toast.success("Downloading Account Summary PDF")}
              className="bg-[#702082] hover:bg-[#5c1a6b] text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-sm transition-all cursor-pointer font-sans"
            >
              Download Summary
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="dash-footer mt-auto">
        <div className="dash-footer-links">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link font-sans">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link font-sans">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link font-sans">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}

export default function ViewAllAccountsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f3f4f9] text-sm text-slate-500">Loading...</div>}>
      <ViewAllAccountsContent />
    </Suspense>
  );
}
