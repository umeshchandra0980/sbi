'use client'

import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  HelpCircle, ChevronDown, ChevronUp, ChevronRight, Home as HomeIcon, Search, Bell,
  FileText, Download, Wallet, CreditCard, Building2, TrendingUp, ShieldCheck
} from 'lucide-react';
import { MOCK_USER, MOCK_ACCOUNTS } from '@/lib/mockData';
import '../dashboard/dashboard.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function ViewAllAccountsPage() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('Accounts');

  // Accordion expanded states
  const [expandedTx, setExpandedTx] = useState(true);
  const [expandedDep, setExpandedDep] = useState(false);
  const [expandedLoans, setExpandedLoans] = useState(false);

  const currentUser = user || MOCK_USER;
  const fullName = currentUser.full_name || 'DUMPALA VISHNU VARDHAN';
  const nameParts = fullName.split(' ');
  const initials = nameParts.map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'DU';

  const primaryAccount = MOCK_ACCOUNTS[0];

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="dashboard-wrapper min-h-screen flex flex-col bg-[#f3f4f9]">
      
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeNav="Accounts" />

      {/* ================= MAIN CONTENT AREA ================= */}
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

        {/* Large Rounded White Container */}
        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-6 space-y-4 min-h-[420px]">
          
          {/* ================= ACCORDION 1: TRANSACTION ACCOUNTS ================= */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#702082] transition-all">
            <div 
              onClick={() => setExpandedTx(!expandedTx)}
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
                <ChevronDown size={16} className={`text-[#702082] transition-transform duration-200 ${expandedTx ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Expanded Content Drawer */}
            {expandedTx && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40">
                <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4 shadow-2xs">
                  
                  {/* Account Info Grid (Matching Image 1 Details) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left details grid (7/12 width) */}
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

                    {/* Right balances card box (5/12 width) */}
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

          {/* ================= ACCORDION 2: DEPOSITS (Count 00, Balance 0.00 matching image) ================= */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#302985] transition-all">
            <div 
              onClick={() => setExpandedDep(!expandedDep)}
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
                <ChevronDown size={16} className={`text-[#702082] transition-transform duration-200 ${expandedDep ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Expanded Content Drawer for empty state */}
            {expandedDep && (
              <div className="px-5 pb-5 pt-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 font-semibold text-center rounded-b-xl">
                No active deposits found.
              </div>
            )}
          </div>

          {/* ================= ACCORDION 3: LOANS (Count 00, Balance 0.00 matching image) ================= */}
          <div className="border border-slate-200/80 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#1e1866] transition-all">
            <div 
              onClick={() => setExpandedLoans(!expandedLoans)}
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
                <ChevronDown size={16} className={`text-[#702082] transition-transform duration-200 ${expandedLoans ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Expanded Content Drawer for empty state */}
            {expandedLoans && (
              <div className="px-5 pb-5 pt-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500 font-semibold text-center rounded-b-xl">
                No active loans found.
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Bottom Action Footer Bar (Full screen breakout, styled identically to bottom action bar on landing page) */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-t border-slate-200/60 shadow-lg py-4 px-8 mt-12">
        <div className="max-w-[1320px] w-full mx-auto flex justify-end">
          <button 
            type="button" 
            onClick={() => toast.success("Downloading Account Summary PDF")}
            className="bg-[#702082] hover:bg-[#5c1a6b] text-white font-bold text-sm px-8 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
          >
            Download Summary
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="dash-footer mt-auto">
        <div className="dash-footer-links">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
