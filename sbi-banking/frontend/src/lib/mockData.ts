// mockData.ts - Standalone Rich Mock Data Layer for SBI YONO 2.0 Portal

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name: string;
  cif: string;
  dob: string;
  mobile: string;
  ckyc: string;
  pan: string;
  fathers_name: string;
  comm_address: string;
  perm_address: string;
  marital_status: string;
  religion: string;
  category: string;
  occupation: string;
  occupation_sub_type: string;
  education: string;
  annual_income: string;
  source_of_income: string;
  profile_completion: number;
  kyc_status: string;
  role: string;
  status: string;
}

export interface BankAccount {
  account_number: string;
  masked_account_number: string;
  account_type: string;
  holder_name: string;
  balance: number;
  currency: string;
  bank_name: string;
  branch: string;
  ifsc: string;
  mmid: string;
  vpa: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  reference_no: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  balance_after: number;
  category: string;
}

export const MOCK_USER: UserProfile = {
  id: 'usr_sbi_98765',
  username: 'dumpala',
  email: 'dumpala.vishnu@example.com',
  full_name: 'DUMPALA VISHNU VARDHAN',
  cif: '9876545720',
  dob: '15/08/2000',
  mobile: '9876545933',
  ckyc: '987654322966',
  pan: 'ABCDE6421H',
  fathers_name: 'D SHYAMSUNDER',
  comm_address: 'H NO 6-20 KUNARAM PEDDAPALLI TELANGANA 505174',
  perm_address: 'H NO 6-20 KUNARAM KALVASRIRAMPUR Srirampur KARIMNAGAR TELANGANA 505174',
  marital_status: 'Single',
  religion: 'Hindu',
  category: 'General',
  occupation: 'Others',
  occupation_sub_type: 'Students',
  education: 'Matriculate',
  annual_income: '2,00,000',
  source_of_income: 'Allowance / Savings',
  profile_completion: 66,
  kyc_status: 'KYC Updated',
  role: 'customer',
  status: 'active'
};

export const MOCK_ACCOUNTS: BankAccount[] = [
  {
    account_number: '37608427054',
    masked_account_number: 'XXXXXXX7054',
    account_type: 'Savings Account',
    holder_name: 'DUMPALA VISHNU VARDHAN',
    balance: 0.09,
    currency: 'INR',
    bank_name: 'SBI',
    branch: 'PEDDAPALLI',
    ifsc: 'SBIN0020138',
    mmid: '9002138',
    vpa: 'dumpala@sbi'
  },
  {
    account_number: '40192837465',
    masked_account_number: 'XXXXXXX7465',
    account_type: 'Fixed Deposit Account',
    holder_name: 'DUMPALA VISHNU VARDHAN',
    balance: 500000.00,
    currency: 'INR',
    bank_name: 'SBI',
    branch: 'PEDDAPALLI',
    ifsc: 'SBIN0020138',
    mmid: '-',
    vpa: 'NA'
  },
  {
    account_number: '20938475612',
    masked_account_number: 'XXXXXXX5612',
    account_type: 'Home Loan Account',
    holder_name: 'DUMPALA VISHNU VARDHAN',
    balance: 2250000.00,
    currency: 'INR',
    bank_name: 'SBI',
    branch: 'PEDDAPALLI',
    ifsc: 'SBIN0020138',
    mmid: '-',
    vpa: 'NA'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN10098231',
    date: '31/07/2026',
    description: 'UPI/P2A/6213876451/RAHUL SHARMA/SBIN',
    reference_no: 'TRANSFER_621387',
    type: 'CREDIT',
    amount: 15000.00,
    balance_after: 145280.50,
    category: 'UPI Transfer'
  },
  {
    id: 'TXN10098230',
    date: '30/07/2026',
    description: 'ATM WDL/SBI PEDDAPALLI BR/PEDDAPALLI',
    reference_no: 'ATMWDL_901823',
    type: 'DEBIT',
    amount: 4000.00,
    balance_after: 130280.50,
    category: 'Cash Withdrawal'
  },
  {
    id: 'TXN10098229',
    date: '28/07/2026',
    description: 'INT CREDITED/SAVINGS ACC/Q1 FY26',
    reference_no: 'INTCRED_382109',
    type: 'CREDIT',
    amount: 1280.50,
    balance_after: 134280.50,
    category: 'Interest'
  },
  {
    id: 'TXN10098228',
    date: '25/07/2026',
    description: 'NEFT/N2062638219/AMAZON PAY INDIA/SBIN',
    reference_no: 'NEFT_918237',
    type: 'DEBIT',
    amount: 2499.00,
    balance_after: 133000.00,
    category: 'Online Shopping'
  },
  {
    id: 'TXN10098227',
    date: '20/07/2026',
    description: 'IMPS/P2A/621938/SWIGGY FOOD/HDFC',
    reference_no: 'IMPS_821039',
    type: 'DEBIT',
    amount: 650.00,
    balance_after: 135499.00,
    category: 'Food & Dining'
  }
];
