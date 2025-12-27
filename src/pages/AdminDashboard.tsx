// src/pages/AdminDashboard.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; 
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Users, Plus, Trash2, LogOut, FileText, Flame, Menu } from "lucide-react";

// Hooks & Types
import { useJobs } from "@/hooks/useJobs";
import { useApplicants } from "@/hooks/useApplicants";
import { ApplicantStatus, JobPriority, JobType } from "@/types";

import logo from "@/assets/Favicon.jpg";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'jobs' | 'applicants'>('jobs');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { jobs, createJob, isLoading: jobsLoading, deleteJob } = useJobs();
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

  // Reusable Navigation Content
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
      <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded" />
          <span className="font-bold text-primary">Dharvista Admin</span>
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 flex flex-col">
            <div className="p-6 border-b font-bold text-lg">Menu</div>
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

      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col h-full z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200 shrink-0">
             <img src={logo} alt="Logo" className="h-full w-full object-cover" />
          </div>
          <div>
             <h2 className="text-xl font-bold text-primary leading-tight">Dharvista</h2>
             <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Admin Portal</p>
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
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {activeView === 'jobs' ? 'Jobs Overview' : 'Candidate Applications'}
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              {activeView === 'jobs' 
                ? 'Manage job listings and track open positions.' 
                : 'Track and manage candidate applications.'}
            </p>
          </div>

          {activeView === 'jobs' ? (
            <JobsView jobs={jobs} createJob={createJob} deleteJob={deleteJob} loading={jobsLoading} />
          ) : (
            <ApplicantsView 
              applicants={applicants} 
              loading={appLoading} 
              updateStatus={updateApplicantStatus} 
            />
          )}

        </div>
      </main>
    </div>
  );
}

function JobsView({ jobs, createJob, deleteJob, loading }: any) {
  const [newJob, setNewJob] = useState({
    title: "", location: "", industry: "", salaryMin: "", salaryMax: "",
    experienceMin: "", experienceMax: "", eligibility: "", description: "",
    type: "full-time" as JobType, priority: "normal" as JobPriority,
    status: "published", googleFormUrl: ""
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
        type: "full-time", priority: "normal", status: "published", googleFormUrl: ""
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
            <Input placeholder="Industry" value={newJob.industry} onChange={(e) => setNewJob({ ...newJob, industry: e.target.value })} />
            <Input placeholder="Min Salary" type="number" value={newJob.salaryMin} onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })} />
            <Input placeholder="Max Salary" type="number" value={newJob.salaryMax} onChange={(e) => setNewJob({ ...newJob, salaryMax: e.target.value })} />
            <div className="flex gap-2">
                 <Input placeholder="Min Exp" type="number" className="w-1/2" value={newJob.experienceMin} onChange={(e) => setNewJob({ ...newJob, experienceMin: e.target.value })} />
                 <Input placeholder="Max Exp" type="number" className="w-1/2" value={newJob.experienceMax} onChange={(e) => setNewJob({ ...newJob, experienceMax: e.target.value })} />
            </div>
          </div>
          
          <Input placeholder="Google Form Link (Optional)" value={newJob.googleFormUrl} onChange={(e) => setNewJob({ ...newJob, googleFormUrl: e.target.value })} />
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
              <div key={job.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg hover:bg-gray-50 transition gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-base md:text-lg">{job.title}</h3>
                    {job.priority === 'urgent' && <Badge variant="destructive" className="h-5"><Flame className="w-3 h-3 mr-1" /> Urgent</Badge>}
                    <Badge variant={job.status === 'published' ? 'default' : 'secondary'} className="md:hidden">{job.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">{job.industry} · {job.location}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-[10px] border border-purple-200">{formatJobType(job.type)}</span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-[10px] border border-green-200">₹{Number(job.salaryMin)?.toLocaleString()} - ₹{Number(job.salaryMax)?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                  <Badge variant={job.status === 'published' ? 'default' : 'secondary'} className="hidden md:inline-flex">{job.status}</Badge>
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

function ApplicantsView({ applicants, loading, updateStatus }: any) {
  const getStatusColor = (status: ApplicantStatus) => {
    switch(status) {
      case 'new': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'contacted': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'hired': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return '';
    }
  };

  if (loading) return <div className="p-10 text-center">Loading applicants...</div>;

  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>Manage incoming candidates.</CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6 overflow-hidden">
        {/* Horizontal scroll enabled for the table on mobile */}
        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Job Applied</TableHead>
                <TableHead className="hidden md:table-cell">Applied Date</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((app: any) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.name}</div>
                    <div className="text-[10px] md:text-xs text-gray-500">{app.email}</div>
                  </TableCell>
                  <TableCell className="text-sm">{app.jobTitle}</TableCell>
                  <TableCell className="text-sm hidden md:table-cell">{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <a href={app.resumeLink} target="_blank" rel="noreferrer" className="flex items-center text-blue-600 hover:underline text-[10px] md:text-xs">
                      <FileText className="h-3 w-3 mr-1" /> Resume
                    </a>
                  </TableCell>
                  <TableCell>
                    <Select defaultValue={app.status} onValueChange={(val) => updateStatus(app.id, val as ApplicantStatus)}>
                      <SelectTrigger className={`w-[100px] md:w-[120px] h-8 text-[10px] md:text-xs border ${getStatusColor(app.status)}`}>
                        <SelectValue placeholder="Status" />
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
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}