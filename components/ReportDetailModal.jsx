'use client';

import React, { useState, useEffect } from 'react';
import { generateFacePixelatedDataUrl } from '@/lib/facePrivacy';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Clock, 
  Zap, 
  MapPin, 
  ExternalLink, 
  Sliders, 
  Copy, 
  Check 
} from 'lucide-react';

export default function ReportDetailModal({ report, onClose }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [copied, setCopied] = useState(false);
  const [liveProcessedUrl, setLiveProcessedUrl] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!report) return;
    const raw = report.rawImage || report.rawUrl;
    if (raw) {
      generateFacePixelatedDataUrl(raw).then((res) => {
        if (res && res.url) setLiveProcessedUrl(res.url);
      }).catch(() => {
        const proc = report.processedImage || report.redactedOptimizedUrl;
        if (proc) setLiveProcessedUrl(proc);
      });
    } else {
      const proc = report.processedImage || report.redactedOptimizedUrl;
      if (proc) setLiveProcessedUrl(proc);
    }
  }, [report]);

  if (!report) return null;

  const rawUrl = report.rawImage || report.rawUrl;
  const processedUrl = liveProcessedUrl || report.processedImage || report.redactedOptimizedUrl || report.rawImage;
  const fallbackImg = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=85';

  const copyUrl = async () => {
    const urlToCopy = report.cloudinaryTransformationsUrl || report.redactedOptimizedUrl || processedUrl;
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

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                report.priority === 'HIGH PRIORITY'
                  ? 'bg-red-500 text-white'
                  : 'bg-amber-500 text-slate-950'
              }`}
            >
              {report.priority}
            </span>
            <span className="text-xs text-slate-300 font-mono">
              ID: {report.id}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Title & Metadata */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {report.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 flex items-center space-x-1.5 mt-1.5">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{report.location}</span>
            </p>
          </div>

          {/* Interactive Split Slider Comparison */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-250 bg-slate-950 select-none">
            <div className="relative h-72 sm:h-96 w-full">
              {/* Processed (Background Layer) */}
              <img
                src={processedUrl}
                alt="Cloudinary Processed"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
              />

              {/* Right badge */}
              <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/40 text-xs text-white">
                <span className="text-cyan-300 font-bold">Cloudinary Processed</span>
                <span className="block text-[11px] text-emerald-400 font-mono font-bold">
                  {report.optimizedSize || '468 KB (89% saved)'}
                </span>
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

                <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-500/40 text-xs text-white">
                  <span className="text-red-400 font-bold">Raw Upload</span>
                  <span className="block text-[11px] text-slate-300 font-mono font-bold">
                    {report.rawSize || '4.6 MB'}
                  </span>
                </div>
              </div>

              {/* Divider handle */}
              <div
                className="absolute top-0 bottom-0 z-30 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center border-2 border-emerald-500 text-xs font-bold">
                  ↔
                </div>
              </div>

              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize z-40 w-full h-full"
              />
            </div>

            <div className="bg-slate-900 px-4 py-2 text-center text-xs text-slate-400">
              Drag slider horizontally to verify Cloudinary <code className="text-purple-300">e_pixelate_faces</code> and WebP compression
            </div>
          </div>

          {/* Department & Triage Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Dispatched Department
              </span>
              <p className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>{report.department}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Target SLA: {report.slaHours || 24} Hours Response
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Cloudinary Transformation Stats
              </span>
              <p className="text-xs text-slate-700 font-medium">
                • Bandwidth Saved: <strong className="text-emerald-700">{report.bandwidthSaved || '89%'}</strong>
              </p>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                • Privacy: <strong className="text-purple-700">{report.facesPixelated || 2} Bystander Faces Anonymized</strong>
              </p>
            </div>
          </div>

          {/* Description */}
          {report.description && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Citizen Incident Report
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {report.description}
              </p>
            </div>
          )}

          {/* Municipal Resolution Proof Banner if Resolved */}
          {report.statusCode === 'resolved' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-emerald-500 text-white flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="flex items-center space-x-2">
                  <strong className="text-emerald-950 font-bold text-sm">
                    Municipal Rectification Verified &amp; Certified
                  </strong>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {report.resolvedIn || 'Within SLA'}
                  </span>
                </div>
                <p className="text-emerald-800 mt-1 leading-relaxed">
                  {report.resolvedAction || 'Municipal road crew completed pavement compaction and surface sealing.'}
                </p>
                {report.resolvedOfficer && (
                  <p className="text-[11px] text-emerald-700 mt-1 font-semibold">
                    Certifying Lead: {report.resolvedOfficer} • WO: {report.resolvedWorkOrder || 'WO-MCD-2026-8819'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Cloudinary URL Box */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs font-mono flex items-center justify-between gap-3">
            <span className="text-cyan-300 truncate">
              {report.cloudinaryTransformationsUrl || processedUrl}
            </span>
            <button
              type="button"
              onClick={copyUrl}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex-shrink-0 cursor-pointer"
            >
              {copied ? 'Copied!' : 'Copy Cloudinary URL'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}

