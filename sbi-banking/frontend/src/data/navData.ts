// Blue-bar mega-menu data. Links point to the live SBI site.
const B = '';

export interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
  lang?: string;
  active?: boolean;
}

export interface BrandLogo {
  src: string;
  alt: string;
}

export interface MegaLink {
  label: string;
  href: string;
}

export interface MegaColumn {
  heading: MegaLink;
  links: MegaLink[];
}

export interface MegaMenuItem {
  label: string;
  icon: string;
  href?: string;
  small?: boolean;
  columns: MegaColumn[] | null;
}

export const topLinks: NavLink[] = [
  { label: 'About Us', href: `${B}/web/about-us` },
  { label: 'Subsidiaries', href: `${B}/web/affiliates` },
  { label: 'Corporate Governance', href: `${B}/web/corporate-governance/corporate-governance` },
  { label: 'Investor Relations', href: `${B}/web/investor-relations/investor-relations` },
  { label: 'SBI In the News', href: `${B}/web/sbi-in-the-news` },
  { label: 'Grahak Setu', href: `${B}/web/get-business-product-information/grahak-setu`, highlight: true },
  { label: 'Feedback', href: `${B}/web/personal-banking/feedback` },
];

export const topRightLinks: NavLink[] = [
  { label: 'हिंदी', href: `${B}/c/portal/update_language?p_l_id=79460&redirect=%2Fweb%2Fpersonal-banking%2Fhome&languageId=hi_IN`, lang: 'hi' },
  { label: 'Customer Care', href: `${B}/web/customer-care/` },
  { label: 'Careers', href: `${B}/web/careers` },
];

export const primaryNav: NavLink[] = [
  { label: 'PERSONAL', href: `${B}/web/personal-banking/home`, active: true },
  { label: 'NRI', href: '#' },
  { label: 'BUSINESS', href: '#' },
  { label: 'AGRICULTURAL & RURAL', href: '#' },
  { label: 'INTERNATIONAL BANKING', href: '#' },
];

export const brandLogos: BrandLogo[] = [
  { src: '/images/wealth-logo.png', alt: 'SBI Wealth' },
  { src: '/images/sbi-green-logo.png', alt: 'SBI Green' },
  { src: '/images/chakra-logo.png', alt: 'SBI Chakra' },
  { src: '/images/yono-logo.png', alt: 'YONO SBI' },
];

