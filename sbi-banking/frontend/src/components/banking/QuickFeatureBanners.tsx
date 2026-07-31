'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import './QuickFeatureBanners.css';

export interface QuickFeatureBannersProps {
  onCreditScoreClick?: () => void;
  onPfmClick?: () => void;
}

export const QuickFeatureBanners: React.FC<QuickFeatureBannersProps> = ({
  onCreditScoreClick,
  onPfmClick
}) => {
  return (
    <div className="quick-banners-grid">
      <div 
        className="credit-score image-1 quick-banner-card"
        tabIndex={0}
        onClick={onCreditScoreClick}
        role="button"
        aria-label="Check your Credit Score"
      >
        <div className="banner-content-left">
          <p className="banner-text-wrapper">
            <span>
              <small className="check">Check your</small>
              <br />
              <strong className="banner-heading">Credit Score</strong>
              <ChevronRight size={20} className="banner-chevron-icon" />
            </span>
          </p>
        </div>

        <div className="banner-illustration-area">
          <svg className="banner-cutout-svg" viewBox="0 0 200 100" preserveAspectRatio="none">
            <path d="M 50 0 C 20 0 0 100 0 100 L 200 100 L 200 0 Z" fill="#ffffff" />
          </svg>

          <div className="banner-graphic-container">
            <svg viewBox="0 0 140 100" fill="none" className="credit-gauge-svg">
              <path d="M 15 75 Q 10 60 25 58 Q 30 45 45 52 Q 55 48 60 60 Z" fill="#e9d5ff" opacity="0.6" />
              <path d="M 100 80 Q 95 68 110 65 Q 115 55 128 62 Q 135 60 138 72 Z" fill="#e9d5ff" opacity="0.5" />
              <path d="M 42 28 C 38 22 45 18 47 24 C 49 18 56 22 52 28 C 48 30 46 26 42 28 Z" fill="#a855f7" opacity="0.8" />
              <path d="M 20 80 A 50 50 0 0 1 120 80" fill="none" stroke="#f3e8ff" strokeWidth="14" strokeLinecap="round" />
              <path d="M 20 80 A 50 50 0 0 1 40 40" fill="none" stroke="#ec4899" strokeWidth="14" strokeLinecap="round" />
              <path d="M 40 40 A 50 50 0 0 1 70 30" fill="none" stroke="#c084fc" strokeWidth="14" />
              <path d="M 70 30 A 50 50 0 0 1 100 40" fill="none" stroke="#818cf8" strokeWidth="14" />
              <path d="M 100 40 A 50 50 0 0 1 120 80" fill="none" stroke="#6366f1" strokeWidth="14" strokeLinecap="round" />
              <circle cx="70" cy="80" r="8" fill="#be185d" />
              <circle cx="70" cy="80" r="4" fill="#ffffff" />
              <polygon points="70,80 67,78 102,46 73,82" fill="#be185d" />
              <line x1="70" y1="80" x2="102" y2="46" stroke="#9d174d" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <Link 
        href="/home/landingPage/others/pfm/financial-fitness"
        className="pfm-card image-3 quick-banner-card"
        tabIndex={0}
        onClick={onPfmClick}
        aria-label="Personal Finance Manager"
      >
        <div className="banner-content-left">
          <p className="banner-text-wrapper">
            <span>
              <strong className="banner-heading pfm-heading">
                Personal Finance <br />
                Manager
              </strong>
              <ChevronRight size={20} className="banner-chevron-icon inline-icon" />
            </span>
          </p>
        </div>

        <div className="banner-illustration-area">
          <svg className="banner-cutout-svg" viewBox="0 0 200 100" preserveAspectRatio="none">
            <path d="M 50 0 C 20 0 0 100 0 100 L 200 100 L 200 0 Z" fill="#ffffff" />
          </svg>

          <div className="banner-graphic-container">
            <svg viewBox="0 0 140 100" fill="none" className="pfm-illustration-svg">
              <rect x="18" y="45" width="22" height="38" rx="3" fill="#fbcfe8" opacity="0.7" />
              <rect x="22" y="50" width="14" height="8" rx="1" fill="#ffffff" />
              <circle cx="24" cy="64" r="1.5" fill="#be185d" />
              <circle cx="29" cy="64" r="1.5" fill="#be185d" />
              <circle cx="34" cy="64" r="1.5" fill="#be185d" />
              <circle cx="24" cy="71" r="1.5" fill="#be185d" />
              <circle cx="29" cy="71" r="1.5" fill="#be185d" />
              <circle cx="34" cy="71" r="1.5" fill="#be185d" />

              <rect x="85" y="40" width="40" height="42" rx="6" fill="#6366f1" />
              <rect x="90" y="32" width="28" height="15" rx="2" fill="#a7f3d0" />
              <rect x="93" y="28" width="24" height="12" rx="2" fill="#34d399" />
              <circle cx="115" cy="60" r="3" fill="#fbbf24" />

              <rect x="42" y="16" width="44" height="66" rx="4" fill="#ffffff" stroke="#312e81" strokeWidth="2.5" />
              <rect x="54" y="12" width="20" height="7" rx="2" fill="#be185d" />
              <circle cx="64" cy="18" r="2" fill="#ffffff" />

              <path d="M 48 28 L 52 24 L 56 28 V 32 H 48 Z" fill="#6366f1" />
              <line x1="60" y1="28" x2="80" y2="28" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

              <circle cx="50" cy="40" r="2.5" stroke="#ec4899" strokeWidth="1.5" fill="none" />
              <line x1="60" y1="40" x2="76" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

              <line x1="49" y1="50" x2="49" y2="55" stroke="#8b5cf6" strokeWidth="1.5" />
              <line x1="53" y1="50" x2="53" y2="55" stroke="#8b5cf6" strokeWidth="1.5" />
              <line x1="60" y1="52" x2="78" y2="52" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

              <line x1="60" y1="64" x2="74" y2="64" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />

              <rect x="36" y="30" width="4" height="40" rx="1" fill="#f59e0b" transform="rotate(-15 36 30)" />
              <polygon points="30,68 33,76 38,70" fill="#78350f" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuickFeatureBanners;
