// Promotion Types & Engine
export type CouponType = 'percentage' | 'fixed' | 'free_item' | 'free_delivery' | 'combo';

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  discount: number; // percentage or amount
  minOrder?: number;
  maxDiscount?: number;
  applicableCategories?: string[];
  applicableItems?: string[];
  firstOrderOnly?: boolean;
  expiryDate?: string;
  usageLimit?: number;
  usedCount?: number;
  perCustomerLimit?: number;
  priority?: number;
  active: boolean;
  description: string;
  freeItemId?: string;
}

export interface PromotionState {
  availableCoupons: Coupon[];
  eligibleCoupons: Coupon[];
  appliedCouponId?: string;
  appliedCoupon?: Coupon;
  recommendedCoupon?: Coupon;
  discount: number;
  finalTotal: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  emoji: string;
}

// Mock promotions database
export const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'SAVE20',
    type: 'percentage',
    discount: 20,
    minOrder: 150,
    maxDiscount: 100,
    active: true,
    priority: 3,
    description: '20% OFF on your order',
  },
  {
    id: '2',
    code: 'FIRST100',
    type: 'fixed',
    discount: 100,
    minOrder: 200,
    firstOrderOnly: true,
    active: true,
    priority: 1,
    description: '₹100 OFF on first order',
  },
  {
    id: '3',
    code: 'WELCOME50',
    type: 'fixed',
    discount: 50,
    minOrder: 200,
    active: true,
    priority: 4,
    description: '₹50 OFF on your order',
  },
  {
    id: '4',
    code: 'WEEKEND25',
    type: 'percentage',
    discount: 25,
    minOrder: 200,
    maxDiscount: 125,
    active: true,
    priority: 2,
    description: '25% OFF this weekend',
  },
  {
    id: '5',
    code: 'FREEDEL',
    type: 'free_delivery',
    discount: 50,
    minOrder: 300,
    active: true,
    priority: 2,
    description: 'Free Delivery on orders above ₹300',
  },
];

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.type === 'percentage') {
    const discount = (subtotal * coupon.discount) / 100;
    return coupon.maxDiscount ? Math.min(discount, coupon.maxDiscount) : discount;
  }
  if (coupon.type === 'fixed' || coupon.type === 'free_delivery') {
    return coupon.discount;
  }
  return 0;
}

export function checkCouponEligibility(
  coupon: Coupon,
  subtotal: number,
  cartItems: CartItem[],
  isFirstOrder: boolean
): { eligible: boolean; reason?: string } {
  // Check if active
  if (!coupon.active) {
    return { eligible: false, reason: 'Coupon is inactive' };
  }

  // Check expiry
  if (coupon.expiryDate) {
    const expiry = new Date(coupon.expiryDate);
    if (new Date() > expiry) {
      return { eligible: false, reason: 'Coupon has expired' };
    }
  }

  // Check minimum order
  if (coupon.minOrder && subtotal < coupon.minOrder) {
    return {
      eligible: false,
      reason: `Minimum order ₹${coupon.minOrder}. You need ₹${coupon.minOrder - subtotal} more`,
    };
  }

  // Check first order condition
  if (coupon.firstOrderOnly && !isFirstOrder) {
    return { eligible: false, reason: 'Only available for first orders' };
  }

  // Check usage limit
  if (coupon.usageLimit && coupon.usedCount && coupon.usedCount >= coupon.usageLimit) {
    return { eligible: false, reason: 'Coupon usage limit reached' };
  }

  // Check applicable categories
  if (coupon.applicableCategories && coupon.applicableCategories.length > 0) {
    const hasCategory = cartItems.some((item) =>
      coupon.applicableCategories!.includes(item.category)
    );
    if (!hasCategory) {
      return { eligible: false, reason: 'Not applicable to items in your cart' };
    }
  }

  // Check applicable items
  if (coupon.applicableItems && coupon.applicableItems.length > 0) {
    const hasItem = cartItems.some((item) => coupon.applicableItems!.includes(item.id));
    if (!hasItem) {
      return { eligible: false, reason: 'Not applicable to items in your cart' };
    }
  }

  return { eligible: true };
}

export function getEligibleCoupons(
  coupons: Coupon[],
  subtotal: number,
  cartItems: CartItem[],
  isFirstOrder: boolean
): Coupon[] {
  return coupons.filter((coupon) => {
    const { eligible } = checkCouponEligibility(coupon, subtotal, cartItems, isFirstOrder);
    return eligible;
  });
}

export function getRecommendedCoupon(
  eligibleCoupons: Coupon[],
  subtotal: number
): Coupon | undefined {
  if (eligibleCoupons.length === 0) return undefined;

  // Calculate savings for each coupon
  const couponsWithSavings = eligibleCoupons.map((coupon) => ({
    coupon,
    savings: calculateDiscount(coupon, subtotal),
  }));

  // Sort by savings (descending) then by priority (ascending)
  couponsWithSavings.sort(
    (a, b) => b.savings - a.savings || (a.coupon.priority || 999) - (b.coupon.priority || 999)
  );

  return couponsWithSavings[0]?.coupon;
}

export function calculateFinalPrice(
  subtotal: number,
  appliedCoupon?: Coupon,
  deliveryFee: number = 0,
  tax: number = 0
): { discount: number; finalTotal: number } {
  let discount = 0;

  if (appliedCoupon) {
    discount = calculateDiscount(appliedCoupon, subtotal);
  }

  const finalTotal = subtotal - discount + deliveryFee + tax;

  return {
    discount,
    finalTotal: Math.max(0, finalTotal),
  };
}

export function getContextualSuggestions(
  subtotal: number,
  eligibleCoupons: Coupon[]
): string[] {
  const suggestions: string[] = [];

  // Check for coupons that are almost eligible
  const almostEligible = mockCoupons.filter((coupon) => {
    if (!coupon.active || coupon.minOrder === undefined) return false;
    if (subtotal >= coupon.minOrder) return false;
    return subtotal + 150 >= coupon.minOrder; // Within ₹150 of eligibility
  });

  almostEligible.forEach((coupon) => {
    const needed = (coupon.minOrder || 0) - subtotal;
    suggestions.push(
      `Add ₹${needed} more to unlock ${coupon.code} and save ₹${coupon.discount}`
    );
  });

  // Free delivery suggestion
  const freedel = mockCoupons.find((c) => c.code === 'FREEDEL');
  if (freedel && freedel.minOrder && subtotal < freedel.minOrder && subtotal > 300) {
    const needed = freedel.minOrder - subtotal;
    suggestions.push(`Add ₹${needed} more to get FREE DELIVERY!`);
  }

  return suggestions;
}
