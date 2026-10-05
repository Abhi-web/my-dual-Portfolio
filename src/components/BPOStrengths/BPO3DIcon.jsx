import React from 'react';
import { motion } from 'framer-motion';

// Color themes tailored to each BPO Strength
const bpoThemes = {
  'cust-comm': {
    glow: '#14b8a6',
    glowSoft: 'rgba(20, 184, 166, 0.45)',
    pedestal: '#042f2e',
    ring: '#2dd4bf',
  },
  'active-listening': {
    glow: '#06b6d4',
    glowSoft: 'rgba(6, 182, 212, 0.45)',
    pedestal: '#083344',
    ring: '#22d3ee',
  },
  'prob-solving': {
    glow: '#a855f7',
    glowSoft: 'rgba(168, 85, 247, 0.45)',
    pedestal: '#2e1065',
    ring: '#c084fc',
  },
  'cust-handling': {
    glow: '#f59e0b',
    glowSoft: 'rgba(245, 158, 11, 0.45)',
    pedestal: '#451a03',
    ring: '#fbbf24',
  },
  'email-comm': {
    glow: '#0284c7',
    glowSoft: 'rgba(2, 132, 199, 0.45)',
    pedestal: '#082f49',
    ring: '#38bdf8',
  },
  'chat-support': {
    glow: '#10b981',
    glowSoft: 'rgba(16, 185, 129, 0.45)',
    pedestal: '#064e3b',
    ring: '#34d399',
  },
  'ms-office': {
    glow: '#059669',
    glowSoft: 'rgba(5, 150, 105, 0.45)',
    pedestal: '#022c22',
    ring: '#10b981',
  },
  'data-accuracy': {
    glow: '#22c55e',
    glowSoft: 'rgba(34, 197, 94, 0.45)',
    pedestal: '#052e16',
    ring: '#4ade80',
  },
  'team-collab': {
    glow: '#38bdf8',
    glowSoft: 'rgba(56, 189, 248, 0.45)',
    pedestal: '#082f49',
    ring: '#7dd3fc',
  },
  'time-mgmt': {
    glow: '#eab308',
    glowSoft: 'rgba(234, 179, 8, 0.45)',
    pedestal: '#422006',
    ring: '#fde047',
  },
  adaptability: {
    glow: '#06b6d4',
    glowSoft: 'rgba(6, 182, 212, 0.45)',
    pedestal: '#083344',
    ring: '#22d3ee',
  },
  default: {
    glow: '#14b8a6',
    glowSoft: 'rgba(20, 184, 166, 0.45)',
    pedestal: '#042f2e',
    ring: '#2dd4bf',
  },
};

/**
 * 3D Isometric Holographic Pedestal Platform for BPO
 */
