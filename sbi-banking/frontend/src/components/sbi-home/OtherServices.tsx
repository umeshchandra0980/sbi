'use client'

import { useState, useEffect, useRef } from 'react';
import { otherServices, OtherServiceItem } from '@/data/navData';

const PER_VIEW = 6;

export default function OtherServices() {
  const [start, setStart] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [perView, setPerView] = useState(PER_VIEW);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // responsive items-per-view
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 600) setPerView(2);
      else if (w <= 900) setPerView(3);
      else if (w <= 1200) setPerView(4);
      else setPerView(6);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const total = otherServices.length;
  const next = () => setStart((s) => (s + 1) % total);
  const prev = () => setStart((s) => (s - 1 + total) % total);

  // autoplay
  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(next, 3000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, total]);

  // build the visible window (wraps around)
  const visible = Array.from({ length: perView }, (_, i) => otherServices[(start + i) % total]);

  return (
    <div className="other-services">
      <div className="os-bar">
        <h4>OTHER SERVICES</h4>
      </div>

      <div className="os-panel">
        <div className="os-track">
          {visible.map((item: OtherServiceItem, i: number) => (
            <a
              key={`${item.label}-${i}`}
              className="os-item"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="os-icon-wrap">
                <img src={item.icon} alt="" />
              </span>
              <span className="os-text">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="os-controls">
          <button
            className="os-play"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--yellow)">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--yellow)">
                <path d="M7 5l12 7-12 7z" />
              </svg>
            )}
          </button>
          <button className="os-arrow" onClick={prev} aria-label="Previous">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#280071" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="os-arrow" onClick={next} aria-label="Next">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#280071" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
