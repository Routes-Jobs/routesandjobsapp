# ChatGPT Review Prompt

Use the following prompt to get ChatGPT to review and enhance the Routes & Jobs application.

---

## Base Prompt

```
You are reviewing a React/TypeScript workforce transportation and job-matching 
platform called "Routes & Jobs" focused on Memphis, TN.

## Application Overview

The application connects workers with affordable transportation to employment 
centers while enabling employers to manage workforce logistics.

### Core Value Proposition: ARK
- **Affordable**: Rides starting at $1.50 (70% less than rideshare)
- **Reliable**: 94.2% on-time rate with guaranteed pickups
- **Keeps Moving**: Continuous service with optimized scheduling
- **No Surge Pricing**: Flat-rate, predictable costs

### User Roles
1. **Employee** - Workers booking rides to job sites
2. **Employer** - Companies managing workforce transportation
3. **General Public** - Community members requesting rides
4. **Driver** - Route management and navigation

### Technology Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui components
- Leaflet for mapping
- Supabase/PostgreSQL backend
- TanStack Query for data fetching
- React Router for navigation

### Key Features
- Multi-step ride booking flows
- Job listings with guaranteed transportation
- Employer dashboard with ARK metrics
- Real-time tracking capabilities
- Predetermined routes and schedules
- Multi-language support (EN, ES, FR, DE)
- Flat-rate pricing with subscription passes

### Database Tables
- profiles (user info)
- ride_requests (booking records)
- user_roles (RBAC)
- activity_logs (audit trail)

### Pricing Structure
- Workplace Shuttle: $1.50
- Employee Discount: $2.75 (50% off)
- Community Ride: $3.25
- Weekly Pass: $35
- Monthly Pass: $120

I have attached the following documentation files:
1. SYSTEM_DOCUMENTATION.md - Complete overview
2. TECHNICAL_SPEC.md - Technical details
3. USER_FLOWS.md - User journey documentation
4. DATABASE_SCHEMA.md - Database structure
5. COMPONENTS.md - Component reference
6. CODE_SAMPLES.md - Implementation examples

Please review and provide:
1. Missing features for production readiness
2. UX improvements for each user type
3. Security recommendations
4. Scalability considerations
5. Integration opportunities
```

---

## Specific Review Prompts

### Security Review
```
Based on the Routes & Jobs documentation, analyze the security posture:

1. Review the RLS policies in DATABASE_SCHEMA.md
2. Identify potential vulnerabilities in the auth flow
3. Check for sensitive data exposure risks
4. Recommend additional security measures
5. Evaluate the role-based access control implementation

Focus areas:
- API security
- Data validation
- Authentication/authorization
- PII handling
- Session management
```

### UX Enhancement
```
Review the user flows in USER_FLOWS.md and suggest UX improvements:

For each user type (Employee, Employer, General Public, Driver):
1. Identify friction points in the current flow
2. Suggest ways to reduce steps/clicks
3. Recommend accessibility improvements
4. Propose mobile optimization strategies
5. Suggest ways to improve conversion rates

Consider:
- First-time user experience
- Repeat user optimization
- Error handling and recovery
- Loading states and feedback
- Form usability
```

### Feature Enhancement
```
Based on the current system documentation, suggest feature enhancements:

1. What features are missing for MVP launch?
2. What features would improve retention?
3. What integrations would add value?
4. How can AI/ML improve the experience?
5. What analytics should be tracked?

Categories to consider:
- Ride booking experience
- Payment processing
- Communication/notifications
- Route optimization
- Employer tools
- Driver tools
```

### Architecture Review
```
Analyze the technical architecture in TECHNICAL_SPEC.md:

1. Evaluate the component structure
2. Assess state management approach
3. Review data fetching patterns
4. Identify performance bottlenecks
5. Suggest architectural improvements

Consider:
- Code organization
- Reusability
- Testing strategies
- Error boundaries
- Performance optimization
- Bundle size
```

### Database Optimization
```
Review the database schema in DATABASE_SCHEMA.md:

1. Evaluate table design decisions
2. Suggest missing indexes
3. Recommend additional tables
4. Review RLS policy efficiency
5. Propose query optimizations

Consider:
- Scalability to 100k+ users
- Query performance
- Data integrity
- Audit requirements
- Analytics needs
```

### Integration Opportunities
```
Based on the system capabilities, suggest integrations:

1. Payment processors (Stripe, Square)
2. Communication (SMS, push notifications)
3. Maps/routing (Google Maps, HERE)
4. HR systems
5. Calendar/scheduling tools

For each integration:
- Implementation approach
- Required API/secrets
- Data flow
- Error handling
- Fallback strategies
```

