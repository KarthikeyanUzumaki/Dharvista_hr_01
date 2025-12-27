import { useState, useEffect } from 'react';
import { Applicant, ApplicantStatus } from '../types';
import { MOCK_APPLICANTS } from '../mock/applicants';
import { useToast } from './use-toast'; // Assuming you have shadcn toast set up

export const useApplicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Simulate fetching data from an API
  const fetchApplicants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate network delay (500ms)
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In real backend, this would be: const res = await fetch('/api/applicants');
      setApplicants(MOCK_APPLICANTS);
    } catch (err) {
      setError('Failed to load applicants');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load applicants data.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate updating status (Optimistic UI update)
  const updateApplicantStatus = async (id: string, newStatus: ApplicantStatus) => {
    // 1. Optimistically update UI immediately
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );

    try {
      // Simulate network delay for the update
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // In real backend: await fetch(`/api/applicants/${id}`, { method: 'PATCH', ... })
      
      toast({
        title: "Status Updated",
        description: `Applicant marked as ${newStatus}.`,
      });
    } catch (err) {
      // Revert if API fails
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update status. Please try again.",
      });
      // (Optional: fetchApplicants() here to reset data to server state)
    }
  };

  // Initial load
  useEffect(() => {
    fetchApplicants();
  }, []);

  return {
    applicants,
    isLoading,
    error,
    refreshApplicants: fetchApplicants,
    updateApplicantStatus,
  };
};