import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { technicalSkills, professionalSkills, skillCategories } from '../../data/skills.js';
import { useProfile } from '../../context/ProfileContext.jsx';
import { Skill3DIcon } from './Skill3DIcon.jsx';

const getLevelBadge = (level = '') => {
  const l = level.toLowerCase();
  if (l.includes('basic') || l.includes('fundamental') || l.includes('beginner')) {
    return { label: 'Basic Knowledge', style: 'bg-sky-500/10 text-sky-300 border-sky-500/30 shadow-[0_0_10px_rgba(14,165,233,0.15)]' };
  }
  if (l.includes('advanced') || l.includes('architecture') || l.includes('expert') || l.includes('collaborative') || l.includes('modern design')) {
    return { label: 'Advanced', style: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.15)]' };
  }
  if (l.includes('proficient') || l.includes('competence') || l.includes('hands-on') || l.includes('standard') || l.includes('core')) {
    return { label: 'Proficient', style: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]' };
  }
  if (l.includes('foundational') || l.includes('working knowledge')) {
    return { label: 'Foundational', style: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.15)]' };
  }
  return { label: 'Intermediate', style: 'bg-amber-500/10 text-amber-300 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]' };
};

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const badge = getLevelBadge(skill.level);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.25) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative p-4 sm:p-5 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/40 bg-dark-900/80 hover:bg-dark-900/95 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.16)] flex flex-col justify-between h-full overflow-hidden"
    >
      {/* Ambient Corner Glow on Hover */}
      <div 
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/25 transition-all duration-500 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-3.5">
        {/* 3D Holographic Pedestal & Floating Icon */}
        <Skill3DIcon name={skill.name} isHovered={isHovered} />

        {/* Content Column */}
        <div className="flex-1 w-full text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
              {skill.name}
            </h3>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${badge.style}`}>
              {badge.label}
            </span>
          </div>

          {/* Contextual Description */}
          <p className="text-xs text-dark-300 leading-relaxed mb-3">
            {skill.context}
          </p>

          {/* KEY SKILLS / Highlights */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-dark-400 font-semibold block">
              KEY SKILLS
            </span>
            <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
              {skill.highlights.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium bg-dark-950 text-dark-200 border border-white/5 group-hover:border-cyan-500/20 group-hover:text-cyan-100 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const { profileMode } = useProfile();
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter skills based on current profile mode
  const modeSkills = useMemo(() => {
    const all = [...technicalSkills, ...professionalSkills];
    if (profileMode === 'tech') {
      return all.filter((s) => s.profileType && s.profileType.includes('tech'));
    }
    if (profileMode === 'bpo') {
      return all.filter((s) => s.profileType && s.profileType.includes('bpo'));
    }
    return all;
  }, [profileMode]);

  // Compute available categories for the active mode
  const availableCategories = useMemo(() => {
    const presentCats = new Set(modeSkills.map((s) => s.category.toLowerCase()));
    return skillCategories.filter((cat) => cat.id === 'all' || presentCats.has(cat.id.toLowerCase()));
  }, [modeSkills]);

  // Derived effective category ensures instant synchronization without cascading renders
  const effectiveCategory = availableCategories.some((c) => c.id === activeCategory)
    ? activeCategory
    : 'all';

  const filteredSkills = effectiveCategory === 'all'
    ? modeSkills
    : modeSkills.filter((s) => s.category.toLowerCase() === effectiveCategory.toLowerCase());

  // Dynamic headings per profile mode
  const headingProps = useMemo(() => {
    if (profileMode === 'tech') {
      return {
        badge: "Software & Web Engineering Competencies",
        title: "Technical Stack &",
        titleHighlight: "Architecture",
        subtitle: "Verified development proficiencies spanning frontend UI engineering, modern JavaScript (ES6+), component modularity, and RESTful service integration."
      };
    }
    if (profileMode === 'bpo') {
      return {
        badge: "Operational, Quality & Support Competencies",
        title: "Operations, Support &",
        titleHighlight: "Productivity",
        subtitle: "Structured customer handling, SLA adherence, data verification in MS Excel, process quality control, and cross-functional team coordination."
      };
    }
    return {
      badge: "Verified Competencies",
      title: "Dual-Domain Skills &",
      titleHighlight: "Architecture",
      subtitle: "Real-world technical development capabilities paired with enterprise customer support operations and quality inspection rigor."
    };
  }, [profileMode]);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={headingProps.badge}
          title={headingProps.title}
          titleHighlight={headingProps.titleHighlight}
          subtitle={headingProps.subtitle}
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/10" role="tablist" aria-label="Skills Category Filter">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            {availableCategories.map((cat) => {
              const isActive = effectiveCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 min-h-[40px] whitespace-nowrap rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    isActive
                      ? 'text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 shadow-glow-sm'
                      : 'text-dark-300 hover:text-white glass-pill hover:bg-dark-800'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-dark-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
            <span>Showing {filteredSkills.length} competencies</span>
          </div>
        </div>

        {/* Dynamic 3D Skill Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
