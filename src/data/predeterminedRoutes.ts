// Predetermined efficient routes for passenger van service (from r&jMappingAndRouting)
// Routes designed to maximize occupancy and minimize travel time

export interface RouteStop {
  locationId: string;
  locationName: string;
  arrivalTime: string; // format: "HH:MM"
  type: "pickup" | "dropoff";
  estimatedPassengers?: number;
  notes?: string; // Optional notes about the stop
}

export interface PredeterminedRoute {
  id: string;
  name: string;
  description: string;
  color: string;
  estimatedDuration: number; // in minutes
  frequency: number; // minutes between vans
  capacity: number;
  stops: RouteStop[];
}

export const predeterminedRoutes: PredeterminedRoute[] = [
  {
    id: "route-1",
    name: "Whitehaven Employment Shuttle",
    description: "Direct route from Whitehaven Community Center to nearby employers",
    color: "#007AFF",
    estimatedDuration: 20,
    frequency: 30,
    capacity: 12,
    stops: [
      {
        locationId: "comm-4",
        locationName: "Kirby Community Center",
        arrivalTime: "07:00",
        type: "pickup",
        estimatedPassengers: 10,
        notes: "Main pickup location for Whitehaven residents",
      },
      {
        locationId: "emp-fedex-world-hub-6402",
        locationName: "FedEx World Hub",
        arrivalTime: "07:20",
        type: "dropoff",
        notes: "Major employment center near Whitehaven",
      },
    ],
  },
  {
    id: "route-2",
    name: "Frayser Employment Shuttle",
    description: "Direct route from Frayser Community Center to nearby employers",
    color: "#B4E900",
    estimatedDuration: 15,
    frequency: 30,
    capacity: 12,
    stops: [
      {
        locationId: "comm-2",
        locationName: "Frayser Community Center",
        arrivalTime: "07:00",
        type: "pickup",
        estimatedPassengers: 12,
        notes: "Main pickup location for Frayser residents",
      },
      {
        locationId: "emp-fulfillment-1a",
        locationName: "Amazon Fulfillment Center MEM4",
        arrivalTime: "07:15",
        type: "dropoff",
        notes: "Major employment center near Frayser",
      },
    ],
  },
  {
    id: "route-3",
    name: "Hickory Hill Employment Shuttle",
    description: "Direct route from Hickory Hill Community Center to nearby employers",
    color: "#FF2D55",
    estimatedDuration: 15,
    frequency: 30,
    capacity: 12,
    stops: [
      {
        locationId: "comm-1",
        locationName: "Hickory Hill Community Center",
        arrivalTime: "07:00",
        type: "pickup",
        estimatedPassengers: 12,
        notes: "Main pickup location for Hickory Hill residents",
      },
      {
        locationId: "emp-retail-8",
        locationName: "Walmart Supercenter - Hickory Hill",
        arrivalTime: "07:15",
        type: "dropoff",
        notes: "Major employer in Hickory Hill area",
      },
    ],
  },
];

// Calculate next arrival times based on current time and frequency
export const getNextArrivalTimes = (route: PredeterminedRoute, currentTime: Date = new Date()): string[] => {
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  const arrivalTimes: string[] = [];

  // Generate next 3 arrival times
  for (let i = 0; i < 3; i++) {
    const baseTime = route.stops[0].arrivalTime; // First stop time
    const [hours, minutes] = baseTime.split(":").map(Number);
    const baseTotalMinutes = hours * 60 + minutes;

    // Find next departure after current time
    let nextDeparture = baseTotalMinutes;
    while (nextDeparture <= currentTotalMinutes) {
      nextDeparture += route.frequency;
    }

    // Add frequency intervals for multiple times
    nextDeparture += i * route.frequency;

    const nextHour = Math.floor(nextDeparture / 60) % 24;
    const nextMinute = nextDeparture % 60;

    arrivalTimes.push(`${nextHour.toString().padStart(2, "0")}:${nextMinute.toString().padStart(2, "0")}`);
  }

  return arrivalTimes;
};
