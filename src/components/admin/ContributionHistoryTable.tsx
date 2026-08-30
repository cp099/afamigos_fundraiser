'use client';

import React, { useState } from 'react';
import { Contribution } from '@/lib/types';
import { formatCurrency, formatTimestamp, getAvatarGradient, getInitials } from '@/lib/utils';
import { Search, Edit2, Trash2, ShieldAlert, FileText, ArrowUpDown } from 'lucide-react';

interface ContributionHistoryTableProps {
  contributions: Contribution[];
  onEdit: (contribution: Contribution) => void;
  onDelete: (contribution: Contribution) => void;
}

export function ContributionHistoryTable({
  contributions,
  onEdit,
  onDelete,
}: ContributionHistoryTableProps) {
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = contributions
    .filter((c) => c.studentName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortAsc ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));

  return (
    <div className="craft-panel rounded-3xl p-6 sm:p-8 border border-white/[0.09] shadow-xl">
      {/* Header with Search and Privacy Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Private Contribution Records</h2>
            <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3" /> Private Data
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Individual amounts shown here are strictly restricted to administrators and never exposed to the public.
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#080C14] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all text-xs font-mono font-semibold flex items-center gap-1 shrink-0"
            title="Toggle sort order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{sortAsc ? 'Oldest' : 'Newest'}</span>
          </button>
        </div>
      </div>

      {/* Content Table / Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-xs">
          <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2.5" />
          <p className="font-semibold text-slate-300">
            {search ? 'No contribution records match your search query.' : 'No contributions recorded yet.'}
          </p>
          <p className="text-slate-500 mt-0.5">
            {search ? 'Try searching another name.' : 'Use the form above to record your first contribution.'}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-3">Student</th>
                  <th className="pb-3 text-right">Amount</th>
                  <th className="pb-3 pl-8">Recorded At</th>
                  <th className="pb-3 text-right pr-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Student Info */}
                    <td className="py-3 pl-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${getAvatarGradient(
                            item.studentName
                          )} p-[1px] shrink-0`}
                        >
                          <div className="w-full h-full bg-[#080C14] rounded-[7px] flex items-center justify-center font-bold text-[10px] text-white">
                            {getInitials(item.studentName)}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white tracking-tight">
                            {item.studentName}
                          </div>
                          {item.note && (
                            <div className="text-[11px] text-slate-400 italic truncate max-w-xs">
                              {item.note}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-3 text-right font-mono font-bold text-emerald-400 text-sm">
                      {formatCurrency(item.amount)}
                    </td>

                    {/* Timestamp */}
                    <td className="py-3 pl-8 text-xs text-slate-400 font-mono">
                      {formatTimestamp(item.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="py-3 text-right pr-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-colors"
                          title="Edit Contribution"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 transition-colors"
                          title="Delete Contribution"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-2.5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="craft-card rounded-2xl p-3.5 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${getAvatarGradient(
                        item.studentName
                      )} p-[1px] shrink-0`}
                    >
                      <div className="w-full h-full bg-[#080C14] rounded-[7px] flex items-center justify-center font-bold text-[10px] text-white">
                        {getInitials(item.studentName)}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{item.studentName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {formatTimestamp(item.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="font-mono font-bold text-emerald-400 text-sm">
                    {formatCurrency(item.amount)}
                  </div>
                </div>

                {item.note && (
                  <div className="text-xs text-slate-400 bg-[#080C14] rounded-lg p-2 italic">
                    {item.note}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
