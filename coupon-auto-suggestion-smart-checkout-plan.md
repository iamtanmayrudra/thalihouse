# Coupon Auto-Suggestion & Smart Checkout Plan

## 1. Feature Overview

The coupon system should not behave as a simple **"Enter Coupon Code"**
field.

Whenever a customer reaches the **Cart, Checkout, or Payment stage**,
the system should automatically evaluate all currently eligible
promotions and suggest relevant savings.

### Core principle

> **Help the customer discover the best applicable savings before they
> pay.**

The customer should not need to know a coupon code in advance.

------------------------------------------------------------------------

# 2. Customer Flow

``` text
Customer Builds Cart
        ↓
Customer Opens Cart
        ↓
Customer Proceeds to Checkout
        ↓
Promotion Engine Checks Eligibility
        ↓
Evaluate Coupons + Combos + Offers
        ↓
Calculate Potential Savings
        ↓
Suggest Applicable Coupon
        ↓
Customer Applies / Selects Offer
        ↓
Price Updates Immediately
        ↓
Customer Proceeds to Payment
        ↓
Final Server-Side Validation
        ↓
Payment
```

------------------------------------------------------------------------

# 3. When Auto-Suggestion Should Trigger

The promotion engine should evaluate coupons at these important moments:

``` text
1. Cart opened
2. Cart item added
3. Cart item removed
4. Quantity changed
5. Customer enters checkout
6. Customer changes delivery method
7. Customer changes address if location affects eligibility
8. Customer applies/removes a combo
9. Customer changes thali customization
10. Coupon removed
11. Before payment
```

The strongest presentation should happen when the customer is preparing
to pay.

------------------------------------------------------------------------

# 4. Auto-Suggestion Logic

When checkout opens:

``` text
Checkout
   ↓
Get Current Cart
   ↓
Load Active Promotions
   ↓
Check Coupon Eligibility
   ↓
Check Combo Eligibility
   ↓
Check Offer Eligibility
   ↓
Calculate Discount for Each Eligible Promotion
   ↓
Compare Savings
   ↓
Select Recommended Promotion
   ↓
Display Suggestion
```

------------------------------------------------------------------------

# 5. Eligibility Rules

The promotion engine should check:

``` text
Coupon active?
        ↓
Coupon expired?
        ↓
Minimum order satisfied?
        ↓
Applicable products present?
        ↓
Applicable category present?
        ↓
Customer eligible?
        ↓
First-order condition?
        ↓
Usage limit available?
        ↓
Customer usage limit available?
        ↓
Branch/location eligible?
        ↓
Day/time condition satisfied?
        ↓
Payment method condition satisfied?
        ↓
Combo/offer conflict?
        ↓
Eligible
```

------------------------------------------------------------------------

# 6. Coupon Types

The platform should support:

``` text
Percentage Discount
Fixed Amount Discount
Free Item
Free Delivery
Minimum Order Discount
Product-Specific Discount
Category-Specific Discount
First-Order Coupon
Customer-Specific Coupon
Time-Limited Coupon
Branch-Specific Coupon
Payment-Method Coupon
```

Examples:

``` text
SAVE20
20% OFF

FIRST100
₹100 OFF

WELCOME50
₹50 OFF

FREEDEL
Free Delivery

DESSERTFREE
Free Dessert
```

------------------------------------------------------------------------

# 7. Recommended Coupon

If multiple coupons are eligible, calculate the result of each coupon
and identify the most beneficial applicable saving.

Example:

``` text
Cart Total: ₹499

SAVE20
20% OFF
Potential Saving: ₹100

FIRST100
₹100 OFF
Potential Saving: ₹100

WEEKEND25
25% OFF
Potential Saving: ₹125
```

Display:

``` text
🎉 RECOMMENDED FOR YOU

WEEKEND25

Get 25% OFF your order

You save ₹125

[ APPLY COUPON ]
```

