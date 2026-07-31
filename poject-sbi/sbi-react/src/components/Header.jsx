import { useState } from 'react';
import {
  topLinks,
  topRightLinks,
  primaryNav,
  brandLogos,
  megaMenu,
} from '../data/navData';
import './Header.css';

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <nav className="topbar-left" aria-label="Utility navigation">
          <a href="#main" className="skip-link">
            Skip to Main Content&nbsp;&nbsp;<span className="dash">|</span>
          </a>
          {topLinks.map((l, i) => (
            <span key={l.label} className="topbar-item">
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={l.highlight ? 'grahak' : ''}
              >
                {l.label}
              </a>
              {i < topLinks.length - 1 && <span className="dash">|</span>}
            </span>
          ))}
          <button className="access-btn" aria-label="Accessibility options">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="#fff" aria-hidden="true">
              <circle cx="16" cy="4" r="3.5" />
              <path d="M27 7c-1.2.3-6.8 1.9-10.8 1.9S6.6 7.4 5 7c-1.2-.3-2 .9-2 2s1 1.6 2 2l6 1.9c.6.2.8.5.8.7.3.7.1 2-.0 2.4l-2.4 12.9c-.1 1 .6 2 2 2 1.2 0 1.8-.8 2-2L15 21c.9 0 2.7 9.8 2.7 9.8.2 1.2.8 2 2 2 1.4 0 2.1-1 2-2L19.6 18c-.3-1.6-.1-2.2 0-2.3.1-.1.4-.4 1.1-.7l5.6-1.9c1-.4 2-.9 2-2S28.2 6.7 27 7z" />
            </svg>
          </button>

          <nav className="topbar-right" aria-label="Secondary navigation">
            {topRightLinks.map((l) => (
              <a key={l.label} href={l.href} lang={l.lang} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
            <a href="https://www.onlinesbi.sbi" className="netbanking" target="_blank" rel="noopener noreferrer">
              Net Banking
            </a>
          </nav>
        </nav>
      </div>
    </div>
  );
}

function BrandBar({ onToggleMenu }) {
  return (
    <header className="brandbar">
      <div className="brandbar-inner">
        <nav className="primary-nav" aria-label="Primary navigation">
          {primaryNav.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={l.active ? 'active' : ''}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
          {brandLogos.map((b) => (
            <a key={b.alt} href="#" className="brand-logo">
              <img src={b.src} alt={b.alt} />
            </a>
          ))}
        </nav>

        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Search" aria-label="Search" />
          <button type="submit" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 512 512" fill="#280071" aria-hidden="true">
              <path d="M503 468L370 334a206 206 0 1 0-36 36l134 134a26 26 0 0 0 35-36zM52 207a155 155 0 1 1 310 0 155 155 0 0 1-310 0z" />
            </svg>
          </button>
        </form>

        <button className="hamburger" aria-label="Toggle menu" onClick={onToggleMenu}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}

function MegaItem({ item, isOpen, onToggle, isTouch }) {
  // Knowledge Hub has no dropdown
  if (!item.columns) {
    return (
      <div className="bluebar-item">
        <a href={item.href} className="bluebar-link" target="_blank" rel="noopener noreferrer">
          <img className="ic" src={item.icon} alt="" /> {item.label}
        </a>
      </div>
    );
  }

  return (
    <div className={`bluebar-item${isOpen ? ' open' : ''}`}>
      <a
        href="#"
        className="bluebar-link"
        onClick={(e) => {
          e.preventDefault();
          if (isTouch) onToggle();
        }}
      >
        <img className="ic" src={item.icon} alt="" /> {item.label}
      </a>
      
      <div className={`mega${item.small ? ' mega-sm' : ''}`}>
        {item.columns.map((col, ci) => (
          <div className="mega-col" key={ci}>
            <h3>
              {col.heading.href ? (
                <a href={col.heading.href} target="_blank" rel="noopener noreferrer">
                  {col.heading.label}
                </a>
              ) : (
                col.heading.label
              )}
            </h3>
            {col.links.map((lnk) => (
              <a key={lnk.label} href={lnk.href} target="_blank" rel="noopener noreferrer">
                {lnk.label}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlueBar({ collapsed }) {
  const [openIndex, setOpenIndex] = useState(null);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  return (
    <nav className={`bluebar${collapsed ? ' collapsed' : ''}`} aria-label="Product categories">
      <div className="bluebar-inner">
        {megaMenu.map((item, i) => (
          <MegaItem
            key={item.label}
            item={item}
            isTouch={isTouch}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </nav>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* white box: logo column on the left, stacked top-bar + brand-bar on the right */}
      <div className="header-main">
        <a
          href="https://sbi.bank.in/web/personal-banking/home"
          className="logo-col"
          aria-label="State Bank of India home"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logo.png" alt="State Bank of India" className="logo-img" />
        </a>
        <div className="header-right">
          <TopBar />
          <BrandBar onToggleMenu={() => setMenuOpen((v) => !v)} />
        </div>
      </div>
      <BlueBar collapsed={false} />
    </>
  );
}
