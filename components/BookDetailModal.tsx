'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Star, BookOpen, ShoppingBag, Heart, ShieldCheck, Download, Calendar, Layers, FileText, Feather } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={closeBookDetail}
    >
      <div
        className="w-full max-w-4xl bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden my-auto border border-[#E0D5C3] flex flex-col relative max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeBookDetail}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EFE7D8] hover:bg-[#E2D6C1] text-[#4F4638] transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Header Grid: Cover + Primary info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Book Cover with 3D Spine Depth */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[270px] aspect-[3/4] rounded-xl overflow-hidden shadow-book-hover border border-black/10 relative group book-spine-sheen">
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
                className="mt-5 w-full max-w-[270px] py-3 rounded-xl bg-[#F0E9DC] hover:bg-[#E6DBCA] text-[#2C2419] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-[#DDD0BC]"
              >
                <Feather className="w-4 h-4 text-[#9C722F]" />
                <span>Read Free Excerpt</span>
              </button>
            </div>

            {/* Book Metadata & Purchase Box */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C682D] bg-[#F4ECDC] px-2.5 py-1 rounded-md border border-[#E7DCBA]">
                  {selectedDetailBook.category}
                </span>
                {selectedDetailBook.isBestseller && (
                  <span className="text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#B8924C] to-[#8C6027] px-2.5 py-1 rounded-md shadow-sm">
                    Bestseller
                  </span>
                )}
                {selectedDetailBook.discountBadge && (
                  <span className="text-[10px] font-bold text-[#EFE7D5] bg-[#18202F] px-2.5 py-1 rounded-md border border-white/10">
                    {selectedDetailBook.discountBadge}
                  </span>
                )}
              </div>

              <div>
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141924] leading-tight">
                  {selectedDetailBook.title}
                </h1>
                {selectedDetailBook.subtitle && (
                  <p className="text-sm text-[#7A6F5E] font-serif italic mt-1.5">
                    {selectedDetailBook.subtitle}
                  </p>
                )}
              </div>

              <p className="text-sm text-[#4A3F30] font-medium font-serif">
                By <span className="text-[#8C682D] font-bold">{selectedDetailBook.author}</span>
              </p>

              {/* Star Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedDetailBook.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#2A2318]">{selectedDetailBook.rating}</span>
                <span className="text-xs text-[#8C7E6C]">({selectedDetailBook.reviewCount} customer reviews)</span>
              </div>

              {/* Price & Acquisition Box */}
              <div className="p-5 rounded-2xl bg-white border border-[#E0D5C3] space-y-4 shadow-sm">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-black text-[#141924]">
                    ${selectedDetailBook.price.toFixed(2)}
                  </span>
                  {selectedDetailBook.originalPrice && (
                    <span className="font-serif text-sm text-[#9C8F7E] line-through">
                      ${selectedDetailBook.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C682D] bg-[#FAF4E6] px-2.5 py-1 rounded border border-[#DFCCA7]">
                    100% DRM-Free License
                  </span>
                </div>

                {/* Format selection */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5C5346] mb-2">
                    Included Delivery Format:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['All-Formats Bundle', 'EPUB', 'PDF', 'MOBI'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                          selectedFormat === fmt
                            ? 'bg-[#121620] text-[#FAF6ED] border-[#121620] shadow'
                            : 'bg-[#FAF8F5] text-[#5C5346] border-[#DDD2BE] hover:border-[#B8924C]'
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
                  className="w-full py-3.5 rounded-xl bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all border border-[#3A3326]"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Acquire Edition (${selectedDetailBook.price.toFixed(2)})</span>
                </button>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E0D5C3]">
                  <span className="text-[#8C7E6C] block mb-0.5 flex items-center gap-1 text-[11px]"><Layers className="w-3 h-3" /> Volume</span>
                  <span className="font-bold text-[#2A2318]">{selectedDetailBook.pageCount} pp.</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E0D5C3]">
                  <span className="text-[#8C7E6C] block mb-0.5 flex items-center gap-1 text-[11px]"><FileText className="w-3 h-3" /> Size</span>
                  <span className="font-bold text-[#2A2318]">{selectedDetailBook.fileSizeMb} MB</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E0D5C3]">
                  <span className="text-[#8C7E6C] block mb-0.5 flex items-center gap-1 text-[11px]"><Calendar className="w-3 h-3" /> Edition</span>
                  <span className="font-bold text-[#2A2318]">{selectedDetailBook.publishedDate}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E0D5C3]">
                  <span className="text-[#8C7E6C] block mb-0.5 flex items-center gap-1 text-[11px]"><Download className="w-3 h-3" /> Language</span>
                  <span className="font-bold text-[#2A2318]">{selectedDetailBook.language}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Book Synopsis & Details */}
          <div className="space-y-3 pt-6 border-t border-[#E8DFD1]">
            <h3 className="font-serif text-xl font-bold text-[#141924]">About This Work</h3>
            <p className="font-serif text-base text-[#4F4638] leading-relaxed whitespace-pre-line">
              {selectedDetailBook.synopsis}
            </p>
          </div>

          {/* About the Author */}
          <div className="p-5 rounded-2xl bg-white border border-[#E0D5C3] space-y-1.5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8C682D]">Author Monograph</h4>
            <p className="font-serif font-bold text-base text-[#141924]">{selectedDetailBook.author}</p>
            <p className="text-xs text-[#7A6F5E] leading-relaxed">{selectedDetailBook.authorBio}</p>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-4 pt-6 border-t border-[#E8DFD1]">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#141924]">Critical Reader Reviews</h3>
              <span className="text-xs font-semibold text-[#8C7E6C]">{selectedDetailBook.reviews.length} Verified Reviews</span>
            </div>

            <div className="space-y-3">
              {selectedDetailBook.reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-xl bg-white border border-[#E0D5C3] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#2A2318]">{rev.userName}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[10px] text-[#7A5A23] font-bold bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#DFCCA7] flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5 text-[#B8924C]" /> Verified Purchase
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#8C7E6C]">{rev.date}</span>
                  </div>
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="font-serif text-sm text-[#4F4638] leading-relaxed italic">&ldquo;{rev.comment}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
