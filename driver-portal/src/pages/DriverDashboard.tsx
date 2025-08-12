import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, CheckCircle, AlertCircle, Navigation } from "lucide-react";

interface Route {
  id: string;
  status: "pending" | "active" | "completed" | "issue";
  destination: string;
  pickupTime: string;
  passengers: number;
  estimatedDuration: string;
  issues?: string;
  gpsCoordinates?: { lat: number; lng: number };
}

const DriverDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [upcomingRoutes, setUpcomingRoutes] = useState<Route[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground";
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "issue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Navigation className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "issue":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const startRoute = (routeId: string) => {
    const route = upcomingRoutes.find(r => r.id === routeId);
    if (route) {
      setActiveRoute({ ...route, status: "active" });
      setUpcomingRoutes(prev => prev.filter(r => r.id !== routeId));
    }
  };

  const completeRoute = () => {
    if (activeRoute) {
      setActiveRoute(null);
    }
  };

  const handleLogin = (name: string) => {
    setDriverName(name);
    setIsAuthenticated(true);
    
    // Mock data
    setUpcomingRoutes([
      {
        id: "1",
        status: "pending",
        destination: "Downtown Office Complex",
        pickupTime: "08:00 AM",
        passengers: 12,
        estimatedDuration: "45 min",
        gpsCoordinates: { lat: 40.7128, lng: -74.0060 }
      },
      {
        id: "2",
        status: "pending",
        destination: "Industrial Park West",
        pickupTime: "09:30 AM",
        passengers: 8,
        estimatedDuration: "30 min",
        gpsCoordinates: { lat: 40.7589, lng: -73.9851 }
      }
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeRoute) {
        const randomStatus = Math.random() > 0.8 ? "issue" : "active";
        setActiveRoute(prev => prev ? { ...prev, status: randomStatus } : null);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [activeRoute]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="absolute inset-0 logo-background"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Driver Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 rounded-md bg-input border border-border text-foreground"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
              />
              <Button 
                onClick={() => handleLogin(driverName)}
                disabled={!driverName.trim()}
                className="w-full"
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 logo-background"></div>
      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Driver Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {driverName}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Navigation className="w-4 h-4 mr-2" />
              GPS
            </Button>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>

        {/* Active Route */}
        {activeRoute && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className={getStatusColor(activeRoute.status)}>
                  {getStatusIcon(activeRoute.status)}
                  {activeRoute.status.toUpperCase()}
                </Badge>
                Active Route
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{activeRoute.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{activeRoute.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{activeRoute.passengers} passengers</span>
                </div>
              </div>
              {activeRoute.issues && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                  <p className="text-destructive text-sm">{activeRoute.issues}</p>
                </div>
              )}
              <Button onClick={completeRoute} className="w-full">
                Complete Route
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Traffic Light Status */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Light Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-secondary/10">
                <div className="w-8 h-8 bg-secondary rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Normal Flow</p>
                <p className="text-xs text-muted-foreground">12 intersections</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/10">
                <div className="w-8 h-8 bg-accent rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Moderate Delay</p>
                <p className="text-xs text-muted-foreground">3 intersections</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-destructive/10">
                <div className="w-8 h-8 bg-destructive rounded-full mx-auto mb-2"></div>
                <p className="text-sm">Heavy Traffic</p>
                <p className="text-xs text-muted-foreground">1 intersection</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Routes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingRoutes.map((route) => (
              <div key={route.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{route.destination}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{route.pickupTime}</span>
                    <span>{route.passengers} passengers</span>
                    <span>{route.estimatedDuration}</span>
                  </div>
                </div>
                <Button onClick={() => startRoute(route.id)}>
                  Start Route
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Driver Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Routes Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">Total Passengers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;