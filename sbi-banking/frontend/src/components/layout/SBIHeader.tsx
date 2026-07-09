'use client'
import Link from 'next/link'
import { Globe } from 'lucide-react'

interface HeaderProps {
  variant?: 'landing' | 'portal'
}

export default function SBIHeader({  }: HeaderProps) {
  return (
    <>
      {/* Top utility bar */}
    
    </>
  )
}

export function SBILogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-sbi-blue text-white font-bold text-lg px-2 py-1 rounded leading-none">
        ◎SBI
      </div>
      <span className="text-gray-500 text-xs tracking-widest uppercase">ONLINE</span>
    </div>
  )
}
