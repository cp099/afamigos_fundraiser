'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, EyeOff, Server, Database, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070A11] text-[#F1F5F9] flex flex-col relative overflow-hidden bg-grid-pattern selection:bg-indigo-500 selection:text-white">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070A11]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Campaign</span>
          </Link>
          <span className="text-xs font-mono text-slate-500">Privacy Policy</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header Card */}
          <div className="craft-panel rounded-3xl p-6 sm:p-10 border border-white/[0.1] shadow-2xl relative bg-[#0C111C]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Leak Financial Privacy Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
              This Privacy Policy describes how the <strong className="text-white">AFA MIGOS</strong> fundraiser application collects,
              protects, and processes campaign metrics for the Child Sponsorship Programme (CSP) by the{' '}
              <strong className="text-white">Centre for Social Action (CSA)</strong> at{' '}
              <strong className="text-white">CHRIST (Deemed to be University)</strong>.
            </p>
          </div>

          {/* Privacy Pillars */}
          <div className="space-y-6">
            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-amber-400">
                <EyeOff className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">1. Strict Zero-Leak Financial Privacy</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We believe giving should be inspired by goodwill, not social pressure. While student leaderboard positions (#1, #2, #3...)
                and overall campaign totals are public, <strong className="text-amber-300 font-semibold">individual donation amounts are strictly private</strong>.
                Individual rupee figures are never exposed in public API endpoints, HTML sources, or network payloads.
              </p>
            </div>

            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-indigo-400">
                <Database className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">2. Data Collection &amp; Aggregates</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The application records contribution transactions internally to compute:
              </p>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Total classroom funds raised towards the campaign goal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Unique count of student contributors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Deterministic sequential ranks for the student leaderboard.</span>
                </li>
              </ul>
            </div>

            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-emerald-400">
                <Lock className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">3. Security &amp; Access Controls</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                All administrative modifications (adding, updating, or deleting contributions) require an authenticated session
                managed via Google Firebase Authentication. Cloud Firestore security rules strictly block unauthenticated write access
                and private database read queries.
              </p>
            </div>

            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-rose-400">
                <Server className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">4. Data Sharing &amp; Third Parties</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Student contribution records are never sold, rented, or shared with third-party advertisers. All collected funds
                and participant rosters are used exclusively for institutional coordination with the Centre for Social Action (CSA).
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/[0.08] py-6 text-center text-xs font-mono text-slate-500">
        &copy; {new Date().getFullYear()} Chirag P Patil (cp099) • AFA MIGOS
      </footer>
    </div>
  );
}
