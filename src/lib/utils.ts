import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Contribution, MilestoneInfo, PublicCampaignData, PublicLeaderboardEntry } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = '₹'): string {
  if (isNaN(amount) || amount === null || amount === undefined) return `${currency}0`;
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${currency}${formatted}`;
}

export function formatPercentage(percentage: number, decimals: number = 1): string {
  if (isNaN(percentage) || percentage === null || percentage === undefined) return '0%';
  return `${percentage.toFixed(decimals)}%`;
}

export function getMilestoneInfo(percentage: number): MilestoneInfo {
  if (percentage >= 100) {
    return {
      tier: '100+',
      label: 'Goal Achieved',
      emoji: '🎯',
      message: '100% Campaign Goal Successfully Achieved',
      minPercent: 100,
      maxPercent: Infinity,
    };
  }
  if (percentage >= 90) {
    return {
      tier: '90-99',
      label: 'Final Push',
      emoji: '🔥',
      message: 'Entering the final stretch — closing in on our target',
      minPercent: 90,
      maxPercent: 99.9,
    };
  }
  if (percentage >= 75) {
    return {
      tier: '75-89',
      label: 'Home Stretch',
      emoji: '📈',
      message: 'Three-quarters funded — momentum is building',
      minPercent: 75,
      maxPercent: 89.9,
    };
  }
  if (percentage >= 50) {
    return {
      tier: '50-74',
      label: 'Halfway Point',
      emoji: '⚡',
      message: 'Over 50% funded — halfway to our collective goal',
      minPercent: 50,
      maxPercent: 74.9,
    };
  }
  if (percentage >= 25) {
    return {
      tier: '25-49',
      label: 'In Progress',
      emoji: '✨',
      message: 'Solid progress underway across class contributions',
      minPercent: 25,
      maxPercent: 49.9,
    };
  }
  return {
    tier: '0-24',
    label: 'Drive Active',
    emoji: '🌱',
    message: 'Campaign drive underway — every contribution counts',
    minPercent: 0,
    maxPercent: 24.9,
  };
}

/**
 * Derives public sanitized aggregates strictly without exposing individual amounts.
 * Strict Unique Sequential Ranking: Every student has an exclusive sequential rank (1, 2, 3, 4, 5...).
 * Deterministic Tie-Breaker:
 * 1. Total contribution amount (descending)
 * 2. Earliest contribution time priority (first to contribute ranks higher)
 * 3. Alphabetical name sort (A-Z) for 100% deterministic stability
 */
export function calculatePublicAggregates(
  target: number,
  contributions: Contribution[],
  allStudents?: { id: string; name: string }[]
): PublicCampaignData {
  let totalRaised = 0;
  const studentTotalsMap = new Map<
    string,
    {
      studentId: string;
      name: string;
      totalAmount: number;
      firstContributionTime: number;
      latestContributionTime: number;
    }
  >();

  // Aggregate student totals privately
  for (const item of contributions) {
    const amount = Number(item.amount) || 0;
    if (amount <= 0) continue;

    totalRaised += amount;
    const createdAt = Number(item.createdAt) || Date.now();

    const existing = studentTotalsMap.get(item.studentId);
    if (existing) {
      existing.totalAmount += amount;
      if (item.studentName && !existing.name) {
        existing.name = item.studentName;
      }
      existing.firstContributionTime = Math.min(existing.firstContributionTime, createdAt);
      existing.latestContributionTime = Math.max(existing.latestContributionTime, createdAt);
    } else {
      studentTotalsMap.set(item.studentId, {
        studentId: item.studentId,
        name: item.studentName || 'Student',
        totalAmount: amount,
        firstContributionTime: createdAt,
        latestContributionTime: createdAt,
      });
    }
  }

  // If students roster provided, ensure accurate student names
  if (allStudents) {
    for (const student of allStudents) {
      const entry = studentTotalsMap.get(student.id);
      if (entry) {
        entry.name = student.name;
      }
    }
  }

  // Sort: 1. Total Amount (desc) -> 2. Earliest Time Priority (asc) -> 3. Name (A-Z)
  const studentEntries = Array.from(studentTotalsMap.values()).sort((a, b) => {
    if (b.totalAmount !== a.totalAmount) {
      return b.totalAmount - a.totalAmount;
    }
    if (a.firstContributionTime !== b.firstContributionTime) {
      return a.firstContributionTime - b.firstContributionTime;
    }
    return a.name.localeCompare(b.name);
  });

  // Assign strictly unique sequential ranks (1, 2, 3, 4, 5...)
  const sanitizedLeaderboard: PublicLeaderboardEntry[] = studentEntries.map((curr, index) => ({
    studentId: curr.studentId,
    name: curr.name,
    rank: index + 1, // Guaranteed 100% unique sequential ranks
  }));

  const validTarget = target > 0 ? target : 25000;
  const percentage = (totalRaised / validTarget) * 100;
  const contributorCount = studentTotalsMap.size;
  const currentMilestone = getMilestoneInfo(percentage);

  return {
    target: validTarget,
    totalRaised,
    contributorCount,
    percentage,
    currentMilestone: {
      tier: currentMilestone.tier,
      label: currentMilestone.label,
      emoji: currentMilestone.emoji,
      message: currentMilestone.message,
    },
    leaderboard: sanitizedLeaderboard,
    updatedAt: Date.now(),
  };
}

export function getInitials(name: string): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getAvatarGradient(name: string): string {
  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-rose-500 to-orange-500',
    'from-emerald-500 to-teal-600',
    'from-blue-500 to-cyan-500',
    'from-amber-500 to-orange-600',
    'from-fuchsia-500 to-pink-600',
    'from-violet-500 to-indigo-600',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

export function formatTimestamp(ts: number | string): string {
  const date = typeof ts === 'string' ? new Date(ts) : new Date(ts);
  if (isNaN(date.getTime())) return 'Recently';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
