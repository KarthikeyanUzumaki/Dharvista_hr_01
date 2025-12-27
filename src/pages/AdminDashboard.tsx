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
import { toast } from "@/hooks/use-toast"; 
import { LayoutDashboard, Users, Plus, Trash2, LogOut, FileText, Flame } from "lucide-react";

// Hooks & Types
import { useJobs } from "@/hooks/useJobs";
import { useApplicants } from "@/hooks/useApplicants";
import { ApplicantStatus, JobPriority, JobType } from "@/types";

// 🟢 1. IMPORT LOGO
import logo from "@/assets/favicon.jpg";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'jobs' | 'applicants'>('jobs');
  
  // Data Hooks
  const { jobs, createJob, isLoading: jobsLoading, deleteJob } = useJobs();
  const { applicants, isLoading: appLoading, updateApplicantStatus } = useApplicants();

  // 🔒 AUTH CHECK
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/");
  };

  if (!token) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
        
        {/* 🟢 2. UPDATED SIDEBAR HEADER WITH LOGO */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-md border border-gray-200 shrink-0">
             <img 
               src={logo} 
               alt="Dharvista Logo" 
               className="h-full w-full object-cover" 
             />
          </div>
          <div>
             <h2 className="text-xl font-bold text-primary leading-tight">Dharvista</h2>
             <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Admin Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant={activeView === 'jobs' ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveView('jobs')}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Jobs Management
          </Button>
          
          <Button 
            variant={activeView === 'applicants' ? "secondary" : "ghost"} 
            className="w-full justify-start" 
            onClick={() => setActiveView('applicants')}
          >
            <Users className="mr-2 h-4 w-4" />
            Applicants
          </Button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeView === 'jobs' ? 'Jobs Overview' : 'Candidate Applications'}
            </h1>
            <p className="text-gray-500 mt-1">
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

