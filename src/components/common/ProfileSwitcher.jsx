import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../../context/ProfileContext.jsx';
import { Code2, Headphones, Layers, Sparkles } from 'lucide-react';

const modes = [
  { id: 'all', label: 'ALL', icon: Layers, tooltip: 'Dual-Domain Profile' },
  { id: 'tech', label: 'TECH', icon: Code2, tooltip: 'Software & Web Dev' },
  { id: 'bpo', label: 'BPO', icon: Headphones, tooltip: 'Support & Operations' },
];

export const ProfileSwitcher = ({ className = '', size = 'md', idPrefix = 'global' }) => {
  const { profileMode, setProfileMode } = useProfile();

  const isSmall = size === 'sm';

  const handleKeyDown = (e, currentIndex) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % modes.length;
      setProfileMode(modes[nextIndex].id);
      document.getElementById(`${idPrefix}-profile-tab-${modes[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + modes.length) % modes.length;
      setProfileMode(modes[prevIndex].id);
      document.getElementById(`${idPrefix}-profile-tab-${modes[prevIndex].id}`)?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Profile Presentation Mode Switcher"
      className={`relative inline-flex items-center p-1 rounded-xl glass-panel border border-white/10 bg-dark-950/80 shadow-inner ${className}`}
    >
      {modes.map((mode, index) => {
        const isActive = profileMode === mode.id;
        const IconComponent = mode.icon;
        const tabId = `${idPrefix}-profile-tab-${mode.id}`;

        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            id={tabId}
            aria-selected={isActive}
            aria-controls="main-content"
            tabIndex={isActive ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onClick={() => setProfileMode(mode.id)}
            title={mode.tooltip}
            className={`relative z-10 flex items-center justify-center gap-1.5 font-mono font-semibold transition-colors duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
              isSmall ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
            } ${
              isActive
                ? 'text-dark-950 font-bold'
                : 'text-dark-300 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={`${idPrefix}-activeProfileSegment`}
                className={`absolute inset-0 rounded-lg shadow-sm ${
                  mode.id === 'tech'
                    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500'
                    : mode.id === 'bpo'
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                    : 'bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500'
                }`}
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
            <IconComponent className={`relative z-10 ${isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
            <span className="relative z-10 tracking-wider">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ProfileSwitcher;
