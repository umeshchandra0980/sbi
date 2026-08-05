'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import './rewards.css';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import SbiFixedFooter from '@/components/banking/SbiFixedFooter';

export default function SbiRewardsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Offers' | 'Summary' | 'Smart Rewards'>('Offers');
  const [pointsCount] = useState<number>(0);
  const [selectedOfferModal, setSelectedOfferModal] = useState<any>(null);

  // Carousel translate state (matches Angular's transform: translateX)
  const [offersX, setOffersX] = useState(0);
  const [shopX, setShopX] = useState(0);
  const [voucherX, setVoucherX] = useState(0);

  const OFFER_CARD_W = 260;
  const SHOP_CARD_W = 145;
  const VOUCHER_CARD_W = 155;

  const slideCarousel = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    direction: 'left' | 'right',
    cardW: number,
    totalItems: number,
    visible: number
  ) => {
    setter(prev => {
      const maxOffset = -(totalItems - visible) * cardW;
      const next = direction === 'right' ? prev - cardW : prev + cardW;
      return Math.min(0, Math.max(next, maxOffset));
    });
  };

  // ── DATA: Quick Circle Stories (exact from Angular HTML) ──
  const quickBanners = [
    { name: 'Welcome to Yono', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/welcome_64x64' },
    { name: 'Fraud Awareness', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/fraudawareness2_thumbnail_64x6' },
    { name: 'Tax Related Services', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/pacl_fbtrc_thumbnail_64x6' },
    { name: 'e - Secure Lock', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/yp-secure-lock-banner-sbi_thumbnail_64x64_23_11zon' },
    { name: 'Sustainability', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sustainibility_thumbnail_64x64' },
    { name: 'SIP', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sip_thumbnail-product-creative_64x64' },
    { name: 'Credit Card', img: 'https://damdxprod.dwhmartr.sbi.bank.in/dx/api/dam/v1/collections/47945019-12d7-457c-8359-8b7cde2547d7/items/d8821f0a-e224-4cb7-b0e2-8a028e68e15e/renditions/2e05ab75-065f-4028-ba70-e96c0d0761f5?binary=true' },
    { name: 'Invest Now', img: 'https://damdxprod.dwhmartr.sbi.bank.in/dx/api/dam/v1/collections/47945019-12d7-457c-8359-8b7cde2547d7/items/541d9ccf-5f94-45ab-b005-561d0a4ce886/renditions/f0a2815b-f565-43c9-af43-162bfd072949?binary=true' },
    { name: 'Secure your future', img: 'https://damdxprod.dwhmartr.sbi.bank.in/dx/api/dam/v1/collections/47945019-12d7-457c-8359-8b7cde2547d7/items/5bb28663-f2dd-42df-8aad-5362ea7509f2/renditions/b42f1e02-be67-4f5a-b13f-fecbebc6c53f?binary=true' },
    { name: 'Dream your Home', img: 'https://damdxprod.dwhmartr.sbi.bank.in/dx/api/dam/v1/collections/47945019-12d7-457c-8359-8b7cde2547d7/items/30aae37c-d720-40b9-97e3-22aa83f0b616/renditions/00bf9b72-4998-4774-bd8e-1a3f1efb5dc7?binary=true' },
  ];

  // ── DATA: Ways to Earn (exact 11 items from Angular HTML) ──
  const waysToEarn = [
    { name: 'UPI', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/upi-transactions_svg' },
    { name: 'Bill Payment', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/bill-payment_svg' },
    { name: 'Savings account', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/saving-ac-operations_svg' },
    { name: 'FD /RD Opening', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/deposits_svg' },
    { name: 'Personal Loan', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/personal-loan_svg' },
    { name: 'Car Loan', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/car-loan_svg' },
    { name: 'Loan against\u00a0 FD', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/loan-against-fixed-deposit_svg' },
    { name: 'Loan against Mutual Fund / Securities', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/loan-against-mutual-fund-securities_svg' },
    { name: 'Credit Card', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/credit-card-activities_svg' },
    { name: 'Insurance', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/cate-ic_-new-life-insurance_svg' },
    { name: 'Sustainability', img: 'https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/sustainability_svg' },
  ];

  // ── DATA: Offers For You (exact 8 items from Angular HTML) ──
  const offersForYou = [
    { brand: 'Cult.fit', title: 'Get Extra Rs. 700/- off on Cultpass  "Elite" membership', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBICultfit24032026.jpg', price: 'At ₹30', strike: '₹100', code: 'SBICULT700', desc: 'Unlock unlimited access to all Cult centers, group classes, luxury gyms, and home workouts.' },
    { brand: 'Marshall', title: 'Flat 15% off on Marshall', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIMarshall09072026.jpg', price: 'At ₹20', strike: '₹100', code: 'SBIMARSHALL15', desc: 'Get flat 15% discount on Marshall premium wireless headphones, Bluetooth speakers, and iconic audio gear.' },
    { brand: 'MuscleBlaze', title: 'Get Extra 5% off upto Rs. 150, MOV Rs. 499 - All user', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIMuscleBlaze27032026.jpg', price: 'At ₹20', strike: '₹100', code: 'SBIMB5', desc: 'Get extra 5% off on sports nutrition products including proteins, gainers, pre-workouts.' },
    { brand: 'JBL', title: 'Flat 15% off', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIJBL22072026.jpg', price: 'At ₹10', strike: '₹1,000', code: 'SBIJBL15', desc: 'Flat 15% discount on premium JBL headphones, portable Bluetooth speakers, home soundbars.' },
    { brand: 'Bombay Shaving Company', title: 'Free Veleno Perfume on minimum purchase of Rs.599', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIBombayShavingCompany22072026.jpg', price: 'At ₹10', strike: '₹1,000', code: 'SBIBOMBAY', desc: 'Get a complimentary signature Veleno Perfume bottle with grooming kit purchases above Rs. 599.' },
    { brand: 'Home Centre', title: 'Rs.5000 off on a minimum order value of Rs. 24,999', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIHomeCentre22072026.jpg', price: 'At ₹10', strike: '₹1,000', code: 'SBIHC5K', desc: 'Avail flat Rs. 5,000 discount on premium home furniture, dining setups, and decor items.' },
    { brand: 'MediBuddy', title: 'Advance Health Checkup at Rs.1,299 (85 Parameters)', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIMediBuddy19032026.jpg', price: 'At ₹10', strike: '₹1,299', code: 'SBIMEDIBUDDY', desc: 'Advanced full-body health screening covering 85 crucial parameters.' },
    { brand: 'Zouk', title: 'Flat Rs.200 off on Zouk orders above Rs.1499', img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIZouk22072026.jpg', price: 'At ₹10', strike: '₹1,000', code: 'SBIZOUK200', desc: 'Save flat Rs. 200 on handcrafted, 100% vegan bags, wallets, and accessories.' },
  ];

  // ── DATA: Shop & Earn (exact 14 items from Angular HTML) ──
  const shopAndEarn = [
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/Myntra.jpg', points: '10X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/IGP.jpg', points: '20X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/AJIO.jpg', points: '10X points' },
    { img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBIKama17020226.jpg', points: '10X points' },
    { img: 'https://media.loylty.com/OfferPanel//Offer/225X225/SBILifeStyle17020262.jpg', points: '10X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/NykaaBeauty.jpg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/FIRSC0000001.jpeg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/Lenskart.jpg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/RedcliffeLabs.jpg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/Salty.jpg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/AirIndia.jpg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/Mivi.jpg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/Shyaway.jpg', points: '5X points' },
    { img: 'https://media.loylty.com/OfferPanel//Brand/225X225/WowSkinCare.jpg', points: '5X points' },
  ];

  // ── DATA: Redeem on Vouchers (exact 14 items from Angular HTML) ──
  const redeemVouchers = [
    'https://giftbig.s3.amazonaws.com/microsite/product/EGVGBAPVE003/d/small_image/12046_microsite.jpg?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBIBG001/d/small_image/14764_microsite.jpg?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGVGBAPOPHA001/d/small_image/19299_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBRBLH001/d/small_image/1790_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGVGBDO001/d/small_image/13631_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGVGBTHB001/d/small_image/14571_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBCCD001/d/small_image/2637_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBSKC001/d/small_image/3012_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBEMTHOL001/d/small_image/14771_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBMMTHOTC001/d/small_image/1250_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBSUBW001/d/small_image/12389_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBPEPFS001/d/small_image/1004_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBDEGCS001/d/small_image/372_microsite.png?appId=2468',
    'https://giftbig.s3.amazonaws.com/microsite/product/EGCGBWRNGLR001/d/small_image/9367_microsite.png?appId=2468',
  ];

  return (
    <div className="rewards-wrapper">
      <SbiGlobalBrandHeader activeTopTab="Rewards" activeNav="Overview" />

      {/* ═══ MAIN CONTAINER-XXL ═══ */}
      <div className="rw-container-xxl">
        <div className="rw-outer-container">

          {/* ═══ REWARDS END STATE SECTION ═══ */}
          <div className="rw-rewards-end-state-section">

            {/* ── STORY CONTAINER (Quick Links) ── */}
            <div className="rw-story-container">
              <div className="rw-quicklinks">

                {/* Salutation */}
                <div className="rw-salutation-txt-box">
                  <span>Hello </span>
                  <span><b>Dumpala</b></span>
                  <span><b>,</b></span>
                  <span> Let&apos;s get started!</span>
                </div>

                {/* Scrollable Circle Stories */}
                <div className="rw-scroll-container">
                  {quickBanners.map((s, i) => (
                    <div key={i} className="rw-circle-container" onClick={() => toast(`Opening ${s.name}`)}>
                      <div className="rw-circle rw-blue-border" tabIndex={0}>
                        <img loading="lazy" src={s.img} alt={s.name} />
                      </div>
                      <p className="rw-storyname">{s.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── TABS SECTION CONTAINER ── */}
            <div className="rw-tabs-section-container">
              <nav>
                <div role="tablist" className="rw-nav rw-nav-tabs">
                  <button type="button" role="tab" className={`rw-nav-link${activeTab === 'Offers' ? ' active' : ''}`} onClick={() => setActiveTab('Offers')}> Offers </button>
                  <button type="button" role="tab" className={`rw-nav-link${activeTab === 'Summary' ? ' active' : ''}`} onClick={() => setActiveTab('Summary')}> Summary </button>
                  <button type="button" role="tab" className={`rw-nav-link${activeTab === 'Smart Rewards' ? ' active' : ''}`} onClick={() => setActiveTab('Smart Rewards')}> Smart Rewards </button>
                </div>
              </nav>

              {/* ── TAB CONTENT ── */}
              <div className="rw-tab-content">

                {/* ═══════════ TAB 1: OFFERS ═══════════ */}
                {activeTab === 'Offers' && (
                  <div className="rw-tab-pane" id="nav-home" role="tabpanel">
                    <div className="rw-rewards-offers-container">

                      {/* ── LEFT COLUMN: EARN POINTS ── */}
                      <div className="rw-earn-point-component">
                        <div className="rw-rewards-earn-points-container">

                          {/* Available Points Card */}
                          <div className="rw-available-points-section rw-tier1">
                            <div className="rw-heading-section">
                              <div>
                                <span className="rw-label">Available Points</span>
                                <span className="rw-value">{pointsCount}</span>
                              </div>
                              <div>
                                <span className="rw-tier-badge">Dreamer</span>
                              </div>
                            </div>

                            <div className="rw-unlock-expire-section">
                              <div>
                                <span className="rw-label">Unlocking Soon</span>
                                <span className="rw-sub-value">0</span>
                              </div>
                              <div>
                                <span className="rw-label">Expiring Soon</span>
                                <span className="rw-sub-value">0</span>
                              </div>
                            </div>

                            <div className="rw-total-points-section" tabIndex={0} role="tab" onClick={() => setActiveTab('Summary')}>
                              <div className="rw-total-left">
                                <div className="rw-star-icon">★</div>
                                <div className="rw-total-info">
                                  <span className="rw-tp-label">Total Points</span>
                                  <span className="rw-tp-value">{pointsCount}</span>
                                </div>
                              </div>
                              <div className="rw-total-right">
                                <span className="rw-arrow-icon">›</span>
                              </div>
                            </div>
                          </div>

                          {/* Ways to Earn Points */}
                          <div className="rw-way-to-earn-section">
                            <div className="rw-wte-heading">
                              <div>Ways to Earn Points</div>
                              <div className="rw-viewAll" tabIndex={0} role="tab" onClick={() => toast('View All earning options')}>View All</div>
                            </div>
                            <div className="rw-earn-pts-options-section">
                              {waysToEarn.map((w, i) => (
                                <div key={i} className="rw-options" tabIndex={0} role="tab" aria-label={w.name} onClick={() => toast(`Earn points via ${w.name}`)}>
                                  <span className="rw-option-icon"><img src={w.img} alt={w.name} /></span>
                                  <span className="rw-option-label">{w.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Promo Banner: SBI Green Funds */}
                          <div className="rw-promo-banner-section">
                            <div className="rw-promo-inner">
                              <div className="rw-promo-text-section">
                                <div className="rw-contribute-points">Contribute your points to</div>
                                <div className="rw-sbi-green">SBI Green Funds!</div>
                              </div>
                              <div className="rw-promo-btn" tabIndex={0} role="tab" onClick={() => toast.success('Thank you for contributing to SBI Green Funds!')}>Donate Now</div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* ── RIGHT COLUMN: MY OFFERS ── */}
                      <div className="rw-rewards-my-offer-section">

                        {/* ─ Offers for you ─ */}
                        <div className="rw-offers-for-you-section">
                          <div className="rw-ofy-heading">
                            <span>Offers for you</span>
                            <span className="rw-viewAll" tabIndex={0} role="tab" onClick={() => toast('View All offers')}>View All</span>
                          </div>
                        </div>
                        <div className="rw-carousel-wrapper-offers">
                          {offersX < 0 && (
                            <button type="button" className="rw-nav-btn rw-left-offers" onClick={() => slideCarousel(setOffersX, 'left', OFFER_CARD_W, offersForYou.length, 3)}>‹</button>
                          )}
                          <div className="rw-carousel-track-wrapper-offers">
                            <div className="rw-carousel-track-offers" style={{ transform: `translateX(${offersX}px)` }}>
                              {offersForYou.map((o, i) => (
                                <div key={i} className="rw-card-item-offers">
                                  <div className="rw-card-offers" tabIndex={0} role="tab" onClick={() => setSelectedOfferModal(o)}>
                                    <div className="rw-unlock-plus-section">{o.brand} </div>
                                    <div className="rw-unlock-cash-section">{o.title}</div>
                                    <div className="rw-image-wrapper-offers">
                                      <img alt="offer" className="rw-card-img-offers" src={o.img} />
                                      <div className="rw-sub-image-sections">
                                        <div>{o.price}</div>
                                        <div className="rw-price-strike">{o.strike}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button type="button" className="rw-nav-btn rw-right-offers" tabIndex={0} role="tab" onClick={() => slideCarousel(setOffersX, 'right', OFFER_CARD_W, offersForYou.length, 3)}>›</button>
                        </div>

                        {/* ─ Shop & Earn ─ */}
                        <div className="rw-offers-for-you-section rw-pt-4">
                          <div className="rw-ofy-heading rw-pb-3">
                            <span>Shop &amp; Earn</span>
                            <span className="rw-viewAll" tabIndex={0} role="tab" onClick={() => toast('View All Shop & Earn')}>View All</span>
                          </div>
                        </div>
                        <div className="rw-carousel-wrapper-shop">
                          {shopX < 0 && (
                            <button type="button" className="rw-nav-btn rw-left-shop" onClick={() => slideCarousel(setShopX, 'left', SHOP_CARD_W, shopAndEarn.length, 5)}>‹</button>
                          )}
                          <div className="rw-carousel-track-wrapper-shop">
                            <div className="rw-carousel-track-shop" style={{ transform: `translateX(${shopX}px)` }}>
                              {shopAndEarn.map((s, i) => (
                                <div key={i} className="rw-card-item-shop">
                                  <div className="rw-card-shop" tabIndex={0} role="tab" onClick={() => toast(`Shop & Earn: ${s.points}`)}>
                                    <div className="rw-image-wrapper-shop">
                                      <img alt="voucher" className="rw-card-img-shop" src={s.img} />
                                    </div>
                                    <div className="rw-shop-earn-section">{s.points}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button type="button" className="rw-nav-btn rw-right-shop" tabIndex={0} role="tab" onClick={() => slideCarousel(setShopX, 'right', SHOP_CARD_W, shopAndEarn.length, 5)}>›</button>
                        </div>

                        {/* ─ Redeem on Vouchers ─ */}
                        <div className="rw-offers-for-you-section rw-pt-4">
                          <div className="rw-ofy-heading rw-pb-3">
                            <span>Redeem on Vouchers</span>
                            <span className="rw-viewAll" tabIndex={0} role="tab" onClick={() => toast('View All vouchers')}>View All</span>
                          </div>
                        </div>
                        <div className="rw-carousel-wrapper">
                          {voucherX < 0 && (
                            <button type="button" className="rw-nav-btn rw-left-voucher" onClick={() => slideCarousel(setVoucherX, 'left', VOUCHER_CARD_W, redeemVouchers.length, 5)}>‹</button>
                          )}
                          <div className="rw-carousel-track-wrapper">
                            <div className="rw-carousel-track" style={{ transform: `translateX(${voucherX}px)` }}>
                              {redeemVouchers.map((v, i) => (
                                <div key={i} className="rw-card-item">
                                  <div className="rw-card" tabIndex={0} role="tab" onClick={() => toast('Opening voucher details')}>
                                    <div className="rw-image-wrapper">
                                      <img alt="voucher" className="rw-card-img" src={v} />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <button type="button" className="rw-nav-btn rw-right-voucher" tabIndex={0} role="tab" onClick={() => slideCarousel(setVoucherX, 'right', VOUCHER_CARD_W, redeemVouchers.length, 5)}>›</button>
                        </div>

                        {/* ─ Do more with YONO Rewards ─ */}
                        <div className="rw-offers-for-you-section rw-pt-4">
                          <div className="rw-ofy-heading rw-pb-3">
                            <span>Do more with YONO Rewards</span>
                            <span></span>
                          </div>
                          <div className="rw-yono-reward-section">
                            <div className="rw-refer-earn-category" tabIndex={0} role="tab" onClick={() => toast('Refer and Earn')}>
                              <div className="rw-refer-img-section">
                                <img className="rw-image-height" src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/refer_earn_svg" alt="Refer and Earn" />
                              </div>
                              <div className="rw-reward-text-section">Refer and <br /> Earn</div>
                            </div>
                            <div className="rw-refer-earn-category" tabIndex={0} role="tab" onClick={() => toast('Rewards Calculator')}>
                              <div className="rw-refer-img-section">
                                <img className="rw-image-height" src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/rewards_calculator_svg" alt="Rewards Calculator" />
                              </div>
                              <div className="rw-reward-text-section">Rewards<br />Calculator</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Offers Tab Footer */}
                    <footer className="rw-footer">
                      <div className="rw-footer-inner rw-footer-end">
                        <button type="button" className="rw-outline-btn" tabIndex={0} role="tab" onClick={() => setActiveTab('Smart Rewards')}>Redeem Now</button>
                      </div>
                    </footer>
                  </div>
                )}

                {/* ═══════════ TAB 2: SUMMARY ═══════════ */}
                {activeTab === 'Summary' && (
                  <div className="rw-tab-pane" id="nav-contact" role="tabpanel">
                    <div className="rw-rewards-summary-container">

                      {/* Left Column */}
                      <div className="rw-summary-left">
                        <div className="rw-available-points-section rw-tier1">
                          <div className="rw-heading-section">
                            <div className="rw-availPntsBlock">
                              <span className="rw-label">Available Points</span>
                              <span className="rw-value">{pointsCount}</span>
                            </div>
                            <div className="rw-cardTierNameBlock">
                              <span className="rw-tier-badge">Dreamer</span>
                            </div>
                          </div>
                          <div className="rw-unlock-expire-section">
                            <div className="rw-unlock-expire-block">
                              <span className="rw-label">Unlocking Soon</span>
                              <span className="rw-sub-value">0</span>
                            </div>
                            <div className="rw-unlock-expire-block">
                              <span className="rw-label">Expiring Soon</span>
                              <span className="rw-sub-value">0</span>
                            </div>
                          </div>
                          <div className="rw-total-points-section" tabIndex={0} role="tab">
                            <div className="rw-total-left">
                              <div className="rw-star-icon">★</div>
                              <div className="rw-total-info">
                                <span className="rw-tp-label">Total Points</span>
                                <span className="rw-tp-value">{pointsCount}</span>
                              </div>
                            </div>
                            <div className="rw-total-right">
                              <span className="rw-arrow-icon">›</span>
                            </div>
                          </div>
                        </div>

                        {/* Points Term Filter */}
                        <div className="rw-points-term">
                          {['All', 'Unlocking soon', 'Expiring soon'].map((label) => (
                            <div key={label} className={`rw-selector-block${label === 'All' ? ' rw-selected-tab' : ''}`} tabIndex={0} role="tab">
                              <span>{label}</span>
                              <span className="rw-arrow">›</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Transaction Table */}
                      <div className="rw-transaction-table">
                        <div className="rw-transaction-history-header">
                          <span>Transaction History</span>
                          <div className="rw-filter-trans" tabIndex={0} role="tab" onClick={() => toast('Filters opened')}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#673391" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                            <span className="rw-select-count">03</span>
                          </div>
                        </div>

                        <div className="rw-table-content">
                          <table className="rw-table">
                            <thead>
                              <tr>
                                <th className="rw-transaction-header rw-transaction-width">Transactions</th>
                                <th className="rw-transaction-header">Date</th>
                                <th className="rw-transaction-header">Category</th>
                                <th className="rw-transaction-header">Points</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan={4} className="rw-empty-row">No transactions available for the selected period.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        <nav>
                          <ul className="rw-pagination">
                            <li className="rw-page-item rw-disabled">
                              <a tabIndex={0} role="tab" className="rw-page-arrow rw-muted">‹</a>
                            </li>
                            <li className="rw-page-item rw-disabled">
                              <a tabIndex={0} role="tab" className="rw-page-link rw-muted">Previous</a>
                            </li>
                            <li className="rw-page-item">
                              <a tabIndex={0} role="tab" className="rw-page-link rw-purple" onClick={() => toast('Next page')}>Next </a>
                            </li>
                            <li className="rw-page-item">
                              <a tabIndex={0} role="tab" className="rw-page-arrow rw-purple" onClick={() => toast('Next page')}>›</a>
                            </li>
                          </ul>
                        </nav>
                      </div>

                    </div>

                    {/* Summary Footer */}
                    <footer className="rw-footer">
                      <div className="rw-footer-inner rw-footer-between">
                        <div className="rw-view-orders" tabIndex={0} role="tab" onClick={() => toast('View Orders')}><u>View Orders</u></div>
                        <button type="button" className="rw-outline-btn" tabIndex={0} role="tab" onClick={() => setActiveTab('Smart Rewards')}>Redeem Now</button>
                      </div>
                    </footer>
                  </div>
                )}

                {/* ═══════════ TAB 3: SMART REWARDS ═══════════ */}
                {activeTab === 'Smart Rewards' && (
                  <div className="rw-tab-pane" id="nav-smart" role="tabpanel">
                    <div className="rw-smart-reward-section">

                      {/* Total Points strip */}
                      <div className="rw-smart-total-points">
                        <span>Total Points</span>
                        <span>{pointsCount}</span>
                      </div>

                      {/* Quiz Cards Row */}
                      <div className="rw-card-head">
                        <div className="rw-quiz-sections" tabIndex={0} role="tab" onClick={() => toast('Opening Live Quiz')}>
                          <div className="rw-title-section">Live Quiz</div>
                          <div className="rw-quiz-img-wrap">
                            <img className="rw-quiz-images" src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/rewards_live_quiz_svg" alt="live-quiz" />
                          </div>
                        </div>
                        <div className="rw-quiz-sections" tabIndex={0} role="tab" onClick={() => toast('Opening Completed Quiz')}>
                          <div className="rw-title-section">Completed Quiz</div>
                          <div className="rw-quiz-img-wrap">
                            <img className="rw-quiz-images" src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/rewards_completed_quiz_svg" alt="completed-quiz" />
                          </div>
                        </div>
                        <div className="rw-quiz-sections" tabIndex={0} role="tab" onClick={() => toast('Opening Leaderboard')}>
                          <div className="rw-title-section">Leaderboard</div>
                          <div className="rw-quiz-img-wrap">
                            <img className="rw-quiz-images" src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/rewards_leaderboard_svg" alt="leaderboard-quiz" />
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Smart Rewards Footer */}
                    <footer className="rw-footer">
                      <div className="rw-footer-inner rw-footer-end">
                        <button type="button" className="rw-outline-btn" tabIndex={0} role="tab" onClick={() => toast('Redeem Now')}>Redeem Now</button>
                      </div>
                    </footer>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>

      <SbiFixedFooter />

      {/* ═══ OFFER MODAL ═══ */}
      {selectedOfferModal && (
        <div className="rw-modal-overlay" onClick={() => setSelectedOfferModal(null)}>
          <div className="rw-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="rw-modal-header">
              <div>
                <div className="rw-modal-brand">{selectedOfferModal.brand}</div>
                <div className="rw-modal-title">{selectedOfferModal.title}</div>
              </div>
              <button className="rw-modal-close" onClick={() => setSelectedOfferModal(null)}>✕</button>
            </div>
            <p className="rw-modal-desc">{selectedOfferModal.desc}</p>
            <div className="rw-modal-code-box">
              <div>
                <div className="rw-modal-code-label">Promo Code</div>
                <div className="rw-modal-code">{selectedOfferModal.code}</div>
              </div>
              <button className="rw-modal-copy-btn" onClick={() => { navigator.clipboard?.writeText(selectedOfferModal.code); toast.success('Promo code copied!'); }}>Copy</button>
            </div>
            <div className="rw-modal-actions">
              <button className="rw-modal-btn-secondary" onClick={() => setSelectedOfferModal(null)}>Close</button>
              <button className="rw-modal-btn-primary" onClick={() => { toast.success(`Claimed offer for ${selectedOfferModal.brand}!`); setSelectedOfferModal(null); }}>Claim Offer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
