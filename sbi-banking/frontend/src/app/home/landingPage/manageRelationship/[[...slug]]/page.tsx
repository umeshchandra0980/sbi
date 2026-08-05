'use client';

import React, { Suspense } from 'react';
import SbiLandingPageComponent from '@/components/banking/SbiLandingPageComponent';
import { useParams } from 'next/navigation';

export default function ManageRelationshipPage() {
  const params = useParams();
  const slug = params?.slug as string[] | undefined;

  let initialTab: 'Transaction' | 'Deposits' | 'Loans' | 'Investments' | 'Insurance' = 'Deposits';
  let initialInvestmentSubTab: 'Mutual Fund' | 'Demat & Securities' | 'PPF' | 'NPS' | 'IPO' = 'Mutual Fund';

  if (slug && slug.length > 0) {
    const firstSlug = slug[0].toLowerCase();
    if (firstSlug === 'loans') {
      initialTab = 'Loans';
    } else if (firstSlug === 'investments') {
      initialTab = 'Investments';
      if (slug.length > 1) {
        const subSlug = slug[1].toLowerCase();
        if (subSlug.includes('demat')) {
          initialInvestmentSubTab = 'Demat & Securities';
        } else if (subSlug.includes('ppf')) {
          initialInvestmentSubTab = 'PPF';
        } else if (subSlug.includes('nps')) {
          initialInvestmentSubTab = 'NPS';
        } else if (subSlug.includes('ipo')) {
          initialInvestmentSubTab = 'IPO';
        } else {
          initialInvestmentSubTab = 'Mutual Fund';
        }
      }
    } else if (firstSlug === 'insurance') {
      initialTab = 'Insurance';
    } else if (firstSlug === 'deposits') {
      initialTab = 'Deposits';
    } else if (firstSlug === 'transaction-accounts' || firstSlug === 'transactionaccounts') {
      initialTab = 'Transaction';
    }
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f3f4f9] text-sm text-slate-500">Loading...</div>}>
      <SbiLandingPageComponent
        initialTab={initialTab}
        initialInvestmentSubTab={initialInvestmentSubTab}
      />
    </Suspense>
  );
}
