/**
 * Centralized Resume Configuration
 * Single Source of Truth for Abhishek Kushwaha's Resume System
 * Sourced directly from verified academic and industry credentials:
 * BCA, Allenhouse Institute of Technology, Kanpur
 * 
 * Supports:
 * - ALL (General Resume)
 * - TECH (Technical Software Engineering Resume)
 * - BPO (Operations, Quality & Customer Support Resume)
 * 
 * Ready for future API integration (GET /api/resumes) and Admin Management.
 */

export const resumeConfig = {
  general: {
    id: "general",
    type: "general",
    profileMode: "all",
    title: "General Professional Resume",
    badge: "Dual-Domain Track • Verified Credentials",
    targetRole: "Software Engineering & Operations Roles",
    subtitle: "Complete Career & Academic Credentials",
    description: "Comprehensive verified resume highlighting computer applications foundation (BCA), modern web development (React, JavaScript), quality inspection rigor, and MS Excel data management.",
    file: "/resume/abhishek-kushwaha-general.pdf",
    fallbackFile: "/Abhishek_Kushwaha_Resume.pdf",
    downloadName: "Abhishek-Kushwaha-Resume.pdf",
    available: true,
    version: "2026.1",
    lastUpdated: "October 2026",
    format: "PDF Document",
    size: "240 KB",
    institution: "Allenhouse Institute of Technology, Kanpur",
    summaryNarrative: "Hardworking and motivated BCA graduate combining modern web application engineering (React, JavaScript, Node.js) with precision operations (7 months Quality Inspector, 4 months Data Entry Executive in MS Excel). Proven focus on SLA adherence, code quality, and methodical problem-solving.",
    coreCompetencies: [
      "React & Modern JavaScript (ES6+)",
      "Cloud & DevOps Basics (AWS, Azure, Google Cloud, Docker, Deployment)",
      "HTML5, CSS3 & Responsive Design",
      "Node.js Basics & REST APIs",
      "Quality Inspection & Defect Control",
      "MS Excel (Formulas, Pivot Tables, Data Entry)",
      "SLA Adherence & Process Compliance",
      "Customer Support & Active Listening",
      "Analytical Problem Solving",
      "Git & GitHub Version Control"
    ],
    experienceSummary: [
      {
        role: "Quality Inspector",
        duration: "7 Months",
        organization: "Industrial Quality Division",
        detail: "Standardized visual & dimensional inspection, defect logging, and process quality compliance with zero defect escapes."
      },
      {
        role: "Data Entry Executive",
        duration: "4 Months",
        organization: "Operations Desk",
        detail: "Managed high-volume data records in MS Excel with 100% accuracy, database integrity audits, and weekly reporting."
      }
    ]
  },

  technical: {
    id: "technical",
    type: "technical",
    profileMode: "tech",
    title: "Technical Software Resume",
    badge: "Software Engineering & Web Development Track",
    targetRole: "Frontend Developer / Junior Full-Stack Engineer",
    subtitle: "Frontend Architecture & Web Development",
    description: "Specialized technical resume emphasizing React.js frontend architecture, modern JavaScript (ES6+), RESTful API integration, responsive styling with Tailwind CSS, and BCA software coursework.",
    file: "/resume/abhishek-kushwaha-technical.pdf",
    fallbackFile: "/resume/abhishek-kushwaha-general.pdf",
    downloadName: "Abhishek-Kushwaha-Technical-Resume.pdf",
    available: true,
    version: "2026.1",
    lastUpdated: "October 2026",
    format: "PDF Document",
    size: "240 KB",
    institution: "Allenhouse Institute of Technology, Kanpur",
    summaryNarrative: "BCA student specializing in modern web engineering and component-driven architecture. Experienced in React, JavaScript (ES6+), Node.js, Express, and Tailwind CSS. Dedicated to building accessible, high-performance web applications with seamless UX, REST API integration, and clean code principles.",
    coreCompetencies: [
      "React (Hooks, Context API, Suspense)",
      "JavaScript (ES6+, Async/Await, DOM)",
      "Cloud Infrastructure Basics (AWS, Azure, Google Cloud)",
      "Docker & Cloud Deployment Fundamentals",
      "Tailwind CSS & Vanilla CSS Design Systems",
      "HTML5 Semantic Architecture & Web Accessibility (WCAG)",
      "Node.js & Express RESTful APIs",
      "MongoDB & Database Fundamentals",
      "Git & GitHub Version Control",
      "Vite & Modern Frontend Tooling",
      "Framer Motion & Micro-interactions"
    ],
    experienceSummary: [
      {
        role: "Frontend Software Developer",
        duration: "BCA Academic Track (2023–2026)",
        organization: "Allenhouse Institute of Technology",
        detail: "Engineered scalable React applications with modular component architecture, state management, and optimized asset pipelines."
      },
      {
        role: "Brain Teasers Competition – 2nd Runner-Up",
        duration: "Exuberance 2024",
        organization: "Allenhouse Technical Festival",
        detail: "Demonstrated advanced algorithmic reasoning, quantitative problem decomposition, and rapid debugging."
      }
    ]
  },

  bpo: {
    id: "bpo",
    type: "bpo",
    profileMode: "bpo",
    title: "Operations & Customer Support Resume",
    badge: "Customer Operations & Quality Assurance Track",
    targetRole: "Customer Support Executive / Operations Specialist / Quality Inspector",
    subtitle: "Quality Assurance, MS Excel & Support Operations",
    description: "Verified professional resume highlighting quality inspection rigor, MS Excel data management, 100% SLA adherence, and customer communication across voice, email, and live chat channels.",
    file: "/resume/abhishek-kushwaha-bpo.pdf",
    fallbackFile: "/resume/abhishek-kushwaha-general.pdf",
    downloadName: "Abhishek-Kushwaha-BPO-Resume.pdf",
    available: true,
    version: "2026.1",
    lastUpdated: "October 2026",
    format: "PDF Document",
    size: "240 KB",
    institution: "Allenhouse Institute of Technology, Kanpur",
    summaryNarrative: "Methodical and disciplined operations professional with 11 months of verified industry experience across Quality Inspection (7 Months) and Data Entry (4 Months). Skilled in process compliance, MS Excel records, SLA adherence, and high-empathy customer communication with 24/7 rotational shift flexibility.",
    coreCompetencies: [
      "Quality Inspection & SOP Compliance",
      "MS Excel (VLOOKUP, Pivot Tables, Error Audits)",
      "Data Entry & Record Verification",
      "100% SLA Adherence & Time Management",
      "Customer Support & Active Listening",
      "Email Etiquette & Chat Resolution",
      "De-escalation & Conflict Resolution",
      "Order & Fulfillment Tracking",
      "24x7 Rotational Shift Readiness"
    ],
    experienceSummary: [
      {
        role: "Quality Inspector",
        duration: "7 Months",
        organization: "Quality Control & Assurance",
        detail: "Maintained rigorous quality metrics, performed standardized batch inspections, and enforced standard operating procedures."
      },
      {
        role: "Data Entry Executive",
        duration: "4 Months",
        organization: "Records & Documentation Desk",
        detail: "Handled data input, validation audits, and accurate record storage in MS Excel with zero SLA breaches."
      }
    ]
  }
};

