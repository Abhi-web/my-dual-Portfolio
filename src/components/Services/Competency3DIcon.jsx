import React from 'react';
import { motion } from 'framer-motion';

// Distinct futuristic color palettes for each Competency / Area of Impact
const competencyThemes = {
  'web-dev': {
    key: 'web-dev',
    glow: '#06b6d4',
    glowSoft: 'rgba(6, 182, 212, 0.45)',
    pedestal: '#083344',
    ring: '#22d3ee',
    border: 'hover:border-cyan-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
  },
  'ui-dev': {
    key: 'ui-dev',
    glow: '#f43f5e',
    glowSoft: 'rgba(244, 63, 94, 0.45)',
    pedestal: '#4c0519',
    ring: '#fb7185',
    border: 'hover:border-rose-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.25)]',
  },
  'customer-support': {
    key: 'customer-support',
    glow: '#14b8a6',
    glowSoft: 'rgba(20, 184, 166, 0.45)',
    pedestal: '#042f2e',
    ring: '#2dd4bf',
    border: 'hover:border-teal-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.25)]',
  },
  'chat-email-support': {
    key: 'chat-email-support',
    glow: '#0284c7',
    glowSoft: 'rgba(2, 132, 199, 0.45)',
    pedestal: '#082f49',
    ring: '#38bdf8',
    border: 'hover:border-sky-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(2,132,199,0.25)]',
  },
  'admin-support': {
    key: 'admin-support',
    glow: '#a855f7',
    glowSoft: 'rgba(168, 85, 247, 0.45)',
    pedestal: '#2e1065',
    ring: '#c084fc',
    border: 'hover:border-purple-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
  },
  'data-handling': {
    key: 'data-handling',
    glow: '#10b981',
    glowSoft: 'rgba(16, 185, 129, 0.45)',
    pedestal: '#064e3b',
    ring: '#34d399',
    border: 'hover:border-emerald-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
  },
};

/**
 * 3D Isometric Holographic Pedestal Platform for Competencies
 */
