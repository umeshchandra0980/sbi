'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft, Home, ChevronRight, Lock, Unlock, ShieldCheck, Check } from 'lucide-react';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import './e-secure-lock.css';

interface AccountItem {
  id: string;
  type: string;
  label: string;
  accountNumber?: string;
}

export default function ESecureLockPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'active' | 'locked'>('active');
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'lock' | 'unlock'>('lock');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Mock data for accounts
  const [activeAccounts, setActiveAccounts] = useState<AccountItem[]>([
    { id: '1', type: 'savings', label: 'Savings Account', accountNumber: 'XXXX XXXX 4521' },
  ]);
  const [lockedAccounts, setLockedAccounts] = useState<AccountItem[]>([]);

  const currentList = activeTab === 'active' ? activeAccounts : lockedAccounts;

  const toggleAccountSelection = (id: string) => {
    setSelectedAccounts(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleLockClick = () => {
    if (selectedAccounts.length === 0) {
      toast.error('Please select at least one account to lock.');
      return;
    }
    setConfirmAction('lock');
    setShowConfirmModal(true);
  };

  const handleUnlockClick = () => {
    if (selectedAccounts.length === 0) {
      toast.error('Please select at least one account to unlock.');
      return;
    }
    setConfirmAction('unlock');
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);

    if (confirmAction === 'lock') {
      const accountsToLock = activeAccounts.filter(a => selectedAccounts.includes(a.id));
      setActiveAccounts(prev => prev.filter(a => !selectedAccounts.includes(a.id)));
      setLockedAccounts(prev => [...prev, ...accountsToLock]);
      setSuccessMessage(`Successfully locked ${accountsToLock.length} account(s). Your account(s) are now secured.`);
      toast.success('Account locked successfully!');
    } else {
      const accountsToUnlock = lockedAccounts.filter(a => selectedAccounts.includes(a.id));
      setLockedAccounts(prev => prev.filter(a => !selectedAccounts.includes(a.id)));
      setActiveAccounts(prev => [...prev, ...accountsToUnlock]);
      setSuccessMessage(`Successfully unlocked ${accountsToUnlock.length} account(s). Your account(s) are now active.`);
      toast.success('Account unlocked successfully!');
    }

    setSelectedAccounts([]);

    // Auto-dismiss the success message after 5 seconds
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const isActionDisabled = selectedAccounts.length === 0;

  return (
    <div className="esecure-page-wrapper">
      {/* Global Brand Header */}
      <SbiGlobalBrandHeader activeNav="Services" />

      {/* Breadcrumb */}
      <div className="esecure-breadcrumb">
        <span className="esecure-breadcrumb-home" onClick={() => router.push('/dashboard')}>
          <Home size={15} />
        </span>
        <ChevronRight size={12} className="esecure-breadcrumb-sep" />
        <span className="esecure-breadcrumb-link" onClick={() => router.push('/dashboard')}>
          Channel Settings
        </span>
        <ChevronRight size={12} className="esecure-breadcrumb-sep" />
        <span className="esecure-breadcrumb-current">e-Secure Lock</span>
      </div>

      {/* Page Title */}
      <h1 className="esecure-page-title">e-Secure Lock</h1>

      {/* Main Body */}
      <div className="esecure-body-container">
        {/* Success Banner */}
        {successMessage && (
          <div className="esecure-success-banner">
            <div className="esecure-success-banner-icon">
              <Check size={16} color="#ffffff" />
            </div>
            <span className="esecure-success-banner-text">{successMessage}</span>
          </div>
        )}

        <div className="esecure-card">
          {/* YONO Section Header */}
          <div className="esecure-section-title">YONO</div>

          {/* Tabs */}
          <div className="esecure-tabs">
            <button
              type="button"
              className={`esecure-tab ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => { setActiveTab('active'); setSelectedAccounts([]); }}
            >
              Active Accounts
            </button>
            <button
              type="button"
              className={`esecure-tab ${activeTab === 'locked' ? 'active' : ''}`}
              onClick={() => { setActiveTab('locked'); setSelectedAccounts([]); }}
            >
              Locked Accounts
            </button>
          </div>

          {/* Tab Content */}
          <div className="esecure-tab-content">
            {activeTab === 'active' ? (
              /* ===== Active Accounts Tab ===== */
              <div className="esecure-active-layout">
                {/* Left: Account List */}
                <div className="esecure-accounts-list">
                  {activeAccounts.length > 0 ? (
                    activeAccounts.map(account => (
                      <div
                        key={account.id}
                        className="esecure-account-row"
                        onClick={() => toggleAccountSelection(account.id)}
                      >
                        <div className="esecure-checkbox-wrap">
                          <input
                            type="checkbox"
                            checked={selectedAccounts.includes(account.id)}
                            onChange={() => toggleAccountSelection(account.id)}
                            onClick={e => e.stopPropagation()}
                          />
                        </div>
                        <span className="esecure-account-label">{account.label}</span>
                      </div>
                    ))
                  ) : (
                    <div className="esecure-empty-state">
                      <div className="esecure-empty-icon">
                        <ShieldCheck size={24} />
                      </div>
                      <span>All accounts are currently locked.</span>
                    </div>
                  )}
                </div>

                {/* Right: Shield Illustration */}
                <div className="esecure-illustration-panel">
                  <div className="esecure-shield-illustration">
                    <div className="esecure-shield-svg-container">
                      {/* Background pink blob */}
                      <div className="esecure-shield-bg-blob" />

                      {/* Main shield illustration */}
                      <div className="esecure-shield-main">
                        <div className="esecure-shield-icon-wrap">
                          {/* Shield SVG */}
                          <svg width="100" height="110" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Outer Shield */}
                            <path d="M50 6L12 24V54C12 78.5 28.5 100 50 106C71.5 100 88 78.5 88 54V24L50 6Z" fill="#f8bbd0" fillOpacity="0.5" stroke="#e91e63" strokeWidth="2"/>
                            {/* Inner Shield */}
                            <path d="M50 16L22 30V54C22 73.5 34.5 91 50 96C65.5 91 78 73.5 78 54V30L50 16Z" fill="#fce4ec" stroke="#ec407a" strokeWidth="1.5"/>
                            {/* Checkmark */}
                            <path d="M38 54L46 62L64 44" stroke="#c2185b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>

                        {/* Password field + lock badge */}
                        <div className="esecure-password-field-illust">
                          <div className="esecure-password-dots-box">
                            <span>****</span>
                          </div>
                          <div className="esecure-lock-badge">
                            <Lock size={18} color="#ffffff" />
                          </div>
                        </div>
                      </div>

                      {/* Person silhouette */}
                      <div className="esecure-person-silhouette">
                        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="30" cy="18" r="12" fill="#f8bbd0" fillOpacity="0.5"/>
                          <path d="M10 80C10 58 18 45 30 45C42 45 50 58 50 80" fill="#f8bbd0" fillOpacity="0.35"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ===== Locked Accounts Tab ===== */
              <div style={{ minHeight: 200 }} />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="esecure-bottom-bar">
        <button
          type="button"
          className="esecure-btn-previous"
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        {activeTab === 'active' ? (
          <button
            type="button"
            className="esecure-btn-lock"
            disabled={isActionDisabled}
            onClick={handleLockClick}
          >
            Lock
            <Lock size={16} />
          </button>
        ) : (
          <button
            type="button"
            className="esecure-btn-lock"
            disabled={isActionDisabled}
            onClick={handleUnlockClick}
          >
            Unlock
            <Unlock size={16} />
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="esecure-footer">
        <div className="esecure-footer-links">
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="esecure-footer-link">About SBI</a>
          <span>|</span>
          <a href="https://onlinesbi.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="esecure-footer-link">Terms &amp; Conditions</a>
          <span>|</span>
          <a href="https://sbi.bank.in" target="_blank" rel="noopener noreferrer" className="esecure-footer-link">Privacy Policy</a>
        </div>
      </footer>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="esecure-modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="esecure-modal" onClick={e => e.stopPropagation()}>
            <div className="esecure-modal-icon">
              {confirmAction === 'lock' ? (
                <Lock size={26} color="#302985" />
              ) : (
                <Unlock size={26} color="#302985" />
              )}
            </div>
            <div className="esecure-modal-title">
              {confirmAction === 'lock' ? 'Lock Account(s)?' : 'Unlock Account(s)?'}
            </div>
            <div className="esecure-modal-text">
              {confirmAction === 'lock'
                ? 'Are you sure you want to lock the selected account(s)? Once locked, no transactions can be performed on these accounts through YONO until you unlock them.'
                : 'Are you sure you want to unlock the selected account(s)? Once unlocked, transactions can be performed on these accounts through YONO.'}
            </div>
            <div className="esecure-modal-btns">
              <button
                type="button"
                className="esecure-modal-cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="esecure-modal-confirm"
                onClick={handleConfirm}
              >
                {confirmAction === 'lock' ? 'Yes, Lock' : 'Yes, Unlock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
