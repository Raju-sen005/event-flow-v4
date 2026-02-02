# Architecture Guide

## 📁 Project Structure

```
event-guest-management-platform/
├── docs/                          # Documentation files
│   ├── README.md                  # Documentation index
│   ├── 01-SYSTEM-OVERVIEW.md     # Platform overview
│   ├── 02-ARCHITECTURE-GUIDE.md  # This file
│   └── ...                        # Other documentation
│
├── src/
│   ├── app/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── ui/               # Base UI components (buttons, inputs, etc.)
│   │   │   ├── figma/            # Figma-imported components
│   │   │   ├── AdvancedFilterModal.tsx
│   │   │   ├── ExportModal.tsx
│   │   │   └── ...               # Feature-specific components
│   │   │
│   │   ├── context/              # React Context providers
│   │   │   └── AuthContext.tsx   # Authentication state management
│   │   │
│   │   ├── layouts/              # Layout wrappers for different user types
│   │   │   ├── AdminLayout.tsx   # Admin/Super Admin layout
│   │   │   ├── CustomerLayout.tsx # Customer layout
│   │   │   ├── VendorLayout.tsx  # Vendor layout
│   │   │   └── AuthLayout.tsx    # Authentication pages layout
│   │   │
│   │   ├── pages/                # Page components
│   │   │   ├── customer/         # Customer module pages
│   │   │   ├── vendor/           # Vendor module pages
│   │   │   ├── admin/            # Admin module pages
│   │   │   ├── LandingPage.tsx   # Public landing page
│   │   │   ├── Login.tsx         # Login page
│   │   │   ├── SignUp.tsx        # Sign up page
│   │   │   └── ...               # Other auth pages
│   │   │
│   │   ├── utils/                # Utility functions
│   │   │   └── export.ts         # Export utilities (CSV, JSON, Print)
│   │   │
│   │   ├── App.tsx               # Root application component
│   │   └── routes.ts             # Routing configuration
│   │
│   └── styles/                   # Global styles
│       ├── index.css             # Main stylesheet entry
│       ├── theme.css             # Design system tokens
│       ├── tailwind.css          # Tailwind directives
│       └── fonts.css             # Font imports
│
├── package.json                  # Dependencies and scripts
├── vite.config.ts               # Vite build configuration
└── postcss.config.mjs           # PostCSS configuration
```

---

## 🏛️ Architecture Patterns

### 1. Component-Based Architecture

The application follows React's component-based architecture:

```
Application
├── Routes (Router Level)
│   ├── Public Routes (Landing, Login, Signup)
│   └── Protected Routes
│       ├── Customer Routes (CustomerLayout wrapper)
│       ├── Vendor Routes (VendorLayout wrapper)
│       └── Admin Routes (AdminLayout wrapper)
│
├── Layouts (Structure Level)
│   ├── Header/Navigation
│   ├── Sidebar
│   └── Main Content Area
│
├── Pages (Feature Level)
│   ├── Dashboard
│   ├── Feature-specific pages
│   └── Detail views
│
└── Components (UI Level)
    ├── Shared UI components
    ├── Feature components
    └── Modal components
```

### 2. Layout Pattern

Each user role has a dedicated layout component that provides:
- **Consistent navigation** (sidebar + header)
- **Role-based routing**
- **Responsive structure**
- **Common UI elements**

**File Locations:**
- `/src/app/layouts/CustomerLayout.tsx`
- `/src/app/layouts/VendorLayout.tsx`
- `/src/app/layouts/AdminLayout.tsx`
- `/src/app/layouts/AuthLayout.tsx`

**Layout Structure:**
```tsx
<Layout>
  <Header />
  <div className="flex">
    <Sidebar />
    <MainContent>
      {children} // Page content rendered here
    </MainContent>
  </div>
</Layout>
```

### 3. Routing Architecture

Uses **React Router v7 Data Mode** pattern:

**File**: `/src/app/routes.ts`

```tsx
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  // Public routes
  { path: "/", Component: LandingPage },
  { path: "/login", Component: Login },
  
  // Customer routes (wrapped in CustomerLayout)
  {
    path: "/customer",
    Component: CustomerLayout,
    children: [
      { index: true, Component: CustomerDashboard },
      { path: "events", Component: Events },
      // ... more customer routes
    ],
  },
  
  // Vendor routes (wrapped in VendorLayout)
  {
    path: "/vendor",
    Component: VendorLayout,
    children: [
      { index: true, Component: VendorDashboard },
      // ... vendor routes
    ],
  },
  
  // Admin routes (wrapped in AdminLayout)
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      // ... admin routes
    ],
  },
]);
```

