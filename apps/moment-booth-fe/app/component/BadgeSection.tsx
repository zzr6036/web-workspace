"use client";

import { SectionHeading } from "elij-ui-library";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppButton } from "./TrackedWhatsApp";

export default function BadgeSection() {
  const styles = {
    fridge: [1, 2, 3, 4].map((number) => `/products/badge/fridge-${number}.png`),
    keychain: [1, 2, 3, 4].map((number) => `/products/badge/keychain-${number}.png`),
  };

  return (
    <section className="section badge-section" id="badges">
      <SectionHeading
        className="section-heading"
        eyebrow="Custom merchandise"
        title="Custom Round Shape Badges"
        description="Turn your logo, photo, or artwork into a bright, durable 58 mm keepsake with a fridge magnet or keychain backing."
      />
      <div className="badge-style-grid" aria-label="Badge styles">
        <article className="badge-style-card">
          <div className="badge-style-card__heading">
            <p className="eyebrow">Style option</p>
            <h3>Custom Fridge Magnet</h3>
            <p>A round keepsake that turns your design into a bright display for the fridge.</p>
          </div>
          <div className="badge-style-card__gallery">{styles.fridge.map((src, index) => <img key={src} src={src} alt={`Custom fridge magnet style ${index + 1}`} />)}</div>
        </article>
        <article className="badge-style-card">
          <div className="badge-style-card__heading">
            <p className="eyebrow">Style option</p>
            <h3>Custom Keychain</h3>
            <p>A portable everyday keepsake with your logo, photo, or artwork.</p>
          </div>
          <div className="badge-style-card__gallery">{styles.keychain.map((src, index) => <img key={src} src={src} alt={`Custom keychain style ${index + 1}`} />)}</div>
        </article>
      </div>
      <div className="badge-order-grid">
        <div className="badge-pricing" aria-label="Badge pricing">
          <div className="badge-pricing__header"><div><p className="eyebrow">Pricing</p><h3>58 mm custom badge packages</h3></div></div>
          <div className="badge-pricing__list"><div><strong>$45</strong><span>30 pieces</span></div><div><strong>$65</strong><span>50 pieces</span></div><div><strong>$88</strong><span>100 pieces</span></div><div><strong>$0.85</strong><span>per piece for 100+ pieces</span></div></div>
          <ul className="badge-pricing__note">
            <li>Handmade production: approximately 2 weeks after design confirmation</li>
            <li>Rush processing: completion in 2 days with an additional $50 processing fee</li>
            <li>Delivery is free for orders of $100 or more</li>
            <li>Orders below $100 have a $10 delivery fee</li>
          </ul>
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
        <TrackedWhatsAppButton location="badges" href={whatsappHref} className="whatsapp-enquire-button" variant="primary">Enquire about badges</TrackedWhatsAppButton>
      </div>
    </section>
  );
}
