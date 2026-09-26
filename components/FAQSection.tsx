'use client';

import React, { useState } from 'react';
import { FAQS, TESTIMONIALS } from '@/data/books';
import { ChevronDown, HelpCircle, Star, Tablet, Smartphone, Laptop, CheckCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-slate-50 py-20 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Reader Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Community Feedback</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Loved by Over 45,000 Voracious Readers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Compatibility Guide */}
        <div className="bg-gradient-to-br from-brand-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Universal Compatibility</span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Read Everywhere. On Every Device.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every e-book you buy includes EPUB, PDF, and MOBI versions with zero proprietary lock-in. Send directly to your favorite e-reader in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative z-10 text-xs">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <Tablet className="w-5 h-5 text-amber-300" />
              <h4 className="font-bold text-white text-sm">Amazon Kindle & Kobo</h4>
              <p className="text-slate-300 text-[11px]">
                Supports 1-click &apos;Send to Kindle&apos; via email, or drag-and-drop EPUB/MOBI files via USB.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <Smartphone className="w-5 h-5 text-brand-300" />
              <h4 className="font-bold text-white text-sm">iOS Apple Books & Android</h4>
              <p className="text-slate-300 text-[11px]">
                Tap the downloaded file on your iPhone, iPad, or Android to instantly add it to your library.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <Laptop className="w-5 h-5 text-emerald-300" />
              <h4 className="font-bold text-white text-sm">Mac, Windows & Web</h4>
              <p className="text-slate-300 text-[11px]">
                Read in modern browsers, Calibre, SumatraPDF, Adobe Acrobat, or our built-in sample reader.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion FAQs */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5" /> Frequent Questions
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Got Questions? We&apos;ve Got Answers.
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
