import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  LayoutDashboard, Users, Plus, Trash2, LogOut, FileText, Flame, 
  Menu, Filter, ListFilter, Calendar, ChevronLeft, Briefcase, Ban, CheckCircle, MapPin 
} from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { useApplicants } from "@/hooks/useApplicants";
import { ApplicantStatus, JobPriority, JobType, Job } from "@/types";

import logo from "../assets/dharvista-logo.jpg";

const INDUSTRIES = [
  "Medical / Healthcare",
  "Hotels / Restaurants",
  "Retail / FMCG",
  "Automobile",
  "Construction",
  "BPO / Customer Services",
  "Sales & Marketing",
  "Education & Training",
  "Engineering & Technical",
  "Textile Manufacturing",
  "Small – scale Manufacturing",
  "Textiles & Garments",
  "MSME",
  "Start-Ups"
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'jobs' | 'applicants'>('jobs');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { jobs, createJob, isLoading: jobsLoading, deleteJob, toggleJobStatus } = useJobs();
  const { applicants, isLoading: appLoading, updateApplicantStatus } = useApplicants();

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  if (!token) return null;

  const NavItems = () => (
    <nav className="flex-1 space-y-2 py-4">
      <Button 
        variant={activeView === 'jobs' ? "secondary" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => { setActiveView('jobs'); setIsMobileMenuOpen(false); }}
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Jobs Management
      </Button>
      
      <Button 
        variant={activeView === 'applicants' ? "secondary" : "ghost"} 
        className="w-full justify-start" 
        onClick={() => { setActiveView('applicants'); setIsMobileMenuOpen(false); }}
      >
        <Users className="mr-2 h-4 w-4" />
        Applicants
      </Button>
    </nav>
  );

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row overflow-hidden">
      
      {/* MOBILE HEADER */}
      <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between z-30 h-20">
        <div className="flex items-center gap-3">
          <div className="relative overflow-hidden h-12 w-12">
             <img src={logo} alt="Logo" className="h-full w-full object-cover mix-blend-multiply" />
          </div>
          {/* 🟢 UPDATED: Mobile Header Font */}
          <span 
            className="text-xl text-primary uppercase"
            style={{ 
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', 
              fontWeight: 900, 
              letterSpacing: '1.5px' 
            }}
          >
            DHARVISTA
          </span>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-8 w-8 text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 flex flex-col">
            <div className="p-6 border-b font-bold text-lg uppercase text-primary">Menu</div>
            <div className="p-4 flex-1">
              <NavItems />
            </div>
            <div className="p-4 border-t">
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-200 flex-col h-full z-10">
        <div className="p-6 border-b border-gray-100 flex flex-col items-center gap-2 text-center">
          <div className="relative overflow-hidden h-20 w-20 transition-transform hover:scale-105">
             <img src={logo} alt="Logo" className="h-full w-full object-cover mix-blend-multiply" />
          </div>
          <div>
             {/* 🟢 UPDATED: Desktop Sidebar Font */}
             <h2 
               className="text-2xl text-primary uppercase leading-none"
               style={{ 
                 fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', 
                 fontWeight: 900, 
                 letterSpacing: '1.5px' 
               }}
             >
               DHARVISTA
             </h2>
             <p className="text-[10px] text-gray-400 font-semibold tracking-wider mt-1 uppercase">Admin Portal</p>
          </div>
        </div>
        
        <div className="p-4 flex-1">
          <NavItems />
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {activeView === 'jobs' ? 'Jobs Overview' : 'Candidate Applications'}
            </h1>
          </div>

          {activeView === 'jobs' ? (
            <JobsView jobs={jobs} createJob={createJob} deleteJob={deleteJob} toggleJobStatus={toggleJobStatus} loading={jobsLoading} />
          ) : (
            <ApplicantsView applicants={applicants} jobs={jobs} loading={appLoading} updateStatus={updateApplicantStatus} toggleJobStatus={toggleJobStatus} />
          )}

        </div>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// JOBS VIEW COMPONENT
// ----------------------------------------------------------------------
function JobsView({ jobs, createJob, deleteJob, toggleJobStatus, loading }: any) {
  const [newJob, setNewJob] = useState({
    title: "", location: "", industry: "", salaryMin: "", salaryMax: "",
    experienceMin: "", experienceMax: "", eligibility: "", description: "",
    type: "full-time" as JobType, priority: "normal" as JobPriority,
    status: "published"
  });

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.location) {
      alert("Title and Location are required"); 
      return;
    }
    const success = await createJob(newJob);
    if (success) {
      setNewJob({ 
        title: "", location: "", industry: "", salaryMin: "", salaryMax: "", 
        experienceMin: "", experienceMax: "", eligibility: "", description: "",
        type: "full-time", priority: "normal", status: "published"
      });
    }
  };

  const formatJobType = (type: string) => {
    return type?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (loading) return <div className="p-10 text-center">Loading jobs...</div>;

  return (
    <div className="space-y-6 pb-10">
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle>Post New Job</CardTitle>
          <CardDescription>Enter requirements for the position.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Job Title" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} />
            <Input placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} />
            <Select value={newJob.type} onValueChange={(val) => setNewJob({...newJob, type: val as JobType})}>
              <SelectTrigger><SelectValue placeholder="Job Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <Select value={newJob.industry} onValueChange={(val) => setNewJob({...newJob, industry: val})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Input placeholder="Min Salary" type="number" value={newJob.salaryMin} onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })} />
            <Input placeholder="Max Salary" type="number" value={newJob.salaryMax} onChange={(e) => setNewJob({ ...newJob, salaryMax: e.target.value })} />
            <div className="flex gap-2">
                  <Input placeholder="Min Exp" type="number" className="w-1/2" value={newJob.experienceMin} onChange={(e) => setNewJob({ ...newJob, experienceMin: e.target.value })} />
                  <Input placeholder="Max Exp" type="number" className="w-1/2" value={newJob.experienceMax} onChange={(e) => setNewJob({ ...newJob, experienceMax: e.target.value })} />
            </div>
          </div>
          
          <Textarea placeholder="Eligibility Criteria..." value={newJob.eligibility} onChange={(e) => setNewJob({ ...newJob, eligibility: e.target.value })} className="h-20" />
          <Textarea placeholder="Job Description..." value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="h-32" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-2 border px-4 py-2 rounded-md bg-gray-50 w-full md:w-auto">
                <input type="checkbox" id="urgentParams" className="h-4 w-4" checked={newJob.priority === 'urgent'} onChange={(e) => setNewJob({...newJob, priority: e.target.checked ? 'urgent' : 'normal'})} />
                <label htmlFor="urgentParams" className="text-sm font-medium cursor-pointer">Mark as Urgent Hiring</label>
            </div>
            <Button onClick={handleAddJob} className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Publish Job
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle>Active Jobs ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            {jobs.map((job: any) => (
              <div key={job.id} className={`flex flex-col md:flex-row justify-between p-4 border rounded-lg transition gap-4 ${job.status === 'closed' ? 'bg-gray-100 opacity-70' : 'hover:bg-gray-50'}`}>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                      {job.title} 
                      {job.status === 'closed' && <span className="ml-2 text-xs text-red-500 font-bold uppercase">(Closed)</span>}
                    </h3>
                    
                    {job.priority === 'urgent' && job.status !== 'closed' && <Badge variant="secondary" className="bg-accent text-accent-foreground border-yellow-500 h-5"><Flame className="w-3 h-3 mr-1" /> Urgent</Badge>}
                    
                    <Badge variant={job.status === 'published' ? 'default' : 'secondary'} className="md:hidden">
                        {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{job.industry} • {job.location}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-[10px] border border-purple-200">{formatJobType(job.type)}</span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] border border-green-200">₹{Number(job.salaryMin)?.toLocaleString()} - ₹{Number(job.salaryMax)?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0">
                  <Badge variant={job.status === 'published' ? 'default' : 'secondary'} className="hidden md:inline-flex mr-2">
                    {job.status}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => toggleJobStatus(job)} 
                    className={job.status === 'published' ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-200" : "text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"}
                    title={job.status === 'published' ? "Close Job" : "Republish Job"}
                  >
                    {job.status === 'published' ? <Ban className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteJob(job.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ----------------------------------------------------------------------
// APPLICANTS VIEW COMPONENT
// ----------------------------------------------------------------------
function ApplicantsView({ applicants, jobs, loading, updateStatus, toggleJobStatus }: any) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (selectedJob) {
      const updatedJob = jobs.find((j: Job) => j.id === selectedJob.id);
      if (updatedJob) setSelectedJob(updatedJob);
    }
  }, [jobs]);

  const getApplicantCount = (jobId: string) => {
    return applicants.filter((app: any) => app.jobId === jobId).length;
  };

  const getStatusColor = (status: ApplicantStatus) => {
    switch(status) {
      case 'new': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'contacted': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'hired': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return '';
    }
  };

  const getJobStatusColor = (status: string) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-700 border-green-200' 
      : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  if (loading) return <div className="p-10 text-center">Loading applicants...</div>;

  // 1. DETAILED VIEW (Selected Job)
  if (selectedJob) {
    const jobApplicants = applicants.filter((app: any) => app.jobId === selectedJob.id);
    const filteredApplicants = jobApplicants.filter((app: any) => 
      statusFilter === "all" || app.status === statusFilter
    );

    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => { setSelectedJob(null); setStatusFilter("all"); }}
          className="pl-0 hover:pl-2 transition-all"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Jobs
        </Button>

        {/* Job Summary Card (Two-Column) */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column */}
              <div className="flex flex-col justify-center space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
                     <Briefcase className="w-3 h-3 mr-1.5"/> {selectedJob.industry}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
                     <MapPin className="w-3 h-3 mr-1.5"/> {selectedJob.location}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 px-3 py-1">
                     <Calendar className="w-3 h-3 mr-1.5"/> Posted: {formatDate(selectedJob.createdAt)}
                  </Badge>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col md:items-end justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                 <div className="flex items-center gap-4">
                    <div className="text-right">
                       <span className="block text-3xl font-bold text-gray-900 leading-none">{jobApplicants.length}</span>
                       <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Applicants</span>
                    </div>
                    
                    <div className="h-10 w-px bg-gray-200 mx-2"></div>

                    <div className="flex flex-col gap-2">
                        <Badge variant="outline" className={`justify-center px-3 py-1 ${getJobStatusColor(selectedJob.status)}`}>
                            {selectedJob.status.toUpperCase()}
                        </Badge>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleJobStatus(selectedJob)}
                            className={`h-7 px-2 text-xs ${selectedJob.status === 'published' ? "text-orange-600 hover:text-orange-700 hover:bg-orange-50" : "text-green-600 hover:text-green-700 hover:bg-green-50"}`}
                        >
                            {selectedJob.status === 'published' ? "Close Job" : "Republish"}
                        </Button>
                    </div>
                 </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Applicants Table Card */}
        <Card>
          <CardHeader className="p-4 md:p-6 border-b">
             <div className="flex items-center justify-between">
                <CardTitle>Candidates</CardTitle>
                <div className="w-[180px]">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-9">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <SelectValue placeholder="Filter Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
             </div>
          </CardHeader>
          <CardContent className="p-0">
             <Table>
               <TableHeader>
                 <TableRow className="bg-gray-50/50">
                   <TableHead className="pl-6">Candidate</TableHead>
                   <TableHead>Applied Date</TableHead>
                   <TableHead>Resume</TableHead>
                   <TableHead>Status</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {filteredApplicants.length > 0 ? (
                   filteredApplicants.map((app: any) => (
                     <TableRow key={app.id}>
                       <TableCell className="pl-6">
                         <div className="font-medium text-gray-900">{app.name}</div>
                         <div className="text-xs text-gray-500">{app.email}</div>
                       </TableCell>
                       <TableCell className="text-sm text-gray-600">
                         {formatDate(app.appliedAt)}
                       </TableCell>
                       <TableCell>
                         <a 
                           href={app.resumeLink} 
                           target="_blank" 
                           rel="noreferrer" 
                           className="flex items-center w-fit text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full text-xs hover:bg-blue-100 transition-colors"
                         >
                           <FileText className="h-3 w-3 mr-1.5" /> View Resume
                         </a>
                       </TableCell>
                       <TableCell>
                         <Select defaultValue={app.status} onValueChange={(val) => updateStatus(app.id, val as ApplicantStatus)}>
                           <SelectTrigger className={`w-[130px] h-8 text-xs border ${getStatusColor(app.status)}`}>
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="new">New</SelectItem>
                             <SelectItem value="contacted">Contacted</SelectItem>
                             <SelectItem value="hired">Hired</SelectItem>
                             <SelectItem value="rejected">Rejected</SelectItem>
                           </SelectContent>
                         </Select>
                       </TableCell>
                     </TableRow>
                   ))
                 ) : (
                   <TableRow>
                     <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                       No candidates found matching this filter.
                     </TableCell>
                   </TableRow>
                 )}
               </TableBody>
             </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 2. GRID VIEW (List of Jobs - OUTSIDE)
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between gap-4">
          <p className="text-gray-600">Select a job to view and manage its applicants.</p>
       </div>
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobs.map((job: Job) => {
            const applicantCount = getApplicantCount(job.id);
            return (
              <Card 
                key={job.id} 
                onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button')) return;
                    setSelectedJob(job);
                }}
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 border-gray-200 group relative overflow-hidden ${job.status === 'closed' ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className={`absolute top-0 left-0 w-1.5 h-full ${job.status === 'published' ? 'bg-green-500' : 'bg-gray-300'}`} />
                
                <CardContent className="p-5 pl-7">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`font-bold text-lg transition-colors line-clamp-1 ${job.status === 'closed' ? 'text-gray-500' : 'text-gray-900 group-hover:text-primary'}`} title={job.title}>
                      {job.title}
                    </h3>
                    <Badge variant="outline" className={`ml-2 text-[10px] ${getJobStatusColor(job.status)}`}>
                      {job.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                           <Calendar className="h-3.5 w-3.5" /> 
                           {formatDate(job.createdAt)}
                        </span>
                        <span className="flex items-center gap-2 font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                           <Users className="h-3.5 w-3.5 text-primary" /> 
                           {applicantCount} Applicants
                        </span>
                     </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex justify-end">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            toggleJobStatus(job);
                        }}
                        className={`text-xs h-7 px-2 ${job.status === 'published' ? "text-orange-500 hover:text-orange-600 hover:bg-orange-50" : "text-green-600 hover:text-green-700 hover:bg-green-50"}`}
                    >
                        {job.status === 'published' ? <><Ban className="h-3 w-3 mr-1" /> Close Job</> : <><CheckCircle className="h-3 w-3 mr-1" /> Republish</>}
                    </Button>
                  </div>

                </CardContent>
              </Card>
            );
          })}
       </div>
    </div>
  );
}