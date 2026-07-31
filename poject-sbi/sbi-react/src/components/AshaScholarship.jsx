import React from 'react';
import { 
  School, GraduationCap, Microscope, Pill, Award, Globe, 
  CheckCircle, FileText, Upload, Send, Clock 
} from 'lucide-react';
import './AshaScholarship.css';

export default function AshaScholarship() {
  return (
    <div className="asha-banner">
      <div className="asha-left"></div>
      <div className="asha-right">
        <h2 className="asha-title">SBI Platinum Jubilee<br />Asha Scholarship 2026</h2>
        <p className="asha-subtitle">India's Talent. SBI's Commitment.</p>
        
        <div className="asha-pills">
          <div className="asha-pill">₹100 Cr Scholarship This Year</div>
          <div className="asha-pill">Supporting 25,707 Scholars Nationwide</div>
          <div className="asha-pill">Application Deadline September 4th, 2026</div>
        </div>

        <div className="asha-cards">
          <div className="asha-card">
            <h4>ABOUT THE PROGRAM</h4>
            <ul>
              <li>India's Largest Corporate Scholarship Programme</li>
              <li>Empowering meritorious students from economically weaker backgrounds</li>
              <li>Reducing financial barriers to build a future-ready India</li>
            </ul>
          </div>
          <div className="asha-card">
            <h4>ELIGIBILITY</h4>
            <ul>
              <li>Minimum <strong>75% marks</strong> or 7.5 CGPA</li>
              <li>Students enrolled in premier institutions (NAAC-accredited Grade A or above)</li>
              <li>Annual family income: Up to ₹3,00,000 (School) or ₹6,00,000 (College)</li>
            </ul>
          </div>
          <div className="asha-card">
            <h4>SCHOLARSHIP AWARD</h4>
            <p>From <strong>₹15,000 to ₹15 lakhs</strong> based on category*</p>
            <p style={{marginTop: '10px', fontSize: '10px'}}>*SBI strives to extend its financial support to students throughout their course if they meet the criteria.</p>
          </div>
        </div>
      </div>

      <div className="asha-bottom-bar">
        <div className="asha-bottom-left">
          <div className="asha-bottom-title">SCHOLARSHIP CATEGORIES</div>
          <div className="asha-icons">
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><School size={20} color="#280071" /></div>
              School
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><GraduationCap size={20} color="#280071" /></div>
              Undergraduate
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><Award size={20} color="#280071" /></div>
              Postgraduate
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><Pill size={20} color="#280071" /></div>
              Medical
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><Microscope size={20} color="#280071" /></div>
              IIT
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><Globe size={20} color="#280071" /></div>
              Overseas
            </div>
          </div>
        </div>
        
        <div className="asha-bottom-right">
          <div className="asha-bottom-title">HOW TO APPLY</div>
          <div className="asha-icons">
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><CheckCircle size={20} color="#280071" /></div>
              Check Eligibility
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><FileText size={20} color="#280071" /></div>
              Fill Application
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><Upload size={20} color="#280071" /></div>
              Upload Docs
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><Send size={20} color="#280071" /></div>
              Submit
            </div>
            <div className="asha-icon-item">
              <div className="asha-icon-circle"><Clock size={20} color="#280071" /></div>
              Wait for Selection
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
