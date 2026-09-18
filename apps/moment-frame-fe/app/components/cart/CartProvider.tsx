"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { addItem, AppDispatch, CartItem, cartStore, clearCart, hydrateCart, removeItem, RootState, DeliveryDetails, setDeliveryDetails } from "../../lib/cartStore";

export type { CartDesign, CartItem, DeliveryDetails } from "../../lib/cartStore";
const databaseName = "moment-frame-cart";
const storeName = "cart";

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readCart() {
  const database = await openDatabase();
  return new Promise<{ items: CartItem[]; deliveryDetails: DeliveryDetails | null }>((resolve, reject) => {
    const request = database.transaction(storeName, "readonly").objectStore(storeName).get("cartStateV2");
    request.onsuccess = () => resolve(request.result ?? { items: [], deliveryDetails: null });
    request.onerror = () => reject(request.error);
  });
}

async function writeCart(state: { items: CartItem[]; deliveryDetails: DeliveryDetails | null }) {
  const database = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(storeName, "readwrite");
    transaction.objectStore(storeName).put(state, "cartStateV2");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

function CartPersistence({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const deliveryDetails = useSelector((state: RootState) => state.cart.deliveryDetails);
  const [isReadyToPersist, setIsReadyToPersist] = useState(false);
  const initialItemsRef = useRef<CartItem[] | null>(null);

  useEffect(() => {
    readCart()
      .then((storedState) => {
        initialItemsRef.current = storedState.items;
        dispatch(hydrateCart(storedState));
      })
      .catch(() => dispatch(hydrateCart({ items: [], deliveryDetails: null })))
      .finally(() => setIsReadyToPersist(true));
  }, [dispatch]);

  useEffect(() => {
    if (!isReadyToPersist) return;
    writeCart({ items, deliveryDetails }).catch(() => undefined);
  }, [isReadyToPersist, items, deliveryDetails]);

  return <>{children}</>;
}

export function CartProvider({ children }: { children: ReactNode }) {
  return <Provider store={cartStore}><CartPersistence>{children}</CartPersistence></Provider>;
}

export function useCart() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const deliveryDetails = useSelector((state: RootState) => state.cart.deliveryDetails);
  const isHydrated = useSelector((state: RootState) => state.cart.isHydrated);
  return {
    items,
    itemCount: items.length,
    total: items.reduce((total, item) => total + item.unitPrice, 0),
    isHydrated,
    deliveryDetails,
    setDeliveryDetails: (details: DeliveryDetails) => dispatch(setDeliveryDetails(details)),
    addItem: (item: Omit<CartItem, "id">) => dispatch(addItem(item)),
    removeItem: (id: string) => dispatch(removeItem(id)),
    clearCart: () => dispatch(clearCart()),
  };
}
