'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount } from '@/types/book';

interface AuthContextType {
  user: UserAccount | null;
  isAdminAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { success: boolean; error?: string };
  signOut: () => void;
  verifyAdminPassword: (password: string) => boolean;
  adminSignOut: () => void;
  demoLogin: (role: 'user' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORDS = ['admin123', 'bookforu2026', 'admin@bookforu'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedUser = localStorage.getItem('bookforu_active_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.role === 'admin') {
          setIsAdminAuthenticated(true);
        }
      }

      const adminSession = localStorage.getItem('bookforu_admin_auth');
      if (adminSession === 'true') {
        setIsAdminAuthenticated(true);
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signIn = (email: string, password: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if it's the master admin login
    if ((cleanEmail === 'admin@bookforu.com' || cleanEmail === 'admin') && ADMIN_PASSWORDS.includes(password)) {
      const adminUser: UserAccount = {
        id: 'usr-admin-01',
        name: 'Atelier Director',
        email: 'admin@bookforu.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setUser(adminUser);
      setIsAdminAuthenticated(true);
      localStorage.setItem('bookforu_active_user', JSON.stringify(adminUser));
      localStorage.setItem('bookforu_admin_auth', 'true');
      setIsAuthModalOpen(false);
      return { success: true };
    }

    try {
      const usersRaw = localStorage.getItem('bookforu_registered_users');
      const users: (UserAccount & { password?: string })[] = usersRaw ? JSON.parse(usersRaw) : [];
      
      const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
      if (!found) {
        return { success: false, error: 'No account found with this email. Please sign up first.' };
      }

      if (found.password && found.password !== password) {
        return { success: false, error: 'Incorrect password. Please verify your credentials.' };
      }

      const activeUser: UserAccount = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role || 'user',
        createdAt: found.createdAt,
        purchasedBookIds: found.purchasedBookIds || [],
      };

      setUser(activeUser);
      localStorage.setItem('bookforu_active_user', JSON.stringify(activeUser));
      if (activeUser.role === 'admin') {
        setIsAdminAuthenticated(true);
        localStorage.setItem('bookforu_admin_auth', 'true');
      }
      setIsAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, error: 'Authentication service encountered an unexpected error.' };
    }
  };

  const signUp = (name: string, email: string, password: string): { success: boolean; error?: string } => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) return { success: false, error: 'Please enter your full name.' };
    if (!cleanEmail || !cleanEmail.includes('@')) return { success: false, error: 'Please enter a valid email address.' };
    if (!password || password.length < 6) return { success: false, error: 'Password must be at least 6 characters long.' };

    try {
      const usersRaw = localStorage.getItem('bookforu_registered_users');
      const users: (UserAccount & { password?: string })[] = usersRaw ? JSON.parse(usersRaw) : [];

      if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
        return { success: false, error: 'An account with this email address already exists. Please sign in.' };
      }

      const newUser: UserAccount & { password: string } = {
        id: `usr-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        password,
        role: 'user',
        createdAt: new Date().toISOString(),
        purchasedBookIds: [],
      };

      users.push(newUser);
      localStorage.setItem('bookforu_registered_users', JSON.stringify(users));

      // Auto sign in
      const sessionUser: UserAccount = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
        purchasedBookIds: [],
      };
      setUser(sessionUser);
      localStorage.setItem('bookforu_active_user', JSON.stringify(sessionUser));
      setIsAuthModalOpen(false);
      return { success: true };
    } catch {
      return { success: false, error: 'Could not create account at this time.' };
    }
  };

  const signOut = () => {
    setUser(null);
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('bookforu_active_user');
      localStorage.removeItem('bookforu_admin_auth');
    } catch {
      // Ignore
    }
  };

  const verifyAdminPassword = (password: string): boolean => {
    if (ADMIN_PASSWORDS.includes(password.trim())) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('bookforu_admin_auth', 'true');
      } catch {
        // Ignore
      }
      return true;
    }
    return false;
  };

  const adminSignOut = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('bookforu_admin_auth');
    } catch {
      // Ignore
    }
  };

  const demoLogin = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      const admin: UserAccount = {
        id: 'usr-admin-demo',
        name: 'Chief Editor',
        email: 'editor@bookforu.com',
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
      setUser(admin);
      setIsAdminAuthenticated(true);
      localStorage.setItem('bookforu_active_user', JSON.stringify(admin));
      localStorage.setItem('bookforu_admin_auth', 'true');
    } else {
      const demoUser: UserAccount = {
        id: 'usr-reader-demo',
        name: 'Eleanor Sterling',
        email: 'eleanor.sterling@reader.com',
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
      localStorage.setItem('bookforu_active_user', JSON.stringify(demoUser));
    }
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdminAuthenticated,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        verifyAdminPassword,
        adminSignOut,
        demoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
