'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Sparkles, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0C0F17] text-[#9A8F80] text-xs border-t border-[#231E17]">
      
      {/* Newsletter Section */}
      <div className="border-b border-[#231E17] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#171D29] via-[#1C2333] to-[#141A25] border border-[#D4AF37]/25 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> The Atelier Society
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6ED] tracking-tight">
                Receive 20% privilege on your initial acquisition
              </h3>
              <p className="text-[#B3A692] max-w-md text-xs sm:text-sm font-normal">
                Join our private literary dispatches: curated monograph critiques, author discussions, and exclusive seasonal codes.
              </p>
            </div>

            <div className="w-full md:w-auto min-w-[340px]">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-[#1C261A] border border-[#48733E]/40 text-[#A6D997] text-center space-y-1">
                  <p className="font-bold">✨ Welcome to the Atelier Society.</p>
                  <p className="text-[11px]">Your 20% coupon code is <strong className="font-mono text-white">BOOKFORU20</strong></p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#0B0E16] border border-[#3E3628] text-white placeholder:text-[#6E6353] text-xs outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-xl bg-[#B8924C] hover:bg-[#C9A25A] text-[#0C0F17] font-bold uppercase tracking-wider text-[11px] transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E2532] to-[#0D111A] border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C378]">
                <span className="font-serif font-black text-sm text-gold-gradient">bU</span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF6ED]">
                book<span className="italic font-normal text-[#B8924C]">forU</span>
              </span>
            </div>
            <p className="leading-relaxed text-[#8C8070] font-serif text-xs">
              The premier atelier for DRM-free digital monographs, speculative fiction, cognitive science, and timeless literature. Owned by you forever.
            </p>
            <div className="flex items-center gap-2 text-[#7A6F60] text-[11px]">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>100% DRM-Free Lifetime Ownership</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-[#FAF6ED] font-bold text-xs uppercase tracking-widest font-mono">Disciplines</h4>
            <ul className="space-y-2 text-[#8C8070]">
              <li><a href="#catalog" className="hover:text-white transition-colors">Cognitive & AI Systems</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Speculative Fiction</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Venture & Strategy</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Behavioral Economics</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Digital Craft & Design</a></li>
            </ul>
          </div>

          {/* Formats & Compatibility */}
          <div className="space-y-3">
            <h4 className="text-[#FAF6ED] font-bold text-xs uppercase tracking-widest font-mono">Standards</h4>
            <ul className="space-y-2 text-[#8C8070]">
              <li><a href="#faq" className="hover:text-white transition-colors">Amazon Kindle Sideloading</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Apple Books iOS & macOS</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Kobo & E-Ink Devices</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Universal EPUB & PDF Specifications</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">14-Day Refund Protocol</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-[#FAF6ED] font-bold text-xs uppercase tracking-widest font-mono">Private Inquiries</h4>
            <p className="leading-relaxed text-[#8C8070]">
              For orders, library synchronization, or publishing submissions:
            </p>
            <p className="text-[#FAF6ED] font-mono font-semibold">concierge@bookforu.com</p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="text-[11px] text-[#7A6F60] hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
              >
                <span>🔒 Staff & Curator Access</span>
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-14 pt-8 border-t border-[#1C1712] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6353]">
          <p>© {new Date().getFullYear()} bookforU Atelier Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5 font-serif">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37] inline" />
            <span>for the love of timeless literature</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
