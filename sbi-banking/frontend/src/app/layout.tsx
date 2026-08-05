import type { Metadata } from 'next'
import { Open_Sans, Roboto } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/components/layout/QueryProvider'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SBI Online Banking',
  description: 'State Bank of India - Personal Internet Banking',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${roboto.variable}`}>
      <body className={`${roboto.className} antialiased bg-gray-100 text-[14px] text-gray-800`}>
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
