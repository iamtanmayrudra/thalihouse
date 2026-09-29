# Custom Thali QSR Platform --- Master Product & Frontend Plan

## 1. Project Overview

Build a modern food-commerce/QSR platform centered around a **Build Your
Own Thali** experience.

The customer can select individual food items, customize a thali, see
the price update live, apply coupons, choose combo offers, place an
order, and track the order.

The platform will also include a complete **business management system**
in the frontend for administrators, managers, and kitchen staff.

### Core proposition

> **Your Thali. Your Rules.**

### Core customer flow

``` text
Discover Food
    ↓
Build Your Thali
    ↓
Customize Items
    ↓
Live Price Update
    ↓
Combo / Coupon
    ↓
Cart
    ↓
Checkout
    ↓
Payment
    ↓
Order Tracking
    ↓
Reorder
```

------------------------------------------------------------------------

# 2. Technology Stack

## Frontend

-   Next.js
-   React
-   TypeScript
-   Tailwind CSS

## UI Requirements

-   Light theme
-   Dark theme
-   Responsive design
-   Mobile-first customer experience
-   Tablet-optimized customer experience
-   Desktop management dashboard
-   Reusable component system
-   Accessible touch targets
-   Smooth micro-interactions

## Recommended supporting technologies

-   React Hook Form --- forms
-   Zod --- validation
-   State management --- Context API or a lightweight state library
-   Chart library --- admin analytics
-   Image optimization through Next.js Image
-   Server-side validation for all pricing and order operations

------------------------------------------------------------------------

# 3. Product Areas

The application should be divided into four major experiences.

``` text
CUSTOM THALI PLATFORM
│
├── Customer Website
│   ├── Home
│   ├── Menu
│   ├── Categories
│   ├── Product Details
│   ├── Build Your Thali
│   ├── Combos
│   ├── Offers
│   ├── Cart
│   ├── Checkout
│   ├── Orders
│   └── Profile
│
├── Admin Management
│   ├── Dashboard
│   ├── Menu
│   ├── Products
│   ├── Categories
│   ├── Thali Rules
│   ├── Pricing
│   ├── Combos
│   ├── Coupons
│   ├── Offers
│   ├── Inventory
│   ├── Orders
│   ├── Customers
│   ├── Reports
│   └── Settings
│
├── Manager
│   ├── Orders
│   ├── Menu Availability
│   ├── Inventory
│   ├── Offers
│   └── Reports
│
└── Kitchen
    ├── New Orders
    ├── Preparing
    ├── Ready
    ├── Completed
    └── Item Availability
```

------------------------------------------------------------------------

# 4. User Roles

## Customer

-   Sign up
-   Login
-   Logout
-   Browse menu
-   Search products
-   Filter products
-   Build custom thali
-   Customize food
-   View live price
-   Apply coupon
-   Select combo
-   Cart
-   Checkout
-   Payment
-   Order tracking
-   Order history
-   Reorder
-   Favorites
-   Profile
-   Saved addresses
-   Notifications
-   Theme selection

## Admin

Full business management access:

-   Dashboard
-   Menu management
-   Product management
-   Category management
-   Thali configuration
-   Pricing
-   Combos
-   Coupons
-   Offers
-   Orders
-   Customers
-   Inventory
-   Reports
-   User and role management
-   Settings

## Manager

Operational access:

-   Orders
-   Menu availability
-   Inventory
-   Offers
-   Customers
-   Reports

## Kitchen Staff

Kitchen-focused access:

-   New orders
-   Preparation queue
-   Order status
-   Ready orders
-   Completed orders
-   Item availability

------------------------------------------------------------------------

# 5. Authentication

Authentication must be available from the beginning.

## Customer authentication

``` text
Login
Sign Up
Forgot Password
Reset Password
Email / Phone Verification
Logout
Session Management
```

Future options:

``` text
Google Login
Apple Login
OTP Login
```

## Role-based access

``` text
Customer → Customer application
Admin    → Full management system
Manager  → Operational management
Kitchen  → Kitchen dashboard
```

Unauthorized users must not be able to access protected management
routes.

------------------------------------------------------------------------

# 6. Customer Mobile UI

The mobile experience should be the primary customer ordering
experience.

