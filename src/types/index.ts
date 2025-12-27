// src/types/index.ts

export type JobStatus = 'draft' | 'published' | 'closed';
export type JobPriority = 'normal' | 'featured' | 'urgent';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
export type ApplicantStatus = 'new' | 'contacted' | 'hired' | 'rejected';

export interface Job {
  id: string;
  title: string;
  location: string;
  industry: string;
  
  description: string; // Full HTML/Markdown description
  eligibility: string; // Specific criteria
  
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string; // 'INR'
  
  experienceMin: number;
  experienceMax: number;
  
  type: JobType;
  status: JobStatus;
  priority: JobPriority;
  
  createdAt: string;
  updatedAt: string;
  
  googleFormUrl?: string; // Optional for now
}

export interface Applicant {
  id: string;
  jobId: string;
  jobTitle: string;
  
  name: string;
  email: string;
  phone: string;
  
  resumeLink: string;
  
  appliedAt: string;
  status: ApplicantStatus;
  
  notes?: string;
}