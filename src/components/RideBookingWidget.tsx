import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, DollarSign, Calendar, Clock, TrendingUp } from "lucide-react";
import MapView from "@/components/MapView";

interface RideBookingWidgetProps {
  onSearchRide: (pickup: string, destination: string) => void;
}

const RideBookingWidget = ({ onSearchRide }: RideBookingWidgetProps) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [routePreview, setRoutePreview] = useState<{
    distance: number;
    duration: number;
    price: number;
    route: [number, number][];
  } | null>(null);

  // Calculate route preview when both locations are entered
  useEffect(() => {
    if (pickupLocation && destination) {
      calculateRoutePreview(pickupLocation, destination);
    }
  }, [pickupLocation, destination]);

  const calculateRoutePreview = (pickup: string, dest: string) => {
    // Simplified route calculation based on location keywords
    const pickupCoords = getCoordinatesFromLocation(pickup);
    const destCoords = getCoordinatesFromLocation(dest);
    
    // Calculate straight-line distance (in miles) and add 30% for actual route
    const distance = calculateDistance(pickupCoords, destCoords) * 1.3;
    
    // Estimate duration: assume average speed of 30 mph in city
    const duration = (distance / 30) * 60; // in minutes
    
    // Price calculation: $3 base + $1.50 per mile
    const price = 3 + (distance * 1.5);
    
    // Create a simple route path
    const route = createRoutePath(pickupCoords, destCoords);
    
    setRoutePreview({
      distance: Math.round(distance * 10) / 10,
      duration: Math.round(duration),
      price: Math.round(price * 100) / 100,
      route
    });
  };

  const getCoordinatesFromLocation = (location: string): [number, number] => {
    const loc = location.toLowerCase();
    // Default Memphis locations based on keywords
    if (loc.includes('airport')) return [-89.9711, 35.0428];
    if (loc.includes('beale')) return [-90.0490, 35.1495];
    if (loc.includes('graceland')) return [-90.0267, 35.0474];
    if (loc.includes('fedex')) return [-90.0507, 35.1382];
    if (loc.includes('downtown')) return [-90.0490, 35.1495];
    if (loc.includes('midtown')) return [-89.9940, 35.1378];
    // Default to Memphis center
    return [-90.0490, 35.1495];
  };

  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const [lon1, lat1] = coord1;
    const [lon2, lat2] = coord2;
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const createRoutePath = (start: [number, number], end: [number, number]): [number, number][] => {
    // Create a simple curved path between two points
    const points: [number, number][] = [start];
    const steps = 20;
    
    for (let i = 1; i < steps; i++) {
      const ratio = i / steps;
      const lng = start[0] + (end[0] - start[0]) * ratio;
      const lat = start[1] + (end[1] - start[1]) * ratio;
      // Add slight curve for visual appeal
      const curve = Math.sin(ratio * Math.PI) * 0.01;
      points.push([lng + curve, lat + curve]);
    }
    
    points.push(end);
    return points;
  };

  const handleLocationSelect = (location: string, isPickup: boolean) => {
    if (isPickup) {
      setPickupLocation(location);
    } else {
      setDestination(location);
    }
  };

  const handleSearch = () => {
    if (pickupLocation && destination) {
      onSearchRide(pickupLocation, destination);
      setShowMap(true);
    }
  };

  const presetLocations = [
    { id: "airport", name: "Memphis Airport", coordinates: [-89.9711, 35.0428] as [number, number] },
    { id: "beale", name: "Beale Street", coordinates: [-90.0490, 35.1495] as [number, number] },
    { id: "graceland", name: "Graceland", coordinates: [-90.0267, 35.0474] as [number, number] },
    { id: "fedex", name: "FedExForum", coordinates: [-90.0507, 35.1382] as [number, number] },
    { id: "downtown", name: "Downtown", coordinates: [-90.0490, 35.1495] as [number, number] },
    { id: "midtown", name: "Midtown", coordinates: [-89.9940, 35.1378] as [number, number] },
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          {/* Pickup Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              Where are you?
            </div>
            <div className="flex flex-wrap gap-2">
              {presetLocations.map((loc) => (
                <Badge
                  key={`pickup-${loc.id}`}
                  variant={pickupLocation === loc.name ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-2"
                  onClick={() => handleLocationSelect(loc.name, true)}
                >
                  {loc.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Destination Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Navigation className="w-4 h-4 text-accent" />
              Where are you going?
            </div>
            <div className="flex flex-wrap gap-2">
              {presetLocations.map((loc) => (
                <Badge
                  key={`dest-${loc.id}`}
                  variant={destination === loc.name ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent/10 transition-colors px-3 py-2"
                  onClick={() => handleLocationSelect(loc.name, false)}
                >
                  {loc.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Price Preview & Book Button */}
          {routePreview && pickupLocation && destination && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Estimated Fare</div>
                    <div className="text-3xl font-bold text-primary flex items-center gap-1">
                      <DollarSign className="w-6 h-6" />
                      {routePreview.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Distance</div>
                    <div className="text-lg font-semibold">{routePreview.distance} mi</div>
                    <div className="text-xs text-muted-foreground mt-1">~{routePreview.duration} min</div>
                  </div>
                </div>
                <Button 
                  onClick={handleSearch}
                  className="w-full h-11 text-base font-semibold"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Route Preview */}
        {routePreview && pickupLocation && destination && (
          <div className="pt-4 border-t space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-3 text-center">
                  <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <div className="text-lg font-bold text-foreground">{routePreview.distance} mi</div>
                  <div className="text-xs text-muted-foreground">Distance</div>
                </CardContent>
              </Card>
              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="p-3 text-center">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <div className="text-lg font-bold text-foreground">{routePreview.duration} min</div>
                  <div className="text-xs text-muted-foreground">Est. Time</div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-3 text-center">
                  <div className="text-2xl font-bold mb-1 text-primary">${routePreview.price}</div>
                  <div className="text-xs text-muted-foreground">Est. Fare</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-sm font-medium mb-2 text-muted-foreground">
              Route Preview
            </div>
            <MapView 
              locations={[
                { 
                  id: "pickup", 
                  name: pickupLocation, 
                  coordinates: getCoordinatesFromLocation(pickupLocation), 
                  type: "pickup", 
                  status: "active" 
                },
                { 
                  id: "destination", 
                  name: destination, 
                  coordinates: getCoordinatesFromLocation(destination), 
                  type: "destination" 
                }
              ]}
              route={routePreview.route}
              height="300px"
              zoom={11}
            />
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-xs text-muted-foreground">Routes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Service</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">$3+</div>
            <div className="text-xs text-muted-foreground">Per Ride</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideBookingWidget;
