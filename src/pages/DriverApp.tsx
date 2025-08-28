
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Bell, AlertTriangle, CheckCircle, Navigation, Phone, Settings, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MapView from "@/components/MapView";

interface Route {
  id: string;
  priority: 'urgent' | 'next' | 'later'; // Changed from status to priority
  destination: string;
  pickupTime: string;
  passengers: number;
  estimatedDuration: string;
  issues?: string[];
  gpsCoordinates?: { lat: number; lng: number };
  earnings?: string;
  trafficCondition?: 'light' | 'moderate' | 'heavy';
  trafficAction?: string;
}

const DriverApp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [driverName] = useState("Driver");
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [upcomingRoutes, setUpcomingRoutes] = useState<Route[]>([
    {
      id: "R001",
      priority: "urgent",
      destination: "Memphis Industrial Park",
      pickupTime: "6:00 AM",
      passengers: 12,
      estimatedDuration: "25 min",
      gpsCoordinates: { lat: 35.1495, lng: -90.0490 },
      earnings: "$45.00",
      trafficCondition: "heavy",
      trafficAction: "Immediate departure recommended - Heavy traffic conditions ahead"
    },
    {
      id: "R002", 
      priority: "next",
      destination: "FedEx Distribution Center",
      pickupTime: "6:30 AM",
      passengers: 8,
      estimatedDuration: "30 min",
      gpsCoordinates: { lat: 35.1174, lng: -89.9711 },
      earnings: "$38.50",
      trafficCondition: "moderate",
      trafficAction: "Standard route timing - Monitor traffic conditions"
    },
    {
      id: "R003",
      priority: "later", 
      destination: "Amazon Fulfillment Center",
      pickupTime: "7:00 AM",
      passengers: 15,
      estimatedDuration: "45 min",
      gpsCoordinates: { lat: 35.0928, lng: -89.8092 },
      earnings: "$52.75",
      trafficCondition: "light",
      trafficAction: "Optimal traffic conditions - Proceed as scheduled"
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'; // Red = URGENT pickup needed
      case 'next': return 'bg-yellow-500'; // Yellow = Next priority
      case 'later': return 'bg-green-500'; // Green = Can wait, pickup later
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="w-8 h-8 text-red-600" />;
      case 'next': return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'later': return <CheckCircle className="w-8 h-8 text-green-600" />;
      default: return <Clock className="w-8 h-8 text-gray-600" />;
    }
  };

  const getTrafficColor = (condition: string) => {
    switch (condition) {
      case 'heavy': return 'text-red-600 bg-red-50 border-red-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'light': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUpcomingRoutes(prev => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        const priorities: ('urgent' | 'next' | 'later')[] = ['urgent', 'next', 'later'];
        const oldPriority = updated[randomIndex]?.priority;
        const newPriority = priorities[Math.floor(Math.random() * priorities.length)];
        
        if (updated[randomIndex] && oldPriority !== newPriority) {
          updated[randomIndex] = { ...updated[randomIndex], priority: newPriority };
          
          const priorityMessage = newPriority === 'urgent' ? 'High priority pickup required' : 
                                 newPriority === 'next' ? 'Standard priority pickup' : 
                                 'Scheduled pickup timing';
          
          toast({
            title: "Route Priority Update",
            description: `Route ${updated[randomIndex].id}: ${priorityMessage}`,
            variant: newPriority === 'urgent' ? 'destructive' : 'default',
          });
        }
        
        return updated;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [toast]);

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
                {getPriorityIcon(activeRoute.priority)}
                <span>Active Route: {activeRoute.destination}</span>
              </CardTitle>
              <CardDescription>Route in progress • Estimated earnings: {activeRoute.earnings || 'N/A'}</CardDescription>
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
              
              {activeRoute.trafficAction && (
                <div className={`rounded-lg p-3 border ${getTrafficColor(activeRoute.trafficCondition || 'light')}`}>
                  <h4 className="font-medium mb-2">Traffic Advisory:</h4>
                  <p className="text-sm">{activeRoute.trafficAction}</p>
                </div>
              )}

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

        {/* Priority Status Overview */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-red-50 border-red-200 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="font-bold text-red-700">HIGH PRIORITY</h3>
              <p className="text-sm text-red-600">Immediate passenger pickup required</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="font-bold text-yellow-700">STANDARD</h3>
              <p className="text-sm text-yellow-600">Next scheduled pickup</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
              <h3 className="font-bold text-green-700">SCHEDULED</h3>
              <p className="text-sm text-green-600">Pickup as scheduled</p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Scheduled Routes
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
                    <div className={`w-8 h-8 rounded-full ${getPriorityColor(route.priority)} flex items-center justify-center`}>
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{route.destination}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Scheduled: {route.pickupTime}</span>
                        <span>{route.passengers} passengers</span>
                        <span>Duration: {route.estimatedDuration}</span>
                        <span className="font-semibold text-green-600">Compensation: {route.earnings}</span>
                      </div>
                      
                      {route.trafficAction && (
                        <div className={`mt-2 text-sm p-2 rounded border ${getTrafficColor(route.trafficCondition || 'light')}`}>
                          <strong>Traffic Advisory:</strong> {route.trafficAction}
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
                    Begin Route
                  </Button>
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
              Route Map - Pickup Locations
            </CardTitle>
            <CardDescription>
              View pickup locations and destinations on the map
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MapView
              locations={[
                ...(activeRoute ? [{
                  id: activeRoute.id,
                  name: activeRoute.destination,
                  coordinates: [activeRoute.gpsCoordinates?.lng || -90.0490, activeRoute.gpsCoordinates?.lat || 35.1495] as [number, number],
                  type: 'destination' as const,
                  status: 'active' as const
                }] : []),
                ...upcomingRoutes.map(route => ({
                  id: route.id,
                  name: route.destination,
                  coordinates: [route.gpsCoordinates?.lng || -90.0490, route.gpsCoordinates?.lat || 35.1495] as [number, number],
                  type: 'pickup' as const,
                  status: 'scheduled' as const
                }))
              ]}
              height="350px"
              showTokenInput={true}
            />
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-emerald-600">8</div>
              <p className="text-sm text-muted-foreground">Routes Completed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">$287.50</div>
              <p className="text-sm text-muted-foreground">Daily Earnings</p>
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
              <p className="text-sm text-muted-foreground">Passengers Transported</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">4.9</div>
              <p className="text-sm text-muted-foreground">Service Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverApp;
