'use client'

import React, { useState } from 'react';
import Header from '@/components/sbi-home/Header';
import Footer from '@/components/sbi-home/Footer';
import StickyFooterBar from '@/components/sbi-home/StickyFooterBar';
import '@/app/sbi-home.css';
import './saving-account.css';

interface AccountProduct {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  icon: string;
  features: string;
  eligibility: string;
  terms: string;
}

const productsData: AccountProduct[] = [
  {
    id: '0',
    title: 'Savings Account through Video KYC',
    subtitle: 'Savings Account through Video KYC',
    href: '/accounts/open-savings-account',
    icon: '/o/SBI-Theme/images/custom/icons/basic_saving_account.png',
    features: 'Open a fully functional savings account online using Video call verification. 100% paperless onboarding, instant activation of account and digital banking services. Generates an instant Classic Debit Card.',
    eligibility: 'Resident Indian individuals of age 18 years and above. Must possess a valid Aadhaar Number and physical PAN Card. Not applicable for joint accounts.',
    terms: 'Only single mode of operation. Video KYC verification must be successfully completed within 15 days of initiation, else application will be canceled.',
  },
  {
    id: '1',
    title: 'Basic Saving Bank Deposit Account Branch Channel',
    subtitle: 'Basic Saving Bank Deposit Account Branch Channel',
    href: '/web/personal-banking/accounts/saving-account/basic-saving-bank-deposit-account-branch-channel',
    icon: '/o/SBI-Theme/images/custom/icons/basic_saving_account.png',
    features: 'Basic banking savings account initiated online and verified at a branch. Free basic ATM-cum-Debit card.',
    eligibility: 'All resident individuals. Available for single or joint operation.',
    terms: 'No minimum balance requirement. Max 4 free withdrawals per month. Cannot maintain any other Savings account in SBI.',
  },
  {
    id: '2',
    title: 'Basic Savings Bank Deposit Account',
    subtitle: 'Basic Savings Bank Deposit Account',
    href: '/web/personal-banking/accounts/saving-account/basic-savings-bank-deposit-account',
    icon: '/o/SBI-Theme/images/custom/icons/basic_saving_account.png',
    features: 'Simple, zero balance account for all segments, free basic ATM-cum-Debit card. No minimum balance requirement.',
    eligibility: 'Any individual with valid KYC documents. Can be opened singly, jointly, or by parent/guardian for minors.',
    terms: 'Zero minimum balance. Accounts in other banks must be closed. Maximum 4 withdrawals monthly allowed via any channel.',
  },
  {
    id: '3',
    title: 'Basic Savings Bank Deposit Small Account',
    subtitle: 'Basic Savings Bank Deposit Small Account',
    href: '/web/personal-banking/accounts/saving-account/basic-savings-bank-deposit-small-account',
    icon: '/o/SBI-Theme/images/custom/icons/small_account.png',
    features: 'Easy zero-balance account for people without official KYC documents. Liberalized document rules for onboarding.',
    eligibility: 'Resident individuals above 18 years who do not possess Officially Valid Documents (OVD) for KYC.',
    terms: 'Maximum balance capped at ₹50,000. Total credits in a year capped at ₹1 Lakh. Total withdrawals in a month capped at ₹10,000.',
  },
  {
    id: '4',
    title: 'Savings Bank Account',
    subtitle: 'Savings Bank Account',
    href: '/web/personal-banking/accounts/saving-account/savings-bank-account',
    icon: '/o/SBI-Theme/images/custom/icons/savings-bank-acc.png',
    features: 'Standard SBI Savings Bank Account. Wide network, internet/mobile banking, nomination, safe deposit locker facilities.',
    eligibility: 'Resident individuals, joint accounts, minors, clubs, associations, and HUF.',
    terms: 'Currently zero Minimum Average Balance (MAB) required. Standard transaction fees apply for checkbooks and other value-added services.',
  },
  {
    id: '5',
    title: 'Savings Account for Minors',
    subtitle: 'Savings Account for Minors',
    href: '/web/personal-banking/accounts/saving-account/savings-account-for-minors',
    icon: '/o/SBI-Theme/images/custom/icons/savings_account_for_minors.png',
    features: 'Accounts for children (Pehla Kadam and Pehli Udaan) to teach money management. Internet and mobile banking with transaction limits.',
    eligibility: 'Minors under 18 years. Pehla Kadam is jointly with parent/guardian. Pehli Udaan is singly for minors above 10 years who can sign.',
    terms: 'Capped withdrawal limits (₹5,000 per day), specially designed child debit cards. Parents can track transactions.',
  },
  {
    id: '6',
    title: 'Savings Plus Account',
    subtitle: 'Savings Plus Account',
    href: '/web/personal-banking/accounts/saving-account/savings-plus-account',
    icon: '/o/SBI-Theme/images/custom/icons/savings_plus_account.png',
    features: 'Multi Option Deposit (MOD) linked savings account. Surplus funds above a threshold are automatically transferred to term deposits.',
    eligibility: 'Resident individuals eligible for standard savings accounts.',
    terms: 'Threshold limit for MOD transfer is ₹35,000. Minimum MOD creation amount is ₹10,000. MOD deposits can be broken in units of ₹1,000.',
  },
  {
    id: '7',
    title: 'Motor Accidents Claim Account (MACT)',
    subtitle: 'Motor Accidents Claim Account (MACT)',
    href: '/web/personal-banking/accounts/saving-account/motor-accidents-claim-account-mact',
    icon: '/o/SBI-Theme/images/custom/icons/mact_sb_account.png',
    features: 'Special savings account for receiving compensation money awarded by Motor Accident Claims Tribunals (MACT).',
    eligibility: 'Victims of motor accidents or their legal heirs as designated by the tribunal.',
    terms: 'No checkbook, no internet banking, no debit card except in special cases. Strict withdrawal rules based on court orders.',
  },
  {
    id: '8',
    title: 'Resident Foreign Currency (Domestic) Account',
    subtitle: 'Resident Foreign Currency (Domestic) Account',
    href: '/web/personal-banking/accounts/saving-account/resident-foreign-currency-domestic-account',
    icon: '/o/SBI-Theme/images/custom/icons/Resident-Foreign-Currency-(Domestic)-Account.png',
    features: 'Maintain foreign currency account in India (USD, GBP, EUR) for foreign exchange received through repatriation, travel residue, or gifts.',
    eligibility: 'Resident Indian individuals.',
    terms: 'Interest is paid in foreign currency, checkbooks and debit cards are not issued. Subject to FEMA rules.',
  },
  {
    id: '9',
    title: 'Download Account Opening Form',
    subtitle: 'Download Account Opening Form',
    href: '/documents/16012/38550822/241123-Common+Deposit+Account+Opening+Form_+English.pdf',
    icon: '/o/SBI-Theme/images/custom/icons/no_image.png',
    features: 'Downloadable PDF version of the standard common deposit account opening form (AOF) for printing and offline branch submission.',
    eligibility: 'Anyone who wants to open a branch account physically.',
    terms: 'Print on paper, fill with pen, attach physical passport photo and self-attested KYC documents, and submit to branch.',
  }
];

