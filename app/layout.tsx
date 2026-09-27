import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartDrawer } from '@/components/CartDrawer';
import { SampleReaderModal } from '@/components/SampleReaderModal';
import { BookDetailModal } from '@/components/BookDetailModal';
import { CheckoutModal } from '@/components/CheckoutModal';
import { AuthModal } from '@/components/AuthModal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'bookforU - The Atelier of Rare & Masterwork Digital Books',
  description: 'Curated DRM-free masterworks in EPUB, PDF, and MOBI formats. Instant delivery to Kindle, Apple Books, Kobo, and Android with exquisite in-browser sample reading.',
  keywords: 'ebooks, luxury bookstore, DRM-free ebooks, Kindle books, EPUB, PDF, editorial books, digital book store',
  authors: [{ name: 'bookforU' }],
  openGraph: {
    title: 'bookforU - The Atelier of Rare & Masterwork Digital Books',
    description: 'Curated DRM-free masterworks in EPUB, PDF, and MOBI formats with instant delivery.',
    url: 'https://bookforu-mu.vercel.app',
    siteName: 'bookforU',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${playfair.variable} ${plusJakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#FAF8F5] text-slate-900 antialiased selection:bg-champagne-500 selection:text-white">
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <SampleReaderModal />
            <BookDetailModal />
            <CheckoutModal />
            <AuthModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
