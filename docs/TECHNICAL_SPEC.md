# Technical Specification

## Build Configuration

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### TypeScript Configuration
- Strict mode enabled
- Path aliases: `@/*` maps to `src/*`
- Target: ES2020
- Module resolution: bundler

### Tailwind CSS
- Custom color tokens in `index.css`
- Design system tokens: primary, secondary, accent, muted, background, foreground
- Custom animations for car movement effects
- Responsive breakpoints: sm, md, lg, xl, 2xl

---

## Component Architecture

### UI Component Pattern (shadcn/ui)
All UI components follow the shadcn pattern:

```typescript
// Example: Button component
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground...",
        destructive: "bg-destructive text-destructive-foreground...",
        outline: "border border-input bg-background...",
        secondary: "bg-secondary text-secondary-foreground...",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Flow Component Pattern
Major user flows follow a consistent pattern:

```typescript
interface FlowProps {
  onBack: () => void;
}

const SomeFlow = ({ onBack }: FlowProps) => {
  const [step, setStep] = useState<"step1" | "step2" | "step3">("step1");
  const [formData, setFormData] = useState({...});
  const { toast } = useToast();

  const handleNext = () => {
    // Validation
    if (!formData.required) {
      toast({ title: "Error", variant: "destructive" });
      return;
    }
    setStep("step2");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBack={onBack} />
      <Tabs>
        {step === "step1" && <Step1 />}
        {step === "step2" && <Step2 />}
        {step === "step3" && <Step3 />}
      </Tabs>
    </div>
  );
};
```

---

## Data Structures

### Location Type
```typescript
type LocationType = "employment" | "community_center";

interface Location {
  id: string;
  name: string;
  type: LocationType;
  coordinates: { lat: number; lng: number };
  address: string;
  description: string;
  locked?: boolean;
}
```

### Route Type
```typescript
interface RouteStop {
  locationId: string;
  locationName: string;
  arrivalTime: string;
  type: "pickup" | "dropoff";
  notes?: string;
}

interface PredeterminedRoute {
  id: string;
  name: string;
  description: string;
  color: string;
  stops: RouteStop[];
  duration: string;
  frequency: number; // minutes
  capacity: number;
}
```

### Ride Request (Database)
```typescript
interface RideRequest {
  id: string;
  rider_id: string;
  driver_id?: string;
  pickup_location: string;
  pickup_lat?: number;
  pickup_lng?: number;
  destination: string;
  destination_lat?: number;
  destination_lng?: number;
  status: "requested" | "accepted" | "in_progress" | "completed" | "cancelled";
  passenger_count?: number;
  estimated_fare?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  accepted_at?: string;
  completed_at?: string;
}
```

### User Roles (Enum)
```typescript
type AppRole = "rider" | "driver" | "employer" | "admin" | "employee";
```

---

## State Management Patterns

### Context Pattern
```typescript
// Create context with type
type ContextType = {
  state: StateType;
  action: (param: ParamType) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

// Provider component
export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  
  const action = useCallback((param: ParamType) => {
    setState(newState);
  }, []);

  return (
    <Context.Provider value={{ state, action }}>
      {children}
    </Context.Provider>
  );
};

// Custom hook with error boundary
export const useContextHook = (): ContextType => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useContextHook must be used within Provider");
  }
  return context;
};
```

### Form State Pattern
```typescript
const [formData, setFormData] = useState({
  field1: "",
  field2: "",
  field3: ""
});

// Update single field
const updateField = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

// Reset form
const resetForm = () => {
  setFormData({
    field1: "",
    field2: "",
    field3: ""
  });
};
```

---

## API Integration

### Supabase Client Usage
```typescript
import { supabase } from "@/integrations/supabase/client";

// Query data
const { data, error } = await supabase
  .from('ride_requests')
  .select('*')
  .eq('rider_id', userId);

// Insert data
const { data, error } = await supabase
  .from('ride_requests')
  .insert({
    rider_id: userId,
    pickup_location: pickup,
    destination: destination,
    status: 'requested'
  });

// Update data
const { data, error } = await supabase
  .from('ride_requests')
  .update({ status: 'accepted' })
  .eq('id', requestId);
```

### TanStack Query Pattern
```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['rides', userId],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('ride_requests')
      .select('*')
      .eq('rider_id', userId);
    if (error) throw error;
    return data;
  }
});

// Mutation
const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: async (newRide: RideRequest) => {
    const { data, error } = await supabase
      .from('ride_requests')
      .insert(newRide);
    if (error) throw error;
    return data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['rides'] });
  }
});
```

---

## Map Integration

### Leaflet Setup
```typescript
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom marker icon
const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div class="marker-content">📍</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

// Map component
const LeafletMap = ({ selectedRoute }) => {
  return (
    <MapContainer
      center={[35.1495, -90.049]} // Memphis center
      zoom={11}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {locations.map(loc => (
        <Marker
          key={loc.id}
          position={[loc.coordinates.lat, loc.coordinates.lng]}
          icon={customIcon}
        >
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
```

### Routing Machine
```typescript
import L from "leaflet";
import "leaflet-routing-machine";

// Create routing control
const routingControl = L.Routing.control({
  waypoints: [
    L.latLng(pickup.lat, pickup.lng),
    L.latLng(destination.lat, destination.lng)
  ],
  routeWhileDragging: true,
  lineOptions: {
    styles: [{ color: '#0066CC', weight: 4 }]
  }
}).addTo(map);
```

---

## Environment Variables

```env
# Required (auto-generated by Lovable Cloud)
VITE_SUPABASE_URL="https://xxx.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJ..."
VITE_SUPABASE_PROJECT_ID="xxx"
```

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI framework |
| react-router-dom | ^6.26.2 | Client-side routing |
| @tanstack/react-query | ^5.56.2 | Server state management |
| leaflet | ^1.9.4 | Mapping library |
| react-leaflet | ^4.2.1 | React wrapper for Leaflet |
| leaflet-routing-machine | ^3.2.12 | Route calculation |
| @supabase/supabase-js | (via client) | Backend client |
| lucide-react | ^0.462.0 | Icon library |
| tailwindcss | (config) | Utility CSS |
| class-variance-authority | ^0.7.1 | Component variants |
| zod | ^3.23.8 | Schema validation |
| react-hook-form | ^7.53.0 | Form handling |
| recharts | ^2.12.7 | Data visualization |
| date-fns | ^3.6.0 | Date utilities |
| sonner | ^1.5.0 | Toast notifications |

---

## Performance Considerations

### Memoization
```typescript
// Memoize expensive computations
const filteredRoutes = useMemo(() => {
  return routes.filter(r => r.status === 'active');
}, [routes]);

// Memoize callbacks
const handleSelect = useCallback((id: string) => {
  setSelected(id);
}, []);

// Memoize components
const MapComponent = React.memo(({ route }) => {
  return <LeafletMap route={route} />;
});
```

### Lazy Loading
```typescript
// Route-level code splitting
const DriverApp = React.lazy(() => import('./pages/DriverApp'));
const MappingIndex = React.lazy(() => import('./pages/MappingIndex'));

// In router
<Suspense fallback={<Loading />}>
  <Route path="/driver" element={<DriverApp />} />
</Suspense>
```

---

## Testing Considerations

### Component Testing
- Each flow should be testable in isolation
- Mock `useToast` for notification testing
- Mock Supabase client for data layer testing

### E2E Testing
- Test complete user journeys
- Verify form validation
- Test role-based access

### Key Test Scenarios
1. Employee books ride from hub to employment center
2. Employer views dashboard metrics
3. Driver accepts and completes route
4. General public requests community ride
5. Language switching works correctly
