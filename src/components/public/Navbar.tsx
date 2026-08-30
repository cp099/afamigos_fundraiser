'use client';

import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { Sparkles, Activity } from 'lucide-react';

interface NavbarProps {
  percentage?: number;
}

export function Navbar({ percentage = 0 }: NavbarProps) {
  const isTargetAchieved = percentage >= 100;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070A11]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="min-w-0">
          <BrandLogo size="md" />
        </div>

        {/* Navigation & Live Status */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          {/* Live Status Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider">
              {isTargetAchieved ? 'Goal Surpassed! 🎉' : 'Live Drive Active'}
            </span>
          </div>

          {/* Quick Anchor Links (Public Visitors) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a
              href="#progress"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Progress</span>
            </a>
            <a
              href="#leaderboard"
              className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-400/90"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Leaderboard</span>
            </a>
            <a
              href="#impact"
              className="hover:text-white transition-colors"
            >
              <span>The Mission</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
