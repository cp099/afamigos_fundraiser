import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  href?: string;
}

export function BrandLogo({ size = 'md', showSubtitle = true, href = '/' }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg lg:text-xl',
    lg: 'text-lg sm:text-xl lg:text-2xl',
  };

  const badgeClasses = {
    sm: 'text-[8px] sm:text-[9px] px-1.5 py-0.5',
    md: 'text-[9px] sm:text-[10px] px-2 py-0.5',
    lg: 'text-[10px] sm:text-xs px-2.5 py-0.5',
  };

  const Content = (
    <div className="flex items-center gap-2.5 sm:gap-3 group select-none max-w-full">
      {/* Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-amber-500 p-[1.5px] shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
          <div className="w-full h-full bg-[#080C14] rounded-[7px] sm:rounded-[10px] flex items-center justify-center">
            <span className="font-mono font-black text-[10px] sm:text-xs tracking-tight text-white">
              CSP
            </span>
          </div>
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full border-2 border-[#070A11]" />
      </div>

      {/* Typography */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className={`font-black tracking-tight ${sizeClasses[size]} truncate`}>
            <span className="text-white">Child Sponsorship</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              Campaign
            </span>
          </span>
          <span className={`font-mono font-bold uppercase tracking-wider rounded-md bg-amber-400/10 text-amber-300 border border-amber-400/20 shrink-0 ${badgeClasses[size]}`}>
            AFA MIGOS
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[9px] sm:text-[11px] font-medium text-slate-400 tracking-wide flex items-center gap-1 sm:gap-1.5 -mt-0.5 truncate">
            <span>CSA</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300 font-semibold truncate">CHRIST (Deemed to be University)</span>
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-block max-w-full">{Content}</Link>;
  }

  return Content;
}
