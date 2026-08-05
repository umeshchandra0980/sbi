'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  ChevronDown,
  HelpCircle,
  Gift,
  X
} from 'lucide-react';

export type NavTabId = 'Overview' | 'Accounts' | 'Payments' | 'Deposits' | 'Loans' | 'Cards' | 'Investments' | 'Insurance' | 'Services';

interface SbiGlobalBrandHeaderProps {
  activeNav?: NavTabId;
  activeTopTab?: 'Banking' | 'Lifestyle' | 'Rewards';
}

const YonoRingIcon = ({ className = "w-4 h-4", color }: { className?: string; color?: string }) => (
  <svg 
    viewBox="-45 -45 90 90" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="miter"
      fillOpacity="0"
      strokeMiterlimit="10"
      stroke={color || "currentColor"}
      strokeOpacity="1"
      strokeWidth="13"
      d="M5.692999839782715,36.185001373291016 C-4.301000118255615,37.75699996948242 -13.38700008392334,35.566001892089844 -21.562999725341797,29.613000869750977 C-29.73900032043457,23.660999298095703 -34.61399841308594,15.687000274658203 -36.1870002746582,5.691999912261963 C-37.757999420166016,-4.302000045776367 -35.569000244140625,-13.38700008392334 -29.61400032043457,-21.56399917602539 C-23.65999984741211,-29.73900032043457 -15.685999870300293,-34.61199951171875 -5.692999839782715,-36.183998107910156 C-4.488999843597412,-36.37300109863281 -3.2980000972747803,-36.507999420166016 -2.121000051498413,-36.5890007019043"
    />
  </svg>
);

