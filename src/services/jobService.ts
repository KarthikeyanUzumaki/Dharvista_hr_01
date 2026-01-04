import { Job } from "@/types";
import { MOCK_JOBS } from "@/mock/jobs"; 

// 🟢 UPDATED: Changed key to '_v2' to force a fresh load of the 23 jobs
const STORAGE_KEY = "dharvista_jobs_v2";

export const jobService = {
  checkAndSeed: () => {
    // Optional: Only seed if absolutely nothing exists
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_JOBS));
    }
  },

  getAll: async (): Promise<Job[]> => {
    const data = localStorage.getItem(STORAGE_KEY);
    
    // 🟢 CASE 1: No Data in Browser? Load Mock Data
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_JOBS));
      return MOCK_JOBS;
    }

    // 🟢 CASE 2: Data Exists? Return it exactly as is
    const storedJobs: Job[] = JSON.parse(data);
    return storedJobs;
  },

  getById: async (id: string): Promise<Job | undefined> => {
    const jobs = await jobService.getAll();
    return jobs.find((j) => j.id === id);
  },

  create: async (job: any) => {
    const newJob = { 
        ...job, 
        id: crypto.randomUUID(), 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        salaryCurrency: "INR"
    };
    
    const jobs = await jobService.getAll();
    const updatedJobs = [newJob, ...jobs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    return true;
  },

  update: async (updatedJob: Job) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;
    
    const jobs = JSON.parse(data);
    const index = jobs.findIndex((j: Job) => j.id === updatedJob.id);
    
    if (index !== -1) {
        jobs[index] = updatedJob;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
        return true;
    }
    return false;
  },

  delete: async (id: string) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;
    
    // Filter out the deleted job
    const jobs = JSON.parse(data).filter((j: Job) => j.id !== id);
    
    // Save the new list
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    return true;
  }
};