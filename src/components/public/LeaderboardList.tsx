'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Sparkles, UserCheck, X } from 'lucide-react';
import { PublicLeaderboardEntry } from '@/lib/types';
import { getAvatarGradient, getInitials } from '@/lib/utils';

interface LeaderboardListProps {
  entries: PublicLeaderboardEntry[];
}

export function LeaderboardList({ entries }: LeaderboardListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter entries based on search query
  const filteredEntries = entries.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If entire leaderboard is empty
  if (entries.length === 0) {
    return (
      <div className="craft-panel rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center max-w-xl mx-auto border border-white/[0.08]">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-3 sm:mb-4">
          <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white mb-1">
          Leaderboard is warming up...
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm">
          Be the first from AFA MIGOS to contribute for the Child Sponsorship Programme! 🚀
        </p>
      </div>
    );
  }

  // Ranks 4 and onward (or all entries if search is active)
  const listItems = searchQuery ? filteredEntries : filteredEntries.filter((e) => e.rank > 3);

  return (
    <div className="w-full max-w-4xl mx-auto px-1 sm:px-0">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {searchQuery
              ? `Search Results (${filteredEntries.length})`
              : `All Active Challengers (${entries.length})`}
          </span>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0C111C] border border-white/[0.08] rounded-xl pl-8 sm:pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Ranks List */}
      {listItems.length === 0 ? (
        <div className="craft-card rounded-2xl p-6 sm:p-8 text-center text-slate-400 text-xs">
          No students found matching &ldquo;{searchQuery}&rdquo;.
        </div>
      ) : (
        <div className="space-y-2">
          {listItems.map((entry, index) => {
            const isTopThreeInSearch = searchQuery && entry.rank <= 3;

            return (
              <motion.div
                key={entry.studentId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.25) }}
                className={`craft-card-interactive rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-6 sm:py-3.5 flex items-center justify-between gap-2.5 sm:gap-4 ${
                  isTopThreeInSearch
                    ? 'border-amber-400/30 bg-amber-500/[0.04]'
                    : ''
                }`}
              >
                {/* Left: Rank & Avatar & Name */}
                <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                  {/* Rank Badge */}
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-mono font-black text-[11px] sm:text-xs shrink-0 ${
                      entry.rank === 1
                        ? 'bg-amber-400 text-black shadow-sm'
                        : entry.rank === 2
                        ? 'bg-slate-300 text-slate-950 shadow-sm'
                        : entry.rank === 3
                        ? 'bg-amber-700 text-white shadow-sm'
                        : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                    }`}
                  >
                    #{entry.rank}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-tr ${getAvatarGradient(
                      entry.name
                    )} p-[1.2px] sm:p-[1.5px] shrink-0`}
                  >
                    <div className="w-full h-full bg-[#080C14] rounded-[7px] sm:rounded-[9px] flex items-center justify-center font-bold text-[10px] sm:text-xs text-white">
                      {getInitials(entry.name)}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-base text-white tracking-tight truncate">
                      {entry.name}
                    </div>
                    <div className="text-[9px] sm:text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <UserCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">Class Contributor</span>
                    </div>
                  </div>
                </div>

                {/* Right: Status Pill (Strictly unique sequential rank) */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <span className="text-[10px] sm:text-xs font-mono font-semibold text-slate-400 bg-white/[0.04] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border border-white/[0.06]">
                    Rank #{entry.rank}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
