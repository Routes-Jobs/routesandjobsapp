import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Route, Calendar, TrendingUp, MapPin, Clock, Target, Brain, BarChart3, AlertCircle, CheckCircle, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmployerJobManagement from "@/components/EmployerJobManagement";
import MapView from "@/components/MapView";
import EmployerPricingCalendar from "@/components/EmployerPricingCalendar";
import arkLogo from "@/assets/ark-logo.png";

interface EmployerFlowProps {
  onBack: () => void;
}

const EmployerFlow = ({ onBack }: EmployerFlowProps) => {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const { toast } = useToast();

  const handleManageRoute = (routeId: string) => {
    setSelectedRoute(routeId);
    toast({
      title: "Route Management",
      description: "Opening route management panel...",
    });
  };

  // Mock data for demonstration
  const routes = [
    {
      id: "route-1",
      name: "Industrial District Route",
      employees: 12,
      pickupHubs: ["Midtown Hub", "Downtown Hub", "East Memphis Hub"],
      destination: "Manufacturing Plant A",
      nextPickup: "6:00 AM",
      status: "active"
    },
    {
      id: "route-2", 
      name: "Warehouse District Route",
      employees: 8,
      pickupHubs: ["South Memphis Hub", "Airport Hub"],
      destination: "Logistics Center B",
      nextPickup: "2:00 PM",
      status: "active"
    }
  ];

  const employees = [
    { name: "Marcus Johnson", route: "Industrial District", shift: "First", status: "Scheduled" },
    { name: "Sarah Williams", route: "Industrial District", shift: "First", status: "En Route" },
    { name: "David Brown", route: "Warehouse District", shift: "Second", status: "Completed" },
    { name: "Lisa Garcia", route: "Industrial District", shift: "First", status: "Scheduled" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground p-4">
        <div className="max-w-6xl mx-auto">
          {/* Mobile-optimized header layout */}
          <div className="flex items-center gap-3 mb-2 md:mb-0">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-secondary-foreground hover:bg-secondary-foreground/10 flex-shrink-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <img 
              src={arkLogo} 
              alt="ARK - Attendance. Retention. Key Performance." 
              className="h-8 md:h-12 w-auto flex-shrink-0"
            />
          </div>
          <div className="ml-0 md:ml-auto">
            <h1 className="text-xl md:text-2xl font-bold">Employer Dashboard</h1>
            <p className="text-secondary-foreground/80 text-sm md:text-base">Workforce Transportation & Analytics</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <Tabs defaultValue="dashboard" className="space-y-4 md:space-y-6">
          {/* Mobile-friendly tabs - scrollable on small screens */}
          <div className="w-full overflow-x-auto">
            <TabsList className="inline-flex h-12 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground w-full">
              <TabsTrigger value="dashboard" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="routing" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Smart Routing
              </TabsTrigger>
              <TabsTrigger value="ark" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                ARK Tracking
              </TabsTrigger>
              <TabsTrigger value="ai-matching" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                AI Matching
              </TabsTrigger>
              <TabsTrigger value="jobs" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Jobs
              </TabsTrigger>
              <TabsTrigger value="insights" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Insights
              </TabsTrigger>
              <TabsTrigger value="pricing" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Pricing
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-4 md:space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <Card>
                <CardHeader className="pb-2 md:pb-3">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Active Employees</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl md:text-2xl font-bold">20</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 md:pb-3">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Active Routes</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl md:text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Both operational</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 md:pb-3">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">On-Time Rate</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl md:text-2xl font-bold text-green-600">98%</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2 md:pb-3">
                  <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Monthly Savings</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xl md:text-2xl font-bold text-primary">$2,400</div>
                  <p className="text-xs text-muted-foreground">vs. individual rides</p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Transportation Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                    <div>
                      <p className="font-medium">First Shift Pickup</p>
                      <p className="text-sm text-muted-foreground">Industrial District Route • 12 employees</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">6:00 AM</Badge>
                      <p className="text-sm text-muted-foreground mt-1">In Progress</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                    <div>
                      <p className="font-medium">Second Shift Pickup</p>
                      <p className="text-sm text-muted-foreground">Warehouse District Route • 8 employees</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">2:00 PM</Badge>
                      <p className="text-sm text-muted-foreground mt-1">Scheduled</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Routes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5" />
                  Transportation Routes
                </CardTitle>
                <CardDescription>
                  Manage and monitor active transportation routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {routes.map((route) => (
                    <Card key={route.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Route className="w-5 h-5" />
                            {route.name}
                          </CardTitle>
                          <Badge variant={route.status === "active" ? "default" : "secondary"}>
                            {route.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          {route.employees} employees • Next pickup: {route.nextPickup}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Pickup Hubs:</p>
                          <div className="flex flex-wrap gap-2">
                            {route.pickupHubs.map((hub, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {hub}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          Destination: {route.destination}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleManageRoute(route.id)}
                        >
                          Manage Route
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Employees Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Employee Transportation Status
                </CardTitle>
                <CardDescription>
                  Track your workforce transportation in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employees.map((employee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {employee.route} • {employee.shift} Shift
                        </p>
                      </div>
                      <Badge 
                        variant={
                          employee.status === "Completed" ? "default" :
                          employee.status === "En Route" ? "secondary" : 
                          "outline"
                        }
                      >
                        {employee.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Route Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Job Locations & Pickup Hubs Map
                </CardTitle>
                <CardDescription>
                  View job sites and employee pickup locations in Memphis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MapView
                  locations={[
                    { id: "job1", name: "Manufacturing Plant A", coordinates: [-90.0490, 35.1495], type: "job" },
                    { id: "job2", name: "Logistics Center B", coordinates: [-90.0711, 35.1174], type: "job" },
                    { id: "pickup1", name: "Midtown Hub", coordinates: [-90.0490, 35.1395], type: "pickup", status: "active" },
                    { id: "pickup2", name: "Downtown Hub", coordinates: [-90.0490, 35.1595], type: "pickup", status: "scheduled" },
                    { id: "pickup3", name: "East Memphis Hub", coordinates: [-89.8711, 35.1174], type: "pickup", status: "scheduled" },
                    { id: "pickup4", name: "South Memphis Hub", coordinates: [-90.0490, 35.0895], type: "pickup", status: "active" },
                    { id: "pickup5", name: "Airport Hub", coordinates: [-89.9711, 35.0428], type: "pickup", status: "scheduled" }
                  ]}
                  height="400px"
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Smart Job Routing Dashboard */}
          <TabsContent value="routing" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5" />
                  Smart Job Routing Dashboard
                </CardTitle>
                <CardDescription>View workers near your job locations with available transportation routes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Job Posting with Nearby Workers */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Active Job: Warehouse Associate</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="font-medium">Job Location: Memphis Industrial District</span>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="font-semibold text-green-800 mb-2">23 Workers Nearby</p>
                        <p className="text-sm text-green-700">Within 5 miles with active routes available</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Available Transportation Routes:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-secondary/10 rounded">
                          <span className="text-sm">Route A: Midtown → Industrial</span>
                          <Badge variant="default">8 seats</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary/10 rounded">
                          <span className="text-sm">Route B: Downtown → Industrial</span>
                          <Badge variant="default">5 seats</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-secondary/10 rounded">
                          <span className="text-sm">Route C: East Memphis → Industrial</span>
                          <Badge variant="default">10 seats</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Workers by Location */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-base">Worker Availability by Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { zone: "Midtown", workers: 8, avgCommute: "12 min", routes: 2 },
                        { zone: "Downtown", workers: 5, avgCommute: "15 min", routes: 1 },
                        { zone: "East Memphis", workers: 10, avgCommute: "18 min", routes: 2 },
                      ].map((area) => (
                        <div key={area.zone} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{area.zone}</p>
                            <p className="text-sm text-muted-foreground">{area.workers} available workers</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{area.avgCommute}</p>
                            <p className="text-xs text-muted-foreground">{area.routes} active routes</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ARK Tracking System */}
          <TabsContent value="ark" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Attendance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">97.8%</div>
                  <p className="text-sm text-blue-700 mt-1">Last 30 days</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    Retention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">92%</div>
                  <p className="text-sm text-green-700 mt-1">90-day retention rate</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900">8.7/10</div>
                  <p className="text-sm text-purple-700 mt-1">Average KPI score</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  ARK System - Workforce Stability Metrics
                </CardTitle>
                <CardDescription>Track attendance, retention, and key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Route Performance Analysis */}
                <div>
                  <h3 className="font-semibold mb-4">Route Performance Analysis</h3>
                  <div className="space-y-3">
                    {[
                      { route: "Industrial District Route", attendance: 98, onTime: 96, satisfaction: 9.2, risk: "low" },
                      { route: "Warehouse District Route", attendance: 95, onTime: 94, satisfaction: 8.5, risk: "low" },
                      { route: "South Memphis Route", attendance: 92, onTime: 88, satisfaction: 7.8, risk: "medium" },
                    ].map((route) => (
                      <Card key={route.route} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{route.route}</h4>
                            <Badge variant={route.risk === "low" ? "default" : "secondary"}>
                              {route.risk === "low" ? "Low Risk" : "Medium Risk"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Attendance</p>
                              <p className="font-semibold text-lg">{route.attendance}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">On-Time</p>
                              <p className="font-semibold text-lg">{route.onTime}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Satisfaction</p>
                              <p className="font-semibold text-lg">{route.satisfaction}/10</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Pattern Insights */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      Pattern Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                      <p>South Memphis route shows 12% tardiness rate on Mondays - consider earlier pickup times</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                      <p>Industrial District route has 98% attendance - best performing route for 6 weeks</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                      <p>Weather delays increased by 8% during winter months on outer routes</p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Workforce Matching */}
          <TabsContent value="ai-matching" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Workforce Matching
                </CardTitle>
                <CardDescription>Smart matching using location, skills, and transportation data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">AI Recommendations Active</h3>
                  <p className="text-sm text-purple-700">Using real-time data to match workers to your warehouse position</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Top Matched Candidates</h4>
                  {[
                    { name: "Marcus Johnson", match: 95, distance: "2.3 mi", skills: ["Forklift", "Inventory"], route: "Midtown Route", available: "Immediate" },
                    { name: "Sarah Williams", match: 92, distance: "3.1 mi", skills: ["Warehouse", "Shipping"], route: "Downtown Route", available: "Immediate" },
                    { name: "David Brown", match: 88, distance: "4.5 mi", skills: ["Loading", "Quality Control"], route: "East Memphis Route", available: "2 weeks" },
                  ].map((candidate) => (
                    <Card key={candidate.name} className="border-2 hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{candidate.name}</h4>
                            <p className="text-sm text-muted-foreground">{candidate.distance} from job site</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{candidate.match}%</div>
                            <p className="text-xs text-muted-foreground">Match Score</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{candidate.route}</Badge>
                            <span className="text-sm text-muted-foreground">• Available: {candidate.available}</span>
                          </div>
                          <div className="flex gap-2">
                            {candidate.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm">View Full Profile & Contact</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-base">Matching Criteria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Location proximity</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills & experience match</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transportation availability</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attendance history</span>
                      <span className="font-medium">15%</span>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4 md:space-y-6">
            <EmployerJobManagement />
          </TabsContent>

          {/* Business Insight Dashboard */}
          <TabsContent value="insights" className="space-y-4 md:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Business Insight Dashboard
                </CardTitle>
                <CardDescription>Analytics on labor reliability, commute times, and retention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Labor Reliability Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">9.2/10</div>
                      <p className="text-xs text-muted-foreground mt-1">+0.3 from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Commute Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">18 min</div>
                      <p className="text-xs text-muted-foreground mt-1">-2 min from last month</p>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Retention Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary">92%</div>
                      <p className="text-xs text-muted-foreground mt-1">90-day average</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Attendance Impact Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Workers with transportation</span>
                            <span className="font-medium">97.8%</span>
                          </div>
                          <div className="w-full bg-secondary/20 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "97.8%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Workers without transportation</span>
                            <span className="font-medium">78.2%</span>
                          </div>
                          <div className="w-full bg-secondary/20 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "78.2%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
                        <p className="font-medium text-green-800">+19.6% improvement</p>
                        <p className="text-green-700">with transportation provided</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Cost-Benefit Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly transportation cost</span>
                          <span className="font-medium text-red-600">-$3,600</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reduced turnover savings</span>
                          <span className="font-medium text-green-600">+$4,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Improved attendance value</span>
                          <span className="font-medium text-green-600">+$2,100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Productivity gains</span>
                          <span className="font-medium text-green-600">+$1,800</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                          <span>Net Monthly Benefit</span>
                          <span className="text-green-600">+$4,500</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Commute Time Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Commute Time Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { range: "0-10 minutes", workers: 8, percentage: 40 },
                        { range: "10-20 minutes", workers: 7, percentage: 35 },
                        { range: "20-30 minutes", workers: 4, percentage: 20 },
                        { range: "30+ minutes", workers: 1, percentage: 5 },
                      ].map((item) => (
                        <div key={item.range}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.range}</span>
                            <span className="font-medium">{item.workers} workers ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-secondary/20 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Calendar Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  Transportation Pricing Calculator
                </CardTitle>
                <CardDescription>
                  Compare pricing models and schedule service dates based on your workforce size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmployerPricingCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerFlow;