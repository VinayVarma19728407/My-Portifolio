export interface Certification {
  id: string;
  title: string;
  issuer: string;
  program: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  pdfUrl?: string;
  description: string;
  badgeText: string;
  skillsLearned: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'tcs-ion-ai-foundation',
    title: 'TCS iON Career Edge - AI Foundation',
    issuer: 'Tata Consultancy Services (TCS iON)',
    program: 'TCS iON Certification Program',
    issueDate: 'July 29, 2026',
    credentialId: '279243-33153238-1016',
    pdfUrl: '/assets/tcs-ion-certificate.pdf',
    description:
      'Certified in AI foundations covering Introduction to AI, Generative AI Essentials, Prompt Engineering Basics, AI Tools, and Responsible AI principles under Global Delivery Head Mehul Mehta, TCS.',
    badgeText: 'TCS Certified',
    skillsLearned: ['Introduction to AI', 'Generative AI Essentials', 'Prompt Engineering Basics', 'AI Tools', 'Responsible AI']
  },
  {
    id: 'ibm-genai-ce',
    title: 'Generative AI (CEGENAI1IN)',
    issuer: 'IBM Career Education Program',
    program: 'IBM Developer Skills Network (ibmcep.cognitiveclass.ai)',
    issueDate: 'July 16, 2026',
    credentialId: 'f06bc804cd5840369cc4ba430c2c1244',
    verificationUrl: 'https://courses.ibmcep.cognitiveclass.ai/certificates/f06bc804cd5840369cc4ba430c2c1244',
    pdfUrl: '/assets/ibm-genai-certificate.pdf',
    description:
      'Rigorous certification validating core foundations in Large Language Models, prompt engineering, generative architectures, and AI application engineering under the IBM Career Education Program.',
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
    pdfUrl: '/assets/rinl-internship-certificate.pdf',
    description:
      'Official certificate of completion for 4 weeks of hands-on industrial data analytics and Database Management System engineering on industrial plant downtime and predictive maintenance datasets.',
    badgeText: 'Govt. Enterprise Certified',
    skillsLearned: ['Oracle SQL', 'Database Management Systems', 'Industrial Automation', 'ETL & SQL*Loader']
  }
];
