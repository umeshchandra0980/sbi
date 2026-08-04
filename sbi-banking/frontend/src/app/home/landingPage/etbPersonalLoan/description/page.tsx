'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Search,
  FileCheck,
  TrendingUp,
  ArrowDownCircle
} from 'lucide-react';

export default function EtbPersonalLoanDescriptionPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Features' | 'Eligibility' | 'EMI' | 'Tutorials' | 'KnowMore'>('Features');

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(5000000); // 50L default as in screenshot
  const [loanTenure, setLoanTenure] = useState(84); // 84 months default as in screenshot
  const [interestRate, setInterestRate] = useState(8); // 8% default as in screenshot

  // EMI Calculation Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateEmi = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure;
    if (r === 0) return Math.round(P / n);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Loans" activeTopTab="Banking" />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-7">
        
        {/* Back Link */}
        <div className="mb-5">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#5b2e80] hover:underline"
          >
            <ChevronLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Title */}
        <h1 className="text-[26.5px] md:text-[31.5px] font-extrabold text-[#5b2e80] mb-6">
          Personal Loan
        </h1>

        {/* Purple Hero Banner Card */}
        <div className="bg-gradient-to-r from-[#5b2e80] via-[#522477] to-[#451468] text-white rounded-2xl p-6 md:p-7 mb-7 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-[14.5px] md:text-[16.5px] font-medium opacity-90">Avail a loan upto</span>
            <span className="text-[27px] md:text-[32px] font-extrabold tracking-wide">₹ 50,00,000</span>
          </div>
          <button 
            type="button" 
            onClick={() => setActiveTab('EMI')}
            className="text-[12.5px] md:text-[14.5px] font-bold text-white hover:text-purple-200 flex items-center gap-1 self-start sm:self-auto transition-colors cursor-pointer"
          >
            <span>Go to EMI Calculator</span>
            <ChevronRight size={17} />
          </button>
        </div>

        {/* Main Process & Action Container (Increased Height & Padding) */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100/70 p-8 md:p-12 mb-9 min-h-[460px] flex flex-col justify-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Steps Column (7 Cols) */}
            <div className="lg:col-span-7">
              <h2 className="text-[19.5px] md:text-[22.5px] font-extrabold text-[#5b2e80] mb-10">
                Avail a Personal loan in a few easy steps!
              </h2>

              <div className="space-y-10">
                
                {/* Step 1 */}
                <div className="flex items-start gap-10">
                  <div className="w-11 h-11 rounded-full border border-purple-200 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <User size={19} />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-extrabold text-slate-900 mb-2">
                      Confirm your details
                    </h3>
                    <p className="text-[12.5px] text-slate-600 leading-relaxed">
                      Review and confirm your personal, employment and address details
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-10">
                  <div className="w-11 h-11 rounded-full border border-purple-200 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <CreditCard size={19} />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-extrabold text-slate-900 mb-2">
                      Check loan eligibility
                    </h3>
                    <p className="text-[12.5px] text-slate-600 leading-relaxed">
                      Discover your eligible loan amount and personalised interest rates
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-10">
                  <div className="w-11 h-11 rounded-full border border-purple-200 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <FileText size={19} />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-extrabold text-slate-900 mb-2">
                      Get sanction details
                    </h3>
                    <p className="text-[12.5px] text-slate-600 leading-relaxed">
                      Review your details and generate Arrangement Letter
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-10">
                  <div className="w-11 h-11 rounded-full border border-purple-200 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-xs">
                    <CheckCircle2 size={19} />
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-extrabold text-slate-900 mb-2">
                      Get your loan disbursed
                    </h3>
                    <p className="text-[12.5px] text-slate-600 leading-relaxed">
                      Pay the stamp duty and applicable charges, execute documents and get instant loan disbursal
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Graphic & Action Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center pt-4 lg:pt-0">
              
              {/* Document & Loan Illustration Box */}
              <div className="w-full max-w-[300px] h-[200px] bg-[#f8f4fc] rounded-2xl p-5 mb-7 flex flex-col items-center justify-center relative border border-purple-100/60 shadow-xs">
                <div className="relative w-26 h-30 bg-white rounded-xl border border-purple-200 shadow-md flex flex-col items-center justify-center p-4">
                  <div className="w-11 h-11 rounded-full bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center text-xl font-black mb-2 shadow-xs">
                    %
                  </div>
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full mb-1.5" />
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-1.5" />
                  <div className="w-14 h-1.5 bg-slate-200 rounded-full" />
                </div>
                
                {/* Person Silhouette & Gift Bag */}
                <div className="absolute -bottom-2 flex items-end gap-3">
                  <div className="w-13 h-11 bg-[#7c3aed]/80 rounded-t-2xl shadow-sm flex items-center justify-center text-white text-xs font-bold">
                    <User size={19} />
                  </div>
                  <div className="w-11 h-10 bg-[#5b2e80] rounded-lg shadow-sm flex items-center justify-center text-white font-bold text-xs">
                    %
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => toast.success("Processing loan application...")}
                className="w-full max-w-[350px] bg-[#5b2e80] hover:bg-[#4b1774] text-white font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-[14.5px] cursor-pointer mb-5"
              >
                <span>Resume or Start New Application</span>
                <ArrowRight size={19} />
              </button>

              {/* Info Note Box */}
              <div className="w-full max-w-[350px] mt-4 bg-[#f4edf9] border border-purple-200/80 rounded-xl p-3.5 flex items-center gap-3 text-left text-[12.5px] text-[#5b2e80] font-medium shadow-xs">
                <Info size={19} className="flex-shrink-0 text-[#5b2e80]" />
                <span>This loan is available only for salaried customers</span>
              </div>

            </div>

          </div>

        </div>

        {/* Sub-Tabs Bar */}
        <div className="mb-6">
          <div className="flex border-b border-slate-300 gap-7 overflow-x-auto scrollbar-none">
            {[
              { id: 'Features', label: 'Features' },
              { id: 'Eligibility', label: 'Eligibility Criteria' },
              { id: 'EMI', label: 'EMI Calculator' },
              { id: 'Tutorials', label: 'Tutorials' },
              { id: 'KnowMore', label: 'Know More' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === 'KnowMore') {
                    window.open('https://sbi.bank.in/web/personal-banking/loans/personal-loans/real-time-xpress-credit', '_blank', 'noopener,noreferrer');
                  } else {
                    setActiveTab(tab.id as any);
                  }
                }}
                className={`pb-3 text-[14.5px] font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-2xl border border-purple-100/70 p-7 md:p-9 shadow-sm mb-12 min-h-[320px]">
          
          {/* TAB 1: FEATURES */}
          {activeTab === 'Features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <Search size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Zero hidden costs</h4>
              </div>

              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <FileCheck size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Completely paperless</h4>
              </div>

              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <TrendingUp size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Attractive interest rate</h4>
              </div>

              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <ArrowDownCircle size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Low processing fee</h4>
              </div>

            </div>
          )}

          {/* TAB 2: ELIGIBILITY CRITERIA */}
          {activeTab === 'Eligibility' && (
            <div className="space-y-8">
              
              <div>
                <h3 className="text-[15.5px] font-extrabold text-slate-800 mb-5">
                  Individuals should be salaried and working in one of the following sectors to be eligible :
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                    <div className="text-[#673391]">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z" />
                      </svg>
                    </div>
                    <h4 className="text-[13.5px] font-extrabold text-slate-900">Central and State Government</h4>
                  </div>

                  <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                    <div className="text-[#673391]">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M9 9h6M9 13h6M9 17h4" />
                      </svg>
                    </div>
                    <h4 className="text-[13.5px] font-extrabold text-slate-900">Quasi-Government</h4>
                  </div>

                  <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                    <div className="text-[#673391]">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 21h18M6 18V11M10 18V7M14 18V13M18 18V9" />
                      </svg>
                    </div>
                    <h4 className="text-[13.5px] font-extrabold text-slate-900">Central PSU&apos;s</h4>
                  </div>
                </div>

                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                  <div className="text-[#673391]">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 6 2 6 2s6 0 6-2v-5" />
                    </svg>
                  </div>
                  <h4 className="text-[13.5px] font-extrabold text-slate-900">Educational Institutions of National Repute</h4>
                </div>
              </div>

              <hr className="border-slate-200" />

              <div>
                <h3 className="text-[15.5px] font-extrabold text-slate-800 mb-5">
                  Individuals should also be compliant with the following bank requirements to be eligible:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                    <div className="text-[#673391]">
                      <User size={24} />
                    </div>
                    <p className="text-[13px] font-extrabold text-slate-900">The applicant should be a permanent employee.</p>
                  </div>

                  <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                    <div className="text-[#673391]">
                      <FileText size={24} />
                    </div>
                    <p className="text-[13px] font-extrabold text-slate-900 leading-relaxed">For corporate employees, a minimum of 1 year of service is required; for government and defense, at least 6 months are needed.</p>
                  </div>

                  <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                    <div className="text-[#673391]">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <text x="12" y="17" fontSize="7" fontWeight="bold" textAnchor="middle" fill="currentColor">₹</text>
                      </svg>
                    </div>
                    <p className="text-[13px] font-extrabold text-slate-900">The minimum Net Monthly Income (NMI) of the employee should be Rs 25,000/-</p>
                  </div>

                  <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/60 min-h-[140px] flex flex-col justify-between">
                    <div className="text-[#673391]">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z" />
                      </svg>
                    </div>
                    <p className="text-[13px] font-extrabold text-slate-900">Should comply with Bank&apos;s KYC norms.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: EMI CALCULATOR */}
          {activeTab === 'EMI' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-7">
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13.5px] font-extrabold text-slate-800">Select Loan Amount</span>
                    <span className="text-[14.5px] font-extrabold text-[#673391] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">₹ {formatCurrency(loanAmount)}</span>
                  </div>
                  <input type="range" min={100000} max={5000000} step={50000} value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full accent-[#673391] h-2 bg-slate-200 rounded-lg cursor-pointer" />
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500"><span>1L</span><span>50L</span></div>
                </div>

                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13.5px] font-extrabold text-slate-800">Loan Tenure</span>
                    <span className="text-[14.5px] font-extrabold text-[#673391] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">{loanTenure} months</span>
                  </div>
                  <input type="range" min={6} max={84} step={6} value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full accent-[#673391] h-2 bg-slate-200 rounded-lg cursor-pointer" />
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500"><span>6</span><span>84</span></div>
                </div>

                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13.5px] font-extrabold text-slate-800">Select Rate of Interest</span>
                    <span className="text-[14.5px] font-extrabold text-[#673391] bg-white border border-purple-200 px-4 py-1 rounded-md shadow-2xs">{interestRate}%</span>
                  </div>
                  <input type="range" min={8} max={17} step={0.5} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-[#673391] h-2 bg-slate-200 rounded-lg cursor-pointer" />
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500"><span>8</span><span>17</span></div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#f4f2f8] rounded-2xl p-8 border border-purple-100/70 flex flex-col items-center justify-center text-center min-h-[380px]">
                <h2 className="text-4xl md:text-5xl font-black text-[#673391] tracking-tight mb-1">₹{formatCurrency(calculateEmi())}</h2>
                <p className="text-xs font-extrabold text-slate-600 mb-8">Estimated EMI (per month)</p>
                <div className="bg-white border border-purple-200/80 rounded-xl p-5 text-left flex items-start gap-3 shadow-2xs">
                  <Info size={20} className="text-[#673391] flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold text-[#673391] leading-relaxed">The final offer including the maximum amount, tenure, Rate of Interest and EMI shall be finalized post further assessment as per bank&apos;s policies. You may select required loan amount and appropriate tenure at a later stage</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TUTORIALS (Matching Screenshot 2 Exactly) */}
          {activeTab === 'Tutorials' && (
            <div className="flex flex-col items-center justify-center space-y-4 py-2">
              {/* Outer tutorial canvas block with gradient background and header logos */}
              <div className="w-full max-w-[900px] bg-gradient-to-b from-[#e3eff5] via-[#e9f3f8] to-[#dbe9f1] rounded-2xl p-6 md:p-10 border border-slate-200/80 shadow-xs flex flex-col items-center justify-center relative min-h-[460px]">
                
                {/* Top SBI Logo Banner */}
                <div className="w-full flex items-center justify-between mb-8 px-2 md:px-6">
                  <div className="flex items-center gap-3">
                    <img src="/images/sbi-logo.png" alt="SBI Logo" className="h-9 md:h-11 object-contain" />
                    <div className="border-l border-slate-400 h-7" />
                    <div className="flex flex-col">
                      <span className="text-[14px] md:text-[16px] font-extrabold text-[#0083ca] leading-tight">SBI</span>
                      <span className="text-[10px] md:text-[11px] font-bold text-slate-600">The banker to every indian</span>
                    </div>
                  </div>

                  {/* Beti Bachao / Sarva Shiksha circular emblem */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-red-500 bg-white p-1 flex items-center justify-center shadow-xs">
                    <div className="text-[9px] font-extrabold text-red-600 text-center leading-none">
                      बेटी बचाओ<br/>बेटी पढ़ाओ
                    </div>
                  </div>
                </div>

                {/* Smartphone Frame Container */}
                <div className="w-[240px] sm:w-[270px] h-[400px] sm:h-[440px] bg-slate-900 rounded-[36px] p-3 shadow-2xl border-4 border-slate-800 relative flex flex-col items-center justify-center">
                  {/* Speaker Notch */}
                  <div className="absolute top-3 w-16 h-1.5 bg-slate-700 rounded-full z-20" />
                  
                  {/* Screen Content */}
                  <div className="w-full h-full bg-white rounded-[26px] overflow-hidden flex flex-col items-center justify-center relative">
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      poster="https://images.unsplash.com/photo-1556742049-0a67d825f38a?w=800&auto=format&fit=crop&q=80"
                    >
                      <source src="/assets/videos/etb_tutorial.mp4" type="video/mp4" />
                      Your browser does not support video.
                    </video>
                  </div>
                </div>

              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-[#5b2e80] pt-2">
                ETB PL Tutorial Video
              </h3>
            </div>
          )}

          {/* TAB 5: KNOW MORE */}
          {activeTab === 'KnowMore' && (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-slate-600 mb-4">
                Redirecting to SBI Official Personal Loans Portal...
              </p>
              <a
                href="https://sbi.bank.in/web/personal-banking/loans/personal-loans/real-time-xpress-credit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5b2e80] hover:bg-[#4b1774] text-white font-bold py-3 px-6 rounded-full text-xs transition-colors"
              >
                <span>Click here if you are not redirected automatically</span>
                <ChevronRight size={16} />
              </a>
            </div>
          )}

        </div>

      </main>

      {/* Footer Links Bar */}
      <footer className="bg-[#333333] text-white text-[12.5px] py-3.5 px-6 text-center mt-auto">
        <div className="flex items-center justify-center gap-4 text-white/90">
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
