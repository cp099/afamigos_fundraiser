'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Terminal, Code2, ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutDeveloperPage() {
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
          <span className="text-xs font-mono text-slate-500">Developer Profile</span>
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
          {/* Hero Profile Card */}
          <div className="craft-panel rounded-3xl p-6 sm:p-10 border border-white/[0.1] shadow-2xl relative overflow-hidden bg-[#0C111C]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
              {/* Avatar / Monogram */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-500 to-indigo-600 p-[2px] shadow-xl shrink-0">
                <div className="w-full h-full bg-[#080C14] rounded-[22px] flex items-center justify-center font-mono font-black text-2xl sm:text-3xl text-white">
                  CP
                </div>
              </div>

              {/* Developer Details */}
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/[0.08] border border-amber-500/20 text-amber-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lead Developer &amp; Architect</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Chirag P Patil
                </h1>
                <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
                  @cp099 • &ldquo;Think Big, Think Bright.&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  Student at <strong className="text-white">CHRIST (Deemed to be University)</strong>, Bengaluru. Built the
                  real-time fundraising platform for class collective <strong className="text-amber-400">AFA MIGOS</strong> in
                  support of the Child Sponsorship Programme (CSP) organized by the Centre for Social Action (CSA).
                </p>

                {/* Social & Source Links */}
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <a
                    href="https://github.com/cp099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-xs font-mono text-white font-semibold transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub @cp099</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href="https://github.com/cp099/afamigos_fundraiser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-mono text-white font-semibold transition-all shadow-md"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>View Project Source</span>
                    <ExternalLink className="w-3 h-3 text-indigo-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture & Engineering Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="craft-card rounded-2xl p-5 border border-white/[0.08]">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Modern Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Engineered with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Framer Motion for responsive 60fps animations.
              </p>
            </div>

            <div className="craft-card rounded-2xl p-5 border border-white/[0.08]">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Privacy Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero-leak aggregate calculations guarantee that student contribution amounts remain strictly private and confidential.
              </p>
            </div>

            <div className="craft-card rounded-2xl p-5 border border-white/[0.08]">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Community Impact</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Designed to rally class spirit and fund full-year sponsorships for underprivileged children in Bengaluru slum communities.
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