interface InterestRateInfo {
  rate: string;
  subRate?: string;
  wef?: string;
  note: string;
  noteUrl?: string;
  seeProductsUrl: string;
  applyNowUrl?: string;
}

const interestRatesData: Record<string, InterestRateInfo> = {
  '0': {
    rate: '7.25%*',
    subRate: ' p.a. onwards',
    wef: 'w.e.f. 01.04.2026',
    note: '*T&C Apply.',
    noteUrl: '/web/interest-rates/interest-rates/loan-schemes-interest-rates/home-loans-interest-rates-current',
    seeProductsUrl: 'https://homeloans.sbi.bank.in',
    applyNowUrl: 'https://raas.sbi.bank.in/home-loan'
  },
  '1': {
    rate: 'Start From',
    subRate: ' 10.00% p.a.*',
    note: '*T&C Apply.',
    seeProductsUrl: '/web/personal-banking/loans/personal-loans',
    applyNowUrl: 'https://onlineapply.sbi.bank.in/personal-banking/personal-loan'
  },
  '2': {
    rate: 'Start From',
    subRate: ' 11.60% p.a.*',
    note: '*T&C Apply.',
    seeProductsUrl: '/web/personal-banking/loans/loans-to-pensioners'
  },
  '3': {
    rate: '2.50%',
    subRate: ' p.a.',
    wef: 'w.e.f 15.06.2025',
    note: '*T&C Apply.',
    seeProductsUrl: '/web/personal-banking/accounts/saving-account/savings-bank-account'
  },
  '4': {
    rate: 'Starts From 9.15%*',
    note: 'SBI Gold Loan. *T & C Apply',
    seeProductsUrl: '/web/personal-banking/loans/gold-loan',
    applyNowUrl: 'https://onlineapply.sbi.bank.in/personal-banking/gold-loan'
  },
  '5': {
    rate: '2.50%',
    subRate: ' p.a.',
    wef: 'w.e.f. 15.06.2025',
    note: '*T&C Apply.',
    seeProductsUrl: '/web/nri/accounts',
    applyNowUrl: '/web/nri/nri-callback'
  },
  '6': {
    rate: '6.90%',
    subRate: ' p.a.*',
    note: '*T&C Apply.',
    seeProductsUrl: '/web/personal-banking/loans/education-loans',
    applyNowUrl: 'https://pmvidyalaxmi.co.in/'
  },
  '7': {
    rate: '8.70%',
    subRate: ' p.a.',
    note: '*T&C Apply.',
    seeProductsUrl: '/web/personal-banking/loans/auto-loans',
    applyNowUrl: 'https://raas.sbi.bank.in/auto-loan'
  },
  '8': {
    rate: '6.95%',
    subRate: ' (2 - 3 yrs)',
    note: '7.05%* (5 - 10 yrs). *T & C Applied',
    seeProductsUrl: '/web/interest-rates/deposit-rates/retail-domestic-term-deposits'
  },
  '9': {
    rate: '5.75% p.a.',
    subRate: ' (up to 2L)',
    note: '7.90% p.a. (> 2L to 6L). *T&C apply.',
    seeProductsUrl: '/web/personal-banking/loans/pm-surya-ghar-loan-for-solar-roof-top',
    applyNowUrl: 'https://pmsuryaghar.gov.in/'
  },
  '10': {
    rate: '9.95%',
    subRate: ' p.a.',
    wef: 'w.e.f 15.12.2025',
    note: '*T&C Apply.',
    seeProductsUrl: 'https://bank.sbi/web/personal-banking/loans/loans-against-securities/loan-against-mutual-fund-units',
    applyNowUrl: 'https://retail.onlinesbi.sbi/lamf/mflanding.htm'
  },
  '11': {
    rate: 'Agri Loans',
    subRate: ' Varies',
    note: 'Varies by product. *T&C Apply.',
    seeProductsUrl: '/web/get-business-product-information/agriculture-products'
  }
};

