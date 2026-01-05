import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Clock, Users } from "lucide-react";
import { memphisLocations } from "@/data/memphisPOIdata";

interface RouteRequest {
  pickupId: string;
  dropoffId: string;
}

interface RouteSelectorProps {
  onRouteSelect: (route: RouteRequest) => void;
  onRouteChange?: (route: RouteRequest | null, lastChanged?: "pickup" | "dropoff") => void;
  isLoading?: boolean;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ onRouteSelect, onRouteChange, isLoading = false }) => {
  const [selectedPickup, setSelectedPickup] = useState<string>("");
  const [selectedDropoff, setSelectedDropoff] = useState<string>("");

  const pickupPoints = memphisLocations.filter((loc) => loc.type === "community_center");
  const employmentCenters = memphisLocations.filter((loc) => loc.type === "employment");

  const emitRouteChange = (pickup: string, dropoff: string, lastChanged: "pickup" | "dropoff") => {
    if (!onRouteChange) return;
    if (pickup || dropoff) {
      onRouteChange({ pickupId: pickup, dropoffId: dropoff }, lastChanged);
    } else {
      onRouteChange(null);
    }
  };

  const handlePlanRoute = () => {
    if (selectedPickup && selectedDropoff) {
      onRouteSelect({
        pickupId: selectedPickup,
        dropoffId: selectedDropoff,
      });
    }
  };

  const selectedPickupLocation = pickupPoints.find((loc) => loc.id === selectedPickup);
  const selectedDropoffLocation = employmentCenters.find((loc) => loc.id === selectedDropoff);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-transport-blue">
          <Navigation className="w-5 h-5" />
          Plan Your Route
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4 text-transport-green" />
            Pickup Location
          </label>
          <Select
            value={selectedPickup}
            onValueChange={(value) => {
              setSelectedPickup(value);
              emitRouteChange(value, selectedDropoff, "pickup");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose pickup point..." />
            </SelectTrigger>
            <SelectContent className="z-[5000]">
              {pickupPoints.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedPickupLocation && (
            <p className="text-xs text-muted-foreground">{selectedPickupLocation.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="w-4 h-4 text-transport-blue" />
            Employment Destination
          </label>
          <Select
            value={selectedDropoff}
            onValueChange={(value) => {
              setSelectedDropoff(value);
              emitRouteChange(selectedPickup, value, "dropoff");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose employment center..." />
            </SelectTrigger>
            <SelectContent className="z-[5000]">
              {employmentCenters.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedDropoffLocation && (
            <p className="text-xs text-muted-foreground">{selectedDropoffLocation.description}</p>
          )}
        </div>

        <Button
          onClick={handlePlanRoute}
          disabled={!selectedPickup || !selectedDropoff || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Planning Route...
            </>
          ) : (
            <>
              <Navigation className="w-4 h-4 mr-2" />
              Plan Route
            </>
          )}
        </Button>

        {selectedPickup && selectedDropoff && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-2">Route Summary</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-start gap-2">
                <Users className="w-3 h-3 mt-0.5 text-transport-green" />
                <span>{selectedPickupLocation?.name}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 mt-0.5 text-transport-blue" />
                <span>{selectedDropoffLocation?.name}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteSelector;
