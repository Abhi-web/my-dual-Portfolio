import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Github } from '../common/BrandIcons.jsx';

export const FeaturedProject = ({ project, onSelectProject }) => {
  if (!project) return null;

  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : null;
  const currentImage = gallery ? gallery[activeImageIndex]?.url || project.image : project.image;
  const currentTitle = gallery ? gallery[activeImageIndex]?.title : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl glass-card border border-brand-500/30 p-6 sm:p-8 md:p-10 mb-12 shadow-2xl relative overflow-hidden group"
    >
      {/* Featured Header Pill */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-400/30 text-brand-300 text-xs font-mono font-medium">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Flagship Showcase Project</span>
        </div>

        <span className="text-xs font-mono text-dark-400">
          Full-Stack Engineering & AI Synergy
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Preview with Direct Tap & Keyboard Support */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <button 
            type="button"
            onClick={() => onSelectProject(project)}
            className="relative rounded-xl overflow-hidden border border-white/10 bg-dark-900 group-hover:border-brand-500/40 transition-colors shadow-xl text-left block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 group/img"
            aria-label={`View architecture details for ${project.title}`}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={currentImage}
                alt={`${project.title} - ${currentTitle || 'flagship web application showcase'}`}
                loading="lazy"
                decoding="async"
                width="800"
                height="500"
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

              {/* Active Screenshot Title Badge */}
              {currentTitle && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-dark-950/85 text-brand-300 border border-brand-500/30 backdrop-blur-md">
                    {currentTitle}
                  </span>
                </div>
              )}

              {/* Quick action button overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-dark-950/60 backdrop-blur-xs">
                <span className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white text-dark-950 shadow-xl">
                  Inspect Architecture Details
                </span>
              </div>
            </div>
          </button>

          {/* Interactive Gallery Thumbnails Strip */}
          {gallery && gallery.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {gallery.map((item, idx) => {
                const isSelected = idx === activeImageIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(idx);
                    }}
                    className={`relative rounded-lg overflow-hidden border transition-all duration-200 shrink-0 ${
                      isSelected
                        ? 'border-brand-400 ring-2 ring-brand-400/50 scale-105'
                        : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                    }`}
                    style={{ width: '72px', height: '45px' }}
                    aria-label={`View ${item.title}`}
                    title={item.title}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
              <span className="text-[11px] font-mono text-dark-400 pl-1 whitespace-nowrap">
                {gallery.length} Screens Available
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Information, Metrics, Features & CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mb-3">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-5">
              {project.shortDescription}
            </p>

            {/* Metrics Chips */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-dark-900/90 border border-white/5 mb-5">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="text-center">
                    <span className="text-[11px] text-dark-400 block">{m.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-300 font-mono mt-0.5">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Key Features Bullet Points */}
            <div className="space-y-2 mb-6">
              {project.features?.slice(0, 3).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-dark-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Technology Stack Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-dark-950 text-brand-300 border border-brand-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs with comfortable touch targets */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 shadow-glow-sm transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-white glass-pill border border-white/10 hover:bg-dark-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 sm:ml-auto"
            >
              <span>Full Specifications</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProject;
