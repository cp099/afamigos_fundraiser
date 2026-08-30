'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Student } from '@/lib/types';
import { Search, ChevronDown, X, Check, Sparkles } from 'lucide-react';
import { getAvatarGradient, getInitials } from '@/lib/utils';

interface StudentSearchComboboxProps {
  students: Student[];
  selectedStudentId: string;
  onSelectStudent: (studentId: string) => void;
  label?: string;
  required?: boolean;
}

export function StudentSearchCombobox({
  students,
  selectedStudentId,
  onSelectStudent,
  label = 'Search & Select Student *',
  required = true,
}: StudentSearchComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const activeStudents = students.filter((s) => s.active !== false);

  const selectedStudent = activeStudents.find((s) => s.id === selectedStudentId);

  // Filter students based on search query
  const filteredStudents = activeStudents.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const items = listRef.current.querySelectorAll('[data-combobox-item]');
      if (items[highlightedIndex]) {
        (items[highlightedIndex] as HTMLElement).scrollIntoView({
          block: 'nearest',
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setSearchQuery('');
    setHighlightedIndex(0);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 50);
  };

  const handleSelect = (studentId: string) => {
    onSelectStudent(studentId);
    setIsOpen(false);
    setSearchQuery('');
    setHighlightedIndex(0);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectStudent('');
    setSearchQuery('');
    setHighlightedIndex(0);
    handleOpen();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        handleOpen();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < filteredStudents.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredStudents.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredStudents[highlightedIndex]) {
        handleSelect(filteredStudents[highlightedIndex].id);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-slate-400 font-normal font-sans">
          {activeStudents.length} Students in Roster
        </span>
      </label>

      {/* Selected Student Trigger Button */}
      {!isOpen && selectedStudent ? (
        <div
          onClick={handleOpen}
          className="w-full bg-[#080C14] border border-amber-500/30 hover:border-amber-400/50 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2.5 transition-all cursor-pointer group bg-gradient-to-r from-amber-500/[0.04] to-transparent shadow-sm"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${getAvatarGradient(
                selectedStudent.name
              )} p-[1.2px] shrink-0`}
            >
              <div className="w-full h-full bg-[#080C14] rounded-[6px] flex items-center justify-center font-bold text-[10px] text-white">
                {getInitials(selectedStudent.name)}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-white tracking-tight truncate flex items-center gap-1.5">
                <span>{selectedStudent.name}</span>
                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              </div>
              <div className="text-[10px] text-amber-300/80 font-mono">
                Selected Class Contributor
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Change student"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Search Input Box */
        <div className="relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              required={required && !selectedStudentId}
              placeholder="Type to search student name (e.g. Chirag, Aditi)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHighlightedIndex(0);
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              className="w-full bg-[#080C14] border border-white/[0.08] focus:border-indigo-500 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-slate-400">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setHighlightedIndex(0);
                  }}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-indigo-400' : ''}`}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Dropdown Results Menu */}
      {isOpen && (
        <div
          ref={listRef}
          className="absolute z-50 left-0 right-0 mt-2 bg-[#0C111C] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden max-h-64 flex flex-col backdrop-blur-xl"
        >
          {/* Status Header */}
          <div className="px-3.5 py-2 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{filteredStudents.length} Matching Students</span>
            </span>
            <span className="text-[10px] text-slate-500">↑↓ to navigate • ↵ to select</span>
          </div>

          {/* List items */}
          <div className="overflow-y-auto divide-y divide-white/[0.04] p-1 space-y-0.5">
            {filteredStudents.length === 0 ? (
              <div className="py-6 px-4 text-center text-xs text-slate-400">
                No students found matching &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredStudents.map((student, index) => {
                const isSelected = student.id === selectedStudentId;
                const isHighlighted = index === highlightedIndex;

                return (
                  <button
                    key={student.id}
                    type="button"
                    data-combobox-item
                    onClick={() => handleSelect(student.id)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isHighlighted
                        ? 'bg-indigo-600/20 text-white'
                        : isSelected
                        ? 'bg-white/[0.05] text-white'
                        : 'text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-md bg-gradient-to-tr ${getAvatarGradient(
                          student.name
                        )} p-[1px] shrink-0`}
                      >
                        <div className="w-full h-full bg-[#080C14] rounded-[5px] flex items-center justify-center font-bold text-[9px] text-white">
                          {getInitials(student.name)}
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold truncate">
                        {student.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      <span className="text-[10px] text-slate-400 font-mono">
                        {student.id.replace('stu_', '#')}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
