'use client';

import React from 'react';

export const SbiFixedFooter: React.FC = () => {
  return (
    <footer 
      className="fixed bottom-0 left-0 w-full z-50 text-center py-[10px] px-4 flex items-center justify-center gap-6 sm:gap-10 border-t border-black/10 shadow-md select-none"
      style={{ 
        backgroundColor: '#4B4B4B',
        fontFamily: 'Roboto, sans-serif'
      }}
    >
      <a 
        href="#" 
        target="_blank" 
        rel="noopener" 
        className="text-[16px] font-medium text-white hover:underline transition-all opacity-95 hover:opacity-100"
      >
        About SBI
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener" 
        className="text-[16px] font-medium text-white hover:underline transition-all opacity-95 hover:opacity-100"
      >
        Terms &amp; Conditions
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener" 
        className="text-[16px] font-medium text-white hover:underline transition-all opacity-95 hover:opacity-100"
      >
        Privacy Policy
      </a>
    </footer>
  );
};

export default SbiFixedFooter;
