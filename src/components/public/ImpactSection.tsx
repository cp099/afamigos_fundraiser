'use client';

import React from 'react';
import { BookOpen, Users, HeartPulse, GraduationCap, ShieldCheck, ExternalLink, MapPin, Sparkles } from 'lucide-react';

export function ImpactSection() {
  const csaPillars = [
    {
      icon: BookOpen,
      title: 'School Fees, Uniforms & Books',
      desc: 'Sponsors school fees, uniform kits, textbooks, notebooks, school bags, shoes, and stationery so children from marginalized communities never drop out due to financial constraints.',
      tag: '₹6,000 / Child / Year',
      iconColor: 'text-amber-400',
    },
    {
      icon: Users,
      title: 'Daily After-School Tutoring',
      desc: 'CHRIST (Deemed to be University) student volunteers run daily Activity Centres from 4:30 PM to 6:30 PM, assisting students with homework, concept revision, and computer literacy.',
      tag: 'Daily Volunteer Support',
      iconColor: 'text-indigo-400',
    },
    {
      icon: HeartPulse,
      title: 'Health Camps & Life Skills',
      desc: 'Conducts bi-annual health camps with medical treatments, Talents’ Day, sports events, personality development camps, and study exposure visits to nurture well-rounded growth.',
      tag: 'Bi-Annual Health Care',
      iconColor: 'text-rose-400',
    },
    {
      icon: GraduationCap,
      title: 'Higher Education at Christ Junior College',
      desc: 'Sponsored children gain opportunities to pursue higher secondary studies at Christ Junior College with fee concessions, enabling alumni to secure careers in software, finance, and enterprise.',
      tag: 'Long-Term Graduation',
      iconColor: 'text-emerald-400',
    },
  ];

  const projectCentres = [
    { name: 'Janakiram (3D Project)', desc: 'Computer skills & 3D empowerment' },
    { name: 'L.R. Nagar (Vriddhi)', desc: 'Supplementary education & day care' },
    { name: 'Ambedkar Nagar (Koramangala)', desc: 'Library, tuitions & digital lab' },
    { name: 'Tilaknagar', desc: 'Neighbourhood student activity hub' },
    { name: 'Subhash Nagar', desc: 'Kannada school volunteer learning' },
  ];

  return (
    <section id="impact" className="py-12 sm:py-24 border-t border-white/[0.08] relative bg-grid-pattern overflow-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/[0.08] border border-indigo-500/20 text-indigo-300 font-mono text-[10px] sm:text-[11px] uppercase font-bold tracking-wider mb-2.5 sm:mb-3 max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Centre for Social Action (CSA) • CHRIST</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2.5 sm:mb-3">
            Child Sponsorship Programme (CSP)
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed px-2">
            Started in 1999 by the student community at <strong className="text-white">CHRIST (Deemed to be University)</strong>,
            the &ldquo;Educate a Child&rdquo; Sponsorship Programme caters to the educational and developmental needs of over{' '}
            <strong className="text-amber-300 font-bold">800+ children annually</strong> across Bengaluru urban slum communities.
          </p>
        </div>

        {/* Highlight Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          <div className="craft-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-mono font-black text-amber-400">₹6,000</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Sponsors 1 Child for a Year</div>
          </div>
          <div className="craft-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-mono font-black text-white">800+</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Children Supported Annually</div>
          </div>
          <div className="craft-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-mono font-black text-indigo-400">1999</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">CSA Initiative Heritage</div>
          </div>
          <div className="craft-card rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-3xl font-mono font-black text-emerald-400">100%</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium mt-0.5">Direct Educational Allocation</div>
          </div>
        </div>

        {/* 4 Core Sponsorship Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {csaPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="craft-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center ${pillar.iconColor}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-base font-bold text-white mb-1 sm:mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-300 text-[11px] sm:text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Areas & Official Link Banner */}
        <div className="craft-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-white/[0.09] flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 text-left w-full">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>CSA Bengaluru Project Communities</span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
              {projectCentres.map((centre) => (
                <span
                  key={centre.name}
                  className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-[11px] font-medium text-slate-300"
                  title={centre.desc}
                >
                  {centre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Official Christ University Link */}
          <a
            href="https://christuniversity.in/center/C/CSA-Central/child-sponsorship-programme"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono font-bold text-slate-200 hover:text-white transition-all flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Christ University CSA Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
