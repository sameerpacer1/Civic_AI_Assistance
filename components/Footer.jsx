'use client';

import React from 'react';
import { ShieldCheck, Cloud, Heart, Github, Award, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-850 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">
                Civic <span className="text-emerald-400">AI Assistant</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Smart Urban Grievance &amp; Infrastructure Verifier built for{' '}
              <strong className="text-slate-200">Hacktober HackDays 2026</strong> by{' '}
              <strong className="text-emerald-400">Team HEXCELERATE</strong>. 
              Automating citizen privacy through Cloudinary AI face redaction and high-efficiency WebP compression.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                Official Cloudinary Hackathon Entry
              </span>
            </div>
          </div>

          {/* Col 2: Cloudinary AI Transformations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Transformations Used
            </h4>
            <ul className="text-xs space-y-1.5 font-mono text-slate-400">
              <li className="hover:text-cyan-300 transition-colors">
                • e_pixelate_faces:15 (Privacy)
              </li>
              <li className="hover:text-cyan-300 transition-colors">
                • f_auto (WebP / AVIF Format)
              </li>
              <li className="hover:text-cyan-300 transition-colors">
                • q_auto:eco (80%+ Compression)
              </li>
              <li className="hover:text-cyan-300 transition-colors">
                • g_auto,c_fill (Smart Gravity)
              </li>
              <li className="hover:text-cyan-300 transition-colors">
                • w_1000,c_limit (Payload Cap)
              </li>
            </ul>
          </div>

          {/* Col 3: Coverage & Zones */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Delhi NCR Coverage
            </h4>
            <ul className="text-xs space-y-1 text-slate-400">
              <li>• New Delhi (MCD Central &amp; PWD)</li>
              <li>• Noida &amp; Greater Noida (Authority)</li>
              <li>• Gurugram (GMDA &amp; MCG)</li>
              <li>• Ghaziabad (Municipal Corp)</li>
              <li>• Delhi Jal Board (DJB Emergency)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-3">
          <p>© 2026 Team HEXCELERATE • Built with Next.js, Tailwind CSS &amp; Cloudinary SDK.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>for Hacktober HackDays 2026</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

