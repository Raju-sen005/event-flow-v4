# Role-Based Access Control (RBAC) Guide

## 🎭 Overview

The Event & Guest Management Platform implements role-based access control to ensure users only access features and data appropriate to their role. This guide explains the permission system, access rules, and implementation details.

---

## 👥 User Roles

### 1. Customer (Event Organizer)
**Identifier**: `role: 'customer'`

**Primary Purpose**: Create events, post requirements, hire vendors

**Access Level**: Read/Write own data only

### 2. Vendor (Service Provider)
**Identifier**: `role: 'vendor'`

**Primary Purpose**: Browse requirements, submit bids, deliver services

**Access Level**: Read/Write own data only

### 3. Admin (Platform Moderator)
**Identifier**: `role: 'admin'`

**Primary Purpose**: Manage users, verify vendors, resolve disputes

**Access Level**: Read all data, Write moderation actions

### 4. Super Admin (Platform Owner)
**Identifier**: `role: 'super-admin'`

**Primary Purpose**: Full platform management, system configuration

**Access Level**: Full read/write access to all data

---

## 🗺️ Access Matrix

### Route Access

| Route | Customer | Vendor | Admin | Super Admin |
|-------|----------|--------|-------|-------------|
| `/` (Landing) | ✅ | ✅ | ✅ | ✅ |
| `/login` | ✅ | ✅ | ✅ | ✅ |
| `/signup` | ✅ | ✅ | ❌ | ❌ |
| `/customer/*` | ✅ | ❌ | ❌ | ❌ |
| `/vendor/*` | ❌ | ✅ | ❌ | ❌ |
| `/admin/*` | ❌ | ❌ | ✅ | ✅ |

### Feature Access

#### Customer Features

| Feature | Customer | Vendor | Admin | Super Admin |
|---------|----------|--------|-------|-------------|
| Create Event | ✅ | ❌ | ❌ | ❌ |
| Manage Guests | ✅ | ❌ | ❌ | ❌ |
| Post Requirement | ✅ | ❌ | ❌ | ❌ |
| View Bids | ✅ | ❌ | ✅ | ✅ |
| Award Contract | ✅ | ❌ | ❌ | ❌ |
| Sign Agreement | ✅ | ✅ | ❌ | ❌ |
| Make Payment | ✅ | ❌ | ❌ | ❌ |
| Write Review | ✅ | ❌ | ❌ | ❌ |
| Browse Vendors | ✅ | ❌ | ✅ | ✅ |

#### Vendor Features

| Feature | Customer | Vendor | Admin | Super Admin |
|---------|----------|--------|-------|-------------|
| Browse Requirements | ❌ | ✅ | ✅ | ✅ |
| Submit Bid | ❌ | ✅ | ❌ | ❌ |
| Withdraw Bid | ❌ | ✅ | ❌ | ❌ |
| View Awarded Events | ❌ | ✅ | ✅ | ✅ |
| Upload Deliverables | ❌ | ✅ | ❌ | ❌ |
| Manage Availability | ❌ | ✅ | ❌ | ❌ |
| Update Profile | ❌ | ✅ | ❌ | ❌ |
| View Earnings | ❌ | ✅ | ❌ | ❌ |
| Respond to Reviews | ❌ | ✅ | ❌ | ❌ |

#### Admin Features

| Feature | Customer | Vendor | Admin | Super Admin |
|---------|----------|--------|-------|-------------|
| View All Users | ❌ | ❌ | ✅ | ✅ |
| Suspend User | ❌ | ❌ | ✅ | ✅ |
| Verify Vendor | ❌ | ❌ | ✅ | ✅ |
| View All Requirements | ❌ | ❌ | ✅ | ✅ |
| View All Bids | ❌ | ❌ | ✅ | ✅ |
| Resolve Dispute | ❌ | ❌ | ✅ | ✅ |
| View Financial Data | ❌ | ❌ | ✅ | ✅ |
| Generate Reports | ❌ | ❌ | ✅ | ✅ |
| Manage Support Tickets | ❌ | ❌ | ✅ | ✅ |
| System Settings | ❌ | ❌ | ❌ | ✅ |
| Platform Configuration | ❌ | ❌ | ❌ | ✅ |

---

## 🔒 Implementation

### 1. Authentication Context

**File**: `/src/app/context/AuthContext.tsx`

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin' | 'super-admin';
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  userRole: string | null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - replace with API call
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      role: 'customer' as const,
      verified: true,
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        userRole: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Route Protection

**Pattern 1: Layout-Level Protection**

```tsx
// In CustomerLayout.tsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export const CustomerLayout: React.FC = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (userRole !== 'customer') {
      navigate('/unauthorized');
    }
  }, [isAuthenticated, userRole, navigate]);

  // Only render if authorized
  if (!isAuthenticated || userRole !== 'customer') {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#E4EEF0]">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Outlet /> {/* Child routes render here */}
        </main>
      </div>
    </div>
  );
};
```

