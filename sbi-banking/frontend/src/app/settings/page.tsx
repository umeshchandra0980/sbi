'use client'

import React, { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, EyeOff, Edit2, CheckCircle2, ChevronRight, Home, 
  User, CreditCard, Shield, Lock, Award, HelpCircle, MessageSquare, 
  Search, Bell, Building2, Phone, X, Info
} from 'lucide-react';
import './profile.css';
import '../dashboard/dashboard.css';

export default function SettingsPage() {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'personal' | 'professional'>('personal');
  const [activeSidebarMenu, setActiveSidebarMenu] = useState('Manage My Profile');

  // Eye Mask Toggle States
  const [showCif, setShowCif] = useState(false);
  const [showDob, setShowDob] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [showCkyc, setShowCkyc] = useState(false);
  const [showPan, setShowPan] = useState(false);

  // Form State
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [religion, setReligion] = useState('Hindu');
  const [category, setCategory] = useState('General');

  const fullName = user?.full_name || 'DUMPALA VISHNU VARDHAN';
  const nameParts = fullName.split(' ');
  const initials = nameParts.map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'DV';

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* ================= HEADER (app-latest-header matching Screenshot) ================= */}
      <header className="dash-header">
        
        {/* Top Dark Purple Bar */}
        <div className="dash-top-bar">
          <div className="dash-top-bar-inner">
            <div className="dash-top-left-tabs">
              <button type="button" className="dash-top-tab active">
                Banking
              </button>
              <button type="button" className="dash-top-tab">
                Lifestyle
              </button>
              <button type="button" className="dash-top-tab">
                Rewards
              </button>

              <div className="dash-lite-switch">
                <span>YONO Net Banking Lite</span>
                <span className="switch-badge bg-gray-400 text-white">OFF</span>
              </div>
            </div>

            <div className="dash-top-right-info">
              <a href="https://crh.sbi.bank.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white text-xs hover:underline">
                <HelpCircle size={13} />
                Get Help
              </a>
              <span className="helpline-text">
                <b>022-20744646</b> (8AM-8PM) | ynbsupport@sbi.co.in | <b>1800-11-1101</b> (24x7)
              </span>
              <span className="text-xs">English ▾</span>
              <span className="text-xs font-bold cursor-pointer">- A +</span>
              <button type="button" onClick={handleLogout} className="logout-btn-dash">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main White Navbar */}
        <nav className="dash-main-navbar" aria-label="Main Navigation">
          <div className="dash-main-navbar-inner">
            <Link href="/dashboard" className="flex items-center gap-2">
              <img 
                src="https://cdn.onlineyono.sbi.bank.in//documents/d/sbi-yono-2.0/new-horz-logo_net-banking_svg" 
                alt="YONO SBI Net-Banking Logo" 
                className="dash-brand-logo"
              />
            </Link>

            <ul className="dash-nav-links">
              {[
                'Overview', 'Accounts', 'Payments', 'Deposits', 
                'Loans', 'Cards', 'Investments', 'Insurance', 'Services'
              ].map((tab) => (
                <li key={tab} className="dash-nav-item">
                  <Link href="/dashboard" className="dash-nav-link">
                    <span>{tab}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <button type="button" className="text-gray-600 hover:text-purple-900" title="Search">
                <Search size={18} />
              </button>
              <button type="button" className="text-gray-600 hover:text-purple-900 relative" title="Notifications">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
              </button>
              <div className="dash-user-profile-badge">
                <div className="dash-user-avatar-circle">{initials}</div>
                <span>My Profile</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ================= MAIN PROFILE CONTENT ================= */}
      <main className="profile-page-wrapper">
        <div className="profile-main-container">
          
          {/* Breadcrumb */}
          <div className="profile-breadcrumb">
            <Link href="/dashboard" className="flex items-center gap-1">
              <Home size={15} />
            </Link>
            <span>›</span>
            <span>Profile</span>
          </div>

          <div className="profile-grid-layout">
            
            {/* Left Sidebar Panel */}
            <div className="profile-left-sidebar">
              
              {/* User Avatar Card */}
              <div className="profile-user-card">
                <div className="profile-avatar-wrapper">
                  <div className="profile-avatar-circle">{initials}</div>
                  <div className="avatar-pencil-badge" title="Edit Avatar">
                    <Edit2 size={11} />
                  </div>
                </div>

                <h2 className="profile-user-name">{fullName}</h2>

                <div className="profile-cif-text">
                  <span>CIF: {showCif ? '9876545720' : 'xxxxxxx5720'}</span>
                  <button 
                    type="button" 
                    onClick={() => setShowCif(!showCif)}
                    className="eye-mask-icon border-0 bg-none p-0"
                    title={showCif ? "Hide CIF" : "Show CIF"}
                  >
                    {showCif ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                <div className="profile-last-login">
                  Last Login 31/07/26 01:57 pm
                </div>
              </div>

              {/* Sidebar Navigation Menu */}
              <div className="profile-menu-box">
                {[
                  { label: 'Manage My Profile', icon: User },
                  { label: 'Manage My Accounts', icon: CreditCard },
                  { label: 'Access Services', icon: Building2 },
                  { label: 'Settings', icon: Shield },
                  { label: 'Update My Security', icon: Lock },
                  { label: 'Refer & Earn Rewards', icon: Award },
                  { label: 'Get Support', icon: HelpCircle },
                  { label: 'Share Feedback', icon: MessageSquare },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarMenu === item.label;
                  return (
                    <div
                      key={item.label}
                      onClick={() => setActiveSidebarMenu(item.label)}
                      className={`profile-menu-item ${isActive ? 'active' : ''}`}
                    >
                      <div className="profile-menu-item-left">
                        <div className="profile-menu-icon">
                          <Icon size={18} />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Main Panel */}
            <div className="profile-right-panel">
              
              {/* Tabs Header Row */}
              <div className="profile-tabs-header">
                <div className="profile-tabs-left">
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('personal')}
                    className={`profile-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                  >
                    Personal Details
                    <span className="info-circle-badge">!</span>
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setActiveTab('professional')}
                    className={`profile-tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
                  >
                    Professional Details
                    <span className="info-circle-badge">!</span>
                  </button>
                </div>

                <div className="profile-completion-meter">
                  Profile Completion: 66%
                </div>
              </div>

              {/* Green KYC Updated Banner */}
              <div className="kyc-updated-banner">
                <div className="kyc-banner-left">
                  <CheckCircle2 size={20} className="text-green-600" />
                  <span>KYC Updated</span>
                </div>
                <a href="https://cdnweb.onlineyono.sbi.bank.in/accounts/re-kyc/kyc-entry" target="_blank" rel="noopener noreferrer" className="kyc-update-now-link">
                  Update Now
                </a>
              </div>

              {/* Personal Details Gray Box (Masked Fields with Eye Toggles) */}
              <div className="personal-details-gray-box">
                
                {/* Date of Birth */}
                <div>
                  <span className="detail-field-item">Date of Birth</span>
                  <div className="detail-field-val">
                    <span>{showDob ? '15/08/2000' : 'XX/XX/2000'}</span>
                    <button type="button" onClick={() => setShowDob(!showDob)} className="eye-mask-icon bg-none border-0 p-0">
                      {showDob ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <span className="detail-field-item">Mobile number</span>
                  <div className="detail-field-val">
                    <span>{showMobile ? '9876545933' : 'XXXXXX5933'}</span>
                    <button type="button" onClick={() => setShowMobile(!showMobile)} className="eye-mask-icon bg-none border-0 p-0">
                      {showMobile ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* CKYC Number */}
                <div>
                  <span className="detail-field-item flex items-center gap-1">
                    CKYC Number <Info size={13} className="text-purple-800" />
                  </span>
                  <div className="detail-field-val">
                    <span>{showCkyc ? '987654322966' : 'XXXXXXXX2966'}</span>
                    <button type="button" onClick={() => setShowCkyc(!showCkyc)} className="eye-mask-icon bg-none border-0 p-0">
                      {showCkyc ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* PAN */}
                <div>
                  <span className="detail-field-item">PAN</span>
                  <div className="detail-field-val">
                    <span>{showPan ? 'ABCDE6421H' : 'XXXXXX642H'}</span>
                    <button type="button" onClick={() => setShowPan(!showPan)} className="eye-mask-icon bg-none border-0 p-0">
                      {showPan ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Father's Name */}
                <div className="col-span-1 md:col-span-2">
                  <span className="detail-field-item">Father&apos;s Name</span>
                  <div className="detail-field-val text-slate-800">
                    D SHYAMSUNDER
                  </div>
                </div>

              </div>

              {/* Email ID Field */}
              <div className="address-field-block">
                <span className="address-title">Email ID</span>
                <div className="address-text lowercase font-normal text-slate-700">
                  {user?.email || 'dumpala.vishnu@example.com'}
                </div>
              </div>

              {/* Communication Address */}
              <div className="address-field-block">
                <span className="address-title">Communication Address</span>
                <p className="address-text m-0">
                  H NO 6-20 KUNARAM PEDDAPALLI TELANGANA 505174
                </p>
                <Edit2 size={16} className="address-edit-pencil" title="Edit Communication Address" />
              </div>

              {/* Permanent Address */}
              <div className="address-field-block">
                <span className="address-title">Permanent Address</span>
                <p className="address-text m-0">
                  H NO 6-20 KUNARAM KALVASRIRAMPUR Srirampur KARIMNAGAR TELANGANA 505174
                </p>
                <Edit2 size={16} className="address-edit-pencil" title="Edit Permanent Address" />
              </div>

              {/* Dropdown Select Fields */}
              <div className="profile-select-grid mt-6">
                
                {/* Marital Status */}
                <div className="profile-select-wrapper">
                  <label htmlFor="marital-status" className="profile-select-label">Marital Status</label>
                  <select 
                    id="marital-status"
                    value={maritalStatus} 
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="profile-select-input"
                  >
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Religion */}
                <div className="profile-select-wrapper">
                  <label htmlFor="religion" className="profile-select-label">Religion</label>
                  <select 
                    id="religion"
                    value={religion} 
                    onChange={(e) => setReligion(e.target.value)}
                    className="profile-select-input"
                  >
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Category */}
                <div className="profile-select-wrapper">
                  <label htmlFor="category" className="profile-select-label">Category</label>
                  <select 
                    id="category"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="profile-select-input"
                  >
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                  </select>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
