import React from 'react';
import { motion } from 'framer-motion';

// Color themes for the 4 About Foundation cards
const aboutThemes = {
  academics: {
    key: 'academics',
    glow: '#06b6d4',
    glowSoft: 'rgba(6, 182, 212, 0.45)',
    pedestal: '#083344',
    ring: '#22d3ee',
  },
  engineering: {
    key: 'engineering',
    glow: '#0284c7',
    glowSoft: 'rgba(2, 132, 199, 0.45)',
    pedestal: '#082f49',
    ring: '#38bdf8',
  },
  'client-service': {
    key: 'client-service',
    glow: '#14b8a6',
    glowSoft: 'rgba(20, 184, 166, 0.45)',
    pedestal: '#042f2e',
    ring: '#2dd4bf',
  },
  objectives: {
    key: 'objectives',
    glow: '#10b981',
    glowSoft: 'rgba(16, 185, 129, 0.45)',
    pedestal: '#064e3b',
    ring: '#34d399',
  },
};

/**
 * 3D Isometric Holographic Pedestal Platform
 */
const HolographicPedestal = ({ theme, isHovered }) => {
  const key = theme.key;

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

      {/* 2. 3D Isometric Platform SVG */}
      <svg
        className="absolute bottom-0 w-16 h-8 overflow-visible pointer-events-none"
        viewBox="0 0 100 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`about-ped-base-${key}`} x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor={theme.pedestal} />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id={`about-ped-rim-${key}`} x1="0" y1="0" x2="100" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="40%" stopColor={theme.ring} />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0.25" />
          </linearGradient>

          <radialGradient id={`about-ped-top-${key}`} cx="50" cy="20" r="45" fx="50" fy="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.45" />
            <stop offset="60%" stopColor="#040b17" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Cylinder Extrusion */}
        <path
          d="M 10 22 C 10 33, 90 33, 90 22 L 90 29 C 90 40, 10 40, 10 29 Z"
          fill={`url(#about-ped-base-${key})`}
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
          fill={`url(#about-ped-top-${key})`}
          stroke={`url(#about-ped-rim-${key})`}
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

        {/* Center Laser Emitter */}
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
 * Pure 3D Floating Emblem Graphics for About Cards
 */
