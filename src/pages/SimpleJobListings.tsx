import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Search, Briefcase, ArrowLeft, Bus, Car, CalendarDays, Users } from "lucide-react";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedDate: string;
  includesTransportation?: boolean;
  transportCost?: string;
  interviewLocation?: string;
  shift?: string;
  requirements?: string[];
  benefits?: string[];
}

const SimpleJobListings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Memphis job listings - 20 current opportunities
  const jobs: Job[] = [
    {
      id: "1",
      title: "Warehouse Associate",
      company: "FedEx Ground - Memphis Hub",
      location: "Memphis International Airport",
      salary: "$18-22/hour",
      type: "Full-time",
      description: "Package handling, sorting, and loading at world's busiest cargo airport. Benefits include health insurance and transportation assistance.",
      postedDate: "1 day ago",
      includesTransportation: true,
      transportCost: "Free - Company shuttle service",
      interviewLocation: "FedEx Ground HR Office - Memphis Airport",
      shift: "First Shift (6 AM - 2 PM)",
      requirements: ["High school diploma", "Ability to lift 50 lbs", "Previous warehouse experience preferred"],
      benefits: ["Health insurance", "Paid time off", "Transportation provided"]
    },
    {
      id: "2",
      title: "Production Worker",
      company: "International Paper",
      location: "Southaven",
      salary: "$19-24/hour",
      type: "Full-time",
      description: "Manufacturing paper products, machine operation, quality control. Comprehensive benefits package.",
      postedDate: "2 days ago",
      includesTransportation: false,
      transportCost: "Own transportation required",
      interviewLocation: "International Paper HR - Southaven Plant",
      shift: "Second Shift (2 PM - 10 PM)",
      requirements: ["Manufacturing experience preferred", "Attention to detail", "Mechanical aptitude"],
      benefits: ["Comprehensive benefits", "401k matching", "Career advancement"]
    },
    {
      id: "3",
      title: "Delivery Driver",
      company: "UPS",
      location: "Midtown Memphis",
      salary: "$21-25/hour",
      type: "Full-time",
      description: "Local package delivery, customer service, vehicle maintenance. Company vehicle provided.",
      postedDate: "1 day ago",
      includesTransportation: true,
      transportCost: "Free - Company vehicle provided",
      interviewLocation: "UPS Facility - Midtown Memphis Hub",
      shift: "Flexible Schedule",
      requirements: ["Valid driver's license", "Clean driving record", "Customer service skills"],
      benefits: ["Flexible hours", "Company vehicle", "Gas reimbursement"]
    },
    {
      id: "4",
      title: "Forklift Operator",
      company: "AutoZone Distribution Center",
      location: "Memphis Distribution Center",
      salary: "$17-21/hour",
      type: "Full-time",
      description: "Operate forklifts in automotive parts warehouse. Certification training provided.",
      postedDate: "3 days ago",
      includesTransportation: true
    },
    {
      id: "5",
      title: "Hospital Transporter",
      company: "Methodist Le Bonheur Healthcare",
      location: "Downtown Memphis",
      salary: "$15-18/hour",
      type: "Full-time",
      description: "Transport patients and medical equipment throughout hospital campus. Training provided.",
      postedDate: "2 days ago",
      includesTransportation: false
    },
    {
      id: "6",
      title: "Food Service Worker",
      company: "Aramark - St. Jude",
      location: "St. Jude Children's Hospital",
      salary: "$14-16/hour",
      type: "Part-time",
      description: "Cafeteria service, food preparation, cleaning. Meaningful work supporting families.",
      postedDate: "1 day ago",
      includesTransportation: true
    },
    {
      id: "7",
      title: "Security Guard",
      company: "Allied Universal",
      location: "Various Memphis Locations",
      salary: "$16-19/hour",
      type: "Full-time",
      description: "Property security, access control, incident reporting. Multiple shift options available.",
      postedDate: "2 days ago",
      includesTransportation: false
    },
    {
      id: "8",
      title: "Call Center Representative",
      company: "ServiceMaster",
      location: "East Memphis",
      salary: "$15-18/hour",
      type: "Full-time",
      description: "Customer service for restoration services. Training provided, advancement opportunities.",
      postedDate: "4 days ago",
      includesTransportation: true
    },
    {
      id: "9",
      title: "Maintenance Technician",
      company: "Walmart Distribution Center",
      location: "Olive Branch, MS",
      salary: "$20-26/hour",
      type: "Full-time",
      description: "Equipment maintenance, troubleshooting, preventive maintenance. Benefits package.",
      postedDate: "3 days ago",
      includesTransportation: true
    },
    {
      id: "10",
      title: "School Bus Driver",
      company: "First Student",
      location: "Memphis City Schools",
      salary: "$18-22/hour",
      type: "Part-time",
      description: "Transport students safely. CDL training provided, great benefits for part-time work.",
      postedDate: "1 week ago",
      includesTransportation: false
    },
    {
      id: "11",
      title: "Retail Associate",
      company: "Bass Pro Shops - Pyramid",
      location: "Downtown Memphis",
      salary: "$13-16/hour",
      type: "Part-time",
      description: "Customer service, inventory management, sales support. Employee discounts available.",
      postedDate: "2 days ago",
      includesTransportation: false
    },
    {
      id: "12",
      title: "Airport Ground Crew",
      company: "Unifi Aviation",
      location: "Memphis International Airport",
      salary: "$16-20/hour",
      type: "Full-time",
      description: "Aircraft loading, baggage handling, ground support equipment operation.",
      postedDate: "1 day ago",
      includesTransportation: true
    },
    {
      id: "13",
      title: "Assembly Line Worker",
      company: "Electrolux Home Products",
      location: "Memphis Manufacturing",
      salary: "$17-21/hour",
      type: "Full-time",
      description: "Appliance assembly, quality inspection, packaging. Stable manufacturing environment.",
      postedDate: "3 days ago",
      includesTransportation: true
    },
    {
      id: "14",
      title: "Truck Driver - Local",
      company: "Sysco Memphis",
      location: "Memphis Food Distribution",
      salary: "$22-28/hour",
      type: "Full-time",
      description: "Local food service delivery, customer relations. CDL-A required, home daily.",
      postedDate: "2 days ago",
      includesTransportation: false
    },
    {
      id: "15",
      title: "Hotel Housekeeper",
      company: "Peabody Memphis",
      location: "Downtown Memphis",
      salary: "$14-17/hour",
      type: "Full-time",
      description: "Luxury hotel room cleaning and maintenance. Benefits and employee rates available.",
      postedDate: "1 day ago",
      includesTransportation: false
    },
    {
      id: "16",
      title: "Kitchen Staff",
      company: "Rendezvous Restaurant",
      location: "Downtown Memphis",
      salary: "$15-18/hour",
      type: "Part-time",
      description: "Food preparation, dishwashing, kitchen maintenance. Famous BBQ restaurant experience.",
      postedDate: "2 days ago",
      includesTransportation: false
    },
    {
      id: "17",
      title: "Postal Worker",
      company: "USPS",
      location: "Various Memphis Locations",
      salary: "$19-23/hour",
      type: "Full-time",
      description: "Mail sorting, delivery support, customer service. Federal benefits package.",
      postedDate: "5 days ago",
      includesTransportation: true
    },
    {
      id: "18",
      title: "Construction Laborer",
      company: "Brasfield & Gorrie",
      location: "Memphis Construction Sites",
      salary: "$18-24/hour",
      type: "Full-time",
      description: "General construction work, site preparation, material handling. Safety training provided.",
      postedDate: "1 day ago",
      includesTransportation: false
    },
    {
      id: "19",
      title: "Pharmacy Technician",
      company: "CVS Health",
      location: "Multiple Memphis Locations",
      salary: "$16-19/hour",
      type: "Full-time",
      description: "Prescription processing, customer service, inventory management. Certification assistance.",
      postedDate: "3 days ago",
      includesTransportation: false
    },
    {
      id: "20",
      title: "Data Entry Clerk",
      company: "Baptist Memorial Healthcare",
      location: "East Memphis",
      salary: "$14-17/hour",
      type: "Full-time",
      description: "Medical records data entry, filing, administrative support. Healthcare experience preferred.",
      postedDate: "4 days ago",
      includesTransportation: true
    }
  ];

  const handleApply = (job: Job) => {
    toast({
      title: "Application Started",
      description: `Your application for ${job.title} at ${job.company} has been initiated.`,
    });
  };

  const handleBookRide = (job: Job) => {
    toast({
      title: "Interview Ride Booked",
      description: `Transportation to ${job.company} interview has been requested. You'll receive confirmation shortly.`,
    });
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "all" || job.location === filterLocation;
    const matchesType = filterType === "all" || job.type === filterType;
    return matchesSearch && matchesLocation && matchesType;
  });

  const locations = [...new Set(jobs.map(job => job.location))];
  const types = [...new Set(jobs.map(job => job.type))];

  // Handle job detail view
  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <Button variant="outline" onClick={() => setSelectedJob(null)} className="mb-6">
            ← Back to Job Listings
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{selectedJob.title}</CardTitle>
                  <p className="text-lg text-muted-foreground">{selectedJob.company}</p>
                </div>
                <Badge variant={selectedJob.includesTransportation ? "default" : "secondary"}>
                  {selectedJob.includesTransportation ? "Transport Included" : "Own Transport"}
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
                {selectedJob.shift && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedJob.shift}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{selectedJob.type}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-muted-foreground">{selectedJob.description}</p>
              </div>

              {selectedJob.requirements && (
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.benefits && (
                <div>
                  <h3 className="font-semibold mb-2">Benefits</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.includesTransportation && selectedJob.transportCost && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Transportation Details
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Daily Cost:</strong> {selectedJob.transportCost}
                  </p>
                  {selectedJob.interviewLocation && (
                    <p className="text-sm text-muted-foreground">
                      <strong>Interview Location:</strong> {selectedJob.interviewLocation}
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={() => handleApply(selectedJob)} className="flex-1" size="lg">
                  Apply Now
                </Button>
                {selectedJob.interviewLocation && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleBookRide(selectedJob)}
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    <CalendarDays className="w-4 h-4" />
                    Book Interview Ride
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Find Your Next Job
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover employment opportunities with transportation benefits in your area.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search jobs or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location Filter */}
            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <div className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setFilterLocation("all");
                setFilterType("all");
              }}
              size="sm"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Job Listings */}
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedJob(job)}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-gray-800 mb-2">
                      {job.title}
                    </CardTitle>
                    <p className="text-lg font-semibold text-primary mb-2">
                      {job.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="text-sm">
                      {job.type}
                    </Badge>
                    {job.includesTransportation && (
                      <Badge variant="default" className="bg-green-600 hover:bg-green-700 text-white">
                        <Bus className="w-3 h-3 mr-1" />
                        Transportation
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {/* Job Info */}
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Multiple Openings</span>
                    </div>
                  </div>

                  {/* Transportation Cost */}
                  {job.includesTransportation && job.transportCost && (
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Car className="w-4 h-4" />
                        <span className="font-medium">Transportation: {job.transportCost}</span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Apply Button */}
                  <div className="pt-4 flex gap-2">
                    <Button 
                      className="bg-primary hover:bg-primary/90 flex-1" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(job);
                      }}
                    >
                      <Briefcase className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    {job.interviewLocation && (
                      <Button 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookRide(job);
                        }}
                        className="flex items-center gap-2"
                      >
                        <CalendarDays className="w-4 h-4" />
                        Book Ride
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Don't see the right job for you?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Create a job alert and we'll notify you when new opportunities match your criteria.
          </p>
          <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            Create Job Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimpleJobListings;