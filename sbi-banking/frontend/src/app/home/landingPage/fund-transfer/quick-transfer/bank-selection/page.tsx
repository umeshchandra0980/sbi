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
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

// Custom SVG Logos for 12 Popular Indian Banks
const BankLogos: Record<string, JSX.Element> = {
  'sbi': (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="#00a5ec"/>
      <circle cx="50" cy="50" r="13" fill="#ffffff"/>
      <rect x="45.5" y="50" width="9" height="42" fill="#ffffff"/>
    </svg>
  ),
  'hdfc': (
    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#004b8d" rx="6"/>
      <rect x="15" y="15" width="70" height="70" stroke="#ed1c24" strokeWidth="12" fill="none"/>
      <rect x="44" y="15" width="12" height="70" fill="#ffffff"/>
      <rect x="15" y="44" width="70" height="12" fill="#ffffff"/>
      <rect x="42" y="42" width="16" height="16" fill="#004b8d"/>
    </svg>
  ),
  'icici': (
    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(-15 50 50)">
        <ellipse cx="50" cy="50" rx="42" ry="32" fill="#b02a30" />
        <path d="M15 58 A 38 28 0 0 0 78 68" stroke="#f37321" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path d="M42 36 V 65 C42 68, 48 68, 52 64" stroke="#ffffff" strokeWidth="9" strokeLinecap="round" fill="none" />
        <circle cx="42" cy="21" r="7.5" fill="#ffffff" />
      </g>
    </svg>
  ),
  'axis': (
    <svg width="45" height="40" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M51 15 L23 68 H38 L51 40 L64 68 H79 L51 15 Z" fill="#971237"/>
      <path d="M51 40 L69 53 H53 L51 46 Z" fill="#971237" />
    </svg>
  ),
  'kotak': (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" fill="#003366" />
      <circle cx="50" cy="50" r="38" stroke="#ed1c24" strokeWidth="6" fill="none"/>
      <path d="M35 50 C35 35, 50 35, 50 50 C50 65, 65 65, 65 50" stroke="#ffffff" strokeWidth="9" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  'bob': (
    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 20 H54 C66 20, 72 26, 72 37 C72 45, 66 50, 58 52 C68 54, 74 61, 74 73 C74 85, 66 90, 52 90 H22 Z" fill="#f05a28" />
      <rect x="36" y="32" width="18" height="13" rx="3" fill="#ffffff" />
      <rect x="36" y="62" width="22" height="16" rx="3" fill="#ffffff" />
      <path d="M12 25 L3 20 M12 37 L2 35 M12 50 L2 50 M12 63 L2 65 M12 75 L3 80" stroke="#f05a28" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M14 30 L6 26 M14 44 L6 43 M14 56 L6 57 M14 69 L7 72" stroke="#f05a28" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  ),
  'pnb': (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill="#a20636"/>
      <circle cx="50" cy="50" r="28" stroke="#f8c301" strokeWidth="11" fill="none" />
      <rect x="44.5" y="50" width="11" height="28" fill="#a20636" />
    </svg>
  ),
  'yes': (
    <svg width="50" height="35" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 45 L40 68 L105 15" stroke="#005a9c" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M38 65 Q 65 65, 95 40" stroke="#ed1c24" strokeWidth="6.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
  'boi': (
    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,6 62,37 94,37 68,56 78,87 50,68 22,87 32,56 6,37 38,37" fill="#f25a29"/>
      <circle cx="50" cy="50" r="9" fill="#ffffff" stroke="#0054a6" strokeWidth="1.8" />
      <rect x="48" y="46" width="4" height="7" fill="#0054a6" rx="0.5" />
      <line x1="46" y1="46" x2="54" y2="46" stroke="#0054a6" strokeWidth="1" />
      <line x1="47" y1="52" x2="53" y2="52" stroke="#0054a6" strokeWidth="1" />
    </svg>
  ),
  'idbi': (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" stroke="#006837" strokeWidth="8" fill="none" />
      <circle cx="50" cy="50" r="28" fill="#f37023" />
      <circle cx="50" cy="50" r="14" fill="#ffffff" />
      <rect x="45" y="32" width="10" height="36" fill="#ffffff" />
    </svg>
  ),
  'union': (
    <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 25 V52 C24 64, 34 72, 46 72 C58 72, 68 64, 68 52 V25" stroke="#ee1c25" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M36 25 V48 C36 56, 42 62, 50 62 C58 62, 64 56, 64 48 V25" stroke="#004b8d" strokeWidth="13" strokeLinecap="round" fill="none" />
    </svg>
  ),
  'indusind': (
    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#841a1c" />
      <path d="M25 55 C25 42, 34 30, 48 30 C58 30, 68 40, 78 45 L88 35 L83 50 C88 55, 88 65, 83 70 C78 75, 68 80, 50 80 C34 80, 25 68, 25 55 Z" fill="#ffffff" />
      <path d="M20 50 L10 45 M22 65 L10 68" stroke="#ffffff" strokeWidth="3" />
      <circle cx="50" cy="50" r="4.5" fill="#841a1c" />
    </svg>
  )
};;

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

const ALL_BANKS_LIST = [
  // Left Column
  { id: 'arunachal', name: 'Arunachal Pradesh Rural Bank', icon: 'temple' },
  { id: 'axis', name: 'AXIS BANK', icon: 'axis' },
  { id: 'boi', name: 'BANK OF INDIA', icon: 'boi' },
  { id: 'canara', name: 'CANARA BANK', icon: 'canara' },
  { id: 'citi', name: 'CITI BANK', icon: 'citi' },
  { id: 'ellaquai', name: 'ELLAQUAI DEHATI BANK RRB', icon: 'temple' },
  { id: 'hdfc', name: 'HDFC BANK', icon: 'hdfc' },
  { id: 'idbi', name: 'IDBI BANK', icon: 'idbi' },
  { id: 'iob', name: 'INDIAN OVERSEAS BANK', icon: 'iob' },
  { id: 'jharkhand_g', name: 'Jharkhand Gramin Bank', icon: 'temple' },
  { id: 'kvb', name: 'KARUR VYSYA BANK', icon: 'kvb' },
  { id: 'madhya_b', name: 'MADHYA BHARAT GRAMIN BANK', icon: 'temple' },
  { id: 'meghalaya_r', name: 'MEGHALAYA RURAL BANK RRB', icon: 'temple' },
  { id: 'mizoram_r', name: 'MIZORAM RURAL BANK RRB', icon: 'temple' },
  { id: 'nagaland_r', name: 'NAGALAND RURAL BANK RRB', icon: 'temple' },
  { id: 'sib', name: 'SOUTH INDIAN BANK', icon: 'sib' },
  { id: 'telangana_g', name: 'TELANGANA GRAMEENA BANK', icon: 'temple' },
  { id: 'ccil', name: 'THE CLEARING CORPORATION OF INDIA LTD', icon: 'temple' },
  { id: 'union', name: 'UNION BANK OF INDIA', icon: 'union' },
  { id: 'uttarakhand_g', name: 'Uttarakhand Gramin Bank', icon: 'temple' },
  { id: 'uttaranchal_g', name: 'UTTARANCHAL GRAMIN BANK', icon: 'temple' },
  { id: 'yes', name: 'YES BANK', icon: 'yes' },

  // Right Column
  { id: 'arunachal_n', name: 'ARUNACHAL PRADESH RURAL BANK NAHARILAGUN RRB', icon: 'temple' },
  { id: 'bob', name: 'BANK OF BARODA', icon: 'bob' },
  { id: 'maharashtra', name: 'BANK OF MAHARASHTRA', icon: 'maharashtra' },
  { id: 'central_b', name: 'CENTRAL BANK OF INDIA', icon: 'central_b' },
  { id: 'deccan_g', name: 'DECCAN GRAMEENA BANK', icon: 'temple' },
  { id: 'federal', name: 'FEDERAL BANK', icon: 'federal' },
  { id: 'icici', name: 'ICICI BANK LIMITED', icon: 'icici' },
  { id: 'indian_b', name: 'INDIAN BANK', icon: 'indian_b' },
  { id: 'indusind', name: 'INDUSIND BANK', icon: 'indusind' },
  { id: 'jharkhand_rg', name: 'JHARKHAND RAJYA GRAMIN BANK', icon: 'temple' },
  { id: 'kotak', name: 'KOTAK MAHINDRA BANK LIMITED', icon: 'kotak' },
  { id: 'meghalaya', name: 'Meghalaya Rural Bank', icon: 'temple' },
  { id: 'mizoram', name: 'Mizoram Rural Bank', icon: 'temple' },
  { id: 'nagaland', name: 'Nagaland Rural Bank', icon: 'temple' },
  { id: 'pnb', name: 'PUNJAB NATIONAL BANK', icon: 'pnb' },
  { id: 'sbi', name: 'STATE BANK OF INDIA', icon: 'sbi' },
  { id: 'adarsh', name: 'THE ADARSH COOPERATIVE URBAN BANK LIMITED', icon: 'temple' },
  { id: 'rajkot', name: 'THE COOPERATIVE BANK OF RAJKOT LIMITED', icon: 'temple' },
  { id: 'utkal_g', name: 'UTKAL GRAMYA BANK RRB', icon: 'temple' },
  { id: 'uttarakhand_s', name: 'UTTERAKHAND STATE COOPERATIVE BANK LIMITED', icon: 'temple' },
  { id: 'vikas', name: 'VIKAS SOUHARDA CO OPERATIVE BANK LIMITED', icon: 'temple' },
  { id: 'other', name: 'Other Banks', icon: 'temple' },
];

const renderAllBankIcon = (icon: string) => {
  const isPng = ['axis', 'bob', 'boi', 'hdfc', 'icici'].includes(icon);
  if (isPng) {
    return (
      <div className="w-7 h-7 rounded-sm overflow-hidden relative flex items-center justify-center bg-white border border-slate-100 shrink-0">
        <img 
          src={`/images/${icon}.png`} 
          alt="" 
          className="w-full h-full object-cover select-none transform scale-[2.2] origin-[center_25%]" 
        />
      </div>
    );
  }

  // Pre-existing SVGs from BankLogos
  if (BankLogos[icon]) {
    return (
      <div className="w-7 h-7 flex items-center justify-center shrink-0">
        {React.cloneElement(BankLogos[icon], { width: "24", height: "24" })}
      </div>
    );
  }

  // Fallbacks for other major banks
  if (icon === 'canara') {
    return (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="shrink-0">
        <polygon points="12,30 28,30 20,16" stroke="#0072bc" strokeWidth="3.5" fill="none" />
        <polygon points="16,14 32,14 24,28" stroke="#ffcb05" strokeWidth="3.5" fill="none" />
      </svg>
    );
  }
  if (icon === 'citi') {
    return (
      <svg width="26" height="20" viewBox="0 0 40 30" fill="none" className="shrink-0">
        <path d="M5 22 Q 20 9, 35 22" stroke="#ed1c24" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <text x="20" y="24" fontSize="13" fontWeight="900" fill="#0072bc" textAnchor="middle">citi</text>
      </svg>
    );
  }
  if (icon === 'federal') {
    return (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="shrink-0">
        <rect width="40" height="40" rx="4" fill="#0054a6" />
        <path d="M12 12 H28 M12 20 H24 M12 28 H12" stroke="#ffcb05" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === 'indian_b') {
    return (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="shrink-0">
        <circle cx="16" cy="20" r="10" stroke="#008cc9" strokeWidth="3.5" fill="none" />
        <circle cx="24" cy="20" r="10" stroke="#f47a20" strokeWidth="3.5" fill="none" />
      </svg>
    );
  }
  if (icon === 'central_b') {
    return (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="shrink-0">
        <rect x="8" y="8" width="24" height="24" stroke="#d32f2f" strokeWidth="3.5" fill="none" />
        <path d="M20 8 V32 M8 20 H32" stroke="#d32f2f" strokeWidth="3.5" />
      </svg>
    );
  }
  if (icon === 'iob' || icon === 'maharashtra' || icon === 'kvb' || icon === 'sib') {
    return (
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="shrink-0">
        <circle cx="20" cy="20" r="18" fill="#1e40af" />
        <text x="20" y="24" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">{icon.toUpperCase().slice(0, 3)}</text>
      </svg>
    );
  }

  // Default Temple Icon
  return (
    <svg className="w-5 h-5 text-[#681d82] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M5 21V10 M9 21V10 M13 21V10 M17 21V10" />
      <path d="M3 10L12 3L21 10" />
    </svg>
  );
};

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
  const [allBanksSearch, setAllBanksSearch] = useState<string>('');

  const handleAllBankClick = (bank: { id: string, name: string }) => {
    const foundPopular = POPULAR_BANKS.find(pb => pb.id === bank.id);
    if (foundPopular) {
      handleBankSelect(foundPopular);
      setCustomBank('');
    } else {
      setCustomBank(bank.name);
      setSelectedBank(null);
      setIfscCode('SBIN0001234'); // fallback generic
    }
    toast.success(`Selected bank: ${bank.name}`);
  };

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
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeNav="Payments" />

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

              <div className="flex items-center gap-6">
                <button 
                  type="button" 
                  onClick={() => toast('Upload Cheque Feature')}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-[#681d82] hover:underline bg-transparent border-none cursor-pointer select-none"
                >
                  <svg className="w-4.5 h-4.5 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  <span>Upload cheque</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => toast('MMID Transfer')}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-[#681d82] hover:underline bg-transparent border-none cursor-pointer select-none"
                >
                  <svg className="w-4.5 h-4.5 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M5 21V10 M9 21V10 M13 21V10 M17 21V10" />
                    <path d="M3 10L12 3L21 10" />
                  </svg>
                  <span>Use MMID</span>
                </button>
              </div>
            </div>

            <div className="qt-section-heading">Popular Banks</div>

            {/* 12 Bank Grid */}
            <div className="qt-bank-grid">
              {POPULAR_BANKS.map((b) => {
                const isPngLogo = ['axis', 'bob', 'boi', 'hdfc', 'icici'].includes(b.id);
                return (
                  <div 
                    key={b.id} 
                    onClick={() => handleBankSelect(b)}
                    className={`qt-bank-card ${selectedBank?.id === b.id ? 'selected' : ''}`}
                  >
                    <div className="qt-bank-icon-box overflow-hidden relative">
                      {isPngLogo ? (
                        <img 
                          src={`/images/${b.id}.png`} 
                          alt={b.name} 
                          className="qt-bank-png-logo select-none pointer-events-none" 
                        />
                      ) : (
                        BankLogos[b.id]
                      )}
                    </div>
                    <span className="qt-bank-label">
                      {b.id === 'hdfc' ? 'HDFC' : b.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* All Banks Section */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="text-[16px] font-bold text-[#681d82] mb-4 font-sans uppercase tracking-wide">All Banks</div>
              
              {/* Search Bar with bottom line */}
              <div className="max-w-[320px] mb-6 border-b border-slate-300 py-1 flex items-center select-none">
                <Search size={16} className="text-slate-400 mr-2 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search here..." 
                  value={allBanksSearch}
                  onChange={(e) => setAllBanksSearch(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full text-slate-800 placeholder-slate-400 font-sans" 
                />
              </div>

              {/* Two-Column List of Banks */}
              {(() => {
                const filteredBanks = ALL_BANKS_LIST.filter(bank => 
                  bank.name.toLowerCase().includes(allBanksSearch.toLowerCase())
                );
                const halfLength = Math.ceil(filteredBanks.length / 2);
                const leftColBanks = filteredBanks.slice(0, halfLength);
                const rightColBanks = filteredBanks.slice(halfLength);

                if (filteredBanks.length === 0) {
                  return (
                    <p className="text-xs text-slate-400 italic">No banks matching "{allBanksSearch}"</p>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 items-start max-h-[500px] overflow-y-auto pr-2">
                    {/* Left Column */}
                    <div className="space-y-1">
                      {leftColBanks.map((bank) => {
                        const isSelected = selectedBank?.id === bank.id || customBank === bank.name;
                        return (
                          <div 
                            key={bank.id}
                            onClick={() => handleAllBankClick(bank)}
                            className={`flex items-center gap-3.5 py-2.5 px-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors ${
                              isSelected ? 'bg-purple-50 text-[#681d82] font-semibold border-l-2 border-[#681d82]' : 'text-slate-700'
                            }`}
                          >
                            {renderAllBankIcon(bank.icon)}
                            <span className="text-[12.5px] uppercase font-sans tracking-wide leading-tight">{bank.name}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-1">
                      {rightColBanks.map((bank) => {
                        const isSelected = selectedBank?.id === bank.id || customBank === bank.name;
                        return (
                          <div 
                            key={bank.id}
                            onClick={() => handleAllBankClick(bank)}
                            className={`flex items-center gap-3.5 py-2.5 px-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors ${
                              isSelected ? 'bg-purple-50 text-[#681d82] font-semibold border-l-2 border-[#681d82]' : 'text-slate-700'
                            }`}
                          >
                            {renderAllBankIcon(bank.icon)}
                            <span className="text-[12.5px] uppercase font-sans tracking-wide leading-tight">{bank.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
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
