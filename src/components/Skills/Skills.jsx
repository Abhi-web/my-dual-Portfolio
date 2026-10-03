import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { technicalSkills, professionalSkills, skillCategories } from '../../data/skills.js';
import { IconRenderer } from '../common/IconRenderer.jsx';
import { useProfile } from '../../context/ProfileContext.jsx';

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

        {/* Dynamic Skill Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.25) }}
                className="group p-5 rounded-2xl glass-card border border-white/10 hover:border-brand-500/40 flex flex-col justify-between h-full hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Bar: Icon, Title, and Category Tag */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-brand-400 group-hover:scale-105 group-hover:text-brand-300 transition-all shadow-sm">
                        <IconRenderer name={skill.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight group-hover:text-brand-200 transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-xs font-mono text-dark-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-dark-950 text-brand-300 border border-brand-500/20">
                      {skill.level}
                    </span>
                  </div>

                  {/* Contextual Description */}
                  <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
                    {skill.context}
                  </p>
                </div>

                {/* Practical Highlights Footer */}
                <div className="pt-3 border-t border-white/10 mt-auto">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-dark-400 mb-2">
                    Key Highlights
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.highlights.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-dark-950 text-dark-200 border border-white/5 flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-brand-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
