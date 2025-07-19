import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Bell, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Route {
  id: string;
  status: 'green' | 'yellow' | 'red';
  destination: string;
  pickupTime: string;
  passengers: number;
  estimatedDuration: string;
  issues?: string[];
}

interface DriverFlowProps {
  onBack: () => void;
}

export const DriverFlow: React.FC<DriverFlowProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [upcomingRoutes, setUpcomingRoutes] = useState<Route[]>([
    {
      id: "R001",
      status: "green",
      destination: "Memphis Industrial Park",
      pickupTime: "6:00 AM",
      passengers: 12,
      estimatedDuration: "25 min",
    },
    {
      id: "R002", 
      status: "yellow",
      destination: "FedEx Distribution Center",
      pickupTime: "6:30 AM",
      passengers: 8,
      estimatedDuration: "30 min",
      issues: ["Light traffic detected"]
    },
    {
      id: "R003",
      status: "red", 
      destination: "Amazon Fulfillment Center",
      pickupTime: "7:00 AM",
      passengers: 15,
      estimatedDuration: "45 min",
      issues: ["Road closure on I-40", "2 passengers running late"]
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
      case 'green': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'yellow': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'red': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      default: return <Clock className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'green': return 'Clear - Safe to proceed';
      case 'yellow': return 'Caution - Minor issues detected';
      case 'red': return 'Critical - Immediate attention required';
      default: return 'Unknown status';
    }
  };

  const startRoute = (route: Route) => {
    setActiveRoute(route);
    toast({
      title: "Route Started",
      description: `Started route to ${route.destination}`,
    });
  };

  const completeRoute = () => {
    if (activeRoute) {
      toast({
        title: "Route Completed",
        description: `Successfully completed route to ${activeRoute.destination}`,
      });
      setActiveRoute(null);
      // Remove completed route from upcoming
      setUpcomingRoutes(prev => prev.filter(r => r.id !== activeRoute.id));
    }
  };

  // Simulate real-time status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setUpcomingRoutes(prev => {
        const updated = [...prev];
        // Randomly change a route status for demo
        const randomIndex = Math.floor(Math.random() * updated.length);
        const statuses: ('green' | 'yellow' | 'red')[] = ['green', 'yellow', 'red'];
        const oldStatus = updated[randomIndex]?.status;
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        if (updated[randomIndex] && oldStatus !== newStatus) {
          updated[randomIndex] = { ...updated[randomIndex], status: newStatus };
          
          // Show toast notification for status change
          toast({
            title: "Route Status Changed",
            description: `Route ${updated[randomIndex].id} changed from ${oldStatus} to ${newStatus}`,
            variant: newStatus === 'red' ? 'destructive' : 'default',
          });
        }
        
        return updated;
      });
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-emerald-600 text-white p-4 rounded-lg">
          <Button
            variant="ghost" 
            onClick={onBack}
            className="text-white hover:bg-emerald-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <img 
            src="/lovable-uploads/5137d2a6-573f-4db3-b0c1-4cca8f17c149.png" 
            alt="Routes & Jobs Logo" 
            className="h-8 w-auto"
          />
          <div>
            <h1 className="text-2xl font-bold">Driver Dashboard</h1>
            <p className="text-emerald-100">Traffic light system for route management</p>
          </div>
        </div>

        {/* Active Route */}
        {activeRoute && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(activeRoute.status)}`} />
                Active Route: {activeRoute.destination}
              </CardTitle>
              <CardDescription>Currently in progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(activeRoute.status)}
                  <span className="font-medium">{getStatusText(activeRoute.status)}</span>
                </div>
                <Badge variant="outline">{activeRoute.passengers} passengers</Badge>
              </div>
              
              {activeRoute.issues && (
                <div className="space-y-2">
                  <h4 className="font-medium text-yellow-700">Current Issues:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {activeRoute.issues.map((issue, index) => (
                      <li key={index} className="text-muted-foreground">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Button onClick={completeRoute} className="w-full">
                Complete Route
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Traffic Light Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2" />
              <CardTitle className="text-green-700">Green Light</CardTitle>
              <CardDescription>Route is clear, on-time, no issues</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2" />
              <CardTitle className="text-yellow-700">Yellow Light</CardTitle>
              <CardDescription>Active route with minor issues or delays</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2" />
              <CardTitle className="text-red-700">Red Light</CardTitle>
              <CardDescription>Critical issues, behind schedule</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Upcoming Routes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Upcoming Routes
            </CardTitle>
            <CardDescription>Your scheduled routes with real-time status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingRoutes.map((route) => (
                <div
                  key={route.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full ${getStatusColor(route.status)} flex items-center justify-center`}>
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{route.destination}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {route.pickupTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {route.passengers} passengers
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {route.estimatedDuration}
                        </span>
                      </div>
                      
                      {route.issues && route.issues.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-yellow-700">Issues:</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {route.issues.map((issue, index) => (
                              <li key={index}>• {issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={route.status === 'green' ? 'default' : route.status === 'yellow' ? 'secondary' : 'destructive'}>
                      {getStatusText(route.status)}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => startRoute(route)}
                      disabled={!!activeRoute}
                    >
                      Start Route
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Real-time updates and status changes will appear here
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Driver Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Routes Today:</span>
                <Badge variant="outline">3</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">On-Time Rate:</span>
                <Badge variant="default">98%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Passengers Served:</span>
                <Badge variant="secondary">35</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};