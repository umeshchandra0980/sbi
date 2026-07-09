import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/components/layout/QueryProvider'

export const metadata: Metadata = {
  title: 'SBI Online Banking',
  description: 'State Bank of India - Personal Internet Banking',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-100 text-sm text-gray-800">
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { fontSize: '13px' },
              success: { style: { background: '#d5f5e3', color: '#1e8449' } },
              error: { style: { background: '#fadbd8', color: '#c0392b' } },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}
