'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldCheck, 
  AlertTriangle, 
  HardHat, 
  Truck, 
  FileCheck2, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';
import { RESOLUTION_PROOFS } from '@/lib/sampleData';
import confetti from 'canvas-confetti';

export default function MunicipalRepairModal({ 
  report, 
  isOpen, 
  onClose, 
  onConfirmResolution 
}) {
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStage, setActiveStage] = useState(3); // 1 = Raw, 2 = Cloudinary, 3 = Repair Proof
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    if (!report) return;
    const alreadyResolved = report.statusCode === 'resolved';
    setIsResolved(alreadyResolved);
    setActiveStage(alreadyResolved ? 3 : 2);
    setSimulationStep(alreadyResolved ? 4 : 0);
  }, [report]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSimulating) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isSimulating]);

  if (!isOpen || !report) return null;

  const proofData = RESOLUTION_PROOFS[report.category] || RESOLUTION_PROOFS['Pothole'];
  const resolvedImg = report.resolvedProof || proofData.resolvedProof;
  const officerName = report.resolvedOfficer || proofData.resolvedOfficer;
  const actionText = report.resolvedAction || proofData.resolvedAction;
  const hoursTaken = proofData.hoursTaken || 18;
  const workOrder = report.resolvedWorkOrder || proofData.resolvedWorkOrder;
  const resolvedInText = report.resolvedIn || `Resolved in ${hoursTaken} Hours (Within ${report.slaHours || 24}h SLA)`;

  const rawUrl = report.rawImage || report.rawUrl;
  const processedUrl = report.processedImage || report.redactedOptimizedUrl || report.rawImage;
  const fallbackImg = 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=85';

  const simulationStages = [
    { title: 'Work Order Dispatched', desc: `Assigned to ${report.department} (WO: ${workOrder})`, icon: Truck },
    { title: 'Emergency Repair Crew On-Site', desc: 'Heavy equipment and crew deployed to location', icon: HardHat },
    { title: 'Civil Reconstruction Executed', desc: actionText, icon: Wrench },
    { title: 'Resolution Proof Certified', desc: `Inspection verified by ${officerName}`, icon: FileCheck2 },
  ];

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(1);

    const step1 = setTimeout(() => setSimulationStep(2), 700);
    const step2 = setTimeout(() => setSimulationStep(3), 1400);
    const step3 = setTimeout(() => {
      setSimulationStep(4);
      setIsSimulating(false);
      setIsResolved(true);
      setActiveStage(3);

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#059669', '#38bdf8'],
        });
      } catch (e) {}

      if (onConfirmResolution) {
        onConfirmResolution(report.id, {
          status: 'Resolved & Restored',
          statusCode: 'resolved',
          resolvedProof: resolvedImg,
          resolvedOfficer: officerName,
          resolvedAction: actionText,
          resolvedIn: resolvedInText,
          resolvedWorkOrder: workOrder,
        });
      }
    }, 2200);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn cursor-pointer"
      onClick={() => { if (!isSimulating) onClose?.(); }}
    >
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 px-6 sm:px-8 py-5 text-white flex items-center justify-between border-b border-emerald-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Wrench className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                  Municipal Resolution Lifecycle
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Before vs. After Workflow
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black text-white">
                MCD / PWD Infrastructure Repair Verification
              </h3>
            </div>
          </div>

          <button
            type="button"
            disabled={isSimulating}
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Grievance Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Target Civic Grievance
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-1">
                {report.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                📍 {report.location} • <strong className="text-slate-700">{report.department}</strong>
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider flex items-center space-x-1 shadow-sm ${
                  isResolved
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-red-100 text-red-800 border border-red-300 animate-pulse'
                }`}
              >
                {isResolved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>RESOLVED &amp; RESTORED</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>ACTIVE HAZARD</span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* SIMULATION CONTROLS & STEPPER */}
          {!isResolved && !isSimulating && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-dashed border-emerald-300 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/25">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-slate-900">
                Simulate Ground Municipal Dispatch &amp; Road Repair
              </h4>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">
                Trigger the on-ground resolution lifecycle: simulates work order dispatch, compaction/sealing crew execution, and verifiable photo proof creation for municipal audit.
              </p>
              <button
                type="button"
                onClick={handleStartSimulation}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer"
              >
                <HardHat className="w-4 h-4" />
                <span>Simulate MCD / PWD Repair</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* SIMULATION IN PROGRESS ANIMATION */}
          {isSimulating && (
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Executing Municipal Resolution Crew Workflow...</span>
                </span>
                <span className="font-mono text-slate-400">Step {simulationStep} of 4</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${(simulationStep / 4) * 100}%` }}
                />
              </div>

              {/* Steps list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {simulationStages.map((stage, idx) => {
                  const Icon = stage.icon;
                  const isCurrent = simulationStep === idx + 1;
                  const isDone = simulationStep > idx + 1;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border transition-all flex items-start space-x-2.5 ${
                        isCurrent
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                          : isDone
                          ? 'bg-slate-850 border-slate-700 text-slate-300'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                        {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div className="text-xs">
                        <strong className="block leading-tight">{stage.title}</strong>
                        <span className="text-[11px] text-slate-400">{stage.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3-WAY LIFECYCLE STAGE SELECTOR TABS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center space-x-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>3-Way Civic Infrastructure Lifecycle:</span>
              </span>

              {/* Stage buttons */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold gap-1">
                <button
                  type="button"
                  onClick={() => setActiveStage(1)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                    activeStage === 1
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>1. Raw Alert</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage(2)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                    activeStage === 2
                      ? 'bg-cyan-700 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>2. Cloudinary Triage</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage(3)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center space-x-1 ${
                    activeStage === 3
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>3. Repair Proof ✅</span>
                </button>
              </div>
            </div>

            {/* STAGE DISPLAY VIEW */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-950 h-72 sm:h-96">
              {/* Stage 1: Raw Capture */}
              {activeStage === 1 && (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={rawUrl}
                    alt="Raw Alert"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                  />

                  <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-red-500/40 text-xs text-white">
                    <div className="text-red-400 font-bold flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Stage 1: Citizen Mobile Capture</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Hazard Active • Unredacted Bystander Identities Exposed
                    </div>
                  </div>
                </div>
              )}

              {/* Stage 2: Cloudinary Processed */}
              {activeStage === 2 && (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={processedUrl}
                    alt="Cloudinary Processed"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                  />

                  <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-cyan-500/40 text-xs text-white">
                    <div className="text-cyan-300 font-bold flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Stage 2: Cloudinary AI Privacy &amp; Optimization</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Faces Pixelated • 89% Payload Slashed • Auto-Dispatched to MCD
                    </div>
                  </div>
                </div>
              )}

              {/* Stage 3: Municipal Repair Proof */}
              {activeStage === 3 && (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={resolvedImg}
                    alt="Municipal Repair Proof"
                    className="w-full h-full object-cover filter contrast-[1.03]"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackImg; }}
                  />

                  {/* Stamp Badge */}
                  <div className="absolute top-4 right-4 bg-emerald-950/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-emerald-400 text-xs text-white shadow-xl flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black">
                      ✓
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                        Official Resolution Certified
                      </span>
                      <strong className="text-white text-xs">{resolvedInText}</strong>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-emerald-500/30 text-white text-xs">
                    <div className="flex items-center space-x-1.5 text-emerald-300 font-bold mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Stage 3: Physical Municipal Rectification Proof</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {actionText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* OFFICIAL AUDIT DETAILS CARD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                Certifying Officer
              </span>
              <p className="font-bold text-slate-900 text-xs sm:text-sm flex items-center space-x-1">
                <HardHat className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="truncate">{officerName}</span>
              </p>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                Work Order Reference
              </span>
              <p className="font-mono font-bold text-slate-800 text-xs sm:text-sm">
                {workOrder}
              </p>
              <span className="text-[10px] text-emerald-600 font-semibold">
                Audit Hash Verified
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                SLA Compliance Turnaround
              </span>
              <p className="font-bold text-emerald-700 text-xs sm:text-sm flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{resolvedInText}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-slate-500 font-mono">
            Report: {report.id} • Lifecycle: {isResolved ? '3/3 (Completed)' : '2/3 (Pending Fix)'}
          </div>

          <div className="flex items-center space-x-3">
            {!isResolved && (
              <button
                type="button"
                disabled={isSimulating}
                onClick={handleStartSimulation}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Simulate Repair</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              Close Lifecycle Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
