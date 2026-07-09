import SBIHeader from '@/components/layout/SBIHeader'
import SBIFooter from '@/components/layout/SBIFooter'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <SBIHeader />
      <main className="flex-1">{children}</main>
      <SBIFooter />
    </div>
  )
}