export const megaMenu: MegaMenuItem[] = [
  {
    label: 'Accounts',
    icon: '/images/icons/account.png',
    columns: [
      {
        heading: { label: 'Savings Accounts', href: `${B}/web/personal-banking/accounts/saving-account` },
        links: [
          { label: 'Savings Account through Video KYC', href: `${B}/web/yono/insta-plus-savings-bank-account` },
          { label: 'Basic Savings Bank Deposit Account (Branch Channel)', href: `${B}/web/personal-banking/accounts/saving-account/basic-saving-bank-deposit-account-branch-channel` },
          { label: 'Basic Savings Bank Deposit Account', href: `${B}/web/personal-banking/accounts/saving-account/basic-savings-bank-deposit-account` },
          { label: 'Basic Savings Bank Deposit Small Account', href: `${B}/web/personal-banking/accounts/saving-account/basic-savings-bank-deposit-small-account` },
          { label: 'Savings Bank Account', href: `${B}/web/personal-banking/accounts/saving-account/savings-bank-account` },
          { label: 'Savings Account for Minors', href: `${B}/web/personal-banking/accounts/saving-account/savings-account-for-minors` },
          { label: 'Savings Plus Account', href: `${B}/web/personal-banking/accounts/saving-account/savings-plus-account` },
          { label: 'Motor Accidents Claim Account (MACT)', href: `${B}/web/personal-banking/accounts/saving-account/motor-accidents-claim-account-mact` },
          { label: 'Resident Foreign Currency (Domestic) Account', href: `${B}/web/personal-banking/accounts/saving-account/resident-foreign-currency-domestic-account` },
          { label: 'Savings Bank Rules (Abridged)', href: `${B}/web/personal-banking/accounts/saving-account/savings-bank-rulesabridged` },
        ],
      },
      {
        heading: { label: 'Salary Accounts', href: `${B}/web/salary-account/home` },
        links: [
          { label: 'Corporate / Institutions', href: `${B}/web/salary-account/corporate-salary-package` },
          { label: 'Central Government', href: `${B}/web/salary-account/central-government-salary-package` },
          { label: 'State Government', href: `${B}/web/salary-account/state-government-salary-package` },
          { label: 'Indian Railways', href: `${B}/web/salary-account/railway-salary-package` },
          { label: 'Defence Forces', href: `${B}/web/salary-account/defence-salary-package` },
          { label: 'Central Armed Police Forces', href: `${B}/web/salary-account/para-military-salary-package` },
          { label: 'Police Forces', href: `${B}/web/salary-account/police-salary-package` },
          { label: 'Coast Guard', href: `${B}/web/salary-account/indian-coast-guard-salary-package` },
          { label: 'SBI Rishtey', href: `${B}/web/salary-account/sbi-rishtey` },
        ],
      },
    ],
  },
  {
    label: 'Investments & Deposits',
    icon: '/images/icons/investments_deposits.png',
    columns: [
      {
        heading: { label: 'Deposits', href: `${B}/web/personal-banking/investments-deposits/deposits` },
        links: [
          { label: 'Har Ghar Lakhpati', href: `${B}/web/personal-banking/investments-deposits/deposits/har-ghar-lakhpati` },
          { label: 'SBI Patrons', href: `${B}/web/personal-banking/investments-deposits/deposits/sbi-patrons` },
          { label: 'SBI Green Rupee Term Deposit (SGRTD)', href: `${B}/web/personal-banking/investments-deposits/deposits/sbi-green-rupee-term-deposit` },
          { label: 'Fixed Deposit', href: `${B}/web/personal-banking/investments-deposits/deposits/fixed-deposit` },
          { label: 'Recurring Deposit', href: `${B}/web/personal-banking/investments-deposits/deposits/recurring-deposit` },
          { label: 'Annuity Deposit Scheme', href: `${B}/web/personal-banking/investments-deposits/deposits/annuity-deposit-scheme` },
          { label: 'Multi Option Deposit', href: `${B}/web/personal-banking/investments-deposits/deposits/mod` },
          { label: 'SBI Tax Savings Scheme-2006', href: `${B}/web/personal-banking/investments-deposits/deposits/sbi-tax-savings-scheme-2006` },
          { label: 'MACAD', href: `${B}/web/personal-banking/investments-deposits/deposits/macad` },
          { label: 'Special Term Deposit', href: `${B}/web/personal-banking/investments-deposits/deposits/reinvestment-plan` },
          { label: 'Floating Rate Bulk Term Deposit (FRBTD)', href: `${B}/web/personal-banking/investments-deposits/deposits/floating-rate-bulk-term-deposit` },
          { label: 'Non Callable Term Deposit Bulk (NCD-B)', href: `${B}/web/personal-banking/investments-deposits/deposits/non-callable-term-deposit-bulk-ncd-b` },
          { label: 'Non Callable Term Deposit Retail (NCD-R)', href: `${B}/web/personal-banking/investments-deposits/deposits/non-callable-term-deposit-retail-ncd-r` },
        ],
      },
      {
        heading: { label: 'Govt. Schemes', href: `${B}/web/personal-banking/investments-deposits/govt-schemes` },
        links: [
          { label: 'NPS', href: `${B}/web/personal-banking/investments-deposits/govt-schemes/nps` },
          { label: 'PPF', href: `${B}/web/personal-banking/investments-deposits/govt-schemes/ppf` },
          { label: 'Capital Gains Account', href: `${B}/web/personal-banking/investments-deposits/govt-schemes/capital-gains-account` },
          { label: 'Gold Banking', href: `${B}/web/personal-banking/investments-deposits/govt-schemes/gold-banking` },
          { label: 'Senior Citizens Savings Scheme', href: `${B}/web/personal-banking/investments-deposits/govt-schemes/senior-citizens-savings-scheme` },
          { label: 'Sukanya Samriddhi Account Scheme 2019', href: `${B}/web/personal-banking/investments-deposits/govt-schemes/sukanya-samriddhi-yojana` },
          { label: 'RBI Bonds', href: `${B}/web/personal-banking/investments-deposits/govt-schemes/rbi-bonds` },
        ],
      },
      {
        heading: { label: 'Stocks & Securities', href: `${B}/web/personal-banking/investments-deposits/stocks-securities` },
        links: [
          { label: 'ASBA', href: `${B}/web/personal-banking/investments-deposits/stocks-securities/asba` },
          { label: 'Demat Services', href: `${B}/web/personal-banking/investments-deposits/stocks-securities/demat-services` },
          { label: 'Power Demat', href: `${B}/web/personal-banking/investments-deposits/stocks-securities/power-demat` },
          { label: 'Equity Fund Scheme', href: `${B}/web/personal-banking/investments-deposits/stocks-securities/equity-fund-scheme` },
          { label: '3 In 1 Account With E-Margin Facility', href: `${B}/web/personal-banking/investments-deposits/stocks-securities/3-in-1-account` },
        ],
      },
    ],
  },
  {
    label: 'Loans',
    icon: '/images/icons/loans.png',
    columns: [
      {
        heading: { label: 'Personal Finance', href: `${B}/web/personal-banking/personal-finance` },
        links: [
          { label: 'Loan Assistance', href: 'https://raas.sbi.bank.in/clap' },
          { label: 'Home Loans', href: 'https://homeloans.sbi.bank.in' },
          { label: 'Personal Loans', href: `${B}/web/personal-banking/loans/personal-loans` },
          { label: 'Pension Loans', href: `${B}/web/personal-banking/pension-loans` },
          { label: 'Auto Loans', href: `${B}/web/personal-banking/loans/auto-loans` },
          { label: 'Education Loan', href: `${B}/web/personal-banking/loans/education-loans` },
          { label: 'Gold Loan', href: `${B}/web/personal-banking/loans/gold-loan` },
          { label: 'Loans against Securities', href: `${B}/web/personal-banking/loans/loans-against-securities` },
          { label: 'Loans Against Property', href: `${B}/web/personal-banking/loans/loans-against-property` },
          { label: 'SBI Surya Ghar – Loan for Solar Roof Top', href: `${B}/web/personal-banking/loans/pm-surya-ghar-loan-for-solar-roof-top` },
          { label: 'Calculators', href: `${B}/web/personal-banking/loans/calculators` },
          { label: 'OTS / Compromise', href: 'https://ots.sbi.bank.in:7443/OTS/cust/sbiots.do' },
          { label: 'IRAC Norms', href: `${B}/web/personal-banking/irac-norms` },
          { label: 'Loan Repayment via Digital Mode (ePay)', href: 'https://www.sbiepay.sbi/secure/billpayment/checkout' },
        ],
      },
    ],
  },
  {
    label: 'Cards',
    icon: '/images/icons/cards.png',
    columns: [
      {
        heading: { label: 'Forex Card', href: `${B}/web/personal-banking/forex-cards` },
        links: [
          { label: 'Debit Card', href: `${B}/web/personal-banking/cards/debit-card` },
          { label: 'Business Debit Card', href: `${B}/web/personal-banking/cards/debit-card/business-debit-card` },
          { label: 'Prepaid Cards', href: `${B}/web/personal-banking/cards/debit-card/prepaid-cards` },
          { label: 'Green Remit Card', href: `${B}/web/personal-banking/cards/debit-card/green-remit-card` },
          { label: 'Debit Card Offers', href: `${B}/web/personal-banking/cards/debit-card/debit-card-offers` },
          { label: 'Nari Shakti Debit Card', href: `${B}/web/personal-banking/sbi-nari-shakti-platinum-debit-card` },
          { label: 'Pragati Debit Card', href: `${B}/web/personal-banking/sbi-pragati-platinum-debit-card` },
          { label: 'SBI One Touch', href: `${B}/web/personal-banking/sbi-one-touch` },
          { label: 'Insurance Covers Available', href: `${B}/web/personal-banking/cards/debit-card/insurance-covers-available` },
          { label: 'Card on File Tokenisation (COFT)', href: `${B}/documents/16012/78812/300922-FAQ+COFT+VER.pdf` },
          { label: 'To Block Debit Card', href: 'https://retail.onlinesbi.sbi/retail/blockatmcardintermediate.htm' },
          { label: 'Debit Card Control', href: `${B}/documents/16012/78812/190823-Debit+Card+Control.pdf` },
        ],
      },
    ],
  },
  {
    label: 'SBI Rewardz',
    icon: '/images/icons/cards.png',
    small: true,
    columns: [
      { heading: { label: 'SBI Rewardz', href: 'https://rewardz.sbi/' }, links: [] },
    ],
  },
  {
    label: 'Digital',
    icon: '/images/icons/digital.png',
    columns: [
      {
        heading: { label: 'Digital', href: `${B}/web/personal-banking/digital` },
        links: [
          { label: 'Digital Lending', href: `${B}/web/personal-banking/digital/digital-lending` },
          { label: 'Internet Banking', href: `${B}/web/personal-banking/digital/internet-banking` },
          { label: 'Whatsapp Banking', href: `${B}/web/personal-banking/digital/whatsapp-banking` },
          { label: 'Cyber Security', href: `${B}/web/personal-banking/cyber-security` },
          { label: 'Bhim SBI Pay', href: `${B}/web/personal-banking/digital/bhim-sbi-pay` },
          { label: 'Mobile Banking', href: 'https://mobilityretail.sbi.bank.in/' },
          { label: 'Update KYC', href: 'https://cdnweb.onlineyono.sbi.bank.in/accounts/re-kyc/kyc-entry?srcChn=BW' },
          { label: 'Yono', href: `${B}/web/personal-banking/yono` },
          { label: 'SBI FASTag', href: `${B}/web/personal-banking/digital/sbi-fastag` },
          { label: 'ATM Services', href: `${B}/web/personal-banking/digital/atm-services` },
          { label: 'Cash Deposit Machines', href: `${B}/web/personal-banking/digital/cash-deposit-machines` },
          { label: 'CBDC', href: `${B}/web/personal-banking/digital/cbdc` },
        ],
      },
    ],
  },
  {
    label: 'Information & Services',
    icon: '/images/icons/information_services.png',
    columns: [
      {
        heading: { label: 'Misc Services', href: '' },
        links: [
          { label: 'Form 60', href: `${B}/documents/16012/0/11052026_form_no_97.pdf` },
          { label: 'Form 121', href: `${B}/documents/16012/22770835/30032026_Form+121.pdf` },
          { label: 'Deceased Settlement', href: `${B}/web/personal-banking/information-services/deceased-settlement` },
          { label: 'Doorstep Banking Services', href: 'https://bank.sbi/dsb' },
          { label: 'DICGC', href: `${B}/web/personal-banking/dicgc` },
          { label: 'Bharat Aadhaar Seeding Enabler', href: `${B}/web/personal-banking/misc/bharat-aadhaar-seeding-enabler` },
          { label: 'Deposit Interest Certificate', href: `${B}/web/personal-banking/deposit-interest-certificate` },
          { label: 'KYC Guidelines', href: `${B}/web/personal-banking/information-services/kyc-guidelines` },
          { label: 'Positive Pay System', href: `${B}/web/personal-banking/information-services/positive-pay-system` },
          { label: 'Services', href: `${B}/web/personal-banking/services` },
          { label: 'Safe Deposit Lockers', href: `${B}/web/personal-banking/information-services/kyc-guidelines/safe-deposit-vaults` },
          { label: 'Remittances', href: `${B}/web/personal-banking/information-services/kyc-guidelines/remittances` },
          { label: 'SBI InCube', href: `${B}/web/personal-banking/information-services/kyc-guidelines/sbi-incube` },
          { label: 'Cash @ SBI', href: `${B}/web/personal-banking/information-services/kyc-guidelines/cash-sbi` },
          { label: 'Revised Service Charges', href: `${B}/web/personal-banking/information-services/kyc-guidelines/revised-service-charges` },
          { label: 'Debit Card Related Charges', href: `${B}/web/personal-banking/information-services/kyc-guidelines/debit-card-related-charges` },
          { label: 'Broking Services', href: `${B}/web/personal-banking/information-services/kyc-guidelines/broking-services` },
          { label: 'MICR Codes', href: `${B}/web/personal-banking/information-services/kyc-guidelines/micr-codes` },
          { label: 'E-Rail', href: `${B}/web/personal-banking/information-services/kyc-guidelines/e-rail` },
          { label: 'SBI Quick Missed Call Banking', href: `${B}/web/personal-banking/information-services/kyc-guidelines/sbi-quick-missed-call-banking` },
          { label: 'Business Continuity Planning', href: `${B}/web/personal-banking/information-services/kyc-guidelines/business-continuity-planning` },
          { label: 'Inflation Indexed National Savings Securities', href: `${B}/web/personal-banking/information-services/kyc-guidelines/inflation-indexed-national-savings-securities` },
          { label: 'Foreign Inward Remittance', href: `${B}/web/personal-banking/information-services/kyc-guidelines/foreign-inward-remittance` },
          { label: 'Insurance Cover For Deposits', href: `${B}/web/personal-banking/kyc-guidelines/insurance-cover-for-deposits` },
          { label: 'FCRA Amendment 2020', href: `${B}/web/personal-banking/fcra-amendment-2020` },
          { label: 'Nomination Facility', href: `${B}/web/personal-banking/nomination-facility` },
          { label: 'Donations to Religious Entities', href: `${B}/web/personal-banking/donations` },
          { label: 'Account Aggregator', href: `${B}/documents/16012/25448726/010723-account+aggregator+data+for+website+publication+english.pdf` },
          { label: 'UDGAM', href: 'https://udgam.rbi.org.in' },
          { label: 'Unclaimed Deposit Accounts Claim', href: `${B}/web/personal-banking/information-services/deaf-claim` },
          { label: 'Latest Tax Related Guidelines', href: `${B}/web/personal-banking/information-n-services/latest-tax-related-guidelines` },
          { label: 'Process of Reactivation of Inoperative Accounts', href: `${B}/web/personal-banking/imformation_n_services/process-of-reactivation-of-inoperative-accounts` },
          { label: 'Waiver of ADWM Cash Deposit Charges', href: `${B}/web/personal-banking/information-services/waiver-of-adwm-cash-deposit-charges` },
          { label: 'Revision of ADWM Cash Deposit Charges', href: `${B}/documents/16012/22770835/Service-charges_in_english.pdf` },
          { label: 'Facilities to Senior Citizens', href: `${B}/documents/16012/396762/151024-Facilities+for+Senior+Citizens+updated+August+2024.pdf` },
        ],
      },
      {
        heading: { label: 'Videos & Information', href: `${B}/web/personal-banking/information-services/videos-and-information` },
        links: [
          { label: 'CTS Continuous Clearing', href: `${B}/web/personal-banking/information-services/videos-and-information` },
          { label: 'Branches accessible to Divyangjan', href: `${B}/documents/16012/22770835/BRANCH+ACCESSIBLE+TO+DIVYANGJAN.pdf` },
          { label: 'ATMs accessible to Divyangjan', href: `${B}/documents/16012/22770835/TOUCH+POINTS+IDENTIFIED+AS+ACCESSIBLE+CENTRE+AS+ON+30.09.2025.pdf` },
        ],
      },
      {
        heading: { label: 'Government Business', href: `${B}/web/personal-banking/information-services/government-business` },
        links: [
          { label: 'Direct Tax', href: `${B}/web/personal-banking/information-services/government-business/direct-tax` },
          { label: 'Indirect Taxes', href: `${B}/web/personal-banking/information-services/government-business/indirect-taxes` },
          { label: 'Passport Seva Kendra', href: `${B}/web/personal-banking/information-services/government-business/passport-seva-kendra` },
          { label: 'Pension', href: `${B}/web/personal-banking/information-services/government-business/pension` },
          { label: 'State Gov Taxes', href: `${B}/web/personal-banking/information-services/government-business/state-gov-taxes` },
        ],
      },
    ],
  },
  {
    label: 'Knowledge Hub',
    icon: '/images/icons/information_services.png',
    href: `${B}/web/personal-banking/home`,
    columns: null,
  },
];

