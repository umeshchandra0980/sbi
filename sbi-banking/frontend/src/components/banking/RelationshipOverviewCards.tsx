'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ChevronRight, ChevronLeft } from 'lucide-react';
import './RelationshipOverviewCards.css';

interface RelationshipOverviewCardsProps {
  onViewAllClick?: () => void;
  combinedBalance?: number;
}

export const RelationshipOverviewCards: React.FC<RelationshipOverviewCardsProps> = ({
  onViewAllClick,
  combinedBalance = 145280.50
}) => {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(false);
  const [showLifePolicy, setShowLifePolicy] = useState(false);
  const [showGeneralPolicy, setShowGeneralPolicy] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = carouselRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'right' ? 300 : -300;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const formattedBalance = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(combinedBalance);

  const handleViewAll = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      router.push('/accounts');
    }
  };

  return (
    <section aria-label="relationship overview section" className="rel-overview-section">
      {/* Header Row */}
      <div className="rel-overview-header">
        <h1 className="rel-overview-title">Relationship Overview</h1>
        <button
          type="button"
          onClick={handleViewAll}
          className="rel-view-all-btn"
          aria-label="View All Accounts"
        >
          <span>View All Accounts</span>
          <ChevronRight size={16} className="ml-0.5" />
        </button>
      </div>

      {/* Carousel Container */}
      <div className="rel-carousel-wrapper">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className="rel-carousel-arrow rel-carousel-arrow-left"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Slideshow Row */}
        <div ref={carouselRef} className="rel-slideshow-container">
          
          {/* Card 1: TRANSACTION ACCOUNTS */}
          <div className="rel-card rel-card-transaction">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="-10" cy="170" r="100" fill="#580045" fillOpacity="0.45" />
                <circle cx="135" cy="85" r="75" fill="#e85fd2" fillOpacity="0.35" />
                <circle cx="165" cy="85" r="110" fill="#e85fd2" fillOpacity="0.18" />
              </svg>
            </div>
            
            <div className="rel-card-header">
              <span className="rel-card-title">TRANSACTION ACCOUNTS</span>
              <button
                type="button"
                onClick={() => setShowBalance(!showBalance)}
                className="rel-eye-btn"
                aria-label={showBalance ? "Hide Balance" : "Show Balance"}
                title={showBalance ? "Hide Balance" : "Show Balance"}
              >
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="rel-card-body">
              <p className="rel-card-label">Combined Balance</p>
              <p className="rel-card-balance">
                ₹{showBalance ? formattedBalance : 'XXXX.xx'}
              </p>
            </div>

            <div className="rel-card-footer">
              <Link href="/accounts" className="rel-footer-link">
                View Accounts
              </Link>
              <Link href="/transactions" className="rel-footer-link">
                Transactions
              </Link>
            </div>
          </div>

          {/* Card 2: DEPOSITS */}
          <div className="rel-card rel-card-soft-purple">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="90" r="75" fill="#702082" fillOpacity="0.08" />
                <circle cx="165" cy="90" r="115" fill="#702082" fillOpacity="0.05" />
              </svg>
            </div>

            <div className="rel-card-header">
              <span className="rel-card-title rel-title-dark">DEPOSITS</span>
            </div>

            <div className="rel-card-body">
              <p className="rel-card-main-heading">Grow your money faster</p>
              <p className="rel-card-subtext">Check out our high-yield deposits</p>
            </div>

            <div className="rel-card-footer justify-start">
              <Link href="/accounts" className="rel-footer-link rel-link-dark">
                Explore
              </Link>
            </div>
          </div>

          {/* Card 3: LOANS */}
          <div className="rel-card rel-card-soft-purple">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="90" r="75" fill="#702082" fillOpacity="0.08" />
                <circle cx="165" cy="90" r="115" fill="#702082" fillOpacity="0.05" />
              </svg>
            </div>

            <div className="rel-card-header">
              <span className="rel-card-title rel-title-dark">LOANS</span>
            </div>

            <div className="rel-card-body">
              <p className="rel-card-main-heading">Find the perfect loan</p>
              <p className="rel-card-subtext">Ready to make that big purchase?</p>
            </div>

            <div className="rel-card-footer justify-start">
              <Link href="/dashboard" className="rel-footer-link rel-link-dark">
                Manage loans
              </Link>
            </div>
          </div>

          {/* Card 4: INVESTMENTS */}
          <div className="rel-card rel-card-soft-purple">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="90" r="75" fill="#702082" fillOpacity="0.08" />
                <circle cx="165" cy="90" r="115" fill="#702082" fillOpacity="0.05" />
              </svg>
            </div>

            <div className="rel-card-header">
              <span className="rel-card-title rel-title-dark">INVESTMENTS</span>
            </div>

            <div className="rel-card-body">
              <p className="rel-card-subtext font-semibold text-slate-700 mt-2">
                Ready to start investing?
              </p>
            </div>

            <div className="rel-card-footer justify-start">
              <Link href="/dashboard" className="rel-footer-link rel-link-dark">
                Invest Now
              </Link>
            </div>
          </div>

          {/* Card 5: CREDIT CARDS */}
          <div className="rel-card rel-card-soft-pink">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="90" r="75" fill="#be185d" fillOpacity="0.07" />
                <circle cx="165" cy="90" r="115" fill="#be185d" fillOpacity="0.04" />
              </svg>
            </div>

            <div className="rel-card-header">
              <span className="rel-card-title rel-title-dark">CREDIT CARDS</span>
            </div>

            <div className="rel-card-body">
              <p className="rel-card-main-heading">Find your perfect credit card</p>
              <p className="rel-card-subtext">Need flexibility? Check out our credit card options.</p>
            </div>

            <div className="rel-card-footer justify-start">
              <Link href="/cards" className="rel-footer-link rel-link-dark">
                Explore
              </Link>
            </div>
          </div>

          {/* Card 6: PERSONAL FINANCE MANAGER */}
          <div className="rel-card rel-card-soft-blue">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="90" r="75" fill="#1d4ed8" fillOpacity="0.07" />
                <circle cx="165" cy="90" r="115" fill="#1d4ed8" fillOpacity="0.04" />
              </svg>
            </div>

            <div className="rel-card-header">
              <span className="rel-card-title rel-title-dark">PERSONAL FINANCE MANAGER</span>
            </div>

            <div className="rel-card-body">
              <p className="rel-card-subtext font-semibold text-slate-700 mt-1 leading-snug">
                One dashboard, all your finances-start using Personal Financial Manager now!
              </p>
            </div>

            <div className="rel-card-footer justify-start">
              <Link href="/dashboard" className="rel-footer-link rel-link-dark">
                Start Now
              </Link>
            </div>
          </div>

          {/* Card 7: LIFE INSURANCE */}
          <div className="rel-card rel-card-soft-blue">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="90" r="75" fill="#1d4ed8" fillOpacity="0.07" />
                <circle cx="165" cy="90" r="115" fill="#1d4ed8" fillOpacity="0.04" />
              </svg>
            </div>

            <div className="rel-card-header">
              <span className="rel-card-title rel-title-dark">LIFE INSURANCE</span>
              <button
                type="button"
                onClick={() => setShowLifePolicy(!showLifePolicy)}
                className="rel-eye-btn rel-eye-dark"
                aria-label="Toggle Policy details"
              >
                {showLifePolicy ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="rel-card-body">
              {showLifePolicy ? (
                <div>
                  <p className="text-xs font-bold text-slate-800">Policy: SBI Sampoorna Suraksha</p>
                  <p className="text-[11px] text-slate-600">Cover: ₹50,000,000</p>
                </div>
              ) : (
                <div>
                  <p className="rel-card-main-heading text-xs">Click on the Eye Icon above</p>
                  <p className="rel-card-subtext">To View your Policy details</p>
                </div>
              )}
            </div>

            <div className="rel-card-footer justify-start">
              <Link href="/dashboard" className="rel-footer-link rel-link-dark">
                Buy New
              </Link>
            </div>
          </div>

          {/* Card 8: GENERAL INSURANCE */}
          <div className="rel-card rel-card-soft-purple">
            <div className="rel-card-bg-circles">
              <svg viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="130" cy="90" r="75" fill="#702082" fillOpacity="0.08" />
                <circle cx="165" cy="90" r="115" fill="#702082" fillOpacity="0.05" />
              </svg>
            </div>

            <div className="rel-card-header">
              <span className="rel-card-title rel-title-dark">GENERAL INSURANCE</span>
              <button
                type="button"
                onClick={() => setShowGeneralPolicy(!showGeneralPolicy)}
                className="rel-eye-btn rel-eye-dark"
                aria-label="Toggle Policy details"
              >
                {showGeneralPolicy ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="rel-card-body">
              {showGeneralPolicy ? (
                <div>
                  <p className="text-xs font-bold text-slate-800">Policy: Health Protect Plus</p>
                  <p className="text-[11px] text-slate-600">Cover: ₹1,000,000</p>
                </div>
              ) : (
                <div>
                  <p className="rel-card-main-heading text-xs">Click on the Eye Icon above</p>
                  <p className="rel-card-subtext">To View your Policy details</p>
                </div>
              )}
            </div>

            <div className="rel-card-footer justify-start">
              <Link href="/dashboard" className="rel-footer-link rel-link-dark">
                Buy New
              </Link>
            </div>
          </div>

        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className="rel-carousel-arrow rel-carousel-arrow-right"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
};

export default RelationshipOverviewCards;
