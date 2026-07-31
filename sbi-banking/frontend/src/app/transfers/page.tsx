'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TransfersPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home/landingPage/fund-transfer/quick-transfer/bank-selection');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f3f4f9] flex items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-3">
        <div className="w-10 h-10 border-4 border-[#673391] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-xs font-bold text-[#673391]">Redirecting to SBI Net-Banking Fund Transfer...</p>
      </div>
    </div>
  );
}
