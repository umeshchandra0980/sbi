'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, X } from 'lucide-react';

export default function DirectTaxesPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOkay = () => {
    setShowModal(false);
    router.push('/home/landingPage/services/tax-related');
  };

  const steps = [
    "In a new browser window enter the URL, https://eportal.incometax.gov.in income tax portal will be displayed which is a single window access to the income tax related services for taxpayers and other stakeholders.",
    "Login with your PAN.",
    "Go to e-File Tab >> Click e-Pay Tax link.",
    "Generate the challan by Clicking on +New Payment option.",
    "Select the appropriate payment option for your PAN as per your requirement, Proceed.",
    "Select details like Assessment Year, Major Head, Minor Head etc.",
    "Login to Income Tax Portal >> e-File Tab >> Payment History >> select Action as Download for respective CIN.",
    "Select the State Bank of India under Netbanking/ Debit card/ Payment gateway Option.",
    "For SBI netbanking, Login with your SBI Internet Banking User ID and Password.",
    "On successful processing of your transaction, you are provided with a link to print the e-Receipt of your payment.",
    "Challan will be available for download on Income Tax Portal https://eportal.incometax.gov.in post login, through below option.",
    "Login to Income Tax Portal >> e-File Tab >> Payment History >> select Action as Download for respective CIN."
  ];

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col relative">
      {/* Header */}
      <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

      {/* Main Page Background (Matching Image 4) */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
          <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
            <Home size={14} className="text-[#673391]" />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <Link href="/home/landingPage/services/tax-related" className="hover:text-[#673391] text-slate-600 font-medium">
            Tax Related
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#673391] font-bold">Direct Taxes</span>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 min-h-[400px]" />
      </main>

      {/* Direct Taxes Instruction Modal (Exact Match to Image 4) */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150"
          onClick={handleClose}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-10 shadow-2xl relative border border-slate-100 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Right Close Button */}
            <button 
              type="button" 
              onClick={handleClose}
              className="absolute right-6 top-6 text-[#673391] hover:opacity-75 transition-opacity cursor-pointer z-10"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Modal Title */}
            <h2 className="text-lg md:text-xl font-bold text-[#673391] mb-6 pr-8 tracking-tight">
              To pay Direct Taxes through the internet, do the following:
            </h2>

            {/* Scrollable Instruction List */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-6 text-xs md:text-sm text-slate-700 font-normal leading-relaxed">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-semibold text-slate-800 flex-shrink-0">{idx + 1}.</span>
                  <span>
                    {step.includes('https://eportal.incometax.gov.in') ? (
                      <>
                        {step.split('https://eportal.incometax.gov.in')[0]}
                        <a href="https://eportal.incometax.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#673391] font-bold underline hover:opacity-80">
                          https://eportal.incometax.gov.in
                        </a>
                        {step.split('https://eportal.incometax.gov.in')[1]}
                      </>
                    ) : (
                      step
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Action Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100 flex-shrink-0">
              <button
                type="button"
                onClick={handleOkay}
                className="bg-[#673391] hover:bg-[#561578] text-white font-extrabold text-xs md:text-sm py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Okay
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