export default function SbiGlobalBrandHeader({
  activeNav = 'Overview',
  activeTopTab = 'Banking'
}: SbiGlobalBrandHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openNavTab, setOpenNavTab] = useState<NavTabId | null>(null);
  const [liteMode, setLiteMode] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const navRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (searchParams.get('showResumeModal') === 'true') {
      setShowResumeModal(true);
    }
  }, [searchParams]);

  const handleNavItemClick = (item: { label: string; href: string; icon?: string }) => {
    setOpenNavTab(null);
    if (item.label === 'Resume Application' || item.href.includes('showResumeModal=true')) {
      setShowResumeModal(true);
      return;
    }
    if (item.label === 'Gold Loan') {
      toast('Coming Soon', {
        icon: 'ℹ️',
        position: 'bottom-center',
        style: {
          background: '#333333',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 18px',
        },
      });
      return;
    }
    if (item.href.startsWith('http')) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(item.href);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenNavTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTabs: {
    id: NavTabId;
    label: string;
    href: string;
    col1Title: string;
    col1Items: { label: string; href: string; icon: string }[];
    col2Title: string;
    col2Items: { label: string; href: string; icon: string }[];
    col3Title?: string;
    col3Items?: { label: string; href: string; icon: string }[];
  }[] = [
    {
      id: 'Overview',
      label: 'Overview',
      href: '/dashboard',
      col1Title: 'Quick Overview',
      col1Items: [
        { label: 'Dashboard Summary', href: '/dashboard', icon: '📊' },
        { label: 'Relationship Overview', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '🏦' },
        { label: 'Travel & Flights', href: '/home/landingPage/lifestyle', icon: '✈️' },
        { label: 'YONO Rewards & Offers', href: '/home/landingPage/others/rewards-end-point/rewards-endState', icon: '🎁' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'View Profile', href: '/profile', icon: '👤' },
        { label: 'Settings', href: '/settings', icon: '⚙' },
      ]
    },
    {
      id: 'Accounts',
      label: 'Accounts',
      href: '/home/landingPage/manageRelationship/transactionAccounts',
      col1Title: 'Accounts Summary',
      col1Items: [
        { label: 'Savings Bank Account', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '🏦' },
        { label: 'Current Bank Account', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '💼' },
        { label: 'Apply for New Savings Account', href: '/accounts/open-savings-account', icon: '➕' },
        { label: 'Request Account Statement', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '📄' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'View All Accounts', href: '/accounts', icon: '👁' },
        { label: 'Spend Analysis', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '📊' },
      ]
    },
    {
      id: 'Payments',
      label: 'Payments',
      href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection',
      col1Title: 'Fund Transfer',
      col1Items: [
        { label: 'Quick Transfer', href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection', icon: '🔄' },
        { label: 'Send Money', href: '/home/landingPage/fund-transfer/send-money/select-payee', icon: '📲' },
        { label: 'Manage Payee', href: '/home/landingPage/fund-transfer/send-money/select-payee', icon: '👤' },
        { label: 'Schedule Payments', href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection', icon: '📅' },
        { label: 'Send Money Abroad', href: '/home/landingPage/fund-transfer/quick-transfer/bank-selection', icon: '🔀' },
        { label: 'Bill Payments', href: '/dashboard', icon: '🧾' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Transaction History', href: '/home/landingPage/manageRelationship/transactionAccounts', icon: '⇄' },
        { label: 'Manage Limits', href: '/settings', icon: '⏲' },
      ]
    },
    {
      id: 'Deposits',
      label: 'Deposits',
      href: '/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true',
      col1Title: 'Products',
      col1Items: [
        { label: 'Fixed Deposit', href: '/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true', icon: '📈' },
        { label: 'Recurring Deposit', href: '/home/landingPage/accounts/deposits/create-fd/recurring-deposit', icon: '🔁' },
        { label: 'Annuity Deposit', href: '/home/landingPage/accounts/deposits/create-fd/annuity-deposit', icon: '📜' },
        { label: 'Auto Sweep', href: '/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true#autosweep', icon: '🔄' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Manage Deposits', href: '/home/landingPage/manageRelationship/deposits', icon: '💼' },
        { label: 'View Interest Rate', href: '/home/landingPage/accounts/deposits/create-fd?fdtype=FD=true#interest-rates', icon: '🏷' },
        { label: 'Manage PPF Accounts', href: '/home/landingPage/manageRelationship/deposits', icon: '🐷' },
        { label: 'Requests', href: '/home/landingPage/manageRelationship/deposits?showRequestsModal=true', icon: '📄' },
      ]
    },
    {
      id: 'Loans',
      label: 'Loans',
      href: '/home/landingPage/etbPersonalLoan/description',
      col1Title: 'Products',
      col1Items: [
        { label: 'Personal Loan', href: '/home/landingPage/etbPersonalLoan/description', icon: '👤' },
        { label: 'Loan Against Mutual Fund', href: '/home/landingPage/lending/etb-lamfu/description', icon: '💼' },
        { label: 'Home Loan', href: '/home/landingPage/lending/etb-home-loan/home-loan-steps', icon: '🏠' },
        { label: 'Overdraft against Deposit', href: '/home/landingPage/lending/etb-odad/odad-features', icon: '🔒' },
        { label: 'Education Loan', href: '/home/landingPage/lending/etb-education-loan', icon: '🎓' },
        { label: 'Gold Loan', href: '/home/landingPage/etbPersonalLoan/description', icon: '🥇' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'View Existing Loans', href: '/home/landingPage/lending/etb-manage-loan', icon: '🏦' },
        { label: 'Manage Loans', href: '/home/landingPage/manageRelationship/loans/loans', icon: '🏦' },
        { label: 'Check your Credit Score', href: '/home/landingPage/others/credit-score-simulator/verify-your-pan', icon: '⏱' },
        { label: 'Calculate Loan EMI', href: '/home/landingPage/coming-soon', icon: '🧮' },
      ]
    },
    {
      id: 'Cards',
      label: 'Cards',
      href: '/home/landingPage/creditCards/cc-landing',
      col1Title: 'Products',
      col1Items: [
        { label: 'Credit Cards', href: '/home/landingPage/creditCards/cc-landing', icon: '💳' },
        { label: 'Debit Cards', href: '/home/landingPage/accounts/debit-cards/debit-card-landing', icon: '💳' },
        { label: 'Forex Cards', href: '/home/landingPage/jointVentures/superapps/forex/forex-landing', icon: '💳' },
        { label: 'Prepaid Cards', href: 'https://prepaid.sbi.bank.in/', icon: '💳' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Manage Credit Card', href: '/home/landingPage/creditCards/cc-landing', icon: '💳' },
        { label: 'Manage Debit Card', href: '/home/landingPage/accounts/debit-cards/debit-card-landing', icon: '💳' },
        { label: 'Manage Forex Card', href: '/home/landingPage/jointVentures/superapps/forex/forex-landing', icon: '💳' },
      ]
    },
    {
      id: 'Investments',
      label: 'Investments',
      href: '/home/landingPage/manageRelationship/investments/mutual-fund',
      col1Title: 'Investment Options',
      col1Items: [
        { label: 'Mutual Funds', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '📊' },
        { label: 'Demat & Securities', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '📈' },
        { label: 'Public Provident Fund (PPF)', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '🐷' },
        { label: 'National Pension System (NPS)', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '🛡' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Apply for IPO', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '🚀' },
        { label: 'Folio Summary', href: '/home/landingPage/manageRelationship/investments/mutual-fund', icon: '📑' },
      ]
    },
    {
      id: 'Insurance',
      label: 'Insurance',
      href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=Life%20Insurance&insuranceCategory=1&isNativeValue=false',
      col1Title: 'Life Insurance',
      col1Items: [
        { label: 'Protection Plans', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=Life%20Insurance&insuranceCategory=1&isNativeValue=false', icon: '☂️' },
        { label: 'Child Plans', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=Life%20Insurance&insuranceCategory=2&isNativeValue=false', icon: '👶' },
        { label: 'Retirement Plans', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=Life%20Insurance&insuranceCategory=3&isNativeValue=false', icon: '🧑‍🦯' },
        { label: 'Wealth Creation', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=Life%20Insurance&insuranceCategory=4&isNativeValue=false', icon: '🌱' },
        { label: 'Savings Plans', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=Life%20Insurance&insuranceCategory=5&isNativeValue=false', icon: '👛' },
        { label: 'Group Plans', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=Life%20Insurance&insuranceCategory=6&isNativeValue=false', icon: '👥' },
      ],
      col2Title: 'General Insurance',
      col2Items: [
        { label: 'Health Plans', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=General%20Insurance&insuranceCategory=4&isNativeValue=false', icon: '🏥' },
        { label: 'Motor Insurance', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=General%20Insurance&insuranceCategory=2&isNativeValue=false', icon: '🚗' },
        { label: 'Travel Insurance', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=General%20Insurance&insuranceCategory=3&isNativeValue=false', icon: '🧳' },
        { label: 'Accident Insurance', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=General%20Insurance&insuranceCategory=1&isNativeValue=false', icon: '🩹' },
        { label: 'Group Plans', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?insuranceType=General%20Insurance&insuranceCategory=5&isNativeValue=false', icon: '👥' },
      ],
      col3Title: 'Quick Links',
      col3Items: [
        { label: 'Manage Policies', href: '/home/landingPage/manageRelationship/insurance', icon: '📑' },
        { label: 'Resume Application', href: '/home/landingPage/jointVentures/insurances/general-insurance/dashboard?showResumeModal=true', icon: '▶️' },
        { label: 'Tools & Calculators', href: '/home/landingPage/coming-soon?insuranceType=Quick%20Links&insuranceCategory=&isNativeValue=false&subCategoryUIN=&planType=', icon: '🧮' },
      ]
    },
    {
      id: 'Services',
      label: 'Services',
      href: '/home/landingPage/services/tax-related',
      col1Title: 'Quick Services',
      col1Items: [
        { label: 'Account Related', href: '/home/landingPage/services/tax-related', icon: '🏦' },
        { label: 'Pension Related', href: '/home/landingPage/services/tax-related', icon: '🧑‍🦯' },
        { label: 'Tax Related', href: '/home/landingPage/services/tax-related', icon: '📄' },
        { label: 'Cheque Services', href: '/home/landingPage/services/tax-related', icon: '📑' },
        { label: 'Doorstep Banking', href: '/home/landingPage/services/tax-related', icon: '🚪' },
        { label: 'Positive Pay System', href: '/home/landingPage/services/tax-related', icon: '✍️' },
        { label: 'Apply/Manage FASTag', href: '/home/landingPage/services/tax-related', icon: '🚗' },
      ],
      col2Title: 'Quick Links',
      col2Items: [
        { label: 'Manage Nominee', href: '/profile', icon: '🚪' },
        { label: 'Manage My Profile', href: '/profile', icon: '👤' },
        { label: 'e-Secure Lock', href: '/settings', icon: '🔒' },
        { label: 'Stop Cheque', href: '/settings', icon: '🛑' },
        { label: 'Update My Security', href: '/settings', icon: '🛡' },
        { label: 'Report- Unauthorized Transactions', href: '/settings', icon: '⚠️' },
        { label: 'Security Question', href: '/settings', icon: '📱' },
      ]
    }
  ];

  const renderNavIcon = (label: string) => {
    let iconPath = '';

    switch (label) {
      // Investments
      case 'Mutual Funds':
        iconPath = '/images/category-icons/ic_mutual_funds.svg';
        break;
      case 'Demat & Securities':
        iconPath = '/images/category-icons/ic_demat_account.svg';
        break;
      case 'National Pension System (NPS)':
        iconPath = '/images/category-icons/ic_nps.svg';
        break;
      case 'Public Provident Fund (PPF)':
        iconPath = '/images/category-icons/ic_ppf.svg';
        break;

      // Loans
      case 'Personal Loan':
        iconPath = '/images/category-icons/ic_personal_loan.svg';
        break;
      case 'Loan Against Mutual Fund':
        iconPath = '/images/category-icons/ic_loan_against_mutual_fund.svg';
        break;
      case 'Home Loan':
        iconPath = '/images/category-icons/ic_home_loan.svg';
        break;
      case 'Gold Loan':
        iconPath = '/images/category-icons/ic_gold_loan.svg';
        break;

      // Deposits
      case 'Fixed Deposit':
      case 'Manage Deposits':
        iconPath = '/images/category-icons/ic_fixed_deposit.svg';
        break;
      case 'Recurring Deposit':
      case 'View Interest Rate':
        iconPath = '/images/category-icons/ic_recurring_deposit.svg';
        break;
      case 'Annuity Deposit':
        iconPath = '/images/category-icons/ic_annuity_deposit.svg';
        break;
      case 'Auto Sweep':
        iconPath = '/images/category-icons/ic_auto_sweep.svg';
        break;
      case 'Manage PPF Accounts':
        iconPath = '/images/category-icons/ic_ppf.svg';
        break;
      case 'Requests':
        iconPath = '/images/category-icons/ic_cheque_services.svg';
        break;

      // Insurance
      case 'Protection Plans':
        iconPath = '/images/category-icons/ic_life_insurance.svg';
        break;
      case 'Child Plans':
        iconPath = '/images/category-icons/ic_ppf.svg';
        break;
      case 'Retirement Plans':
        iconPath = '/images/category-icons/ic_annuity_deposit.svg';
        break;
      case 'Wealth Creation':
        iconPath = '/images/category-icons/ic_mutual_funds.svg';
        break;
      case 'Savings Plans':
        iconPath = '/images/category-icons/ic_fixed_deposit.svg';
        break;
      case 'Group Plans':
        iconPath = '/images/category-icons/ic_personal_loan.svg';
        break;
      case 'Health Plans':
        iconPath = '/images/category-icons/ic_health_insurance.svg';
        break;
      case 'Motor Insurance':
        iconPath = '/images/category-icons/ic_car_insurance.svg';
        break;
      case 'Travel Insurance':
        iconPath = '/images/category-icons/ic_forex_card.svg';
        break;
      case 'Accident Insurance':
        iconPath = '/images/category-icons/ic_accident_insurance.svg';
        break;
      case 'Manage Policies':
        iconPath = '/images/category-icons/ic_cheque_services.svg';
        break;
      case 'Resume Application':
        iconPath = '/images/category-icons/ic_credit_card.svg';
        break;
      case 'Tools & Calculators':
        iconPath = '/images/category-icons/ic_recurring_deposit.svg';
        break;

      // Cards
      case 'Credit Cards':
      case 'Manage Credit Card':
        iconPath = '/images/category-icons/ic_credit_card.svg';
        break;
      case 'Debit Cards':
      case 'Manage Debit Card':
        iconPath = '/images/category-icons/ic_debit_card.svg';
        break;
      case 'Forex Cards':
      case 'Manage Forex Card':
        iconPath = '/images/category-icons/ic_forex_card.svg';
        break;
      case 'Prepaid Cards':
        iconPath = '/images/category-icons/ic_ncmc_card.svg';
        break;

      // Services
      case 'Account Related':
      case 'Manage My Profile':
      case 'Update Profile Details':
      case 'Doorstep Banking':
      case 'Manage Nominee':
        iconPath = '/images/category-icons/ic_profile_details.svg';
        break;
      case 'Pension Related':
        iconPath = '/images/category-icons/ic_annuity_deposit.svg';
        break;
      case 'Tax Related':
      case 'ATM / Branch Locator':
        iconPath = '/images/category-icons/ic_tax_related.svg';
        break;
      case 'Cheque Services':
      case 'Stop Cheque':
      case 'Positive Pay System':
      case 'Cheque Book Request':
        iconPath = '/images/category-icons/ic_cheque_services.svg';
        break;
      case 'Apply/Manage FASTag':
        iconPath = '/images/category-icons/ic_car_insurance.svg';
        break;
      case 'e-Secure Lock':
      case 'Lock / Unlock User Access':
        iconPath = '/images/category-icons/ic_esecure_lock.svg';
        break;
      case 'Update My Security':
      case 'Report- Unauthorized Transactions':
      case 'Security Question':
        iconPath = '/images/category-icons/ic_nps.svg';
        break;

      default:
        break;
    }

    if (iconPath) {
      return <img src={iconPath} alt={label} className="w-5 h-5 object-contain" />;
    }

    return (
      <svg className="w-4 h-4 text-[#5b2e80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3L2 10h20L12 3z" />
      </svg>
    );
  };

  return (
    <div className="w-full bg-white font-sans z-50">
      
      {/* 1. TOP PURPLE UTILITY HEADER BAR */}
      <div className="bg-[#302985] text-white text-xs py-1.5 px-6 shadow-xs">
        <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-2">
          
          {/* Left Top Tabs */}
<<<<<<< HEAD
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              onClick={() => router.push('/dashboard')}
              className={`px-3.5 py-1 text-xs font-bold rounded-t-md transition-colors ${
                activeTopTab === 'Banking' ? 'bg-white text-[#302985]' : 'text-white/80 hover:text-white'
=======
          <div className="flex items-end gap-3 md:gap-5">
            <button 
              type="button" 
              onClick={() => router.push('/dashboard')}
              className={`px-4 py-2 text-[13px] font-bold rounded-t-xl transition-colors flex items-center gap-2 relative z-10 ${
                activeTopTab === 'Banking' ? 'bg-white text-[#502b85]' : 'text-white/90 hover:text-white mb-0.5'
>>>>>>> 51437bd (feat: add YONO ring icons to navbar tabs and YONO Net Banking Lite toggle switch)
              }`}
            >
              <YonoRingIcon 
                className="w-4 h-4 flex-shrink-0" 
                color={activeTopTab === 'Banking' ? '#502b85' : 'rgb(251,251,251)'} 
              />
              <span>Banking</span>
            </button>
            
            <button 
              type="button" 
              onClick={() => router.push('/home/landingPage/lifestyle')}
<<<<<<< HEAD
              className={`px-3.5 py-1 text-xs font-bold rounded-t-md transition-colors ${
                activeTopTab === 'Lifestyle' ? 'bg-white text-[#302985]' : 'text-white/80 hover:text-white'
              }`}
            >
              Lifestyle
=======
              className={`px-4 py-2 text-[13px] font-bold rounded-t-xl transition-colors flex items-center gap-2 relative z-10 ${
                activeTopTab === 'Lifestyle' ? 'bg-white text-[#502b85]' : 'text-white/90 hover:text-white mb-0.5'
              }`}
            >
              <YonoRingIcon 
                className="w-4 h-4 flex-shrink-0" 
                color={activeTopTab === 'Lifestyle' ? '#502b85' : 'rgb(251,251,251)'} 
              />
              <span>Lifestyle</span>
            </button>

            <button 
              type="button" 
              onClick={() => router.push('/home/landingPage/others/rewards-end-point/rewards-endState')}
              className={`px-4 py-2 text-[13px] font-bold rounded-t-xl transition-colors flex items-center gap-2 relative z-10 ${
                activeTopTab === 'Rewards' ? 'bg-white text-[#502b85]' : 'text-white/90 hover:text-white mb-0.5'
              }`}
            >
              <YonoRingIcon 
                className="w-4 h-4 flex-shrink-0" 
                color={activeTopTab === 'Rewards' ? '#502b85' : 'rgb(251,251,251)'} 
              />
              <span>Rewards</span>
            </button>
            
            <div className="flex items-center gap-2.5 ml-4 mb-2 font-semibold text-xs text-white">
              <span className="text-[13px] font-medium tracking-wide">YONO Net Banking Lite</span>
              <button 
                type="button"
                onClick={() => {
                  const nextState = !liteMode;
                  setLiteMode(nextState);
                  toast.success(nextState ? 'YONO Net Banking Lite turned ON' : 'YONO Net Banking Lite turned OFF');
                }}
                className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold tracking-wider transition-all duration-200 cursor-pointer shadow-xs ${
                  liteMode 
                    ? 'bg-[#22c55e] text-white hover:bg-[#16a34a]' 
                    : 'bg-[#909ea8] text-white hover:bg-[#7e8c97]'
                }`}
                title="Toggle YONO Net Banking Lite"
              >
                {liteMode ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Right Support & Tools */}
          <div className="flex items-center gap-4 text-xs text-white/90">
            <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <HelpCircle size={13} />
              <span>Get Help</span>
              <span className="font-bold">1800-11-1101</span>
            </a>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>English</span>
              <ChevronDown size={12} />
            </div>
            <span className="font-bold cursor-pointer">– A +</span>
            <button 
              type="button" 
              onClick={() => {
                toast.success('Logged out successfully');
                router.push('/auth/login');
              }}
              className="border border-white/60 hover:bg-white/10 px-2.5 py-0.5 rounded text-xs transition-colors"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* 2. MAIN WHITE BRAND NAVBAR WITH INTERACTIVE MEGA DROPDOWN CLICK MENU */}
      <header className="bg-white border-b border-slate-200/80 px-4 md:px-6 py-3.5 shadow-xs relative">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left Group: Logo + Nav Items */}
          <div className="flex items-center gap-16 md:gap-24">
            <Link href="/dashboard" className="flex items-center gap-2 flex-shrink-0">
              <img 
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/images/yono_logo.svg'; }}
                alt="YONO SBI NET-BANKING" 
                className="h-9.5 w-auto object-contain"
              />
            </Link>

            {/* Nav Items Row */}
            <nav ref={navRef} className="relative flex items-center gap-0.5">
              {navTabs.map((tab) => {
                const isOpen = openNavTab === tab.id;
                const isActive = openNavTab === null ? activeNav === tab.id : openNavTab === tab.id;

                return (
                  <div 
                    key={tab.id}
                    className="relative"
                  >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenNavTab(isOpen ? null : tab.id);
                    }}
                    className={`relative block px-3.5 py-2 font-sans font-semibold text-[14px] transition-all rounded-t-xl cursor-pointer ${
                      isActive 
                        ? 'bg-[#f4edf9] text-[#673391]' 
                        : 'text-slate-600 hover:text-[#673391] hover:bg-slate-50'
                    }`}
                    style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#673391] rounded-full" />
                    )}
                  </button>

                  {/* Mega Dropdown Click Card */}
                  {isOpen && (
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute top-full mt-1 bg-[#f8f6fb] rounded-2xl p-4 md:p-5 shadow-2xl border border-purple-200/80 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                        tab.col3Items 
                          ? 'w-[660px] -left-36 max-w-[95vw]' 
                          : tab.id === 'Services'
                          ? 'w-[560px] -left-48 max-w-[90vw]'
                          : 'w-[480px] left-0 max-w-[90vw]'
                      }`}
                    >
                      <div className={`grid gap-6 ${tab.col3Items ? 'grid-cols-3' : 'grid-cols-2'}`}>
                        
                        {/* Column 1 */}
                        <div>
                          <h4 className="text-xs font-extrabold text-[#673391] uppercase tracking-wider mb-3 pb-1 border-b border-purple-200/60">
                            {tab.col1Title}
                          </h4>
                          <div className="space-y-1">
                            {tab.col1Items.map((item) => (
                              <button
                                key={item.label}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleNavItemClick(item);
                                }}
                                className="w-full text-left flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-white transition-all group border-b border-purple-100/40 cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-lg bg-white border border-purple-200/70 text-[#673391] flex items-center justify-center text-sm shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                                  {renderNavIcon(item.label)}
                                </div>
                                <span 
                                  className="text-[13.5px] font-sans font-semibold text-slate-800 group-hover:text-[#673391] leading-tight tracking-normal"
                                  style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
                                >
                                  {item.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div>
                          <h4 className="text-xs font-extrabold text-[#673391] uppercase tracking-wider mb-3 pb-1 border-b border-purple-200/60">
                            {tab.col2Title}
                          </h4>
                          <div className="space-y-1">
                            {tab.col2Items.map((item) => (
                              <button
                                key={item.label}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleNavItemClick(item);
                                }}
                                className="w-full text-left flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-white transition-all group border-b border-purple-100/40 cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-lg bg-white border border-purple-200/70 text-[#673391] flex items-center justify-center text-sm shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                                  {renderNavIcon(item.label)}
                                </div>
                                <span 
                                  className="text-[13.5px] font-sans font-semibold text-slate-800 group-hover:text-[#673391] leading-tight tracking-normal"
                                  style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
                                >
                                  {item.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Column 3 (If defined) */}
                        {tab.col3Items && (
                          <div>
                            <h4 className="text-xs font-extrabold text-[#673391] uppercase tracking-wider mb-3 pb-1 border-b border-purple-200/60">
                              {tab.col3Title}
                            </h4>
                            <div className="space-y-1">
                              {tab.col3Items.map((item) => (
                                <button
                                  key={item.label}
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleNavItemClick(item);
                                  }}
                                  className="w-full text-left flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-white transition-all group border-b border-purple-100/40 cursor-pointer"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white border border-purple-200/70 text-[#673391] flex items-center justify-center text-sm shadow-2xs group-hover:scale-105 transition-transform flex-shrink-0">
                                    {renderNavIcon(item.label)}
                                  </div>
                                  <span 
                                    className="text-[13.5px] font-sans font-semibold text-slate-800 group-hover:text-[#673391] leading-tight tracking-normal"
                                    style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 600 }}
                                  >
                                    {item.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </nav>
        </div>

          {/* Profile Circle Pill */}
          <div 
            onClick={() => router.push('/profile')}
            className="flex items-center gap-2 bg-[#673391] text-white py-1 px-3 rounded-full text-xs font-bold shadow-xs cursor-pointer hover:bg-[#561578] transition-colors flex-shrink-0"
          >
            <div className="w-6 h-6 rounded-full bg-amber-200 text-[#673391] flex items-center justify-center text-[10px] font-black">
              DV
            </div>
            <span>My Profile</span>
          </div>

        </div>
      </header>

      {/* No Resume Application Modal (Exact Match to User Reference Screenshot) */}
      {showResumeModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-150"
          onClick={() => setShowResumeModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button Top Right */}
            <button 
              type="button" 
              onClick={() => setShowResumeModal(false)}
              className="absolute right-6 top-6 text-[#673391] hover:opacity-75 transition-opacity cursor-pointer"
            >
              <X size={22} />
            </button>

            {/* Modal Title */}
            <h3 className="text-2xl font-bold text-[#673391] mb-14 tracking-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
              No Resume Application
            </h3>

            {/* Modal Body */}
            <p className="text-base font-normal text-slate-700 mb-16">
              You don't have any pending application
            </p>

            {/* Modal Footer OK Button */}
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowResumeModal(false)}
                className="bg-white border border-[#673391] hover:bg-[#673391] hover:text-white text-[#673391] font-semibold text-sm py-2 px-14 rounded-full transition-all shadow-2xs cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
