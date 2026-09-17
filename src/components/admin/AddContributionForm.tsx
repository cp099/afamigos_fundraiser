'use client';

import React, { useState, useRef } from 'react';
import { Student } from '@/lib/types';
import { PlusCircle, Check, Sparkles, UserPlus, AlertCircle } from 'lucide-react';
import { StudentSearchCombobox } from './StudentSearchCombobox';

interface AddContributionFormProps {
  students: Student[];
  onAddContribution: (studentId: string, studentName: string, amount: number, note?: string) => Promise<void>;
  onOpenRosterModal: () => void;
}

export function AddContributionForm({
  students,
  onAddContribution,
  onOpenRosterModal,
}: AddContributionFormProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [honeypot, setHoneypot] = useState<string>('');
  const lastSubmitTimeRef = useRef<number>(0);

  const amountInputRef = useRef<HTMLInputElement>(null);

  const quickAmounts = [100, 200, 500, 1000, 2000, 6000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Spam honeypot detection
    if (honeypot) {
      console.warn('Bot submission blocked.');
      return;
    }

    // Rapid double-click debounce (minimum 400ms between attempts)
    const now = Date.now();
    if (now - lastSubmitTimeRef.current < 400) {
      return;
    }
    lastSubmitTimeRef.current = now;

    const numericAmount = parseFloat(amount);
    if (!selectedStudentId) {
      setError('Please search and select a student from the class roster.');
      return;
    }
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid contribution amount greater than ₹0.');
      return;
    }

    const studentObj = students.find((s) => s.id === selectedStudentId);
    const studentName = studentObj ? studentObj.name : 'Unknown Student';

    setLoading(true);
    try {
      await onAddContribution(selectedStudentId, studentName, numericAmount, note);
      setSuccessMessage(`Recorded ₹${numericAmount.toLocaleString('en-IN')} for ${studentName}! 🎉`);
      setAmount('');
      setNote('');
      setSelectedStudentId('');

      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);

      // Rapid consecutive entry focus
      if (amountInputRef.current) {
        amountInputRef.current.focus();
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to record contribution.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="craft-panel rounded-3xl p-6 sm:p-8 border border-white/[0.09] mb-10 shadow-xl relative overflow-visible">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span>Record New Contribution</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Log student donations. Aggregates and public leaderboard update automatically with zero financial leaks.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenRosterModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all self-start sm:self-auto cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
          <span>Class Roster ({students.length})</span>
        </button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Anti-spam honeypot */}
        <input
          type="text"
          name="user_ref_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Searchable Student Autocomplete */}
          <div>
            <StudentSearchCombobox
              students={students}
              selectedStudentId={selectedStudentId}
              onSelectStudent={setSelectedStudentId}
              label="Search Student Name *"
              required={true}
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Contribution Amount (₹) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-black text-slate-400 text-sm">
                ₹
              </span>
              <input
                ref={amountInputRef}
                type="number"
                min="1"
                step="any"
                required
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl pl-8 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-mono font-bold"
              />
            </div>
          </div>
        </div>

        {/* Quick Amount Chips */}
        <div>
          <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Quick Shortcuts</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setAmount(q.toString())}
                className={`px-3 py-1 rounded-lg border text-xs font-mono font-bold transition-all cursor-pointer ${
                  amount === q.toString()
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                +₹{q.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Note */}
        <div>
          <label className="block text-[11px] font-medium text-slate-400 mb-1">
            Private Admin Note (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Room collection or cash receipt note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-md"
          >
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Contribution</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
