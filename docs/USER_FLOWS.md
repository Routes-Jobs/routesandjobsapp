# User Flows Documentation

## Flow Diagrams

### Overall Application Flow

```mermaid
graph TD
    subgraph "Entry Points"
        A[Homepage /] --> B{User Selection}
        J[/jobs] --> JL[Job Listings Page]
        D[/driver] --> DA[Driver App]
        M[/mapping] --> MA[Mapping Page]
    end

    subgraph "Role Selection"
        B -->|Find a Job| JL
        B -->|Get a Ride| GP[General Public Flow]
        B -->|Employer Portal| EMP[Employer Flow]
        B -->|Driver Login| DA
        B -->|Ride Widget| GP
    end

    subgraph "Employee Flow"
        EF[Employee Portal] --> EF1[Work Transportation Tab]
        EF --> EF2[Browse Jobs Tab]
        EF1 --> EF3[Select Pickup Hub]
        EF3 --> EF4[Select Job Destination]
        EF4 --> EF5[Choose Shift]
        EF5 --> EF6[View Price Calculator]
        EF6 --> EF7[Review Schedule]
        EF7 --> EF8[Select Pass]
        EF8 --> EF9[Confirm Ride]
    end
```

---

## 1. Employee Flow

### Purpose
Allow employees to schedule reliable transportation to job sites with flat-rate pricing.

### Screen: Work Transportation Tab

#### Step 1: Request (Initial)
**Components**: Location selectors, shift selector, price calculator

**User Actions**:
1. Select pickup location from dropdown (5 hub options)
2. Select job site destination from dropdown (6 options)
3. Choose shift type (First, Second, Third, Custom)
4. View real-time price calculation

**Data Collected**:
```typescript
{
  pickup: "Midtown Hub (Memphis)",
  destination: "FedEx Distribution Center (Memphis)",
  shift: "first" // 6 AM - 2 PM
}
```

**Available Pickup Hubs**:
- Midtown Hub (Memphis)
- Downtown Hub (Memphis)
- East Memphis Hub (Memphis)
- South Memphis Hub (Memphis)
- Airport Hub (Memphis)

**Available Job Sites**:
- FedEx Distribution Center (Memphis)
- Amazon Fulfillment Center (Memphis)
- AutoZone Distribution Center (Memphis)
- Manufacturing Plant A (Memphis)
- Logistics Center B (Memphis)
- UPS Distribution Center (Memphis)

**Shift Options**:
| Shift | Hours |
|-------|-------|
| First | 6 AM - 2 PM |
| Second | 2 PM - 10 PM |
| Third | 10 PM - 6 AM |
| Custom | User-defined |

#### Step 2: Schedule
**Purpose**: Review ride summary before pricing

**Displayed Information**:
- From: [Selected Pickup]
- To: [Selected Destination]
- Shift: [Selected Shift]
- Schedule: Next available pickup for shift

**Actions**:
- Back → Return to Step 1
- Review Pricing → Proceed to Step 3

#### Step 3: Subscription (Pricing)
**Purpose**: Select payment method and confirm ride

**Pricing Options**:

| Plan | Price | Features |
|------|-------|----------|
| Weekly Pass | $35 | Unlimited rides for 7 days, priority scheduling, shift-time guaranteed pickup |
| Monthly Pass | $120 | All weekly features + emergency ride credits, save $20 vs weekly |
| Single Ride | $5.50 | One-time ride (or FREE with pass) |

**Final Summary**:
- Route: [Pickup] → [Destination]
- Schedule: Next available pickup
- Estimated Cost: $5.50 or FREE with pass

**Actions**:
- Back → Return to Step 2
- Confirm Ride → Complete booking, show toast, reset form

### Screen: Browse Jobs Tab
**Component**: JobListings
**Purpose**: View job opportunities with integrated transportation

---

## 2. Employer Flow

### Purpose
Enable employers to manage workforce transportation, track metrics, and optimize routes.

### Tab: Dashboard

