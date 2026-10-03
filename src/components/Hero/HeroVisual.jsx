import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Headphones, 
  GraduationCap, 
  CheckCircle2, 
  Terminal, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';
import { profileData } from '../../data/profile.js';
import { useProfile } from '../../context/ProfileContext.jsx';

export const HeroVisual = ({ onOpenResume, onContactClick }) => {
  const { profileMode, setProfileMode, stealthMode } = useProfile();

  // If profileMode is 'tech' or 'bpo', sync the tab automatically; if 'all', allow local toggle defaulting to technical
  const activeTab = profileMode === 'bpo' ? 'operations' : 'technical';

  const handleTabToggle = (tab) => {
    if (tab === 'technical') {
      setProfileMode(profileMode === 'bpo' ? 'tech' : profileMode);
    } else {
      setProfileMode(profileMode === 'tech' ? 'bpo' : profileMode);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      {/* Subtle ambient backdrop glow */}
      <div 
        className="absolute -inset-1 rounded-3xl opacity-50 blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.25) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      {/* Main Interactive Profile Showcase Card */}
      <div className="relative z-10 rounded-2xl glass-card border border-white/10 bg-dark-900/85 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        {/* Card Header: Identity & Credential Badges */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/25 to-dark-900 border border-brand-400/40 flex items-center justify-center text-brand-300 font-mono font-bold text-base shadow-inner">
              AK
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-dark-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-base font-bold text-white tracking-tight">
                  {profileData.name}
                </div>
              </div>
              <p className="text-xs text-dark-300 font-mono flex items-center gap-1.5 mt-0.5">
                <span className="text-brand-300 font-medium">BCA Graduate</span>
                <span className="text-dark-600">•</span>
                <span className="text-dark-400">
                  {profileMode === 'tech' ? 'Frontend & Web Development' : profileMode === 'bpo' ? 'Customer Support & Operations' : 'Dual-Domain Profile'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available</span>
          </div>
        </div>

        {/* Dual-Track Segmented Switcher (Hidden in Stealth Mode) */}
        {!stealthMode ? (
          <div className="my-4">
            <div className="flex p-1 rounded-xl bg-dark-950 border border-white/10" role="tablist" aria-label="Profile Track Switcher">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'technical'}
                onClick={() => handleTabToggle('technical')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'technical'
                    ? 'bg-brand-500 text-dark-950 shadow-glow-sm'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Technical Track</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'operations'}
                onClick={() => handleTabToggle('operations')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'operations'
                    ? 'bg-teal-500 text-dark-950 shadow-glow-sm'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Operations & BPO</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="my-3.5 flex items-center justify-between px-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-brand-400 font-semibold flex items-center gap-1.5">
              {activeTab === 'technical' ? (
                <>
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Developer Execution Sandbox</span>
                </>
              ) : (
                <>
                  <Headphones className="w-3.5 h-3.5 text-teal-400" />
                  <span>Operations & Quality Protocol</span>
                </>
              )}
            </span>
            <span className="text-[10px] font-mono text-dark-400">
              {activeTab === 'technical' ? 'Verified Code Environment' : 'Verified SLA Framework'}
            </span>
          </div>
        )}

        {/* Console Display Container */}
        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            {activeTab === 'technical' ? (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {/* Code Terminal Mockup */}
                <div className="rounded-xl bg-dark-950/95 border border-white/10 p-3 sm:p-3.5 font-mono text-[11px] sm:text-xs shadow-inner overflow-x-auto">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-dark-800 text-dark-400 text-[10px] sm:text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      <span className="ml-2 text-dark-300 font-sans font-medium">TechnicalProfile.js</span>
                    </div>
                    <span className="text-brand-400 text-[10px] font-semibold uppercase">React & Node</span>
                  </div>
                  <div className="text-dark-200 space-y-1">
                    <p><span className="text-purple-400">const</span> developer = &#123;</p>
                    <p className="pl-4">role: <span className="text-brand-300">'Full Stack Web Developer'</span>,</p>
                    <p className="pl-4">stack: [<span className="text-amber-300">'React'</span>, <span className="text-amber-300">'Node'</span>, <span className="text-amber-300">'Express'</span>, <span className="text-amber-300">'MongoDB'</span>],</p>
                    <p className="pl-4">standards: [<span className="text-emerald-300">'Semantic HTML'</span>, <span className="text-emerald-300">'REST APIs'</span>],</p>
                    <p className="pl-4">status: <span className="text-emerald-400">'Ready for Production'</span></p>
                    <p>&#125;;</p>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['React', 'JavaScript ES6+', 'Node.js', 'Express', 'MongoDB', 'Git / GitHub', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-dark-950 text-brand-300 border border-brand-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="operations"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {/* Operations & Support Console */}
                <div className="rounded-xl bg-dark-950/95 border border-white/10 p-3 sm:p-3.5 text-xs shadow-inner space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between text-dark-300 pb-2 border-b border-dark-800 gap-1.5">
                    <span className="font-semibold text-white flex items-center gap-1.5 text-xs">
                      <Headphones className="w-3.5 h-3.5 text-teal-400" />
                      Support & BPO Protocol
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                      SLA: 100% Adherence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-dark-900 border border-white/5">
                      <div className="text-dark-400">Communication</div>
                      <div className="font-semibold text-white mt-0.5">Voice, Email & Chat</div>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-white/5">
                      <div className="text-dark-400">Data & Reporting</div>
                      <div className="font-semibold text-white mt-0.5">Excel (VLOOKUP / Pivot)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-white/5">
                      <div className="text-dark-400">Resolution Style</div>
                      <div className="font-semibold text-white mt-0.5">Empathetic De-escalation</div>
                    </div>
                    <div className="p-2 rounded-lg bg-dark-900 border border-white/5">
                      <div className="text-dark-400">Shift Readiness</div>
                      <div className="font-semibold text-emerald-400 mt-0.5">24x7 Rotational Ready</div>
                    </div>
                  </div>
                </div>

                {/* Operations Competency Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Customer Support', 'Active Listening', 'Email Etiquette', 'Live Chat Support', 'Data Accuracy', 'Time Management'].map((op) => (
                    <span
                      key={op}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-dark-950 text-teal-300 border border-teal-500/20"
                    >
                      {op}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Metrics Row */}
        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-dark-300">
          <div className="flex items-center gap-1.5 text-xs font-mono text-dark-300">
            <span className="w-2 h-2 rounded-full bg-brand-400" />
            <span>Fast Learner & Adaptable</span>
          </div>

          <a
            href="#career-profile"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-brand-300 group"
          >
            <span>Full Profile</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
