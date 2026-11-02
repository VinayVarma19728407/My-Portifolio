export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department?: string;
  location: string;
  period: string;
  type: 'Internship' | 'Education';
  summary: string;
  achievements: string[];
  skills: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'rinl-internship',
    role: 'Data Analyst Intern',
    organization: 'Rashtriya Ispat Nigam Limited (RINL Vizag Steel Plant)',
    department: 'IT & ERP Department (Learning & Development Centre)',
    location: 'Visakhapatnam, Andhra Pradesh',
    period: 'May 2026 – June 2026',
    type: 'Internship',
    summary:
      'Engineered an Oracle SQL-based delay analysis and predictive maintenance investigation across 80,500 historical production records to enhance operational reliability.',
    achievements: [
      'Managed and ingested heavy plant data using SQL*Loader, designing relational Oracle tables with integrity constraints, index optimization, and data validation rules.',
      'Conducted extensive end-to-end operational study across steel manufacturing units: blast furnace iron making, basic oxygen steel making, continuous casting, and hot rolling mills.',
      'Gained deep practical exposure to industrial automation architectures, PLC-based control loops, SCADA supervisory monitors, and process instrumentation.',
      'Identified seasonal and monsoon-related delay patterns; performed critical data cleansing, null/duplicate handling, legacy year corrections, and standardization across 80,500 records.'
    ],
    skills: ['Oracle SQL', 'SQL*Loader', 'Database Management', 'Data Quality & Validation', 'SCADA & PLC Automation', 'Predictive Analysis']
  },
  {
    id: 'vit-chennai',
    role: 'B.Tech in Computer Science & Engineering (AIML)',
    organization: 'Vellore Institute of Technology (VIT)',
    location: 'Chennai, Tamil Nadu',
    period: '2024 – Expected May 2028',
    type: 'Education',
    summary:
      'Pursuing an engineering degree in Computer Science with specialization in Artificial Intelligence and Machine Learning. Cumulative GPA: 8.88 / 10.00.',
    achievements: [
      'Maintained consistent academic distinction with a Cumulative GPA of 8.88 / 10.00.',
      'Completed core coursework in Data Structures & Algorithms (Java), Object-Oriented Programming, DBMS (SQL), Software Engineering, Web Programming (HTML, CSS, JS), and Machine Learning (Python/TensorFlow).',
      'Active developer building open-source projects combining full-stack web architectures with machine learning.'
    ],
    skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Machine Learning', 'Database Systems', 'Software Engineering']
  }
];
