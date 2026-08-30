'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '../ui/BrandLogo';
import { ExternalLink, LogOut, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AdminNavbarProps {
  onSyncAggregates?: () => void;
  isSyncing?: boolean;
}

export function AdminNavbar({ onSyncAggregates, isSyncing }: AdminNavbarProps) {
  const { user, signOut, isFirebaseActive } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#090D16]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Logo & Admin Badge */}
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" showSubtitle={false} href="/admin" />
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Admin Console</span>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mode Indicator (Firebase vs Demo) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-slate-400">
            <Database className="w-3 h-3 text-indigo-400" />
            <span className="hidden md:inline">Storage:</span>
            <span className={isFirebaseActive ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
              {isFirebaseActive ? 'Firebase Live' : 'Demo / Local'}
            </span>
          </div>

          {/* Sync Button */}
          {onSyncAggregates && (
            <button
              onClick={onSyncAggregates}
              disabled={isSyncing}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-50"
              title="Force recalculate & sync public aggregates"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : 'text-indigo-400'}`} />
              <span className="hidden sm:inline">Sync Aggregates</span>
            </button>
          )}

          {/* View Public Site */}
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-xs font-semibold text-indigo-300 hover:text-indigo-200 transition-all"
          >
            <span>Live Campaign</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* User & Sign Out */}
          {user && (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-all"
              title="Sign out of Admin Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