// ==========================================
// 🔹 SUB-COMPONENT: JOBS VIEW
// ==========================================
function JobsView({ jobs, createJob, deleteJob, loading }: any) {
  
  // ✅ Updated State
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    industry: "",
    salaryMin: "",
    salaryMax: "",
    experienceMin: "",
    experienceMax: "",
    eligibility: "",
    description: "",
    type: "full-time" as JobType,
    priority: "normal" as JobPriority,
    status: "published",
    googleFormUrl: "" // 🟢 Included Google Form URL field
  });

  const handleAddJob = async () => {
    if (!newJob.title || !newJob.location) {
      alert("Title and Location are required"); 
      return;
    }

    const success = await createJob(newJob);
    if (success) {
      setNewJob({ 
        title: "", location: "", industry: "", 
        salaryMin: "", salaryMax: "", 
        experienceMin: "", experienceMax: "", 
        eligibility: "", description: "",
        type: "full-time",
        priority: "normal",
        status: "published",
        googleFormUrl: ""
      });
    }
  };

  const formatJobType = (type: string) => {
    return type?.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  if (loading) return <div className="p-10 text-center">Loading jobs...</div>;

  return (
    <div className="space-y-8 pb-10">
      {/* POST JOB FORM */}
      <Card>
        <CardHeader>
          <CardTitle>Post New Job</CardTitle>
          <CardDescription>Enter detailed requirements for the position.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input 
              placeholder="Job Title (e.g. Site Engineer)" 
              value={newJob.title} 
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} 
            />
            <Input 
              placeholder="Location (e.g. Madurai)" 
              value={newJob.location} 
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} 
            />
            
            <Select 
              value={newJob.type} 
              onValueChange={(val) => setNewJob({...newJob, type: val as JobType})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
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
            <Input 
              placeholder="Industry (e.g. Construction)" 
              value={newJob.industry} 
              onChange={(e) => setNewJob({ ...newJob, industry: e.target.value })} 
            />
            <Input 
              placeholder="Min Salary (₹)" 
              type="number"
              value={newJob.salaryMin} 
              onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })} 
            />
            <Input 
              placeholder="Max Salary (₹)" 
              type="number"
              value={newJob.salaryMax} 
              onChange={(e) => setNewJob({ ...newJob, salaryMax: e.target.value })} 
            />
            <div className="flex gap-2">
                 <Input 
                  placeholder="Min Exp" 
                  type="number"
                  className="w-1/2"
                  value={newJob.experienceMin} 
                  onChange={(e) => setNewJob({ ...newJob, experienceMin: e.target.value })} 
                />
                <Input 
                  placeholder="Max Exp" 
                  type="number"
                  className="w-1/2"
                  value={newJob.experienceMax} 
                  onChange={(e) => setNewJob({ ...newJob, experienceMax: e.target.value })} 
                />
            </div>
          </div>
          
          {/* 🟢 NEW: Google Form URL Input */}
          <Input 
            placeholder="Google Form Application Link (Optional)" 
            value={newJob.googleFormUrl} 
            onChange={(e) => setNewJob({ ...newJob, googleFormUrl: e.target.value })} 
          />

          <Textarea 
            placeholder="Eligibility Criteria (e.g. B.E. Civil, Must have two-wheeler)"
            value={newJob.eligibility}
            onChange={(e) => setNewJob({ ...newJob, eligibility: e.target.value })}
            className="h-20"
          />

          <Textarea 
            placeholder="Detailed Job Description..."
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            className="h-32"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 border px-4 py-2 rounded-md bg-gray-50">
                <input 
                    type="checkbox" 
                    id="urgentParams"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={newJob.priority === 'urgent'}
                    onChange={(e) => setNewJob({
                        ...newJob, 
                        priority: e.target.checked ? 'urgent' : 'normal'
                    })}
                />
                <label htmlFor="urgentParams" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                    Mark as Urgent Hiring
                </label>
            </div>

            <Button onClick={handleAddJob} className="w-full md:w-auto ml-auto">
              <Plus className="mr-2 h-4 w-4" /> Publish Job
            </Button>
          </div>
          
        </CardContent>
      </Card>

      {/* JOBS LIST */}
      <Card>
        <CardHeader>
          <CardTitle>Active Jobs ({jobs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job: any) => (
              <div key={job.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg hover:bg-gray-50 transition gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                    
                    {job.priority === 'urgent' && (
                        <Badge variant="destructive" className="flex items-center gap-1 text-[10px] px-1.5 h-5">
                            <Flame className="w-3 h-3" /> Urgent
                        </Badge>
                    )}
                    
                    <Badge variant={job.status === 'published' ? 'default' : 'secondary'} className="md:hidden">
                        {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{job.industry} · {job.location}</p>
                  
                  <div className="text-sm text-gray-600 flex flex-wrap gap-2 mt-2">
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs border border-purple-200">
                       {formatJobType(job.type || "full-time")}
                    </span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs border border-green-200">
                      ₹{Number(job.salaryMin)?.toLocaleString()} - ₹{Number(job.salaryMax)?.toLocaleString()}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs border border-blue-200">
                      Exp: {job.experienceMin} - {job.experienceMax} Yrs
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-1">{job.eligibility}</p>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center">
                  <Badge variant={job.status === 'published' ? 'default' : 'secondary'} className="hidden md:inline-flex">
                    {job.status}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => deleteJob(job.id)}>
                    <Trash2 className="h-4 w-4 text-red-400" />
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

// ==========================================
// 🔹 SUB-COMPONENT: APPLICANTS VIEW
// ==========================================
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
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>Manage incoming candidates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Job Applied</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((app: any) => (
              <TableRow key={app.id}>
                <TableCell>
                  <div className="font-medium">{app.name}</div>
                  <div className="text-xs text-gray-500">{app.email}</div>
                </TableCell>
                <TableCell>{app.jobTitle}</TableCell>
                <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <a href={app.resumeLink} target="_blank" rel="noreferrer" className="flex items-center text-blue-600 hover:underline text-xs">
                    <FileText className="h-3 w-3 mr-1" /> View Resume
                  </a>
                </TableCell>
                <TableCell>
                   <Select 
                     defaultValue={app.status} 
                     onValueChange={(val) => updateStatus(app.id, val as ApplicantStatus)}
                   >
                    <SelectTrigger className={`w-[120px] h-8 text-xs border ${getStatusColor(app.status)}`}>
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
      </CardContent>
    </Card>
  );
}