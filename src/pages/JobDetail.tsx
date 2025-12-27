import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  Flame, 
  ArrowLeft, 
  CheckCircle2, 
  Banknote,
  Building2,
  Calendar
} from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/types";

export default function JobDetail() {
  const { id } = useParams();
  const { jobs } = useJobs();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundJob = jobs.find((j) => j.id === id);
    if (foundJob) setJob(foundJob);
  }, [id, jobs]);

  if (!job) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading job details...</p>
        </div>
      </Layout>
    );
  }

  const formatJobType = (type: string) => {
    return type?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-20">
        
        {/* 🟢 1. HEADER: Gradient + Dot Pattern + Glow */}
        <div className="relative bg-primary text-primary-foreground pt-28 pb-12 px-4 shadow-md overflow-hidden">
            
            {/* ✨ Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-[#051530]" />
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

            {/* ✨ Header Content (z-10 ensures it sits ABOVE the background) */}
            <div className="relative z-10 container mx-auto max-w-7xl">
                <Link to="/jobs" className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-sm">{job.title}</h1>
                            
                            {/* Urgent Badge */}
                            {job.priority === 'urgent' && (
                                <Badge variant="destructive" className="flex items-center gap-1 h-7 animate-pulse border-white/20 bg-red-500 text-white shadow-sm">
                                    <Flame className="w-3.5 h-3.5 fill-current" /> Urgent Hiring
                                </Badge>
                            )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-blue-100 text-sm md:text-base font-light">
                            <span className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 opacity-80" /> {job.industry}
                            </span>
                            <span className="hidden md:inline opacity-50">•</span>
                            <span className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 opacity-80" /> {job.location}
                            </span>
                            <span className="hidden md:inline opacity-50">•</span>
                            <span className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 opacity-80" /> Posted {new Date(job.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link to="/contact">
                            {/* White Button on Blue Header */}
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8 shadow-sm transition-transform hover:translate-y-[-2px]">
                                Apply Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* 🟢 2. TWO-COLUMN LAYOUT */}
        <div className="container mx-auto max-w-7xl px-4 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Description */}
                    <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h3>
                        <div className="prose max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {job.description}
                        </div>
                    </section>

                    {/* Eligibility */}
                    <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Requirements & Eligibility</h3>
                        <div className="grid gap-3">
                            {job.eligibility && job.eligibility.split('\n').map((item, index) => (
                                item.trim() && (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50/80 border border-gray-100">
                                        <div className="mt-0.5">
                                            <CheckCircle2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                )
                            ))}
                        </div>
                    </section>
                </div>

                {/* RIGHT COLUMN: Sticky Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24 border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden">
                        <div className="h-2 bg-primary w-full" />
                        <CardContent className="p-6 space-y-6">
                            <h3 className="font-bold text-lg text-gray-900">Job Overview</h3>
                            
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Banknote className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Salary Range</p>
                                        <p className="font-bold text-gray-900">
                                            ₹{Number(job.salaryMin).toLocaleString()} - ₹{Number(job.salaryMax).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-400">Monthly</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Briefcase className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Job Type</p>
                                        <p className="font-bold text-gray-900">{formatJobType(job.type)}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Experience</p>
                                        <p className="font-bold text-gray-900">{job.experienceMin} - {job.experienceMax} Years</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="font-bold text-gray-900">{job.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <Link to="/contact" className="block w-full">
                                    {/* Primary Blue Button on White Card */}
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-12 shadow-md">
                                        Apply Now
                                    </Button>
                                </Link>
                                <p className="text-xs text-center text-gray-400 mt-3">
                                    Please mention the Job Title in your application.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
      </div>
    </Layout>
  );
}