'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  ChevronLeft, ChevronRight, Upload, CreditCard, Search, Bell, HelpCircle, 
  CheckCircle, ArrowRight, ShieldCheck, Download, RefreshCw, Copy
} from 'lucide-react';
import './quick-transfer.css';

// Custom SVG Logos for 12 Popular Indian Banks
const BankLogos: Record<string, JSX.Element> = {
  'sbi': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="50" fill="#00A5EC"/>
      <circle cx="50" cy="35" r="16" fill="#FFFFFF"/>
      <rect x="44" y="35" width="12" height="42" fill="#FFFFFF"/>
    </svg>
  ),
  'hdfc': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#004B8D"/>
      <rect x="15" y="15" width="70" height="70" stroke="#ED232A" strokeWidth="12" fill="none"/>
      <rect x="35" y="35" width="30" height="30" fill="#004B8D"/>
      <rect x="42" y="10" width="16" height="80" fill="#FFFFFF"/>
      <rect x="10" y="42" width="80" height="16" fill="#FFFFFF"/>
    </svg>
  ),
  'icici': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#F37023"/>
      <path d="M25 75 C 25 35, 75 35, 75 75 M 50 25 L 50 50" stroke="#052F6B" strokeWidth="14" strokeLinecap="round"/>
      <circle cx="50" cy="30" r="8" fill="#052F6B"/>
    </svg>
  ),
  'axis': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#971237"/>
      <polygon points="50,15 80,75 60,75 50,50 40,75 20,75" fill="#FFFFFF"/>
    </svg>
  ),
  'kotak': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#ED1C24"/>
      <path d="M25 50 C 25 30, 50 30, 50 50 C 50 70, 75 70, 75 50" stroke="#FFFFFF" strokeWidth="12" fill="none" strokeLinecap="round"/>
      <circle cx="75" cy="50" r="7" fill="#003366"/>
    </svg>
  ),
  'bob': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#F26522"/>
      <text x="50" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="60" fontWeight="900" fontFamily="sans-serif">B</text>
    </svg>
  ),
  'pnb': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#A20636"/>
      <rect x="25" y="25" width="50" height="50" fill="#FFC20E" rx="8"/>
      <text x="50" y="62" textAnchor="middle" fill="#A20636" fontSize="40" fontWeight="900">P</text>
    </svg>
  ),
  'yes': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#005A9C"/>
      <path d="M20 50 L45 75 L80 25" stroke="#EE3124" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'boi': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#F37023"/>
      <polygon points="50,15 62,38 87,42 68,60 73,85 50,73 27,85 32,60 13,42 38,38" fill="#FFFFFF"/>
    </svg>
  ),
  'idbi': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#006837"/>
      <circle cx="50" cy="50" r="30" fill="#F37023"/>
      <circle cx="50" cy="50" r="14" fill="#FFFFFF"/>
    </svg>
  ),
  'union': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#004B8D"/>
      <path d="M30 25 L30 55 C30 68 40 75 50 75 C60 75 70 68 70 55 L70 25" stroke="#EE1C25" strokeWidth="14" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  'indusind': (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="12" fill="#800020"/>
      <path d="M30 70 L30 30 L60 30 C70 30 75 40 75 50 C75 60 70 70 60 70 Z" fill="#FFFFFF"/>
    </svg>
  )
};

interface PopularBank {
  id: string;
  name: string;
  ifscPrefix: string;
}

const POPULAR_BANKS: PopularBank[] = [
  { id: 'sbi', name: 'SBI Bank', ifscPrefix: 'SBIN' },
  { id: 'hdfc', name: 'HDFC', ifscPrefix: 'HDFC' },
  { id: 'icici', name: 'ICICI', ifscPrefix: 'ICIC' },
  { id: 'axis', name: 'Axis Bank', ifscPrefix: 'UTIB' },
  { id: 'kotak', name: 'Kotak Bank', ifscPrefix: 'KKBK' },
  { id: 'bob', name: 'BOB', ifscPrefix: 'BARB' },
  { id: 'pnb', name: 'PNB', ifscPrefix: 'PUNB' },
  { id: 'yes', name: 'Yes Bank', ifscPrefix: 'YESB' },
  { id: 'boi', name: 'BOI', ifscPrefix: 'BKID' },
  { id: 'idbi', name: 'IDBI', ifscPrefix: 'IBKL' },
  { id: 'union', name: 'Union Bank', ifscPrefix: 'UBIN' },
  { id: 'indusind', name: 'IndusInd', ifscPrefix: 'INDB' },
];

