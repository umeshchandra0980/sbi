'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import '@/app/sbi-home.css'

export default function Home() {
  const router = useRouter()

  // State management
  const [isMarqueePaused, setIsMarqueePaused] = useState(false)
  const [isUsefulLinksOpen, setIsUsefulLinksOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(6) // Slide 6 is SBISSL Banner (active default in HTML)
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // Carousel slide images & metadata
  const carouselSlides = [
    { src: '/images/banners/banner-16.jpg', title: 'AWARENESS OF THE PUBLIC', href: 'https://sbi.bank.in/' },
    { src: '/images/banners/banner-18.jpg', title: 'Branch Feedback Journey', href: 'https://crh.sbi.bank.in/branchfeedback' },
    { src: '/images/banners/banner-13.png', title: 'Register Complaint of Unauthorized Transaction', href: 'https://crh.sbi.bank.in/' },
    { src: '/images/banners/banner-09.jpg', title: 'Publicizing the Centralized Number Series 1600', href: 'https://sbi.bank.in/' },
    { src: '/images/banners/banner-07.png', title: 'SBI Mutual Fund', href: 'https://www.sbimf.com/' },
    { src: '/images/banners/banner-15.jpg', title: 'PM-Vidyalaxmi Scheme', href: 'https://sbi.bank.in/web/personal-banking/sbi-pm-vidyalaxmi' },
    { src: '/images/banners/banner-10.jpg', title: 'SBISSL Banner', href: 'https://diy.sbisecurities.in/' },
    { src: '/images/banners/banner-12.jpg', title: 'Loan Against Mutual Fund', href: '/home/landingPage/lending/etb-lamfu/description' },
    { src: '/images/banners/banner-03.png', title: 'SBI Card', href: 'http://www.sbicard.com/' },
    { src: '/images/banners/banner-08.png', title: 'Digital eRupee', href: 'https://sbi.bank.in/' },
    { src: '/images/banners/banner-11.jpg', title: 'Door Step Banking', href: 'https://www.psballiance.com/' },
    { src: '/images/banners/banner-14.jpg', title: 'SBI PMJJBY-PMSBY Schemes', href: 'https://sbi.bank.in/' },
    { src: '/images/banners/banner-06.jpg', title: 'DICGC', href: 'https://www.dicgc.org.in' },
    { src: '/images/banners/banner-04.png', title: 'Reserve Bank - Integrated Ombudsman Scheme', href: 'https://retail.sbi.bank.in/' },
    { src: '/images/banners/banner-05.jpg', title: 'RBI-Integrated Ombudsman Scheme', href: 'https://retail.sbi.bank.in/' },
    { src: '/images/banners/banner-20.jpg', title: 'Meet All Your Banking & Financial Needs', href: 'https://onlineapply.sbi.bank.in/' },
    { src: '/images/banners/banner-19.jpg', title: 'Beware of Cyber Frauds', href: 'https://cybercrime.gov.in/' },
    { src: '/images/banners/banner-01.png', title: 'Beware of Cyber Frauds', href: 'https://cybercrime.gov.in/' }
  ]

  // Carousel autoplay hook
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isCarouselPlaying) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % carouselSlides.length)
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [isCarouselPlaying])

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(menu)
    }
  }

  return (
    <div className="pre-login-wrapper select-none relative min-h-screen">
      
      {/* 0. PREMIUM DEV PORTAL ACCESS BANNER */}
      <div className="bg-gradient-to-r from-violet-800 to-indigo-900 text-white px-4 py-2 flex items-center justify-between gap-4 text-xs font-semibold z-50 sticky top-0 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="bg-violet-700 text-yellow-400 font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
            ★ DEMO PORTAL
          </span>
          <span className="text-violet-100 hidden sm:inline">
            Direct access to the banking dashboards bypassing all multi-step forms and verification checks.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/auth/login')}
            className="bg-yellow-500 hover:bg-yellow-400 text-violet-950 font-extrabold px-3 py-1 rounded transition-all flex items-center gap-1 shadow-sm cursor-pointer border-none"
          >
            Quick Access / Login Panel <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="container-xxxl container-fluid px-0">
        <div id="wrapper">
          
          {/* Header Section */}
          <header className="d-flex px-3 align-items-center justify-content-between">
            <div className="flex-grow-1">
              <a href="https://sbi.bank.in/" title="Logo" id="logo" rel="external" aria-label="SBI Logo">
                &nbsp;
              </a>
            </div>
            <div className="px-4">
              <a href="#mainContent" className="text-[#032e63] font-semibold text-[13px] no-underline hover:underline">
                Skip to main content
              </a>
            </div>
            <div id="SbiYonoLogo" className="d-none d-md-flex pe-none user-select-none">
              &nbsp;
            </div>
          </header>

          {/* Navigation Bar */}
          <nav id="navigation" className="navbar navbar-expand-lg mobile-default py-2 py-lg-1 d-flex justify-content-end" aria-label="Main navigation">
            <div className="flex justify-between items-center w-full px-2">
              <div className="flex flex-wrap gap-1 items-center">
                
                {/* Services Dropdown */}
                <div className="relative">
                  <a 
                    className="nav-link has-submenu cursor-pointer" 
                    onClick={() => toggleDropdown('services')}
                  >
                    Services<span className="sub-arrow"></span>
                  </a>
                  {activeDropdown === 'services' && (
                    <ul className="dropdown-menu show d-block absolute z-50 list-none m-0 p-0 border border-white/10">
                      <li><a className="dropdown-item" href="https://retail.sbi.bank.in/npersonal/sbi_home.html">Personal Internet Banking</a></li>
                      <li><a className="dropdown-item" href="https://corp.sbi.bank.in/corporate/sbi/sbi_home.html">Corporate Internet Banking</a></li>
                      <li className="relative">
                        <a className="dropdown-item has-submenu" href="javascript:void(0)">Mobile Banking</a>
                        <ul className="bg-[#032e63] border-t border-white/5 list-none p-0 m-0">
                          <li><a className="dropdown-item pl-8" href="https://mobilityretail.sbi/sbf_retail.html" target="_blank" rel="noopener noreferrer">yono LITE</a></li>
                          <li><a className="dropdown-item pl-8" href="https://mobilityretail.sbi/sbf_corporate.html" target="_blank" rel="noopener noreferrer">yono BUSINESS</a></li>
                        </ul>
                      </li>
                      <li><a className="dropdown-item" href="https://www.sbipayments.com/" target="_blank">SBI Payments</a></li>
                      <li><a className="dropdown-item" href="https://retail.sbi.bank.in/npersonal/tax_retail.html" target="_blank" rel="noopener noreferrer">Online Tax / Payment / Receipt / Challan printing</a></li>
                    </ul>
                  )}
                </div>

                {/* FAQ Dropdown */}
                <div className="relative">
                  <a 
                    className="nav-link has-submenu cursor-pointer" 
                    onClick={() => toggleDropdown('faq')}
                  >
                    FAQ<span className="sub-arrow"></span>
                  </a>
                  {activeDropdown === 'faq' && (
                    <ul className="dropdown-menu show d-block absolute z-50 list-none m-0 p-0 border border-white/10">
                      <li><a className="dropdown-item" href="https://retail.sbi.bank.in/npersonal/faq.html">Personal Banking FAQ</a></li>
                      <li><a className="dropdown-item" href="https://corp.sbi.bank.in/corporate/sbi/corp_faq.html">Corporate Banking FAQ</a></li>
                      <li><a className="dropdown-item" href="https://mobilityretail.sbi/sbustaticweb/mobile/faq.html">Yono LITE FAQ</a></li>
                      <li><a className="dropdown-item" href="https://mobilityretail.sbi/sbijava/mobile/sbsecure_otp_app_faq.html">State Bank Secure OTP App</a></li>
                    </ul>
                  )}
                </div>

                <div className="nav-item">
                  <a href="https://sbi.bank.in/" className="nav-link">Corporate Website</a>
                </div>

                {/* SBIePay Lite Dropdown */}
                <div className="relative">
                  <a 
                    className="nav-link has-submenu cursor-pointer" 
                    onClick={() => toggleDropdown('sbiepay')}
                  >
                    SBIePay Lite <span className="text-[8px] font-normal ml-0.5">(SBMOPS)</span><span className="sub-arrow"></span>
                  </a>
                  {activeDropdown === 'sbiepay' && (
                    <ul className="dropdown-menu show d-block absolute z-50 list-none m-0 p-0 border border-white/10 min-w-[280px]">
                      <li><a className="dropdown-item text-xs" href="https://merchant.sbi.bank.in/mopsprelogin/mopsremittanceform.htm" target="_blank" rel="noopener noreferrer">SBIePay Lite (formerly SBMOPS) Branch Challan(CP)/Reprint Remittance Form</a></li>
                      <li><a className="dropdown-item text-xs" href="https://merchant.sbi.bank.in/mopsprelogin/mopsBilldeskCancelTransaction.htm" target="_blank" rel="noopener noreferrer">SBIePay Lite (formerly SBMOPS) For Cancel RTGS/NEFT/BRANCH Transactions (CP)</a></li>
                      <li><a className="dropdown-item text-xs" href="https://merchant.sbi.bank.in/mopsprelogin/mopsRtgsNeftChallanDownload.htm" target="_blank" rel="noopener noreferrer">SBIePay Lite (formerly SBMOPS) RTGS-NEFT PAP Challan Reprint Form (CP)</a></li>
                      <li><a className="dropdown-item text-xs" href="https://retail.sbi.bank.in/npersonal/tax_retail.html" target="_blank" rel="noopener noreferrer">Online Tax / Payment / Receipt / Challan printing</a></li>
                      <li><a className="dropdown-item text-xs" href="https://merchant.sbi.bank.in/sbijava/sbiepaylite/html/payment_gateway_charges.html" target="_blank" rel="noopener noreferrer">Payment Gateway Charges</a></li>
                    </ul>
                  )}
                </div>

                <div className="nav-item">
                  <a href="https://sbi.bank.in/web/personal-banking/donations" target="_blank" rel="noopener noreferrer" className="nav-link">Donations</a>
                </div>
                
                <div className="nav-item">
                  <a href="https://sbcollect.sbi.bank.in/sbicollect/icollecthome.htm" className="nav-link">SB Collect</a>
                </div>

                <div className="nav-item">
                  <a href="javascript:void(0)" className="nav-link">Videos</a>
                </div>

                {/* Apply Dropdown */}
                <div className="relative">
                  <a 
                    className="nav-link has-submenu cursor-pointer flex items-center gap-1" 
                    onClick={() => toggleDropdown('apply')}
                  >
                    <span>Apply for SB/ Current Account <sup className="text-yellow-300 font-extrabold text-[9px] animate-pulse">New</sup></span>
                    <span className="sub-arrow"></span>
                  </a>
                  {activeDropdown === 'apply' && (
                    <ul className="dropdown-menu show d-block absolute z-50 list-none m-0 p-0 border border-white/10 min-w-[240px]">
                      <li className="relative">
                        <a className="dropdown-item has-submenu" href="javascript:void(0)">Savings Bank Account <sup className="text-yellow-300 text-[8px]">New</sup></a>
                        <ul className="bg-[#032e63] border-t border-white/5 list-none p-0 m-0">
                          <li><a className="dropdown-item pl-8" href="https://retail.sbi.bank.in/vkyc/vkyclanding.htm" target="_blank" rel="noopener noreferrer">Open Insta Plus Savings (VKYC)</a></li>
                          <li><a className="dropdown-item pl-8" href="https://nridigital.sbi.bank.in">for NRE/NRO</a></li>
                        </ul>
                      </li>
                      <li className="relative">
                        <a className="dropdown-item has-submenu" href="javascript:void(0)">Current Account</a>
                        <ul className="bg-[#032e63] border-t border-white/5 list-none p-0 m-0">
                          <li><a className="dropdown-item pl-8" href="https://corp.sbi.bank.in/oaorevamp/oaolanding.htm">Current Account</a></li>
                          <li><a className="dropdown-item pl-8" href="https://corp.sbi.bank.in/vkyccao/vkycoaolanding.htm">Current Account through VKYC</a></li>
                          <li><a className="dropdown-item pl-8" href="https://corp.sbi.bank.in/mcaoao/mcaaccopening.htm">MCA Current Account</a></li>
                        </ul>
                      </li>
                      <li><a className="dropdown-item" href="https://retail.sbi.bank.in/npersonal/reg_forms.html" target="_blank" rel="noopener noreferrer">Banking Forms</a></li>
                    </ul>
                  )}
                </div>

                <div className="relative">
                  <a 
                    className="nav-link has-submenu cursor-pointer" 
                    onClick={() => toggleDropdown('nps')}
                  >
                    NPS<span className="sub-arrow"></span>
                  </a>
                  {activeDropdown === 'nps' && (
                    <ul className="dropdown-menu show d-block absolute z-50 list-none m-0 p-0 border border-white/10">
                      <li><a className="dropdown-item" href="https://retail.sbi.bank.in/npscorp/npsCorporateRegistration.htm" target="_blank">Corporate Employee Registration</a></li>
                    </ul>
                  )}
                </div>

                <div className="nav-item">
                  <a href="https://customer.sbiunipay.sbi.bank.in/CustomerPortal/quickPay" target="_blank" rel="noopener noreferrer" className="nav-link">SBI Unipay</a>
                </div>

                {/* Loans Dropdown */}
                <div className="relative">
                  <a 
                    className="nav-link has-submenu cursor-pointer flex items-center gap-1" 
                    onClick={() => toggleDropdown('loans')}
                  >
                    <span>SBI Loans <sup className="text-yellow-300 font-extrabold text-[9px] animate-pulse">New</sup></span>
                    <span className="sub-arrow"></span>
                  </a>
                  {activeDropdown === 'loans' && (
                    <ul className="dropdown-menu show d-block absolute z-50 list-none m-0 p-0 border border-white/10 min-w-[240px]">
                      <li><a className="dropdown-item" href="https://retail.sbi.bank.in/lamf/mflanding.htm" target="_blank" rel="noopener noreferrer">Loan Against Mutual Fund <sup className="text-yellow-300 text-[8px]">New</sup></a></li>
                      <li><a className="dropdown-item" href="https://merchant.onlinesbi.sbi/npcimandatecug/emandateloanregistration.htm" target="_blank" rel="noopener noreferrer">E - Mandate</a></li>
                      <li><a className="dropdown-item" href="https://homeloans.sbi.bank.in/" target="_blank" rel="noopener noreferrer">Home Loan</a></li>
                      <li><a className="dropdown-item" href="https://emudra.sbi.bank.in:8044/emudra" target="_blank" rel="noopener noreferrer">e-MUDRA</a></li>
                      <li><a className="dropdown-item" href="https://sbi.bank.in/web/personal-banking/loans/gold-loan" target="_blank" rel="noopener noreferrer">Gold Loan</a></li>
                      <li><a className="dropdown-item" href="https://sbi.bank.in/web/personal-banking/loans/auto-loans" target="_blank" rel="noopener noreferrer">Vehicle Loan</a></li>
                      <li><a className="dropdown-item" href="https://onlineapply.sbi.bank.in/personal-banking/personal-loan" target="_blank" rel="noopener noreferrer">Xpress Credit</a></li>
                      <li><a className="dropdown-item" href="https://onlineapply.sbi.bank.in/personal-banking/pension-loan" target="_blank" rel="noopener noreferrer">Pension Loan</a></li>
                      <li><a className="dropdown-item" href="https://corp.sbi.bank.in/retfinavailod/hulretailerinitial.htm">Retailer Finance</a></li>
                    </ul>
                  )}
                </div>

                <div className="nav-item">
                  <a href="https://yonoretail.sbi.bank.in/accounts/re-kyc/kyc-entry?srcChn=RINB" target="_blank" className="nav-link">Update KYC <sup className="text-yellow-300 font-extrabold text-[9px] animate-pulse">New</sup></a>
                </div>

              </div>
              <div id="navLangWrap" className="d-block d-lg-flex py-1">
                <a id="navLang" className="d-block d-lg-flex py-2 px-3 px-lg-2 text-yellow-300 font-bold hover:text-white no-underline text-xs" href="#" aria-label="Change Language to Hindi">
                  हिंदी
                </a>
              </div>
            </div>
          </nav>

          {/* Main Area */}
          <main id="mainContent" className="px-3">
            
            {/* Disclaimer Box */}
            <div id="disclaimerBox" className="row">
              <div id="browser_cache" className="col-lg-12 col-md-12">
                <div className="cacheText">
                  <span className="cache_blink">If slowness is observed during Login Page loading, please refresh the  page for better experience.</span>
                  <div style={{ marginTop: '10px' }}>
                    SBI never asks for confidential information such as PIN and OTP from customers. Any such call can be made only by a fraudster. Please do not share personal info.
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling announcement marquee banner */}
            <div id="wpanel_users" className="row" role="status" aria-label="Announcements scroll message">
              <div className="float-start scrollMsg_PlayPause_btn">
                <button 
                  className="scrollMsgPlayPause" 
                  type="button" 
                  id="scrollMsg_pauseButton" 
                  aria-label="Announcements scroll message pause"
                  onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                >
                  {isMarqueePaused ? <Play size={10} fill="white" /> : <Pause size={10} fill="white" />}
                </button>
              </div>
              <div id="message" className="wpanel_marquee m-0 mb-1 float-start">
                <p className={`${isMarqueePaused ? 'marquee-paused' : ''}`}>
                  SBI Authenticator App is now LIVE for our YONo Net-banking! Download and Log in SBI Authenticator App to enable YONO Net-banking for getting OTPs on SBI Authenticator App.
                </p>
              </div>
            </div>

            {/* Banking cards content */}
            <div id="bankingBoxes" className="row row-cols-1 row-cols-lg-2 row-cols-md-1 row-cols-sm-1 g-4">
              
              {/* Personal banking card */}
              <div className="col m-0 px-1 p-0">
                <div className="card h-100 border-0">
                  <div className="banking_section card-body">
                    <div style={{ marginTop: '8px', marginBottom: '14px' }}>
                      <img src="/images/yono_netbanking.png" alt="Yono Netbanking" className="h-10 object-contain mx-auto" />
                    </div>
                    <h1 style={{ margin: '0px' }}>
                      <a href="https://retail.sbi.bank.in/npersonal/sbi_home.html" className="personal no-underline" aria-label="Personal Banking">
                        <span className="personal_highlight">PERSONAL</span> BANKING
                      </a>
                    </h1>

                    <div className="login loginButton p-2" style={{ minHeight: 'auto' }}>
                      <a 
                        className="login--new d-flex m-0 py-2 ps-4 pe-4 pe-sm-3 cursor-pointer" 
                        onClick={() => router.push('/auth/login')}
                        style={{ display: 'inline-block', marginTop: '0px' }} 
                        aria-label="Login to Personal Banking"
                      >
                        <span className="classicTxt px-0">LOGIN</span>
                        <span className="classicImg d-none d-sm-block ps-4">
                          <img src="/images/arrow.png" alt="Personal Login" title="Personal Login" />
                        </span>
                      </a>
                    </div>

                    <div className="belowLogSec">
                      <p>&nbsp;</p>
                    </div>

                    {/* Quick Access links */}
                    <div className="iconLinks py-0">
                      <div className="row">
                        <div className="iconLink col-12 col-sm-3 py-1 px-2 px-lg-1">
                          <a className="register" href="javascript:void(0);">
                            <span className="lbl">New User Registration / Activation</span>
                          </a>
                        </div>
                        <div className="iconLink col-12 col-sm-3 py-1 px-2 px-lg-1">
                          <a className="how" href="https://yonoretail.sbi.bank.in/registration/services/complaint/help-support" target="_blank" rel="noopener noreferrer" aria-label="How do i register retail Internet banking">
                            <span className="lbl">How Do I</span>
                          </a>
                        </div>
                        <div className="iconLink col-12 col-sm-3 py-1 px-2 px-lg-1">
                          <a className="customer_care" href="https://crh.sbi.bank.in/" target="_blank" rel="noopener noreferrer">
                            <span className="lbl">Customer Care - Personal</span>
                          </a>
                        </div>
                        <div className="iconLink col-12 col-sm-3 py-1 px-2 px-lg-1">
                          <a className="unlockUser" href="javascript:void(0)" aria-label="Lock &amp; Unlock User">
                            <span className="lbl">Lock &amp; Unlock User</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <p className="hidden-xs text-slate-500 text-xs text-center mt-3">
                      SBI&apos;s internet banking portal provides personal banking services that gives you complete control over all your banking demands online.
                    </p>
                  </div>
                </div>
              </div>

              {/* Corporate banking card */}
              <div className="col m-0 px-1 p-0">
                <div className="card h-100 border-0">
                  <div className="banking_section card-body">
                    <span className="corp_icon block my-2">
                      <img src="/images/ybbi_corp.png" alt="yono BUSINESS" title="yono BUSINESS" className="h-10 object-contain mx-auto" />
                    </span>
                    <h2 style={{ margin: '0px' }} className="p-0">
                      <a href="https://yonobusiness.sbi.bank.in/" className="personal no-underline" aria-label="Corporate Banking">
                        <span className="personal_highlight">CORPORATE</span> BANKING
                      </a>
                    </h2>

                    <div className="login loginButton p-2" style={{ minHeight: 'auto' }}>
                      <a 
                        className="login--new d-flex m-0 py-2 ps-4 pe-4 pe-sm-3" 
                        href="https://yonobusiness.sbi.bank.in/" 
                        style={{ display: 'inline-block', marginTop: '0px' }} 
                        aria-label="Login to Corporate Banking"
                      >
                        <span className="classicTxt px-0">LOGIN</span>
                        <span className="classicImg d-none d-sm-block ps-4">
                          <img src="/images/arrow.png" alt="Corporate Login" />
                        </span>
                      </a>
                    </div>

                    <p style={{ fontSize: '13px', margin: '0px 15px 5px', textAlign: 'left', lineHeight: '20px' }}>
                      <em>Have you tried our new simplified and intuitive business banking platform? Log in to yonobusiness.sbi.bank.in to avail business banking services.</em>
                    </p>

                    {/* Quick Access links */}
                    <div className="iconLinks py-0">
                      <div className="row">
                        <div className="iconLink col-12 col-sm-4">
                          <a className="register" href="https://yonobusiness.sbi.bank.in/preonboard/landing/registration" target="_blank" rel="noopener noreferrer" aria-label="New Corporate Registration">
                            <span className="lbl">New Corporate Registration</span>
                          </a>
                        </div>
                        <div className="iconLink col-12 col-sm-4">
                          <a className="how" href="https://corp.sbi.bank.in/ybbihelp/help_corporate.html" target="_blank" rel="noopener noreferrer" aria-label="How do I register for yono BUSINESS">
                            <span className="lbl">How Do I</span>
                          </a>
                        </div>
                        <div className="iconLink col-12 col-sm-4">
                          <a className="customer_care" href="https://yonobusiness.sbi.bank.in/ContactUs" target="_blank" rel="noopener noreferrer">
                            <span className="lbl">Customer Care - Corporate</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <p className="hidden-xs text-slate-500 text-xs text-center mt-3">
                      Corporate Banking application to administer and manage non personal accounts online.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Useful Links Section */}
            <div id="useful-links" className="mt-0 pt-2">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 lessGroup">
                
                <div className="col">
                  <a href="https://crh.sbi.bank.in/" target="_blank" rel="noopener noreferrer" aria-label="Register Complaint of Unauthorized Transaction">
                    Register Complaint of Unauthorized Transaction<sup className="text-red-500 font-bold ml-0.5 animate-pulse">New</sup>
                  </a>
                </div>
                <div className="col">
                  <a href="https://qms.sbi.bank.in/" target="_blank" rel="noopener noreferrer" aria-label="QMS (e-Appointment)">QMS (e-Appointment)</a>
                </div>
                <div className="col">
                  <a href="https://rbiretaildirect.org.in" target="_blank" rel="noopener noreferrer" aria-label="RBI Retail Direct portal">RBI Retail Direct portal</a>
                </div>
                <div className="col">
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Block ATM Card">Block ATM Card</a>
                </div>
                <div className="col">
                  <a href="https://retail.sbi.bank.in/npersonal/reg_forms.html" target="_blank" rel="noopener noreferrer" aria-label="Banking Forms">Banking Forms</a>
                </div>
                <div className="col">
                  <a href="https://www.psballiance.com/doorstep-banking.html" target="_blank" rel="noopener noreferrer" aria-label="Doorstep Banking">Doorstep Banking</a>
                </div>
                <div className="col">
                  <a href="https://www.sbigeneral.in/portal/downloads" target="_blank" rel="noopener noreferrer" aria-label="SBI General Insurance Document Download">SBI General Insurance Document Download</a>
                </div>
                <div className="col">
                  <a href="https://fastag.sbi.bank.in/" target="_blank" rel="noopener noreferrer" aria-label="SBI FasTag">SBI FasTag</a>
                </div>
                <div className="col">
                  <a href="https://sbi.bank.in/web/salary-account" target="_blank" rel="noopener noreferrer" aria-label="SBI Salary Account">SBI Salary Account</a>
                </div>
                <div className="col">
                  <a href="https://sbi.bank.in/web/nri/home" target="_blank" rel="noopener noreferrer" aria-label="NRI Services">NRI Services</a>
                </div>
                <div className="col">
                  <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" aria-label="CYBER CRIME HELPLINE">CYBER CRIME HELPLINE</a>
                </div>
                <div className="col">
                  <a href="https://www.sbisecurities.in/" target="_blank" rel="noopener noreferrer" aria-label="SBI Securities">SBI Securities</a>
                </div>
                <div className="col">
                  <a href="https://remit.sbi/" target="_blank" rel="noopener noreferrer" aria-label="SBI Express Remit">SBI Express Remit</a>
                </div>
                <div className="col">
                  <a href="https://www.sbimf.com/" target="_blank" rel="noopener noreferrer" aria-label="SBI Mutual Fund">SBI Mutual Fund</a>
                </div>
                <div className="col">
                  <a href="https://www.sbilife.co.in" target="_blank" rel="noopener noreferrer" aria-label="SBI Life Insurance">SBI Life Insurance</a>
                </div>
                <div className="col">
                  <a href="http://www.sbicard.com/" target="_blank" rel="noopener noreferrer" aria-label="SBI Card">SBI Card</a>
                </div>

                {/* Hidden links drawer */}
                {isUsefulLinksOpen && (
                  <>
                    <div className="col">
                      <a href="https://www.onlinesbiglobal.com/" target="_blank" rel="noopener noreferrer" aria-label="OnlineSBI Global">OnlineSBI Global</a>
                    </div>
                    <div className="col">
                      <a href="https://prepaid.sbi.bank.in/" target="_blank" rel="noopener noreferrer" aria-label="Foreign Travel/EZ-Pay/Gift/Prepaid Cards">Foreign Travel/EZ-Pay/Gift/Prepaid Cards</a>
                    </div>
                    <div className="col">
                      <a href="http://www.sbigeneral.in" target="_blank" rel="noopener noreferrer" aria-label="SBI General Insurance">SBI General Insurance</a>
                    </div>
                    <div className="col">
                      <a href="https://cmp.sbi.bank.in/" target="_blank" rel="noopener noreferrer" aria-label="Cash Management Product">Cash Management Product</a>
                    </div>
                    <div className="col">
                      <a href="https://rewardz.sbi.bank.in/" target="_blank" rel="noopener noreferrer" aria-label="State Bank Loyalty Rewardz">State Bank Loyalty Rewardz</a>
                    </div>
                    <div className="col">
                      <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GSTN Updation">GSTN Updation</a>
                    </div>
                    <div className="col">
                      <a href="https://nxtgengbss.sbi.bank.in/" target="_blank" rel="noopener noreferrer" aria-label="eSBTR Challan Generation">eSBTR Challan Generation</a>
                    </div>
                    <div className="col">
                      <a href="https://sbicaptrustee.in/" target="_blank" rel="noopener noreferrer" aria-label="My WILL Services Online">My WILL Services Online</a>
                    </div>
                    <div className="col">
                      <a href="https://sbi.bank.in/web/business/sme/current-accounts" target="_blank" rel="noopener noreferrer" aria-label="Current Account">Current Account</a>
                    </div>
                    <div className="col">
                      <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Aadhaar Seeding Service: BASE">Aadhaar Seeding Service: BASE</a>
                    </div>
                    <div className="col">
                      <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Fair Lending Practice Code">Fair Lending Practice Code</a>
                    </div>
                  </>
                )}

              </div>

              {/* Collapsible toggle */}
              <div className="btnCollapseWrap text-center py-2">
                <a 
                  className="btnCollapse mt-1 mb-3 cursor-pointer" 
                  onClick={() => setIsUsefulLinksOpen(!isUsefulLinksOpen)}
                  aria-label="More Useful Links"
                >
                  <span className="icon">{isUsefulLinksOpen ? '▴' : '▾'}</span>
                  <span className="lbl">More Useful Links</span>
                </a>
              </div>
            </div>

            {/* Banner Carousel Section */}
            <div id="sbihome-banner-carousel" className="row">
              <div id="sbihomeBannerCarousel" className="carousel slide relative w-full">
                <div className="relative overflow-hidden w-full h-64 sm:h-80 md:h-[420px] flex items-center justify-center bg-white border border-slate-200">
                  <a 
                    href={carouselSlides[activeSlide].href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full h-full block"
                  >
                    <img 
                      src={carouselSlides[activeSlide].src} 
                      alt={carouselSlides[activeSlide].title} 
                      title={carouselSlides[activeSlide].title}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  </a>

                  {/* Left & Right control buttons */}
                  <button 
                    type="button" 
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/45 text-white rounded-full p-2 border-none cursor-pointer"
                    onClick={handlePrevSlide}
                    aria-label="Carousel Previous"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/45 text-white rounded-full p-2 border-none cursor-pointer"
                    onClick={handleNextSlide}
                    aria-label="Carousel Next"
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                {/* Dot Indicators & Play/Pause controls bar at the bottom */}
                <ul className="carousel-indicators" aria-label="Carousel indicator">
                  <li style={{ background: 'none', border: 'none', listStyle: 'none', marginTop: 0, marginRight: '13px' }}>
                    <button 
                      className="carouselPlayPause flex items-center justify-center border-none cursor-pointer" 
                      type="button" 
                      id="pauseButton" 
                      aria-label="Banner Carousel pause"
                      onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
                    >
                      {isCarouselPlaying ? <Pause size={10} fill="white" /> : <Play size={10} fill="white" />}
                    </button>
                  </li>
                  {carouselSlides.map((_, idx) => (
                    <li key={idx} className="list-none inline-block">
                      <button 
                        type="button" 
                        className={`border border-[#032e63] rounded-full w-2.5 h-2.5 cursor-pointer ${activeSlide === idx ? 'active' : ''}`}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Starts */}
            <footer id="footer" className="row">
              <div className="col-12 col-lg-4 text-center text-lg-start">
                <p className="p-0">© State Bank of India (APM Id:Serv_Tran_564)</p>
              </div>

              {/* Social Links Fixed Dock */}
              <nav className="socialLinks" aria-label="Social media links">
                <div className="socialLinksInner flex flex-col gap-1.5">
                  
                  {/* Facebook */}
                  <a className="socialLink bg-[#1877F2]" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/StateBankofIndia">
                    <span className="socialLinkIcon flex items-center justify-center" aria-hidden="true" id="icon_linkfb">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">SBI Official<br /> Facebook</span>
                  </a>

                  {/* Twitter / X */}
                  <a className="socialLink bg-black" target="_blank" rel="noopener noreferrer" href="https://twitter.com/TheOfficialSBI">
                    <span className="socialLinkIcon flex items-center justify-center" id="icon_linktw">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">SBI Official<br /> Twitter</span>
                  </a>

                  {/* YouTube */}
                  <a className="socialLink bg-[#FF0000]" target="_blank" rel="noopener noreferrer" href="http://www.youtube.com/theofficialsbi">
                    <span className="socialLinkIcon flex items-center justify-center" id="icon_linkyt">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">SBI Official<br /> YouTube</span>
                  </a>

                  {/* LinkedIn */}
                  <a className="socialLink bg-[#0A66C2]" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/state-bank-of-india/">
                    <span className="socialLinkIcon flex items-center justify-center" id="icon_linklindn">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">SBI Official<br /> LinkedIn</span>
                  </a>

                  {/* Instagram */}
                  <a className="socialLink bg-[#E1306C]" target="_blank" rel="noopener noreferrer" href="https://instagram.com/theofficialsbi/">
                    <span className="socialLinkIcon flex items-center justify-center" id="icon_linkinst">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">SBI Official<br /> Instagram</span>
                  </a>

                  {/* Pinterest */}
                  <a className="socialLink bg-[#BD081C]" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/TheOfficialSBI/">
                    <span className="socialLinkIcon flex items-center justify-center" id="icon_linkpint">
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.946-.199-2.384.041-3.41.218-.947 1.41-5.984 1.41-5.984s-.36-.723-.36-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.622 0 11.988-5.367 11.988-11.987C24 5.368 18.633 0 12.017 0z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">SBI Official<br /> Pinterest</span>
                  </a>

                  {/* Contact Us */}
                  <a className="socialLink bg-[#302985]" target="_blank" rel="noopener noreferrer" href="https://retail.sbi.bank.in/npersonal/contact_us.html">
                    <span className="socialLinkIcon flex items-center justify-center" id="icon_contus">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">Contact Us</span>
                  </a>

                  {/* Whatsapp Banking */}
                  <a className="socialLink bg-[#25D366]" target="_blank" rel="noopener noreferrer" href="https://sbi.bank.in/web/personal-banking/digital/whatsapp-banking">
                    <span className="socialLinkIcon flex items-center justify-center" id="icon_whatsapp">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.46L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.012 14.06 1.01 11.993 1.01c-5.442 0-9.87 4.372-9.874 9.802-.001 1.77.478 3.42 1.388 4.793L2.5 21.1l5.147-1.346-.001-.001-.002-.001z"/>
                      </svg>
                    </span>
                    <span className="socialLinkLabel hidden">Whatsapp Banking</span>
                  </a>

                </div>
              </nav>

              <div className="col-12 col-lg-8 text-center text-lg-end">
                <p className="p-0">Site best viewed at 1280 × 720 resolution in Microsoft Edge 100+, Mozilla 100+, Google Chrome 111+</p>
              </div>
            </footer>
            
          </main>
        </div>
      </div>

    </div>
  )
}
