import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, ArrowRight } from 'lucide-react';
import { Github } from '../common/BrandIcons.jsx';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { projectsData, projectCategories } from '../../data/projects.js';
import { FeaturedProject } from './FeaturedProject.jsx';
import { useProfile } from '../../context/ProfileContext.jsx';

// Lazy-load modal dialog only on demand
const ProjectModal = React.lazy(() => import('./ProjectModal.jsx'));

export const Projects = () => {
  const { profileMode } = useProfile();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects by profile mode relevance
  const modeProjects = useMemo(() => {
    if (profileMode === 'tech') {
      return projectsData.filter((p) => p.profileType && p.profileType.includes('tech'));
    }
    if (profileMode === 'bpo') {
      return projectsData.filter((p) => p.profileType && p.profileType.includes('bpo'));
    }
    return projectsData;
  }, [profileMode]);

  const featuredProject = useMemo(() => {
    return modeProjects.find((p) => p.featured) || modeProjects[0] || null;
  }, [modeProjects]);

  const regularProjects = useMemo(() => {
    return modeProjects.filter((p) => p.id !== featuredProject?.id);
  }, [modeProjects, featuredProject]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return regularProjects;
    return regularProjects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [activeCategory, regularProjects]);

  const headingProps = useMemo(() => {
    if (profileMode === 'tech') {
      return {
        badge: "Engineering & Code Artifacts",
        title: "Software & Web",
        titleHighlight: "Projects",
        subtitle: "Component architecture, API consumption, state synchronization, and scalable frontend applications."
      };
    }
    if (profileMode === 'bpo') {
      return {
        badge: "Operational Systems & Workflows",
        title: "Support & Operations",
        titleHighlight: "Systems",
        subtitle: "Operational dashboards, customer ticketing architectures, live-chat simulators, and data verification suites."
      };
    }
    return {
      badge: "Featured Engineering & Work",
      title: "Curated Projects &",
      titleHighlight: "Case Studies",
      subtitle: "Explore full-stack web applications, customer support workflows, and operational utilities crafted with clean architecture and performance in mind."
    };
  }, [profileMode]);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={headingProps.badge}
          title={headingProps.title}
          titleHighlight={headingProps.titleHighlight}
          subtitle={headingProps.subtitle}
        />

        {/* Featured Flagship Project */}
        {featuredProject && (
          <FeaturedProject
            project={featuredProject}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10" role="tablist" aria-label="Project Category Filter">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 min-h-[40px] whitespace-nowrap rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    isActive
                      ? 'bg-brand-500 text-dark-950 shadow-glow-sm'
                      : 'glass-pill text-dark-300 hover:text-white hover:bg-dark-800'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-mono text-dark-400">
            Showing {filteredProjects.length} additional applications
          </span>
        </div>

        {/* Projects Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.2) }}
                className="group rounded-2xl glass-card border border-white/10 hover:border-brand-500/40 flex flex-col justify-between overflow-hidden shadow-lg transition-all h-full hover:-translate-y-0.5"
              >
                <div>
                  {/* Card Image Banner - Semantic Button for touch and keyboard */}
                  <button 
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full aspect-[16/10] overflow-hidden bg-dark-900 border-b border-white/10 text-left block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 group/btn"
                    aria-label={`Preview details for ${project.title}`}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} - application interface preview`}
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="375"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-dark-950/90 text-brand-300 border border-brand-500/20 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Quick Preview Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-950/60 backdrop-blur-xs">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white text-dark-950 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick Preview</span>
                      </span>
                    </div>
                  </button>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-brand-200 transition-colors mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-dark-300 line-clamp-3 leading-relaxed mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-brand-300 border border-brand-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-dark-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer with 44px min touch target */}
                <div className="p-4 sm:p-5 pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-2 text-xs font-semibold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 active:scale-95"
                        aria-label={`Live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] px-2 text-xs font-medium text-dark-400 hover:text-white inline-flex items-center gap-1 active:scale-95"
                        aria-label={`GitHub code for ${project.title}`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="min-h-[40px] px-2 text-xs font-medium text-dark-300 hover:text-white flex items-center gap-1 group-hover:text-brand-300 transition-colors active:scale-95"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Modal Window - Loaded on Demand */}
        {selectedProject && (
          <React.Suspense fallback={null}>
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          </React.Suspense>
        )}
      </div>
    </section>
  );
};

export default Projects;
