'use client';

import React, { useState } from 'react';
import { Student } from '@/lib/types';
import { X, UserPlus, Users, Search, Check, AlertCircle } from 'lucide-react';
import { getAvatarGradient, getInitials } from '@/lib/utils';

interface RosterManagerModalProps {
  students: Student[];
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (name: string, rollNumber?: string) => Promise<Student>;
}

export function RosterManagerModal({
  students,
  isOpen,
  onClose,
  onAddStudent,
}: RosterManagerModalProps) {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmed = name.trim();
    if (!trimmed) {
      setError('Please enter a student name.');
      return;
    }

    setLoading(true);
    try {
      const created = await onAddStudent(trimmed, rollNumber);
      setSuccess(`Added ${created.name} to class roster!`);
      setName('');
      setRollNumber('');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add student.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-[#0D1322] max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <Users className="w-5 h-5 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">Class Student Roster</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Predefined class list ensures consistent names and prevents spelling duplicates.
        </p>

        {/* Add Student Form */}
        <form onSubmit={handleAdd} className="bg-[#0B0F19] rounded-2xl p-4 border border-white/10 mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
            <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>Add New Student</span>
          </div>

          {success && (
            <div className="mb-3 p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{success}</span>
            </div>
          )}

          {error && (
            <div className="mb-3 p-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                required
                placeholder="Full Student Name (e.g. Rahul Verma)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Roll # (optional)"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-1"
            >
              {loading ? 'Adding...' : 'Add to Roster'}
            </button>
          </div>
        </form>

        {/* Search & List */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xs font-bold text-slate-300">
            Current Class Roster ({students.length})
          </span>
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter roster..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0B0F19] border border-white/10 rounded-lg pl-7 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto flex-grow space-y-2 pr-1 divide-y divide-white/5">
          {filtered.map((student) => (
            <div key={student.id} className="pt-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${getAvatarGradient(
                    student.name
                  )} p-[1px]`}
                >
                  <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center font-bold text-[10px] text-white">
                    {getInitials(student.name)}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-white">{student.name}</span>
                  {student.rollNumber && (
                    <span className="text-[10px] text-slate-400 ml-1.5 font-mono">
                      #{student.rollNumber}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Active
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