const ALL_OTHER_BANKS = [
  "Canara Bank", "Bank of Maharashtra", "Indian Bank", "Central Bank of India",
  "Federal Bank", "IDFC FIRST Bank", "Standard Chartered Bank", "HSBC India",
  "RBL Bank", "Bandhan Bank", "UCO Bank", "Punjab & Sind Bank", "South Indian Bank",
  "Karur Vysya Bank", "City Union Bank", "Tamilnad Mercantile Bank"
];

export default function QuickTransferPage() {
  const router = useRouter();
  
  // Stepper state: 1: Bank Selection, 2: Payee Details, 3: Authentication, 4: Receipt
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Form fields
  const [selectedBank, setSelectedBank] = useState<PopularBank | null>(POPULAR_BANKS[0]);
  const [customBank, setCustomBank] = useState<string>('');
  const [payeeName, setPayeeName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [confirmAccountNumber, setConfirmAccountNumber] = useState<string>('');
  const [ifscCode, setIfscCode] = useState<string>('SBIN0001234');
  const [amount, setAmount] = useState<string>('');
  const [transferMode, setTransferMode] = useState<'IMPS' | 'NEFT' | 'RTGS'>('IMPS');
  const [remarks, setRemarks] = useState<string>('Quick Transfer');
  const [sourceAccount] = useState<string>('SBIN - 30891245981 (Balance: ₹1,24,500.00)');
  
  // OTP state
  const [otpInput, setOtpInput] = useState<string>('');
  const [referenceId] = useState<string>(`SBIN${Math.floor(100000000000 + Math.random() * 900000000000)}`);

  const handleBankSelect = (bank: PopularBank) => {
    setSelectedBank(bank);
    setIfscCode(`${bank.ifscPrefix}0001234`);
  };

  const handleNextToStep2 = () => {
    if (!selectedBank && !customBank) {
      toast.error('Please select a payee bank to proceed');
      return;
    }
    setCurrentStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payeeName.trim()) {
      toast.error('Please enter Payee Name');
      return;
    }
    if (!accountNumber || accountNumber.length < 9) {
      toast.error('Please enter a valid Account Number (min 9 digits)');
      return;
    }
    if (accountNumber !== confirmAccountNumber) {
      toast.error('Account numbers do not match!');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid Amount');
      return;
    }
    if (parseFloat(amount) > 50000) {
      toast.error('Quick Transfer limit is ₹50,000');
      return;
    }
    setCurrentStep(3);
    toast.success('OTP sent to your registered mobile number!');
  };

  const handleConfirmTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput || otpInput.length < 4) {
      toast.error('Please enter 6-digit OTP');
      return;
    }
    setCurrentStep(4);
    toast.success('Fund transfer completed successfully!');
  };

  const handleQuickAmount = (val: number) => {
    setAmount(val.toString());
  };

  return (
    <div className="qt-container">
      {/* ================= HEADER ================= */}
      <header className="w-full">
        {/* Dark Purple Top Bar */}
        <div className="qt-top-bar">
          <div className="qt-top-bar-inner">
            <div className="flex items-center gap-2">
              <button type="button" className="bg-white text-[#302985] font-bold px-3 py-1 rounded-t text-xs">
                Banking
              </button>
              <button type="button" className="text-white/80 hover:text-white px-3 py-1 text-xs">
                Lifestyle
              </button>
              <button type="button" className="text-white/80 hover:text-white px-3 py-1 text-xs">
                Rewards
              </button>
              <div className="flex items-center gap-1.5 ml-4 font-semibold text-xs text-white">
                <span>YONO Net Banking Lite</span>
                <span className="bg-gray-400 text-white px-1.5 py-0.5 rounded text-[10px]">OFF</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/90">
              <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                <HelpCircle size={13} />
                Get Help
              </a>
              <span><b>022-20744646</b> (8AM-8PM) | ynbsupport@sbi.co.in | <b>1800-11-1101</b> (24x7)</span>
              <span>English ▾</span>
              <span className="font-bold cursor-pointer">- A +</span>
              <button type="button" onClick={() => router.push('/auth/login')} className="border border-white/60 hover:bg-white/10 px-2 py-0.5 rounded text-xs">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main White Header */}
        <nav className="qt-main-nav" aria-label="Quick Transfer Navigation">
          <div className="qt-main-nav-inner">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img 
                src="/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/new_horz_logo_net_banking_svg" 
                alt="YONO SBI Net-Banking Logo" 
                className="h-8 object-contain"
              />
            </Link>

            <ul className="flex items-center gap-4">
              {['Overview', 'Accounts', 'Payments', 'Deposits', 'Loans', 'Cards', 'Investments', 'Insurance', 'Services'].map((tab) => (
                <li key={tab}>
                  <Link 
                    href={tab === 'Overview' ? '/dashboard' : '#'}
                    className={`qt-nav-link ${tab === 'Payments' ? 'active' : ''}`}
                  >
                    <span>{tab}</span>
                    {tab === 'Payments' && <div className="qt-nav-active-line" />}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <button type="button" className="text-gray-600 hover:text-[#302985]">
                <Search size={18} />
              </button>
              <button type="button" className="text-gray-600 hover:text-[#302985] relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">2</span>
              </button>
              <div className="flex items-center gap-2 bg-[#f1f5f9] px-2.5 py-1 rounded-full border border-slate-200">
                <div className="w-7 h-7 rounded-full bg-[#302985] text-white flex items-center justify-center font-bold text-xs">DV</div>
                <span className="text-xs font-bold text-slate-700">My Profile</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ================= SUB-HEADER & STEPPER ================= */}
      <div className="qt-sub-header">
        <div className="qt-stepper-container">
          <Link href="/dashboard" className="qt-back-link">
            <ChevronLeft size={14} /> Back to Home
          </Link>

          <h1 className="qt-title">Quick Transfer</h1>

          {/* Stepper Tabs */}
          <div className="qt-stepper-track">
            {[
              { id: 1, label: 'Bank Selection' },
              { id: 2, label: 'Payee and Transaction Details' },
              { id: 3, label: 'Authentication' },
              { id: 4, label: 'Receipt' },
            ].map((st) => (
              <div 
                key={st.id} 
                onClick={() => {
                  if (st.id < currentStep) setCurrentStep(st.id);
                }}
                className={`qt-step-item ${currentStep === st.id ? 'active' : ''} ${currentStep > st.id ? 'completed cursor-pointer' : ''}`}
              >
                <span>{st.label}</span>
                {currentStep === st.id && <div className="qt-step-line" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT BODY ================= */}
      <main className="qt-content-body">
        
        {/* STEP 1: BANK SELECTION (Pixel Perfect match to 2nd Image) */}
        {currentStep === 1 && (
          <div className="qt-card">
            <div className="qt-card-header">
              <h2 className="qt-card-title">Select Payee Bank</h2>

              <div className="flex items-center gap-3">
                <button type="button" className="qt-action-btn" onClick={() => toast('Upload Cheque Feature')}>
                  <Upload size={16} /> Upload cheque
                </button>
                <button type="button" className="qt-action-btn" onClick={() => toast('MMID Transfer')}>
                  <CreditCard size={16} /> Use MMID
                </button>
              </div>
            </div>

            <div className="qt-section-heading">Popular Banks</div>

            {/* 12 Bank Grid */}
            <div className="qt-bank-grid">
              {POPULAR_BANKS.map((b) => (
                <div 
                  key={b.id} 
                  onClick={() => handleBankSelect(b)}
                  className={`qt-bank-card ${selectedBank?.id === b.id ? 'selected' : ''}`}
                >
                  <div className="qt-bank-icon-box">
                    {BankLogos[b.id]}
                  </div>
                  <span className="qt-bank-label">{b.name}</span>
                </div>
              ))}
            </div>

            {/* All Banks Section */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="qt-section-heading">All Banks</div>
              <div className="max-w-md">
                <select 
                  value={customBank} 
                  onChange={(e) => {
                    setCustomBank(e.target.value);
                    if (e.target.value) setSelectedBank(null);
                  }}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#302985] outline-none"
                >
                  <option value="">-- Select from other banks in India --</option>
                  {ALL_OTHER_BANKS.map((ob) => (
                    <option key={ob} value={ob}>{ob}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Floating Bottom Bar: Up Next */}
            <div className="qt-bottom-nav">
              <button 
                type="button" 
                onClick={handleNextToStep2}
                className="qt-next-btn hover:opacity-90 transition-opacity"
              >
                <span className="qt-next-subtitle">up next</span>
                <span className="qt-next-title">
                  Payee and Transaction Details <ChevronRight size={18} />
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PAYEE & TRANSACTION DETAILS */}
        {currentStep === 2 && (
          <div className="qt-card max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-200">
              <h2 className="qt-card-title">Payee and Transaction Details</h2>
              <span className="text-xs bg-purple-50 text-[#302985] font-bold px-3 py-1 rounded-full border border-purple-200">
                Selected: {selectedBank ? selectedBank.name : customBank || 'Bank'}
              </span>
            </div>

            <form onSubmit={handleNextToStep3} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payee Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="Enter recipient full name as per bank account"
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-none focus:border-[#302985] focus:ring-1 focus:ring-[#302985]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Number *</label>
                  <input 
                    type="password"
                    required
                    placeholder="Enter account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-none focus:border-[#302985] focus:ring-1 focus:ring-[#302985]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Re-enter Account Number *</label>
                  <input 
                    type="text"
                    required
                    placeholder="Re-enter account number"
                    value={confirmAccountNumber}
                    onChange={(e) => setConfirmAccountNumber(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-none focus:border-[#302985] focus:ring-1 focus:ring-[#302985]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">IFSC Code *</label>
                  <input 
                    type="text"
                    required
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    className="w-full p-2.5 border border-slate-300 rounded-md text-sm font-mono font-bold uppercase outline-none focus:border-[#302985]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transfer Mode</label>
                  <div className="flex gap-2">
                    {(['IMPS', 'NEFT', 'RTGS'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setTransferMode(mode)}
                        className={`flex-1 py-2 text-xs font-bold rounded border ${transferMode === mode ? 'bg-[#302985] text-white border-[#302985]' : 'bg-slate-50 text-slate-700 border-slate-300'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount (₹) * [Max ₹50,000]</label>
                <input 
                  type="number"
                  required
                  placeholder="0.00"
                  max={50000}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-md text-lg font-bold text-[#302985] outline-none focus:border-[#302985]"
                />
                
                {/* Quick Chips */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[500, 1000, 5000, 10000, 25000, 50000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleQuickAmount(val)}
                      className={`qt-amount-chip ${amount === val.toString() ? 'active' : ''}`}
                    >
                      + ₹{val.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Source Account</label>
                <select 
                  value={sourceAccount}
                  onChange={() => {}}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-md text-sm font-semibold text-slate-800"
                >
                  <option>{sourceAccount}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Remarks / Purpose</label>
                <input 
                  type="text"
                  placeholder="e.g. Rent, Investment, Family support"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-none focus:border-[#302985]"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  ← Back to Bank Selection
                </button>
                <button 
                  type="submit"
                  className="bg-[#302985] text-white px-6 py-2.5 rounded-md text-sm font-bold hover:bg-[#252069] flex items-center gap-2"
                >
                  Proceed to Authentication <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: AUTHENTICATION / OTP */}
        {currentStep === 3 && (
          <div className="qt-card max-w-xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-purple-100 text-[#302985] rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={28} />
              </div>
              <h2 className="qt-card-title">OTP Authentication</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter 6-digit One Time Password sent to registered mobile <b className="text-slate-700">+91 ***** *9802</b>
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Payee Name:</span>
                <span className="font-bold text-slate-800">{payeeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Bank & Account:</span>
                <span className="font-bold text-slate-800">{selectedBank?.name || customBank} ({accountNumber})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transfer Amount:</span>
                <span className="font-bold text-[#302985] text-sm">₹{parseFloat(amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmTransfer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-center">Enter 6-Digit OTP</label>
                <input 
                  type="text"
                  maxLength={6}
                  required
                  placeholder="1 2 3 4 5 6"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full text-center tracking-widest text-2xl font-mono font-bold p-3 border-2 border-purple-300 rounded-lg outline-none focus:border-[#302985]"
                />
              </div>

              {/* Demo OTP Helper */}
              <div className="flex justify-between items-center text-xs">
                <button 
                  type="button" 
                  onClick={() => {
                    setOtpInput('123456');
                    toast.success('Demo OTP 123456 filled!');
                  }}
                  className="text-purple-700 font-bold hover:underline"
                >
                  Auto-fill Demo OTP (123456)
                </button>
                <button type="button" onClick={() => toast.success('New OTP sent')} className="text-slate-500 hover:text-slate-800 flex items-center gap-1">
                  <RefreshCw size={12} /> Resend OTP
                </button>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 border border-slate-300 rounded-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-[#302985] text-white py-2.5 rounded-md text-xs font-bold hover:bg-[#252069]"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: RECEIPT */}
        {currentStep === 4 && (
          <div className="qt-card max-w-xl mx-auto">
            <div className="qt-receipt-banner">
              <CheckCircle size={48} className="mx-auto mb-2 text-white" />
              <h2 className="text-xl font-bold">Transfer Successful!</h2>
              <p className="text-xs text-white/90 mt-1">Ref No: {referenceId}</p>
            </div>

            <div className="space-y-1 mb-6">
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">Amount Transferred:</span>
                <span className="qt-receipt-value text-[#302985] text-base">₹{parseFloat(amount || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">Beneficiary Name:</span>
                <span className="qt-receipt-value">{payeeName}</span>
              </div>
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">Beneficiary Bank:</span>
                <span className="qt-receipt-value">{selectedBank?.name || customBank}</span>
              </div>
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">Account Number:</span>
                <span className="qt-receipt-value">XXXXXX{accountNumber.slice(-4)}</span>
              </div>
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">IFSC Code:</span>
                <span className="qt-receipt-value font-mono">{ifscCode}</span>
              </div>
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">Transfer Mode:</span>
                <span className="qt-receipt-value">{transferMode}</span>
              </div>
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">Date & Time:</span>
                <span className="qt-receipt-value">{new Date().toLocaleString('en-IN')}</span>
              </div>
              <div className="qt-receipt-row">
                <span className="qt-receipt-label">Charges:</span>
                <span className="qt-receipt-value text-emerald-600">₹0.00 (Free)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                type="button" 
                onClick={() => toast.success('Receipt downloaded as PDF!')}
                className="flex-1 border border-[#302985] text-[#302985] py-2.5 rounded-md text-xs font-bold flex items-center justify-center gap-2 hover:bg-purple-50"
              >
                <Download size={14} /> Download Receipt
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setCurrentStep(1);
                  setAmount('');
                  setPayeeName('');
                  setAccountNumber('');
                  setConfirmAccountNumber('');
                }}
                className="flex-1 bg-[#302985] text-white py-2.5 rounded-md text-xs font-bold hover:bg-[#252069]"
              >
                Make Another Transfer
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto py-4 bg-white border-t border-slate-200 text-center text-xs text-slate-600">
        <div className="flex justify-center items-center gap-4">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