/* ---------- FOOTER ---------- */

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export const footerTopLinks: FooterLink[] = [
  { label: 'About Us', href: `${B}/web/about-us` },
  { label: 'Subsidiaries', href: `${B}/web/affiliates` },
  { label: 'Corporate Governance', href: `${B}/web/corporate-governance/corporate-governance` },
  { label: 'Investor Relations', href: `${B}/web/investor-relations/investor-relations` },
  { label: 'SBI In the News', href: `${B}/web/sbi-in-the-news` },
  { label: 'Contact Us', href: `${B}/web/contact-us/` },
  { label: 'Careers', href: `${B}/web/careers` },
  { label: 'Site Map', href: `${B}/web/home/sitemap` },
  { label: 'Disclaimer', href: `${B}/web/customer-care/disclaimer` },
  { label: 'Feedback', href: `${B}/web/personal-banking/feedback` },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Home',
    links: [
      { label: 'Forex Card Rates', href: `${B}/documents/16012/1400784/FOREX_CARD_RATES.pdf` },
      { label: 'Interest Rates', href: `${B}/web/interest-rates/interest-rates/deposit-rates` },
      { label: 'Download Forms', href: `${B}/web/nri/accounts/download-forms` },
      { label: 'Corporate Social Responsibility', href: `${B}/web/corporate-governance/information` },
      { label: 'Sustainability and Business Responsibility Policy', href: `${B}/documents/136/0/01042026_Sustainability+and+Business+Responsibility+%28BR%29+Policy.pdf` },
      { label: 'Bank Calendar', href: `${B}/documents/16012/0/Bank+Calendar+%281%29.pdf` },
      { label: 'RTI 2005', href: `${B}/web/corporate-governance/right-to-information-act-2005` },
      { label: 'Grahak Setu', href: `${B}/web/get-business-product-information/grahak-setu` },
      { label: 'Equal Opportunity Policy for PWD', href: `${B}/documents/136/0/12052026_Equal+Opportunity+Policy+2024-Abbridged+Version.pdf` },
      { label: 'Do you want to register a Complaint', href: 'https://crh.sbi.bank.in/' },
      { label: 'SEBI ODR Portal for Investors', href: 'https://smartodr.in/login' },
    ],
  },
  {
    heading: 'NRI',
    links: [
      { label: 'Accounts', href: `${B}/web/nri/accounts` },
      { label: 'Investments', href: `${B}/web/nri/investments` },
      { label: 'Loans', href: `${B}/web/nri/loans` },
      { label: 'Remittances', href: `${B}/web/nri/remittances` },
      { label: 'Information', href: `${B}/web/nri/information` },
      { label: 'Privacy Notice and Consent Forms', href: `${B}/web/nri/privacy-notice-and-consent-forms` },
    ],
  },
  {
    heading: 'Personal',
    links: [
      { label: 'Savings Account', href: `${B}/web/personal-banking/accounts/saving-account` },
      { label: 'Loans', href: `${B}/web/personal-banking/loans/personal-loans` },
      { label: 'Investments & Deposits', href: `${B}/web/personal-banking/investments-deposits/deposits` },
      { label: 'Cards', href: `${B}/web/personal-banking/cards/debit-card` },
      { label: 'Digital', href: `${B}/web/personal-banking/digital` },
      { label: 'Information & Services', href: `${B}/web/personal-banking/information-services/kyc-guidelines` },
      { label: 'Service Charges', href: `${B}/web/personal-banking/information-services/kyc-guidelines/revised-service-charges` },
      { label: 'Update KYC', href: 'https://cdnweb.onlineyono.sbi.bank.in/accounts/re-kyc/kyc-entry?srcChn=BW' },
    ],
  },
  {
    heading: 'International Banking',
    links: [
      { label: 'Banking', href: `${B}/web/international-banking/banking` },
      { label: 'Credit Finance', href: `${B}/web/international-banking/credit-finance` },
      { label: 'Services', href: `${B}/web/international-banking/services` },
    ],
  },
  {
    heading: 'Business',
    links: [
      { label: 'CAG & MCG', href: `${B}/web/business/corporate-banking/corporate-accounts-group-cag` },
      { label: 'Current Account', href: `${B}/web/business/sme/current-accounts` },
      { label: 'SME - Deposits', href: `${B}/web/business/sme/sme-fixed-deposits` },
      { label: 'SME - Loans', href: `${B}/web/business/sme/sme-loans` },
      { label: 'Information', href: `${B}/web/business/information/sme-assist` },
    ],
  },
  {
    heading: 'Wealth Management',
    links: [
      { label: 'SBI Wealth', href: `${B}/web/wealth-management` },
      { label: 'Products', href: `${B}/web/wealth-management/wealth-savings-current-account` },
    ],
  },
];

