# Code Samples

## Core Implementation Patterns

### 1. Role-Based Flow Selection

```typescript
// src/pages/Index.tsx
import { useState } from "react";
import Header from "@/components/Header";
import RoleSelection from "@/components/RoleSelection";
import EmployeeFlow from "@/components/EmployeeFlow";
import EmployerFlow from "@/components/EmployerFlow";
import GeneralPublicFlow from "@/components/GeneralPublicFlow";

type UserRole = "employee" | "employer" | "general" | null;

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const renderFlow = () => {
    switch (selectedRole) {
      case "employee":
        return <EmployeeFlow onBack={() => setSelectedRole(null)} />;
      case "employer":
        return <EmployerFlow onBack={() => setSelectedRole(null)} />;
      case "general":
        return <GeneralPublicFlow onBack={() => setSelectedRole(null)} />;
      default:
        return <RoleSelection onRoleSelect={setSelectedRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {renderFlow()}
    </div>
  );
};

export default Index;
```

---

### 2. Multi-Step Form Flow

```typescript
// Pattern used in EmployeeFlow, GeneralPublicFlow
const EmployeeFlow = ({ onBack }: EmployeeFlowProps) => {
  const [step, setStep] = useState<"request" | "schedule" | "subscription">("request");
  const [rideData, setRideData] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    shift: ""
  });
  const { toast } = useToast();

  const handleRideRequest = () => {
    // Validation
    if (!rideData.pickup || !rideData.destination) {
      toast({
        title: "Missing Information",
        description: "Please fill in pickup and destination locations.",
        variant: "destructive"
      });
      return;
    }
    // Progress to next step
    setStep("schedule");
  };

  const handleSchedule = () => {
    setStep("subscription");
  };

  const handleConfirmRide = () => {
    toast({
      title: "Ride Scheduled!",
      description: "Your ride has been scheduled.",
    });
    // Reset form
    setStep("request");
    setRideData({
      pickup: "",
      destination: "",
      date: "",
      time: "",
      shift: ""
    });
  };

  return (
    <div>
      {step === "request" && (
        <Card>
          <Select 
            value={rideData.pickup} 
            onValueChange={(value) => setRideData(prev => ({ ...prev, pickup: value }))}
          >
            {/* Options */}
          </Select>
          <Button onClick={handleRideRequest}>Continue</Button>
        </Card>
      )}

      {step === "schedule" && (
        <Card>
          <p>From: {rideData.pickup}</p>
          <p>To: {rideData.destination}</p>
          <Button onClick={handleSchedule}>Review Pricing</Button>
        </Card>
      )}

      {step === "subscription" && (
        <Card>
          {/* Pricing options */}
          <Button onClick={handleConfirmRide}>Confirm Ride</Button>
        </Card>
      )}
    </div>
  );
};
```

---

### 3. Pricing Calculator Component

```typescript
// src/components/EmployeePriceCalculator.tsx (conceptual)
interface EmployeePriceCalculatorProps {
  pickup: string;
  destination: string;
}

const EmployeePriceCalculator = ({ pickup, destination }: EmployeePriceCalculatorProps) => {
  // Calculate distance-based pricing
  const calculatePrice = () => {
    // Base pricing structure
    const basePrice = 2.50;
    const perMileRate = 0.75;
    
    // Mock distance calculation (would use actual coordinates)
    const estimatedMiles = 8; // Would calculate from pickup/destination
    
    const totalPrice = basePrice + (estimatedMiles * perMileRate);
    
    return {
      base: basePrice,
      distance: estimatedMiles * perMileRate,
      total: totalPrice,
      withPass: 0 // Free with weekly/monthly pass
    };
  };

  const pricing = calculatePrice();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base fare</span>
            <span>${pricing.base.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Distance</span>
            <span>${pricing.distance.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${pricing.total.toFixed(2)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Or FREE with weekly/monthly pass
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

---

### 4. Route Options Display

```typescript
// From GeneralPublicFlow.tsx
const routeOptions = [
  {
    id: "employee",
    name: "Employee Discount Route",
    duration: "25 mins",
    price: "$2.75",
    originalPrice: "$5.50",
    pickupTime: "15 mins",
    rating: 4.8,
    description: "50% employee discount - Show your work ID",
    isEmployeeDiscount: true
  },
  {
    id: "shuttle",
    name: "Workplace Shuttle",
    duration: "35 mins", 
    price: "$1.50",
    pickupTime: "10 mins",
    rating: 4.9,
    description: "Shared shuttle service to major employment areas",
    isShuttle: true
  },
  {
    id: "community",
    name: "Community Ride",
    duration: "30 mins",
    price: "$3.25",
    pickupTime: "20 mins",
    rating: 4.6,
    description: "Affordable community transportation option"
  }
];

