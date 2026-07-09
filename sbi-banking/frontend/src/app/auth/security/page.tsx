'use client'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div>
      {/* Hero */}
      <div
        className="flex justify-between items-center px-12 py-8"
        style={{ background: 'linear-gradient(to right, #d6eaf8, #aed6f1, #85c1e9)' }}
      >
        <h2 className="text-3xl italic font-bold text-sbi-blue">Personal Banking</h2>
        <div className="flex flex-col items-end gap-3">
          <Link
            href="/auth/login"
            className="bg-sbi-blue text-white px-6 py-2.5 rounded text-sm flex items-center gap-2 hover:bg-sbi-blue-dark font-medium"
          >
            CONTINUE TO LOGIN <ChevronRight size={16} />
          </Link>
          <div className="bg-sbi-blue text-white text-xs px-4 py-2 rounded text-center">
            Dear Customer, OTP based login is<br />introduced for added security
          </div>
        </div>
      </div>

      {/* Links bar */}
      <div className="bg-blue-50 border-b border-gray-200 flex justify-end gap-4 px-5 py-1.5 text-xs">
        {['SBI Limited Liability Policy', 'Privacy Statement', 'Disclosure', 'Terms of Service (Terms & Conditions)'].map((l) => (
          <Link key={l} href="#" className="text-sbi-blue hover:underline">{l}</Link>
        ))}
      </div>

      {/* Terms note */}
      <div className="bg-gray-50 border-b text-center py-2 text-xs text-gray-600">
        By clicking on &quot;Continue to Login&quot; button, you agree to the Terms of Service (Terms &amp; Conditions) of usage of Internet Banking of SBI.
      </div>

      {/* Security cards */}
      <div className="max-w-4xl mx-auto mt-5 px-4 flex gap-4">
        {[
          { type: 'good', label: 'ALWAYS', text: 'keep your computer\nfree of malware' },
          { type: 'good', label: 'ALWAYS', text: 'change your passwords\nperiodically' },
          { type: 'bad', label: 'NEVER', text: 'respond to any communication\nseeking your passwords' },
          { type: 'bad', label: 'NEVER', text: 'reveal your passwords or\ncard details to anyone' },
        ].map(({ type, label, text }, i) => (
          <div key={i} className="flex-1 border border-gray-200 rounded p-4 text-center bg-white">
            <div className="text-2xl mb-2">{type === 'good' ? '😊' : '😡'}</div>
            <div className={`font-bold text-sm mb-2 ${type === 'good' ? 'text-green-600' : 'text-red-600'}`}>
              {type === 'good' ? '✓' : '✗'} {label}
            </div>
            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{text}</p>
          </div>
        ))}
      </div>

      {/* FOR YOUR OWN SECURITY */}
      <div className="text-center text-red-600 font-bold text-base my-4">FOR YOUR OWN SECURITY</div>

      {/* Info sections */}
      <div className="max-w-4xl mx-auto px-4 flex gap-4 mb-6">
        <div className="flex-1 border border-gray-200 rounded p-4 bg-white">
          <h4 className="text-xs font-bold text-gray-700 border-b pb-2 mb-3">
            Please ensure the following before logging into OnlineSBI
          </h4>
          <ul className="space-y-2 text-xs text-gray-600">
            {[
              'The URL in your browser address bar begins with "https".',
              'The address or status bar displays the padlock symbol.',
              'Click the padlock to view and verify the security certificate.',
              '(SSL is compatible for IE 7.0 and above, Mozilla Firefox 3.1 and above, Opera 9.5 and above, Safari 3.5 and above, Google Chrome)',
            ].map((item, i) => (
              <li key={i} className="flex gap-1"><span className="text-sbi-blue font-bold">→</span> {item}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1 border border-gray-200 rounded p-4 bg-white">
          <h4 className="text-xs font-bold text-gray-700 border-b pb-2 mb-3">Beware of Phishing attacks</h4>
          <ul className="space-y-2 text-xs text-red-700 leading-relaxed">
            <li className="flex gap-1">
              <span className="font-bold">→</span>
              Phishing is a fraudulent attempt, usually made through email, phone calls, SMS etc seeking your personal and confidential information.
            </li>
            <li className="flex gap-1">
              <span className="font-bold">→</span>
              State Bank or any of its representative never sends you email/SMS or calls you over phone to get your personal information. Never respond to such email/SMS or phone call. Please report immediately on report.phishing@sbi.co.in
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
