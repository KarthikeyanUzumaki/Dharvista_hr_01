export type Job = {
    id: string;
    title: string;
    location: string;
    category: string;
    salary: string;
    experience: string; // ✅ ADDED
    createdAt: number;
  };
  
  let jobs: Job[] = [
    {
      id: "1",
      title: "HR Executive",
      location: "Aruppukottai",
      category: "Human Resources",
      salary: "₹15k - ₹25k",
      experience: "0-2 Years",
      createdAt: Date.now() - 100000,
    },
    {
      id: "2",
      title: "Textile Supervisor",
      location: "Virudhunagar",
      category: "Textile Manufacturing",
      salary: "₹20k - ₹40k",
      experience: "3-5 Years",
      createdAt: Date.now() - 50000,
    },
  ];
  
  export function getJobs() {
    return jobs.sort((a, b) => b.createdAt - a.createdAt);
  }
  
  export function addJob(job: Omit<Job, "id" | "createdAt">) {
    jobs.unshift({
      ...job,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    });
  }
  