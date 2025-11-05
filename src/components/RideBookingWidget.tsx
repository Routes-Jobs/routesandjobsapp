import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search, Clock, Route } from "lucide-react";
import MapView from "@/components/MapView";
import AddressAutocomplete from "@/components/ui/address-autocomplete";

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

  const handleSearch = () => {
    if (pickupLocation && destination) {
      onSearchRide(pickupLocation, destination);
      setShowMap(true);
    }
  };

  const memphisLocations = [
    { id: "loc1", name: "Memphis International Airport", coordinates: [-89.9711, 35.0428] as [number, number], type: "pickup" as const, status: "active" as const },
    { id: "loc2", name: "Beale Street", coordinates: [-90.0490, 35.1495] as [number, number], type: "pickup" as const, status: "active" as const },
    { id: "loc3", name: "Graceland", coordinates: [-90.0267, 35.0474] as [number, number], type: "destination" as const },
    { id: "loc4", name: "FedExForum", coordinates: [-90.0507, 35.1382] as [number, number], type: "destination" as const },
  ];

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          {/* Pickup Location */}
          <AddressAutocomplete
            value={pickupLocation}
            onChange={setPickupLocation}
            placeholder="Where are you?"
            restrictToCity="Memphis"
            restrictToState="Tennessee"
          />

          {/* Destination */}
          <AddressAutocomplete
            value={destination}
            onChange={setDestination}
            placeholder="Where are you going?"
            restrictToCity="Memphis"
            restrictToState="Tennessee"
          />

          {/* Search Button */}
          <Button 
            onClick={handleSearch}
            disabled={!pickupLocation || !destination}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
          >
            <Search className="w-5 h-5 mr-2" />
            Find Rides & Routes
          </Button>
        </div>

        {/* Route Preview */}
        {routePreview && pickupLocation && destination && (
          <div className="pt-4 border-t space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-3 text-center">
                  <Route className="w-5 h-5 mx-auto mb-1 text-primary" />
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
