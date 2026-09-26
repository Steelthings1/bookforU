'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { BOOKS } from '@/data/books';
import { BookOpen, Sparkles, Zap, ShieldCheck, Download, Star, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openReader, openBookDetail, addToCart } = useCart();
  const spotlightBook = BOOKS[0]; // Architects of Intelligence

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
      {/* Background ambient decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl -z-10">
        <div className="absolute -top-10 left-1/4 w-72 h-72 rounded-full bg-brand-300 mix-blend-multiply filter blur-2xl animate-pulse"></div>
        <div className="absolute top-10 right-1/4 w-80 h-80 rounded-full bg-indigo-200 mix-blend-multiply filter blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Call-to-action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Next-Generation E-Book Store</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Infinite stories & knowledge, crafted for <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent">your screen</span>.
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Read without limits. Download DRM-free e-books in <span className="font-semibold text-slate-800">EPUB, PDF, and MOBI</span> formats. Enjoy instant delivery to your Kindle, tablet, smartphone, or read directly in your browser.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                className="px-7 py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 text-base"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => openReader(spotlightBook)}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold shadow-sm hover:-translate-y-0.5 transition-all flex items-center gap-2 text-base"
              >
                <BookOpen className="w-4 h-4 text-brand-600" />
                <span>Try Sample Reader</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-200/80 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Instant Delivery</h4>
                  <p className="text-[11px] text-slate-500">Zero wait time</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% DRM-Free</h4>
                  <p className="text-[11px] text-slate-500">Yours forever</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Satisfaction</h4>
                  <p className="text-[11px] text-slate-500">14-day guarantee</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Free Lifetime</h4>
                  <p className="text-[11px] text-slate-500">Edition updates</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Spotlight Feature Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 shadow-2xl shadow-slate-300/60 border border-slate-200/90 group hover:border-brand-300 transition-all">
              
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-white" /> Featured Masterpiece
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {spotlightBook.discountBadge}
                </span>
              </div>

              {/* Book preview layout */}
              <div className="flex gap-5 items-start">
                <div
                  onClick={() => openBookDetail(spotlightBook)}
                  className="w-32 sm:w-36 h-48 sm:h-52 rounded-xl overflow-hidden shadow-lg shadow-slate-900/20 shrink-0 cursor-pointer relative group/img transform group-hover:scale-[1.03] transition-transform duration-300"
                >
                  <img
                    src={spotlightBook.coverImage}
                    alt={spotlightBook.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[10px] text-white font-medium">Click to inspect</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                    {spotlightBook.category}
                  </span>
                  <h3
                    onClick={() => openBookDetail(spotlightBook)}
                    className="font-black text-slate-900 text-lg leading-snug hover:text-brand-600 cursor-pointer transition-colors"
                  >
                    {spotlightBook.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">By {spotlightBook.author}</p>

                  <div className="flex items-center gap-1 pt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{spotlightBook.rating}</span>
                    <span className="text-[11px] text-slate-400">({spotlightBook.reviewCount})</span>
                  </div>

                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">${spotlightBook.price}</span>
                    {spotlightBook.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ${spotlightBook.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Spotlight */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={() => openReader(spotlightBook)}
                  className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-brand-600" />
                  Read Free Excerpt
                </button>
                <button
                  onClick={() => addToCart(spotlightBook)}
                  className="px-3 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-1.5"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
