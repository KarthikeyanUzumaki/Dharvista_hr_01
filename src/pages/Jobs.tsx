// src/pages/Jobs.tsx

import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, Filter, ArrowRight, Flame, Loader2, ChevronDown } from "lucide-react";

// Hooks & Types
import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/types";

export default function JobsPage() {
  const { jobs, isLoading } = useJobs();

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  // 🟢 NEW: Pagination State (Start with 6 jobs)
  const [visibleCount, setVisibleCount] = useState(6);
  const JOBS_PER_PAGE = 6;

  // Derive lists for dropdowns
  const industries = Array.from(new Set(jobs.map((j) => j.industry)));
  const locations = Array.from(new Set(jobs.map((j) => j.location)));

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🟢 NEW: Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(JOBS_PER_PAGE);
  }, [searchTerm, selectedIndustry, selectedLocation]);

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === "all" || job.industry === selectedIndustry;
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;

      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [jobs, searchTerm, selectedIndustry, selectedLocation]);

  // 🟢 NEW: Slice the data to show only visible count
  const visibleJobs = filteredJobs.slice(0, visibleCount);

  // 🟢 NEW: Handler to load more
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + JOBS_PER_PAGE);
  };

  return (
    <Layout>
      {/* HEADER */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary to-[#051530]" />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="opacity-0 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Current Openings</h1>
          </div>
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "150ms" }}>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto font-light">
              Explore open positions across Tamil Nadu and take the next step in your professional journey.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="flex flex-col lg:flex-row gap-8 relative z-20">
            
            {/* SIDEBAR FILTERS */}
            <aside className="hidden lg:block w-72 space-y-6 h-fit bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 font-semibold text-lg pb-4 border-b">
                <Filter className="h-5 w-5 text-primary" /> Filter Jobs
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Job title, keywords..."
                    className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Industry</label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="bg-gray-50 border-gray-200">
                    <SelectValue placeholder="All Industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industries.map((ind) => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="bg-gray-50 border-gray-200">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-primary/20 text-primary hover:bg-primary/5"
                onClick={() => { setSearchTerm(""); setSelectedIndustry("all"); setSelectedLocation("all"); }}
              >
                Reset Filters
              </Button>
            </aside>

            {/* JOB LISTINGS GRID */}
            <div className="flex-1 space-y-5">
              <div className="flex justify-between items-center px-2">
                <h2 className="font-semibold text-gray-700">
                  Showing {visibleJobs.length} of {filteredJobs.length} Jobs
                </h2>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Loading jobs...</p>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500">No jobs found matching your filters.</p>
                  <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedIndustry("all"); setSelectedLocation("all"); }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* 🟢 Render only visible jobs */}
                  <div className="space-y-4">
                    {visibleJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* 🟢 "LOAD MORE" BUTTON */}
                  {visibleCount < filteredJobs.length && (
                    <div className="flex justify-center pt-8 pb-4">
                      <Button 
                        onClick={handleLoadMore} 
                        variant="outline" 
                        size="lg"
                        className="bg-white hover:bg-gray-50 border-gray-200 text-gray-600 px-8"
                      >
                         Load More Jobs <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  
                  {visibleCount >= filteredJobs.length && filteredJobs.length > 0 && (
                     <p className="text-center text-xs text-gray-400 pt-8 pb-4">
                        You've reached the end of the list.
                     </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// JOB CARD COMPONENT
function JobCard({ job }: { job: Job }) {
  
  const formatJobType = (type: string) => {
    return type?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <Card className="hover:shadow-md transition-all duration-300 border border-gray-100 group">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {job.title}
                    </h3>
                    
                    {job.priority === 'urgent' && (
                        <Badge variant="destructive" className="flex items-center gap-1 text-[10px] px-1.5 h-5 animate-pulse">
                            <Flame className="w-3 h-3 fill-current" /> Urgent
                        </Badge>
                    )}

                    {job.type && (
                        <Badge variant="secondary" className="text-[10px] bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 h-5">
                            {formatJobType(job.type)}
                        </Badge>
                    )}
                </div>
                <p className="text-sm text-gray-500">{job.industry}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
              <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                <Briefcase className="h-3.5 w-3.5 text-primary" /> {job.experienceMin}-{job.experienceMax} Yrs
              </span>
              <span className="font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                ₹{Number(job.salaryMin).toLocaleString()} - ₹{Number(job.salaryMax).toLocaleString()}
              </span>
            </div>

            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed pt-1">
              {job.description}
            </p>
          </div>

          <div className="flex flex-col justify-center min-w-[140px] border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
            <Link to={`/jobs/${job.id}`}>
              <Button className="w-full bg-primary hover:bg-primary/90 shadow-sm group-hover:translate-x-1 transition-transform duration-300">
                View Details <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-center text-gray-400 mt-3">
              Posted {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}