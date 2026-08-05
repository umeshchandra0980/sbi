'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Home, ChevronRight, Eye, EyeOff, Shield } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import './stop-cheque.css';

type TabType = 'enquire' | 'stop' | 'revoke';

export default function StopChequePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('enquire');
  const [showAccountNumber, setShowAccountNumber] = useState(false);

  // Enquire Cheque state
  const [enquireFrom, setEnquireFrom] = useState('');
  const [enquireTo, setEnquireTo] = useState('');

  // Stop Cheque state
  const [stopFrom, setStopFrom] = useState('');
  const [stopTo, setStopTo] = useState('');
  const [stopReason, setStopReason] = useState('');

  // Revoke Stop Cheque state
  const [revokeFrom, setRevokeFrom] = useState('');
  const [revokeTo, setRevokeTo] = useState('');

  const accountNumber = 'XXXXXXX7054';
  const maskedAccount = showAccountNumber ? '30XXXXX7054' : 'XXXXXXX7054';

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleEnquireSearch = () => {
    if (!enquireFrom) {
      toast.error('Please enter the cheque number in the "From" field.');
      return;
    }
    toast.success('Searching for cheque details...');
  };

  const handleStopCheque = () => {
    if (!stopFrom) {
      toast.error('Please enter the cheque number in the "From" field.');
      return;
    }
    if (!stopReason) {
      toast.error('Please select a stop cheque reason.');
      return;
    }
    toast.success('Stop cheque request submitted successfully.');
  };

  const handleRevokeSearch = () => {
    if (!revokeFrom) {
      toast.error('Please enter the cheque number in the "From" field.');
      return;
    }
    toast.success('Searching for stopped cheques...');
  };

  const stopReasons = [
    'Lost Cheque',
    'Stolen Cheque',
    'Cheque Issued by Mistake',
    'Payment Already Made',
    'Dispute with Payee',
    'Others',
  ];

  return (
    <div className="stopcheque-page-wrapper">
      {/* Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Services" />

      {/* Breadcrumb */}
      <div className="stopcheque-breadcrumb">
        <span className="stopcheque-breadcrumb-home" onClick={() => router.push('/dashboard')}>
          <Home size={15} />
        </span>
        <ChevronRight size={12} className="stopcheque-breadcrumb-sep" />
        <span className="stopcheque-breadcrumb-link" onClick={() => router.push('/services')}>
          Cheque Services
        </span>
        <ChevronRight size={12} className="stopcheque-breadcrumb-sep" />
        <span className="stopcheque-breadcrumb-current">
          Enquire / Stop Cheque / Revoke Stop Cheque
        </span>
      </div>

      {/* Page Title */}
      <h1 className="stopcheque-page-title">
        Enquire / Stop Cheque / Revoke Stop Cheque
      </h1>

      {/* Main Body */}
      <div className="stopcheque-body-container">
        <div className="stopcheque-card">
          {/* Tabs */}
          <div className="stopcheque-tabs">
            <button
              type="button"
              className={`stopcheque-tab ${activeTab === 'enquire' ? 'active' : ''}`}
              onClick={() => handleTabChange('enquire')}
            >
              Enquire Cheque
            </button>
            <button
              type="button"
              className={`stopcheque-tab ${activeTab === 'stop' ? 'active' : ''}`}
              onClick={() => handleTabChange('stop')}
            >
              Stop Cheque
            </button>
            <button
              type="button"
              className={`stopcheque-tab ${activeTab === 'revoke' ? 'active' : ''}`}
              onClick={() => handleTabChange('revoke')}
            >
              Revoke Stop Cheque
            </button>
          </div>

          {/* Tab Content */}
          <div className="stopcheque-tab-content">
            {/* ===== ENQUIRE CHEQUE TAB ===== */}
            {activeTab === 'enquire' && (
              <div>
                {/* Select Account */}
                <div className="stopcheque-section-label">Select Account</div>
                <div className="stopcheque-account-card selected">
                  <div className="stopcheque-account-icon">
                    <Shield size={20} color="#ffffff" />
                  </div>
                  <div className="stopcheque-account-details">
                    <div className="stopcheque-account-number-row">
                      <span className="stopcheque-account-number">{maskedAccount}</span>
                      <span
                        className="stopcheque-eye-icon"
                        onClick={() => setShowAccountNumber(!showAccountNumber)}
                      >
                        {showAccountNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                      </span>
                    </div>
                    <span className="stopcheque-account-type">Savings Account</span>
                  </div>
                </div>

                <hr className="stopcheque-divider" />

                {/* Search by Cheque Number */}
                <div className="stopcheque-cheque-section-label">
                  Search by Cheque Number
                  <span className="stopcheque-info-icon" title="Enter the cheque number or a range of cheque numbers to search">i</span>
                </div>

                <div className="stopcheque-input-row">
                  <div className="stopcheque-input-group">
                    <input
                      type="text"
                      className="stopcheque-input"
                      placeholder="From"
                      value={enquireFrom}
                      onChange={(e) => setEnquireFrom(e.target.value)}
                    />
                  </div>
                  <div className="stopcheque-input-group">
                    <input
                      type="text"
                      className="stopcheque-input"
                      placeholder="To (Optional)"
                      value={enquireTo}
                      onChange={(e) => setEnquireTo(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="stopcheque-search-btn"
                    onClick={handleEnquireSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}

            {/* ===== STOP CHEQUE TAB ===== */}
            {activeTab === 'stop' && (
              <div>
                {/* Select Account */}
                <div className="stopcheque-section-label">Select Account</div>
                <div className="stopcheque-account-card selected">
                  <div className="stopcheque-account-icon">
                    <Shield size={20} color="#ffffff" />
                  </div>
                  <div className="stopcheque-account-details">
                    <div className="stopcheque-account-number-row">
                      <span className="stopcheque-account-number">{maskedAccount}</span>
                      <span
                        className="stopcheque-eye-icon"
                        onClick={() => setShowAccountNumber(!showAccountNumber)}
                      >
                        {showAccountNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                      </span>
                    </div>
                    <span className="stopcheque-account-type">Savings Account</span>
                  </div>
                </div>

                <hr className="stopcheque-divider" />

                {/* Enter Cheque Number to Stop Cheque */}
                <div className="stopcheque-cheque-section-label">
                  Enter Cheque Number to Stop Cheque
                  <span className="stopcheque-info-icon" title="Enter the cheque number or a range of cheque numbers you want to stop">i</span>
                </div>

                <div className="stopcheque-input-row">
                  <div className="stopcheque-input-group">
                    <input
                      type="text"
                      className="stopcheque-input"
                      placeholder="From"
                      value={stopFrom}
                      onChange={(e) => setStopFrom(e.target.value)}
                    />
                  </div>
                  <div className="stopcheque-input-group">
                    <input
                      type="text"
                      className="stopcheque-input"
                      placeholder="To (Optional)"
                      value={stopTo}
                      onChange={(e) => setStopTo(e.target.value)}
                    />
                  </div>
                </div>

                {/* Lost your Cheque Book? */}
                <a className="stopcheque-lost-link" href="#" onClick={(e) => { e.preventDefault(); toast('Feature coming soon!'); }}>
                  Lost your Cheque Book?
                </a>

                {/* Stop cheque reason */}
                <div className="stopcheque-reason-group">
                  <select
                    className={`stopcheque-select ${stopReason ? 'has-value' : ''}`}
                    value={stopReason}
                    onChange={(e) => setStopReason(e.target.value)}
                  >
                    <option value="">Stop cheque reason</option>
                    {stopReasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Charge Info Banner */}
                <div className="stopcheque-info-banner">
                  <div className="stopcheque-info-banner-icon">i</div>
                  <span className="stopcheque-info-banner-text">
                    A service charge of ₹100 + GST per cheque leaf, maximum ₹500 + GST per instance will be levied from your account
                  </span>
                </div>

                {/* Go to Homepage Button */}
                <div className="stopcheque-homepage-btn-wrapper">
                  <button
                    type="button"
                    className="stopcheque-homepage-btn"
                    onClick={() => router.push('/dashboard')}
                  >
                    Go to Homepage
                  </button>
                </div>
              </div>
            )}

            {/* ===== REVOKE STOP CHEQUE TAB ===== */}
            {activeTab === 'revoke' && (
              <div>
                {/* Select Account */}
                <div className="stopcheque-section-label">Select Account</div>
                <div className="stopcheque-account-card selected">
                  <div className="stopcheque-account-icon">
                    <Shield size={20} color="#ffffff" />
                  </div>
                  <div className="stopcheque-account-details">
                    <div className="stopcheque-account-number-row">
                      <span className="stopcheque-account-number">{maskedAccount}</span>
                      <span
                        className="stopcheque-eye-icon"
                        onClick={() => setShowAccountNumber(!showAccountNumber)}
                      >
                        {showAccountNumber ? <EyeOff size={16} /> : <Eye size={16} />}
                      </span>
                    </div>
                    <span className="stopcheque-account-type">Savings Account</span>
                  </div>
                </div>

                <hr className="stopcheque-divider" />

                {/* Search by Cheque Number */}
                <div className="stopcheque-cheque-section-label">
                  Search by Cheque Number
                  <span className="stopcheque-info-icon" title="Enter the cheque number or a range of stopped cheque numbers to revoke">i</span>
                </div>

                <div className="stopcheque-input-row">
                  <div className="stopcheque-input-group">
                    <input
                      type="text"
                      className="stopcheque-input"
                      placeholder="From"
                      value={revokeFrom}
                      onChange={(e) => setRevokeFrom(e.target.value)}
                    />
                  </div>
                  <div className="stopcheque-input-group">
                    <input
                      type="text"
                      className="stopcheque-input"
                      placeholder="To (Optional)"
                      value={revokeTo}
                      onChange={(e) => setRevokeTo(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="stopcheque-search-btn"
                    onClick={handleRevokeSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="stopcheque-footer-wrapper">
        <div className="stopcheque-footer-links-section">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="stopcheque-footer-link">About SBI</a>
          <span className="stopcheque-footer-sep">|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="stopcheque-footer-link">Terms &amp; Conditions</a>
          <span className="stopcheque-footer-sep">|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="stopcheque-footer-link">Privacy Policy</a>
        </div>
        <div className="stopcheque-footer-dark-bar"></div>
      </div>
    </div>
  );
}
