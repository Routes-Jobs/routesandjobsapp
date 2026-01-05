import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LeafletMap from "@/components/maps/LeafletMap";
import PredeterminedRoutes from "@/components/PredeterminedRoutes";
import MapPricingCard from "@/components/MapPricingCard";
import { useRoute } from "@/contexts/RouteContext";

type MapType = "leaflet";

const MapSelector: React.FC = () => {
  const [activeMap] = useState<MapType>("leaflet");
  const { selectedRoute } = useRoute();

  const mapOptions = useMemo(
    () => [
      {
        id: "leaflet" as MapType,
        name: "Leaflet",
        description: "Open-source map library with OpenStreetMap tiles",
        features: ["Free to use", "No API key required", "Highly customizable"],
      },
    ],
    [],
  );

  const renderMap = useCallback(() => {
    return <LeafletMap key="leaflet" selectedRoute={selectedRoute} />;
  }, [selectedRoute]);

  const activeMapOption = useMemo(
    () => mapOptions.find((m) => m.id === activeMap),
    [mapOptions, activeMap],
  );

  return (
    <div className="space-y-8">
      <div className="w-full">
        <div className="h-[600px] rounded-lg overflow-hidden border">{renderMap()}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-transport-blue text-base">{activeMapOption?.name}</CardTitle>
            <CardDescription className="text-sm">{activeMapOption?.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {activeMapOption?.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-transport-green rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t">
              <h4 className="font-semibold text-sm mb-2">Memphis Data:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Employment Centers:</span>
                  <span className="font-medium">50+</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup Points:</span>
                  <span className="font-medium">25+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <MapPricingCard mapType={activeMap} userCount={1500} />

        <PredeterminedRoutes />
      </div>
    </div>
  );
};

export default MapSelector;
