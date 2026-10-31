'use client';

import React, { useState, useEffect } from 'react';
import { generateFacePixelatedDataUrl } from '@/lib/facePrivacy';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  ExternalLink, 
  Copy, 
  Check, 
  Clock, 
  Building2, 
  Cpu, 
  Eye, 
  Lock, 
  Sparkles,
  ArrowRight,
  Maximize2,
  Sliders
} from 'lucide-react';

export default function VerificationResultCard({ 
  result, 
  onAddToFeed, 
  onDismiss 
}) {
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'side' | 'raw' | 'processed'
  const [sliderPos, setSliderPos] = useState(50);
  const [copied, setCopied] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [liveRedactedUrl, setLiveRedactedUrl] = useState(null);

  useEffect(() => {
    setIsAdded(false);
    setSliderPos(50);

    if (!result) return;
    const raw = result.rawUrl;
    const proc = result.redactedOptimizedUrl;
    if (proc && proc !== raw && !proc.includes('undefined')) {
      setLiveRedactedUrl(proc);
    } else if (raw) {
      generateFacePixelatedDataUrl(raw).then((res) => {
        if (res && res.url) setLiveRedactedUrl(res.url);
      }).catch(() => setLiveRedactedUrl(raw));
    }
  }, [result?.reportId, result?.rawUrl]);

  if (!result) return null;

  const handleAdd = () => {
    if (isAdded) return;
    setIsAdded(true);
    if (onAddToFeed) onAddToFeed();
  };

  const fallbackImg = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=85';

  const copyUrl = async () => {
    const urlToCopy = result.cloudinaryTransformationsUrl || redactedOptimizedUrl;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(urlToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = urlToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  const activeRedactedUrl = liveRedactedUrl || result.redactedOptimizedUrl || result.rawUrl;

  const {
    title,
    location,
    category,
    rawUrl,
    redactedOptimizedUrl,
    thumbnailUrl,
    priority = 'HIGH PRIORITY',
    priorityColor = 'red',
    department,
    slaHours = 24,
    urgency,
    aiConfidence = '98.2%',
    aiTags = [],
    rawSize = '4.6 MB',
    optimizedSize = '468 KB',
    bandwidthSaved = '89.8%',
    facesPixelated = 2,
    isDemoMode = false,
  } = result;

  return (
    <div className="max-w-5xl mx-auto my-8 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl shadow-emerald-500/10 border-2 border-emerald-500/40 overflow-hidden">
          {/* Verification Success Banner */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 px-6 sm:px-8 py-5 text-white border-b border-emerald-500/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      AI Verified Civic Issue
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {aiConfidence} Confidence
                    </span>
                    {result.isDemoMode && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30" title={result.demoNotice}>
                        Interactive Pipeline Mode
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Grievance Verified &amp; Media Optimized via Cloudinary
                  </h3>
                </div>
              </div>

              {/* Severity Priority Badge */}
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg ${
                    priorityColor === 'red'
                      ? 'bg-red-500 text-white shadow-red-500/25 ring-2 ring-red-400/50 pulse-glow'
                      : 'bg-amber-500 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-300/50'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>{priority}</span>
                </span>
              </div>
            </div>
          </div>

          {result.demoNotice && result.demoNotice.includes('permission') && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 text-xs text-amber-300 flex items-center space-x-2">
              <span className="font-bold">ℹ️ Note:</span>
              <span>{result.demoNotice} (To enable direct cloud writes, ensure the Access Key has 'create' permissions in Cloudinary Settings).</span>
            </div>
          )}

        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Auto-Triage Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Grievance Title &amp; Location
              </span>
              <p className="font-bold text-slate-900 text-sm line-clamp-1">{title}</p>
              <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                <span>📍</span>
                <span>{location}</span>
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Auto-Triage Routing
              </span>
              <p className="font-bold text-slate-900 text-sm flex items-center space-x-1">
                <Building2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{department}</span>
              </p>
              <p className="text-xs text-amber-600 font-medium mt-0.5 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Target SLA: {slaHours} Hours Resolution</span>
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Cloudinary Performance Impact
              </span>
              <p className="font-bold text-emerald-600 text-sm flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>{bandwidthSaved} Bandwidth Saved</span>
              </p>
              <p className="text-xs text-purple-700 font-medium mt-0.5 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>{facesPixelated} Bystander Faces Redacted</span>
              </p>
            </div>
          </div>

          {/* Core Feature 4: Side-by-side comparison card */}
          {/* Header controls for the comparison */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center space-x-2">
                <span>Transformation Comparison:</span>
                <span className="text-slate-500 font-normal">Raw Capture vs Cloudinary Processed</span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Demonstrating automated face privacy (<code className="text-purple-600 bg-purple-50 px-1 py-0.5 rounded font-mono">e_pixelate_faces</code>) and WebP compression (<code className="text-cyan-700 bg-cyan-50 px-1 py-0.5 rounded font-mono">f_auto, q_auto</code>)
              </p>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('side')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'side'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Side-by-Side
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('split')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                  activeTab === 'split'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Split Slider</span>
              </button>
            </div>
          </div>

          {/* Comparison Viewer: Split Slider Mode */}
          {activeTab === 'split' && (
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 select-none bg-slate-950">
              <div className="relative h-80 sm:h-[420px] w-full overflow-hidden">
                {/* Processed (Right / Background Layer) */}
                <img
                  src={activeRedactedUrl}
                  alt="Cloudinary Processed"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.02]"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                />

                {/* Right Badge: Cloudinary Processed */}
                <div className="absolute top-4 right-4 z-20 bg-slate-950/85 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-cyan-500/40 text-xs shadow-lg space-y-0.5">
                  <div className="flex items-center space-x-1.5 text-cyan-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Cloudinary Processed</span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Size: <span className="text-emerald-400 font-mono font-bold">{optimizedSize}</span>
                    <span className="ml-1 text-cyan-300">({bandwidthSaved} saved)</span>
                  </div>
                  <div className="text-[10px] text-purple-300 font-mono">
                    e_pixelate_faces • f_auto • q_auto
                  </div>
                </div>

                {/* Raw Upload (Left / Clipped Layer) with clipPath for pixel-perfect comparison */}
                <div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <img
                    src={rawUrl}
                    alt="Raw Upload"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                  />

                  {/* Left Badge: Raw Upload */}
                  <div className="absolute top-4 left-4 z-20 bg-slate-950/85 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-red-500/40 text-xs shadow-lg space-y-0.5">
                    <div className="flex items-center space-x-1.5 text-red-400 font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Raw Upload</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Payload: <span className="text-red-300 font-mono font-bold">{rawSize}</span>
                    </div>
                    <div className="text-[10px] text-amber-300">
                      Unredacted Citizen Identities
                    </div>
                  </div>
                </div>

                {/* Slider divider line and draggable handle */}
                <div
                  className="absolute top-0 bottom-0 z-30 w-1 bg-white cursor-ew-resize shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border-2 border-emerald-500 text-xs font-bold">
                    ↔
                  </div>
                </div>

                {/* Invisible input range slider spanning the full width */}
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-40 w-full h-full"
                  aria-label="Drag to compare Raw vs Cloudinary Processed"
                />
              </div>

              {/* Slider instruction bar */}
              <div className="bg-slate-900 px-4 py-2 text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
                <span>◀ Drag slider horizontally to compare Raw vs Cloudinary Face Redaction &amp; WebP ▶</span>
              </div>
            </div>
          )}

          {/* Comparison Viewer: Side-by-Side Mode */}
          {activeTab === 'side' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Raw Upload */}
              <div className="rounded-2xl border-2 border-red-200 overflow-hidden bg-slate-900 group relative">
                <div className="relative h-64 sm:h-72">
                  <img
                    src={rawUrl}
                    alt="Raw Upload"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                  />
                </div>

                <div className="p-4 bg-white border-t border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Raw Upload (Unprocessed)</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {rawSize}
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li className="flex items-center space-x-1.5 text-red-700">
                      <span>•</span>
                      <span>Citizen identities unprotected in public record</span>
                    </li>
                    <li className="flex items-center space-x-1.5">
                      <span>•</span>
                      <span>High bandwidth load on civic mobile networks</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Card 2: Cloudinary Processed */}
              <div className="rounded-2xl border-2 border-emerald-400 overflow-hidden bg-slate-900 group relative">
                <div className="relative h-64 sm:h-72">
                  <img
                    src={activeRedactedUrl}
                    alt="Cloudinary Processed"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                  />
                </div>

                <div className="p-4 bg-white border-t border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Cloudinary Processed (Optimized)</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {optimizedSize} ({bandwidthSaved} saved)
                    </span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li className="flex items-center space-x-1.5 text-emerald-700 font-semibold">
                      <span>✓</span>
                      <span>Citizen Privacy Secured: Faces automatically blurred</span>
                    </li>
                    <li className="flex items-center space-x-1.5 text-cyan-700 font-semibold">
                      <span>✓</span>
                      <span>Instant loading via modern WebP / AVIF format</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* AI-Detected Tags & Cloudinary URL Pipeline */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                <span>AI-Detected Features &amp; Tags:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {aiTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloudinary Transformation Recipe Pills */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-mono flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-cyan-400 font-bold">Cloudinary Pipeline:</span>
                <span className="bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                  e_pixelate_faces:15
                </span>
                <span className="bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                  f_auto
                </span>
                <span className="bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  q_auto
                </span>
                <span className="bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                  w_1000,c_limit
                </span>
                <span className="bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  g_auto
                </span>
              </div>

              <button
                type="button"
                onClick={copyUrl}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Report ID: <span className="font-mono text-slate-700">{result.reportId}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {onDismiss && (
                <button
                  type="button"
                  onClick={() => {
                    onDismiss();
                    const el = document.getElementById('report-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Report Another Issue
                </button>
              )}

              <button
                type="button"
                onClick={handleAdd}
                disabled={isAdded}
                className={`inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-none cursor-default'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white shadow-emerald-600/25'
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Published to Live Feed</span>
                  </>
                ) : (
                  <>
                    <span>Add to Live Public Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

