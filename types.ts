export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  date: string;
  category: string;
  readTime: string;
  slug: string;
  imageUrl: string;
  labels?: string[];
  wordCount?: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  summary: string;
  hypothesis?: string;
  growthGoal?: string;
  problem: string;
  strategy: string;
  funnelArchitecture?: { stepName: string; description: string }[];
  tools: string[];
  metrics: {
    metricName: string;
    metricValue: string;
    description: string;
  }[];
  funnelPerformance?: { label: string; value: number }[];
  growthInsights: string;
  nextExperiments?: string[];
  slug: string;
  heroImage: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface Skill {
  name: string;
  category: 'SEO' | 'PPC' | 'Content' | 'Analytics' | 'Tools' | 'Marketing';
  level: number; // 1-100
}

export interface FAQItem {
  question: string;
  answer: string;
}

// --- Resume Specific Types ---

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[]; // List of bullet points
}

export interface Project {
  id: string;
  title: string;
  description: string;
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

// --- API Response Wrappers ---

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// --- Page-Wise API Data Structures ---

export interface HomePageData {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  featuredBlogs: BlogPost[];
  featuredCaseStudies: CaseStudy[];
  faq: FAQItem[];
  profileImage?: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface AboutPageData {
  profile: {
    name: string;
    bio: string[];
    imageUrl: string;
  };
  skillGroups: SkillGroup[];
  certifications: (Certification & { imageUrl?: string })[];
}

export interface BlogPageData {
  title: string;
  subtitle: string;
  posts: BlogPost[];
  categories: string[];
}

export interface CaseStudiesPageData {
  title: string;
  subtitle: string;
  studies: CaseStudy[];
}

export interface ResumePageData {
  profile: {
    name: string;
    role: string;
    email: string;
    linkedin: string;
    location: string;
    summary: string;
    imageUrl?: string;
  };
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  tools: string[];
  certifications: Certification[];
  education: Education[];
}
