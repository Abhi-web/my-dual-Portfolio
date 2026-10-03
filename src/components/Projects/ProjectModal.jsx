import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { Github } from '../common/BrandIcons.jsx';
import { modalOverlayVariants, modalDialogVariants } from '../../utils/motion.js';

export const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    // Focus close button on mount
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector('button[aria-label="Close Project Modal"]');
      if (closeBtn) closeBtn.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !modalRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        {/* Backdrop Blur */}
        <motion.div
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/85 backdrop-blur-md"
        />

        {/* Modal Dialog Content */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          variants={modalDialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl glass-card border border-white/10 bg-dark-950 shadow-2xl p-4 sm:p-8 focus:outline-none"
        >
          {/* Close Button with 44px touch target */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl glass-pill border border-white/10 text-dark-300 hover:text-white hover:bg-dark-800 transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Project Preview Image */}
          <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-6 border border-white/10">
            <img
              src={project.image}
              alt={`${project.title} - application interface and architecture preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-brand-500 text-dark-950 shadow-md">
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-dark-900/90 text-brand-300 border border-brand-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  Flagship Showcase
                </span>
              )}
            </div>
          </div>

          {/* Project Title & Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white glass-pill border border-white/10 hover:bg-dark-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-dark-950 bg-brand-400 hover:bg-brand-300 transition-colors shadow-glow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>

          {/* Key Metrics Row */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-dark-900/90 border border-white/5 mb-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-dark-400">{m.label}</div>
                  <div className="text-sm sm:text-base font-bold text-brand-300 font-mono mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Narrative */}
          <div className="space-y-4 mb-6 text-sm sm:text-base text-dark-200 leading-relaxed">
            <p>{project.fullDescription || project.shortDescription}</p>
          </div>

          {/* Architecture Box */}
          {project.architecture && (
            <div className="p-4 rounded-xl bg-dark-900/60 border border-white/5 mb-6 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-brand-400 font-semibold">
                  Technical Architecture
                </div>
                <div className="text-xs sm:text-sm text-dark-300 mt-1">
                  {project.architecture}
                </div>
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.features && (
            <div className="mb-6">
              <h4 className="text-sm font-mono uppercase tracking-wider text-dark-400 font-semibold mb-3">
                Key Deliverables & Engineering Features
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-dark-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges Solved */}
          {project.challengesSolved && (
            <div className="p-4 rounded-xl bg-dark-900/80 border border-brand-500/20 mb-6">
              <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-1">
                Engineering Challenge Overcome
              </div>
              <p className="text-xs sm:text-sm text-dark-300">
                {project.challengesSolved}
              </p>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-dark-400 mb-2">
              Technology Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-dark-900 text-brand-300 border border-brand-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Recruiter / Hiring Connection CTA */}
          <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-dark-300 text-center sm:text-left">
              Interested in this project or discussing custom software solutions?
            </span>
            <a
              href="#contact"
              onClick={() => {
                onClose();
                const el = document.getElementById('contact');
                if (el) {
                  const navOffset = 80;
                  const elPos = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
                  window.scrollTo({ top: elPos, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-500/20 text-brand-300 border border-brand-500/40 hover:bg-brand-500 hover:text-dark-950 font-semibold transition-all active:scale-95"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
