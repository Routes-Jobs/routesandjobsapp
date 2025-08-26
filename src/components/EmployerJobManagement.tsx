import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Eye, Trash2, MapPin, DollarSign, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  type: string;
  shift: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: "active" | "draft" | "closed";
  applicants: number;
  postedDate: string;
  transportProvided: boolean;
}

const EmployerJobManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("listings");
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    salary: "",
    type: "Full-time",
    shift: "",
    description: "",
    requirements: "",
    benefits: "",
    transportProvided: false
  });

  // Mock job postings data
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: "job-1",
      title: "Warehouse Associate",
      department: "Operations",
      location: "Memphis Industrial District",
      salary: "$18-22/hour",
      type: "Full-time",
      shift: "First Shift (6 AM - 2 PM)",
      description: "Join our warehouse team in a fast-paced environment. Package handling, inventory management, and quality control.",
      requirements: ["High school diploma", "Ability to lift 50 lbs", "Previous warehouse experience preferred"],
      benefits: ["Health insurance", "Paid time off", "Transportation provided"],
      status: "active",
      applicants: 24,
      postedDate: "2024-01-15",
      transportProvided: true
    },
    {
      id: "job-2",
      title: "Manufacturing Supervisor",
      department: "Production",
      location: "East Memphis Plant",
      salary: "$65,000-75,000/year",
      type: "Full-time",
      shift: "Rotating Shifts",
      description: "Lead a team of manufacturing operators and ensure production targets are met.",
      requirements: ["Bachelor's degree or equivalent experience", "5+ years manufacturing experience", "Leadership skills"],
      benefits: ["401k matching", "Health benefits", "Management training", "Company transportation"],
      status: "draft",
      applicants: 0,
      postedDate: "2024-01-20",
      transportProvided: true
    }
  ]);

  const handleCreateJob = () => {
    if (!jobForm.title || !jobForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: jobForm.title,
      department: jobForm.department,
      location: jobForm.location,
      salary: jobForm.salary,
      type: jobForm.type,
      shift: jobForm.shift,
      description: jobForm.description,
      requirements: jobForm.requirements.split('\n').filter(r => r.trim()),
      benefits: jobForm.benefits.split('\n').filter(b => b.trim()),
      status: "draft",
      applicants: 0,
      postedDate: new Date().toISOString().split('T')[0],
      transportProvided: jobForm.transportProvided
    };

    setJobPostings(prev => [...prev, newJob]);
    setJobForm({
      title: "",
      department: "",
      location: "",
      salary: "",
      type: "Full-time",
      shift: "",
      description: "",
      requirements: "",
      benefits: "",
      transportProvided: false
    });

    toast({
      title: "Job Created",
      description: "New job posting has been created as draft.",
    });
  };

  const handleEditJob = (job: JobPosting) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      salary: job.salary,
      type: job.type,
      shift: job.shift,
      description: job.description,
      requirements: job.requirements.join('\n'),
      benefits: job.benefits.join('\n'),
      transportProvided: job.transportProvided
    });
    setActiveTab("create");
  };

  const handlePublishJob = (jobId: string) => {
    setJobPostings(prev => prev.map(job => 
      job.id === jobId ? { ...job, status: "active" as const } : job
    ));
    toast({
      title: "Job Published",
      description: "Job posting is now active and visible to candidates.",
    });
  };

  const handleDeleteJob = (jobId: string) => {
    setJobPostings(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted",
      description: "Job posting has been removed.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="listings">Job Listings</TabsTrigger>
          <TabsTrigger value="create">Create/Edit Job</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="listings" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manage Job Postings</CardTitle>
                  <CardDescription>Create, edit, and manage your job listings</CardDescription>
                </div>
                <Button onClick={() => setActiveTab("create")}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobPostings.map((job) => (
                  <Card key={job.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            {getStatusBadge(job.status)}
                            {job.transportProvided && (
                              <Badge variant="outline" className="text-xs">Transport Included</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{job.department} • {job.location}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{job.shift}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              <span>{job.applicants} applicants</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          {job.status === "draft" && (
                            <Button size="sm" onClick={() => handlePublishJob(job.id)}>
                              Publish
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleDeleteJob(job.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{editingJob ? "Edit Job Posting" : "Create New Job Posting"}</CardTitle>
              <CardDescription>Fill out the details for your job posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={jobForm.title}
                    onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Warehouse Associate"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={jobForm.department}
                    onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
                    placeholder="e.g. Operations"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={jobForm.location}
                    onChange={(e) => setJobForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g. Memphis Industrial District"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="e.g. $18-22/hour"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Employment Type</Label>
                  <Select value={jobForm.type} onValueChange={(value) => setJobForm(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift">Shift</Label>
                  <Input
                    id="shift"
                    value={jobForm.shift}
                    onChange={(e) => setJobForm(prev => ({ ...prev, shift: e.target.value }))}
                    placeholder="e.g. First Shift (6 AM - 2 PM)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={jobForm.description}
                  onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role, responsibilities, and what makes this position great..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm(prev => ({ ...prev, requirements: e.target.value }))}
                  placeholder="High school diploma&#10;Ability to lift 50 lbs&#10;Previous experience preferred"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits (one per line)</Label>
                <Textarea
                  id="benefits"
                  value={jobForm.benefits}
                  onChange={(e) => setJobForm(prev => ({ ...prev, benefits: e.target.value }))}
                  placeholder="Health insurance&#10;Paid time off&#10;Transportation provided"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="transport"
                  checked={jobForm.transportProvided}
                  onChange={(e) => setJobForm(prev => ({ ...prev, transportProvided: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="transport">Transportation provided to job site</Label>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCreateJob} className="flex-1">
                  {editingJob ? "Update Job" : "Create Job"}
                </Button>
                <Button variant="outline" onClick={() => {
                  setActiveTab("listings");
                  setEditingJob(null);
                  setJobForm({
                    title: "",
                    department: "",
                    location: "",
                    salary: "",
                    type: "Full-time",
                    shift: "",
                    description: "",
                    requirements: "",
                    benefits: "",
                    transportProvided: false
                  });
                }}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Applications</CardTitle>
              <CardDescription>Review and manage candidate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                <p className="text-muted-foreground">
                  Applications will appear here when candidates apply to your job postings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerJobManagement;