import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Search } from "lucide-react";
import MapView from "@/components/MapView";

interface RideBookingWidgetProps {
  onSearchRide: (pickup: string, destination: string) => void;
}

const RideBookingWidget = ({ onSearchRide }: RideBookingWidgetProps) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [showMap, setShowMap] = useState(false);

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
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Where are you?"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="pl-11 h-12 text-base bg-background border-2 focus:border-primary"
            />
          </div>

          {/* Destination */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">
              <Navigation className="w-5 h-5" />
            </div>
            <Input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-11 h-12 text-base bg-background border-2 focus:border-accent"
            />
          </div>

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

        {/* Map Preview */}
        {showMap && (
          <div className="pt-4 border-t">
            <div className="text-sm font-medium mb-3 text-muted-foreground">
              Popular locations in Memphis
            </div>
            <MapView 
              locations={memphisLocations}
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
