export interface RouteStop {
  id: string;
  name: string;
  locationId: string;
  locationName?: string;
  latitude: number;
  longitude: number;
  type: "pickup" | "dropoff";
  arrivalTime?: string;
  notes?: string;
}

export interface PredeterminedRoute {
  id: string;
  name: string;
  description: string;
  stops: RouteStop[];
  color: string;
}

export const predeterminedRoutes: PredeterminedRoute[] = [
  {
    id: "route-1",
    name: "Downtown to FedEx Hub",
    description: "Morning shuttle from Downtown Memphis to FedEx World Hub",
    color: "#3B82F6",
    stops: [
      { id: "r1-s1", name: "Downtown Transit Center", locationId: "downtown-cc", locationName: "Downtown Community Center", latitude: 35.1495, longitude: -90.049, type: "pickup", arrivalTime: "6:00 AM" },
      { id: "r1-s2", name: "Orange Mound", locationId: "orange-mound-cc", locationName: "Orange Mound Community Center", latitude: 35.1147, longitude: -89.9747, type: "pickup", arrivalTime: "6:15 AM" },
      { id: "r1-s3", name: "FedEx World Hub", locationId: "fedex-hub", locationName: "FedEx World Hub", latitude: 35.0456, longitude: -89.9811, type: "dropoff", arrivalTime: "6:45 AM" },
    ],
  },
  {
    id: "route-2",
    name: "Whitehaven to Amazon",
    description: "Shift shuttle from Whitehaven to Amazon MEM1",
    color: "#10B981",
    stops: [
      { id: "r2-s1", name: "Whitehaven Community Center", locationId: "downtown-cc", locationName: "Downtown Community Center", latitude: 35.0333, longitude: -90.0333, type: "pickup", arrivalTime: "5:30 AM" },
      { id: "r2-s2", name: "Southgate Center", locationId: "orange-mound-cc", locationName: "Orange Mound Community Center", latitude: 35.05, longitude: -89.95, type: "pickup", arrivalTime: "5:45 AM" },
      { id: "r2-s3", name: "Amazon MEM1", locationId: "amazon-mem1", locationName: "Amazon MEM1", latitude: 35.0842, longitude: -89.8053, type: "dropoff", arrivalTime: "6:15 AM" },
    ],
  },
  {
    id: "route-3",
    name: "Midtown Medical Route",
    description: "Healthcare worker shuttle to St. Jude",
    color: "#8B5CF6",
    stops: [
      { id: "r3-s1", name: "Midtown Station", locationId: "downtown-cc", locationName: "Downtown Community Center", latitude: 35.1347, longitude: -90.0, type: "pickup", arrivalTime: "6:30 AM" },
      { id: "r3-s2", name: "Cooper-Young", locationId: "orange-mound-cc", locationName: "Orange Mound Community Center", latitude: 35.1189, longitude: -89.9908, type: "pickup", arrivalTime: "6:40 AM" },
      { id: "r3-s3", name: "St. Jude Campus", locationId: "st-jude", locationName: "St. Jude Children's Hospital", latitude: 35.1593, longitude: -90.0344, type: "dropoff", arrivalTime: "7:00 AM" },
    ],
  },
];

export const getNextArrivalTimes = (routeId: string): string[] => {
  const route = predeterminedRoutes.find((r) => r.id === routeId);
  if (!route) return [];
  return route.stops.map((stop) => stop.arrivalTime || "TBD");
};
