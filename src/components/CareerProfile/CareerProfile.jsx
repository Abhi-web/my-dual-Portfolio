import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Headphones, Laptop } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { technicalSkills, professionalSkills } from '../../data/skills.js';
import { IconRenderer } from '../common/IconRenderer.jsx';
import { useProfile } from '../../context/ProfileContext.jsx';
import { Skill3DIcon } from '../Skills/Skill3DIcon.jsx';

export const CareerProfile = () => {
  const { profileMode, setProfileMode, stealthMode } = useProfile();

  // Map profileMode to track view: 'all' -> 'both', 'tech' -> 'technical', 'bpo' -> 'professional'
  const selectedTrack = profileMode === 'tech' ? 'technical' : profileMode === 'bpo' ? 'professional' : 'both';

  const handleTrackChange = (track) => {
    if (track === 'both') setProfileMode('all');
    else if (track === 'technical') setProfileMode('tech');
    else if (track === 'professional') setProfileMode('bpo');
  };

  return (
    <section id="career-profile" className="py-20 md:py-28 relative bg-dark-900/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={selectedTrack === 'technical' ? "Technical Competencies" : selectedTrack === 'professional' ? "Operations Competencies" : "Dual-Track Competencies"}
          title={selectedTrack === 'technical' ? "Web Engineering &" : selectedTrack === 'professional' ? "Operations &" : "Professional"}
          titleHighlight={selectedTrack === 'technical' ? "Proficiencies" : selectedTrack === 'professional' ? "Mastery" : "Profile"}
          subtitle={selectedTrack === 'technical' 
            ? "A comprehensive breakdown of configured technical proficiencies, frontend frameworks, backend APIs, and modern development tools."
            : selectedTrack === 'professional'
            ? "A specialized breakdown of customer operations, SLA adherence, quality inspection, and enterprise support workflows."
            : "A clear, transparent breakdown of configured technical proficiencies alongside enterprise customer operations capabilities."}
        />

        {/* Track Filter Controls (Hidden in Stealth Mode) */}
        {!stealthMode && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            <div className="flex flex-wrap sm:flex-nowrap p-1 rounded-xl bg-dark-950 border border-white/10 w-full sm:w-auto" role="tablist" aria-label="Career Track Filter">
              <button
                type="button"
                role="tab"
                aria-selected={selectedTrack === 'both'}
                onClick={() => handleTrackChange('both')}
                className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 min-h-[38px] rounded-lg text-xs font-semibold transition-all ${
                  selectedTrack === 'both'
                    ? 'bg-dark-800 text-white shadow-sm border border-white/15'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <span className="hidden sm:inline">Side-by-Side </span>Dual View
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedTrack === 'technical'}
                onClick={() => handleTrackChange('technical')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 min-h-[38px] rounded-lg text-xs font-semibold transition-all ${
                  selectedTrack === 'technical'
                    ? 'bg-brand-500 text-dark-950 shadow-glow-sm'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Technical<span className="hidden sm:inline"> Track</span></span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={selectedTrack === 'professional'}
                onClick={() => handleTrackChange('professional')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 min-h-[38px] rounded-lg text-xs font-semibold transition-all ${
                  selectedTrack === 'professional'
                    ? 'bg-teal-500 text-dark-950 shadow-glow-sm'
                    : 'text-dark-400 hover:text-white'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span><span className="hidden sm:inline">Professional & </span>Operations</span>
              </button>
            </div>

            <div className="text-xs font-mono text-dark-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Centralized & Production-Configured Data</span>
            </div>
          </div>
        )}

        {/* Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* TECHNICAL COLUMN */}
          {(selectedTrack === 'both' || selectedTrack === 'technical') && (
            <motion.div
              layout
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`space-y-4 ${selectedTrack === 'technical' ? 'lg:col-span-2 max-w-4xl mx-auto' : ''}`}
            >
              {/* Header Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/60 to-dark-900 border border-brand-500/30 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="icon-box-brand">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      TECHNICAL PROFICIENCIES
                    </h3>
                    <p className="text-xs text-brand-300/80 font-mono">
                      Web Engineering, Architecture & Tools
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-brand-500/10 text-brand-300 border border-brand-500/30">
                  {technicalSkills.length} Core Skills
                </span>
              </div>

              {/* Technical Skill List */}
              <div className="space-y-3">
                {technicalSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl glass-card border border-white/10 hover:border-brand-500/40 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <Skill3DIcon name={skill.name} size="sm" isHovered={true} />
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] font-mono text-dark-400">
                            {skill.tag}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-brand-300 border border-brand-500/20">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-dark-300 leading-relaxed mb-3">
                      {skill.context}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-dark-950 text-dark-200 border border-white/5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROFESSIONAL & OPERATIONS COLUMN */}
          {(selectedTrack === 'both' || selectedTrack === 'professional') && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`space-y-4 ${selectedTrack === 'professional' ? 'lg:col-span-2 max-w-4xl mx-auto' : ''}`}
            >
              {/* Header Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/60 to-dark-900 border border-teal-500/30 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="icon-box-teal">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      PROFESSIONAL & OPERATIONS
                    </h3>
                    <p className="text-xs text-teal-300/80 font-mono">
                      Client Support, Data Handling & Communication
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  {professionalSkills.length} Core Skills
                </span>
              </div>

              {/* Professional Skill List */}
              <div className="space-y-3">
                {professionalSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl glass-card border border-white/10 hover:border-teal-500/40 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <Skill3DIcon name={skill.name} size="sm" isHovered={true} />
                        <div>
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            {skill.name}
                          </h4>
                          <span className="text-[11px] font-mono text-dark-400">
                            {skill.tag}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-teal-300 border border-teal-500/20">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-dark-300 leading-relaxed mb-3">
                      {skill.context}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skill.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-dark-950 text-dark-200 border border-white/5"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CareerProfile;
