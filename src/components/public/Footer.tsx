'use client';

import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';
import { Code, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#06080F] text-slate-400 text-xs sm:text-sm py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Logo & Subtitle */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <BrandLogo size="sm" showSubtitle={false} />
            <p className="text-slate-400 text-xs mt-1">
              Classroom Contribution Drive by AFA MIGOS • CSA, CHRIST (Deemed to be University)
            </p>
          </div>

          {/* Right: Official University Link */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://christuniversity.in/center/C/CSA-Central/child-sponsorship-programme"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 text-slate-300"
            >
              <span>Official CSA Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Legal Copyright Bar */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Code className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-300">
              &copy; {new Date().getFullYear()} Chirag P Patil (cp099). All rights reserved.
            </span>
          </div>
          <span className="text-slate-400">
            Real-time fundraising platform designed for classroom campaigns.
          </span>
        </div>
      </div>
    </footer>
  );
}