/**
 * Metadata for future API and Admin Dashboard configuration
 */
export const resumeMeta = {
  defaultMode: "all",
  defaultType: "general",
  apiEndpoint: "/api/resumes",
  adminConfigurable: true,
  lastSystemSync: "2026-10-03"
};

/**
 * Resolves the active resume configuration for a given profile mode with safe fallback.
 * 
 * Rules:
 * - 'tech' -> Technical Resume (fallback: General)
 * - 'bpo'  -> BPO Resume (fallback: General)
 * - 'all'  -> General Resume
 * - unknown or unavailable -> General Resume
 * 
 * @param {string} profileMode - 'all' | 'tech' | 'bpo'
 * @returns {object} Active resume configuration with fallback status
 */
export function getActiveResume(profileMode) {
  const normalizedMode = (profileMode || "all").toLowerCase().trim();

  let targetResume = null;
  if (normalizedMode === "tech") {
    targetResume = resumeConfig.technical;
  } else if (normalizedMode === "bpo") {
    targetResume = resumeConfig.bpo;
  } else {
    targetResume = resumeConfig.general;
  }

  // Fallback verification: if target resume is missing or marked unavailable, fall back to general
  if (!targetResume || !targetResume.available) {
    const general = resumeConfig.general;
    return {
      ...general,
      isFallback: true,
      requestedMode: normalizedMode,
      fallbackNotice: `The ${normalizedMode.toUpperCase()} resume is currently being updated. Displaying the verified General Resume.`
    };
  }

  return {
    ...targetResume,
    isFallback: false,
    requestedMode: normalizedMode,
    fallbackNotice: null
  };
}

/**
 * Returns all configured resumes as an array.
 * Useful for resume switchers, comparisons, and future admin tables.
 * 
 * @returns {Array<object>}
 */
export function getAllResumes() {
  return [resumeConfig.general, resumeConfig.technical, resumeConfig.bpo];
}

/**
 * Lookup resume by its explicit type identifier.
 * 
 * @param {string} type - 'general' | 'technical' | 'bpo'
 * @returns {object}
 */
export function getResumeByType(type) {
  const normalized = (type || "general").toLowerCase().trim();
  return resumeConfig[normalized] || resumeConfig.general;
}

export default resumeConfig;
