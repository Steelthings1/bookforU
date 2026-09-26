'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Star, BookOpen, ShoppingBag, Heart, ShieldCheck, Download, Calendar, Layers, FileText } from 'lucide-react';

export const BookDetailModal: React.FC = () => {
  const { selectedDetailBook, closeBookDetail, addToCart, openReader, toggleWishlist, isInWishlist } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'All-Formats Bundle' | 'EPUB' | 'PDF' | 'MOBI'>('All-Formats Bundle');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBookDetail();
    };
    if (selectedDetailBook) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedDetailBook, closeBookDetail]);

  if (!selectedDetailBook) return null;

  const inWishlist = isInWishlist(selectedDetailBook.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${selectedDetailBook.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={closeBookDetail}
    >
      <div
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200 flex flex-col relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeBookDetail}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Header Grid: Cover + Primary info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Book Cover */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/25 border border-slate-200 relative group">
                <img
                  src={selectedDetailBook.coverImage}
                  alt={selectedDetailBook.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(selectedDetailBook.id)}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow text-slate-700 hover:text-rose-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  closeBookDetail();
                  openReader(selectedDetailBook);
                }}
                className="mt-4 w-full max-w-[260px] py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <BookOpen className="w-4 h-4 text-brand-600" />
                <span>Read Free Excerpt</span>
              </button>
            </div>

            {/* Book Metadata & Purchase Box */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                  {selectedDetailBook.category}
                </span>
                {selectedDetailBook.isBestseller && (
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
                    Bestseller
                  </span>
                )}
                {selectedDetailBook.discountBadge && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md">
                    {selectedDetailBook.discountBadge}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {selectedDetailBook.title}
                </h1>
                {selectedDetailBook.subtitle && (
                  <p className="text-sm text-slate-600 font-medium mt-1">
                    {selectedDetailBook.subtitle}
                  </p>
                )}
              </div>

              <p className="text-sm text-slate-700 font-semibold">
                By <span className="text-brand-600">{selectedDetailBook.author}</span>
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedDetailBook.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">{selectedDetailBook.rating}</span>
                <span className="text-xs text-slate-500">({selectedDetailBook.reviewCount} customer reviews)</span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">${selectedDetailBook.price.toFixed(2)}</span>
                  {selectedDetailBook.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${selectedDetailBook.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    DRM-Free Lifetime License
                  </span>
                </div>

                {/* Format selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Delivery Format:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['All-Formats Bundle', 'EPUB', 'PDF', 'MOBI'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedFormat === fmt
                            ? 'bg-brand-600 text-white border-brand-600 shadow'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to cart trigger */}
                <button
                  onClick={() => {
                    addToCart(selectedDetailBook, selectedFormat);
                    closeBookDetail();
                  }}
                  className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart & Checkout (${selectedDetailBook.price.toFixed(2)})</span>
                </button>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 flex items-center gap-1"><Layers className="w-3 h-3" /> Pages</span>
                  <span className="font-bold text-slate-800">{selectedDetailBook.pageCount} pages</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 flex items-center gap-1"><FileText className="w-3 h-3" /> File Size</span>
                  <span className="font-bold text-slate-800">{selectedDetailBook.fileSizeMb} MB</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Published</span>
                  <span className="font-bold text-slate-800">{selectedDetailBook.publishedDate}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block mb-0.5 flex items-center gap-1"><Download className="w-3 h-3" /> Language</span>
                  <span className="font-bold text-slate-800">{selectedDetailBook.language}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Book Synopsis & Details */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">About this E-Book</h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {selectedDetailBook.synopsis}
            </p>
          </div>

          {/* About the Author */}
          <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700">About the Author</h4>
            <p className="text-sm font-semibold text-slate-800">{selectedDetailBook.author}</p>
            <p className="text-xs text-slate-600 leading-relaxed">{selectedDetailBook.authorBio}</p>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Verified Reader Reviews</h3>
              <span className="text-xs font-semibold text-slate-500">Showing {selectedDetailBook.reviews.length} reviews</span>
            </div>

            <div className="space-y-3">
              {selectedDetailBook.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5" /> Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
