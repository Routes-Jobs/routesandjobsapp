import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Route, Calendar, TrendingUp, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EmployerJobManagement from "@/components/EmployerJobManagement";
import MapView from "@/components/MapView";

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
              src="/lovable-uploads/5137d2a6-573f-4db3-b0c1-4cca8f17c149.png" 
              alt="Routes & Jobs Logo" 
              className="h-6 md:h-8 w-auto flex-shrink-0"
            />
          </div>
          <div className="ml-0 md:ml-auto">
            <h1 className="text-xl md:text-2xl font-bold">Employer Dashboard</h1>
            <p className="text-secondary-foreground/80 text-sm md:text-base">Manage workforce transportation</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <Tabs defaultValue="overview" className="space-y-4 md:space-y-6">
          {/* Mobile-friendly tabs - scrollable on small screens, grid on larger */}
          <div className="w-full overflow-x-auto">
            <TabsList className="inline-flex h-12 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground min-w-full md:grid md:grid-cols-4 md:w-full">
              <TabsTrigger value="overview" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Overview
              </TabsTrigger>
              <TabsTrigger value="operations" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Routes & Staff
              </TabsTrigger>
              <TabsTrigger value="jobs" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Jobs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="whitespace-nowrap px-3 py-2 text-sm font-medium">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4 md:space-y-6">
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
          </TabsContent>

          <TabsContent value="operations" className="space-y-4 md:space-y-6">
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
                  Job Locations Map
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

          <TabsContent value="jobs" className="space-y-4 md:space-y-6">
            <EmployerJobManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Attendance Impact
                  </CardTitle>
                  <CardDescription>
                    How transportation affects attendance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>On-time arrivals</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance rate</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <div className="w-full bg-secondary/20 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Cost Savings
                  </CardTitle>
                  <CardDescription>
                    Monthly transportation savings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">$2,400</div>
                    <p className="text-sm text-muted-foreground">vs. individual rideshare</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Reduced absenteeism</span>
                      <span className="font-medium">$1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Overtime reduction</span>
                      <span className="font-medium">$800</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transportation subsidy</span>
                      <span className="font-medium">$400</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerFlow;