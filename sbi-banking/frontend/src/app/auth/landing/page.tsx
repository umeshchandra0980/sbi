'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './landing.css';

// Carousel banner list using downloaded image cycle to prevent broken images on local
const carouselBanners = [
  { id: 0, title: "YONO Net Banking", src: "/images/banner15.jpg", href: null },
  { id: 1, title: "AWARENESS OF THE PUBLIC", src: "/images/banner16.jpg", href: null },
  { id: 2, title: "Register Complaint of Unauthorized Transaction", src: "/images/banner13.jpg", href: "https://crh.sbi.bank.in" },
  { id: 3, title: "Publicizing the centralized number series 1600", src: "/images/banner29.jpg", href: null },
  { id: 4, title: "SBI Mutual Fund", src: "/images/banner1.jpg", href: null },
  { id: 5, title: "PM-Vidyalaxmi Scheme", src: "/images/banner3.jpg", href: "https://sbi.bank.in/web/personal-banking/sbi-pm-vidyalaxmi" },
  { id: 6, title: "SBISSL Banner", src: "/images/banner15.jpg", href: null },
  { id: 7, title: "Loan Against Mutual Fund", src: "/images/banner16.jpg", href: null },
  { id: 8, title: "SBI Card", src: "/images/banner13.jpg", href: null },
  { id: 9, title: "Digital eRupee", src: "/images/banner29.jpg", href: null },
  { id: 10, title: "PSB", src: "/images/banner1.jpg", href: null },
  { id: 11, title: "SBI PMJJBY-PMSBY Schemes", src: "/images/banner3.jpg", href: null },
  { id: 12, title: "DICGC", src: "/images/banner15.jpg", href: null },
  { id: 13, title: "RESERVE BANK-INTEGRATED OMBUDSMAN SCHEME", src: "/images/banner16.jpg", href: null },
  { id: 14, title: "RBI-Integrated Ombudsman Scheme", src: "/images/banner13.jpg", href: null },
  { id: 15, title: "MEET ALL OF YOUR BANKING AND FINANCIAL NEEDS", src: "/images/banner29.jpg", href: null },
  { id: 16, title: "BEWARE OF CYBER FRAUDS!", src: "/images/banner1.jpg", href: null },
  { id: 17, title: "BEWARE OF CYBER FRAUDS!", src: "/images/banner3.jpg", href: null }
];