#### Quick Stats Cards
| Metric | Value | Description |
|--------|-------|-------------|
| Active Employees | 20 | +2 from last week |
| Active Routes | 2 | Both operational |
| On-Time Rate | 98% | Last 30 days |
| Monthly Savings | $2,400 | vs. individual rides |

#### Today's Transportation Activity
Shows scheduled pickups with status:
- First Shift Pickup (6:00 AM) - In Progress
- Second Shift Pickup (2:00 PM) - Scheduled

#### Transportation Routes
Displays route cards with:
- Route name
- Employee count
- Pickup hubs list
- Destination
- Next pickup time
- Status badge (active/inactive)
- "Manage Route" button

#### Employee Transportation Status
Real-time tracking of employees:
- Name
- Route assignment
- Shift type
- Status (Scheduled, En Route, Completed)

#### Job Locations Map
Interactive MapView showing:
- Job site markers
- Pickup hub markers
- Active/scheduled status indicators

### Tab: Live Tracking
**Component**: RealTimeTrackingMap
**Purpose**: Real-time GPS tracking of vehicles and drivers

### Tab: Smart Routing
**Purpose**: Match workers to jobs based on location and transportation availability

**Features**:
- Worker availability by zone
- Available transportation routes with seat counts
- Distance and commute time optimization

**Sample Data**:
| Zone | Workers | Avg Commute | Routes |
|------|---------|-------------|--------|
| Midtown | 8 | 12 min | 2 |
| Downtown | 5 | 15 min | 1 |
| East Memphis | 10 | 18 min | 2 |

### Tab: ARK Tracking
**Purpose**: Track Attendance, Retention, and Key Performance metrics

**ARK Metrics**:
- Attendance Rate
- Retention Rate (30/60/90 day)
- Punctuality Score
- Transportation Reliability

### Tab: AI Matching
**Purpose**: AI-powered worker-job matching based on:
- Location proximity
- Skills match
- Transportation availability
- Shift preferences

### Tab: Jobs
**Component**: EmployerJobManagement
**Purpose**: Create, edit, and manage job postings

### Tab: Insights
**Purpose**: Analytics and reporting on:
- Transportation costs
- Employee satisfaction
- Route efficiency
- Cost savings vs. alternatives

### Tab: Pricing
**Component**: EmployerPricingCalendar
**Purpose**: Cost planning and budgeting for workforce transportation

---

## 3. General Public Flow

### Purpose
Enable community members to request affordable rides and find jobs with transportation.

### Tab: Rides & Pricing

#### Value Proposition Cards
Three highlight cards:
1. **Affordable** (Green): Rides starting at $1.50
2. **Reliable** (Blue): 94.2% on-time rate
3. **Keeps Moving** (Purple): Continuous service

#### Jobs with Guaranteed Transportation
Job cards with integrated transport:

| Job | Location | Shift | Pay | Transport |
|-----|----------|-------|-----|-----------|
| Warehouse Associate - FedEx | FedEx Distribution Center | 6 AM - 2 PM | $18.50/hr | Free daily shuttle |
| Fulfillment Associate - Amazon | Amazon Fulfillment Center | 7 AM - 3:30 PM | $17.25/hr | $1.50/day van |
| Distribution Worker - AutoZone | AutoZone Distribution Center | 5:30 AM - 2 PM | $19.00/hr | Free company shuttle |
| Hospital Support - Memphis Medical | Memphis Medical Center | Multiple | $16.75/hr | $2.00/day shuttle |

**Action**: "Get Ride to This Job" → Pre-fills destination

### Step 1: Request Ride

**Quick Location Badges**:
- Pickup: Downtown Memphis, Midtown, East Memphis, Germantown, Cordova
- Destination: Memphis Airport, Beale Street, Graceland, Medical District, University of Memphis, Shelby Farms

**Form Fields**:
- Pickup Location (with address autocomplete)
- Destination (with address autocomplete)
- Number of Passengers (1-4)

**Actions**:
- Find Rides → Proceed to route selection

### Step 2: Route Selection

