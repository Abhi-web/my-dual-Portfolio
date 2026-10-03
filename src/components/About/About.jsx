import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Code2, 
  Headphones, 
  Target, 
  CheckCircle2
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { profileData } from '../../data/profile.js';
import { 
  staggerContainer, 
  staggerItem, 
  cardHoverProps, 
  fadeUpVariant, 
  viewportSettings 
} from '../../utils/motion.js';

export const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Candidate"
          title="Professional Journey &"
          titleHighlight="Core Foundations"
          subtitle="A versatile professional combining computer application fundamentals with customer-first empathy, operational discipline, and technical execution."
        />

        {/* Narrative Intro Card */}
        <motion.div
          variants={fadeUpVariant(0, 16)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="rounded-2xl glass-card border border-white/10 p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Engineering Practical Solutions While Putting People First
              </h3>
              <p className="text-sm sm:text-base text-dark-200 leading-relaxed">
                As a <span className="text-white font-semibold">Bachelor of Computer Applications (BCA)</span> graduate, I have developed a strong foundation in computer science, software architecture, and web systems. Concurrently, I recognized that great technology only creates business impact when paired with effective communication, customer empathy, and dependable operations.
              </p>
              <p className="text-sm sm:text-base text-dark-300 leading-relaxed">
                Whether deploying responsive web applications with <span className="text-brand-300 font-medium">React, JavaScript, and Node.js</span> or navigating mission-critical customer support escalations in a <span className="text-teal-300 font-medium">BPO / operations environment</span>, my objective remains identical: systematically dissect problems, execute with precision, and deliver dependable outcomes.
              </p>
            </div>

            <div className="lg:col-span-4 bg-dark-900/90 rounded-xl p-5 border border-white/10 space-y-3 shadow-inner">
              <div className="text-xs font-mono uppercase tracking-wider text-brand-400 font-semibold">
                Quick Profile Brief
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-dark-200">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Degree:</strong> BCA (Full-Time Academic Program)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Tech Focus:</strong> Frontend, React, Full-Stack Basics, REST APIs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Ops Focus:</strong> Inbound/Outbound, Chat & Email, MS Excel, CRM</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Availability:</strong> Immediate / Shift Rotational Ready</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* 4 Themed Modular Cards (Staggered Entrance) */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Card 1: Education */}
          <motion.div
            variants={staggerItem(14)}
            {...cardHoverProps}
            className="rounded-2xl glass-card border border-white/10 p-6 flex flex-col justify-between group hover:border-brand-500/40"
          >
            <div>
              <div className="icon-box-brand mb-4 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase text-brand-400 tracking-wider">Academics</span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">Education Background</h4>
              <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
                Bachelor of Computer Applications (BCA) with core coursework in Software Engineering, DBMS, Data Structures, Networks, and Business Communications.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-dark-400">
              Allenhouse Institute of Technology (2023 – 2026)
            </div>
          </motion.div>

          {/* Card 2: Technical Skills Background */}
          <motion.div
            variants={staggerItem(14)}
            {...cardHoverProps}
            className="rounded-2xl glass-card border border-white/10 p-6 flex flex-col justify-between group hover:border-blue-500/40"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase text-blue-400 tracking-wider">Engineering</span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">Technical Foundations</h4>
              <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
                Hands-on frontend & full-stack development experience utilizing React, modern JavaScript (ES6+), semantic HTML5, CSS Grid/Flexbox, Node.js, and Git.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-dark-400">
              Proficient in Component Architecture
            </div>
          </motion.div>

          {/* Card 3: Professional & Support Skills */}
          <motion.div
            variants={staggerItem(14)}
            {...cardHoverProps}
            className="rounded-2xl glass-card border border-white/10 p-6 flex flex-col justify-between group hover:border-teal-500/40"
          >
            <div>
              <div className="icon-box-teal mb-4 group-hover:scale-105 transition-transform duration-200">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase text-teal-400 tracking-wider">Client Service</span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">Professional & BPO</h4>
              <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
                Proven active listening, de-escalation, professional email writing, chat support, data integrity auditing, and spreadsheet automation with MS Excel.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-dark-400">
              High First-Contact Resolution Focus
            </div>
          </motion.div>

          {/* Card 4: Career Focus & Adaptability */}
          <motion.div
            variants={staggerItem(14)}
            {...cardHoverProps}
            className="rounded-2xl glass-card border border-white/10 p-6 flex flex-col justify-between group hover:border-emerald-500/40"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">Objectives</span>
              <h4 className="text-base sm:text-lg font-bold text-white mt-1 mb-2">Career Focus</h4>
              <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
                Targeting opportunities where technical aptitude and human communication converge — software engineering, technical support, IT helpdesk, or business operations.
              </p>
            </div>
            <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-dark-400">
              Adaptable to Dynamic Rotational Shifts
            </div>
          </motion.div>
        </motion.div>

        {/* Work Attitude & Values Row */}
        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {profileData.careerPhilosophy.map((phil, idx) => (
            <motion.div
              key={idx}
              variants={staggerItem(10)}
              className="p-4 rounded-xl bg-dark-900/70 border border-white/5 flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0 mt-2" />
              <div>
                <h5 className="text-xs sm:text-sm font-semibold text-white">{phil.title}</h5>
                <p className="text-[12px] text-dark-300 mt-1 leading-snug">{phil.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
