'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Search,
  Bell,
  ChevronRight,
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

export default function SbiLifestylePage() {
  const router = useRouter();
  const [liteMode, setLiteMode] = useState(false);
  const [activeTravelCategory, setActiveTravelCategory] = useState<string | null>(null);

  const stories = [
    { name: "Welcome to Yono", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64" },
    { name: "Fraud Awareness", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/fraudawareness2_thumbnail_64x6" },
    { name: "Tax Related Services", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64" },
    { name: "e - Secure Lock", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/yp_secure_lock_banner_sbi_thumbnail_64x64_23_11zon" },
    { name: "Sustainability", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sustainibility_thumbnail_64x64" },
    { name: "SIP", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64" },
    { name: "Credit Card", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64" },
    { name: "Invest Now", img: "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64" }
  ];

  const handleServiceClick = (title: string) => {
    toast.success(`Opening ${title}...`);
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="lifestyle-wrapper">
      
      {/* 1. TOP PURPLE UTILITY NAVBAR */}
      <header className="lifestyle-top-purple-bar">
        <div className="lifestyle-top-purple-inner">
          
          <div className="lifestyle-top-left-nav">
            <Link href="/home/landingPage/homePage" className="lifestyle-top-tab">
              Banking
            </Link>
            <button type="button" className="lifestyle-top-tab active">
              Lifestyle
            </button>
            <button 
              type="button" 
              className="lifestyle-top-tab"
              onClick={() => toast.success('YONO Rewards portal active')}
            >
              <Gift size={13} />
              Rewards
            </button>
            
            <div className="lifestyle-lite-toggle">
              <span className="font-semibold text-[11px]">YONO Net Banking Lite</span>
              <button 
                type="button"
                onClick={() => setLiteMode(!liteMode)}
                className={`lifestyle-toggle-btn ${liteMode ? 'on' : 'off'}`}
                aria-label="Toggle YONO Net Banking Lite"
              >
                <span className="lifestyle-toggle-thumb"></span>
                <span className="lifestyle-toggle-text">{liteMode ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <div className="lifestyle-top-right-tools">
            <span className="lifestyle-tool-link flex items-center gap-1" onClick={() => toast('Support Centre: 1800 11 1101')}>
              <HelpCircle size={14} /> Get Help
            </span>
            <span className="font-bold">1800-11-1101</span>
            <span className="lifestyle-tool-link">English &#9660;</span>
            <div className="flex items-center gap-1 font-bold text-xs">
              <button type="button" className="hover:text-amber-300">&#8722;</button>
              <span>A</span>
              <button type="button" className="hover:text-amber-300">&#43;</button>
            </div>
            <button 
              type="button" 
              className="lifestyle-logout-btn"
              onClick={() => {
                toast.success('Logged out successfully');
                router.push('/auth/login');
              }}
            >
              Logout
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN WHITE NAVBAR */}
      <nav className="lifestyle-main-navbar">
        <div className="lifestyle-main-navbar-inner">
          
          <Link href="/home/landingPage/homePage" className="lifestyle-brand-logo">
            <div>
              <span className="lifestyle-brand-title">yono</span>
              <span className="text-pink-600 text-2xl font-black">&nbsp;SBI</span>
              <div className="lifestyle-brand-sub">NET-BANKING</div>
            </div>
          </Link>

          <div className="lifestyle-nav-links">
            
            {/* Travel Dropdown */}
            <div 
              className="lifestyle-nav-dropdown"
              onMouseEnter={() => setOpenDropdown('travel')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span 
                className={`lifestyle-nav-item ${openDropdown === 'travel' ? 'active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'travel' ? null : 'travel')}
              >
                Travel <ChevronDown size={14} />
              </span>
              {openDropdown === 'travel' && (
                <div className="lifestyle-mega-dropdown">
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Flight Booking')}>
                    <div className="lifestyle-dropdown-icon"><Plane size={16} /></div>
                    <span>Flight</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Train Booking')}>
                    <div className="lifestyle-dropdown-icon"><Train size={16} /></div>
                    <span>Train</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Bus Booking')}>
                    <div className="lifestyle-dropdown-icon"><Bus size={16} /></div>
                    <span>Bus</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Hotel Booking')}>
                    <div className="lifestyle-dropdown-icon"><Bed size={16} /></div>
                    <span>Hotel</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Events & Experiences')}>
                    <div className="lifestyle-dropdown-icon"><Ticket size={16} /></div>
                    <span>Events &amp; Experiences</span>
                  </div>
                </div>
              )}
            </div>

            {/* Offer and Services Dropdown */}
            <div 
              className="lifestyle-nav-dropdown"
              onMouseEnter={() => setOpenDropdown('offers')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span 
                className={`lifestyle-nav-item ${openDropdown === 'offers' ? 'active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'offers' ? null : 'offers')}
              >
                Offer and Services <ChevronDown size={14} />
              </span>
              {openDropdown === 'offers' && (
                <div className="lifestyle-mega-dropdown">
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Gift Cards')}>
                    <div className="lifestyle-dropdown-icon"><Gift size={16} /></div>
                    <span>Gift cards / vouchers</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Stores')}>
                    <div className="lifestyle-dropdown-icon"><Store size={16} /></div>
                    <span>Stores</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Health & Wellness')}>
                    <div className="lifestyle-dropdown-icon"><Heart size={16} /></div>
                    <span>Health &amp; Wellness</span>
                  </div>
                </div>
              )}
            </div>

            {/* Other Services Dropdown */}
            <div 
              className="lifestyle-nav-dropdown"
              onMouseEnter={() => setOpenDropdown('other')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <span 
                className={`lifestyle-nav-item ${openDropdown === 'other' ? 'active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'other' ? null : 'other')}
              >
                Other Services <ChevronDown size={14} />
              </span>
              {openDropdown === 'other' && (
                <div className="lifestyle-mega-dropdown">
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('ClearTax')}>
                    <div className="lifestyle-dropdown-icon"><FileText size={16} /></div>
                    <span>ClearTax</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('YONO Motorz')}>
                    <div className="lifestyle-dropdown-icon"><Car size={16} /></div>
                    <span>YONO Motorz</span>
                  </div>
                  <div className="lifestyle-dropdown-item" onClick={() => handleServiceClick('Property')}>
                    <div className="lifestyle-dropdown-icon"><Building2 size={16} /></div>
                    <span>Property</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="lifestyle-header-right-icons">
            <button type="button" className="lifestyle-icon-btn" title="Search" onClick={() => toast('Search active')}>
              <Search size={20} />
            </button>
            <button type="button" className="lifestyle-icon-btn" title="Notifications" onClick={() => toast('No new notifications')}>
              <Bell size={20} />
            </button>
            <div className="lifestyle-profile-pill" onClick={() => router.push('/profile')}>
              <div className="lifestyle-profile-avatar">DV</div>
              <span className="lifestyle-profile-label">My Profile</span>
            </div>
          </div>

        </div>
      </nav>

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

              <div className="lifestyle-stories-row">
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

                <button 
                  type="button" 
                  className="lifestyle-scroll-arrow ml-auto"
                  onClick={() => toast('More services loaded')}
                  aria-label="Next Services"
                >
                  <ChevronRight size={18} />
                </button>
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
