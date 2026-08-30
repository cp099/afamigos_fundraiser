'use client';

import React, { useState } from 'react';
import { Target, X, Save, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface TargetConfigModalProps {
  currentTarget: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTarget: (newTarget: number) => Promise<void>;
}

function TargetConfigInnerForm({
  currentTarget,
  onClose,
  onUpdateTarget,
}: {
  currentTarget: number;
  onClose: () => void;
  onUpdateTarget: (newTarget: number) => Promise<void>;
}) {
  const [targetVal, setTargetVal] = useState<string>(currentTarget.toString());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numeric = parseFloat(targetVal);
    if (isNaN(numeric) || numeric <= 0) {
      setError('Please enter a valid fundraising target greater than ₹0.');
      return;
    }

    setLoading(true);
    try {
      await onUpdateTarget(numeric);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update target.');
    } finally {
      setLoading(false);
    }
  };

  const presetTargets = [15000, 20000, 25000, 30000, 50000];

  return (
    <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-[#0D1322]">
      <button
        onClick={onClose}
        className="absolute right-5 top-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
        <Target className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold text-white mb-1">Set Campaign Target</h3>
      <p className="text-xs text-slate-400 mb-6">
        Changes are updated across the live public campaign and progress visualizations.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Fundraising Target (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
              ₹
            </span>
            <input
              type="number"
              min="100"
              step="100"
              required
              value={targetVal}
              onChange={(e) => setTargetVal(e.target.value)}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm text-white font-mono font-bold focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-semibold text-slate-400 mb-2 block">
            Quick Target Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {presetTargets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setTargetVal(p.toString())}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-all ${
                  targetVal === p.toString()
                    ? 'bg-amber-500 text-black font-bold border-amber-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {formatCurrency(p)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Update Target</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export function TargetConfigModal({
  currentTarget,
  isOpen,
  onClose,
  onUpdateTarget,
}: TargetConfigModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <TargetConfigInnerForm
        key={currentTarget}
        currentTarget={currentTarget}
        onClose={onClose}
        onUpdateTarget={onUpdateTarget}
      />
    </div>
  );
}
