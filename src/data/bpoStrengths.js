/**
 * Professional Strengths (BPO & Customer Operations Deep-Dive)
 * Detailed data source for the Dedicated "Professional Strengths" section
 */

export const bpoStrengthsData = [
  {
    id: "cust-comm",
    title: "Customer Communication",
    iconName: "MessageCircle",
    category: "Voice & Written",
    stat: "High Clarity",
    description: "Ability to convey complex technical concepts and organizational policies in a respectful, warm, and easily digestible manner.",
    coreCompetencies: [
      "Clarity, brevity, and tone modulation",
      "De-escalating agitated clients with polite assertion",
      "Adapting language to customer technical maturity",
      "Positive framing during service constraints"
    ],
    realWorldValue: "Turns potential customer friction into brand loyalty and positive reviews."
  },
  {
    id: "active-listening",
    title: "Active Listening & Empathy",
    iconName: "Ear",
    category: "Interpersonal",
    stat: "100% Empathy",
    description: "Deeply absorbing customer concerns without premature interruption, clarifying intent, and validating emotional sentiments.",
    coreCompetencies: [
      "Paraphrasing to confirm mutual alignment",
      "Detecting unspoken pain points or urgency",
      "Sincere empathetic acknowledgment statements",
      "Patience during intricate explanations"
    ],
    realWorldValue: "Cuts down ticket resolution cycles by diagnosing the actual issue on the first pass."
  },
  {
    id: "prob-solving",
    title: "Methodical Problem Solving",
    iconName: "BrainCircuit",
    category: "Diagnostics",
    stat: "Root-Cause",
    description: "Treating every support ticket as an engineering bug: isolating variables, reproducing scenarios, and delivering definitive fixes.",
    coreCompetencies: [
      "Step-by-step diagnostic triage",
      "Isolating hardware vs software vs user error",
      "Testing workarounds prior to advising clients",
      "Documenting repeatable solutions for team KB"
    ],
    realWorldValue: "Prevents recurring support inquiries and decreases escalations to engineering teams."
  },
  {
    id: "cust-handling",
    title: "Customer Handling & Escalations",
    iconName: "ShieldAlert",
    category: "Resolution",
    stat: "SLA Compliant",
    description: "Gracefully handling high-stress escalations, adhering to service level agreements (SLAs), and retaining customer confidence.",
    coreCompetencies: [
      "Calm composure under high pressure",
      "Firm adherence to organizational policies",
      "Accurate tier-2 escalation handover notes",
      "Consistent follow-through until full resolution"
    ],
    realWorldValue: "Maintains high CSAT metrics even when complex systemic problems arise."
  },
  {
    id: "email-comm",
    title: "Professional Email Communication",
    iconName: "MailCheck",
    category: "Written",
    stat: "Fast TAT",
    description: "Composing structured, grammatically flawless emails that answer questions proactively and eliminate repetitive back-and-forth.",
    coreCompetencies: [
      "Bullet-point clarity for action items",
      "Flawless grammar, spelling, and formatting",
      "Customizing canned responses authentically",
      "Anticipating follow-up questions in advance"
    ],
    realWorldValue: "Minimizes email exchange count per ticket and drives rapid resolution."
  },
  {
    id: "chat-support",
    title: "Real-Time Chat & Multitasking",
    iconName: "MessagesSquare",
    category: "Speed & Agility",
    stat: "< 45s Response",
    description: "Managing concurrent live-chat sessions while searching knowledge bases, verifying account details, and keeping users informed.",
    coreCompetencies: [
      "Rapid typing speed with high accuracy",
      "Seamless management of 2-3 concurrent chats",
      "Timely status updates while conducting lookups",
      "Warm conversational closing protocols"
    ],
    realWorldValue: "Delivers the swift, frictionless live support modern digital customers expect."
  },
  {
    id: "ms-office",
    title: "MS Office & Advanced Data Tools",
    iconName: "FileSpreadsheet",
    category: "Software & Data",
    stat: "VLOOKUP / Pivot",
    description: "Hands-on expertise with MS Excel, Word, PowerPoint, and Google Workspace for records management, audit reporting, and documentation.",
    coreCompetencies: [
      "VLOOKUP, INDEX-MATCH, and data filtering",
      "Pivot tables and summary reporting",
      "Standard Operating Procedure (SOP) manuals",
      "Clean presentation slide creation"
    ],
    realWorldValue: "Transforms raw operational logs into actionable management insights."
  },
  {
    id: "data-accuracy",
    title: "Data Accuracy & Verification",
    iconName: "CheckCheck",
    category: "Quality Control",
    stat: "99.9% Accuracy",
    description: "Stringent attention to numerical details, customer identifiers, billing records, and CRM updates with zero data corruption.",
    coreCompetencies: [
      "Double-check verification protocols",
      "Sensitive data privacy & confidentiality",
      "CRM record sanitization & normalization",
      "Discrepancy identification and auditing"
    ],
    realWorldValue: "Protects business operations from costly transactional and compliance mistakes."
  },
  {
    id: "team-collab",
    title: "Team Collaboration & Sync",
    iconName: "Users2",
    category: "Culture",
    stat: "Team Player",
    description: "Thriving in cooperative environments, assisting shift colleagues, sharing troubleshooting discoveries, and aligning on group targets.",
    coreCompetencies: [
      "Clear shift handover briefings",
      "Willingness to cover urgent surges",
      "Constructive peer feedback participation",
      "Positive team spirit and motivation"
    ],
    realWorldValue: "Strengthens overall shift efficiency and maintains strong workplace morale."
  },
  {
    id: "time-mgmt",
    title: "Time Management & Discipline",
    iconName: "Clock",
    category: "Productivity",
    stat: "Punctual",
    description: "Efficiently distributing shift hours across queue handling, follow-up tickets, administrative audits, and continuous learning.",
    coreCompetencies: [
      "Strict schedule adherence and login punctuality",
      "Prioritizing urgent SLA timers first",
      "Eliminating unproductive operational friction",
      "Consistent throughput across entire work shifts"
    ],
    realWorldValue: "Guarantees reliable support availability during scheduled peak hours."
  },
  {
    id: "adaptability",
    title: "Adaptability & Rotational Readiness",
    iconName: "Compass",
    category: "Flexibility",
    stat: "24/7 Ready",
    description: "Embracing dynamic shift schedules, new CRM tooling, policy updates, and hybrid/remote work setups with enthusiasm.",
    coreCompetencies: [
      "Comfort with rotational and night shift rosters",
      "Rapidly adopting new internal tools and software",
      "Receptive to coaching and QA score feedback",
      "Stepping up during organizational transitions"
    ],
    realWorldValue: "Provides operational managers with reliable, flexible team coverage."
  }
];

export const bpoMetricsOverview = [
  { label: "Ticket Handling Commitment", value: "100%", description: "Dedicated adherence to quality standards" },
  { label: "SLA Adherence Target", value: "> 98%", description: "Strict monitoring of resolution thresholds" },
  { label: "Shift Flexibility", value: "24/7", description: "Rotational, night, and weekend ready" },
  { label: "Client Satisfaction Focus", value: "Top Tier", description: "Empathetic communication on every touchpoint" },
];
