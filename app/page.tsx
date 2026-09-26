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
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectCategory}
      />
      
      <main className="flex-1">
        <Hero />
        
        {/* Editorial Standards Counter Strip */}
        <section className="bg-[#121620] text-white py-8 border-y border-[#292218] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#E5C378]">100%</p>
                <p className="text-[10px] sm:text-xs text-[#A09380] uppercase tracking-[0.2em] font-bold mt-1">DRM-Free Permanence</p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6ED]">45,000+</p>
                <p className="text-[10px] sm:text-xs text-[#A09380] uppercase tracking-[0.2em] font-bold mt-1">Discerning Readers</p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#E5C378]">Instant</p>
                <p className="text-[10px] sm:text-xs text-[#A09380] uppercase tracking-[0.2em] font-bold mt-1">Zero-Wait File Delivery</p>
              </div>
              <div>
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6ED]">4.9 / 5.0</p>
                <p className="text-[10px] sm:text-xs text-[#A09380] uppercase tracking-[0.2em] font-bold mt-1">Critical Review Score</p>
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
