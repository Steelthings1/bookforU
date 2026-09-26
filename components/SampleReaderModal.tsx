'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Sun, Moon, Coffee, Type, ShoppingBag, BookOpen } from 'lucide-react';

export const SampleReaderModal: React.FC = () => {
  const { activeReaderBook, closeReader, addToCart } = useCart();
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('sepia');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeReader();
    };
    if (activeReaderBook) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeReaderBook, closeReader]);

  if (!activeReaderBook) return null;

  const fontClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  };

  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    sepia: 'bg-[#f7f2e7] text-[#3c2f21] border-[#e7dcce]',
    dark: 'bg-[#18181b] text-[#f4f4f5] border-[#27272a]',
  };

  const toolbarClasses = {
    light: 'bg-white/95 border-b border-slate-200 text-slate-700',
    sepia: 'bg-[#f0e9dc]/95 border-b border-[#dfd2be] text-[#3c2f21]',
    dark: 'bg-[#202023]/95 border-b border-[#2e2e33] text-[#f4f4f5]',
  };

  const footerClasses = {
    light: 'bg-white/95 border-t border-slate-200',
    sepia: 'bg-[#f0e9dc]/95 border-t border-[#dfd2be]',
    dark: 'bg-[#202023]/95 border-t border-[#2e2e33]',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Sample excerpt: ${activeReaderBook.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeReader}
    >
      <div
        className={`w-full h-full sm:h-[92vh] sm:max-w-4xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${themeClasses[theme]} transition-colors duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reader Top Toolbar */}
        <header className={`px-6 py-4 flex items-center justify-between shrink-0 backdrop-blur-md ${toolbarClasses[theme]} transition-colors`}>
          <div className="flex items-center gap-3 truncate pr-4">
            <div className="w-8 h-8 rounded-lg bg-brand-600/10 text-brand-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h2 className="text-sm font-bold truncate">{activeReaderBook.title}</h2>
              <p className="text-xs opacity-70 truncate">{activeReaderBook.author}</p>
            </div>
          </div>

          {/* Reader Preferences Bar */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            
            {/* Font size picker */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl text-xs font-bold">
              <span className="px-2 opacity-60 flex items-center gap-1"><Type className="w-3 h-3" /> Size:</span>
              {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2.5 py-1 rounded-lg uppercase transition-all ${
                    fontSize === sz ? 'bg-brand-600 text-white shadow' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {sz === 'sm' ? 'S' : sz === 'base' ? 'M' : sz === 'lg' ? 'L' : 'XL'}
                </button>
              ))}
            </div>

            {/* Reading themes */}
            <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
              <button
                onClick={() => setTheme('light')}
                title="White Light Theme"
                className={`p-1.5 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow text-amber-500' : 'opacity-70'}`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                title="Warm Sepia Theme"
                className={`p-1.5 rounded-lg transition-all ${theme === 'sepia' ? 'bg-[#dfd2be] shadow text-amber-900' : 'opacity-70'}`}
              >
                <Coffee className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                title="Night Dark Theme"
                className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-zinc-800 shadow text-sky-400' : 'opacity-70'}`}
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeReader}
              aria-label="Close sample reader"
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Reader Book Content Canvas */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-12 lg:px-20 py-10 max-w-3xl mx-auto w-full">
          <div className="text-center mb-10 pb-6 border-b border-black/10 dark:border-white/10">
            <span className="text-xs uppercase tracking-widest font-bold opacity-60">Free Sample Excerpt</span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold mt-2 mb-1">
              {activeReaderBook.sampleExcerpt.chapterTitle}
            </h1>
            <p className="text-xs opacity-70">From &ldquo;{activeReaderBook.title}&rdquo; by {activeReaderBook.author}</p>
          </div>

          <article className={`space-y-6 font-serif ${fontClasses[fontSize]}`}>
            {activeReaderBook.sampleExcerpt.paragraphs.map((para, index) => (
              <p key={index} className="text-justify first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:font-serif">
                {para}
              </p>
            ))}
          </article>

          <div className="mt-14 pt-8 border-t border-black/10 dark:border-white/10 text-center space-y-3">
            <p className="text-sm font-semibold opacity-80">
              End of free preview chapter. The complete e-book includes all {activeReaderBook.pageCount} pages, appendix, and DRM-free files.
            </p>
          </div>
        </main>

        {/* Reader Sticky Purchase Banner */}
        <footer className={`px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${footerClasses[theme]} transition-colors`}>
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-medium opacity-80">Keep reading now:</span>
            <span className="text-xl font-black text-brand-600">${activeReaderBook.price.toFixed(2)}</span>
            {activeReaderBook.originalPrice && (
              <span className="text-xs opacity-50 line-through">${activeReaderBook.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
              Instant Download
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                addToCart(activeReaderBook);
                closeReader();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Purchase Full E-Book (${activeReaderBook.price.toFixed(2)})</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};
