'use client'

import React, { Suspense } from 'react';
import SettingsContent from '@/components/profile/SettingsContent';

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f0f8] flex items-center justify-center font-sans text-[#673391] font-bold">Loading...</div>}>
      <SettingsContent />
    </Suspense>
  );
}
