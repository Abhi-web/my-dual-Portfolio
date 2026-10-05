/**
 * Centralized Contact Configuration
 * Single Source of Truth for Abhishek Kushwaha's Communication Channels
 * Sourced directly from verified candidate credentials:
 * BCA Graduate, Allenhouse Institute of Technology, Kanpur
 */

export const contactData = {
  name: "Abhishek Kushwaha",
  shortName: "Abhishek",
  title: "BCA Graduate | Web Developer & Operations / Support Specialist",
  
  // Direct verified contact coordinates
  email: "abhishekku389@gmail.com",
  phone: "+91-8127290159",
  displayPhone: "+91 81272 90159",
  telUrl: "tel:+918127290159",
  location: "Kanpur, Uttar Pradesh, India",
  locationShort: "Kanpur, UP, India",
  workingHours: "Flexible / 24x7 Rotational Ready",
  responseTime: "Guaranteed response within 24 hours",
  
  // Real-time hiring availability
  availability: {
    status: "Open to Opportunities",
    badge: "Available Immediately",
    types: [
      "Full-Time Employment",
      "Frontend & Web Engineering",
      "Customer Support & BPO",
      "Quality Inspection & Data Entry"
    ],
    openToRelocation: true,
    openToRemote: true,
  },

  // Verified social profiles & direct channels
  socials: [
    {
      id: "linkedin",
      name: "LinkedIn",
      label: "Connect with Abhishek on LinkedIn",
      url: "https://www.linkedin.com/in/abhishek-kushwaha-84b2a42b8?",
      handle: "in/abhishek-kushwaha",
      description: "Professional endorsements, background verification & networking",
      icon: "Linkedin",
      modes: ["all", "tech", "bpo"],
      featured: true,
    },
    {
      id: "github",
      name: "GitHub",
      label: "Inspect Code on GitHub",
      url: "https://github.com/Abhi-web",
      handle: "@Abhi-web",
      description: "React repositories, component architecture & web codebases",
      icon: "Github",
      modes: ["tech", "all"],
      featured: true,
    },
    {
      id: "instagram",
      name: "Instagram",
      label: "Follow Abhishek on Instagram",
      url: "https://www.instagram.com/it_abhishek_106/",
      handle: "@it_abhishek_106",
      description: "Social connection, creative updates & direct messaging",
      icon: "Instagram",
      modes: ["all", "tech", "bpo"],
      featured: true,
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      label: "Chat directly with Abhishek on WhatsApp",
      url: "https://wa.me/918127290159",
      handle: "+91 81272 90159",
      description: "Direct instant chat for quick queries & interview scheduling",
      icon: "Whatsapp",
      modes: ["all", "tech", "bpo"],
      featured: true,
    },
    {
      id: "email",
      name: "Direct Email",
      label: "Send Email Directly",
      url: "mailto:abhishekku389@gmail.com",
      handle: "abhishekku389@gmail.com",
      description: "Preferred channel for interview invites and position descriptions",
      icon: "Mail",
      modes: ["all", "tech", "bpo"],
      featured: true,
    },
    {
      id: "phone",
      name: "Direct Phone",
      label: "Call Abhishek Directly",
      url: "tel:+918127290159",
      handle: "+91 81272 90159",
      description: "Direct line for HR screening calls & immediate interviews",
      icon: "Phone",
      modes: ["all", "bpo"],
      featured: false,
    },
  ],

  // Profile-aware messaging contexts
  modeContexts: {
    all: {
      badge: "Recruiter Communication Hub",
      headline: "Let's Start a Conversation",
      headlineHighlight: "& Connect",
      subtitle: "Whether you represent a software engineering team or a business operations desk, I am ready to discuss how my dual-domain strengths can deliver value to your organization.",
      subjectPlaceholder: "e.g. Software Engineering or Operations Opportunity",
      targetRoles: "Full-Time Web Development & Operations Roles",
    },
    tech: {
      badge: "Technical Collaboration & Roles",
      headline: "Discuss a Technical",
      headlineHighlight: "Opportunity",
      subtitle: "Looking for a dedicated Frontend developer proficient in React, modern JavaScript, and clean component systems? Let's discuss your tech stack and technical openings.",
      subjectPlaceholder: "e.g. React Developer / Frontend Software Role",
      targetRoles: "Frontend & Full-Stack Web Development Roles",
    },
    bpo: {
      badge: "Operations & Support Opportunities",
      headline: "Discuss a Professional",
      headlineHighlight: "Opportunity",
      subtitle: "Seeking verified Quality Inspection rigor, MS Excel data management, or customer support dedication with rotational shift flexibility? Reach out for immediate screening.",
      subjectPlaceholder: "e.g. Customer Support / Operations / Quality Role",
      targetRoles: "Customer Support, Data Entry & Quality Inspection Roles",
    },
  },

  // Input length limits for security and database alignment
  limits: {
    nameMax: 100,
    emailMax: 254,
    phoneMax: 25,
    subjectMax: 200,
    messageMin: 15,
    messageMax: 5000,
  },
};

export default contactData;
