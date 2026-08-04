'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, Eye } from 'lucide-react';

export default function PersonalDetailsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPan, setShowPan] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  
  // Step 1 State
  const [purposeAccepted, setPurposeAccepted] = useState(false);
  const [authAccepted, setAuthAccepted] = useState(false);

  // Step 2 State (Loan Details)
  const [requestedLoanAmount, setRequestedLoanAmount] = useState(500000);
  const [requestedTenure, setRequestedTenure] = useState(36);

  // Step 3 State (Funds Selection)
  const [selectedFund, setSelectedFund] = useState(true);

  const stepsList = [
    { id: 1, label: 'Personal Details', upNext: 'Loan details' },
    { id: 2, label: 'Loan details', upNext: 'Funds eligible for lien' },
    { id: 3, label: 'Funds eligible for lien', upNext: 'Review Funds' },
    { id: 4, label: 'Review Funds', upNext: 'Select Bank Account' },
    { id: 5, label: 'Select Bank Account', upNext: 'Complete Application' },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val);
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success(`Advanced to ${stepsList[currentStep].label}`);
    } else {
      toast.success("Overdraft Facility Application Submitted Successfully!");
      router.push('/dashboard');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/home/landingPage/lending/etb-lamfu/description');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative pb-24">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Loans" activeTopTab="Banking" />

      {/* Main Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/etbPersonalLoan/description" className="hover:underline">Loans</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/lending/etb-lamfu/description" className="hover:underline">Loan Against Mutual Fund</Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-500 font-normal">New Application</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-6">
          Loan Against Mutual Fund
        </h1>

        {/* Multi-Step Stepper Progress Bar (Step-by-step indicator) */}
        <div className="flex items-center gap-7 overflow-x-auto pb-3 mb-6 text-xs font-semibold scrollbar-none border-b border-slate-200">
          {stepsList.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 pb-2.5 transition-all whitespace-nowrap ${
                currentStep === step.id
                  ? 'text-[#5b2e80] font-black border-b-2 border-[#5b2e80]'
                  : currentStep > step.id
                  ? 'text-purple-900 font-bold'
                  : 'text-slate-400 font-normal'
              }`}
            >
              <span>{step.label}</span>
            </div>
          ))}
        </div>

        {/* Main Content Box (Dynamic depending on currentStep) */}
        <div className="bg-white rounded-2xl shadow-sm border border-purple-100/70 p-6 md:p-9 mb-8 min-h-[440px]">
          
          {/* STEP 1: PERSONAL DETAILS */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-extrabold text-[#5b2e80] mb-6">
                Review personal details
              </h2>

              <div className="bg-[#f4f2f8] rounded-2xl p-6 md:p-8 border border-purple-100/60 mb-8 space-y-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1">Customer Name</p>
                  <h3 className="text-sm md:text-base font-extrabold text-[#5b2e80] uppercase tracking-wide">
                    DUMPALA VISHNU VARDHAN
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-purple-100/60">
                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-1">Date of Birth</p>
                    <p className="text-xs md:text-sm font-extrabold text-slate-800">10/09/2000</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-1">PAN Details</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-extrabold text-slate-800">
                        {showPan ? 'ABCDE1234F' : 'XXXXXX642H'}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setShowPan(!showPan)} 
                        className="text-[#5b2e80] hover:text-purple-900 cursor-pointer"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-500 mb-1">Mobile Number</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-extrabold text-slate-800">
                        {showMobile ? '9876543210' : 'XXXXXXX933'}
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setShowMobile(!showMobile)} 
                        className="text-[#5b2e80] hover:text-purple-900 cursor-pointer"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-[#5b2e80]">
                  Purpose of loan
                </h3>
                
                <label className="flex items-center gap-3 cursor-pointer bg-[#f4f2f8] p-4 rounded-xl border border-purple-100/60 hover:bg-[#ede8f5] transition-colors">
                  <input
                    type="checkbox"
                    checked={purposeAccepted}
                    onChange={(e) => setPurposeAccepted(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-slate-300 text-[#5b2e80] focus:ring-[#5b2e80]"
                  />
                  <span className="text-xs font-extrabold text-slate-800">
                    General Purpose other than speculative
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer bg-[#f4f2f8] p-4 rounded-xl border border-purple-100/60 hover:bg-[#ede8f5] transition-colors">
                  <input
                    type="checkbox"
                    checked={authAccepted}
                    onChange={(e) => setAuthAccepted(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-slate-300 text-[#5b2e80] focus:ring-[#5b2e80]"
                  />
                  <span className="text-xs font-extrabold text-slate-800">
                    I authorize SBI to share mobile number and PAN with CAMS to fetch funds details
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: LOAN DETAILS */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#5b2e80] mb-2">
                Enter Loan Details
              </h2>
              <p className="text-xs font-bold text-slate-500 mb-6">
                Specify your desired loan amount and tenure
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">Requested Loan Amount</span>
                    <span className="text-sm font-extrabold text-[#5b2e80] bg-white px-4 py-1 rounded-md shadow-2xs border border-purple-200">
                      ₹ {formatCurrency(requestedLoanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={25000}
                    max={1000000}
                    step={25000}
                    value={requestedLoanAmount}
                    onChange={(e) => setRequestedLoanAmount(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>₹25,000</span>
                    <span>₹10,00,000</span>
                  </div>
                </div>

                <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">Repayment Tenure</span>
                    <span className="text-sm font-extrabold text-[#5b2e80] bg-white px-4 py-1 rounded-md shadow-2xs border border-purple-200">
                      {requestedTenure} months
                    </span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={60}
                    step={6}
                    value={requestedTenure}
                    onChange={(e) => setRequestedTenure(Number(e.target.value))}
                    className="w-full accent-[#5b2e80] h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>12 months</span>
                    <span>60 months</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: FUNDS ELIGIBLE FOR LIEN */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#5b2e80] mb-2">
                Funds Eligible for Lien
              </h2>
              <p className="text-xs font-bold text-slate-500 mb-6">
                Fetched from CAMS based on your PAN & Registered Mobile Number
              </p>

              <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedFund}
                    onChange={(e) => setSelectedFund(e.target.checked)}
                    className="w-5 h-5 rounded text-[#5b2e80] focus:ring-[#5b2e80]"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">SBI Bluechip Fund - Direct Plan - Growth</h4>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Folio No: 9102837410 | Units Available: 1,420.50</p>
                  </div>
                </div>
                <span className="text-sm font-black text-[#5b2e80]">₹ 10,00,000</span>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW FUNDS */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#5b2e80] mb-2">
                Review Lien Details
              </h2>
              <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 space-y-3 text-xs font-bold text-slate-700">
                <div className="flex justify-between border-b border-purple-100/60 pb-2">
                  <span>Selected Fund</span>
                  <span className="text-[#5b2e80] font-extrabold">SBI Bluechip Fund</span>
                </div>
                <div className="flex justify-between border-b border-purple-100/60 pb-2">
                  <span>Lien Value Marked</span>
                  <span className="text-[#5b2e80] font-extrabold">₹ 10,00,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Approved Overdraft Limit</span>
                  <span className="text-[#5b2e80] font-extrabold">₹ 5,00,000 (50%)</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: SELECT BANK ACCOUNT */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-extrabold text-[#5b2e80] mb-2">
                Select Disbursal Bank Account
              </h2>
              <div className="bg-[#f4f2f8] rounded-2xl p-6 border border-purple-100/70 flex items-center justify-between cursor-pointer">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">SBI Savings Account</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1">A/C No: XXXXXXXX4091 | Branch: Main Branch</p>
                </div>
                <span className="text-xs font-bold text-[#5b2e80] bg-white border border-purple-200 px-3 py-1 rounded-full">Primary</span>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Floating Bottom Sticky Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 py-3.5 px-6 z-40 shadow-lg">
        <div className="max-w-[1240px] w-full mx-auto flex items-center justify-between">
          
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePreviousStep}
            className="flex items-center gap-2 bg-white border border-[#5b2e80] text-[#5b2e80] font-bold py-2.5 px-6 rounded-full text-xs hover:bg-purple-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>&larr; Previous</span>
          </button>

          {/* Up Next Label & Save & Next Button */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">up next</p>
              <p className="text-xs font-extrabold text-slate-700">{stepsList[currentStep - 1].upNext}</p>
            </div>

            <button
              type="button"
              disabled={currentStep === 1 && (!purposeAccepted || !authAccepted)}
              onClick={handleNextStep}
              className={`py-2.5 px-8 rounded-full text-xs font-extrabold transition-all flex items-center gap-2 ${
                currentStep === 1 && (!purposeAccepted || !authAccepted)
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-200'
                  : 'bg-[#5b2e80] hover:bg-[#4b1774] text-white shadow-md cursor-pointer'
              }`}
            >
              <span>{currentStep === 5 ? 'Submit Application' : 'Save & Next'}</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
