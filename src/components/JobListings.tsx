import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Search, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
}

interface JobListingsProps {
  userType?: "employee" | "general";
}

const JobListings = ({ userType = "general" }: JobListingsProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const { toast } = useToast();

  // Mock job data
  const jobs: Job[] = [
    {
      id: "1",
      title: "Warehouse Associate",
      company: "LogisticsCorp",
      location: "Industrial District",
      salary: "$18-22/hour",
      type: "Full-time",
      shift: "First Shift (6 AM - 2 PM)",
      description: "Join our warehouse team in a fast-paced environment. Package handling, inventory management, and quality control.",
      requirements: ["High school diploma", "Ability to lift 50 lbs", "Previous warehouse experience preferred"],
      benefits: ["Health insurance", "Paid time off", "Transportation provided"],
      postedDate: "2024-01-15",
      transportProvided: true
    },
    {
      id: "2",
      title: "Construction Laborer",
      company: "BuildCorp Inc",
      location: "Downtown Construction Site",
      salary: "$20-25/hour",
      type: "Full-time",
      shift: "First Shift (7 AM - 3 PM)",
      description: "Construction site work including material handling, site preparation, and general labor support.",
      requirements: ["Construction experience", "Safety certification preferred", "Reliable transportation"],
      benefits: ["Competitive pay", "Safety training", "Equipment provided"],
      postedDate: "2024-01-14",
      transportProvided: true
    },
    {
      id: "3",
      title: "Manufacturing Operator",
      company: "TechManufacturing",
      location: "East Industrial Park",
      salary: "$19-24/hour",
      type: "Full-time",
      shift: "Second Shift (2 PM - 10 PM)",
      description: "Operate manufacturing equipment, quality inspections, and maintain production schedules.",
      requirements: ["Mechanical aptitude", "Attention to detail", "Willingness to work rotating shifts"],
      benefits: ["401k matching", "Health benefits", "Shift differentials", "Free transportation"],
      postedDate: "2024-01-13",
      transportProvided: true
    },
    {
      id: "4",
      title: "Delivery Driver",
      company: "QuickDelivery LLC",
      location: "Multiple Routes",
      salary: "$16-20/hour + tips",
      type: "Full-time",
      shift: "Flexible Schedule",
      description: "Local delivery routes with company vehicle. Customer service focused with growth opportunities.",
      requirements: ["Valid driver's license", "Clean driving record", "Customer service skills"],
      benefits: ["Flexible hours", "Company vehicle", "Gas reimbursement"],
      postedDate: "2024-01-12",
      transportProvided: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation && filterLocation !== "all-locations" ? job.location.includes(filterLocation) : true;
    const matchesType = filterType && filterType !== "all-types" ? job.type === filterType : true;
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleApply = (job: Job) => {
    toast({
      title: "Application Started",
      description: `Your application for ${job.title} at ${job.company} has been initiated.`,
    });
  };

  if (selectedJob) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => setSelectedJob(null)} className="mb-4">
          ← Back to Job Listings
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedJob.title}</CardTitle>
                <CardDescription className="text-lg">{selectedJob.company}</CardDescription>
              </div>
              <Badge variant={selectedJob.transportProvided ? "default" : "secondary"}>
                {selectedJob.transportProvided ? "Transport Included" : "Own Transport"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
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

            <Button onClick={() => handleApply(selectedJob)} className="w-full" size="lg">
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            {userType === "employee" ? "Find New Opportunities" : "Available Jobs"}
          </CardTitle>
          <CardDescription>
            {userType === "employee" 
              ? "Explore job opportunities with reliable transportation included" 
              : "Browse local job openings in your area"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-locations">All Locations</SelectItem>
                <SelectItem value="Industrial">Industrial District</SelectItem>
                <SelectItem value="Downtown">Downtown Area</SelectItem>
                <SelectItem value="East">East Industrial Park</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedJob(job)}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <div className="flex gap-2">
                  {job.transportProvided && (
                    <Badge variant="default">Transport Included</Badge>
                  )}
                  <Badge variant="outline">{job.type}</Badge>
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
            <p className="text-muted-foreground">No jobs match your current filters.</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFilterLocation("all-locations");
              setFilterType("all-types");
            }} className="mt-4">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobListings;