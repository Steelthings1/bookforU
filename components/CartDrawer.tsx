'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    total,
    promoCode,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    setFeedback(res);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <header className="p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your Reading Bag</h2>
                <p className="text-xs text-slate-500">{cart.length} unique {cart.length === 1 ? 'title' : 'titles'}</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your bag is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our handpicked selection of top tech, fiction, and business e-books.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  Explore Books
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.book.id}-${item.format}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-16 h-22 object-cover rounded-lg shadow-sm shrink-0 border border-slate-200"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.book.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          aria-label="Remove item"
                          className="text-slate-400 hover:text-rose-500 transition-colors shrink-0 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.book.author}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        {item.format}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60">
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-slate-500 hover:text-slate-800 rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 px-1.5">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-slate-500 hover:text-slate-800 rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-extrabold text-slate-900">
                        ${(item.book.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout Summary */}
          {cart.length > 0 && (
            <footer className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code &quot;{promoCode}&quot; Active (-20%)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs font-semibold text-emerald-700 hover:text-rose-600 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Discount code (e.g. BOOKFORU20)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500 uppercase font-mono text-slate-800"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {feedback && !promoCode && (
                  <p className={`text-[11px] mt-1.5 ${feedback.success ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {feedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Digital Delivery / Tax</span>
                  <span className="font-semibold text-emerald-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-brand-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant DRM-Free Delivery • 256-bit Encrypted</span>
              </div>

            </footer>
          )}

        </aside>
      </div>
    </div>
  );
};
