export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorBio: string;
  coverImage: string;
  coverSource?: 'pc_upload' | 'device_upload' | 'google_drive' | 'web_url';
  category: 'Fiction' | 'Sci-Fi & Fantasy' | 'Tech & AI' | 'Self-Help' | 'Business' | 'Psychology' | 'Design';
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  isBestseller?: boolean;
  isFeatured?: boolean;
  isNewRelease?: boolean;
  formats: ('EPUB' | 'PDF' | 'MOBI' | 'Audiobook')[];
  pageCount: number;
  fileSizeMb: number;
  publishedDate: string;
  language: string;
  isbn: string;
  synopsis: string;
  sampleExcerpt: {
    chapterTitle: string;
    paragraphs: string[];
  };
  digitalFile?: {
    source: 'pc_upload' | 'device_upload' | 'google_drive' | 'web_url';
    fileName?: string;
    fileSizeMb?: number;
    url?: string;
    uploadedAt?: string;
  };
  reviews: Review[];
}

export interface CartItem {
  book: Book;
  format: 'EPUB' | 'PDF' | 'MOBI' | 'All-Formats Bundle';
  quantity: number;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  purchasedBookIds?: string[];
}
