'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/public/Navbar';
import { HeroProgress } from '@/components/public/HeroProgress';
import { LeaderboardPodium } from '@/components/public/LeaderboardPodium';
import { LeaderboardList } from '@/components/public/LeaderboardList';
import { ImpactSection } from '@/components/public/ImpactSection';
import { ConfettiCelebration } from '@/components/public/ConfettiCelebration';
import { Footer } from '@/components/public/Footer';
import { PublicCampaignData } from '@/lib/types';
import { INITIAL_PUBLIC_DATA } from '@/lib/mock-data';
import { subscribeToPublicCampaign } from '@/lib/campaign-service';
import { Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PublicCampaignPage() {
  const [campaignData, setCampaignData] = useState<PublicCampaignData>(INITIAL_PUBLIC_DATA);

  useEffect(() => {
    const unsubscribe = subscribeToPublicCampaign((data) => {
      setCampaignData(data);
    });
    return () => unsubscribe();
  }, []);

  const topThree = campaignData.leaderboard.filter((e) => e.rank <= 3);

  return (
    <div className="min-h-screen bg-[#070A11] text-[#F1F5F9] flex flex-col selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Target Reached Confetti Trigger */}
      <ConfettiCelebration percentage={campaignData.percentage} />

      {/* Navigation */}
      <Navbar percentage={campaignData.percentage} />

      {/* Main Campaign Content */}
      <main className="flex-grow w-full">
        {/* Hero & Real-time Progress Bar */}
        <HeroProgress data={campaignData} />

        {/* Leaderboard Section */}
        <section id="leaderboard" className="py-10 sm:py-24 relative overflow-hidden bg-grid-pattern border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/[0.08] border border-amber-500/20 text-xs font-mono uppercase font-bold text-amber-300 mb-2.5"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Classroom Rankings</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                className="text-2xl sm:text-5xl font-black text-white tracking-tight mb-2"
              >
                AFA MIGOS Leaderboard
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
                className="text-slate-300 text-xs sm:text-sm flex items-center justify-center gap-1.5 px-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Who&apos;s leading the charge? Contributions propel class ranks.</span>
              </motion.p>
            </div>

            {/* Top 3 Podium Presentation */}
            {topThree.length > 0 && <LeaderboardPodium topThree={topThree} />}

            {/* Ranks 4+ List */}
            <LeaderboardList entries={campaignData.leaderboard} />
          </div>
        </section>

        {/* Impact & About CSA Section */}
        <ImpactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
