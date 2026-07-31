'use client';

import React from 'react';
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
      if (slug.length > 1 && slug[1].toLowerCase() === 'mutual-fund') {
        initialInvestmentSubTab = 'Mutual Fund';
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
    <SbiLandingPageComponent
      initialTab={initialTab}
      initialInvestmentSubTab={initialInvestmentSubTab}
    />
  );
}
