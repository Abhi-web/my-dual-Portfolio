import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Github } from '../common/BrandIcons.jsx';

export const FeaturedProject = ({ project, onSelectProject }) => {
  if (!project) return null;

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
          Full-Stack Engineering & Operations Synergy
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Preview with Direct Tap & Keyboard Support */}
        <button 
          type="button"
          onClick={() => onSelectProject(project)}
          className="lg:col-span-6 relative rounded-xl overflow-hidden border border-white/10 bg-dark-900 group-hover:border-brand-500/40 transition-colors shadow-xl text-left block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          aria-label={`View architecture details for ${project.title}`}
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} - flagship web application showcase`}
              loading="lazy"
              decoding="async"
              width="800"
              height="500"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

            {/* Quick action button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-950/60 backdrop-blur-xs">
              <span className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white text-dark-950 shadow-xl">
                Inspect Architecture Details
              </span>
            </div>
          </div>
        </button>

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
