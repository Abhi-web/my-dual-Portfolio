import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, viewportSettings } from '../../utils/motion.js';

export const SectionHeading = React.memo(({
  badge,
  title,
  titleHighlight,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <motion.div
      variants={fadeUpVariant(0, 16)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className={`mb-10 md:mb-12 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill border border-brand-500/20 mb-3.5 ${centered ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-xs font-mono font-medium tracking-wider uppercase text-brand-300">
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
        {title}{' '}
        {titleHighlight && (
          <span className="gradient-text-cyan">{titleHighlight}</span>
        )}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-dark-300 font-normal leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
});

export default SectionHeading;
