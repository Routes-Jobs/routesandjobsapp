import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";
import MapView from "@/components/MapView";

interface Vehicle {
  id: string;
  name: string;
  driver: string;
  route: string;
  currentLocation: [number, number];
  speed: number;
  status: "active" | "stopped" | "delayed";
  passengers: number;
  capacity: number;
}

interface PickupPoint {
  id: string;
  name: string;
  location: [number, number];
  employees: string[];
  status: "pending" | "picked-up" | "en-route";
  estimatedArrival: string;
  actualArrival?: string;
}

const RealTimeTrackingMap = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "van-1",
      name: "Van Alpha",
      driver: "James Wilson",
      route: "Industrial District Route",
      currentLocation: [-90.0490, 35.1395],
      speed: 35,
      status: "active",
      passengers: 8,
      capacity: 12
    },
    {
      id: "van-2",
      name: "Van Beta",
      driver: "Maria Garcia",
      route: "Warehouse District Route",
      currentLocation: [-90.0711, 35.1174],
      speed: 0,
      status: "stopped",
      passengers: 5,
      capacity: 10
    }
  ]);

  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([
    {
      id: "pickup-1",
      name: "Midtown Hub",
      location: [-90.0490, 35.1395],
      employees: ["Marcus J.", "Sarah W.", "David B."],
      status: "picked-up",
      estimatedArrival: "6:00 AM",
      actualArrival: "5:58 AM"
    },
    {
      id: "pickup-2",
      name: "Downtown Hub",
      location: [-90.0490, 35.1595],
      employees: ["Lisa G.", "Michael R."],
      status: "en-route",
      estimatedArrival: "6:15 AM"
    },
    {
      id: "pickup-3",
      name: "East Memphis Hub",
      location: [-89.8711, 35.1174],
      employees: ["John D.", "Emily S.", "Robert T.", "Amanda K."],
      status: "pending",
      estimatedArrival: "6:25 AM"
    },
    {
      id: "pickup-4",
      name: "South Memphis Hub",
      location: [-90.0490, 35.0895],
      employees: ["Carlos M.", "Jennifer L.", "Kevin P."],
      status: "picked-up",
      estimatedArrival: "2:00 PM",
      actualArrival: "2:02 PM"
    }
  ]);

  // Simulate real-time vehicle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles(prevVehicles => 
        prevVehicles.map(vehicle => {
          if (vehicle.status === "active") {
            // Slightly move the vehicle (simulate movement)
            const [lng, lat] = vehicle.currentLocation;
            const newLng = lng + (Math.random() - 0.5) * 0.001;
            const newLat = lat + (Math.random() - 0.5) * 0.001;
            return {
              ...vehicle,
              currentLocation: [newLng, newLat] as [number, number],
              speed: Math.floor(Math.random() * 20) + 25 // Random speed 25-45 mph
            };
          }
          return vehicle;
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Prepare map locations
  const mapLocations = [
    // Vehicles - mapped as "pickup" type with active status
    ...vehicles.map(vehicle => ({
      id: vehicle.id,
      name: vehicle.name,
      coordinates: vehicle.currentLocation,
      type: "pickup" as const,
      status: (vehicle.status === "active" ? "active" : "scheduled") as "active" | "scheduled"
    })),
    // Pickup points
    ...pickupPoints.map(point => ({
      id: point.id,
      name: point.name,
      coordinates: point.location,
      type: "pickup" as const,
      status: (point.status === "picked-up" || point.status === "en-route" ? "active" : "scheduled") as "active" | "scheduled"
    })),
    // Destinations
    { id: "dest-1", name: "Manufacturing Plant A", coordinates: [-90.0490, 35.1495] as [number, number], type: "job" as const },
    { id: "dest-2", name: "Logistics Center B", coordinates: [-90.0711, 35.1174] as [number, number], type: "job" as const }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "picked-up": return "default";
      case "en-route": return "secondary";
      case "pending": return "outline";
      case "active": return "default";
      case "stopped": return "destructive";
      case "delayed": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "picked-up": return <CheckCircle className="w-4 h-4" />;
      case "en-route": return <Navigation className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-Time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Vehicles</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{vehicles.filter(v => v.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Out of {vehicles.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Passengers On Board</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">{vehicles.reduce((sum, v) => sum + v.passengers, 0)}</div>
            <p className="text-xs text-muted-foreground">Total capacity: {vehicles.reduce((sum, v) => sum + v.capacity, 0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Pickups</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-green-600">
              {pickupPoints.filter(p => p.status === "picked-up").length}
            </div>
            <p className="text-xs text-muted-foreground">Out of {pickupPoints.length} stops</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Pickup ETA</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold">
              {pickupPoints.find(p => p.status === "en-route")?.estimatedArrival || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Downtown Hub</p>
          </CardContent>
        </Card>
      </div>

      {/* Map View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Live Route Tracking
          </CardTitle>
          <CardDescription>Real-time vehicle positions and pickup status</CardDescription>
        </CardHeader>
        <CardContent>
          <MapView locations={mapLocations} height="500px" />
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Active Vehicle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Picked Up</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>En Route</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Pending</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Vehicles List */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Active Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{vehicle.name}</p>
                    <p className="text-sm text-muted-foreground">{vehicle.driver}</p>
                  </div>
                  <Badge variant={getStatusColor(vehicle.status)}>
                    {vehicle.status}
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{vehicle.route}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{vehicle.passengers}/{vehicle.capacity} passengers</span>
                    </div>
                    {vehicle.status === "active" && (
                      <span className="text-primary font-medium">{vehicle.speed} mph</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pickup Points Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Pickup Points Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pickupPoints.map(point => (
              <div key={point.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{point.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {point.employees.length} employee{point.employees.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Badge variant={getStatusColor(point.status)} className="flex items-center gap-1">
                    {getStatusIcon(point.status)}
                    {point.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{point.employees.join(", ")}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>ETA: {point.estimatedArrival}</span>
                    </div>
                    {point.actualArrival && (
                      <span className="text-green-600 font-medium">
                        Arrived: {point.actualArrival}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeTrackingMap;
