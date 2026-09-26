'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BookCatalog } from '@/components/BookCatalog';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Books');

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    // Smooth scroll to catalog
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectCategory}
      />
      
      <main className="flex-1">
        <Hero />
        
        {/* Quick highlight bar */}
        <section className="bg-slate-900 text-white py-6 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl font-black text-amber-400">100%</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">DRM-Free Freedom</p>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-400">45,000+</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Happy Readers</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400">0 Seconds</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Instant Download Delivery</p>
              </div>
              <div>
                <p className="text-2xl font-black text-sky-400">4.9 / 5.0</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Average Reader Rating</p>
              </div>
            </div>
          </div>
        </section>

        <BookCatalog
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