## Design direction

The UI should feel:

-   Modern
-   Premium
-   Fast
-   Friendly
-   Food-focused
-   Highly visual
-   Easy to customize
-   Similar in polish to an international QSR/food-tech brand

Avoid making the product feel like a traditional restaurant website.

------------------------------------------------------------------------

# 7. Mobile Navigation

Use bottom navigation instead of a large desktop-style navbar.

Recommended navigation:

``` text
Home
Menu
Build
Orders
Profile
```

The **Build** action should be visually emphasized because it is the
core business feature.

Example:

``` text
┌─────────────────────────────┐
│                             │
│        PAGE CONTENT         │
│                             │
├─────────────────────────────┤
│ Home │ Menu │ Build │ Orders │
│  🏠  │  🍱  │  ➕   │   📦   │
└─────────────────────────────┘
```

Cart access should remain visible in the header.

------------------------------------------------------------------------

# 8. Mobile Homepage

The homepage should communicate the main proposition immediately.

## Recommended structure

``` text
Header
↓
Personal greeting
↓
Hero / Build Your Thali CTA
↓
Popular Thalis
↓
Categories
↓
Combo Offers
↓
Today's Offers
↓
Best Sellers
↓
How It Works
↓
Customer Reviews
↓
Closing CTA
↓
Bottom Navigation
```

## Hero messaging

Example:

> **Your Thali. Your Rules.**

> Pick your favourites and build a meal exactly the way you like it.

Primary CTA:

**BUILD MY THALI**

------------------------------------------------------------------------

# 9. Mobile Menu

Use horizontal scrolling categories.

``` text
[ All ] [ Thali ] [ Rice ] [ Dal ] [ Veg ]
[ Non-Veg ] [ Drinks ] [ Desserts ]
```

Use a two-column product grid on most phones.

Each product card should contain:

-   Food image
-   Veg/non-veg indicator
-   Product name
-   Short description
-   Rating
-   Price
-   ADD or CUSTOMIZE button

------------------------------------------------------------------------

# 10. Product Card

Example:

``` text
┌───────────────────────┐
│       FOOD IMAGE      │
│                       │
│ ♡                     │
├───────────────────────┤
│ Paneer Butter Masala  │
│ Creamy & rich         │
│ ⭐ 4.8                │
│                       │
│ ₹149        [ + ADD ] │
└───────────────────────┘
```

Use **CUSTOMIZE** when an item has configurable options.

------------------------------------------------------------------------

# 11. Build Your Thali

This is the central customer feature.

The experience should be guided instead of presenting every option on
one long page.

## Example steps

``` text
Step 1 — Choose Thali Size
Step 2 — Choose Rice / Roti
Step 3 — Choose Dal
Step 4 — Choose Sabzi
Step 5 — Choose Protein
Step 6 — Choose Sides / Add-ons
Step 7 — Review Thali
```

Show progress:

``` text
████████░░░░  2/6
```

Each step should provide:

-   Clear heading
-   Food imagery
-   Selection state
-   Price difference
-   Quantity controls where applicable
-   Back button
-   Next button

------------------------------------------------------------------------

# 12. Live Price Updates

Live pricing is a core requirement.

Whenever the customer changes:

-   Thali size
-   Item
-   Quantity
-   Add-on
-   Combo
-   Coupon
-   Delivery option

the displayed price should update immediately.

Example:

``` text
Base Thali          ₹149
+ Paneer             ₹30
+ Extra Sabzi        ₹20
+ Sweet              ₹20
────────────────────────
Subtotal             ₹219

Combo Discount      -₹30
Coupon              -₹20
────────────────────────
Final Price          ₹169
```

## Pricing architecture

``` text
Selection Change
      ↓
Cart State
      ↓
Pricing Engine
      ↓
Combo Engine
      ↓
Coupon Engine
      ↓
Tax / Delivery
      ↓
Final Total
      ↓
UI Update
```

The frontend can calculate instantly for UX, but the backend must always
recalculate and validate the final amount before order placement.

------------------------------------------------------------------------

# 13. Sticky Live Price

During thali customization, keep the current price visible.

