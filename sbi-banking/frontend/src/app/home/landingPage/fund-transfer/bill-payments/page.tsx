'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

// Exact SVG replicas from the YONO portal screenshots
const MobilePrepaidIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    <line x1="9" y1="6" x2="15" y2="6" />
  </svg>
);

const DthIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10a8 8 0 0 1 16 0" />
    <path d="M12 10v10" />
    <path d="M8 20h8" />
    <circle cx="12" cy="6" r="2" />
  </svg>
);

const CableTvIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="13" rx="2" />
    <path d="M12 16v4" />
    <path d="M8 20h8" />
  </svg>
);

const FastagIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="12" rx="2" />
    <path d="M7 16v3" />
    <path d="M17 16v3" />
    <circle cx="12" cy="10" r="1.5" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

const BroadbandIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="18" r="1" />
    <path d="M5 12a10 10 0 0 1 14 0" />
    <path d="M8.5 15.5a5 5 0 0 1 7 0" />
  </svg>
);

const LpgGasIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="8" width="12" height="14" rx="3" />
    <path d="M9 8V4h6V8" />
    <path d="M12 12v4" />
  </svg>
);

const EducationIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10l-10-5-10 5 10 5 10-5z" />
    <path d="M6 12v5c0 2 2.7 3 6 3s6-1 6-3v-5" />
  </svg>
);

const RentalIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const GasIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c0 0-4 4.5-4 7.5a4 4 0 0 0 8 0C16 6.5 12 2 12 2z" />
    <path d="M12 12v8" />
  </svg>
);

const LandlineIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MobilePostpaidIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
  </svg>
);

const ElectricityIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <path d="m11 7 2 3h-3l2 3" stroke="#681d82" strokeWidth="1.5" />
  </svg>
);

const PrepaidMeterIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 12l4-4" />
    <path d="m10 11 2 2h-2l2 2" stroke="#681d82" strokeWidth="1.5" />
  </svg>
);

const CreditCardIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <rect x="6" y="13" width="3" height="2" rx="0.5" />
  </svg>
);

const InsuranceIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 11 2 2 4-4" />
  </svg>
);

const LoanIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
    <text x="12" y="15.5" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#681d82" stroke="none" fontFamily="sans-serif">₹</text>
    <path d="M17.5 9.5l1-1.5-1.5-1M6.5 14.5l-1 1.5 1.5 1" />
  </svg>
);

const MutualFundIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="17" r="4" />
    <text x="12" y="20.2" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#681d82" stroke="none" fontFamily="sans-serif">₹</text>
    <path d="M12 13V7M12 9c2-1 3-3 3-3M12 11c-2-1-3-3-3-3" strokeLinecap="round" />
  </svg>
);

const MunicipalTaxesIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
    <rect x="10" y="14" width="4" height="7" />
    <path d="M17 5v3" />
  </svg>
);

const RecurringDepositIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
    <text x="12" y="15.5" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#681d82" stroke="none" fontFamily="sans-serif">₹</text>
    <path d="M17.5 9.5l1-1.5-1.5-1M6.5 14.5l-1 1.5 1.5 1" />
  </svg>
);

const NcmcIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M8 9h8v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9z" />
    <circle cx="10" cy="14" r="1" fill="#681d82" />
    <circle cx="14" cy="14" r="1" fill="#681d82" />
  </svg>
);

const ForexIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    <text x="12" y="16" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#681d82" stroke="none" fontFamily="sans-serif">$</text>
  </svg>
);

const ClubsIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="6" width="11" height="13" rx="1" />
    <rect x="10" y="9" width="11" height="9" rx="1" />
    <line x1="6" y1="10" x2="11" y2="10" />
    <line x1="13" y1="13" x2="18" y2="13" />
  </svg>
);

const HousingIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M12 11c-1-1.5-3 0 0 2.5 3-2.5 1-4 0-2.5z" fill="#681d82" stroke="none" />
  </svg>
);

const SubscriptionIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="12" cy="12" r="3" />
    <path d="m11 10.5 2.5 1.5-2.5 1.5v-3z" fill="#681d82" />
  </svg>
);

const MunicipalServicesIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 21h18M5 21V10l7-5 7 5v11" />
    <rect x="10" y="14" width="4" height="7" />
    <path d="M17 5v3" />
  </svg>
);

const DonationIcon = () => (
  <svg className="w-6 h-6 text-[#681d82]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 14h6v6H2zM8 14l5-5h3l-2 5M16 11h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4" />
    <circle cx="12" cy="5" r="2" />
  </svg>
);

