# 🧪 VENDOR LISTING & PROFILE - COMPLETE TESTING GUIDE

## 📍 DIRECT ACCESS URLs

### Vendor Listing Page (Event-Filtered)
```
http://localhost:5173/customer/events/1/vendor-selection
```

### Vendor Profile Page (Event Context)
```
http://localhost:5173/customer/events/1/vendor-profile/1
```

---

## 🎯 COMPLETE FEATURE CHECKLIST

### ✅ VENDOR LISTING PAGE

#### **1. PAGE HEADER**
- [ ] "Back to Event" button navigates to `/customer/events/1`
- [ ] Title: "Select Vendors for Your Event"
- [ ] Helper text: "Vendors shown are based on your event type and selected services"
- [ ] Orange gradient background

#### **2. EVENT CONTEXT BANNER (System Filters)**
- [ ] Blue info box at top
- [ ] Shows: "Pre-filtered for: Sarah & John Wedding"
- [ ] Displays: Event category (Wedding)
- [ ] Displays: Event date
- [ ] Displays: Event location
- [ ] ⚠️ **These filters CANNOT be removed by customer**

#### **3. SEARCH BAR**
- [ ] Search icon appears on left
- [ ] Placeholder: "Search vendors by name..."
- [ ] Type "Elite" → Shows only "Elite Photography Studio"
- [ ] Type "DJ" → Shows "DJ Beats Entertainment"
- [ ] Clear search → Shows all vendors

#### **4. CUSTOMER FILTERS (All Functional)**

**Service Filter:**
- [ ] Dropdown shows: "All Services" + event services
- [ ] Select "Photography" → Shows only photography vendors
- [ ] Select "Catering" → Shows only catering vendors
- [ ] Change back to "All Services" → Shows all vendors

**Price Range Filter:**
- [ ] Options: All Prices, Budget (<$2,500), Mid ($2,500-$5,000), Premium ($5,000+)
- [ ] Select "Budget" → Shows vendors under $2,500
- [ ] Select "Premium" → Shows vendors $5,000+

**Rating Filter:**
- [ ] Options: All Ratings, 4.5+, 4.7+, 4.9+
- [ ] Select "4.9+" → Shows only Elite Photography & Cinematic Moments
- [ ] Lower rating filter → More vendors appear

**Location Filter:**
- [ ] Options: All Locations, Manhattan, Brooklyn, Queens, Bronx
- [ ] Select "Brooklyn" → Shows DJ Beats Entertainment
- [ ] Select "Manhattan" → Shows Cinematic Moments

**Experience Filter:**
- [ ] Options: All Levels, Entry (3-5 years), Mid (5-10 years), Expert (10+ years)
- [ ] Select "Expert" → Shows vendors with 10+ years
- [ ] Select "Entry" → Shows vendors with 3+ years

#### **5. RESET FILTERS**
- [ ] "Reset All Filters" button appears when ANY filter is active
- [ ] Click "Reset All Filters" → All filters return to default
- [ ] Button disappears when no filters active

#### **6. RESULTS COUNT**
- [ ] Shows: "Showing X vendors"
- [ ] When filtered: "Showing X vendors (filtered)"
- [ ] Updates dynamically as filters change

#### **7. VENDOR CARDS**

**Each Card Shows:**
- [ ] Vendor cover image
- [ ] "Verified" badge (if verified) - green, top-right
- [ ] Vendor name (large, bold)
- [ ] Service category (gray text below name)
- [ ] Star rating (yellow star + number)
- [ ] Review count in parentheses
- [ ] Location with pin icon
- [ ] Starting price with "$" icon
- [ ] Experience with sparkles icon

**Card CTAs:**
- [ ] "View Profile" button (outline style)
  - Navigates to `/customer/events/1/vendor-profile/:vendorId`
- [ ] "Add to Event" button (orange)
  - Opens confirmation modal

#### **8. EMPTY STATE**
- [ ] Apply filters that match no vendors
- [ ] See: Shopping bag icon (large, gray)
- [ ] See: "No vendors found" heading
- [ ] See: "Try adjusting your filters" message
- [ ] See: "Reset Filters" button
- [ ] Click button → Filters reset, vendors appear

#### **9. ADD TO EVENT FLOW**