The recommendation should be based on the configured business rules and
actual calculated savings, not simply the coupon with the highest
percentage.

------------------------------------------------------------------------

# 8. Customer Choice

Automatic suggestion must not remove customer control.

If multiple coupons are eligible:

``` text
Recommended

WEEKEND25
Save ₹125
[ APPLY ]
```

Then provide:

``` text
View Other Available Coupons
```

Example:

``` text
AVAILABLE COUPONS

WEEKEND25
25% OFF
Save ₹125
[ APPLY ]

SAVE20
20% OFF
Save ₹100
[ APPLY ]

FIRST100
₹100 OFF
Save ₹100
[ APPLY ]
```

------------------------------------------------------------------------

# 9. Mobile Checkout UI

Recommended mobile layout:

``` text
┌─────────────────────────────┐
│ CHECKOUT                    │
│                             │
│ Your Order                  │
│                             │
│ 🍛 Paneer Thali       ₹199  │
│ 🍹 Beverage            ₹40  │
│ 🍰 Dessert             ₹30  │
│                             │
│ ─────────────────────────── │
│                             │
│ 🎉 SPECIAL OFFER            │
│                             │
│ WEEKEND25                   │
│ Get 25% OFF this order      │
│                             │
│ You save ₹67                │
│                             │
│       [ APPLY ]             │
│                             │
│ View all coupons →          │
│                             │
│ ─────────────────────────── │
│                             │
│ Subtotal             ₹269   │
│ Discount             -₹67   │
│ Delivery              ₹20   │
│                             │
│ TOTAL                ₹222   │
│                             │
│       [ PAY ₹222 ]          │
└─────────────────────────────┘
```

------------------------------------------------------------------------

# 10. Tablet Checkout UI

Tablet can use a two-column layout:

``` text
┌──────────────────────────────────────────────┐
│ CHECKOUT                                     │
├──────────────────────────┬───────────────────┤
│ ORDER                    │ OFFERS            │
│                          │                   │
│ Paneer Thali      ₹199   │ 🎉 Recommended    │
│ Beverage           ₹40   │                   │
│ Dessert            ₹30   │ WEEKEND25         │
│                          │ 25% OFF            │
│ Subtotal          ₹269   │ Save ₹67          │
│                          │                   │
│ Discount          -₹67   │ [ APPLY ]         │
│ Delivery           ₹20   │                   │
│                          │ View all →        │
│ TOTAL             ₹222   │                   │
│                          │                   │
│                          │ [ PAY ₹222 ]      │
└──────────────────────────┴───────────────────┘
```

------------------------------------------------------------------------

# 11. Contextual Savings

The system should also recommend actions that unlock an offer.

Example:

``` text
Current Cart: ₹349

Coupon requirement: ₹499

You are ₹150 away from unlocking ₹100 OFF.

[ ADD MORE ITEMS ]
```

Another example:

``` text
🎉 Almost there!

Add one dessert to unlock:
FREE DRINK
```

Another example:

``` text
Add ₹80 more to get FREE DELIVERY.
```

These suggestions should be based on actual promotion rules.

------------------------------------------------------------------------

# 12. Coupon State Management

The UI should clearly represent coupon states.

## Available

``` text
SAVE20
20% OFF
[ APPLY ]
```

## Applied

``` text
✓ SAVE20 APPLIED
You saved ₹100

[ REMOVE ]
```

## Not eligible

``` text
FIRST100
₹100 OFF

Minimum order: ₹599
Your order: ₹499

Add ₹100 more
```

## Expired

``` text
WEEKEND25
Expired
```

## Usage limit reached

``` text
LIMITED50
This coupon is no longer available.
```

------------------------------------------------------------------------

# 13. Live Price Update

After applying a coupon, the total must update immediately.

Example:

``` text
Before

Subtotal       ₹499
Discount         ₹0
Delivery        ₹20
──────────────────
TOTAL          ₹519
```

After applying:

``` text
SAVE20

Subtotal       ₹499
Discount      -₹100
Delivery        ₹20
──────────────────
TOTAL          ₹419
```

The customer should receive clear feedback:

> 🎉 You saved ₹100!

------------------------------------------------------------------------

# 14. Promotion Engine

Create a centralized promotion engine.

``` text
                 PROMOTION ENGINE
                        │
        ┌───────────────┼───────────────┐
        ↓               ↓               ↓
     Coupons          Combos          Offers
        │               │               │
        └───────────────┼───────────────┘
                        ↓
                  Eligibility
                        ↓
                 Savings Engine
                        ↓
              Recommendation Engine
                        ↓
                Checkout UI
```

------------------------------------------------------------------------

# 15. Pricing Engine

The pricing calculation should follow a predictable order.

``` text
Base Price
   +
Add-ons
   +
Variants
   +
Quantity
   +
Delivery
   +
Tax
   -
Combo Discount
   -
Coupon Discount
   =
Final Price
```

The exact ordering of discounts, tax, and delivery should be
configurable according to the business/payment rules.

------------------------------------------------------------------------

# 16. Promotion Conflicts

The system must define what happens when multiple promotions are
eligible.

Possible business rules:

``` text
Coupon + Combo allowed
Coupon + Combo not allowed
Only one coupon allowed
Multiple coupons not allowed
Best eligible coupon recommended
Specific coupon has priority
```

Example:

``` text
Cart qualifies for:

COMBO50
SAVE20
WEEKEND25
```

The promotion engine should determine:

``` text
Which promotions can coexist?
Which promotion gives the configured benefit?
Which promotion should be recommended?
```

Do not allow frontend code to decide this independently.

------------------------------------------------------------------------

# 17. Coupon Priority

Admin should optionally configure coupon priority.

Example:

``` text
Coupon             Priority
────────────────────────────
VIP100                1
WEEKEND25             2
SAVE20                3
WELCOME50             4
```

Priority can be useful for business-controlled campaigns.

However, if the business rule is **"recommend the greatest valid
saving"**, the engine should calculate actual savings instead of relying
only on priority.

------------------------------------------------------------------------

# 18. Admin Coupon Management

Admin interface:

``` text
COUPON MANAGEMENT

+ CREATE COUPON

Code          Discount     Min Order    Status
───────────────────────────────────────────────
SAVE20        20%           ₹399         Active
FIRST100      ₹100          ₹599         Active
WELCOME50     ₹50           ₹299         Active
WEEKEND25     25%           ₹399         Active
```

Admin should be able to configure:

``` text
Coupon Code
Coupon Type
Discount
Maximum Discount
Minimum Order
Applicable Products
Applicable Categories
Customer Eligibility
First Order
Usage Limit
Per Customer Limit
Start Date
End Date
Day / Time Restrictions
Branch Restrictions
Payment Restrictions
Stacking Rules
Priority
Status
```

------------------------------------------------------------------------

# 19. Admin Promotion Analytics

Track:

``` text
Coupon Views
Coupon Applications
Coupon Usage
Coupon Conversion Rate
Total Discount Given
Revenue Generated
Average Order Value
Orders Using Coupon
Most Used Coupon
Most Valuable Coupon
```

Example:

``` text
WEEKEND25

Views:              2,450
Applications:       1,120
Orders:               980
Discount Given:   ₹98,000
Revenue:         ₹4,85,000
```

------------------------------------------------------------------------

# 20. Suggested Frontend Architecture

