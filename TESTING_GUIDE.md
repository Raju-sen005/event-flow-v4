# 🧪 COMPLETE TESTING GUIDE - Event Management Platform

## 📍 HOW TO ACCESS AND TEST ALL FEATURES

### ✅ STEP 1: Start the Application

1. Make sure your development server is running
2. Open your browser
3. Navigate to: `http://localhost:5173` (or your dev server URL)

---

## 🎯 TESTING THE EVENT CREATION FLOW

### Access Point:
```
http://localhost:5173/customer/events/create
```

### What You'll See:

**STEP 1: Entry Screen**
- ✅ Large "Start Event Setup" button
- ✅ Click it → Goes to Step 2

**STEP 2: Select Category**
- ✅ 5 cards: Wedding, Birthday, Corporate, Anniversary, Other
- ✅ Click any card → It highlights with checkmark
- ✅ "Continue" button is DISABLED until you select
- ✅ Hover on disabled "Continue" → See tooltip: "Please select an event category"
- ✅ Click "Continue" → Goes to Step 3

**STEP 3: Management Mode**
- ✅ 2 options: "Manage Myself" or "Hire an Event Planner"
- ✅ Click one → It highlights
- ✅ Warning appears: "This choice cannot be changed later"
- ✅ Click "Confirm & Continue" → MODAL POPS UP
- ✅ Modal says: "This choice cannot be changed later for this event"
- ✅ Click "Cancel" → Modal closes, stays on step
- ✅ Click "Confirm" → Modal closes, goes to Step 4

**STEP 4: Services (if self-managed)**
- ✅ Checkboxes for services (Photography, Catering, etc.)
- ✅ Click services → They get selected
- ✅ Type in "Custom Service" field → Click "Add" → Appears as tag
- ✅ "Continue" DISABLED until you select at least 1 service
- ✅ Hover on disabled → Tooltip: "Select at least one service"
- ✅ Click "Continue" → Goes to Step 5

**STEP 4: Services (if planner-managed)**
- ✅ Message: "Your event planner will manage all services"
- ✅ "Continue" button is enabled immediately
- ✅ Click "Continue" → Goes to Step 5

**STEP 5: Event Details**
- ✅ Form with 7 fields:
  - Event Name (required) ✓
  - Event Date (required) ✓
  - Start Time (required) ✓
  - End Time (required) ✓
  - Location (required) ✓
  - Budget (optional)
  - Notes (optional)
- ✅ Try clicking "Review Event" without filling → RED BORDERS appear on required fields
- ✅ Fill all required fields
- ✅ Click "Review Event" → Goes to Step 6

**STEP 6: Review & Create**
- ✅ Shows summary of:
  - Category
  - Management mode (locked)
  - Services (if self-managed)
  - Event details
- ✅ Click "Go Back & Edit" → Returns to Step 5
- ✅ Click "Create Event" → MODAL POPS UP
- ✅ Modal: "Are you sure you want to create this event?"
- ✅ Click "Cancel" → Stays on review
- ✅ Click "Create Event" → REDIRECTS to Event Details page

**Expected redirect:**
- Self-managed: `/customer/events/1/vendor-selection`
- Planner-managed: `/customer/events/1`

---

## 🏠 TESTING THE EVENT DETAILS PAGE (EVENT HOME)

### Access Point:
```
http://localhost:5173/customer/events/1
```

### What You'll See:

**HEADER:**
- ✅ Event name: "Sarah & John Wedding"
- ✅ Status badge (blue): "Planning"
- ✅ Date, time, location with icons
- ✅ "Edit Event" button (enabled because status = planning)
- ✅ "View Timeline" button (always enabled)
- ✅ Try hovering "Edit Event" when status is NOT planning → Tooltip appears

**PROGRESS TRACKER:**
- ✅ 5 steps displayed horizontally
- ✅ Step 1 (Event Created) has green checkmark
- ✅ Step 2 (Vendors Selected) is blue (in progress)
- ✅ Steps 3-5 are gray (pending)
- ✅ Click on Step 1 (completed) → Should be clickable
- ✅ Hover on it → Scales up

