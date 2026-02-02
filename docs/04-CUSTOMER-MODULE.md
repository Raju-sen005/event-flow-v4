# Customer Module Documentation

## 📋 Module Overview

The Customer Module is designed for event organizers who use the platform to plan events, post service requirements, evaluate vendor bids, and manage their events from start to finish.

**Target User**: Event organizers (individuals or businesses) planning weddings, corporate events, birthdays, conferences, etc.

**Module Route**: `/customer/*`

**Layout**: `CustomerLayout.tsx`

---

## 🎯 Module Purpose

Enable customers to:
1. Create and manage multiple events
2. Track guest RSVPs and details
3. Post service requirements to attract vendors
4. Browse and discover verified vendors
5. Evaluate and compare vendor bids
6. Award contracts and manage agreements
7. Communicate with vendors in real-time
8. Monitor event progress and deliverables

---

## 🗂️ Module Structure

```
/src/app/pages/customer/
├── Dashboard.tsx              # Main dashboard with overview
├── Events.tsx                 # Events list view
├── CreateEvent.tsx            # Event creation form
├── EventOverview.tsx          # Individual event detail
├── Guests.tsx                 # Guest management
├── AddGuests.tsx              # Add guests form
├── PostRequirement.tsx        # Post service requirement
├── RequirementDetails.tsx     # Requirement detail view
├── BidsList.tsx               # Bids received on requirements
├── BidComparison.tsx          # Compare multiple bids
├── VendorMarketplace.tsx      # Browse vendors
├── VendorProfile.tsx          # Vendor profile view
├── Vendors.tsx                # Shortlisted vendors
├── Agreements.tsx             # Contract agreements list
├── AgreementViewer.tsx        # View agreement details
├── Messages.tsx               # Message center
├── ChatDetail.tsx             # Individual conversation
├── Notifications.tsx          # Notification center
└── Settings.tsx               # Customer account settings
```

---

## 🏠 1. Dashboard (`Dashboard.tsx`)

### Purpose
Central hub showing an overview of all customer activities, events, requirements, and bids.

### Key Features
- **Event stats**: Total events, active events, upcoming events
- **Requirements summary**: Active requirements, total bids received
- **Quick actions**: Create event, post requirement, view bids
- **Upcoming events timeline**: Next 3-5 events with dates
- **Recent bids**: Latest vendor proposals
- **Budget tracking**: Spent vs allocated budget

### Data Display
```tsx
const stats = {
  totalEvents: number,
  activeEvents: number,
  upcomingEvents: number,
  totalRequirements: number,
  totalBids: number,
  totalSpent: string (formatted currency)
};
```

### User Actions
- ✅ Navigate to create event
- ✅ Navigate to post requirement
- ✅ View event details
- ✅ View requirement details
- ✅ Quick access to recent bids

### Dependencies
- No external dependencies
- Mock data defined in component

### Navigation Flow
```
Dashboard
├──> Create Event
├──> Events List
├──> Post Requirement
├──> Requirements List
├──> Bids List
└──> Event Details
```

---

## 📅 2. Events Management

### 2.1 Events List (`Events.tsx`)

**Purpose**: Display all customer events with filtering and sorting.

**Features:**
- Grid/List view toggle
- Search by event name
- Filter by status: All | Upcoming | Ongoing | Completed
- Sort by date, name, budget
- Create new event button
- Export events data

**Data Structure:**
```tsx
interface Event {
  id: string;
  name: string;
  type: 'Wedding' | 'Birthday' | 'Corporate' | 'Conference' | 'Other';
  date: string; // ISO date
  location: string;
  guests: number;
  budget: string; // Formatted currency
  status: 'Planning' | 'Confirmed' | 'Ongoing' | 'Completed';
  requirements: number; // Count of requirements posted
}
```

**User Actions:**
- ✅ View event details
- ✅ Edit event
- ✅ Delete event (with confirmation)
- ✅ Create new event
- ✅ Export events data (CSV/JSON)

### 2.2 Create Event (`CreateEvent.tsx`)

**Purpose**: Form to create a new event with all details.

