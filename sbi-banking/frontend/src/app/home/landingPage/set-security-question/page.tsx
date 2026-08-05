'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SbiGlobalBrandHeader from '@/components/banking/SbiGlobalBrandHeader';
import { Home, ChevronRight, Info } from 'lucide-react';

export default function SetSecurityQuestionPage() {
  const router = useRouter();

  const questionsList = [
    { id: 'q1', label: 'What was the name of your first pet?' },
    { id: 'q2', label: 'What was the make and model of your first car?' },
    { id: 'q3', label: 'What is the name of your favourite teacher?' },
    { id: 'q4', label: 'What is the name of your favourite childhood friend?' },
    { id: 'q5', label: 'What is the name of the hospital where you were born?' },
    { id: 'q6', label: 'What is your favourite book or author?' },
    { id: 'q7', label: 'What is the name of your first school?' },
    { id: 'q8', label: 'What is the name of your favourite vacation destination?' },
    { id: 'q9', label: 'What is the name of your favourite restaurant?' },
    { id: 'q10', label: 'What is your mothers maiden name?' },
  ];

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const answeredCount = Object.values(answers).filter(val => val.trim().length > 0).length;
  const isFormValid = answeredCount >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      toast.success('Security questions saved successfully!');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f0f8] font-sans text-slate-800 flex flex-col justify-between">
      <div>
        {/* Header */}
        <SbiGlobalBrandHeader activeNav="Services" activeTopTab="Banking" />

        {/* Main Container */}
        <main className="max-w-[1280px] w-full mx-auto px-4 py-6">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-4">
            <Link href="/dashboard" className="hover:text-[#673391] transition-colors flex items-center gap-1">
              <Home size={14} className="text-[#673391]" />
            </Link>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="hover:text-[#673391] text-slate-600 cursor-pointer">Profile</span>
            <ChevronRight size={13} className="text-slate-400" />
            <span className="text-[#673391] font-bold">Set Security Questions</span>
          </div>

          {/* Page Heading */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#673391] mb-6 tracking-tight">
            Security Questions
          </h1>

          {/* Main Card Box */}
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xs border border-slate-100 mb-6">
            
            {/* Title & Subtitle */}
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2 tracking-tight">
              Set Security Questions
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-6">
              We have introduced additional authentication for safety of your account.<br className="hidden sm:inline" />
              Answer atleast 3 of the security questions to continue.
            </p>

            {/* Confidentiality Warning Box */}
            <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-2xl p-4 flex items-center gap-3 text-xs md:text-sm text-[#c2410c] font-semibold mb-10 max-w-2xl shadow-2xs">
              <Info size={18} className="text-[#c2410c] flex-shrink-0" />
              <span>Please maintain confidentiality and do not share these details with anyone.</span>
            </div>

            {/* 2-Column Questions Grid */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {questionsList.map((q) => (
                <div key={q.id} className="flex flex-col">
                  <label htmlFor={q.id} className="text-xs md:text-sm font-semibold text-slate-800 mb-2">
                    {q.label}
                  </label>
                  <input
                    id={q.id}
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    placeholder="Answer"
                    className="w-full bg-transparent border-b border-slate-300 focus:border-[#673391] py-2 px-1 text-sm font-semibold text-slate-800 outline-none transition-colors placeholder:text-slate-400 placeholder:font-normal"
                  />
                </div>
              ))}
            </form>

          </div>

        </main>
      </div>

      {/* Bottom Fixed Action Footer */}
      <footer className="max-w-[1280px] w-full mx-auto px-4 py-4 flex justify-end">
        <button
          type="button"
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`font-extrabold text-xs md:text-sm py-3 px-10 rounded-full transition-all flex items-center gap-2 ${
            isFormValid
              ? 'bg-[#673391] text-white hover:bg-[#561578] shadow-md hover:shadow-lg cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>Proceed</span>
          <span>&rarr;</span>
        </button>
      </footer>
    </div>
  );
}