**QUICK ACTION CARDS (5 cards):**
1. **Vendors** - Shows "1/6"
   - ✅ Click it → Navigates to Vendors tab
   
2. **Bids** - Shows count
   - ✅ Click it → Navigates to Bids tab
   - ✅ If planner-managed: DISABLED with tooltip
   
3. **Guests** - Shows "2/3"
   - ✅ Click it → Navigates to Guests tab
   
4. **Invitations** - Shows "Ready"
   - ✅ Click it → Navigates to Invitations tab
   
5. **Payments** - Shows "$22,500"
   - ✅ Click it → Navigates to Payments tab

**TABS (8 tabs):**
- ✅ Click each tab → Content changes
- ✅ Active tab is highlighted

---

### TAB 1: OVERVIEW

**What You'll See:**
- ✅ **Event Summary Cards:**
  - Budget: $50,000
  - Spent: $32,500
  - Remaining: $17,500 (calculated)

- ✅ **Key Metrics:**
  - Vendors Finalized: 1/6
  - Pending Payments: $22,500
  - Guest Responses: 2/3

- ✅ **Pending Actions:**
  - "Finalize remaining vendors" → Click → Goes to Vendors tab
  - "Complete pending payments" → Click → Goes to Payments tab
  - "Follow up with pending guests" → Click → Goes to Guests tab

**Test:**
1. Click "Finalize remaining vendors" → Should jump to Vendors tab
2. Go back to Overview
3. Click "Complete pending payments" → Should jump to Payments tab

---

### TAB 2: VENDORS (Self-Managed)

**What You'll See:**
- ✅ "Add Vendor" button at top right
- ✅ 2 Dropdown filters:
  - Service filter (All Services, Photography, Catering, etc.)
  - Status filter (All Statuses, Invited, Bid Received, etc.)
- ✅ "Reset" button (appears when filters active)

**Test:**
1. Click "Service" dropdown → Select "Photography" → List updates
2. Click "Status" dropdown → Select "Finalized" → List updates
3. Click "Reset" → Filters clear, full list shows
4. Click "Add Vendor" → Navigates to `/customer/events/1/vendor-selection`
5. Click "View" on any vendor → Navigates to vendor profile
6. Click "View Bid" → Navigates to bid detail

**Vendor Cards Show:**
- ✅ Vendor name
- ✅ Service type
- ✅ Status badge (colored)
- ✅ "View" button
- ✅ "View Bid" button (if bid exists)

---

### TAB 2: PLANNER (Planner-Managed)

**What You'll See:**
- ✅ Icon (sparkles)
- ✅ Heading: "Event Planner Managed"
- ✅ Message: "Your event is fully managed by your assigned Event Planner"
- ✅ Blue box: "Vendor selection handled by planner"
- ✅ NO action buttons

---

### TAB 3: BIDS (Self-Managed Only)

**What You'll See:**
- ✅ 2 Dropdown filters:
  - Service filter
  - Status filter (Pending, Negotiating, Accepted, Rejected)
- ✅ "Reset" button

**Test:**
1. Click filters → List updates
2. Click "Reset" → Filters clear
3. Click "View Bid" on any bid → Navigates to `/customer/events/1/bids/:bidId`

**Bid Cards Show:**
- ✅ Vendor name
- ✅ Service
- ✅ Amount (large, orange text)
- ✅ Status badge
- ✅ "View Bid" button

**For Planner-Managed:**
- Tab is DISABLED (grayed out)

---

### TAB 4: GUESTS

**What You'll See:**
- ✅ "Add Guest" button (orange)
- ✅ "Upload CSV" button (outline)
- ✅ Status filter dropdown (All, Not Invited, Invited, Accepted, Declined, Maybe)
- ✅ "Reset" button (when filter active)

**Test:**
1. Click status filter → Select "Accepted" → List shows only accepted
2. Click "Reset" → Shows all
3. Click "Add Guest" → Navigates to `/customer/events/1/guests`
4. Click "Upload CSV" → Navigates to `/customer/events/1/guests`

**Guest Cards Show:**
- ✅ Name
- ✅ Phone number
- ✅ Status badge (colored)

---

### TAB 5: INVITATIONS

