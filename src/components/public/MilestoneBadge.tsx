'use client';

import React from 'react';
import { MilestoneInfo } from '@/lib/types';

interface MilestoneBadgeProps {
  milestone: MilestoneInfo;
  percentage: number;
}

export function MilestoneBadge({ milestone, percentage }: MilestoneBadgeProps) {
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case '100+':
        return {
          cardBg: 'bg-amber-500/[0.08] border-amber-400/40 text-amber-300',
          pillBg: 'bg-amber-400 text-black font-black',
        };
      case '90-99':
        return {
          cardBg: 'bg-rose-500/[0.08] border-rose-400/40 text-rose-300',
          pillBg: 'bg-rose-500 text-white font-bold',
        };
      case '75-89':
        return {
          cardBg: 'bg-orange-500/[0.08] border-orange-400/30 text-orange-300',
          pillBg: 'bg-orange-500 text-white font-bold',
        };
      case '50-74':
        return {
          cardBg: 'bg-indigo-500/[0.08] border-indigo-400/30 text-indigo-300',
          pillBg: 'bg-indigo-500 text-white font-bold',
        };
      case '25-49':
        return {
          cardBg: 'bg-amber-500/[0.06] border-amber-400/25 text-amber-300',
          pillBg: 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40',
        };
      default:
        return {
          cardBg: 'bg-white/[0.03] border-white/[0.08] text-slate-300',
          pillBg: 'bg-white/10 text-slate-300 font-medium border border-white/10',
        };
    }
  };

  const styling = getTierBadge(milestone.tier);

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-2xl border backdrop-blur-md transition-all duration-300 ${styling.cardBg}`}
    >
      <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/40 border border-white/10 shrink-0 text-base sm:text-lg select-none">
        {milestone.emoji}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-left">
        <span className="text-xs sm:text-sm font-semibold tracking-tight text-white">
          {milestone.message}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-mono uppercase tracking-wider ${styling.pillBg}`}>
            {milestone.label}
          </span>
          <span className="text-xs font-mono font-bold text-slate-300">
            {percentage.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
}
