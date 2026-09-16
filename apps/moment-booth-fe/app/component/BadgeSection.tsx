"use client";

import { SectionHeading } from "elij-ui-library";
import { useState } from "react";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppButton } from "./TrackedWhatsApp";

export default function BadgeSection() {
  const [badgeType, setBadgeType] = useState<"fridge" | "keychain">("fridge");
  const pricing = {
    fridge: [
      ["$45", "30 pieces"],
      ["$65", "50 pieces"],
      ["$88", "100 pieces"],
      ["$0.85", "per piece for 100+ pieces"],
    ],
    keychain: [
      ["$50", "30 pieces"],
      ["$75", "50 pieces"],
      ["$100", "100 pieces"],
      ["$0.95", "per piece for 100+ pieces"],
    ],
  } as const;
  const styles = {
    fridge: [1, 2, 3, 4].map(
      (number) => `/products/badge/fridge-${number}.png`,
    ),
    keychain: [1, 2, 3, 4].map(
      (number) => `/products/badge/keychain-${number}.png`,
    ),
  };

  return (
    <section className="section badge-section" id="badges">
      <SectionHeading
        className="section-heading"
        eyebrow="Custom Badges"
        title="Custom Round Shape Badges"
        description="Turn your logo, photo, or artwork into a bright, durable 58 mm keepsake with a fridge magnet or keychain backing."
      />
      <div className="badge-style-grid" aria-label="Badge styles">
        <article className="badge-style-card">
          <div className="badge-style-card__heading">
            <p className="eyebrow">Style option</p>
            <h3>Custom Fridge Magnet</h3>
            <p>
              A round keepsake that turns your design into a bright display for
              the fridge.
            </p>
          </div>
          <div className="badge-style-card__gallery">
            {styles.fridge.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Custom fridge magnet style ${index + 1}`}
              />
            ))}
          </div>
        </article>
        <article className="badge-style-card">
          <div className="badge-style-card__heading">
            <p className="eyebrow">Style option</p>
            <h3>Custom Keychain</h3>
            <p>
              A portable everyday keepsake with your logo, photo, or artwork.
            </p>
          </div>
          <div className="badge-style-card__gallery">
            {styles.keychain.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Custom keychain style ${index + 1}`}
              />
            ))}
          </div>
        </article>
      </div>
      <div className="badge-order-grid">
        <div className="badge-pricing" aria-label="Badge pricing">
          <div className="badge-pricing__header">
            <div>
              <p className="eyebrow">Pricing</p>
              <h3>58 mm custom badge packages</h3>
            </div>
          </div>
          <div className="badge-pricing__switch" role="group" aria-label="Choose badge type">
            <button type="button" className={badgeType === "fridge" ? "is-active" : ""} aria-pressed={badgeType === "fridge"} onClick={() => setBadgeType("fridge")}>Fridge magnet</button>
            <button type="button" className={badgeType === "keychain" ? "is-active" : ""} aria-pressed={badgeType === "keychain"} onClick={() => setBadgeType("keychain")}>Keychain</button>
          </div>
          <div className="badge-pricing__list" aria-live="polite">
            {pricing[badgeType].map(([price, quantity]) => <div key={`${badgeType}-${quantity}`}><strong>{price}</strong><span>{quantity}</span></div>)}
          </div>
          <ul className="badge-pricing__note">
            <li>
              Handmade production: approximately 1 week after design
              confirmation
            </li>
            <li>
              Rush processing: completion in 2 days with an additional $20
              processing fee
            </li>
            <li>Free Delivery: orders more than $100</li>
            <li>$10 delivery fee: orders below $100</li>
          </ul>
          <p className="badge-pricing__highlight">
            Photobooth customers enjoy free delivery.
          </p>
        </div>
        <article>
          <p className="eyebrow">How to order</p>
          <ul>
            <li>Choose a 58 mm fridge magnet or keychain.</li>
            <li>Send us your logo, photo, or design.</li>
            <li>Confirm the quotation and approve the order.</li>
            <li>We print, press, and prepare your badges.</li>
          </ul>
        </article>
      </div>
      <div className="badge-cta">
        <p>Get your design pressed into a badge, from just one piece.</p>
        <TrackedWhatsAppButton
          location="badges"
          href={whatsappHref}
          className="whatsapp-enquire-button"
          variant="primary"
        >
          Enquire about badges
        </TrackedWhatsAppButton>
      </div>
    </section>
  );
}
