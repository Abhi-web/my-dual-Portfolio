import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Color palettes for 3D pedestals, ambient glow, and neon laser rings
const socialThemes = {
  instagram: {
    key: 'instagram',
    glow: '#e1306c',
    glowSoft: 'rgba(225, 48, 108, 0.45)',
    pedestal: '#3b0764',
    ring: '#f43f5e',
    textGradient: 'from-pink-400 via-rose-300 to-amber-300',
    border: 'hover:border-pink-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(225,48,108,0.25)]',
  },
  linkedin: {
    key: 'linkedin',
    glow: '#0284c7',
    glowSoft: 'rgba(2, 132, 199, 0.45)',
    pedestal: '#082f49',
    ring: '#38bdf8',
    textGradient: 'from-cyan-400 via-sky-300 to-blue-400',
    border: 'hover:border-cyan-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(2,132,199,0.25)]',
  },
  github: {
    key: 'github',
    glow: '#a855f7',
    glowSoft: 'rgba(168, 85, 247, 0.45)',
    pedestal: '#2e1065',
    ring: '#c084fc',
    textGradient: 'from-purple-400 via-violet-300 to-fuchsia-300',
    border: 'hover:border-purple-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]',
  },
  email: {
    key: 'email',
    glow: '#06b6d4',
    glowSoft: 'rgba(6, 182, 212, 0.45)',
    pedestal: '#083344',
    ring: '#22d3ee',
    textGradient: 'from-cyan-400 via-teal-300 to-emerald-300',
    border: 'hover:border-cyan-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]',
  },
  phone: {
    key: 'phone',
    glow: '#10b981',
    glowSoft: 'rgba(16, 185, 129, 0.45)',
    pedestal: '#064e3b',
    ring: '#34d399',
    textGradient: 'from-emerald-400 via-teal-300 to-green-300',
    border: 'hover:border-emerald-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]',
  },
  whatsapp: {
    key: 'whatsapp',
    glow: '#25D366',
    glowSoft: 'rgba(37, 211, 102, 0.45)',
    pedestal: '#052e16',
    ring: '#4ade80',
    textGradient: 'from-emerald-400 via-green-300 to-teal-300',
    border: 'hover:border-emerald-500/50',
    shadowHover: 'hover:shadow-[0_0_30px_rgba(37,211,102,0.25)]',
  },
};

export const normalizeSocialType = (type = '') => {
  const t = type.toLowerCase();
  if (t.includes('whatsapp') || t === 'wa') return 'whatsapp';
  if (t.includes('instagram')) return 'instagram';
  if (t.includes('linkedin') || t === 'in') return 'linkedin';
  if (t.includes('github')) return 'github';
  if (t.includes('email') || t.includes('mail')) return 'email';
  if (t.includes('phone') || t.includes('tel')) return 'phone';
  return 'github';
};

/**
 * 3D Holographic Pedestal Platform SVG
 */
const HolographicPedestal = ({ theme, isHovered, isSmall }) => {
  const key = theme.key;

  return (
    <>
      {/* 1. Holographic Base Ambient Radial Glow */}
      <motion.div
        className={`absolute bottom-0 rounded-full blur-md pointer-events-none ${
          isSmall ? 'w-10 h-5' : 'w-16 h-8 sm:w-20 sm:h-9'
        }`}
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
        className={`absolute bottom-0 overflow-visible pointer-events-none ${
          isSmall ? 'w-12 h-5' : 'w-20 h-9 sm:w-24 sm:h-10'
        }`}
        viewBox="0 0 100 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`ped-base-${key}`} x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor={theme.pedestal} />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id={`ped-rim-${key}`} x1="0" y1="0" x2="100" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="40%" stopColor={theme.ring} />
            <stop offset="100%" stopColor={theme.glow} stopOpacity="0.25" />
          </linearGradient>

          <radialGradient id={`ped-top-${key}`} cx="50" cy="20" r="45" fx="50" fy="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={theme.glow} stopOpacity="0.4" />
            <stop offset="60%" stopColor="#040b17" stopOpacity="0.85" />
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
          strokeOpacity="0.35"
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
          strokeOpacity="0.75"
        />

        {/* Center Projector Core */}
        <ellipse
          cx="50"
          cy="22"
          rx="12"
          ry="3.5"
          fill={theme.glow}
          fillOpacity="0.55"
          filter="blur(1px)"
        />
      </svg>
    </>
  );
};

/**
 * Pure 3D Floating Emblem Graphics
 */
const EmblemGraphic = ({ type }) => {
  switch (type) {
    case 'instagram':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(225,48,108,0.85)] overflow-visible">
          <defs>
            <linearGradient id="insta3d_base" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="12%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="72%" stopColor="#d6249f" />
              <stop offset="100%" stopColor="#285aeb" />
            </linearGradient>
            <linearGradient id="insta3d_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="insta3d_lens" cx="42%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#e1306c" />
              <stop offset="100%" stopColor="#4a044e" />
            </radialGradient>
          </defs>
          {/* 3D Depth Base */}
          <rect x="6" y="10" width="52" height="48" rx="16" fill="#1e052c" opacity="0.65" />
          {/* 3D Glossy Body */}
          <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#insta3d_base)" />
          <rect x="6" y="6" width="52" height="52" rx="16" fill="url(#insta3d_sheen)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          {/* Camera Frame */}
          <rect x="15" y="15" width="34" height="34" rx="10" fill="none" stroke="#ffffff" strokeWidth="3.2" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
          {/* Lens */}
          <circle cx="32" cy="32" r="8.5" fill="url(#insta3d_lens)" stroke="#ffffff" strokeWidth="3" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.45))" />
          <circle cx="29.5" cy="29.5" r="2.8" fill="#ffffff" opacity="0.9" />
          {/* Flash Dot */}
          <circle cx="42" cy="22" r="2.5" fill="#ffffff" filter="drop-shadow(0 0 4px #ffffff)" />
        </svg>
      );

    case 'linkedin':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(2,132,199,0.85)] overflow-visible">
          <defs>
            <linearGradient id="li3d_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#0077b5" />
              <stop offset="100%" stopColor="#004182" />
            </linearGradient>
            <linearGradient id="li3d_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#001830" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <rect x="6" y="10" width="52" height="48" rx="15" fill="#021c35" opacity="0.7" />
          <rect x="6" y="6" width="52" height="52" rx="15" fill="url(#li3d_base)" />
          <rect x="6" y="6" width="52" height="52" rx="15" fill="url(#li3d_sheen)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          <g fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.45))">
            <circle cx="21" cy="22" r="3.2" />
            <rect x="18" y="28" width="6" height="18" rx="2" />
            <rect x="29" y="28" width="6" height="18" rx="2" />
            <path d="M 29 35 C 29 31, 33 28, 38 28 C 43 28, 46 31, 46 36 L 46 46 L 40 46 L 40 37 C 40 34, 38 33, 35 33 C 32 33, 29 35, 29 37 Z" />
          </g>
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(168,85,247,0.85)] overflow-visible">
          <defs>
            <radialGradient id="gh3d_sphere" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="35%" stopColor="#1e293b" />
              <stop offset="80%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <linearGradient id="gh3d_rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="35" r="25" fill="#030712" opacity="0.65" />
          <circle cx="32" cy="32" r="25" fill="url(#gh3d_sphere)" stroke="url(#gh3d_rim)" strokeWidth="1.5" />
          <path
            d="M 32 15 C 21 15, 12 24, 12 35 C 12 43.8, 17.7 51.3, 25.6 53.9 C 26.6 54.1, 27 53.5, 27 53 L 27 49.7 C 21.4 50.9, 20.3 47, 20.3 47 C 19.4 44.7, 18.1 44.1, 18.1 44.1 C 16.3 42.9, 18.2 42.9, 18.2 42.9 C 20.2 43, 21.3 45, 21.3 45 C 23.1 48, 26 47.1, 27.1 46.6 C 27.3 45.3, 27.8 44.4, 28.4 43.9 C 24 43.4, 19.3 41.7, 19.3 34.1 C 19.3 31.9, 20.1 30.1, 21.4 28.7 C 21.2 28.2, 20.5 26.1, 21.6 23.4 C 21.6 23.4, 23.3 22.8, 27.2 25.4 C 28.8 25, 30.4 24.8, 32 24.8 C 33.6 24.8, 35.2 25, 36.8 25.4 C 40.7 22.8, 42.4 23.4, 42.4 23.4 C 43.5 26.1, 42.8 28.2, 42.6 28.7 C 43.9 30.1, 44.7 31.9, 44.7 34.1 C 44.7 41.7, 40 43.4, 35.5 43.9 C 36.2 44.5, 36.9 45.7, 36.9 47.6 L 36.9 53 C 36.9 53.5, 37.3 54.1, 38.3 53.9 C 46.3 51.2, 52 43.8, 52 35 C 52 24, 43 15, 32 15 Z"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.55))"
          />
        </svg>
      );

    case 'email':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] overflow-visible">
          <defs>
            <linearGradient id="mail3d_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="60%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#0e3a47" />
            </linearGradient>
          </defs>
          <rect x="8" y="18" width="48" height="32" rx="8" fill="#04202c" opacity="0.65" />
          <rect x="8" y="15" width="48" height="34" rx="8" fill="url(#mail3d_base)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <path d="M 12 18 L 32 34 L 52 18" fill="none" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))" />
          <path d="M 14 45 L 26 31" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 50 45 L 38 31" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_15px_rgba(37,211,102,0.85)] overflow-visible">
          <defs>
            <linearGradient id="wa3d_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="35%" stopColor="#25D366" />
              <stop offset="75%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#052e16" />
            </linearGradient>
            <linearGradient id="wa3d_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#022c22" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="wa3d_rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>

          {/* 3D Depth Base / Extrusion Shadow */}
          <g transform="translate(32, 35) scale(2.05) translate(-12, -12)">
            <path
              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"
              fill="#022c22"
              opacity="0.75"
            />
          </g>

          {/* 3D Glossy WhatsApp Speech Bubble */}
          <g transform="translate(32, 31) scale(2.05) translate(-12, -12)">
            <path
              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"
              fill="url(#wa3d_base)"
            />
            {/* Glossy Sheen Overlay */}
            <path
              d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654z"
              fill="url(#wa3d_sheen)"
              stroke="url(#wa3d_rim)"
              strokeWidth="0.6"
            />
            {/* White Telephone Handset Floating Inside */}
            <path
              d="M17.984 14.729c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
              fill="#ffffff"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
            />
          </g>

          {/* 3D Specular Highlight Dot */}
          <ellipse
            cx="25"
            cy="21"
            rx="5.5"
            ry="2.5"
            transform="rotate(-30 25 21)"
            fill="#ffffff"
            opacity="0.6"
          />
        </svg>
      );

    case 'phone':
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(16,185,129,0.85)] overflow-visible">
          <defs>
            <linearGradient id="phone3d_base" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="35" r="25" fill="#011b14" opacity="0.65" />
          <circle cx="32" cy="32" r="25" fill="url(#phone3d_base)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <path
            d="M 23 20 C 23 20, 20 22, 20 25 C 20 34, 30 44, 39 44 C 42 44, 44 41, 44 41 L 39 36 L 34 38 C 31 36, 28 33, 26 30 L 28 25 Z"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.45))"
          />
        </svg>
      );
  }
};

/**
 * 3D Interactive Social Icon (with Floating Hologram & Pedestal)
 */
export const Social3DIcon = ({
  type = 'github',
  size = 'md',
  withPedestal = false,
  isHovered = false,
  className = '',
}) => {
  const normType = normalizeSocialType(type);
  const theme = socialThemes[normType] || socialThemes.github;
  const isSmall = size === 'xs' || size === 'sm';

  // If used in compact inline button without pedestal
  if (!withPedestal) {
    const sizeMap = {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    }[size] || 'w-5 h-5';

    return (
      <motion.div
        whileHover={{ scale: 1.15, rotateZ: 3, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center justify-center select-none shrink-0 ${sizeMap} ${className}`}
      >
        <EmblemGraphic type={normType} />
      </motion.div>
    );
  }

  // Full 3D Isometric Holographic Pedestal Mode
  return (
    <div
      className={`relative flex items-center justify-center select-none shrink-0 ${
        isSmall ? 'w-12 h-12' : 'w-16 h-16 sm:w-20 sm:h-20'
      } ${className}`}
    >
      {/* 3D Holographic Platform with Neon Laser Rings */}
      <HolographicPedestal theme={theme} isHovered={isHovered} isSmall={isSmall} />

      {/* Floating 3D Emblem with Micro-Bobbing Physics */}
      <motion.div
        className={`relative z-10 flex items-center justify-center ${
          isSmall ? 'w-7 h-7 -translate-y-1' : 'w-10 h-10 sm:w-12 sm:h-12 -translate-y-2'
        }`}
        animate={{
          y: isHovered ? [0, -6, 0] : [0, -4, 0],
          rotateX: [0, 6, 0],
          rotateY: [-5, 5, -5],
        }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <EmblemGraphic type={normType} />
      </motion.div>
    </div>
  );
};

/**
 * 3D Interactive Social Card
 * A complete interactive card featuring the 3D Holographic Pedestal,
 * animated emblem, handle label, and direct one-click link.
 */
export const Social3DCard = ({ social }) => {
  const [isHovered, setIsHovered] = useState(false);
  const normType = normalizeSocialType(social.name);
  const theme = socialThemes[normType] || socialThemes.github;

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative p-3 sm:p-4 rounded-2xl glass-card border border-white/10 ${theme.border} bg-dark-900/80 hover:bg-dark-900/95 transition-all duration-300 shadow-xl ${theme.shadowHover} flex items-center gap-3.5 overflow-hidden`}
      aria-label={social.label || social.name}
    >
      {/* Ambient Corner Glow on Hover */}
      <div
        className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-60"
        style={{ background: theme.glow }}
        aria-hidden="true"
      />

      {/* 3D Holographic Icon with Pedestal */}
      <Social3DIcon
        type={social.name}
        size="md"
        withPedestal={true}
        isHovered={isHovered}
      />

      {/* Social Channel Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors truncate">
            {social.name}
          </h4>
          <span className="text-[10px] font-mono text-dark-400 group-hover:text-dark-200 transition-colors">
            ↗
          </span>
        </div>
        <p className={`text-xs font-mono font-medium truncate bg-gradient-to-r ${theme.textGradient} bg-clip-text text-transparent`}>
          {social.handle || social.name}
        </p>
      </div>
    </motion.a>
  );
};

export default Social3DIcon;
