'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { RefreshCw, ArrowLeft, ChevronRight } from 'lucide-react'
import { authApi, captchaApi } from '@/lib/api'
import { COUNTRIES } from '@/data/countries'
import './register.css'

const regSchema = z.object({
  account_number: z.string().min(9, 'Account Number is required (9-17 digits)').max(17),
  cif_number: z.string().min(1, 'CIF Number is required').max(20),
  branch_code: z.string().length(5, 'Branch code must be 5 digits'),
  country_code: z.string().min(1, 'Please select country'),
  mobile_number: z.string().min(8, 'Enter valid mobile number').max(11),
  facility: z.string().min(1, 'Please select facility'),
  captcha: z.string().min(1, 'Please enter the captcha'),
})

type RegForm = z.infer<typeof regSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<'1' | '2'>('1')
  const [regType, setRegType] = useState<'registerHere' | 'activationOfUserName'>('registerHere')

  // captcha
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaSrc, setCaptchaSrc] = useState('')
  const [captchaType, setCaptchaType] = useState<'IMG' | 'AUD'>('IMG')

  const form = useForm<RegForm>({ resolver: zodResolver(regSchema) })
  const [loading, setLoading] = useState(false)
  const [consent, setConsent] = useState(false)
  const [result, setResult] = useState<{ username: string; message: string } | null>(null)
  const objectUrlRef = useRef('')

  async function loadCaptcha(type: 'IMG' | 'AUD' = 'IMG') {
    try {
      const res = await captchaApi.image()
      const token = res.headers['x-captcha-token'] as string
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
      const url = URL.createObjectURL(res.data)
      objectUrlRef.current = url
      setCaptchaToken(token)
      setCaptchaSrc(url)
      if (type === 'AUD') playAudio(token)
    } catch {
      toast.error('Failed to load captcha')
    }
  }

  function playAudio(token: string) {
    if (!token) return
    captchaApi.audio(token).then((res) => {
      const url = URL.createObjectURL(res.data)
      new Audio(url).play().catch(() => {})
    })
  }

  useEffect(() => {
    if (step === '2') loadCaptcha('IMG')
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  function refreshCaptcha() {
    loadCaptcha(captchaType)
  }

  function goToStep2(type: 'registerHere' | 'activationOfUserName') {
    if (type === 'activationOfUserName') {
      router.push('/auth/activate')
      return
    }
    setRegType(type)
    setStep('2')
  }

  async function handleSubmit(data: RegForm) {
    // verify captcha first
    try {
      await captchaApi.verify(captchaToken, data.captcha)
    } catch {
      form.setError('captcha', { message: 'Incorrect captcha. Please try again.' })
      refreshCaptcha()
      return
    }
    if (!consent) {
      toast.error('Please provide your consent to proceed.')
      return
    }
    setLoading(true)
    try {
      const res = await authApi.register({
        account_number: data.account_number,
        cif_number: data.cif_number,
        branch_code: data.branch_code,
        country_code: data.country_code,
        mobile_number: data.mobile_number,
        facility: data.facility,
        captcha_token: captchaToken,
        captcha_answer: data.captcha,
      })
      setResult(res.data)
      toast.success('Registration submitted')
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Registration failed')
      refreshCaptcha()
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="reg-wrapper">
      {/* Header */}
      <header className="reg-header">
        <div className="reg-logo">
          <a href="/" aria-label="SBI Logo">
            <img src="/images/logo.png" alt="SBI Logo" />
          </a>
        </div>
      </header>

      <main className="reg-main">
        {step === '1' && (
          <div className="reg-landing-container">
            <button className="back-to-home-btn" onClick={() => router.push('/')}>
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </button>
            <h1 className="reg-main-title">New User Registration</h1>
            
            <div className="reg-split-layout">
              {/* Left Column - Carousel */}
              <div className="reg-carousel-col">
                <div className="reg-carousel-wrapper">
                  <img 
                    src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/cyber-security-lr" 
                    alt="Cyber Security"
                    className="reg-carousel-img"
                  />
                  <div className="reg-carousel-controls">
                    <div className="reg-carousel-indicators">
                      <span className="reg-indicator active"></span>
                      <span className="reg-indicator"></span>
                      <span className="reg-indicator"></span>
                    </div>
                    <div className="reg-carousel-arrows">
                      <button aria-label="Previous">&lt;</button>
                      <button aria-label="Pause">
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>||</span>
                      </button>
                      <button aria-label="Next">&gt;</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vertical Dashed Line */}
              <div className="reg-vertical-divider"></div>

              {/* Right Column - Options */}
              <div className="reg-options-col">
                <h2 className="reg-options-title">Please choose a mode of registration:</h2>
                
                <div className="reg-option-card" onClick={() => goToStep2('registerHere')} tabIndex={0}>
                  <div className="reg-option-icon">
                    <img src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/credit_card-lp_svg" alt="Debit Card" />
                  </div>
                  <div className="reg-option-content">
                    <h3>Debit Card</h3>
                    <p>Register account by using one of your debit cards</p>
                  </div>
                  <div className="reg-option-arrow">
                    <ChevronRight size={20} />
                  </div>
                </div>

                <div className="reg-option-card" onClick={() => goToStep2('registerHere')} tabIndex={0}>
                  <div className="reg-option-icon">
                    <img src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/personal_loan-lp_svg" alt="YONO Mobile App" />
                  </div>
                  <div className="reg-option-content">
                    <h3>YONO Mobile App</h3>
                    <p>Register account using your Yono Mobile App</p>
                  </div>
                  <div className="reg-option-arrow">
                    <ChevronRight size={20} />
                  </div>
                </div>

                <div className="reg-option-card" onClick={() => goToStep2('registerHere')} tabIndex={0}>
                  <div className="reg-option-icon">
                    <img src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/current_account-lp_svg" alt="Branch Activation" />
                  </div>
                  <div className="reg-option-content">
                    <h3>Branch Activation</h3>
                    <p>Register account by visiting the Branch</p>
                  </div>
                  <div className="reg-option-arrow">
                    <ChevronRight size={20} />
                  </div>
                </div>
                
                {/* Fallback option for "Activation of Username" since it was in the old form */}
                <div className="reg-option-card" onClick={() => goToStep2('activationOfUserName')} tabIndex={0} style={{ marginTop: '24px', backgroundColor: '#f9f9f9', borderStyle: 'dashed' }}>
                  <div className="reg-option-icon">
                    <img src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/update_kyc-lp_svg" alt="Activation of Username" />
                  </div>
                  <div className="reg-option-content">
                    <h3>Activation Of Username</h3>
                    <p>Already registered? Activate your username here</p>
                  </div>
                  <div className="reg-option-arrow">
                    <ChevronRight size={20} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {step === '2' && !result && (
          <div className="reg-container">
            <h1 className="reg-title">
              {regType === 'registerHere'
                ? 'User Driven Registration - New User'
                : 'Activation Of Username'}
            </h1>

            <p className="reg-mandatory">Mandatory fields are marked with an asterisk (*)</p>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="reg-row">
                <label className="reg-label" htmlFor="accountNo">
                  Account Number <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <input
                    id="accountNo"
                    className="reg-input"
                    maxLength={17}
                    {...form.register('account_number')}
                    onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
                <div className="reg-hint">(Account Number is available in your passbook and/or statement of account)</div>
              </div>
              {form.formState.errors.account_number && (
                <p className="reg-err">{form.formState.errors.account_number.message}</p>
              )}

              <div className="reg-row">
                <label className="reg-label" htmlFor="cifNo">
                  CIF Number <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <input
                    id="cifNo"
                    className="reg-input"
                    maxLength={20}
                    {...form.register('cif_number')}
                    onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
                <div className="reg-hint">(CIF Number is available in your passbook and/or statement of account)</div>
              </div>
              {form.formState.errors.cif_number && (
                <p className="reg-err">{form.formState.errors.cif_number.message}</p>
              )}

              <div className="reg-row">
                <label className="reg-label" htmlFor="branchCode">
                  Branch Code <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <input
                    id="branchCode"
                    className="reg-input"
                    maxLength={5}
                    {...form.register('branch_code')}
                    onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
                <div className="reg-hint">(Please enter 5 digit branch code)</div>
              </div>
              {form.formState.errors.branch_code && (
                <p className="reg-err">{form.formState.errors.branch_code.message}</p>
              )}

              <div className="reg-row">
                <label className="reg-label" htmlFor="selCountry">
                  Country <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <select
                    id="selCountry"
                    className="reg-input reg-select"
                    {...form.register('country_code')}
                    defaultValue=""
                  >
                    <option value="">-- Select Country --</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {form.formState.errors.country_code && (
                <p className="reg-err">{form.formState.errors.country_code.message}</p>
              )}

              <div className="reg-row">
                <label className="reg-label" htmlFor="mobileNo">
                  Registered mobile Number <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <input
                    id="mobileNo"
                    className="reg-input"
                    maxLength={11}
                    {...form.register('mobile_number')}
                    onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
              </div>
              {form.formState.errors.mobile_number && (
                <p className="reg-err">{form.formState.errors.mobile_number.message}</p>
              )}

              <div className="reg-row">
                <label className="reg-label" htmlFor="txnRights">
                  Facility Required <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <select
                    id="txnRights"
                    className="reg-input reg-select"
                    {...form.register('facility')}
                    defaultValue=""
                  >
                    <option value="">-- Select Transaction Rights --</option>
                    <option value="Full Transaction Rights">Full Transaction Rights</option>
                    <option value="Limited Transaction Rights">Limited Transaction Rights</option>
                    <option value="View Rights">View Rights</option>
                  </select>
                </div>
              </div>
              {form.formState.errors.facility && (
                <p className="reg-err">{form.formState.errors.facility.message}</p>
              )}

              {/* Captcha */}
              <div className="reg-captcha-block">
                <div className="reg-captcha-label" id="imgselection">
                  Enter the text as shown in the image <span className="reg-req">*</span>
                </div>
                <div className="reg-captcha-input-row">
                  <input
                    id="loginCaptchaValue"
                    className="reg-input reg-captcha-input"
                    maxLength={6}
                    autoComplete="off"
                    {...form.register('captcha')}
                  />
                </div>
                <div className="reg-captcha-options">
                  <span>Select one of the Captcha options <span className="reg-req">*</span></span>
                  <label className="reg-radio-inline">
                    <input
                      type="radio"
                      name="optionOfCaptcha"
                      checked={captchaType === 'IMG'}
                      onChange={() => { setCaptchaType('IMG'); if (!captchaSrc) loadCaptcha('IMG') }}
                    />
                    <span style={{ color: '#c33a1a' }}>Image Captcha</span>
                  </label>
                  <label className="reg-radio-inline">
                    <input
                      type="radio"
                      name="optionOfCaptcha"
                      checked={captchaType === 'AUD'}
                      onChange={() => { setCaptchaType('AUD'); playAudio(captchaToken) }}
                    />
                    <span style={{ color: '#c33a1a' }}>Audio Captcha</span>
                  </label>
                </div>
                {captchaType === 'IMG' ? (
                  <div className="reg-captcha-img-row">
                    {captchaSrc ? (
                      <img src={captchaSrc} alt="CAPTCHA" className="reg-captcha-img" />
                    ) : (
                      <span>Loading...</span>
                    )}
                    <button type="button" onClick={refreshCaptcha} className="reg-captcha-refresh" aria-label="Refresh Captcha">
                      <RefreshCw size={16} />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => playAudio(captchaToken)} className="reg-btn reg-btn-sm">
                    ▶ Play Audio Captcha
                  </button>
                )}
              </div>
              {form.formState.errors.captcha && (
                <p className="reg-err">{form.formState.errors.captcha.message}</p>
              )}

              {/* Consent */}
              <div className="reg-consent">
                <p>Dear Customer,</p>
                <span>
                  After onboarding on SBI Online, the created user ID will be enabled for login through YONO and
                  YONO Lite as well, in addition to SBI Online.
                </span>
                <p>By clicking on &apos;I Agree&apos; you hereby give consent for the same. Please do not share your login credentials with anyone.</p>
                <label className="reg-consent-check">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> I Agree
                </label>
              </div>

              <div className="reg-btn-row">
                <button type="button" className="reg-btn reg-btn-secondary" onClick={() => setStep('1')}>
                  Back
                </button>
                <button type="submit" className="reg-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        )}


        {step === '2' && result && (
          <div className="reg-container reg-success">
            <h1 className="reg-title">Registration Submitted</h1>
            <div className="reg-success-box">
              <p><strong>Username:</strong> {result.username}</p>
              <p>{result.message}</p>
            </div>
            <div className="reg-btn-row">
              <button type="button" className="reg-btn" onClick={() => router.push('/auth/login')}>
                Go to Login
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="reg-footer" id="footer">
        <div className="reg-footer-inner">
          <div className="reg-footer-left">
            <p>© State Bank of India</p>
          </div>
          <div className="reg-footer-right">
            <ul className="reg-footer-links">
              <li><a href="/sbijava/retail/html/Privacy_Statement.html" target="_blank" rel="noopener noreferrer">Privacy Statement</a></li>
              <li><a href="/sbijava/retail/html/hmpg_disclosure.html" target="_blank" rel="noopener noreferrer">Disclosure</a></li>
              <li><a href="/sbijava/retail/html/Terms_of_Use.html" target="_blank" rel="noopener noreferrer">Terms of Service (Terms &amp; Conditions)</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}
