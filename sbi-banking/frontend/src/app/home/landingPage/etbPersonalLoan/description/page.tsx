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
            onClick={() => toast.success("Redirecting to EMI Calculator...")}
            className="text-[12.5px] md:text-[14.5px] font-bold text-white hover:text-purple-200 flex items-center gap-1 self-start sm:self-auto transition-colors"
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
                className="w-full max-w-[350px] bg-[#5b2e80] hover:bg-[#4b1774] text-white font-bold py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-[14.5px] mb-5"
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
          <div className="flex border-b border-slate-300 gap-7 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('Features')}
              className={`pb-3 text-[14.5px] font-extrabold transition-all relative ${
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
              onClick={() => setActiveTab('Eligibility')}
              className={`pb-3 text-[14.5px] font-extrabold transition-all relative ${
                activeTab === 'Eligibility' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Eligibility Criteria</span>
              {activeTab === 'Eligibility' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('EMI')}
              className={`pb-3 text-[14.5px] font-extrabold transition-all relative ${
                activeTab === 'EMI' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>EMI Calculator</span>
              {activeTab === 'EMI' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('Tutorials')}
              className={`pb-3 text-[14.5px] font-extrabold transition-all relative ${
                activeTab === 'Tutorials' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Tutorials</span>
              {activeTab === 'Tutorials' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('KnowMore')}
              className={`pb-3 text-[14.5px] font-extrabold transition-all relative ${
                activeTab === 'KnowMore' ? 'text-[#5b2e80]' : 'text-slate-600 hover:text-[#5b2e80]'
              }`}
            >
              <span>Know More</span>
              {activeTab === 'KnowMore' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b2e80] rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-2xl border border-purple-100/70 p-7 shadow-sm mb-12">
          {activeTab === 'Features' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Feature 1 */}
              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <Search size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Zero hidden costs</h4>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <FileCheck size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Completely paperless</h4>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <TrendingUp size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Attractive interest rate</h4>
              </div>

              {/* Feature 4 */}
              <div className="bg-[#f8f4fc] rounded-xl p-5 border border-purple-100/80 flex flex-col items-start justify-center min-h-[120px]">
                <ArrowDownCircle size={24} className="text-[#5b2e80] mb-3" />
                <h4 className="text-[14.5px] font-bold text-slate-900">Low processing fee</h4>
              </div>

            </div>
          )}

          {activeTab !== 'Features' && (
            <div className="py-9 text-center text-slate-600 text-[14.5px] font-medium">
              Information for <span className="font-extrabold text-[#5b2e80]">{activeTab}</span> is currently available. Please contact SBI customer support for tailored assistance.
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
