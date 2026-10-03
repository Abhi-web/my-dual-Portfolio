import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Eye, Mail } from 'lucide-react';
import { Github } from '../common/BrandIcons.jsx';
import { profileData } from '../../data/profile.js';
import { profileModesConfig } from '../../data/profileModes.js';
import { useProfile } from '../../context/ProfileContext.jsx';
import { useResume } from '../../hooks/useResume.js';
import { ProfileSwitcher } from '../common/ProfileSwitcher.jsx';
import { HeroVisual } from './HeroVisual.jsx';

export const Hero = ({ onOpenResume }) => {
  const { profileMode } = useProfile();
  const { activeResume, handleDownload } = useResume();
  const currentMode = profileModesConfig[profileMode] || profileModesConfig.all;

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: elPos, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Core Positioning & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Toolbar: Mode Switcher & Availability Indicator */}
            <div className="flex flex-wrap items-center gap-3 mb-6 w-full">
              <ProfileSwitcher size="md" idPrefix="hero" />

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill border border-emerald-500/30 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-medium text-emerald-300">
                  {profileData.availability.status}
                </span>
              </div>
            </div>

            {/* Candidate Name & Primary Professional Heading */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2 leading-[1.1] break-words">
              <span className="block">{profileData.name}</span>
              <span className="block text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-teal-300 mt-2 tracking-normal">
                {profileMode === 'tech'
                  ? 'BCA Graduate • Frontend & Full-Stack Web Developer'
                  : profileMode === 'bpo'
                  ? 'BCA Graduate • Customer Support & Operations Specialist'
                  : 'BCA Graduate • Web Developer & Operations Specialist'}
              </span>
            </h1>

            {/* Dynamic Content Transitions with AnimatePresence */}
            <AnimatePresence mode="wait">
              <motion.div
                key={profileMode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full"
              >
                {/* Mode Sub-Badge */}
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono font-semibold border ${
                    profileMode === 'tech'
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      : profileMode === 'bpo'
                      ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                      : 'bg-brand-500/10 text-brand-300 border-brand-500/30'
                  }`}>
                    {currentMode.badge}
                  </span>
                </div>

                {/* High-Impact Dynamic Headline */}
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-dark-100 mb-4 leading-snug">
                  {currentMode.headline}
                </h2>

                {/* Narrative Paragraph */}
                <p className="text-xs xs:text-sm sm:text-base text-dark-300 font-normal leading-relaxed max-w-2xl mb-8">
                  {currentMode.description}
                </p>

                {/* Dynamic Action Buttons with minimum 44px touch targets on mobile */}
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto mb-10">
                  {/* Primary CTA */}
                  {currentMode.primaryCTA.isScroll ? (
                    <a
                      href={currentMode.primaryCTA.href}
                      onClick={(e) => scrollToSection(e, currentMode.primaryCTA.href.substring(1))}
                      className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 active:scale-95"
                    >
                      <span>{currentMode.primaryCTA.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <a
                      href={currentMode.primaryCTA.href}
                      className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 shadow-glow-sm hover:shadow-glow-md transition-all duration-300 active:scale-95"
                    >
                      <span>{currentMode.primaryCTA.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  {/* Profile-Aware Resume Download CTA */}
                  <a
                    href={activeResume.file}
                    download={activeResume.downloadName}
                    onClick={handleDownload}
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white glass-card border border-white/10 hover:border-brand-500/40 hover:bg-dark-800 transition-all duration-300 active:scale-95"
                    aria-label={`Download ${activeResume.title} as ${activeResume.downloadName}`}
                    title={`Download ${activeResume.title} (${activeResume.downloadName})`}
                  >
                    <Download className="w-4 h-4 text-brand-400" />
                    <span>Download Resume</span>
                  </a>

                  {/* Profile-Aware Resume View CTA */}
                  <button
                    type="button"
                    onClick={() => onOpenResume?.(activeResume)}
                    className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-dark-200 glass-pill border border-white/10 hover:text-white hover:border-brand-500/30 hover:bg-dark-800 transition-all duration-300 active:scale-95"
                    aria-label={`View ${activeResume.title} in preview modal`}
                  >
                    <Eye className="w-4 h-4 text-teal-300" />
                    <span>View Resume</span>
                  </button>

                  {/* GitHub for Technical Mode */}
                  {profileMode === 'tech' && (
                    <a
                      href="https://github.com/abhishekkushwaha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-xs sm:text-sm text-dark-300 hover:text-white hover:bg-dark-900 transition-colors"
                      aria-label="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {/* Additional CTA */}
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-xs sm:text-sm text-dark-300 hover:text-white hover:bg-dark-900 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contact</span>
                  </a>
                </div>

                {/* Above-the-fold Quick Proof Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full pt-6 border-t border-white/10">
                  {currentMode.metrics.map((metric, idx) => (
                    <div key={idx} className="p-2.5 sm:p-3 rounded-xl bg-dark-900/60 border border-white/5 flex flex-col">
                      <span className="text-lg xs:text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                        {metric.value}
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-dark-200 mt-0.5 truncate">
                        {metric.label}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-dark-400 leading-tight mt-0.5 truncate">
                        {metric.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Interactive Profile Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <HeroVisual onOpenResume={onOpenResume} onContactClick={(e) => scrollToSection(e, 'contact')} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
