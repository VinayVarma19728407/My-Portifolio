export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; proficiency?: string; tag?: string }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    description: 'Core languages used for systems programming, backend engineering, and scientific computing.',
    skills: [
      { name: 'Python', tag: 'Data & ML' },
      { name: 'Java', tag: 'Core & OOP' },
      { name: 'C++', tag: 'Algorithms' },
      { name: 'JavaScript (ES6+)', tag: 'Web' },
      { name: 'SQL (Oracle & PostgreSQL)', tag: 'Databases' }
    ]
  },
  {
    category: 'Full-Stack Web Development',
    description: 'Frameworks, runtimes, and protocols for building performant, accessible digital products.',
    skills: [
      { name: 'React.js', tag: 'Frontend' },
      { name: 'Node.js', tag: 'Runtime' },
      { name: 'Express.js', tag: 'Backend' },
      { name: 'REST APIs', tag: 'Architecture' },
      { name: 'JWT Authentication', tag: 'Security' },
      { name: 'HTML5 & Semantic Web', tag: 'Markup' },
      { name: 'CSS3 & Responsive Design', tag: 'Styling' }
    ]
  },
  {
    category: 'Machine Learning & Data Systems',
    description: 'Libraries and architectures for predictive modeling, reinforcement learning, and large-scale data analysis.',
    skills: [
      { name: 'TensorFlow', tag: 'Deep Learning' },
      { name: 'PyTorch', tag: 'Deep Learning' },
      { name: 'CatBoost', tag: 'Gradient Boosting' },
      { name: 'Scikit-learn', tag: 'ML Pipelines' },
      { name: 'Pandas & NumPy', tag: 'Data Wrangling' },
      { name: 'Reinforcement Learning (PPO)', tag: 'Optimization' },
      { name: 'Large Language Models (Groq / LLaMA 3)', tag: 'GenAI' }
    ]
  },
  {
    category: 'Developer Tooling & Core CS',
    description: 'Engineering foundations, database administration, and collaboration tools.',
    skills: [
      { name: 'Data Structures & Algorithms', tag: 'Problem Solving' },
      { name: 'Object-Oriented Programming', tag: 'Architecture' },
      { name: 'Database Management Systems (DBMS)', tag: 'Data' },
      { name: 'Git & GitHub', tag: 'VCS' },
      { name: 'Oracle SQL*Loader', tag: 'Batch ETL' },
      { name: 'Vercel Deployment', tag: 'CI/CD' }
    ]
  }
];
