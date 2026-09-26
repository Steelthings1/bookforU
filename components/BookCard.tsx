'use client';

import React from 'react';
import { Book } from '@/types/book';
import { useCart } from '@/context/CartContext';
import { Star, BookOpen, ShoppingBag, Heart, Check } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart, openReader, openBookDetail, toggleWishlist, isInWishlist, cart } = useCart();
  const inWishlist = isInWishlist(book.id);
  const inCart = cart.some((item) => item.book.id === book.id);

  return (
    <article className="group bg-white rounded-2xl border border-[#E7DDCF] shadow-sm hover:shadow-xl hover:border-[#CCA862] transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Book Cover Presentation */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2EDE4] cursor-pointer book-spine-sheen"
        onClick={() => openBookDetail(book)}
      >
        <img
          src={book.coverImage}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-500"
        />

        {/* Wishlist toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(book.id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white text-[#5C5346] hover:text-rose-600 transition-colors z-10 border border-black/5"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {book.isBestseller && (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#B8924C] to-[#8C6027] text-white text-[10px] font-black uppercase tracking-wider shadow">
              Bestseller
            </span>
          )}
          {book.discountBadge && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#18202F] text-[#EFE7D5] text-[10px] font-bold shadow border border-white/10">
              {book.discountBadge}
            </span>
          )}
        </div>

        {/* Formats and Pages Overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-bold text-white/95 px-2.5 py-1.5 rounded-lg bg-black/65 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity tracking-wider">
          <span>{book.formats.join(' • ')}</span>
          <span className="font-mono text-[#D4AF37]">{book.pageCount} pp.</span>
        </div>
      </div>

      {/* Book Information Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#8C682D] font-black uppercase tracking-[0.16em] mb-1.5">
            <span>{book.category}</span>
            <span className="text-[#9C8F7E] font-medium lowercase font-mono">{book.fileSizeMb} MB</span>
          </div>

          <h3
            onClick={() => openBookDetail(book)}
            className="font-serif font-bold text-[#141924] text-base leading-snug line-clamp-2 hover:text-[#9C722F] cursor-pointer transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-xs text-[#7A6F5E] mt-1 line-clamp-1 italic font-serif">By {book.author}</p>

          {/* Star Ratings */}
          <div className="flex items-center gap-1.5 mt-2.5">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(book.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-[#2A2318]">{book.rating}</span>
            <span className="text-[11px] text-[#9C8F7E]">({book.reviewCount})</span>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-4 pt-4 border-t border-[#EFE8DC]">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif font-black text-[#141924]">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-xs text-[#9C8F7E] line-through font-serif">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C682D] bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#DFCCA7]">
              DRM-Free
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openReader(book)}
              className="px-3 py-2 text-xs font-bold text-[#3D3528] bg-[#F5F0E6] hover:bg-[#ECE3D3] rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-[#E0D5C3]"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#9C722F]" />
              <span>Sample</span>
            </button>

            <button
              onClick={() => addToCart(book)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm border ${
                inCart
                  ? 'bg-emerald-800 text-white border-emerald-900'
                  : 'bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] border-[#3A3326]'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>In Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Acquire</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </article>
  );
};
