'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Compass } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onSelectCategory }) => {
  const { totalItemCount, total, setIsCartOpen, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-[#E8DFD1]/80 transition-all duration-300">
      {/* Top Luxury Announcement Ribbon */}
      <div className="bg-[#12161F] text-[#E5D7B7] text-xs py-2.5 px-4 text-center font-medium flex items-center justify-center gap-2.5 tracking-wider border-b border-[#2A241C]">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
        <span className="text-[11px] sm:text-xs tracking-wide">
          Curated Autumn Collection — Use code <strong className="text-[#F3E2B8] bg-white/10 px-2 py-0.5 rounded font-mono border border-[#D4AF37]/30 tracking-widest font-semibold">BOOKFORU20</strong> for 20% off all DRM-free editions
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo with Luxury Serif Monogram */}
          <a href="#" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1E2532] to-[#0D111A] border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C378] shadow-lg shadow-black/20 group-hover:border-[#D4AF37] transition-all duration-300">
              <span className="font-serif font-black text-lg tracking-tighter text-gold-gradient">bU</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#161B26]">
                  book<span className="italic font-normal text-[#9C722F]">forU</span>
                </span>
              </div>
              <span className="block text-[9px] uppercase font-bold tracking-[0.22em] text-[#9A8F80]">
                Private Digital Editions
              </span>
            </div>
          </a>

          {/* Search Bar - Desktop with Luxury Styling */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6C] pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search literature, essays, authors, monographs..."
                className="w-full pl-11 pr-4 py-2.5 text-xs bg-white/70 hover:bg-white focus:bg-white border border-[#DDD3C1] focus:border-[#B8924C] focus:ring-2 focus:ring-[#B8924C]/20 rounded-full outline-none transition-all placeholder:text-[#A09382] text-slate-800 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8C7E6C] hover:text-slate-900"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-widest text-[#5C5346]">
            <a href="#catalog" className="hover:text-[#B8924C] transition-colors">Catalog</a>
            <button onClick={() => onSelectCategory('Tech & AI')} className="hover:text-[#B8924C] transition-colors">Tech & AI</button>
            <button onClick={() => onSelectCategory('Sci-Fi & Fantasy')} className="hover:text-[#B8924C] transition-colors">Speculative</button>
            <button onClick={() => onSelectCategory('Business')} className="hover:text-[#B8924C] transition-colors">Monographs</button>
            <a href="#faq" className="hover:text-[#B8924C] transition-colors">Devices & FAQ</a>
          </nav>

          {/* Action buttons: Wishlist & Cart */}
          <div className="flex items-center gap-3">
            {/* Wishlist Indicator */}
            <a
              href="#catalog"
              aria-label="Wishlist"
              className="relative p-2.5 text-[#5C5346] hover:text-rose-600 rounded-full hover:bg-rose-50/50 transition-colors border border-transparent hover:border-rose-200"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#8C2B3B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Luxury Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-[#12161F] hover:bg-[#1A202D] text-[#EFE7D3] rounded-full font-bold shadow-md shadow-black/15 active:scale-95 transition-all text-xs border border-[#3A3326]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline tracking-wider uppercase font-semibold text-[11px]">Bag</span>
              {totalItemCount > 0 && (
                <span className="bg-[#B8924C] text-[#12161F] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {totalItemCount}
                </span>
              )}
              {total > 0 && (
                <span className="hidden sm:inline border-l border-white/20 pl-2 text-[11px] font-mono text-[#E5D7B7]">
                  ${total.toFixed(2)}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5C5346] lg:hidden rounded-lg hover:bg-[#EFE8DC]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6C]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search literature, authors, topics..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#DDD3C1] rounded-xl outline-none focus:border-[#B8924C] text-slate-800"
            />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8DFD1] py-4 space-y-2 bg-[#FAF8F5]">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#3D3528] hover:bg-[#EFE7D8] rounded-xl"
            >
              Browse Complete Catalog
            </a>
            <button
              onClick={() => { onSelectCategory('Tech & AI'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-semibold text-[#3D3528] hover:bg-[#EFE7D8] rounded-xl"
            >
              Technology & AI Architectures
            </button>
            <button
              onClick={() => { onSelectCategory('Sci-Fi & Fantasy'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-semibold text-[#3D3528] hover:bg-[#EFE7D8] rounded-xl"
            >
              Speculative & Science Fiction
            </button>
            <button
              onClick={() => { onSelectCategory('Business'); setMobileMenuOpen(false); }}
              className="block w-full text-left px-3 py-2 text-sm font-semibold text-[#3D3528] hover:bg-[#EFE7D8] rounded-xl"
            >
              Business, Venture & Strategy
            </button>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#3D3528] hover:bg-[#EFE7D8] rounded-xl"
            >
              Device Guides & Reader FAQ
            </a>
          </div>
        )}

      </div>
    </header>
  );
};
