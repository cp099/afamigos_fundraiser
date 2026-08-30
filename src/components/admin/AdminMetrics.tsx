'use client';

import React from 'react';
import { Users, TrendingUp, DollarSign, Edit3 } from 'lucide-react';
import { formatCurrency, getMilestoneInfo } from '@/lib/utils';
import { AnimatedCounter } from '../ui/AnimatedCounter';

interface AdminMetricsProps {
  totalRaised: number;
  target: number;
  contributorCount: number;
  totalContributionsCount: number;
  onEditTarget: () => void;
}

export function AdminMetrics({
  totalRaised,
  target,
  contributorCount,
  totalContributionsCount,
  onEditTarget,
}: AdminMetricsProps) {
  const percentage = target > 0 ? (totalRaised / target) * 100 : 0;
  const milestone = getMilestoneInfo(percentage);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* 1. Total Raised */}
      <div className="craft-card rounded-2xl p-5 border border-indigo-500/30 bg-gradient-to-br from-indigo-950/30 to-[#0F1422] relative overflow-hidden">
        <div className="flex items-center justify-between text-indigo-400 mb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
            Total Funds Raised
          </span>
          <DollarSign className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white font-mono">
          <AnimatedCounter value={totalRaised} prefix="₹" />
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1">
          <span>Target: {formatCurrency(target)}</span>
        </div>
      </div>

      {/* 2. Target & Edit */}
      <div className="craft-card rounded-2xl p-5 relative">
        <div className="flex items-center justify-between text-amber-400 mb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
            Campaign Target
          </span>
          <button
            onClick={onEditTarget}
            className="p-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-amber-300 transition-colors"
            title="Edit Campaign Target"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white font-mono">
          {formatCurrency(target)}
        </div>
        <div className="text-[11px] font-mono text-amber-400/90 mt-1 font-semibold">
          {percentage >= 100 ? '🎉 Goal Achieved!' : `${formatCurrency(Math.max(0, target - totalRaised))} remaining`}
        </div>
      </div>

      {/* 3. Goal Progress & Milestone */}
      <div className="craft-card rounded-2xl p-5">
        <div className="flex items-center justify-between text-emerald-400 mb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
            Progress &amp; Milestone
          </span>
          <TrendingUp className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white font-mono">
          {percentage.toFixed(1)}%
        </div>
        <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1 truncate font-mono">
          <span>{milestone.emoji}</span>
          <span className="truncate">{milestone.label}</span>
        </div>
      </div>

      {/* 4. Contributors & Transactions */}
      <div className="craft-card rounded-2xl p-5">
        <div className="flex items-center justify-between text-cyan-400 mb-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300">
            Class Donors
          </span>
          <Users className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-2xl sm:text-3xl font-black text-white font-mono">
          {contributorCount}
        </div>
        <div className="text-[11px] font-mono text-slate-400 mt-1">
          {totalContributionsCount} logged entries
        </div>
      </div>
    </div>
  );
}
