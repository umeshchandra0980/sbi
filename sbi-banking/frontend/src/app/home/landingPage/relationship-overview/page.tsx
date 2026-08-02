'use client';

import React, { Suspense } from 'react';
import SbiLandingPageComponent from '@/components/banking/SbiLandingPageComponent';

export default function RelationshipOverviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f3f4f9] text-sm text-slate-500">Loading...</div>}>
      <SbiLandingPageComponent initialTab="Deposits" />
    </Suspense>
  );
}
