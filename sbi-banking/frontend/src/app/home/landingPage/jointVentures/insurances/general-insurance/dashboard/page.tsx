'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { ChevronRight, ChevronLeft, Search, ArrowRight, Download, CheckCircle2, X } from 'lucide-react';
import toast from 'react-hot-toast';

import { useSearchParams } from 'next/navigation';

export default function InsuranceDashboardPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'Protection Plans' | 'Child Plans' | 'Retirement Plans' | 'Wealth Creation' | 'Savings Plans' | 'Health Plans' | 'Accident Insurance' | 'Motor Insurance' | 'Travel Insurance' | 'Group Plans' | null>('Protection Plans');
  const [selectedPlan, setSelectedPlan] = useState<'Plan A' | 'Plan B'>('Plan A');
  const [selectedPolicy, setSelectedPolicy] = useState('SBI Life - eShield Insta');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  const insuranceType = searchParams.get('insuranceType');

  const [showResumeModal, setShowResumeModal] = useState(false);

  // Sync activeTab & selectedPolicy dynamically with URL search parameters
  React.useEffect(() => {
    if (searchParams.get('showResumeModal') === 'true') {
      setShowResumeModal(true);
    }

    const type = searchParams.get('insuranceType');
    const cat = searchParams.get('insuranceCategory');

    if (type === 'General Insurance' || type === 'General Insurance') {
      if (cat === '5') {
        setActiveTab(null);
        setSelectedPolicy('Group Sampoorna Arogya');
      } else if (cat === '2') {
        setActiveTab('Motor Insurance');
        setSelectedPolicy('Private Car Insurance Policy');
      } else if (cat === '4' || !cat) {
        setActiveTab('Health Plans');
        setSelectedPolicy('Group Sampoorna Arogya');
      } else if (cat === '1') {
        setActiveTab('Accident Insurance');
        setSelectedPolicy('Group Personal Accident Insurance');
      } else if (cat === '3') {
        setActiveTab('Travel Insurance');
        setSelectedPolicy('Travelsure - Group');
      }
      return;
    }

    if (cat === '6') {
      setActiveTab(null);
      setSelectedPolicy('SBI Life - New Smart Samriddhi');
    } else if (cat === '2') {
      setActiveTab('Child Plans');
      setSelectedPolicy('SBI Life - Smart Scholar Plus');
    } else if (cat === '1') {
      setActiveTab('Protection Plans');
      setSelectedPolicy('SBI Life - eShield Insta');
    } else if (cat === '3') {
      setActiveTab('Retirement Plans');
      setSelectedPolicy('SBI Life - Retire Smart Plus');
    } else if (cat === '4') {
      setActiveTab('Wealth Creation');
      setSelectedPolicy('SBI Life - Smart Fortune Builder');
    } else if (cat === '5') {
      setActiveTab('Savings Plans');
      setSelectedPolicy('SBI Life - New Smart Samriddhi');
    }
  }, [searchParams]);

  // Update selected default policy when tab changes
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    if (tab === 'Child Plans') {
      setSelectedPolicy('SBI Life - Smart Scholar Plus');
    } else if (tab === 'Protection Plans') {
      setSelectedPolicy('SBI Life - eShield Insta');
    } else if (tab === 'Retirement Plans') {
      setSelectedPolicy('SBI Life - Retire Smart Plus');
    } else if (tab === 'Savings Plans') {
      setSelectedPolicy('SBI Life - New Smart Samriddhi');
    } else if (tab === 'Wealth Creation') {
      setSelectedPolicy('SBI Life - Smart Fortune Builder');
    } else if (tab === 'Health Plans') {
      setSelectedPolicy('Group Sampoorna Arogya');
    } else if (tab === 'Motor Insurance') {
      setSelectedPolicy('Private Car Insurance Policy');
    } else if (tab === 'Travel Insurance') {
      setSelectedPolicy('Travelsure - Group');
    } else if (tab === 'Accident Insurance') {
      setSelectedPolicy('Group Personal Accident Insurance');
    }
  };

  const protectionPolicies = [
    { 
      name: 'SBI Life - eShield Insta', 
      premium: 'Yearly premium ₹ 2,259 onwards*', 
      uin: '111N141V02', 
      arn: 'ARN No. 3C/YONO/Cr1/ver1/11/25/WEB/ENG',
      planTitle: 'Pure Term Insurance',
      planA: [
        { title: 'Enrollment process', text: 'Easy enrolment through instant and swift processing of policy' },
        { title: 'Convenience', text: 'Convenience of paying premium regularly for a period of 10 years' },
        { title: 'Tax benefits', text: 'Get tax benefits** as per the prevailing norms under the Income Tax Act, 1961' },
        { title: 'Return after maturity', text: 'No' },
      ],
      planB: [
        { title: 'Sum Assured Option', text: 'Increasing Term Assurance option to boost cover over time' },
        { title: 'Accelerated Terminal Illness', text: 'Inbuilt benefit of payment on diagnosis of Terminal Illness' },
        { title: 'Tax benefits', text: 'Get tax benefits** under Section 80C & 10(10D)' },
        { title: 'Return after maturity', text: 'No' },
      ]
    },
    { 
      name: 'SBI Life - Saral Jeevan Bima', 
      premium: 'Premium starting from ₹ 1,415', 
      uin: '111N128V02', 
      arn: 'ARN No. 2Q/YONO/ver1/08/25/WEB/ENG',
      planTitle: 'Plan benefits',
      planA: [
        { title: 'Wide Range of Sum Assured', text: 'Minimum Sum Assured: 10,00,000\nMaximum Sum Assured:60,00,000' },
        { title: 'Customize the plan to meet your requirements', text: 'Pay premium regularly or for a limited (7/10/15 years) period and choose policy term from 10 years to 30 years.' },
        { title: 'Entry Age:', text: 'Minimum Entry Age : 18 years\nMaximum Entry Age : 65 years' },
        { title: 'SBI Life - Saral Jeevan Bima', text: 'Security for your family with a standard term plan at an affordable cost.' },
      ]
    },
    { 
      name: 'SBI Life - Saral Swadhan Supreme', 
      premium: 'Premium starting from ₹ 7,750', 
      uin: '111N136V01', 
      arn: 'ARN No. 3F/YONO/Cr1/ver1/11/25/WEB/ENG',
      planTitle: 'Plan benefits',
      planA: [
        { title: 'Wide range of Sum Assured & Premium', text: 'Minimum Sum Assured: ₹25,00,000\nMaximum Sum Assured: ₹50,00,000\nMinimum Premium: ₹8,050\nMaximum Premium: ₹2,18,500.' },
        { title: 'Life cover upto 65 years', text: 'Minimum Age at Entry: 18 years\nMaximum Age at Entry: 50 years' },
        { title: 'Additional Feature', text: 'SBI Life - Accident Benefit Rider (UIN: 111B041V01)\nOption A - Accidental Death Benefit (ADB)\nOption B - Accidental Partial Permanent Disability Benefit(APPD)' },
        { title: 'Choice of plan to suit your needs!', text: 'Life Insurance cover with ease of issuance.' },
        { title: 'Secure your future with SBI Life-saral swadhan Supreme', text: 'Life Insurance cover with ease of issuance' },
        { title: 'Customize the plans to meet your requirements', text: 'You can choose policy term from 10 years to 30 years.' },
      ]
    },
    { 
      name: 'SBI Life - Smart Swadhan Supreme', 
      premium: 'Premium starting from ₹ 5,750', 
      uin: '111N140V02', 
      arn: 'ARN No. 3D/YONO/Cr1/ver1/08/25/WEB/ENG',
      planTitle: 'Plan benefits',
      planA: [
        { title: 'Wide Range of Sum Assured', text: 'Minimum: ₹25,00,000\nMaximum: No Limit (As per board approved underwriting policy)' },
        { title: 'Life Cover upto 75 years', text: 'Minimum Entry Age: 18 years\nMaximum Entry Age: 60 years\nMaximum Maturity Age: 75 years' },
        { title: 'Protection', text: 'Life Insurance Cover at an affordable cost to protect yourself' },
        { title: 'Secure your future with SBI Life - Smart Swadhan Supreme', text: 'Get Life Cover during the policy term and receive 100 % of Total Premiums paid as Maturity Benefit on survival of the Life Assured till the end of the policy term.' },
        { title: 'Customize the plans to meet your requirements', text: 'Pay premium regularly or for a limited ( 7/10/15 years ) period and choose term from 10 years to 30 years' },
        { title: 'Additional Coverage through rider & better half benefit options', text: 'SBI Life - Accident Benefit Rider (UIN: 111B041V01)\nOption A - Accidental Death Benefit (ADB)\nOption B - Accidental Partial Permanent Disability Benefit(APPD)\nOption to cover your spouse with the Better Half Benefit' },
      ]
    },
    { 
      name: 'SBI Life - Smart Swadhan Neo', 
      premium: 'Monthly Premium starting from ₹ 425', 
      uin: '111N141V01', 
      arn: 'ARN No. 3W/YONO/ver1/12/25/WEB/ENG',
      planTitle: 'Plan benefits',
      planA: [
        { title: 'Wide Range of Basic Sum Assured', text: 'Minimum Sum Assured: ₹5,00,000\nMaximum Sum Assured: ₹24,90,000 (As per the Board Approved Underwriting Policy)' },
        { title: 'Entry Age', text: 'Minimum age at Entry: 18 Years\nMaximum age at Entry: 60 years' },
        { title: 'Customize the plan to meet your requirements', text: 'Pay Premium regularly, single or for a limited (7/10/15 years) period and choose policy term from 15 years to 30 years' },
        { title: 'Secure your family\'s future with SBI Life - Smart Swadhan Neo', text: 'Life Insurance Coverage with ease of issuance.' },
        { title: 'Accidental Coverage through Optional Rider', text: 'SBI Life - Accident Benefit Rider (UIN: 111B041V01)\nOption A - Accidental Death Benefit (ADB)\nOption B - Accidental Partial Permanent Disability Benefit (APPD)' },
      ]
    },
    { 
      name: 'SBI Life - Smart Shield Plus', 
      premium: 'Yearly premium starting from Rs 2500 p.a.', 
      uin: '111N138V01', 
      arn: 'ARN No. 4C/YONO/ver1/10/25/WEB/ENG',
      planTitle: 'Plan benefits',
      planA: [
        { title: 'Wide Range of Sum Assured', text: 'Minimum Sum Assured : Rs 25,00,000/-(In multiples of Rs.1,00,000)\nMaximum Sum Assured : No Limit (As per board approved underwriting policy)' },
        { title: 'Life cover upto 100 years', text: 'Minimum age at entry:18 years other than Whole Life , 45 years for Whole life\nMaximum Maturity Age: Single and Regular Pay: 79 years\nLimited Pay : Whole Life - 100 years other than Whole Life -79 years' },
        { title: 'Choice of Plan to suit your needs', text: 'Choice of 3 Plan Options:\nLevel Cover benefit\nIncreasing Cover benefit\nLevel Cover with future proofing benefit' },
        { title: 'Secure your future with SBI Life - Smart Shield Plus', text: 'Protection through life cover to financially protect your family.' },
        { title: 'Flexibility of Premium Payment', text: 'Flexibility to pay premium throughout the policy term (Regular Pay) or for limited period of time (Limited pay) or one time (Single Pay)' },
        { title: 'Additional Coverage through rider & better half benefit options', text: 'SBI Life - Accident Benefit Rider (UIN: 111B041V01)\nOption A - Accidental Death Benefit (ADB)\nOption B - Accidental Partial Permanent Disability Benefit(APPD)' }
      ]
    }
  ];

  const savingsPolicies = [
    {
      name: 'SBI Life - New Smart Samriddhi',
      premium: 'Premium starting from ₹ 12,000 to ₹ 75,000',
      uin: '111N129V05',
      arn: 'ARN No. 2P/YONO/ver1/12/25/WEB/ENG',
      cards: [
        { title: 'Wide Range of Sum Assured', text: 'Minimum Sum Assured: 58,000\nMaximum Sum Assured : 9,11,000 (As per the Board Approved Underwriting Policy)' },
        { title: 'Entry Ages', text: 'Minimum age at Entry: 30 days\nMaximum age at Entry:50 years' },
        { title: 'Secure your future with SBI Life - Smart Platina Assure', text: 'Life Insurance Cover along with Assured Return' },
        { title: 'Enhanced protection through Optional Rider', text: 'SBI Life - Accident Benefit Rider (UIN: 111B041V01)\nOption A - Accidental Death Benefit (ADB)\nOption B - Accidental Partial Permanent Disability Benefit(APPD)' },
        { title: 'Customize the plan to meet your requirements', text: 'Pay for 6, 7 or 10 years and enjoy the benefits throughout the policy term of 12,15 or 20 years respectively' },
      ]
    },
    {
      name: 'SBI Life - Smart Platina Plus',
      premium: 'Premium starting from ₹ 50,000',
      uin: '111N133V03',
      arn: 'ARN No. 2X/YONO/Cr2/ver1/11/25/WEB/ENG',
      cards: [
        { title: 'Wide Range of Premium Option', text: 'Minimum annualized Premium: 50,000 (in multiples of Rs 1000)\nMaximum annualized Premium: No limit (subject to board approved underwriting policy)' },
        { title: 'Life Cover upto 99 years', text: 'Maximum Maturity age: 99 years' },
        { title: 'Choice of plan to suit your needs', text: 'Choice of two income plan options to suit your financial needs- Life Income & Guaranteed Income\nMaximum Entry Age : 65 years' },
        { title: 'Secure your future with SBI Life - Smart Platina Plus', text: 'Life Insurance cover during policy term for financial protection of family' },
        { title: 'Additional Coverage through optional rider', text: 'SBI Life - Accident Benefit Rider (UIN: 111B041V01)\nOption A - Accidental Death Benefit (ADB)\nOption B - Accidental Partial Permanent Disability Benefit(APPD)' },
      ]
    },
    {
      name: 'SBI Life - Smart Platina Supreme',
      premium: 'Yearly premium starting for ₹ 50,000',
      uin: '111N140V02',
      arn: 'ARN No. 3G/YONO/ver1/12/25/WEB/ENG',
      cards: [
        { title: 'Wide Range of Sum Assured', text: 'Minimum Sum Assured: 5,50,000\nMaximum Sum Assured: No Limit (as per the Board Approved Underwriting Policy)' },
        { title: 'Life Cover upto 75 years', text: 'Minimum age at Entry: 3 years\nMaximum age at Entry: 60 years' },
        { title: 'Choice of Guaranteed Income Option', text: 'Option 1: Level Guaranteed Income:\nOption 2: Increasing Guaranteed Income:' },
        { title: 'Additional Coverage through optional rider', text: 'SBI Life - Accident Benefit Rider (UIN: 111B041V01)\nOption A - Accidental Death Benefit (ADB)\nOption B - Accidental Partial Permanent Disability Benefit (APPD)' },
      ]
    },
    {
      name: 'SBI Life - Smart Platina Advantage',
      premium: 'Premium starting from ₹ 50,000',
      uin: '111N142V01',
      arn: 'ARN No. 3H/YONO/ver1/12/25/WEB/ENG',
      cards: [
        { title: 'Guaranteed Returns', text: 'Guaranteed additions added to policy at regular intervals' },
        { title: 'Flexible Premium Paying Term', text: 'Option to choose pay term based on financial convenience' },
        { title: 'Comprehensive Life Cover', text: 'Full protection cover for your family during the entire policy period' },
        { title: 'Tax Benefits', text: 'Tax benefits under Section 80C & Section 10(10D)' },
      ]
    },
    {
      name: 'SBI Life - Smart Bachat Plus',
      premium: 'Premium starting from ₹ 1200',
      uin: '111N143V01',
      arn: 'ARN No. 3I/YONO/ver1/12/25/WEB/ENG',
      cards: [
        { title: 'Affordable Savings', text: 'Start saving with micro-premiums starting from Rs. 1200' },
        { title: 'Maturity Benefit', text: 'Sum assured along with accrued bonuses paid upon maturity' },
        { title: 'Financial Security', text: 'Reliable life insurance protection for your family' },
        { title: 'Tax Savings', text: 'Eligible for income tax exemptions under IT Act 1961' },
      ]
    }
  ];

  const wealthPolicies = [
    {
      name: 'SBI Life - Smart Fortune Builder',
      premium: 'Premium starting from ₹ 40,000',
      uin: '111L142V01',
      arn: 'ARN No. 3M/YONO/ver1/12/24/WEB/ENG',
      cards: [
        { title: 'Wide range of Sum Assured & Premium', text: 'Minimum premium : Regular Premium: 40,000 p.a.\nLimited Pay: 50,000 p.a. Single Pay: 65,000,\nMax premium : 2,50,000 Subject to Board Approved Underwriting Policy\nRegular and Limited Pay: 10 X Annualized Premium Single Pay: 1.25 X Single Premium.' },
        { title: 'Life cover upto 70 years', text: 'Minimum Age at Entry: 2 years\nMaximum Age at Entry: 55years.' },
        { title: 'Customize the plans to meet your requirements', text: 'Enhanced Investment opportunity through 12 varied Fund Options.' },
        { title: 'Choice of plan to suit your needs!', text: 'Life Insurance coverage throughout the policy term.' },
        { title: 'Secure your future with SBI Life-Smart Fortune Builder', text: 'Secure your family with unit linked insurance plan with investment growth.' },
        { title: 'Additional Coverage through rider options', text: 'Option to enhance coverage by opting for Rider on payment of additional premium.' },
      ]
    },
    {
      name: 'SBI Life - Smart Elite Plus',
      premium: 'Premium starting from ₹ 2.5 lakhs',
      uin: '111L146V01',
      arn: 'ARN No. 3S/YONO/Cr1/04/26/WEB/ENG',
      cards: [
        { title: 'Premium Payment Options', text: 'Option to pay premium once or for a limited period (7,10,12 years) monthly, half -yearly, quaterly or yearly' },
        { title: 'Entry Age', text: 'Minimum age at Entry - 18 years\nMaximum age at Entry - Limited Pay: 55 years | Single Pay: 60 years' },
        { title: 'Choice of Funds to suit your Needs', text: 'Choose between varied fund options and have the ability to switch between funds' },
        { title: 'Plan Options', text: 'Provides two plan options: Gold Option & Platinum Option both offering the freedom to stay protected and invested for long term' },
        { title: 'In-built Accident Benefit (Accidental Death Benefit and Accidental Total and Permanent Disability Benefit)', text: 'This in-built benefit provides an additional benefit on accidental death or accidental total & permanent disability' },
      ]
    }
  ];

  const childPolicies = [
    { name: 'SBI Life - Smart Scholar Plus', premium: 'Premium starting from ₹ 50,000', uin: '111L144V01', arn: 'ARN No. 3Q/YONO/ver1/06/25/WEB/ENG' },
    { name: 'SBI Life - Smart Platina Young Achiever', premium: 'Premium starting from ₹ 50,000', uin: '111N139V01', arn: 'ARN No. 3Y/YONO/Cr1/02/26/WEB/ENG' }
  ];

  const retirementPolicies = [
    {
      name: 'SBI Life - Retire Smart Plus',
      premium: 'Premium starting from ₹ 30,000',
      uin: '111L135V02',
      arn: 'ARN No. 2Y/YONO/ver1/10/25/WEB/ENG',
      cards: [
        { title: 'Flexibility of premium Payment', text: 'Option to pay Single Premium, Regular Premium or for a limited period' },
        { title: 'Life cover upto 70 years', text: 'Minimum age at Entry: 20 years\nMaximum age at Entry: 60 years' },
        { title: 'Choice of fund to suit your needs', text: 'Flexibility of choosing from 7 diverse options with unlimited free switches during the policy term.' },
        { title: 'Secure your future with SBI Life - Retire Smart Plus', text: 'Ensure that the financial stability your enjoy today to explore various aspects of life continues even after you retire with SBI Life - Retire Smart Plus' },
        { title: 'Additional Feature', text: 'Loyalty additions# payable every year starting from end of 15th Policy year.\n#Please refer to section of Loyalty Additions in sales brochure.' }
      ]
    },
    {
      name: 'SBI Life - Smart Annuity Plus',
      premium: 'Premium starting from ₹ 1000',
      uin: '111N134V10',
      arn: 'ARN No. 2W/YONO/ver1/11/25/WEB/ENG',
      cards: [
        { title: 'Secure your future with SBI Life - Smart Annuity Plus', text: 'Enjoy Guaranteed Lifelong Regular Income' },
        { title: 'Benefit for Higher Purchase Price', text: 'Avail the benefit of Higher Annuity Rates for Large Premium' },
        { title: 'Choice of Plan to suit your needs!', text: 'Freedom to choose from the wide range of Annuity Options' },
        { title: 'Customize the Plan to meet your requirements', text: 'Option to choose frequency of annual payouts -Monthly, Quarterly, Half -yearly or Yearly' }
      ]
    }
  ];

  const healthPolicies = [
    {
      name: 'Group Sampoorna Arogya',
      premium: 'Annual Premium ₹ 1,805 onwards',
      uin: 'SBIHLGP21605V012021',
      arn: '',
      cards: [
        { title: 'Wide range of Sum insured & premium', text: 'Sum insured: From ₹1 Lakh to ₹10 Lakhs\nPremium: Starting from ₹1,805' },
        { title: 'Hospitalization medical expense', text: 'Medically necessary hospitalization of an insured person due to illness or injury sustained or contracted during the policy period' },
        { title: 'Sickness hospital cash benefit', text: 'Daily hospital cash benefit if the insured person is hospitalized during the policy period for medically necessary treatment' },
        { title: 'Alternative treatment', text: 'Coverage of medical expenses incurred for Ayurveda, Unani, Siddha and Homeopathy treatment' },
        { title: 'Critical illness cover', text: 'Lumpsum benefit payout in case you suffer from listed critical illnesses (available in selective plans)' }
      ]
    },
    {
      name: 'Arogya Sanjeevani Health Insurance, SBI General',
      premium: 'Premium starting from ₹ 1200',
      uin: 'SBIHLIP20180V011920',
      arn: '',
      cards: [
        { title: 'Wide Range of Sum Insured & Premium', text: 'Sum Insured: From ₹0.5 Lakhs to ₹10 Lakhs\nPremium: From ₹1200 (for 19 years adult for SI 50000) to ₹13202 (for 55 years adult for SI 10 Lakhs)' },
        { title: 'No Medical Check-Up Required', text: 'Get hassle-free insurance without needing a medical check-up, available for individuals up to 55 years old with no pre-existing medical conditions.' },
        { title: 'Holistic & Family-Centric Coverage', text: 'Cover a wide range of healthcare needs, including AYUSH treatments, and secure your family\'s well-being under a single, comprehensive policy designed to protect everyone.' },
        { title: 'Enhanced Protection & Savings', text: 'Enjoy added benefits like coverage for road ambulance services and earn a cumulative bonus for claim-free years. Plus, save on taxes with exemptions under Section 80D of the Income Tax Act.' }
      ]
    },
    {
      name: 'Arogya Supreme Health Insurance',
      premium: 'Premium starting from ₹ 7016',
      uin: 'SBIHLIP21043V012122',
      arn: '',
      cards: [
        { title: 'Wide Range of Sum Insured & Premium', text: 'Sum Insured: From ₹3 Lakhs to ₹1 Cr\nPremium: From ₹7016 (for 19 years adult for SI 3 lakhs in zone 1 under Pro plan) to ₹52993 ( for 45 years adult for SI 50 lakhs in zone 1 under Premium plan)' },
        { title: 'Comprehensive Health Coverage', text: 'Complete health protection with 20 basic covers and 8 optional add-ons.\nMaximize your coverage with a sum insured of up to ₹1 crore and long-term policy options available for up to 3 years.' },
        { title: 'Exclusive Benefits', text: 'Enjoy specialized covers such as Domestic Air Ambulance, Compassionate and Recovery Benefits, and E-opinion services for critical conditions. Preventive Health Check-ups are included when you renew your policy.' },
        { title: 'Discount Options', text: 'Take advantage of family discounts, loyalty discounts for long-term policyholders, and policy term discounts for extended coverage.' }
      ]
    },
    {
      name: 'Arogya Top Up Health Insurance',
      premium: 'Premium starting from ₹ 1490 onwards',
      uin: 'SBIHLIP21044V012122',
      arn: '',
      cards: [
        { title: 'Wide Range of Sum Insured & Premium', text: 'Premium: From ₹1490 to ₹9751 (for a 55 year adult for SI 5000000 with 1 Lakh deductible)' },
        { title: 'No Pre-Acceptance Medical Check-Up', text: 'Coverage available to individuals up to 55 years old with no prior medical conditions, ensuring easy access to health coverage.' },
        { title: 'Holistic & Family-Centric Coverage', text: 'Comprehensive protection for you and your family, covering 141 daycare treatments and both pre- and post-hospitalization expenses.' },
        { title: 'Enhanced Protection & Savings', text: 'Benefit from extensive coverage while saving on taxes under Section 126 of the Income Tax Act.' }
      ]
    },
    {
      name: 'Super Health Insurance',
      premium: 'Premium starting from ₹7904',
      uin: 'SBIHLIP24141V022324',
      arn: '',
      cards: [
        { title: 'Wide Range of Sum Insured & Premium', text: 'Sum Insured: From ₹5Lakhs to ₹10 Lakhs (PRIME plan)\nPremium: From ₹7,904 ( for 18 years adult) to ₹20,161 (for 55 years adult)' },
        { title: 'Extensive Health Coverage', text: 'Gain access to all inclusive covers, including pre & post-hospitalization and organ donor expenses cover for comprehensive care.' },
        { title: 'Boosted Health Benefits', text: 'Enjoy additional features like Reinsure Benefit, and annual health check-ups to support your long-term well-being.' }
      ]
    }
  ];

  const motorPolicies = [
    {
      name: 'Private Car Insurance Policy',
      premium: 'Premium starting from ₹250',
      uin: 'IRDAN144RP0005V03201112',
      arn: '',
      cards: [
        { title: 'Wide Range of Sum Insured & Premium', text: 'Sum Insured: Upto 95% of current market value\nPremium: From ₹250 to ₹10,00,000.' },
        { title: 'Essential Liability Coverage', text: 'Includes compulsory third-party liability and personal accident cover, offering essential protection against legal and personal injury expenses while on the road.' },
        { title: 'Customizable Add-On Benefits', text: 'Enhance your policy with additional covers like No Claim Bonus (NCB) protection, key replacement, bi-fuel kit cover, and coverage for personal belongings—all available at an added premium.' },
        { title: 'Extensive Legal Protection', text: 'Provides legal liability cover for paid drivers and employees, ensuring comprehensive support. The Return to Invoice feature guarantees reimbursement of your vehicle\'s full invoice value in case of total loss or theft.' }
      ]
    },
    {
      name: 'Two Wheeler Insurance Policy',
      premium: 'Premium starting from ₹1000',
      uin: 'IRDAN144RP0006V02201112',
      arn: '',
      cards: [
        { title: 'Sum Insured: Upto 95% of current market value', text: 'Premium: From ₹1000 to ₹10,00,000' },
        { title: 'No Claim Bonus Rewards', text: 'Enjoy premium discounts for claim-free years with the No Claim Bonus, allowing you to save more over time while maintaining continuous coverage.' },
        { title: 'Essential Liability & Accident Coverage', text: 'Stay protected with third-party liability and personal accident cover, covering legal liabilities and offering financial support for accidental injuries.' },
        { title: 'Comprehensive Vehicle Protection Add-Ons', text: 'Opt for add-ons like Return to Invoice, which reimburses the full value of your vehicle in case of total loss, and NCB Protection, which preserves your No Claim Bonus even after a claim. Additionally, coverage extends to accidental damage to your vehicle, providing peace of mind on every journey.' }
      ]
    }
  ];

  const travelPolicies = [
    {
      name: 'Travelsure - Group',
      premium: 'Premium starting from Rs. 231',
      uin: 'SBITGOP24085V022526',
      arn: '',
      cards: [
        { title: 'Wide Range of Benefits', text: 'Comprehensive coverage for Medical expenses, Travel Inconvenience, Personal Accident cover and more.' },
        { title: 'Quick Payout Process', text: 'Enjoy a hassle-free claims experience with our quick payout process, ensuring you receive funds swiftly and efficiently when you need them most.' },
        { title: 'Affordable Premiums', text: 'Affordable Premium starting from ₹231 (for single trip of 2 days with coverage of SI 100000 USD) for leisure travel.' },
        { title: 'Comprehensive Travel Cover—confidence without compromise', text: 'Confidently travel the world with extensive coverage—your journey protected, your peace of mind guaranteed.' }
      ]
    }
  ];

  const accidentPolicies = [
    {
      name: 'Group Personal Accident Insurance',
      premium: 'Premium starting from ₹100',
      uin: '',
      arn: '',
      cards: [
        { title: 'Wide range of sum insured & premium', text: 'Sum Insured: From ₹2 Lakhs to ₹60 Lakhs\nPremium: From ₹100 to ₹3,000' },
        { title: 'Accidental death', text: 'Lump-sum benefit payout in case of death resulting from accident.' },
        { title: 'Permanent Total Disability', text: 'Payout for permanent disability suffered from an accident' },
        { title: 'Child education cover', text: 'In case of death or PTD suffered by insured, payout for coverage of Child education.' },
        { title: 'Coverage Details:', text: '• Child Education - Covers up to max. of 1% of accidental death\'s sum insured or 20,000 INR whichever is lower for first & second child of insured member (In case of death or PTD admissible claim).\n• Repatriation & Funeral expenses - 1% Accidental Death\'s Sum insured subject to maximum of 10,000 INR.\n• Adaptation allowance (Home & Vehicle) - 1% Accidental Death\'s Sum insured subject to max of 20,000 INR in case of PTD admissible claim.\n• Ambulance cover - 1% Accidental Death\'s Sum insured up to maximum of 1500 INR per incident /accident towards admissible claim of death or PTD.' }
      ]
    }
  ];

  const policies = (insuranceType === 'General Insurance' || searchParams.get('insuranceType') === 'General Insurance')
    ? (activeTab === 'Accident Insurance' ? accidentPolicies : activeTab === 'Motor Insurance' ? motorPolicies : activeTab === 'Travel Insurance' ? travelPolicies : healthPolicies)
    : activeTab === 'Child Plans' 
    ? childPolicies 
    : activeTab === 'Retirement Plans' 
    ? retirementPolicies 
    : activeTab === 'Wealth Creation'
    ? wealthPolicies
    : activeTab === 'Protection Plans'
    ? protectionPolicies
    : savingsPolicies;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f2f8] font-sans">
      {/* Global Header */}
      <SbiGlobalBrandHeader activeNav="Insurance" />

      {/* Breadcrumb Navigation */}
      <div className="max-w-[1360px] w-full mx-auto px-4 md:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#673391]">
          <Link href="/dashboard" className="hover:underline flex items-center gap-1">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
          </Link>
          <span>&gt;</span>
          <span className="text-slate-700">Life Insurance</span>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-[1360px] w-full mx-auto px-4 md:px-8 pb-16 flex-1 space-y-6">

        {/* Top Hero Banner & Quick Links Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Hero Carousel Banner (9/12) */}
          <div className="lg:col-span-9 bg-gradient-to-r from-[#900037] via-[#a81446] to-[#490c66] rounded-2xl overflow-hidden shadow-sm relative flex flex-col justify-between p-6 md:p-8 min-h-[220px]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Left Offer Text */}
              <div className="md:col-span-4 text-white z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight">
                  Avail the offer designed for you.
                </h2>
              </div>

              {/* Center Image Graphic */}
              <div className="md:col-span-4 flex justify-center z-10">
                <div className="w-48 h-36 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg relative">
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&auto=format&fit=crop&q=80" 
                    alt="SBI Life Offer" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Protection Card */}
              <div className="md:col-span-4 bg-white rounded-xl p-4 text-center shadow-md z-10 flex flex-col items-center justify-between min-h-[140px]">
                <div className="flex items-center gap-2 text-[#900037] font-bold text-xs">
                  <span className="text-lg">{activeTab === 'Child Plans' ? '👶' : '🛡️'}</span>
                  <span>{activeTab === 'Child Plans' ? 'Child Plans' : 'Protection Plans'}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold mt-1">
                  {selectedPolicy}<br/>UIN: {policies.find(p => p.name === selectedPolicy)?.uin}
                </div>
                <button 
                  type="button" 
                  onClick={() => toast.success(`Initiating ${selectedPolicy} Application...`)}
                  className="bg-[#24135e] text-white hover:bg-[#1a0c49] text-xs font-bold py-1.5 px-6 rounded-full transition-colors mt-2"
                >
                  Buy now
                </button>
                <div className="text-[9px] text-slate-400 font-semibold mt-2">
                  SBI Life | www.sbilife.co.in
                </div>
              </div>

            </div>

            {/* Carousel Navigation Dots & Arrows */}
            <button 
              type="button" 
              onClick={() => setActiveBannerIndex((prev) => (prev === 0 ? 3 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button" 
              onClick={() => setActiveBannerIndex((prev) => (prev === 3 ? 0 : prev + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <div className="flex justify-center items-center gap-1.5 mt-4 z-10">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
                <div 
                  key={dot} 
                  className={`h-1.5 rounded-full transition-all ${
                    dot === activeBannerIndex ? 'w-6 bg-[#673391]' : 'w-1.5 bg-white/50'
                  }`} 
                />
              ))}
            </div>
          </div>

          {/* Right Column: Quick Links Card (3/12) */}
          <div className="lg:col-span-3 bg-[#f8f5fc] border border-purple-100 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
            <h3 className="text-sm font-extrabold text-[#673391] mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button 
                type="button"
                onClick={() => toast('Opening General Insurance...')}
                className="w-full bg-white border border-slate-200/80 hover:border-purple-300 py-2.5 px-4 rounded-xl text-left text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs transition-all"
              >
                <span>🛡️</span>
                <span>General Insurance</span>
              </button>

              <Link
                href="/home/landingPage/manageRelationship/insurance"
                className="w-full bg-white border border-slate-200/80 hover:border-purple-300 py-2.5 px-4 rounded-xl text-left text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs transition-all block"
              >
                <span>📑</span>
                <span>Manage Policies</span>
              </Link>

              <button 
                type="button"
                onClick={() => setShowResumeModal(true)}
                className="w-full bg-white border border-slate-200/80 hover:border-purple-300 py-2.5 px-4 rounded-xl text-left text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs transition-all"
              >
                <span>▶️</span>
                <span>Resume Application</span>
              </button>
            </div>
          </div>

        </div>

        {/* Insurance Section Heading */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#673391]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {insuranceType === 'General Insurance' ? 'General Insurance' : 'Life Insurance'}
          </h1>
          {insuranceType === 'General Insurance' ? (
            <div className="mt-3 bg-white border border-slate-200/80 rounded-xl p-3.5 text-xs font-bold text-slate-800 shadow-2xs">
              Keep your health, travel, and vehicles safe with our insurance, protecting you from life's unexpected events.
            </div>
          ) : searchParams.get('insuranceCategory') === '6' ? (
            <div className="mt-3 bg-white border border-slate-200/80 rounded-xl p-3.5 text-xs font-bold text-slate-800 shadow-2xs">
              A Life of assured happiness with ease
            </div>
          ) : activeTab === 'Wealth Creation' ? (
            <div className="mt-3 bg-[#fbf9fe] border border-purple-100 rounded-xl p-3.5 text-xs font-bold text-slate-800 shadow-2xs">
              An Individual, Unit Linked, Non-Participating, Life Insurance Saving Product
            </div>
          ) : (
            <p className="text-xs font-semibold text-slate-600 mt-1">
              Secure your today and tomorrow with a versatile insurance product
            </p>
          )}
        </div>

        {/* Sub-Category Pills */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {(insuranceType === 'General Insurance' ? [
            { id: 'Accident Insurance', label: 'Accident Insurance', icon: '🩺' },
            { id: 'Motor Insurance', label: 'Motor Insurance', icon: '🚘' },
            { id: 'Travel Insurance', label: 'Travel Insurance', icon: '🧳' },
            { id: 'Health Plans', label: 'Health Plans', icon: '🩺' },
            { id: 'Group Plans', label: 'Group Plans', icon: '👥' },
          ] : [
            { id: 'Protection Plans', label: 'Protection Plans', icon: '☂️' },
            { id: 'Child Plans', label: 'Child Plans', icon: '👶' },
            { id: 'Retirement Plans', label: 'Retirement Plans', icon: '🧑‍🦯' },
            { id: 'Wealth Creation', label: 'Wealth Creation', icon: '🌱' },
            { id: 'Savings Plans', label: 'Savings Plans', icon: '👛' },
          ]).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id as any)}
                className={`relative flex flex-col items-center justify-center px-6 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#673391] shadow-xs border border-purple-100/60'
                    : 'bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{tab.icon}</span>
                  <span className={isActive ? 'text-[#673391] font-extrabold' : ''}>{tab.label}</span>
                </div>

                {/* Bottom Purple Underline Indicator for Active Tab */}
                {isActive && (
                  <div className="absolute bottom-1 w-7 h-1 bg-[#673391] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Insurance Details Workspace: Left Policy Selector List & Right Plan Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Search & Policy List (4/12) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Search Box */}
            <div className="bg-white border border-slate-200/80 rounded-xl px-3 py-2 flex items-center gap-2 shadow-2xs">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Policy Selectable List */}
            <div className="space-y-3">
              {policies.map((p) => {
                const isSelected = selectedPolicy === p.name;
                return (
                  <div
                    key={p.name}
                    onClick={() => setSelectedPolicy(p.name)}
                    className={`rounded-2xl p-4 cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#673391] text-white border-[#673391] shadow-md'
                        : 'bg-white text-slate-900 border-slate-200/80 hover:border-purple-200 shadow-2xs'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className={`text-[11px] font-semibold mt-1 ${isSelected ? 'text-purple-100' : 'text-slate-500'}`}>
                      {p.premium}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Policy Benefits & Options (8/12) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Header Title & UIN */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="bg-[#673391] text-white px-4 py-1.5 rounded-lg text-xs font-bold">
                  {selectedPolicy}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Product UIN: {policies.find(p => p.name === selectedPolicy)?.uin || '111L144V01'}
                </div>
              </div>

              {/* Plan Benefits Sub-header */}
              <div>
                <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {activeTab === 'Protection Plans' ? (protectionPolicies.find(p => p.name === selectedPolicy)?.planTitle || 'Plan benefits') : 'Plan benefits'}
                </h3>
                <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  {insuranceType === 'General Insurance'
                    ? (healthPolicies.find(p => p.name === selectedPolicy)?.arn || '')
                    : activeTab === 'Protection Plans'
                    ? (protectionPolicies.find(p => p.name === selectedPolicy)?.arn || 'ARN No. 3C/YONO/Cr1/ver1/11/25/WEB/ENG')
                    : activeTab === 'Savings Plans'
                    ? (savingsPolicies.find(p => p.name === selectedPolicy)?.arn || 'ARN No. 2P/YONO/ver1/12/25/WEB/ENG')
                    : activeTab === 'Wealth Creation'
                    ? (wealthPolicies.find(p => p.name === selectedPolicy)?.arn || 'ARN No. 3M/YONO/ver1/12/24/WEB/ENG')
                    : selectedPolicy === 'SBI Life - Smart Platina Young Achiever'
                    ? 'ARN No. 3Y/YONO/Cr1/02/26/WEB/ENG'
                    : selectedPolicy === 'SBI Life - Smart Scholar Plus'
                    ? 'ARN No. 3Q/YONO/ver1/06/25/WEB/ENG'
                    : selectedPolicy === 'SBI Life - Retire Smart Plus'
                    ? 'ARN No. 2Y/YONO/ver1/10/25/WEB/ENG'
                    : selectedPolicy === 'SBI Life - Smart Annuity Plus'
                    ? 'ARN No. 2W/YONO/ver1/11/25/WEB/ENG'
                    : 'ARN No. 3C/YONO/Cr1/ver1/11/25/WEB/ENG'}
                </div>
              </div>

              {/* Protection Plans Plan A / Plan B Tabs (Only for eShield Insta) */}
              {activeTab === 'Protection Plans' && selectedPolicy === 'SBI Life - eShield Insta' && (
                <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan('Plan A')}
                    className={`text-sm font-bold pb-2 relative transition-colors ${
                      selectedPlan === 'Plan A' ? 'text-[#673391]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Plan A
                    {selectedPlan === 'Plan A' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan('Plan B')}
                    className={`text-sm font-bold pb-2 relative transition-colors ${
                      selectedPlan === 'Plan B' ? 'text-[#673391]' : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    Plan B
                    {selectedPlan === 'Plan B' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#673391] rounded-full" />
                    )}
                  </button>
                </div>
              )}

              {/* Feature Benefit Cards Rendered Based on Selected Policy */}
              {activeTab === 'Accident Insurance' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(accidentPolicies.find(p => p.name === selectedPolicy)?.cards || []).slice(0, 4).map((card, idx) => (
                      <div key={idx} className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                        <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                          {card.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* 5th Card: Full width Coverage Details list */}
                  {(accidentPolicies.find(p => p.name === selectedPolicy)?.cards || [])[4] && (
                    <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-5 space-y-2">
                      <h5 className="text-xs font-bold text-slate-900">
                        {(accidentPolicies.find(p => p.name === selectedPolicy)?.cards || [])[4].title}
                      </h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                        {(accidentPolicies.find(p => p.name === selectedPolicy)?.cards || [])[4].text}
                      </p>
                    </div>
                  )}
                </div>
              ) : activeTab === 'Travel Insurance' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(travelPolicies.find(p => p.name === selectedPolicy)?.cards || []).map((card, idx) => (
                    <div key={idx} className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'Motor Insurance' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(motorPolicies.find(p => p.name === selectedPolicy)?.cards || []).map((card, idx) => (
                    <div key={idx} className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'Health Plans' || insuranceType === 'General Insurance' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(healthPolicies.find(p => p.name === selectedPolicy)?.cards || []).map((card, idx) => (
                    <div key={idx} className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'Wealth Creation' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(wealthPolicies.find(p => p.name === selectedPolicy)?.cards || []).map((card, idx) => (
                    <div key={idx} className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'Savings Plans' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(savingsPolicies.find(p => p.name === selectedPolicy)?.cards || []).map((card, idx) => (
                    <div key={idx} className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                      <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'Protection Plans' ? (
                <>
                  {selectedPolicy === 'SBI Life - eShield Insta' && (
                    <h4 className="text-lg font-bold text-[#673391]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      Pure Term Insurance
                    </h4>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(((selectedPolicy === 'SBI Life - eShield Insta' && selectedPlan === 'Plan B')
                      ? protectionPolicies.find(p => p.name === selectedPolicy)?.planB
                      : protectionPolicies.find(p => p.name === selectedPolicy)?.planA) || []
                    ).map((b, idx) => (
                      <div key={idx} className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                        <h5 className="text-xs font-bold text-slate-900">{b.title}</h5>
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                          {b.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : activeTab === 'Retirement Plans' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(retirementPolicies.find(p => p.name === selectedPolicy)?.cards || []).map((card, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1 ${
                        card.title === 'Additional Feature' ? 'md:col-span-2' : ''
                      }`}
                    >
                      <h5 className="text-xs font-bold text-slate-900">{card.title}</h5>
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed whitespace-pre-line">
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : selectedPolicy === 'SBI Life - Smart Scholar Plus' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Sum Assured</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Limited Pay / Regular Pay: 10 x Annualized Premium<br/>Single Pay: 1.25 x Single Premium
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Life cover</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      For Parent (Life Assured): upto 65 years
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Twin Benefits</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Twin benefits of Insurance cover and market linked returns
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Dual Protection for your childs Future</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Payment of lumpsum benefit Inbuilt Premium Payor Waiver Benefit to ensure continuance of your policy
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Customize the plan to meet your requirements</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Flexibility to choose Policy Term, Premium Paying Term & Premium frequency as per your requirement
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Additional Coverage through Inbuilt Benefit</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Accident Benefit which includes Accidental Death and Accidental Total and Permanent Disability
                    </p>
                  </div>

                </div>
              ) : selectedPolicy === 'SBI Life - Smart Platina Young Achiever' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Annualized Premium</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Minimum: Rs.50,000<br/>Maximum: No Limit (As per the Board Approved Underwriting Policy)
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Entry Age</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Minimum Child's age at Entry: 30 days<br/>Maximum Child's age at Entry:15 years<br/>Minimum Proposer's age at Entry: 18 years<br/>Maximum Proposer's age at Entry: 65 years
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Customize the plan to meet your requirements</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Premium Payment term: 7 or 10 years<br/>Policy Term: 15 years to 25 years
                    </p>
                  </div>

                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Give your child a liberating future with Guaranteed Benefits</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Dream of giving your child a life full of opportunities is here. Empower your child's future with SBI Life – Smart Platina Young Achiever.
                    </p>
                  </div>

                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Enrollment process</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Easy enrolment through instant and swift processing of policy
                    </p>
                  </div>
                  <div className="bg-[#f8f6fc] border border-purple-100 rounded-xl p-4 space-y-1">
                    <h5 className="text-xs font-bold text-slate-900">Convenience</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                      Convenience of paying premium regularly for a period of 10 years
                    </p>
                  </div>
                </div>
              )}

              {/* Download Brochure & Proceed/Buy Now Button Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => toast.success('Downloading Brochure PDF...')}
                    className="text-xs font-bold text-[#673391] underline hover:opacity-85"
                  >
                    Download Brochure
                  </button>

                  {(insuranceType === 'General Insurance' || activeTab === 'Health Plans') && (
                    <button
                      type="button"
                      onClick={() => toast.success('Downloading Policy Wordings PDF...')}
                      className="text-xs font-bold text-[#673391] underline hover:opacity-85"
                    >
                      Policy Wordings
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toast.success(`Proceeding to buy ${selectedPolicy}...`)}
                  className="bg-[#673391] hover:bg-[#542777] text-white font-bold text-xs py-3 px-10 rounded-full shadow-sm transition-all"
                >
                  {insuranceType === 'General Insurance' || activeTab === 'Health Plans' ? 'Buy Now' : 'Proceed to Buy'}
                </button>
              </div>

              {/* Download FAQs box */}
              <div className="bg-[#fcfaff] border border-purple-100/90 rounded-xl p-4 flex items-center justify-between max-w-sm shadow-2xs">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Frequently asked questions</h5>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    Download FAQs for answers to queries
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => toast.success('Downloading FAQs...')}
                  className="w-8 h-8 rounded-full text-[#673391] flex items-center justify-center hover:bg-purple-100 transition-colors flex-shrink-0 ml-4"
                >
                  <Download size={16} />
                </button>
              </div>

              {/* Legal Disclaimer Box at Bottom (Only rendered for 1st Protection Plan: SBI Life - eShield Insta) */}
              {activeTab === 'Protection Plans' && selectedPolicy === 'SBI Life - eShield Insta' && (
                <div className="bg-[#f3f0f7] rounded-xl p-4 text-[11px] font-medium text-slate-600 leading-relaxed space-y-2 border border-purple-100/60">
                  <div className="flex items-start gap-2">
                    <span className="text-[#673391] font-bold">ⓘ</span>
                    <p>
                      * Premium range may vary based on frequency of premium payment and/or premium type selected. Premiums are subject to underwriting. The premium amount shown is inclusive of GST.
                    </p>
                  </div>
                  <p className="pl-5">
                    ** You may be eligible for Income Tax benefits as per the applicable income tax laws, which are subject to change from time to time. You are advised to consult your tax advisor on applicable tax benefits under the policy.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

      </main>

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
              className="absolute right-6 top-6 text-[#673391] hover:opacity-75 transition-opacity"
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
                className="bg-white border border-[#673391] hover:bg-[#673391] hover:text-white text-[#673391] font-semibold text-sm py-2 px-14 rounded-full transition-all shadow-2xs"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#333333] text-white text-xs py-3 text-center border-t border-slate-700">
        <div className="flex justify-center items-center gap-3">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}
