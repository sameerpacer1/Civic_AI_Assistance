'use client';

import React from 'react';
import { 
  FileCheck2, 
  Zap, 
  UserCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Cpu, 
  CheckCircle2, 
  Flame 
} from 'lucide-react';

export default function HeroStats({ totalReportsCount = 1428, onScrollToForm }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Headline & Pitch */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs sm:text-sm text-slate-300 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-300">Hacktober HackDays 2026</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">Team HEXCELERATE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            Smart Urban Grievance &amp;{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Infrastructure Verifier
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Empowering citizens across <strong className="text-white">Delhi NCR</strong> to report potholes, water leaks, and municipal hazards with instant{' '}
            <span className="text-cyan-300 font-semibold underline decoration-cyan-500/40 underline-offset-4">Cloudinary AI face-redaction</span>{' '}
            for bystander privacy and <strong className="text-emerald-300">80%+ mobile bandwidth compression</strong> before reaching municipal dashboards.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onScrollToForm}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-95 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/30 transition-all duration-200 cursor-pointer"
            >
              <span>Submit Civic Grievance</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#live-feed"
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 active:scale-95 text-slate-200 hover:text-white font-medium text-sm sm:text-base border border-slate-700/80 transition-all duration-200"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Explore Public Feed</span>
            </a>

            <a
              href="#pipeline-explainer"
              className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-xl text-slate-400 hover:text-cyan-300 font-medium text-sm transition-all duration-200"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>How Cloudinary AI Works</span>
            </a>
          </div>
        </div>

        {/* Impact Stats Cards (Required Core Feature 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Stat 1: Total Verified Reports */}
          <div className="relative group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Verified Reports
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
              {totalReportsCount.toLocaleString()}+
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Civic hazards verified &amp; dispatched across Delhi, Noida &amp; Gurugram
            </p>
            <div className="mt-3 flex items-center space-x-1.5 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>100% Validated by AI Auto-Triage</span>
            </div>
          </div>

          {/* Stat 2: Bandwidth Saved via Cloudinary (80%) */}
          <div className="relative group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Bandwidth Saved
              </span>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline space-x-1 mb-1">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                80%
              </span>
              <span className="text-sm font-semibold text-cyan-400">+</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Via Cloudinary <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded font-mono text-[10px]">f_auto,q_auto</code> payload compression
            </p>
            <div className="mt-3 flex items-center space-x-1 text-[11px] text-cyan-300 font-medium">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>4.8MB raw down to ~400KB WebP</span>
            </div>
          </div>

          {/* Stat 3: Citizen Faces Protected */}
          <div className="relative group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Faces Protected
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
              3,950+
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bystanders anonymized using <code className="text-purple-300 bg-slate-800 px-1 py-0.5 rounded font-mono text-[10px]">e_pixelate_faces</code>
            </p>
            <div className="mt-3 flex items-center space-x-1 text-[11px] text-purple-300 font-medium">
              <CheckCircle2 className="w-3 h-3 text-purple-400" />
              <span>Zero PII stored in municipal logs</span>
            </div>
          </div>

          {/* Stat 4: AI Triage Latency & Auto Routing */}
          <div className="relative group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-lg shadow-black/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Triage Latency
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
              &lt; 1.2s
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant AI severity score &amp; automated department routing SLA
            </p>
            <div className="mt-3 flex items-center space-x-1 text-[11px] text-amber-300 font-medium">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>Direct dispatch to MCD / DJB / Noida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