const AboutEmblemGraphic = ({ type }) => {
  switch (type) {
    case 'academics':
      // 3D Graduation Mortarboard Cap + Academic Diploma Scroll
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] overflow-visible">
          <defs>
            <linearGradient id="acad_cap_top" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="45%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#083344" />
            </linearGradient>
            <linearGradient id="acad_tassel" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Underneath Cap Skull Ring Depth */}
          <path
            d="M 22 28 C 22 36, 42 36, 42 28 L 42 34 C 42 42, 22 42, 22 34 Z"
            fill="#04202c"
            opacity="0.8"
          />
          <path
            d="M 22 28 C 22 36, 42 36, 42 28 L 42 34 C 42 42, 22 42, 22 34 Z"
            fill="#0e7490"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.8"
          />

          {/* 3D Mortarboard Diamond Top - Depth Shadow */}
          <polygon
            points="32,15 56,26 32,37 8,26"
            fill="#021c27"
            transform="translate(0, 3)"
            opacity="0.7"
          />

          {/* 3D Mortarboard Diamond Top - Glossy Face */}
          <polygon
            points="32,15 56,26 32,37 8,26"
            fill="url(#acad_cap_top)"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />

          {/* Specular Highlight Streak on Cap */}
          <polygon
            points="32,15 44,20.5 32,26 20,20.5"
            fill="#ffffff"
            opacity="0.25"
          />

          {/* Center Button */}
          <circle cx="32" cy="26" r="2.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />

          {/* Golden Hanging Tassel */}
          <path
            d="M 32 26 C 36 28, 44 32, 45 42"
            fill="none"
            stroke="url(#acad_tassel)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="45" cy="43" r="2.2" fill="#f59e0b" filter="drop-shadow(0 0 4px #fbbf24)" />

          {/* Small Floating Diploma Scroll */}
          <g transform="translate(11, 38) rotate(-15)">
            <rect x="0" y="0" width="22" height="7" rx="3.5" fill="#f8fafc" stroke="#67e8f9" strokeWidth="0.8" />
            <rect x="9" y="0" width="4" height="7" fill="#ef4444" />
          </g>
        </svg>
      );

    case 'engineering':
      // 3D Isometric Modern Browser Terminal & Floating Neon Code Tags
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(2,132,199,0.85)] overflow-visible">
          <defs>
            <linearGradient id="eng_body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
            <linearGradient id="eng_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* 3D Depth Base */}
          <rect x="7" y="14" width="50" height="40" rx="10" fill="#021c35" opacity="0.75" />

          {/* Terminal Body */}
          <rect x="7" y="10" width="50" height="40" rx="10" fill="url(#eng_body)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
          <rect x="7" y="10" width="50" height="40" rx="10" fill="url(#eng_sheen)" pointerEvents="none" />

          {/* Top Status Dots */}
          <circle cx="15" cy="17" r="2.2" fill="#ef4444" />
          <circle cx="21" cy="17" r="2.2" fill="#eab308" />
          <circle cx="27" cy="17" r="2.2" fill="#22c55e" />
          <line x1="7" y1="23" x2="57" y2="23" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

          {/* Code Brackets </> */}
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
            stroke="#7dd3fc"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="drop-shadow(0 0 4px #38bdf8)"
          />
        </svg>
      );

    case 'client-service':
      // 3D Isometric Customer Support Headset & Voice Wave Arc
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

          {/* Microphone Boom & Glowing Tip */}
          <path
            d="M 47 43 C 47 50, 40 54, 32 54 L 28 54"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="26" cy="54" r="3" fill="#ffffff" filter="drop-shadow(0 0 6px #2dd4bf)" />

          {/* Voice Wave Resonance */}
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

    case 'objectives':
    default:
      // 3D Isometric Target Radar & Precision Crosshair Bullseye
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(16,185,129,0.85)] overflow-visible">
          <defs>
            <radialGradient id="obj_disc" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="85%" stopColor="#047857" />
              <stop offset="100%" stopColor="#022c22" />
            </radialGradient>
            <linearGradient id="obj_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Depth Base */}
          <circle cx="32" cy="35" r="23" fill="#011b14" opacity="0.75" />

          {/* Main 3D Spherical Disc */}
          <circle cx="32" cy="31" r="23" fill="url(#obj_disc)" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />
          <circle cx="32" cy="31" r="23" fill="url(#obj_sheen)" pointerEvents="none" />

          {/* Outer Target Track */}
          <circle cx="32" cy="31" r="16" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="5 3" />

          {/* Inner Target Track */}
          <circle cx="32" cy="31" r="9" fill="none" stroke="#a7f3d0" strokeWidth="1.8" strokeOpacity="0.8" />

          {/* Glowing Bullseye Center */}
          <circle cx="32" cy="31" r="4.5" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />

          {/* Precision Crosshairs */}
          <line x1="32" y1="12" x2="32" y2="19" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="32" y1="43" x2="32" y2="50" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="13" y1="31" x2="20" y2="31" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="44" y1="31" x2="51" y2="31" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
  }
};

/**
 * About3DIcon Component
 */
export const About3DIcon = ({
  type = 'academics',
  isHovered = false,
  className = '',
}) => {
  const theme = aboutThemes[type] || aboutThemes.academics;

  return (
    <div className={`relative flex items-center justify-center select-none shrink-0 w-16 h-16 sm:w-18 sm:h-18 ${className}`}>
      {/* 1. 3D Holographic Pedestal Platform */}
      <HolographicPedestal theme={theme} isHovered={isHovered} />

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
        <AboutEmblemGraphic type={type} />
      </motion.div>
    </div>
  );
};

export default About3DIcon;
