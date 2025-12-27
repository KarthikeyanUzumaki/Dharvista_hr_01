// src/services/jobService.ts
import { Job } from "@/types";

const STORAGE_KEY = "dharvista_jobs";

// 🟢 DUMMY DATA (Now matches your 'Job' type perfectly)
const SAMPLE_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Site Engineer",
    location: "Chennai, TN",
    industry: "Construction",
    description: "Leading residential project in OMR requires senior engineer...",
    eligibility: "B.E. Civil\n5+ Years Experience",
    salaryMin: 35000,
    salaryMax: 50000,
    salaryCurrency: "INR", // 👈 Added this
    experienceMin: 5,
    experienceMax: 8,
    type: "full-time",
    priority: "urgent",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), // 👈 Added this
    googleFormUrl: "https://forms.google.com"
  },
  {
    id: "2",
    title: "Safety Supervisor",
    location: "Coimbatore, TN",
    industry: "Industrial Safety",
    description: "Ensure safety protocols at high-rise construction sites...",
    eligibility: "Diploma in Industrial Safety\nNebosh Certified",
    salaryMin: 20000,
    salaryMax: 28000,
    salaryCurrency: "INR", // 👈 Added this
    experienceMin: 2,
    experienceMax: 4,
    type: "contract",
    priority: "normal",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(), // 👈 Added this
    googleFormUrl: "https://forms.google.com"
  }
];

export const jobService = {
  // 🟢 HELPER: Check if empty, then add sample data
  checkAndSeed: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data || JSON.parse(data).length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_JOBS));
    }
  },

  getAll: async (): Promise<Job[]> => {
    // Run the check before getting data
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_JOBS));
      return SAMPLE_JOBS;
    }
    return JSON.parse(data);
  },

  getById: async (id: string): Promise<Job | undefined> => {
    const data = localStorage.getItem(STORAGE_KEY);
    const jobs: Job[] = data ? JSON.parse(data) : [];
    return jobs.find((j) => j.id === id);
  },

  create: async (job: any) => {
    const newJob = { 
        ...job, 
        id: crypto.randomUUID(), 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), // Ensure new jobs have this too
        salaryCurrency: "INR"                // Ensure new jobs have this too
    };
    const data = localStorage.getItem(STORAGE_KEY);
    const jobs = data ? JSON.parse(data) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newJob, ...jobs]));
    return true;
  },

  delete: async (id: string) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;
    const jobs = JSON.parse(data).filter((j: Job) => j.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    return true;
  }
};