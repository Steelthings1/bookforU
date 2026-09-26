'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Sun, Moon, Coffee, Type, ShoppingBag, BookOpen, Feather } from 'lucide-react';

export const SampleReaderModal: React.FC = () => {
  const { activeReaderBook, closeReader, addToCart } = useCart();
  const [theme, setTheme] = useState<'light' | 'sepia' | 'dark'>('sepia');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');

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
    sm: 'text-sm leading-relaxed sm:leading-loose',
    base: 'text-base leading-relaxed sm:leading-loose',
    lg: 'text-lg leading-relaxed sm:leading-loose',
    xl: 'text-xl leading-relaxed sm:leading-loose',
  };

  const themeClasses = {
    light: 'bg-[#FCFBF9] text-[#1A1815] border-[#E8DFD1]',
    sepia: 'bg-[#F5EFE3] text-[#2E2419] border-[#DFD4C0]',
    dark: 'bg-[#10131A] text-[#EDE7DC] border-[#252B38]',
  };

  const toolbarClasses = {
    light: 'bg-[#FCFBF9]/95 border-b border-[#E8DFD1] text-[#2E2419]',
    sepia: 'bg-[#EDE4D2]/95 border-b border-[#D8CABE] text-[#2E2419]',
    dark: 'bg-[#161B24]/95 border-b border-[#252B38] text-[#EDE7DC]',
  };

  const footerClasses = {
    light: 'bg-[#FCFBF9]/95 border-t border-[#E8DFD1]',
    sepia: 'bg-[#EDE4D2]/95 border-t border-[#D8CABE]',
    dark: 'bg-[#161B24]/95 border-t border-[#252B38]',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Sample excerpt: ${activeReaderBook.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeReader}
    >
      <div
        className={`w-full h-full sm:h-[94vh] sm:max-w-4xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border ${themeClasses[theme]} transition-colors duration-300 relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reader Top Toolbar */}
        <header className={`px-6 py-4 flex items-center justify-between shrink-0 backdrop-blur-md ${toolbarClasses[theme]} transition-colors`}>
          <div className="flex items-center gap-3.5 truncate pr-4">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#9C722F] flex items-center justify-center shrink-0">
              <Feather className="w-4 h-4" />
            </div>
            <div className="truncate">
              <h2 className="font-serif text-sm font-bold truncate">{activeReaderBook.title}</h2>
              <p className="text-xs opacity-70 truncate font-serif italic">By {activeReaderBook.author}</p>
            </div>
          </div>

          {/* Reader Preferences Bar */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            
            {/* Font size picker */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-black/5 dark:bg-white/5 rounded-xl text-xs font-bold">
              <span className="px-2 opacity-60 flex items-center gap-1 text-[11px]"><Type className="w-3 h-3" /> Size:</span>
              {(['sm', 'base', 'lg', 'xl'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setFontSize(sz)}
                  className={`px-2.5 py-1 rounded-lg uppercase transition-all text-[11px] ${
                    fontSize === sz ? 'bg-[#121620] text-white shadow' : 'opacity-70 hover:opacity-100'
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
                title="White Linen"
                className={`p-1.5 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow text-[#B8924C]' : 'opacity-70'}`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                title="Warm Parchment"
                className={`p-1.5 rounded-lg transition-all ${theme === 'sepia' ? 'bg-[#DFD4C0] shadow text-[#6E4B19]' : 'opacity-70'}`}
              >
                <Coffee className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                title="Obsidian Night"
                className={`p-1.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-[#252B38] shadow text-[#D4AF37]' : 'opacity-70'}`}
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
        <main className="flex-1 overflow-y-auto px-6 sm:px-16 lg:px-24 py-12 max-w-3xl mx-auto w-full">
          <div className="text-center mb-12 pb-8 border-b border-black/10 dark:border-white/10">
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#9C722F] block mb-2">
              Complimentary Excerpt
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              {activeReaderBook.sampleExcerpt.chapterTitle}
            </h1>
            <p className="text-xs opacity-60 mt-2 font-serif italic">From the digital edition of &ldquo;{activeReaderBook.title}&rdquo;</p>
          </div>

          <article className={`space-y-7 font-serif ${fontClasses[fontSize]}`}>
            {activeReaderBook.sampleExcerpt.paragraphs.map((para, index) => (
              <p
                key={index}
                className="text-justify leading-relaxed sm:leading-loose first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[#9C722F]"
              >
                {para}
              </p>
            ))}
          </article>

          <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 text-center space-y-2">
            <p className="font-serif italic text-sm opacity-80">
              End of Chapter Excerpt. The complete masterwork spans {activeReaderBook.pageCount} pages in DRM-free EPUB, PDF, and MOBI.
            </p>
          </div>
        </main>

        {/* Reader Sticky Purchase Bar */}
        <footer className={`px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${footerClasses[theme]} transition-colors`}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-75">Full Edition:</span>
            <span className="font-serif text-2xl font-black text-[#8A6324]">${activeReaderBook.price.toFixed(2)}</span>
            {activeReaderBook.originalPrice && (
              <span className="text-xs opacity-50 line-through font-serif">${activeReaderBook.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#9C722F]/15 text-[#9C722F]">
              DRM-Free
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                addToCart(activeReaderBook);
                closeReader();
              }}
              className="flex-1 sm:flex-initial px-7 py-3 rounded-full bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all border border-[#3A3326]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Acquire Volume (${activeReaderBook.price.toFixed(2)})</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};
