"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const { items, itemCount, total, removeItem, isHydrated, clearCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!controlRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [isOpen]);

  return (
    <div className="cart-control" ref={controlRef}>
      <button
        className="cart-button"
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="shopping-cart"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L20 7H7" />
          <circle cx="10" cy="20" r="1" />
          <circle cx="17" cy="20" r="1" />
        </svg>
        <span>Cart</span>
        {itemCount > 0 && <b>{itemCount}</b>}
      </button>
      {isOpen && (
        <aside
          className="cart-drawer"
          id="shopping-cart"
          aria-label="Shop cart"
        >
          <div className="cart-drawer-heading">
            <h2>My Cart</h2>
            <div className="cart-drawer-heading-actions">
              {items.length > 0 && (
                <button
                  type="button"
                  className="cart-drawer-clear-button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to clear all items from your cart?")) {
                      clearCart();
                    }
                  }}
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                className="cart-drawer-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>
          </div>
          {!isHydrated ? (
            <p className="cart-empty">Loading your cart…</p>
          ) : items.length === 0 ? (
            <p className="cart-empty">
              Your selected photo panels will appear here.
            </p>
          ) : (
            <>
              <div className="cart-items">
                {items.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <img
                      src={item.designs[0]?.imageDataUrl}
                      alt="Your uploaded design"
                    />
                    <div>
                      <h3>{item.productName}</h3>
                      <p>
                        {item.type} · {item.size}
                      </p>
                      <p>SGD {item.unitPrice.toFixed(2)}</p>
                      <button type="button" onClick={() => removeItem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              <div className="cart-total">
                <span>Total</span>
                <strong>SGD {total.toFixed(2)}</strong>
              </div>
              <a
                className="cart-view-all"
                href="/cart"
                onClick={() => setIsOpen(false)}
              >
                VIEW ALL
              </a>
            </>
          )}
        </aside>
      )}
    </div>
  );
}
