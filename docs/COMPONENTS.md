# Components Reference

## Component Hierarchy

```
App.tsx
├── Providers (QueryClient, Tooltip, Language, Toast)
├── BrowserRouter
│   └── Routes
│       ├── Index (/)
│       │   ├── Header
│       │   └── RoleSelection | EmployeeFlow | EmployerFlow | GeneralPublicFlow
│       ├── SimpleJobListings (/jobs)
│       ├── DriverApp (/driver)
│       ├── EmployeeLocations (/employee-locations)
│       └── MappingIndex (/mapping)
│           └── RouteProvider
│               └── MapSelector
```

---

## Page Components

### Index (`src/pages/Index.tsx`)
**Purpose**: Homepage with role selection

```typescript
interface Props {}

// State
const [selectedRole, setSelectedRole] = useState<UserRole>(null);
type UserRole = "employee" | "employer" | "general" | null;
```

**Renders**: Header + (RoleSelection | EmployeeFlow | EmployerFlow | GeneralPublicFlow)

---

### DriverApp (`src/pages/DriverApp.tsx`)
**Purpose**: Driver dashboard with route management

```typescript
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
```

**Features**:
- Login flow
- Active route display
- Upcoming routes list
- Traffic status indicators
- Performance metrics
- Map visualization

---

### SimpleJobListings (`src/pages/SimpleJobListings.tsx`)
**Purpose**: Standalone job listings page

```typescript
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedDate: string;
  hasTransportation?: boolean;
  transportationDetails?: string;
  interviewDate?: string;
  interviewLocation?: string;
}
```

**Features**:
- Search by keyword
- Filter by location
- Filter by job type
- Job detail view
- Apply button
- Book interview ride button

---

### MappingIndex (`src/pages/MappingIndex.tsx`)
**Purpose**: Memphis map visualization with routes

**Features**:
- Info cards for employment access, community hubs, smart routing
- MapSelector component with full map display

---

### EmployeeLocations (`src/pages/EmployeeLocations.tsx`)
**Purpose**: Employee drop-off location selector

**Features**:
- Back navigation
- EmployeeLocationSelector component

---

## Flow Components

### RoleSelection (`src/components/RoleSelection.tsx`)
**Purpose**: Landing page with role cards and ride booking widget

```typescript
interface RoleSelectionProps {
  onRoleSelect: (role: "employee" | "employer" | "general") => void;
}
```

**Features**:
- Animated background with car photos
- Ride booking widget
- Three role cards: Find a Job, Get a Ride, Employer Portal
- Driver Portal section

---

### EmployeeFlow (`src/components/EmployeeFlow.tsx`)
**Purpose**: Employee ride scheduling flow

```typescript
interface EmployeeFlowProps {
  onBack: () => void;
}

// State
type Step = "request" | "schedule" | "subscription";
interface RideData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  shift: string;
}
```

**Tabs**: Work Transportation, Browse Jobs

---

### EmployerFlow (`src/components/EmployerFlow.tsx`)
**Purpose**: Employer dashboard with multiple tabs

```typescript
interface EmployerFlowProps {
  onBack: () => void;
}
```

**Tabs**:
- Dashboard (stats, routes, employees, map)
- Live Tracking
- Smart Routing
- ARK Tracking
- AI Matching
- Jobs
- Insights
- Pricing

---

### GeneralPublicFlow (`src/components/GeneralPublicFlow.tsx`)
**Purpose**: Public ride request and job browsing

```typescript
interface GeneralPublicFlowProps {
  onBack: () => void;
}

// State
type Step = "request" | "routes" | "payment";
interface RideData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: string;
}
```

**Tabs**: Rides & Pricing, Job Listings

---

## Map Components

### MapSelector (`src/components/MapSelector.tsx`)
**Purpose**: Main map display with route selection

```typescript
interface Props {}
```

**Features**:
- Leaflet map display
- Map info card
- Pricing card
- Predetermined routes panel

---

### LeafletMap (`src/components/maps/LeafletMap.tsx`)
**Purpose**: Leaflet map implementation

```typescript
interface LeafletMapProps {
  selectedRoute: PredeterminedRoute | null;
}
```

**Features**:
- OpenStreetMap tiles
- Custom markers for locations
- Route visualization
- Popup information

---

### MapView (`src/components/MapView.tsx`)
**Purpose**: Reusable map component for employer dashboard

```typescript
interface MapViewProps {
  locations: Array<{
    id: string;
    name: string;
    coordinates: [number, number];
    type: "job" | "pickup";
    status?: string;
  }>;
  height?: string;
}
```

---

### MapInfo (`src/components/maps/MapInfo.tsx`)
**Purpose**: Map information display card

---

### MapPricingCard (`src/components/MapPricingCard.tsx`)
**Purpose**: Display map pricing information

```typescript
interface MapPricingCardProps {
  mapType: string;
  userCount: number;
}
```

---

### PredeterminedRoutes (`src/components/PredeterminedRoutes.tsx`)
**Purpose**: Route selection panel

**Features**:
- List predefined routes
- Show route details
- Calculate next arrival times
- Route selection via context

---

### RealTimeTrackingMap (`src/components/RealTimeTrackingMap.tsx`)
**Purpose**: Real-time vehicle tracking for employers

---

## Utility Components

### Header (`src/components/Header.tsx`)
**Purpose**: Main navigation header

**Features**:
- Logo
- Navigation links (HOME, JOBS, FIND RIDES, MAP, DRIVERS, ABOUT)
- Language toggle
- Login/Signup buttons
- Login and Signup dialogs