**What You'll See:**
- ✅ Icon (mail/envelope)
- ✅ Heading: "Event Invitations"
- ✅ Description
- ✅ 2 buttons:
  - "Create Invitation" (orange)
  - "Send Invitations" (outline)

**Test:**
1. Click "Create Invitation" → Navigates to guests page
2. Click "Send Invitations" → Navigates to guests page

---

### TAB 6: PAYMENTS & INVOICES

**What You'll See:**
- ✅ "View Full Details" button (top right)
- ✅ Status filter dropdown (All, Pending, Paid, Overdue)
- ✅ "Reset" button (when filter active)

**Test:**
1. Click filter → Select "Pending" → Shows only pending
2. Click "Reset" → Shows all
3. Click "View Full Details" → Navigates to `/customer/events/1/payments-detail`
4. Click "Pay Now" on pending payment → Navigates to payment page

**Payment Cards Show:**
- ✅ Milestone name
- ✅ Due date
- ✅ Amount (large, orange)
- ✅ Status badge
- ✅ "Pay Now" button (if pending)

---

### TAB 7: AGREEMENTS

**What You'll See:**
- ✅ Icon (file)
- ✅ Heading: "Event Agreements"
- ✅ 2 buttons:
  - "Add Agreement" (orange)
  - "View All Agreements" (outline)

**Test:**
1. Click "Add Agreement" → Navigates to `/customer/events/1/agreements`
2. Click "View All Agreements" → Navigates to `/customer/events/1/agreements`

---

### TAB 8: EXECUTION

**What You'll See:**
- ✅ Icon (login arrow)
- ✅ Heading: "Event Execution & Attendance"
- ✅ Description about tracking vendor arrival/departure
- ✅ "View Execution Details" button (orange)

**Test:**
1. Click "View Execution Details" → Navigates to `/customer/events/1/execution`

---

## 🔗 TESTING NAVIGATION LINKS

### From Event Details, test these navigation paths:

1. **Vendor Selection:**
   ```
   /customer/events/1/vendor-selection
   ```
   - Should show vendor marketplace filtered by event

2. **Guests Management:**
   ```
   /customer/events/1/guests
   ```
   - Should show guest list with add/upload options

3. **Payments Detail:**
   ```
   /customer/events/1/payments-detail
   ```
   - Should show full payment breakdown with gift collection

4. **Agreements:**
   ```
   /customer/events/1/agreements
   ```
   - Should show agreements list with add option

5. **Execution:**
   ```
   /customer/events/1/execution
   ```
   - Should show vendor make-in/mark-out tracking

---

## 🎨 TESTING GUEST MANAGEMENT MODULE

### Access Point:
```
http://localhost:5173/customer/events/1/guests
```

### What You'll See:

**HEADER:**
- ✅ Guest summary cards (6 cards showing stats)
- ✅ Action buttons:
  - "Add Guest" (orange)
  - "Upload CSV" (outline)
  - "Download Template" (outline)
  - "Send Invitations" (green)

**GUEST LIST:**
- ✅ Checkbox for each guest
- ✅ "Select All" checkbox in header
- ✅ Search bar (search by name/phone)
- ✅ Status filter dropdown

**Test Add Guest:**
1. Click "Add Guest" → Modal pops up
2. Fill form (name, phone, email, category)
3. Click "Save Guest" → Modal closes, guest added

**Test Upload CSV:**
1. Click "Upload CSV" → Modal pops up
2. See CSV format preview
3. Click "Download Template" → Downloads template
4. Click "Continue to Upload" → See upload screen
5. Upload file → Preview shows → Click "Import"

**Test Send Invitations:**
1. Click "Send Invitations" → Modal pops up (4 steps)
2. **Step 1:** Select "All guests" or "Selected only"
3. **Step 2:** Choose WhatsApp or Email
4. **Step 3:** Edit message template
5. **Step 4:** Review → Click "Send Now"

---

## 💰 TESTING PAYMENTS MODULE

### Access Point:
```
http://localhost:5173/customer/events/1/payments-detail
```

### What You'll See:

**TABS:**
1. Milestone Payments
2. Payment History
3. Invoices
4. Gift Collection

