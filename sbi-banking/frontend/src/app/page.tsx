'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Pause, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import '@/app/sbi-home.css'

export default function Home() {
  const router = useRouter()

  // State management
  const [isMarqueePaused, setIsMarqueePaused] = useState(false)
  const [isUsefulLinksOpen, setIsUsefulLinksOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(4) // Start with slide 4 (SBI Mutual Fund) as default active like original HTML
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true)

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

  // Active states for custom dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(menu)
    }
  }

  return (
    <div className="max-w-[1366px] mx-auto bg-white min-h-screen pb-12 select-none relative shadow-md font-sans">
      
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
            className="bg-yellow-500 hover:bg-yellow-400 text-violet-950 font-bold px-3 py-1 rounded transition-all flex items-center gap-1 shadow-sm cursor-pointer"
          >
            Quick Access / Login Panel <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* 1. HEADER */}
      <header className="flex px-4 py-3 align-items-center justify-between bg-white border-b border-slate-200">
        <div className="flex-grow">
          <a href="https://sbi.bank.in/" title="Logo" id="logo" aria-label="SBI Logo">
            <img src="/images/logo.png" alt="SBI Logo" className="h-12 object-contain" />
          </a>
        </div>
        <div className="px-4 text-[13px] font-semibold text-[#032e63] hover:underline self-center hidden md:block">
          <a href="#mainContent">Skip to main content</a>
        </div>
        <div id="SbiYonoLogo" className="hidden md:flex items-center">
          <img src="/images/yono-logo.png" alt="YONO SBI Logo" className="h-10 object-contain" />
        </div>
      </header>

      {/* 2. NAVIGATION BAR */}
      <nav id="navigation" className="bg-[#032e63] px-3 py-1 flex items-center justify-between text-white shadow-xs select-none">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-wrap gap-1 items-center text-xs font-bold">
            
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => toggleDropdown('services')}
                className="text-white hover:text-yellow-400 px-3 py-1.5 focus:outline-none flex items-center gap-1 cursor-pointer"
              >
                Services <span className="text-[10px]">▾</span>
              </button>
              {activeDropdown === 'services' && (
                <ul className="absolute left-0 mt-1 bg-[#032e63] border border-white/10 rounded shadow-lg min-w-[240px] z-50 py-1 text-left list-none m-0">
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://retail.sbi.bank.in/npersonal/sbi_home.html">Personal Internet Banking</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://corp.sbi.bank.in/corporate/sbi/sbi_home.html">Corporate Internet Banking</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://mobilityretail.sbi/sbf_retail.html">yono LITE</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://mobilityretail.sbi/sbf_corporate.html">yono BUSINESS</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://www.sbipayments.com/">SBI Payments</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline" href="https://retail.sbi.bank.in/npersonal/tax_retail.html">Online Tax / Challan printing</a></li>
                </ul>
              )}
            </div>

            {/* FAQ Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => toggleDropdown('faq')}
                className="text-white hover:text-yellow-400 px-3 py-1.5 focus:outline-none flex items-center gap-1 cursor-pointer"
              >
                FAQ <span className="text-[10px]">▾</span>
              </button>
              {activeDropdown === 'faq' && (
                <ul className="absolute left-0 mt-1 bg-[#032e63] border border-white/10 rounded shadow-lg min-w-[220px] z-50 py-1 text-left list-none m-0">
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://retail.sbi.bank.in/npersonal/faq.html">Personal Banking FAQ</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://corp.sbi.bank.in/corporate/sbi/corp_faq.html">Corporate Banking FAQ</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://mobilityretail.sbi/sbustaticweb/mobile/faq.html">Yono LITE FAQ</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline" href="https://mobilityretail.sbi/sbijava/mobile/sbsecure_otp_app_faq.html">State Bank Secure OTP App</a></li>
                </ul>
              )}
            </div>

            <a href="https://sbi.bank.in/" className="text-white hover:text-yellow-400 px-3 py-1.5 no-underline">Corporate Website</a>

            {/* SBIePay Lite Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => toggleDropdown('sbiepay')}
                className="text-white hover:text-yellow-400 px-3 py-1.5 focus:outline-none flex items-center gap-1 cursor-pointer"
              >
                SBIePay Lite <span className="text-[10px] font-normal">(SBMOPS)</span> <span className="text-[10px]">▾</span>
              </button>
              {activeDropdown === 'sbiepay' && (
                <ul className="absolute left-0 mt-1 bg-[#032e63] border border-white/10 rounded shadow-lg min-w-[280px] z-50 py-1 text-left list-none m-0">
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://merchant.sbi.bank.in/mopsprelogin/mopsremittanceform.htm">Reprint Remittance Form</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://merchant.sbi.bank.in/mopsprelogin/mopsBilldeskCancelTransaction.htm">Cancel RTGS/NEFT/Branch Txn</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://merchant.sbi.bank.in/mopsprelogin/mopsRtgsNeftChallanDownload.htm">RTGS-NEFT PAP Challan Reprint</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline" href="https://merchant.sbi.bank.in/sbijava/sbiepaylite/html/payment_gateway_charges.html">Payment Gateway Charges</a></li>
                </ul>
              )}
            </div>

            <a href="https://sbi.bank.in/web/personal-banking/donations" className="text-white hover:text-yellow-400 px-3 py-1.5 no-underline">Donations</a>
            <a href="https://sbcollect.sbi.bank.in/sbicollect/icollecthome.htm" className="text-white hover:text-yellow-400 px-3 py-1.5 no-underline">SB Collect</a>
            <a href="#" className="text-white hover:text-yellow-400 px-3 py-1.5 no-underline">Videos</a>

            {/* Apply Account Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => toggleDropdown('apply')}
                className="text-white hover:text-yellow-400 px-3 py-1.5 focus:outline-none flex items-center gap-1 cursor-pointer"
              >
                Apply for SB/ Current Account <sup className="text-yellow-300 font-extrabold text-[9px] animate-pulse">New</sup> <span className="text-[10px]">▾</span>
              </button>
              {activeDropdown === 'apply' && (
                <ul className="absolute left-0 mt-1 bg-[#032e63] border border-white/10 rounded shadow-lg min-w-[240px] z-50 py-1 text-left list-none m-0">
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5 font-semibold" href="https://retail.sbi.bank.in/vkyc/vkyclanding.htm">Open Insta Plus Savings (VKYC)</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://nridigital.sbi.bank.in">for NRE/NRO</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://corp.sbi.bank.in/oaorevamp/oaolanding.htm">Current Account</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline" href="https://retail.sbi.bank.in/npersonal/reg_forms.html">Banking Forms</a></li>
                </ul>
              )}
            </div>

            <a href="https://retail.sbi.bank.in/npscorp/npsCorporateRegistration.htm" className="text-white hover:text-yellow-400 px-3 py-1.5 no-underline">NPS</a>
            <a href="https://customer.sbiunipay.sbi.bank.in/CustomerPortal/quickPay" className="text-white hover:text-yellow-400 px-3 py-1.5 no-underline">SBI Unipay</a>

            {/* Loans Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => toggleDropdown('loans')}
                className="text-white hover:text-yellow-400 px-3 py-1.5 focus:outline-none flex items-center gap-1 cursor-pointer"
              >
                SBI Loans <sup className="text-yellow-300 font-extrabold text-[9px] animate-pulse">New</sup> <span className="text-[10px]">▾</span>
              </button>
              {activeDropdown === 'loans' && (
                <ul className="absolute left-0 mt-1 bg-[#032e63] border border-white/10 rounded shadow-lg min-w-[240px] z-50 py-1 text-left list-none m-0">
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5 font-semibold" href="https://retail.sbi.bank.in/lamf/mflanding.htm">Loan Against Mutual Fund</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://homeloans.sbi.bank.in/">Home Loan</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline border-b border-white/5" href="https://emudra.sbi.bank.in:8044/emudra">e-MUDRA Gold Loan</a></li>
                  <li><a className="block px-4 py-2 hover:bg-[#0d4484] hover:text-yellow-400 text-white text-[13px] no-underline" href="https://onlineapply.sbi.bank.in/personal-banking/personal-loan">Xpress Credit Personal Loan</a></li>
                </ul>
              )}
            </div>

            <a href="https://yonoretail.sbi.bank.in/accounts/re-kyc/kyc-entry?srcChn=RINB" className="text-white hover:text-yellow-400 px-3 py-1.5 no-underline">Update KYC <sup className="text-yellow-300 font-extrabold text-[9px] animate-pulse">New</sup></a>

          </div>
          <div className="pr-1">
            <a href="#" className="text-yellow-300 hover:text-white font-extrabold text-[12px] border border-yellow-300 px-2 py-0.5 rounded transition-all">हिंदी</a>
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main id="mainContent" className="px-4 mt-3 space-y-3">
        
        {/* Cache & Disclaimer warning */}
        <div id="disclaimerBox" className="w-full">
          <div className="cacheText shadow-2xs leading-relaxed text-slate-800">
            <span className="cache_blink">If slowness is observed during Login Page loading, please refresh the page for better experience.</span>
            <div className="mt-2 text-[12px] text-slate-600 font-medium">
              SBI never asks for confidential information such as PIN and OTP from customers. Any such call can be made only by a fraudster. Please do not share personal info.
            </div>
          </div>
        </div>

        {/* Announcement scrolling marquee */}
        <div className="marquee-container shadow-2xs rounded border border-blue-100 flex items-center p-2">
          <button 
            type="button" 
            onClick={() => setIsMarqueePaused(!isMarqueePaused)}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded p-1.5 transition-colors cursor-pointer mr-3"
            aria-label="Pause marquee"
          >
            {isMarqueePaused ? <Play size={10} fill="white" /> : <Pause size={10} fill="white" />}
          </button>
          <div className="marquee-text-flow select-text text-sm">
            <div className={`marquee-text-inner ${isMarqueePaused ? 'marquee-paused' : ''}`}>
              SBI Authenticator App is now LIVE for our YONo Net-banking! Download and Log in SBI Authenticator App to enable YONO Net-banking for getting OTPs on SBI Authenticator App.
            </div>
          </div>
        </div>

        {/* 4. BANKING CONTENT PANEL CARDS */}
        <div id="bankingBoxes" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          
          {/* PERSONAL BANKING COLUMN */}
          <div className="banking-card flex flex-col items-center p-5 border border-slate-200 rounded-md bg-white">
            <div className="mt-2 mb-3">
              <img src="/images/yono_netbanking.png" alt="Yono Netbanking Logo" className="h-12 object-contain" />
            </div>
            <h2 className="banking-card-title text-lg font-bold text-[#032e63] mt-1 mb-4">
              <span className="personal_highlight text-[#e6007e]">PERSONAL</span> BANKING
            </h2>

            <div className="my-3">
              <button 
                onClick={() => router.push('/auth/login')}
                className="bg-[#0b3875] hover:bg-[#072c5c] text-white font-extrabold py-2 px-6 rounded flex items-center justify-between gap-6 cursor-pointer shadow-sm hover:shadow transition-all"
              >
                <span className="text-[13px] tracking-wider">LOGIN</span>
                <img src="/images/arrow.png" alt="Personal Login Arrow" className="h-3 object-contain" />
              </button>
            </div>

            {/* Icon links below row */}
            <div className="grid grid-cols-4 w-full mt-6 pt-4 border-t border-slate-100 text-center">
              <a href="#" className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-pink-600 border-r border-slate-200 last:border-none no-underline">
                <img src="/images/new_user.png" alt="New User" className="w-8 h-8 object-contain" />
                <span>New User Registration / Activation</span>
              </a>
              <a href="https://yonoretail.sbi.bank.in/registration/services/complaint/help-support" className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-pink-600 border-r border-slate-200 last:border-none no-underline">
                <img src="/images/how_do_i.png" alt="How Do I" className="w-8 h-8 object-contain" />
                <span>How Do I</span>
              </a>
              <a href="https://crh.sbi.bank.in/" className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-pink-600 border-r border-slate-200 last:border-none no-underline">
                <img src="/images/customer_care.png" alt="Customer Care" className="w-8 h-8 object-contain" />
                <span>Customer Care - Personal</span>
              </a>
              <a href="#" className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-pink-600 border-r border-slate-200 last:border-none no-underline">
                <img src="/images/lock_unlock.png" alt="Lock/Unlock" className="w-8 h-8 object-contain" />
                <span>Lock & Unlock User</span>
              </a>
            </div>

            <p className="text-slate-500 text-[12px] leading-relaxed mt-4 px-4 text-center">
              SBI&apos;s internet banking portal provides personal banking services that gives you complete control over all your banking demands online.
            </p>
          </div>

          {/* CORPORATE BANKING COLUMN */}
          <div className="banking-card flex flex-col items-center p-5 border border-slate-200 rounded-md bg-white">
            <div className="mt-2 mb-3">
              <img src="/images/ybbi_corp.png" alt="Yono Business Logo" className="h-12 object-contain" />
            </div>
            <h2 className="banking-card-title text-lg font-bold text-[#032e63] mt-1 mb-4">
              <span className="personal_highlight text-[#e6007e]">CORPORATE</span> BANKING
            </h2>

            <div className="my-3">
              <a 
                href="https://yonobusiness.sbi.bank.in/" 
                className="bg-[#0b3875] hover:bg-[#072c5c] text-white font-extrabold py-2 px-6 rounded flex items-center justify-between gap-6 cursor-pointer shadow-sm hover:shadow transition-all no-underline"
              >
                <span className="text-[13px] tracking-wider">LOGIN</span>
                <img src="/images/arrow.png" alt="Corporate Login Arrow" className="h-3 object-contain" />
              </a>
            </div>

            <p className="text-[#302985] font-semibold text-xs leading-normal mt-3 px-6 text-left italic">
              Have you tried our new simplified and intuitive business banking platform? Log in to yonobusiness.sbi.bank.in to avail business banking services.
            </p>

            {/* Icon links below row */}
            <div className="grid grid-cols-3 w-full mt-6 pt-4 border-t border-slate-100 text-center">
              <a href="https://yonobusiness.sbi.bank.in/preonboard/landing/registration" className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-pink-600 border-r border-slate-200 last:border-none no-underline">
                <img src="/images/new_user.png" alt="New Corporate" className="w-8 h-8 object-contain" />
                <span>New Corporate Registration</span>
              </a>
              <a href="https://corp.sbi.bank.in/ybbihelp/help_corporate.html" className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-pink-600 border-r border-slate-200 last:border-none no-underline">
                <img src="/images/how_do_i.png" alt="How Do I" className="w-8 h-8 object-contain" />
                <span>How Do I</span>
              </a>
              <a href="https://yonobusiness.sbi.bank.in/ContactUs" className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-pink-600 border-r border-slate-200 last:border-none no-underline">
                <img src="/images/customer_care.png" alt="Customer Care" className="w-8 h-8 object-contain" />
                <span>Customer Care - Corporate</span>
              </a>
            </div>

            <p className="text-slate-500 text-[12px] leading-relaxed mt-4 px-4 text-center">
              Corporate Banking application to administer and manage non personal accounts online.
            </p>
          </div>

        </div>

        {/* 5. USEFUL LINKS COLLAPSIBLE CONTAINER */}
        <div id="useful-links" className="bg-[#f0f4f8] rounded-lg p-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
            
            <a href="https://crh.sbi.bank.in/" className="useful-link-item">
              <span>▸ Register Complaint of Unauthorized Transaction</span>
              <sup className="text-red-500 animate-pulse font-bold">New</sup>
            </a>
            <a href="https://qms.sbi.bank.in/" className="useful-link-item"><span>▸ QMS (e-Appointment)</span></a>
            <a href="https://rbiretaildirect.org.in" className="useful-link-item"><span>▸ RBI Retail Direct portal</span></a>
            <a href="#" className="useful-link-item"><span>▸ Block ATM Card</span></a>
            
            <a href="https://retail.sbi.bank.in/npersonal/reg_forms.html" className="useful-link-item"><span>▸ Banking Forms</span></a>
            <a href="https://www.psballiance.com/doorstep-banking.html" className="useful-link-item"><span>▸ Doorstep Banking</span></a>
            <a href="https://www.sbigeneral.in/portal/downloads" className="useful-link-item"><span>▸ SBI General Document Download</span></a>
            <a href="https://fastag.sbi.bank.in/" className="useful-link-item"><span>▸ FastTag</span></a>

            <a href="https://sbi.bank.in/web/salary-account" className="useful-link-item"><span>▸ SBI Salary Account</span></a>
            <a href="https://sbi.bank.in/web/nri/home" className="useful-link-item"><span>▸ NRI Services</span></a>
            <a href="https://cybercrime.gov.in/" className="useful-link-item"><span>▸ CYBER CRIME HELPLINE</span></a>
            <a href="https://www.sbisecurities.in/" className="useful-link-item"><span>▸ SBI Securities</span></a>

            <a href="https://remit.sbi/" className="useful-link-item"><span>▸ SBI Express Remit</span></a>
            <a href="https://www.sbimf.com/" className="useful-link-item"><span>▸ SBI Mutual Fund</span></a>
            <a href="https://www.sbilife.co.in" className="useful-link-item"><span>▸ SBI Life Insurance</span></a>
            <a href="http://www.sbicard.com/" className="useful-link-item"><span>▸ SBI Card</span></a>

          </div>

          {/* COLLAPSIBLE COMPONENT DRAWER */}
          {isUsefulLinksOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold pt-4 mt-4 border-t border-slate-300 animate-fadeIn">
              <a href="https://www.onlinesbiglobal.com/" className="useful-link-item"><span>▸ OnlineSBI Global</span></a>
              <a href="https://prepaid.sbi.bank.in/" className="useful-link-item"><span>▸ Prepaid Cards</span></a>
              <a href="http://www.sbigeneral.in" className="useful-link-item"><span>▸ SBI General Insurance</span></a>
              <a href="https://cmp.sbi.bank.in/" className="useful-link-item"><span>▸ Cash Management Product</span></a>
              <a href="https://rewardz.sbi.bank.in/" className="useful-link-item"><span>▸ State Bank Loyalty Rewardz</span></a>
              <a href="#" className="useful-link-item"><span>▸ GSTN Updation</span></a>
              <a href="https://nxtgengbss.sbi.bank.in/" className="useful-link-item"><span>▸ eSBTR Challan Generation</span></a>
              <a href="https://sbicaptrustee.in/" className="useful-link-item"><span>▸ My WILL Services Online</span></a>
              <a href="https://sbi.bank.in/web/business/sme/current-accounts" className="useful-link-item"><span>▸ Current Account details</span></a>
              <a href="#" className="useful-link-item"><span>▸ Aadhaar Seeding Service: BASE</span></a>
              <a href="#" className="useful-link-item"><span>▸ Fair Lending Practice Code</span></a>
            </div>
          )}

          {/* More Useful Links Toggle Button */}
          <div className="w-full flex justify-center mt-4">
            <button 
              type="button" 
              onClick={() => setIsUsefulLinksOpen(!isUsefulLinksOpen)}
              className="border border-[#032e63] text-[#032e63] rounded px-4 py-1.5 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none"
            >
              <span>{isUsefulLinksOpen ? '▴ Less Useful Links' : '▾ More Useful Links'}</span>
            </button>
          </div>
        </div>

        {/* 6. BANNER CAROUSEL */}
        <div id="sbihome-banner-carousel" className="relative w-full rounded overflow-hidden shadow-sm mt-6 border border-slate-200 bg-white">
          <div className="h-64 sm:h-80 md:h-[400px] relative overflow-hidden flex items-center justify-center">
            <a 
              href={carouselSlides[activeSlide].href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full h-full block"
            >
              <img 
                src={carouselSlides[activeSlide].src} 
                alt={carouselSlides[activeSlide].title} 
                className="w-full h-full object-cover transition-opacity duration-500 ease-in-out" 
              />
            </a>

            {/* Left and Right Navigation Arrows */}
            <button 
              type="button" 
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all cursor-pointer border-none"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              type="button" 
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all cursor-pointer border-none"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dot Indicators and Play/Pause Bar */}
          <div className="bg-slate-100 px-4 py-3 flex items-center justify-between flex-wrap gap-2 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
                className="bg-[#032e63] text-white rounded-full p-1.5 hover:bg-[#0c427f] transition-all cursor-pointer border-none"
                title={isCarouselPlaying ? 'Pause Carousel Autoplay' : 'Play Carousel Autoplay'}
              >
                {isCarouselPlaying ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" />}
              </button>
              <span className="hidden sm:inline text-slate-600 font-semibold">{carouselSlides[activeSlide].title}</span>
            </div>

            {/* Dot buttons loop */}
            <div className="flex items-center gap-1.5">
              {carouselSlides.map((_, idx) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`w-5 h-1.5 rounded-full transition-all border-none cursor-pointer ${activeSlide === idx ? 'bg-[#032e63] w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* 7. SOCIAL LINKS FLOATING VERTICAL BAR ON THE RIGHT */}
      <nav className="social-floating-bar" aria-label="Social media floating links">
        
        {/* Facebook */}
        <a 
          className="social-floating-link bg-[#1877F2]" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.facebook.com/StateBankofIndia"
          title="SBI Official Facebook"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
        </a>

        {/* Twitter */}
        <a 
          className="social-floating-link bg-black" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://twitter.com/TheOfficialSBI"
          title="SBI Official Twitter"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        {/* Youtube */}
        <a 
          className="social-floating-link bg-[#FF0000]" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="http://www.youtube.com/theofficialsbi"
          title="SBI Official YouTube"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>

        {/* LinkedIn */}
        <a 
          className="social-floating-link bg-[#0A66C2]" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.linkedin.com/company/state-bank-of-india/"
          title="SBI Official LinkedIn"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>

        {/* Instagram */}
        <a 
          className="social-floating-link bg-[#E1306C]" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://instagram.com/theofficialsbi/"
          title="SBI Official Instagram"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </a>

        {/* Pinterest */}
        <a 
          className="social-floating-link bg-[#BD081C]" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.pinterest.com/TheOfficialSBI/"
          title="SBI Official Pinterest"
        >
          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.946-.199-2.384.041-3.41.218-.947 1.41-5.984 1.41-5.984s-.36-.723-.36-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.622 0 11.988-5.367 11.988-11.987C24 5.368 18.633 0 12.017 0z"/>
          </svg>
        </a>

        {/* Contact Us */}
        <a 
          className="social-floating-link bg-[#302985]" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://retail.sbi.bank.in/npersonal/contact_us.html"
          title="Contact Us"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>

        {/* Whatsapp Banking */}
        <a 
          className="social-floating-link bg-[#25D366]" 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://sbi.bank.in/web/personal-banking/digital/whatsapp-banking"
          title="Whatsapp Banking"
        >
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.731-1.46L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.012 14.06 1.01 11.993 1.01c-5.442 0-9.87 4.372-9.874 9.802-.001 1.77.478 3.42 1.388 4.793L2.5 21.1l5.147-1.346-.001-.001-.002-.001z"/>
          </svg>
        </a>

      </nav>

      {/* 8. FOOTER */}
      <footer id="footer" className="bg-[#032e63] text-white/80 py-4 px-6 mt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-3 border-t border-white/10">
        <div>
          © State Bank of India (APM Id:Serv_Tran_564)
        </div>
        <div className="text-center md:text-right text-[11px] text-white/60">
          Site best viewed at 1280 × 720 resolution in Microsoft Edge 100+, Mozilla 100+, Google Chrome 111+
        </div>
      </footer>

    </div>
  )
}