**Key Principles:**
- ✅ Layouts are defined at route level
- ✅ Child routes inherit parent layout
- ✅ Pages don't need to import layout components
- ❌ Never wrap page content with layout component inside the page itself

---

## 🔄 State Management

### 1. Authentication State (Global)

**File**: `/src/app/context/AuthContext.tsx`

```tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: 'customer' | 'vendor' | 'admin' | 'super-admin' | null;
}
```

**Usage:**
```tsx
import { useAuth } from '../context/AuthContext';

function Component() {
  const { user, userRole, logout } = useAuth();
  // ...
}
```

**Responsibilities:**
- User authentication status
- User profile information
- Role-based access control
- Login/logout actions
- Session persistence (localStorage)

### 2. Local Component State

For component-specific data, use React's `useState`:

```tsx
const [searchQuery, setSearchQuery] = useState('');
const [filterStatus, setFilterStatus] = useState('all');
const [modalOpen, setModalOpen] = useState(false);
```

### 3. Form State

Uses **React Hook Form** for complex forms:

```tsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();
```

**Example**: `/src/app/pages/customer/CreateEvent.tsx`

---

## 🎨 Component Organization

### Component Categories

#### 1. **UI Components** (`/src/app/components/ui/`)
Base-level, reusable UI elements:
- `button.tsx` - Button variants
- `input.tsx` - Text inputs
- `select.tsx` - Dropdown selects
- `dialog.tsx` - Modal dialogs
- `table.tsx` - Data tables
- etc.

**Characteristics:**
- No business logic
- Highly reusable
- Prop-driven
- Fully typed with TypeScript

#### 2. **Feature Components** (`/src/app/components/`)
Application-specific, reusable components:
- `ExportModal.tsx` - Data export functionality
- `AdvancedFilterModal.tsx` - Complex filtering UI
- `ShareModal.tsx` - Share functionality
- `MessageModal.tsx` - Message display

**Characteristics:**
- Contains business logic
- Reused across multiple pages
- Role-agnostic (can be used in any module)

#### 3. **Page Components** (`/src/app/pages/`)
Full-page views for specific routes:
- One page per route
- Composed of smaller components
- Contains page-specific logic
- Organized by module (customer, vendor, admin)

---

## 🔐 Authentication Flow

### User Journey

```
┌─────────────┐
│ Landing Page│
└──────┬──────┘
       │
       ├──> Login ──────┐
       │                │
       └──> Sign Up ────┤
                        │
                   ┌────▼────┐
                   │   Auth  │
                   │ Context │
                   └────┬────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
   │Customer │    │ Vendor  │    │  Admin  │
   │Dashboard│    │Dashboard│    │Dashboard│
   └─────────┘    └─────────┘    └─────────┘
```

### Route Protection

**Current Implementation** (Client-side):
```tsx
// In AuthContext
const isAuthenticated = !!user;
const userRole = user?.role;

// In pages/components
const { isAuthenticated, userRole } = useAuth();

if (!isAuthenticated) {
  navigate('/login');
}

if (userRole !== 'customer') {
  navigate('/unauthorized');
}
```

**Future Implementation** (Server-side):
- JWT token validation
- API-level permission checks
- Role-based middleware

---

## 📦 Module Structure

### Module Organization Pattern

Each module follows a consistent structure:

```
/pages/{module}/
├── Dashboard.tsx          # Main dashboard/overview
├── {Feature}List.tsx      # List/table views
├── {Feature}Detail.tsx    # Detail/view pages
├── Create{Feature}.tsx    # Creation forms
├── Edit{Feature}.tsx      # Edit forms
├── Settings.tsx           # Module settings
└── index.ts               # Barrel exports (if needed)
```

**Example: Customer Module**
```
/pages/customer/
├── Dashboard.tsx          # Customer dashboard
├── Events.tsx             # Events list
├── CreateEvent.tsx        # Create event form
├── EventOverview.tsx      # Event detail view
├── PostRequirement.tsx    # Post requirement form
├── BidsList.tsx           # Bids list
├── VendorMarketplace.tsx  # Vendor browsing
├── Agreements.tsx         # Agreements list
├── Messages.tsx           # Message center
└── Settings.tsx           # Customer settings
```

---

## 🎯 Data Flow Patterns

### Current (Mock Data)

```
Component
    │
    ├──> Define mock data (const)
    │
    ├──> Apply filters/transforms
    │
    └──> Render UI
```

**Example:**
```tsx
export const EventsList: React.FC = () => {
  // Mock data
  const events = [
    { id: '1', name: 'Wedding', date: '2024-06-15', ... },
    { id: '2', name: 'Birthday', date: '2024-07-20', ... },
  ];

  // Filter
  const filteredEvents = events.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render
  return <EventsList events={filteredEvents} />;
};
```

