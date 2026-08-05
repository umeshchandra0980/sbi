'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  ChevronRight, Upload, CreditCard, Bell, HelpCircle, 
  CheckCircle, ArrowRight, ShieldCheck, Download, RefreshCw, Copy
} from 'lucide-react';
import './quick-transfer.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';



const BankLogoUrls: Record<string, string> = {
  'sbi': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sbin_svg',
  'hdfc': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/hdfc_svg',
  'icici': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/icic_svg',
  'axis': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/utib_svg',
  'kotak': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/kkbk_svg',
  'bob': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/barb_svg',
  'pnb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/punb_svg',
  'yes': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/yesb_svg',
  'boi': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/bkid_svg',
  'idbi': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ibkl_svg',
  'union': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ubin_svg',
  'indusind': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/indb_svg'
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
  const iconUrls: Record<string, string> = {
    'sbin': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sbin_svg',
    'sbi': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sbin_svg',
    'hdfc': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/hdfc_svg',
    'icic': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/icic_svg',
    'icici': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/icic_svg',
    'utib': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/utib_svg',
    'axis': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/utib_svg',
    'kkbk': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/kkbk_svg',
    'kotak': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/kkbk_svg',
    'barb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/barb_svg',
    'bob': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/barb_svg',
    'punb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/punb_svg',
    'pnb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/punb_svg',
    'yesb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/yesb_svg',
    'yes': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/yesb_svg',
    'bkid': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/bkid_svg',
    'boi': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/bkid_svg',
    'ibkl': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ibkl_svg',
    'idbi': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ibkl_svg',
    'ubin': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ubin_svg',
    'union': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ubin_svg',
    'indb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/indb_svg',
    'indusind': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/indb_svg',
    'mahb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/mahb_svg',
    'maharashtra': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/mahb_svg',
    'cnrb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/cnrb_svg',
    'canara': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/cnrb_svg',
    'cbin': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/cbin_svg',
    'central_b': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/cbin_svg',
    'citi': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/citi_svg',
    'fdrl': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/fdrl_svg',
    'federal': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/fdrl_svg',
    'idib': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/idib_svg',
    'indian_b': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/idib_svg',
    'ioba': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ioba_svg',
    'iob': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ioba_svg',
    'kvbl': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/kvbl_svg',
    'kvb': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/kvbl_svg',
    'sibl': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sibl_svg',
    'sib': 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sibl_svg'
  };

  const url = iconUrls[icon.toLowerCase()];
  if (url) {
    return (
      <div className="w-7 h-7 flex items-center justify-center shrink-0 rounded-sm overflow-hidden bg-white p-0.5 border border-slate-100">
        <img src={url} alt="" className="w-full h-full object-contain select-none" />
      </div>
    );
  }

  // Fallback other bank icon matching Use MMID
  return (
    <div className="w-7 h-7 flex items-center justify-center shrink-0 bg-slate-100 rounded-lg text-slate-400 p-1.5 border border-slate-150">
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M5 21V10 M9 21V10 M13 21V10 M17 21V10" />
        <path d="M3 10L12 3L21 10" />
      </svg>
    </div>
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
            <img src="/assets/images/fund-transfer/arrow-back.svg" alt="Back" className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <h1 className="qt-title">Quick Transfer</h1>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-4 gap-4 w-full select-none mt-4 border-b border-slate-200 pb-2">
            {[
              { id: 1, label: 'Bank Selection' },
              { id: 2, label: 'Payee and Transaction Details' },
              { id: 3, label: 'Authentication' },
              { id: 4, label: 'Receipt' },
            ].map((st) => {
              const isCurrent = currentStep === st.id;
              const isCompleted = currentStep > st.id;
              return (
                <div 
                  key={st.id} 
                  onClick={() => {
                    if (st.id < currentStep) setCurrentStep(st.id);
                  }}
                  className={`flex flex-col gap-2 text-left ${st.id < currentStep ? 'cursor-pointer' : ''}`}
                >
                  {/* Progress Line */}
                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-200">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isCompleted ? 'bg-[#10b981]' : isCurrent ? 'bg-[#702082]' : 'bg-slate-200'
                      }`}
                      style={{ width: isCompleted || isCurrent ? '100%' : '0%' }}
                    />
                  </div>
                  {/* Step Label */}
                  <p 
                    className={`text-[12.5px] font-extrabold font-sans leading-tight ${
                      isCurrent ? 'text-[#702082]' : isCompleted ? 'text-green-600' : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </p>
                </div>
              );
            })}
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
                  <img src="/assets/images/fund-transfer/upload.svg" alt="Upload cheque" className="w-4 h-4" />
                  <span>Upload cheque</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => toast('Use MMID Transfer')}
                  className="flex items-center gap-1.5 text-[13px] font-bold text-[#681d82] hover:underline bg-transparent border-none cursor-pointer select-none"
                >
                  <img src="/assets/images/fund-transfer/other-bank.svg" alt="Use MMID" className="w-4.5 h-4.5" />
                  <span>Use MMID</span>
                </button>
              </div>
            </div>

            <div className="qt-section-heading">Popular Banks</div>

            {/* 12 Bank Grid */}
            <div className="qt-bank-grid">
              {POPULAR_BANKS.map((b) => {
                const logoUrl = BankLogoUrls[b.id];
                return (
                  <div 
                    key={b.id} 
                    onClick={() => handleBankSelect(b)}
                    className={`qt-bank-card ${selectedBank?.id === b.id ? 'selected' : ''}`}
                  >
                    <div className="qt-bank-icon-box overflow-hidden relative flex items-center justify-center bg-white rounded-xl shadow-3xs p-1 border border-slate-100">
                      {logoUrl ? (
                        <img 
                          src={logoUrl} 
                          alt={b.name} 
                          className="w-10 h-10 object-contain select-none pointer-events-none" 
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="21" x2="21" y2="21" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <path d="M5 21V10 M9 21V10 M13 21V10 M17 21V10" />
                            <path d="M3 10L12 3L21 10" />
                          </svg>
                        </div>
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
                <img src="/assets/images/fund-transfer/search.svg" alt="Search" className="w-4 h-4 mr-2 shrink-0" />
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