/* ---------- HOME MID SECTION (Announcements / Other Services) ---------- */

export interface AnnouncementItem {
  label: string;
  href?: string;
  plain?: boolean;
}

export const announcements: AnnouncementItem[] = [
  { label: 'Empanelment of valuers in SBI North East Circle.', href: `${B}/documents/136/49244919/21012026_CONTENT+FOR+ADVERTISEMENT.pdf` },
  { label: 'Trade Relief Measures', href: `${B}/web/business/trade-relief-measures` },
  { label: 'CGSE Scheme', href: `${B}/documents/71595/0/CGSE+Scheme.pdf` },
  { label: 'mCASH (Sending & Claiming) facility will not be available in OnlineSBI & YONO Lite after 30.11.2025. Please use alternate mode of transactions such as UPI, IMPS, NEFT, RTGS etc for transfer of money to third party beneficiaries.', plain: true },
  { label: 'CGTMSE GUARANTEE FEE', href: `${B}/documents/136/49244919/CGTMSE+GUARANTEE+FEE+STRUCTURE+WEF+01042025.pdf` },
  { label: 'MODIFICATION - CGTMSE GUARANTEE COVERAGE UPTO 10 CR', href: `${B}/documents/136/49244919/MODIFICATION+-+CGTMSE+GUARANTEE+COVERAGE+UPTO+10+CR.pdf` },
  { label: 'MODIFICATION - RISK PREMIUM ON CGTMSE GUARANTEE FEE FOR SBI', href: `${B}/documents/136/49244919/MODIFICATION+-+RISK+PREMIUM+ON+CGTMSE+GUARANTEE+FEE+FOR+SBI.pdf` },
  { label: 'Know Your Lender - Grow Your Business Handbook for MSME customers', href: `${B}/documents/136/49244919/KYL+GYB.pdf` },
  { label: 'National Centre for Financial Education : E-Learning Management System', href: 'https://ncfe.org.in/e-lms/' },
  { label: 'RBI Guidelines for compounding of contraventions under FEMA, 1999', href: `${B}/documents/136/49244919/Website+Announcement+Information.docx` },
  { label: 'State Bank of India has abrogated HIV testing from its list of medical tests to be undertaken during SBI recruitment and promotion examinations.', plain: true },
  { label: 'ENGAGEMENT OF RETIRED OFFICERS/EMPLOYEES', href: `${B}/web/personal-banking/information-services/engagement_retired` },
  { label: 'Amrit Vrishti Deposit Scheme', href: `${B}/documents/136/1364568/160724-Amrit+Vrishti+for+Bank+SBI+%282%29.pdf` },
  { label: 'Amrit Kalash Deposit', href: `${B}/documents/136/1364568/060424-amrit+kalash.pdf` },
  { label: '"SBI WECARE" Deposit Scheme for Senior Citizens', href: `${B}/documents/136/1364568/060424-sbi+wecare.pdf` },
  { label: 'SBI Green Rupee Term Deposit (SGRTD)', href: `${B}/web/personal-banking/investments-deposits/deposits/sbi-green-rupee-term-deposit` },
];

