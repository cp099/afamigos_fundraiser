export type MilestoneTier = '0-24' | '25-49' | '50-74' | '75-89' | '90-99' | '100+';

export interface MilestoneInfo {
  tier: MilestoneTier;
  label: string;
  emoji: string;
  message: string;
  minPercent: number;
  maxPercent: number;
}

export interface Student {
  id: string;
  name: string;
  rollNumber?: string;
  active: boolean;
  createdAt: number;
}

export interface Contribution {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  createdAt: number;
  updatedAt?: number;
  note?: string;
}

export interface CampaignConfig {
  id: string;
  title: string;
  target: number;
  currencySymbol: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
}

/**
 * STRICT PRIVACY GUARANTEE:
 * Public leaderboard entry NEVER contains monetary amounts or contribution counts.
 * Strictly unique sequential ranking: every student has an exclusive rank (1, 2, 3, 4...).
 */
export interface PublicLeaderboardEntry {
  studentId: string;
  name: string;
  rank: number;
}

/**
 * The sanitized, aggregate public document for the campaign.
 * This is the ONLY document queried by public visitors.
 */
export interface PublicCampaignData {
  target: number;
  totalRaised: number;
  contributorCount: number;
  percentage: number;
  currentMilestone: {
    tier: MilestoneTier;
    label: string;
    emoji: string;
    message: string;
  };
  leaderboard: PublicLeaderboardEntry[];
  updatedAt: number;
}

export interface AdminMetricsData {
  totalRaised: number;
  target: number;
  percentage: number;
  contributorCount: number;
  totalContributionsCount: number;
  averageContribution: number;
}
