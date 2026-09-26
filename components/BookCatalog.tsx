'use client';

import React, { useState, useMemo } from 'react';
import { BOOKS, CATEGORIES } from '@/data/books';
import { BookCard } from './BookCard';
import { SlidersHorizontal, ArrowUpDown, SearchX, Sparkles } from 'lucide-react';

interface BookCatalogProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'price-asc' | 'price-desc' | 'reviews'>('featured');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      // Category filter
      if (selectedCategory !== 'All Books' && book.category !== selectedCategory) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'all' && !book.formats.includes(selectedFormat as any)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        const matchesCategory = book.category.toLowerCase().includes(q);
        const matchesSynopsis = book.synopsis.toLowerCase().includes(q);
        return matchesTitle || matchesAuthor || matchesCategory || matchesSynopsis;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [selectedCategory, selectedFormat, searchQuery, sortBy]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 scroll-mt-24">
      
      {/* Catalog Header with Editorial Serif Styling */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#8C682D] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B8924C]" />
            <span>The Collection</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#141924] tracking-tight">
            Curated Digital Monographs & Masterworks
          </h2>
          <p className="text-sm text-[#7A6F5E] mt-2 font-normal">
            Displaying {filteredBooks.length} of {BOOKS.length} DRM-free volumes available for instant ownership.
          </p>
        </div>

        {/* Sort and Format filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Format selector */}
          <div className="flex items-center gap-1 bg-[#F0E9DC] p-1 rounded-xl text-xs font-bold text-[#4F4638] border border-[#DDD2BE]">
            {['all', 'EPUB', 'PDF', 'MOBI'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg transition-all text-[11px] tracking-wider uppercase ${
                  selectedFormat === fmt
                    ? 'bg-[#121620] text-[#F7F2E6] shadow-sm font-black'
                    : 'hover:text-black'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-[#8C7E6C] pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="pl-8 pr-4 py-2.5 text-xs font-bold bg-white border border-[#DDD2BE] rounded-xl text-[#2F271B] shadow-sm hover:border-[#B8924C] focus:outline-none focus:ring-2 focus:ring-[#B8924C]/20 cursor-pointer"
            >
              <option value="featured">Curated & Featured</option>
              <option value="rating">Highest Critical Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="reviews">Most Reviewed Works</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-[#E8DFD1] mb-8">
        <SlidersHorizontal className="w-4 h-4 text-[#8C7E6C] shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#121620] text-[#FBF7EE] shadow-md border border-[#3A3326]'
                : 'bg-[#F2ECE1] hover:bg-[#EAE2D3] text-[#5C5346]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Filter Indicators */}
      {(searchQuery || selectedCategory !== 'All Books' || selectedFormat !== 'all') && (
        <div className="flex items-center gap-2 mb-6 flex-wrap text-xs">
          <span className="text-[#8C7E6C] font-medium">Refinements:</span>
          {searchQuery && (
            <span className="bg-[#F8F2E4] text-[#8C682D] px-3 py-1 rounded-full font-semibold border border-[#E7DCBA] flex items-center gap-1.5">
              Query: &ldquo;{searchQuery}&rdquo;
              <button onClick={() => setSearchQuery('')} className="hover:text-black ml-1">×</button>
            </span>
          )}
          {selectedCategory !== 'All Books' && (
            <span className="bg-[#EFE7D8] text-[#5C5346] px-3 py-1 rounded-full font-semibold border border-[#DDD2BE] flex items-center gap-1.5">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All Books')} className="hover:text-black ml-1">×</button>
            </span>
          )}
          {selectedFormat !== 'all' && (
            <span className="bg-[#F2ECE1] text-[#4F4638] px-3 py-1 rounded-full font-semibold border border-[#DDD2BE] flex items-center gap-1.5">
              Format: {selectedFormat.toUpperCase()}
              <button onClick={() => setSelectedFormat('all')} className="hover:text-black ml-1">×</button>
            </span>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Books');
              setSelectedFormat('all');
            }}
            className="text-xs text-[#9C722F] font-bold hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 sm:gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/60 rounded-3xl border border-dashed border-[#DDD2BE]">
          <SearchX className="w-12 h-12 text-[#B3A492] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-bold text-[#2C2419]">No matching editions found</h3>
          <p className="text-xs text-[#7A6F5E] max-w-md mx-auto mt-1">
            Adjust your search terms or reset the active genre and format filters to view the complete catalog.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Books');
              setSelectedFormat('all');
            }}
            className="mt-5 px-6 py-2.5 rounded-full bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold text-xs uppercase tracking-wider shadow"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
