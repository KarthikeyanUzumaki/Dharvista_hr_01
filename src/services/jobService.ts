// src/services/jobService.ts
import { Job } from "@/types";
import { MOCK_JOBS } from "@/mock/jobs"; 

const STORAGE_KEY = "dharvista_jobs";

export const jobService = {
  checkAndSeed: () => {
    // We handle seeding in getAll now to ensure it's always up to date
  },

  getAll: async (): Promise<Job[]> => {
    const data = localStorage.getItem(STORAGE_KEY);
    const storedJobs: Job[] = data ? JSON.parse(data) : [];

    // 🟢 INTELLIGENT SYNC:
    // This ensures that if you change code in 'MOCK_JOBS', it updates in the browser immediately.
    
    // 1. Create a Map of existing jobs (User-created + Old Mock jobs)
    const jobMap = new Map(storedJobs.map(j => [j.id, j]));

    // 2. Force-update the Mock Jobs from your code
    // This overwrites the old cached version with your new code changes
    MOCK_JOBS.forEach(mockJob => {
      jobMap.set(mockJob.id, mockJob);
    });

    // 3. Convert back to array
    const mergedJobs = Array.from(jobMap.values());

    // 4. Save the fresh list back to storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedJobs));

    return mergedJobs;
  },

  getById: async (id: string): Promise<Job | undefined> => {
    const jobs = await jobService.getAll(); // Reuse the sync logic above
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
    
    // Get current fresh list
    const jobs = await jobService.getAll();
    
    // Add new job to the TOP of the list
    const updatedJobs = [newJob, ...jobs];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    return true;
  },

  delete: async (id: string) => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return false;
    
    // Filter out the deleted job
    const jobs = JSON.parse(data).filter((j: Job) => j.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    return true;
  }
};