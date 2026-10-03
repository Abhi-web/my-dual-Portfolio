import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Eye } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext.jsx';
import { useResume } from '../../hooks/useResume.js';
import { ProfileSwitcher } from '../common/ProfileSwitcher.jsx';

const desktopNavLinks = [
  { name: 'Home', href: '#home', modes: ['all', 'tech', 'bpo'] },
  { name: 'About', href: '#about', modes: ['all'] },
  { name: 'Skills', href: '#skills', modes: ['all', 'tech', 'bpo'] },
  { name: 'Profile', href: '#career-profile', modes: ['all', 'tech', 'bpo'] },
  { name: 'Experience', href: '#experience', modes: ['all', 'tech', 'bpo'] },
  { name: 'Projects', href: '#projects', modes: ['all', 'tech'] },
  { name: 'Strengths', href: '#professional-strengths', modes: ['all', 'bpo'] },
  { name: 'Services', href: '#services', modes: ['all'] },
  { name: 'Resume', href: '#resume-preview', modes: ['all', 'tech', 'bpo'] },
  { name: 'Contact', href: '#contact', modes: ['all', 'tech', 'bpo'] },
];

// Complete mobile navigation filtered by active track mode
const mobileNavLinks = [
  { name: 'Home', href: '#home', modes: ['all', 'tech', 'bpo'] },
  { name: 'About', href: '#about', modes: ['all'] },
  { name: 'Skills', href: '#skills', modes: ['all', 'tech', 'bpo'] },
  { name: 'Experience', href: '#experience', modes: ['all', 'tech', 'bpo'] },
  { name: 'Projects', href: '#projects', modes: ['all', 'tech'] },
  { name: 'Strengths & BPO', href: '#professional-strengths', modes: ['all', 'bpo'] },
  { name: 'Services', href: '#services', modes: ['all'] },
  { name: 'Resume & CV', href: '#resume-preview', modes: ['all', 'tech', 'bpo'] },
  { name: 'Contact', href: '#contact', modes: ['all', 'tech', 'bpo'] },
];

export const Navbar = ({ onOpenResume }) => {
  const { profileMode, stealthMode, openSecretController } = useProfile();
  const { activeResume, handleDownload } = useResume();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = React.useRef(null);
  const prevMenuOpenRef = React.useRef(false);

  // Triple-click secret trigger state for Abhishek's Master Controller
  const clickCountRef = React.useRef(0);
  const clickTimerRef = React.useRef(null);

  const handleLogoClick = (e) => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      e.preventDefault();
      clickCountRef.current = 0;
      openSecretController();
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);

    scrollToSection(e, '#home');
  };

  // Subtly adapt visible nav links based on profile mode for desktop header
  const navLinks = desktopNavLinks.filter(
    (link) => !link.modes || link.modes.includes(profileMode)
  );

  const activeMobileLinks = mobileNavLinks.filter(
    (link) => !link.modes || link.modes.includes(profileMode)
  );

  // Restore focus to menu toggle button when mobile drawer closes
  useEffect(() => {
    if (prevMenuOpenRef.current && !mobileMenuOpen) {
      menuButtonRef.current?.focus();
    }
    prevMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 30;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));

      // Scroll spy for active section
      const scrollPosition = scrollY + 160;
      for (let i = desktopNavLinks.length - 1; i >= 0; i--) {
        const id = desktopNavLinks[i].href.substring(1);
        const sectionEl = document.getElementById(id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection((prev) => (prev !== id ? id : prev));
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/85 backdrop-blur-md border-b border-dark-700/60 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo (With secret triple-click controller trigger) */}
        <a
          href="#home"
          onClick={handleLogoClick}
          className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-xl p-1 select-none"
          aria-label="Abhishek Kushwaha - Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-dark-800 to-dark-900 border border-brand-500/30 group-hover:border-brand-400 transition-colors shadow-inner">
            <span className="font-mono font-bold text-sm text-brand-300">AK</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-dark-950" />
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full glass-pill border border-dark-700/40">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium transition-colors rounded-full ${
                  isActive
                    ? 'text-white'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-brand-500/20 border border-brand-400/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </div>

        {/* Right Actions: Profile Mode Switcher + Recruiter Resume Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <ProfileSwitcher size="sm" idPrefix="nav-desktop" />

          <div className="flex items-center p-0.5 rounded-xl bg-dark-900/90 border border-brand-500/20 shadow-sm">
            {/* Direct Download Resume Button for Active Profile */}
            <a
              href={activeResume.file}
              download={activeResume.downloadName}
              onClick={handleDownload}
              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-brand-600/95 to-brand-500/95 hover:from-brand-500 hover:to-brand-400 shadow-glow-sm hover:shadow-glow-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              aria-label={`Download ${activeResume.title} as ${activeResume.downloadName}`}
              title={`Download ${activeResume.title} (${activeResume.downloadName})`}
            >
              <Download className="w-3.5 h-3.5 text-brand-100 group-hover:translate-y-0.5 transition-transform" />
              <span>Download Resume</span>
            </a>

            {/* Quick Preview Viewer Button */}
            <button
              type="button"
              onClick={onOpenResume}
              className="p-1.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              aria-label={`Preview ${activeResume.title}`}
              title="Preview in Viewer"
            >
              <Eye className="w-3.5 h-3.5 text-brand-300" />
            </button>
          </div>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex sm:hidden items-center gap-2">
          <div className="hidden xs:flex items-center">
            <ProfileSwitcher size="sm" idPrefix="nav-mobile-header" />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-xl glass-pill text-dark-200 hover:text-white border border-dark-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 active:scale-95"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-dark-950/80 backdrop-blur-md z-40"
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden border-b border-dark-700/80 bg-dark-950/98 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-2xl relative z-50 max-h-[85vh] overflow-y-auto"
            >
            <div className="flex flex-col gap-1 max-w-md mx-auto">
              {/* Profile Selector Inside Mobile Drawer (Only visible when Stealth Mode is unlocked) */}
              {!stealthMode && (
                <div className="pb-3 mb-2 border-b border-dark-800 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-dark-400">
                    Active Career Presentation
                  </span>
                  <ProfileSwitcher className="w-full flex justify-between" size="md" idPrefix="nav-drawer" />
                </div>
              )}
              {activeMobileLinks.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.025 }}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-brand-500/15 text-brand-300 border border-brand-400/30'
                        : 'text-dark-300 hover:text-white hover:bg-dark-850'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-brand-400" />}
                  </motion.a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-dark-800 flex flex-col gap-2.5">
                <a
                  href={activeResume.file}
                  download={activeResume.downloadName}
                  onClick={(e) => {
                    handleDownload(e);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-400 to-brand-500 text-dark-950 font-semibold text-sm shadow-glow-sm active:scale-98"
                  aria-label={`Download ${activeResume.title}`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download {activeResume.title}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-dark-300 hover:text-white glass-pill border border-white/5 active:scale-98"
                >
                  <Eye className="w-3.5 h-3.5 text-brand-300" />
                  <span>Preview PDF in Viewer</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </header>
  );
};

export default Navbar;