export default function LandingPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Marquee controls
  const [marqueeScrolling, setMarqueeScrolling] = useState(true);

  // Carousel controls
  const [currentSlide, setCurrentSlide] = useState(16); // Match default active slide (BEWARE OF CYBER FRAUDS! - 16)
  const [carouselPlaying, setCarouselPlaying] = useState(true);

  // Useful links collapse state
  const [linksExpanded, setLinksExpanded] = useState(false);
  const [showGovSchemes, setShowGovSchemes] = useState(false);

  // Auto scroll carousel effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (carouselPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % carouselBanners.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [carouselPlaying]);

  const toggleDropdown = (menu: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openDropdown === menu) {
      setOpenDropdown(null);
      setOpenSubmenu(null);
    } else {
      setOpenDropdown(menu);
      setOpenSubmenu(null);
    }
  };

  const toggleSubmenu = (submenu: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openSubmenu === submenu) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(submenu);
    }
  };

  const handleDocumentClick = () => {
    setOpenDropdown(null);
    setOpenSubmenu(null);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', handleDocumentClick);
      return () => {
        window.removeEventListener('click', handleDocumentClick);
      };
    }
  }, []);

  return (
    <div className="relative" style={{ background: '#fcfdff', minHeight: '100vh' }}>
      
      {/* Header layout */}
      <header className="auth-landing-header">
        <div className="auth-landing-logo-left">
          <a href="/" title="Logo" aria-label="SBI Logo">
            <img src="/images/logo.png" alt="SBI Logo" />
          </a>
        </div>
        <div className="flex items-center">
          <a href="#mainContent" className="auth-landing-skip-link">Skip to main content</a>
          <div className="auth-landing-logo-right">
            <img src="/images/yono-logo.png" alt="YONO SBI Logo" />
          </div>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="auth-landing-navbar" aria-label="Main menu">
        <ul className="auth-landing-nav-list">
          
          {/* Services */}
          <li className="auth-landing-nav-item">
            <a 
              className="auth-landing-nav-link" 
              onClick={(e) => toggleDropdown('services', e)}
            >
              Services <span className="sub-arrow-down" />
            </a>
            {openDropdown === 'services' && (
              <div className="auth-landing-dropdown">
                <a className="auth-landing-dropdown-item" href="https://retail.sbi.bank.in/npersonal/sbi_home.html">
                  Personal Internet Banking
                </a>
                <a className="auth-landing-dropdown-item" href="https://corp.sbi.bank.in/corporate/sbi/sbi_home.html">
                  Corporate Internet Banking
                </a>
                <div 
                  className="auth-landing-dropdown-item cursor-pointer"
                  onClick={(e) => toggleSubmenu('mobile-banking', e)}
                >
                  <span>Mobile Banking</span>
                  <span className="sub-arrow-right" />
                  {openSubmenu === 'mobile-banking' && (
                    <div className="auth-landing-nested-submenu">
                      <a className="auth-landing-dropdown-item" href="https://mobilityretail.sbi/sbf_retail.html" target="_blank" rel="noopener noreferrer">
                        yono LITE
                      </a>
                      <a className="auth-landing-dropdown-item" href="https://mobilityretail.sbi/sbf_corporate.html" target="_blank" rel="noopener noreferrer">
                        yono BUSINESS
                      </a>
                    </div>
                  )}
                </div>
                <a className="auth-landing-dropdown-item" href="https://www.sbipayments.com/" target="_blank" rel="noopener noreferrer">
                  SBI Payments
                </a>
                <a className="auth-landing-dropdown-item" href="https://retail.sbi.bank.in/npersonal/tax_retail.html" target="_blank" rel="noopener noreferrer">
                  Online Tax / Payment / Receipt / Challan printing
                </a>
              </div>
            )}
          </li>

          {/* FAQ */}
          <li className="auth-landing-nav-item">
            <a 
              className="auth-landing-nav-link" 
              onClick={(e) => toggleDropdown('faq', e)}
            >
              FAQ <span className="sub-arrow-down" />
            </a>
            {openDropdown === 'faq' && (
              <div className="auth-landing-dropdown">
                <a className="auth-landing-dropdown-item" href="https://retail.sbi.bank.in/npersonal/faq.html">
                  Personal Banking FAQ
                </a>
                <a className="auth-landing-dropdown-item" href="https://corp.sbi.bank.in/corporate/sbi/corp_faq.html">
                  Corporate Banking FAQ
                </a>
                <a className="auth-landing-dropdown-item" href="https://mobilityretail.sbi/sbustaticweb/mobile/faq.html">
                  Yono LITE FAQ
                </a>
                <a className="auth-landing-dropdown-item" href="https://mobilityretail.sbi/sbijava/mobile/sbsecure_otp_app_faq.html">
                  State Bank Secure OTP App
                </a>
              </div>
            )}
          </li>

          {/* Corporate Website */}
          <li className="auth-landing-nav-item">
            <a className="auth-landing-nav-link" href="https://sbi.bank.in/">
              Corporate Website
            </a>
          </li>

          {/* SBIePay Lite */}
          <li className="auth-landing-nav-item">
            <a 
              className="auth-landing-nav-link" 
              onClick={(e) => toggleDropdown('epay', e)}
            >
              SBIePay Lite <span style={{ fontSize: '8px', verticalAlign: 'middle', marginLeft: '2px' }}>(SBMOPS)</span> <span className="sub-arrow-down" />
            </a>
            {openDropdown === 'epay' && (
              <div className="auth-landing-dropdown">
                <a className="auth-landing-dropdown-item" href="https://merchant.sbi.bank.in/mopsprelogin/mopsremittanceform.htm" target="_blank" rel="noopener noreferrer">
                  Branch Challan(CP)/Reprint Remittance Form
                </a>
                <a className="auth-landing-dropdown-item" href="https://merchant.sbi.bank.in/mopsprelogin/mopsBilldeskCancelTransaction.htm" target="_blank" rel="noopener noreferrer">
                  For Cancel RTGS/NEFT/BRANCH Transactions (CP)
                </a>
                <a className="auth-landing-dropdown-item" href="https://merchant.sbi.bank.in/mopsprelogin/mopsRtgsNeftChallanDownload.htm" target="_blank" rel="noopener noreferrer">
                  RTGS-NEFT PAP Challan Reprint Form (CP)
                </a>
                <a className="auth-landing-dropdown-item" href="https://retail.sbi.bank.in/npersonal/tax_retail.html" target="_blank" rel="noopener noreferrer">
                  Online Tax / Payment / Receipt / Challan printing
                </a>
                <a className="auth-landing-dropdown-item" href="https://merchant.sbi.bank.in/sbijava/sbiepaylite/html/payment_gateway_charges.html" target="_blank" rel="noopener noreferrer">
                  Payment Gateway Charges
                </a>
              </div>
            )}
          </li>

          {/* Donations */}
          <li className="auth-landing-nav-item">
            <a className="auth-landing-nav-link" href="https://sbi.bank.in/web/personal-banking/donations" target="_blank" rel="noopener noreferrer">
              Donations
            </a>
          </li>

          {/* SB Collect */}
          <li className="auth-landing-nav-item">
            <a className="auth-landing-nav-link" href="https://onlinesbi.sbi.bank.in/sbicollect/icollecthome.htm">
              SB Collect
            </a>
          </li>

          {/* Videos */}
          <li className="auth-landing-nav-item">
            <a className="auth-landing-nav-link" href="#" onClick={(e) => e.preventDefault()}>
              Videos
            </a>
          </li>

          {/* Apply for SB/ Current Account */}
          <li className="auth-landing-nav-item">
            <a 
              className="auth-landing-nav-link" 
              onClick={(e) => toggleDropdown('apply-account', e)}
            >
              Apply for SB/ Current Account <span className="new-blink-badge">New</span> <span className="sub-arrow-down" />
            </a>
            {openDropdown === 'apply-account' && (
              <div className="auth-landing-dropdown">
                <div 
                  className="auth-landing-dropdown-item cursor-pointer"
                  onClick={(e) => toggleSubmenu('savings-account', e)}
                >
                  <span>Savings Bank Account <span className="new-blink-badge">New</span></span>
                  <span className="sub-arrow-right" />
                  {openSubmenu === 'savings-account' && (
                    <div className="auth-landing-nested-submenu">
                      <Link className="auth-landing-dropdown-item" href="/web/personal-banking/accounts/saving-account">
                        Open Savings Account (Video KYC) <span className="new-blink-badge">New</span>
                      </Link>
                      <a className="auth-landing-dropdown-item" href="https://nridigital.sbi.bank.in">
                        for NRE/NRO
                      </a>
                    </div>
                  )}
                </div>
                <div 
                  className="auth-landing-dropdown-item cursor-pointer"
                  onClick={(e) => toggleSubmenu('current-account', e)}
                >
                  <span>Current Account</span>
                  <span className="sub-arrow-right" />
                  {openSubmenu === 'current-account' && (
                    <div className="auth-landing-nested-submenu">
                      <a className="auth-landing-dropdown-item" href="https://corp.sbi.bank.in/oaorevamp/oaolanding.htm">
                        Current Account
                      </a>
                      <a className="auth-landing-dropdown-item" href="https://corp.sbi.bank.in/vkyccao/vkycoaolanding.htm">
                        Current Account through VKYC
                      </a>
                      <a className="auth-landing-dropdown-item" href="https://corp.sbi.bank.in/mcaoao/mcaaccopening.htm">
                        MCA Current Account
                      </a>
                    </div>
                  )}
                </div>
                <a className="auth-landing-dropdown-item" href="https://retail.sbi.bank.in/npersonal/reg_forms.html" target="_blank" rel="noopener noreferrer">
                  Banking Forms
                </a>
              </div>
            )}
          </li>

          {/* NPS */}
          <li className="auth-landing-nav-item">
            <a 
              className="auth-landing-nav-link" 
              onClick={(e) => toggleDropdown('nps', e)}
            >
              NPS <span className="sub-arrow-down" />
            </a>
            {openDropdown === 'nps' && (
              <div className="auth-landing-dropdown">
                <a className="auth-landing-dropdown-item" href="https://retail.sbi.bank.in/npscorp/npsCorporateRegistration.htm" target="_blank" rel="noopener noreferrer">
                  Corporate Employee Registration
                </a>
              </div>
            )}
          </li>

          {/* SBI Unipay */}
          <li className="auth-landing-nav-item">
            <a className="auth-landing-nav-link" href="https://customer.sbiunipay.sbi.bank.in/CustomerPortal/quickPay" target="_blank" rel="noopener noreferrer">
              SBI Unipay
            </a>
          </li>

          {/* SBI Loans */}
          <li className="auth-landing-nav-item">
            <a 
              className="auth-landing-nav-link" 
              onClick={(e) => toggleDropdown('loans', e)}
            >
              SBI Loans <span className="new-blink-badge">New</span> <span className="sub-arrow-down" />
            </a>
            {openDropdown === 'loans' && (
              <div className="auth-landing-dropdown">
                <a className="auth-landing-dropdown-item" href="https://retail.sbi.bank.in/lamf/mflanding.htm" target="_blank" rel="noopener noreferrer">
                  Loan Against Mutual Fund <span className="new-blink-badge">New</span>
                </a>
                <a className="auth-landing-dropdown-item" href="https://merchant.onlinesbi.sbi/npcimandatecug/emandateloanregistration.htm" target="_blank" rel="noopener noreferrer">
                  E - Mandate
                </a>
                <a className="auth-landing-dropdown-item" href="https://homeloans.sbi.bank.in/" target="_blank" rel="noopener noreferrer">
                  Home Loan
                </a>
                <a className="auth-landing-dropdown-item" href="https://emudra.sbi.bank.in:8044/emudra" target="_blank" rel="noopener noreferrer">
                  e-MUDRA
                </a>
                <a className="auth-landing-dropdown-item" href="https://sbi.bank.in/web/personal-banking/loans/gold-loan" target="_blank" rel="noopener noreferrer">
                  Gold Loan
                </a>
                <a className="auth-landing-dropdown-item" href="https://sbi.bank.in/web/personal-banking/loans/auto-loans" target="_blank" rel="noopener noreferrer">
                  Vehicle Loan
                </a>
                <a className="auth-landing-dropdown-item" href="https://onlineapply.sbi.bank.in/personal-banking/personal-loan" target="_blank" rel="noopener noreferrer">
                  Xpress Credit
                </a>
                <a className="auth-landing-dropdown-item" href="https://onlineapply.sbi.bank.in/personal-banking/pension-loan" target="_blank" rel="noopener noreferrer">
                  Pension Loan
                </a>
                <a className="auth-landing-dropdown-item" href="https://corp.sbi.bank.in/retfinavailod/hulretailerinitial.htm">
                  Retailer Finance
                </a>
              </div>
            )}
          </li>

          {/* Update KYC */}
          <li className="auth-landing-nav-item">
            <a className="auth-landing-nav-link" href="https://cdnweb.onlineyono.sbi.bank.in/accounts/re-kyc/kyc-entry?srcChn=RINB" target="_blank" rel="noopener noreferrer">
              Update KYC <span className="new-blink-badge">New</span>
            </a>
          </li>

        </ul>

        {/* Change Language */}
        <div className="auth-landing-lang-wrap">
          <a className="auth-landing-lang-link" href="hindi/sbi_home.html">
            हिंदी
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main id="mainContent" className="landing-main-wrapper">
        
        {/* Disclaimer / Alert Box */}
        <div className="disclaimer-box" id="disclaimerBox">
          <span className="disclaimer-blink">
            If slowness is observed during Login Page loading, please refresh the page for better experience.
          </span>
          <div className="disclaimer-subtext">
            SBI never asks for confidential information such as PIN and OTP from customers. Any such call can be made only by a fraudster. Please do not share personal info.
          </div>
        </div>

        {/* Marquee / Scrolling announcement */}
        <div className="marquee-container" id="wpanel_users">
          <button 
            className="marquee-playpause-btn"
            onClick={() => setMarqueeScrolling(prev => !prev)}
            aria-label={marqueeScrolling ? "Pause scrolling announcement" : "Play scrolling announcement"}
          >
            {marqueeScrolling ? "Ⅱ" : "▶"}
          </button>
          <div className="marquee-wrapper">
            <p 
              className="marquee-text" 
              id="message"
              style={{ animationPlayState: marqueeScrolling ? 'running' : 'paused' }}
            >
              SBI Authenticator App is now LIVE for our YONo Net-banking! Download and Log in SBI Authenticator App to enable YONO Net-banking for getting OTPs on SBI Authenticator App.
            </p>
          </div>
        </div>

        {/* Banking Cards (Personal & Corporate) */}
        <div className="banking-boxes-grid" id="bankingBoxes">
          
          {/* Personal Banking Card */}
          <div className="banking-box-card">
            <div>
              <div className="banking-box-logo">
                <img src="/images/yono_netbanking.png" alt="Yono Netbanking" />
              </div>
              <h1 style={{ margin: 0 }}>
                <a href="https://retail.sbi.bank.in/npersonal/sbi_home.html" className="banking-box-title">
                  <span>PERSONAL</span> BANKING
                </a>
              </h1>

              <div className="text-center">
                <Link href="/auth/security" className="banking-box-login-btn">
                  <span>LOGIN</span>
                  <img src="/images/arrow.png" alt="Personal Login" />
                </Link>
              </div>
            </div>

            <div>
              {/* Icon links */}
              <div className="banking-box-icon-links">
                <a className="banking-icon-link-item register" href="javascript:void(0);">
                  <span className="banking-icon-link-label">New User Registration / Activation</span>
                </a>
                <a className="banking-icon-link-item how" href="help_personal.html" target="_blank" rel="noopener noreferrer">
                  <span className="banking-icon-link-label">How Do I</span>
                </a>
                <a className="banking-icon-link-item customer" href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer">
                  <span className="banking-icon-link-label">Customer Care - Personal</span>
                </a>
                <a className="banking-icon-link-item unlock" href="javascript:void(0);">
                  <span className="banking-icon-link-label">Lock & Unlock User</span>
                </a>
              </div>

              <p className="banking-box-desc-bottom">
                SBI&apos;s internet banking portal provides personal banking services that gives you complete control over all your banking demands online.
              </p>
            </div>
          </div>

          {/* Corporate Banking Card */}
          <div className="banking-box-card">
            <div>
              <div className="banking-box-logo">
                <img src="/images/ybbi_corp.png" alt="yono BUSINESS" />
              </div>
              <h2 style={{ margin: 0 }}>
                <a href="https://yonobusiness.sbi.bank.in/" className="banking-box-title">
                  <span>CORPORATE</span> BANKING
                </a>
              </h2>

              <div className="text-center">
                <a href="https://yonobusiness.sbi.bank.in/" className="banking-box-login-btn">
                  <span>LOGIN</span>
                  <img src="/images/arrow.png" alt="Corporate Login" />
                </a>
              </div>
              
              <p className="banking-box-desc-top">
                Have you tried our new simplified and intuitive business banking platform? Log in to yonobusiness.sbi.bank.in to avail business banking services.
              </p>
            </div>

            <div>
              {/* Icon links */}
              <div className="banking-box-icon-links banking-box-corp-links">
                <a className="banking-icon-link-item register" href="https://yonobusiness.sbi.bank.in/preonboard/landing/registration" target="_blank" rel="noopener noreferrer">
                  <span className="banking-icon-link-label">New Corporate Registration</span>
                </a>
                <a className="banking-icon-link-item how" href="https://corp.sbi.bank.in/ybbihelp/help_corporate.html" target="_blank" rel="noopener noreferrer">
                  <span className="banking-icon-link-label">How Do I</span>
                </a>
                <a className="banking-icon-link-item customer" href="https://yonobusiness.sbi.bank.in/ContactUs" target="_blank" rel="noopener noreferrer">
                  <span className="banking-icon-link-label">Customer Care - Corporate</span>
                </a>
              </div>

              <p className="banking-box-desc-bottom">
                Corporate Banking application to administer and manage non personal accounts online.
              </p>
            </div>
          </div>

        </div>

        {/* Useful Links Section */}
        <div className="useful-links-section" id="useful-links">
          <div className="useful-links-grid">
            <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> Register Complaint of Unauthorized Transaction <sup className="new-blink-badge">New</sup>
            </a>
            <a href="https://qms.sbi.bank.in/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> QMS (e-Appointment)
            </a>
            <a href="https://rbiretaildirect.org.in" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> RBI Retail Direct portal
            </a>
            <a href="https://retail.sbi.bank.in/retail/blockatmcardintermediate.htm" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> Block ATM Card
            </a>
            <a href="https://retail.sbi.bank.in/npersonal/reg_forms.html" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> Banking Forms
            </a>
            <a href="https://www.psballiance.com/doorstep-banking.html" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> Doorstep Banking
            </a>
            <a href="https://www.sbigeneral.in/portal/downloads" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI General Insurance Document Download
            </a>
            <a href="https://fastag.sbi.bank.in/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI FasTag
            </a>
            <a href="https://sbi.bank.in/web/salary-account" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI Salary Account
            </a>
            <a href="https://sbi.bank.in/web/nri/home" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> NRI Services
            </a>
            <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> CYBER CRIME HELPLINE
            </a>
            <a href="https://www.sbisecurities.in/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI Securities
            </a>
            <a href="https://remit.sbi/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI Express Remit
            </a>
            <a href="https://www.sbimf.com" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI Mutual Fund
            </a>
            <a href="https://www.sbilife.co.in" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI Life Insurance
            </a>
            <a href="http://www.sbicard.com/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
              <span>›</span> SBI Card
            </a>

            {/* Collapsed items */}
            {linksExpanded && (
              <>
                <a href="https://www.onlinesbiglobal.com/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> OnlineSBI Global
                </a>
                <a href="https://prepaid.sbi.bank.in/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> Foreign Travel/EZ-Pay/Gift/Prepaid Cards
                </a>
                <a href="http://www.sbigeneral.in" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> SBI General Insurance
                </a>
                <a href="https://cmp.sbi.bank.in/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> Cash Management Product
                </a>
                <a href="https://rewardz.sbi.bank.in/" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> State Bank Loyalty Rewardz
                </a>
                <a href="https://onlinesbi.sbi.bank.in/documents/GSTN.pdf" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> GSTN Updation
                </a>
                <a href="https://nxtgengbss.sbi.bank.in/gbss/cust-login" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> eSBTR Challan Generation
                </a>
                <a href="https://sbicaptrustee.in" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> SBICAP Trustee Company My WILL Services
                </a>
                <a href="https://www.sbiepay.sbi" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> Loan Repayment via Digital Mode (ePay)
                </a>
                <a href="https://sbi.bank.in/web/business/sme/current-accounts" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> Current Account
                </a>
                <a href="https://sbi.bank.in/web/personal-banking/misc/bharat-aadhaar-seeding-enabler" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> Aadhaar Seeding Service: BASE
                </a>
                <a href="https://onlinesbi.sbi.bank.in/documents/Fair_Lending_Code.pdf" target="_blank" rel="noopener noreferrer" className="useful-links-link">
                  <span>›</span> Fair Lending Practice Code
                </a>
                <div className="useful-links-link">
                  <span onClick={() => setShowGovSchemes(!showGovSchemes)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
                    <span>›</span> Government Schemes
                  </span>
                  {showGovSchemes && (
                    <ul className="gov-schemes-sublinks">
                      <li><a href="https://jansuraksha.in" target="_blank">Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)</a></li>
                      <li><a href="https://jansuraksha.in" target="_blank">Pradhan Mantri Suraksha Bima Yojana (PMSBY)</a></li>
                    </ul>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="btnCollapseWrap">
            <button 
              onClick={() => setLinksExpanded(!linksExpanded)}
              className="useful-links-collapse-btn"
            >
              <span>{linksExpanded ? "▴" : "▾"}</span>
              <span>{linksExpanded ? "Show Less" : "More Useful Links"}</span>
            </button>
          </div>
        </div>

        {/* Banner Carousel */}
        <div className="banner-carousel-container" id="sbihome-banner-carousel">
          <div className="banner-carousel-inner">
            {carouselBanners.map((slide, idx) => (
              <div 
                key={slide.id} 
                className={`banner-slide${idx === currentSlide ? " active" : ""}`}
              >
                {slide.href ? (
                  <a href={slide.href} target="_blank" rel="noopener noreferrer">
                    <img src={slide.src} title={slide.title} alt={slide.title} />
                  </a>
                ) : (
                  <img src={slide.src} title={slide.title} alt={slide.title} />
                )}
              </div>
            ))}

            {/* Prev/Next buttons */}
            <button 
              className="carousel-control-prev" 
              onClick={() => setCurrentSlide(prev => (prev - 1 + carouselBanners.length) % carouselBanners.length)}
            >
              ‹
            </button>
            <button 
              className="carousel-control-next" 
              onClick={() => setCurrentSlide(prev => (prev + 1) % carouselBanners.length)}
            >
              ›
            </button>

            {/* Indicators */}
            <div className="carousel-indicators-custom">
              <button 
                className="carousel-play-btn"
                onClick={() => setCarouselPlaying(prev => !prev)}
              >
                {carouselPlaying ? "Ⅱ" : "▶"}
              </button>
              {carouselBanners.map((slide, idx) => (
                <button
                  key={slide.id}
                  className={`carousel-dot${idx === currentSlide ? " active" : ""}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer layout */}
        <footer className="landing-footer" id="footer">
          <div className="landing-footer-copy">
            <p>© State Bank of India (APM Id:Serv_Tran_564)</p>
          </div>
          
          <nav className="landing-footer-social" aria-label="Social media links">
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/StateBankofIndia">
              <span className="landing-footer-social-icon" id="icon_linkfb">&nbsp;</span>
              <span>Facebook</span>
            </a>
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="https://twitter.com/TheOfficialSBI">
              <span className="landing-footer-social-icon" id="icon_linktw">&nbsp;</span>
              <span>Twitter</span>
            </a>
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="http://www.youtube.com/theofficialsbi">
              <span className="landing-footer-social-icon" id="icon_linkyt">&nbsp;</span>
              <span>YouTube</span>
            </a>
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/state-bank-of-india/">
              <span className="landing-footer-social-icon" id="icon_linklindn">&nbsp;</span>
              <span>LinkedIn</span>
            </a>
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="https://instagram.com/theofficialsbi/">
              <span className="landing-footer-social-icon" id="icon_linkinst">&nbsp;</span>
              <span>Instagram</span>
            </a>
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/TheOfficialSBI/">
              <span className="landing-footer-social-icon" id="icon_linkpint">&nbsp;</span>
              <span>Pinterest</span>
            </a>
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="https://retail.sbi.bank.in/npersonal/contact_us.html">
              <span className="landing-footer-social-icon" id="icon_contus" style={{ background: '#777', borderRadius: '50%' }}>&nbsp;</span>
              <span>Contact Us</span>
            </a>
            <a className="landing-footer-social-link" target="_blank" rel="noopener noreferrer" href="https://sbi.bank.in/web/personal-banking/digital/whatsapp-banking">
              <span className="landing-footer-social-icon" id="icon_whatsapp" style={{ background: '#25D366', borderRadius: '50%' }}>&nbsp;</span>
              <span>Whatsapp Banking</span>
            </a>
          </nav>

          <div className="landing-footer-view">
            <p>Site best viewed at 1280 × 720 resolution in Microsoft Edge 100+, Mozilla 100+, Google Chrome 111+</p>
          </div>
        </footer>

      </main>

      {/* Floating social bar on right */}
      <div className="floating-social-sidebar">
        {[
          { label: 'f', bg: '#3b5998', href: 'https://www.facebook.com/StateBankofIndia' },
          { label: '𝕏', bg: '#000000', href: 'https://twitter.com/TheOfficialSBI' },
          { label: '▶', bg: '#ff0000', href: 'http://www.youtube.com/theofficialsbi' },
          { label: 'in', bg: '#0077b5', href: 'https://www.linkedin.com/company/state-bank-of-india/' },
          { label: '📷', bg: '#e1306c', href: 'https://instagram.com/theofficialsbi/' },
          { label: 'P', bg: '#e60023', href: 'https://www.pinterest.com/TheOfficialSBI/' },
          { label: '📞', bg: '#007cc3', href: 'https://retail.sbi.bank.in/npersonal/contact_us.html' },
          { label: '💬', bg: '#25D366', href: 'https://sbi.bank.in/web/personal-banking/digital/whatsapp-banking' }
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: social.bg }}
            className="floating-social-sidebar-item"
          >
            {social.label}
          </a>
        ))}
      </div>

    </div>
  )
}
