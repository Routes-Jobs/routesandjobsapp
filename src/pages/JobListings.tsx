import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, DollarSign, Users, Search, Briefcase, ArrowLeft, Building, Heart, Star, Zap, Sparkles } from "lucide-react";
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
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  // Enhanced job data with personality and variety 🚀
  const jobs: Job[] = [
    {
      id: "1",
      title: "Warehouse Superhero 📦",
      company: "FlashLogistics",
      location: "Industrial District",
      salary: "$18-22/hour",
      type: "Full-time",
      shift: "First Shift (6 AM - 2 PM)",
      description: "Be the hero our warehouse needs! Handle packages like a pro, manage inventory with precision, and ensure quality that makes customers smile. Join our energetic team where every day brings new challenges and growth opportunities! 🌟",
      requirements: ["High school diploma", "Ability to lift 50 lbs", "Previous warehouse experience preferred", "Positive team spirit"],
      benefits: ["Health insurance", "Paid time off", "Free transportation 🚌", "401k matching", "Monthly team bonuses"],
      postedDate: "2024-01-15",
      transportProvided: true,
      category: "Warehouse & Logistics"
    },
    {
      id: "2",
      title: "Construction Champion 🏗️",
      company: "SkyBuilder Inc",
      location: "Downtown Construction Site",
      salary: "$22-28/hour",
      type: "Full-time",
      shift: "First Shift (7 AM - 3 PM)",
      description: "Build the future, literally! Work on cutting-edge projects that shape our skyline. From site prep to final touches, you'll be part of something amazing. Safety first, teamwork always! 💪",
      requirements: ["Construction experience", "Safety certification preferred", "Physical fitness", "Can-do attitude"],
      benefits: ["Top-tier pay", "Safety gear provided", "Skills training", "Overtime opportunities", "Free rides to site"],
      postedDate: "2024-01-14",
      transportProvided: true,
      category: "Construction"
    },
    {
      id: "3",
      title: "Manufacturing Maestro ⚙️",
      company: "TechCraft Industries",
      location: "East Industrial Park",
      salary: "$19-25/hour",
      type: "Full-time",
      shift: "Second Shift (2 PM - 10 PM)",
      description: "Master the machines that create tomorrow's technology! Quality control, precision operation, and innovation are your tools. Join a company that's revolutionizing manufacturing with cutting-edge tech! 🔧",
      requirements: ["Mechanical aptitude", "Eye for detail", "Shift flexibility", "Growth mindset"],
      benefits: ["401k matching", "Premium health benefits", "Shift bonuses", "Free transportation", "Career ladder program"],
      postedDate: "2024-01-13",
      transportProvided: true,
      category: "Manufacturing"
    },
    {
      id: "4",
      title: "Road Warrior Driver 🚚",
      company: "SwiftRoads LLC",
      location: "Multiple Routes",
      salary: "$18-23/hour + tips",
      type: "Full-time",
      shift: "Flexible Schedule",
      description: "Hit the road and deliver smiles! Navigate local routes with your company vehicle while providing awesome customer service. Every delivery is an opportunity to brighten someone's day! 🌈",
      requirements: ["Valid driver's license", "Clean driving record", "Customer service skills", "GPS navigation skills"],
      benefits: ["Flexible hours", "Company vehicle & fuel", "Gas reimbursement", "Performance bonuses", "Route choice"],
      postedDate: "2024-01-12",
      transportProvided: false,
      category: "Transportation"
    },
    {
      id: "5",
      title: "Retail Experience Creator 🛍️",
      company: "TrendMart Plus",
      location: "Shopping Center East",
      salary: "$15-19/hour",
      type: "Part-time",
      shift: "Various Shifts Available",
      description: "Create amazing shopping experiences! Help customers discover products they'll love, process transactions with a smile, and keep our store looking fantastic. Your personality makes the difference! ✨",
      requirements: ["Customer service passion", "Basic math skills", "Schedule flexibility", "Positive energy"],
      benefits: ["40% employee discount", "Flexible scheduling", "Comprehensive training", "Management track available"],
      postedDate: "2024-01-11",
      transportProvided: true,
      category: "Retail"
    },
    {
      id: "6",
      title: "Culinary Craft Artist 👨‍🍳",
      company: "FreshBites Catering",
      location: "Corporate Kitchen",
      salary: "$16-20/hour",
      type: "Full-time",
      shift: "Morning Shift (5 AM - 1 PM)",
      description: "Craft delicious, healthy meals that fuel local businesses! From prep to presentation, you'll be part of a team that takes pride in nourishing our community. Early bird gets the best shifts! 🌅",
      requirements: ["Food handler's permit", "Kitchen experience preferred", "Early morning availability", "Team collaboration"],
      benefits: ["Free gourmet meals", "Health insurance", "Paid culinary training", "Transportation provided"],
      postedDate: "2024-01-10",
      transportProvided: true,
      category: "Food Service"
    },
    {
      id: "7",
      title: "Healthcare Hero Support 🏥",
      company: "CarePlus Medical",
      location: "Medical Center North",
      salary: "$17-21/hour",
      type: "Full-time",
      shift: "Day Shift (8 AM - 4 PM)",
      description: "Support healthcare heroes while making a real difference in patients' lives! Handle administrative tasks, assist with patient flow, and be the friendly face that brings comfort during tough times. 💙",
      requirements: ["High school diploma", "Customer service experience", "HIPAA training provided", "Compassionate nature"],
      benefits: ["Excellent health coverage", "Paid certifications", "Career advancement", "Free parking & transport"],
      postedDate: "2024-01-09",
      transportProvided: true,
      category: "Healthcare Support"
    },
    {
      id: "8",
      title: "Tech Support Wizard 💻",
      company: "DigitalFix Solutions",
      location: "Tech Hub Downtown",
      salary: "$19-24/hour",
      type: "Full-time",
      shift: "Flexible Hours",
      description: "Be the tech hero people call when things go wrong! Troubleshoot, problem-solve, and save the day with your technical skills. Remote work options available for the right candidate! 🧙‍♂️",
      requirements: ["Basic computer skills", "Problem-solving mindset", "Patience with customers", "Willingness to learn"],
      benefits: ["Remote work options", "Tech training budget", "Flexible hours", "Growth opportunities"],
      postedDate: "2024-01-08",
      transportProvided: false,
      category: "Technology"
    },
    {
      id: "9",
      title: "Customer Joy Specialist 😊",
      company: "HappyService Co",
      location: "Call Center Plaza",
      salary: "$16-20/hour",
      type: "Full-time",
      shift: "Multiple Shifts",
      description: "Turn customer concerns into customer celebrations! Use your communication superpowers to solve problems, answer questions, and leave every customer happier than when they called. 📞",
      requirements: ["Excellent communication", "Problem-solving skills", "Positive attitude", "Basic computer skills"],
      benefits: ["Performance bonuses", "Paid training", "Career progression", "Comfortable work environment"],
      postedDate: "2024-01-07",
      transportProvided: true,
      category: "Customer Service"
    },
    {
      id: "10",
      title: "Green Thumb Specialist 🌱",
      company: "EcoGarden Works",
      location: "Multiple Garden Sites",
      salary: "$17-22/hour",
      type: "Full-time",
      shift: "Day Shift (7 AM - 3 PM)",
      description: "Make the world greener, one garden at a time! Plant, maintain, and nurture beautiful landscapes that bring joy to communities. Perfect for nature lovers who want meaningful work! 🌿",
      requirements: ["Outdoor work comfort", "Physical fitness", "Attention to detail", "Plant knowledge helpful"],
      benefits: ["Outdoor work environment", "Seasonal bonuses", "Equipment provided", "Skills training"],
      postedDate: "2024-01-06",
      transportProvided: true,
      category: "Landscaping"
    },
    {
      id: "11",
      title: "Security Guardian 🛡️",
      company: "SafeWatch Security",
      location: "Various Locations",
      salary: "$18-23/hour",
      type: "Full-time",
      shift: "Night Shift (10 PM - 6 AM)",
      description: "Be the guardian that keeps everyone safe! Monitor premises, conduct patrols, and ensure security protocols are followed. Night owls welcome - premium pay for overnight shifts! 🦉",
      requirements: ["Security license (training provided)", "Clean background check", "Reliable attendance", "Alert mindset"],
      benefits: ["Night shift premium", "Uniform provided", "Training certification", "Advancement opportunities"],
      postedDate: "2024-01-05",
      transportProvided: true,
      category: "Security"
    },
    {
      id: "12",
      title: "Event Setup Dynamo 🎪",
      company: "PartyPro Events",
      location: "Multiple Event Venues",
      salary: "$16-21/hour",
      type: "Part-time",
      shift: "Weekend Focus",
      description: "Create magical moments! Set up stunning events, from corporate meetings to weddings. Every event is a new adventure, and you'll be the behind-the-scenes hero making dreams come true! ✨",
      requirements: ["Physical fitness", "Attention to detail", "Weekend availability", "Team player attitude"],
      benefits: ["Flexible weekend work", "Event variety", "Tips opportunities", "Creative environment"],
      postedDate: "2024-01-04",
      transportProvided: true,
      category: "Events & Hospitality"
    },
    {
      id: "13",
      title: "Automotive Care Specialist 🚗",
      company: "SpeedyFix Auto",
      location: "Auto Service Center",
      salary: "$19-26/hour",
      type: "Full-time",
      shift: "Day Shift (8 AM - 5 PM)",
      description: "Keep wheels turning and customers smiling! Perform oil changes, basic maintenance, and vehicle inspections. Learn valuable automotive skills while earning great pay! 🔧",
      requirements: ["Mechanical interest", "Physical ability", "Learning mindset", "Customer service skills"],
      benefits: ["Technical training", "Tool allowance", "Performance bonuses", "Career advancement"],
      postedDate: "2024-01-03",
      transportProvided: true,
      category: "Automotive"
    },
    {
      id: "14",
      title: "Fitness Motivation Coach 💪",
      company: "ActiveLife Gym",
      location: "Fitness Center West",
      salary: "$17-22/hour",
      type: "Part-time",
      shift: "Evening & Weekends",
      description: "Inspire others to reach their fitness goals! Help with equipment, provide encouragement, and maintain a clean, motivating environment. Perfect for fitness enthusiasts who love helping others! 🏋️‍♀️",
      requirements: ["Fitness passion", "Positive energy", "Evening/weekend availability", "Basic fitness knowledge"],
      benefits: ["Free gym membership", "Flexible hours", "Fitness training", "Health-focused environment"],
      postedDate: "2024-01-02",
      transportProvided: false,
      category: "Fitness & Wellness"
    },
    {
      id: "15",
      title: "Package Sorting Specialist 📮",
      company: "QuickSort Logistics",
      location: "Distribution Center",
      salary: "$16-20/hour",
      type: "Full-time",
      shift: "Early Morning (4 AM - 12 PM)",
      description: "Be the first link in the delivery chain! Sort packages efficiently, ensure accurate routing, and help connect people to what they need. Early birds earn premium pay! 📦",
      requirements: ["Attention to detail", "Physical stamina", "Early morning availability", "Team cooperation"],
      benefits: ["Early shift premium", "Health benefits", "Paid breaks", "Advancement track"],
      postedDate: "2024-01-01",
      transportProvided: true,
      category: "Logistics & Shipping"
    }
  ];

  const categories = [...new Set(jobs.map(job => job.category))];
  const locations = [...new Set(jobs.map(job => job.location))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation && filterLocation !== "all" ? job.location.includes(filterLocation) : true;
    const matchesType = filterType && filterType !== "all" ? job.type === filterType : true;
    const matchesCategory = filterCategory && filterCategory !== "all" ? job.category === filterCategory : true;
    return matchesSearch && matchesLocation && matchesType && matchesCategory;
  });

  const handleApply = (job: Job) => {
    toast({
      title: "🎉 Application Started!",
      description: `Your application for ${job.title} at ${job.company} is processing. We'll connect you with the employer!`,
    });
  };

  const handleSaveJob = (jobId: string, jobTitle: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (savedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      toast({
        title: "💔 Job Unsaved",
        description: `Removed ${jobTitle} from your saved jobs.`,
      });
    } else {
      newSavedJobs.add(jobId);
      toast({
        title: "💖 Job Saved!",
        description: `Added ${jobTitle} to your saved jobs list!`,
      });
    }
    setSavedJobs(newSavedJobs);
  };

  const handleQuickApply = (job: Job) => {
    toast({
      title: "⚡ Quick Apply Success!",
      description: `Lightning-fast application sent for ${job.title}! Expect a response within 24 hours.`,
    });
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Featured jobs (first 3 with transport)
  const featuredJobs = jobs.filter(job => job.transportProvided).slice(0, 3);

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

              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => handleApply(selectedJob)} 
                  variant="gradient" 
                  className="flex-1" 
                  size="lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
                <Button 
                  variant="save" 
                  onClick={() => handleSaveJob(selectedJob.id, selectedJob.title)}
                  size="lg"
                  className={savedJobs.has(selectedJob.id) ? "border-accent text-accent" : ""}
                >
                  <Heart className={`w-4 h-4 ${savedJobs.has(selectedJob.id) ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" onClick={handleBackToHome}>
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
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Find Your Dream Job
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            🚀 Discover amazing local opportunities with reliable transportation! 
            Join companies that truly care about your success and getting you to work safely.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent" />
              <span>Quick Apply Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-secondary" />
              <span>Save Jobs You Love</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              <span>Featured Employers</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Featured Jobs Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">⭐ Featured Opportunities</h2>
            <Badge variant="gradientAccent" className="ml-2">HOT 🔥</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-pointer group" onClick={() => setSelectedJob(job)}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors">{job.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {job.company}
                      </p>
                    </div>
                    <Badge variant="default" className="shrink-0">🚌 Transport</Badge>
                  </div>
                  <div className="space-y-2 text-xs mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-accent" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-secondary" />
                      <span>{job.shift}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="apply" 
                      size="sm" 
                      className="flex-1"
                      onClick={(e) => { e.stopPropagation(); handleQuickApply(job); }}
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Quick Apply
                    </Button>
                    <Button 
                      variant="save" 
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleSaveJob(job.id, job.title); }}
                      className={savedJobs.has(job.id) ? "border-accent text-accent" : ""}
                    >
                      <Heart className={`w-3 h-3 ${savedJobs.has(job.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Filters */}
        <Card className="border-2 border-muted/50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <span>🔍 Smart Job Search</span>
            </CardTitle>
            <CardDescription>
              Find your perfect match with our intelligent filtering system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Jobs</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Job title, company, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 border-2 border-muted focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="border-2 border-muted focus:border-primary">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">🌟 All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="border-2 border-muted focus:border-primary">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">📍 All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Job Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-2 border-muted focus:border-primary">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">⏰ All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {(searchTerm || (filterCategory && filterCategory !== "all") || (filterLocation && filterLocation !== "all") || (filterType && filterType !== "all")) && (
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterLocation("all");
                    setFilterType("all");
                    setFilterCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Job Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="text-4xl font-bold text-primary mb-2">{filteredJobs.length}</div>
            <p className="text-sm text-muted-foreground font-medium">Available Jobs 💼</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <div className="text-4xl font-bold text-secondary mb-2">{jobs.filter(j => j.transportProvided).length}</div>
            <p className="text-sm text-muted-foreground font-medium">With Transport 🚌</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <div className="text-4xl font-bold text-accent mb-2">{categories.length}</div>
            <p className="text-sm text-muted-foreground font-medium">Categories 📋</p>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-muted/5 to-muted/10 border-muted/20">
            <div className="text-4xl font-bold text-primary mb-2">{savedJobs.size}</div>
            <p className="text-sm text-muted-foreground font-medium">Saved Jobs 💖</p>
          </Card>
        </div>

        {/* Enhanced Job Listings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              All Job Opportunities
            </h2>
            <div className="text-sm text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </div>
          </div>
          
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card 
                key={job.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-primary/30 hover:border-l-primary group"
                onClick={() => setSelectedJob(job)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl group-hover:text-primary transition-colors mb-1">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground flex items-center gap-2 text-lg">
                        <Building className="w-5 h-5" />
                        <span className="font-medium">{job.company}</span>
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {job.transportProvided && (
                        <Badge variant="default" className="bg-secondary hover:bg-secondary/90">
                          🚌 Transport
                        </Badge>
                      )}
                      <Badge variant="outline" className="border-2">
                        {job.type}
                      </Badge>
                      <Badge variant="secondary" className="font-medium">
                        {job.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-accent" />
                      <span className="font-bold text-accent">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span>{job.shift}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Multiple Openings</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                    {job.description}
                  </p>
                  
                  <div className="flex gap-3 pt-2">
                    <Button 
                      variant="apply"
                      onClick={(e) => { e.stopPropagation(); handleApply(job); }}
                      className="flex-1"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                    <Button 
                      variant="gradient"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); handleQuickApply(job); }}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Quick Apply
                    </Button>
                    <Button 
                      variant="save"
                      onClick={(e) => { e.stopPropagation(); handleSaveJob(job.id, job.title); }}
                      className={savedJobs.has(job.id) ? "border-accent text-accent bg-accent/5" : ""}
                    >
                      <Heart className={`w-4 h-4 ${savedJobs.has(job.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredJobs.length === 0 && (
          <Card className="border-2 border-dashed border-muted">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-muted/30 rounded-full flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">🔍 No Jobs Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms to discover more opportunities!
              </p>
              <Button 
                variant="gradientAccent" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterLocation("all");
                  setFilterType("all");
                  setFilterCategory("all");
                }}
                className="px-8"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Show All Jobs
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default JobListingsPage;