// Render route cards
{routeOptions.map((route) => (
  <Card key={route.id} className="cursor-pointer hover:shadow-md">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-lg">{route.name}</h3>
            {route.isEmployeeDiscount && (
              <Badge className="bg-green-100 text-green-800">Employee</Badge>
            )}
            {route.isShuttle && (
              <Badge className="bg-blue-100 text-blue-800">Shuttle</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{route.description}</p>
        </div>
        <div className="text-right">
          {route.originalPrice && (
            <span className="text-sm line-through">{route.originalPrice}</span>
          )}
          <div className="text-2xl font-bold text-primary">{route.price}</div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3 h-3 fill-yellow-400" />
            {route.rating}
          </div>
        </div>
      </div>
      <Button onClick={handleRouteSelection} className="w-full">
        Select This Route
      </Button>
    </CardContent>
  </Card>
))}
```

---

### 5. Context Provider Pattern

```typescript
// src/contexts/RouteContext.tsx
import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import type { PredeterminedRoute } from "@/data/predeterminedRoutes";

type RouteContextType = {
  selectedRoute: PredeterminedRoute | null;
  selectRoute: (route: PredeterminedRoute | null) => void;
  clearRoute: () => void;
};

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export const RouteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState<PredeterminedRoute | null>(null);

  const selectRoute = useCallback((route: PredeterminedRoute | null) => {
    setSelectedRoute(route);
  }, []);

  const clearRoute = useCallback(() => {
    setSelectedRoute(null);
  }, []);

  return (
    <RouteContext.Provider value={{ selectedRoute, selectRoute, clearRoute }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = (): RouteContextType => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error("useRoute must be used within a RouteProvider");
  }
  return context;
};
```

---

### 6. Language/Translation System

```typescript
// src/contexts/LanguageContext.tsx (excerpt)
type Language = 'en' | 'es' | 'fr' | 'de';

const translations = {
  en: {
    home: "Home",
    jobs: "Jobs",
    findRides: "Find Rides",
    login: "Login",
    getStarted: "Get Started",
    // ... more translations
  },
  es: {
    home: "Inicio",
    jobs: "Empleos",
    findRides: "Buscar Viajes",
    login: "Iniciar Sesión",
    getStarted: "Comenzar",
    // ... more translations
  },
  // fr, de...
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Usage in component
const Component = () => {
  const { t } = useLanguage();
  return <Button>{t('getStarted')}</Button>;
};
```

---

### 7. Predetermined Routes Data

```typescript
// src/data/predeterminedRoutes.ts
export interface RouteStop {
  locationId: string;
  locationName: string;
  arrivalTime: string;
  type: "pickup" | "dropoff";
  notes?: string;
}

export interface PredeterminedRoute {
  id: string;
  name: string;
  description: string;
  color: string;
  stops: RouteStop[];
  duration: string;
  frequency: number; // minutes between runs
  capacity: number;
}

export const predeterminedRoutes: PredeterminedRoute[] = [
  {
    id: "route-industrial",
    name: "Industrial District Express",
    description: "Direct service to manufacturing and distribution centers",
    color: "#0066CC",
    duration: "35 min",
    frequency: 30,
    capacity: 15,
    stops: [
      {
        locationId: "midtown-hub",
        locationName: "Midtown Hub",
        arrivalTime: "6:00 AM",
        type: "pickup"
      },
      {
        locationId: "downtown-hub",
        locationName: "Downtown Hub",
        arrivalTime: "6:15 AM",
        type: "pickup"
      },
      {
        locationId: "fedex-dist",
        locationName: "FedEx Distribution Center",
        arrivalTime: "6:35 AM",
        type: "dropoff"
      }
    ]
  },
  // ... more routes
];

// Utility function
export const getNextArrivalTimes = (
  route: PredeterminedRoute, 
  currentTime: Date = new Date()
): string[] => {
  const arrivals: string[] = [];
  // Calculate next 3 arrival times based on frequency
  // ...
  return arrivals;
};
```

---

### 8. Memphis Location Data

```typescript
// src/data/memphisPOIdata.ts
export type LocationType = "employment" | "community_center";

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  coordinates: { lat: number; lng: number };
  address: string;
  description: string;
  locked?: boolean;
}

export const memphisCenterCoords = {
  latitude: 35.1495,
  longitude: -90.049
};

export const memphisLocations: Location[] = [
  {
    id: "fedex-hq",
    name: "FedEx Corporate Headquarters",
    type: "employment",
    coordinates: { lat: 35.0875, lng: -89.9293 },
    address: "942 S Shady Grove Rd, Memphis, TN",
    description: "Major employer - 10,000+ employees"
  },
  {
    id: "methodist-hospital",
    name: "Methodist University Hospital",
    type: "employment",
    coordinates: { lat: 35.1333, lng: -90.0167 },
    address: "1265 Union Ave, Memphis, TN",
    description: "Healthcare center - 3,000+ employees"
  },
  {
    id: "wolfchase-galleria",
    name: "Wolfchase Galleria",
    type: "community_center",
    coordinates: { lat: 35.2275, lng: -89.7997 },
    address: "2760 N Germantown Pkwy, Memphis, TN",
    description: "Community pickup hub"
  },
  // ... more locations
];

export interface QuickNavArea {
  name: string;
  type: string;
  coordinates: { lat: number; lng: number };
  zoom: number;
}

export const quickNavAreas: QuickNavArea[] = [
  { name: "Downtown", type: "area", coordinates: { lat: 35.1495, lng: -90.049 }, zoom: 14 },
  { name: "Medical District", type: "area", coordinates: { lat: 35.139, lng: -90.026 }, zoom: 14 },
  // ... more areas
];
```

---

### 9. Driver Route Management

```typescript
// From DriverApp.tsx
interface Route {
  id: string;
  priority: "green" | "yellow" | "red";
  destination: string;
  pickupTime: string;
  passengers: number;
  estimatedDuration: string;
  issues?: string;
  gpsCoordinates: string;
  earnings?: string;
  trafficCondition?: "green" | "yellow" | "red";
  trafficAction?: string;
}

const DriverApp = () => {
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [upcomingRoutes, setUpcomingRoutes] = useState<Route[]>([]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "green": return "bg-green-500";
      case "yellow": return "bg-yellow-500";
      case "red": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const startRoute = (routeId: string) => {
    const route = upcomingRoutes.find(r => r.id === routeId);
    if (route) {
      setActiveRoute(route);
      setUpcomingRoutes(prev => prev.filter(r => r.id !== routeId));
    }
  };

  const completeRoute = () => {
    setActiveRoute(null);
  };

  // Simulate real-time updates
  useEffect(() => {
    if (activeRoute) {
      const interval = setInterval(() => {
        // Update traffic conditions, etc.
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [activeRoute]);

  return (
    <div>
      {activeRoute && (
        <Card>
          <Badge className={getStatusColor(activeRoute.priority)}>
            {activeRoute.priority.toUpperCase()}
          </Badge>
          <h3>{activeRoute.destination}</h3>
          <p>Duration: {activeRoute.estimatedDuration}</p>
          <p>Passengers: {activeRoute.passengers}</p>
          <Button onClick={completeRoute}>Complete Route</Button>
        </Card>
      )}
      
      {upcomingRoutes.map(route => (
        <Card key={route.id}>
          <h4>{route.destination}</h4>
          <Button onClick={() => startRoute(route.id)}>Start Route</Button>
        </Card>
      ))}
    </div>
  );
};
```

---

### 10. Toast Notification Pattern

```typescript
// Usage throughout the app
import { useToast } from "@/hooks/use-toast";

const Component = () => {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Ride Confirmed!",
      description: "Your ride has been scheduled. Driver details will be sent shortly.",
    });
  };

  const handleError = () => {
    toast({
      title: "Missing Information",
      description: "Please fill in pickup and destination locations.",
      variant: "destructive"
    });
  };

  const handleInfo = () => {
    toast({
      title: "Route Management",
      description: "Opening route management panel...",
    });
  };
};
```

---

### 11. Map Integration with Leaflet

```typescript
// src/components/maps/LeafletMap.tsx (conceptual)
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { memphisLocations, memphisCenterCoords } from "@/data/memphisPOIdata";

interface LeafletMapProps {
  selectedRoute: PredeterminedRoute | null;
}

const LeafletMap = ({ selectedRoute }: LeafletMapProps) => {
  return (
    <MapContainer
      center={[memphisCenterCoords.latitude, memphisCenterCoords.longitude]}
      zoom={11}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      
      {memphisLocations.map(location => (
        <Marker
          key={location.id}
          position={[location.coordinates.lat, location.coordinates.lng]}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{location.name}</h3>
              <p className="text-sm">{location.address}</p>
              <p className="text-xs text-muted-foreground">{location.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      {selectedRoute && <RouteLayer route={selectedRoute} />}
    </MapContainer>
  );
};
```

---

### 12. Employer Dashboard Stats

```typescript
// From EmployerFlow.tsx
const stats = [
  { label: "Active Employees", value: 20, change: "+2 from last week" },
  { label: "Active Routes", value: 2, change: "Both operational" },
  { label: "On-Time Rate", value: "98%", highlight: true },
  { label: "Monthly Savings", value: "$2,400", primary: true }
];

// Render stats grid
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {stats.map((stat, index) => (
    <Card key={index}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={cn(
          "text-2xl font-bold",
          stat.highlight && "text-green-600",
          stat.primary && "text-primary"
        )}>
          {stat.value}
        </div>
        <p className="text-xs text-muted-foreground">{stat.change}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

---

## Database Integration Examples

### Creating a Ride Request

```typescript
import { supabase } from "@/integrations/supabase/client";

const createRideRequest = async (rideData: {
  pickup: string;
  destination: string;
  passengers: number;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from('ride_requests')
    .insert({
      rider_id: user.id,
      pickup_location: rideData.pickup,
      destination: rideData.destination,
      passenger_count: rideData.passengers,
      status: 'requested'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

### Fetching User's Rides

```typescript
const fetchUserRides = async () => {
  const { data, error } = await supabase
    .from('ride_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// With TanStack Query
const { data: rides, isLoading } = useQuery({
  queryKey: ['rides'],
  queryFn: fetchUserRides
});
```

### Updating Ride Status (Driver)

```typescript
const acceptRide = async (rideId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from('ride_requests')
    .update({
      status: 'accepted',
      driver_id: user?.id,
      accepted_at: new Date().toISOString()
    })
    .eq('id', rideId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
```