**Form Fields:**
```tsx
{
  eventName: string;          // Required
  eventType: string;          // Dropdown selection
  eventDate: Date;            // Date picker
  eventTime: string;          // Time picker
  location: string;           // Text input
  address: string;            // Textarea
  estimatedGuests: number;    // Number input
  budget: number;             // Currency input
  description: string;        // Textarea
  specialRequirements: string; // Textarea (optional)
}
```

**Validation Rules:**
- Event name: Required, min 3 characters
- Event type: Required, from predefined list
- Event date: Required, cannot be in the past
- Location: Required
- Estimated guests: Required, min 1
- Budget: Required, min ₹10,000

**Form Handling:**
```tsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  // Create event logic
  // Navigate to event details
};
```

**User Flow:**
```
Create Event Form
├──> Fill required fields
├──> Validate inputs
├──> Submit form
├──> Success message
└──> Navigate to Event Details
```

### 2.3 Event Overview (`EventOverview.tsx`)

**Purpose**: Detailed view of a single event with all related information.

**Sections:**
1. **Event Header**
   - Event name and type
   - Status badge
   - Edit/Delete actions
   - Share event button

2. **Event Details**
   - Date and time
   - Location and address
   - Guest count
   - Budget allocated vs spent

3. **Requirements**
   - List of posted requirements
   - Status of each requirement
   - Bids received count
   - Add new requirement button

4. **Vendors**
   - Hired vendors list
   - Service type
   - Agreement status
   - Payment status

5. **Timeline**
   - Event milestones
   - Requirement deadlines
   - Vendor deliverable dates
   - Key dates countdown

6. **Activity Log**
   - Recent actions
   - Bid submissions
   - Vendor messages
   - System notifications

**Data Structure:**
```tsx
interface EventDetail {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  address: string;
  guests: number;
  budget: number;
  spent: number;
  status: string;
  requirements: Requirement[];
  vendors: HiredVendor[];
  timeline: TimelineEvent[];
  activityLog: Activity[];
}
```

---

## 👥 3. Guest Management

### 3.1 Guests List (`Guests.tsx`)

**Purpose**: Manage event guests, track RSVPs, and dietary preferences.

**Features:**
- Search guests by name
- Filter by RSVP status: All | Confirmed | Pending | Declined
- Filter by event
- Export guest list (CSV/Excel)
- Bulk actions: Send invitations, reminders
- Guest statistics

**Data Structure:**
```tsx
interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  rsvpStatus: 'Confirmed' | 'Pending' | 'Declined';
  dietaryRestrictions: string[];
  plusOne: boolean;
  tableNumber?: number;
  notes?: string;
}
```

**Statistics Displayed:**
```tsx
{
  totalInvited: number,
  confirmed: number,
  pending: number,
  declined: number,
  attendanceRate: string // percentage
}
```

### 3.2 Add Guests (`AddGuests.tsx`)

**Purpose**: Add single or multiple guests to an event.

**Features:**
- Single guest form
- Bulk import from CSV
- Manual entry for multiple guests
- Event selection dropdown
- Auto-send invitation option

**Form Fields:**
```tsx
{
  event: string;              // Dropdown of customer events
  name: string;               // Required
  email: string;              // Email validation
  phone: string;              // Phone format validation
  dietaryRestrictions: string[]; // Multi-select
  plusOne: boolean;           // Checkbox
  notes: string;              // Optional
}
```

---

## 📝 4. Requirements Management

### 4.1 Post Requirement (`PostRequirement.tsx`)

**Purpose**: Create service requirement to receive vendor bids.

**Form Sections:**

**1. Basic Information**
```tsx
{
  title: string;              // Required, descriptive title
  event: string;              // Select from customer events
  serviceCategory: string;    // Dropdown: Catering, Venue, Decoration, etc.
  description: string;        // Detailed requirement description
}
```

**2. Service Details**
```tsx
{
  serviceDate: Date;          // When service is needed
  serviceTime: string;        // Time requirement
  duration: string;           // Expected duration
  guestCount: number;         // Number of guests to serve
  specificRequirements: string; // Special needs/preferences
}
```

**3. Budget & Terms**
```tsx
{
  budgetRange: {              // Budget range
    min: number,
    max: number
  },
  paymentTerms: string;       // Payment structure preference
  deadline: Date;             // Bid submission deadline
}
```

