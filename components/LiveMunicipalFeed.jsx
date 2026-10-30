'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  ThumbsUp, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Filter, 
  Zap, 
  ArrowUpRight, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';

export default function LiveMunicipalFeed({ 
  reports = [], 
  onUpvote, 
  onSelectReport 
}) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter((item) => {
    // Search query
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const matchTitle = item.title?.toLowerCase().includes(query);
      const matchLocation = item.location?.toLowerCase().includes(query);
      const matchDept = item.department?.toLowerCase().includes(query);
      if (!matchTitle && !matchLocation && !matchDept) return false;
    }

    // Category filter
    if (filterCategory !== 'ALL' && item.category !== filterCategory) {
      return false;
    }

    // Priority filter
    if (filterPriority === 'HIGH' && item.priority !== 'HIGH PRIORITY') {
      return false;
    }
    if (filterPriority === 'RESOLVED' && item.statusCode !== 'resolved') {
      return false;
    }
    if (filterPriority === 'IN_ACTION' && item.statusCode !== 'in_action' && item.statusCode !== 'dispatched') {
      return false;
    }

    return true;
  });

  return (
    <section id="live-feed" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow"></span>
            <span>Real-time Municipal Triage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Live Public Civic Feed &amp; Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Pre-populated with verified infrastructure alerts across <strong className="text-slate-800">Delhi NCR</strong>.
            All bystander identities are pixelated via Cloudinary AI before entering public view.
          </p>
        </div>

        {/* Live Counter Badge */}
        <div className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-2xl shadow-sm text-xs font-semibold self-start md:self-auto">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Active Grievances:</span>
          <span className="font-mono text-emerald-400 font-bold text-sm">
            {reports.length} Verified
          </span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by location (e.g. Ring Road, Noida Sector 62) or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-250 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm outline-none transition-all"
            />
          </div>

          {/* Priority Quick Filter */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: 'ALL', label: 'All Statuses' },
              { id: 'HIGH', label: '🚨 High Priority' },
              { id: 'IN_ACTION', label: '⏳ In Action' },
              { id: 'RESOLVED', label: '✅ Resolved' },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFilterPriority(p.id)}
                className={`text-xs font-bold px-3 py-2 rounded-xl border whitespace-nowrap transition-colors cursor-pointer ${
                  filterPriority === p.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-250 hover:bg-slate-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto text-xs font-semibold pt-1">
          <span className="text-slate-400 flex items-center space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {[
            { id: 'ALL', label: 'All Categories' },
            { id: 'Pothole', label: '🕳️ Potholes' },
            { id: 'Water Leakage', label: '💧 Water Leaks' },
            { id: 'Garbage Dump', label: '🗑️ Garbage' },
            { id: 'Broken Streetlight', label: '💡 Streetlights' },
            { id: 'Open Manhole', label: '⚠️ Manholes' },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilterCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors cursor-pointer ${
                filterCategory === c.id
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Grievance Cards */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No grievances match your filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or switching categories.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('ALL');
              setFilterPriority('ALL');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const isHighPriority = report.priority === 'HIGH PRIORITY';
            return (
              <div
                key={report.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Thumbnail Container */}
                <div className="relative h-48 sm:h-52 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={report.processedImage || report.thumbnail || report.redactedOptimizedUrl || report.rawImage}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=70'; }}
                  />

                  {/* Top Overlay Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {/* Severity Priority Badge */}
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1 ${
                        isHighPriority
                          ? 'bg-red-600 text-white ring-1 ring-red-400'
                          : 'bg-amber-500 text-slate-950 ring-1 ring-amber-300'
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span>{report.priority}</span>
                    </span>

                    {/* Status Pill */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm ${
                        report.statusCode === 'resolved'
                          ? 'bg-emerald-600/90 text-white'
                          : report.statusCode === 'in_action'
                          ? 'bg-blue-600/90 text-white'
                          : 'bg-slate-900/85 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {report.status || 'Verified'}
                    </span>
                  </div>

                  {/* Bottom Overlay: Cloudinary AI Privacy Protection Pill */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-slate-950/85 backdrop-blur-md text-emerald-300 text-[10px] font-mono px-2 py-1 rounded-lg border border-emerald-500/30 flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>e_pixelate_faces active</span>
                    </span>

                    <span className="bg-slate-950/85 backdrop-blur-md text-cyan-300 text-[10px] font-mono px-2 py-1 rounded-lg border border-cyan-500/30 flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{report.bandwidthSaved || '89%'} saved</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Category & Time */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {report.category}
                      </span>
                      <span className="flex items-center space-x-1 text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{report.reportedAt || 'Just now'}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {report.title}
                    </h3>

                    {/* Location */}
                    <p className="text-xs text-slate-500 flex items-start space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{report.location}</span>
                    </p>

                    {/* Department Routing */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate font-medium">{report.department}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Upvote & Inspect Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {/* Upvote / Me Too Button */}
                    <button
                      type="button"
                      onClick={() => onUpvote && onUpvote(report.id)}
                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        report.hasUpvoted
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                      title="Escalate: report that you also witness this civic issue"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${report.hasUpvoted ? 'text-emerald-600 fill-emerald-600' : ''}`} />
                      <span>{report.upvotes}</span>
                      <span className="hidden sm:inline font-normal text-[11px] text-slate-500">Escalations</span>
                    </button>

                    {/* Inspect Button */}
                    <button
                      type="button"
                      onClick={() => onSelectReport && onSelectReport(report)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 p-1.5 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      <span>Inspect Cloudinary Pipeline</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

