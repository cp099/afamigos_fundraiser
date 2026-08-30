'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle2, HeartHandshake, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
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
          <span className="text-xs font-mono text-slate-500">Terms of Use</span>
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/[0.08] border border-indigo-500/20 text-indigo-300 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Campaign Guidelines &amp; Terms</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Terms of Use
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Effective as of: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
              By accessing or participating in this fundraising platform, you agree to these Terms of Use governing the{' '}
              <strong className="text-white">AFA MIGOS</strong> classroom fundraising drive in support of the Child Sponsorship
              Programme (CSP) organized by the <strong className="text-white">Centre for Social Action (CSA)</strong> at{' '}
              <strong className="text-white">CHRIST (Deemed to be University)</strong>.
            </p>
          </div>

          {/* Terms Articles */}
          <div className="space-y-6">
            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-amber-400">
                <HeartHandshake className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">1. Voluntary Community Participation</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                All donations and contributions to this classroom initiative are entirely voluntary. There is no minimum requirement,
                and any student or supporter may contribute at their discretion to sponsor child education and developmental support.
              </p>
            </div>

            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-indigo-400">
                <CheckCircle2 className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">2. Allocation of Funds</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                All funds raised through this platform are pooled collectively by the class and handed over in full to the{' '}
                <strong className="text-white font-semibold">Centre for Social Action (CSA), CHRIST (Deemed to be University)</strong>{' '}
                for the direct sponsorship of school fees, books, uniforms, and nutrition for underprivileged children under the CSP initiative.
              </p>
            </div>

            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-emerald-400">
                <Award className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">3. Leaderboard &amp; Ranking System</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The gamified leaderboard ranks contributors using deterministic rules based on total cumulative contributions,
                earliest contribution timestamps, and alphabetical ordering. Ranking exists purely for motivation and community celebration.
              </p>
            </div>

            <div className="craft-card rounded-2xl p-6 border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-rose-400">
                <ShieldAlert className="w-5 h-5" />
                <h2 className="text-base font-bold text-white">4. Intellectual Property &amp; Attribution</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The software application, user interface design, and codebase are copyright &copy; {new Date().getFullYear()}{' '}
                <strong className="text-white font-semibold">Chirag P Patil (cp099)</strong>. The Child Sponsorship Programme (CSP)
                and related logos are the property of the Centre for Social Action (CSA), CHRIST (Deemed to be University).
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
