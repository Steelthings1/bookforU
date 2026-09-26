'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, ShieldCheck, CheckCircle2, Download, CreditCard, Lock, Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, total, discountAmount, clearCart } = useCart();
  
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState(cart);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) {
        setIsCheckoutOpen(false);
      }
    };
    if (isCheckoutOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      if (cart.length > 0) setPurchasedItems(cart);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isCheckoutOpen, isProcessing, setIsCheckoutOpen, cart]);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setOrderId(`BFU-${Math.floor(100000 + Math.random() * 900000)}`);
      
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }

      clearCart();
    }, 1200);
  };

  const handleDownloadMockFile = (bookTitle: string, format: string) => {
    const content = `=======================================================
BOOKFORU PRIVATE DIGITAL EDITION & RECEIPT
=======================================================
Title: ${bookTitle}
Format: ${format}
Order Reference: ${orderId || 'BFU-PREVIEW'}
Acquired By: ${fullName || 'Valued Reader'} (${email || 'reader@bookforu.com'})
Delivery Time: ${new Date().toLocaleString()}
DRM Policy: 100% DRM-Free Personal Lifetime License

Thank you for acquiring this work on bookforU.
Compatible with Amazon Kindle, Apple Books, Kobo, Android, and PC.
Assistance & device transfers: https://bookforu-mu.vercel.app/#faq
=======================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${bookTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${format.toLowerCase() === 'all-formats bundle' ? 'epub' : format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Secure Acquisition Checkout"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={() => {
        if (!isProcessing) setIsCheckoutOpen(false);
      }}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden my-auto border border-[#E0D5C3] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {!isProcessing && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="absolute top-5 right-5 p-2 rounded-full bg-[#EFE7D8] hover:bg-[#E2D6C1] text-[#4F4638] transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {step === 'details' ? (
          <div className="p-6 sm:p-10 space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#8C682D] mb-1.5">
                <Lock className="w-3.5 h-3.5 text-[#B8924C]" />
                <span>256-Bit SSL Encrypted Atelier</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141924]">Complete Your Acquisition</h2>
              <p className="text-xs text-[#7A6F5E] mt-1">
                Immediate file delivery and persistent lifetime access to your personal digital library.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="p-5 rounded-2xl bg-white border border-[#E4DAC8] space-y-3 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C5346] block">Summary of Volumes:</span>
              <div className="max-h-36 overflow-y-auto space-y-2.5 pr-1">
                {purchasedItems.map((item) => (
                  <div key={`${item.book.id}-${item.format}`} className="flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <span className="font-serif font-bold text-[#141924]">{item.book.title}</span>
                      <span className="text-[10px] text-[#8C682D] block font-mono font-semibold">
                        {item.format} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-serif font-bold text-[#141924] shrink-0">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#F0E9DC] flex items-baseline justify-between text-sm">
                <div>
                  <span className="font-bold text-[#141924]">Total Investment:</span>
                  {discountAmount > 0 && (
                    <span className="text-[11px] text-[#8C682D] font-semibold block">
                      (Includes 20% privilege savings of ${discountAmount.toFixed(2)})
                    </span>
                  )}
                </div>
                <span className="font-serif text-2xl font-black text-[#8A6324]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              <div className="space-y-1.5">
                <label htmlFor="customer-name" className="block text-xs font-bold uppercase tracking-wider text-[#5C5346]">
                  Full Name
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Julian Davenport"
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#DDD2BE] rounded-xl outline-none focus:border-[#B8924C] text-[#141924]"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="customer-email" className="block text-xs font-bold uppercase tracking-wider text-[#5C5346]">
                  Delivery Email Address <span className="text-[#9C8F7E] font-normal lowercase">(files & receipt dispatched here)</span>
                </label>
                <input
                  id="customer-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="julian.davenport@example.com"
                  className="w-full px-4 py-2.5 text-xs bg-white border border-[#DDD2BE] rounded-xl outline-none focus:border-[#B8924C] text-[#141924]"
                />
              </div>

              {/* Payment details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5C5346]">Payment Details</label>
                  <span className="text-[10px] font-bold text-[#8C682D] bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#DFCCA7] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#B8924C]" /> Instant Sandbox Gateway
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-[#DDD2BE] bg-white space-y-3">
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6C] pointer-events-none" />
                    <input
                      type="text"
                      required
                      autoComplete="cc-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card number"
                      className="w-full pl-10 pr-4 py-2 text-xs bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg outline-none font-mono text-[#141924]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      autoComplete="cc-exp"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg outline-none font-mono text-[#141924]"
                    />
                    <input
                      type="text"
                      required
                      autoComplete="cc-csc"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E0D5C3] rounded-lg outline-none font-mono text-[#141924]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-[#121620] hover:bg-[#1E2536] disabled:bg-slate-400 text-[#FAF6ED] font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all mt-4 border border-[#3A3326]"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    <span>Securing Transaction & Licenses...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Authorize Payment (${total.toFixed(2)}) & Access Library</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#8C7E6C]">
                Backed by our 14-day unconditional refund policy and DRM-free license.
              </p>
            </form>

          </div>
        ) : (
          /* Confirmation & Instant Downloads View */
          <div className="p-6 sm:p-12 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-[#FAF5E8] border border-[#E5D7B7] text-[#9C722F] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF4E6] text-[#8C682D] text-xs font-bold border border-[#DFCCA7] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B8924C]" /> Transaction Confirmed
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141924]">Your Library Is Ready</h2>
              <p className="text-xs sm:text-sm text-[#5C5346] max-w-md mx-auto mt-1">
                Order <span className="font-mono font-bold text-[#141924]">{orderId}</span> logged. Your permanent digital editions have been dispatched to <strong className="text-[#141924]">{email || 'your email'}</strong>.
              </p>
            </div>

            {/* Instant Download links */}
            <div className="p-5 rounded-2xl bg-white border border-[#E0D5C3] text-left space-y-3 shadow-sm">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#5C5346] flex items-center gap-1.5">
                <Download className="w-4 h-4 text-[#8C682D]" />
                <span>Instant Digital Downloads:</span>
              </h4>

              <div className="space-y-2.5">
                {purchasedItems.map((item) => (
                  <div
                    key={`${item.book.id}-${item.format}`}
                    className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E4DAC8] flex items-center justify-between gap-3 hover:border-[#CCA862] transition-colors"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-10 h-14 object-cover rounded shadow-book shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-serif text-xs font-bold text-[#141924] truncate">{item.book.title}</p>
                        <p className="text-[11px] text-[#7A6F5E] font-serif italic">
                          {item.book.author} • {item.book.fileSizeMb} MB
                        </p>
                        <span className="text-[9px] font-bold uppercase text-[#8C682D] tracking-wider">
                          Format: {item.format}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDownloadMockFile(item.book.title, 'EPUB')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#FAF4E6] hover:bg-[#F2E5CC] text-[#7A5A23] font-bold text-xs flex items-center gap-1.5 transition-colors border border-[#DFCCA7]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>EPUB</span>
                      </button>
                      <button
                        onClick={() => handleDownloadMockFile(item.book.title, 'PDF')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post-order CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setStep('details');
                  setIsCheckoutOpen(false);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#121620] hover:bg-[#1E2536] text-[#FAF6ED] font-bold text-xs uppercase tracking-wider transition-colors border border-[#3A3326]"
              >
                <span>Return to Catalog</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
