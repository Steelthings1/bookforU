'use client';

import React, { useState, useMemo } from 'react';
import { BOOKS, CATEGORIES } from '@/data/books';
import { BookCard } from './BookCard';
import { SlidersHorizontal, ArrowUpDown, SearchX } from 'lucide-react';

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
      // Default: featured first, then bestsellers
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [selectedCategory, selectedFormat, searchQuery, sortBy]);

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-600">The Catalog</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
            Curated E-Books For Curious Minds
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Showing {filteredBooks.length} of {BOOKS.length} titles available for instant delivery.
          </p>
        </div>

        {/* Sort and Format filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Format selector */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
            {['all', 'EPUB', 'PDF', 'MOBI'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedFormat === fmt
                    ? 'bg-white text-slate-900 shadow-sm font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <div className="relative inline-flex items-center">
            <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="pl-8 pr-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl text-slate-700 shadow-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Top Rated (4.9 - 4.5)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-200 mb-8">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Filter Indicators */}
      {(searchQuery || selectedCategory !== 'All Books' || selectedFormat !== 'all') && (
        <div className="flex items-center gap-2 mb-6 flex-wrap text-xs">
          <span className="text-slate-400 font-medium">Filters active:</span>
          {searchQuery && (
            <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-semibold border border-brand-200 flex items-center gap-1.5">
              Search: &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery('')} className="hover:text-brand-900 ml-1">×</button>
            </span>
          )}
          {selectedCategory !== 'All Books' && (
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold border border-indigo-200 flex items-center gap-1.5">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All Books')} className="hover:text-indigo-900 ml-1">×</button>
            </span>
          )}
          {selectedFormat !== 'all' && (
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold border border-slate-200 flex items-center gap-1.5">
              Format: {selectedFormat.toUpperCase()}
              <button onClick={() => setSelectedFormat('all')} className="hover:text-slate-900 ml-1">×</button>
            </span>
          )}
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Books');
              setSelectedFormat('all');
            }}
            className="text-xs text-brand-600 font-bold hover:underline ml-2"
          >
            Reset all
          </button>
        </div>
      )}

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <SearchX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No books found matching criteria</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
            Try adjusting your search terms, switching categories, or clearing active filters to browse the entire collection.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Books');
              setSelectedFormat('all');
            }}
            className="mt-5 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </section>
  );
};
