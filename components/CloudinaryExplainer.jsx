'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Zap, 
  Maximize2, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Server
} from 'lucide-react';

export default function CloudinaryExplainer() {
  const transformationPillars = [
    {
      code: 'e_pixelate_faces',
      title: 'Citizen Privacy & Identity Shield',
      desc: 'Deep learning automatically detects innocent bystander faces, pedestrians, and children in public grievances and pixelates them at edge nodes before media enters municipal databases.',
      icon: ShieldCheck,
      color: 'purple',
      badge: 'Privacy / DPDP Act',
    },
    {
      code: 'f_auto',
      title: 'Dynamic Format Adaptation',
      desc: 'Detects the viewing client’s browser capabilities in milliseconds and serves modern ultra-efficient formats like WebP or AVIF instead of bloated legacy JPEG/PNG payloads.',
      icon: Layers,
      color: 'cyan',
      badge: 'Format Optimization',
    },
    {
      code: 'q_auto',
      title: 'Perceptual Quality Tuning (~80% Savings)',
      desc: 'Calculates the optimal compression level without human-perceptible degradation. Reduces a typical 4.8MB mobile camera photo to under 420KB, ensuring fast loads on spotty 4G/5G networks.',
      icon: Zap,
      color: 'emerald',
      badge: 'Bandwidth Slasher',
    },
    {
      code: 'g_auto,c_fill',
      title: 'Smart Gravity Focal Crop',
      desc: 'Cloudinary AI identifies the key subject of interest—such as the pothole fracture or water spillage—and centers the crop around the hazard for municipal operator preview cards.',
      icon: Maximize2,
      color: 'amber',
      badge: 'AI Hazard Framing',
    },
  ];

  return (
    <section id="pipeline-explainer" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Under The Hood: Cloudinary AI Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            How Cloudinary Powers Scalable Civic Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Municipal corporations like MCD and Noida Authority receive thousands of high-resolution images daily. Unoptimized uploads crash servers and expose citizens to privacy violations. Here is how our automated Cloudinary pipeline transforms raw citizen reports into secure, lightweight civic intelligence.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-10">
          {transformationPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 group hover:bg-slate-850"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <code className="text-xs font-mono font-bold text-cyan-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                      {item.code}
                    </code>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Architecture Pipeline Flow Diagram */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 relative z-10">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>Full Media Processing Sequence:</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              Client Mobile Device → Next.js API → Cloudinary AI Edge → Municipal Portal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono">Step 1: Citizen Snap</span>
              <strong className="text-white text-xs block">Raw 4.8MB JPEG</strong>
              <span className="text-[10px] text-red-400">Contains unredacted faces</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono">Step 2: Cloudinary AI</span>
              <strong className="text-purple-300 text-xs block">e_pixelate_faces</strong>
              <span className="text-[10px] text-purple-300">Biometric privacy blurred</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono">Step 3: Compression</span>
              <strong className="text-cyan-300 text-xs block">f_auto, q_auto:eco</strong>
              <span className="text-[10px] text-emerald-400 font-bold">468 KB (89.8% saved)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1 font-mono">Step 4: Dispatch</span>
              <strong className="text-emerald-300 text-xs block">g_auto Thumbnail</strong>
              <span className="text-[10px] text-slate-300">MCD / DJB Triage SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

