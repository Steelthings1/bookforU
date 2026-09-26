'use client';

import React, { useState } from 'react';
import { FAQS, TESTIMONIALS } from '@/data/books';
import { ChevronDown, HelpCircle, Star, Tablet, Smartphone, Laptop, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#F5F0E6] py-20 sm:py-24 border-t border-[#E8DFD1] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Reader Testimonials */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C682D] block mb-2">
              Reader Dispatches
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141924] tracking-tight">
              Endorsed by Discerning Scholars & Thinkers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-[#E4DAC8] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  <div className="flex text-[#D4AF37] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="font-serif text-sm sm:text-base text-[#3C3224] leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-[#F0E9DC]">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#DFCCA7]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#141924]">{t.author}</h4>
                    <p className="text-[11px] text-[#7A6F5E]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Compatibility Guide */}
        <div className="bg-gradient-to-br from-[#121620] via-[#161D2B] to-[#0A0D14] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-[#3A3326]">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Universal Open Standard
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF6ED]">
              A Library Bound To No Platform.
            </h3>
            <p className="text-sm text-[#BFB39F] leading-relaxed">
              Every volume you acquire includes EPUB, PDF, and MOBI distributions with zero DRM restriction. Easily transfer to e-ink screens or mobile book readers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 relative z-10 text-xs">
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2">
              <Tablet className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-white text-base">Amazon Kindle & Kobo</h4>
              <p className="text-[#AFA492] text-xs leading-relaxed">
                Send to Kindle via email or sideload via USB in one minute.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2">
              <Smartphone className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-white text-base">Apple Books & Android</h4>
              <p className="text-[#AFA492] text-xs leading-relaxed">
                Direct one-tap opening into iOS Books and Android e-readers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 space-y-2">
              <Laptop className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="font-serif font-bold text-white text-base">Desktop & Web Reader</h4>
              <p className="text-[#AFA492] text-xs leading-relaxed">
                Enjoy in our built-in sample reader, SumatraPDF, Calibre, or browser.
              </p>
            </div>
          </div>
        </div>

        {/* Accordion FAQs */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDD2BE] text-[#5C5346] text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5 text-[#B8924C]" /> Essential Inquiries
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141924] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E0D5C3] bg-white overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
                  >
                    <span className="font-serif font-bold text-[#141924] text-base">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C7E6C] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#8C682D]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[#5C5346] leading-relaxed border-t border-[#F0E9DC] bg-[#FCFBF9]">
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
