'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function FastagPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackToHome = () => {
    router.push('/dashboard');
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between relative bg-cover bg-center bg-no-repeat select-none"
      style={{ backgroundImage: "url('/images/fastag_bg.png')" }}
    >
      {/* Dark overlay over background image */}
      <div className="absolute inset-0 bg-[#02182c]/45 z-0 pointer-events-none" />

      {/* Top Header Bar */}
      <header className="bg-[#0f4d80] py-3 px-6 md:px-12 flex justify-between items-center shadow-md z-10 relative">
        <span className="text-white font-bold text-xs md:text-sm tracking-wide font-sans">
          Customer Online Registration | Vehicle Details
        </span>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={handleBackToHome}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer"
          >
            Back to Portal
          </button>
          <button 
            type="button"
            className="bg-white text-[#0f4d80] px-4 py-1 rounded text-xs font-bold shadow-2xs hover:bg-slate-100 transition-colors"
          >
            English
          </button>
        </div>
      </header>

      {/* Main Content Area (Centering the Modal) */}
      <main className="flex-1 flex items-center justify-center p-4 z-10 relative">
        {showModal ? (
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200/50 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#2b92e4] py-3.5 px-6 border-b border-blue-400/20">
              <h2 className="text-white font-bold text-sm md:text-base tracking-wide font-sans">
                Important Notice
              </h2>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 md:p-8 max-h-[360px] overflow-y-auto text-xs md:text-sm text-[#2b2b2b] leading-relaxed font-sans space-y-4">
              <p className="font-bold text-[#673391]">
                Dear SBI FASTag Customer,
              </p>
              
              <p className="font-medium text-slate-700">
                We hope this message finds you well. This is to inform you about an important update regarding the usage of FASTag from regulator side. We would like to bring to your attention below points:-
              </p>

              <ol className="space-y-3.5 list-decimal pl-5 font-semibold text-slate-800">
                <li>
                  Only recent FASTag issued on your vehicle will be considered as your active FASTag.
                </li>
                <li>
                  Update in the tag that is hotlisted/blacklisted will not be allowed.
                </li>
                <li>
                  Update tag to a VRN having previous hotlisted/Black listed tag, the updated tag will be closed. Incase the hotlisted/blacklisted tag is of Paytm tag, then it will be ignored and VRN update will be allowed.
                </li>
                <li>
                  Tags present in &quot;Hotlist&quot;,&quot;Blacklist&quot; will not be added into tag force closure list (during Tag Registration and Update)
                </li>
                <li>
                  In case a tag added to &quot;Low balance&quot; under Forceful Tag Closure(FTC), is the only active tag left on the VRN at the time of closure (on T+15th Day), that tag will not be &quot;Closed&quot;.
                </li>
                <li>
                  When a tag is added or updated, and there are multiple tags against the Vehicle and both the tags are having same issue date, then the tag having older creation date/timestamp will be considered for force closure.
                </li>
              </ol>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-100 py-3.5 px-6 flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-[#d9534f] hover:bg-[#c9302c] text-white font-extrabold text-xs py-2 px-8 rounded shadow-xs transition-colors cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          /* Background Interface shown when modal is closed */
          <div className="bg-white/95 backdrop-blur-xs rounded-2xl max-w-lg w-full p-8 text-center border border-white/20 shadow-2xl flex flex-col items-center animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Notice Acknowledged</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Thank you for reviewing the regulatory guidelines. You can now proceed with registration or manage details.
            </p>
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Reopen Notice
              </button>
              <button
                type="button"
                onClick={handleBackToHome}
                className="flex-1 bg-[#0f4d80] hover:bg-[#0c3f6a] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Back to Portal
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Disclaimer Footer Bar */}
      <footer className="bg-[#0a2f52] py-4 px-6 md:px-12 z-10 relative border-t border-blue-900/20">
        <p className="text-white/80 text-[10px] md:text-xs text-center font-normal leading-normal max-w-5xl mx-auto">
          This application is meant to be used by Authorized Individuals only. All activities on this application are logged and monitored by the Bank. Any unauthorized access shall be treated as violation of Bank&apos;s IT &amp; IS Policies and shall be penalized accordingly.
        </p>
      </footer>
    </div>
  );
}
