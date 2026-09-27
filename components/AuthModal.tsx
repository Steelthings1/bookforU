'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Lock, Mail, User, Eye, EyeOff, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, signIn, signUp, demoLogin } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>(authModalMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(authModalMode);
    setError(null);
  }, [authModalMode, isAuthModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAuthModal();
    };
    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'signin') {
      const res = signIn(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || 'Unable to sign in. Please verify your details.');
      }
    } else {
      const res = signUp(name, email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || 'Unable to create account. Please check your inputs.');
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Member Authentication"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        className="w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden my-auto border border-[#E0D5C3] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EFE7D8] hover:bg-[#E2D6C1] text-[#4F4638] transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header branding */}
          <div className="text-center space-y-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E2532] to-[#0D111A] border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C378] mx-auto shadow-md">
              <span className="font-serif font-black text-sm text-gold-gradient">bU</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#141924] pt-2">
              {mode === 'signin' ? 'Welcome Back' : 'Create Reader Account'}
            </h2>
            <p className="text-xs text-[#7A6F5E]">
              {mode === 'signin'
                ? 'Sign in to access your purchased editions and sync across devices.'
                : 'Join bookforU to preserve your personal DRM-free digital library.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-[#EFE7D8] rounded-xl text-xs font-bold border border-[#DDD0BC]">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-[#121620] text-white shadow'
                  : 'text-[#5C5346] hover:text-black'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-[#121620] text-white shadow'
                  : 'text-[#5C5346] hover:text-black'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label htmlFor="auth-name" className="block text-xs font-bold uppercase tracking-wider text-[#5C5346]">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6C] pointer-events-none" />
                  <input
                    id="auth-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Julian Vance"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#DDD2BE] rounded-xl outline-none focus:border-[#B8924C] text-[#141924]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="auth-email" className="block text-xs font-bold uppercase tracking-wider text-[#5C5346]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6C] pointer-events-none" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#DDD2BE] rounded-xl outline-none focus:border-[#B8924C] text-[#141924]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="auth-password" className="block text-xs font-bold uppercase tracking-wider text-[#5C5346]">
                  Password
                </label>
                {mode === 'signin' && (
                  <span className="text-[10px] text-[#8C682D] hover:underline cursor-pointer">
                    Forgot?
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7E6C] pointer-events-none" />
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-[#DDD2BE] rounded-xl outline-none focus:border-[#B8924C] text-[#141924]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7E6C] hover:text-black p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'signup' && (
                <span className="text-[10px] text-[#8C7E6C] block">Must be at least 6 characters.</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#121620] hover:bg-[#1E2536] disabled:bg-slate-500 text-[#FAF6ED] font-bold text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all mt-4 border border-[#3A3326]"
            >
              <span>{mode === 'signin' ? 'Sign In to Library' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </form>

          {/* Quick Demo Logins for Testing */}
          <div className="pt-2 border-t border-[#E8DFD1] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E6C] block text-center">
              Quick Test Credentials
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => demoLogin('user')}
                className="px-3 py-2 rounded-lg bg-white border border-[#DDD2BE] hover:border-[#B8924C] text-[#4F4638] text-[11px] font-bold transition-all text-center"
              >
                👤 Reader Demo
              </button>
              <button
                type="button"
                onClick={() => demoLogin('admin')}
                className="px-3 py-2 rounded-lg bg-[#FAF4E6] border border-[#DFCCA7] hover:border-[#B8924C] text-[#8C682D] text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#B8924C]" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A6F5E]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8924C]" />
            <span>256-bit encrypted authentication</span>
          </div>

        </div>

      </div>
    </div>
  );
};