const HolographicPedestal = ({ theme, isHovered, id }) => {
  return (
    <>
      {/* 1. Base Ambient Radial Glow */}
      <motion.div
        className="absolute bottom-0 w-12 h-6 rounded-full blur-md pointer-events-none"
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
          <linearGradient id={`bpo-ped-base-${id}`} x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor={theme.pedestal} />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id={`bpo-ped-rim-${id}`} x1="0" y1="0" x2="100" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="40%" stopColor={theme.ring} />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0.25" />
          </linearGradient>

          <radialGradient id={`bpo-ped-top-${id}`} cx="50" cy="20" r="45" fx="50" fy="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.45" />
            <stop offset="60%" stopColor="#040b17" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Cylinder Extrusion */}
        <path
          d="M 10 22 C 10 33, 90 33, 90 22 L 90 29 C 90 40, 10 40, 10 29 Z"
          fill={`url(#bpo-ped-base-${id})`}
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
          fill={`url(#bpo-ped-top-${id})`}
          stroke={`url(#bpo-ped-rim-${id})`}
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

        {/* Center Laser Projector Core */}
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
 * Pure 3D Floating Emblem Graphics for BPO Strengths
 */
const BPOEmblemGraphic = ({ id }) => {
  switch (id) {
    case 'cust-comm':
      // 3D Isometric High-Clarity Speech Bubble & Sound Wave
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(20,184,166,0.85)] overflow-visible">
          <defs>
            <linearGradient id="cc_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="50%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#042f2e" />
            </linearGradient>
            <linearGradient id="cc_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d="M 32 10 C 19 10 9 19 9 30 C 9 35 11 39 14 43 L 11 52 L 20 48 C 24 50 28 51 32 51 C 45 51 55 42 55 30 C 55 19 45 10 32 10 Z" fill="#021c1b" opacity="0.75" transform="translate(0, 4)" />
          <path d="M 32 10 C 19 10 9 19 9 30 C 9 35 11 39 14 43 L 11 52 L 20 48 C 24 50 28 51 32 51 C 45 51 55 42 55 30 C 55 19 45 10 32 10 Z" fill="url(#cc_base)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <path d="M 32 10 C 19 10 9 19 9 30 C 9 35 11 39 14 43 L 11 52 L 20 48 C 24 50 28 51 32 51 C 45 51 55 42 55 30 C 55 19 45 10 32 10 Z" fill="url(#cc_sheen)" pointerEvents="none" />
          {/* Sound Waves */}
          <path d="M 23 30 C 23 25, 27 21, 32 21" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 20 30 C 20 22, 26 16, 34 16" fill="none" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <circle cx="32" cy="30" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 5px #2dd4bf)" />
        </svg>
      );

    case 'active-listening':
      // 3D Ear & Empathy Heart Resonance
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] overflow-visible">
          <defs>
            <linearGradient id="al_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#083344" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="35" r="23" fill="#021c27" opacity="0.7" />
          <circle cx="32" cy="31" r="23" fill="url(#al_base)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Ear Contour */}
          <path
            d="M 27 18 C 36 18 41 23 41 31 C 41 38 36 41 33 42 C 30 43 29 45 29 47"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          />
          <path
            d="M 28 27 C 32 27 34 29 34 32 C 34 35 32 37 29 37"
            fill="none"
            stroke="#a5f3fc"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Empathy Heart Accent */}
          <path
            d="M 21 24 C 21 21 24 19 26 21 C 28 19 31 21 31 24 C 31 27 26 31 26 31 C 26 31 21 27 21 24 Z"
            fill="#ec4899"
            filter="drop-shadow(0 0 6px #f43f5e)"
          />
        </svg>
      );

    case 'prob-solving':
      // 3D Diagnostic Brain Circuit & Diagnostic Cog
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(168,85,247,0.85)] overflow-visible">
          <defs>
            <linearGradient id="ps_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#2e1065" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="35" r="23" fill="#1e052c" opacity="0.75" />
          <circle cx="32" cy="31" r="23" fill="url(#ps_base)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Circuit Paths */}
          <circle cx="24" cy="24" r="3" fill="#ffffff" />
          <circle cx="40" cy="24" r="3" fill="#ffffff" />
          <circle cx="32" cy="38" r="3.5" fill="#fef08a" />
          <line x1="24" y1="24" x2="32" y2="38" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="40" y1="24" x2="32" y2="38" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 32 17 L 32 23 M 17 32 L 23 32 M 41 32 L 47 32" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'cust-handling':
      // 3D SLA Escalation Shield & Resolution Star
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(245,158,11,0.85)] overflow-visible">
          <defs>
            <linearGradient id="ch_shield" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          <path d="M 32 8 L 52 16 C 52 34 43 46 32 52 C 21 46 12 34 12 16 Z" fill="#2d1303" opacity="0.75" transform="translate(0, 4)" />
          <path d="M 32 8 L 52 16 C 52 34 43 46 32 52 C 21 46 12 34 12 16 Z" fill="url(#ch_shield)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* Inner Exclamation Alert */}
          <path d="M 32 21 L 32 33" stroke="#ffffff" strokeWidth="3.6" strokeLinecap="round" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
          <circle cx="32" cy="40" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" />
        </svg>
      );

    case 'email-comm':
      // 3D Fast TAT Envelope & Verified Letter
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(2,132,199,0.85)] overflow-visible">
          <defs>
            <linearGradient id="ec_mail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
          </defs>
          <rect x="8" y="22" width="48" height="32" rx="8" fill="#021c35" opacity="0.75" />
          <rect x="8" y="18" width="48" height="32" rx="8" fill="url(#ec_mail)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <path d="M 12 21 L 32 36 L 52 21" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Green Checkmark Badge */}
          <circle cx="46" cy="18" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M 43 18 L 45 20 L 49 16" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'chat-support':
      // 3D Dual Real-Time Chat Balloons (< 45s Response)
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(16,185,129,0.85)] overflow-visible">
          <defs>
            <linearGradient id="cs_b1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="cs_b2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          {/* Back Bubble */}
          <rect x="18" y="10" width="36" height="26" rx="8" fill="url(#cs_b2)" opacity="0.9" />
          <path d="M 44 36 L 50 42 L 50 36 Z" fill="url(#cs_b2)" />
          {/* Front Bubble */}
          <rect x="10" y="24" width="38" height="26" rx="8" fill="url(#cs_b1)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <path d="M 18 50 L 12 56 L 24 50 Z" fill="url(#cs_b1)" />
          {/* Typing Dots */}
          <circle cx="21" cy="37" r="2.2" fill="#ffffff" />
          <circle cx="29" cy="37" r="2.2" fill="#ffffff" />
          <circle cx="37" cy="37" r="2.2" fill="#ffffff" />
        </svg>
      );

    case 'ms-office':
      // 3D Excel Spreadsheet Tablet with Rising Pivot Pillars
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(5,150,105,0.85)] overflow-visible">
          <defs>
            <linearGradient id="mso_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <rect x="8" y="14" width="48" height="40" rx="8" fill="#011b14" opacity="0.75" />
          <rect x="8" y="10" width="48" height="40" rx="8" fill="url(#mso_base)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <line x1="8" y1="20" x2="56" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="24" y1="10" x2="24" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* 3D Pivot Bars */}
          <rect x="14" y="34" width="6" height="12" rx="2" fill="#a7f3d0" />
          <rect x="29" y="26" width="6" height="20" rx="2" fill="#6ee7b7" />
          <rect x="44" y="20" width="6" height="26" rx="2" fill="#ffffff" />
        </svg>
      );

    case 'data-accuracy':
      // 3D Double-Check Verification Emblem (99.9% Accuracy)
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(34,197,94,0.85)] overflow-visible">
          <defs>
            <linearGradient id="da_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#052e16" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="35" r="23" fill="#021c10" opacity="0.75" />
          <circle cx="32" cy="31" r="23" fill="url(#da_base)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* First Checkmark */}
          <path d="M 18 33 L 26 41 L 44 23" fill="none" stroke="#a7f3d0" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Second Offset Checkmark */}
          <path d="M 26 33 L 32 39 L 46 25" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
        </svg>
      );

    case 'team-collab':
      // 3D Team Collaboration Synergy Nodes
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(56,189,248,0.85)] overflow-visible">
          <defs>
            <linearGradient id="tc_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="35" r="23" fill="#021c35" opacity="0.75" />
          <circle cx="32" cy="31" r="23" fill="url(#tc_base)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          {/* 3 Users Synergy */}
          <circle cx="32" cy="22" r="5" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          <path d="M 23 37 C 23 32, 27 30, 32 30 C 37 30, 41 32, 41 37" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="18" cy="27" r="3.5" fill="#bae6fd" />
          <circle cx="46" cy="27" r="3.5" fill="#bae6fd" />
        </svg>
      );

    case 'time-mgmt':
      // 3D Chronometer / Punctuality Stopwatch
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(234,179,8,0.85)] overflow-visible">
          <defs>
            <radialGradient id="tm_base" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#eab308" />
              <stop offset="85%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#422006" />
            </radialGradient>
          </defs>
          {/* Top Button */}
          <rect x="29" y="5" width="6" height="5" rx="1.5" fill="#fde047" />
          <circle cx="32" cy="36" r="23" fill="#2d1502" opacity="0.75" />
          <circle cx="32" cy="32" r="23" fill="url(#tm_base)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <circle cx="32" cy="32" r="17" fill="#1e1004" opacity="0.6" />
          {/* Clock Hands */}
          <line x1="32" y1="32" x2="32" y2="21" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="32" x2="40" y2="32" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="32" r="2.5" fill="#ffffff" />
        </svg>
      );

    case 'adaptability':
    default:
      // 3D 24/7 Rotational Compass
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] overflow-visible">
          <defs>
            <radialGradient id="ad_base" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#083344" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="35" r="23" fill="#021c27" opacity="0.75" />
          <circle cx="32" cy="31" r="23" fill="url(#ad_base)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          {/* Compass Rings */}
          <circle cx="32" cy="31" r="17" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeDasharray="4 2" />
          {/* 4-Point Star Needle */}
          <polygon points="32,15 35,28 32,31 29,28" fill="#ef4444" filter="drop-shadow(0 0 4px #ef4444)" />
          <polygon points="32,47 35,34 32,31 29,34" fill="#ffffff" />
          <circle cx="32" cy="31" r="2.5" fill="#ffffff" />
        </svg>
      );
  }
};

/**
 * BPO3DIcon Component
 */
export const BPO3DIcon = ({
  id = 'cust-comm',
  isHovered = false,
  className = '',
}) => {
  const theme = bpoThemes[id] || bpoThemes.default;

  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 w-16 h-16 sm:w-18 sm:h-18 ${className}`}>
      {/* 1. 3D Holographic Pedestal Platform */}
      <HolographicPedestal theme={theme} isHovered={isHovered} id={id} />

      {/* 2. Floating 3D Emblem with Bobbing Micro-Physics */}
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
        <BPOEmblemGraphic id={id} />
      </motion.div>
    </div>
  );
};

export default BPO3DIcon;
