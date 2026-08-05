'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  Home, ChevronRight, X, FileText, CheckSquare, Building, Settings, 
  Award, User, DollarSign, Wallet, BarChart3, ShieldCheck, CreditCard, Receipt, UserCheck
} from 'lucide-react';

export default function DoorstepBankingPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsAccepted(false);
  };

  const handleProceedPsb = () => {
    if (isAccepted) {
      setShowModal(false);
      toast.success('Redirecting to PSB Alliance Portal...');
      window.open('https://psb-alliance.com', '_blank');
    }
  };

  const pickupServices = [
    { label: 'Cheques / Instruments for Collection / Clearing', icon: <FileText className="w-4 h-4 text-[#673391]" /> },
    { label: 'Cheque Book Requisition Slip', icon: <CheckSquare className="w-4 h-4 text-[#673391]" /> },
    { label: 'IT / Govt. / GST Challan with Cheque', icon: <Building className="w-4 h-4 text-[#673391]" /> },
    { label: 'Standing Instructions', icon: <Settings className="w-4 h-4 text-[#673391]" /> },
    { label: 'Life Certificate', icon: <Award className="w-4 h-4 text-[#673391]" /> },
    { label: 'Nomination Form', icon: <User className="w-4 h-4 text-[#673391]" /> },
    { label: 'Fund Transfer Request', icon: <DollarSign className="w-4 h-4 text-[#673391]" /> },
  ];

  const deliveryServices = [
    { label: 'Cash Withdrawal', icon: <Wallet className="w-4 h-4 text-[#673391]" /> },
    { label: 'Statement of Account', icon: <BarChart3 className="w-4 h-4 text-[#673391]" /> },
    { label: 'Term Deposit Advice', icon: <ShieldCheck className="w-4 h-4 text-[#673391]" /> },
    { label: 'TDS & Form 16 Certificate Issuance', icon: <FileText className="w-4 h-4 text-[#673391]" /> },
    { label: 'Pre-paid Instrument / Gift Card', icon: <CreditCard className="w-4 h-4 text-[#673391]" /> },
    { label: 'Demand Draft / Pay Orders', icon: <Receipt className="w-4 h-4 text-[#673391]" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col justify-between relative">
      <div>
        {/* Header */}
        <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

        {/* Main Container */}
        <main className="max-w-[1280px] w-full mx-auto px-4 py-6 pb-24">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
            <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
              <Home size={14} className="text-[#673391]" />
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="hover:text-[#673391] text-slate-600 cursor-pointer">Services</span>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#673391] font-bold">Doorstep Banking</span>
          </div>

          {/* Page Heading */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#673391] mb-6 tracking-tight">
            Doorstep Banking
          </h1>

          {/* Main Content Box */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 space-y-10 mb-6">
            
            {/* SECTION 1: PICK-UP SERVICES */}
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#673391] mb-1">
                Pick-Up Services
              </h2>
              <p className="text-xs text-slate-500 font-medium mb-4">
                Collect from customer and deliver to the branch
              </p>

              <div className="bg-[#f8f6fb] border border-purple-100 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pickupServices.map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs hover:border-purple-200 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#f4edf9] flex items-center justify-center flex-shrink-0">
                      {srv.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-snug">
                      {srv.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: DELIVERY SERVICES */}
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#673391] mb-1">
                Delivery Services
              </h2>
              <p className="text-xs text-slate-500 font-medium mb-4">
                Pick-up from branch and deliver to the customer
              </p>

              <div className="bg-[#f8f6fb] border border-purple-100 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {deliveryServices.map((srv, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-2xs hover:border-purple-200 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-[#f4edf9] flex items-center justify-center flex-shrink-0">
                      {srv.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-700 leading-snug">
                      {srv.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: DOORSTEP BANKING THROUGH PSB ALLIANCE */}
            <div className="pt-4 border-t border-slate-100">
              <h2 className="text-lg md:text-xl font-bold text-[#673391] mb-2">
                Doorstep Banking through PSB Alliance
              </h2>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed max-w-4xl mb-6">
                The PSB Alliance is a unified platform created by Public Sector Banks in India to offer you seamless and convenient banking services. Experience banking made easy! Visit the PSB Alliance website to enjoy doorstep banking services today.
              </p>

              <h3 className="text-sm font-bold text-[#673391] mb-4">
                Steps to Avail
              </h3>

              {/* Timeline Steps */}
              <div className="space-y-6 max-w-2xl pl-2">
                
                {/* Step 1 */}
                <div className="flex items-start gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#f4edf9] border-2 border-[#673391] flex items-center justify-center text-[#673391] z-10">
                      <UserCheck size={18} />
                    </div>
                    <div className="w-0.5 h-10 bg-purple-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Register
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Sign up effortlessly to get started
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#f4edf9] border-2 border-[#673391] flex items-center justify-center text-[#673391] z-10">
                      <CheckSquare size={18} />
                    </div>
                    <div className="w-0.5 h-10 bg-purple-200" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Choose Your Service
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Select the service you need, provide the necessary details, and pick a convenient time slot
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#f4edf9] border-2 border-[#673391] flex items-center justify-center text-[#673391] z-10">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      Enjoy Doorstep Service
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Sit back and relax as we deliver the service right to your doorstep
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </main>
      </div>

      {/* Bottom Action Sticky Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-slate-200/80 shadow-[0_-8px_20px_rgba(0,0,0,0.04)] py-4 px-6 md:px-12 z-40 animate-in slide-in-from-bottom duration-200">
        <div className="max-w-[1280px] w-full mx-auto flex justify-end">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-[#673391] hover:bg-[#561578] text-white font-extrabold text-xs md:text-sm py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Go to PSB Alliance</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* PSB Alliance Confirmation Modal (Exact Match to Screenshot 3) */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close Button */}
            <button 
              type="button" 
              onClick={handleCloseModal}
              className="absolute right-6 top-6 text-[#673391] hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Modal Title */}
            <h2 className="text-xl md:text-2xl font-bold text-[#673391] mb-4 tracking-tight pr-8">
              Before we proceed...
            </h2>

            {/* Modal Body */}
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-6 font-normal">
              I agree to be redirected to PSB Alliance portal owned by PSB Alliance Private Limited where I can enable the Doorstep Banking Services.
            </p>

            {/* Bottom Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
              
              {/* Checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer text-xs md:text-sm font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                  className="w-4 h-4 rounded text-[#673391] focus:ring-[#673391] accent-[#673391] cursor-pointer"
                />
                <span>I have read, understood and accept</span>
              </label>

              {/* Proceed Button */}
              <button
                type="button"
                disabled={!isAccepted}
                onClick={handleProceedPsb}
                className={`font-extrabold text-xs md:text-sm py-2.5 px-10 rounded-full transition-all ${
                  isAccepted
                    ? 'bg-[#673391] text-white hover:bg-[#561578] shadow-md cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Proceed
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
