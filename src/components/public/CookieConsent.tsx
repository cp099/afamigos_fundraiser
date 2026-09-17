'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('afamigos_cookie_consent');
      if (!consent) {
        // Show after brief delay for smooth entrance
        const timer = setTimeout(() => setShow(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage access disabled
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('afamigos_cookie_consent', 'accepted');
    } catch {}
    setShow(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('afamigos_cookie_consent', 'essential_only');
    } catch {}
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 craft-panel rounded-2xl p-4 sm:p-5 border border-white/[0.12] shadow-2xl bg-[#090D18]/95 backdrop-blur-xl text-slate-300 text-xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
              <Cookie className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Privacy &amp; Cookies
                </span>
                <button
                  onClick={handleDecline}
                  className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Dismiss cookie banner"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-300 mt-1.5 leading-relaxed">
                We use essential cookies to maintain real-time campaign leaderboard synchronization. No personal tracking data is shared with advertisers. Read our{' '}
                <Link href="/privacy" className="text-amber-400 hover:underline font-semibold">
                  Privacy Policy
                </Link>.
              </p>

              <div className="flex items-center gap-2.5 mt-3 pt-2 border-t border-white/[0.08]">
                <button
                  onClick={handleAccept}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-sm text-center"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="py-1.5 px-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white font-mono text-[11px] font-medium transition-all cursor-pointer text-center"
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
