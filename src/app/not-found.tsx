'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070A11] text-[#F1F5F9] flex flex-col items-center justify-center relative overflow-hidden bg-grid-pattern px-4 selection:bg-indigo-500 selection:text-white">
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 craft-panel rounded-3xl p-8 sm:p-10 border border-white/[0.09] shadow-2xl">
        {/* 404 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/[0.08] border border-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Error 404</span>
        </motion.div>

        {/* Large Number */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-6xl sm:text-7xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tighter mb-3"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg sm:text-xl font-bold text-white mb-2"
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Campaign</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white font-mono text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-[11px] text-slate-500 font-mono">
        &copy; {new Date().getFullYear()} Chirag P Patil (cp099) • AFA MIGOS
      </div>
    </div>
  );
}
