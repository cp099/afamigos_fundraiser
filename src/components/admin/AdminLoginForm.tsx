'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft, HeartHandshake, KeyRound } from 'lucide-react';
import Link from 'next/link';

export function AdminLoginForm() {
  const { signIn, error, isFirebaseActive } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !password) {
      setLocalError('Please enter both your email address and password.');
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please verify your email and password.';
      setLocalError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070A11] flex flex-col justify-between relative overflow-hidden bg-grid-pattern selection:bg-indigo-500 selection:text-white">
      {/* Top Header Bar */}
      <header className="border-b border-white/[0.08] bg-[#070A11]/80 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 p-[1.5px]">
            <div className="w-full h-full bg-[#080C14] rounded-[10px] flex items-center justify-center font-mono font-black text-xs text-white">
              CSP
            </div>
          </div>
          <div>
            <span className="font-bold text-sm text-white tracking-tight group-hover:text-amber-300 transition-colors">
              Child Sponsorship Campaign
            </span>
            <span className="text-[11px] text-slate-400 block -mt-0.5">
              AFA MIGOS • CSA, CHRIST (Deemed to be University)
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back to Live Campaign</span>
        </Link>
      </header>

      {/* Main Content: Two-Column Layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column: Movement Overview & Impact */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/[0.08] border border-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Administrative Console</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Manage the Movement.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                Empower Young Minds.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
              Class <strong className="text-amber-400 font-semibold">AFA MIGOS</strong> contribution portal for the{' '}
              <strong className="text-white font-semibold">Child Sponsorship Programme (CSP)</strong> organized by the{' '}
              <strong className="text-slate-200 font-semibold">Centre for Social Action (CSA)</strong> at{' '}
              <strong className="text-white font-semibold">CHRIST (Deemed to be University)</strong>.
            </p>

            {/* Campaign Pillar Badges */}
            <div className="space-y-3 pt-2 max-w-lg">
              <div className="craft-card rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    ₹4,000 / Year Benchmark
                  </div>
                  <div className="text-xs text-slate-400">
                    Sponsors 1 child&apos;s complete school fees, books, uniform &amp; nutrition.
                  </div>
                </div>
              </div>

              <div className="craft-card rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Secure Firebase Authentication
                  </div>
                  <div className="text-xs text-slate-400">
                    Protected admin dashboard with zero public financial exposure.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Production Admin Login Card */}
          <div className="lg:col-span-6">
            <div className="craft-panel rounded-3xl p-7 sm:p-10 border border-white/[0.1] shadow-2xl relative bg-[#0C111C]/90">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Sign in to Console
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Enter your administrator credentials to record contributions, manage rosters, and configure campaign goals.
                </p>
              </div>

              {/* Notice when Firebase is awaiting configuration */}
              {!isFirebaseActive && (
                <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Firebase Setup Required</div>
                    <div className="mt-0.5 text-amber-200/90 leading-relaxed">
                      Add your Firebase project configuration keys to <code className="bg-amber-400/20 px-1 py-0.5 rounded font-mono text-[11px]">.env.local</code> to activate live cloud authentication.
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {(localError || error) && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Authentication Notice</div>
                    <div className="mt-0.5">{localError || error}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="admin@afamigos.org"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to Console</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Back to Public Site */}
              <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
                <Link
                  href="/"
                  className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  &larr; Back to Public Campaign Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Legal Bar */}
      <footer className="border-t border-white/[0.08] px-4 sm:px-8 py-4 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto w-full">
        <span>&copy; {new Date().getFullYear()} Chirag P Patil (cp099). All rights reserved.</span>
        <span>AFA MIGOS • Contributing Class Drive • CSA, CHRIST (Deemed to be University)</span>
      </footer>
    </div>
  );
}
