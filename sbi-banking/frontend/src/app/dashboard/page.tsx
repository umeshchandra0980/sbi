'use client'

import React, { useState, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Eye, EyeOff, Search, Bell, HelpCircle, ChevronRight, ChevronLeft,
  Phone, Smartphone, Zap, Car
} from 'lucide-react';
import { MOCK_USER, MOCK_ACCOUNTS } from '@/lib/mockData';
import { RelationshipOverviewCards } from '@/components/banking/RelationshipOverviewCards';
import { QuickFeatureBanners } from '@/components/banking/QuickFeatureBanners';
import './dashboard.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';

export default function DashboardPage() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [paymentsSubTab, setPaymentsSubTab] = useState<'transfer' | 'bills'>('transfer');
  const [hoveredNavTab, setHoveredNavTab] = useState<string | null>(null);
  
  // Banner Carousel State
  const [bannerSlide, setBannerSlide] = useState(0);

  const bannerImages = [
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/credit_card_web_873x203",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/873_by_203",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/pabl_banner",
    "/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/feedback_banner_2_2_873x203"
  ];

  const currentUser = user || MOCK_USER;
  const fullName = currentUser.full_name || 'DUMPALA VISHNU VARDHAN';
  const nameParts = fullName.split(' ');
  const initials = nameParts.map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'DU';

  const primaryAccount = MOCK_ACCOUNTS[0];

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* ================= GLOBAL BRAND HEADER ================= */}
      <SbiGlobalBrandHeader activeNav="Overview" />

      {/* ================= MAIN DASHBOARD OVERVIEW BODY (SBI 8-Col / 4-Col Grid) ================= */}
      <main className="dash-body-container">
        <div className="dash-container-xxl">
          <div className="dash-row">
            
            {/* LEFT MAIN COLUMN (8 Columns = 66.66%) */}
            <div className="dash-col-8">
              
              {/* Salutation Greeting & Quick Links Carousel */}
              <div className="salutation-box">
                <div className="salutation-txt-box">
                  Hello <span className="font-extrabold">{fullName.split(' ')[0]}</span>, Let&apos;s get started!
                </div>

                <div className="scroll-container">
                  {[
                    { label: 'Welcome to Yono', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64' },
                    { label: 'Fraud Awareness', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/fraudawareness2_thumbnail_64x6' },
                    { label: 'Tax Related Services', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64' },
                    { label: 'e - Secure Lock', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/yp_secure_lock_banner_sbi_thumbnail_64x64_23_11zon' },
                    { label: 'Sustainability', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sustainibility_thumbnail_64x64' },
                    { label: 'SIP', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64' },
                    { label: 'Credit Card', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/welcome_64x64' },
                    { label: 'Invest Now', img: '/cdn.onlineyono.sbi.bank.in/documents/d/sbi_yono_2.0/sip_thumbnail_product_creative_64x64' },
                  ].map((story, sIdx) => (
                    <div key={sIdx} className="circle-container" onClick={() => toast.success(`Opening ${story.label}`)}>
                      <div className="circle">
                        <img src={story.img} alt={story.label} />
                      </div>
                      <p className="storyname">{story.label}</p>
                    </div>
                  ))}

                  <button type="button" className="story-next-btn" aria-label="Next Stories">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Relationship Overview Section */}
              <div className="mb-4">
                <RelationshipOverviewCards
                  combinedBalance={primaryAccount.balance}
                  onViewAllClick={() => router.push('/accounts')}
                />
              </div>

              {/* Payments & Transfers (Left 6 Columns) + Upcoming Payments (Right 6 Columns) - ABOVE Credit Score */}
              <div className="dash-inner-row mb-6">
                
                {/* Payments & Transfers (Left 6 Columns) */}
                <div className="dash-col-6">
                  <div className="main-container-pt">
                    <div>
                      <h1 className="title-pt">Payments &amp; Transfers</h1>
                      
                      <div className="tabs-conatiner-pt">
                        <button 
                          type="button" 
                          onClick={() => setPaymentsSubTab('transfer')}
                          className={`pt-tab ${paymentsSubTab === 'transfer' ? 'active' : ''}`}
                        >
                          Fund Transfer
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setPaymentsSubTab('bills')}
                          className={`pt-tab ${paymentsSubTab === 'bills' ? 'active' : ''}`}
                        >
                          <img src="/assets/images/bill_payments/BBPS Logo.svg" alt="BBPS Logo" className="bbps-tag-img" />
                          Bill payments
                        </button>
                      </div>

                      {paymentsSubTab === 'transfer' ? (
                        <div className="optionsFT">
                          <div className="iconWithTitle-pt" onClick={() => router.push('/home/landingPage/fund-transfer/quick-transfer/bank-selection')}>
                            <div className="pt-icon-circle">
                              <img src="/assets/images/landing_page/quicktransfer.svg" alt="Quick Transfer" className="w-5 h-5" />
                            </div>
                            <span className="pt-title">Quick Transfer</span>
                            <span className="pt-subTitle">Upto ₹50,000</span>
                          </div>

                          <div className="iconWithTitle-pt" onClick={() => toast.success("Send Money To own/other account")}>
                            <div className="pt-icon-circle">
                              <img src="/assets/images/landing_page/sendmoney.svg" alt="Send Money" className="w-5 h-5" />
                            </div>
                            <span className="pt-title">Send Money</span>
                            <span className="pt-subTitle">To own/other account</span>
                          </div>

                          <div className="iconWithTitle-pt" onClick={() => toast.success("Send Money Abroad")}>
                            <div className="pt-icon-circle">
                              <img src="/assets/images/landing_page/sendmoneyabroad.svg" alt="Send Money Abroad" className="w-5 h-5" />
                            </div>
                            <span className="pt-title">Send Money Abroad</span>
                          </div>

                          <div className="iconWithTitle-pt" onClick={() => toast.success("Schedule Payments")}>
                            <div className="pt-icon-circle">
                              <img src="/assets/images/landing_page/schedulepayments.svg" alt="Schedule Payments" className="w-5 h-5" />
                            </div>
                            <span className="pt-title">Schedule Payments</span>
                          </div>
                        </div>
                      ) : (
                        <div className="py-2">
                          <div className="optionsFT flex items-center justify-start gap-8 py-2 px-2">
                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => toast.success('Opening Mobile Prepaid Recharge')}>
                              <div className="w-11 h-11 rounded-full border border-purple-200 bg-white flex items-center justify-center text-purple-800 shadow-xs group-hover:scale-105 transition-transform">
                                <Phone size={20} className="text-[#673391]" />
                              </div>
                              <span className="pt-title text-[11px] font-semibold text-slate-800 mt-2 text-center leading-tight">Mobile<br />Prepaid</span>
                            </div>

                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => toast.success('Opening Mobile Postpaid Bill Payment')}>
                              <div className="w-11 h-11 rounded-full border border-purple-200 bg-white flex items-center justify-center text-purple-800 shadow-xs group-hover:scale-105 transition-transform">
                                <Smartphone size={20} className="text-[#673391]" />
                              </div>
                              <span className="pt-title text-[11px] font-semibold text-slate-800 mt-2 text-center leading-tight">Mobile<br />Postpaid</span>
                            </div>

                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => toast.success('Opening Electricity Bill Payment')}>
                              <div className="w-11 h-11 rounded-full border border-purple-200 bg-white flex items-center justify-center text-purple-800 shadow-xs group-hover:scale-105 transition-transform">
                                <Zap size={20} className="text-[#673391]" />
                              </div>
                              <span className="pt-title text-[11px] font-semibold text-slate-800 mt-2 text-center leading-tight">Electricity</span>
                            </div>

                            <div className="iconWithTitle-pt cursor-pointer group flex flex-col items-center" onClick={() => toast.success('Opening FASTag Recharge')}>
                              <div className="w-11 h-11 rounded-full border border-purple-200 bg-white flex items-center justify-center text-purple-800 shadow-xs group-hover:scale-105 transition-transform">
                                <Car size={20} className="text-[#673391]" />
                              </div>
                              <span className="pt-title text-[11px] font-semibold text-slate-800 mt-2 text-center leading-tight">FASTag</span>
                            </div>
                          </div>

                          <div className="flex justify-end pt-1 pe-4">
                            <button 
                              type="button" 
                              onClick={() => toast.success('Opening all Bill Payment Biller Categories...')} 
                              className="text-xs font-bold text-[#673391] hover:underline"
                            >
                              View All
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="first-transfer-box">
                      <div className="max-w-[220px]">
                        <p className="text-xs text-slate-700 font-medium leading-relaxed m-0">
                          You&apos;re yet to make your first <span className="font-bold text-slate-900">transfer</span>. Start now with our quick and easy options!
                        </p>
                        <button type="button" onClick={() => router.push('/home/landingPage/fund-transfer/quick-transfer/bank-selection')} className="try-now-button">
                          Try now <ChevronRight size={14} />
                        </button>
                      </div>
                      <div className="relative w-24 h-20 flex items-center justify-center">
                        <img 
                          src="/assets/images/landing_page/sendmoney.svg" 
                          alt="Transfer Money Illustration" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Payments (Right 6 Columns) */}
                <div className="dash-col-6">
                  <div className="upcoming-payment-container">
                    <h1 className="title-pt w-full text-left">Upcoming Payments</h1>
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-2">
                      <div className="w-28 h-28 mb-2 flex items-center justify-center">
                        <img src="/assets/images/landing_page/IC_Bill_Payment_Schedule.svg" alt="Calendar Schedule" className="w-full h-full object-contain" />
                      </div>
                      <div className="font-extrabold text-slate-900 text-sm">Never Miss Your Payments Now</div>
                      <p className="text-xs text-slate-600 mt-1 mb-4">Track and get reminder for your upcoming Payments</p>
                      <button 
                        type="button" 
                        onClick={() => toast.success("Opening Pay Bills")} 
                        className="pay-bills-btn"
                      >
                        Pay Bills
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Quick Feature Banners (Check Credit Score & PFM) + Offer Carousel - BELOW Payments & Transfers */}
              <div className="mb-6 space-y-4">
                <QuickFeatureBanners 
                  onCreditScoreClick={() => toast.success('Checking your Credit Score... CIBIL Score: 785')}
                />

                {/* Promo Banner Carousel (873x203 DOM Exact) */}
                <div className="banner-page-carousel">
                  <img 
                    src={bannerImages[bannerSlide]} 
                    alt="SBI Promo Banner" 
                    className="banner-img-main" 
                  />

                  <div className="carousel-indicators-dots">
                    {bannerImages.map((_, bIdx) => (
                      <span 
                        key={bIdx} 
                        onClick={() => setBannerSlide(bIdx)}
                        className={`dot-indicator ${bannerSlide === bIdx ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR COLUMN (4 Columns = 33.33%) */}
            <div className="dash-col-4">
              
              {/* Investments Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Investments</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Mutual Funds")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newmutualfunds.svg" alt="Mutual Funds" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Mutual Funds</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Demat & Securities")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_demat_20acc.svg" alt="Demat Account" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Demat &amp; Securities</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("NPS")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newnps.svg" alt="NPS" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">NPS</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("PPF")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newppf.svg" alt="PPF" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">PPF</span>
                  </div>
                </div>
              </div>

              {/* Loans Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Loans</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Personal Loan")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newpersonalloan.svg" alt="Personal Loan" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Personal Loan</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Loan Against Mutual Fund")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newpersonalloan.svg" alt="Loan Against Mutual Fund" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Loan Against Mutual Fund</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Home Loan")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newhomeloan.svg" alt="Home Loan" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Home Loan</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Gold Loan")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newgoldloan.svg" alt="Gold Loan" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Gold Loan</span>
                  </div>
                </div>
              </div>

              {/* Deposits Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Deposits</h1>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Fixed Deposit")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_fixeddeposit.svg" alt="Fixed Deposit" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Fixed Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Recurring Deposit")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic__20newrecurringdeposit.svg" alt="Recurring Deposit" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Recurring Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Annuity Deposit")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_annuity_20deposit.svg" alt="Annuity Deposit" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Annuity Deposit</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Auto Sweep")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_autosweep.svg" alt="Auto Sweep" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Auto Sweep</span>
                  </div>
                </div>
              </div>

              {/* Insurance Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Insurance</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Life Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newlifeinsurance.svg" alt="Life Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Life</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Health Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newhealthinsurance.svg" alt="Health Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Health</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Accident Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newaccidentinsurance.svg" alt="Accident Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Accident</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Motor Insurance")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newcarinsurance.svg" alt="Motor Insurance" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Motor</span>
                  </div>
                </div>
              </div>

              {/* Cards Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Cards</h1>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => router.push('/cards')}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newcreditcard.svg" alt="Credit Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Credit Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Debit Cards")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newdebitcard.svg" alt="Debit Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Debit Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Forex Cards")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_newforexcard.svg" alt="Forex Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Forex Cards</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Prepaid Cards")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ncmc_card.svg" alt="Prepaid Cards" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Prepaid Cards</span>
                  </div>
                </div>
              </div>

              {/* Services Panel */}
              <div className="rightside-content-box">
                <div className="rightside-header-row">
                  <h1 className="rightside-title">Services</h1>
                  <span className="viewAll-side">View All</span>
                </div>
                <div className="rightside-grid">
                  <div className="rightside-item" onClick={() => toast.success("Account Related Services")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_app_20experience.svg" alt="Account Related" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Account Related</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Tax Related Services")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/ic_taxrelated.svg" alt="Tax Related" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Tax Related</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("Cheque Services")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cheque_services_icon_n.svg" alt="Cheque Services" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">Cheque Services</span>
                  </div>
                  <div className="rightside-item" onClick={() => toast.success("e-Secure Lock")}>
                    <div className="rightside-icon-box">
                      <img src="/assets/images/landing_page/cate_20ic_esecure_20lock.svg" alt="e-Secure Lock" className="w-5 h-5" />
                    </div>
                    <span className="rightside-item-name">e-Secure Lock</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="dash-footer">
        <div className="dash-footer-links">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="dash-footer-link">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
