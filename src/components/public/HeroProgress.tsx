'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, CheckCircle2, ChevronRight, TrendingUp, Sparkles, GraduationCap, HeartHandshake } from 'lucide-react';
import { PublicCampaignData } from '@/lib/types';
import { formatCurrency, getMilestoneInfo } from '@/lib/utils';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { MilestoneBadge } from './MilestoneBadge';

interface HeroProgressProps {
  data: PublicCampaignData;
}

export function HeroProgress({ data }: HeroProgressProps) {
  const { totalRaised, target, contributorCount, percentage } = data;
  const clampedVisualPercentage = Math.min(100, Math.max(0, percentage));
  const isTargetAchieved = percentage >= 100;
  const milestone = getMilestoneInfo(percentage);
  const remaining = Math.max(0, target - totalRaised);

  // ₹4,000 sponsors 1 student's education for an entire year through CSA
  const studentsSponsored = (totalRaised / 4000).toFixed(1);

  const checkpoints = [
    { percent: 25, labelShort: '25%', labelFull: '25% Kickoff' },
    { percent: 50, labelShort: '50%', labelFull: '50% Halfway' },
    { percent: 75, labelShort: '75%', labelFull: '75% Final Leg' },
    { percent: 100, labelShort: 'Goal', labelFull: '100% Target' },
  ];

  return (
    <section id="progress" className="relative pt-6 pb-12 sm:pt-16 sm:pb-24 overflow-hidden bg-grid-pattern">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Campaign & Class Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 mb-4 sm:mb-6 shadow-inner max-w-full"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
          <span className="font-mono uppercase tracking-widest text-[9px] sm:text-[11px] text-slate-300 truncate">
            AFA MIGOS • Class Contribution Drive • CSA, CHRIST (Deemed to be University)
          </span>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-3 sm:mb-4 leading-[1.12]"
        >
          <span className="block">One Class. One Goal.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 mt-1 sm:mt-2">
            One Impact.
          </span>
        </motion.h1>

        {/* Mission Subtitle (Accurately crediting CSA as organizer and AFA MIGOS as contributing class drive) */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl mx-auto mb-5 sm:mb-6 leading-relaxed font-normal px-2"
        >
          A classroom fundraising drive by <strong className="text-amber-400 font-semibold">AFA MIGOS</strong> contributing
          towards the <strong className="text-white font-semibold">Child Sponsorship Programme (CSP)</strong> organized by the{' '}
          <strong className="text-slate-200 font-semibold">Centre for Social Action (CSA)</strong> at{' '}
          <strong className="text-white font-semibold">CHRIST (Deemed to be University)</strong>.
        </motion.p>

        {/* TeamTrees Impact Equation Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-amber-500/[0.08] border border-amber-400/20 text-amber-300 text-[10px] sm:text-xs font-mono font-semibold mb-6 sm:mb-8 max-w-full text-center"
        >
          <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
          <span className="leading-tight">
            ₹4,000 = 1 Year of School Fees, Books, Uniforms &amp; Nutrition for 1 Child
          </span>
        </motion.div>

        {/* Milestone Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.22 }}
          className="mb-8 sm:mb-10"
        >
          <MilestoneBadge milestone={milestone} percentage={percentage} />
        </motion.div>

        {/* Main Campaign Elevation Panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="relative craft-panel rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-12 shadow-2xl border border-white/[0.09] max-w-4xl mx-auto overflow-hidden"
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

          {/* Metric Block */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-400 mb-1.5 sm:mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Total Class Funds Raised</span>
            </span>

            <div className="text-4xl sm:text-7xl lg:text-8xl font-mono font-black tracking-tight text-white">
              <AnimatedCounter
                value={totalRaised}
                prefix="₹"
                className="font-black text-white"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 text-xs sm:text-sm text-slate-400 font-medium">
              <span>of</span>
              <span className="font-mono font-bold text-slate-200">{formatCurrency(target)}</span>
              <span>target</span>
              {!isTargetAchieved ? (
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-amber-400/20">
                  {formatCurrency(remaining)} remaining
                </span>
              ) : (
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Target Achieved!
                </span>
              )}
            </div>

            {/* Equivalent Child Sponsorship Impact Pill */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-[10px] sm:text-xs font-semibold max-w-full text-center leading-tight">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>≈ {studentsSponsored} Full-Year Child Educations Sponsored</span>
            </div>
          </div>

          {/* Checkpoint Progress Track */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-1.5 sm:gap-2 text-indigo-300">
                <span className="font-mono text-sm sm:text-lg font-black text-amber-400">
                  {percentage.toFixed(1)}%
                </span>
                <span className="text-slate-300 text-[11px] sm:text-xs">completed</span>
              </div>
              <div className="text-slate-400 font-mono text-[11px] sm:text-xs flex items-center gap-1">
                <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400" />
                <span>Target: {formatCurrency(target)}</span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="relative">
              <div className="h-4 sm:h-6 w-full bg-[#080C14] rounded-full p-0.5 sm:p-1 border border-white/[0.08] overflow-hidden relative">
                {/* Progress Fill */}
                <motion.div
                  className="h-full rounded-full relative overflow-hidden bg-gradient-to-r from-indigo-500 via-amber-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${clampedVisualPercentage}%` }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-subtle-shimmer" />
                </motion.div>
              </div>

              {/* Bounded Checkpoints */}
              <div className="relative w-full h-8 mt-2 overflow-visible">
                {checkpoints.map((cp) => {
                  const passed = percentage >= cp.percent;
                  const isFirst = cp.percent === 25;
                  const isLast = cp.percent === 100;

                  return (
                    <div
                      key={cp.percent}
                      className="flex flex-col items-center absolute top-0"
                      style={{
                        left: isLast ? 'auto' : `${cp.percent}%`,
                        right: isLast ? '0px' : 'auto',
                        transform: isLast ? 'none' : isFirst ? 'translateX(-30%)' : 'translateX(-50%)',
                      }}
                    >
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mb-1 transition-colors ${
                          passed ? 'bg-amber-400 shadow-sm shadow-amber-400/50' : 'bg-slate-700'
                        }`}
                      />
                      <span
                        className={`font-mono text-[8px] sm:text-[10px] whitespace-nowrap ${
                          passed ? 'text-amber-300 font-bold' : 'text-slate-500'
                        }`}
                      >
                        <span className="inline sm:hidden">{cp.labelShort}</span>
                        <span className="hidden sm:inline">{cp.labelFull}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-6 sm:pt-10 border-t border-white/[0.08] text-left">
            {/* Contributors */}
            <div className="craft-card rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-black text-white font-mono leading-tight">
                  <AnimatedCounter value={contributorCount} formatAsCurrency={false} />
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                  Class Donors
                </div>
              </div>
            </div>

            {/* Goal Target */}
            <div className="craft-card rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-black text-white font-mono leading-tight truncate">
                  {formatCurrency(target)}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate">
                  Campaign Target
                </div>
              </div>
            </div>

            {/* Jump Link */}
            <a
              href="#leaderboard"
              className="col-span-2 sm:col-span-1 craft-card-interactive rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between group cursor-pointer border-amber-400/20 bg-amber-500/[0.04]"
            >
              <div>
                <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>Leaderboard</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">
                  See student rankings
                </div>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.06] flex items-center justify-center group-hover:translate-x-1 transition-transform text-white">
                <ChevronRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
