'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { 
  Home, ChevronRight, HelpCircle, MessageSquare, CreditCard, 
  ArrowRight, Check, X, Shield, Sparkles, Star, Award, Layers,
  Gift, Percent, Flame, ShoppingBag, Compass
} from 'lucide-react';
import './cards.css';

interface CreditCardItem {
  id: string;
  name: string;
  category: 'Lifestyle' | 'Reward' | 'Shopping' | 'Travel & Fuel';
  network: ('Mastercard' | 'VISA' | 'Amex' | 'RuPay')[];
  image: string;
  benefit: string;
  joiningFee: string;
  annualFee: string;
  rewardsSummary: string;
  features: string[];
}

const CREDIT_CARDS: CreditCardItem[] = [
  {
    id: 'elite',
    name: 'SBI Card ELITE',
    category: 'Lifestyle',
    network: ['Mastercard', 'VISA', 'Amex'],
    image: 'https://sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/network-card-images/Elite_349x218-px-Front.png',
    benefit: 'Get free movie tickets worth Rs. 6,000 every year.',
    joiningFee: '₹4,999',
    annualFee: '₹4,999 (Waived on ₹10 Lakh spends)',
    rewardsSummary: '5X Reward Points on Dining, Departmental Stores & International spends',
    features: [
      'Free movie tickets worth ₹6,000 every year',
      'Welcome gift voucher worth ₹5,000 from Yatra/Hush Puppies/Bata',
      '6 Complimentary International Lounge visits per year',
      '2 Complimentary Domestic Airport Lounge visits per quarter'
    ]
  },
  {
    id: 'pulse',
    name: 'SBI Card PULSE',
    category: 'Lifestyle',
    network: ['Mastercard', 'VISA'],
    image: 'https://sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/network-card-images/240759_SBI_Pulse_349-x-218px-01.png',
    benefit: 'Get a Noise ColorFit Pulse 4 Pro Smartwatch worth Rs. 7,999',
    joiningFee: '₹1,499',
    annualFee: '₹1,499 (Waived on ₹2 Lakh spends)',
    rewardsSummary: '10X Reward Points on Pharmacy, Chemist & Health spends',
    features: [
      'Noise ColorFit Pulse 4 Pro Smartwatch worth ₹7,999 on joining',
      '1 Year Complimentary Fitpass Pro Membership',
      '8 Complimentary Domestic Airport Lounge visits per year',
      'Comprehensive E-Health services & Netmeds discounts'
    ]
  },
  {
    id: 'aurum',
    name: 'AURUM Card',
    category: 'Lifestyle',
    network: ['VISA', 'Mastercard'],
    image: 'https://sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/lifestyle/auram/aurum-visa-6pin-filled-chip-front.png',
    benefit: 'Memberships and privileges crafted to complement your elegant lifestyle',
    joiningFee: '₹9,999',
    annualFee: '₹9,999 (Waived on ₹12 Lakh spends)',
    rewardsSummary: '4 Reward Points per ₹100 spent across all categories',
    features: [
      'Complimentary Flight tickets & Secretarial Concierge Desk',
      'Unlimited Domestic & International Airport Lounge access',
      'Luxury Brand welcome gift vouchers worth ₹10,000',
      'Dedicated 24x7 Executive Concierge & Golf Privileges'
    ]
  },
  {
    id: 'bpcl-octane',
    name: 'BPCL SBI Card Octane',
    category: 'Travel & Fuel',
    network: ['RuPay', 'VISA'],
    image: 'https://sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/travel/bpcl-octane/bpcl-octane-front.png',
    benefit: '7.25% Value back (25X reward points) on BPCL fuel purchases',
    joiningFee: '₹1,499',
    annualFee: '₹1,499 (Waived on ₹2 Lakh spends)',
    rewardsSummary: '25X Reward Points on Fuel spends at BPCL Outlets',
    features: [
      '7.25% Equivalent Value back (25X Reward Points) on BPCL fuel',
      '6,000 Bonus Reward Points (worth ₹1,500) on fee payment',
      '4 Complimentary Domestic Airport Lounge visits per year',
      '1% Fuel Surcharge Waiver across BPCL stations nationwide'
    ]
  },
  {
    id: 'simplyclick',
    name: 'SimplyCLICK SBI Card',
    category: 'Shopping',
    network: ['VISA', 'RuPay'],
    image: 'https://sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/simplyclick/simplyclick-front.png',
    benefit: '10X Reward Points on online spends (Amazon, BookMyShow, Cleartrip)',
    joiningFee: '₹499',
    annualFee: '₹499 (Waived on ₹1 Lakh spends)',
    rewardsSummary: '10X Reward Points on partner online merchants',
    features: [
      '₹500 Amazon Gift Card on joining fee payment',
      '10X Reward Points on Amazon, BookMyShow, Cleartrip, Lenskart, Myntra',
      '5X Reward Points on all other online spends',
      'ClearTrip e-Voucher worth ₹2,000 on annual online spends of ₹1 Lakh'
    ]
  },
  {
    id: 'simplysave',
    name: 'SimplySAVE SBI Card',
    category: 'Reward',
    network: ['RuPay', 'VISA'],
    image: 'https://sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/simplysave/simplysave-front.png',
    benefit: '10X Reward Points on Dining, Grocery & Departmental store spends',
    joiningFee: '₹499',
    annualFee: '₹499 (Waived on ₹1 Lakh spends)',
    rewardsSummary: '10X Reward Points per ₹150 on Dining, Movies & Grocery',
    features: [
      '2,000 Bonus Reward Points on spending ₹2,000 in first 60 days',
      '10X Reward Points on Grocery, Supermarket, Dining & Movies',
      '1% Fuel Surcharge Waiver across all petrol pumps',
      'RuPay UPI enabled - scan and pay with credit card'
    ]
  },
  {
    id: 'cashback',
    name: 'Cashback SBI Card',
    category: 'Shopping',
    network: ['VISA', 'Mastercard'],
    image: 'https://sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/cashback-sbi-card/cashback-sbi-card-front.png',
    benefit: '5% Cashback on all online spends without merchant restriction',
    joiningFee: '₹999',
    annualFee: '₹999 (Waived on ₹2 Lakh spends)',
    rewardsSummary: '5% Direct Cashback auto-credited to account statement',
    features: [
      '5% Unlimited Cashback on all online purchases across all platforms',
      '1% Cashback on offline purchases & utility bills',
      'Auto-credited cashback to statement balance within 2 days of billing',
      '1% Fuel Surcharge Waiver up to ₹100 per statement cycle'
    ]
  }
];

