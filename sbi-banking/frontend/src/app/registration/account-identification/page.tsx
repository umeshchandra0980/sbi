'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, RefreshCw, Volume2, Globe, HelpCircle, PhoneCall, ChevronDown } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import './account-identification.css'

export default function AccountIdentificationPage() {
  const router = useRouter()
  const [accountNumber, setAccountNumber] = useState('')
  const [username, setUsername] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaCode, setCaptchaCode] = useState('D2JY7')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Generate random 5-character Captcha string
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let code = ''
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(code)
    setCaptchaInput('')
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleAudioCaptcha = () => {
    toast.success(`Audio Captcha: "${captchaCode.split('').join(' ')}"`, {
      icon: '🔊',
      duration: 4000
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!accountNumber || accountNumber.trim().length < 9) {
      toast.error('Please enter a valid Account Number.')
      return
    }

    if (!username || username.trim().length < 4) {
      toast.error('Please enter your Username.')
      return
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      toast.error('Incorrect Captcha code. Please try again.')
      generateCaptcha()
      return
    }

    setIsSubmitting(true)

    // Simulate backend submission delay
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      toast.success('Account Identification successful!')
    }, 1200)
  }

  const isFormValid =
    accountNumber.trim().length >= 9 &&
    username.trim().length >= 4 &&
    captchaInput.trim().length > 0

  return (
    <div className="yono-page-wrapper">
      <Toaster position="top-right" />

      {/* Utility Top Bar */}
      <div className="yono-top-bar">
        <div className="yono-top-left">
          <div className="yono-tab-active">Personal Banking</div>
        </div>
        <div className="yono-top-right">
          <a href="#main" className="yono-top-link">Skip to main content</a>
          <span className="yono-divider"></span>
          <a href="#" className="yono-top-link">
            Corporate website <Globe className="w-3.5 h-3.5 inline ml-1" />
          </a>
          <span className="yono-divider"></span>
          <a href="#" className="yono-top-link">
            Get Help <HelpCircle className="w-3.5 h-3.5 inline ml-1" />
          </a>
          <span className="yono-divider"></span>
          <a href="#" className="yono-top-link">
            WhatsApp <PhoneCall className="w-3.5 h-3.5 inline ml-1" />
          </a>
          <span className="yono-divider"></span>
          <div className="yono-top-link cursor-pointer">
            English <ChevronDown className="w-3.5 h-3.5 inline ml-0.5" />
          </div>
          <span className="yono-divider"></span>
          <div className="yono-font-size-ctrl">
            <span className="cursor-pointer">A-</span>
            <span className="cursor-pointer">A</span>
            <span className="cursor-pointer font-bold">A+</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="yono-nav-bar">
        <Link href="/" className="yono-logo-container">
          <div>
            <div className="yono-logo-text">
              <span className="text-[#B22382] font-extrabold">yono</span>
              <span className="yono-logo-badge">● SBI</span>
            </div>
            <span className="yono-logo-sub">NET-BANKING</span>
          </div>
        </Link>
        <ul className="yono-nav-links">
          <li><Link href="/" className="yono-nav-item">Home</Link></li>
          <li><Link href="/accounts" className="yono-nav-item">Accounts & Deposits</Link></li>
          <li><Link href="/loans" className="yono-nav-item">Loans</Link></li>
          <li><Link href="/cards" className="yono-nav-item">Cards</Link></li>
          <li><Link href="/investments" className="yono-nav-item">Investments</Link></li>
        </ul>
      </nav>

      {/* Main Page Area */}
      <main className="yono-main-content" id="main">
        <Link href="/" className="yono-breadcrumb">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="yono-page-heading">Username Activation</h1>

        <div className="yono-card">
          {/* Left Column Graphic */}
          <div className="yono-card-left">
            <svg
              className="yono-illustration"
              viewBox="0 0 320 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Glow */}
              <circle cx="160" cy="120" r="100" fill="#EFEAF6" opacity="0.6" />
              <ellipse cx="160" cy="205" rx="140" ry="12" fill="#D9CEE1" opacity="0.5" />
              
              {/* Classic Bank Building SVG */}
              <path d="M160 50 L70 90 L250 90 Z" fill="#76479B" />
              <rect x="80" y="90" width="160" height="12" fill="#4F286F" />
              <rect x="85" y="102" width="150" height="8" fill="#673391" />
              
              {/* Columns */}
              <rect x="98" y="110" width="18" height="75" rx="2" fill="#A081B9" />
              <rect x="135" y="110" width="18" height="75" rx="2" fill="#A081B9" />
              <rect x="172" y="110" width="18" height="75" rx="2" fill="#A081B9" />
              <rect x="209" y="110" width="18" height="75" rx="2" fill="#A081B9" />
              
              {/* Base */}
              <rect x="80" y="185" width="160" height="10" fill="#673391" />
              <rect x="70" y="195" width="180" height="10" fill="#4F286F" />
              
              {/* SBI Circle Emblem */}
              <circle cx="160" cy="74" r="10" fill="#FFFFFF" />
              <circle cx="160" cy="74" r="6" fill="#0088CC" />
              <rect x="158" y="74" width="4" height="6" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Right Column Form */}
          <div className="yono-card-right">
            {!isSuccess ? (
              <form onSubmit={handleSubmit}>
                <h2 className="yono-section-title">Account Identification</h2>

                {/* Field 1: Account Number */}
                <div className="yono-form-group">
                  <label htmlFor="accountNumber" className="yono-field-label">
                    Account Number
                  </label>
                  <input
                    id="accountNumber"
                    type="text"
                    className="yono-input-underlined"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={17}
                    placeholder=""
                    required
                  />
                  <div className="yono-helper-box">
                    Found on the first page of your passbook or monthly statement.!!!!
                  </div>
                </div>

                {/* Field 2: Username */}
                <div className="yono-form-group">
                  <label htmlFor="username" className="yono-field-label">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="yono-input-underlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20}
                    placeholder=""
                    required
                  />
                  <div className="yono-helper-box">
                    Sent through SMS on the registered mobile number.
                  </div>
                </div>

                {/* Field 3: Enter Captcha */}
                <div className="yono-form-group">
                  <label htmlFor="captcha" className="yono-field-label">
                    Enter Captcha
                  </label>
                  <div className="yono-captcha-row">
                    <div className="yono-captcha-input-container">
                      <input
                        id="captcha"
                        type="text"
                        className="yono-input-underlined"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        maxLength={6}
                        placeholder=""
                        required
                      />
                    </div>
                    <div className="yono-captcha-box-wrapper">
                      <div className="yono-captcha-img-box">
                        {captchaCode}
                      </div>
                      <button
                        type="button"
                        className="yono-icon-btn"
                        title="Audio Captcha"
                        onClick={handleAudioCaptcha}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="yono-icon-btn"
                        title="Refresh Captcha"
                        onClick={generateCaptcha}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer Submit Button */}
                <div className="yono-action-footer">
                  <button
                    type="submit"
                    className="yono-btn-proceed"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Proceed</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#F1F0F4] text-[#673391] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#673391] mb-2">Identification Verified</h3>
                <p className="text-gray-600 mb-6">
                  Account identification for <strong>{accountNumber}</strong> verified successfully. An activation OTP has been sent to your registered mobile number.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 border border-[#673391] text-[#673391] rounded-full font-semibold hover:bg-purple-50 transition"
                  >
                    Edit Details
                  </button>
                  <Link
                    href="/auth/login"
                    className="px-6 py-2 bg-[#673391] text-white rounded-full font-semibold hover:bg-[#4F286F] transition"
                  >
                    Proceed to Login
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
