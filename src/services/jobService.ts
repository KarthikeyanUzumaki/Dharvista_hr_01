// src/services/jobService.ts
import { Job } from "@/types";
// 🟢 Import the actual jobs from your mock file
import { MOCK_JOBS } from "@/mock/jobs"; 

const STORAGE_KEY = "dharvista_jobs";

export const jobService = {
  // 🟢 Updated to use MOCK_JOBS
  checkAndSeed: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    // If no data OR if data is empty array, seed it
    if (!data || JSON.parse(data).length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_JOBS));
    }
  },

  getAll: async (): Promise<Job[]> => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      // Seed if data doesn't exist at all
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_JOBS));
      return MOCK_JOBS;
    }
    const parsedData = JSON.parse(data);
    // If data exists but is an empty list, seed it
    if (parsedData.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_JOBS));
        return MOCK_JOBS;
    }
    return parsedData;
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
        updatedAt: new Date().toISOString(),
        salaryCurrency: "INR"
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