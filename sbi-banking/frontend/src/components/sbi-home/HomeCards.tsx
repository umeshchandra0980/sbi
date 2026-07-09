'use client'

import { announcements, AnnouncementItem } from '@/data/navData';

const B = '';

function CheckIcon() {
  return (
    <svg className="ann-check" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke="#f5a623" strokeWidth="2" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeCards() {
  return (
    <section className="home-cards">
      <div className="hc-grid">
        {/* Card 1 — Trending Offers */}
        <div className="hc-card">
          <div className="hc-header">
            <h4>TRENDING OFFERS @ SBI</h4>
          </div>
          <div className="hc-body">
            <a
              className="hc-offer"
              href={`${B}/web/personal-banking/cards/debit-card/debit-card-offers`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/offers-atm.jpg" alt="Debit card offers" />
            </a>
            <a
              className="hc-link-right"
              href={`${B}/web/personal-banking/cards/debit-card/debit-card-offers`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Card Offers
            </a>
          </div>
        </div>

        {/* Card 2 — Strategic Training Unit */}
        <div className="hc-card">
          <div className="hc-header">
            <h4>STRATEGIC TRAINING UNIT</h4>
          </div>
          <div className="hc-body">
            <a
              className="hc-stu"
              href={`${B}/web/strategic-training-unit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/stu-banner.png" alt="SBI Executive Education Online Courses" />
            </a>
            <a
              className="hc-link-right"
              href={`${B}/web/strategic-training-unit`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Show All Training Programs
            </a>
          </div>
        </div>

        {/* Card 3 — Announcements */}
        <div className="hc-card">
          <div className="hc-header hc-header-ann">
            <h4>
              <img src="/images/bell_icon.png" alt="" className="hc-bell" /> ANNOUNCEMENTS
            </h4>
          </div>
          <div className="hc-body hc-ann-body">
            <ul className="hc-ann-list">
              {announcements.map((a: AnnouncementItem) => (
                <li key={a.label}>
                  <CheckIcon />
                  {a.plain ? (
                    <span>{a.label}</span>
                  ) : (
                    <a href={a.href} target="_blank" rel="noopener noreferrer">
                      {a.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <a className="hc-link-right" href={`${B}/web/home/announcements`} target="_blank" rel="noopener noreferrer">
              Show All
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
