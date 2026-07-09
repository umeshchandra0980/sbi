'use client'

import { useState, useEffect, useCallback } from 'react';

interface Banner {
  src: string;
  alt: string;
  href?: string;
}

const banners: Banner[] = [
  { src: '/images/banners/banner-01.png', alt: 'CoE', href: '/' },
  { src: '/images/banners/banner-02.jpg', alt: 'SBI Contact Centre' },
  { src: '/images/banners/banner-03.png', alt: 'Digital Life Certificate' },
  { src: '/images/banners/banner-04.png', alt: 'Digital Life Certificate' },
  { src: '/images/banners/banner-05.jpg', alt: 'SBI APAA', href: '/' },
  { src: '/images/banners/banner-06.jpg', alt: 'SBI' },
  { src: '/images/banners/banner-07.png', alt: 'CBDC' },
  { src: '/images/banners/banner-08.png', alt: 'MOD — Term Deposits' },
  { src: '/images/banners/banner-09.jpg', alt: 'PMJDY' },
  { src: '/images/banners/banner-10.jpg', alt: 'World Debit Card' },
  { src: '/images/banners/banner-11.jpg', alt: 'Loan Repayment via ePay' },
  { src: '/images/banners/banner-12.jpg', alt: 'SBI PM Vidyalaxmi', href: '/' },
  { src: '/images/banners/banner-13.png', alt: "Bhashini's AI — 22 languages" },
  { src: '/images/banners/banner-14.jpg', alt: 'SBI Centralised Number Series' },
  { src: '/images/banners/banner-15.jpg', alt: 'Home Loans' },
  { src: '/images/banners/banner-16.jpg', alt: 'CKYC Awareness' },
  { src: '/images/banners/banner-17.jpg', alt: 'Digital Arrest Awareness' },
  { src: '/images/banners/banner-18.jpg', alt: 'Fake Investment Awareness' },
  { src: '/images/banners/banner-19.jpg', alt: 'SBI MSME Loan', href: '/' },
  { src: '/images/banners/banner-20.jpg', alt: 'Premier Banking (VRM)' },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const count = banners.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  // auto-advance every 4s
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 4000);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="hero" aria-label="Home page banner carousel">
      {/* clipped carousel viewport */}
      <div className="hero-viewport">
        <div className="hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {banners.map((b, i) => {
            const img = (
              <img src={b.src} alt={b.alt} className="hero-img" loading={i === 0 ? 'eager' : 'lazy'} />
            );
            return (
              <div className="hero-slide" key={i}>
                {b.href ? (
                  <a href={b.href} target="_blank" rel="noopener noreferrer">{img}</a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>

        <button className="hero-arrow prev" onClick={() => go(index - 1)} aria-label="Previous banner">‹</button>
        <button className="hero-arrow next" onClick={() => go(index + 1)} aria-label="Next banner">›</button>

        <ul className="hero-dots">
          {banners.map((_, i) => (
            <li key={i}>
              <button
                className={i === index ? 'active' : ''}
                onClick={() => go(i)}
                aria-label={`Go to banner ${i + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* right-side overlay panel (background shape = dynamic_panel.png) */}
      <aside className="rate-panel">
        <div className="rate-top">
          <div className="rate-head">Interest Rates</div>
          <div className="rate-select">
            <select aria-label="Loan type">
              <option>Home Loan</option>
              <option>Car Loan</option>
              <option>Personal Loan</option>
              <option>Education Loan</option>
            </select>
          </div>
          <div className="rate-value"><strong>7.25%*</strong> p.a. <span>onwards</span></div>
          <div className="rate-wef">w.e.f. 01.04.2026</div>
          <div className="rate-tc">*T&amp;C Apply.</div>
          <div className="rate-btns">
            <a href="/" target="_blank" rel="noopener noreferrer">SEE PRODUCTS</a>
            <a href="/" target="_blank" rel="noopener noreferrer">APPLY NOW</a>
          </div>
        </div>

        <div className="rate-links">
          <div className="links-head">Quick Links</div>
          <a href="https://bank.sbi/dsb" target="_blank" rel="noopener noreferrer">Doorstep Banking Services</a>
          <a href="https://sbi.bank.in/web/personal-banking/loans/calculators" target="_blank" rel="noopener noreferrer">Tools &amp; Calculators</a>
          <a href="https://sbi.bank.in/web/personal-banking/faq" target="_blank" rel="noopener noreferrer">FAQ's</a>
          <a href="https://sbi.bank.in/web/interest-rates" target="_blank" rel="noopener noreferrer">Interest Rates</a>
          <a href="https://crcf.sbi.co.in/ccf/" target="_blank" rel="noopener noreferrer">Unauthorized Digital Transaction Reporting</a>
        </div>
      </aside>
    </section>
  );
}