export interface OtherServiceItem {
  label: string;
  icon: string;
  href: string;
}

const S = '/images/services';
export const otherServices: OtherServiceItem[] = [
  { label: 'Cyber Security services', icon: `${S}/cyber-security.png`, href: `${B}/web/personal-banking/cyber-security` },
  { label: 'Online Loan Status', icon: `${S}/loan-status.png`, href: `${B}/web/business/sme/lead-status` },
  { label: 'Doorstep Banking (DSB) Services', icon: `${S}/doorstep.png`, href: 'https://bank.sbi/dsb' },
  { label: 'Deposit Interest Certificate', icon: `${S}/deposit-interest.png`, href: `${B}/web/personal-banking/deposit-interest-certificate` },
  { label: 'Corporate Social Responsibility (CSR)', icon: `${S}/csr.png`, href: `${B}/web/corporate-governance/information` },
  { label: 'Debit Card', icon: `${S}/debit-card.png`, href: `${B}/web/personal-banking/cards/debit-card` },
  { label: 'Financial Technology', icon: `${S}/fintech.png`, href: `${B}/web/customer-care/tlcs` },
  { label: 'Global Market', icon: `${S}/global-market.png`, href: `${B}/web/business/information/global-markets` },
  { label: 'SBI Home Loan', icon: `${S}/home-loan.png`, href: 'https://homeloans.sbi/' },
  { label: 'National Portal for Credit Linked Government Schemes', icon: `${S}/jansamarth.png`, href: 'https://www.jansamarth.in/apply/sbi' },
  { label: 'E-MUDRA LOANS', icon: `${S}/emudra.png`, href: 'https://emudra.sbi.bank.in:8044/emudra' },
  { label: 'PRADHAN MANTRI MUDRA YOJANA', icon: `${S}/mudra.png`, href: `${B}/web/business/sme/sme-government-schemes/pmmy` },
  { label: 'PAN (PERMANENT ACCOUNT NUMBER)', icon: `${S}/fintech.png`, href: `${B}/documents/136/1364568/PAN_LINKING.pdf` },
  { label: 'MOBILE NUMBER', icon: `${S}/mobile.png`, href: `${B}/documents/136/1364568/MOBILE_NO_UPDATE.pdf` },
  { label: 'HAVE YOU REGISTERED YOUR EMAIL ID WITH YOUR BANK ACCOUNT?', icon: `${S}/online-banking.png`, href: '#' },
  { label: 'INTERESTED IN LOAN/PHONE BANKING? GET A CALL BACK', icon: `${S}/callback.png`, href: 'https://onlineapply.sbi.co.in/personal-banking/' },
  { label: 'SBI-World Bank', icon: `${S}/world-bank.png`, href: `${B}/documents/16012/13986967/250723-SBI_WORLD_BANK_JULU2023.pdf` },
  { label: 'Remit to India', icon: `${S}/remit.png`, href: 'https://remit.onlinesbi.com' },
  { label: 'Agri Products', icon: `${S}/agri.png`, href: `${B}/web/agri-rural/home` },
  { label: 'SBIepay', icon: `${S}/epay.png`, href: `${B}/web/personal-banking/sbiepay` },
  { label: 'Online Savings Bank Account Application', icon: `${S}/savings-apply.png`, href: 'https://www.sbiyono.sbi/wps/portal/account-options' },
  { label: 'SBI Rewardz', icon: `${S}/rewardz.png`, href: 'https://rewardz.sbi/' },
  { label: 'SBI Wealth', icon: `${S}/wealth.png`, href: `${B}/web/wealth-management/about-sbi-wealth` },
  { label: 'SBI InCube', icon: `${S}/incube.png`, href: `${B}/web/personal-banking/information-services/kyc-guidelines/sbi-incube` },
  { label: 'Cash Management Product', icon: `${S}/cmp.png`, href: `${B}/web/business/corporate-banking/cash-management-product` },
  { label: 'LINKING OF PAN AND AADHAAR', icon: `${S}/pan-aadhaar.png`, href: '#' },
  { label: 'DONATIONS TO RELIGIOUS ENTITIES', icon: `${S}/donation.png`, href: `${B}/web/personal-banking/donations` },
  { label: 'SBI Startup', icon: `${S}/startup.png`, href: `${B}/web/business/sbi-startup` },
  { label: 'DICGC', icon: `${S}/dicgc.png`, href: `${B}/web/personal-banking/dicgc` },
  { label: 'SGRTD', icon: `${S}/sgrtd.png`, href: `${B}/web/personal-banking/investments-deposits/deposits/sbi-green-rupee-term-deposit` },
];
