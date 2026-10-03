import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Copy, 
  Check, 
  ExternalLink, 
  Code2, 
  Headphones, 
  Layers, 
  Sparkles, 
  X, 
  Sliders, 
  Globe, 
  AlertCircle,
  Command,
  RotateCcw
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext.jsx';
import { modalOverlayVariants, modalDialogVariants } from '../../utils/motion.js';

export const SecretMasterController = () => {
  const {
    profileMode,
    setProfileMode,
    stealthMode,
    setStealthMode,
    isUrlLocked,
    defaultPublicMode,
    setDefaultPublicMode,
    secretControllerOpen,
    closeSecretController,
  } = useProfile();

  const [copiedKey, setCopiedKey] = useState(null);
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && secretControllerOpen) {
        e.preventDefault();
        closeSecretController();
      }
    };

    if (secretControllerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [secretControllerOpen, closeSecretController]);

  // Construct sharing links based on current window origin
  const getShareUrl = (track) => {
    if (typeof window === 'undefined') return '';
    const base = `${window.location.origin}${window.location.pathname}`;
    if (!track || track === 'all') return base;
    return `${base}?track=${track}`;
  };

  const handleCopyLink = async (track, key) => {
    const url = getShareUrl(track);
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    } catch {
      // Safe fallback
    }
  };

  const resetUrlLock = () => {
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete('track');
        url.searchParams.delete('profile');
        window.history.replaceState({}, '', url.pathname);
        window.location.reload();
      } catch {
        // Safe fallback
      }
    }
  };

  if (!secretControllerOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-controller-title"
      >
        {/* Backdrop */}
        <motion.div
          variants={modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeSecretController}
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
          className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl glass-card border border-brand-500/30 bg-dark-950 shadow-2xl shadow-brand-500/10 overflow-hidden focus:outline-none my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-dark-900/90 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/25 to-dark-800 border border-brand-400/40 flex items-center justify-center text-brand-300 shadow-inner">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="secret-controller-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Master Profile Controller
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-brand-500/20 text-brand-300 border border-brand-400/30">
                    Private
                  </span>
                </div>
                <p className="text-xs text-dark-400 font-mono">
                  Stealth Dual-Track & Recruiter Visibility Management
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeSecretController}
              aria-label="Close Controller"
              className="p-2 rounded-xl text-dark-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
            {/* Status Alert if Locked by URL */}
            {isUrlLocked && (
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-start justify-between gap-3 text-xs text-cyan-200">
                <div className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">
                      Targeted URL Active: <code className="text-cyan-300">?track={profileMode}</code>
                    </span>
                    <span className="text-cyan-300/80">
                      Recruiters opening this link will see a strictly dedicated single-track portfolio with all switchers hidden.
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetUrlLock}
                  className="px-2.5 py-1 rounded-lg bg-dark-900 hover:bg-dark-800 text-cyan-300 border border-cyan-500/30 font-mono text-[11px] flex items-center gap-1.5 flex-shrink-0"
                  title="Remove track parameter and reload root page"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset URL</span>
                </button>
              </div>
            )}

            {/* SECTION 1: Instant Preview Switcher */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-mono uppercase tracking-wider text-brand-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live Preview Track</span>
                </label>
                <span className="text-[11px] font-mono text-dark-400">
                  Current: <strong className="text-white uppercase">{profileMode}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Tech Track Option */}
                <button
                  type="button"
                  onClick={() => setProfileMode('tech')}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    profileMode === 'tech'
                      ? 'bg-cyan-500/15 border-cyan-400/60 shadow-glow-sm'
                      : 'bg-dark-900/60 border-white/10 hover:border-white/20 hover:bg-dark-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      Technical
                    </span>
                    {profileMode === 'tech' && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-dark-300 leading-tight">
                    Pure Web Dev, React & Node. Omits all BPO references.
                  </p>
                </button>

                {/* BPO Track Option */}
                <button
                  type="button"
                  onClick={() => setProfileMode('bpo')}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    profileMode === 'bpo'
                      ? 'bg-teal-500/15 border-teal-400/60 shadow-glow-sm'
                      : 'bg-dark-900/60 border-white/10 hover:border-white/20 hover:bg-dark-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Headphones className="w-4 h-4 text-teal-400" />
                      Operations
                    </span>
                    {profileMode === 'bpo' && (
                      <span className="w-2 h-2 rounded-full bg-teal-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-dark-300 leading-tight">
                    Customer Support, SLA, MS Excel. Omits code projects.
                  </p>
                </button>

                {/* Dual Track Option */}
                <button
                  type="button"
                  onClick={() => setProfileMode('all')}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    profileMode === 'all'
                      ? 'bg-brand-500/15 border-brand-400/60 shadow-glow-sm'
                      : 'bg-dark-900/60 border-white/10 hover:border-white/20 hover:bg-dark-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <Layers className="w-4 h-4 text-brand-400" />
                      Dual Track
                    </span>
                    {profileMode === 'all' && (
                      <span className="w-2 h-2 rounded-full bg-brand-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-dark-300 leading-tight">
                    Unrestricted side-by-side presentation of both domains.
                  </p>
                </button>
              </div>
            </div>

            {/* SECTION 2: Recruiter Stealth Mode Toggle */}
            <div className="p-4 rounded-xl bg-dark-900/70 border border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {stealthMode ? (
                    <Lock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Unlock className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="text-sm font-bold text-white">
                    Recruiter Stealth Mode
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    stealthMode
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {stealthMode ? 'ENABLED (SWITCHERS HIDDEN)' : 'DISABLED (PUBLIC SWITCHER)'}
                  </span>
                </div>
                <p className="text-xs text-dark-300 leading-relaxed">
                  When enabled, completely removes all public switcher buttons (Navbar, Hero, Resume) so recruiters never know a dual-track exists.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={stealthMode}
                onClick={() => setStealthMode(!stealthMode)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                  stealthMode ? 'bg-emerald-500' : 'bg-dark-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    stealthMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* SECTION 3: 1-Click Recruiter Link Generator */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-brand-400 font-semibold block mb-2.5">
                1-Click Recruiter Share Links
              </label>

              <div className="space-y-2">
                {/* Tech Recruiter Link */}
                <div className="p-3 rounded-xl bg-dark-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>For IT / Software Recruiter</span>
                    </div>
                    <p className="text-[11px] font-mono text-dark-400 break-all">
                      {getShareUrl('tech')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink('tech', 'tech')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 self-start sm:self-auto min-w-[110px] transition-colors"
                  >
                    {copiedKey === 'tech' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* BPO Recruiter Link */}
                <div className="p-3 rounded-xl bg-dark-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                      <Headphones className="w-3.5 h-3.5 text-teal-400" />
                      <span>For BPO / Customer Operations Recruiter</span>
                    </div>
                    <p className="text-[11px] font-mono text-dark-400 break-all">
                      {getShareUrl('bpo')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink('bpo', 'bpo')}
                    className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 self-start sm:self-auto min-w-[110px] transition-colors"
                  >
                    {copiedKey === 'bpo' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Neutral / Root Link */}
                <div className="p-3 rounded-xl bg-dark-900/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                      <Globe className="w-3.5 h-3.5 text-brand-400" />
                      <span>General / Neutral Portfolio Link</span>
                    </div>
                    <p className="text-[11px] font-mono text-dark-400 break-all">
                      {getShareUrl('all')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyLink('all', 'all')}
                    className="px-3 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 border border-brand-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 self-start sm:self-auto min-w-[110px] transition-colors"
                  >
                    {copiedKey === 'all' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION 4: Default Public Landing Mode */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-brand-400 font-semibold block mb-2">
                Default Public Landing Mode (When No URL Query Provided)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'tech', label: 'Tech First' },
                  { id: 'bpo', label: 'BPO First' },
                  { id: 'all', label: 'Dual View' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDefaultPublicMode(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      defaultPublicMode === item.id
                        ? 'bg-brand-500/20 border-brand-400 text-white shadow-sm'
                        : 'bg-dark-900 border-white/10 text-dark-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 5: How To Reopen Anytime */}
            <div className="p-3.5 rounded-xl bg-dark-900/40 border border-white/5 space-y-1.5 text-xs text-dark-400">
              <span className="font-semibold text-white flex items-center gap-1.5 font-mono text-[11px]">
                <Command className="w-3.5 h-3.5 text-brand-400" />
                HOW TO REOPEN THIS CONTROLLER
              </span>
              <ul className="space-y-1 list-disc list-inside text-dark-300 text-[11px]">
                <li>Press <kbd className="px-1.5 py-0.5 rounded bg-dark-800 text-white border border-white/10 font-mono">Ctrl + Shift + P</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-dark-800 text-white border border-white/10 font-mono">⌘ + Shift + P</kbd>) anywhere on the site.</li>
                <li>Or rapidly <strong>triple-click</strong> the <code className="text-brand-300 font-mono">AK</code> logo badge in the top-left corner within 1 second.</li>
              </ul>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-5 sm:px-6 py-3.5 border-t border-white/10 bg-dark-900/90 flex items-center justify-between flex-shrink-0">
            <span className="text-[11px] font-mono text-dark-400">
              Status: {stealthMode ? '🔒 Stealth Active' : '🔓 Switchers Visible'}
            </span>
            <button
              type="button"
              onClick={closeSecretController}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 text-dark-950 font-bold text-xs shadow-glow-sm hover:brightness-110 active:scale-98 transition-all"
            >
              Done & Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SecretMasterController;
