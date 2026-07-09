import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiteFooter } from '../components/Header';

const CAPTCHA_LIST = ['rxwk6', 'm4tP9', 'zK7wq', 'Lp3xR', '8nBvQ', 'Yw5cZ', 'Kp7mN', 'Jw2xQ'];

export default function LandingPage() {
  const navigate = useNavigate();
  const [captcha] = useState(CAPTCHA_LIST[Math.floor(Math.random() * CAPTCHA_LIST.length)]);

  return (
    <div className="page-wrapper">
      {/* Top Header */}
      <div style={{ background: '#fff', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#fff', border: '2px solid #1a5276', borderRadius: '50%', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#1a5276', fontWeight: 'bold', fontSize: 15 }}>◉</span>
          </div>
          <span style={{ color: '#1a5276', fontWeight: 'bold', fontSize: 20 }}>SBI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: '#555' }}>
            <a href="#" style={{ marginRight: 12 }}>Skip to main content</a>
            <a href="#" style={{ marginRight: 6 }}>S</a>
          </span>
          <div style={{ background: '#6c3483', color: '#fff', padding: '6px 12px', borderRadius: 4, textAlign: 'center', fontSize: 11, fontWeight: 'bold' }}>
            <div style={{ fontStyle: 'italic', fontSize: 14, letterSpacing: 1 }}>yono</div>
            <div style={{ fontSize: 9 }}>◉SBI</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ background: '#1a5276', display: 'flex', alignItems: 'center', padding: '0 10px', flexWrap: 'wrap' }}>
        {['Services ▾', 'FAQ ▾', 'Corporate Website', 'SBIePay Lite (नेपाली) ▾', 'Donations', 'SB Collect', 'Videos', 'Apply for SBI Current Account', 'NPS ▾', 'SBI Unipay', 'SBI Loans'].map((item, i) => (
          <a key={i} href="#" style={{ color: '#fff', fontSize: 12, padding: '8px 10px', display: 'inline-block' }}
          onMouseOver={e => e.target.style.background = '#154360'} onMouseOut={e => e.target.style.background = 'transparent'}>
            {item}
            {(item === 'Apply for SBI Current Account' || item === 'SBI Loans') && (
              <sup style={{ background: '#e74c3c', padding: '0 3px', borderRadius: 2, fontSize: 9, marginLeft: 3 }}>New</sup>
            )}
          </a>
        ))}
        <div style={{ marginLeft: 'auto', color: '#fff', fontSize: 12, background: '#154360', padding: '5px 12px', borderRadius: 3, cursor: 'pointer' }}>हि</div>
      </div>

      {/* Alert Bars */}
      <div style={{ background: '#d6eaf8', borderBottom: '1px solid #aed6f1', textAlign: 'center', padding: '5px', fontSize: 11.5, color: '#1a5276' }}>
        If slowness is observed during Login Page loading, please refresh the page for better experience.
      </div>
      <div style={{ background: '#fef9e7', borderBottom: '1px solid #f9e79f', textAlign: 'center', padding: '5px', fontSize: 11.5, color: '#7d6608' }}>
        SBI never asks for confidential information such as PIN and OTP from customers. Any such call can be made only by a fraudster. Please do not share personal info.
      </div>

      {/* Info bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 15px', background: '#f9f9f9', borderBottom: '1px solid #eee', fontSize: 11 }}>
        <span style={{ background: '#2471a3', color: '#fff', width: 18, height: 18, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>ℹ</span>
        <a href="#" style={{ fontSize: 11 }}>S</a>
      </div>

      {/* Main Cards */}
      <div style={{ maxWidth: 980, margin: '15px auto', padding: '0 15px', display: 'flex', gap: 20 }}>

        {/* Personal Banking */}
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: 20, background: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 18 }}>
              <span style={{ color: '#6c3483', fontStyle: 'italic', fontWeight: 'bold' }}>yono</span>
              <span style={{ color: '#1a5276', fontWeight: 'bold' }}>◉SBI</span>
            </div>
            <div style={{ fontSize: 10, color: '#666', letterSpacing: 2, marginTop: 2 }}>NET-BANKING</div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555', letterSpacing: 1, marginBottom: 14 }}>PERSONAL BANKING</div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/personal-banking')} style={{
              background: '#1a5276', color: '#fff', border: 'none', padding: '8px 28px',
              borderRadius: 3, fontSize: 13, cursor: 'pointer', letterSpacing: 1,
              display: 'inline-flex', alignItems: 'center', gap: 6
            }}>LOGIN <span style={{ fontSize: 16 }}>›</span></button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              { icon: '👤', label: 'New User Registration / Activation' },
              { icon: '❓', label: 'How Do I' },
              { icon: '🎧', label: 'Customer Care - Personal' },
              { icon: '🔒', label: 'Lock & Unlock User' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center', fontSize: 11, color: '#1a5276', maxWidth: 70, cursor: 'pointer' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#d6eaf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontSize: 14 }}>{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#555', marginTop: 12, lineHeight: 1.5 }}>
            SBI's internet banking portal provides personal banking services that gives you complete control over all your banking demands online.
          </p>
        </div>

        {/* Corporate Banking */}
        <div style={{ flex: 1, border: '1px solid #ddd', borderRadius: 4, padding: 20, background: '#fff' }}>
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 18 }}>
              <span style={{ color: '#6c3483', fontStyle: 'italic', fontWeight: 'bold' }}>yono</span>
              <span style={{ color: '#1a5276', fontWeight: 'bold' }}>◉SBI</span>
            </div>
            <div style={{ fontSize: 10, color: '#888', letterSpacing: 2, marginTop: 2 }}>BUSINESS</div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 'bold', color: '#555', letterSpacing: 1, marginBottom: 14 }}>CORPORATE BANKING</div>
          <div style={{ textAlign: 'center' }}>
            <button style={{ background: '#1a5276', color: '#fff', border: 'none', padding: '8px 28px', borderRadius: 3, fontSize: 13, cursor: 'pointer', letterSpacing: 1, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              LOGIN <span style={{ fontSize: 16 }}>›</span>
            </button>
          </div>
          <p style={{ fontSize: 11.5, color: '#555', marginTop: 12, lineHeight: 1.5 }}>
            Have you tried our new simplified and intuitive business banking platform? Log in to yonobusiness.sbi.bank.in to avail business banking services.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              { icon: '👤', label: 'New Corporate Registration' },
              { icon: '❓', label: 'How Do I' },
              { icon: '🎧', label: 'Customer Care - Corporate' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center', fontSize: 11, color: '#1a5276', maxWidth: 70, cursor: 'pointer' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#d6eaf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontSize: 14 }}>{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#555', marginTop: 12, lineHeight: 1.5 }}>Corporate Banking application to administer and manage non personal accounts online.</p>
        </div>
      </div>

      {/* Useful Links */}
      <div style={{ maxWidth: 980, margin: '0 auto 15px', padding: '10px 15px', border: '1px solid #ddd', borderRadius: 4, background: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '4px 20px' }}>
          {[
            'Register Complaint of Unauthorized Transaction', 'QMS (e-Appointment)', 'RBI Retail Direct portal', 'Block ATM Card',
            'Banking Forms', 'Doorstep Banking', 'SBI General Insurance Document Download', 'SBI FasTag',
            'SBI Salary Account', 'NRI Services', 'CYBER CRIME HELPLINE', 'SBI Securities',
            'SBI Express Remit', 'SBI Mutual Fund', 'SBI Life Insurance', 'SBI Card'
          ].map((link, i) => (
            <a key={i} href="#" style={{ fontSize: 11.5, color: '#1a5276', padding: '2px 0', display: 'block' }}>› {link}{i === 0 && <sup style={{ background: '#e74c3c', color: '#fff', padding: '0 3px', borderRadius: 2, fontSize: 9, marginLeft: 3 }}>New</sup>}</a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <button style={{ background: 'none', border: '1px solid #aaa', padding: '4px 20px', borderRadius: 3, cursor: 'pointer', fontSize: 12, color: '#555' }}>▼ More Useful Links</button>
        </div>
      </div>

      {/* YONO Banner */}
      <div style={{ maxWidth: 980, margin: '0 auto 15px', background: 'linear-gradient(135deg, #1a2f4a, #2471a3 50%, #6c3483)', color: '#fff', padding: '25px 30px', display: 'flex', alignItems: 'center', gap: 25 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 18, marginBottom: 4 }}>
            <span style={{ fontStyle: 'italic', color: '#d7bde2' }}>yono</span>
            <span style={{ fontWeight: 'bold' }}>◉SBI</span>
          </div>
          <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.8, marginBottom: 8 }}>NET-BANKING</div>
          <div style={{ fontSize: 15, fontWeight: 'bold' }}>Your Internet Banking</div>
          <div style={{ fontSize: 15, fontWeight: 'bold' }}>is now live in a new Avatar</div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.9 }}>for a Smoother &</div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>Smarter Banking experience.</div>
        </div>
        <div style={{ fontSize: 12, lineHeight: 2 }}>
          <div>For any suggestions / feedback, please</div>
          <div>write to us at :</div>
          <div>Email ID : <strong>ynbsupport@sbi.co.in</strong></div>
          <div>or call us on : <strong>022-20744646 (8AM to 8PM)</strong></div>
        </div>
        <div style={{ width: 160, height: 100, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
          💻 Portal Preview
        </div>
      </div>

      {/* Social bar */}
      <div style={{ position: 'fixed', right: 0, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 2, zIndex: 100 }}>
        {[['f','#3b5998'],['𝕏','#1a1a1a'],['▶','#ff0000'],['in','#0077b5'],['📷','#e1306c'],['P','#e60023'],['📞','#25d366'],['💬','#25d366']].map(([icon,bg],i) => (
          <div key={i} style={{ width: 30, height: 30, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, borderRadius: '4px 0 0 4px', cursor: 'pointer' }}>{icon}</div>
        ))}
      </div>

      {/* Bottom info bar */}
      <div style={{ background: '#1a5276', color: '#fff', textAlign: 'center', padding: '7px', fontSize: 11, display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        {['No change in URL/Website link.', 'No change in Internet Banking Username and Password', 'No Registration or Re-registration required.', 'Bank will never be sending any links for login or registration for YONO Net Banking.'].map((msg, i) => (
          <span key={i}>{i > 0 ? '| ' : ''}{msg}</span>
        ))}
      </div>

      <SiteFooter apm="564" />
    </div>
  );
}
