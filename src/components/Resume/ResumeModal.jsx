import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  Printer
} from 'lucide-react';
import { modalOverlayVariants, modalDialogVariants } from '../../utils/motion.js';
import { useResume } from '../../hooks/useResume.js';

export const ResumeModal = ({ isOpen, onClose, selectedResume }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  const { 
    activeResume: hookActiveResume, 
    handleDownload, 
    handleOpenNewTab, 
    handlePrint 
  } = useResume();

  // Prefer explicitly passed resume or fallback to active context resume
  const resume = selectedResume || hookActiveResume;

  useEffect(() => {
    previousFocusRef.current = document.activeElement;

    // Focus close button on mount
    const timer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector('button[aria-label="Close Resume Viewer"]');
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

    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="resume-modal-title"
      >
        {/* Backdrop */}
        <motion.div
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          variants={modalDialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative z-10 w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl glass-card border border-white/10 bg-dark-950 shadow-2xl overflow-hidden focus:outline-none"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-dark-900/95 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="icon-box-brand !w-9 !h-9 !rounded-lg flex-shrink-0">
                <FileText className="w-4 h-4 text-brand-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 id="resume-modal-title" className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {resume.title}
                  </h3>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    {resume.profileMode?.toUpperCase() || 'RESUME'}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-dark-400 hidden xs:block">
                  {resume.downloadName} • {resume.institution}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              {/* Open in New Tab Button */}
              <a
                href={resume.file}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleOpenNewTab}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white glass-pill border border-white/10 hover:bg-dark-800 transition-colors"
                title="Open PDF directly in new browser tab"
                aria-label={`Open ${resume.title} in new browser tab`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-brand-300" />
                <span className="hidden sm:inline">Open in New Tab</span>
              </a>

              {/* Print Button */}
              <button
                type="button"
                onClick={handlePrint}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-dark-300 hover:text-white glass-pill border border-white/10 hover:bg-dark-800 transition-colors"
                title="Print PDF"
                aria-label="Print resume document"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              {/* Direct Download Button */}
              <a
                href={resume.file}
                download={resume.downloadName}
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 min-h-[36px] rounded-lg text-xs font-semibold text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 transition-all shadow-glow-sm active:scale-95"
                aria-label={`Download ${resume.downloadName}`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download<span className="hidden xs:inline"> PDF</span></span>
              </a>

              {/* Close Button with 44px min touch target */}
              <button
                type="button"
                onClick={onClose}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 rounded-xl text-dark-300 hover:text-white hover:bg-dark-800 transition-colors active:scale-95"
                aria-label="Close Resume Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded Real PDF Viewer */}
          <div className="relative flex-1 w-full h-full bg-dark-900/50 overflow-hidden">
            <object
              data={resume.file}
              type="application/pdf"
              className="w-full h-full"
              aria-label={resume.title}
            >
              {/* Fallback if browser doesn't embed PDFs inline (e.g. mobile Safari / Chrome) */}
              <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="max-w-md">
                  <h4 className="text-lg font-bold text-white mb-1">
                    {resume.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-dark-300">
                    Your browser or device does not render inline PDF previews. You can open the document in a new tab or download it directly.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={resume.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleOpenNewTab}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white glass-card border border-white/10 hover:border-brand-500/40"
                    aria-label={`Open ${resume.title} in new tab`}
                  >
                    <ExternalLink className="w-4 h-4 text-brand-400" />
                    <span>Open in New Tab</span>
                  </a>
                  <a
                    href={resume.file}
                    download={resume.downloadName}
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400"
                    aria-label={`Download ${resume.downloadName}`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </object>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeModal;
