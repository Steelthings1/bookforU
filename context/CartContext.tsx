'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, CartItem } from '@/types/book';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (book: Book, format?: 'EPUB' | 'PDF' | 'MOBI' | 'All-Formats Bundle') => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  promoCode: string;
  discountPercent: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  discountAmount: number;
  total: number;
  totalItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeReaderBook: Book | null;
  openReader: (book: Book) => void;
  closeReader: () => void;
  selectedDetailBook: Book | null;
  openBookDetail: (book: Book) => void;
  closeBookDetail: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeReaderBook, setActiveReaderBook] = useState<Book | null>(null);
  const [selectedDetailBook, setSelectedDetailBook] = useState<Book | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Load from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem('bookforu_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('bookforu_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // Local storage fallback
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('bookforu_cart', JSON.stringify(cart));
      localStorage.setItem('bookforu_wishlist', JSON.stringify(wishlist));
    } catch {
      // Ignore storage errors
    }
  }, [cart, wishlist, isMounted]);

  const addToCart = (book: Book, format: 'EPUB' | 'PDF' | 'MOBI' | 'All-Formats Bundle' = 'All-Formats Bundle') => {
    setCart((prev) => {
      const existing = prev.find((item) => item.book.id === book.id && item.format === format);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id && item.format === format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { book, format, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.book.id === bookId ? { ...item, quantity: qty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const toggleWishlist = (bookId: string) => {
    setWishlist((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const isInWishlist = (bookId: string) => wishlist.includes(bookId);

  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'BOOKFORU20' || formatted === 'WELCOME20') {
      setPromoCode(formatted);
      setDiscountPercent(20);
      return { success: true, message: 'Promo code applied! 20% discount added.' };
    }
    if (formatted === 'READMORE50') {
      setPromoCode(formatted);
      setDiscountPercent(50);
      return { success: true, message: 'VIP Promo applied! 50% discount added.' };
    }
    return { success: false, message: 'Invalid or expired promo code. Try "BOOKFORU20"' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  const openReader = (book: Book) => setActiveReaderBook(book);
  const closeReader = () => setActiveReaderBook(null);

  const openBookDetail = (book: Book) => setSelectedDetailBook(book);
  const closeBookDetail = () => setSelectedDetailBook(null);

  const subtotal = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        promoCode,
        discountPercent,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        total,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeReaderBook,
        openReader,
        closeReader,
        selectedDetailBook,
        openBookDetail,
        closeBookDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
