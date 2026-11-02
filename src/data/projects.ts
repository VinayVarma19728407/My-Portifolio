export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'AI & Machine Learning' | 'Systems & Web';
  status: 'Completed' | 'Ongoing';
  featured: boolean;
  tagline: string;
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'schemesetu',
    title: 'SchemeSetu',
    category: 'Full-Stack',
    status: 'Ongoing',
    featured: true,
    tagline: 'Centralized Welfare Discovery & Dynamic Eligibility Engine',
    summary:
      'A 3-tier citizen welfare platform engineered to streamline discovery and access to Central Government welfare initiatives through automated eligibility matching, bookmarking, and authenticated workflows.',
    highlights: [
      'Modular eligibility verification engine that calculates personal qualification from structured criteria dynamically.',
      'End-to-end JWT authentication with secure session handling, user bookmarks, and admin management.',
      'Scalable 3-tier architecture with reusable React components, RESTful API endpoints, and structured JSON-based storage.'
    ],
    metrics: [
      { label: 'Architecture', value: '3-Tier' },
      { label: 'Security', value: 'JWT + REST' },
      { label: 'Delivery', value: 'Full-Stack' }
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'JWT', 'Git', 'CSS3'],
    githubUrl: 'https://github.com/VinayVarma/SchemeSetu'
  },
  {
    id: 'adaptive-rl-cpu-scheduler',
    title: 'Adaptive RL CPU Scheduler',
    category: 'AI & Machine Learning',
    status: 'Ongoing',
    featured: true,
    tagline: 'Cluster Workload Prediction & PPO Reinforcement Learning Scheduler',
    summary:
      'Investigated 1M+ production cluster events from Alibaba trace records to benchmark classical regression against gradient boosting, designing an adaptive PPO-based reinforcement learning scheduler that handles real-world temporal variance.',
    highlights: [
      'Cleaned, engineered temporal features, and normalized 1,000,000+ Alibaba cluster trace records for cluster usage forecasting.',
      'Evaluated Linear Regression vs. CatBoost under random split (R² = 0.8899) and strict temporal validation (R² = 0.1641).',
      'Synthesized historical workload patterns and CPU core classification to formulate the reward function for a PPO reinforcement learning scheduler.'
    ],
    metrics: [
      { label: 'Dataset', value: '1M+ Traces' },
      { label: 'Peak R²', value: '0.8899' },
      { label: 'RL Algorithm', value: 'PPO Agent' }
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'CatBoost', 'Reinforcement Learning', 'NumPy'],
    githubUrl: 'https://github.com/VinayVarma/Adaptive-RL-CPU-Scheduler'
  },
  {
    id: 'smart-health',
    title: 'Smart Health Recommendation System',
    category: 'AI & Machine Learning',
    status: 'Completed',
    featured: true,
    tagline: 'Context-Aware Clinical Triage & Explainable AI Assistant',
    summary:
      'An intelligent personal health advisory platform combining multi-factor vitals (BMI, climate, age, symptoms, medical history) with safety red-flag guards and sub-second explainable AI reasoning via Groq and LLaMA 3.',
    highlights: [
      'Built a deterministic rule engine with automated severity scoring, symptom correlation, and critical emergency red-flag safeguards.',
      'Integrated Groq-accelerated LLaMA 3 inference for context-aware, patient-friendly medical explanations and preventive advice.',
      'Constructed a responsive, privacy-conscious React dashboard featuring interactive health factor visualization and risk analytics.'
    ],
    metrics: [
      { label: 'Inference', value: '<500ms Groq' },
      { label: 'LLM', value: 'LLaMA 3' },
      { label: 'Safety', value: 'Red-Flag Gated' }
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'Groq API', 'LLaMA 3', 'REST APIs'],
    githubUrl: 'https://github.com/VinayVarma/Smart-Health-Recommendation-System'
  },
  {
    id: 'portfolio-v1',
    title: 'Personal Developer Portfolio',
    category: 'Systems & Web',
    status: 'Completed',
    featured: true,
    tagline: 'Static, Accessible, Production-Grade Engineering Showcase',
    summary:
      'The source codebase for this portfolio: built strictly as a static application with zero bloated framework abstractions, optimized for instant Vercel edge deployment with 100/100 Lighthouse performance metrics.',
    highlights: [
      'Handcrafted semantic HTML5 and WCAG 2.1 AA accessible design with keyboard jump links and ARIA landmarks.',
      'Type-safe data-driven architecture separating content models from view layers for effortless maintenance.',
      'Zero unnecessary third-party runtime bundles, achieving sub-second Largest Contentful Paint (LCP).'
    ],
    metrics: [
      { label: 'Lighthouse', value: '100 / 100' },
      { label: 'Bundle', value: '<50KB Gzip' },
      { label: 'Deployment', value: 'Vercel Edge' }
    ],
    technologies: ['React.js', 'TypeScript', 'Vite', 'Modern CSS', 'Vercel'],
    githubUrl: 'https://github.com/VinayVarma/My-Portfolio'
  }
];