**Pattern 2: Page-Level Protection**

```tsx
// In specific page component
export const SensitiveFeature: React.FC = () => {
  const { user, userRole } = useAuth();

  if (userRole !== 'admin' && userRole !== 'super-admin') {
    return <UnauthorizedPage />;
  }

  return <div>Sensitive Content</div>;
};
```

**Pattern 3: Component-Level Protection**

```tsx
// Conditional rendering based on role
const { userRole } = useAuth();

return (
  <div>
    {userRole === 'customer' && <CustomerActions />}
    {userRole === 'vendor' && <VendorActions />}
    {(userRole === 'admin' || userRole === 'super-admin') && <AdminActions />}
  </div>
);
```

### 3. Action-Level Permissions

**Utility Function:**

```tsx
// /src/app/utils/permissions.ts
export const can = (user: User | null, action: string): boolean => {
  if (!user) return false;

  const permissions: Record<string, string[]> = {
    'create:event': ['customer'],
    'create:bid': ['vendor'],
    'verify:vendor': ['admin', 'super-admin'],
    'configure:system': ['super-admin'],
    'view:all-users': ['admin', 'super-admin'],
    'suspend:user': ['admin', 'super-admin'],
    'resolve:dispute': ['admin', 'super-admin'],
  };

  return permissions[action]?.includes(user.role) || false;
};

// Usage in components
import { can } from '../utils/permissions';

const { user } = useAuth();

if (can(user, 'create:event')) {
  // Show create event button
}
```

### 4. Navigation Menu Filtering

**Dynamic Sidebar:**

```tsx
// In Sidebar component
const { userRole } = useAuth();

const menuItems = [
  { path: '/customer/dashboard', label: 'Dashboard', roles: ['customer'] },
  { path: '/customer/events', label: 'Events', roles: ['customer'] },
  { path: '/vendor/requirements', label: 'Requirements', roles: ['vendor'] },
  { path: '/vendor/bids', label: 'My Bids', roles: ['vendor'] },
  { path: '/admin/users', label: 'Users', roles: ['admin', 'super-admin'] },
  { path: '/admin/settings', label: 'Settings', roles: ['super-admin'] },
];

const visibleItems = menuItems.filter(item => 
  item.roles.includes(userRole)
);

return (
  <nav>
    {visibleItems.map(item => (
      <NavLink key={item.path} to={item.path}>
        {item.label}
      </NavLink>
    ))}
  </nav>
);
```

---

## 🚦 Permission Hierarchy

### Role Inheritance

```
Super Admin
    ↓
  Admin
    ↓
Customer / Vendor
```

**Note**: Currently, roles don't inherit permissions. Super Admin and Admin have separate, explicitly defined permissions. Future versions may implement inheritance.

---

## 🔐 Security Best Practices

### Current Implementation

1. **Client-Side Route Guards**
   - Routes check user role before rendering
   - Redirect to login if not authenticated
   - Redirect to unauthorized if wrong role

2. **Component-Level Checks**
   - Sensitive actions check permissions
   - UI elements hidden based on role
   - Forms validate user role before submission

3. **Local Storage**
   - User data stored in localStorage
   - Cleared on logout
   - Loaded on app initialization

### Future Enhancements

1. **Server-Side Validation**
   - API endpoints validate JWT tokens
   - Role checked on every API call
   - Permissions enforced at database level

2. **Token-Based Authentication**
   - JWT tokens instead of localStorage
   - Refresh token mechanism
   - Token expiration handling

3. **Audit Logging**
   - Log all permission-sensitive actions
   - Track role changes
   - Monitor suspicious activity

4. **Fine-Grained Permissions**
   - Resource-level permissions (e.g., edit own events only)
   - Conditional permissions (e.g., admin in specific regions)
   - Time-based permissions

---

## 📝 Permission Naming Convention

### Format: `action:resource`

**Actions:**
- `create` - Create new resource
- `read` - View resource
- `update` - Modify existing resource
- `delete` - Remove resource
- `list` - View list of resources
- `export` - Export data
- `verify` - Approve/verify resource
- `suspend` - Suspend user/resource
- `resolve` - Resolve disputes

**Resources:**
- `event` - Events
- `requirement` - Requirements
- `bid` - Bids
- `agreement` - Agreements
- `user` - Users
- `vendor` - Vendors
- `dispute` - Disputes
- `report` - Reports
- `setting` - System settings

**Examples:**
```tsx
'create:event'      // Customer can create events
'read:bid'          // Vendor can read their bids
'verify:vendor'     // Admin can verify vendors
'suspend:user'      // Admin can suspend users
'configure:system'  // Super Admin can configure system
```

---

## 🧪 Testing Permissions

### Test Scenarios

1. **Unauthorized Access**
   ```
   Given: User is not logged in
   When: User navigates to /customer/dashboard
   Then: User is redirected to /login
   ```

