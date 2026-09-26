import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/CartDrawer';
import { SampleReaderModal } from '@/components/SampleReaderModal';
import { BookDetailModal } from '@/components/BookDetailModal';
import { CheckoutModal } from '@/components/CheckoutModal';

export const metadata: Metadata = {
  title: 'bookforU - Premium DRM-Free E-Books & Instant Digital Library',
  description: 'Explore and buy best-selling e-books in EPUB, PDF, and MOBI formats. 100% DRM-free, instant delivery to Kindle, Apple Books, Kobo, and Android with in-browser sample reader.',
  keywords: 'ebooks, buy ebooks, DRM-free ebooks, Kindle books, EPUB, PDF, audiobooks, digital book store',
  authors: [{ name: 'bookforU' }],
  openGraph: {
    title: 'bookforU - Premium DRM-Free E-Books & Instant Digital Library',
    description: 'Explore and buy best-selling e-books in EPUB, PDF, and MOBI formats with instant delivery.',
    url: 'https://bookforu.vercel.app',
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
          <SampleReaderModal />
          <BookDetailModal />
          <CheckoutModal />
        </CartProvider>
      </body>
    </html>
  );
}
