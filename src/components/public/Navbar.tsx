'use client';

import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { Sparkles, Activity } from 'lucide-react';

interface NavbarProps {
  percentage?: number;
}

export function Navbar({}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070A11]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="min-w-0">
          <BrandLogo size="md" />
        </div>

        {/* Navigation Links (Public Visitors) */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
            className="hidden sm:inline-block hover:text-white transition-colors"
          >
            <span>The Mission</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
