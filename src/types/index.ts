export interface Project {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  period: string;
  category: 'Agentic AI' | 'Document AI' | 'Computer Vision' | 'Full-Stack Platform';
  summary: string;
  metrics: { label: string; value: string }[];
  highlight: string;
  bullets: string[];
  techStack: string[];
  keyLessons?: { concept: string; meaning: string }[];
  architectureBreakdown?: {
    input: string;
    orchestration: string;
    verification: string;
    output: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: 'Expert' | 'Advanced' | 'Core'; highlight?: string }[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  bullets: string[];
  skills: string[];
}

export interface Award {
  title: string;
  organization: string;
  badge?: string;
  year?: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  status: string;
}
