'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';

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
      className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside
          className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E2D6C3]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <header className="p-6 border-b border-[#E8DFD1] flex items-center justify-between bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#121620] text-[#D4AF37] flex items-center justify-center border border-[#3A3326] shadow-sm">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#141924]">Your Reading Bag</h2>
                <p className="text-xs text-[#7A6F5E]">{cart.length} {cart.length === 1 ? 'edition' : 'editions'} selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-2 text-[#7A6F5E] hover:text-[#141924] rounded-full hover:bg-[#EFE7D8] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F0E9DC] text-[#9C8F7E] flex items-center justify-center mx-auto border border-[#E0D5C3]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2A2318]">Your bag is empty</h3>
                <p className="text-xs text-[#7A6F5E] max-w-xs mx-auto">
                  Browse our curated editions of critical literature, essays, and technical monographs.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-6 py-2.5 rounded-full bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Explore Works
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.book.id}-${item.format}`}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-[#E4DAC8] shadow-sm hover:border-[#CCA862] transition-colors"
                >
                  {/* Thumbnail with spine effect */}
                  <img
                    src={item.book.coverImage}
                    alt={item.book.title}
                    className="w-16 h-22 object-cover rounded-lg shadow-book shrink-0 border border-black/10"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-bold text-[#141924] line-clamp-1">
                          {item.book.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.book.id)}
                          aria-label="Remove item"
                          className="text-[#9C8F7E] hover:text-rose-600 transition-colors shrink-0 p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-xs text-[#7A6F5E] line-clamp-1 font-serif italic">By {item.book.author}</p>
                      <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider text-[#8C682D] bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#DFCCA7]">
                        {item.format}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F0E9DC]">
                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#DDD2BE] rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-[#5C5346] hover:text-black rounded"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#141924] px-1.5">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-[#5C5346] hover:text-black rounded"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-base font-bold text-[#141924]">
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
            <footer className="p-6 border-t border-[#E8DFD1] bg-white/80 space-y-4">
              
              {/* Promo Code Input with Gold Styling */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5E8] border border-[#E5D7B7] text-xs">
                    <div className="flex items-center gap-2 font-bold text-[#8C682D]">
                      <Sparkles className="w-3.5 h-3.5 text-[#B8924C]" />
                      <span>Code &quot;{promoCode}&quot; Active (-20%)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs font-semibold text-[#8C682D] hover:text-rose-600 underline"
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
                      className="flex-1 px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#DDD2BE] rounded-xl outline-none focus:border-[#B8924C] uppercase font-mono text-[#2A2318]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] text-xs font-bold rounded-xl transition-colors uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {feedback && !promoCode && (
                  <p className={`text-[11px] mt-1.5 ${feedback.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {feedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-[#5C5346]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-[#141924]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8C682D] font-bold">
                    <span>Privilege Savings (20%)</span>
                    <span className="font-serif">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Digital Delivery / DRM License</span>
                  <span className="font-bold text-[#8C682D]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#141924] pt-2.5 border-t border-[#E8DFD1]">
                  <span>Total Investment</span>
                  <span className="font-serif text-lg text-[#8A6324] font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-4 rounded-xl bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-[#3A3326]"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A6F5E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8924C]" />
                <span>Instant DRM-Free Delivery • 256-Bit SSL Encrypted</span>
              </div>

            </footer>
          )}

        </aside>
      </div>
    </div>
  );
};
