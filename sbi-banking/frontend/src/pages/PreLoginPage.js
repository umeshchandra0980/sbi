import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar, MainNav, SiteFooter } from '../components/Header';

export default function PreLoginPage() {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <TopBar />
      <MainNav />

      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(to right, #d6eaf8, #aed6f1, #85c1e9)',
        padding: '25px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 140
      }}>
        <div>
          <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>Personal Banking</div>
          <h2 style={{ fontSize: 32, color: '#1a5276', fontStyle: 'italic', fontWeight: 'bold' }}>Personal Banking</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button onClick={() => navigate('/login')} style={{
            background: '#1a5276', color: '#fff', border: 'none', padding: '11px 24px',
            borderRadius: 3, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            marginLeft: 'auto'
          }}>CONTINUE TO LOGIN &nbsp;›</button>
          <div style={{ background: '#1a5276', color: '#fff', padding: '8px 16px', borderRadius: 3, fontSize: 12, textAlign: 'center', marginTop: 8 }}>
            Dear Customer, OTP based login is<br />introduced for added security
          </div>
        </div>
      </div>

      {/* Policy links */}
      <div style={{ background: '#f0f8ff', borderBottom: '1px solid #ddd', padding: '5px 20px', fontSize: 11, color: '#555', display: 'flex', gap: 15, justifyContent: 'flex-end' }}>
        {['SBI Limited Liability Policy', 'Privacy Statement', 'Disclosure', 'Terms of Service (Terms & Conditions)'].map(l => (
          <a key={l} href="#" style={{ color: '#1a5276' }}>{l}</a>
        ))}
      </div>

      {/* Terms */}
      <div style={{ background: '#f9f9f9', border: '1px solid #eee', padding: '7px 20px', fontSize: 11.5, color: '#555', textAlign: 'center' }}>
        By clicking on "Continue to Login" button, you agree to the Terms of Service (Terms &amp; Conditions) of usage of Internet Banking of SBI.
      </div>

      {/* Security Cards */}
      <div style={{ display: 'flex', maxWidth: 980, margin: '15px auto 10px', padding: '0 15px', gap: 10 }}>
        {[
          { icon: '😊', label: 'ALWAYS', color: '#27ae60', text: 'keep your computer\nfree of malware' },
          { icon: '😊', label: 'ALWAYS', color: '#27ae60', text: 'change your passwords\nperiodically' },
          { icon: '😡', label: 'NEVER', color: '#c0392b', text: 'respond to any communication\nseeking your passwords' },
          { icon: '😡', label: 'NEVER', color: '#c0392b', text: 'reveal your passwords or\ncard details to anyone' },
        ].map((card, i) => (
          <div key={i} style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: 15, textAlign: 'center', background: '#fff' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{card.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: card.color, marginBottom: 8 }}>{card.label}</div>
            {card.text.split('\n').map((line, j) => <div key={j} style={{ fontSize: 12, color: '#555' }}>{line}</div>)}
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', color: '#c0392b', fontSize: 16, fontWeight: 'bold', margin: '5px 0 15px' }}>
        FOR YOUR OWN SECURITY
      </div>

      {/* Info boxes */}
      <div style={{ maxWidth: 980, margin: '0 auto 20px', padding: '0 15px', display: 'flex', gap: 15 }}>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: '12px 15px', background: '#fff' }}>
          <h4 style={{ fontSize: 12, color: '#333', marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Please ensure the following before logging into OnlineSBI</h4>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {[
              'The URL in your browser address bar begins with "https".',
              'The address or status bar displays the padlock symbol.',
              'Click the padlock to view and verify the security certificate.',
              '(SSL is compatible for IE 7.0 and above, Mozilla Firefox 3.1 and above, Opera 9.5 and above, Safari 3.5 and above, Google Chrome)'
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 11.5, color: '#555', marginBottom: 5, lineHeight: 1.4 }}>
                <span style={{ color: '#1a5276' }}>→ </span>
                {i === 0 ? <><span style={{ color: '#555' }}>The URL in your browser address bar begins with "</span><strong>https</strong><span>".</span></> : item}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: '12px 15px', background: '#fff' }}>
          <h4 style={{ fontSize: 12, color: '#333', marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 5 }}>Beware of Phishing attacks</h4>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            <li style={{ fontSize: 11.5, color: '#c0392b', marginBottom: 5, lineHeight: 1.4 }}>
              <span style={{ color: '#1a5276' }}>→ </span>
              Phishing is a fraudulent attempt, usually made through email, phone calls, SMS etc seeking your personal and confidential information.
            </li>
            <li style={{ fontSize: 11.5, color: '#c0392b', lineHeight: 1.4 }}>
              <span style={{ color: '#1a5276' }}>→ </span>
              State Bank or any of its representative never sends you email/SMS or calls you over phone to get your personal information, password or one time SMS (high security) password. Never respond to such email/SMS or phone call. Please report immediately on <a href="mailto:report.phishing@sbi.co.in" style={{ color: '#1a5276' }}>report.phishing@sbi.co.in</a>
            </li>
          </ul>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
