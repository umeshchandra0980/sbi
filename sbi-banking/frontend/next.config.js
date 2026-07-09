/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  async redirects() {
    return [
      {
        source: '/web/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/documents/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/npersonal/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/sbijava/:path*',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