---

## Q&A Prompts

### General Questions
```
About the Routes & Jobs application:

Q: How does the pricing model work?
Q: What user roles exist and what can each do?
Q: How is routing calculated?
Q: What data is stored about rides?
Q: How are employers billed?
```

### Technical Questions
```
Technical questions about implementation:

Q: How is authentication implemented?
Q: What's the data flow for booking a ride?
Q: How does real-time tracking work?
Q: How are routes optimized?
Q: What caching strategies are used?
```

### Business Questions
```
Business model questions:

Q: What's the revenue model?
Q: Who are the target customers?
Q: What's the competitive advantage?
Q: How does employer onboarding work?
Q: What's the driver acquisition strategy?
```

---

## Enhancement Request Templates

### New Feature Request
```
I need to add [FEATURE NAME] to Routes & Jobs.

Context from documentation:
- Current user flows: [reference USER_FLOWS.md]
- Existing components: [reference COMPONENTS.md]
- Database tables: [reference DATABASE_SCHEMA.md]

Requirements:
1. [Requirement 1]
2. [Requirement 2]
3. [Requirement 3]

Please provide:
1. Technical implementation approach
2. Required database changes
3. Component modifications
4. API endpoints needed
5. Testing strategy
```

### Bug Fix Request
```
I have an issue in Routes & Jobs:

Problem: [Description]
Expected behavior: [What should happen]
Actual behavior: [What happens]

Relevant code: [reference CODE_SAMPLES.md]
User flow affected: [reference USER_FLOWS.md]

Please provide:
1. Root cause analysis
2. Fix implementation
3. Regression prevention
4. Testing approach
```

### Optimization Request
```
I need to optimize [AREA] in Routes & Jobs.

Current implementation: [reference TECHNICAL_SPEC.md]
Performance issue: [Description]
Target metrics: [Goals]

Please provide:
1. Performance audit
2. Optimization strategies
3. Implementation changes
4. Measurement approach
```

---

## Workflow Enhancement Prompts

### Employee Workflow
```
Improve the employee ride booking workflow:

Current flow (from USER_FLOWS.md):
1. Select pickup hub
2. Select job destination
3. Choose shift
4. View pricing
5. Confirm ride

Pain points:
- [Identified issues]

Suggest improvements for:
- Reducing booking time
- Improving location selection
- Simplifying pricing display
- Adding helpful features
```

### Employer Workflow
```
Enhance the employer dashboard experience:

Current capabilities (from COMPONENTS.md):
- Dashboard with stats
- Route management
- Employee tracking
- ARK metrics
- AI matching

Suggest improvements for:
- Data visualization
- Route optimization
- Employee management
- Cost analysis
- Reporting
```

### Driver Workflow
```
Optimize the driver application:

Current features (from USER_FLOWS.md):
- Active route display
- Traffic monitoring
- Performance metrics
- Route completion

Suggest improvements for:
- Navigation integration
- Passenger communication
- Earnings tracking
- Schedule management
```

---

## Production Readiness Checklist

```
Evaluate Routes & Jobs for production readiness:

Based on the documentation, check:

□ Authentication & Authorization
  - Login/signup flows
  - Password reset
  - Session management
  - Role-based access

□ Data Security
  - RLS policies
  - Input validation
  - PII handling
  - Encryption

□ Error Handling
  - API errors
  - Network failures
  - Validation errors
  - User feedback

□ Performance
  - Loading states
  - Caching
  - Bundle optimization
  - Database queries

□ Mobile Experience
  - Responsive design
  - Touch interactions
  - Offline support
  - App-like experience

□ Monitoring & Logging
  - Error tracking
  - Analytics
  - Performance monitoring
  - Audit logs

□ Payment Processing
  - Integration status
  - Security compliance
  - Refund handling
  - Invoice generation

□ Communication
  - Email notifications
  - SMS alerts
  - Push notifications
  - In-app messaging

Provide a gap analysis and prioritized roadmap.
```

---

## Copy All Documentation

To provide ChatGPT with full context, share these files:
1. `docs/SYSTEM_DOCUMENTATION.md`
2. `docs/TECHNICAL_SPEC.md`
3. `docs/USER_FLOWS.md`
4. `docs/DATABASE_SCHEMA.md`
5. `docs/COMPONENTS.md`
6. `docs/CODE_SAMPLES.md`

You can copy the contents of each file directly into ChatGPT, or upload them as attachments if using GPT-4 with file upload capability.
