'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, FileText, Award, Percent, DollarSign, ShieldCheck, PieChart } from 'lucide-react';

export default function TaxRelatedPage() {
  const router = useRouter();

  const taxServices = [
    {
      id: 'form15gh',
      title: 'Form 15G/H',
      icon: <FileText className="w-5 h-5 text-[#673391]" />,
      href: '/home/landingPage/services/tax-related/form-ghHome'
    },
    {
      id: 'form16a',
      title: 'Form 16A (TDS Certificate)',
      icon: <FileText className="w-5 h-5 text-[#673391]" />,
      href: '/home/landingPage/services/tax-related/interest-certificate'
    },
    {
      id: 'interestCert',
      title: 'Interest Certificate',
      icon: <Award className="w-5 h-5 text-[#673391]" />,
      href: '/home/landingPage/services/tax-related/interest-certificate'
    },
    {
      id: 'balanceCert',
      title: 'Balance Certificate',
      icon: <FileText className="w-5 h-5 text-[#673391]" />,
      href: '/home/landingPage/services/tax-related/balance-certificate'
    },
    {
      id: 'form26as',
      title: 'Form 26AS',
      icon: <Percent className="w-5 h-5 text-[#673391]" />,
      action: () => toast('Coming Soon', {
        icon: 'ℹ️',
        position: 'bottom-center',
        style: {
          background: '#333333',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 18px',
        },
      })
    },
    {
      id: 'directTaxes',
      title: 'Direct Taxes',
      icon: <DollarSign className="w-5 h-5 text-[#673391]" />,
      href: '/home/landingPage/services/tax-related/direct-taxes'
    },
    {
      id: 'efiling',
      title: 'E-filing/E-verify',
      icon: <ShieldCheck className="w-5 h-5 text-[#673391]" />,
      href: '/home/landingPage/services/tax-related/e-file-verify'
    },
    {
      id: 'tdsProjection',
      title: 'TDS Projection Report',
      icon: <PieChart className="w-5 h-5 text-[#673391]" />,
      href: '/home/landingPage/services/tax-related/tds-projection-report'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col">
      {/* Top Global Navigation Header */}
      <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

      {/* Main Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
          <Link href="/dashboard" className="hover:text-[#673391] transition-colors">
            <Home size={15} className="text-[#673391]" />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="hover:text-[#673391] cursor-pointer">Profile</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="hover:text-[#673391] cursor-pointer">Access Services</span>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-[#673391] font-bold">Tax Related</span>
        </div>

        {/* Page Heading */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#673391] mb-6 tracking-tight">
          Tax Related
        </h1>

        {/* White Grid Container Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xs border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {taxServices.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  if (service.href) {
                    router.push(service.href);
                  } else if (service.action) {
                    service.action();
                  }
                }}
                className="bg-white border border-slate-200/80 hover:border-purple-300 rounded-2xl flex items-center justify-between overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Icon Box */}
                <div className="w-16 h-16 bg-[#f4edf9] group-hover:bg-[#e8d5f5] flex items-center justify-center transition-colors flex-shrink-0">
                  {service.icon}
                </div>

                {/* Title */}
                <div className="flex-1 px-4 py-3 font-bold text-xs md:text-sm text-slate-800 group-hover:text-[#673391] transition-colors leading-snug">
                  {service.title}
                </div>

                {/* Arrow */}
                <div className="pr-4 text-slate-400 group-hover:text-[#673391] transition-all group-hover:translate-x-0.5">
                  <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
