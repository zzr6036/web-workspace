"use client";

import { useCart } from "./CartProvider";
import { downloadQuotePdf } from "../../lib/createQuotePdf";
import { CartItemCard } from "./CartItemCard";
import type { DeliveryDetails } from "../../lib/cartStore";
import { useRouter } from "next/navigation";
import { DeliveryDetailsForm } from "./DeliveryDetailsForm";

export function CartPage() {
  const { items, total, removeItem, isHydrated, setDeliveryDetails, clearCart } = useCart();
  const router = useRouter();

  async function handleOrder(details: DeliveryDetails) {
    setDeliveryDetails(details);
    await downloadQuotePdf(items, total, {
      recipientName: details.userName,
      contact: details.contact,
      email: details.email,
      deliveryAddress: details.address,
      deliveryPrice: details.deliveryPrice,
    });

    const message = encodeURIComponent(
      "Hello MomentFrame, I have prepared my quote request. I will attach the PDF quote here.",
    );
    window.open(
      `https://wa.me/6588467972?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
    
    clearCart();
    router.push("/");
  }

  return (
    <main id="main" className="cart-page">
      <div className="cart-page-title-row">
        <h1>My Cart</h1>
        <div className="cart-page-title-actions">
          {items.length > 0 && (
            <button
              type="button"
              className="cart-clear-button"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all items from your cart?")) {
                  clearCart();
                }
              }}
            >
              Clear all
            </button>
          )}
          <a className="continue-shopping-top" href="/shop">
            CONTINUE SHOPPING <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      {!isHydrated ? (
        <section className="cart-page-empty">
          <p>Loading your cart…</p>
        </section>
      ) : items.length === 0 ? (
        <section className="cart-page-empty">
          <p>My Cart is ready for your photo panels.</p>
          <a className="primary-link" href="/shop">
            Explore frames <span aria-hidden="true">↗</span>
          </a>
        </section>
      ) : (
        <div className="cart-page-layout">
          <section className="cart-page-items" aria-label="Cart items">
            {items.map((item, index) => (
              <CartItemCard
                item={item}
                index={index}
                key={item.id}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </section>
          <DeliveryDetailsForm
            subtotal={total}
            onOrder={handleOrder}
          />
        </div>
      )}
    </main>
  );
}
