
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Bell, AlertTriangle, CheckCircle, Navigation, Phone, Settings, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Route {
  id: string;
  status: 'green' | 'yellow' | 'red';
  destination: string;
  pickupTime: string;
  passengers: number;
  estimatedDuration: string;
  issues?: string[];
  gpsCoordinates?: { lat: number; lng: number };
}

const DriverApp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [upcomingRoutes, setUpcomingRoutes] = useState<Route[]>([
    {
      id: "R001",
      status: "green",
      destination: "Memphis Industrial Park",
      pickupTime: "6:00 AM",
      passengers: 12,
      estimatedDuration: "25 min",
      gpsCoordinates: { lat: 35.1495, lng: -90.0490 }
    },
    {
      id: "R002", 
      status: "yellow",
      destination: "FedEx Distribution Center",
      pickupTime: "6:30 AM",
      passengers: 8,
      estimatedDuration: "30 min",
      issues: ["Light traffic detected"],
      gpsCoordinates: { lat: 35.1174, lng: -89.9711 }
    },
    {
      id: "R003",
      status: "red", 
      destination: "Amazon Fulfillment Center",
      pickupTime: "7:00 AM",
      passengers: 15,
      estimatedDuration: "45 min",
      issues: ["Road closure on I-40", "2 passengers running late"],
      gpsCoordinates: { lat: 35.0928, lng: -89.8092 }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'green': return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'yellow': return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'red': return <AlertTriangle className="w-8 h-8 text-red-600" />;
      default: return <Clock className="w-8 h-8 text-gray-600" />;
    }
  };

  const startRoute = (route: Route) => {
    setActiveRoute(route);
    toast({
      title: "Route Started",
      description: `Navigation started to ${route.destination}`,
    });
  };

  const completeRoute = () => {
    if (activeRoute) {
      toast({
        title: "Route Completed",
        description: `Successfully completed route to ${activeRoute.destination}`,
      });
      setActiveRoute(null);
      setUpcomingRoutes(prev => prev.filter(r => r.id !== activeRoute.id));
    }
  };

  const contactDispatch = () => {
    toast({
      title: "Contacting Dispatch",
      description: "Connecting you to dispatch center...",
    });
  };

  const openSettings = () => {
    toast({
      title: "Settings",
      description: "Opening driver settings panel...",
    });
  };

  const openNavigation = (route?: Route) => {
    const destination = route?.destination || activeRoute?.destination || "destination";
    toast({
      title: "Navigation Started",
      description: `Opening GPS navigation to ${destination}`,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (driverName.trim()) {
      setIsAuthenticated(true);
      toast({
        title: "Welcome Driver",
        description: `Logged in as ${driverName}`,
      });
    }
  };

  // Simulate real-time status updates
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(() => {
      setUpcomingRoutes(prev => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        const statuses: ('green' | 'yellow' | 'red')[] = ['green', 'yellow', 'red'];
        const oldStatus = updated[randomIndex]?.status;
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (updated[randomIndex] && oldStatus !== newStatus) {
          updated[randomIndex] = { ...updated[randomIndex], status: newStatus };
          
          toast({
            title: "Route Status Update",
            description: `Route ${updated[randomIndex].id} changed to ${newStatus}`,
            variant: newStatus === 'red' ? 'destructive' : 'default',
          });
        }
        
        return updated;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [isAuthenticated, toast]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img 
              src="/lovable-uploads/5137d2a6-573f-4db3-b0c1-4cca8f17c149.png" 
              alt="Routes & Jobs Logo" 
              className="h-16 w-auto mx-auto mb-4"
            />
            <CardTitle className="text-2xl text-emerald-600">Driver Portal</CardTitle>
            <CardDescription>Sign in to access your route dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="driverName" className="block text-sm font-medium mb-2">
                  Driver Name
                </label>
                <Input
                  id="driverName"
                  type="text"
                  placeholder="Enter your name"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-emerald-600 text-white p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/5137d2a6-573f-4db3-b0c1-4cca8f17c149.png" 
              alt="Routes & Jobs Logo" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold">Driver Dashboard</h1>
              <p className="text-emerald-100">Welcome, {driverName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-emerald-700"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-emerald-700"
              onClick={contactDispatch}
            >
              <Phone className="w-4 h-4 mr-2" />
              Dispatch
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-emerald-700"
              onClick={openSettings}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Active Route - Full Width Priority */}
        {activeRoute && (
          <Card className="border-2 border-primary bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-xl">
                {getStatusIcon(activeRoute.status)}
                <span>Active Route: {activeRoute.destination}</span>
              </CardTitle>
              <CardDescription>Currently in progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span>{activeRoute.passengers} passengers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span>{activeRoute.estimatedDuration} remaining</span>
                </div>
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-muted-foreground" />
                  <span>GPS Active</span>
                </div>
              </div>
              
              {activeRoute.issues && activeRoute.issues.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-800 mb-2">Current Issues:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {activeRoute.issues.map((issue, index) => (
                      <li key={index} className="text-yellow-700">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button onClick={completeRoute} className="flex-1">
                  Complete Route
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => openNavigation()}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Traffic Light Status Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="font-bold text-green-700">GREEN</h3>
              <p className="text-sm text-green-600">Clear to proceed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="font-bold text-yellow-700">YELLOW</h3>
              <p className="text-sm text-yellow-600">Proceed with caution</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 border-red-200 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="font-bold text-red-700">RED</h3>
              <p className="text-sm text-red-600">Critical attention needed</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRoutes.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full ${getStatusColor(route.status)} flex items-center justify-center`}>
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg">{route.destination}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Pickup: {route.pickupTime}</span>
                        <span>{route.passengers} passengers</span>
                        <span>{route.estimatedDuration}</span>
                      </div>
                      
                      {route.issues && route.issues.length > 0 && (
                        <div className="mt-2 text-sm">
                          <Badge variant="secondary" className="mr-1">Issues:</Badge>
                          {route.issues.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    size="lg"
                    onClick={() => startRoute(route)}
                    disabled={!!activeRoute}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Start Route
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Driver Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-emerald-600">8</div>
              <p className="text-sm text-muted-foreground">Routes Today</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-sm text-muted-foreground">On-Time Rate</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">147</div>
              <p className="text-sm text-muted-foreground">Passengers Served</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">4.9</div>
              <p className="text-sm text-muted-foreground">Driver Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverApp;
