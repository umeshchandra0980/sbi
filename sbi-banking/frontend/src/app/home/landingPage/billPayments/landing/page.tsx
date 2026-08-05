'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function BillPaymentsLandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (categoryName: string) => {
    toast.success(`Opening ${categoryName} payment portal...`);
  };

  // Service categories matching exact Angular HTML structure with official CDN SVG URLs
  const rechargeServices = [
    {
      name: 'Mobile Prepaid',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/mobilerecharge_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <line x1="11" y1="18" x2="13" y2="18" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 6h4" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'DTH',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/dth_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 15a8 8 0 0 0 11.3 0" />
          <path d="M6.5 12.5a5 5 0 0 0 7 0" />
          <path d="M12 20v-5" />
          <path d="M15 8l-4 4" />
          <circle cx="16.5" cy="6.5" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Cable TV',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/cabletv_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 3l4 4 4-4" />
        </svg>
      )
    },
    {
      name: 'Fastag',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/fasttag_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 17h14v-4H5v4z" />
          <path d="M7 13V8l5-3 5 3v5" />
          <circle cx="9" cy="17" r="1.5" />
          <circle cx="15" cy="17" r="1.5" />
        </svg>
      )
    }
  ];

  const utilityServices = [
    {
      name: 'Water',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/water_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    },
    {
      name: 'Broadband Postpaid',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/broadbandpostpaid_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="14" width="20" height="7" rx="2" />
          <path d="M6 18h.01M10 18h.01" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 10a9 9 0 0 1 14 0" />
          <path d="M8.5 12.5a5 5 0 0 1 7 0" />
        </svg>
      )
    },
    {
      name: 'LPG Gas',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/gasbill_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="6" y="8" width="12" height="14" rx="3" />
          <path d="M9 4h6v4H9z" />
          <path d="M12 2v2" />
        </svg>
      )
    },
    {
      name: 'Education Fees',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/educationfees_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
        </svg>
      )
    },
    {
      name: 'Rental',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/rental_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
          <path d="M9 21V12h6v9" />
        </svg>
      )
    },
    {
      name: 'Gas',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/gas_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2c-3.5 4-6 7.5-6 11a6 6 0 0 0 12 0c0-3.5-2.5-7-6-11z" />
        </svg>
      )
    },
    {
      name: 'Landline Postpaid',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/contactslandline_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    },
    {
      name: 'Mobile Postpaid',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/mobile-postpaid_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
          <path d="M10 6h4" />
        </svg>
      )
    },
    {
      name: 'Electricity',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/electricity_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    },
    {
      name: 'Prepaid Meter',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/prepaidmeter_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <rect x="7" y="6" width="10" height="5" rx="1" fill="#f4edf9" />
          <circle cx="9" cy="15" r="1" fill="currentColor" />
          <circle cx="15" cy="15" r="1" fill="currentColor" />
        </svg>
      )
    }
  ];

  const financialServices = [
    {
      name: 'Credit Card',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/creditcard_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      )
    },
    {
      name: 'Insurance',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/insurance_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      name: 'Loan Repayment',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/loanrepayments_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      )
    },
    {
      name: 'Mutual Fund',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/mutualfunds_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: 'Municipal Taxes',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/municipaltaxes_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
        </svg>
      )
    },
    {
      name: 'Recurring Deposit',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/recurringdeposit_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v4l3 3" />
        </svg>
      )
    },
    {
      name: 'NCMC Recharge',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/ncmc_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8" cy="10" r="2" />
          <path d="M14 10h4M8 16h10" />
        </svg>
      )
    },
    {
      name: 'Forex',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/forex_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v12M15 9.5H9.5a2.5 2.5 0 0 1 0-5H14.5a2.5 2.5 0 0 1 0 5H9.5a2.5 2.5 0 0 0 0 5H15" />
        </svg>
      )
    }
  ];

  const moreServices = [
    {
      name: 'Clubs and Associations',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/clubsandassociation_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      name: 'Housing Society',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/housingsociety_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M11 18h2v4h-2z" />
        </svg>
      )
    },
    {
      name: 'Subscription',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/subscription_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
          <circle cx="5" cy="19" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Municipal Services',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/municipalservices_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M2 22h20M12 2l10 7v13H2V9l10-7z" />
        </svg>
      )
    },
    {
      name: 'Donation',
      imgUrl: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/donation_svg',
      fallbackIcon: (
        <svg className="w-8 h-8 text-[#673391]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f0f8] text-slate-800 flex flex-col justify-between" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div>
        {/* SBI Global Header with Payments active */}
        <SbiGlobalBrandHeader activeNav="Payments" activeTopTab="Banking" />

        {/* Main Container matching container-xxl custom-container */}
        <main className="max-w-[1280px] w-full mx-auto px-4 py-6">
          
          {/* Back Button matching <app-back-button> */}
          <div className="mb-4">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#673391] hover:underline cursor-pointer transition-colors"
            >
              <ChevronLeft size={18} className="text-[#673391]" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* H1 Heading: Bill Payments */}
          <h1 className="text-[18px] font-bold text-[#673391] mb-6 tracking-tight">
            Bill Payments
          </h1>

          {/* Main 2-Column Grid (8 cols left / 4 cols right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Search Bar Container */}
              <div className="bg-white rounded-2xl p-2.5 shadow-2xs border border-slate-200/80 flex items-center gap-3">
                <Search size={18} className="text-slate-400 ml-2 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here..."
                  className="w-full bg-transparent border-none outline-none text-[14px] text-slate-800 placeholder-slate-400 py-1"
                />
              </div>

              {/* Card 1: My Bills and Payment History */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[18px] font-semibold text-[#673391]">
                    My Bills and Payment History
                  </span>
                  <span className="bg-[#b02a87] text-white text-[12px] font-semibold px-3 py-1 rounded-full shadow-2xs">
                    0 Added Billers
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toast('Opening Payment History...')}
                  className="w-10 h-10 rounded-full bg-[#f4edf9] hover:bg-[#e8d5f5] text-[#673391] flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                  aria-label="My Bills and Payment History"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Card 2: Bills Due */}
              <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 min-h-[160px] flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-[18px] font-semibold text-[#673391]">
                    Bills Due
                  </h2>
                  <span className="bg-[#b02a87] text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                    0
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h3 className="text-[16px] font-bold text-slate-800">
                    No Bills Due
                  </h3>
                </div>
              </div>

              {/* Card 3: Bill Categories */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-slate-100 space-y-8">
                
                {/* Header */}
                <div>
                  <h2 className="text-[18px] font-bold text-[#673391] mb-1">
                    Bill Categories
                  </h2>
                  <p className="text-[14px] text-slate-500 font-normal">
                    To Add a new bill, select the required biller from bill categories and proceed.
                  </p>
                </div>

                {/* Section 1: Recharge */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white">
                  <h3 className="text-[14px] font-bold text-slate-800 mb-4">
                    Recharge
                  </h3>
                  <div className="grid grid-cols-6 gap-2 sm:gap-4">
                    {rechargeServices.map((srv, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCategoryClick(srv.name)}
                        className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-[#f4edf9]/50 cursor-pointer transition-all text-center group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                          <img 
                            src={srv.imgUrl} 
                            alt={srv.name} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className="text-[13px] sm:text-[14px] font-medium text-slate-800 leading-tight group-hover:text-[#673391] transition-colors">
                          {srv.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Utility Bill Payments */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white">
                  <h3 className="text-[14px] font-bold text-slate-800 mb-4">
                    Utility Bill Payments
                  </h3>
                  <div className="grid grid-cols-6 gap-2 sm:gap-4">
                    {utilityServices.map((srv, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCategoryClick(srv.name)}
                        className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-[#f4edf9]/50 cursor-pointer transition-all text-center group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                          <img 
                            src={srv.imgUrl} 
                            alt={srv.name} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className="text-[13px] sm:text-[14px] font-medium text-slate-800 leading-tight group-hover:text-[#673391] transition-colors">
                          {srv.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Financial Services and Taxes */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white">
                  <h3 className="text-[14px] font-bold text-slate-800 mb-4">
                    Financial Services and Taxes
                  </h3>
                  <div className="grid grid-cols-6 gap-2 sm:gap-4">
                    {financialServices.map((srv, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCategoryClick(srv.name)}
                        className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-[#f4edf9]/50 cursor-pointer transition-all text-center group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                          <img 
                            src={srv.imgUrl} 
                            alt={srv.name} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className="text-[13px] sm:text-[14px] font-medium text-slate-800 leading-tight group-hover:text-[#673391] transition-colors">
                          {srv.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: More Services */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white">
                  <h3 className="text-[14px] font-bold text-slate-800 mb-4">
                    More Services
                  </h3>
                  <div className="grid grid-cols-6 gap-2 sm:gap-4">
                    {moreServices.map((srv, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleCategoryClick(srv.name)}
                        className="flex flex-col items-center justify-start p-2 rounded-xl hover:bg-[#f4edf9]/50 cursor-pointer transition-all text-center group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                          <img 
                            src={srv.imgUrl} 
                            alt={srv.name} 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className="text-[13px] sm:text-[14px] font-medium text-slate-800 leading-tight group-hover:text-[#673391] transition-colors">
                          {srv.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN (lg:col-span-4) - Reserved space for side banner */}
            <div className="lg:col-span-4" />

          </div>

        </main>
      </div>

      {/* Footer Links */}
      <footer className="bg-[#292929] text-white py-4 text-center text-[12px] font-medium mt-12">
        <div className="flex items-center justify-center gap-4 text-slate-300">
          <a href="#" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="#" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
