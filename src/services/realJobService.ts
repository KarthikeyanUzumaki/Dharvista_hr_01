// src/services/realJobService.ts
import { api } from "@/lib/axios"; 
import { Job } from "@/types";

export const realJobService = {
  
  // GET ALL JOBS
  getAll: async () => {
    // The backend route will likely be "/jobs"
    const response = await api.get("/jobs"); 
    return response.data; 
  },

  // GET ONE JOB
  getById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // CREATE JOB (Admin Only)
  create: async (jobData: any) => {
    const response = await api.post("/jobs", jobData);
    return response.data;
  },

  // DELETE JOB (Admin Only)
  delete: async (id: string) => {
    await api.delete(`/jobs/${id}`);
    return true;
  }
};