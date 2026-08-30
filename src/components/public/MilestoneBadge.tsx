'use client';

import React from 'react';
import { MilestoneInfo } from '@/lib/types';
import { Trophy, Flame, TrendingUp, Zap, Sparkles, Activity } from 'lucide-react';

interface MilestoneBadgeProps {
  milestone: MilestoneInfo;
  percentage: number;
}

export function MilestoneBadge({ milestone, percentage }: MilestoneBadgeProps) {
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case '100+':
        return {
          cardBg: 'bg-amber-500/[0.08] border-amber-400/40 text-amber-300 shadow-lg shadow-amber-500/10',
          pillBg: 'bg-amber-400 text-black font-black',
          iconBg: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
          icon: Trophy,
        };
      case '90-99':
        return {
          cardBg: 'bg-rose-500/[0.08] border-rose-400/40 text-rose-300',
          pillBg: 'bg-rose-500 text-white font-bold',
          iconBg: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
          icon: Flame,
        };
      case '75-89':
        return {
          cardBg: 'bg-orange-500/[0.08] border-orange-400/30 text-orange-300',
          pillBg: 'bg-orange-500 text-white font-bold',
          iconBg: 'bg-orange-500/20 text-orange-300 border-orange-400/30',
          icon: TrendingUp,
        };
      case '50-74':
        return {
          cardBg: 'bg-indigo-500/[0.08] border-indigo-400/30 text-indigo-300',
          pillBg: 'bg-indigo-500 text-white font-bold',
          iconBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
          icon: Zap,
        };
      case '25-49':
        return {
          cardBg: 'bg-amber-500/[0.06] border-amber-400/25 text-amber-300',
          pillBg: 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40',
          iconBg: 'bg-amber-500/15 text-amber-300 border-amber-400/20',
          icon: Sparkles,
        };
      default:
        return {
          cardBg: 'bg-white/[0.03] border-white/[0.08] text-slate-300',
          pillBg: 'bg-white/10 text-slate-300 font-medium border border-white/10',
          iconBg: 'bg-white/[0.06] text-indigo-400 border-white/[0.08]',
          icon: Activity,
        };
    }
  };

  const styling = getTierBadge(milestone.tier);
  const IconComponent = styling.icon;

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl border backdrop-blur-md transition-all duration-300 ${styling.cardBg} max-w-full`}
    >
      <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl border shrink-0 ${styling.iconBg}`}>
        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-left min-w-0">
        <span className="text-xs sm:text-sm font-semibold tracking-tight text-white truncate">
          {milestone.message}
        </span>
        <div className="flex items-center gap-2 shrink-0">
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
