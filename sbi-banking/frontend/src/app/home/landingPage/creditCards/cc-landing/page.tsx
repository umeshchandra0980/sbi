'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { 
  ChevronRight, 
  ChevronLeft,
  Home,
  Wallet,
  ChevronDown
} from 'lucide-react';

export default function CreditCardLandingPage() {
  const router = useRouter();

  // Carousel State: 0: Cashback, 1: SimplyCLICK, 2: ELITE
  const [activeCardIndex, setActiveCardIndex] = useState(1); 
  const [selectedNetwork, setSelectedNetwork] = useState('Mastercard');
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false);
  const networkDropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (networkDropdownRef.current && !networkDropdownRef.current.contains(event.target as Node)) {
        setIsNetworkDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const networkOptions = [
    { value: 'Mastercard', label: 'Mastercard' },
    { value: 'Visa', label: 'Visa Signature' },
    { value: 'RuPay', label: 'RuPay Contactless' },
  ];

  const cardsData = [
    {
      id: 'cashback',
      name: 'CASHBACK SBI Card',
      fullName: 'CASHBACK SBI Card Visa',
      networkDefault: 'Visa',
      imgUrl: 'https://www.sbicard.com/static-resources/img/card/card-face-assets/for-website/front/vertical/cashback-card-face-min.png',
      benefit: 'Get 5% Cashback on all online spends automatically',
      fallbackBg: 'bg-gradient-to-br from-[#7e22ce] via-[#6b21a8] to-[#4c1d95]',
      tagline: 'CASH BACK'
    },
    {
      id: 'simplyclick',
      name: 'SimplyCLICK SBI Card',
      fullName: 'SimplyCLICK SBI Card Mastercard',
      networkDefault: 'Mastercard',
      imgUrl: 'https://www.sbicard.com/static-resources/img/card/product-detail-assets/core-cards/simply-click/left-banner/simply-click-card-face.png',
      benefit: 'Get upto 10X reward points every time you spend online',
      fallbackBg: 'bg-gradient-to-br from-[#881337] via-[#9f1239] to-[#701a75]',
      tagline: 'SimplyCLICK'
    },
    {
      id: 'elite',
      name: 'SBI Card ELITE',
      fullName: 'SBI Card ELITE Mastercard',
      networkDefault: 'Mastercard',
      imgUrl: 'https://www.sbicard.com/static-resources/img/card/card-face-assets/for-website/front/horizontal/elite-sbi-card.png',
      benefit: 'Get free movie tickets worth Rs. 6,000 every year.',
      fallbackBg: 'bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b]',
      tagline: 'ELITE'
    }
  ];

  const totalCards = cardsData.length;
  const currentCard = cardsData[activeCardIndex];
  
  const leftCardIndex = (activeCardIndex - 1 + totalCards) % totalCards;
  const rightCardIndex = (activeCardIndex + 1) % totalCards;

  const leftCard = cardsData[leftCardIndex];
  const rightCard = cardsData[rightCardIndex];

  const handleSelectCard = (index: number) => {
    setActiveCardIndex(index);
    setSelectedNetwork(cardsData[index].networkDefault);
  };

  const handlePrevCard = () => {
    const newIdx = activeCardIndex === 0 ? totalCards - 1 : activeCardIndex - 1;
    handleSelectCard(newIdx);
  };

  const handleNextCard = () => {
    const newIdx = activeCardIndex === totalCards - 1 ? 0 : activeCardIndex + 1;
    handleSelectCard(newIdx);
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col">
      
      {/* Top Global Header Bar */}
      <SbiGlobalBrandHeader activeNav="Cards" activeTopTab="Banking" />

      {/* Main Page Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 py-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5b2e80] mb-4">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="text-slate-600">Credit Cards</span>
        </div>

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#5b2e80] mb-4">
          My Credit Card
        </h1>

        {/* Do you have a SBI Credit Card ? Link Now Banner */}
        <div 
          onClick={() => toast.success("Redirecting to Credit Card Linking Portal...")}
          className="bg-[#f4edf9] border border-purple-200/70 rounded-xl py-3 px-5 text-xs font-bold text-[#5b2e80] flex justify-between items-center mb-6 cursor-pointer hover:bg-[#eadbf7] transition-colors shadow-2xs"
        >
          <span>Do you have a SBI Credit Card ? <span className="underline ml-1">Link Now</span></span>
          <ChevronRight size={16} />
        </div>

        {/* Main Grid Layout (2 Columns: Showcase Card Left, Quick Access Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-12">
          
          {/* Left Column: Recommended Cards Showcase (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col items-center justify-between min-h-[640px]">
            
            <h2 className="text-xl md:text-2xl font-extrabold text-[#5b2e80] mb-8 text-center">
              YONO Recommended Cards for You
            </h2>

            {/* Interactive Cards Display Carousel */}
            <div className="relative w-full flex items-center justify-center gap-2 sm:gap-6 mb-8 min-h-[260px]">
              
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrevCard}
                aria-label="Previous Card"
                className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 hover:text-[#5b2e80] transition-all shadow-md z-20 flex-shrink-0 cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>

              {/* 3 Cards Container */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 w-full py-4 max-w-[600px]">
                
                {/* Left Card (Side) */}
                <div 
                  onClick={handlePrevCard}
                  className="w-32 h-52 sm:w-36 sm:h-56 cursor-pointer opacity-85 hover:opacity-100 transform scale-95 transition-all duration-300 flex-shrink-0 hidden sm:flex items-center justify-center filter drop-shadow-md"
                >
                  <img 
                    src={leftCard.imgUrl} 
                    alt={leftCard.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Center Active Featured Card (Only Card PNG Image with Elevation Shadow) */}
                <div className="w-52 h-72 sm:w-64 sm:h-84 transform scale-105 transition-all duration-300 flex items-center justify-center flex-shrink-0 z-10 filter drop-shadow-2xl">
                  <img 
                    src={currentCard.imgUrl} 
                    alt={currentCard.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Right Card (Side) */}
                <div 
                  onClick={handleNextCard}
                  className="w-32 h-52 sm:w-36 sm:h-56 cursor-pointer opacity-85 hover:opacity-100 transform scale-95 transition-all duration-300 flex-shrink-0 hidden sm:flex items-center justify-center filter drop-shadow-md"
                >
                  <img 
                    src={rightCard.imgUrl} 
                    alt={rightCard.name}
                    className="w-full h-full object-contain"
                  />
                </div>

              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNextCard}
                aria-label="Next Card"
                className="w-10 h-10 rounded-full bg-white border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 hover:text-[#5b2e80] transition-all shadow-md z-20 flex-shrink-0 cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>

            </div>

            {/* Selected Card Title */}
            <h3 className="text-lg md:text-xl font-extrabold text-[#222222] text-center mb-4 transition-all">
              {currentCard.fullName}
            </h3>

            {/* Network Dropdown Selector */}
            <div className="w-full max-w-[300px] mb-4 text-left relative" ref={networkDropdownRef}>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5">
                Selected Network
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsNetworkDropdownOpen((prev) => !prev)}
                  className="w-full bg-white border border-slate-300 hover:border-[#5b2e80] focus:border-[#5b2e80] rounded-xl py-2.5 px-3.5 flex items-center justify-between text-xs font-bold text-slate-800 transition-all shadow-2xs cursor-pointer"
                >
                  <span>
                    {networkOptions.find((opt) => opt.value === selectedNetwork)?.label || selectedNetwork}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-500 transition-transform duration-200 ${
                      isNetworkDropdownOpen ? 'rotate-180 text-[#5b2e80]' : ''
                    }`} 
                  />
                </button>

                {isNetworkDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-purple-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="py-1">
                      {networkOptions.map((opt) => {
                        const isSelected = selectedNetwork === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSelectedNetwork(opt.value);
                              setIsNetworkDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#f4edf9] text-[#5b2e80]'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-[#5b2e80]'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && (
                              <span className="text-[#5b2e80] text-sm font-black">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Benefit Highlight Bullet */}
            <div className="text-center mb-6 max-w-[440px]">
              <p className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 leading-relaxed">
                <span className="text-[#5b2e80] font-black text-sm">&gt;</span>
                <span>{currentCard.benefit}</span>
              </p>
              <button 
                type="button" 
                onClick={() => toast.success(`Viewing features for ${currentCard.name}`)}
                className="text-xs font-bold text-[#5b2e80] underline hover:text-[#4a1c70] mt-1 inline-block"
              >
                Know More
              </button>
            </div>

            {/* Apply Now Primary Action Button */}
            <button
              type="button"
              onClick={() => toast.success(`Starting application for ${currentCard.fullName}`)}
              className="w-full max-w-[300px] bg-[#5b2e80] hover:bg-[#4a1c70] text-white font-extrabold py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all text-sm mb-6 cursor-pointer"
            >
              Apply Now
            </button>

            {/* Carousel Interactive Pagination Dots */}
            <div className="flex items-center gap-2 mb-2">
              {cardsData.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectCard(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    activeCardIndex === idx 
                      ? 'w-7 h-2.5 bg-[#5b2e80]' 
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Quick Access Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Top Card: Browse All Cards */}
            <div 
              onClick={() => toast.success("Opening All SBI Credit Cards Catalogue...")}
              className="bg-white rounded-2xl p-6 border border-purple-100/70 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Wallet & Bills Illustration */}
                <div className="w-12 h-12 rounded-xl bg-purple-100/80 text-[#5b2e80] flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Wallet size={24} />
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#5b2e80]">
                  Browse All Cards
                </h4>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-[#5b2e80] group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* Bottom Card: Find your Perfect Credit Card */}
            <div 
              onClick={() => toast.success("Opening Card Selector Wizard...")}
              className="bg-white rounded-2xl p-6 border border-purple-100/70 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
            >
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#5b2e80] mb-1">
                  Find your Perfect Credit Card
                </h4>
                <p className="text-xs font-semibold text-slate-500">
                  Custom Cards tailored for your Preference
                </p>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-[#5b2e80] group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
            </div>

          </div>

        </div>

      </main>

      {/* Footer Links Bar */}
      <footer className="bg-[#333333] text-white text-xs py-3.5 px-6 text-center mt-auto">
        <div className="flex items-center justify-center gap-4 text-white/90">
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://bank.sbi" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
