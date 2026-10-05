import React from 'react';
import { motion } from 'framer-motion';

// Map skill name to normalized 3D icon key
export const getSkill3DKey = (skillName = '') => {
  const s = skillName.toLowerCase();
  if (s.includes('react')) return 'react';
  if (s.includes('javascript') || s.includes('js')) return 'javascript';
  if (s.includes('html')) return 'html5';
  if (s.includes('css') || s.includes('tailwind')) return 'css3';
  if (s.includes('node')) return 'nodejs';
  if (s.includes('express')) return 'express';
  if (s.includes('mongo')) return 'mongodb';
  if (s.includes('aws') || s.includes('amazon')) return 'aws';
  if (s.includes('azure')) return 'azure';
  if (s.includes('google cloud') || s.includes('gcp')) return 'googlecloud';
  if (s.includes('docker') || s.includes('container')) return 'docker';
  if (s.includes('cloud deployment') || s.includes('deployment')) return 'clouddeployment';
  if (s.includes('api') || s.includes('rest')) return 'restapi';
  if (s.includes('git')) return 'git';
  if (s.includes('office') || s.includes('excel')) return 'msoffice';
  if (s.includes('problem') || s.includes('troubleshoot')) return 'problemsolving';
  if (s.includes('team') || s.includes('collab')) return 'team';
  if (s.includes('quality') || s.includes('qc') || s.includes('inspection')) return 'quality';
  if (s.includes('data entry') || s.includes('record')) return 'dataentry';
  if (s.includes('support') || s.includes('customer') || s.includes('chat') || s.includes('communication')) return 'support';
  return 'default';
};

// Color palettes for pedestals and neon aura
const colorThemes = {
  react: { glow: '#06b6d4', glowSoft: 'rgba(6, 182, 212, 0.4)', pedestal: '#083344', ring: '#22d3ee' },
  javascript: { glow: '#f59e0b', glowSoft: 'rgba(245, 158, 11, 0.4)', pedestal: '#451a03', ring: '#fbbf24' },
  html5: { glow: '#ea580c', glowSoft: 'rgba(234, 88, 12, 0.4)', pedestal: '#431407', ring: '#f97316' },
  css3: { glow: '#0284c7', glowSoft: 'rgba(2, 132, 199, 0.4)', pedestal: '#0c2a44', ring: '#38bdf8' },
  nodejs: { glow: '#22c55e', glowSoft: 'rgba(34, 197, 94, 0.4)', pedestal: '#052e16', ring: '#4ade80' },
  express: { glow: '#a855f7', glowSoft: 'rgba(168, 85, 247, 0.4)', pedestal: '#2e1065', ring: '#c084fc' },
  mongodb: { glow: '#10b981', glowSoft: 'rgba(16, 185, 129, 0.4)', pedestal: '#064e3b', ring: '#34d399' },
  aws: { glow: '#f97316', glowSoft: 'rgba(249, 115, 22, 0.45)', pedestal: '#431407', ring: '#fb923c' },
  azure: { glow: '#0284c7', glowSoft: 'rgba(2, 132, 199, 0.45)', pedestal: '#082f49', ring: '#38bdf8' },
  googlecloud: { glow: '#4285f4', glowSoft: 'rgba(66, 133, 244, 0.45)', pedestal: '#172554', ring: '#60a5fa' },
  docker: { glow: '#0ea5e9', glowSoft: 'rgba(14, 165, 233, 0.45)', pedestal: '#082f49', ring: '#38bdf8' },
  clouddeployment: { glow: '#06b6d4', glowSoft: 'rgba(6, 182, 212, 0.45)', pedestal: '#083344', ring: '#22d3ee' },
  restapi: { glow: '#38bdf8', glowSoft: 'rgba(56, 189, 248, 0.4)', pedestal: '#082f49', ring: '#7dd3fc' },
  git: { glow: '#a855f7', glowSoft: 'rgba(168, 85, 247, 0.4)', pedestal: '#3b0764', ring: '#c084fc' },
  msoffice: { glow: '#059669', glowSoft: 'rgba(5, 150, 105, 0.4)', pedestal: '#064e3b', ring: '#10b981' },
  problemsolving: { glow: '#ec4899', glowSoft: 'rgba(236, 72, 153, 0.4)', pedestal: '#500724', ring: '#f472b6' },
  team: { glow: '#06b6d4', glowSoft: 'rgba(6, 182, 212, 0.4)', pedestal: '#0e3a47', ring: '#67e8f9' },
  quality: { glow: '#14b8a6', glowSoft: 'rgba(20, 184, 166, 0.4)', pedestal: '#042f2e', ring: '#2dd4bf' },
  dataentry: { glow: '#10b981', glowSoft: 'rgba(16, 185, 129, 0.4)', pedestal: '#022c22', ring: '#34d399' },
  support: { glow: '#0d9488', glowSoft: 'rgba(13, 148, 136, 0.4)', pedestal: '#042f2e', ring: '#2dd4bf' },
  default: { glow: '#06b6d4', glowSoft: 'rgba(6, 182, 212, 0.4)', pedestal: '#0f172a', ring: '#38bdf8' },
};