``` text
src/
│
├── features/
│   ├── promotions/
│   │   ├── coupon/
│   │   ├── combo/
│   │   ├── offers/
│   │   ├── eligibility/
│   │   ├── recommendation/
│   │   └── promotion.types.ts
│   │
│   ├── pricing/
│   │   ├── pricing-engine.ts
│   │   ├── discount-engine.ts
│   │   └── price.types.ts
│   │
│   ├── cart/
│   ├── checkout/
│   └── orders/
│
├── components/
│   ├── coupon/
│   │   ├── CouponSuggestion.tsx
│   │   ├── CouponList.tsx
│   │   ├── CouponCard.tsx
│   │   └── CouponApplied.tsx
│   │
│   ├── checkout/
│   │   ├── CheckoutSummary.tsx
│   │   ├── SavingsBanner.tsx
│   │   └── PaymentSummary.tsx
│   │
│   └── cart/
│
└── lib/
    └── promotions/
```

------------------------------------------------------------------------

# 21. Recommended Component Flow

``` text
CheckoutPage
     ↓
CheckoutSummary
     ↓
PromotionContainer
     ↓
PromotionRecommendation
     ↓
CouponSuggestion
     ↓
CouponList
     ↓
Apply Coupon
     ↓
Pricing Engine
     ↓
Updated Total
```

------------------------------------------------------------------------

# 22. Suggested State Model

The client state can track:

``` text
cartItems
subtotal
deliveryFee
tax
availableCoupons
eligibleCoupons
recommendedCoupon
appliedCoupon
comboDiscount
couponDiscount
totalDiscount
finalTotal
```

The application should avoid duplicating the same calculation in many
components.

------------------------------------------------------------------------

# 23. Backend Validation Requirement

Frontend coupon suggestions are for user experience.

The backend must always validate:

``` text
Coupon exists?
Coupon active?
Coupon expired?
Customer eligible?
Minimum order?
Product eligibility?
Category eligibility?
Usage limit?
Per-customer limit?
Promotion conflict?
Final discount?
Final payable amount?
```

Never trust the discount amount sent by the browser.

The final order should be calculated from trusted server-side business
rules.

------------------------------------------------------------------------

# 24. Error Handling

If a coupon becomes invalid between suggestion and payment:

``` text
Customer sees:

⚠ This coupon is no longer available.

Your order total has been updated.

Previous Total: ₹419
New Total:      ₹499

[ CONTINUE TO PAYMENT ]
```

Do not silently charge a different amount.

------------------------------------------------------------------------

# 25. Smart Suggestions

The promotion engine can make contextual recommendations.

Examples:

### Cart threshold

``` text
Add ₹80 more
to unlock ₹100 OFF.
```

### Free delivery

``` text
You're ₹50 away from FREE DELIVERY.
```

### Combo opportunity

``` text
Add a drink to turn your meal into
a combo and save ₹40.
```

### First order

``` text
🎉 Welcome!

Use FIRST100 and save ₹100
on your first order.
```

### Time-based offer

``` text
🔥 Lunch Special

Order before 3 PM and save ₹50.
```

------------------------------------------------------------------------

# 26. Customer Experience Rules

The system should:

-   Suggest useful offers automatically
-   Make savings obvious
-   Avoid overwhelming the customer
-   Never hide the original price
-   Clearly show the discount
-   Allow customers to view alternatives
-   Allow customers to remove an applied coupon
-   Update the total immediately
-   Explain why a coupon is unavailable
-   Explain how to unlock a promotion
-   Avoid applying unexpected discounts without clear feedback
-   Preserve customer control

------------------------------------------------------------------------

# 27. Final Checkout Experience

The ideal experience is:

``` text
Customer builds order
        ↓
Cart calculates price
        ↓
Customer enters checkout
        ↓
🎉 System finds eligible offers
        ↓
Recommended coupon displayed
        ↓
Customer sees potential savings
        ↓
Customer applies coupon
        ↓
Price updates instantly
        ↓
Customer reviews final amount
        ↓
Server validates pricing
        ↓
Customer pays
```

------------------------------------------------------------------------

# 28. Final Product Principle

The coupon system should evolve from:

> **"Do you have a coupon code?"**

into:

> **"We found a way for you to save on this order."**

This makes promotions a proactive part of the customer experience while
keeping the final pricing controlled by the platform's business rules.
