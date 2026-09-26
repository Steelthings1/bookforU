'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, ShieldCheck, CheckCircle2, Download, CreditCard, Lock, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';
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

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setOrderId(`BFU-${Math.floor(100000 + Math.random() * 900000)}`);
      
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }

      clearCart();
    }, 1200);
  };

  const handleDownloadMockFile = (bookTitle: string, format: string) => {
    // Generate a downloadable text file representing the purchased e-book license
    const content = `=======================================================
BOOKFORU DIGITAL LICENSE & E-BOOK DOWNLOAD RECEIPT
=======================================================
Title: ${bookTitle}
Format: ${format}
Order Reference: ${orderId || 'BFU-PREVIEW'}
Customer: ${fullName || 'Valued Reader'} (${email || 'customer@bookforu.com'})
Delivery Time: ${new Date().toLocaleString()}
DRM Policy: 100% DRM-Free Personal License

Thank you for purchasing on bookforU!
You can read this on your Kindle, iPad, Apple Books, Kobo, or Android device.
For questions or Kindle transfer support, visit https://bookforu.vercel.app/#faq
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
      aria-label="Secure Checkout"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={() => {
        if (!isProcessing) setIsCheckoutOpen(false);
      }}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {!isProcessing && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {step === 'details' ? (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">Complete Your Order</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Instant delivery. Download links available immediately after payment.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Order Summary:</span>
              <div className="max-h-36 overflow-y-auto space-y-2 pr-1">
                {purchasedItems.map((item) => (
                  <div key={`${item.book.id}-${item.format}`} className="flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <span className="font-semibold text-slate-800">{item.book.title}</span>
                      <span className="text-[10px] text-brand-600 block">
                        {item.format} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 shrink-0">
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-baseline justify-between text-sm">
                <div>
                  <span className="font-bold text-slate-900">Total Due:</span>
                  {discountAmount > 0 && (
                    <span className="text-[11px] text-emerald-600 font-semibold block">
                      (Includes 20% discount savings of ${discountAmount.toFixed(2)})
                    </span>
                  )}
                </div>
                <span className="text-xl font-black text-brand-600 font-mono">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-4">
              
              <div className="space-y-1">
                <label htmlFor="customer-name" className="block text-xs font-bold text-slate-700">
                  Full Name
                </label>
                <input
                  id="customer-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Robinson"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500 text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="customer-email" className="block text-xs font-bold text-slate-700">
                  Delivery Email Address <span className="text-slate-400 font-normal">(Receipt & download links sent here)</span>
                </label>
                <input
                  id="customer-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.robinson@example.com"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none focus:border-brand-500 text-slate-800"
                />
              </div>

              {/* Payment details */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">Payment Information</label>
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Simulated Test Gateway
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      autoComplete="cc-number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card number"
                      className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none font-mono text-slate-800"
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
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none font-mono text-slate-800"
                    />
                    <input
                      type="text"
                      required
                      autoComplete="cc-csc"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none font-mono text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-bold text-base shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 transition-all mt-4"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Secure Payment...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay ${total.toFixed(2)} & Get Instant Access</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                By purchasing, you agree to our 14-day refund guarantee and DRM-free license.
              </p>
            </form>

          </div>
        ) : (
          /* Confirmation & Instant Downloads View */
          <div className="p-6 sm:p-10 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Payment Successful
              </div>
              <h2 className="text-3xl font-black text-slate-900">Your E-Books Are Ready!</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                Order <span className="font-mono font-bold text-slate-800">{orderId}</span> confirmed. A copy of your download receipt was sent to <strong className="text-slate-800">{email || 'your email'}</strong>.
              </p>
            </div>

            {/* Instant Download links */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-brand-600" />
                <span>Instant Digital Downloads:</span>
              </h4>

              <div className="space-y-2">
                {purchasedItems.map((item) => (
                  <div
                    key={`${item.book.id}-${item.format}`}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-sm hover:border-brand-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-10 h-14 object-cover rounded shadow-sm shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs font-bold text-slate-900 truncate">{item.book.title}</p>
                        <p className="text-[11px] text-slate-500">
                          {item.book.author} • {item.book.fileSizeMb} MB
                        </p>
                        <span className="text-[10px] font-bold text-brand-600">
                          Format: {item.format}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDownloadMockFile(item.book.title, 'EPUB')}
                        className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-brand-200"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>EPUB</span>
                      </button>
                      <button
                        onClick={() => handleDownloadMockFile(item.book.title, 'PDF')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5" />
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
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Continue Browsing Catalog</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
