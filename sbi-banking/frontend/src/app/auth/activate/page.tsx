'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { RefreshCw } from 'lucide-react'
import { authApi, captchaApi } from '@/lib/api'
import './register.css'

const activationSchema = z.object({
  temp_username: z.string().min(1, 'Temporary Username is required').max(16),
  cif_number: z.string().min(1, 'CIF Number is required').max(20),
  date_of_birth: z.string().min(1, 'Date of Birth is required'),
  captcha: z.string().min(1, 'Please enter the captcha'),
})

type ActivationForm = z.infer<typeof activationSchema>

export default function ActivatePage() {
  const router = useRouter()
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaSrc, setCaptchaSrc] = useState('')
  const [captchaType, setCaptchaType] = useState<'IMG' | 'AUD'>('IMG')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ username: string; message: string } | null>(null)
  const objectUrlRef = useRef('')

  const form = useForm<ActivationForm>({ resolver: zodResolver(activationSchema) })

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
    loadCaptcha('IMG')
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function refreshCaptcha() {
    loadCaptcha(captchaType)
  }

  async function handleActivate(data: ActivationForm) {
    try {
      await captchaApi.verify(captchaToken, data.captcha)
    } catch {
      form.setError('captcha', { message: 'Incorrect captcha. Please try again.' })
      refreshCaptcha()
      return
    }
    setLoading(true)
    try {
      const res = await authApi.activate({
        temp_username: data.temp_username,
        cif_number: data.cif_number,
        date_of_birth: data.date_of_birth,
        captcha_token: captchaToken,
        captcha_answer: data.captcha,
      })
      setResult(res.data)
      toast.success('Username activated successfully')
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Activation failed')
      refreshCaptcha()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="reg-wrapper">
      <header className="reg-header">
        <div className="reg-logo">
          <a href="/" aria-label="SBI Logo">
            <img src="/images/logo.png" alt="SBI Logo" />
          </a>
        </div>
      </header>

      <main className="reg-main">
        {!result ? (
          <div className="reg-container">
            <h1 className="reg-title">Activation of Username (For Retail customers only)</h1>
            <p className="reg-mandatory">Mandatory fields are marked with an asterisk (*)</p>

            <form onSubmit={form.handleSubmit(handleActivate)}>
              <div className="reg-row">
                <label className="reg-label" htmlFor="tempUserName">
                  Temporary Username <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <input
                    id="tempUserName"
                    className="reg-input"
                    maxLength={16}
                    autoComplete="off"
                    {...form.register('temp_username')}
                  />
                </div>
              </div>
              {form.formState.errors.temp_username && (
                <p className="reg-err">{form.formState.errors.temp_username.message}</p>
              )}

              <div className="reg-row">
                <label className="reg-label" htmlFor="actCif">
                  CIF Number <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <input
                    id="actCif"
                    className="reg-input"
                    maxLength={20}
                    {...form.register('cif_number')}
                    onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''))}
                  />
                </div>
              </div>
              {form.formState.errors.cif_number && (
                <p className="reg-err">{form.formState.errors.cif_number.message}</p>
              )}

              <div className="reg-row">
                <label className="reg-label" htmlFor="dob">
                  Date of Birth <span className="reg-req">*</span>
                </label>
                <div className="reg-input-wrap">
                  <input
                    id="dob"
                    className="reg-input"
                    placeholder="[dd/mm/yyyy]"
                    maxLength={10}
                    {...form.register('date_of_birth')}
                  />
                </div>
              </div>
              {form.formState.errors.date_of_birth && (
                <p className="reg-err">{form.formState.errors.date_of_birth.message}</p>
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
                      name="optionOfCaptchaAct"
                      checked={captchaType === 'IMG'}
                      onChange={() => { setCaptchaType('IMG'); if (!captchaSrc) loadCaptcha('IMG') }}
                    />
                    <span style={{ color: '#c33a1a' }}>Image Captcha</span>
                  </label>
                  <label className="reg-radio-inline">
                    <input
                      type="radio"
                      name="optionOfCaptchaAct"
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

              <div className="reg-btn-row">
                <button type="button" className="reg-btn reg-btn-secondary" onClick={() => router.push('/auth/register')}>
                  Back
                </button>
                <button type="submit" className="reg-btn" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button type="reset" className="reg-btn reg-btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="reg-container reg-success">
            <h1 className="reg-title">Activation Complete</h1>
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