### Future (API Integration)

```
Component
    │
    ├──> Call API hook (useEvents)
    │       │
    │       ├──> Fetch from backend
    │       ├──> Cache response
    │       └──> Return data/loading/error
    │
    ├──> Apply transforms
    │
    └──> Render UI
```

**Planned Pattern:**
```tsx
export const EventsList: React.FC = () => {
  // API call
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  // Filter and render
  const filteredEvents = events.filter(...);
  return <EventsList events={filteredEvents} />;
};
```

---

## 🛣️ Routing Structure

### Complete Route Map

```
/                          # Landing page (public)
/login                     # Login (public)
/signup                    # Sign up (public)
/forgot-password          # Password recovery (public)
/reset-password/:token    # Password reset (public)

/customer                  # Customer dashboard
/customer/events          # Events list
/customer/events/create   # Create event
/customer/events/:id      # Event detail
/customer/guests          # Guest management
/customer/requirements    # Requirements list
/customer/requirements/post  # Post requirement
/customer/bids            # Bids received
/customer/vendors         # Vendor marketplace
/customer/agreements      # Agreements list
/customer/messages        # Message center
/customer/settings        # Customer settings

/vendor                   # Vendor dashboard
/vendor/requirements      # Requirements feed
/vendor/requirements/:id  # Requirement detail
/vendor/bids              # My bids
/vendor/awarded           # Awarded events
/vendor/deliverables      # Deliverables upload
/vendor/earnings          # Earnings dashboard
/vendor/profile           # Profile management
/vendor/messages          # Message center
/vendor/settings          # Vendor settings

/admin                    # Admin dashboard
/admin/users              # Customer management
/admin/users/:id          # Customer detail
/admin/vendors            # Vendor management
/admin/vendors/:id        # Vendor detail
/admin/requirements       # Requirements oversight
/admin/bids               # Bids monitoring
/admin/disputes           # Dispute resolution
/admin/disputes/:id       # Dispute detail
/admin/agreements         # Agreements list
/admin/financial          # Financial dashboard
/admin/reports            # Reports & analytics
/admin/support            # Support tickets
/admin/settings           # System settings
```

---

## 🎨 Styling Architecture

### Tailwind CSS v4 Structure

**Configuration**: Uses CSS-based configuration in `/src/styles/theme.css`

```css
@theme {
  --color-primary: #FF5B04;
  --color-secondary: #075056;
  --color-dark: #16232A;
  --color-light: #E4EEF0;
  
  /* Typography scale */
  --font-size-base: 16px;
  --font-size-lg: 18px;
  /* ... */
}
```

### Styling Best Practices

1. **Use Tailwind classes** for layout and spacing
2. **Avoid font-size classes** (rely on theme.css typography)
3. **Use theme colors** via custom properties
4. **Responsive**: Mobile-first with `md:`, `lg:` breakpoints
5. **No gradients** - Use solid colors

**Example:**
```tsx
<div className="bg-white rounded-xl border border-gray-200 p-6">
  <h2 className="text-gray-900 mb-4">Title</h2>
  <button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 text-white px-4 py-2 rounded-lg">
    Action
  </button>
</div>
```

---

## 🧩 Dependency Management

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.3+ | UI library |
| react-router | 7.x | Routing |
| typescript | 5.x | Type safety |
| tailwindcss | 4.x | Styling |
| motion/react | Latest | Animations |
| react-hook-form | 7.55.0 | Form handling |
| lucide-react | Latest | Icons |
| recharts | Latest | Charts |

### Import Patterns

```tsx
// React & core libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Context & hooks
import { useAuth } from '../context/AuthContext';

// Components
import { Button } from '../components/ui/button';
import { ExportModal } from '../components/ExportModal';

// Utils
import { exportToCSV } from '../utils/export';

// Icons
import { Home, User, Settings } from 'lucide-react';

// Types (if separated)
import type { Event, Vendor } from '../types';
```

---

## 🔍 File Naming Conventions

### Components
- **PascalCase**: `CustomerDashboard.tsx`, `EventsList.tsx`
- **Descriptive names**: `PostRequirement.tsx` not `Post.tsx`
- **Suffix for type**: `CreateEventModal.tsx`, `UserProfile.tsx`

### Utilities
- **camelCase**: `export.ts`, `formatDate.ts`
- **Descriptive**: `dateHelpers.ts` not `helpers.ts`

### Styles
- **kebab-case**: `theme.css`, `fonts.css`

---

## 📚 Next Steps

Now that you understand the architecture:
1. Review specific module documentation
2. Study code examples in each section
3. Follow development guidelines when adding features

**Next**: [Authentication Module →](./03-AUTHENTICATION-MODULE.md)
