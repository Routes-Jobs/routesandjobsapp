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

  // Memphis job listings - 50 current opportunities
  const jobs: Job[] = [
    {
      id: "1",
      title: "Warehouse Associate",
      company: "FedEx Ground - Memphis Hub",
      location: "Memphis International Airport",
      salary: "$18-22/hour",
      type: "Full-time",
      description: "Package handling, sorting, and loading at world's busiest cargo airport. Benefits include health insurance and transportation assistance.",
      postedDate: "1 day ago"
    },
    {
      id: "2",
      title: "Production Worker",
      company: "International Paper",
      location: "Southaven",
      salary: "$19-24/hour",
      type: "Full-time",
      description: "Manufacturing paper products, machine operation, quality control. Comprehensive benefits package.",
      postedDate: "2 days ago"
    },
    {
      id: "3",
      title: "Delivery Driver",
      company: "UPS",
      location: "Midtown Memphis",
      salary: "$21-25/hour",
      type: "Full-time",
      description: "Local package delivery, customer service, vehicle maintenance. Company vehicle provided.",
      postedDate: "1 day ago"
    },
    {
      id: "4",
      title: "Forklift Operator",
      company: "AutoZone Distribution Center",
      location: "Memphis Distribution Center",
      salary: "$17-21/hour",
      type: "Full-time",
      description: "Operate forklifts in automotive parts warehouse. Certification training provided.",
      postedDate: "3 days ago"
    },
    {
      id: "5",
      title: "Hospital Transporter",
      company: "Methodist Le Bonheur Healthcare",
      location: "Downtown Memphis",
      salary: "$15-18/hour",
      type: "Full-time",
      description: "Transport patients and medical equipment throughout hospital campus. Training provided.",
      postedDate: "2 days ago"
    },
    {
      id: "6",
      title: "Food Service Worker",
      company: "Aramark - St. Jude",
      location: "St. Jude Children's Hospital",
      salary: "$14-16/hour",
      type: "Part-time",
      description: "Cafeteria service, food preparation, cleaning. Meaningful work supporting families.",
      postedDate: "1 day ago"
    },
    {
      id: "7",
      title: "Security Guard",
      company: "Allied Universal",
      location: "Various Memphis Locations",
      salary: "$16-19/hour",
      type: "Full-time",
      description: "Property security, access control, incident reporting. Multiple shift options available.",
      postedDate: "2 days ago"
    },
    {
      id: "8",
      title: "Call Center Representative",
      company: "ServiceMaster",
      location: "East Memphis",
      salary: "$15-18/hour",
      type: "Full-time",
      description: "Customer service for restoration services. Training provided, advancement opportunities.",
      postedDate: "4 days ago"
    },
    {
      id: "9",
      title: "Maintenance Technician",
      company: "Walmart Distribution Center",
      location: "Olive Branch, MS",
      salary: "$20-26/hour",
      type: "Full-time",
      description: "Equipment maintenance, troubleshooting, preventive maintenance. Benefits package.",
      postedDate: "3 days ago"
    },
    {
      id: "10",
      title: "School Bus Driver",
      company: "First Student",
      location: "Memphis City Schools",
      salary: "$18-22/hour",
      type: "Part-time",
      description: "Transport students safely. CDL training provided, great benefits for part-time work.",
      postedDate: "1 week ago"
    },
    {
      id: "11",
      title: "Retail Associate",
      company: "Bass Pro Shops - Pyramid",
      location: "Downtown Memphis",
      salary: "$13-16/hour",
      type: "Part-time",
      description: "Customer service, inventory management, sales support. Employee discounts available.",
      postedDate: "2 days ago"
    },
    {
      id: "12",
      title: "Airport Ground Crew",
      company: "Unifi Aviation",
      location: "Memphis International Airport",
      salary: "$16-20/hour",
      type: "Full-time",
      description: "Aircraft loading, baggage handling, ground support equipment operation.",
      postedDate: "1 day ago"
    },
    {
      id: "13",
      title: "Assembly Line Worker",
      company: "Electrolux Home Products",
      location: "Memphis Manufacturing",
      salary: "$17-21/hour",
      type: "Full-time",
      description: "Appliance assembly, quality inspection, packaging. Stable manufacturing environment.",
      postedDate: "3 days ago"
    },
    {
      id: "14",
      title: "Truck Driver - Local",
      company: "Sysco Memphis",
      location: "Memphis Food Distribution",
      salary: "$22-28/hour",
      type: "Full-time",
      description: "Local food service delivery, customer relations. CDL-A required, home daily.",
      postedDate: "2 days ago"
    },
    {
      id: "15",
      title: "Hotel Housekeeper",
      company: "Peabody Memphis",
      location: "Downtown Memphis",
      salary: "$14-17/hour",
      type: "Full-time",
      description: "Luxury hotel room cleaning and maintenance. Benefits and employee rates available.",
      postedDate: "1 day ago"
    },
    {
      id: "16",
      title: "Kitchen Staff",
      company: "Rendezvous Restaurant",
      location: "Downtown Memphis",
      salary: "$15-18/hour",
      type: "Part-time",
      description: "Food preparation, dishwashing, kitchen maintenance. Famous BBQ restaurant experience.",
      postedDate: "2 days ago"
    },
    {
      id: "17",
      title: "Postal Worker",
      company: "USPS",
      location: "Various Memphis Locations",
      salary: "$19-23/hour",
      type: "Full-time",
      description: "Mail sorting, delivery support, customer service. Federal benefits package.",
      postedDate: "5 days ago"
    },
    {
      id: "18",
      title: "Construction Laborer",
      company: "Brasfield & Gorrie",
      location: "Memphis Construction Sites",
      salary: "$18-24/hour",
      type: "Full-time",
      description: "General construction work, site preparation, material handling. Safety training provided.",
      postedDate: "1 day ago"
    },
    {
      id: "19",
      title: "Pharmacy Technician",
      company: "CVS Health",
      location: "Multiple Memphis Locations",
      salary: "$16-19/hour",
      type: "Full-time",
      description: "Prescription processing, customer service, inventory management. Certification assistance.",
      postedDate: "3 days ago"
    },
    {
      id: "20",
      title: "Data Entry Clerk",
      company: "Baptist Memorial Healthcare",
      location: "East Memphis",
      salary: "$14-17/hour",
      type: "Full-time",
      description: "Medical records data entry, filing, administrative support. Healthcare experience preferred.",
      postedDate: "4 days ago"
    },
    {
      id: "21",
      title: "Janitor/Custodian",
      company: "ABM Industries",
      location: "FedEx Corporate Headquarters",
      salary: "$15-18/hour",
      type: "Full-time",
      description: "Office building cleaning, maintenance, restocking supplies. Multiple shift options.",
      postedDate: "2 days ago"
    },
    {
      id: "22",
      title: "Equipment Operator",
      company: "Komatsu America",
      location: "Horn Lake, MS",
      salary: "$21-27/hour",
      type: "Full-time",
      description: "Heavy equipment operation, maintenance support, quality control. Experience preferred.",
      postedDate: "1 week ago"
    },
    {
      id: "23",
      title: "Home Health Aide",
      company: "Visiting Angels",
      location: "Greater Memphis Area",
      salary: "$13-16/hour",
      type: "Part-time",
      description: "In-home care for elderly clients, companionship, light housekeeping. Flexible schedule.",
      postedDate: "1 day ago"
    },
    {
      id: "24",
      title: "Casino Dealer",
      company: "Southland Casino Racing",
      location: "West Memphis, AR",
      salary: "$12-15/hour + tips",
      type: "Part-time",
      description: "Table games dealing, customer service, cash handling. Training provided.",
      postedDate: "3 days ago"
    },
    {
      id: "25",
      title: "Shipping Clerk",
      company: "Nike Distribution Center",
      location: "Memphis Distribution",
      salary: "$16-20/hour",
      type: "Full-time",
      description: "Order processing, packaging, inventory tracking. Athletic wear discounts available.",
      postedDate: "2 days ago"
    },
    {
      id: "26",
      title: "Medical Assistant",
      company: "Methodist Medical Group",
      location: "Germantown",
      salary: "$17-21/hour",
      type: "Full-time",
      description: "Patient care support, administrative duties, medical records. Healthcare benefits.",
      postedDate: "4 days ago"
    },
    {
      id: "27",
      title: "Restaurant Server",
      company: "Gus's World Famous Fried Chicken",
      location: "Downtown Memphis",
      salary: "$12-15/hour + tips",
      type: "Part-time",
      description: "Customer service, order taking, food service. Tips typically $15-25/hour additional.",
      postedDate: "1 day ago"
    },
    {
      id: "28",
      title: "Landscaping Worker",
      company: "BrightView Landscapes",
      location: "East Memphis",
      salary: "$15-19/hour",
      type: "Full-time",
      description: "Lawn maintenance, planting, irrigation. Outdoor work, seasonal overtime opportunities.",
      postedDate: "2 days ago"
    },
    {
      id: "29",
      title: "Bank Teller",
      company: "First Horizon Bank",
      location: "Multiple Memphis Branches",
      salary: "$16-19/hour",
      type: "Full-time",
      description: "Customer transactions, account services, cash handling. Banking industry growth potential.",
      postedDate: "1 week ago"
    },
    {
      id: "30",
      title: "Auto Parts Counter",
      company: "O'Reilly Auto Parts",
      location: "Various Memphis Locations",
      salary: "$14-18/hour",
      type: "Full-time",
      description: "Customer service, parts lookup, inventory management. Automotive knowledge helpful.",
      postedDate: "3 days ago"
    },
    {
      id: "31",
      title: "Childcare Worker",
      company: "Kindercare Learning Centers",
      location: "Cordova",
      salary: "$13-16/hour",
      type: "Full-time",
      description: "Childcare supervision, educational activities, safety monitoring. Background check required.",
      postedDate: "2 days ago"
    },
    {
      id: "32",
      title: "Telecommunications Installer",
      company: "Comcast Xfinity",
      location: "Greater Memphis Area",
      salary: "$20-26/hour",
      type: "Full-time",
      description: "Cable/internet installation, customer service, equipment maintenance. Company vehicle provided.",
      postedDate: "5 days ago"
    },
    {
      id: "33",
      title: "Pet Groomer Assistant",
      company: "PetSmart",
      location: "Wolfchase Galleria",
      salary: "$12-15/hour",
      type: "Part-time",
      description: "Pet bathing, grooming assistance, customer service. Training provided, animal lovers welcome.",
      postedDate: "1 day ago"
    },
    {
      id: "34",
      title: "Property Maintenance",
      company: "MAA Apartment Communities",
      location: "Multiple Memphis Properties",
      salary: "$17-22/hour",
      type: "Full-time",
      description: "Apartment maintenance, HVAC, plumbing, electrical. On-call rotation, stable housing industry.",
      postedDate: "4 days ago"
    },
    {
      id: "35",
      title: "Laboratory Technician",
      company: "Quest Diagnostics",
      location: "East Memphis",
      salary: "$18-22/hour",
      type: "Full-time",
      description: "Sample processing, laboratory testing, quality control. Medical field experience preferred.",
      postedDate: "1 week ago"
    },
    {
      id: "36",
      title: "Fitness Instructor",
      company: "YMCA of Memphis",
      location: "Multiple Locations",
      salary: "$15-20/hour",
      type: "Part-time",
      description: "Group fitness classes, member interaction, equipment maintenance. Certification assistance available.",
      postedDate: "3 days ago"
    },
    {
      id: "37",
      title: "Event Staff",
      company: "FedExForum",
      location: "Downtown Memphis",
      salary: "$14-18/hour",
      type: "Part-time",
      description: "Event setup, crowd control, customer service during Grizzlies games and concerts.",
      postedDate: "2 days ago"
    },
    {
      id: "38",
      title: "Dispatcher",
      company: "Yellow Cab Memphis",
      location: "Midtown Memphis",
      salary: "$16-19/hour",
      type: "Full-time",
      description: "Taxi dispatch, customer service, radio communication. Computer skills required.",
      postedDate: "4 days ago"
    },
    {
      id: "39",
      title: "Inventory Specialist",
      company: "Target Distribution Center",
      location: "Memphis Distribution",
      salary: "$17-21/hour",
      type: "Full-time",
      description: "Inventory tracking, cycle counting, data entry. Employee discounts and benefits.",
      postedDate: "1 day ago"
    },
    {
      id: "40",
      title: "Automotive Technician",
      company: "Jiffy Lube",
      location: "Multiple Memphis Locations",
      salary: "$16-22/hour",
      type: "Full-time",
      description: "Oil changes, basic maintenance, customer service. Automotive training provided.",
      postedDate: "3 days ago"
    },
    {
      id: "41",
      title: "Social Media Coordinator",
      company: "St. Jude Children's Hospital",
      location: "Downtown Memphis",
      salary: "$18-24/hour",
      type: "Full-time",
      description: "Content creation, social media management, community engagement. Marketing experience preferred.",
      postedDate: "1 week ago"
    },
    {
      id: "42",
      title: "Quality Inspector",
      company: "Smith & Nephew",
      location: "Bartlett",
      salary: "$19-25/hour",
      type: "Full-time",
      description: "Medical device inspection, documentation, compliance checking. Attention to detail critical.",
      postedDate: "2 days ago"
    },
    {
      id: "43",
      title: "Food Truck Operator",
      company: "Memphis Food Truck Association",
      location: "Various Memphis Events",
      salary: "$15-20/hour",
      type: "Part-time",
      description: "Mobile food service, event setup, customer service. Weekend and evening availability.",
      postedDate: "1 day ago"
    },
    {
      id: "44",
      title: "Package Handler",
      company: "DHL Express",
      location: "Memphis International Airport",
      salary: "$16-20/hour",
      type: "Part-time",
      description: "Overnight package sorting, loading, scanning. Flexible part-time hours, student-friendly.",
      postedDate: "2 days ago"
    },
    {
      id: "45",
      title: "Receptionist",
      company: "Memphis Veterinary Specialists",
      location: "Cordova",
      salary: "$14-17/hour",
      type: "Full-time",
      description: "Front desk operations, appointment scheduling, client communication. Animal hospital environment.",
      postedDate: "4 days ago"
    },
    {
      id: "46",
      title: "Delivery Driver - Food",
      company: "DoorDash/Uber Eats",
      location: "Memphis Metro Area",
      salary: "$15-25/hour with tips",
      type: "Part-time",
      description: "Food delivery service, flexible scheduling, use your own vehicle. Evening and weekend peak hours.",
      postedDate: "1 day ago"
    },
    {
      id: "47",
      title: "Library Assistant",
      company: "Memphis Public Library",
      location: "Central Library Downtown",
      salary: "$13-16/hour",
      type: "Part-time",
      description: "Book shelving, customer assistance, program support. Public service experience helpful.",
      postedDate: "1 week ago"
    },
    {
      id: "48",
      title: "Airport Security",
      company: "TSA",
      location: "Memphis International Airport",
      salary: "$18-22/hour",
      type: "Full-time",
      description: "Passenger screening, security checkpoint operations, federal employment benefits.",
      postedDate: "5 days ago"
    },
    {
      id: "49",
      title: "Bakery Assistant",
      company: "Gibson's Donuts",
      location: "Midtown Memphis",
      salary: "$13-16/hour",
      type: "Part-time",
      description: "Donut preparation, customer service, early morning hours. Memphis institution since 1967.",
      postedDate: "2 days ago"
    },
    {
      id: "50",
      title: "Parking Attendant",
      company: "Standard Parking",
      location: "Downtown Memphis",
      salary: "$14-17/hour",
      type: "Full-time",
      description: "Parking facility operations, customer service, cash handling. Medical district location.",
      postedDate: "3 days ago"
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