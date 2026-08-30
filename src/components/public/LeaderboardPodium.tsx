'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal, Award, Flame } from 'lucide-react';
import { PublicLeaderboardEntry } from '@/lib/types';
import { getAvatarGradient, getInitials } from '@/lib/utils';

interface LeaderboardPodiumProps {
  topThree: PublicLeaderboardEntry[];
}

export function LeaderboardPodium({ topThree }: LeaderboardPodiumProps) {
  const first = topThree.find((e) => e.rank === 1) || topThree[0];
  const second = topThree.find((e) => e.rank === 2) || topThree[1];
  const third = topThree.find((e) => e.rank === 3) || topThree[2];

  if (!first) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12 px-1 sm:px-0">
      {/* 3-Column Stepped Podium (Unique Sequential Ranks: #2 on Left, #1 in Center, #3 on Right) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 items-end justify-center pt-6 sm:pt-8">
        {/* SECOND PLACE (Left) */}
        {second ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col items-center w-full"
          >
            <div className="relative w-full craft-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-slate-400/20 text-center flex flex-col items-center group hover:border-slate-300/40 transition-all bg-gradient-to-b from-slate-400/[0.05] via-[#101624] to-[#0E131F]">
              {/* Medal Badge */}
              <div className="absolute -top-3.5 sm:-top-4 w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl metallic-silver-badge p-[1px] flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#080C14] rounded-[7px] sm:rounded-[10px] flex items-center justify-center text-slate-200">
                  <Medal className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>

              {/* Avatar Initial */}
              <div className="mt-2 sm:mt-3 mb-2 sm:mb-3 relative">
                <div
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr ${getAvatarGradient(
                    second.name
                  )} p-[1.5px] sm:p-[2px] shadow-sm`}
                >
                  <div className="w-full h-full bg-[#0C111C] rounded-[10px] sm:rounded-[13px] flex items-center justify-center font-bold text-xs sm:text-base text-white">
                    {getInitials(second.name)}
                  </div>
                </div>
                <div className="absolute -bottom-1.5 -right-1 sm:-bottom-2 sm:-right-1 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-slate-200 text-black font-mono font-black text-[8px] sm:text-[10px] shadow">
                  #2
                </div>
              </div>

              {/* Student Name */}
              <h3 className="text-xs sm:text-base font-bold text-white mb-0.5 sm:mb-1 tracking-tight truncate max-w-full px-1">
                {second.name}
              </h3>

              {/* Status Pill */}
              <div className="flex items-center gap-1 mt-1 sm:mt-2">
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-300 bg-white/[0.06] px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-white/[0.08]">
                  Rank #2
                </span>
              </div>
            </div>

            {/* Stepped Base */}
            <div className="flex w-full h-8 sm:h-12 bg-gradient-to-b from-slate-800/40 to-slate-900/60 rounded-b-xl sm:rounded-b-2xl border-x border-b border-slate-700/30 items-center justify-center text-slate-300 text-[10px] sm:text-xs font-mono font-bold">
              RANK 2
            </div>
          </motion.div>
        ) : (
          <div />
        )}

        {/* FIRST PLACE (Center - Elevated Champion) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="flex flex-col items-center w-full"
        >
          <div className="relative w-full craft-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-8 border-amber-400/50 text-center flex flex-col items-center group hover:border-amber-400/70 transition-all bg-gradient-to-b from-amber-500/[0.12] via-[#121827] to-[#0E131F] shadow-lg shadow-amber-500/10">
            {/* Top Crown Emblem */}
            <div className="absolute -top-4 sm:-top-5 w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl metallic-gold-badge p-[1.5px] flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#080C14] rounded-[10px] sm:rounded-[13px] flex items-center justify-center text-amber-400">
                <Crown className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-amber-400/30" />
              </div>
            </div>

            {/* Avatar Initial */}
            <div className="mt-2.5 sm:mt-4 mb-2 sm:mb-4 relative">
              <div className="w-12 h-12 sm:w-18 sm:h-18 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 p-[2px] shadow-lg shadow-amber-500/25">
                <div className="w-full h-full bg-[#0C111C] rounded-[10px] sm:rounded-[14px] flex items-center justify-center font-black text-sm sm:text-2xl text-amber-300">
                  {getInitials(first.name)}
                </div>
              </div>
              <div className="absolute -bottom-1.5 -right-1 sm:-bottom-2 sm:-right-1 px-1.5 py-0.2 sm:px-2.5 sm:py-0.5 rounded-full bg-amber-400 text-black font-mono font-black text-[9px] sm:text-xs border sm:border-2 border-[#080C14] flex items-center gap-0.5 shadow">
                <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-black text-black" /> #1
              </div>
            </div>

            {/* Student Name */}
            <h3 className="text-xs sm:text-xl font-extrabold text-white mb-0.5 sm:mb-1 tracking-tight truncate max-w-full px-1">
              {first.name}
            </h3>

            {/* Status Pill */}
            <div className="flex items-center gap-1 mt-1 sm:mt-2">
              <span className="text-[8px] sm:text-xs font-mono uppercase tracking-wider font-bold text-amber-300 bg-amber-400/15 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-400/30">
                Rank #1 Leader
              </span>
            </div>
          </div>

          {/* Stepped Base */}
          <div className="flex w-full h-12 sm:h-20 bg-gradient-to-b from-amber-500/15 via-slate-800/40 to-slate-900/60 rounded-b-xl sm:rounded-b-2xl border-x border-b border-amber-500/30 items-center justify-center text-amber-300 text-[10px] sm:text-xs font-mono font-black shadow-sm">
            RANK 1
          </div>
        </motion.div>

        {/* THIRD PLACE (Right) */}
        {third ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-col items-center w-full"
          >
            <div className="relative w-full craft-card rounded-2xl sm:rounded-3xl p-3 sm:p-6 border-amber-700/25 text-center flex flex-col items-center group hover:border-amber-600/40 transition-all bg-gradient-to-b from-amber-700/[0.06] via-[#101624] to-[#0E131F]">
              {/* Medal Badge */}
              <div className="absolute -top-3.5 sm:-top-4 w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl metallic-bronze-badge p-[1px] flex items-center justify-center shadow-md">
                <div className="w-full h-full bg-[#080C14] rounded-[7px] sm:rounded-[10px] flex items-center justify-center text-amber-500">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>

              {/* Avatar Initial */}
              <div className="mt-2 sm:mt-3 mb-2 sm:mb-3 relative">
                <div
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr ${getAvatarGradient(
                    third.name
                  )} p-[1.5px] sm:p-[2px] shadow-sm`}
                >
                  <div className="w-full h-full bg-[#0C111C] rounded-[10px] sm:rounded-[13px] flex items-center justify-center font-bold text-xs sm:text-base text-white">
                    {getInitials(third.name)}
                  </div>
                </div>
                <div className="absolute -bottom-1.5 -right-1 sm:-bottom-2 sm:-right-1 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full bg-amber-600 text-white font-mono font-black text-[8px] sm:text-[10px] shadow">
                  #3
                </div>
              </div>

              {/* Student Name */}
              <h3 className="text-xs sm:text-base font-bold text-white mb-0.5 sm:mb-1 tracking-tight truncate max-w-full px-1">
                {third.name}
              </h3>

              {/* Status Pill */}
              <div className="flex items-center gap-1 mt-1 sm:mt-2">
                <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-300 bg-white/[0.06] px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full border border-white/[0.08]">
                  Rank #3
                </span>
              </div>
            </div>

            {/* Stepped Base */}
            <div className="flex w-full h-6 sm:h-8 bg-gradient-to-b from-amber-950/20 to-slate-900/60 rounded-b-xl sm:rounded-b-2xl border-x border-b border-amber-800/30 items-center justify-center text-slate-300 text-[9px] sm:text-xs font-mono font-bold">
              RANK 3
            </div>
          </motion.div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
