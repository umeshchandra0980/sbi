'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { ChevronRight, ChevronLeft, Search, ArrowRight, Download, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { useSearchParams } from 'next/navigation';

export default function InsuranceDashboardPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'Protection Plans' | 'Child Plans' | 'Retirement Plans' | 'Wealth Creation' | 'Savings Plans'>('Protection Plans');
  const [selectedPlan, setSelectedPlan] = useState<'Plan A' | 'Plan B'>('Plan A');
  const [selectedPolicy, setSelectedPolicy] = useState('SBI Life - eShield Insta');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Sync activeTab & selectedPolicy dynamically with URL search parameters
  React.useEffect(() => {
    const cat = searchParams.get('insuranceCategory');
    if (cat === '2') {
      setActiveTab('Child Plans');
      setSelectedPolicy('SBI Life - Smart Scholar Plus');
    } else if (cat === '1') {
      setActiveTab('Protection Plans');
      setSelectedPolicy('SBI Life - eShield Insta');
    } else if (cat === '3') {
      setActiveTab('Retirement Plans');
      setSelectedPolicy('SBI Life - Retire Smart Plus');
    } else if (cat === '4') {
      setActiveTab('Wealth Creation');
    } else if (cat === '5') {
      setActiveTab('Savings Plans');
    }
  }, [searchParams]);

  // Update selected default policy when tab changes
  const handleTabChange = (tab: 'Protection Plans' | 'Child Plans' | 'Retirement Plans' | 'Wealth Creation' | 'Savings Plans') => {
    setActiveTab(tab);
    if (tab === 'Child Plans') {
      setSelectedPolicy('SBI Life - Smart Scholar Plus');
    } else if (tab === 'Protection Plans') {
      setSelectedPolicy('SBI Life - eShield Insta');
    } else if (tab === 'Retirement Plans') {
      setSelectedPolicy('SBI Life - Retire Smart Plus');
    }
  };

  const protectionPolicies = [
    { name: 'SBI Life - eShield Insta', premium: 'Yearly premium ₹ 2,259 onwards*', uin: '111N141V01' },
    { name: 'SBI Life - Saral Jeevan Bima', premium: 'Premium starting from ₹ 1,415', uin: '111N128V01' },
    { name: 'SBI Life - Saral Swadhan Supreme', premium: 'Premium starting from ₹ 7,750', uin: '111N136V01' },
    { name: 'SBI Life - Smart Swadhan Supreme', premium: 'Premium starting from ₹ 5,750', uin: '111N135V01' },
    { name: 'SBI Life - Smart Swadhan Neo', premium: 'Monthly Premium starting from ₹ 425', uin: '111N137V01' },
    { name: 'SBI Life - Smart Shield Plus', premium: 'Yearly premium starting from Rs 2500 p.a.', uin: '111N138V01' }
  ];

  const childPolicies = [
    { name: 'SBI Life - Smart Scholar Plus', premium: 'Premium starting from ₹ 50,000', uin: '111L144V01', arn: 'ARN No. 3Q/YONO/ver1/06/25/WEB/ENG' },
    { name: 'SBI Life - Smart Platina Young Achiever', premium: 'Premium starting from ₹ 50,000', uin: '111N139V01', arn: 'ARN No. 3Y/YONO/Cr1/02/26/WEB/ENG' }
  ];

  const retirementPolicies = [
    { name: 'SBI Life - Retire Smart Plus', premium: 'Premium starting from ₹ 30,000', uin: '111L135V02', arn: 'ARN No. 2Y/YONO/ver1/10/25/WEB/ENG' },
    { name: 'SBI Life - Smart Annuity Plus', premium: 'Premium starting from ₹ 1000', uin: '111N134V10', arn: 'ARN No. 2W/YONO/ver1/11/25/WEB/ENG' }
  ];

  const policies = activeTab === 'Child Plans' 
    ? childPolicies 
    : activeTab === 'Retirement Plans' 
    ? retirementPolicies 
    : protectionPolicies;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f2f8] font-sans">
      {/* Global Header */}
      <SbiGlobalBrandHeader activeNav="Insurance" />

      {/* Breadcrumb Navigation */}
      <div className="max-w-[1360px] w-full mx-auto px-4 md:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#673391]">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700">Life Insurance</span>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-[1360px] w-full mx-auto px-4 md:px-8 pb-16 flex-1 space-y-6">

        {/* Top Hero Banner & Quick Links Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Hero Carousel Banner (9/12) */}
          <div className="lg:col-span-9 bg-gradient-to-r from-[#900037] via-[#a81446] to-[#490c66] rounded-2xl overflow-hidden shadow-sm relative flex flex-col justify-between p-6 md:p-8 min-h-[220px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Left Offer Text */}
              <div className="md:col-span-4 text-white z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
                  Avail the offer designed for you.
                </h2>
              </div>

              {/* Center Image Graphic */}
              <div className="md:col-span-4 flex justify-center z-10">
                <div className="w-48 h-36 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg relative">
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=80" 
                    alt="SBI Life Offer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Protection Card */}
              <div className="md:col-span-4 bg-white rounded-xl p-4 text-center shadow-md z-10 flex flex-col items-center justify-between min-h-[140px]">
                <div className="flex items-center gap-2 text-[#900037] font-bold text-xs">
                  <span className="text-lg">{activeTab === 'Child Plans' ? '👶' : '🛡️'}</span>
                  <span>{activeTab === 'Child Plans' ? 'Child Plans' : 'Protection Plans'}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold mt-1">
                  {selectedPolicy}<br/>UIN: {policies.find(p => p.name === selectedPolicy)?.uin}
                </div>
                <button 
                  type="button" 
                  onClick={() => toast.success(`Initiating ${selectedPolicy} Application...`)}
                  className="bg-[#24135e] text-white hover:bg-[#1a0c49] text-xs font-bold py-1.5 px-6 rounded-full transition-colors mt-2"
                >
                  Buy now
                </button>
                <div className="text-[9px] text-slate-400 font-semibold mt-2">
                  SBI Life | www.sbilife.co.in
                </div>
              </div>

            </div>

            {/* Carousel Navigation Dots & Arrows */}
            <button 
              type="button" 
              onClick={() => setActiveBannerIndex((prev) => (prev === 0 ? 3 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button" 
              onClick={() => setActiveBannerIndex((prev) => (prev === 3 ? 0 : prev + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <div className="flex justify-center items-center gap-1.5 mt-4 z-10">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
                <div 
                  key={dot} 
                  className={`h-1.5 rounded-full transition-all ${
                    dot === activeBannerIndex ? 'w-6 bg-[#673391]' : 'w-1.5 bg-white/50'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Right Column: Quick Links Card (3/12) */}
          <div className="lg:col-span-3 bg-[#f8f5fc] border border-purple-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <h3 className="text-sm font-extrabold text-[#673391] mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button 
                type="button"
                onClick={() => toast('Opening General Insurance...')}
                className="w-full bg-white border border-slate-200/80 hover:border-purple-300 py-2.5 px-4 rounded-xl text-left text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs transition-all"
              >
                <span>🛡️</span>
                <span>General Insurance</span>
              </button>

              <Link
                href="/home/landingPage/manageRelationship/insurance"
                className="w-full bg-white border border-slate-200/80 hover:border-purple-300 py-2.5 px-4 rounded-xl text-left text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs transition-all block"
              >
                <span>📑</span>
                <span>Manage Policies</span>
              </Link>

              <button 
                type="button"
                onClick={() => toast('Resuming saved insurance application...')}
                className="w-full bg-white border border-slate-200/80 hover:border-purple-300 py-2.5 px-4 rounded-xl text-left text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs transition-all"
              >
                <span>▶️</span>
                <span>Resume Application</span>
              </button>
            </div>
          </div>

        </div>

        {/* Life Insurance Section Heading */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#673391]" style={{ fontFamily: 'Roboto, sans-serif' }}>Life Insurance</h1>
          <p className="text-xs font-semibold text-slate-600 mt-1">
            Secure your today and tomorrow with a versatile insurance product
          </p>
        </div>

        {/* Sub-Category Pills */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'Protection Plans', label: 'Protection Plans', icon: '☂️' },
            { id: 'Child Plans', label: 'Child Plans', icon: '👶' },
            { id: 'Retirement Plans', label: 'Retirement Plans', icon: '🧑‍🦯' },
            { id: 'Wealth Creation', label: 'Wealth Creation', icon: '🌱' },
            { id: 'Savings Plans', label: 'Savings Plans', icon: '👛' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#673391] border-2 border-[#673391] shadow-xs'
                  : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Insurance Details Workspace: Left Policy Selector List & Right Plan Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Search & Policy List (4/12) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Search Box */}
            <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 flex items-center gap-2 shadow-2xs">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Policy Selectable List */}
            <div className="space-y-3">
              {policies.map((p) => {
                const isSelected = selectedPolicy === p.name;
                return (
                  <div
                    key={p.name}
                    onClick={() => setSelectedPolicy(p.name)}
                    className={`rounded-2xl p-4 cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#673391] text-white border-[#673391] shadow-md'
                        : 'bg-white text-slate-900 border-slate-200/80 hover:border-purple-200 shadow-2xs'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className={`text-[11px] font-semibold mt-1 ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                      {p.premium}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Policy Benefits & Options (8/12) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Header Title & UIN */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="bg-[#673391] text-white px-4 py-1.5 rounded-lg text-xs font-bold">
                  {selectedPolicy}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Product UIN: {policies.find(p => p.name === selectedPolicy)?.uin || '111L144V01'}
                </div>
              </div>

              {/* Plan Benefits Sub-header */}
              <div>
                <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>Plan benefits</h3>
                <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  {selectedPolicy === 'SBI Life - Smart Platina Young Achiever'
                    ? 'ARN No. 3Y/YONO/Cr1/02/26/WEB/ENG'
                    : selectedPolicy === 'SBI Life - Smart Scholar Plus'
                    ? 'ARN No. 3Q/YONO/ver1/06/25/WEB/ENG'
                    : selectedPolicy === 'SBI Life - Retire Smart Plus'
                    ? 'ARN No. 2Y/YONO/ver1/10/25/WEB/ENG'
                    : selectedPolicy === 'SBI Life - Smart Annuity Plus'
                    ? 'ARN No. 2W/YONO/ver1/11/25/WEB/ENG'
                    : 'ARN No. 3C/YONO/Cr1/ver1/11/25/WEB/ENG'}
                </div>
              </div>

              {/* Protection Plans Plan A / Plan B Tabs */}
              {activeTab === 'Protection Plans' && (
                <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('Plan A')}
                    className={`text-sm font-bold pb-2 relative transition-colors ${
                      selectedPlan === 'Plan A' ? 'text-[#673391]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Plan A
                    {selectedPlan === 'Plan A' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('Plan B')}
                    className={`text-sm font-bold pb-2 relative transition-colors ${
                      selectedPlan === 'Plan B' ? 'text-[#673391]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Plan B
                    {selectedPlan === 'Plan B' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                    )}
                  </button>
                </div>
              )}

              {/* Feature Benefit Cards Rendered Based on Selected Policy */}
              {selectedPolicy === 'SBI Life - Retire Smart Plus' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Flexibility of premium Payment</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Option to pay Single Premium, Regular Premium or for a limited period
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Life cover upto 70 years</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Minimum age at Entry: 20 years<br/>Maximum age at Entry: 60 years
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Choice of fund to suit your needs</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Flexibility of choosing from 7 diverse options with unlimited free switches during the policy term.
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Secure your future with SBI Life - Retire Smart Plus</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Ensure that the financial stability your enjoy today to explore various aspects of life continues even after you retire with SBI Life - Retire Smart Plus
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1 md:col-span-2">
                    <h5 className="text-xs font-bold text-slate-900">Additional Feature</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Loyalty additions# payable every year starting from end of 15th Policy year.<br/>#Please refer to section of Loyalty Additions in sales brochure.
                    </p>
                  </div>

                </div>
              ) : selectedPolicy === 'SBI Life - Smart Annuity Plus' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Secure your future with SBI Life - Smart Annuity Plus</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Enjoy Guaranteed Lifelong Regular Income
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Benefit for Higher Purchase Price</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Avail the benefit of Higher Annuity Rates for Large Premium
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Choice of Plan to suit your needs!</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Freedom to choose from the wide range of Annuity Options
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Customize the Plan to meet your requirements</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Option to choose frequency of annual payouts -Monthly, Quarterly, Half -yearly or Yearly
                    </p>
                  </div>

                </div>
              ) : selectedPolicy === 'SBI Life - Smart Scholar Plus' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Sum Assured</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Limited Pay / Regular Pay: 10 x Annualized Premium<br/>Single Pay: 1.25 x Single Premium
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Life cover</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      For Parent (Life Assured): upto 65 years
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Twin Benefits</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Twin benefits of Insurance cover and market linked returns
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Dual Protection for your childs Future</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Payment of lumpsum benefit Inbuilt Premium Payor Waiver Benefit to ensure continuance of your policy
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Customize the plan to meet your requirements</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Flexibility to choose Policy Term, Premium Paying Term & Premium frequency as per your requirement
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Additional Coverage through Inbuilt Benefit</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Accident Benefit which includes Accidental Death and Accidental Total and Permanent Disability
                    </p>
                  </div>

                </div>
              ) : selectedPolicy === 'SBI Life - Smart Platina Young Achiever' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Annualized Premium</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Minimum: Rs.50,000<br/>Maximum: No Limit (As per the Board Approved Underwriting Policy)
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Entry Age</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Minimum Child's age at Entry: 30 days<br/>Maximum Child's age at Entry:15 years<br/>Minimum Proposer's age at Entry: 18 years<br/>Maximum Proposer's age at Entry: 65 years
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Customize the plan to meet your requirements</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Premium Payment term: 7 or 10 years<br/>Policy Term: 15 years to 25 years
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Give your child a liberating future with Guaranteed Benefits</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Dream of giving your child a life full of opportunities is here. Empower your child's future with SBI Life – Smart Platina Young Achiever.
                    </p>
                  </div>

                </div>
              ) : (
                <>
                  <h4 className="text-lg font-bold text-[#673391]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Pure Term Insurance
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">Enrollment process</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                        Easy enrolment through instant and swift processing of policy
                      </p>
                    </div>

                    <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">Convenience</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                        Convenience of paying premium regularly for a period of 10 years
                      </p>
                    </div>

                    <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">Tax benefits</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                        Get tax benefits** as per the prevailing norms under the Income Tax Act, 1961
                      </p>
                    </div>

                    <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">Return after maturity</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                        No
                      </p>
                    </div>

                  </div>
                </>
              )}

              {/* Download Brochure & Proceed Button Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => toast.success('Downloading Brochure PDF...')}
                  className="text-xs font-bold text-[#673391] underline hover:opacity-85"
                >
                  Download Brochure
                </button>

                <button
                  type="button"
                  onClick={() => toast.success(`Proceeding to buy ${selectedPolicy}...`)}
                  className="bg-[#673391] hover:bg-[#542777] text-white font-bold text-xs py-3 px-10 rounded-full shadow-sm transition-all"
                >
                  Proceed to Buy
                </button>
              </div>

              {/* Download FAQs box */}
              <div className="bg-[#fcfaff] border border-purple-100/90 rounded-xl p-4 flex items-center justify-between max-w-sm shadow-2xs">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Frequently asked questions</h5>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    Download FAQs for answers to queries
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => toast.success('Downloading FAQs...')}
                  className="w-8 h-8 rounded-full text-[#673391] flex items-center justify-center hover:bg-purple-100 transition-colors flex-shrink-0 ml-4"
                >
                  <Download size={16} />
                </button>
              </div>

              {/* Legal Disclaimer Box at Bottom (Only rendered for Protection Plans with asterisk/footnotes) */}
              {(activeTab === 'Protection Plans' || selectedPolicy === 'SBI Life - eShield Insta') && (
                <div className="bg-[#f3f0f7] rounded-xl p-4 text-[11px] font-medium text-slate-600 leading-relaxed space-y-2 border border-purple-100/60">
                  <div className="flex items-start gap-2">
                    <span className="text-[#673391] font-bold">ⓘ</span>
                    <p>
                      * Premium range may vary based on frequency of premium payment and/or premium type selected. Premiums are subject to underwriting. The premium amount shown is inclusive of GST.
                    </p>
                  </div>
                  <p className="pl-5">
                    ** You may be eligible for Income Tax benefits as per the applicable income tax laws, which are subject to change from time to time. You are advised to consult your tax advisor on applicable tax benefits under the policy.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#333333] text-white text-xs py-3 text-center border-t border-slate-700">
        <div className="flex justify-center items-center gap-3">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
