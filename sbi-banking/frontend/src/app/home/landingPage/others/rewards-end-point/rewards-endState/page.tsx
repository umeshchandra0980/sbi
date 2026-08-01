'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Search,
  Bell,
  ChevronRight,
  ChevronLeft,
  Star,
  Gift,
  ShieldCheck,
  Percent,
  Sparkles,
  Award,
  Zap,
  ShoppingBag,
  TrendingUp,
  Tag,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Filter
} from 'lucide-react';
import './rewards.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function SbiRewardsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Offers' | 'Summary' | 'Smart Rewards'>('Offers');
  const [pointsCount, setPointsCount] = useState<number>(0);
  const [selectedOfferModal, setSelectedOfferModal] = useState<any>(null);

  // Quick Circle Stories / Banners matching SBI YONO Rewards
  const quickBanners = [
    { name: "Welcome to Yono", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64" },
    { name: "Fraud Awareness", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/fraudawareness2_thumbnail_64x6" },
    { name: "Tax Related Services", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64" },
    { name: "e - Secure Lock", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/yp_secure_lock_banner_sbi_thumbnail_64x64_23_11zon" },
    { name: "Sustainability", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sustainibility_thumbnail_64x64" },
    { name: "SIP", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64" },
    { name: "Credit Card", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64" },
    { name: "Invest Now", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64" },
    { name: "Secure your future", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/pacl_fbtrc_thumbnail_64x6" },
    { name: "Dream your Home", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/pacl_fbtrc_thumbnail_64x6" }
  ];

  // Offers Data
  const offersList = [
    {
      id: 'cult-fit',
      brand: 'Cult.fit',
      title: 'Get Extra Rs. 700/- off on Cultpass "Elite" membership',
      badgePoints: 'At ₹30',
      originalPoints: '100',
      bgType: 'cult',
      bgGradient: 'from-zinc-950 to-neutral-900',
      logoText: 'cult.fit',
      logoStyle: 'font-extrabold tracking-wider text-xl italic text-white flex items-center gap-1',
      description: 'Unlock unlimited access to all Cult centers, group classes, luxury gyms, and home workouts with Cultpass Elite membership.',
      code: 'SBICULT700'
    },
    {
      id: 'marshall',
      brand: 'Marshall',
      title: 'Flat 15% off on Marshall',
      badgePoints: 'At ₹20',
      originalPoints: '100',
      bgType: 'marshall',
      bgGradient: 'from-black via-zinc-900 to-stone-900',
      logoText: 'Marshall',
      logoStyle: 'font-serif text-2xl font-bold tracking-tight italic text-white',
      description: 'Get flat 15% discount on Marshall premium wireless headphones, Bluetooth speakers, and iconic audio gear.',
      code: 'SBIMARSHALL15'
    },
    {
      id: 'myntra',
      brand: 'Myntra',
      title: 'Flat 20% Extra off on Fashion & Accessories',
      badgePoints: 'At ₹25',
      originalPoints: '150',
      bgType: 'myntra',
      bgGradient: 'from-pink-950 via-rose-950 to-zinc-900',
      logoText: 'Myntra',
      logoStyle: 'font-black text-2xl tracking-tighter text-pink-500',
      description: 'Valid on orders above Rs. 1,999 across top fashion brands on Myntra app & desktop website.',
      code: 'SBIMYNTRA20'
    },
    {
      id: 'makemytrip',
      brand: 'MakeMyTrip',
      title: 'Up to Rs. 2,500 Instant Savings on Domestic Flights',
      badgePoints: 'At ₹40',
      originalPoints: '250',
      bgType: 'mmt',
      bgGradient: 'from-blue-950 via-indigo-950 to-slate-900',
      logoText: 'make my trip',
      logoStyle: 'font-bold text-lg text-rose-500 uppercase tracking-widest',
      description: 'Exclusive instant cashback & fare discounts when booking domestic and international flights on MakeMyTrip.',
      code: 'SBIMMTFLIGHT'
    },
    {
      id: 'samsung',
      brand: 'Samsung',
      title: 'Extra 10% Cashback on Galaxy S & Z Series',
      badgePoints: 'At ₹50',
      originalPoints: '300',
      bgType: 'samsung',
      bgGradient: 'from-slate-950 via-blue-950 to-black',
      logoText: 'SAMSUNG',
      logoStyle: 'font-mono text-xl font-bold tracking-widest text-blue-400',
      description: 'Get extra instant store cashback and free protective cases on Samsung flagship devices with SBI Rewards.',
      code: 'SBISAMSUNG10'
    }
  ];

  // Smart Rewards Catalog Items
  const smartRewardsItems = [
    { name: "Amazon Pay E-Gift Card", value: "₹500", points: 2000, category: "Vouchers", icon: "🛒" },
    { name: "BookMyShow Movie Voucher", value: "₹250", points: 1000, category: "Entertainment", icon: "🎬" },
    { name: "Flipkart Shopping Voucher", value: "₹1,500", points: 6000, category: "Shopping", icon: "🛍️" },
    { name: "MakeMyTrip Hotel Voucher", value: "₹2,000", points: 8000, category: "Travel", icon: "✈️" },
    { name: "SBI YONO Cashback Voucher", value: "₹100", points: 400, category: "Cashback", icon: "💰" },
    { name: "Starbucks Coffee Voucher", value: "₹300", points: 1200, category: "Dining", icon: "☕" }
  ];

  const handleClaimOffer = (offer: any) => {
    setSelectedOfferModal(offer);
  };

  const handleRedeemPoints = (cost: number, name: string) => {
    if (pointsCount < cost) {
      toast.error(`Insufficient points balance! You need ${cost - pointsCount} more points to redeem ${name}.`);
    } else {
      setPointsCount(prev => prev - cost);
      toast.success(`Successfully redeemed ${name}! Coupon sent to registered email & SMS.`);
    }
  };

  return (
    <div className="rewards-wrapper">
      
      {/* 1. GLOBAL BRAND HEADER (HIGHLIGHTING REWARDS TAB) */}
      <SbiGlobalBrandHeader activeTopTab="Rewards" activeNav="Overview" />


      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="rewards-content-container">
        
        {/* QUICK FEATURE CIRCLE CAROUSEL (MATCHING REWARDS DESIGN) */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 mb-6 flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-5 overflow-x-auto py-1 scrollbar-none">
            {quickBanners.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center cursor-pointer min-w-[78px] group transition-transform hover:-translate-y-1"
                onClick={() => toast(`Opening ${item.name}`)}
              >
                <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-[#673391] via-pink-600 to-purple-800 shadow-xs flex items-center justify-center shrink-0">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-700 text-center max-w-[85px] leading-tight mt-2 line-clamp-2">
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          <button 
            type="button" 
            className="w-10 h-10 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center text-[#673391] hover:bg-purple-50 transition-all shrink-0 ml-2"
            onClick={() => toast('More feature icons loaded')}
            aria-label="Next Features"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* REWARDS SECTION TABS (Offers, Summary, Smart Rewards) */}
        <div className="rewards-section-tabs">
          <button 
            type="button" 
            className={`rewards-tab-btn ${activeTab === 'Offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('Offers')}
          >
            Offers
          </button>
          <button 
            type="button" 
            className={`rewards-tab-btn ${activeTab === 'Summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('Summary')}
          >
            Summary
          </button>
          <button 
            type="button" 
            className={`rewards-tab-btn ${activeTab === 'Smart Rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('Smart Rewards')}
          >
            Smart Rewards
          </button>
        </div>

        {/* TAB 1: OFFERS */}
        {activeTab === 'Offers' && (
          <div className="rewards-main-grid">
            
            {/* LEFT COLUMN: TOTAL POINTS, WAYS TO EARN, SBI GREEN FUNDS */}
            <div className="flex flex-col gap-6 w-full lg:w-[390px] shrink-0">
              
              {/* TOTAL POINTS PURPLE CONTAINER MATCHING SCREENSHOT */}
              <div className="bg-[#292673] rounded-3xl p-6 shadow-sm text-white space-y-5">
                {/* Top Row: Available Points & Dreamer Badge */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-purple-200 font-medium">Available Points</div>
                    <div className="text-2xl font-black text-white mt-0.5">{pointsCount}</div>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-xs text-xs font-semibold text-white rounded-lg">
                    Dreamer
                  </div>
                </div>

                {/* Middle Row: Unlocking Soon & Expiring Soon */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="text-xs text-purple-200 font-medium">Unlocking Soon</div>
                    <div className="text-base font-bold text-white mt-0.5">0</div>
                  </div>
                  <div>
                    <div className="text-xs text-purple-200 font-medium">Expiring Soon</div>
                    <div className="text-base font-bold text-white mt-0.5">0</div>
                  </div>
                </div>

                {/* Bottom Row: Inner White Box for Total Points */}
                <div 
                  className="bg-white rounded-2xl p-4 text-slate-800 flex items-center justify-between cursor-pointer hover:bg-purple-50 transition-all shadow-xs"
                  onClick={() => setActiveTab('Summary')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-purple-200 bg-purple-50 text-[#302985] flex items-center justify-center shrink-0">
                      <Star size={18} fill="#302985" className="text-[#302985]" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-[#302985]">Total Points</div>
                      <div className="text-2xl font-black text-[#302985] leading-none mt-0.5">{pointsCount}</div>
                    </div>
                  </div>

                  <div className="text-[#302985]">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>

              {/* WAYS TO EARN POINTS SECTION */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900">Ways to Earn Points</h3>
                  <span 
                    onClick={() => toast('All ways to earn points listed')} 
                    className="text-xs font-bold text-[#302985] underline cursor-pointer hover:opacity-80"
                  >
                    View All
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-x-2 gap-y-5 text-center">
                  {/* Row 1 */}
                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via UPI transactions')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      📱
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">UPI</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Bill Payments')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      🧾
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Bill Payment</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points by opening Savings Account')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      🏦
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Savings account</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points opening FD / RD')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      🔒
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">FD /RD Opening</span>
                  </div>

                  {/* Row 2 */}
                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Personal Loan')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      👤
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Personal Loan</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Car Loan')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      🚗
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Car Loan</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Loan against FD')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      💰
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Loan against FD</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Loan against Mutual Fund / Securities')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      🌱
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Loan against Mutual Fund / Securities</span>
                  </div>

                  {/* Row 3 */}
                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Credit Card spend')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      💳
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Credit Card</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Insurance Policy')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      🛡️
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Insurance</span>
                  </div>

                  <div 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => toast('Earn points via Sustainability initiatives')}
                  >
                    <div className="w-13 h-13 rounded-full border border-purple-200/90 bg-white text-[#302985] flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 group-hover:border-purple-600 transition-all">
                      🌱
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight mt-2">Sustainability</span>
                  </div>
                </div>
              </div>

              {/* SBI GREEN FUNDS BANNER */}
              <div className="rounded-3xl p-6 bg-gradient-to-r from-emerald-950 via-green-900 to-emerald-900 text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[180px] border border-emerald-800/50">
                <div className="space-y-1 relative z-10">
                  <p className="text-xs font-medium text-emerald-200">Contribute your points to</p>
                  <h3 className="text-2xl font-black text-white">SBI Green Funds!</h3>
                </div>

                <div className="relative z-10 pt-4">
                  <button 
                    type="button" 
                    onClick={() => toast.success('Thank you for contributing points to SBI Green Funds!')}
                    className="px-6 py-2.5 bg-white text-emerald-950 rounded-full text-xs font-extrabold shadow-sm hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    Donate Now
                  </button>
                </div>

                <div className="absolute right-2 bottom-0 opacity-40 pointer-events-none">
                  <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
                    <path d="M50 90 L50 40 Q70 20 85 45 Q70 60 50 65 Z" fill="#34d399" />
                    <path d="M50 70 Q30 40 15 55 Q30 75 50 80 Z" fill="#10b981" />
                    <circle cx="50" cy="90" r="10" fill="#047857" />
                  </svg>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: OFFERS FOR YOU, SHOP & EARN, VOUCHERS, DO MORE */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              
              {/* OFFERS FOR YOU */}
              <div>
                <div className="rewards-offers-header mb-3">
                  <h2 className="rewards-offers-title">Offers for you</h2>
                  <span 
                    className="rewards-view-all-btn"
                    onClick={() => toast('All reward offers listed below')}
                  >
                    View All
                  </span>
                </div>

                <div className="rewards-offers-carousel-wrapper">
                  <div className="rewards-offers-scroll-row">
                    {offersList.map((offer) => (
                      <div 
                        key={offer.id} 
                        className="rewards-offer-card shrink-0"
                        onClick={() => handleClaimOffer(offer)}
                      >
                        <div className="rewards-offer-header-info">
                          <h3 className="rewards-offer-brand-name">{offer.brand}</h3>
                          <p className="rewards-offer-subtitle">{offer.title}</p>
                        </div>

                        {/* DARK BANNER BOX */}
                        <div className={`rewards-offer-banner-box bg-gradient-to-br ${offer.bgGradient}`}>
                          <div className="rewards-offer-point-badge">
                            <span>{offer.badgePoints}</span>
                            <span className="crossed">{offer.originalPoints}</span>
                          </div>

                          <div className="rewards-offer-logo-area">
                            <span className={offer.logoStyle}>{offer.logoText}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    className="rewards-scroll-arrow-btn"
                    onClick={() => toast('Scrolled to more partner offers')}
                    aria-label="Next Offers"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* SHOP & EARN MULTIPLIERS */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-slate-800">Shop &amp; Earn</h3>
                  <span 
                    onClick={() => toast('Viewing all Shop & Earn partners')}
                    className="text-xs font-bold text-[#302985] underline cursor-pointer hover:opacity-80"
                  >
                    View All
                  </span>
                </div>

                <div className="relative">
                  <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none">
                    {/* Brand 1: Myntra */}
                    <div className="min-w-[115px] bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-md transition-shadow cursor-pointer h-[120px] shrink-0">
                      <span className="font-black text-2xl text-pink-500 italic py-2">M</span>
                      <span className="text-[11px] font-extrabold text-[#302985] bg-purple-50 px-2.5 py-0.5 rounded-full w-full border border-purple-100">
                        10X points
                      </span>
                    </div>

                    {/* Brand 2: igp.com */}
                    <div className="min-w-[115px] bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-md transition-shadow cursor-pointer h-[120px] shrink-0">
                      <span className="font-bold text-sm text-rose-600 font-serif py-2.5">igp<span className="text-xs">.com</span></span>
                      <span className="text-[11px] font-extrabold text-[#302985] bg-purple-50 px-2.5 py-0.5 rounded-full w-full border border-purple-100">
                        20X points
                      </span>
                    </div>

                    {/* Brand 3: AJIO */}
                    <div className="min-w-[115px] bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-md transition-shadow cursor-pointer h-[120px] shrink-0">
                      <span className="font-black text-base text-slate-900 tracking-wider py-2.5">AJIO</span>
                      <span className="text-[11px] font-extrabold text-[#302985] bg-purple-50 px-2.5 py-0.5 rounded-full w-full border border-purple-100">
                        10X points
                      </span>
                    </div>

                    {/* Brand 4: KAMA */}
                    <div className="min-w-[115px] bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-md transition-shadow cursor-pointer h-[120px] shrink-0">
                      <span className="font-serif text-[11px] font-bold text-amber-950 tracking-widest py-3">KAMA</span>
                      <span className="text-[11px] font-extrabold text-[#302985] bg-purple-50 px-2.5 py-0.5 rounded-full w-full border border-purple-100">
                        10X points
                      </span>
                    </div>

                    {/* Brand 5: Lifestyle */}
                    <div className="min-w-[115px] bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-md transition-shadow cursor-pointer h-[120px] shrink-0">
                      <span className="font-sans text-xs font-bold text-slate-800 py-3">Lifestyle</span>
                      <span className="text-[11px] font-extrabold text-[#302985] bg-purple-50 px-2.5 py-0.5 rounded-full w-full border border-purple-100">
                        10X points
                      </span>
                    </div>

                    {/* Brand 6: Nykaa */}
                    <div className="min-w-[115px] bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col items-center justify-between text-center shadow-2xs hover:shadow-md transition-shadow cursor-pointer h-[120px] shrink-0">
                      <span className="font-black text-base text-pink-600 italic py-2">NYKAA</span>
                      <span className="text-[11px] font-extrabold text-[#302985] bg-purple-50 px-2.5 py-0.5 rounded-full w-full border border-purple-100">
                        5X points
                      </span>
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-slate-200 bg-white shadow-md flex items-center justify-center text-[#302985] hover:bg-purple-50 transition-all shrink-0 z-10"
                    onClick={() => toast('Scrolled Shop & Earn partners')}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* REDEEM ON VOUCHERS */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-slate-800">Redeem on Vouchers</h3>
                  <span 
                    onClick={() => toast('Viewing all gift voucher redemptions')}
                    className="text-xs font-bold text-[#302985] underline cursor-pointer hover:opacity-80"
                  >
                    View All
                  </span>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center flex flex-col items-center justify-center space-y-2.5 shadow-2xs">
                  <h4 className="text-base font-extrabold text-[#1d1b54]">Unable To Fetch</h4>
                  <p className="text-xs text-slate-500">Service Unavailable</p>
                  
                  <button 
                    type="button" 
                    onClick={() => toast.success('Refreshed voucher catalog!')}
                    className="mt-2 inline-flex items-center gap-1.5 px-6 py-1.5 border-2 border-[#302985] text-[#302985] hover:bg-[#302985] hover:text-white rounded-full text-xs font-extrabold transition-all shadow-2xs cursor-pointer"
                  >
                    <span>↻</span>
                    <span>Retry</span>
                  </button>
                </div>
              </div>

              {/* DO MORE WITH YONO REWARDS */}
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-extrabold text-slate-800">Do more with YONO Rewards</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CARD 1: REFER AND EARN */}
                  <div 
                    className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4"
                    onClick={() => toast('Refer & Earn: Invite friends to get 500 bonus points!')}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-[#302985] flex items-center justify-center text-xl shrink-0">
                      📂⭐
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">Refer and</h4>
                      <p className="text-[11px] text-slate-500">Invite friends &amp; earn 500 pts</p>
                    </div>
                  </div>

                  {/* CARD 2: REWARDS */}
                  <div 
                    className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4"
                    onClick={() => setActiveTab('Smart Rewards')}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-[#302985] flex items-center justify-center text-xl shrink-0">
                      🏅
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-800">Rewards</h4>
                      <p className="text-[11px] text-slate-500">Quizzes, Badges &amp; Leaderboard</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      {/* TAB 2: SUMMARY MATCHING IMAGE 2 */}
      {activeTab === 'Summary' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs flex flex-col lg:flex-row gap-8 items-start justify-between min-h-[460px]">
          
          {/* LEFT COLUMN: POINTS CARD & FILTER LIST MATCHING SCREENSHOT */}
          <div className="w-full lg:w-[350px] shrink-0 border-r-0 lg:border-r border-slate-100 pr-0 lg:pr-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* POINTS CARD */}
              <div className="bg-[#292673] rounded-3xl p-6 shadow-sm text-white space-y-5">
                {/* Top Row: Available Points & Dreamer Badge */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-purple-200 font-medium">Available Points</div>
                    <div className="text-2xl font-black text-white mt-0.5">{pointsCount}</div>
                  </div>
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-xs text-xs font-semibold text-white rounded-lg">
                    Dreamer
                  </div>
                </div>

                {/* Middle Row: Unlocking Soon & Expiring Soon */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="text-xs text-purple-200 font-medium">Unlocking Soon</div>
                    <div className="text-base font-bold text-white mt-0.5">0</div>
                  </div>
                  <div>
                    <div className="text-xs text-purple-200 font-medium">Expiring Soon</div>
                    <div className="text-base font-bold text-white mt-0.5">0</div>
                  </div>
                </div>

                {/* Bottom Row: Inner White Box for Total Points */}
                <div 
                  className="bg-white rounded-2xl p-4 text-slate-800 flex items-center justify-between cursor-pointer hover:bg-purple-50 transition-all shadow-xs"
                  onClick={() => setActiveTab('Summary')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-purple-200 bg-purple-50 text-[#302985] flex items-center justify-center shrink-0">
                      <Star size={18} fill="#302985" className="text-[#302985]" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-[#302985]">Total Points</div>
                      <div className="text-2xl font-black text-[#302985] leading-none mt-0.5">{pointsCount}</div>
                    </div>
                  </div>

                  <div className="text-[#302985]">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>

              {/* FILTER ROWS MATCHING SCREENSHOT */}
              <div className="divide-y divide-slate-100 pt-1">
                <div 
                  className="py-3.5 px-1 flex items-center justify-between font-extrabold text-[#302985] text-sm cursor-pointer hover:bg-purple-50/50 transition-colors"
                  onClick={() => toast('Filtered by All transactions')}
                >
                  <span>All</span>
                  <ChevronRight size={16} className="text-[#302985]" />
                </div>

                <div 
                  className="py-3.5 px-1 flex items-center justify-between font-semibold text-slate-700 text-sm cursor-pointer hover:bg-purple-50/50 transition-colors"
                  onClick={() => toast('Filtered by Unlocking soon transactions')}
                >
                  <span>Unlocking soon</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

                <div 
                  className="py-3.5 px-1 flex items-center justify-between font-semibold text-slate-700 text-sm cursor-pointer hover:bg-purple-50/50 transition-colors"
                  onClick={() => toast('Filtered by Expiring soon transactions')}
                >
                  <span>Expiring soon</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* BOTTOM ACTION BUTTONS */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => toast('Loading your past orders...')}
                className="text-xs font-extrabold text-slate-700 hover:text-[#302985] border border-slate-300 rounded-full px-5 py-2 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                View Orders
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('Smart Rewards')}
                className="text-xs font-extrabold text-white bg-[#302985] hover:bg-indigo-900 rounded-full px-6 py-2 shadow-xs transition-colors cursor-pointer"
              >
                Redeem Now
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: TRANSACTION HISTORY TABLE */}
          <div className="flex-1 min-w-0 flex flex-col justify-between w-full min-h-[380px]">
            <div>
              {/* HEADER WITH FILTER ICON AND BADGE 03 */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-[#302985]">Transaction History</h2>
                <div className="relative cursor-pointer" onClick={() => toast('Filters menu opened')}>
                  <div className="p-2 rounded-full hover:bg-purple-50 text-[#302985] transition-colors">
                    <Filter size={22} />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-[#c026d3] text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                    03
                  </span>
                </div>
              </div>

              {/* TABLE HEADER & BODY */}
              <div className="overflow-hidden rounded-2xl border border-purple-100/80">
                <div className="grid grid-cols-4 bg-[#f3effa] py-3.5 px-6 text-xs font-extrabold text-[#302985]">
                  <div>Transactions</div>
                  <div>Date</div>
                  <div>Category</div>
                  <div>Points</div>
                </div>

                <div className="divide-y divide-slate-100 text-xs text-slate-600 bg-white">
                  <div className="py-16 text-center text-slate-400 font-medium">
                    No transactions available for the selected period.
                  </div>
                </div>
              </div>
            </div>

            {/* PAGINATION: < Previous  Next > */}
            <div className="flex items-center justify-center gap-6 pt-6 text-xs font-extrabold">
              <button 
                type="button" 
                disabled 
                className="flex items-center gap-1 text-slate-300 cursor-not-allowed"
              >
                <ChevronLeft size={14} /> Previous
              </button>

              <button 
                type="button" 
                onClick={() => toast('Next page')}
                className="flex items-center gap-1 text-[#302985] hover:underline"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>

        </div>
      )}

        {/* TAB 3: SMART REWARDS */}
        {activeTab === 'Smart Rewards' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs space-y-8">
            
            {/* TOTAL POINTS PURPLE BAR */}
            <div className="bg-gradient-to-r from-[#4c2882] via-[#302985] to-[#241d68] text-white rounded-xl py-3 px-6 flex items-center justify-between shadow-md max-w-sm">
              <span className="text-sm font-extrabold tracking-wide">Total Points</span>
              <span className="text-lg font-black">{pointsCount}</span>
            </div>

            {/* THREE CARDS GRID: Live Quiz, Completed Quiz, Leaderboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* CARD 1: LIVE QUIZ */}
              <div 
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-[240px]"
                onClick={() => toast('Opening Live Quiz... Answer banking questions to earn points!')}
              >
                <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-[#302985] transition-colors">
                  Live Quiz
                </h3>

                {/* ILLUSTRATION 1 */}
                <div className="flex justify-center items-end h-[150px]">
                  <svg viewBox="0 0 240 140" fill="none" className="h-full w-auto">
                    {/* Clouds background */}
                    <path d="M20 130 C40 110, 80 110, 100 130 Z" fill="#f3effa" />
                    <path d="M140 130 C160 110, 200 110, 220 130 Z" fill="#f3effa" />
                    <path d="M80 135 C110 115, 150 115, 180 135 Z" fill="#e9e2f5" />
                    
                    {/* Leaf Sprouts */}
                    <path d="M175 125 Q180 115 178 108 Q185 112 182 125 Z" fill="#b9a6df" />
                    <path d="M182 125 Q187 118 193 116 Q190 122 185 127 Z" fill="#a48dcf" />

                    {/* Hourglass */}
                    <path d="M130 90 L155 90 L145 110 L155 130 L130 130 L140 110 Z" fill="#fbcfe8" opacity="0.6" stroke="#d8b4fe" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M136 96 L149 96 L143 108 L136 96 Z" fill="#f43f5e" />
                    <path d="M136 124 L149 124 L143 115 L136 124 Z" fill="#f43f5e" />

                    {/* Phone Body */}
                    <rect x="70" y="35" width="55" height="95" rx="8" fill="#ffffff" stroke="#673391" strokeWidth="3" />
                    <rect x="75" y="45" width="45" height="75" rx="4" fill="#fdf4ff" />
                    <rect x="80" y="52" width="35" height="12" rx="2" fill="#be185d" />
                    <rect x="80" y="70" width="35" height="6" rx="2" fill="#e9d5ff" />
                    <rect x="80" y="80" width="35" height="6" rx="2" fill="#e9d5ff" />
                    <rect x="80" y="90" width="35" height="6" rx="2" fill="#e9d5ff" />
                    <circle cx="97.5" cy="108" r="4" fill="#be185d" />

                    {/* Question Speech Bubble */}
                    <circle cx="170" cy="50" r="14" fill="#ded4f7" />
                    <text x="170" y="55" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#673391">?</text>
                    <path d="M162 60 L156 68 L166 63 Z" fill="#ded4f7" />

                    {/* Sparkles */}
                    <path d="M45 70 L48 62 L51 70 L59 73 L51 76 L48 84 L45 76 L37 73 Z" fill="#f43f5e" opacity="0.7" />
                  </svg>
                </div>
              </div>

              {/* CARD 2: COMPLETED QUIZ */}
              <div 
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-[240px]"
                onClick={() => toast('Viewing your completed quizzes history...')}
              >
                <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-[#302985] transition-colors">
                  Completed Quiz
                </h3>

                {/* ILLUSTRATION 2 */}
                <div className="flex justify-center items-end h-[150px]">
                  <svg viewBox="0 0 240 140" fill="none" className="h-full w-auto">
                    {/* Clouds background */}
                    <path d="M20 130 C40 110, 80 110, 100 130 Z" fill="#f3effa" />
                    <path d="M140 130 C160 110, 200 110, 220 130 Z" fill="#f3effa" />
                    <path d="M80 135 C110 115, 150 115, 180 135 Z" fill="#e9e2f5" />

                    {/* Leaf Sprouts */}
                    <path d="M195 125 Q200 115 198 108 Q205 112 202 125 Z" fill="#b9a6df" />

                    {/* Shooting Stars Burst */}
                    <path d="M90 60 L80 25 L86 20 M120 50 L125 15 L132 18 M150 65 L165 30" stroke="#f472b6" strokeWidth="2" strokeDasharray="3 3" />
                    <polygon points="80,25 83,18 90,20 84,24 86,30 81,26" fill="#f43f5e" />
                    <polygon points="125,15 129,9 135,12 130,16 131,22 126,17" fill="#fbbf24" />

                    {/* Phone Body */}
                    <rect x="95" y="45" width="55" height="85" rx="8" fill="#ffffff" stroke="#673391" strokeWidth="3" />
                    <rect x="100" y="53" width="45" height="68" rx="4" fill="#fdf4ff" />
                    <rect x="105" y="60" width="35" height="12" rx="2" fill="#be185d" />
                    <rect x="105" y="78" width="35" height="6" rx="2" fill="#e9d5ff" />
                    <rect x="105" y="88" width="35" height="6" rx="2" fill="#e9d5ff" />
                    
                    {/* Checkmark Bubble */}
                    <circle cx="165" cy="65" r="11" fill="#c084fc" />
                    <path d="M159 65 L163 69 L171 60" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* CARD 3: LEADERBOARD */}
              <div 
                className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between h-[240px]"
                onClick={() => toast('Opening SBI Rewards Leaderboard... You are currently ranked #14')}
              >
                <h3 className="text-lg font-extrabold text-slate-800 group-hover:text-[#302985] transition-colors">
                  Leaderboard
                </h3>

                {/* ILLUSTRATION 3 */}
                <div className="flex justify-center items-end h-[150px]">
                  <svg viewBox="0 0 240 140" fill="none" className="h-full w-auto">
                    {/* Clouds background */}
                    <path d="M10 130 C30 115, 70 115, 90 130 Z" fill="#f3effa" />
                    <path d="M150 130 C170 115, 210 115, 230 130 Z" fill="#f3effa" />
                    <path d="M60 135 C90 118, 140 118, 170 135 Z" fill="#e9e2f5" />

                    {/* Leaf Sprouts */}
                    <path d="M35 125 Q40 115 38 108 Q45 112 42 125 Z" fill="#b9a6df" />
                    <path d="M205 125 Q210 115 208 108 Q215 112 212 125 Z" fill="#b9a6df" />

                    {/* Podium */}
                    <rect x="65" y="95" width="35" height="35" fill="#ded4f7" rx="3" />
                    <text x="82.5" y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#673391">2</text>

                    <rect x="100" y="80" width="40" height="50" fill="#c084fc" rx="3" />
                    <text x="120" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff">1</text>

                    <rect x="140" y="105" width="35" height="25" fill="#ded4f7" rx="3" />
                    <text x="157.5" y="123" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#673391">3</text>

                    {/* Trophy */}
                    <path d="M107 48 L133 48 L130 65 C130 72, 126 76, 120 76 C114 76, 110 72, 110 65 Z" fill="#9333ea" />
                    <path d="M103 52 C98 52, 98 62, 107 62" stroke="#9333ea" strokeWidth="2.5" fill="none" />
                    <path d="M137 52 C142 52, 142 62, 133 62" stroke="#9333ea" strokeWidth="2.5" fill="none" />
                    <rect x="117" y="76" width="6" height="7" fill="#7e22ce" />
                    <rect x="112" y="81" width="16" height="3" rx="1" fill="#7e22ce" />

                    {/* Star Badge on Trophy */}
                    <circle cx="120" cy="58" r="5" fill="#fbbf24" />
                    <polygon points="120,55 121,57 124,57 122,59 123,61 120,60 117,61 118,59 116,57 119,57" fill="#ffffff" />

                    {/* Burst Stars */}
                    <path d="M85 45 L87 38 L90 45 L97 47 L90 49 L87 56 L85 49 L78 47 Z" fill="#f43f5e" opacity="0.6" />
                    <path d="M150 40 L152 35 L155 40 L160 42 L155 44 L152 49 L150 44 L145 42 Z" fill="#fbbf24" opacity="0.8" />
                  </svg>
                </div>
              </div>

            </div>

            {/* BOTTOM REDEEM NOW BUTTON ROW */}
            <div className="flex justify-end pt-6 border-t border-slate-100">
              <button 
                type="button" 
                onClick={() => toast('Redemption catalog loaded')}
                className="px-8 py-2.5 rounded-full border-2 border-[#4c2882] text-[#4c2882] hover:bg-[#4c2882] hover:text-white text-sm font-extrabold transition-all shadow-xs"
              >
                Redeem Now
              </button>
            </div>

            {/* FOOTER LINKS */}
            <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500 space-x-2 font-medium">
              <a href="#" className="hover:underline">About SBI</a>
              <span>|</span>
              <a href="#" className="hover:underline">Terms &amp; Conditions</a>
              <span>|</span>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>

          </div>
        )}

      </main>

      {/* OFFER DETAILS MODAL */}
      {selectedOfferModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-extrabold text-purple-700 tracking-wider uppercase">{selectedOfferModal.brand}</span>
                <h3 className="text-lg font-extrabold text-slate-800">{selectedOfferModal.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedOfferModal(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">{selectedOfferModal.description}</p>

            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-purple-300 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase text-slate-400">Promo Code</div>
                <div className="text-base font-mono font-bold text-[#302985]">{selectedOfferModal.code}</div>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard?.writeText(selectedOfferModal.code);
                  toast.success('Promo code copied to clipboard!');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#302985] text-white text-xs font-bold hover:bg-indigo-900 transition-colors"
              >
                Copy Code
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => setSelectedOfferModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  toast.success(`Claimed offer for ${selectedOfferModal.brand}!`);
                  setSelectedOfferModal(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
              >
                Claim Offer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
