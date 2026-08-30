'use client';

import React, { useState } from 'react';
import { Contribution } from '@/lib/types';
import { formatCurrency, formatTimestamp } from '@/lib/utils';
import { AlertTriangle, Trash2, X, AlertCircle } from 'lucide-react';

interface DeleteConfirmModalProps {
  contribution: Contribution | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteConfirmModal({
  contribution,
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !contribution) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm(contribution.id);
      onClose();
    } catch (err: unknown) {
      console.error('Delete contribution error:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete contribution. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="craft-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-rose-500/30 shadow-2xl relative bg-[#0D1322]">
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute right-5 top-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">Delete this contribution?</h3>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          This action will permanently delete this record and immediately recompute total funds, class contributor counts, and leaderboard rankings.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Contribution Details Card */}
        <div className="bg-[#080C14] rounded-2xl p-4 border border-white/[0.08] mb-6 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Student:</span>
            <span className="font-bold text-white">{contribution.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Contribution Amount:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              {formatCurrency(contribution.amount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Recorded:</span>
            <span className="font-mono text-slate-300">
              {formatTimestamp(contribution.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-all disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-rose-600/30 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Contribution</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
