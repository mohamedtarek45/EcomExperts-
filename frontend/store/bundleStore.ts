import { create } from "zustand";
import type { Category, ProductItem, BundleState, Plan } from "../types/types";

type AddProductPayload = {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  MaxQuantity?: number;
  variant?: {
    id: string;
    label: string;
    image?: string;
  };
};

type BundleStore = {
  bundle: BundleState;

  addProduct: (category: Category, product: AddProductPayload) => void;
  increase: (category: Category, productId: string, variantId?: string) => void;
  decrease: (category: Category, productId: string, variantId?: string) => void;
  setPlan: (plan: Plan) => void;
  loadState: (data: BundleState) => void;
  reset: () => void;
};

const camerasInitialState = {
  products: [
    {
      MaxQuantity: undefined,
      id: "wyze-cam-v4",
      image: "/images/wyze-cam-v4.png",
      name: "Wyze Cam v4",
      oldPrice: 35.98,
      price: 27.98,
      variants: [
        {
          id: "wyze-cam-v4-white",
          image: "/images/Wyze-Cam-v4-white.png",
          label: "White",
          quantity: 1,
        },
      ],
    },
    {
      MaxQuantity: undefined,
      id: "wyze-cam-pan-v3",
      image: "/images/wyze-cam-pan-v3.webp",
      name: "Wyze Cam Pan v3",
      oldPrice: 39.98,
      price: 34.98,
      variants: [
        {
          id: "wyze-cam-pan-v3-white",
          image: "/images/Wyze Cam Pan v3-white.png",
          label: "White",
          quantity: 2,
        },
      ],
    },
  ],
};

const accessoriesInitialState = {
  products: [
    {
      MaxQuantity: undefined,
      id: "wyze-microsd-card-256gb",
      image: "/images/Wyze microSD Card.webp",
      name: "Wyze MicroSD Card (256GB)",
      oldPrice: undefined,
      price: 41.96,
      quantity: 2,
    },
  ],
};
const sensorsInitialState = {
  products: [
    {
      MaxQuantity: undefined,
      id: "wyze-sense-motion-sensor",
      image: "/images/Wyze Sense Motion Sensor.webp",
      name: "Wyze Sense Motion Sensor",
      oldPrice: undefined ,
      price: 59.98,
      quantity: 2,
    },
    {
      MaxQuantity: 1,
      id: "wyze-sense-hub",
      image: "/images/Wyze Sense Hub.webp",
      name: "Wyze Sense Hub (Required)",
      oldPrice: 29.92,
      price: 0,
      quantity: 1,
    },
  ],
};
const plansInitialState = {
  id: "cam-plus-monthly",
  name: "Cam Unlimited",
  oldPrice: 12.99,
  price: 9.99,
};
const SeedState: BundleState = {
  cameras: camerasInitialState,
  sensors: sensorsInitialState,
  accessories: accessoriesInitialState,
  plan: plansInitialState,
};
const initialState: BundleState = {
  cameras: { products: [] },
  sensors: { products: [] },
  accessories: { products: [] },
  plan: null,
}



export const useBundleStore = create<BundleStore>((set) => ({
  bundle: SeedState,

  loadState: (data) => set({ bundle: data }),
  reset: () => set({ bundle: initialState }),

  setPlan: (plan) =>
    set((state) => ({
      bundle: { ...state.bundle, plan },
    })),



  addProduct: (category, product) =>
    set((state) => {
      const products: ProductItem[] = [...state.bundle[category].products];
      const existing = products.find((p) => p.id === product.id);
      if (product.variant) {
        if (existing) {
          const v = existing.variants?.find(
            (x) => x.id === product.variant!.id,
          );
          if (v) v.quantity += 1;
          else {
            existing.variants ??= [];
            existing.variants.push({ ...product.variant, quantity: 1 });
          }
        } else {
          products.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            MaxQuantity: product.MaxQuantity,
            oldPrice: product.oldPrice,
            variants: [{ ...product.variant, quantity: 1 }],
          });
        }
      } else {
        if (existing) {
          existing.quantity = (existing.quantity ?? 0) + 1;
        } else {
          products.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            oldPrice: product.oldPrice,
            MaxQuantity: product.MaxQuantity,
            quantity: 1,
          });
        }
      }

      return { bundle: { ...state.bundle, [category]: { products } } };
    }),



  increase: (category, productId, variantId) =>
    set((state) => {
      const products = structuredClone(state.bundle[category].products);
      const product = products.find((p) => p.id === productId);
      if (!product) return state;

      if (variantId) {
        const v = product.variants?.find((x) => x.id === variantId);
        if (v) v.quantity += 1;
      } else {
        product.quantity = (product.quantity ?? 0) + 1;
      }

      return { bundle: { ...state.bundle, [category]: { products } } };
    }),


  decrease: (category, productId, variantId) =>
    set((state) => {
      const products = structuredClone(state.bundle[category].products);
      const index = products.findIndex((p) => p.id === productId);
      if (index === -1) return state;

      const product = products[index];

      if (variantId) {
        const vIndex =
          product.variants?.findIndex((v) => v.id === variantId) ?? -1;
        if (vIndex === -1) return state;

        product.variants![vIndex].quantity -= 1;
        if (product.variants![vIndex].quantity <= 0)
          product.variants!.splice(vIndex, 1);
        if (product.variants?.length === 0) products.splice(index, 1);
      } else {
        product.quantity = (product.quantity ?? 0) - 1;
        if ((product.quantity ?? 0) <= 0) products.splice(index, 1);
      }

      return { bundle: { ...state.bundle, [category]: { products } } };
    }),
}));
