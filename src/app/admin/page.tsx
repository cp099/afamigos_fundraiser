'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';
import { AdminNavbar } from '@/components/admin/AdminNavbar';
import { AdminMetrics } from '@/components/admin/AdminMetrics';
import { AddContributionForm } from '@/components/admin/AddContributionForm';
import { ContributionHistoryTable } from '@/components/admin/ContributionHistoryTable';
import { EditContributionModal } from '@/components/admin/EditContributionModal';
import { DeleteConfirmModal } from '@/components/admin/DeleteConfirmModal';
import { RosterManagerModal } from '@/components/admin/RosterManagerModal';
import { TargetConfigModal } from '@/components/admin/TargetConfigModal';
import { CampaignConfig, Contribution, Student } from '@/lib/types';
import { INITIAL_CAMPAIGN_CONFIG, INITIAL_CONTRIBUTIONS, INITIAL_STUDENTS_ROSTER } from '@/lib/mock-data';
import {
  addContribution,
  addStudent,
  deleteContribution,
  subscribeToAdminCampaignConfig,
  subscribeToContributions,
  subscribeToStudents,
  syncAndRecalculateAggregates,
  updateCampaignTarget,
  updateContribution,
  initializeFirestoreSeed,
} from '@/lib/campaign-service';
import { BrandLogo } from '@/components/ui/BrandLogo';

export default function AdminPage() {
  const { user, loading: authLoading, isFirebaseActive } = useAuth();

  const [campaignConfig, setCampaignConfig] = useState<CampaignConfig>(INITIAL_CAMPAIGN_CONFIG);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS_ROSTER);
  const [contributions, setContributions] = useState<Contribution[]>(INITIAL_CONTRIBUTIONS);

  // Modals state
  const [editingContribution, setEditingContribution] = useState<Contribution | null>(null);
  const [deletingContribution, setDeletingContribution] = useState<Contribution | null>(null);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState<boolean>(false);
  const [isTargetModalOpen, setIsTargetModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    if (isFirebaseActive) {
      initializeFirestoreSeed();
    }

    const unsubCamp = subscribeToAdminCampaignConfig((config) => {
      setCampaignConfig(config);
    });

    const unsubStudents = subscribeToStudents((list) => {
      setStudents(list);
    });

    const unsubContribs = subscribeToContributions((list) => {
      setContributions(list);
    });

    return () => {
      unsubCamp();
      unsubStudents();
      unsubContribs();
    };
  }, [user, isFirebaseActive]);

  // Derived metrics
  const totalRaised = contributions.reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
  const uniqueContributorIds = new Set(contributions.filter((c) => Number(c.amount) > 0).map((c) => c.studentId));
  const contributorCount = uniqueContributorIds.size;

  // Handlers
  const handleAddContribution = async (
    studentId: string,
    studentName: string,
    amount: number,
    note?: string
  ) => {
    await addContribution(studentId, studentName, amount, note);
  };

  const handleUpdateContribution = async (
    id: string,
    studentId: string,
    studentName: string,
    amount: number,
    note?: string
  ) => {
    await updateContribution(id, studentId, studentName, amount, note);
  };

  const handleDeleteContribution = async (id: string) => {
    await deleteContribution(id);
  };

  const handleAddStudent = async (name: string, rollNumber?: string) => {
    return await addStudent(name, rollNumber);
  };

  const handleUpdateTarget = async (newTarget: number) => {
    await updateCampaignTarget(newTarget);
  };

  const handleForceSync = async () => {
    setIsSyncing(true);
    try {
      await syncAndRecalculateAggregates(campaignConfig.target);
    } finally {
      setTimeout(() => setIsSyncing(false), 600);
    }
  };

  // Auth Loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#070A11] flex flex-col items-center justify-center text-white">
        <BrandLogo size="lg" />
        <div className="mt-8 flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Authenticating session...</span>
        </div>
      </div>
    );
  }

  // Not authenticated screen
  if (!user) {
    return <AdminLoginForm />;
  }

  return (
    <div className="min-h-screen bg-[#070A11] text-[#F1F5F9] flex flex-col selection:bg-indigo-500 selection:text-white bg-grid-pattern">
      {/* Admin Navbar */}
      <AdminNavbar onSyncAggregates={handleForceSync} isSyncing={isSyncing} />

      {/* Main Admin Dashboard */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top-Level Metrics */}
        <AdminMetrics
          totalRaised={totalRaised}
          target={campaignConfig.target}
          contributorCount={contributorCount}
          totalContributionsCount={contributions.length}
          onEditTarget={() => setIsTargetModalOpen(true)}
        />

        {/* Add Contribution Rapid Entry Form */}
        <AddContributionForm
          students={students}
          onAddContribution={handleAddContribution}
          onOpenRosterModal={() => setIsRosterModalOpen(true)}
        />

        {/* Private Contributions History Table */}
        <ContributionHistoryTable
          contributions={contributions}
          onEdit={(c) => setEditingContribution(c)}
          onDelete={(c) => setDeletingContribution(c)}
        />
      </main>

      {/* Edit Modal */}
      <EditContributionModal
        contribution={editingContribution}
        students={students}
        isOpen={Boolean(editingContribution)}
        onClose={() => setEditingContribution(null)}
        onSave={handleUpdateContribution}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        contribution={deletingContribution}
        isOpen={Boolean(deletingContribution)}
        onClose={() => setDeletingContribution(null)}
        onConfirm={handleDeleteContribution}
      />

      {/* Roster Manager Modal */}
      <RosterManagerModal
        students={students}
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        onAddStudent={handleAddStudent}
      />

      {/* Target Config Modal */}
      <TargetConfigModal
        currentTarget={campaignConfig.target}
        isOpen={isTargetModalOpen}
        onClose={() => setIsTargetModalOpen(false)}
        onUpdateTarget={handleUpdateTarget}
      />
    </div>
  );
}