**4. Attachments (Future)**
```tsx
{
  documents: File[];          // PDF/DOC files
  images: File[];             // Reference images
  sampleMenu?: File;          // For catering
}
```

**Validation:**
- All required fields must be filled
- Service date cannot be in the past
- Bid deadline must be before service date
- Budget min < max
- Description min 50 characters

**User Flow:**
```
Post Requirement
├──> Select event
├──> Fill requirement details
├──> Set budget and deadline
├──> Review requirement
├──> Submit for vendor bidding
└──> Navigate to Requirement Details
```

### 4.2 Requirement Details (`RequirementDetails.tsx`)

**Purpose**: View requirement details and received bids.

**Sections:**

**1. Requirement Overview**
- Title and description
- Event association
- Service category
- Date and time
- Budget range
- Deadline countdown
- Status (Open/Closed/Awarded)

**2. Bids Received**
- Number of bids
- Bid summary cards
- Vendor name and rating
- Quoted price
- Delivery timeline
- View detailed proposal button

**3. Actions**
- Edit requirement (if no bids yet)
- Close requirement (stop accepting bids)
- Award to vendor
- Message all bidders
- Delete requirement

**Data Structure:**
```tsx
interface Requirement {
  id: string;
  title: string;
  event: string;
  category: string;
  description: string;
  serviceDate: string;
  budget: { min: number; max: number };
  deadline: string;
  status: 'Open' | 'Closed' | 'Awarded';
  bidsReceived: number;
  bids: Bid[];
  createdAt: string;
}
```

---

## 💰 5. Bids Evaluation

### 5.1 Bids List (`BidsList.tsx`)

**Purpose**: View all bids received across all requirements.

**Features:**
- Filter by requirement
- Filter by status: All | Pending Review | Shortlisted | Awarded | Rejected
- Sort by price, rating, date
- Quick actions: Accept, Reject, View Details
- Bulk actions: Shortlist multiple bids

**Bid Data:**
```tsx
interface Bid {
  id: string;
  vendor: {
    name: string;
    rating: number;
    completedJobs: number;
    responseTime: string;
  };
  requirement: string;
  quotedPrice: number;
  deliveryTimeline: string;
  proposalSummary: string;
  attachments: string[];
  status: 'Pending' | 'Shortlisted' | 'Awarded' | 'Rejected';
  submittedAt: string;
}
```

**Actions Available:**
- ✅ View full proposal
- ✅ Shortlist bid
- ✅ Award contract
- ✅ Reject with reason
- ✅ Ask question to vendor
- ✅ Compare with other bids

### 5.2 Bid Comparison (`BidComparison.tsx`)

**Purpose**: Side-by-side comparison of multiple bids.

**Comparison Metrics:**
- Quoted price
- Vendor rating
- Experience (years)
- Completed jobs
- Response time
- Delivery timeline
- Payment terms
- Reviews summary
- Included services
- Additional costs

**Features:**
- Select 2-4 bids to compare
- Highlight best value
- Highlight fastest delivery
- Highlight top-rated vendor
- Export comparison table
- Award directly from comparison

**UI Layout:**
```
┌─────────────┬──────────┬──────────┬──────────┐
│   Metric    │  Bid 1   │  Bid 2   │  Bid 3   │
├─────────────┼──────────┼──────────┼──────────┤
│ Price       │ ₹50,000  │ ₹45,000  │ ₹55,000  │
│ Rating      │  4.8 ⭐  │  4.5 ⭐  │  4.9 ⭐  │
│ Timeline    │ 2 weeks  │ 3 weeks  │ 10 days  │
└─────────────┴──────────┴──────────┴──────────┘
```

---

## 🏪 6. Vendor Discovery

### 6.1 Vendor Marketplace (`VendorMarketplace.tsx`)

**Purpose**: Browse and discover verified vendors.

**Features:**
- **Category filters**: Catering, Venue, Decoration, Photography, Entertainment, etc.
- **Location filters**: City, area-based filtering
- **Rating filter**: 4+ stars, 4.5+ stars
- **Price range**: Budget-based filtering
- **Availability**: Show only available vendors
- **Search**: By vendor name or specialty

