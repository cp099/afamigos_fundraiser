'use client';

import React, { useState } from 'react';
import { Contribution, Student } from '@/lib/types';
import { X, Save, AlertCircle } from 'lucide-react';
import { StudentSearchCombobox } from './StudentSearchCombobox';

interface EditContributionModalProps {
  contribution: Contribution | null;
  students: Student[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, studentId: string, studentName: string, amount: number, note?: string) => Promise<void>;
}

function EditContributionInnerForm({
  contribution,
  students,
  onClose,
  onSave,
}: {
  contribution: Contribution;
  students: Student[];
  onClose: () => void;
  onSave: (id: string, studentId: string, studentName: string, amount: number, note?: string) => Promise<void>;
}) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(contribution.studentId);
  const [amount, setAmount] = useState<string>(contribution.amount.toString());
  const [note, setNote] = useState<string>(contribution.note || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const numericAmount = parseFloat(amount);
    if (!selectedStudentId) {
      setError('Please select a student.');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount greater than ₹0.');
      return;
    }

    const studentObj = students.find((s) => s.id === selectedStudentId);
    const studentName = studentObj ? studentObj.name : contribution.studentName;

    setLoading(true);
    try {
      await onSave(contribution.id, selectedStudentId, studentName, numericAmount, note);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update contribution.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="craft-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-white/[0.12] shadow-2xl relative bg-[#0C111C]">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>

      <h3 className="text-xl font-bold text-white mb-1">Edit Contribution</h3>
      <p className="text-xs text-slate-400 mb-6">
        Updating will automatically recalculate class totals and public leaderboard rankings.
      </p>

      {error && (
        <div className="mb-5 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Searchable student picker */}
        <div>
          <StudentSearchCombobox
            students={students}
            selectedStudentId={selectedStudentId}
            onSelectStudent={setSelectedStudentId}
            label="Select Contributor Student"
            required={true}
          />
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Contribution Amount (₹) *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-black text-slate-400 text-sm">₹</span>
            <input
              type="number"
              min="1"
              step="any"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white font-mono font-bold focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">
            Private Note (Optional)
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl px-4 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-md"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export function EditContributionModal({
  contribution,
  students,
  isOpen,
  onClose,
  onSave,
}: EditContributionModalProps) {
  if (!isOpen || !contribution) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <EditContributionInnerForm
        key={contribution.id}
        contribution={contribution}
        students={students}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
}
