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

            {/* Middle Banner Cards Slider */}
            <div className="lifestyle-banner-carousel-wrapper">
              <div className="lifestyle-banner-grid">
                
                {/* Banner 1 */}
                <div className="lifestyle-banner-card lifestyle-banner-green">
                  <div>
                    <div className="lifestyle-banner-tag">Sustainability</div>
                    <h2 className="lifestyle-banner-heading">Grow with SBI Green</h2>
                    <p className="lifestyle-banner-desc">
                      Uncover how your banking transactions shape the planet, unlock your Green Score today!
                    </p>
                  </div>
                  <button type="button" className="lifestyle-banner-btn" onClick={() => handleServiceClick('SBI Green')}>
                    Start Now
                  </button>
                </div>

                {/* Banner 2 */}
                <div className="lifestyle-banner-card lifestyle-banner-purple">
                  <div>
                    <div className="lifestyle-banner-tag">YONO Deals &gt; Online Discounts</div>
                    <h2 className="lifestyle-banner-heading">Binge-shop without the guilt.</h2>
                  </div>
                  <button type="button" className="lifestyle-banner-btn" onClick={() => handleServiceClick('YONO Deals')}>
                    Explore
                  </button>
                </div>

                {/* Banner 3 */}
                <div className="lifestyle-banner-card lifestyle-banner-teal">
                  <div>
                    <div className="lifestyle-banner-tag">Flight Ticket Booking</div>
                    <h2 className="lifestyle-banner-heading">Manifesting that vacay?</h2>
                    <p className="lifestyle-banner-desc">Our flight deals make it real.</p>
                  </div>
                  <button type="button" className="lifestyle-banner-btn" onClick={() => handleServiceClick('Flight Deals')}>
                    Check Offers
                  </button>
                </div>

              </div>

              <button 
                type="button" 
                className="lifestyle-scroll-arrow absolute -right-4 top-1/2 -translate-y-1/2 shadow-lg"
                onClick={() => toast('Next promo slides')}
                aria-label="Next Promo Banners"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Bottom Large Banners */}
            <div className="lifestyle-bottom-banners-grid">
              
              <div className="lifestyle-large-banner lifestyle-large-banner-sustainability">
                <div>
                  <div className="text-emerald-200 font-extrabold text-xs tracking-wider uppercase mb-1">
                    Sustainability
                  </div>
                  <h3 className="text-xl font-black mb-2 text-white">Grow with SBI Green</h3>
                  <p className="text-xs text-emerald-100 max-w-sm leading-relaxed">
                    Uncover how your banking transactions shape the planet, unlock your Green Score today!
                  </p>
                </div>
                <button type="button" className="lifestyle-banner-btn mt-4" onClick={() => handleServiceClick('Green Banking')}>
                  Start Now
                </button>
              </div>

              <div className="lifestyle-large-banner lifestyle-large-banner-sip">
                <div>
                  <div className="text-sky-200 font-extrabold text-xs tracking-wider uppercase mb-1">
                    SBI Mutual Fund &bull; A Partner For Life
                  </div>
                  <h3 className="text-xl font-black mb-2 text-white">DID YOU START AN SIP?</h3>
                  <p className="text-xs text-sky-100 max-w-sm leading-relaxed">
                    Start investing at an early stage of life to fulfill your financial goals.
                  </p>
                </div>
                <button type="button" className="lifestyle-banner-btn mt-4" onClick={() => handleServiceClick('Start SIP')}>
                  Invest Now
                </button>
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
                    <Plane size={20} />
                  </div>
                  <span className="lifestyle-tile-label">Flight</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Train Booking')}>
                  <div className="lifestyle-tile-icon-box">
                    <Train size={20} />
                  </div>
                  <span className="lifestyle-tile-label">Train</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Bus Booking')}>
                  <div className="lifestyle-tile-icon-box">
                    <Bus size={20} />
                  </div>
                  <span className="lifestyle-tile-label">Bus</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Hotel Booking')}>
                  <div className="lifestyle-tile-icon-box">
                    <Bed size={20} />
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
                    <Gift size={20} />
                  </div>
                  <span className="lifestyle-tile-label">Gift cards/vouchers</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Stores')}>
                  <div className="lifestyle-tile-icon-box">
                    <Store size={20} />
                  </div>
                  <span className="lifestyle-tile-label">Stores</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Health & Wellness')}>
                  <div className="lifestyle-tile-icon-box">
                    <Heart size={20} />
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
                    <FileText size={20} />
                  </div>
                  <span className="lifestyle-tile-label">ClearTax</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('YONO Motorz')}>
                  <div className="lifestyle-tile-icon-box">
                    <Car size={20} />
                  </div>
                  <span className="lifestyle-tile-label">YONO Motorz</span>
                </div>

                <div className="lifestyle-service-tile" onClick={() => handleServiceClick('Property')}>
                  <div className="lifestyle-tile-icon-box">
                    <Building2 size={20} />
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
