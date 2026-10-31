'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroStats from '@/components/HeroStats';
import SmartIssueForm from '@/components/SmartIssueForm';
import VerificationResultCard from '@/components/VerificationResultCard';
import LiveMunicipalFeed from '@/components/LiveMunicipalFeed';
import CloudinaryExplainer from '@/components/CloudinaryExplainer';
import ReportDetailModal from '@/components/ReportDetailModal';
import MunicipalRepairModal from '@/components/MunicipalRepairModal';
import Footer from '@/components/Footer';
import { INITIAL_SAMPLE_REPORTS } from '@/lib/sampleData';
import confetti from 'canvas-confetti';

export default function Home() {
  const [reports, setReports] = useState(INITIAL_SAMPLE_REPORTS);
  const [verificationResult, setVerificationResult] = useState(null);
  const [selectedModalReport, setSelectedModalReport] = useState(null);
  const [selectedRepairReport, setSelectedRepairReport] = useState(null);
  const [totalReportsCount, setTotalReportsCount] = useState(1428);

  // Load persisted reports if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('civic_ai_reports_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReports(parsed);
          setTotalReportsCount(1428 + Math.max(0, parsed.length - INITIAL_SAMPLE_REPORTS.length));
        }
      }
    } catch (e) {
      console.warn('LocalStorage notice:', e);
    }
  }, []);

  const updateAndSaveReports = (newReports) => {
    setReports(newReports);
    try {
      localStorage.setItem('civic_ai_reports_v2', JSON.stringify(newReports));
    } catch (e) {}
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('report-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVerificationComplete = (result) => {
    setVerificationResult(result);

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#6366f1', '#fbbf24'],
      });
    } catch (e) {
      // Ignore if confetti not supported
    }

    // Scroll smoothly to verification result
    setTimeout(() => {
      const el = document.getElementById('verification-result');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleAddToFeed = () => {
    if (!verificationResult) return;

    const newReport = {
      id: verificationResult.reportId || `civic-${Date.now()}`,
      title: verificationResult.title,
      location: verificationResult.location,
      category: verificationResult.category,
      priority: verificationResult.priority || 'HIGH PRIORITY',
      priorityColor: verificationResult.priorityColor || 'red',
      status: 'Verified & Queued',
      statusCode: 'dispatched',
      department: verificationResult.department,
      slaHours: verificationResult.slaHours || 24,
      reportedAt: 'Just now',
      timestamp: new Date().toISOString(),
      upvotes: 1,
      hasUpvoted: true,
      rawImage: verificationResult.rawUrl,
      processedImage: verificationResult.redactedOptimizedUrl || verificationResult.rawUrl,
      thumbnail: verificationResult.thumbnailUrl || verificationResult.rawUrl,
      rawSize: verificationResult.rawSize || '4.4 MB',
      optimizedSize: verificationResult.optimizedSize || '485 KB',
      bandwidthSaved: verificationResult.bandwidthSaved || '88.9%',
      facesPixelated: verificationResult.facesPixelated || 2,
      confidence: verificationResult.aiConfidence || '98.2%',
      cloudinaryTransformations: verificationResult.cloudinaryTransformations || [
        'e_pixelate_faces',
        'f_auto',
        'q_auto',
      ],
      aiTags: verificationResult.aiTags || ['Verified Civic Issue'],
      description: verificationResult.description || '',
    };

    const updated = [newReport, ...reports];
    updateAndSaveReports(updated);
    setTotalReportsCount((prev) => prev + 1);

    // Confetti burst for publication
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#059669', '#34d399', '#38bdf8'],
      });
    } catch (e) {}

    // Scroll to feed
    setTimeout(() => {
      const feedEl = document.getElementById('live-feed');
      if (feedEl) {
        feedEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const handleUpvote = (id) => {
    const updated = reports.map((r) => {
      if (r.id === id) {
        const hasUpvoted = !r.hasUpvoted;
        return {
          ...r,
          hasUpvoted,
          upvotes: hasUpvoted ? r.upvotes + 1 : r.upvotes - 1,
        };
      }
      return r;
    });
    updateAndSaveReports(updated);
  };

  const handleConfirmResolution = (reportId, resolutionData) => {
    const updated = reports.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          ...resolutionData,
        };
      }
      return r;
    });
    updateAndSaveReports(updated);
  };

  const handleRevertResolution = (reportId) => {
    const updated = reports.map((r) => {
      if (r.id === reportId) {
        return {
          ...r,
          status: 'Verified & Queued',
          statusCode: 'dispatched',
          resolvedProof: null,
          resolvedOfficer: null,
          resolvedAction: null,
          resolvedIn: null,
          resolvedWorkOrder: null,
        };
      }
      return r;
    });
    updateAndSaveReports(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 flex flex-col font-sans">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero & Impact Stats Banner */}
        <HeroStats 
          totalReportsCount={totalReportsCount} 
          onScrollToForm={handleScrollToForm} 
        />

        {/* Section divider with subtle gradient */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>

        {/* 2. Smart Issue Reporting Form */}
        <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
          <SmartIssueForm onVerificationComplete={handleVerificationComplete} />
        </div>

        {/* 3. Interactive Verification Result (Comparison Card) */}
        {verificationResult && (
          <div id="verification-result" className="scroll-mt-24 px-4 sm:px-6 lg:px-8 py-6 bg-slate-900/50">
            <VerificationResultCard
              result={verificationResult}
              onAddToFeed={handleAddToFeed}
              onDismiss={() => setVerificationResult(null)}
            />
          </div>
        )}

        {/* 4. Live Municipal Dashboard & Public Feed */}
        <div className="bg-slate-100 py-12 border-y border-slate-200">
          <LiveMunicipalFeed
            reports={reports}
            onUpvote={handleUpvote}
            onSelectReport={(report) => setSelectedModalReport(report)}
            onOpenRepairModal={(report) => setSelectedRepairReport(report)}
          />
        </div>

        {/* 5. Cloudinary AI Architecture Deep Dive */}
        <div className="bg-slate-950 py-12">
          <CloudinaryExplainer />
        </div>
      </main>

      {/* Inspector Detail Modal */}
      {selectedModalReport && (
        <ReportDetailModal
          report={selectedModalReport}
          onClose={() => setSelectedModalReport(null)}
        />
      )}

      {/* Municipal Before vs After Resolution Modal */}
      {selectedRepairReport && (
        <MunicipalRepairModal
          report={selectedRepairReport}
          isOpen={Boolean(selectedRepairReport)}
          onClose={() => setSelectedRepairReport(null)}
          onConfirmResolution={handleConfirmResolution}
          onRevertResolution={handleRevertResolution}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

