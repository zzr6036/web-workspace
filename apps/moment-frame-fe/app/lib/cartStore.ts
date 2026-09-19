import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartDesign = {
  orientation: "landscape" | "portrait";
  /** Final image rendered from the customer's crop and zoom settings. */
  imageDataUrl: string;
  /** Original uploaded image, retained for quote review and production. */
  originalImageDataUrl?: string;
  cropArea: { x: number; y: number; width: number; height: number };
  zoom: number;
  fileName?: string;
  mimeType?: string;
  fileSizeBytes?: number;
  imageWidth?: number;
  imageHeight?: number;
  originalImageWidth?: number;
  originalImageHeight?: number;
};

export type CartItem = {
  id: string;
  sku: string;
  frameImageSku?: string;
  productName: string;
  type: string;
  size: string;
  unitPrice: number;
  quantity: number;
  color: string;
  craftsmanship: string;
  photoIncluded: string;
  material: string;
  designs: CartDesign[];
};

export type DeliveryDetails = {
  userName: string;
  contact: string;
  email: string;
  address: string;
  deliveryPrice: number;
};

type CartState = { items: CartItem[]; isHydrated: boolean; deliveryDetails: DeliveryDetails | null };
const initialState: CartState = { items: [], isHydrated: false, deliveryDetails: null };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state, action: PayloadAction<{ items: CartItem[]; deliveryDetails: DeliveryDetails | null }>) => {
      state.items = action.payload.items;
      state.deliveryDetails = action.payload.deliveryDetails;
      state.isHydrated = true;
    },
    addItem: (state, action: PayloadAction<Omit<CartItem, "id">>) => {
      action.payload.designs.forEach((design) => {
        state.items.push({
          ...action.payload,
          id: crypto.randomUUID(),
          quantity: 1,
          designs: [design],
        });
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setDeliveryDetails: (state, action: PayloadAction<DeliveryDetails>) => {
      state.deliveryDetails = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.deliveryDetails = null;
    },
  },
});

export const { addItem, clearCart, hydrateCart, removeItem, setDeliveryDetails } = cartSlice.actions;
export const cartStore = configureStore({ reducer: { cart: cartSlice.reducer } });
export type RootState = ReturnType<typeof cartStore.getState>;
export type AppDispatch = typeof cartStore.dispatch;
