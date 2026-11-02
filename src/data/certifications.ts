export interface Certification {
  id: string;
  title: string;
  issuer: string;
  program: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  description: string;
  badgeText: string;
  skillsLearned: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'ibm-genai-ce',
    title: 'Generative AI (CEGENAI1IN)',
    issuer: 'IBM Career Education Program',
    program: 'IBM Developer Skills Network (ibmcep.cognitiveclass.ai)',
    issueDate: 'July 16, 2026',
    credentialId: 'f06bc804cd5840369cc4ba430c2c1244',
    verificationUrl: 'https://courses.ibmcep.cognitiveclass.ai/certificates/f06bc804cd5840369cc4ba430c2c1244',
    description:
      'Rigorous certification validating core foundation in Large Language Models, prompt engineering, generative architectures, and AI application engineering under the IBM Career Education Program.',
    badgeText: 'IBM Verified Credential',
    skillsLearned: ['Generative AI', 'Large Language Models', 'Prompt Engineering', 'AI Application Design']
  },
  {
    id: 'rinl-cert',
    title: 'Industrial Internship & Project Work Certificate',
    issuer: 'Rashtriya Ispat Nigam Limited (RINL)',
    program: 'Visakhapatnam Steel Plant • IT & ERP Department',
    issueDate: 'May – June 2026',
    credentialId: '100057644',
    description:
      'Official certificate of completion for 4 weeks of hands-on industrial data analytics and Database Management System engineering on industrial plant downtime and predictive maintenance datasets.',
    badgeText: 'Govt. Enterprise Certified',
    skillsLearned: ['Oracle SQL', 'Database Management Systems', 'Industrial Automation', 'ETL & SQL*Loader']
  },
  {
    id: 'ibm-adv-genai-prolearn',
    title: 'IBM – Advanced Generative AI',
    issuer: 'Prolearn / Adroit Technologies Innovative Solutions',
    program: 'Web-Based Specialized AI Engineering Training',
    issueDate: 'July 21, 2026',
    credentialId: 'whjA7y6b3P',
    description:
      'Comprehensive hands-on training covering modern Generative AI implementations, transformer models, inference optimization, and applied AI systems.',
    badgeText: 'Advanced Certification',
    skillsLearned: ['Advanced GenAI', 'Transformer Pipelines', 'Model Fine-Tuning & Inference']
  }
];