**Vendor Card Display:**
```tsx
interface VendorCard {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  completedEvents: number;
  priceRange: string; // "₹₹₹" indicator
  availability: boolean;
  portfolio: string[]; // Image URLs
  location: string;
  verified: boolean;
}
```

**Actions:**
- ✅ View vendor profile
- ✅ Shortlist vendor
- ✅ Send direct message
- ✅ Request quote
- ✅ View portfolio

### 6.2 Vendor Profile (`VendorProfile.tsx`)

**Purpose**: Detailed view of vendor information, portfolio, and reviews.

**Sections:**

**1. Profile Header**
- Vendor name and logo
- Category and specialties
- Verification badge
- Rating and review count
- Response time
- Availability status

**2. About**
- Business description
- Years of experience
- Team size
- Service areas
- Languages spoken

**3. Portfolio**
- Image gallery of previous work
- Video showcase (if available)
- Case studies
- Certifications

**4. Services Offered**
- Service categories
- Package details
- Pricing ranges (if public)
- Customization options

**5. Reviews & Ratings**
- Overall rating breakdown
- Recent reviews
- Review filters (5-star, 4-star, etc.)
- Verified reviews badge
- Response from vendor

**6. Availability**
- Calendar view
- Booked dates (grayed out)
- Available dates (selectable)
- Advance booking timeline

**Actions:**
- ✅ Send message
- ✅ Request quote
- ✅ Shortlist vendor
- ✅ Share profile
- ✅ Report vendor
- ✅ Write review (if worked with)

### 6.3 Shortlisted Vendors (`Vendors.tsx`)

**Purpose**: Manage list of shortlisted/favorited vendors.

**Features:**
- View all shortlisted vendors
- Organize by category
- Add notes to each vendor
- Quick contact actions
- Remove from shortlist
- Request quotes from multiple vendors

---

## 📄 7. Agreements Management

### 7.1 Agreements List (`Agreements.tsx`)

**Purpose**: View all contract agreements with vendors.

**Features:**
- Filter by status: All | Pending Signature | Signed | Completed | Cancelled
- Filter by event
- Search by vendor name
- View agreement details
- Download PDF
- Track payment status

**Agreement Data:**
```tsx
interface Agreement {
  id: string;
  vendor: string;
  event: string;
  service: string;
  amount: number;
  status: 'Draft' | 'Pending' | 'Signed' | 'Completed' | 'Cancelled';
  createdDate: string;
  signedDate?: string;
  deliveryDate: string;
  paymentStatus: 'Pending' | 'Partial' | 'Paid';
  terms: string[];
}
```

**Actions:**
- ✅ View agreement details
- ✅ Download PDF
- ✅ Sign agreement (digital signature)
- ✅ Request modifications
- ✅ Cancel agreement
- ✅ Make payment

### 7.2 Agreement Viewer (`AgreementViewer.tsx`)

**Purpose**: View and interact with agreement document.

**Sections:**
- Agreement header (parties involved)
- Service details
- Terms and conditions
- Payment schedule
- Deliverables checklist
- Cancellation policy
- Signatures section
- Amendment history

**Features:**
- PDF preview
- Download option
- Print option
- Digital signature pad
- Comment/note section
- Version history

---

## 💬 8. Communication

### 8.1 Messages Center (`Messages.tsx`)

**Purpose**: Central hub for all vendor conversations.

**Features:**
- Conversation list (sidebar)
- Unread message count
- Search conversations
- Filter by vendor
- Mark as read/unread
- Archive conversations
- Delete conversations

**Conversation List Item:**
```tsx
interface Conversation {
  id: string;
  vendor: {
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  requirement?: string; // Associated requirement
}
```

### 8.2 Chat Detail (`ChatDetail.tsx`)

**Purpose**: Individual conversation view with a vendor.

**Features:**
- Message history
- Real-time updates (future)
- File attachments
- Quick replies
- Requirement context
- Vendor info sidebar

**Message Structure:**
```tsx
interface Message {
  id: string;
  from: 'customer' | 'vendor';
  content: string;
  timestamp: string;
  attachments?: File[];
  read: boolean;
}
```

---

## 🔔 9. Notifications (`Notifications.tsx`)

**Purpose**: View all platform notifications and alerts.

