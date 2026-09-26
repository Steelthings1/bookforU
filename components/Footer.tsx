'use client';

import React, { useState } from 'react';
import { BookOpen, Send, Sparkles, Shield, Heart } from 'lucide-react';

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
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Newsletter Section */}
      <div className="border-b border-slate-800/80 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-900/60 via-indigo-950/60 to-purple-950/60 border border-brand-500/20 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Reader Club
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Get 20% off your first e-book today
              </h3>
              <p className="text-slate-300 max-w-md text-xs sm:text-sm">
                Subscribe for weekly curated book summaries, author interviews, and exclusive discount codes.
              </p>
            </div>

            <div className="w-full md:w-auto min-w-[320px]">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-center space-y-1">
                  <p className="font-bold">🎉 Welcome to bookforU!</p>
                  <p className="text-[11px]">Your 20% coupon code is <strong className="font-mono text-white">BOOKFORU20</strong></p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 text-xs outline-none focus:border-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-colors flex items-center gap-1.5 shrink-0"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                book<span className="text-brand-500">forU</span>
              </span>
            </div>
            <p className="leading-relaxed text-slate-400">
              The premier destination for DRM-free e-books across technology, fiction, science, and self-mastery. Owned by you forever.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-[11px]">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Secure & DRM-Free Platform</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Top Genres</h4>
            <ul className="space-y-2">
              <li><a href="#catalog" className="hover:text-white transition-colors">Tech & AI Systems</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Sci-Fi & Cyberpunk</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Business & Startups</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Cognitive Psychology</a></li>
              <li><a href="#catalog" className="hover:text-white transition-colors">Digital Design</a></li>
            </ul>
          </div>

          {/* Formats & Compatibility */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Compatibility</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-white transition-colors">Send to Kindle Guide</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Apple Books on iOS & macOS</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Kobo & Android e-readers</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">EPUB, PDF, MOBI Standards</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">14-Day Refund Policy</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Direct Support</h4>
            <p className="leading-relaxed">
              Need assistance with an e-book order or Kindle file transfer?
            </p>
            <p className="text-white font-semibold">support@bookforu.com</p>
            <p className="text-[11px] text-slate-500">24/7 Digital Delivery Support</p>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} bookforU Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for book lovers worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
