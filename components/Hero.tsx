'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { BOOKS } from '@/data/books';
import { BookOpen, Sparkles, ShieldCheck, Download, Star, ArrowRight, Award, Feather } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openReader, openBookDetail, addToCart } = useCart();
  const spotlightBook = BOOKS[0]; // Architects of Intelligence

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E8DFD1]">
      {/* Background ambient luxury illumination */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40 blur-3xl -z-10">
        <div className="absolute -top-12 left-1/5 w-96 h-96 rounded-full bg-[#E5D2A6] mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-24 right-1/4 w-80 h-80 rounded-full bg-[#D7C39C] mix-blend-multiply filter blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline and Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#D5C6AC] shadow-sm text-[#7D5B23] text-xs font-bold tracking-widest uppercase">
              <Award className="w-3.5 h-3.5 text-[#B8924C]" />
              <span>Curated Fine Digital Editions</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#121620] tracking-tight leading-[1.12]">
              Literary Craft & Intellect, <br />
              <span className="italic font-normal text-[#8A6324]">Curated for your screen.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#615747] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Read without compromise. Acquire DRM-free masterworks in <span className="font-semibold text-[#2D261C]">EPUB, PDF, and MOBI</span> formats. Designed for effortless reading on Amazon Kindle, Apple Books, Kobo, or your browser.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#catalog"
                className="px-8 py-3.5 rounded-full bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold shadow-xl shadow-black/15 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 text-xs uppercase tracking-wider border border-[#3A3326]"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </a>

              <button
                onClick={() => openReader(spotlightBook)}
                className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#2C2419] border border-[#D5C6AC] font-bold shadow-sm hover:border-[#B8924C] hover:-translate-y-0.5 transition-all flex items-center gap-2 text-xs uppercase tracking-wider"
              >
                <Feather className="w-4 h-4 text-[#B8924C]" />
                <span>Read Free Excerpt</span>
              </button>
            </div>

            {/* Editorial Quality Guarantees */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E8DFD1] text-left">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FAF4E6] border border-[#DFCCA7] text-[#9C722F] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F1911]">DRM-Free</h4>
                  <p className="text-[11px] text-[#7A6F5E]">Permanent library rights</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FAF4E6] border border-[#DFCCA7] text-[#9C722F] flex items-center justify-center shrink-0 mt-0.5">
                  <Download className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F1911]">Instant Delivery</h4>
                  <p className="text-[11px] text-[#7A6F5E]">Direct file delivery</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FAF4E6] border border-[#DFCCA7] text-[#9C722F] flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F1911]">All Formats</h4>
                  <p className="text-[11px] text-[#7A6F5E]">EPUB, PDF, and MOBI</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FAF4E6] border border-[#DFCCA7] text-[#9C722F] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1F1911]">Guaranteed</h4>
                  <p className="text-[11px] text-[#7A6F5E]">14-day refund policy</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Luxury Book Showcase Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl shadow-slate-900/10 border border-[#E4DAC8] group hover:border-[#CCA862] transition-all duration-300">
              
              {/* Gold foil ribbon */}
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 bg-gradient-to-r from-[#B8924C] to-[#925C23] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-[#F6E5C5] text-[#F6E5C5]" /> Editor’s Choice
                </span>
                <span className="text-[11px] font-bold text-[#9C722F] bg-[#FAF4E8] px-2.5 py-0.5 rounded-full border border-[#E7DCBA]">
                  {spotlightBook.discountBadge}
                </span>
              </div>

              {/* Book preview layout with 3D spine depth */}
              <div className="flex gap-5 items-start">
                <div
                  onClick={() => openBookDetail(spotlightBook)}
                  className="w-32 sm:w-36 h-48 sm:h-52 rounded-lg overflow-hidden shadow-book-hover shrink-0 cursor-pointer relative book-spine-sheen transform group-hover:scale-[1.02] group-hover:-rotate-1 transition-all duration-300 border border-black/10"
                >
                  <img
                    src={spotlightBook.coverImage}
                    alt={spotlightBook.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-[10px] font-medium text-white tracking-wide">Inspect Volume</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9C722F] block">
                    {spotlightBook.category}
                  </span>
                  
                  <h3
                    onClick={() => openBookDetail(spotlightBook)}
                    className="font-serif font-bold text-[#141924] text-lg sm:text-xl leading-snug hover:text-[#9C722F] cursor-pointer transition-colors"
                  >
                    {spotlightBook.title}
                  </h3>
                  
                  <p className="text-xs text-[#7A6F5E] font-medium">By {spotlightBook.author}</p>

                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#2A2318]">{spotlightBook.rating}</span>
                    <span className="text-[11px] text-[#8C7E6C]">({spotlightBook.reviewCount})</span>
                  </div>

                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-serif font-black text-[#141924]">${spotlightBook.price.toFixed(2)}</span>
                    {spotlightBook.originalPrice && (
                      <span className="text-xs text-[#9C8F7E] line-through">
                        ${spotlightBook.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Spotlight */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 pt-4 border-t border-[#EFE8DC]">
                <button
                  onClick={() => openReader(spotlightBook)}
                  className="px-3 py-2.5 text-xs font-bold text-[#3D3528] bg-[#F5F0E6] hover:bg-[#ECE3D3] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#9C722F]" />
                  <span>Read Excerpt</span>
                </button>
                <button
                  onClick={() => addToCart(spotlightBook)}
                  className="px-3 py-2.5 text-xs font-bold text-white bg-[#121620] hover:bg-[#1E2536] rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 border border-[#3A3326]"
                >
                  <span>Acquire Edition</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