---

### JobListings (`src/components/JobListings.tsx`)
**Purpose**: Reusable job listings component

```typescript
interface JobListingsProps {
  userType?: "employee" | "general";
}
```

---

### RideBookingWidget (`src/components/RideBookingWidget.tsx`)
**Purpose**: Quick ride booking form on homepage

```typescript
interface RideBookingWidgetProps {
  onSearchRide: (pickup: string, destination: string) => void;
}
```

---

### LanguageToggle (`src/components/LanguageToggle.tsx`)
**Purpose**: Language selector dropdown

---

### LoginDialog (`src/components/LoginDialog.tsx`)
**Purpose**: Login modal

---

### SignupDialog (`src/components/SignupDialog.tsx`)
**Purpose**: Signup modal

---

### EmployeePriceCalculator (`src/components/EmployeePriceCalculator.tsx`)
**Purpose**: Calculate ride prices for employees

```typescript
interface EmployeePriceCalculatorProps {
  pickup: string;
  destination: string;
}
```

---

### EmployeeLocationSelector (`src/components/EmployeeLocationSelector.tsx`)
**Purpose**: Select employee drop-off locations

```typescript
interface EmployeeLocationSelectorProps {
  onLocationSelect: (location: any) => void;
}
```

---

### EmployeeKPIs (`src/components/EmployeeKPIs.tsx`)
**Purpose**: Employee key performance indicators

---

### EmployerJobManagement (`src/components/EmployerJobManagement.tsx`)
**Purpose**: Job posting management for employers

---

### EmployerPricingCalendar (`src/components/EmployerPricingCalendar.tsx`)
**Purpose**: Cost planning calendar for employers

---

### RouteSelector (`src/components/RouteSelector.tsx`)
**Purpose**: Route selection interface

---

### AnimatedRoadNetwork (`src/components/AnimatedRoadNetwork.tsx`)
**Purpose**: Animated road visualization

---

## UI Components (shadcn/ui)

Located in `src/components/ui/`:

| Component | Purpose |
|-----------|---------|
| accordion | Collapsible content sections |
| address-autocomplete | Location input with suggestions |
| alert | Alert messages |
| alert-dialog | Confirmation dialogs |
| avatar | User avatars |
| badge | Status badges |
| breadcrumb | Navigation breadcrumbs |
| button | Action buttons |
| calendar | Date picker |
| card | Content cards |
| carousel | Image/content carousel |
| chart | Data visualization |
| checkbox | Checkbox inputs |
| collapsible | Collapsible sections |
| command | Command palette |
| context-menu | Right-click menus |
| dialog | Modal dialogs |
| drawer | Side drawers |
| dropdown-menu | Dropdown menus |
| form | Form wrapper with validation |
| hover-card | Hover information cards |
| input | Text inputs |
| input-otp | OTP input |
| label | Form labels |
| menubar | Menu bar |
| navigation-menu | Navigation menus |
| pagination | Page navigation |
| popover | Popover content |
| progress | Progress bars |
| radio-group | Radio button groups |
| resizable | Resizable panels |
| scroll-area | Scrollable containers |
| select | Select dropdowns |
| separator | Visual separators |
| sheet | Side sheets |
| sidebar | Sidebar navigation |
| skeleton | Loading skeletons |
| slider | Range sliders |
| sonner | Toast notifications |
| switch | Toggle switches |
| table | Data tables |
| tabs | Tab navigation |
| textarea | Multi-line text input |
| toast | Toast messages |
| toaster | Toast container |
| toggle | Toggle buttons |
| toggle-group | Toggle button groups |
| tooltip | Tooltips |

---

## Context Providers

### LanguageProvider (`src/contexts/LanguageContext.tsx`)

```typescript
type Language = 'en' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
```

**Usage**:
```typescript
const { t, language, setLanguage } = useLanguage();
```

---

### RouteProvider (`src/contexts/RouteContext.tsx`)

```typescript
interface RouteContextType {
  selectedRoute: PredeterminedRoute | null;
  selectRoute: (route: PredeterminedRoute | null) => void;
  clearRoute: () => void;
}
```

**Usage**:
```typescript
const { selectedRoute, selectRoute, clearRoute } = useRoute();
```

---

## Custom Hooks

### useToast (`src/hooks/use-toast.ts`)
**Purpose**: Toast notification management

```typescript
const { toast } = useToast();

toast({
  title: "Success",
  description: "Your action was completed.",
  variant: "default" | "destructive"
});
```

---

### useMobile (`src/hooks/use-mobile.tsx`)
**Purpose**: Detect mobile viewport

```typescript
const isMobile = useMobile();
```

---

## Component Best Practices

### Props Interface Pattern
```typescript
interface ComponentProps {
  requiredProp: string;
  optionalProp?: number;
  callback: (value: string) => void;
}

const Component = ({ requiredProp, optionalProp = 0, callback }: ComponentProps) => {
  // ...
};
```

### State Management Pattern
```typescript
// Local state for UI
const [isOpen, setIsOpen] = useState(false);

// Form state
const [formData, setFormData] = useState({
  field1: "",
  field2: ""
});

// Context for shared state
const { sharedState, updateState } = useContext(AppContext);
```

### Event Handler Pattern
```typescript
const handleSubmit = () => {
  if (!validateForm()) {
    toast({ title: "Error", variant: "destructive" });
    return;
  }
  
  // Process submission
  toast({ title: "Success" });
  resetForm();
};
```
