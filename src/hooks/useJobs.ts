import { useState, useEffect } from "react";
import { Job, JobStatus } from "@/types"; // ✅ Ensure JobStatus is imported
import { jobService } from "@/services/jobService";
import { useToast } from "@/hooks/use-toast";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await jobService.getAll();
      setJobs(data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
      toast({ title: "Error", description: "Could not load jobs", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const createJob = async (jobData: any) => {
    try {
      await jobService.create(jobData);
      toast({ title: "Success", description: "Job posted successfully!" });
      fetchJobs();
      return true;
    } catch (error) {
      toast({ title: "Error", description: "Failed to post job", variant: "destructive" });
      return false;
    }
  };

  const toggleJobStatus = async (job: Job) => {
    // ✅ Fix: Add fallback for updatedAt if missing
    const safeJob = { 
        ...job, 
        updatedAt: job.updatedAt || new Date().toISOString() 
    };
    
    // ✅ Fix: Explicitly cast the string to JobStatus type
    const newStatus = (safeJob.status === 'published' ? 'closed' : 'published') as JobStatus;
    
    const updatedJob = { ...safeJob, status: newStatus };
    
    try {
      await jobService.update(updatedJob);
      toast({ 
        title: newStatus === 'closed' ? "Job Closed" : "Job Republished", 
        description: `Job is now ${newStatus}.` 
      });
      fetchJobs(); 
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    try {
      await jobService.delete(id);
      toast({ title: "Deleted", description: "Job removed successfully" });
      fetchJobs();
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete job", variant: "destructive" });
    }
  };

  return { 
    jobs, 
    isLoading, 
    createJob, 
    deleteJob, 
    toggleJobStatus, // ✅ Added to return object
    refresh: fetchJobs 
  };
}