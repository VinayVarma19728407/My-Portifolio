export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; tag?: string }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    description: 'Core languages used for systems programming, data analysis, and algorithm implementation.',
    skills: [
      { name: 'Python', tag: 'Data & ML' },
      { name: 'Java', tag: 'Core & OOP' },
      { name: 'C++', tag: 'Algorithms' },
      { name: 'JavaScript', tag: 'Web' },
      { name: 'SQL (Oracle & PostgreSQL)', tag: 'Databases' }
    ]
  },
  {
    category: 'Machine Learning & AI Systems',
    description: 'Frameworks and architectures for predictive modeling, reinforcement learning, and LLM applications.',
    skills: [
      { name: 'TensorFlow', tag: 'Deep Learning' },
      { name: 'CatBoost', tag: 'Gradient Boosting' },
      { name: 'Scikit-learn', tag: 'ML Pipelines' },
      { name: 'Pandas & NumPy', tag: 'Data Processing' },
      { name: 'Reinforcement Learning (PPO)', tag: 'Optimization' },
      { name: 'Large Language Models (Groq / LLaMA 3)', tag: 'GenAI' }
    ]
  },
  {
    category: 'Developer Tooling & Core CS Fundamentals',
    description: 'Engineering foundations, database administration, and software development practices.',
    skills: [
      { name: 'Data Structures & Algorithms', tag: 'Core CS' },
      { name: 'Object-Oriented Programming (OOP)', tag: 'Architecture' },
      { name: 'Database Management Systems (DBMS)', tag: 'Data Engineering' },
      { name: 'Git & GitHub', tag: 'Version Control' },
      { name: 'Oracle SQL*Loader', tag: 'Industrial ETL' },
      { name: 'Software Engineering & REST APIs', tag: 'Design' }
    ]
  }
];