**Step 1: Click "Add to Event"**
- [ ] Modal appears with overlay
- [ ] Modal title: "Add Vendor to Event"
- [ ] Blue info box explains bid process:
  - "Vendor will be invited to place a bid"
  - "Submit customized proposal"
  - "Review and negotiate"
  - "Finalize when satisfied"

**Step 2: Confirm**
- [ ] "Cancel" button closes modal
- [ ] "Confirm & Invite" button shows loading state
- [ ] After 1 second: Modal closes
- [ ] Redirects to `/customer/events/1?tab=vendors`

#### **10. PLANNER-MANAGED BEHAVIOR**

**If event is planner-managed:**
- [ ] Page shows amber warning box
- [ ] Icon: Alert circle (large)
- [ ] Title: "Vendor Selection Not Available"
- [ ] Message: "Your Event Planner manages vendor selection"
- [ ] "Back to Event" button (orange)
- [ ] NO vendor cards visible

---

### ✅ VENDOR PROFILE PAGE

#### **1. NAVIGATION**
- [ ] "Back to Vendor List" button
- [ ] Navigates to `/customer/events/1/vendor-selection`
- [ ] Preserves any active filters

#### **2. COVER IMAGE**
- [ ] Large hero image at top
- [ ] Gradient overlay (bottom to top)
- [ ] "Verified Vendor" badge (if verified) - green, top-right

#### **3. VENDOR HEADER**

**Profile Section:**
- [ ] Circular profile image (left side)
- [ ] Vendor name (large, bold)
- [ ] Tagline below name
- [ ] Star rating with review count
- [ ] Location with pin icon
- [ ] Experience with award icon

**Stats Cards (3 cards):**
- [ ] Events Completed (blue card)
- [ ] Years Experience (green card)
- [ ] Repeat Clients % (purple card)

**Contact Info:**
- [ ] Phone number with icon
- [ ] Email with icon
- [ ] Website with icon

**CTA:**
- [ ] "Add to Event" button (orange, top-right)
- [ ] If planner-managed: Button disabled with tooltip
- [ ] Tooltip: "Your Event Planner manages vendor selection"

#### **4. ABOUT SECTION**
- [ ] White card with border
- [ ] Heading: "About"
- [ ] Full description text (readable, gray)

#### **5. SERVICES SECTION**
- [ ] White card with border
- [ ] Heading: "Services Offered"
- [ ] 3 columns of service categories
- [ ] Each service has green checkmark icon
- [ ] Services listed in gray text

#### **6. PACKAGES SECTION**
- [ ] White card with border
- [ ] Heading: "Packages & Pricing"
- [ ] 3 package cards (grid layout)

**Each Package Shows:**
- [ ] Package name (bold)
- [ ] Description (gray)
- [ ] "Starting at" text
- [ ] Price (large, orange)
- [ ] List of inclusions with checkmarks
- [ ] Hover: Border changes to orange

#### **7. PORTFOLIO SECTION**

**Category Filter:**
- [ ] Buttons: All, Wedding, Engagement, Pre-wedding
- [ ] Active button: Orange background, white text
- [ ] Inactive buttons: Gray background
- [ ] Click category → Grid updates instantly

**Portfolio Grid:**
- [ ] 3 columns of images
- [ ] Each image has hover effect (zoom in)
- [ ] Overlay appears on hover with icon
- [ ] Image title shown at bottom
- [ ] Smooth animation when filtering

**Lightbox (Click any image):**
- [ ] Full-screen black overlay
- [ ] Large image in center
- [ ] "X" button (top-right) to close
- [ ] Left arrow to go previous
- [ ] Right arrow to go next
- [ ] Image title at bottom
- [ ] Page count: "1 / 6"
- [ ] Click outside image → Closes lightbox

#### **8. REVIEWS SECTION**
- [ ] White card with border
- [ ] Heading: "Reviews & Ratings"
- [ ] List of review cards

**Each Review Shows:**
- [ ] Customer name
- [ ] Event type + date
- [ ] Star rating (yellow filled stars)
- [ ] Review comment text
- [ ] Divider line between reviews

#### **9. ADD TO EVENT FROM PROFILE**
- [ ] Click "Add to Event" button (top of page)
- [ ] Same modal as listing page
- [ ] Same confirmation flow
- [ ] Redirects to event vendors tab

