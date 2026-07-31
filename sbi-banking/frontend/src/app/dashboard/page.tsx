'use client'

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, EyeOff, Search, Bell, ChevronRight, ArrowUpRight, 
  ArrowDownLeft, ShieldCheck, Lock, Sparkles, CreditCard, 
  TrendingUp, HelpCircle, Phone, ArrowRight, RefreshCw, Send,
  FileText, CheckCircle2, UserCheck, Layers, DollarSign, Wallet
} from 'lucide-react';
import { formatIndianCurrency, formatDate } from '@/lib/utils';
import './dashboard.css';

export default function DashboardPage() {
  const router = useRouter();
  const { logout, user: authUser } = useAuthStore();
  const [showBalance, setShowBalance] = useState(false);
  const [liteSwitch, setLiteSwitch] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.get().then(r => r.data),
  });

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const user = data?.user || authUser || { full_name: 'Dumpala' };
  const accounts = data?.accounts || [];
  const recentTransactions = data?.recent_transactions || [];
  const totalBalance = data?.total_balance || 245890.50;

  // Initial user name uppercase greeting matching Screenshot 2
  const nameParts = user.full_name ? user.full_name.split(' ') : ['Dumpala'];
  const firstName = nameParts[0];
  const userInitials = nameParts.map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'DV';

  return (
    <div className="dashboard-wrapper">
      
      {/* ================= HEADER (app-latest-header matching Screenshot 2) ================= */}
      <header className="dash-header">
        
        {/* Top Dark Purple Bar */}
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
                <button 
                  type="button" 
                  onClick={() => setLiteSwitch(!liteSwitch)}
                  className={`switch-badge ${liteSwitch ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}
                >
                  {liteSwitch ? 'ON' : 'OFF'}
                </button>
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
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
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
                  <div 
                    onClick={() => setActiveTab(tab)} 
                    className={`dash-nav-link ${activeTab === tab ? 'active' : ''}`}
                  >
                    <span>{tab}</span>
                    {activeTab === tab && <div className="dash-nav-indicator" />}
                  </div>
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
              <div className="dash-user-profile-badge">
                <div className="dash-user-avatar-circle">{userInitials}</div>
                <span>My Profile</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ================= MAIN DASHBOARD BODY (Screenshot 2 Exact Replicated) ================= */}
      <main className="dash-main-container">
        
        {/* Top Greeting */}
        <h1 className="dash-greeting-text">
          Hello {firstName}, Let&apos;s get started!
        </h1>

        {/* Feature Circles Story Carousel (Exact 8 items from Screenshot 2) */}
        <div className="dash-stories-carousel">
          {[
            { label: 'Welcome to Yono', icon: Sparkles },
            { label: 'Fraud Awareness', icon: ShieldCheck },
            { label: 'Tax Related Services', icon: FileText },
            { label: 'e-Secure Lock', icon: Lock },
            { label: 'Sustainability', icon: CheckCircle2 },
            { label: 'SIP', icon: TrendingUp },
            { label: 'Credit Card', icon: CreditCard },
            { label: 'Invest Now', icon: DollarSign },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="dash-story-item">
                <div className="dash-story-circle">
                  <Icon size={22} />
                </div>
                <span className="dash-story-label">{item.label}</span>
              </div>
            );
          })}
          <div className="dash-story-item">
            <div className="dash-story-circle bg-gray-100 border-gray-300 text-gray-600">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>

        {/* ================= RELATIONSHIP OVERVIEW CARDS ================= */}
        <section className="relationship-overview-section">
          <div className="relationship-header-row">
            <h2 className="relationship-title">Relationship Overview</h2>
            <Link href="/accounts" className="view-accounts-btn">
              View All Accounts <ChevronRight size={14} />
            </Link>
          </div>

          <div className="relationship-cards-grid">
            
            {/* Card 1: TRANSACTION ACCOUNTS (Magenta Gradient Card) */}
            <div className="card-transaction-accounts">
              <div>
                <div className="card-top-row">
                  <span className="card-title-text">TRANSACTION ACCOUNTS</span>
                  <button 
                    type="button" 
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white opacity-80 hover:opacity-100 bg-none border-0 cursor-pointer"
                    title={showBalance ? "Hide Balance" : "Show Balance"}
                  >
                    {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="card-combined-balance-label">Combined Balance</div>
                <div className="card-balance-amount">
                  {showBalance ? formatIndianCurrency(totalBalance) : '₹XXXX.XX'}
                </div>
              </div>

              <div className="card-bottom-actions">
                <Link href="/accounts" className="card-action-link">View Accounts</Link>
                <Link href="/transactions" className="card-action-link">Transactions</Link>
              </div>
            </div>

            {/* Card 2: DEPOSITS (Lavender Card) */}
            <div className="card-lavender">
              <div>
                <span className="card-lavender-title">DEPOSITS</span>
                <p className="card-lavender-desc">
                  Grow your money faster <br />
                  <span className="text-xs text-gray-500 font-normal">Check out our high-yield deposits</span>
                </p>
              </div>
              <div>
                <Link href="/web/personal-banking/accounts/saving-account" className="card-lavender-link">
                  Explore →
                </Link>
              </div>
            </div>

            {/* Card 3: LOANS (Lavender Card) */}
            <div className="card-lavender">
              <div>
                <span className="card-lavender-title">LOANS</span>
                <p className="card-lavender-desc">
                  Find the perfect loan <br />
                  <span className="text-xs text-gray-500 font-normal">Ready to make that big purchase?</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Link href="/transfers" className="card-lavender-link">
                  Manage loans →
                </Link>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-purple-900 shadow-sm cursor-pointer">
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= TWO COLUMN LAYOUT (Left Services & Recent Txns / Right Sidebar Products) ================= */}
        <div className="dashboard-two-col">
          
          {/* Left Column */}
          <div className="space-y-6">
            
            {/* Payments & Transfers Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-slate-800">Payments &amp; Transfers</h3>
                <Link href="/transfers" className="text-xs font-bold text-purple-900 hover:underline">
                  View All Transfers →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Quick Transfer', href: '/transfers?type=NEFT', icon: Send, bg: 'bg-purple-50 text-purple-900' },
                  { label: 'Send Money', href: '/transfers', icon: ArrowUpRight, bg: 'bg-pink-50 text-pink-700' },
                  { label: 'Manage Payee', href: '/transfers/beneficiaries', icon: UserCheck, bg: 'bg-blue-50 text-blue-700' },
                  { label: 'Bill Payments', href: '/transfers', icon: CreditCard, bg: 'bg-amber-50 text-amber-800' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={idx} 
                      href={item.href}
                      className="flex flex-col items-center p-3 rounded-xl border border-gray-100 hover:shadow-md transition-all text-center group"
                    >
                      <div className={`w-11 h-11 rounded-full ${item.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Accounts Summary & Recent Transactions Table */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-slate-800">Recent Transactions</h3>
                <Link href="/transactions" className="text-xs font-bold text-purple-900 hover:underline">
                  Full History →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 font-bold">
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Ref No.</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-gray-400">
                          No recent transaction records found.
                        </td>
                      </tr>
                    ) : (
                      recentTransactions.slice(0, 5).map((txn: any) => (
                        <tr key={txn.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3 font-semibold text-slate-700">{formatDate(txn.value_date, 'short')}</td>
                          <td className="py-3 max-w-[200px] truncate text-slate-800 font-medium">{txn.description}</td>
                          <td className="py-3 font-mono text-[10px] text-gray-400">{txn.transaction_ref?.slice(0, 10)}...</td>
                          <td className={`py-3 text-right font-bold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                            {txn.type === 'credit' ? '+' : '-'}{formatIndianCurrency(txn.amount)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column Sidebar Panels (Screenshot 2 Exact) */}
          <div>
            
            {/* Investments Box */}
            <div className="product-widget-box">
              <div className="widget-header-row">
                <span className="widget-title">Investments</span>
                <a href="https://www.sbisecurities.in/" target="_blank" rel="noopener noreferrer" className="widget-view-all">View All</a>
              </div>
              <div className="widget-icons-grid">
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><TrendingUp size={18} /></div>
                  <span className="widget-icon-label">Mutual Funds</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><Layers size={18} /></div>
                  <span className="widget-icon-label">Demat &amp; Securities</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><FileText size={18} /></div>
                  <span className="widget-icon-label">NPS</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><Wallet size={18} /></div>
                  <span className="widget-icon-label">PPF</span>
                </div>
              </div>
            </div>

            {/* Loans Box */}
            <div className="product-widget-box">
              <div className="widget-header-row">
                <span className="widget-title">Loans</span>
                <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="widget-view-all">View All</a>
              </div>
              <div className="widget-icons-grid">
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><DollarSign size={18} /></div>
                  <span className="widget-icon-label">Personal Loan</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><TrendingUp size={18} /></div>
                  <span className="widget-icon-label">Loan Against Mutual Fund</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><Lock size={18} /></div>
                  <span className="widget-icon-label">Home Loan</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><Sparkles size={18} /></div>
                  <span className="widget-icon-label">Gold Loan</span>
                </div>
              </div>
            </div>

            {/* Deposits Box */}
            <div className="product-widget-box">
              <div className="widget-header-row">
                <span className="widget-title">Deposits</span>
              </div>
              <div className="widget-icons-grid">
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><Lock size={18} /></div>
                  <span className="widget-icon-label">Fixed Deposit</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><RefreshCw size={18} /></div>
                  <span className="widget-icon-label">Recurring Deposit</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><Wallet size={18} /></div>
                  <span className="widget-icon-label">Annuity Deposit</span>
                </div>
                <div className="widget-icon-item">
                  <div className="widget-icon-box"><Layers size={18} /></div>
                  <span className="widget-icon-label">Auto Sweep</span>
                </div>
              </div>
            </div>

            {/* Insurance Box */}
            <div className="product-widget-box">
              <div className="widget-header-row">
                <span className="widget-title">Insurance</span>
                <a href="https://www.sbigeneral.in" target="_blank" rel="noopener noreferrer" className="widget-view-all">View All</a>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-xl">
                <ShieldCheck size={28} className="text-purple-900" />
                <div>
                  <p className="text-xs font-bold text-slate-800">Comprehensive SBI Health Cover</p>
                  <p className="text-[10px] text-gray-500">Protect your family with zero hassle</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="dash-footer">
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
