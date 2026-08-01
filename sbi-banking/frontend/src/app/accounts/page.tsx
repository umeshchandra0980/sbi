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
      
      {/* ================= HEADER (Multi-Tier Header) ================= */}
      <header className="dash-header">
        
        {/* Dark Purple Top Bar */}
        <div className="dash-top-bar">
          <div className="dash-top-bar-inner">
            <div className="dash-top-left-tabs">
              <button type="button" className="dash-top-tab active">
                Banking
              </button>
              <button 
                type="button" 
                className="dash-top-tab"
                onClick={() => router.push('/home/landingPage/lifestyle')}
              >
                Lifestyle
              </button>
              <button type="button" className="dash-top-tab">
                Rewards
              </button>

              <div className="dash-lite-switch">
                <span>YONO Net Banking Lite</span>
                <span className="switch-badge bg-gray-400 text-white">OFF</span>
              </div>
            </div>

            <div className="dash-top-right-info">
              <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white text-xs hover:underline">
                <HelpCircle size={13} />
                Get Help
              </a>
              <span className="helpline-text">
                <b>022-20744646</b> (8AM-8PM) | ynbsupport@sbi.co.in | <b>1800-11-1101</b> (24x7)
              </span>
              <span className="text-xs">English ▾</span>
              <span className="text-xs font-bold cursor-pointer">- A +</span>
              <button type="button" onClick={handleLogout} className="logout-btn-dash">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main White Navbar */}
        <nav className="dash-main-navbar" aria-label="Main Navigation">
          <div className="dash-main-navbar-inner flex items-center justify-between px-6 py-2 bg-white">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img 
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/yono_logo.svg'; }}
                alt="YONO SBI NET-BANKING" 
                className="h-9 w-auto object-contain"
              />
            </Link>

            <ul className="dash-nav-links">
              {[
                'Overview', 'Accounts', 'Payments', 'Deposits', 
                'Loans', 'Cards', 'Investments', 'Insurance', 'Services'
              ].map((tab) => (
                <li key={tab} className="dash-nav-item">
                  <button 
                    type="button" 
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === 'Overview') router.push('/dashboard');
                      else if (tab === 'Accounts') router.push('/home/landingPage/manageRelationship/transactionAccounts');
                      else if (tab === 'Payments') router.push('/payments');
                      else if (tab === 'Deposits') router.push('/home/landingPage/manageRelationship/deposits');
                      else if (tab === 'Loans') router.push('/home/landingPage/manageRelationship/loans/loans');
                      else if (tab === 'Cards') router.push('/cards');
                      else if (tab === 'Investments') router.push('/home/landingPage/manageRelationship/investments/mutual-fund');
                      else if (tab === 'Insurance') router.push('/home/landingPage/manageRelationship/insurance');
                      else if (tab === 'Services') router.push('/settings');
                    }}
                    className={`dash-nav-link ${activeTab === tab ? 'active' : ''}`}
                  >
                    <span>{tab}</span>
                    {activeTab === tab && <div className="nav-active-line" />}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <button type="button" className="text-[#702082] hover:opacity-80 transition-opacity" title="Search">
                <Search size={18} className="stroke-[2px]" />
              </button>
              <button type="button" className="text-[#702082] hover:opacity-80 relative transition-opacity" title="Notifications">
                <Bell size={18} className="stroke-[2px]" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </button>
              <Link href="/settings" className="bg-[#702082] text-white py-0.5 pl-0.5 pr-3.5 rounded-full flex items-center gap-2 text-xs font-semibold hover:bg-[#5c1a6b] transition-all duration-150 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-[#fcfaff] text-[#702082] border-2 border-amber-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                  {initials}
                </div>
                <span className="text-white font-medium text-[11px]">My Profile</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

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