export const Skill3DIcon = ({ name, isHovered = false, size = 'md' }) => {
  const key = getSkill3DKey(name);
  const theme = colorThemes[key] || colorThemes.default;
  const isSmall = size === 'sm';

  return (
    <div className={`relative flex items-center justify-center shrink-0 select-none ${
      isSmall ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-20 h-20 sm:w-24 sm:h-24'
    }`}>
      {/* 1. Holographic Base Ambient Glow */}
      <motion.div
        className={`absolute bottom-0.5 rounded-full blur-md pointer-events-none ${
          isSmall ? 'w-10 h-5 sm:w-12 sm:h-6' : 'w-16 h-8 sm:w-20 sm:h-10'
        }`}
        animate={{
          opacity: isHovered ? [0.6, 0.9, 0.6] : [0.35, 0.55, 0.35],
          scale: isHovered ? [1, 1.15, 1] : [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: `radial-gradient(ellipse at center, ${theme.glowSoft} 0%, transparent 70%)`,
        }}
      />

      {/* 2. 3D Isometric Holographic Pedestal Platform */}
      <svg
        className={`absolute bottom-0 overflow-visible ${
          isSmall ? 'w-12 h-5 sm:w-14 sm:h-6' : 'w-20 h-9 sm:w-24 sm:h-11'
        }`}
        viewBox="0 0 100 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Base Platform Gradients */}
          <linearGradient id={`ped-base-${key}`} x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor={theme.pedestal} />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id={`ped-rim-${key}`} x1="0" y1="0" x2="100" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="40%" stopColor={theme.ring} />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id={`ped-top-${key}`} cx="50" cy="20" r="45" fx="50" fy="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.35" />
            <stop offset="60%" stopColor="#040b17" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Bottom Cylinder Thickness */}
        <path
          d="M 10 22 C 10 33, 90 33, 90 22 L 90 29 C 90 40, 10 40, 10 29 Z"
          fill={`url(#ped-base-${key})`}
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
          strokeOpacity="0.3"
        />

        {/* Top Disc Plate */}
        <ellipse
          cx="50"
          cy="22"
          rx="40"
          ry="11"
          fill={`url(#ped-top-${key})`}
          stroke={`url(#ped-rim-${key})`}
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
          strokeOpacity="0.7"
        />

        {/* Center Projector Core */}
        <ellipse
          cx="50"
          cy="22"
          rx="12"
          ry="3.5"
          fill={theme.glow}
          fillOpacity="0.5"
          filter="blur(1px)"
        />
      </svg>

      {/* 3. Floating 3D Emblem with Smooth Bobbing Micro-Animation */}
      <motion.div
        className={`relative z-10 flex items-center justify-center ${
          isSmall ? 'w-8 h-8 sm:w-9 sm:h-9 -translate-y-1' : 'w-12 h-12 sm:w-14 sm:h-14 -translate-y-2 sm:-translate-y-2.5'
        }`}
        animate={{
          y: isHovered ? (isSmall ? [0, -5, 0] : [0, -10, 0]) : (isSmall ? [0, -3.5, 0] : [0, -6, 0]),
          rotateX: [0, 4, 0],
          rotateY: [-3, 3, -3],
        }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <EmblemGraphic type={key} isHovered={isHovered} />
      </motion.div>
    </div>
  );
};

// Dedicated 3D Emblem Graphics
const EmblemGraphic = ({ type, isHovered }) => {
  switch (type) {
    case 'react':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]">
          <defs>
            <radialGradient id="reactCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </radialGradient>
            <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0e7490" />
            </linearGradient>
          </defs>
          {/* 3 Intersecting 3D Orbit Rings */}
          <ellipse cx="32" cy="32" rx="28" ry="9.5" fill="none" stroke="url(#orbitGlow)" strokeWidth="2.8" transform="rotate(0 32 32)" />
          <ellipse cx="32" cy="32" rx="28" ry="9.5" fill="none" stroke="url(#orbitGlow)" strokeWidth="2.8" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="28" ry="9.5" fill="none" stroke="url(#orbitGlow)" strokeWidth="2.8" transform="rotate(120 32 32)" />
          {/* Glowing Center Sphere */}
          <circle cx="32" cy="32" r="6" fill="url(#reactCore)" filter="drop-shadow(0 0 6px #22d3ee)" />
        </svg>
      );

    case 'javascript':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(245,158,11,0.85)]">
          <defs>
            {/* 3D Isometric Cube Gradients */}
            <linearGradient id="jsTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="jsLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <linearGradient id="jsRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>
          </defs>
          {/* Isometric Top Face */}
          <polygon points="32,6 56,19 32,32 8,19" fill="url(#jsTop)" stroke="#fef08a" strokeWidth="0.8" />
          {/* Isometric Left Face */}
          <polygon points="8,19 32,32 32,58 8,45" fill="url(#jsLeft)" />
          {/* Isometric Right Face */}
          <polygon points="32,32 56,19 56,45 32,58" fill="url(#jsRight)" />
          {/* JS Text in 3D perspective on right face */}
          <text x="36" y="47" fill="#0f172a" fontSize="18" fontWeight="900" fontFamily="system-ui, sans-serif" transform="skewY(-14) scale(0.9, 1)">
            JS
          </text>
        </svg>
      );

    case 'html5':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(234,88,12,0.85)]">
          <defs>
            <linearGradient id="htmlLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <linearGradient id="htmlRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          {/* 3D Shield Outline */}
          <polygon points="10,8 54,8 50,48 32,58 14,48" fill="url(#htmlLeft)" stroke="#fdba74" strokeWidth="1" />
          <polygon points="32,8 54,8 50,48 32,58" fill="url(#htmlRight)" />
          {/* 3D '5' Inscription */}
          <path
            d="M 22 17 L 42 17 L 41 23 L 28 23 L 29 29 L 41 29 L 39 45 L 32 49 L 24 45 L 23 39 L 29 39 L 30 41 L 32 43 L 34 41 L 35 34 L 23 34 Z"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          />
        </svg>
      );

    case 'css3':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(2,132,199,0.85)]">
          <defs>
            <linearGradient id="cssLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="cssRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* 3D Shield Outline */}
          <polygon points="10,8 54,8 50,48 32,58 14,48" fill="url(#cssLeft)" stroke="#7dd3fc" strokeWidth="1" />
          <polygon points="32,8 54,8 50,48 32,58" fill="url(#cssRight)" />
          {/* 3D '3' Inscription */}
          <path
            d="M 22 17 L 42 17 L 41 23 L 31 23 L 31 27 L 41 27 L 39 45 L 32 49 L 24 45 L 23 39 L 29 39 L 30 41 L 32 43 L 34 41 L 35 32 L 23 32 L 23 27 L 31 27 Z"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          />
        </svg>
      );

    case 'nodejs':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(34,197,94,0.85)]">
          <defs>
            <linearGradient id="nodeTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="nodeSide" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
          </defs>
          {/* 3D Isometric Hexagon */}
          <polygon points="32,6 54,18 54,42 32,54 10,42 10,18" fill="url(#nodeTop)" stroke="#86efac" strokeWidth="1.2" />
          <polygon points="32,30 54,18 54,42 32,54" fill="url(#nodeSide)" opacity="0.6" />
          <polygon points="32,30 10,18 10,42 32,54" fill="#14532d" opacity="0.4" />
          {/* Node Wordmark / Icon */}
          <text x="32" y="38" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))">
            node
          </text>
        </svg>
      );

    case 'express':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(168,85,247,0.85)]">
          <defs>
            <linearGradient id="exTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="exSide" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
          </defs>
          {/* 3D Dark Isometric Box with Neon Edges */}
          <polygon points="32,8 54,20 32,32 10,20" fill="#1e293b" stroke="#c084fc" strokeWidth="1.2" />
          <polygon points="10,20 32,32 32,56 10,44" fill="#0f172a" stroke="#a855f7" strokeWidth="0.8" />
          <polygon points="32,32 54,20 54,44 32,56" fill="#020617" stroke="#9333ea" strokeWidth="0.8" />
          <text x="32" y="44" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace" filter="drop-shadow(0 0 4px #c084fc)">
            ex
          </text>
        </svg>
      );

    case 'mongodb':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(16,185,129,0.9)]">
          <defs>
            <linearGradient id="mongoLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="mongoRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {/* 3D Leaf Shape */}
          <path d="M 32 6 C 32 6, 12 24, 16 42 C 20 52, 32 58, 32 58 Z" fill="url(#mongoLeft)" />
          <path d="M 32 6 C 32 6, 52 24, 48 42 C 44 52, 32 58, 32 58 Z" fill="url(#mongoRight)" />
          {/* Center Spine Glow */}
          <path d="M 32 8 L 32 56" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" filter="drop-shadow(0 0 4px #34d399)" />
        </svg>
      );

    case 'restapi':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(56,189,248,0.85)]">
          <defs>
            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* 3D Cloud Base */}
          <path
            d="M 18 42 A 10 10 0 0 1 20 23 A 14 14 0 0 1 44 23 A 10 10 0 0 1 48 42 Z"
            fill="url(#cloudGrad)"
            stroke="#bae6fd"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))"
          />
          <text x="32" y="37" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif" letterSpacing="1">
            API
          </text>
        </svg>
      );

    case 'git':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(168,85,247,0.85)]">
          <defs>
            <radialGradient id="gitSphere" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#e9d5ff" />
              <stop offset="40%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#581c87" />
            </radialGradient>
          </defs>
          {/* 3D Metallic Violet Sphere */}
          <circle cx="32" cy="32" r="22" fill="url(#gitSphere)" stroke="#d8b4fe" strokeWidth="1.5" />
          {/* Git Branching Network */}
          <path d="M 22 22 L 22 42 M 22 32 L 38 22 M 22 36 L 42 36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="22" cy="22" r="3.5" fill="#f8fafc" />
          <circle cx="22" cy="42" r="3.5" fill="#f8fafc" />
          <circle cx="38" cy="22" r="3.5" fill="#f8fafc" />
          <circle cx="42" cy="36" r="3.5" fill="#f8fafc" />
        </svg>
      );

    case 'msoffice':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]">
          {/* 3 Interlocking Office 3D Tiles: Word, Excel, PowerPoint */}
          <rect x="8" y="16" width="22" height="22" rx="4" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          <text x="19" y="32" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">W</text>

          <rect x="18" y="24" width="24" height="24" rx="4" fill="#16a34a" stroke="#86efac" strokeWidth="1.2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))" />
          <text x="30" y="41" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle">X</text>

          <rect x="34" y="14" width="22" height="22" rx="4" fill="#ea580c" stroke="#fdba74" strokeWidth="1" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          <text x="45" y="30" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">P</text>
        </svg>
      );

    case 'problemsolving':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(236,72,153,0.85)]">
          <defs>
            <radialGradient id="brainGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="40%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#be185d" />
            </radialGradient>
          </defs>
          {/* Glowing 3D Lightbulb & Brain core */}
          <path
            d="M 32 8 C 21 8, 14 17, 14 26 C 14 34, 22 39, 22 44 L 42 44 C 42 39, 50 34, 50 26 C 50 17, 43 8, 32 8 Z"
            fill="url(#brainGlow)"
            stroke="#fbcfe8"
            strokeWidth="1.5"
          />
          {/* Base Screw */}
          <rect x="25" y="45" width="14" height="3" rx="1" fill="#cbd5e1" />
          <rect x="27" y="49" width="10" height="3" rx="1" fill="#94a3b8" />
          {/* Inner Light Filament */}
          <path d="M 27 24 Q 32 18 37 24 Q 32 30 37 36" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'team':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(6,182,212,0.85)]">
          {/* 3D Cyan Figurines */}
          <circle cx="32" cy="18" r="8" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.2" />
          <path d="M 18 46 C 18 36, 46 36, 46 46 Z" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1" />

          <circle cx="16" cy="24" r="6" fill="#0ea5e9" opacity="0.8" />
          <path d="M 6 48 C 6 40, 26 40, 26 48 Z" fill="#0369a1" opacity="0.8" />

          <circle cx="48" cy="24" r="6" fill="#0ea5e9" opacity="0.8" />
          <path d="M 38 48 C 38 40, 58 40, 58 48 Z" fill="#0369a1" opacity="0.8" />
        </svg>
      );

    case 'quality':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(20,184,166,0.9)]">
          <defs>
            <linearGradient id="qcGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          <path d="M 32 6 L 52 14 L 52 32 C 52 46, 32 56, 32 56 C 32 56, 12 46, 12 32 L 12 14 Z" fill="url(#qcGrad)" stroke="#99f6e4" strokeWidth="1.5" />
          <path d="M 22 30 L 29 38 L 43 22" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
        </svg>
      );

    case 'aws':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(249,115,22,0.9)]">
          <defs>
            <linearGradient id="awsCloudGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffb703" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path
            d="M 18 40 A 10 10 0 0 1 20 22 A 14 14 0 0 1 44 22 A 10 10 0 0 1 48 40 Z"
            fill="url(#awsCloudGrad)"
            stroke="#fed7aa"
            strokeWidth="1.2"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))"
          />
          <text
            x="32"
            y="34"
            fill="#ffffff"
            fontSize="11"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            letterSpacing="1"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.6))"
          >
            AWS
          </text>
          <path
            d="M 23 38 Q 32 44 41 38"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <polygon points="41,38 38,35 39,40" fill="#fbbf24" />
        </svg>
      );

    case 'azure':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(2,132,199,0.9)]">
          <defs>
            <linearGradient id="azGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#70d6ff" />
              <stop offset="100%" stopColor="#0078d4" />
            </linearGradient>
            <linearGradient id="azGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0078d4" />
              <stop offset="100%" stopColor="#004c87" />
            </linearGradient>
            <linearGradient id="azGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          <path d="M 16 48 L 29 14 C 29.5 12.5 31.5 12.5 32 14 L 38 27 L 27 48 Z" fill="url(#azGrad1)" />
          <path d="M 33 24 L 43 44 C 44 46 42.5 48 40.5 48 L 21 48 L 28 34 L 41 34 Z" fill="url(#azGrad2)" />
          <path d="M 28 34 L 48 34 L 38 18 C 37 16 35 16 34 18 Z" fill="url(#azGrad3)" opacity="0.85" />
          <polygon points="26,40 38,40 33,30" fill="#ffffff" opacity="0.35" />
        </svg>
      );

    case 'googlecloud':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(66,133,244,0.85)]">
          <defs>
            <linearGradient id="gcpBlue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="gcpRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="gcpYellow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="gcpGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
          <path d="M 28 16 A 12 12 0 0 1 44 22 L 36 29 A 6 6 0 0 0 28 24 Z" fill="url(#gcpBlue)" />
          <path d="M 44 22 A 10 10 0 0 1 48 38 L 40 35 A 6 6 0 0 0 36 29 Z" fill="url(#gcpRed)" />
          <path d="M 48 38 L 24 44 A 8 8 0 0 1 20 38 L 40 35 Z" fill="url(#gcpYellow)" />
          <path d="M 20 38 A 10 10 0 0 1 28 16 L 28 24 A 6 6 0 0 0 24 35 Z" fill="url(#gcpGreen)" />
          <rect x="25" y="27" width="14" height="8" rx="4" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
          <text x="32" y="33.5" fill="#1e293b" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="system-ui, sans-serif">GCP</text>
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(14,165,233,0.9)]">
          <defs>
            <linearGradient id="whaleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="containerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <rect x="26" y="16" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="19" y="22" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="26" y="22" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="33" y="22" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="12" y="28" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="19" y="28" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="26" y="28" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="33" y="28" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <rect x="40" y="28" width="6" height="5" rx="0.8" fill="url(#containerGrad)" stroke="#e0f2fe" strokeWidth="0.5" />
          <path
            d="M 8 35 C 8 35, 12 48, 30 48 C 48 48, 52 38, 54 36 C 56 34, 58 35, 58 35 C 57 32, 54 30, 50 32 C 48 30, 44 32, 44 34 L 8 34 Z"
            fill="url(#whaleGrad)"
            stroke="#bae6fd"
            strokeWidth="0.8"
            filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))"
          />
          <circle cx="48" cy="36" r="1.5" fill="#ffffff" />
          <circle cx="48.5" cy="36" r="0.7" fill="#0f172a" />
          <path d="M 52 28 Q 54 24 57 26" fill="none" stroke="#bae6fd" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'clouddeployment':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.9)]">
          <defs>
            <linearGradient id="cdCloud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="rocketFlame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M 14 44 A 8 8 0 0 1 18 28 A 12 12 0 0 1 42 28 A 10 10 0 0 1 50 44 Z"
            fill="url(#cdCloud)"
            stroke="#a5f3fc"
            strokeWidth="1"
            opacity="0.85"
            filter="drop-shadow(0 3px 6px rgba(0,0,0,0.4))"
          />
          <polygon points="30,42 34,42 32,54" fill="url(#rocketFlame)" filter="drop-shadow(0 0 6px #f97316)" />
          <polygon points="28,42 31,42 29,48" fill="#fbbf24" opacity="0.8" />
          <polygon points="33,42 36,42 35,48" fill="#fbbf24" opacity="0.8" />
          <path d="M 32 12 C 32 12, 38 20, 38 36 L 26 36 C 26 20, 32 12, 32 12 Z" fill="url(#rocketBody)" stroke="#e2e8f0" strokeWidth="0.8" />
          <polygon points="26,30 20,38 26,38" fill="#0284c7" />
          <polygon points="38,30 44,38 38,38" fill="#0284c7" />
          <circle cx="32" cy="24" r="3" fill="#06b6d4" stroke="#ffffff" strokeWidth="1" />
        </svg>
      );

    case 'support':
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_12px_rgba(13,148,136,0.85)]">
          <path d="M 12 34 A 20 20 0 0 1 52 34" fill="none" stroke="#2dd4bf" strokeWidth="4" strokeLinecap="round" />
          <rect x="8" y="32" width="10" height="18" rx="5" fill="#0f766e" stroke="#5eead4" strokeWidth="1.2" />
          <rect x="46" y="32" width="10" height="18" rx="5" fill="#0f766e" stroke="#5eead4" strokeWidth="1.2" />
          <path d="M 48 44 Q 48 54 36 54 L 32 54" fill="none" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="54" r="3" fill="#ffffff" />
        </svg>
      );
  }
};

export default Skill3DIcon;
