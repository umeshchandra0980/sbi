'use client'

import React, { useState } from 'react';

export default function StickyFooterBar() {
  const [showLocator, setShowLocator] = useState(false);

  return (
    <div className="sticky-footer-bar">
      {/* Left side social links */}
      <div className="sfb-left">
        <ul className="sfb-nav">
          <li className="sfb-item">
            <a
              className="sfb-link"
              href="https://in.pinterest.com/TheOfficialSBI/"
              title="Pinterest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.62 11.1-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.02-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.74.1.12.11.23.08.35l-.34 1.38c-.06.23-.19.3-.43.19-1.6-.74-2.6-3.08-2.6-4.96 0-4.04 2.94-7.75 8.46-7.75 4.44 0 7.9 3.17 7.9 7.4 0 4.42-2.79 7.98-6.66 7.98-1.3 0-2.53-.68-2.95-1.48l-.8 3.07c-.3 1.12-1.07 2.53-1.6 3.39C9.72 23.75 10.84 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link"
              href="https://www.linkedin.com/company/state-bank-of-india/"
              title="Linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link"
              href="https://www.facebook.com/StateBankOfIndia"
              title="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link"
              href="https://www.youtube.com/user/TheOfficialSBI"
              title="Youtube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.556a3.004 3.004 0 0 0-2.11 2.107C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link bhashini-skip-translation"
              href="https://x.com/TheOfficialSBI"
              title="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link"
              href="https://www.instagram.com/theofficialsbi/"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link"
              href="https://www.quora.com/profile/State-Bank-of-India-4"
              title="Quora"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.015 0C5.394 0 .015 5.378.015 12c0 6.621 5.379 12 12 12a11.96 11.96 0 0 0 6.844-2.146l3.228 3.227a1.002 1.002 0 1 0 1.417-1.417l-3.266-3.267A11.942 11.942 0 0 0 24.015 12c0-6.622-5.379-12-12-12zm4.331 16.59c-.939.94-2.197 1.41-3.774 1.41-1.341 0-2.457-.34-3.349-1.02a6.452 6.452 0 0 1-2.158-2.678A10.22 10.22 0 0 1 6.3 11.95c0-1.745.318-3.18.955-4.307a6.29 6.29 0 0 1 2.296-2.651c1.077-.665 2.336-.998 3.778-.998 1.577 0 2.835.47 3.774 1.41a4.933 4.933 0 0 1 1.41 3.546c0 1.704-.47 2.887-1.41 3.546l.006.004-.033.04-.012.04zm-.556-9.141c-.604-.604-1.396-.906-2.375-.906-.992 0-1.785.302-2.379.906-.594.604-.891 1.554-.891 2.85 0 1.282.297 2.222.891 2.822.594.6 1.387.9 2.379.9s1.771-.3 2.375-.9c.604-.6 1.353-2.106 1.353-2.822 0-.717-.749-2.244-1.353-2.85z"/>
              </svg>
            </a>
          </li>
        </ul>
      </div>

      {/* Right side contact links & tools */}
      <div className="sfb-right d-none d-md-block">
        <ul className="sfb-nav">
          <li className="sfb-item">
            <div className="topdata" style={{ position: 'relative' }}>
              <button
                className="sfb-link border-none bg-transparent cursor-pointer"
                aria-label="Locate branch or ATM"
                onClick={() => setShowLocator(!showLocator)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </button>

              {showLocator && (
                <div className="topdata_tooltip" style={{ display: 'block', position: 'absolute', bottom: '48px', right: '-40px', background: '#fff', border: '1px solid #ddd', padding: '10px', borderRadius: '4px', zIndex: 10000, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '4px 8px', fontSize: '12px', color: '#280071', textDecoration: 'underline' }}>Branch Locator</a>
                  <a href="/" target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '4px 8px', fontSize: '12px', color: '#280071', textDecoration: 'underline' }}>ATM Locator</a>
                </div>
              )}
            </div>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link"
              title="Contact Center"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a
              className="sfb-link bhashini-skip-translation"
              title="Contact Us"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </li>
          <li className="sfb-divider" />
          <li className="sfb-item">
            <a className="sfb-link sfb-sia" title="Ask Sia" href="#" onClick={(e) => e.preventDefault()}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8.01" y2="16"></line>
                <line x1="16" y1="16" x2="16.01" y2="16"></line>
                <path d="M2 14h1"></path>
                <path d="M21 14h1"></path>
              </svg>
              <h5>Ask Sia</h5>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
