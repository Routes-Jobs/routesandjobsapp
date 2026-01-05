import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { memphisLocations, memphisCenterCoords, quickNavAreas } from "@/data/memphisPOIdata";
import { Button } from "@/components/ui/button";
import RouteSelector from "@/components/RouteSelector";
import { PredeterminedRoute } from "@/data/predeterminedRoutes";

interface TileProvider {
  id: string;
  name: string;
  url: string;
  attribution: string;
}

const employmentIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const communityIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const tileProviders: TileProvider[] = [
  {
    id: "osm",
    name: "OpenStreetMap",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    id: "cartodb-light",
    name: "Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  {
    id: "cartodb-dark",
    name: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  {
    id: "esri-satellite",
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  },
];

interface LeafletMapProps {
  selectedRoute?: PredeterminedRoute | null;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ selectedRoute = null }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const currentRoute = useRef<any>(null);
  const currentTileLayer = useRef<L.TileLayer | null>(null);
  const routeMarkersRef = useRef<L.LayerGroup>(L.layerGroup());
  const routeLineRef = useRef<L.Polyline | null>(null);
  const baseMarkersRef = useRef<Record<string, L.Marker>>({});
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isRoutingLoading, setIsRoutingLoading] = useState(false);
  const [currentTileProvider, setCurrentTileProvider] = useState<string>("osm");

  const getLocationById = useCallback((id: string) => {
    return memphisLocations.find((loc) => loc.id === id);
  }, []);

  const handleRouteSelect = useCallback(
    ({ pickupId, dropoffId }: { pickupId: string; dropoffId: string }) => {
      const pickupLocation = getLocationById(pickupId);
      const dropoffLocation = getLocationById(dropoffId);

      if (!pickupLocation || !dropoffLocation || !mapInstance.current) return;

      setIsRoutingLoading(true);

      if (currentRoute.current) {
        mapInstance.current.removeControl(currentRoute.current);
        currentRoute.current = null;
      }

      try {
        const routingControl = (L as any).Routing.control({
          waypoints: [
            L.latLng(pickupLocation.latitude, pickupLocation.longitude),
            L.latLng(dropoffLocation.latitude, dropoffLocation.longitude),
          ],
          routeWhileDragging: false,
          addWaypoints: false,
          createMarker: () => null,
          lineOptions: {
            styles: [{ color: "hsl(215, 85%, 25%)", weight: 4, opacity: 0.8 }],
          },
          show: false,
        }).addTo(mapInstance.current);

        currentRoute.current = routingControl;

        const bounds = L.latLngBounds([
          [pickupLocation.latitude, pickupLocation.longitude],
          [dropoffLocation.latitude, dropoffLocation.longitude],
        ]);
        mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
      } catch (error) {
        console.error("Error creating route:", error);
      } finally {
        setIsRoutingLoading(false);
      }
    },
    [getLocationById],
  );

  useEffect(() => {
    // @ts-ignore
    window.mapRoute = (pickupId: string, dropoffId: string) => {
      handleRouteSelect({ pickupId, dropoffId });
    };

    return () => {
      // @ts-ignore
      delete window.mapRoute;
    };
  }, [handleRouteSelect]);

  useEffect(() => {
    if (selectedRoute && selectedRoute.stops.length >= 2) {
      const pickupId = selectedRoute.stops[0].locationId;
      const dropoffId = selectedRoute.stops[1].locationId;
      handleRouteSelect({ pickupId, dropoffId });
    }
  }, [selectedRoute, handleRouteSelect]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([memphisCenterCoords.latitude, memphisCenterCoords.longitude], 12);

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        mapInstance.current?.scrollWheelZoom.enable();
        e.preventDefault();
      } else {
        mapInstance.current?.scrollWheelZoom.disable();
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };

    mapRef.current?.addEventListener("wheel", handleWheel, { passive: false });

    const initialProvider = tileProviders.find((p) => p.id === currentTileProvider);
    if (initialProvider) {
      const tileLayer = L.tileLayer(initialProvider.url, {
        attribution: initialProvider.attribution,
      });
      tileLayer.addTo(mapInstance.current);
      currentTileLayer.current = tileLayer;
    }

    memphisLocations.forEach((location) => {
      const icon = location.type === "employment" ? employmentIcon : communityIcon;
      const marker = L.marker([location.latitude, location.longitude], { icon }).addTo(mapInstance.current!);

      const popupContent = `
        <div style="padding: 8px;">
          <h3 style="color: #1e3a8a; font-weight: 600; margin-bottom: 4px;">${location.name}</h3>
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 4px;">
            ${location.type === "employment" ? "🏢 Employment Center" : "🚌 Community Pickup Point"}
          </p>
          <p style="font-size: 14px; margin-bottom: 4px;">${location.description}</p>
          <p style="color: #9ca3af; font-size: 12px;">${location.address}</p>
        </div>
      `;
      marker.bindPopup(popupContent);
      baseMarkersRef.current[location.id] = marker;
    });

    return () => {
      mapRef.current?.removeEventListener("wheel", handleWheel as any);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [currentTileProvider]);

  useEffect(() => {
    if (!selectedRoute) return;

    const routeLocations = selectedRoute.stops
      .map((stop) => {
        const location = getLocationById(stop.locationId);
        return location ? [location.latitude, location.longitude] : null;
      })
      .filter((loc): loc is [number, number] => loc !== null);

    if (routeLocations.length > 0) {
      const bounds = L.latLngBounds(routeLocations);
      mapInstance.current?.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedRoute, getLocationById]);

  useEffect(() => {
    if (!mapInstance.current) return;

    routeMarkersRef.current.clearLayers();

    if (routeLineRef.current) {
      mapInstance.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (selectedRoute && selectedRoute.stops.length >= 2) {
      const locations = selectedRoute.stops
        .map((stop) => ({
          ...stop,
          location: getLocationById(stop.locationId),
        }))
        .filter((item) => item.location !== undefined);

      if (locations.length < 2) return;

      locations.forEach((stop) => {
        const marker = L.marker([stop.location!.latitude, stop.location!.longitude], {
          icon: stop.type === "pickup" ? communityIcon : employmentIcon,
          zIndexOffset: 2000,
        }).bindPopup(`
          <div class="text-sm">
            <h3 class="font-bold">${stop.locationName || stop.location!.name}</h3>
            <p class="text-xs text-muted-foreground">${stop.type === "pickup" ? "Pickup" : "Drop-off"}</p>
            <p class="text-xs text-muted-foreground">${stop.location!.address || ""}</p>
            ${stop.notes ? `<p class="text-xs text-muted-foreground mt-1">${stop.notes}</p>` : ""}
          </div>
        `);

        routeMarkersRef.current.addLayer(marker);
      });

      const routePoints = locations.map((stop) => [stop.location!.latitude, stop.location!.longitude] as [number, number]);

      if (routePoints.length >= 2) {
        routeLineRef.current = L.polyline(routePoints, {
          color: selectedRoute.color || "#3b82f6",
          weight: 5,
          opacity: 0.8,
          lineJoin: "round",
          dashArray: "5, 5",
        }).addTo(mapInstance.current);

        const bounds = L.latLngBounds(routePoints);
        mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
      }

      routeMarkersRef.current.addTo(mapInstance.current);
    }
  }, [selectedRoute, getLocationById]);

  const navigateToArea = (areaId: string) => {
    const area = quickNavAreas.find((a) => a.id === areaId);
    if (area && mapInstance.current) {
      mapInstance.current.setView([area.latitude, area.longitude], area.zoom);
      setSelectedArea(areaId);
    }
  };

  const changeTileProvider = (providerId: string) => {
    const provider = tileProviders.find((p) => p.id === providerId);
    if (provider && mapInstance.current && currentTileLayer.current) {
      mapInstance.current.removeLayer(currentTileLayer.current);
      const newTileLayer = L.tileLayer(provider.url, {
        attribution: provider.attribution,
      });
      newTileLayer.addTo(mapInstance.current);
      currentTileLayer.current = newTileLayer;
      setCurrentTileProvider(providerId);
    }
  };

  const handleRouteChange = (
    route: { pickupId: string; dropoffId: string } | null,
    lastChanged?: "pickup" | "dropoff",
  ) => {
    if (!mapInstance.current || !route) return;

    const pickupLocation = route.pickupId ? getLocationById(route.pickupId) : null;
    const dropoffLocation = route.dropoffId ? getLocationById(route.dropoffId) : null;

    let target = dropoffLocation || pickupLocation;
    if (lastChanged === "pickup" && pickupLocation) {
      target = pickupLocation;
    } else if (lastChanged === "dropoff" && dropoffLocation) {
      target = dropoffLocation;
    }

    if (!target) return;

    mapInstance.current.setView([target.latitude, target.longitude], 13);

    const marker = baseMarkersRef.current[target.id];
    if (marker) {
      marker.openPopup();
    }
  };

  return (
    <div className="relative w-full h-[600px] rounded-lg shadow-transport">
      <div ref={mapRef} className="absolute inset-0" />

      {/* Map Style Selector - shifted right to avoid Leaflet zoom controls */}
      <div className="absolute top-4 left-24 bg-card/70 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[900]">
        <h4 className="font-semibold text-transport-blue mb-2 text-xs">Map Style</h4>
        <div className="flex flex-wrap gap-1">
          {tileProviders.map((provider) => (
            <Button
              key={provider.id}
              variant={currentTileProvider === provider.id ? "default" : "outline"}
              size="sm"
              onClick={() => changeTileProvider(provider.id)}
              className="text-xs h-6 px-2"
            >
              {provider.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-card/70 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[900]">
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Employment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Pickup Points</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Hold Ctrl+scroll to zoom</p>
      </div>

      <div className="absolute bottom-4 left-4 bg-card/70 backdrop-blur-sm rounded-lg p-2 shadow-lg z-[900] max-w-xs">
        <h4 className="font-semibold text-transport-blue mb-2 text-sm">Quick Navigation</h4>
        <div className="flex flex-wrap gap-1">
          {quickNavAreas.map((area) => (
            <Button
              key={area.id}
              variant={selectedArea === area.id ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToArea(area.id)}
              className="text-xs h-7"
            >
              {area.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="absolute top-4 right-4 z-[900]">
        <RouteSelector onRouteSelect={handleRouteSelect} onRouteChange={handleRouteChange} isLoading={isRoutingLoading} />
      </div>
    </div>
  );
};

export default LeafletMap;
