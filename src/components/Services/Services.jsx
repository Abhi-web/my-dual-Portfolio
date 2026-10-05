import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { servicesData } from '../../data/services.js';
import { Competency3DIcon } from './Competency3DIcon.jsx';
import { CheckCircle2 } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext.jsx';

const ServiceCard = ({ service, idx, isTech }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.2) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`p-6 rounded-2xl glass-card border border-white/10 ${
        isTech ? 'hover:border-brand-500/40' : 'hover:border-teal-500/40'
      } flex flex-col justify-between group transition-all h-full hover:-translate-y-1 shadow-lg hover:shadow-2xl relative overflow-hidden`}
    >
      <div>
        {/* Header 3D Holographic Icon & Track Tag */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <Competency3DIcon id={service.id} isHovered={isHovered} />
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium ${
              isTech
                ? 'bg-brand-500/10 text-brand-300 border border-brand-500/20'
                : 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
            }`}
          >
            {service.track}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-200 transition-colors mb-2.5">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Tangible Deliverables List */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-dark-400 block mb-1 font-semibold">
            What I Deliver:
          </span>
          {service.deliverables.map((deliv, dIdx) => (
            <div key={dIdx} className="flex items-start gap-2 text-xs text-dark-200">
              <CheckCircle2
                className={`w-3.5 h-3.5 ${isTech ? 'text-brand-400' : 'text-teal-400'} shrink-0 mt-0.5`}
              />
              <span>{deliv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Footer */}
      <div className="pt-3 border-t border-white/10 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {service.skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950 text-dark-300 border border-white/5"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Services = () => {
  const { profileMode } = useProfile();

  const sortedServices = useMemo(() => {
    if (profileMode === 'tech') {
      return [...servicesData].sort((a, b) => (b.track === 'Technical' ? 1 : 0) - (a.track === 'Technical' ? 1 : 0));
    }
    if (profileMode === 'bpo') {
      return [...servicesData].sort((a, b) => (b.track !== 'Technical' ? 1 : 0) - (a.track !== 'Technical' ? 1 : 0));
    }
    return servicesData;
  }, [profileMode]);

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Personal Capabilities"
          title="Areas of Impact &"
          titleHighlight="Competencies"
          subtitle="Direct individual capabilities across software engineering, customer success, administrative coordination, and data handling."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedServices.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              idx={idx}
              isTech={service.track === 'Technical'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
