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
import { About3DIcon } from './About3DIcon.jsx';
import { profileData } from '../../data/profile.js';
import { 
  staggerContainer, 
  staggerItem, 
  cardHoverProps, 
  fadeUpVariant, 
  viewportSettings 
} from '../../utils/motion.js';

const AboutCard = ({ type, badge, title, description, footer, borderHover, badgeColor }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={staggerItem(14)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-2xl glass-card border border-white/10 p-5 sm:p-6 flex flex-col justify-between group transition-all duration-300 ${borderHover} hover:-translate-y-1 shadow-lg hover:shadow-2xl relative overflow-hidden`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <About3DIcon type={type} isHovered={isHovered} />
          <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-white mt-1 mb-2 group-hover:text-cyan-200 transition-colors">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
          {description}
        </p>
      </div>
      <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-dark-400">
        {footer}
      </div>
    </motion.div>
  );
};

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
                Professional Journey & Core Foundations
              </h3>
              <p className="text-sm sm:text-base text-dark-200 leading-relaxed">
                I am a <span className="text-white font-semibold">BCA graduate</span> with a strong foundation in computer applications, web development, and modern technology. I enjoy building practical solutions and solving real-world problems through technology.
              </p>
              <p className="text-sm sm:text-base text-dark-300 leading-relaxed">
                Along with technical skills like <span className="text-brand-300 font-medium">React, JavaScript, Node.js</span>, and basic foundational knowledge of <span className="text-brand-300 font-medium">Cloud (AWS, Azure, Google Cloud), Docker, and Cloud Deployment</span>, I have developed strong communication, problem-solving, teamwork, and customer-handling skills.
              </p>
              <p className="text-sm sm:text-base text-dark-300 leading-relaxed">
                My approach is simple: understand the problem, work responsibly, and deliver reliable results.
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
                  <span><strong>Tech Focus:</strong> Frontend (React), Web Development, Cloud & Docker (Basics)</span>
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

        {/* 4 Themed Modular Cards (with Code-Based Interactive 3D Icons) */}
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {/* Card 1: Education */}
          <AboutCard
            type="academics"
            badge="Academics"
            title="Education Background"
            description="Bachelor of Computer Applications (BCA) with core coursework in Software Engineering, DBMS, Data Structures, Networks, and Business Communications."
            footer="Allenhouse Institute of Technology (2023 – 2026)"
            borderHover="hover:border-cyan-500/40"
            badgeColor="bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
          />

          {/* Card 2: Technical Skills Background */}
          <AboutCard
            type="engineering"
            badge="Engineering"
            title="Technical Foundations"
            description="Hands-on frontend & full-stack development experience utilizing React, modern JavaScript (ES6+), semantic HTML5, CSS Grid/Flexbox, Node.js, and Git."
            footer="Proficient in Component Architecture"
            borderHover="hover:border-blue-500/40"
            badgeColor="bg-blue-500/10 text-blue-300 border border-blue-500/20"
          />

          {/* Card 3: Professional & Support Skills */}
          <AboutCard
            type="client-service"
            badge="Client Service"
            title="Professional & BPO"
            description="Proven active listening, de-escalation, professional email writing, chat support, data integrity auditing, and spreadsheet automation with MS Excel."
            footer="High First-Contact Resolution Focus"
            borderHover="hover:border-teal-500/40"
            badgeColor="bg-teal-500/10 text-teal-300 border border-teal-500/20"
          />

          {/* Card 4: Career Focus & Adaptability */}
          <AboutCard
            type="objectives"
            badge="Objectives"
            title="Career Focus"
            description="Targeting opportunities where technical aptitude and human communication converge — software engineering, technical support, IT helpdesk, or business operations."
            footer="Adaptable to Dynamic Rotational Shifts"
            borderHover="hover:border-emerald-500/40"
            badgeColor="bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
          />
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
