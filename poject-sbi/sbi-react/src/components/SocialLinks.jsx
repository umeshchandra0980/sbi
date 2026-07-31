import React from 'react';
import { Facebook, Twitter, Youtube, Linkedin, Instagram, Phone, MessageCircle } from 'lucide-react';
import './SocialLinks.css';

const PinterestIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.436 2.981 7.436 6.963 0 4.156-2.618 7.502-6.257 7.502-1.222 0-2.373-.635-2.766-1.385l-.752 2.87c-.272 1.042-1.011 2.343-1.505 3.14 1.199.366 2.474.565 3.791.565 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z"/>
  </svg>
);

export default function SocialLinks() {
  return (
    <nav className="socialLinks" aria-label="Social media links">
      <div className="socialLinksInner">
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/StateBankofIndia">
          <span className="socialLinkIcon" id="icon_linkfb"><Facebook size={20} /></span>
          <span className="socialLinkLabel">SBI Official<br/>Facebook</span>
        </a>
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="https://twitter.com/TheOfficialSBI">
          <span className="socialLinkIcon" id="icon_linktw"><Twitter size={20} /></span>
          <span className="socialLinkLabel">SBI Official<br/>Twitter</span>
        </a>
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="http://www.youtube.com/theofficialsbi">
          <span className="socialLinkIcon" id="icon_linkyt"><Youtube size={20} /></span>
          <span className="socialLinkLabel">SBI Official<br/>YouTube</span>
        </a>
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/state-bank-of-india/">
          <span className="socialLinkIcon" id="icon_linklindn"><Linkedin size={20} /></span>
          <span className="socialLinkLabel">SBI Official<br/>LinkedIn</span>
        </a>
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="https://instagram.com/theofficialsbi/">
          <span className="socialLinkIcon" id="icon_linkinst"><Instagram size={20} /></span>
          <span className="socialLinkLabel">SBI Official<br/>Instagram</span>
        </a>
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="https://www.pinterest.com/TheOfficialSBI/">
          <span className="socialLinkIcon" id="icon_linkpint"><PinterestIcon /></span>
          <span className="socialLinkLabel">SBI Official<br/>Pinterest</span>
        </a>
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="https://retail.sbi.bank.in/npersonal/contact_us.html">
          <span className="socialLinkIcon" id="icon_contus"><Phone size={20} /></span>
          <span className="socialLinkLabel">Contact Us</span>
        </a>
        <a className="socialLink" target="_blank" rel="noopener noreferrer" href="https://sbi.bank.in/web/personal-banking/digital/whatsapp-banking">
          <span className="socialLinkIcon" id="icon_whatsapp"><MessageCircle size={20} /></span>
          <span className="socialLinkLabel">Whatsapp<br/>Banking</span>
        </a>
      </div>
    </nav>
  );
}
