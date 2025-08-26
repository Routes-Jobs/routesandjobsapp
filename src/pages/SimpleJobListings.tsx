import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Search, Briefcase } from "lucide-react";
import Header from "@/components/Header";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedDate: string;
}

const SimpleJobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Simple job data
  const jobs: Job[] = [
    {
      id: "1",
      title: "Warehouse Associate",
      company: "FlashLogistics",
      location: "Industrial District",
      salary: "$18-22/hour",
      type: "Full-time",
      description: "Handle packages, manage inventory, and ensure quality operations. Transportation provided.",
      postedDate: "2 days ago"
    },
    {
      id: "2", 
      title: "Production Worker",
      company: "SteelWorks Manufacturing",
      location: "East Industrial Park",
      salary: "$16-20/hour",
      type: "Full-time",
      description: "Operate machinery, quality control, and assembly line work. Great benefits package.",
      postedDate: "3 days ago"
    },
    {
      id: "3",
      title: "Delivery Driver",
      company: "Swift Delivery Co",
      location: "Downtown Area", 
      salary: "$15-18/hour + tips",
      type: "Part-time",
      description: "Local delivery routes, customer service, and vehicle maintenance. Flexible scheduling.",
      postedDate: "1 day ago"
    },
    {
      id: "4",
      title: "Forklift Operator",
      company: "Distribution Plus",
      location: "Industrial District",
      salary: "$19-24/hour",
      type: "Full-time", 
      description: "Operate forklifts, manage warehouse operations. Certification provided if needed.",
      postedDate: "4 days ago"
    },
    {
      id: "5",
      title: "Assembly Technician",
      company: "TechBuild Solutions",
      location: "East Industrial Park",
      salary: "$17-21/hour",
      type: "Full-time",
      description: "Electronic assembly, quality testing, and technical documentation. Training provided.",
      postedDate: "1 week ago"
    },
    {
      id: "6",
      title: "Customer Service Rep",
      company: "CallCenter Pro",
      location: "Downtown Area",
      salary: "$14-17/hour",
      type: "Part-time",
      description: "Handle customer inquiries, process orders, and provide support via phone and chat.",
      postedDate: "5 days ago"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === "all" || job.location === filterLocation;
    const matchesType = filterType === "all" || job.type === filterType;
    return matchesSearch && matchesLocation && matchesType;
  });

  const locations = [...new Set(jobs.map(job => job.location))];
  const types = [...new Set(jobs.map(job => job.type))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-12">
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
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl text-gray-800 mb-2">
                      {job.title}
                    </CardTitle>
                    <p className="text-lg font-semibold text-primary mb-2">
                      {job.company}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {job.type}
                  </Badge>
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
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Apply Button */}
                  <div className="pt-4">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
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