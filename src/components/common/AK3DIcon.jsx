import React from 'react';
import { motion } from 'framer-motion';

/**
 * 3D Isometric Holographic Pedestal Platform for AK
 */
const AKPedestal = ({ isHovered, size = 'sm' }) => {
  const isSmall = size === 'xs' || size === 'sm';

  return (
    <>
      {/* 1. Base Ambient Radial Glow */}
      <motion.div
        className={`absolute bottom-0 rounded-full blur-md pointer-events-none ${
          isSmall ? 'w-10 h-5' : 'w-14 h-7'
        }`}
        animate={{
          opacity: isHovered ? [0.7, 1, 0.7] : [0.35, 0.55, 0.35],
          scale: isHovered ? [1, 1.2, 1] : [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.55) 0%, rgba(20, 184, 166, 0.2) 50%, transparent 70%)',
        }}
      />

      {/* 2. 3D Isometric Holographic Pedestal Platform */}
      <svg
        className={`absolute bottom-0 overflow-visible pointer-events-none ${
          isSmall ? 'w-12 h-5' : 'w-16 h-8'
        }`}
        viewBox="0 0 100 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ak_ped_base" x1="0" y1="0" x2="100" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#083344" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="ak_ped_rim" x1="0" y1="0" x2="100" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="ak_ped_top" cx="50" cy="20" r="45" fx="50" fy="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#040b17" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Cylinder Extrusion */}
        <path
          d="M 10 22 C 10 33, 90 33, 90 22 L 90 29 C 90 40, 10 40, 10 29 Z"
          fill="url(#ak_ped_base)"
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
          stroke="#06b6d4"
          strokeWidth="1"
          strokeOpacity="0.35"
        />

        {/* Top Disc Plate */}
        <ellipse
          cx="50"
          cy="22"
          rx="40"
          ry="11"
          fill="url(#ak_ped_top)"
          stroke="url(#ak_ped_rim)"
          strokeWidth="1.5"
        />

        {/* Inner Glowing Ring */}
        <ellipse
          cx="50"
          cy="22"
          rx="28"
          ry="7.5"
          fill="none"
          stroke="#22d3ee"
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
          fill="#06b6d4"
          fillOpacity="0.65"
          filter="blur(1px)"
        />
      </svg>
    </>
  );
};

/**
 * 3D Floating "AK" Monogram Emblem Graphic
 */
const AKEmblemGraphic = () => {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-[0_0_14px_rgba(6,182,212,0.85)] overflow-visible">
      <defs>
        {/* Main 3D Glossy Cube/Badge Gradient */}
        <linearGradient id="ak_badge_base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="35%" stopColor="#06b6d4" />
          <stop offset="75%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#083344" />
        </linearGradient>

        {/* Specular Light Sheen */}
        <linearGradient id="ak_badge_sheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.45" />
        </linearGradient>

        {/* Outer Rim Highlight */}
        <linearGradient id="ak_badge_rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>

        {/* AK Text Fill Gradient */}
        <linearGradient id="ak_text_grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#a5f3fc" />
        </linearGradient>
      </defs>

      {/* 3D Depth Shadow Base */}
      <rect x="7" y="11" width="50" height="46" rx="14" fill="#021c27" opacity="0.75" />

      {/* Main 3D Glossy Hex/Rounded Badge */}
      <rect x="7" y="7" width="50" height="46" rx="14" fill="url(#ak_badge_base)" />
      <rect
        x="7"
        y="7"
        width="50"
        height="46"
        rx="14"
        fill="url(#ak_badge_sheen)"
        stroke="url(#ak_badge_rim)"
        strokeWidth="1.2"
      />

      {/* Diagonal Glass Reflection Streak */}
      <path
        d="M 12 8 L 30 8 L 12 36 Z"
        fill="#ffffff"
        opacity="0.2"
        pointerEvents="none"
      />

      {/* Futuristic Tech Inscribed Border */}
      <rect
        x="11"
        y="11"
        width="42"
        height="38"
        rx="10"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeDasharray="4 2"
      />

      {/* Monogram Typography "AK" */}
      <text
        x="32"
        y="37.5"
        textAnchor="middle"
        fontSize="22"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        fontWeight="900"
        letterSpacing="-0.5px"
        fill="url(#ak_text_grad)"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="0.8"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.6))"
      >
        AK
      </text>

      {/* Bottom Accent Underline */}
      <line
        x1="22"
        y1="42"
        x2="42"
        y2="42"
        stroke="#67e8f9"
        strokeWidth="1.8"
        strokeLinecap="round"
        filter="drop-shadow(0 0 3px #22d3ee)"
      />
    </svg>
  );
};

/**
 * AK3DIcon Component
 * Interactive 3D Icon featuring the holographic pedestal,
 * floating bobbing AK emblem, and active status beacon.
 */
export const AK3DIcon = ({
  size = 'sm',
  withPedestal = true,
  isHovered = false,
  showStatus = true,
  className = '',
}) => {
  const isSmall = size === 'xs' || size === 'sm';

  const containerSizes = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10 sm:w-11 sm:h-11',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-16 h-16 sm:w-20 sm:h-20',
  }[size] || 'w-10 h-10';

  const emblemSizes = {
    xs: 'w-6 h-6',
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11 sm:w-13 sm:h-13',
  }[size] || 'w-8 h-8';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${containerSizes} ${className}`}
    >
      {/* 1. Holographic Base Pedestal (Optional) */}
      {withPedestal && <AKPedestal isHovered={isHovered} size={size} />}

      {/* 2. Floating 3D "AK" Emblem */}
      <motion.div
        className={`relative z-10 flex items-center justify-center ${emblemSizes} ${
          withPedestal ? (isSmall ? '-translate-y-1' : '-translate-y-1.5') : ''
        }`}
        animate={{
          y: isHovered ? [0, -4, 0] : [0, -2.5, 0],
          rotateX: [0, 5, 0],
          rotateY: [-4, 4, -4],
        }}
        transition={{
          y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <AKEmblemGraphic />

        {/* 3. Status Beacon Dot (Online / Available Indicator) */}
        {showStatus && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-dark-950 shadow-sm" />
          </span>
        )}
      </motion.div>
    </div>
  );
};

export default AK3DIcon;
