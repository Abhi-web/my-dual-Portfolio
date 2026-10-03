import React from 'react';
import { ArrowUp, Mail, Phone, Code2, Headphones, Layers, Sliders } from 'lucide-react';
import { Linkedin, Github } from '../common/BrandIcons.jsx';
import { profileData } from '../../data/profile.js';
import { socialsData } from '../../data/socials.js';
import { useProfile } from '../../context/ProfileContext.jsx';

export const Footer = () => {
  const { profileMode, setProfileMode, openSecretController } = useProfile();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home', modes: ['all', 'tech', 'bpo'] },
    { name: 'About', href: '#about', modes: ['all'] },
    { name: 'Profile', href: '#career-profile', modes: ['all', 'tech', 'bpo'] },
    { name: 'Skills', href: '#skills', modes: ['all', 'tech', 'bpo'] },
    { name: 'Experience', href: '#experience', modes: ['all', 'tech', 'bpo'] },
    { name: 'Projects', href: '#projects', modes: ['all', 'tech'] },
    { name: 'Strengths', href: '#professional-strengths', modes: ['all', 'bpo'] },
    { name: 'Services', href: '#services', modes: ['all'] },
    { name: 'Resume', href: '#resume-preview', modes: ['all', 'tech', 'bpo'] },
    { name: 'Contact', href: '#contact', modes: ['all', 'tech', 'bpo'] },
  ];

  const visibleNavLinks = navLinks.filter(
    (link) => !link.modes || link.modes.includes(profileMode)
  );

  // Hidden stealth switch trigger for Abhishek (invisible to HR)
  const cornerClickRef = React.useRef({ count: 0, timer: null });

  const handleHiddenCornerSwitch = (e) => {
    e.preventDefault();
    cornerClickRef.current.count += 1;

    if (cornerClickRef.current.timer) {
      clearTimeout(cornerClickRef.current.timer);
    }

    // Triple click opens the secret Master Profile Controller
    if (cornerClickRef.current.count >= 3) {
      cornerClickRef.current.count = 0;
      openSecretController();
      return;
    }

    cornerClickRef.current.timer = setTimeout(() => {
      cornerClickRef.current.count = 0;
    }, 700);

    // Single click instantly toggles between IT (tech) and Non-IT / BPO (bpo)
    if (profileMode === 'tech') {
      setProfileMode('bpo');
    } else {
      setProfileMode('tech');
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-dark-950/90 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Col 1: Identity & Professional Statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-teal-500/10 border border-brand-500/30 flex items-center justify-center font-mono font-bold text-brand-300">
                AK
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">
                  {profileData.name}
                </span>
                <span className="block text-xs font-mono text-dark-400">
                  {profileMode === 'tech'
                    ? 'BCA Graduate • Frontend & Web Developer'
                    : profileMode === 'bpo'
                    ? 'BCA Graduate • Support & Operations Specialist'
                    : 'BCA Graduate • Tech & Customer Operations'}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-dark-300 max-w-sm leading-relaxed">
              {profileMode === 'tech'
                ? 'Dedicated to engineering modern, responsive web applications in React and modern JavaScript with scalable architecture.'
                : profileMode === 'bpo'
                ? 'Dedicated to high-reliability customer support, process SLA adherence, and verified operational data management.'
                : 'Dedicated to building modern digital web interfaces and delivering empathetic, high-reliability customer support and operational execution.'}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {profileMode === 'tech'
                  ? 'Available for Frontend & Software Engineering Roles'
                  : profileMode === 'bpo'
                  ? 'Available for Customer Support & Operations Roles'
                  : 'Available for Technical & Support Roles'}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-4">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Explore Portfolio
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {visibleNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs text-dark-400 hover:text-brand-300 transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Social Channels & Back to Top */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Connect With Abhishek
            </div>
            <div className="flex flex-wrap gap-2">
              {socialsData.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass-pill border border-white/10 text-dark-300 hover:text-white hover:border-brand-500/40 transition-colors"
                  aria-label={social.label}
                >
                  {social.name === 'LinkedIn' && <Linkedin className="w-4 h-4 text-blue-400" />}
                  {social.name === 'GitHub' && <Github className="w-4 h-4 text-purple-400" />}
                  {social.name === 'Email' && <Mail className="w-4 h-4 text-brand-400" />}
                  {social.name === 'Phone' && <Phone className="w-4 h-4 text-emerald-400" />}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-dark-200 glass-card border border-white/10 hover:text-white hover:border-brand-500/40 transition-all active:scale-95 group"
                aria-label="Scroll back to top"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-dark-400 font-mono relative">
          <div>
            © 2026 {profileData.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5">
            <span>Engineered with React, Tailwind CSS & Framer Motion</span>

            {/* Hidden Secret Dot (Hover karne par glow karta hai) */}
            <button
              type="button"
              onClick={handleHiddenCornerSwitch}
              className="p-1.5 -m-1 focus:outline-none cursor-pointer group inline-flex items-center justify-center"
              aria-label="Status dot"
              title=""
            >
              <span className="w-2 h-2 rounded-full bg-dark-600/40 group-hover:bg-brand-400 group-hover:shadow-glow-sm group-hover:scale-150 transition-all duration-300 block" />
            </button>
          </div>
        </div>
      </div>

      {/* Absolute Bottom-Right Stealth Corner Button (Corner mein 32px clickable area) */}
      <button
        type="button"
        onClick={handleHiddenCornerSwitch}
        className="absolute bottom-0 right-0 w-8 h-8 flex items-end justify-end p-2 opacity-25 hover:opacity-100 transition-opacity focus:outline-none cursor-pointer z-20 group"
        aria-label="Corner switch"
        title=""
      >
        <span className="w-2 h-2 rounded-full bg-dark-600/50 group-hover:bg-brand-400 group-hover:shadow-glow-sm group-hover:scale-125 transition-all" />
      </button>
    </footer>
  );
};

export default Footer;
