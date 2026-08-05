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
          <p className="banner-text-wrapper flex flex-col items-start justify-center">
            <small className="check text-white text-xs font-normal">Check your</small>
            <strong className="banner-heading text-white font-bold text-[17px] leading-tight flex items-center gap-1 mt-0.5">
              <span>Credit Score</span>
              <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </strong>
          </p>
        </div>

        <div className="banner-illustration-area">
          <svg className="banner-cutout-svg" viewBox="0 0 200 100" preserveAspectRatio="none">
            <path d="M 65 0 C 40 25, 20 65, 0 100 L 200 100 L 200 0 Z" fill="#ffffff" />
          </svg>

          <div className="banner-graphic-container">
            <svg viewBox="0 0 140 100" fill="none" className="credit-gauge-svg">
              {/* Soft background cloud */}
              <path d="M20,80 Q10,70 20,60 Q30,50 45,55 Q55,45 75,55 Q85,50 95,65 Q105,70 100,80 Z" fill="#e8edf7" opacity="0.8" />
              
              {/* Butterfly silhouette */}
              <path d="M35,42 C33,39 31,41 33,44 C34,46 36,44 38,42 C37,41 35,40 35,42 Z" fill="#86198f" opacity="0.6" />
              <path d="M38,42 C40,40 42,42 40,45 C39,47 37,45 35,42 Z" fill="#86198f" opacity="0.6" />
              
              {/* Speedometer Arc segments */}
              <path d="M 37 90 A 48 48 0 0 1 45 50" fill="none" stroke="#e06287" strokeWidth="9" strokeLinecap="round" />
              <path d="M 45 50 A 48 48 0 0 1 70 30" fill="none" stroke="#be89c7" strokeWidth="9" />
              <path d="M 70 30 A 48 48 0 0 1 100 30" fill="none" stroke="#9069b2" strokeWidth="9" />
              <path d="M 100 30 A 48 48 0 0 1 133 90" fill="none" stroke="#665ca8" strokeWidth="9" strokeLinecap="round" />

              {/* Inner track */}
              <path d="M 43 90 A 40 40 0 0 1 127 90" fill="none" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />

              {/* Needle hub */}
              <circle cx="85" cy="90" r="10" fill="#ffffff" />
              <circle cx="85" cy="90" r="7" fill="#b92c7a" />
              
              {/* Needle pointing top-right */}
              <path d="M 83 87 L 118 52 L 87 83 Z" fill="#b92c7a" />
              <circle cx="85" cy="90" r="3" fill="#ffffff" />
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
            <strong className="banner-heading text-white font-bold text-[17px] leading-tight flex flex-col items-start">
              <span>Personal Finance</span>
              <span className="flex items-center gap-1 mt-0.5">
                <span>Manager</span>
                <svg className="w-4 h-4 text-white shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </strong>
          </p>
        </div>

        <div className="banner-illustration-area">
          <svg className="banner-cutout-svg" viewBox="0 0 200 100" preserveAspectRatio="none">
            <path d="M 65 0 C 40 25, 20 65, 0 100 L 200 100 L 200 0 Z" fill="#ffffff" />
          </svg>

          <div className="banner-graphic-container">
            <svg viewBox="0 0 140 100" fill="none" className="pfm-illustration-svg">
              {/* Pink Calculator in background left */}
              <rect x="25" y="42" width="26" height="40" rx="3" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" opacity="0.9" />
              <rect x="29" y="46" width="18" height="8" rx="1" fill="#ffffff" />
              <circle cx="31" cy="60" r="1.5" fill="#f472b6" /><circle cx="37" cy="60" r="1.5" fill="#f472b6" /><circle cx="43" cy="60" r="1.5" fill="#f472b6" />
              <circle cx="31" cy="67" r="1.5" fill="#f472b6" /><circle cx="37" cy="67" r="1.5" fill="#f472b6" /><circle cx="43" cy="67" r="1.5" fill="#f472b6" />
              <circle cx="31" cy="74" r="1.5" fill="#f472b6" /><circle cx="37" cy="74" r="1.5" fill="#f472b6" /><circle cx="43" cy="74" r="1.5" fill="#f472b6" />

              {/* Calendar sheet in front of calculator */}
              <rect x="42" y="55" width="22" height="26" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
              <path d="M42,60 H64" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="47" cy="57.5" r="1" fill="#be185d" /><circle cx="59" cy="57.5" r="1" fill="#be185d" />
              <rect x="46" y="64" width="3" height="3" rx="0.5" fill="#94a3b8" />
              <rect x="51" y="64" width="3" height="3" rx="0.5" fill="#94a3b8" />
              <rect x="56" y="64" width="3" height="3" rx="0.5" fill="#e06287" />
              <rect x="46" y="70" width="3" height="3" rx="0.5" fill="#94a3b8" />
              <rect x="51" y="70" width="3" height="3" rx="0.5" fill="#94a3b8" />
              <rect x="56" y="70" width="3" height="3" rx="0.5" fill="#94a3b8" />

              {/* Blue Wallet with Cash on the right */}
              <path d="M102,48 L114,35 L124,38 L112,52 Z" fill="#d1fae5" stroke="#10b981" strokeWidth="0.8" />
              <path d="M110,48 L122,35 L132,38 L120,52 Z" fill="#a7f3d0" stroke="#10b981" strokeWidth="0.8" />
              <rect x="94" y="48" width="38" height="32" rx="4" fill="#525c99" stroke="#312e81" strokeWidth="1" />
              <path d="M94,54 H132" stroke="#312e81" strokeWidth="1" />
              <path d="M116,56 H132 V68 H116 Z" fill="#434c85" stroke="#312e81" strokeWidth="1" />
              <circle cx="120" cy="62" r="2" fill="#fbbf24" />

              {/* Clipboard List in foreground */}
              <rect x="62" y="16" width="54" height="68" rx="4" fill="#ffffff" stroke="#525c99" strokeWidth="2" />
              <path d="M80,16 C80,12 98,12 98,16" stroke="#525c99" strokeWidth="2" fill="none" strokeLinecap="round" />
              <rect x="84" y="14" width="10" height="5" rx="1" fill="#94a3b8" />

              {/* Rupee Circle on Clipboard */}
              <circle cx="104" cy="27" r="6" fill="#b81d6c" />
              <text x="104" y="30" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif">₹</text>

              {/* List Items */}
              <path d="M68,30 L72,26 L76,30 V34 H68 Z" fill="none" stroke="#e06287" strokeWidth="1" />
              <line x1="80" y1="31" x2="102" y2="31" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

              <path d="M67,39 H69 L71,44 H75 L77,41" fill="none" stroke="#e06287" strokeWidth="1" />
              <circle cx="72" cy="46" r="1" fill="#e06287" /><circle cx="75" cy="46" r="1" fill="#e06287" />
              <line x1="80" y1="43" x2="102" y2="43" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

              <line x1="69" y1="51" x2="69" y2="56" stroke="#e06287" strokeWidth="1" />
              <path d="M68,51 C68,49 70,49 70,51" stroke="#e06287" strokeWidth="1" fill="none" />
              <line x1="73" y1="51" x2="73" y2="56" stroke="#e06287" strokeWidth="1" />
              <circle cx="73" cy="51" r="1.5" fill="#e06287" />
              <line x1="80" y1="54" x2="102" y2="54" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

              <path d="M68,64 L74,64 L72,61 L73,61 L76,64 L78,64 L76,66 L71,66 Z" fill="#e06287" />
              <line x1="80" y1="65" x2="102" y2="65" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

              <path d="M69,72 C69,72 72,71 73,72 C74,71 77,72 77,72 C77,75 75,77 73,78 C71,77 69,75 69,72 Z" fill="none" stroke="#e06287" strokeWidth="1" />
              <line x1="80" y1="75" x2="102" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default QuickFeatureBanners;
