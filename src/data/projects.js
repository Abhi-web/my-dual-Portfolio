/**
 * Projects Configuration
 * Centralized data source for showcase and featured projects
 * Supports Dual-Career profileType filtering: ['all', 'tech'], ['all', 'bpo']
 */

export const projectsData = [

  {
    id: "comm-pulse",
    title: "CommPulse – Real-Time Support Chat & Agent Simulator",
    shortDescription: "A responsive live-chat simulation interface demonstrating customer handling protocols, quick reply templates, and sentiment tagging.",
    fullDescription: "Built specifically to demonstrate BPO and customer support workflows. Allows an evaluator to test how a support specialist responds to common customer queries, utilizes pre-defined empathy templates, tags customer mood, and resolves disputes.",
    category: "React",
    profileType: ["all", "tech", "bpo"],
    featured: false,
    tags: ["React", "Tailwind CSS", "Framer Motion", "BPO Workflows"],
    metrics: [
      { label: "Templates", value: "15+ Support SOPs" },
      { label: "Simulation", value: "Interactive Chat" },
      { label: "Tone Guide", value: "Built-in" },
    ],
    features: [
      "Realistic agent-customer split-view chat simulator",
      "Quick response library for greetings, troubleshooting, de-escalation, and closing",
      "Customer sentiment tracker (Frustrated, Neutral, Satisfied)",
      "Typing indicators, message timestamps, and delivery status badges",
      "Exportable chat transcript for QA audit simulation",
    ],
    challengesSolved: "Emulated authentic customer interaction timings and auto-responses using asynchronous timeouts and React state queues.",
    githubUrl: "https://github.com/Abhi-web/commpulse-chat-simulator",
    liveUrl: "https://commpulse-support.demo.app",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    architecture: "React Stateful Component Architecture with Custom Event Bus and Sound/Visual Feedback",
  },
  {
    id: "data-lens",
    title: "DataLens – Operations Data Explorer & KPI Dashboard",
    shortDescription: "A clean analytical dashboard built for administrative review, data entry validation, and team performance metrics tracking.",
    fullDescription: "DataLens provides operational leads and administrators with instant visualization of daily volume, team attendance, ticket resolution rates, and error logs, replacing messy spreadsheets with crisp interactive summaries.",
    category: "Full Stack",
    profileType: ["all", "tech", "bpo"],
    featured: false,
    tags: ["React", "Chart.js Concept", "REST API", "Tailwind CSS"],
    metrics: [
      { label: "Data Rows", value: "10,000+ Mock" },
      { label: "Export Formats", value: "CSV & JSON" },
      { label: "Summary Cards", value: "Auto-computed" },
    ],
    features: [
      "Executive KPI summary cards with trend arrows and comparative indicators",
      "Sortable, paginated data table with search and column visibility toggles",
      "Data entry modal with strict formatting rules to prevent erroneous submissions",
      "Export data to formatted CSV with clean header normalization",
      "Dark mode aesthetic tailored for long administrative shifts",
    ],
    challengesSolved: "Optimized large dataset table rendering using virtualization principles to maintain a silky smooth 60fps experience.",
    githubUrl: "https://github.com/Abhi-web/datalens-operations-dashboard",
    liveUrl: "https://datalens-analytics.demo.app",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    architecture: "React + Modern UI Toolkit + Mock REST Service with In-Memory Caching",
  },

  {
    id: "fresh-mart",
    title: "FreshMart – Modern E-Commerce Web Storefront",
    shortDescription: "A high-performance online catalog and cart experience featuring instant category filtering, real-time price calculation, and order summary generation.",
    fullDescription: "An e-commerce storefront crafted with a mobile-first philosophy. Focuses on lightning-fast product discoverability, accessible keyboard shopping flows, smooth micro-interactions, and a clean checkout review experience.",
    category: "Web",
    profileType: ["all", "tech"],
    featured: false,
    tags: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design"],
    metrics: [
      { label: "Lighthouse Score", value: "98/100" },
      { label: "Filter Latency", value: "< 16ms" },
      { label: "Mobile First", value: "100%" },
    ],
    features: [
      "Dynamic product catalog with multi-facet category and price range filters",
      "Interactive slide-over shopping cart with live quantity manipulation and coupon validation",
      "Detailed modal product previews with responsive image galleries",
      "Checkout simulation with client-side form validation and order receipt summary",
      "Clean semantic markup with complete ARIA attributes for screen readers",
    ],
    challengesSolved: "Handled complex multi-criteria array filtering purely in vanilla JavaScript without performance lag across 200+ mock inventory items.",
    githubUrl: "https://github.com/Abhi-web/freshmart-ecommerce-ui",
    liveUrl: "https://freshmart-store.demo.app",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80",
    architecture: "Modular ES6 JavaScript, HTML5 Semantic Nodes, and CSS Grid/Flexbox Layouts",
  },
  {
    id: "weather-craft",
    title: "WeatherCraft – Live Micro-Climate & Forecast Assistant",
    shortDescription: "A sleek weather utility integrating public meteorological REST APIs with dynamic background shifts based on atmospheric conditions.",
    fullDescription: "A responsive weather application emphasizing reliable API consumption, asynchronous error resilience, geolocation integration, and modern card visuals.",
    category: "Other",
    profileType: ["all", "tech"],
    featured: false,
    tags: ["JavaScript", "REST APIs", "CSS3", "Weather API"],
    metrics: [
      { label: "API Calls", value: "Geo & Forecast" },
      { label: "Response Handling", value: "Zero Crash" },
      { label: "Aesthetics", value: "Adaptive Dark" },
    ],
    features: [
      "City search with debounced autocomplete and coordinate matching",
      "Current conditions breakdown (humidity, wind speed, UV index, air quality)",
      "5-day forecast cards with hourly temperature curve",
      "Fallback offline UI when network connectivity is disrupted",
      "CSS gradient themes reacting to daylight and stormy weather states",
    ],
    challengesSolved: "Implemented defensive API parsing to seamlessly handle missing or incomplete geographic response objects without throwing unhandled exceptions.",
    githubUrl: "https://github.com/Abhi-web/weathercraft-api-app",
    liveUrl: "https://weathercraft.demo.app",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=80",
    architecture: "Native JavaScript Fetch API, Asynchronous Pipeline, and Adaptive Styling",
  }
];

export const projectCategories = [
  { id: "All", name: "All Projects" },
  { id: "Full Stack", name: "Full Stack" },
  { id: "React", name: "React Apps" },
  { id: "Web", name: "Web & UI" },
  { id: "Other", name: "Other / Tools" },
];
