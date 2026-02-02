# Development Guidelines

## 🎯 Purpose

This guide establishes coding standards, best practices, and conventions for developing and maintaining the Event & Guest Management Platform. Following these guidelines ensures code quality, consistency, and maintainability.

---

## 📋 Table of Contents

1. [Code Style & Formatting](#code-style--formatting)
2. [Component Development](#component-development)
3. [File Organization](#file-organization)
4. [Naming Conventions](#naming-conventions)
5. [TypeScript Best Practices](#typescript-best-practices)
6. [React Best Practices](#react-best-practices)
7. [State Management](#state-management)
8. [Styling Guidelines](#styling-guidelines)
9. [Form Handling](#form-handling)
10. [Error Handling](#error-handling)
11. [Performance Optimization](#performance-optimization)
12. [Testing Guidelines](#testing-guidelines)
13. [Git Workflow](#git-workflow)
14. [Code Review Checklist](#code-review-checklist)

---

## 1. Code Style & Formatting

### Formatting Rules

- **Indentation**: 2 spaces (no tabs)
- **Line Length**: Max 100 characters (soft limit)
- **Quotes**: Single quotes for strings, double for JSX attributes
- **Semicolons**: Use semicolons
- **Trailing Commas**: Always in multiline objects/arrays

**Example:**
```tsx
const userData = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'customer', // trailing comma
};

function Component({ title, description }: Props) {
  return (
    <div className="container">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
```

### Import Order

```tsx
// 1. React and core libraries
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

// 2. Third-party libraries
import { useForm } from 'react-hook-form';

// 3. Context and hooks
import { useAuth } from '../context/AuthContext';

// 4. Components (UI first, then feature-specific)
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ExportModal } from '../components/ExportModal';

// 5. Utils and helpers
import { exportToCSV } from '../utils/export';
import { formatDate } from '../utils/dateHelpers';

// 6. Icons
import { Home, User, Settings } from 'lucide-react';

// 7. Types (if in separate file)
import type { Event, Vendor } from '../types';

// 8. Styles (if any)
import '../styles/custom.css';
```

---

## 2. Component Development

### Component Structure

```tsx
// 1. Imports
import React, { useState } from 'react';

// 2. Types/Interfaces
interface Props {
  title: string;
  onSave: (data: FormData) => void;
}

interface FormData {
  name: string;
  email: string;
}

// 3. Component
export const MyComponent: React.FC<Props> = ({ title, onSave }) => {
  // 4. Hooks
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  const navigate = useNavigate();
  
  // 5. Event Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // 6. Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // 7. Render helpers (if needed)
  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
  
  // 8. Main Return
  return (
    <div>
      <h1>{title}</h1>
      {renderForm()}
    </div>
  );
};
```

### Component Types

#### 1. Page Components
```tsx
// Full-page views - one per route
export const EventsList: React.FC = () => {
  // Page logic
  return <div className="space-y-6">{/* Content */}</div>;
};
```

#### 2. Feature Components
```tsx
// Reusable components with business logic
interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  // Export logic
  return <Dialog open={isOpen}>{/* Modal content */}</Dialog>;
};
```

#### 3. UI Components
```tsx
// Pure presentational components
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
}) => {
  const className = `btn btn-${variant} btn-${size}`;
  return <button className={className} onClick={onClick}>{children}</button>;
};
```

---

## 3. File Organization

### Adding New Features

#### Step 1: Determine Module
Is it for Customer, Vendor, or Admin?

#### Step 2: Create Files
```
/src/app/pages/{module}/
└── NewFeature.tsx
```

#### Step 3: Add Route
```tsx
// In /src/app/routes.ts
{
  path: '/{module}/new-feature',
  Component: NewFeature,
}
```

#### Step 4: Add Navigation (if needed)
```tsx
// In respective Layout component
<NavLink to="/{module}/new-feature">New Feature</NavLink>
```

### Shared Components

```
/src/app/components/
├── ui/                    # Base UI components
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
├── FeatureModal.tsx      # Feature-specific modals
├── DataTable.tsx         # Feature-specific tables
└── ...
```

**When to create shared component:**
- Used in 3+ places
- Complex logic worth abstracting
- Consistent behavior needed across features

---

## 4. Naming Conventions

### Files & Folders
- **Components**: PascalCase - `EventsList.tsx`, `CreateEvent.tsx`
- **Utils**: camelCase - `export.ts`, `dateHelpers.ts`
- **Styles**: kebab-case - `theme.css`, `fonts.css`
- **Folders**: lowercase - `customer/`, `vendor/`, `admin/`

### Variables & Functions
```tsx
// Variables: camelCase
const userData = {};
const isAuthenticated = false;
const userRole = 'customer';

// Constants: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const API_BASE_URL = 'https://api.example.com';

// Functions: camelCase, verb + noun
const handleSubmit = () => {};
const fetchUserData = () => {};
const validateEmail = () => {};

// Boolean variables: is/has/should prefix
const isLoading = false;
const hasError = false;
const shouldRedirect = true;

// Event handlers: handle prefix
const handleClick = () => {};
const handleChange = () => {};
const handleSubmit = () => {};
```

### React Components
```tsx
// Components: PascalCase
export const UserProfile = () => {};
export const EventsList = () => {};

// Props interfaces: ComponentName + Props
interface UserProfileProps {
  userId: string;
}

interface EventsListProps {
  events: Event[];
}
```

### CSS Classes
```tsx
// Use Tailwind utility classes primarily
<div className="flex items-center gap-4 p-6">

// Custom classes: kebab-case
<div className="custom-card-header">

// BEM naming for complex components (if needed)
<div className="event-card">
  <div className="event-card__header">
    <h2 className="event-card__title">Title</h2>
  </div>
</div>
```

---

## 5. TypeScript Best Practices

### Always Define Types

```tsx
// ✅ Good
interface Event {
  id: string;
  name: string;
  date: string;
  status: 'Planning' | 'Confirmed' | 'Completed';
}

const event: Event = {
  id: '1',
  name: 'Wedding',
  date: '2024-06-15',
  status: 'Planning',
};

// ❌ Bad
const event = {
  id: '1',
  name: 'Wedding',
  date: '2024-06-15',
  status: 'Planning',
};
```

### Use Union Types for States

```tsx
// ✅ Good
type Status = 'idle' | 'loading' | 'success' | 'error';

const [status, setStatus] = useState<Status>('idle');

// ❌ Bad
const [status, setStatus] = useState('idle'); // type is just 'string'
```

### Avoid `any`

```tsx
// ❌ Bad
const handleData = (data: any) => {
  // ...
};

// ✅ Good
interface ApiResponse {
  data: Event[];
  total: number;
}

const handleData = (response: ApiResponse) => {
  // ...
};

// ✅ Also acceptable for unknown shapes
const handleData = (data: unknown) => {
  // Type guard
  if (isEventData(data)) {
    // Now data is typed
  }
};
```

### Generic Components

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}

// Usage
<List
  items={events}
  renderItem={(event) => <EventCard event={event} />}
/>
```

---

## 6. React Best Practices

### Hooks Rules

```tsx
// ✅ Always at top level
function Component() {
  const [state, setState] = useState('');
  const navigate = useNavigate();
  
  // ...
}

// ❌ Never conditional
function Component() {
  if (condition) {
    const [state, setState] = useState(''); // Error!
  }
}
```

### Use Custom Hooks for Reusable Logic

```tsx
// hooks/useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
const [searchQuery, setSearchQuery] = useState('');
const debouncedQuery = useDebounce(searchQuery, 500);
```

### Memoization for Performance

```tsx
import { useMemo, useCallback } from 'react';

// Expensive calculations
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);

// Callback functions passed to children
const handleClick = useCallback(() => {
  // Handle click
}, [dependency]);
```

### Conditional Rendering

```tsx
// ✅ Good patterns
{isLoading && <LoadingSpinner />}
{error && <ErrorMessage error={error} />}
{data && <DataTable data={data} />}

{isLoading ? <LoadingSpinner /> : <Content />}

// For complex conditions
{(() => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  return <Content />;
})()}
```

### List Rendering

```tsx
// ✅ Always use unique keys
{items.map(item => (
  <ItemCard key={item.id} item={item} />
))}

// ❌ Don't use index as key (unless list is static)
{items.map((item, index) => (
  <ItemCard key={index} item={item} /> // Bad if list changes
))}
```

---

## 7. State Management

### Local State (useState)

Use for component-specific data:

```tsx
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
const [selectedItems, setSelectedItems] = useState<string[]>([]);
```

### Context (Global State)

Use for app-wide data:

```tsx
// AuthContext for user data
const { user, login, logout } = useAuth();

// ThemeContext for theme (if implemented)
const { theme, toggleTheme } = useTheme();
```

### Derived State

Don't store what you can compute:

```tsx
// ❌ Bad - redundant state
const [users, setUsers] = useState([]);
const [activeUsers, setActiveUsers] = useState([]);

// ✅ Good - derive from source
const [users, setUsers] = useState([]);
const activeUsers = users.filter(u => u.active);
```

---

## 8. Styling Guidelines

### Tailwind CSS Usage

```tsx
// ✅ Utility classes for layout
<div className="flex items-center justify-between p-6 bg-white rounded-xl border border-gray-200">

// ✅ Responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ✅ Hover and focus states
<button className="bg-[#FF5B04] hover:bg-[#FF5B04]/90 focus:ring-2 focus:ring-[#FF5B04]">
```

### Important Rules

1. **No font-size classes** - Use theme typography
   ```tsx
   // ❌ Bad
   <h1 className="text-3xl font-bold">Title</h1>
   
   // ✅ Good
   <h1 className="text-gray-900">Title</h1> {/* Uses theme.css typography */}
   ```

2. **Use brand colors**
   ```tsx
   // Primary: #FF5B04
   <button className="bg-[#FF5B04]">
   
   // Secondary: #075056
   <div className="text-[#075056]">
   
   // Dark: #16232A
   <h1 className="text-[#16232A]">
   
   // Light background: #E4EEF0
   <body className="bg-[#E4EEF0]">
   ```

3. **No gradients** - Use solid colors only

4. **Consistent spacing** - Use 4, 6, 8, 12, 16, 24 (multiples of 4)
   ```tsx
   <div className="p-6 gap-4">  {/* 24px padding, 16px gap */}
   ```

---

## 9. Form Handling

### React Hook Form Pattern

```tsx
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

export const MyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission
    reset(); // Clear form
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name', { 
            required: 'Name is required',
            minLength: { value: 3, message: 'Min 3 characters' }
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <button type="submit" className="bg-[#FF5B04] text-white px-6 py-2 rounded-lg">
        Submit
      </button>
    </form>
  );
};
```

### Form Validation Rules

```tsx
{
  required: 'This field is required',
  minLength: { value: 3, message: 'Minimum 3 characters' },
  maxLength: { value: 50, message: 'Maximum 50 characters' },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address',
  },
  validate: {
    positive: (value) => parseInt(value) > 0 || 'Must be positive',
  },
}
```

---

## 10. Error Handling

### Display Errors to Users

```tsx
const [error, setError] = useState<string | null>(null);

// Show error
if (error) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-700">{error}</p>
    </div>
  );
}
```

### Try-Catch for Async Operations

```tsx
const fetchData = async () => {
  try {
    setLoading(true);
    const response = await api.getData();
    setData(response);
    setError(null);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'An error occurred');
    setData(null);
  } finally {
    setLoading(false);
  }
};
```

### Error Boundaries (for component errors)

```tsx
// ErrorBoundary component exists at /src/app/components/ErrorBoundary.tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <YourComponent />
</ErrorBoundary>
```

---

## 11. Performance Optimization

### Code Splitting

```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Avoid Unnecessary Re-renders

```tsx
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
});

// Use useCallback for functions passed to children
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);
```

### Optimize Images

```tsx
// Use appropriate image formats
// WebP for photos, SVG for icons
<img src="photo.webp" alt="Description" loading="lazy" />
```

---

## 12. Testing Guidelines

### Unit Tests (Future)

```tsx
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onSave when form is submitted', () => {
    const handleSave = jest.fn();
    render(<MyComponent onSave={handleSave} />);
    
    // ... interact with form
    
    expect(handleSave).toHaveBeenCalledWith(expectedData);
  });
});
```

### Manual Testing Checklist

- [ ] Feature works in Chrome, Firefox, Safari
- [ ] Feature works on different screen sizes
- [ ] Error states display correctly
- [ ] Loading states display correctly
- [ ] Form validation works
- [ ] Navigation works correctly
- [ ] Data persists across page reloads (if applicable)
- [ ] No console errors or warnings

---

## 13. Git Workflow

### Branch Naming

```
feature/add-event-creation
fix/dashboard-layout-bug
refactor/improve-export-modal
docs/update-readme
```

### Commit Messages

```
feat: add event creation form
fix: resolve layout issue in dashboard
refactor: simplify export modal logic
docs: update API documentation
style: format code according to standards
test: add tests for user authentication
```

**Format**: `type: description`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `docs` - Documentation
- `style` - Formatting, styling
- `test` - Adding tests
- `chore` - Maintenance tasks

---

## 14. Code Review Checklist

### Before Submitting

- [ ] Code follows style guidelines
- [ ] No console.log statements left in code
- [ ] TypeScript types defined for all data
- [ ] Components are properly typed
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] Responsive design works
- [ ] No unnecessary dependencies added
- [ ] Code is commented where complex
- [ ] Tested manually

### Reviewing Others' Code

- [ ] Logic is clear and understandable
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Edge cases are handled
- [ ] Naming is clear and consistent
- [ ] No code duplication
- [ ] Tests are included (if applicable)
- [ ] Documentation is updated

---

## 🚀 Quick Reference

### Creating a New Page

1. Create file in `/src/app/pages/{module}/NewPage.tsx`
2. Add route in `/src/app/routes.ts`
3. Add navigation link in layout (if needed)
4. Follow component structure guidelines
5. Test manually
6. Commit with descriptive message

### Creating a Reusable Component

1. Determine if it's UI or feature component
2. Create in appropriate `/src/app/components/` location
3. Define TypeScript interface for props
4. Implement component logic
5. Export from file
6. Use in pages
7. Document usage (if complex)

### Adding New Utility Function

1. Create or add to file in `/src/app/utils/`
2. Export function with clear name
3. Add TypeScript types for parameters and return
4. Add JSDoc comment explaining usage
5. Use in components

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide Icons](https://lucide.dev/)

---

**Next**: [Troubleshooting & FAQs →](./11-TROUBLESHOOTING.md)
