import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { experienceData } from '../../data/experience.js';
import { useProfile } from '../../context/ProfileContext.jsx';
import { 
  viewportSettings, 
  cardHoverProps,
  customEase
} from '../../utils/motion.js';

export const Experience = () => {
  const { profileMode } = useProfile();

  // Intelligently order experience records based on active profile mode
  const displayExperiences = useMemo(() => {
    if (profileMode === 'tech') {
      return [...experienceData].sort((a, b) => {
        const aTech = a.profileType?.includes('tech') ? 1 : 0;
        const bTech = b.profileType?.includes('tech') ? 1 : 0;
        return bTech - aTech;
      });
    }
    if (profileMode === 'bpo') {
      return [...experienceData].sort((a, b) => {
        const aBpo = a.profileType?.includes('bpo') ? 1 : 0;
        const bBpo = b.profileType?.includes('bpo') ? 1 : 0;
        return bBpo - aBpo;
      });
    }
    return experienceData;
  }, [profileMode]);

  const headingProps = useMemo(() => {
    if (profileMode === 'tech') {
      return {
        badge: "Software & Web Development Journey",
        title: "Technical",
        titleHighlight: "Experience",
        subtitle: "Software engineering, modern frontend component development, and academic technology innovation."
      };
    }
    if (profileMode === 'bpo') {
      return {
        badge: "Operations & Quality Assurance Journey",
        title: "Operations & Quality",
        titleHighlight: "Experience",
        subtitle: "Hands-on quality inspection, process compliance, high-volume data verification in MS Excel, and operational discipline."
      };
    }
    return {
      badge: "Career Milestones",
      title: "Experience &",
      titleHighlight: "Leadership",
      subtitle: "A track record of technical delivery, customer satisfaction, and collaborative execution across software development and operational roles."
    };
  }, [profileMode]);

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={headingProps.badge}
          title={headingProps.title}
          titleHighlight={headingProps.titleHighlight}
          subtitle={headingProps.subtitle}
        />

        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Vertical Timeline Central Glowing Line */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -ml-px w-0.5 bg-gradient-to-b from-brand-400 via-brand-500/30 to-transparent pointer-events-none" />

          {/* Timeline Milestones */}
          <div className="space-y-10 sm:space-y-14">
            {displayExperiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportSettings}
                  transition={{ duration: 0.45, delay: idx * 0.1, ease: customEase }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node with subtle pulse */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center w-7 h-7 rounded-full bg-dark-900 border-2 border-brand-400 z-10 shadow-glow-sm">
                    <span className="w-2 h-2 rounded-full bg-brand-400" />
                  </div>

                  {/* Spacer for Alternate Desktop Layout */}
                  <div className="hidden sm:block sm:w-1/2" />

                  {/* Experience Card */}
                  <div
                    className={`w-full pl-11 sm:pl-0 sm:w-1/2 ${
                      isEven ? 'sm:pr-10' : 'sm:pl-10'
                    }`}
                  >
                    <motion.div
                      {...cardHoverProps}
                      className="rounded-2xl glass-card border border-white/10 p-6 sm:p-7 hover:border-brand-500/40 transition-all shadow-xl group"
                    >
                      {/* Meta Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.duration}
                        </span>

                        <span className="text-[11px] font-mono text-dark-400 uppercase tracking-wider">
                          {exp.type}
                        </span>
                      </div>

                      {/* Role & Org */}
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-brand-200 transition-colors">
                        {exp.role}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-dark-300 font-medium mt-1 mb-3">
                        <span className="text-white">{exp.organization}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-dark-400 font-mono text-xs">
                          <MapPin className="w-3 h-3 text-brand-400" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
                        {exp.summary}
                      </p>

                      {/* Responsibilities List */}
                      <div className="space-y-2 mb-5">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-dark-400 font-semibold">
                          Key Responsibilities:
                        </div>
                        <ul className="space-y-1.5 text-xs text-dark-300">
                          {exp.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <ChevronRight className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Achievements Highlight Box */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-dark-900/90 border border-white/5 mb-4">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                            <Award className="w-4 h-4" />
                            <span>Notable Achievements</span>
                          </div>
                          <ul className="space-y-1 text-xs text-dark-300">
                            {exp.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Skills Used Tags */}
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skillsUsed.map((sk) => (
                            <span
                              key={sk}
                              className="px-2 py-0.5 rounded text-[11px] font-mono bg-dark-950 text-dark-300 border border-white/5"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
