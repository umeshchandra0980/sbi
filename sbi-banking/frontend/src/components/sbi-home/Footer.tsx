'use client'

import { footerTopLinks, footerColumns, FooterLink, FooterColumn } from '@/data/navData';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Top strip of horizontal links */}
      <div className="footer-top">
        <ul className="footer-top-links">
          {footerTopLinks.map((l: FooterLink, i: number) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
              {i < footerTopLinks.length - 1 && <span className="dash">|</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Link columns */}
      <div className="footer-cols">
        {footerColumns.map((col: FooterColumn) => (
          <div className="footer-col" key={col.heading}>
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((lnk: FooterLink) => (
                <li key={lnk.label}>
                  <a href={lnk.href} target="_blank" rel="noopener noreferrer">
                    {lnk.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Security notice */}
      <div className="footer-notice">
        <p>
          IMPORTANT: State Bank of India never ask for your user id / password / pin no.
          through phone call / SMSes / e-mails. Any such phone call / SMSes / e-mails asking
          you to reveal credential or One Time Password through SMS could be attempt to
          withdraw money from your account.NEVER share these details to anyone. State Bank of
          India wants you to be secure. If you come across any such instances please inform us
          through e-mail to the following address-{' '}
          <a href="mailto:epg.cms@sbi.co.in">epg.cms@sbi.co.in</a>
        </p>
      </div>

      {/* Bottom copyright bar */}
      <div className="footer-bottom">
        <p className="copyright">
          © Copyright State Bank of India <span>(APM Id : Webs_Info_875)</span>
        </p>
        <p className="best-view">
          Site best viewed at 1420 x 768 resolution in Edge, Mozilla 40 +, Google Chrome 45 +
        </p>
      </div>

      {/* Floating language toggle (Bhashini) */}
      <button className="lang-toggle" aria-label="Change language">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M12.9 14.5l-2.5-2.5.03-.03A14 14 0 0 0 13.4 7H16V5h-6V3H8v2H2v2h9.6A12.5 12.5 0 0 1 9 11.3 12 12 0 0 1 7.2 8H5.2A14 14 0 0 0 7.6 12.5L3.5 16.5 5 18l4-4 2.5 2.5.4-1zM18 9h-2l-4.5 12h2l1.12-3h4.75L20.5 21h2L18 9zm-2.62 7L17 11.67 18.62 16h-3.24z" />
        </svg>
        <span>English</span>
      </button>
    </footer>
  );
}