export default function CardsPage() {
  const router = useRouter();

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('All');
  
  // Compare List
  const [compareList, setCompareList] = useState<CreditCardItem[]>([]);
  const [showCompareDrawer, setShowCompareDrawer] = useState<boolean>(false);
  
  // Modals
  const [selectedModalCard, setSelectedModalCard] = useState<CreditCardItem | null>(null);
  const [applyingCard, setApplyingCard] = useState<CreditCardItem | null>(null);
  
  // Form input for application
  const [panNumber, setPanNumber] = useState('');
  const [income, setIncome] = useState('');
  const [mobile, setMobile] = useState('');

  const toggleCompare = (card: CreditCardItem) => {
    if (compareList.some(c => c.id === card.id)) {
      setCompareList(compareList.filter(c => c.id !== card.id));
    } else {
      if (compareList.length >= 3) {
        toast.error('You can compare a maximum of 3 cards at once');
        return;
      }
      setCompareList([...compareList, card]);
      setShowCompareDrawer(true);
    }
  };

  const filteredCards = CREDIT_CARDS.filter(card => {
    const matchCategory = selectedCategory === 'All' || card.category === selectedCategory;
    const matchNetwork = selectedNetwork === 'All' || card.network.includes(selectedNetwork as any);
    return matchCategory && matchNetwork;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!panNumber || panNumber.length !== 10) {
      toast.error('Please enter valid 10-character PAN');
      return;
    }
    toast.success(`Application submitted for ${applyingCard?.name}! Instant Approval Reference: SBIC${Math.floor(10000000 + Math.random() * 90000000)}`);
    setApplyingCard(null);
    setPanNumber('');
    setIncome('');
    setMobile('');
  };

  return (
    <div className="cc-wrapper">
      
      {/* ================= HEADER NAVBAR ================= */}
      <header className="w-full">
        {/* Dark Purple Strip */}
        <div className="cc-top-bar">
          <div className="cc-top-bar-inner">
            <div className="flex items-center gap-2">
              <button type="button" className="bg-white text-[#302985] font-bold px-3 py-1 rounded-t text-xs">
                Personal Banking
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-white/90">
              <a href="#mainContent" className="hover:underline">Skip to main content</a>
              <span>|</span>
              <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Corporate website</a>
              <span>|</span>
              <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                <HelpCircle size={13} /> Get Help
              </a>
              <span>|</span>
              <a href="https://wa.me/919022690226" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                <MessageSquare size={13} /> WhatsApp
              </a>
              <span>|</span>
              <span>English ▾</span>
              <span className="font-bold cursor-pointer">- A +</span>
            </div>
          </div>
        </div>

        {/* Main White Navbar */}
        <nav className="cc-main-nav" aria-label="Credit Cards Navigation">
          <div className="cc-main-nav-inner">
            <Link href="/dashboard" className="flex items-center gap-2 mr-10">
              <img 
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                alt="YONO SBI Net-Banking Logo" 
                className="h-8 object-contain"
              />
            </Link>

            <ul className="flex items-center gap-2">
              <li>
                <Link href="/dashboard" className="cc-nav-link">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/accounts" className="cc-nav-link">
                  <span>Accounts &amp; Deposits</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="cc-nav-link">
                  <span>Loans</span>
                </Link>
              </li>
              <li>
                <div className="cc-nav-link active">
                  <span>Cards</span>
                  <div className="cc-nav-line" />
                </div>
              </li>
              <li>
                <Link href="#" className="cc-nav-link">
                  <span>Investments</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ================= MAIN CONTENT BODY ================= */}
      <main id="mainContent" className="cc-body">
        
        {/* Sub-header Breadcrumb */}
        <div className="cc-breadcrumb">
          <Link href="/dashboard" className="text-[#302985] hover:underline flex items-center gap-1">
            <Home size={14} />
          </Link>
          <span>›</span>
          <span>Browse All Cards</span>
        </div>

        <h1 className="cc-page-heading">SBI Credit Card</h1>

        {/* SECTION 1: Featured Category Filters (Matching Screenshot) */}
        <div className="cc-section-card">
          <h2 className="cc-section-title">Our Featured Credit Cards</h2>

          <div className="cc-cat-grid">
            {[
              { label: 'All Cards', key: 'All', icon: <Layers size={18} /> },
              { label: 'Lifestyle', key: 'Lifestyle', icon: <Compass size={18} /> },
              { label: 'Reward', key: 'Reward', icon: <Gift size={18} /> },
              { label: 'Shopping', key: 'Shopping', icon: <ShoppingBag size={18} /> },
              { label: 'Travel & Fuel', key: 'Travel & Fuel', icon: <Flame size={18} /> },
            ].map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`cc-cat-btn ${selectedCategory === cat.key ? 'active' : ''}`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 2: Select Card Network Strip (Matching Screenshot) */}
        <div className="cc-network-bar">
          <span className="text-sm font-bold text-slate-800">Select Card Network</span>

          <div className="flex items-center gap-3">
            {[
              { name: 'All', label: 'All Networks' },
              { name: 'RuPay', label: 'RuPay' },
              { name: 'VISA', label: 'VISA' },
              { name: 'Mastercard', label: 'Mastercard' },
              { name: 'Amex', label: 'American Express' },
            ].map(net => (
              <button
                key={net.name}
                type="button"
                onClick={() => setSelectedNetwork(net.name)}
                className={`cc-network-btn ${selectedNetwork === net.name ? 'active' : ''}`}
              >
                <span className="text-xs font-extrabold text-[#673391]">{net.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION 3: Credit Cards Catalog Grid */}
        <div className="cc-card-grid">
          {filteredCards.map((card) => {
            const isCompared = compareList.some(c => c.id === card.id);
            return (
              <div key={card.id} className="cc-main-card">
                
                {/* Compare Check */}
                <button 
                  type="button" 
                  onClick={() => toggleCompare(card)}
                  className="cc-compare-btn"
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${isCompared ? 'bg-[#673391] text-white border-[#673391]' : 'border-slate-300 bg-white'}`}>
                    {isCompared && <Check size={12} />}
                  </span>
                  <span>Compare</span>
                </button>

                {/* Card Mockup Image */}
                <div className="cc-card-image-box cursor-pointer" onClick={() => setSelectedModalCard(card)}>
                  <img src={card.image} alt={card.name} className="cc-card-img" />
                </div>

                {/* Card Details */}
                <div>
                  <h3 className="cc-card-title">{card.name}</h3>
                  <div className="cc-network-tag">
                    Selected Network : <span className="font-bold">{card.network.join(' / ')}</span>
                  </div>

                  <div className="cc-benefit-box">
                    <ChevronRight size={16} className="text-[#673391] flex-shrink-0 mt-0.5" />
                    <span>{card.benefit}</span>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setSelectedModalCard(card)}
                    className="cc-know-more-btn"
                  >
                    Know More
                  </button>
                </div>

                {/* Apply Button */}
                <button 
                  type="button" 
                  onClick={() => setApplyingCard(card)}
                  className="cc-apply-btn"
                >
                  Apply Now
                </button>

              </div>
            );
          })}
        </div>

      </main>

      {/* ================= COMPARE DRAWER ================= */}
      {showCompareDrawer && compareList.length > 0 && (
        <div className="cc-compare-bar">
          <div className="max-w-[1360px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-800">
                Comparing ({compareList.length}/3 Cards):
              </span>
              <div className="flex gap-3">
                {compareList.map(c => (
                  <div key={c.id} className="bg-purple-50 text-[#673391] border border-purple-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <span>{c.name}</span>
                    <X size={12} className="cursor-pointer" onClick={() => toggleCompare(c)} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setCompareList([])}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1"
              >
                Clear All
              </button>
              <button 
                type="button" 
                onClick={() => toast.success('Comparison Table Generated!')}
                className="bg-[#673391] text-white px-4 py-1.5 rounded-md text-xs font-bold hover:bg-[#522676]"
              >
                Compare Cards Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= KNOW MORE MODAL ================= */}
      {selectedModalCard && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl">
            <button 
              type="button" 
              onClick={() => setSelectedModalCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img src={selectedModalCard.image} alt={selectedModalCard.name} className="w-28 h-16 object-contain" />
              <div>
                <h3 className="text-lg font-bold text-[#673391]">{selectedModalCard.name}</h3>
                <span className="text-xs text-slate-500 font-semibold">Joining Fee: {selectedModalCard.joiningFee}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold text-slate-800">Key Privileges &amp; Features:</div>
              <ul className="space-y-2">
                {selectedModalCard.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <Check size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button 
                type="button" 
                onClick={() => setSelectedModalCard(null)}
                className="flex-1 border border-slate-300 text-slate-700 py-2 rounded-md text-xs font-bold"
              >
                Close
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setApplyingCard(selectedModalCard);
                  setSelectedModalCard(null);
                }}
                className="flex-1 bg-[#673391] text-white py-2 rounded-md text-xs font-bold hover:bg-[#522676]"
              >
                Apply for {selectedModalCard.name}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= INSTANT APPLY MODAL ================= */}
      {applyingCard && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              type="button" 
              onClick={() => setApplyingCard(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-4">
              <Sparkles size={32} className="text-[#673391] mx-auto mb-2" />
              <h3 className="text-lg font-bold text-slate-800">Apply for {applyingCard.name}</h3>
              <p className="text-xs text-slate-500">Instant Approval with Pre-approved SBI Limits</p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number *</label>
                <input 
                  type="tel"
                  required
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-none focus:border-[#673391]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PAN Card Number *</label>
                <input 
                  type="text"
                  required
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm font-mono uppercase outline-none focus:border-[#673391]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Net Monthly Income (₹)</label>
                <input 
                  type="number"
                  placeholder="e.g. 50000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-md text-sm outline-none focus:border-[#673391]"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#673391] text-white py-3 rounded-md text-sm font-bold hover:bg-[#522676] flex items-center justify-center gap-2 mt-2"
              >
                Submit Application <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto py-4 bg-white border-t border-slate-200 text-center text-xs text-slate-600">
        <div className="flex justify-center items-center gap-4">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
