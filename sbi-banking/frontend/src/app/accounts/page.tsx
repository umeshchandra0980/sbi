'use client'

import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  HelpCircle, ChevronDown, ChevronUp, Home as HomeIcon, Search, Bell,
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
              <button type="button" className="dash-top-tab">
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
          <div className="dash-main-navbar-inner">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img 
                src="/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/new_horz_logo_net_banking_svg" 
                alt="YONO SBI Net-Banking Logo" 
                className="dash-brand-logo"
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
                      if (tab === 'Accounts') router.push('/accounts');
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
              <button type="button" className="text-gray-600 hover:text-purple-900" title="Search">
                <Search size={18} />
              </button>
              <button type="button" className="text-gray-600 hover:text-purple-900 relative" title="Notifications">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </button>
              <Link href="/settings" className="dash-user-profile-badge">
                <div className="dash-user-avatar-circle">{initials}</div>
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium">
          <Link href="/dashboard" className="text-purple-900 hover:underline flex items-center gap-1">
            <HomeIcon size={14} />
          </Link>
          <span>›</span>
          <span className="text-slate-700 font-semibold">View All Accounts</span>
        </div>

        {/* Page Header Title */}
        <h1 className="text-2xl font-extrabold text-[#5c1c73] mb-6 tracking-tight">
          View All Accounts
        </h1>

        {/* Large Rounded White Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 min-h-[420px]">
          
          {/* ================= ACCORDION 1: TRANSACTION ACCOUNTS ================= */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#8a1c7c] transition-all">
            <div 
              onClick={() => setExpandedTx(!expandedTx)}
              className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/40 transition-colors"
            >
              <div>
                <div className="text-sm font-extrabold text-slate-800">
                  Transaction Accounts (01)
                </div>
                <div className="text-lg font-black text-[#5c1c73] mt-1">
                  ₹ {primaryAccount.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <div className="text-purple-900">
                {expandedTx ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </div>
            </div>

            {/* Expanded Content Drawer */}
            {expandedTx && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60">
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        SAVINGS ACCOUNT
                      </span>
                      <div className="text-sm font-bold text-slate-900 mt-2">
                        Account No: <span className="font-mono">{primaryAccount.account_number}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Branch: <b>PEDDAPALLI</b> | IFSC: <span className="font-mono font-bold text-slate-700">SBIN0020138</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Available Balance</div>
                      <div className="text-base font-extrabold text-emerald-700">
                        ₹ {primaryAccount.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 border-t border-slate-100 pt-3 text-xs font-bold text-purple-900">
                    <Link href="/settings" className="hover:underline">
                      View Statement ›
                    </Link>
                    <span>|</span>
                    <Link href="/settings" className="hover:underline">
                      Transactions ›
                    </Link>
                    <span>|</span>
                    <Link href="/settings" className="hover:underline">
                      Share Details ›
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= ACCORDION 2: DEPOSITS ================= */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#5c1c73] transition-all">
            <div 
              onClick={() => setExpandedDep(!expandedDep)}
              className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/40 transition-colors"
            >
              <div>
                <div className="text-sm font-extrabold text-slate-800">
                  Deposits (01)
                </div>
                <div className="text-lg font-black text-[#5c1c73] mt-1">
                  ₹ 5,00,000.00
                </div>
              </div>
              <div className="text-purple-900">
                {expandedDep ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </div>
            </div>

            {/* Expanded Content Drawer */}
            {expandedDep && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60">
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        FIXED DEPOSIT
                      </span>
                      <div className="text-sm font-bold text-slate-900 mt-2">
                        Account No: <span className="font-mono">40192837465</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Maturity Date: <b>15/08/2027</b> | Interest Rate: <b>7.25% p.a.</b>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Deposit Amount</div>
                      <div className="text-base font-extrabold text-purple-900">
                        ₹ 5,00,000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= ACCORDION 3: LOANS ================= */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2sm border-r-4 border-r-[#1e1866] transition-all">
            <div 
              onClick={() => setExpandedLoans(!expandedLoans)}
              className="p-5 flex justify-between items-center cursor-pointer hover:bg-purple-50/40 transition-colors"
            >
              <div>
                <div className="text-sm font-extrabold text-slate-800">
                  Loans (01)
                </div>
                <div className="text-lg font-black text-[#5c1c73] mt-1">
                  ₹ 22,50,000.00
                </div>
              </div>
              <div className="text-purple-900">
                {expandedLoans ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </div>
            </div>

            {/* Expanded Content Drawer */}
            {expandedLoans && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/60">
                <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-blue-100 text-blue-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        HOME LOAN
                      </span>
                      <div className="text-sm font-bold text-slate-900 mt-2">
                        Account No: <span className="font-mono">20938475612</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Tenure: <b>240 Months</b> | ROI: <b>8.50% p.a.</b>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Outstanding Principal</div>
                      <div className="text-base font-extrabold text-blue-900">
                        ₹ 22,50,000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Fixed Bottom Right Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          type="button" 
          onClick={() => toast.success("Downloading Account Summary PDF")}
          className="bg-[#5c1c73] hover:bg-[#47145a] text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <Download size={18} />
          Download Summary
        </button>
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
