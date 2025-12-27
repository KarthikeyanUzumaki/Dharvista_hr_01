import { useState, useEffect } from "react";
import { Job } from "@/types";
import { jobService } from "@/services/jobService"; // Import the new service
import { toast } from "@/hooks/use-toast";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load jobs on mount
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
      fetchJobs(); // Refresh list
      return true;
    } catch (error) {
      toast({ title: "Error", description: "Failed to post job", variant: "destructive" });
      return false;
    }
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    try {
      await jobService.delete(id);
      toast({ title: "Deleted", description: "Job removed successfully" });
      fetchJobs(); // Refresh list
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete job", variant: "destructive" });
    }
  };

  return { jobs, isLoading, createJob, deleteJob, refresh: fetchJobs };
}