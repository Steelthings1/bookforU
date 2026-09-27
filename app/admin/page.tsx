'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CATEGORIES } from '@/data/books';
import { Book } from '@/types/book';
import {
  BookPlus,
  Layers,
  Sparkles,
  ArrowLeft,
  Trash2,
  BookOpen,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  Eye,
  RefreshCw,
  Plus,
  Tag,
  Feather,
  Upload,
  HardDrive,
  Globe,
  FileText,
  Lock,
  LogOut,
  AlertCircle,
  Key,
  Check,
  FileUp,
} from 'lucide-react';

const COVER_PRESETS = [
  {
    name: 'Cyberpunk & AI',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Cosmic Nebula',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Minimalist Architecture',
    url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Deep Cognition & Mind',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Venture & Modern Office',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Historical Mystery',
    url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=700&q=80',
  },
];

export default function AdminPage() {
  const { books, addBook, deleteBook, resetToDefaultBooks, openReader, openBookDetail } = useCart();
  const { isAdminAuthenticated, verifyAdminPassword, adminSignOut } = useAuth();

  // Password Gate State
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [gateError, setGateError] = useState<string | null>(null);

  // Form State for Manual E-Book Creation
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [category, setCategory] = useState<Book['category']>('Tech & AI');
  const [price, setPrice] = useState('14.99');
  const [originalPrice, setOriginalPrice] = useState('24.99');
  const [discountBadge, setDiscountBadge] = useState('40% OFF');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);
  const [pageCount, setPageCount] = useState('320');
  const [fileSizeMb, setFileSizeMb] = useState('8.4');
  const [language, setLanguage] = useState('English');
  const [isbn, setIsbn] = useState('978-1-987000-00-1');
  const [formats, setFormats] = useState<('EPUB' | 'PDF' | 'MOBI')[]>(['EPUB', 'PDF', 'MOBI']);
  const [synopsis, setSynopsis] = useState('');
  const [chapterTitle, setChapterTitle] = useState('Chapter 1: The First Principle');
  const [sampleParagraphs, setSampleParagraphs] = useState('');

  // Cover Image Source Tabs & State
  const [coverSourceTab, setCoverSourceTab] = useState<'pc_upload' | 'google_drive' | 'web_url'>('pc_upload');
  const [coverImage, setCoverImage] = useState(COVER_PRESETS[0].url);
  const [uploadedCoverFileName, setUploadedCoverFileName] = useState<string | null>(null);
  const [driveCoverUrl, setDriveCoverUrl] = useState('');

  // Digital Book File Source Tabs & State
  const [fileSourceTab, setFileSourceTab] = useState<'pc_upload' | 'google_drive' | 'web_url'>('pc_upload');
  const [uploadedBookFileName, setUploadedBookFileName] = useState<string | null>(null);
  const [uploadedBookFileSizeMb, setUploadedBookFileSizeMb] = useState<number | null>(null);
  const [driveBookUrl, setDriveBookUrl] = useState('');
  const [webBookUrl, setWebBookUrl] = useState('');

  // UI State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'inventory'>('create');

  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const bookFileInputRef = useRef<HTMLInputElement>(null);
  const textExcerptInputRef = useRef<HTMLInputElement>(null);

  // Helper to convert Google Drive sharing link to direct view URL
  const convertGoogleDriveUrl = (url: string): string => {
    const trimmed = url.trim();
    const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return trimmed;
  };

  // Handle Cover File Upload from PC
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedCoverFileName(file.name);
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        setCoverImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Digital Book File Upload from PC
  const handleBookFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedBookFileName(file.name);
    const sizeMb = parseFloat((file.size / (1024 * 1024)).toFixed(2));
    setUploadedBookFileSizeMb(sizeMb);
    setFileSizeMb(sizeMb.toString());
  };

  // Handle Text Excerpt File Upload from PC
  const handleTextExcerptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setSampleParagraphs(text);
      }
    };
    reader.readAsText(file);
  };

  const toggleFormat = (fmt: 'EPUB' | 'PDF' | 'MOBI') => {
    if (formats.includes(fmt)) {
      if (formats.length > 1) {
        setFormats(formats.filter((f) => f !== fmt));
      }
    } else {
      setFormats([...formats, fmt]);
    }
  };

  // Admin Unlock Submit
  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setGateError(null);
    const verified = verifyAdminPassword(adminKeyInput);
    if (!verified) {
      setGateError('Invalid administrator access key. Please verify and try again.');
    }
  };

  // Manual Add Book Submit
  const handleManualAddBook = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !synopsis.trim()) {
      alert('Please fill in the required fields: Title, Author, and Synopsis.');
      return;
    }

    // Determine final cover image
    let finalCover = coverImage;
    if (coverSourceTab === 'google_drive' && driveCoverUrl.trim()) {
      finalCover = convertGoogleDriveUrl(driveCoverUrl);
    }

    const paragraphs = sampleParagraphs.trim()
      ? sampleParagraphs
          .split('\n\n')
          .map((p) => p.trim())
          .filter(Boolean)
      : [
          `In this foundational chapter of "${title}", author ${author} explores the core architecture of ${category}.`,
          `Every concept is meticulously articulated to grant the reader clear theoretical clarity and applicable methodologies.`,
          `This volume is presented in DRM-free universal formats for lifelong reading across all platforms.`,
        ];

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newBook: Book = {
      id: `${slug}-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      author: author.trim(),
      authorBio: authorBio.trim() || `Author and specialist in ${category}.`,
      coverImage: finalCover || COVER_PRESETS[0].url,
      coverSource: coverSourceTab,
      category,
      rating: 5.0,
      reviewCount: 1,
      price: parseFloat(price) || 9.99,
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      discountBadge: discountBadge.trim() || undefined,
      isBestseller,
      isFeatured,
      formats,
      pageCount: parseInt(pageCount) || 300,
      fileSizeMb: parseFloat(fileSizeMb) || 5.0,
      publishedDate: new Date().toISOString().split('T')[0],
      language: language.trim() || 'English',
      isbn: isbn.trim() || '978-0-000000-00-0',
      synopsis: synopsis.trim(),
      sampleExcerpt: {
        chapterTitle: chapterTitle.trim() || 'Chapter 1: Foundations',
        paragraphs,
      },
      digitalFile: {
        source: fileSourceTab,
        fileName: uploadedBookFileName || `${slug}.epub`,
        fileSizeMb: uploadedBookFileSizeMb || parseFloat(fileSizeMb) || 5.0,
        url: fileSourceTab === 'google_drive' ? driveBookUrl : fileSourceTab === 'web_url' ? webBookUrl : undefined,
        uploadedAt: new Date().toISOString(),
      },
      reviews: [
        {
          id: `rev-${Date.now()}`,
          userName: 'Editorial Curator Review',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'Masterful work added through the private atelier terminal. Impeccable presentation.',
          verifiedPurchase: true,
        },
      ],
    };

    addBook(newBook);
    setToastMessage(`✨ Volume "${newBook.title}" successfully added to the live catalog!`);

    // Reset fields
    setTitle('');
    setSubtitle('');
    setAuthor('');
    setAuthorBio('');
    setSynopsis('');
    setSampleParagraphs('');
    setUploadedCoverFileName(null);
    setUploadedBookFileName(null);

    // Switch to inventory tab
    setTimeout(() => {
      setActiveTab('inventory');
    }, 800);

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // KPIs
  const totalValue = books.reduce((acc, b) => acc + b.price, 0);
  const categoriesCount = new Set(books.map((b) => b.category)).size;

  // ---------------------------------------------------------------------------
  // IF NOT AUTHENTICATED: RENDER SECURE VIBRANT ADMIN GATE SCREEN
  // ---------------------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background ambient glowing shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#111726]/90 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10 space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-0.5 mx-auto shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-[#0D1220] rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white pt-2">
              book<span className="text-purple-400 italic font-normal">forU</span> Studio
            </h1>
            <p className="text-xs text-slate-400">
              Restricted Terminal. Enter your Administrator Master Access Key to proceed.
            </p>
          </div>

          {gateError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{gateError}</span>
            </div>
          )}

          <form onSubmit={handleAdminUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Master Access Key / Password
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={adminKeyInput}
                  onChange={(e) => setAdminKeyInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full pl-10 pr-4 py-3 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white font-mono placeholder:text-slate-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-widest shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-yellow-300" />
              <span>Authenticate & Enter Studio</span>
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-4 border-t border-white/10 space-y-2 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Default Master Key Hint:
            </span>
            <button
              type="button"
              onClick={() => {
                setAdminKeyInput('admin123');
                setGateError(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-purple-300 font-mono text-xs border border-purple-500/30 transition-all inline-block"
            >
              Use Default Key: <strong className="text-white">admin123</strong>
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // AUTHENTICATED: RENDER FULL STUDIO ADMIN PANEL
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/30 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-200" />
          <span className="text-xs font-bold tracking-wide">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/80 hover:text-white">
            ×
          </button>
        </div>
      )}

      {/* Admin Vibrant Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#090D16]/90 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">Storefront</span>
              </Link>

              <div className="h-6 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-500/20">
                  <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-black text-lg text-white">
                      book<span className="text-purple-400 italic font-normal">forU</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-500/30">
                      Studio Admin
                    </span>
                  </div>
                  <span className="block text-[10px] text-slate-400 font-mono">
                    Protected Terminal • Live Store Sync Active
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation tabs & Log Out */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/[0.04] p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'create'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <BookPlus className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Manual Book Creator</span>
                  <span className="md:hidden">Add</span>
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'inventory'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Inventory ({books.length})</span>
                </button>
              </div>

              {/* Lock Terminal / Sign Out */}
              <button
                onClick={adminSignOut}
                title="Lock Terminal & Log Out"
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* Vibrant KPI Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 via-[#13192B] to-[#0D1220] border border-purple-500/25 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Catalog Size</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-3xl font-black text-white mt-3">{books.length} Volumes</p>
            <p className="text-[11px] text-purple-200/70 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
              Synced live with storefront
            </p>
          </div>

          <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#13192B] to-[#0D1220] border border-emerald-500/25 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Est. Inventory Value</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-3xl font-black text-white mt-3">${totalValue.toFixed(2)}</p>
            <p className="text-[11px] text-emerald-200/70 mt-1">Average ${(totalValue / Math.max(1, books.length)).toFixed(2)} / volume</p>
          </div>

          <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 via-[#13192B] to-[#0D1220] border border-cyan-500/25 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Active Categories</span>
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-3xl font-black text-white mt-3">{categoriesCount} Categories</p>
            <p className="text-[11px] text-cyan-200/70 mt-1">Tech, Sci-Fi, Business & more</p>
          </div>

          <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-[#13192B] to-[#0D1220] border border-amber-500/25 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Security Gate</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="font-serif text-3xl font-black text-white mt-3">Protected</p>
            <p className="text-[11px] text-amber-200/70 mt-1">Session active</p>
          </div>
        </div>

        {/* Tab 1: Manual E-Book Creator */}
        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Section */}
            <div className="lg:col-span-7 bg-[#111726]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-7">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
                  <Plus className="w-3.5 h-3.5" /> Manual Publication Atelier
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Publish New E-Book Volume</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Upload cover and digital files directly from your PC/system, attach Google Drive links, or specify web URLs.
                </p>
              </div>

              <form onSubmit={handleManualAddBook} className="space-y-6">
                
                {/* 1. BOOK COVER UPLOAD OPTIONS (PC / Google Drive / URL) */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-purple-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                      <Upload className="w-4 h-4 text-purple-400" />
                      <span>Book Cover Artwork (Upload / Drive / URL) *</span>
                    </label>
                  </div>

                  {/* Cover Option Tabs */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-[#090D16] rounded-xl text-xs font-bold border border-white/10">
                    <button
                      type="button"
                      onClick={() => setCoverSourceTab('pc_upload')}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        coverSourceTab === 'pc_upload'
                          ? 'bg-purple-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>From PC</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCoverSourceTab('google_drive')}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        coverSourceTab === 'google_drive'
                          ? 'bg-purple-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Google Drive</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCoverSourceTab('web_url')}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        coverSourceTab === 'web_url'
                          ? 'bg-purple-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Presets / URL</span>
                    </button>
                  </div>

                  {/* Mode A: Upload Cover from PC */}
                  {coverSourceTab === 'pc_upload' && (
                    <div className="space-y-2">
                      <input
                        ref={coverFileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleCoverFileUpload}
                        className="hidden"
                      />
                      <div
                        onClick={() => coverFileInputRef.current?.click()}
                        className="border-2 border-dashed border-purple-500/40 hover:border-purple-400 rounded-2xl p-6 text-center cursor-pointer bg-[#090D16]/50 hover:bg-[#090D16] transition-all space-y-2"
                      >
                        <Upload className="w-8 h-8 text-purple-400 mx-auto" />
                        <p className="text-xs font-bold text-white">
                          Click to select image file from your PC or drag & drop
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Supports PNG, JPG, WebP. Converted automatically for instant offline & cloud display.
                        </p>
                        {uploadedCoverFileName && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold mt-2 border border-emerald-500/30">
                            <Check className="w-3.5 h-3.5" /> Selected: {uploadedCoverFileName}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mode B: Google Drive Cover Link */}
                  {coverSourceTab === 'google_drive' && (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={driveCoverUrl}
                        onChange={(e) => {
                          setDriveCoverUrl(e.target.value);
                          if (e.target.value.trim()) {
                            setCoverImage(convertGoogleDriveUrl(e.target.value));
                          }
                        }}
                        placeholder="Paste Google Drive image share link (e.g. https://drive.google.com/file/d/...)"
                        className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white font-mono placeholder:text-slate-600"
                      />
                      <p className="text-[11px] text-slate-400">
                        💡 Note: Ensure Google Drive sharing is set to &ldquo;Anyone with the link can view&rdquo;.
                      </p>
                    </div>
                  )}

                  {/* Mode C: Web URL & Curated Presets */}
                  {coverSourceTab === 'web_url' && (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white font-mono"
                      />
                      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                        {COVER_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setCoverImage(preset.url)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all border ${
                              coverImage === preset.url
                                ? 'bg-purple-600 text-white border-purple-500'
                                : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white'
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. DIGITAL E-BOOK FILE UPLOAD (PC / Google Drive / URL) */}
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-cyan-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <FileUp className="w-4 h-4 text-cyan-400" />
                      <span>Digital E-Book File (EPUB, PDF, Document)</span>
                    </label>
                  </div>

                  {/* Digital File Source Tabs */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-[#090D16] rounded-xl text-xs font-bold border border-white/10">
                    <button
                      type="button"
                      onClick={() => setFileSourceTab('pc_upload')}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        fileSourceTab === 'pc_upload'
                          ? 'bg-cyan-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>From PC</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFileSourceTab('google_drive')}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        fileSourceTab === 'google_drive'
                          ? 'bg-cyan-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Google Drive</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFileSourceTab('web_url')}
                      className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        fileSourceTab === 'web_url'
                          ? 'bg-cyan-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Direct URL</span>
                    </button>
                  </div>

                  {/* Option A: Upload File from PC */}
                  {fileSourceTab === 'pc_upload' && (
                    <div className="space-y-2">
                      <input
                        ref={bookFileInputRef}
                        type="file"
                        accept=".epub,.pdf,.mobi,.txt,.doc,.docx"
                        onChange={handleBookFileUpload}
                        className="hidden"
                      />
                      <div
                        onClick={() => bookFileInputRef.current?.click()}
                        className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-5 text-center cursor-pointer bg-[#090D16]/50 hover:bg-[#090D16] transition-all space-y-1.5"
                      >
                        <FileText className="w-8 h-8 text-cyan-400 mx-auto" />
                        <p className="text-xs font-bold text-white">
                          Select e-book file (.epub, .pdf, .mobi) from your system
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Automatically calculates volume size and links to purchase receipts.
                        </p>
                        {uploadedBookFileName && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold mt-2 border border-cyan-500/30">
                            <Check className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{uploadedBookFileName} ({uploadedBookFileSizeMb} MB)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Option B: Google Drive E-Book Share Link */}
                  {fileSourceTab === 'google_drive' && (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={driveBookUrl}
                        onChange={(e) => setDriveBookUrl(e.target.value)}
                        placeholder="Google Drive sharing URL for the digital book file..."
                        className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-cyan-500 text-white font-mono placeholder:text-slate-600"
                      />
                      <p className="text-[11px] text-slate-400">
                        Attached to instant download receipt so buyers can retrieve this file.
                      </p>
                    </div>
                  )}

                  {/* Option C: Direct Web URL */}
                  {fileSourceTab === 'web_url' && (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={webBookUrl}
                        onChange={(e) => setWebBookUrl(e.target.value)}
                        placeholder="Direct download URL (e.g. S3, Dropbox, cloud storage)..."
                        className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-cyan-500 text-white font-mono placeholder:text-slate-600"
                      />
                    </div>
                  )}
                </div>

                {/* 3. CORE BOOK METADATA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Book Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Neural Networks & Cognitive Agents"
                      className="w-full px-4 py-3 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white placeholder:text-slate-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Subtitle / Edition Note
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. Blueprint for Autonomous Intelligence"
                      className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Dr. Julian Vance"
                      className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Category Genre *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white cursor-pointer"
                    >
                      {CATEGORIES.filter((c) => c !== 'All Books').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Author Biography
                    </label>
                    <input
                      type="text"
                      value={authorBio}
                      onChange={(e) => setAuthorBio(e.target.value)}
                      placeholder="e.g. Systems researcher and former director at Cambridge AI Institute."
                      className="w-full px-4 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* 4. PRICING & FLAGS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Selling Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#090D16] border border-white/10 rounded-lg text-emerald-400 font-mono font-bold outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Original Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#090D16] border border-white/10 rounded-lg text-slate-400 font-mono outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Discount Tag</label>
                    <input
                      type="text"
                      value={discountBadge}
                      onChange={(e) => setDiscountBadge(e.target.value)}
                      placeholder="40% OFF"
                      className="w-full px-3 py-2 text-xs bg-[#090D16] border border-white/10 rounded-lg text-cyan-400 font-mono outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Page Count</label>
                    <input
                      type="number"
                      value={pageCount}
                      onChange={(e) => setPageCount(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#090D16] border border-white/10 rounded-lg text-white font-mono outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-4 flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={isBestseller}
                        onChange={(e) => setIsBestseller(e.target.checked)}
                        className="rounded bg-[#090D16] border-white/20 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="font-semibold text-slate-300">Highlight as Bestseller</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="rounded bg-[#090D16] border-white/20 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="font-semibold text-slate-300">Feature in Storefront</span>
                    </label>
                  </div>
                </div>

                {/* Formats Checkboxes */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Included Digital Formats
                  </label>
                  <div className="flex gap-3">
                    {(['EPUB', 'PDF', 'MOBI'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => toggleFormat(fmt)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          formats.includes(fmt)
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                            : 'bg-[#090D16] text-slate-500 border-white/10'
                        }`}
                      >
                        ✓ {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Synopsis */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Volume Synopsis & Critical Summary *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    placeholder="A detailed critical overview of the book's thesis, narrative arc, or technical architecture..."
                    className="w-full px-4 py-3 text-xs bg-[#090D16] border border-white/10 rounded-xl outline-none focus:border-purple-500 text-white placeholder:text-slate-600"
                  />
                </div>

                {/* 5. SAMPLE READING EXCERPT (WITH PC .TXT UPLOAD OPTION) */}
                <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Feather className="w-4 h-4 text-purple-400" />
                      <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                        Sample Chapter Excerpt (For In-Browser Reader)
                      </span>
                    </div>

                    {/* Import .txt excerpt button */}
                    <input
                      ref={textExcerptInputRef}
                      type="file"
                      accept=".txt,.md"
                      onChange={handleTextExcerptUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => textExcerptInputRef.current?.click()}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-[11px] font-bold border border-purple-500/30 flex items-center gap-1 transition-colors"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Upload .txt from PC</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={chapterTitle}
                    onChange={(e) => setChapterTitle(e.target.value)}
                    placeholder="Chapter title, e.g. Chapter 1: The First Principle"
                    className="w-full px-3.5 py-2 text-xs bg-[#090D16] border border-white/10 rounded-lg text-white"
                  />

                  <textarea
                    rows={4}
                    value={sampleParagraphs}
                    onChange={(e) => setSampleParagraphs(e.target.value)}
                    placeholder="Type or paste sample chapter text. Separate paragraphs with a blank double newline. Readers will be able to read this directly in the sample reader modal!"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#090D16] border border-white/10 rounded-lg text-white placeholder:text-slate-600 font-serif"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-purple-600/25 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Publish Volume to Live Catalog</span>
                </button>

              </form>
            </div>

            {/* Live Real-Time Card Preview */}
            <div className="lg:col-span-5 sticky top-28 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Live Storefront Preview</span>
                </span>
                <span className="text-[10px] font-mono text-slate-500">Reflects PC uploads & inputs</span>
              </div>

              {/* Rendered Preview Card */}
              <div className="bg-[#FAF8F5] text-slate-900 rounded-3xl p-5 border border-[#E7DDCF] shadow-2xl space-y-4">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-200 book-spine-sheen shadow-book">
                  <img
                    src={coverImage || COVER_PRESETS[0].url}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {isBestseller && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#B8924C] to-[#8C6027] text-white text-[10px] font-black uppercase tracking-wider shadow">
                        Bestseller
                      </span>
                    )}
                    {discountBadge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#18202F] text-[#EFE7D5] text-[10px] font-bold shadow border border-white/10">
                        {discountBadge}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-bold text-white/95 px-2.5 py-1.5 rounded-lg bg-black/65 backdrop-blur-md tracking-wider">
                    <span>{formats.join(' • ')}</span>
                    <span className="font-mono text-[#D4AF37]">{pageCount || 300} pp.</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[10px] text-[#8C682D] font-black uppercase tracking-[0.16em] mb-1">
                    <span>{category}</span>
                    <span className="text-slate-400 font-mono lowercase">{fileSizeMb || 5.0} MB</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug line-clamp-2">
                    {title || 'Untitled Masterwork Volume'}
                  </h3>
                  <p className="text-xs text-slate-500 italic font-serif mt-0.5">
                    By {author || 'Anonymous Scholar'}
                  </p>
                  
                  <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-slate-200">
                    <span className="font-serif text-2xl font-black text-slate-950">
                      ${parseFloat(price || '0').toFixed(2)}
                    </span>
                    {originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-serif">
                        ${parseFloat(originalPrice).toFixed(2)}
                      </span>
                    )}
                    <span className="ml-auto text-[10px] font-bold text-[#8C682D] bg-[#FAF4E6] px-2 py-0.5 rounded border border-[#DFCCA7]">
                      100% DRM-Free
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                    {synopsis || 'Synopsis will be displayed here for prospective readers...'}
                  </p>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-400 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Once published, this edition appears instantly in the customer storefront, interactive reader modal, and cart.
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Inventory Manager */}
        {activeTab === 'inventory' && (
          <div className="bg-[#111726]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-white">Catalog Inventory ({books.length})</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Inspect active volumes, test sample reading excerpts, or retire editions from publication.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('create')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/25"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New E-Book</span>
                </button>
                <button
                  onClick={resetToDefaultBooks}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all border border-white/10"
                  title="Reset to default curated collection"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Default Books</span>
                </button>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Volume</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Formats</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors group">
                      
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.coverImage}
                            alt={b.title}
                            className="w-10 h-14 object-cover rounded-lg shadow shrink-0 border border-white/10"
                          />
                          <div className="max-w-xs sm:max-w-sm truncate">
                            <span className="font-serif font-bold text-white block truncate text-sm">
                              {b.title}
                            </span>
                            <span className="text-[11px] text-slate-400 font-serif italic truncate">
                              By {b.author}
                            </span>
                            {b.isBestseller && (
                              <span className="inline-block mt-0.5 text-[9px] font-black uppercase text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded">
                                Bestseller
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-purple-300">
                        {b.category}
                      </td>

                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        {b.formats.join(', ')}
                      </td>

                      <td className="py-3.5 px-4 font-serif font-bold text-emerald-400 text-sm">
                        ${b.price.toFixed(2)}
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        ★ {b.rating} ({b.reviewCount})
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openReader(b)}
                            className="p-2 rounded-lg bg-white/[0.06] hover:bg-purple-600 text-slate-300 hover:text-white transition-colors"
                            title="Test In-Browser Sample Reader"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => openBookDetail(b)}
                            className="p-2 rounded-lg bg-white/[0.06] hover:bg-cyan-600 text-slate-300 hover:text-white transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove "${b.title}" from catalog?`)) {
                                deleteBook(b.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-white/[0.06] hover:bg-rose-600 text-slate-400 hover:text-white transition-colors"
                            title="Delete Volume"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
