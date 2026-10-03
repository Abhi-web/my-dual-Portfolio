import React from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import { Linkedin, Github } from '../common/BrandIcons.jsx';
import { profileData } from '../../data/profile.js';
import { socialsData } from '../../data/socials.js';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Profile', href: '#career-profile' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Strengths', href: '#professional-strengths' },
    { name: 'Services', href: '#services' },
    { name: 'Resume', href: '#resume-preview' },
    { name: 'Contact', href: '#contact' },
  ];

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
                  BCA Graduate • Tech & Customer Operations
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-dark-300 max-w-sm leading-relaxed">
              Dedicated to building modern, responsive digital web interfaces and delivering empathetic, high-reliability customer support and operational execution.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Technical & Support Roles</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-4">
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Explore Portfolio
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {navLinks.map((link) => (
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
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-dark-400 font-mono">
          <div>
            © 2026 {profileData.name}. All rights reserved.
          </div>
          <div>
            Engineered with React, Tailwind CSS & Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
