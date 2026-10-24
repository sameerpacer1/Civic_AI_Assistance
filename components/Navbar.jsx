'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cloud, Sparkles, AlertCircle, ExternalLink, Activity } from 'lucide-react';

export default function Navbar({ isConfigured = false }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800'
          : 'bg-slate-950 border-b border-slate-850'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 shadow-md shadow-emerald-500/20 text-white font-bold">
              <ShieldCheck className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-slate-950 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-slate-950" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Civic <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AI Assistant</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Hacktober 2026
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                <span>By <strong className="text-slate-200">Team HEXCELERATE</strong></span>
                <span className="text-slate-600">•</span>
                <span className="hidden sm:inline">Urban Infrastructure Verifier</span>
              </div>
            </div>
          </div>

          {/* Cloudinary Integration Badge & Quick Links */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Core requirement badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium shadow-sm">
              <Cloud className="w-4 h-4 text-cyan-400 animate-pulse-slow" />
              <span className="hidden sm:inline">Powered by</span>
              <span className="font-semibold text-white">Cloudinary AI</span>
              <span className="hidden lg:inline text-cyan-300/80">&amp; Media Pipeline</span>
            </div>

            {/* Live Pipeline Status Pill */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow"></span>
              <span className="text-slate-200 font-medium">Pipeline: Active</span>
            </div>

            {/* Quick Link to Form */}
            <a
              href="#report-form"
              className="inline-flex items-center space-x-1 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 text-xs sm:text-sm font-semibold transition-all shadow-md shadow-emerald-500/25"
            >
              <span>Report Issue</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