**Route Options**:

| Route | Price | Duration | Pickup | Rating | Features |
|-------|-------|----------|--------|--------|----------|
| Employee Discount | $2.75 (was $5.50) | 25 min | 15 min | 4.8 | 50% off with work ID |
| Workplace Shuttle | $1.50 | 35 min | 10 min | 4.9 | Shared service |
| Community Ride | $3.25 | 30 min | 20 min | 4.6 | Standard option |

**Actions**:
- Select Route → Proceed to payment
- Back to Request → Return to Step 1

### Step 3: Payment

**Payment Options**:

| Option | Price | Description |
|--------|-------|-------------|
| Pay Per Ride | $3.25 | One-time payment |
| Weekly Pass | $35 | 7 days unlimited |
| Monthly Pass | $120 | 30 days unlimited |

**Final Summary**:
- Trip details
- Selected route
- Cost breakdown

**Actions**:
- Back → Return to route selection
- Confirm Ride → Complete booking

### Tab: Job Listings
**Component**: JobListings
**Purpose**: Browse and apply for jobs

---

## 4. Driver Flow

### Purpose
Enable drivers to manage routes, track performance, and navigate to pickups.

### Login Screen
Simple name input for demo authentication

### Dashboard Layout

#### Active Route Card
When a route is in progress:
- Status badge with priority (green/yellow/red)
- Destination
- Duration
- Passenger count
- Issues (if any)
- Traffic conditions
- "Complete Route" button

#### Traffic Light Status
Visual indicators for traffic conditions:
- 🟢 Green: Clear
- 🟡 Yellow: Moderate
- 🔴 Red: Heavy traffic

#### Upcoming Routes
List of pending routes with:
- Priority indicator
- Destination
- Pickup time
- Passenger count
- "Start Route" button

#### Route Map
Visual display of route locations

#### Performance Metrics
| Metric | Value |
|--------|-------|
| Routes Completed Today | [count] |
| Average Rating | [rating] |
| Total Passengers | [count] |

#### Action Buttons
- Back (return to homepage)
- GPS (open navigation)
- Logout

---

## 5. Job Listings Flow

### Standalone Page (/jobs)

#### Search and Filters
- Search bar (keyword search)
- Location filter dropdown
- Job type filter dropdown

#### Job Card Display
Each job shows:
- Title
- Company
- Location
- Salary
- Job type badge
- Posted date
- "Apply Now" button
- "Book Ride" button (if transport available)

#### Job Detail View
When a job is selected:
- Full description
- Requirements
- Benefits
- Transportation details
- Interview ride booking option

---

## 6. Mapping Flow

### Page: /mapping

#### Map Display
- Full-width Leaflet map
- Memphis center coordinates
- Zoom level 11

#### Info Cards (3-column grid)

**Card 1: Map Info**
- Current map provider (Leaflet)
- Features list
- Memphis data counts

**Card 2: Pricing**
- Free tier info
- No API key required

**Card 3: Predetermined Routes**
- List of available routes
- Route selection
- Next arrival times

#### Route Selection
When a route is selected:
- Map updates to show route
- Stops are highlighted
- Route path is drawn

---

## Error Handling

### Form Validation
All flows include validation:
```typescript
if (!rideData.pickup || !rideData.destination) {
  toast({
    title: "Missing Information",
    description: "Please fill in pickup and destination locations.",
    variant: "destructive"
  });
  return;
}
```

### Toast Notifications
Success and error states communicated via toast:
- Success: Green toast with confirmation
- Error: Red toast with guidance
- Info: Default toast for status updates

---

## Navigation Patterns

### Back Button
All flows include a back button that:
- Returns to previous step within flow
- Returns to role selection from flow header

### Tab Navigation
Flows use shadcn Tabs for section switching:
- Persistent tab state
- URL doesn't change (SPA behavior)

### External Navigation
Some actions open new pages:
- Driver Login → /driver (new tab)
- View Jobs → /jobs (same tab)
- Mapping → /mapping (same tab)
