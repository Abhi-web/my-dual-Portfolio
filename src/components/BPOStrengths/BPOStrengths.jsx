import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { bpoStrengthsData, bpoMetricsOverview } from '../../data/bpoStrengths.js';
import { IconRenderer } from '../common/IconRenderer.jsx';
import { BPO3DIcon } from './BPO3DIcon.jsx';

export const BPOStrengths = () => {
  const [activeScenarioStep, setActiveScenarioStep] = useState(0);

  // Realistic Support Workflow Steps
  const scenarioSteps = [
    {
      step: "01",
      title: "Warm Greeting & Active Listening",
      icon: "Ear",
      description: "Acknowledge client concern empathetically, validate user frustration, and rephrase the core query to confirm complete mutual alignment before taking action.",
      agentQuote: '"I completely understand how critical this issue is for your workflow today. Let me take immediate ownership to resolve this with you."',
      kpi: "Sets reassuring tone (< 45s first reply)",
    },
    {
      step: "02",
      title: "Diagnostic Triage & Root Cause",
      icon: "BrainCircuit",
      description: "Ask targeted, non-intrusive diagnostic questions. Cross-reference customer account logs in CRM/Helpdesk to isolate system bugs from configuration glitches.",
      agentQuote: '"I am verifying your account status and recent transaction logs now to locate where the discrepancy occurred."',
      kpi: "Methodical technical elimination",
    },
    {
      step: "03",
      title: "Definitive Fix & Clear Explanation",
      icon: "ShieldCheck",
      description: "Execute resolution or guided walkthrough. Provide clear step-by-step instructions in simple, jargon-free language to ensure complete user confidence.",
      agentQuote: '"The transaction has been re-synchronized. Please refresh your screen and confirm that your updated balance displays properly."',
      kpi: "High First-Contact Resolution (FCR)",
    },
    {
      step: "04",
      title: "CRM Tagging & Process Documentation",
      icon: "FileSpreadsheet",
      description: "Log comprehensive ticket notes, assign correct categorization tags, and document edge cases in internal knowledge base to prevent recurrence.",
      agentQuote: '"Ticket #8942 resolved with 100% data audit compliance. Client confirmed satisfaction with zero lingering blockers."',
      kpi: "Zero error data record sanitation",
    }
  ];

  return (
    <section id="professional-strengths" className="py-20 md:py-28 relative bg-dark-900/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="BPO, Support & Operations"
          title="Professional"
          titleHighlight="Strengths"
          subtitle="Equally adept in customer-facing and operational roles. Demonstrating high empathy, structured communication, SLA discipline, and data integrity."
        />

        {/* Operational Excellence Metrics Header */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {bpoMetricsOverview.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="p-5 rounded-2xl glass-card border border-teal-500/20 bg-dark-950/80"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-400 mb-1">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mb-1">
                {item.label}
              </div>
              <div className="text-[11px] text-dark-300 leading-snug">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Customer Resolution Walkthrough Banner */}
        <div className="rounded-2xl glass-card border border-teal-500/30 p-6 sm:p-8 mb-14 bg-gradient-to-br from-teal-950/30 via-dark-950 to-dark-950 overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/10">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold block mb-1">
                Operational Framework
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Standard Operating Procedure: Escalation Lifecycle
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/30 text-xs font-mono w-fit">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              Empathetic & Structured Resolution
            </span>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5" role="tablist" aria-label="Escalation Lifecycle Stepper">
            {scenarioSteps.map((s, idx) => {
              const isActive = activeScenarioStep === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveScenarioStep(idx)}
                  className={`p-2.5 sm:p-3 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-teal-500/20 border border-teal-400/50 shadow-sm'
                      : 'bg-dark-900/70 border border-white/5 text-dark-400 hover:text-white hover:bg-dark-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-teal-400 font-bold">{s.step}</span>
                    <IconRenderer name={s.icon} className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div className={`text-[11px] sm:text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-dark-300'}`}>
                    {s.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScenarioStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-xl bg-dark-900/90 border border-white/10 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span className="text-teal-400 font-mono">Step {scenarioSteps[activeScenarioStep].step}:</span>
                  {scenarioSteps[activeScenarioStep].title}
                </h4>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 w-fit">
                  KPI: {scenarioSteps[activeScenarioStep].kpi}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-dark-200 leading-relaxed">
                {scenarioSteps[activeScenarioStep].description}
              </p>

              <div className="p-3.5 rounded-xl bg-dark-950 border border-teal-500/20 text-xs sm:text-sm text-teal-200 font-mono italic">
                {scenarioSteps[activeScenarioStep].agentQuote}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 11 Required Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bpoStrengthsData.map((item, idx) => (
            <BPOStrengthCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BPOStrengthCard = ({ item, idx }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.25) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-5 sm:p-6 rounded-2xl glass-card border border-white/10 hover:border-teal-400/40 flex flex-col justify-between group transition-all duration-300 h-full hover:-translate-y-1 shadow-lg hover:shadow-2xl relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <BPO3DIcon id={item.id} isHovered={isHovered} />
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-dark-950 text-teal-300 border border-teal-500/20">
            {item.stat}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-teal-200 transition-colors mb-2">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-dark-300 leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Core Competencies Bullets */}
        <div className="space-y-1.5 mb-4">
          {item.coreCompetencies.map((comp, cIdx) => (
            <div key={cIdx} className="flex items-start gap-2 text-xs text-dark-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
              <span>{comp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Real World Value Note */}
      <div className="pt-3 border-t border-white/10 mt-auto">
        <span className="text-[10px] font-mono uppercase tracking-wider text-dark-400 block mb-0.5">
          Business Value
        </span>
        <span className="text-xs text-teal-300 font-medium">
          {item.realWorldValue}
        </span>
      </div>
    </motion.div>
  );
};

export default BPOStrengths;
