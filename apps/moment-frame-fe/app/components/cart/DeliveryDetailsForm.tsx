"use client";

import { useState } from "react";
import type { DeliveryDetails } from "../../lib/cartStore";

type DeliveryDetailsFormProps = {
  subtotal: number;
  onOrder: (details: DeliveryDetails) => void | Promise<void>;
};

export function DeliveryDetailsForm({
  subtotal,
  onOrder,
}: DeliveryDetailsFormProps) {
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [addressError, setAddressError] = useState("");

  const deliveryPrice = subtotal >= 160 ? 0 : 10;
  
  const fullAddress = addressLine ? `${addressLine}${unitNumber ? ` ${unitNumber.startsWith('#') ? '' : '#'}${unitNumber}` : ''}, Singapore ${postalCode}` : "";
  const isReady = userName.trim() && contact.trim() && email.trim() && fullAddress.trim();

  async function handlePostalCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.value.replace(/\D/g, "").slice(0, 6);
    setPostalCode(val);
    
    if (val.length === 6) {
      setIsLoadingAddress(true);
      setAddressError("");
      try {
        const res = await fetch(`https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${val}&returnGeom=N&getAddrDetails=Y&pageNum=1`);
        const data = await res.json();
        if (data.found > 0) {
          const r = data.results[0];
          let addr = `${r.BLK_NO !== "NIL" ? r.BLK_NO + " " : ""}${r.ROAD_NAME !== "NIL" ? r.ROAD_NAME : ""}`.trim();
          if (r.BUILDING !== "NIL") addr += `, ${r.BUILDING}`;
          setAddressLine(addr);
        } else {
          setAddressError("Postal code not found");
          setAddressLine("");
        }
      } catch {
        setAddressError("Failed to fetch address");
        setAddressLine("");
      } finally {
        setIsLoadingAddress(false);
      }
    } else {
      setAddressLine("");
      setAddressError("");
    }
  }

  return (
    <aside className="cart-page-summary">
      <h2>Delivery Details</h2>
      <label className="delivery-input">
        <span>Name</span>
        <input value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="Enter your name" />
      </label>
      <label className="delivery-input">
        <span>Contact number</span>
        <input type="tel" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Enter contact number" />
      </label>
      <label className="delivery-input">
        <span>Email</span>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email address" />
      </label>
      <label className="delivery-input">
        <span>Postal Code</span>
        <input type="text" inputMode="numeric" value={postalCode} onChange={handlePostalCodeChange} placeholder="e.g. 520111" />
      </label>
      {isLoadingAddress && <p style={{ fontSize: "12px", color: "#60547A", marginTop: "-10px" }}>Searching address...</p>}
      {addressError && <p style={{ fontSize: "12px", color: "red", marginTop: "-10px" }}>{addressError}</p>}
      <label className="delivery-input">
        <span>Address</span>
        <input type="text" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} placeholder="Enter street name, building, etc." />
      </label>
      <label className="delivery-input">
        <span>Unit Number</span>
        <input type="text" value={unitNumber} onChange={(event) => setUnitNumber(event.target.value)} placeholder="e.g. #01-123 (Optional)" />
      </label>
      
      <div className="delivery-notes" style={{ margin: "1.5rem 0", padding: "12px 16px", backgroundColor: "#ebdfff", borderRadius: "8px", borderLeft: "4px solid #a98af5", fontSize: "0.875rem", color: "#2d1b5f", fontWeight: 600 }}>
        <p style={{ margin: "0 0 0.5rem 0" }}>* Free delivery for orders over $160.</p>
        <p style={{ margin: "0 0 0.5rem 0" }}>* $10 delivery fee for orders below $160.</p>
        <p style={{ margin: 0 }}>* Delivery takes 2 weeks after order confirmation.</p>
      </div>

      <div className="cart-summary-line"><span>Subtotal</span><strong>SGD {subtotal.toFixed(2)}</strong></div>
      <div className="cart-summary-line"><span>Delivery</span><strong>SGD {deliveryPrice.toFixed(2)}</strong></div>
      <div className="cart-summary-total"><span>Total</span><strong>SGD {(subtotal + deliveryPrice).toFixed(2)}</strong></div>
      
      <button className="send-quote-button" type="button" onClick={() => onOrder({ userName, contact, email, address: fullAddress, deliveryPrice })} disabled={!isReady}>REQUEST A QUOTE</button>
      <p className="quote-help" style={{ fontSize: "0.75rem", textAlign: "center", color: "#60547a", marginTop: "0.5rem" }}>Your quote PDF will open, followed by WhatsApp. Send it to us and we will confirm your order and payment details before production begins.</p>
    </aside>
  );
}