export default function SavingAccountPage() {
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [showCompareMatrix, setShowCompareMatrix] = useState<boolean>(false);
  const [activeRateKey, setActiveRateKey] = useState<string>('0');

  // Checkbox toggle logic
  const handleCheckboxChange = (id: string) => {
    setSelectedAccounts(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 3) {
          alert('You can select a maximum of 3 accounts for comparison.');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const removeCompareItem = (id: string) => {
    setSelectedAccounts(prev => prev.filter(item => item !== id));
  };

  const clearAllCompare = () => {
    setSelectedAccounts([]);
    setShowCompareMatrix(false);
  };

  // Quick list links
  const quickLinksData = [
    { label: 'Doorstep Banking Services', href: 'https://bank.sbi/dsb' },
    { label: 'Tools & Calculators', href: '/web/personal-banking/loans/calculators' },
    { label: 'FAQ\'s', href: '/web/customer-care/faq-s' },
    { label: 'Interest Rates', href: '/web/interest-rates/interest-rates/deposit-rates' },
    { label: 'Unauthorized Digital Transaction Reporting', href: 'https://crh.sbi.bank.in' }
  ];

  const currentRateInfo = interestRatesData[activeRateKey] || interestRatesData['0'];

  return (
    <div className="site" style={{ paddingBottom: '70px', minHeight: '100vh', background: '#fcfdff' }}>
      <Header />

      <main className="saving-account-container">
        {/* Custom Breadcrumb */}
        <div className="custombreadcrumb">
          <a href="https://sbi.bank.in/web/yono">Yono</a>
          <span className="divider">|</span>
          <span className="active">Savings Bank Account</span>
        </div>

        {/* Main 2-Column Layout */}
        <div className="sa-layout-grid">
          
          {/* Left / Main Section */}
          <div className="sa-main-content">
            <div className="landing_bg">
              {productsData.map(product => {
                const isChecked = selectedAccounts.includes(product.id);
                // Exclude the form download from compare option
                const isFormDownload = product.id === '9';

                return (
                  <div key={product.id} className="col-md-6 col-lg-4 col-xl-3 col-sm-6 float-left land_box" id={`compare_${product.id}`}>
                    <div className="card otherProd CurrentAccTileHeight CurrentAccTileHeightmob">
                      <div className="main_content">
                        {/* Compare Checkbox */}
                        {!isFormDownload && (
                          <label className="sa-compare-checkbox-label">
                            <input 
                              type="checkbox" 
                              className="sa-compare-checkbox" 
                              checked={isChecked}
                              onChange={() => handleCheckboxChange(product.id)}
                            />
                            Compare
                          </label>
                        )}

                        {/* Icon */}
                        <p className="icon_height">
                          <img alt="" className="image_path" src={product.icon} />
                        </p>

                        {/* Title link */}
                        <a href={product.href} className="otherProdIconTitle">
                          {product.title}
                        </a>

                        {/* Title text */}
                        <p className="otherProdHeading">
                          {product.subtitle}
                        </p>
                        
                        {/* Button */}
                        <p className="apply_more_btn">
                          <a className="btn btn-sm btn-sbi yellow_btn" href={product.href} aria-label={`More Information about ${product.title}`}>
                            {isFormDownload ? 'Download Form' : 'More Information'}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compare Matrix Table */}
            {showCompareMatrix && selectedAccounts.length > 0 && (
              <section className="compare-matrix-section" id="compare_records">
                <div className="compare-matrix-title">
                  <span>Product Comparison</span>
                  <button onClick={clearAllCompare} className="btn-compare-clear" style={{ padding: '4px 12px', fontSize: '12px' }}>
                    Close Comparison
                  </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="compare-table">
                    <thead>
                      <tr>
                        <th>Criteria</th>
                        {selectedAccounts.map(id => {
                          const prod = productsData.find(p => p.id === id);
                          return <th key={id}>{prod?.title}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="criteria-col">Features</td>
                        {selectedAccounts.map(id => {
                          const prod = productsData.find(p => p.id === id);
                          return <td key={id} className="product-col">{prod?.features}</td>;
                        })}
                      </tr>
                      <tr>
                        <td className="criteria-col">Eligibility</td>
                        {selectedAccounts.map(id => {
                          const prod = productsData.find(p => p.id === id);
                          return <td key={id} className="product-col">{prod?.eligibility}</td>;
                        })}
                      </tr>
                      <tr>
                        <td className="criteria-col">Terms and Conditions</td>
                        {selectedAccounts.map(id => {
                          const prod = productsData.find(p => p.id === id);
                          return <td key={id} className="product-col">{prod?.terms}</td>;
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar Section */}
          <aside className="sa-sidebar">
            
            {/* Interest Rates Selector */}
            <div className="rates-widget">
              <h2 className="rates-widget-header">Interest Rates</h2>
              
              <select 
                className="rates-select" 
                value={activeRateKey}
                onChange={(e) => setActiveRateKey(e.target.value)}
              >
                <option value="0">Home Loan</option>
                <option value="1">Personal Loan</option>
                <option value="2">Pension Loan</option>
                <option value="3">SB Account</option>
                <option value="4">Gold Loan</option>
                <option value="5">NRE SB Account</option>
                <option value="6">Education Loan</option>
                <option value="7">Auto Loan</option>
                <option value="8">Fixed Deposit</option>
                <option value="9">PM Surya Ghar</option>
                <option value="10">Loan Against MF</option>
                <option value="11">Agriculture Loans</option>
              </select>

              <div className="rate-display-box">
                <p className="rate-percentage">
                  {currentRateInfo.rate}
                  {currentRateInfo.subRate && <span>{currentRateInfo.subRate}</span>}
                </p>
                {currentRateInfo.wef && <p className="rate-wef">{currentRateInfo.wef}</p>}
                
                {currentRateInfo.noteUrl ? (
                  <p className="rate-note">
                    <a href={currentRateInfo.noteUrl} style={{ color: '#280071', textDecoration: 'underline' }}>
                      {currentRateInfo.note}
                    </a>
                  </p>
                ) : (
                  <p className="rate-note">{currentRateInfo.note}</p>
                )}
              </div>

              <div className="rates-buttons">
                <a href={currentRateInfo.seeProductsUrl} className="btn-rate-action">
                  See Products
                </a>
                {currentRateInfo.applyNowUrl ? (
                  <a href={currentRateInfo.applyNowUrl} target="_blank" rel="noopener noreferrer" className="btn-rate-action">
                    Apply Now
                  </a>
                ) : (
                  <span className="btn-rate-action" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    N/A
                  </span>
                )}
              </div>
            </div>

            {/* Quick Links Menu */}
            <div className="quicklinks-widget">
              <h3 className="quicklinks-header">Quick Links</h3>
              <ul className="quicklinks-list">
                {quickLinksData.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="quicklinks-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>
      </main>

      {/* Compare Floating Tray */}
      {selectedAccounts.length > 0 && (
        <div className="compare-sticky-bar">
          <div className="compare-tray-items">
            <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#280071', marginRight: '8px' }}>
              Compare ({selectedAccounts.length} of 3):
            </span>
            {selectedAccounts.map(id => {
              const prod = productsData.find(p => p.id === id);
              return (
                <div key={id} className="compare-tray-item">
                  <span>{prod?.title}</span>
                  <button onClick={() => removeCompareItem(id)} className="compare-tray-remove" title="Remove">
                    ×
                  </button>
                </div>
              );
            })}
          </div>
          <div className="compare-actions">
            <button onClick={clearAllCompare} className="btn-compare-clear">
              Clear All
            </button>
            <button 
              onClick={() => {
                setShowCompareMatrix(true);
                setTimeout(() => {
                  document.getElementById('compare_records')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }} 
              className="btn-compare-action"
              disabled={selectedAccounts.length < 2}
              title={selectedAccounts.length < 2 ? 'Select at least 2 accounts to compare' : ''}
            >
              Compare Now
            </button>
          </div>
        </div>
      )}

      <Footer />
      <StickyFooterBar />
    </div>
  );
}
