// export interface BaseProduct {
//   id: string;
//   name: string;
//   description: string;
//   badge?: string | null;
//   oldPrice?: number;
//   price: number;
// }
// export interface Variant {
//   id: string;
//   label: string;
//   image?: string;
// }

// export interface CameraProduct extends BaseProduct {
//   image: string;
//   variants?: Variant[];
// }
// export interface AccessoryProduct extends BaseProduct {
//   image: string;
// }

// export interface SensorProduct extends BaseProduct {
//   image: string;
//   MAX_QUANTITY?: number;
// }

// export type Product = BaseProduct & {
//   image: string;
//   MAX_QUANTITY?: number;
//   variants?: Variant[];
// };


// ============================================================
//  Global Types
// ============================================================

export type Category = "cameras" | "sensors" | "accessories";

// ── Products from API ────────────────────────────────────────

export interface BaseProduct {
  id: string;
  name: string;
  description: string;
  badge?: string | null;
  oldPrice?: number;
  price: number;
}

export interface Variant {
  id: string;
  label: string;
  image?: string;
}

export interface CameraProduct extends BaseProduct {
  image: string;
  variants?: Variant[];
}

export interface AccessoryProduct extends BaseProduct {
  image: string;
}

export interface SensorProduct extends BaseProduct {
  image: string;
  MAX_QUANTITY?: number;
}

/** Union type used in generic components (e.g. ProductCard) */
export type Product = BaseProduct & {
  image: string;
  MAX_QUANTITY?: number;
  variants?: Variant[];
};

// ── Plan ─────────────────────────────────────────────────────

export interface Plan {
  id: string;
  name: string;
  oldPrice?: number;
  price: number;
}

// ── Bundle Store ─────────────────────────────────────────────

export interface ProductVariant extends Variant {
  quantity: number;
}

export interface ProductItem {
  id: string;
  name: string;
  image: string;
  price: number;
  MaxQuantity?: number;
  oldPrice?: number;
  quantity?: number;
  variants?: ProductVariant[];
}

export interface BundleState {
  cameras: { products: ProductItem[] };
  sensors: { products: ProductItem[] };
  accessories: { products: ProductItem[] };
  plan: Plan | null;
}

// ── ReviewCard ───────────────────────────────────────────────

export interface ReviewCardProduct {
  id: string;
  name: string;
  image?: string;
  price?: number;
  oldPrice?: number;
  MaxQuantity?: number;
  variant?: Variant;
}