``` text
┌─────────────────────────────┐
│                             │
│       PRODUCT OPTIONS       │
│                             │
├─────────────────────────────┤
│ Your Thali        ₹189      │
│ 5 items selected            │
│                             │
│       [ VIEW THALI → ]      │
└─────────────────────────────┘
```

Use subtle price-change animation.

------------------------------------------------------------------------

# 14. Thali Summary Bottom Sheet

When the user taps View Thali, open a bottom sheet rather than
navigating away.

``` text
YOUR THALI

Rice                 ₹40
Dal                  ₹30
Paneer               ₹60
Sabzi                ₹30
Sweet                ₹20

Subtotal            ₹180
Combo Discount       -₹20

TOTAL               ₹160

[ ADD TO CART ]
```

------------------------------------------------------------------------

# 15. Combo Offer System

Combos should be treated as a first-class business feature.

## Example

### Lunch Combo

``` text
Rice
+
Dal
+
2 Sabzi
+
Sweet
+
Drink

Regular Price: ₹249
Combo Price: ₹199
You Save: ₹50
```

### Family Combo

``` text
4 Thalis
+
4 Drinks
+
2 Desserts

₹799
```

## Admin-configurable combo fields

-   Combo name
-   Description
-   Products
-   Required quantity
-   Original price
-   Combo price
-   Discount
-   Start date
-   End date
-   Maximum usage
-   Customer eligibility
-   Branch availability
-   Active/inactive status

------------------------------------------------------------------------

# 16. Combo UI

Make combos highly visual.

``` text
🔥 BEST VALUE

┌─────────────────────────────┐
│        FAMILY COMBO         │
│                             │
│     🍛 🍛 🍛 🍛            │
│                             │
│  4 Thalis + 4 Drinks        │
│                             │
│  ₹899   ₹1,099              │
│         SAVE ₹200            │
│                             │
│       [ ADD COMBO ]         │
└─────────────────────────────┘
```

Useful badges:

``` text
BEST VALUE
POPULAR
NEW
LIMITED
SAVE ₹100
```

------------------------------------------------------------------------

# 17. Coupon System

Coupon types should include:

``` text
Percentage Discount
Fixed Amount
Free Item
Free Delivery
Minimum Order Discount
Category-Specific Discount
Product-Specific Discount
First-Order Coupon
Customer-Specific Coupon
Time-Limited Coupon
```

Examples:

``` text
WELCOME50
FLAT50
SAVE20
FIRSTORDER
WEEKEND25
```

## Coupon application flow

``` text
Enter / Select Coupon
        ↓
Validate Coupon
        ↓
Check Eligibility
        ↓
Check Minimum Order
        ↓
Check Product / Category
        ↓
Check Expiry
        ↓
Calculate Discount
        ↓
Update Total
```

------------------------------------------------------------------------

# 18. Coupon UI

Instead of forcing customers to type codes, show available coupons.

``` text
🎁 Apply Coupon >

AVAILABLE COUPONS

SAVE20
Get 20% OFF
Min order ₹399

[ APPLY ]

FIRST100
Get ₹100 OFF
Min order ₹599

[ APPLY ]
```

After applying:

> 🎉 Coupon Applied --- You saved ₹40.

------------------------------------------------------------------------

# 19. Cart

The cart must be optimized for quick scanning.

Display:

-   Product
-   Customization
-   Quantity
-   Price
-   Edit
-   Remove
-   Coupon
-   Discount
-   Delivery fee
-   Total
-   Checkout CTA

Also show contextual savings:

> Add ₹100 more to unlock FREE DELIVERY.

------------------------------------------------------------------------

# 20. Checkout

Keep checkout short.

``` text
1. Delivery Address
2. Delivery / Pickup
3. Payment
4. Coupon
5. Order Summary
6. Place Order
```

Payment options can include:

-   UPI
-   Card
-   Cash on Delivery

------------------------------------------------------------------------

# 21. Mobile Order Tracking

Use a visual timeline.

``` text
ORDER #10452

✓ Order Placed
   12:30 PM

✓ Restaurant Accepted
   12:32 PM

● Preparing
   We're preparing your food

○ Ready

○ Out for Delivery

○ Delivered
```

Show an estimated delivery window.

------------------------------------------------------------------------

# 22. Profile

Profile should include:

``` text
My Account
Edit Profile
Orders
Favorites
Saved Addresses
Coupons
Payment Methods
Notifications
Help & Support
Settings
Appearance
```

Theme selector:

``` text
☀ Light
● Dark
```

------------------------------------------------------------------------

# 23. Tablet Customer UI

Tablet should not simply stretch the mobile layout.

Use a hybrid layout with more information visible at once.

## Tablet menu

``` text
┌───────────────────────────────────────────┐
│ LOGO     Menu   Combos   Offers      🛒   │
├───────────────────────────────────────────┤
│ Categories                                │
│ [Thali] [Rice] [Dal] [Veg] [Drinks]      │
│                                           │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│ │  IMAGE  │ │  IMAGE  │ │  IMAGE  │      │
│ │ Product │ │ Product │ │ Product │      │
│ │ ₹149    │ │ ₹129    │ │ ₹99     │      │
│ │ [ ADD ] │ │ [ ADD ] │ │ [ ADD ] │      │
│ └─────────┘ └─────────┘ └─────────┘      │
└───────────────────────────────────────────┘
```

Use three or four product columns depending on tablet width.

------------------------------------------------------------------------

# 24. Tablet Thali Builder

Use a split-screen layout.

``` text
┌───────────────────────────────────────────────────┐
│ Build Your Thali                                  │
├──────────────────────────┬────────────────────────┤
│ CHOOSE YOUR ITEMS        │ YOUR THALI             │
│                          │                        │
│ Rice                     │ 🍚 Rice        ₹40     │
│ [Rice] [Roti]            │ 🥘 Dal         ₹30     │
│                          │ 🍛 Paneer      ₹60     │
│ Dal                      │ 🥗 Sabzi       ₹30     │
│ [Dal] [Dal Makhani]      │                        │
│                          │ ────────────────────   │
│ Sabzi                    │ Subtotal       ₹160    │
│ [Veg] [Paneer]           │ Discount       -₹20    │
│                          │                        │
│                          │ TOTAL          ₹140    │
│                          │                        │
│                          │ [ ADD TO CART ]        │
└──────────────────────────┴────────────────────────┘
```

This allows users to select items while always seeing their current
thali and price.

------------------------------------------------------------------------

# 25. Light and Dark Theme

Create a semantic design-token system rather than hardcoding colors.

## Light theme

``` text
Background
Surface
Card
Text Primary
Text Secondary
Border
Primary
Success
Warning
Error
```

## Dark theme

Map the same semantic tokens to dark-mode values.

Components should use semantic classes/tokens rather than fixed colors.

------------------------------------------------------------------------

# 26. Responsive Breakpoints

Recommended:

``` text
Mobile
< 640px

Large Mobile
640–767px

Tablet
768–1023px

Large Tablet
1024–1279px

Desktop
1280px+
```

Mobile and tablet should be treated as intentional layouts, not just
resized desktop pages.

------------------------------------------------------------------------

# 27. Micro-interactions

Use subtle interactions to make the application feel premium.

## Add item

``` text
[ + ADD ]
    ↓
[ ✓ ADDED ]
```

## Cart count

Animate:

``` text
Cart: 2
   ↓
Cart: 3
```

## Price

Animate:

``` text
₹189
 ↓
₹209
```

## Coupon

``` text
SAVE20
   ↓
🎉 Coupon Applied
You saved ₹40
```

## Order status

``` text
Preparing
   ↓
🍳
   ↓
Ready
```

Animations should remain fast and unobtrusive.

------------------------------------------------------------------------

# 28. Admin Dashboard

The admin dashboard should provide a complete business overview.

## Dashboard cards

``` text
Today's Sales
Orders
Customers
Average Order Value
```

## Dashboard sections

``` text
Revenue Chart
Order Status
Popular Products
Popular Combos
Coupon Usage
Low Stock
Recent Orders
```

Example:

``` text
Today's Sales       ₹84,520
Orders                  328
Customers             2,450
Average Order          ₹258
```

------------------------------------------------------------------------

# 29. Menu Management

``` text
Menu
│
├── Categories
├── Products
├── Add-ons
├── Custom Thali Rules
└── Availability
```

Product fields:

``` text
Name
Description
Image
Category
Base Price
Tax
Calories
Ingredients
Allergens
Vegetarian / Non-Vegetarian
Spice Level
Availability
Featured
```

------------------------------------------------------------------------

# 30. Custom Thali Rules

The admin must be able to configure the thali without modifying frontend
code.

Example:

``` text
Regular Thali
├── 1 Rice
├── 1 Dal
├── 2 Sabzi
├── 1 Protein
└── 1 Side

Premium Thali
├── 1 Rice
├── 1 Dal
├── 3 Sabzi
├── 1 Protein
├── 2 Sides
└── 1 Dessert
```

------------------------------------------------------------------------

# 31. Inventory Management

``` text
Inventory
│
├── Ingredients
├── Stock
├── Low Stock
├── Suppliers
├── Purchase Orders
└── Stock History
```

Example:

``` text
Paneer
Current Stock: 8.5 KG
Minimum Level: 10 KG

⚠ Low Stock
```

Inventory changes should influence product availability.

``` text
Inventory
    ↓
Product Availability
    ↓
Menu Availability
    ↓
Thali Availability
```

------------------------------------------------------------------------

# 32. Order Management

Admin order screen should include:

``` text
Order Number
Customer
Items
Customization
Subtotal
Discount
Delivery
Total
Payment Status
Order Status
```

Actions:

``` text
Print KOT
Update Status
View Customer
Refund
Contact Customer
```

------------------------------------------------------------------------

# 33. Customer Management

Admin can view:

``` text
Customer Profile
Orders
Total Spending
Favourite Items
Coupons Used
Refunds
Account Status
```

Possible segments:

``` text
New
Regular
VIP
Inactive
```

------------------------------------------------------------------------

# 34. Offer Management

Keep offers separate from coupon codes.

Examples:

``` text
20% OFF Weekend
Buy 2 Get 1
Free Dessert
Free Drink
Lunch Special
Family Deal
Happy Hours
```

Offer configuration:

``` text
Name
Type
Products
Discount
Conditions
Start Date
End Date
Usage Limit
Status
```

------------------------------------------------------------------------

# 35. Kitchen Dashboard

The kitchen UI should be operational and simple.

``` text
NEW
│
├── Order #1042
└── Order #1043

PREPARING
│
├── Order #1038
└── Order #1040

READY
│
└── Order #1035
```

Kitchen actions:

``` text
Accept
Start Preparing
Mark Ready
Complete
```

------------------------------------------------------------------------

# 36. Notifications

## Customer

``` text
Order Placed
Payment Successful
Order Accepted
Order Preparing
Order Ready
Out for Delivery
Delivered
Coupon Available
```

## Admin

``` text
New Order
Low Inventory
Payment Issue
Refund Request
Customer Complaint
```

------------------------------------------------------------------------

# 37. Reports and Analytics

Admin analytics should include:

``` text
Revenue
Orders
Average Order Value
Top Products
Top Combos
Coupon Usage
Discount Cost
Customer Growth
Repeat Customers
Peak Ordering Time
Inventory Consumption
```

------------------------------------------------------------------------

# 38. Core Business Engines

The following should be treated as first-class business modules.

## Pricing Engine

``` text
Base Price
+ Add-ons
+ Variants
+ Quantity
+ Delivery
+ Tax
- Combo Discount
- Coupon
= Final Price
```

## Coupon Engine

``` text
Coupon Valid?
↓
Customer Eligible?
↓
Minimum Order?
↓
Product / Category Applicable?
↓
Usage Limit?
↓
Expiry?
↓
Calculate Discount
```

## Combo Engine

``` text
Cart
↓
Required Products?
↓
Required Quantity?
↓
Conditions Satisfied?
↓
Calculate Combo Price
↓
Apply Saving
```

## Availability Engine

``` text
Inventory
↓
Product Availability
↓
Menu Availability
↓
Thali Availability
```

These engines should share business rules instead of duplicating logic
across pages.

------------------------------------------------------------------------

# 39. Recommended Next.js Structure

