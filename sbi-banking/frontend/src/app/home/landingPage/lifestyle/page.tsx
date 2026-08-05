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
  ChevronDown,
  Plane,
  Train,
  Bus,
  Bed,
  Gift,
  Store,
  Heart,
  FileText,
  Car,
  Building2,
  HelpCircle,
  LogOut,
  Sparkles,
  ShieldAlert,
  Lock,
  Leaf,
  Coffee,
  CreditCard,
  TrendingUp,
  Ticket
} from 'lucide-react';
import './lifestyle.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function SbiLifestylePage() {
  const router = useRouter();
  const [liteMode, setLiteMode] = useState(false);
  const [activeTravelCategory, setActiveTravelCategory] = useState<string | null>(null);
  const [bannerStartIndex, setBannerStartIndex] = useState(0);

  const promoBanners = [
    { title: "Sustainability Lifestyle", img: "/assets/images/lifestyle/sustainability_lifestyle_banner.png" },
    { title: "Discounts & Products", img: "/assets/images/lifestyle/discounts-products-web-1.png" },
    { title: "One Stop Shopping", img: "/assets/images/lifestyle/omp-web-1.png" },
    { title: "Hotel Bookings", img: "/assets/images/lifestyle/omp-hotel-web-1.png" },
  ];

  const storiesRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkStoriesScroll = () => {
    if (storiesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = storiesRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    checkStoriesScroll();
    const ref = storiesRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkStoriesScroll);
      window.addEventListener('resize', checkStoriesScroll);
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', checkStoriesScroll);
      window.removeEventListener('resize', checkStoriesScroll);
    };
  }, []);

  const stories = [
    { name: "Welcome to Yono", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=150&auto=format&fit=crop" },
    { name: "Fraud Awareness", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=150&auto=format&fit=crop" },
    { name: "Tax Related Services", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=150&auto=format&fit=crop" },
    { name: "e - Secure Lock", img: "https://images.unsplash.com/photo-1567427017947-545c5f89c60a?q=80&w=150&auto=format&fit=crop" },
    { name: "Sustainability", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=150&auto=format&fit=crop" },
    { name: "SIP", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=150&auto=format&fit=crop" },
    { name: "Credit Card", img: "https://images.unsplash.com/photo-1580894732444-8fecef2601da?q=80&w=150&auto=format&fit=crop" },
    { name: "Invest Now", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=150&auto=format&fit=crop" },
    { name: "Secure your future", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=150&auto=format&fit=crop" },
    { name: "Dream your Home", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=150&auto=format&fit=crop" }
  ];

  const handleServiceClick = (title: string) => {
    toast.success(`Opening ${title}...`);
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="lifestyle-wrapper">
      
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeTopTab="Lifestyle" />


      {/* 3. MAIN CONTENT LAYOUT */}
      <main className="lifestyle-content-container">
        <div className="lifestyle-grid-layout">
          
          {/* LEFT MAIN COLUMN */}
          <div className="lifestyle-left-section">
            
            {/* Greeting & Quick Story Icons */}
            <div className="lifestyle-greeting-card">
              <h1 className="lifestyle-greeting-title">
                Hello <span className="lifestyle-user-highlight">Dumpala</span>, Let&apos;s get started!
              </h1>

              <div className="lifestyle-stories-carousel-container">
                {canScrollLeft && (
                  <button 
                    type="button" 
                    className="lifestyle-scroll-arrow lifestyle-scroll-arrow-left"
                    onClick={() => {
                      if (storiesRef.current) {
                        storiesRef.current.scrollBy({ left: -240, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Previous Services"
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                <div 
                  ref={storiesRef}
                  onScroll={checkStoriesScroll}
                  className="lifestyle-stories-row"
                >
                  {stories.map((story, idx) => (
                    <div 
                      key={idx} 
                      className="lifestyle-story-item"
                      onClick={() => handleServiceClick(story.name)}
                    >
                      <div className="lifestyle-story-circle">
                        <img src={story.img} alt={story.name} />
                      </div>
                      <span className="lifestyle-story-label">{story.name}</span>
                    </div>
                  ))}
                </div>

                {canScrollRight && (
                  <button 
                    type="button" 
                    className="lifestyle-scroll-arrow lifestyle-scroll-arrow-right"
                    onClick={() => {
                      if (storiesRef.current) {
                        storiesRef.current.scrollBy({ left: 240, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Next Services"
                  >
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* 3-Card Banner Container (Exact Match to User Screenshot) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs my-4 relative group">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  promoBanners[bannerStartIndex % promoBanners.length],
                  promoBanners[(bannerStartIndex + 1) % promoBanners.length],
                  promoBanners[(bannerStartIndex + 2) % promoBanners.length],
                ].map((banner, idx) => (
                  <div 
                    key={idx}
                    onClick={() => handleServiceClick(banner.title)}
                    className="rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer h-40 sm:h-44 relative group/card border border-slate-100"
                  >
                    <img 
                      src={banner.img} 
                      alt={banner.title} 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Overlapping Right Circular Arrow Button (Exact Match to Screenshot) */}
              <button 
                type="button" 
                className="w-9 h-9 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-[#702082] hover:bg-purple-50 transition-all absolute -right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10 hover:scale-110"
                onClick={() => setBannerStartIndex((prev) => (prev + 1) % promoBanners.length)}
                aria-label="Next Promo Cards"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Bottom Large Banners (Background Image + Text Overlay) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              
              {/* Banner 1: Sustainability (design2.png + Text Overlay) */}
              <div 
                onClick={() => handleServiceClick('Green Banking')}
                className="rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer h-52 relative border border-slate-200/60 group select-none flex flex-col justify-between p-6"
              >
                {/* Background Image */}
                <img 
                  src="/assets/images/lifestyle/design2.png" 
                  alt="Sustainability - Grow with SBI Green" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 z-0"
                />
                {/* Soft dark gradient overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-1 pointer-events-none" />

                {/* Text Content Overlay */}
                <div className="relative z-10 space-y-1">
                  <div className="text-emerald-200 font-extrabold text-xs tracking-wider uppercase drop-shadow-xs">
                    SUSTAINABILITY
                  </div>
                  <h3 className="text-xl font-black text-white drop-shadow-sm">
                    Grow with SBI Green
                  </h3>
                  <p className="text-xs text-emerald-100 max-w-xs leading-relaxed font-medium drop-shadow-xs">
                    Uncover how your banking transactions shape the planet, unlock your Green Score today!
                  </p>
                </div>

                {/* Button Overlay */}
                <div className="relative z-10 pt-2">
                  <button 
                    type="button" 
                    className="bg-white hover:bg-slate-50 text-[#15803d] font-extrabold text-xs px-5 py-2 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); handleServiceClick('Green Banking'); }}
                  >
                    Start Now
                  </button>
                </div>
              </div>

              {/* Banner 2: SIP Mutual Fund (sip-banner.png + Text Overlay) */}
              <div 
                onClick={() => handleServiceClick('Start SIP')}
                className="rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer h-52 relative border border-slate-200/60 group select-none flex flex-col justify-between p-6"
              >
                {/* Background Image */}
                <img 
                  src="/assets/images/lifestyle/sip-banner.png" 
                  alt="DID YOU START AN SIP?" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300 z-0"
                />
                {/* Soft dark gradient overlay for optimal readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-1 pointer-events-none" />

                {/* Text Content Overlay */}
                <div className="relative z-10 space-y-1">
                  <div className="text-sky-200 font-extrabold text-xs tracking-wider uppercase drop-shadow-xs">
                    SBI MUTUAL FUND &bull; A PARTNER FOR LIFE
                  </div>
                  <h3 className="text-xl font-black text-white drop-shadow-sm">
                    DID YOU START AN SIP?
                  </h3>
                  <p className="text-xs text-sky-100 max-w-xs leading-relaxed font-medium drop-shadow-xs">
                    Start investing at an early stage of life to fulfill your financial goals.
                  </p>
                </div>

                {/* Button Overlay */}
                <div className="relative z-10 pt-2">
                  <button 
                    type="button" 
                    className="bg-white hover:bg-slate-50 text-[#0369a1] font-extrabold text-xs px-5 py-2 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); handleServiceClick('Start SIP'); }}
                  >
                    Invest Now
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR COLUMN */}
          <aside className="lifestyle-sidebar-card">
            
            {/* Travel Section */}
            <div className="lifestyle-section-group lifestyle-section-divider">
              <div className="lifestyle-sidebar-header">
                <h2 className="lifestyle-sidebar-title">Travel</h2>
                <span className="lifestyle-view-all-link" onClick={() => handleServiceClick('Travel View All')}>
                  View All
                </span>
              </div>

              <div className="lifestyle-icons-grid-4">
                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Flight Booking')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_Travel_flights.svg" alt="Flight" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Flight</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Train Booking')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_Travel_train.svg" alt="Train" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Train</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Bus Booking')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_Travel_bus.svg" alt="Bus" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Bus</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Hotel Booking')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_Travel_hotels.svg" alt="Hotel" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Hotel</span>
                </div>
              </div>
            </div>

            {/* Offer and Services Section */}
            <div className="lifestyle-section-group lifestyle-section-divider">
              <div className="lifestyle-sidebar-header">
                <h2 className="lifestyle-sidebar-title">Offer and Services</h2>
              </div>

              <div className="lifestyle-icons-grid-3">
                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Gift Cards')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_Offers_gifting.svg" alt="Gift cards/vouchers" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Gift cards/vouchers</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Stores')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_Offers_Stores.svg" alt="Stores" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Stores</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Health & Wellness')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_Offers_healthwellness.svg" alt="Health & Wellness" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Health &amp; Wellness</span>
                </div>
              </div>
            </div>

            {/* Other Services Section */}
            <div className="lifestyle-section-group">
              <div className="lifestyle-sidebar-header">
                <h2 className="lifestyle-sidebar-title">Other Services</h2>
              </div>

              <div className="lifestyle-icons-grid-3">
                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('ClearTax')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_LifestyleServices_TDSClear.svg" alt="ClearTax" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">ClearTax</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('YONO Motorz')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_LifestyleServices_motorz.svg" alt="YONO Motorz" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">YONO Motorz</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Property')}>
                  <div className="lifestyle-tile-icon-box">
                    <img src="/assets/images/landing-page/IC_LifestyleServices_Property.svg" alt="Property" className="w-6 h-6 object-contain" />
                  </div>
                  <span className="lifestyle-tile-label">Property</span>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="lifestyle-footer">
        <div className="lifestyle-footer-links">
          <span onClick={() => handleServiceClick('About SBI')} className="lifestyle-footer-link cursor-pointer">About SBI</span>
          <span>|</span>
          <span onClick={() => handleServiceClick('Terms & Conditions')} className="lifestyle-footer-link cursor-pointer">Terms &amp; Conditions</span>
          <span>|</span>
          <span onClick={() => handleServiceClick('Privacy Policy')} className="lifestyle-footer-link cursor-pointer">Privacy Policy</span>
        </div>
      </footer>

    </div>
  );
}
