'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { BookOpen, ShoppingBag, Heart, Search, Menu, X, Sparkles, BookMarked } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onSelectCategory }) => {
  const { totalItemCount, total, setIsCartOpen, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Top promotional bar */}
      <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-brand-900 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2 tracking-wide">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Fall Flash Sale: Use code <strong className="text-amber-300 bg-white/10 px-1.5 py-0.5 rounded font-mono">BOOKFORU20</strong> for 20% off all DRM-free e-books!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
                book<span className="text-brand-600">forU</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">Digital Library</span>
            </div>
          </a>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, author, topic, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-brand-500 rounded-full outline-none transition-all placeholder:text-slate-400 text-slate-800 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#catalog" className="hover:text-brand-600 transition-colors">Store</a>
            <button onClick={() => onSelectCategory('Tech & AI')} className="hover:text-brand-600 transition-colors">Tech & AI</button>
            <button onClick={() => onSelectCategory('Sci-Fi & Fantasy')} className="hover:text-brand-600 transition-colors">Sci-Fi</button>
            <button onClick={() => onSelectCategory('Business')} className="hover:text-brand-600 transition-colors">Business</button>
            <a href="#faq" className="hover:text-brand-600 transition-colors">FAQ</a>
          </nav>

          {/* Action buttons: Wishlist & Cart */}
          <div className="flex items-center gap-3">
            {/* Wishlist Indicator */}
            <a
              href="#catalog"
              aria-label="Wishlist"
              className="relative p-2.5 text-slate-600 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-semibold shadow-md shadow-brand-500/20 active:scale-95 transition-all text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItemCount > 0 && (
                <span className="bg-white text-brand-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalItemCount}
                </span>
              )}
              {total > 0 && (
                <span className="hidden sm:inline border-l border-brand-500/60 pl-2 text-xs font-bold text-brand-100">
                  ${total.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 lg:hidden rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, genres..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg outline-none focus:border-brand-500 text-slate-800"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4 space-y-2">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg"
            >
              Browse Catalog
            </a>
            <button
              onClick={() => { onSelectCategory('Tech & AI'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg"
            >
              Tech & AI
            </button>
            <button
              onClick={() => { onSelectCategory('Sci-Fi & Fantasy'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg"
            >
              Sci-Fi & Fantasy
            </button>
            <button
              onClick={() => { onSelectCategory('Business'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg"
            >
              Business & Startups
            </button>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg"
            >
              Device Compatibility & FAQ
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