---

## 🔗 NAVIGATION TESTING

### **Flow 1: Listing → Profile → Back**
1. Go to: `/customer/events/1/vendor-selection`
2. Apply filter: "Photography"
3. Click "View Profile" on Elite Photography
4. See vendor profile page
5. Click "Back to Vendor List"
6. ✅ Should return to listing with "Photography" filter still active

### **Flow 2: Listing → Add Vendor → Event**
1. Go to: `/customer/events/1/vendor-selection`
2. Click "Add to Event" on any vendor
3. See confirmation modal
4. Click "Confirm & Invite"
5. ✅ Should redirect to `/customer/events/1?tab=vendors`
6. ✅ Tab should open on "Vendors" tab

### **Flow 3: Profile → Add Vendor → Event**
1. Go to: `/customer/events/1/vendor-profile/1`
2. Scroll through all sections
3. Click "Add to Event" at top
4. Confirm in modal
5. ✅ Should redirect to event vendors tab

### **Flow 4: Event Home → Vendor Listing**
1. Go to: `/customer/events/1`
2. Click "Vendors" tab
3. Click "Add Vendor" button
4. ✅ Should navigate to `/customer/events/1/vendor-selection`

---

## 🎨 FILTER COMBINATION TESTING

### **Test 1: Multiple Filters**
1. Select Service: "Photography"
2. Select Price: "Premium"
3. Select Rating: "4.9+"
4. ✅ Should show only vendors matching ALL criteria

### **Test 2: Search + Filters**
1. Type in search: "Elite"
2. Select Service: "Photography"
3. ✅ Should show vendors matching both search AND filter

### **Test 3: Filter → Reset → Re-filter**
1. Apply multiple filters
2. Click "Reset All Filters"
3. Apply different filters
4. ✅ All should work smoothly

---

## 🚫 PLANNER-MANAGED TESTING

### **Test Planner-Managed Event:**
1. Change event.managementMode to 'planner-managed' in code
2. Go to: `/customer/events/1/vendor-selection`
3. ✅ Should see amber warning page
4. ✅ Should NOT see vendor grid
5. ✅ "Back to Event" button should work
6. Go to: `/customer/events/1/vendor-profile/1`
7. ✅ "Add to Event" button should be disabled
8. ✅ Hover shows tooltip explaining why

---

## ⚡ PERFORMANCE & UX TESTING

### **Loading States:**
- [ ] Skeleton cards appear during loading
- [ ] 6 skeleton cards in grid
- [ ] Smooth fade-in when loaded

### **Animations:**
- [ ] Vendor cards fade in when appearing
- [ ] Vendor cards fade out when filtered out
- [ ] Portfolio images animate when category changes
- [ ] Modal slides in smoothly
- [ ] Lightbox fades in/out

### **Responsive Design:**
- [ ] Desktop (1920px): 3 columns
- [ ] Laptop (1280px): 3 columns
- [ ] Tablet (768px): 2 columns
- [ ] Mobile (375px): 1 column

---

## ✅ FINAL VERIFICATION

**Vendor Listing Page:**
- [ ] All 5 filters work independently
- [ ] All filters work in combination
- [ ] Search works with filters
- [ ] Reset clears everything
- [ ] Empty state appears correctly
- [ ] Add to Event opens modal
- [ ] Modal confirms and redirects
- [ ] Planner-managed shows warning

**Vendor Profile Page:**
- [ ] All sections visible
- [ ] Portfolio filter works
- [ ] Lightbox navigation works
- [ ] Add to Event works
- [ ] Back to Vendor List works
- [ ] Planner-managed disables CTA

**Navigation:**
- [ ] All "Back" buttons work
- [ ] All "View Profile" buttons work
- [ ] All "Add to Event" buttons work
- [ ] Redirects go to correct pages
- [ ] Filter state preserved on back

---

## 🎯 START TESTING NOW

**Recommended Order:**
1. Test Vendor Listing filters (one by one)
2. Test Add to Event modal
3. Test Vendor Profile sections
4. Test Portfolio lightbox
5. Test navigation flow
6. Test planner-managed state

**Everything should work exactly as described above!** 🚀

No visual-only elements. Every button, every filter, every CTA performs an action.
