/**
 * Profile Modes Configuration
 * Centralized content mapping for ALL, TECH, and BPO career profiles.
 * Driven by the Dual-Career Architecture.
 */

export const profileModesConfig = {
  all: {
    id: "all",
    label: "ALL",
    displayName: "Dual-Domain",
    tagline: "Complete Professional Profile",
    badge: "Dual-Domain Career Profile • BCA Graduate",
    headline: "Building Modern Web Solutions. Delivering High-Impact Customer & Business Operations.",
    description: "Hardworking BCA graduate from Allenhouse Institute of Technology, Kanpur combining modern web engineering (React, JavaScript, Node.js) with quality inspection rigor, data management in MS Excel, and customer support operations.",
    primaryCTA: {
      label: "View My Work",
      href: "#projects",
      isScroll: true,
    },
    secondaryCTA: {
      label: "Download Resume",
      href: "/resume/abhishek-kushwaha-general.pdf",
      downloadName: "Abhishek-Kushwaha-Resume.pdf",
      isDownload: true,
    },
    contactCTA: "Get In Touch",
    contactSubtitle: "Whether you represent a development team or an operations desk, I am ready to bring dedication, technical acumen, and empathy to your organization.",
    metrics: [
      { value: "BCA", label: "Allenhouse Institute", sub: "Computer Applications" },
      { value: "MERN", label: "Web Foundations", sub: "React, Node, MongoDB" },
      { value: "7 Mo", label: "Quality Inspector", sub: "QC & Process Control" },
      { value: "4 Mo", label: "Data Entry Exec", sub: "MS Excel & Records" },
    ],
    resumeUrl: "/resume/abhishek-kushwaha-general.pdf",
    resumeDownloadName: "Abhishek-Kushwaha-Resume.pdf",
    navEmphasis: ["About", "Skills", "Profile", "Experience", "Projects", "Strengths", "Services", "Contact"],
  },

  tech: {
    id: "tech",
    label: "TECH",
    displayName: "Software & Web Dev",
    tagline: "Technical Focus",
    badge: "Software & Web Development Track • BCA Graduate",
    headline: "Engineering Scalable Frontend Interfaces & Modern Full-Stack Applications.",
    description: "BCA graduate specializing in React, JavaScript (ES6+), Node.js, Express, and REST APIs. Focused on component modularity, clean code, responsive design, and continuous software problem-solving.",
    primaryCTA: {
      label: "Explore Projects",
      href: "#projects",
      isScroll: true,
    },
    secondaryCTA: {
      label: "Download Technical Resume",
      href: "/resume/abhishek-kushwaha-technical.pdf",
      downloadName: "Abhishek-Kushwaha-Technical-Resume.pdf",
      isDownload: true,
    },
    contactCTA: "Discuss a Project",
    contactSubtitle: "Let's discuss frontend engineering, React development, or technical software opportunities.",
    metrics: [
      { value: "React", label: "Core Frontend", sub: "Component Architecture" },
      { value: "ES6+", label: "Modern JavaScript", sub: "Async, REST & DOM" },
      { value: "MERN", label: "Full-Stack Basics", sub: "Node, Express, MongoDB" },
      { value: "Git", label: "Version Control", sub: "Branching & GitHub" },
    ],
    resumeUrl: "/resume/abhishek-kushwaha-technical.pdf",
    resumeDownloadName: "Abhishek-Kushwaha-Technical-Resume.pdf",
    navEmphasis: ["Projects", "Skills", "Profile", "Experience", "Contact"],
  },

  bpo: {
    id: "bpo",
    label: "BPO",
    displayName: "Support & Operations",
    tagline: "Operations Focus",
    badge: "Operations, Support & Quality Track • BCA Graduate",
    headline: "Delivering Flawless Customer Support, Process Quality & Data Integrity.",
    description: "BCA graduate with proven experience as a Quality Inspector (7 Months) and Data Entry Executive (4 Months). Skilled in process monitoring, SLA adherence, MS Excel data management, and empathetic omnichannel customer resolution.",
    primaryCTA: {
      label: "View Professional Profile",
      href: "#career-profile",
      isScroll: true,
    },
    secondaryCTA: {
      label: "Download Operations Resume",
      href: "/resume/abhishek-kushwaha-bpo.pdf",
      downloadName: "Abhishek-Kushwaha-BPO-Resume.pdf",
      isDownload: true,
    },
    contactCTA: "Let's Connect",
    contactSubtitle: "Open to BPO, customer support, data entry, quality inspection, and operational roles with rotational readiness.",
    metrics: [
      { value: "7 Mo", label: "Quality Inspector", sub: "QC & Defect Control" },
      { value: "4 Mo", label: "Data Entry Executive", sub: "MS Excel & Reporting" },
      { value: "100%", label: "SLA Adherence", sub: "Customer Support SOPs" },
      { value: "24/7", label: "Shift Readiness", sub: "Rotational Flexibility" },
    ],
    resumeUrl: "/resume/abhishek-kushwaha-bpo.pdf",
    resumeDownloadName: "Abhishek-Kushwaha-BPO-Resume.pdf",
    navEmphasis: ["Strengths", "Experience", "Profile", "Skills", "Services", "Resume", "Contact"],
  },
};

export default profileModesConfig;
