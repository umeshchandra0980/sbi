'use client'

import { useRouter } from 'next/navigation'
import Header from '@/components/sbi-home/Header'
import Hero from '@/components/sbi-home/Hero'
import HomeCards from '@/components/sbi-home/HomeCards'
import OtherServices from '@/components/sbi-home/OtherServices'
import Footer from '@/components/sbi-home/Footer'
import StickyFooterBar from '@/components/sbi-home/StickyFooterBar'
import '@/app/sbi-home.css'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <div className="site" style={{ paddingBottom: '48px' }}>
      {/* Premium Developer Quick Access Banner */}
      <div className="bg-gradient-to-r from-violet-800 to-indigo-900 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs font-medium z-50 sticky top-0 shadow-md">
        <div className="flex items-center gap-2">
          <span className="bg-violet-700 text-yellow-400 font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
            <Sparkles size={12} /> DEMO PORTAL
          </span>
          <span className="text-violet-100 hidden sm:inline">
            Direct access to the banking dashboards bypassing all multi-step forms and verification checks.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.push('/auth/login')}
            className="bg-yellow-500 hover:bg-yellow-400 text-violet-950 font-bold px-3 py-1.5 rounded transition-all flex items-center gap-1 shadow-sm"
          >
            Quick Access / Login Panel <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <Header />
      <Hero />
      <HomeCards />
      <OtherServices />
      <Footer />
      <StickyFooterBar />
    </div>
  )
}