export default function BillPaymentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Category definitions
  const categories = [
    {
      title: 'Recharge',
      items: [
        { label: 'Mobile Prepaid', icon: MobilePrepaidIcon },
        { label: 'DTH', icon: DthIcon },
        { label: 'Cable TV', icon: CableTvIcon },
        { label: 'Fastag', icon: FastagIcon },
      ]
    },
    {
      title: 'Utility Bill Payments',
      items: [
        { label: 'Water', icon: WaterIcon },
        { label: 'Broadband Postpaid', icon: BroadbandIcon },
        { label: 'LPG Gas', icon: LpgGasIcon },
        { label: 'Education Fees', icon: EducationIcon },
        { label: 'Rental', icon: RentalIcon },
        { label: 'Gas', icon: GasIcon },
        { label: 'Landline Postpaid', icon: LandlineIcon },
        { label: 'Mobile Postpaid', icon: MobilePostpaidIcon },
        { label: 'Electricity', icon: ElectricityIcon },
        { label: 'Prepaid Meter', icon: PrepaidMeterIcon },
      ]
    },
    {
      title: 'Financial Services and Taxes',
      items: [
        { label: 'Credit Card', icon: CreditCardIcon },
        { label: 'Insurance', icon: InsuranceIcon },
        { label: 'Loan Repayment', icon: LoanIcon },
        { label: 'Mutual Fund', icon: MutualFundIcon },
        { label: 'Municipal Taxes', icon: MunicipalTaxesIcon },
        { label: 'Recurring Deposit', icon: RecurringDepositIcon },
        { label: 'NCMC Recharge', icon: NcmcIcon },
        { label: 'Forex', icon: ForexIcon },
      ]
    },
    {
      title: 'More Services',
      items: [
        { label: 'Clubs and Associations', icon: ClubsIcon },
        { label: 'Housing Society', icon: HousingIcon },
        { label: 'Subscription', icon: SubscriptionIcon },
        { label: 'Municipal Services', icon: MunicipalServicesIcon },
        { label: 'Donation', icon: DonationIcon },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f9] flex flex-col font-sans">
      {/* Sticky Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Payments" />

      {/* Main Content Area */}
      <main className="max-w-[1360px] w-full mx-auto p-8 space-y-6 flex-1">
        
        {/* Back navigation link */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-1 text-xs font-bold text-[#681d82] hover:underline select-none"
        >
          <ChevronLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-[26px] font-bold text-[#681d82] tracking-tight font-sans mt-2">
          Bill Payments
        </h1>

        {/* Search Input Box */}
        <div className="w-full bg-white border border-slate-200/80 rounded-2xl py-3.5 px-5 flex items-center select-none shadow-xs">
          <Search size={18} className="text-slate-400 mr-3.5 shrink-0" />
          <input 
            type="text" 
            placeholder="Search here..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full text-slate-800 placeholder-slate-400 font-sans" 
          />
        </div>

        {/* Card 1: My Bills and Payment History */}
        <div 
          onClick={() => toast.success("Opening Bill History")}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-all select-none shadow-xs"
        >
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-bold text-slate-800 font-sans">
              My Bills and Payment History
            </span>
            <span className="bg-[#b81d6c] text-[10px] text-white font-extrabold px-2.5 py-0.5 rounded-full font-sans tracking-wide">
              0 Added Billers
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <ChevronRight size={16} />
          </div>
        </div>

        {/* Card 2: Bills Due */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs select-none">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[15px] font-bold text-slate-800 font-sans">
              Bills Due
            </span>
            <span className="bg-[#b81d6c] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center font-sans">
              0
            </span>
          </div>
          <div className="py-8 flex justify-center items-center text-slate-500 font-semibold font-sans text-[14px]">
            No Bills Due
          </div>
        </div>

        {/* Card 3: Bill Categories Heading */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-[17px] font-bold text-slate-800 font-sans">
              Bill Categories
            </h2>
            <p className="text-[12px] text-slate-500 font-medium font-sans">
              To Add a new bill, select the required biller from bill categories and proceed.
            </p>
          </div>

          {/* Group Category Cards */}
          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs select-none"
              >
                <h3 className="text-[15px] font-bold text-slate-800 mb-6 font-sans">
                  {cat.title}
                </h3>
                
                {/* Horizontal flex list of items (clustered close together) */}
                <div className="flex flex-wrap gap-x-12 gap-y-8 justify-start items-start">
                  {cat.items.map((item, itemIdx) => {
                    const Icon = item.icon;
                    return (
                      <div 
                        key={itemIdx}
                        onClick={() => toast.success(`Starting ${item.label} payment setup`)}
                        className="flex flex-col items-center justify-start text-center group cursor-pointer w-[76px] shrink-0"
                      >
                        <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-[#681d82] group-hover:bg-purple-50 group-hover:border-purple-200 transition-all shadow-xs mb-2 bg-transparent shrink-0">
                          <Icon />
                        </div>
                        <span className="text-[11.5px] font-semibold text-slate-700 font-sans tracking-wide leading-tight group-hover:text-purple-800 transition-all w-full">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#2c2c2c] text-white/90 text-xs py-3.5 px-8 flex justify-center items-center mt-8 shrink-0 select-none font-sans">
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