**Test Milestone Payments:**
1. See payment slabs listed
2. For PENDING slab:
   - Click "Pay Online" → Modal with payment confirmation
   - Click "Mark as Cash Payment" → Modal with 3-step explanation
3. For PAID slab:
   - See "Download Receipt" button

**Test Gift Collection:**
1. Click "Gift Collection" tab
2. If not enabled → See "Enable Gift Collection" button
3. Click "Enable" → Modal for bank account setup
4. After enabling → See:
   - Gift wallet balance
   - QR code
   - Transaction list
   - "Withdraw Funds" button

---

## 📝 TESTING AGREEMENTS MODULE

### Access Point:
```
http://localhost:5173/customer/events/1/agreements
```

### What You'll See:

**HEADER:**
- ✅ "Add Agreement" button

**Test Add Agreement:**
1. Click "Add Agreement" → Modal pops up
2. Fill fields:
   - Agreement title
   - Select vendor (dropdown)
   - Upload file (PDF/DOC)
   - Notes (optional)
3. Click "Send Agreement" → Modal confirms vendor notification
4. After sending → Agreement appears in list

**Agreement Cards Show:**
- ✅ Title
- ✅ Vendor name
- ✅ Status (Sent, Viewed, Accepted)
- ✅ Timeline with timestamps
- ✅ "View Details" button
- ✅ "Download" button

---

## 🎯 TESTING EXECUTION MODULE

### Access Point:
```
http://localhost:5173/customer/events/1/execution
```

### What You'll See:

**Vendor Execution Cards:**
- ✅ Vendor name + service
- ✅ Expected times
- ✅ Make-In section
- ✅ Mark-Out section
- ✅ Status indicators

**Test Make-In Confirmation:**
1. Find vendor with "Make-In Submitted" status
2. See 2 buttons:
   - "Raise Issue" (red)
   - "Confirm Make-In" (green)
3. Click "Confirm Make-In" → Modal pops up
4. Modal shows:
   - Vendor name
   - Time
   - Warning about immutability
5. Click "Confirm" → Time locked, status updated

**Test Mark-Out Confirmation:**
1. Same flow as Make-In
2. After confirming → Total duration calculated

**Test Raise Issue:**
1. Click "Raise Issue" → Modal pops up
2. Fill issue description
3. Click "Submit Issue" → Notifies admin

---

## ✅ QUICK CHECKLIST - What Should Work

### Event Creation Flow:
- [ ] All 6 steps navigate correctly
- [ ] Tooltips show on disabled buttons
- [ ] Confirmation modals appear
- [ ] Form validation works
- [ ] Redirects to correct page after creation

### Event Details Page:
- [ ] All 8 tabs work
- [ ] All filters actually filter data
- [ ] All CTAs navigate somewhere
- [ ] Quick action cards work
- [ ] Progress tracker clickable
- [ ] Disabled buttons show tooltips

### Guest Management:
- [ ] Add guest modal works
- [ ] CSV upload modal works
- [ ] Send invitations wizard works
- [ ] Search filters guests
- [ ] Status filter works

### Payments:
- [ ] All 4 tabs accessible
- [ ] Pay online modal works
- [ ] Cash payment modal works
- [ ] Gift collection enable works
- [ ] Status filter works

### Agreements:
- [ ] Add agreement modal works
- [ ] View details modal works
- [ ] Timeline shows correctly

### Execution:
- [ ] Confirm make-in modal works
- [ ] Confirm mark-out modal works
- [ ] Raise issue modal works
- [ ] Status updates correctly

---

## 🐛 TROUBLESHOOTING

### If you see "Page not found":
- Check the URL matches exactly
- Make sure you're logged in as customer
- Try refreshing the page

### If buttons don't work:
- Open browser console (F12)
- Look for errors
- Check if routes are loaded

### If modals don't appear:
- Check if z-index is correct
- Look for console errors
- Try clicking again

---

## 📞 SUPPORT

If something doesn't work:
1. Check browser console for errors
2. Verify you're on the correct URL
3. Make sure all routes are loaded
4. Try refreshing the page

---

**All features are now connected and working!** 🎉

Test each section systematically and you'll see everything functioning as described.
