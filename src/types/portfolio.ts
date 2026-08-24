export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  dribbble?: string;
  behance?: string;
  website?: string;
}

export interface MetaData {
  name: string;
  role: string;
  tagline: string;
  location: string;
  /** IANA timezone, e.g. "Asia/Jakarta" */
  timezone: string;
  availabilityStatus: string;
  email: string;
  photoUrl: string;
  resumeUrl: string;
  socials: SocialLinks;
}

export interface AboutData {
  short: string;
  long: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  tech: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  repoUrl: string;
  tech: string[];
  featured: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface AvailabilityData {
  status: string;
  workingHours: string;
  rate: string;
  calendlyUrl: string;
}

export interface ContactData {
  email: string;
  message: string;
}

export interface PortfolioData {
  meta: MetaData;
  about: AboutData;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: SkillGroup[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  awards: AwardItem[];
  availability: AvailabilityData;
  contact: ContactData;
}
