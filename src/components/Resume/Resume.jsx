import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Eye, 
  ExternalLink, 
  Printer, 
  GraduationCap, 
  Briefcase, 
  AlertCircle,
  Layers,
  Code2,
  Headphones,
  Calendar,
  ShieldCheck
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { profileData } from '../../data/profile.js';
import { useResume } from '../../hooks/useResume.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

export const Resume = ({ onOpenResumeModal }) => {
  const { 
    activeResume, 
    profileMode, 
    setProfileMode, 
    handleDownload, 
    handleOpenNewTab, 
    handlePrint, 
    isFallback, 
    fallbackNotice 
  } = useResume();

  const prefersReduced = useReducedMotion();

  const resumeTracks = [
    { id: 'all', label: 'General Resume', short: 'ALL', icon: Layers, desc: 'Dual-Domain / Full Track' },
    { id: 'tech', label: 'Technical Resume', short: 'TECH', icon: Code2, desc: 'Software & Web Dev' },
    { id: 'bpo', label: 'Operations Resume', short: 'BPO', icon: Headphones, desc: 'Support & Quality' },
  ];

  return (
    <section id="resume-preview" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Dynamic Profile-Aware Subtitle */}
        <SectionHeading
          badge={activeResume.badge}
          title="Curriculum Vitae &"
          titleHighlight="Credentials"
          subtitle={activeResume.description}
        />

        {/* Executive Document Card Preview */}
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl glass-card border border-white/10 p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden max-w-5xl mx-auto"
        >
          {/* Track Switcher Tabs directly on the Resume Card for instant recruiter toggling */}
          <div className="mb-6 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-400 font-semibold block mb-1">
                Select Resume Specification
              </span>
              <p className="text-xs text-dark-400">
                Tailored documentation designed for recruiter efficiency
              </p>
            </div>

            <div 
              className="inline-flex p-1 rounded-xl bg-dark-950/90 border border-white/10 self-start md:self-auto"
              role="tablist"
              aria-label="Resume Profile Selector"
            >
              {resumeTracks.map((track) => {
                const Icon = track.icon;
                const isSelected = profileMode === track.id;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setProfileMode(track.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-brand-500 to-teal-400 text-dark-950 shadow-glow-sm'
                        : 'text-dark-300 hover:text-white hover:bg-dark-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{track.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fallback Notice Banner if specialized resume is unavailable */}
          {isFallback && (
            <div 
              className="mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{fallbackNotice}</span>
            </div>
          )}

          {/* Smooth Dynamic Transition when Profile/Resume changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeResume.id}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Top Bar: Resume Identity & Primary Quick Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 mb-6 border-b border-white/10">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="icon-box-brand flex-shrink-0 !w-12 !h-12 !rounded-xl">
                    <FileText className="w-6 h-6 text-brand-300" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {activeResume.title}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-brand-500/15 text-brand-300 border border-brand-500/30">
                        {activeResume.downloadName}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-dark-400 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span>Verified PDF Document</span>
                      <span>•</span>
                      <span>Target: {activeResume.targetRole}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">Ready for Review</span>
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Primary CTA: View Resume in Interactive Modal */}
                  <button
                    type="button"
                    onClick={() => onOpenResumeModal?.(activeResume)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white glass-pill border border-white/10 hover:bg-dark-800 hover:border-brand-500/40 transition-all active:scale-95 shadow-sm"
                    aria-label={`View ${activeResume.title} in preview modal`}
                  >
                    <Eye className="w-4 h-4 text-brand-300" />
                    <span>View Resume</span>
                  </button>

                  {/* Secondary CTA: Direct Download with Proper File Name */}
                  <a
                    href={activeResume.file}
                    download={activeResume.downloadName}
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95"
                    aria-label={`Download ${activeResume.title} as ${activeResume.downloadName}`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>

                  {/* Open in New Tab Button */}
                  <a
                    href={activeResume.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleOpenNewTab}
                    className="p-2.5 rounded-xl glass-pill text-dark-300 hover:text-white border border-white/10 hover:border-brand-500/40 transition-colors"
                    title="Open PDF directly in new browser tab"
                    aria-label="Open PDF in new browser tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  {/* Optional Print Button */}
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="hidden sm:inline-flex p-2.5 rounded-xl glass-pill text-dark-300 hover:text-white border border-white/10 hover:border-brand-500/40 transition-colors"
                    title="Print Document"
                    aria-label="Print Resume Document"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Structured Document Body Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Columns: Executive Summary & Track Highlights */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-brand-400 font-semibold mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Executive Profile Summary
                    </h4>
                    <p className="text-xs sm:text-sm text-dark-200 leading-relaxed bg-dark-900/40 p-4 rounded-xl border border-white/5">
                      {activeResume.summaryNarrative}
                    </p>
                  </div>

                  {/* Dynamic Track-Specific Experience Snapshot */}
                  <div className="p-4 rounded-xl bg-dark-900/70 border border-white/5 space-y-3">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-teal-300 font-semibold flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Verified Career & Project Credentials
                    </h5>
                    <div className="space-y-3 text-xs">
                      {activeResume.experienceSummary.map((exp, idx) => (
                        <div key={idx} className={idx > 0 ? 'pt-2.5 border-t border-white/5' : ''}>
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <span className="font-bold text-white text-xs sm:text-sm">{exp.role}</span>
                            <span className="font-mono text-dark-400 text-[11px]">{exp.duration}</span>
                          </div>
                          <div className="text-[11px] font-mono text-brand-300/80 mb-1">
                            {exp.organization}
                          </div>
                          <p className="text-dark-300 leading-relaxed text-xs">
                            {exp.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Competencies for this Specific Track */}
                  <div className="p-4 rounded-xl bg-dark-900/70 border border-white/5">
                    <h5 className="text-xs font-mono uppercase tracking-wider text-brand-300 font-semibold mb-2.5">
                      Track Competencies & Tooling
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {activeResume.coreCompetencies.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-dark-950 text-dark-200 border border-white/5 hover:border-brand-500/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 5 Columns: Metadata, Academic Background & Direct CTAs */}
                <div className="lg:col-span-5 space-y-5 bg-dark-900/85 p-5 sm:p-6 rounded-xl border border-white/10 shadow-inner">
                  {/* Document Metadata Card */}
                  <div className="space-y-2 pb-4 border-b border-white/10">
                    <div className="text-xs font-mono uppercase tracking-wider text-brand-400 font-semibold">
                      Document Specifications
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="p-2 rounded-lg bg-dark-950/70 border border-white/5">
                        <span className="text-[10px] text-dark-400 block font-mono">Format / Size</span>
                        <span className="text-white font-semibold">{activeResume.format} ({activeResume.size})</span>
                      </div>
                      <div className="p-2 rounded-lg bg-dark-950/70 border border-white/5">
                        <span className="text-[10px] text-dark-400 block font-mono">Version / Date</span>
                        <span className="text-white font-semibold">v{activeResume.version} ({activeResume.lastUpdated})</span>
                      </div>
                    </div>
                  </div>

                  {/* Education Snapshot */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 pb-1">
                      <GraduationCap className="w-4 h-4 text-brand-400" />
                      <h5 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                        Academic Institution
                      </h5>
                    </div>

                    <div className="p-3 rounded-lg bg-dark-950/70 border border-white/5 space-y-1">
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {profileData.education[0].degree}
                      </div>
                      <div className="text-xs text-brand-300 font-mono">
                        {profileData.education[0].institution}
                      </div>
                      <div className="text-[11px] text-dark-400 font-mono flex items-center gap-1.5 pt-0.5">
                        <Calendar className="w-3 h-3 text-dark-500" />
                        <span>{profileData.education[0].period}</span>
                        <span>•</span>
                        <span className="text-emerald-400">Pursuing</span>
                      </div>
                    </div>
                  </div>

                  {/* Recruiter Contact Quick Sheet */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <div className="text-[11px] font-mono text-dark-400 uppercase tracking-wider">
                      Recruiter Direct Contact
                    </div>
                    <div className="text-xs text-dark-300 space-y-1.5 bg-dark-950/50 p-3 rounded-lg border border-white/5 font-mono">
                      <div className="truncate"><strong className="text-white font-sans">Email:</strong> {profileData.contact.email}</div>
                      <div><strong className="text-white font-sans">Phone:</strong> {profileData.contact.phone}</div>
                      <div><strong className="text-white font-sans">Location:</strong> {profileData.contact.location}</div>
                      <div className="text-emerald-400 font-sans font-medium text-[11px] pt-1">
                        ✓ Immediate Joining & Rotational Flexibility
                      </div>
                    </div>
                  </div>

                  {/* Instant Download Action in Card */}
                  <a
                    href={activeResume.file}
                    download={activeResume.downloadName}
                    onClick={handleDownload}
                    className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-brand-300 border border-brand-500/20 hover:border-brand-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm"
                    aria-label={`Save ${activeResume.downloadName} to disk`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download {activeResume.title}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
