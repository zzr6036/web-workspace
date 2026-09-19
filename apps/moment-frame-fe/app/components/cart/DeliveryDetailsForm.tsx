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
  const isReady = Boolean(userName.trim() && contact.trim());

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
        <span><b className="required-marker" aria-hidden="true">*</b>Name</span>
        <input required value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="Enter your name" />
      </label>
      <label className="delivery-input">
        <span><b className="required-marker" aria-hidden="true">*</b>Contact number</span>
        <input required type="tel" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Enter contact number" />
      </label>
      <label className="delivery-input">
        <span>Email</span>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email address" />
      </label>
      <label className="delivery-input">
        <span>Postal Code</span>
        <input type="text" inputMode="numeric" value={postalCode} onChange={handlePostalCodeChange} placeholder="e.g. 520111" />
      </label>
      {isLoadingAddress && <p className="address-feedback">Searching address...</p>}
      {addressError && <p className="address-feedback is-error">{addressError}</p>}
      <label className="delivery-input">
        <span>Address</span>
        <input type="text" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} placeholder="Enter street name, building, etc." />
      </label>
      <label className="delivery-input">
        <span>Unit Number</span>
        <input type="text" value={unitNumber} onChange={(event) => setUnitNumber(event.target.value)} placeholder="e.g. #01-123 (Optional)" />
      </label>
      
      <div className="delivery-notes">
        <p>* Free delivery for orders over $160.</p>
        <p>* $10 delivery fee for orders below $160.</p>
        <p>* Delivery takes 2 weeks after order confirmation.</p>
      </div>

      <div className="cart-summary-line"><span>Subtotal</span><strong>SGD {subtotal.toFixed(2)}</strong></div>
      <div className="cart-summary-line"><span>Delivery</span><strong>SGD {deliveryPrice.toFixed(2)}</strong></div>
      <div className="cart-summary-total"><span>Total</span><strong>SGD {(subtotal + deliveryPrice).toFixed(2)}</strong></div>
      
      <button className="send-quote-button" type="button" onClick={() => onOrder({ userName, contact, email, address: fullAddress, deliveryPrice })} disabled={!isReady}>REQUEST A QUOTE</button>
      <p className="quote-help">Your quote PDF will open, followed by WhatsApp. Send it to us and we will confirm your order and payment details before production begins.</p>
    </aside>
  );
}
