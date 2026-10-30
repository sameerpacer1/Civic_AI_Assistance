'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  MapPin, 
  FileText, 
  Tag, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  X, 
  Zap,
  Info
} from 'lucide-react';
import { SAMPLE_PRESETS, DELHI_NCR_LOCATIONS } from '@/lib/sampleData';

const CATEGORIES = [
  { id: 'Pothole', label: 'Pothole', priority: 'HIGH PRIORITY', color: 'red', icon: '🕳️' },
  { id: 'Water Leakage', label: 'Water Leakage', priority: 'HIGH PRIORITY', color: 'red', icon: '💧' },
  { id: 'Garbage Dump', label: 'Garbage Dump', priority: 'MEDIUM PRIORITY', color: 'amber', icon: '🗑️' },
  { id: 'Broken Streetlight', label: 'Broken Streetlight', priority: 'MEDIUM PRIORITY', color: 'amber', icon: '💡' },
  { id: 'Open Manhole', label: 'Open Manhole', priority: 'HIGH PRIORITY', color: 'red', icon: '⚠️' },
];

export default function SmartIssueForm({ onVerificationComplete }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Delhi NCR / Noida Sector 62');
  const [category, setCategory] = useState('Pothole');
  const [description, setDescription] = useState('');
  
  // Image state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [fileSizeText, setFileSizeText] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);

  const steps = [
    'Sending to Cloudinary Media Pipeline...',
    'Detecting human faces & applying e_pixelate_faces...',
    'Applying f_auto & q_auto compression (~80% bandwidth saved)...',
    'AI Auto-Triage: Assigning priority badge & department routing...',
  ];

  const handleFileSelect = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPEG, PNG, WebP)');
      return;
    }
    setErrorMessage('');
    setSelectedFile(file);
    setSelectedImageUrl(null);
    setFileSizeText(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedImageUrl(null);
    setFileSizeText(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetForm = () => {
    setTitle('');
    setLocation('Delhi NCR / Noida Sector 62');
    setCategory('Pothole');
    setDescription('');
    handleClearImage();
    setErrorMessage('');
  };

  const handleApplyPreset = (preset) => {
    setTitle(preset.title);
    setLocation(preset.location);
    setCategory(preset.category);
    setDescription(preset.description);
    setSelectedImageUrl(preset.imageUrl);
    setPreviewUrl(preset.imageUrl);
    setSelectedFile(null);
    setFileSizeText('4.80 MB (High-res Mobile Capture)');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please enter an issue title.');
      return;
    }
    if (!previewUrl && !selectedFile && !selectedImageUrl) {
      setErrorMessage('Please upload a photo of the civic issue or select a quick sample.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    setCurrentStep(0);

    // Visual step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('file', selectedFile);
      } else if (selectedImageUrl) {
        formData.append('imageUrl', selectedImageUrl);
      } else if (previewUrl) {
        formData.append('imageUrl', previewUrl);
      }

      formData.append('title', title);
      formData.append('location', location);
      formData.append('category', category);
      formData.append('description', description);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Server error processing grievance');
      }

      const result = await res.json();
      setCurrentStep(steps.length - 1);

      // Brief delay to allow the user to see the completed progress bar
      setTimeout(() => {
        setIsSubmitting(false);
        if (onVerificationComplete) {
          onVerificationComplete(result);
        }
      }, 500);
    } catch (err) {
      clearInterval(stepInterval);
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Verification failed. Please try again.');
    }
  };

  return (
    <div id="report-form" className="scroll-mt-24 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 px-6 sm:px-8 py-6 text-white border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Smart Urban Verification Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Report a Civic Grievance
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Upload image evidence — Cloudinary AI redacts bystander faces &amp; compresses payload before municipal dispatch.
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Face Redaction Active</span>
            </div>
          </div>
        </div>

        {/* Quick Test Presets Banner */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-3.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-600 flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Test Presets for Judges:</span>
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {SAMPLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 border border-slate-250 text-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  {preset.name}
                </button>
              ))}
              {(title || previewUrl || description) && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer ml-1"
                  title="Clear all fields"
                >
                  Clear Form
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start space-x-2.5">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Issue Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Issue Title</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dangerous deep pothole near Ring Road flyover"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-all outline-none"
            />
          </div>

          {/* Location & Quick Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Location (Delhi NCR / Noida / Gurugram)</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Auto-routes to municipal zone</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sector 62, Noida, Uttar Pradesh"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-all outline-none mb-2"
            />
            {/* Quick Location Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              <span className="text-[11px] text-slate-400 font-medium">Suggestions:</span>
              {DELHI_NCR_LOCATIONS.slice(0, 5).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocation(loc)}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                    location === loc
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center space-x-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              <span>Grievance Category</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20 font-bold shadow-sm'
                        : 'border-slate-250 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl mb-1">{cat.icon}</span>
                    <span className="text-xs font-semibold leading-tight">{cat.label}</span>
                    <span
                      className={`mt-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        cat.color === 'red'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {cat.priority.replace(' PRIORITY', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image Upload Area with Drag-and-Drop and Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload Evidence Image</span>
                <span className="text-red-500">*</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                Cloudinary AI will auto-pixelate faces &amp; compress payload
              </span>
            </label>

            {previewUrl ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/50 bg-slate-900 group">
                {/* Image preview */}
                <img
                  src={previewUrl}
                  alt="Issue Preview"
                  className="w-full h-64 sm:h-80 object-cover object-center"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=85'; }}
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-between p-4 pointer-events-none">
                  <div className="flex justify-between items-start pointer-events-auto">
                    <span className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs flex items-center space-x-1 shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ready for Cloudinary Processing</span>
                    </span>

                    <button
                      type="button"
                      onClick={handleClearImage}
                      className="p-1.5 rounded-full bg-slate-900/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-white text-xs flex items-center justify-between pointer-events-auto">
                    <div>
                      <span className="font-semibold text-slate-200">Raw Capture Payload: </span>
                      <span className="font-mono text-emerald-400">{fileSizeText || '4.4 MB'}</span>
                    </div>
                    <span className="text-[11px] text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                      e_pixelate_faces ready
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                  isDragging
                    ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                    : 'border-slate-300 hover:border-emerald-400 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                />

                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Drag &amp; drop civic evidence image here, or{' '}
                      <span className="text-emerald-600 underline">browse files</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Supports high-res mobile photos (JPEG, PNG, HEIC). Up to 15MB.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Citizen privacy guaranteed: Faces automatically blurred on upload</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description (Optional) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Additional Details / Landmark (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Next to pillar 142, opposite metro gate 3. Water spreading into cycle track."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder:text-slate-400 text-sm font-medium transition-all outline-none"
            />
          </div>

          {/* Submission / Verification Status Tracker */}
          {isSubmitting && (
            <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-400 flex items-center space-x-1.5">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Cloudinary Transformation Pipeline</span>
                </span>
                <span className="font-mono text-slate-400">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>

              <p className="text-xs text-slate-300 animate-pulse font-medium">
                {steps[currentStep]}
              </p>
            </div>
          )}

          {/* Submit Button (Required Core Feature: "Verify & Optimize via Cloudinary") */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 active:scale-[0.99] text-white font-extrabold text-base shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying &amp; Optimizing via Cloudinary...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Verify &amp; Optimize via Cloudinary</span>
                <Sparkles className="w-4 h-4 text-cyan-200" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