const HolographicPedestal = ({ theme, isHovered }) => {
  const key = theme.key;

  return (
    <>
      {/* 1. Holographic Base Ambient Radial Glow */}
      <motion.div
        className="absolute bottom-0 w-14 h-7 rounded-full blur-md pointer-events-none"
        animate={{
          opacity: isHovered ? [0.65, 0.95, 0.65] : [0.3, 0.5, 0.3],
          scale: isHovered ? [1, 1.2, 1] : [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse at center, ${theme.glowSoft} 0%, transparent 70%)`,
        }}
      />

      {/* 2. 3D Isometric Holographic Pedestal Platform */}
      <svg
        className="absolute bottom-0 w-16 h-8 overflow-visible pointer-events-none"
        viewBox="0 0 100 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`comp-ped-base-${key}`} x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor={theme.pedestal} />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id={`comp-ped-rim-${key}`} x1="0" y1="0" x2="100" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="40%" stopColor={theme.ring} />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0.25" />
          </linearGradient>

          <radialGradient id={`comp-ped-top-${key}`} cx="50" cy="20" r="45" fx="50" fy="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.45" />
            <stop offset="60%" stopColor="#040b17" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Bottom Cylinder Thickness */}
        <path
          d="M 10 22 C 10 33, 90 33, 90 22 L 90 29 C 90 40, 10 40, 10 29 Z"
          fill={`url(#comp-ped-base-${key})`}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
        />

        {/* Lower Outer Glow Rim */}
        <ellipse
          cx="50"
          cy="29"
          rx="40"
          ry="11"
          fill="none"
          stroke={theme.glow}
          strokeWidth="1"
          strokeOpacity="0.35"
        />

        {/* Top Disc Plate */}
        <ellipse
          cx="50"
          cy="22"
          rx="40"
          ry="11"
          fill={`url(#comp-ped-top-${key})`}
          stroke={`url(#comp-ped-rim-${key})`}
          strokeWidth="1.5"
        />

        {/* Inner Glowing Ring */}
        <ellipse
          cx="50"
          cy="22"
          rx="28"
          ry="7.5"
          fill="none"
          stroke={theme.ring}
          strokeWidth="1"
          strokeDasharray="4 2"
          strokeOpacity="0.8"
        />

        {/* Center Projector Core */}
        <ellipse
          cx="50"
          cy="22"
          rx="12"
          ry="3.5"
          fill={theme.glow}
          fillOpacity="0.6"
          filter="blur(1px)"
        />
      </svg>
    </>
  );
};

/**
 * Pure 3D Floating Competency Graphic
 */
const CompetencyEmblem = ({ id }) => {
  switch (id) {
    case 'web-dev':
      // 3D Isometric Code Terminal & Modern Tag Bracket
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] overflow-visible">
          <defs>
            <linearGradient id="wd_body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#083344" />
            </linearGradient>
            <linearGradient id="wd_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Depth Extrusion */}
          <rect x="7" y="14" width="50" height="42" rx="10" fill="#04202c" opacity="0.75" />
          {/* Main Monitor / Window */}
          <rect x="7" y="10" width="50" height="42" rx="10" fill="url(#wd_body)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Glossy Sheen */}
          <rect x="7" y="10" width="50" height="42" rx="10" fill="url(#wd_sheen)" pointerEvents="none" />
          {/* Top Window Bar Dots */}
          <circle cx="15" cy="17" r="2.2" fill="#ef4444" />
          <circle cx="21" cy="17" r="2.2" fill="#eab308" />
          <circle cx="27" cy="17" r="2.2" fill="#22c55e" />
          <line x1="7" y1="23" x2="57" y2="23" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Central Code Tags </> */}
          <path
            d="M 23 29 L 16 35 L 23 41"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          />
          <path
            d="M 41 29 L 48 35 L 41 41"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          />
          <line
            x1="35"
            y1="28"
            x2="29"
            y2="42"
            stroke="#67e8f9"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          />
        </svg>
      );

    case 'ui-dev':
      // 3D Isometric Design Palette & UI Layers Stack
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(244,63,94,0.85)] overflow-visible">
          <defs>
            <linearGradient id="ui_palette" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="50%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#4c0519" />
            </linearGradient>
            <linearGradient id="ui_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {/* Depth Base */}
          <path
            d="M 32 10 C 44 10 54 20 54 32 C 54 39 49 44 43 44 C 40 44 38 42 36 42 C 34 42 32 44 32 47 C 32 51 28 54 23 54 C 13 54 6 44 6 32 C 6 20 18 10 32 10 Z"
            fill="#300311"
            opacity="0.75"
            transform="translate(0, 4)"
          />
          {/* Palette Body */}
          <path
            d="M 32 10 C 44 10 54 20 54 32 C 54 39 49 44 43 44 C 40 44 38 42 36 42 C 34 42 32 44 32 47 C 32 51 28 54 23 54 C 13 54 6 44 6 32 C 6 20 18 10 32 10 Z"
            fill="url(#ui_palette)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.2"
          />
          <path
            d="M 32 10 C 44 10 54 20 54 32 C 54 39 49 44 43 44 C 40 44 38 42 36 42 C 34 42 32 44 32 47 C 32 51 28 54 23 54 C 13 54 6 44 6 32 C 6 20 18 10 32 10 Z"
            fill="url(#ui_sheen)"
            pointerEvents="none"
          />
          {/* Colorful Swatch Wells */}
          <circle cx="22" cy="22" r="4.5" fill="#38bdf8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          <circle cx="34" cy="18" r="4.5" fill="#fbbf24" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          <circle cx="45" cy="26" r="4.5" fill="#34d399" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          <circle cx="45" cy="38" r="3.5" fill="#c084fc" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          {/* Thumb Hole */}
          <ellipse cx="20" cy="42" rx="4.5" ry="5.5" fill="#0f172a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>
      );

    case 'customer-support':
      // 3D Isometric Customer Support Headset & Voice Resonance Wave
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(20,184,166,0.85)] overflow-visible">
          <defs>
            <linearGradient id="cs_band" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#14b8a6" />
              <stop offset="50%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
            <linearGradient id="cs_cup" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="50%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#042f2e" />
            </linearGradient>
          </defs>
          {/* Depth Shadow */}
          <path
            d="M 16 34 C 16 22 23 14 32 14 C 41 14 48 22 48 34"
            fill="none"
            stroke="#021c1b"
            strokeWidth="5"
            strokeLinecap="round"
            transform="translate(0, 4)"
          />
          {/* Headband */}
          <path
            d="M 16 34 C 16 22 23 14 32 14 C 41 14 48 22 48 34"
            fill="none"
            stroke="url(#cs_band)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Left Earcup */}
          <rect x="10" y="30" width="10" height="18" rx="5" fill="url(#cs_cup)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <ellipse cx="15" cy="39" rx="2.5" ry="5" fill="#042f2e" />
          {/* Right Earcup */}
          <rect x="44" y="30" width="10" height="18" rx="5" fill="url(#cs_cup)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <ellipse cx="49" cy="39" rx="2.5" ry="5" fill="#042f2e" />
          {/* Microphone Arm & Tip */}
          <path
            d="M 47 43 C 47 50, 40 54, 32 54 L 28 54"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          />
          <circle cx="26" cy="54" r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #2dd4bf)" />
          {/* Sound Resonance Pulse Wave */}
          <path
            d="M 28 26 C 30 24 34 24 36 26"
            fill="none"
            stroke="#5eead4"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 25 21 C 29 18 35 18 39 21"
            fill="none"
            stroke="#5eead4"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      );

    case 'chat-email-support':
      // 3D Isometric Omnichannel Mail Envelope & Chat Balloon
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(2,132,199,0.85)] overflow-visible">
          <defs>
            <linearGradient id="ce_mail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
            <linearGradient id="ce_chat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
          {/* 3D Depth Shadow */}
          <rect x="8" y="24" width="38" height="26" rx="6" fill="#021c35" opacity="0.75" />
          {/* Mail Envelope */}
          <rect x="8" y="20" width="38" height="26" rx="6" fill="url(#ce_mail)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <path d="M 10 22 L 27 34 L 44 22" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Floating 3D Chat Bubble Overlapping */}
          <g transform="translate(24, 8)">
            <rect x="4" y="4" width="28" height="22" rx="8" fill="#01182c" opacity="0.65" transform="translate(0, 3)" />
            <rect x="4" y="4" width="28" height="22" rx="8" fill="url(#ce_chat)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
            {/* Bubble Tail */}
            <path d="M 12 26 L 8 32 L 18 26 Z" fill="url(#ce_chat)" />
            {/* Typing Dots */}
            <circle cx="12" cy="15" r="1.8" fill="#ffffff" />
            <circle cx="18" cy="15" r="1.8" fill="#ffffff" />
            <circle cx="24" cy="15" r="1.8" fill="#ffffff" />
          </g>
        </svg>
      );

    case 'admin-support':
      // 3D Isometric Operations Shield & Workflow Verification
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(168,85,247,0.85)] overflow-visible">
          <defs>
            <linearGradient id="as_shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="40%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#3b0764" />
            </linearGradient>
            <linearGradient id="as_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Depth Shadow */}
          <path
            d="M 32 8 L 52 16 C 52 34 43 46 32 52 C 21 46 12 34 12 16 Z"
            fill="#1e052c"
            opacity="0.75"
            transform="translate(0, 4)"
          />
          {/* Main Shield */}
          <path
            d="M 32 8 L 52 16 C 52 34 43 46 32 52 C 21 46 12 34 12 16 Z"
            fill="url(#as_shield)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.2"
          />
          <path
            d="M 32 8 L 52 16 C 52 34 43 46 32 52 C 21 46 12 34 12 16 Z"
            fill="url(#as_sheen)"
            pointerEvents="none"
          />
          {/* Inner Inscribed Shield */}
          <path
            d="M 32 14 L 46 20 C 46 33 39 42 32 47 C 25 42 18 33 18 20 Z"
            fill="none"
            stroke="#e9d5ff"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          {/* Verified Checkmark Crest */}
          <path
            d="M 23 29 L 29 35 L 41 23"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 2px 5px rgba(0,0,0,0.5))"
          />
        </svg>
      );

    case 'data-handling':
    default:
      // 3D Isometric Spreadsheet Grid with Rising Analytical 3D Bar Columns
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(16,185,129,0.85)] overflow-visible">
          <defs>
            <linearGradient id="dh_plane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="dh_col1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="dh_col2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>
          </defs>
          {/* Depth Base */}
          <rect x="8" y="14" width="48" height="40" rx="8" fill="#011b14" opacity="0.75" />
          {/* Main Spreadsheet Tablet */}
          <rect x="8" y="10" width="48" height="40" rx="8" fill="url(#dh_plane)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Spreadsheet Header Band */}
          <rect x="8" y="10" width="48" height="10" rx="8" fill="#064e3b" />
          <line x1="8" y1="20" x2="56" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="24" y1="10" x2="24" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* 3D Rising Bar Pillars */}
          {/* Bar 1 (Short) */}
          <rect x="14" y="34" width="6" height="12" rx="2" fill="url(#dh_col1)" stroke="#ffffff" strokeWidth="0.8" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))" />
          {/* Bar 2 (Medium) */}
          <rect x="29" y="27" width="6" height="19" rx="2" fill="url(#dh_col2)" stroke="#ffffff" strokeWidth="0.8" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))" />
          {/* Bar 3 (Tall) */}
          <rect x="44" y="21" width="6" height="25" rx="2" fill="#ffffff" stroke="#34d399" strokeWidth="0.8" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.45))" />
          {/* Growth Trendline Arrow */}
          <path
            d="M 16 32 Q 31 23 46 17"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
          <polygon points="48,15 44,18 48,20" fill="#fef08a" />
        </svg>
      );
  }
};

/**
 * Competency3DIcon
 * Features the 3D Holographic Pedestal, glowing neon rings,
 * and floating bobbing emblem.
 */
export const Competency3DIcon = ({
  id = 'web-dev',
  isHovered = false,
  className = '',
}) => {
  const theme = competencyThemes[id] || competencyThemes['web-dev'];

  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 w-16 h-16 sm:w-18 sm:h-18 ${className}`}>
      {/* 1. 3D Holographic Pedestal Platform */}
      <HolographicPedestal theme={theme} isHovered={isHovered} />

      {/* 2. Floating 3D Emblem with Micro-Bobbing Physics */}
      <motion.div
        className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 -translate-y-1.5 flex items-center justify-center"
        animate={{
          y: isHovered ? [0, -5, 0] : [0, -3, 0],
          rotateX: [0, 5, 0],
          rotateY: [-4, 4, -4],
        }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <CompetencyEmblem id={id} />
      </motion.div>
    </div>
  );
};

export default Competency3DIcon;
