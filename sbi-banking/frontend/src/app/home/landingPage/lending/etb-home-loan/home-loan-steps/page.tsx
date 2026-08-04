'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronRight, 
  User, 
  Building2, 
  FileText, 
  FileCheck, 
  FileEdit, 
  ArrowRight,
  Calculator as CalcIcon,
  Home,
  X,
  ChevronDown,
  Download,
  Percent,
  CheckCircle2,
  TrendingUp,
  Ban,
  ArrowDownCircle,
  Info,
  FileCode2
} from 'lucide-react';

export default function HomeLoanStepsPage() {
  const router = useRouter();
  
  // Consent Modal State (Opens automatically on page load as in Screenshot 2)
  const [showConsentModal, setShowConsentModal] = useState(true);
  const [isConsentAccepted, setIsConsentAccepted] = useState(false);

  // Sub-Tabs State
  const [activeTab, setActiveTab] = useState<'Features' | 'KnowMore' | 'Calculator'>('Features');

  // Calculator State
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTenure, setLoanTenure] = useState(1);
  const [interestRate, setInterestRate] = useState(4);

  // Simple EMI Calculation
  const calculateEmi = () => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;
    if (r === 0) return Math.round(p / n);
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Loans" activeTopTab="Banking" />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/etbPersonalLoan/description" className="hover:underline">Loans</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-600">Home Loan</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Home Loan
        </h1>

        {/* Main Process Container (Avail Home Loan in few easy steps!) */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100/70 p-6 md:p-9 mb-8">
          
          <h2 className="text-xl font-extrabold text-[#5b2e80] mb-7">
            Avail Home Loan in few easy steps!
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Steps Column with Vertical Dashed Stepper (7 Cols) */}
            <div className="lg:col-span-7 pr-0 lg:pr-6 lg:border-r border-purple-100/70">
              <div className="relative pl-1 space-y-6">
                
                {/* Dashed Connecting Line */}
                <div className="absolute left-[21px] top-5 bottom-5 w-[2px] border-l-2 border-dashed border-purple-200 pointer-events-none" />

                {/* Step 1 */}
                <div className="relative flex items-start gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#1f2937]">
                      Loan application
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Generate instant in-principle approval
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#1f2937]">
                      Branch verification
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Loan application and documents will be verified by the bank
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <FileCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#1f2937]">
                      Sanction generation
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Sanction generated by branch post verification
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <FileEdit size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#1f2937]">
                      Document execution
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Complete your digital document execution to initiate disbursement
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="relative flex items-start gap-3.5 z-10 bg-white">
                  <div className="w-10 h-10 rounded-full border border-purple-200/90 bg-[#f4edf9] text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs mt-0.5">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-extrabold text-[#1f2937]">
                      Disbursement
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      Disbursement to Builder/ Seller / Applicant
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Graphic & Action Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center pl-0 lg:pl-4">
              
              {/* House & Clipboard Illustration */}
              <div className="w-full max-w-[320px] h-[220px] bg-[#f8f4fc] rounded-2xl p-5 mb-8 flex items-center justify-center relative border border-purple-100/60 shadow-xs">
                
                {/* Clipboard Card */}
                <div className="w-32 h-40 bg-white rounded-xl border-2 border-[#5b2e80] shadow-lg flex flex-col items-center p-3 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-[#5b2e80] flex items-center justify-center mb-2">
                    <User size={16} />
                  </div>
                  <div className="w-16 h-1.5 bg-slate-200 rounded-full mb-1.5" />
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-3" />
                  <div className="w-8 h-8 rounded-full bg-[#5b2e80] text-white flex items-center justify-center font-bold text-xs">
                    %
                  </div>
                </div>

                {/* House Graphic next to Clipboard */}
                <div className="w-24 h-28 bg-[#f4edf9] rounded-tr-2xl border-2 border-purple-200 flex flex-col items-center justify-center ml-[-12px]">
                  <Home size={28} className="text-[#5b2e80] mb-1" />
                  <div className="w-8 h-8 bg-white rounded-sm border border-purple-200" />
                </div>

              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => setShowConsentModal(true)}
                className="w-full max-w-[340px] bg-[#5b2e80] hover:bg-[#4b1774] text-white font-bold py-3.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm mb-4"
              >
                <span>Start New Application</span>
                <ArrowRight size={18} />
              </button>

              {/* Info Note Box */}
              <div className="w-full max-w-[340px] mt-4 bg-[#f4edf9] border border-purple-200/80 rounded-xl p-3.5 flex items-center gap-3 text-left text-[12.5px] text-[#5b2e80] font-medium shadow-xs">
                <Info size={19} className="flex-shrink-0 text-[#5b2e80]" />
                <span>This loan is available only for salaried customers</span>
              </div>

            </div>

          </div>

        </div>

        {/* Sub-Tabs Bar */}
        <div className="mb-6">
          <div className="flex border-b border-slate-300 gap-7 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('Features')}
              className={`pb-2.5 text-sm font-bold transition-all relative ${
                activeTab === 'Features' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Features</span>
              {activeTab === 'Features' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                window.open('https://homeloans.sbi.bank.in', '_blank', 'noopener,noreferrer');
              }}
              className={`pb-2.5 text-sm font-bold transition-all relative cursor-pointer ${
                activeTab === 'KnowMore' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Know More</span>
              {activeTab === 'KnowMore' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('Calculator')}
              className={`pb-2.5 text-sm font-bold transition-all relative ${
                activeTab === 'Calculator' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Calculator</span>
              {activeTab === 'Calculator' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-2xl border border-purple-100/70 p-6 shadow-sm mb-12">
          
          {/* FEATURES TAB (4 Cards Grid matching Screenshot 4) */}
          {activeTab === 'Features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              
              {/* Card 1 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <FileText size={28} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Minimal Documentation
                </h4>
              </div>

              {/* Card 2 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <ArrowDownCircle size={28} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Low Processing Fees
                </h4>
              </div>

              {/* Card 3 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <TrendingUp size={28} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Attractive interest rates
                </h4>
              </div>

              {/* Card 4 */}
              <div className="bg-[#f8f4fc] rounded-xl p-6 border border-purple-100/80 flex flex-col items-start justify-start min-h-[140px]">
                <Ban size={28} className="text-[#5b2e80] mb-4" />
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  Zero Hidden Cost
                </h4>
              </div>

            </div>
          )}

          {/* KNOW MORE TAB */}
          {activeTab === 'KnowMore' && (
            <div className="py-8 text-center text-slate-600 text-sm font-medium">
              Flexible home loan products available for Resident Indians and NRIs. For details on eligibility &amp; interest rates, contact SBI branch support.
            </div>
          )}

          {/* CALCULATOR TAB (Matching Screenshot 5) */}
          {activeTab === 'Calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Sliders Area (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Loan Amount Slider */}
                <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-extrabold text-slate-700">Select loan amount</label>
                    <span className="text-sm font-extrabold text-[#5b2e80] bg-white px-3 py-1 rounded-md border border-purple-200">
                      ₹ {loanAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="100000" 
                    max="30000000" 
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mt-2">
                    <span>100000</span>
                    <span>30000000</span>
                  </div>
                </div>

                {/* Loan Tenure Slider */}
                <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-extrabold text-slate-700">Loan Tenure</label>
                    <span className="text-sm font-extrabold text-[#5b2e80] bg-white px-3 py-1 rounded-md border border-purple-200">
                      {loanTenure} Years
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="30" 
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mt-2">
                    <span>1</span>
                    <span>30</span>
                  </div>
                </div>

                {/* Rate of Interest Slider */}
                <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-extrabold text-slate-700">Select Rate of Interest</label>
                    <span className="text-sm font-extrabold text-[#5b2e80] bg-white px-3 py-1 rounded-md border border-purple-200">
                      {interestRate}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="4" 
                    max="16" 
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] cursor-pointer"
                  />
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 mt-2">
                    <span>4</span>
                    <span>16</span>
                  </div>
                </div>

              </div>

              {/* EMI Result Panel (5 Cols) */}
              <div className="lg:col-span-5 bg-[#f8f4fc] rounded-2xl p-6 border border-purple-100 flex flex-col items-center justify-center text-center min-h-[300px]">
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#5b2e80] mb-1">
                  ₹{calculateEmi().toLocaleString('en-IN')}
                </h3>
                <p className="text-xs font-bold text-slate-600 mb-6">
                  Estimated EMI (per month)
                </p>

                <div className="bg-white rounded-xl p-4 border border-purple-100 text-left text-xs font-semibold text-slate-600 leading-relaxed flex items-start gap-2.5">
                  <span className="text-[#5b2e80] font-bold">ⓘ</span>
                  <span>
                    The final offer including the maximum amount, tenure, Rate of Interest and EMI shall be finalized post further assessment as per bank's policies. You may select required loan amount and appropriate tenure at a later stage.
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* CONSENT-CUM-DECLARATION MODAL (Matching Screenshot 2 Exactly) */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-[640px] w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header row inside modal */}
            <div className="flex justify-between items-center mb-4">
              {/* Language Selector */}
              <button 
                type="button"
                className="flex items-center gap-1 text-xs font-extrabold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
              >
                <span>ENG</span>
                <ChevronDown size={14} />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowConsentModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Title */}
            <h3 className="text-lg md:text-xl font-extrabold text-[#5b2e80] mb-0.5">
              Consent-cum-Declaration
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-4">
              (For all applicants)
            </p>

            {/* Declaration Text Box */}
            <div className="text-xs font-medium text-slate-600 leading-relaxed mb-5 max-h-[140px] overflow-y-auto pr-2">
              1. I/we certify that the information and particulars provided by me/us in this application form (and all documents referred or provided herewith) are true, correct, complete and up to date in all respects and I have not withheld any information. I/we authorize State Bank of India to make inquiries related to or verify said information directly or through any third party. I/we further acknowledge the Bank's right to seek any information from any other source in this regard. I/we understand that all of the above-mentioned information
            </div>

            {/* Inset Consent Box with Download (Left aligned, half-width card with horizontal line above download link) */}
            <div className="w-1/2 min-w-[260px] bg-[#f8f6fb] rounded-xl p-4 border border-purple-100/80 mb-6 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-800 mb-3">
                Consent
              </h4>
              <div className="border-t border-purple-100/80 pt-3 flex justify-center">
                <button
                  type="button"
                  onClick={() => toast.success("Downloading Consent Document...")}
                  className="text-[#673391] hover:text-[#522575] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download size={14} strokeWidth={2} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Footer Row (Checkbox + Proceed Button) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-extrabold text-slate-800">
                <input 
                  type="checkbox"
                  checked={isConsentAccepted}
                  onChange={(e) => setIsConsentAccepted(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#5b2e80] focus:ring-[#5b2e80]"
                />
                <span>I have read, understood and accept</span>
              </label>

              <button
                type="button"
                disabled={!isConsentAccepted}
                onClick={() => {
                  if (isConsentAccepted) {
                    setShowConsentModal(false);
                    toast.success("Consent accepted. Starting Home Loan application.");
                  }
                }}
                className={`py-3 px-8 rounded-full text-xs font-extrabold transition-all min-w-[140px] ${
                  isConsentAccepted 
                    ? 'bg-[#5b2e80] hover:bg-[#4b1774] text-white shadow-md cursor-pointer' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                Proceed
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer Links Bar */}
      <footer className="bg-[#333333] text-white text-xs py-3.5 px-6 text-center mt-auto">
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
