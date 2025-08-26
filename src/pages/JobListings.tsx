import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Search, Briefcase, ArrowLeft, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  shift: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  transportProvided: boolean;
  category: string;
}

const JobListingsPage = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Expanded job data with more variety
  const jobs: Job[] = [
    {
      id: "1",
      title: "Warehouse Associate",
      company: "LogisticsCorp",
      location: "Industrial District",
      salary: "$18-22/hour",
      type: "Full-time",
      shift: "First Shift (6 AM - 2 PM)",
      description: "Join our warehouse team in a fast-paced environment. Package handling, inventory management, and quality control. Great opportunity for career growth in logistics.",
      requirements: ["High school diploma", "Ability to lift 50 lbs", "Previous warehouse experience preferred", "Basic computer skills"],
      benefits: ["Health insurance", "Paid time off", "Transportation provided", "401k matching", "Safety training"],
      postedDate: "2024-01-15",
      transportProvided: true,
      category: "Warehouse & Logistics"
    },
    {
      id: "2",
      title: "Construction Laborer",
      company: "BuildCorp Inc",
      location: "Downtown Construction Site",
      salary: "$20-25/hour",
      type: "Full-time",
      shift: "First Shift (7 AM - 3 PM)",
      description: "Construction site work including material handling, site preparation, and general labor support. Work on exciting new development projects.",
      requirements: ["Construction experience", "Safety certification preferred", "Physical fitness", "Team player attitude"],
      benefits: ["Competitive pay", "Safety training", "Equipment provided", "Overtime opportunities"],
      postedDate: "2024-01-14",
      transportProvided: true,
      category: "Construction"
    },
    {
      id: "3",
      title: "Manufacturing Operator",
      company: "TechManufacturing",
      location: "East Industrial Park",
      salary: "$19-24/hour",
      type: "Full-time",
      shift: "Second Shift (2 PM - 10 PM)",
      description: "Operate manufacturing equipment, quality inspections, and maintain production schedules. Join a growing tech manufacturing company.",
      requirements: ["Mechanical aptitude", "Attention to detail", "Willingness to work rotating shifts", "High school education"],
      benefits: ["401k matching", "Health benefits", "Shift differentials", "Free transportation", "Career advancement"],
      postedDate: "2024-01-13",
      transportProvided: true,
      category: "Manufacturing"
    },
    {
      id: "4",
      title: "Delivery Driver",
      company: "QuickDelivery LLC",
      location: "Multiple Routes",
      salary: "$16-20/hour + tips",
      type: "Full-time",
      shift: "Flexible Schedule",
      description: "Local delivery routes with company vehicle. Customer service focused with growth opportunities in logistics management.",
      requirements: ["Valid driver's license", "Clean driving record", "Customer service skills", "GPS navigation skills"],
      benefits: ["Flexible hours", "Company vehicle", "Gas reimbursement", "Performance bonuses"],
      postedDate: "2024-01-12",
      transportProvided: false,
      category: "Transportation"
    },
    {
      id: "5",
      title: "Retail Sales Associate",
      company: "MegaMart Retail",
      location: "Shopping Center East",
      salary: "$14-17/hour",
      type: "Part-time",
      shift: "Various Shifts Available",
      description: "Help customers find products, process transactions, and maintain store appearance. Great entry-level opportunity with growth potential.",
      requirements: ["Customer service experience", "Basic math skills", "Flexible schedule", "Positive attitude"],
      benefits: ["Employee discount", "Flexible scheduling", "Training provided", "Advancement opportunities"],
      postedDate: "2024-01-11",
      transportProvided: true,
      category: "Retail"
    },
    {
      id: "6",
      title: "Food Service Worker",
      company: "Healthy Eats Catering",
      location: "Corporate Kitchen",
      salary: "$15-18/hour",
      type: "Full-time",
      shift: "Morning Shift (5 AM - 1 PM)",
      description: "Food preparation, kitchen maintenance, and catering support. Join our team serving healthy meals to local businesses.",
      requirements: ["Food handler's permit", "Kitchen experience preferred", "Early morning availability", "Team collaboration"],
      benefits: ["Free meals", "Health insurance", "Paid training", "Transportation assistance"],
      postedDate: "2024-01-10",
      transportProvided: true,
      category: "Food Service"
    }
  ];

  const categories = [...new Set(jobs.map(job => job.category))];
  const locations = [...new Set(jobs.map(job => job.location))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation ? job.location.includes(filterLocation) : true;
    const matchesType = filterType ? job.type === filterType : true;
    const matchesCategory = filterCategory ? job.category === filterCategory : true;
    return matchesSearch && matchesLocation && matchesType && matchesCategory;
  });

  const handleApply = (job: Job) => {
    toast({
      title: "Application Started",
      description: `Your application for ${job.title} at ${job.company} has been initiated. You'll be redirected to complete the application.`,
    });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 space-y-6">
          <Button variant="outline" onClick={() => setSelectedJob(null)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Listings
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl">{selectedJob.title}</CardTitle>
                  <CardDescription className="text-xl flex items-center gap-2 mt-2">
                    <Building className="w-5 h-5" />
                    {selectedJob.company}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {selectedJob.transportProvided && (
                    <Badge variant="default">Transport Included</Badge>
                  )}
                  <Badge variant="outline">{selectedJob.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedJob.salary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedJob.shift}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedJob.type}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-muted-foreground">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => handleApply(selectedJob)} className="flex-1" size="lg">
                  Apply Now
                </Button>
                <Button variant="outline" onClick={handleBackToHome} className="flex-1">
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Next Job</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover local job opportunities with reliable transportation options. 
            Build your career with employers who care about getting you to work.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Job Search & Filters
            </CardTitle>
            <CardDescription>
              Find the perfect job that matches your skills and location preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{filteredJobs.length}</div>
              <p className="text-sm text-muted-foreground">Available Jobs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary">{jobs.filter(j => j.transportProvided).length}</div>
              <p className="text-sm text-muted-foreground">With Transportation</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent">{categories.length}</div>
              <p className="text-sm text-muted-foreground">Job Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Job Listings */}
        <div className="grid gap-4" data-job-listings>
          {filteredJobs.map((job) => (
            <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedJob(job)}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {job.company}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {job.transportProvided && (
                      <Badge variant="default">Transport Included</Badge>
                    )}
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="secondary">{job.category}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3 h-3 text-muted-foreground" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span>{job.shift}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span>Multiple Openings</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-2">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                No jobs match your current search criteria. Try adjusting your filters.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setFilterLocation("");
                setFilterType("");
                setFilterCategory("");
              }}>
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default JobListingsPage;