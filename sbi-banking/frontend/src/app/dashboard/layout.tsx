'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Wallet, ArrowLeftRight, History,
  FileText, Users, LogOut, Settings, Bell, ChevronDown, Shield
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import Cookies from 'js-cookie'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/accounts', icon: Wallet, label: 'My Accounts' },
  { href: '/transfers', icon: ArrowLeftRight, label: 'Fund Transfer' },
  { href: '/transactions', icon: History, label: 'Transactions' },
  { href: '/statements', icon: FileText, label: 'Statements' },
]

const adminNav = [
  { href: '/admin', icon: Shield, label: 'Admin Panel' },
  { href: '/admin/users', icon: Users, label: 'Manage Users' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token && !isAuthenticated) {
      router.replace('/auth/login')
    }
  }, [isAuthenticated, router])

  const isActive = (href: string) =>
    pathname === href || (href !== '/dashboard' && pathname.startsWith(href))

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top header */}
      <header className="bg-sbi-blue text-white flex items-center justify-between px-4 py-2 shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white text-sbi-blue font-bold text-base px-2 py-0.5 rounded leading-none">◎SBI</div>
          <span className="text-xs tracking-widest opacity-80">ONLINE BANKING</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px]">3</span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <div className="w-7 h-7 rounded-full bg-white text-sbi-blue flex items-center justify-center font-bold text-xs">
              {user?.full_name?.[0] || 'U'}
            </div>
            <div className="text-xs">
              <p className="font-semibold leading-none">{user?.full_name || 'User'}</p>
              <p className="opacity-70 text-[10px] capitalize">{user?.role}</p>
            </div>
            <ChevronDown size={12} />
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded transition-colors"
          >
            <LogOut size={12} /> Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-48 bg-sbi-navy text-white flex flex-col py-4 flex-shrink-0">
          <nav className="flex-1 space-y-0.5 px-2">
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs transition-colors ${
                  isActive(href)
                    ? 'bg-sbi-blue text-white font-semibold'
                    : 'text-gray-300 hover:bg-sbi-blue-dark hover:text-white'
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}

            {user?.role === 'admin' && (
              <>
                <div className="border-t border-gray-600 my-2" />
                {adminNav.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded text-xs transition-colors ${
                      isActive(href)
                        ? 'bg-sbi-blue text-white font-semibold'
                        : 'text-gray-300 hover:bg-sbi-blue-dark hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          <div className="px-3 mt-4">
            <Link
              href="/settings"
              className="flex items-center gap-2 text-gray-400 hover:text-white text-xs px-2 py-1.5 rounded hover:bg-sbi-blue-dark"
            >
              <Settings size={13} /> Settings
            </Link>
          </div>

          <div className="px-4 mt-4 pb-2">
            <div className="border border-gray-600 rounded p-2 text-[10px] text-gray-400">
              <p className="font-semibold text-gray-300 mb-1">Security Tips</p>
              <p>Never share your password or OTP with anyone.</p>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-gray-100 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
