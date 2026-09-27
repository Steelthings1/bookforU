'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Sparkles,
  User,
  LogOut,
  Shield,
  BookMarked,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, onSelectCategory }) => {
  const { totalItemCount, total, setIsCartOpen, wishlist } = useCart();
  const { user, openAuthModal, signOut, isAdminAuthenticated } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-xl border-b border-[#E8DFD1]/80 transition-all duration-300">
      {/* Top Luxury Announcement Ribbon */}
      <div className="bg-[#12161F] text-[#E5D7B7] text-xs py-2 px-4 text-center font-medium flex items-center justify-between gap-2.5 tracking-wider border-b border-[#2A241C]">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-wide">
            Autumn Collection — Code <strong className="text-[#F3E2B8] bg-white/10 px-2 py-0.5 rounded font-mono border border-[#D4AF37]/30 tracking-widest font-semibold">BOOKFORU20</strong> for 20% off
          </span>
        </div>

        {/* Member status top right */}
        <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px]">
          {user ? (
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-[#E5D7B7]">Welcome, <strong className="text-white">{user.name.split(' ')[0]}</strong></span>
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                >
                  Admin Portal
                </Link>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openAuthModal('signin')}
                className="text-[#E5D7B7] hover:text-white transition-colors"
              >
                Sign In
              </button>
              <span className="text-white/20">•</span>
              <button
                onClick={() => openAuthModal('signup')}
                className="text-[#D4AF37] hover:text-[#F3E2B8] font-bold transition-colors"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo with Luxury Serif Monogram */}
          <Link href="/" className="flex items-center gap-3.5 group flex-shrink-0">
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
          </Link>

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

          {/* Action buttons: Auth, Wishlist & Cart */}
          <div className="flex items-center gap-3">
            
            {/* User Profile / Auth Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-white border border-[#DDD2BE] hover:border-[#B8924C] text-[#2A2318] transition-all text-xs font-bold shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-[#121620] text-[#E5D7B7] flex items-center justify-center text-[11px] font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-[#8C7E6C]" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E0D5C3] p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="p-3 border-b border-[#F0E9DC]">
                      <p className="font-serif font-bold text-sm text-[#141924]">{user.name}</p>
                      <p className="text-[11px] text-[#7A6F5E] truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider text-[#8C682D] bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#DFCCA7]">
                        {user.role === 'admin' ? 'Atelier Director' : 'Patron Member'}
                      </span>
                    </div>

                    <a
                      href="#catalog"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#4F4638] hover:bg-[#FAF8F5] rounded-xl transition-colors"
                    >
                      <BookMarked className="w-4 h-4 text-[#8C682D]" />
                      <span>My Digital Editions</span>
                    </a>

                    {(user.role === 'admin' || isAdminAuthenticated) && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
                      >
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span>Studio Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={signOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="px-3.5 py-2 text-xs font-bold text-[#4F4638] hover:text-black rounded-full hover:bg-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-3.5 py-1.5 text-xs font-bold text-[#141924] bg-white border border-[#DDD2BE] hover:border-[#B8924C] rounded-full transition-all shadow-sm"
                >
                  Join
                </button>
              </div>
            )}

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
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-[#121620] hover:bg-[#1E2536] text-[#EFE7D3] rounded-full font-bold shadow-md shadow-black/15 active:scale-95 transition-all text-xs border border-[#3A3326]"
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
            {user ? (
              <div className="p-3 bg-white rounded-xl border border-[#DDD2BE] mb-2">
                <p className="font-serif font-bold text-sm text-[#141924]">{user.name}</p>
                <p className="text-xs text-[#7A6F5E]">{user.email}</p>
                <button
                  onClick={signOut}
                  className="mt-2 text-xs font-bold text-rose-600 underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={() => {
                    openAuthModal('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 rounded-xl bg-white border border-[#DDD2BE] font-bold text-xs text-[#141924]"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 rounded-xl bg-[#121620] text-white font-bold text-xs"
                >
                  Create Account
                </button>
              </div>
            )}

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
