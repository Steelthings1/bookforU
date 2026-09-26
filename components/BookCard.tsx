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
    <article className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Cover image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openBookDetail(book)}>
        <img
          src={book.coverImage}
          alt={book.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(book.id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:bg-white text-slate-700 hover:text-rose-500 transition-colors z-10"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {book.isBestseller && (
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow">
              Bestseller
            </span>
          )}
          {book.discountBadge && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow">
              {book.discountBadge}
            </span>
          )}
        </div>

        {/* Formats pill */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold text-white/95 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
          <span>{book.formats.join(' • ')}</span>
          <span>{book.pageCount} pgs</span>
        </div>
      </div>

      {/* Book Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-brand-600 font-bold uppercase tracking-wider mb-1">
            <span>{book.category}</span>
            <span className="text-slate-400 font-normal lowercase">{book.fileSizeMb} MB</span>
          </div>

          <h3
            onClick={() => openBookDetail(book)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-brand-600 cursor-pointer transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-1">By {book.author}</p>

          {/* Star Ratings */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(book.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">{book.rating}</span>
            <span className="text-[11px] text-slate-400">({book.reviewCount})</span>
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-slate-900">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              Instant Download
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => openReader(book)}
              className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-brand-600" />
              <span>Sample</span>
            </button>

            <button
              onClick={() => addToCart(book)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                inCart
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-brand-600 text-white hover:bg-brand-700 shadow-brand-500/20'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Buy</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </article>
  );
};