``` text
src/
│
├── app/
│   ├── (store)/
│   │   ├── page.tsx
│   │   ├── menu/
│   │   ├── combos/
│   │   ├── offers/
│   │   ├── build-thali/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── orders/
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   └── admin/
│       ├── dashboard/
│       ├── orders/
│       ├── menu/
│       ├── products/
│       ├── categories/
│       ├── thali-rules/
│       ├── combos/
│       ├── coupons/
│       ├── offers/
│       ├── inventory/
│       ├── customers/
│       ├── reports/
│       └── settings/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── menu/
│   ├── thali-builder/
│   ├── cart/
│   ├── checkout/
│   ├── admin/
│   └── charts/
│
├── features/
│   ├── auth/
│   ├── thali/
│   ├── cart/
│   ├── pricing/
│   ├── coupons/
│   ├── combos/
│   ├── orders/
│   └── inventory/
│
├── lib/
│   ├── pricing/
│   ├── validation/
│   └── utils/
│
└── types/
```

------------------------------------------------------------------------

# 40. Development Phases

## Phase 1 --- Foundation

``` text
Next.js
TypeScript
Tailwind
Theme System
Design Tokens
Responsive Layout
Authentication
Reusable UI Components
```

## Phase 2 --- Customer MVP

``` text
Home
Menu
Product Details
Build Thali
Live Pricing
Cart
Checkout
Orders
Profile
```

## Phase 3 --- Business Rules

``` text
Pricing Engine
Coupons
Combos
Offers
Thali Rules
Availability
```

## Phase 4 --- Admin

``` text
Dashboard
Products
Categories
Menu
Orders
Customers
Coupons
Combos
Offers
```

## Phase 5 --- Operations

``` text
Inventory
Kitchen Dashboard
Order Status
Stock Management
Reports
```

## Phase 6 --- Advanced

``` text
Analytics
Loyalty
Referral
Subscriptions
Personalization
Multiple Branches
Delivery Management
Advanced Promotions
```

------------------------------------------------------------------------

# 41. UI/UX Quality Checklist

## Mobile

-   [ ] Bottom navigation
-   [ ] Sticky cart
-   [ ] Large touch targets
-   [ ] Two-column food grid
-   [ ] Horizontal category navigation
-   [ ] Step-based thali builder
-   [ ] Sticky live price
-   [ ] Bottom-sheet summary
-   [ ] Easy coupon selection
-   [ ] Fast checkout
-   [ ] Order timeline
-   [ ] Light/dark theme

## Tablet

-   [ ] Expanded navigation
-   [ ] Three/four-column product grid
-   [ ] Split-screen thali builder
-   [ ] Persistent order summary
-   [ ] Larger product imagery
-   [ ] Responsive checkout
-   [ ] Light/dark theme

## Admin

-   [ ] Sidebar navigation
-   [ ] Dashboard cards
-   [ ] Tables
-   [ ] Filters
-   [ ] Search
-   [ ] Charts
-   [ ] Status badges
-   [ ] Modal/drawer forms
-   [ ] Responsive operational views

------------------------------------------------------------------------

# 42. Final Product Architecture

``` text
                     CUSTOM THALI PLATFORM
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
       CUSTOMER             ADMIN              KITCHEN
          │                   │                   │
     ┌────┴────┐        ┌─────┴─────┐       ┌────┴────┐
     │         │        │           │       │         │
   Browse   Order    Products     Orders   Queue    Stock
     │         │        │           │       │         │
     └────┬────┘        ├───────────┤       └────┬────┘
          │             │           │            │
     Build Thali      Coupons     Combos         │
          │             │           │            │
          └─────────────┼───────────┼────────────┘
                        │
                  BUSINESS ENGINE
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       PRICING        PROMOTION    INVENTORY
          │             │             │
          └─────────────┼─────────────┘
                        │
                      ORDER
```

------------------------------------------------------------------------

# 43. Product Experience Principle

The application should not be treated as simply:

> **A restaurant website with a menu.**

It should be built as:

> **A configurable food-commerce platform where customers build their
> own meal and the business controls the entire commercial operation
> from one management system.**

The most important architectural modules are:

``` text
Thali Builder
      +
Pricing Engine
      +
Cart
      +
Coupon Engine
      +
Combo Engine
      +
Inventory / Availability
      +
Order Management
```

These modules should be designed together so that the same business
rules work consistently across mobile, tablet, desktop, customer, admin,
and kitchen interfaces.
