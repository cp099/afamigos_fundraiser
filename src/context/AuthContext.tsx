'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';

interface AuthContextType {
  user: User | { email: string; uid: string; displayName?: string } | null;
  loading: boolean;
  isFirebaseActive: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  isFirebaseActive: false,
  signIn: async () => {},
  signOut: async () => {},
  error: null,
  clearError: () => {},
});

function formatAuthError(errorCode: string, defaultMessage: string): string {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email address or password. Please check your credentials and try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Access temporarily disabled due to multiple failed login attempts. Please reset your password or wait a few minutes.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/user-disabled':
      return 'This administrator account has been disabled.';
    default:
      return defaultMessage;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | { email: string; uid: string; displayName?: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(() => isFirebaseConfigured());
  const [error, setError] = useState<string | null>(null);
  const [isFirebaseActive] = useState<boolean>(() => isFirebaseConfigured());

  useEffect(() => {
    if (isFirebaseActive && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        setUser(fbUser);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [isFirebaseActive]);

  const signIn = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);

    try {
      if (isFirebaseConfigured() && auth) {
        await signInWithEmailAndPassword(auth, email.trim(), pass);
      } else {
        throw new Error(
          'Firebase credentials are not configured yet. Please add your Firebase configuration in .env.local to enable live administrator authentication.'
        );
      }
    } catch (err: unknown) {
      let msg = 'Failed to sign in.';
      if (err && typeof err === 'object' && 'code' in err) {
        const code = String((err as { code: unknown }).code);
        const fallbackMsg = 'message' in err ? String((err as { message: unknown }).message) : msg;
        msg = formatAuthError(code, fallbackMsg);
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured() && auth) {
        await fbSignOut(auth);
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isFirebaseActive,
        signIn,
        signOut,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