**Notification Types:**
- New bid received
- Bid accepted/rejected
- Vendor message
- Agreement status update
- Payment reminder
- Event reminder
- System announcements

**Notification Data:**
```tsx
interface Notification {
  id: string;
  type: 'bid' | 'message' | 'agreement' | 'payment' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string; // Link to related page
}
```

**Features:**
- Mark as read
- Mark all as read
- Filter by type
- Delete notification
- Notification preferences

---

## ⚙️ 10. Settings (`Settings.tsx`)

**Purpose**: Manage customer account settings and preferences.

**Sections:**

**1. Profile Settings**
- Name, email, phone
- Profile picture upload
- Business details (if applicable)
- Preferred language

**2. Notification Preferences**
- Email notifications toggle
- SMS notifications toggle
- Notification frequency
- Notification categories

**3. Privacy Settings**
- Profile visibility
- Contact information visibility
- Review visibility
- Data sharing preferences

**4. Security**
- Change password
- Two-factor authentication (future)
- Active sessions
- Login history

**5. Payment Methods** (Future)
- Saved payment methods
- Default payment method
- Billing address
- Transaction history

**6. Preferences**
- Default event type
- Preferred vendor categories
- Budget ranges
- Communication preferences

---

## 🔄 Common User Flows

### Flow 1: Create Event and Hire Vendor

```
1. Dashboard → Create Event
2. Fill event details → Submit
3. Event Overview → Post Requirement
4. Fill requirement details → Publish
5. Wait for bids (view in Bids List)
6. Compare bids → Award contract
7. Sign agreement
8. Communicate with vendor
9. Monitor deliverables
10. Complete event → Write review
```

### Flow 2: Browse and Direct Hire

```
1. Dashboard → Vendor Marketplace
2. Filter by category/location
3. View vendor profiles
4. Shortlist vendors
5. Send messages/request quotes
6. Receive quotes as bids
7. Award contract
8. Sign agreement
9. Complete event
```

### Flow 3: Manage Multiple Events

```
1. Dashboard → View all events
2. Create new event
3. Post multiple requirements
4. Manage bids across events
5. Track agreements per event
6. Monitor budget across events
7. View consolidated reports
```

---

## 🎨 UI Components Used

### Common Components
- `Button` - All CTAs and actions
- `Input` - Form fields
- `Select` - Dropdowns
- `Textarea` - Long text inputs
- `Modal` - Dialogs and confirmations
- `Table` - Data lists
- `Card` - Content containers
- `Badge` - Status indicators
- `Tabs` - Section navigation

### Custom Components
- `ExportModal` - Export functionality
- `AdvancedFilterModal` - Complex filtering
- `ShareModal` - Share features
- `MessageModal` - Message display
- `ViewDetailsModal` - Quick view modals

---

## 📊 Data Export Capabilities

All list views support export:
- **CSV**: For spreadsheet analysis
- **JSON**: For data processing
- **PDF**: For printing/archiving
- **Print**: Direct browser print

**Utility**: `/src/app/utils/export.ts`

---

## 🔐 Access Control

**Customer Module Access:**
- ✅ Logged-in customers only
- ❌ Vendors cannot access
- ❌ Admins use separate admin panel
- ✅ Email verification required (future)

---

## 🐛 Error Handling

### Common Scenarios

**1. Empty States**
- No events created yet → Show "Create Your First Event" CTA
- No requirements → Show "Post Your First Requirement"
- No bids received → Show "Waiting for vendor bids"
- No messages → Show "No conversations yet"

**2. Validation Errors**
- Form field errors shown inline
- Summary error message at top
- Prevent submission until fixed

**3. Network Errors (Future)**
- Retry mechanism
- Offline indicator
- Data sync when online

---

## 🚀 Future Enhancements

1. **Real-time Updates**: WebSocket for live bid notifications
2. **Video Calls**: Vendor consultations via platform
3. **Budget Tracker**: Visual budget vs actual spending
4. **Vendor Recommendations**: AI-powered suggestions
5. **Calendar Integration**: Sync with Google/Outlook
6. **Mobile App**: iOS and Android apps
7. **Analytics**: Event success metrics

---

**Next**: [Vendor Module Documentation →](./05-VENDOR-MODULE.md)