2. **Wrong Role Access**
   ```
   Given: User is logged in as Vendor
   When: User navigates to /customer/events
   Then: User is redirected to /unauthorized or /vendor
   ```

3. **Correct Role Access**
   ```
   Given: User is logged in as Customer
   When: User navigates to /customer/dashboard
   Then: Dashboard is displayed
   ```

4. **Permission-Based Features**
   ```
   Given: User is Customer
   When: User views requirement details
   Then: "Award Contract" button is visible
   
   Given: User is Admin
   When: User views requirement details
   Then: "Award Contract" button is NOT visible
   ```

### Test Cases Matrix

| Test Case | User Role | Route | Expected Result |
|-----------|-----------|-------|-----------------|
| TC-001 | None | /customer/dashboard | Redirect to /login |
| TC-002 | Customer | /customer/dashboard | Show dashboard |
| TC-003 | Vendor | /customer/dashboard | Redirect to /unauthorized |
| TC-004 | Admin | /customer/dashboard | Redirect to /unauthorized |
| TC-005 | Customer | /vendor/requirements | Redirect to /unauthorized |
| TC-006 | Vendor | /vendor/requirements | Show requirements |
| TC-007 | Admin | /admin/users | Show user list |
| TC-008 | Customer | /admin/users | Redirect to /unauthorized |
| TC-009 | Super Admin | /admin/settings | Show settings |
| TC-010 | Admin | /admin/settings (Super Admin only) | Hide certain features |

---

## 🎯 Role Assignment

### During Signup

```tsx
// In SignUp.tsx or RoleSelection.tsx
const handleRoleSelection = (selectedRole: 'customer' | 'vendor') => {
  // Store selected role
  setUserRole(selectedRole);
  
  // Continue with onboarding specific to role
  if (selectedRole === 'customer') {
    navigate('/customer-onboarding');
  } else {
    navigate('/vendor-onboarding');
  }
};
```

### During Login

```tsx
// In Login.tsx
const handleLogin = async (email: string, password: string) => {
  // API call returns user with role
  const user = await api.login(email, password);
  
  // Store in AuthContext
  login(user);
  
  // Redirect based on role
  switch (user.role) {
    case 'customer':
      navigate('/customer');
      break;
    case 'vendor':
      navigate('/vendor');
      break;
    case 'admin':
    case 'super-admin':
      navigate('/admin');
      break;
  }
};
```

---

## 🔄 Role Changes

### Admin Changing User Role (Future)

```tsx
// In Admin Panel
const changeUserRole = async (userId: string, newRole: string) => {
  // Require Super Admin permission
  if (userRole !== 'super-admin') {
    throw new Error('Unauthorized');
  }
  
  // Update user role
  await api.updateUserRole(userId, newRole);
  
  // Log the action
  await auditLog({
    action: 'change_role',
    performedBy: currentUser.id,
    targetUser: userId,
    oldRole: user.role,
    newRole: newRole,
  });
};
```

---

## ⚠️ Common Pitfalls

### 1. Client-Side Only Protection
**Problem**: Relying only on UI hiding without backend validation

**Solution**: Always validate permissions on API/backend

### 2. Hardcoded Role Checks
**Problem**: Scattered role checks throughout codebase

```tsx
// Bad
if (user.role === 'admin' || user.role === 'super-admin') {
  // ... repeated everywhere
}
```

**Solution**: Use utility functions

```tsx
// Good
if (can(user, 'view:all-users')) {
  // ...
}
```

### 3. Forgetting to Protect New Routes
**Problem**: New routes added without permission checks

**Solution**: Use protected route wrapper

```tsx
// In routes.ts
{
  path: '/new-feature',
  Component: ProtectedRoute,
  element: <NewFeature />,
  allowedRoles: ['admin', 'super-admin']
}
```

---

## 📊 Permission Audit

### Regular Checks

1. **Route Audit**: Ensure all routes have proper guards
2. **Feature Audit**: Verify all actions check permissions
3. **Data Audit**: Confirm users only see their data
4. **UI Audit**: Hidden elements truly inaccessible

### Audit Checklist

```
□ All protected routes use layout wrappers
□ All sensitive actions check permissions
□ API calls include authentication tokens
□ Error messages don't leak sensitive info
□ Logout clears all user data
□ Session timeout implemented
□ Password requirements enforced
□ Failed login attempts limited
```

---

## 🚀 Future RBAC Enhancements

1. **Custom Roles**: Define custom roles with specific permissions
2. **Team Roles**: Customer accounts with multiple users (team members)
3. **Temporary Permissions**: Time-limited access grants
4. **Resource-Specific Roles**: Permissions tied to specific events/projects
5. **Permission Groups**: Reusable permission sets
6. **Delegation**: Users temporarily grant permissions to others

---

**Next**: [Data Flow & API Integration →](./08-DATA-FLOW.md)
