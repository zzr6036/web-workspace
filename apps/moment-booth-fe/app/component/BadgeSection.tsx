"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Circle, Palette, Ruler, ShieldCheck } from "lucide-react";
import { SectionHeading } from "elij-ui-library";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppButton } from "./TrackedWhatsApp";

const quickFacts = [
  ["Sizes", "32 mm, 44 mm, 58 mm, or 75 mm", Ruler],
  ["Minimum order", "From just 1 piece", Check],
  ["Print", "Full-colour HD with no colour limit", Palette],
  ["Finish", "Clear, scratch-resistant protective top", ShieldCheck],
  ["Backing", "Choose a fridge magnet or keychain backing", Circle],
  ["Perfect for", "Events, schools, campaigns, merch, and personal designs", Circle],
] as const;

export default function BadgeSection() {
  const [styleIndex, setStyleIndex] = useState({ fridge: 0, keychain: 0 });
  const [badgeType, setBadgeType] = useState("Fridge Magnet");
  const [size, setSize] = useState("58");
  const [quantity, setQuantity] = useState(30);
  const [rush, setRush] = useState(false);
  const styles = {
    fridge: [1, 2, 3, 4].map((number) => `/products/badge/fridge-${number}.png`),
    keychain: [1, 2, 3, 4].map((number) => `/products/badge/keychain-${number}.png`),
  };
  const unitPrice = quantity >= 100 ? 1 : quantity >= 50 ? 1.2 : 1.5;
  const total = quantity >= 30 && size === "58" ? quantity * unitPrice + (rush ? 50 : 0) : 0;

  const moveStyle = (type: "fridge" | "keychain", direction: -1 | 1) => {
    setStyleIndex((current) => ({
      ...current,
      [type]: (current[type] + direction + styles[type].length) % styles[type].length,
    }));
  };

  return (
    <section className="section badge-section" id="badges">
      <SectionHeading
        className="section-heading"
        eyebrow="Custom merchandise"
        title="Custom Round Shape Badges"
        description="Turn your logo, photo, or artwork into a bright, durable pin badge—available from just one piece."
      />
      <div className="badge-intro-grid">
        <article className="badge-feature-card">
          <span className="badge-feature-card__icon" aria-hidden="true"><Circle size={28} /></span>
          <h3>Made for your design</h3>
          <p>
            Your artwork is printed in full colour, cut to your chosen round size,
            and sealed under a clear protective film. The metal disc and pin back
            are pressed together into one solid badge.
          </p>
        </article>
        <article className="badge-feature-card">
          <span className="badge-feature-card__icon" aria-hidden="true"><ShieldCheck size={28} /></span>
          <h3>Bright, flexible, and ready to wear</h3>
          <p>
            The scratch-resistant top keeps the print looking sharp in normal use.
            Photos, gradients, small text, and any colour are supported—giving you
            more freedom than an enamel pin.
          </p>
        </article>
      </div>
      <div className="badge-style-grid" aria-label="Badge styles">
        <article className="badge-style-card">
          <div className="badge-style-card__media">
            <button type="button" aria-label="Previous fridge magnet style" onClick={() => moveStyle("fridge", -1)}><ChevronLeft size={24} /></button>
            <img src={styles.fridge[styleIndex.fridge]} alt={`Custom fridge magnet style ${styleIndex.fridge + 1}`} />
            <button type="button" aria-label="Next fridge magnet style" onClick={() => moveStyle("fridge", 1)}><ChevronRight size={24} /></button>
            <div className="badge-style-card__dots">{styles.fridge.map((_, index) => <span key={index} className={index === styleIndex.fridge ? "is-active" : ""} />)}</div>
          </div>
          <div>
            <p className="eyebrow">Style option</p>
            <h3>Custom Fridge Magnet</h3>
            <p>A round keepsake that turns your design into a bright display for the fridge.</p>
          </div>
        </article>
        <article className="badge-style-card">
          <div className="badge-style-card__media">
            <button type="button" aria-label="Previous keychain style" onClick={() => moveStyle("keychain", -1)}><ChevronLeft size={24} /></button>
            <img src={styles.keychain[styleIndex.keychain]} alt={`Custom keychain style ${styleIndex.keychain + 1}`} />
            <button type="button" aria-label="Next keychain style" onClick={() => moveStyle("keychain", 1)}><ChevronRight size={24} /></button>
            <div className="badge-style-card__dots">{styles.keychain.map((_, index) => <span key={index} className={index === styleIndex.keychain ? "is-active" : ""} />)}</div>
          </div>
          <div>
            <p className="eyebrow">Style option</p>
            <h3>Custom Keychain</h3>
            <p>A portable everyday keepsake with your logo, photo, or artwork.</p>
          </div>
        </article>
      </div>
      <div className="badge-pricing" aria-label="Badge pricing options">
        <div className="badge-pricing__header">
          <div><p className="eyebrow">Price &amp; order options</p><h3>Configure your custom badges</h3></div>
          <strong>{total ? `$${total.toFixed(2)}` : "—"}</strong>
        </div>
        <div className="badge-pricing__fields">
          <label>Option 1: style<select value={badgeType} onChange={(event) => setBadgeType(event.target.value)}><option>Fridge Magnet</option><option>Keychain</option></select></label>
          <label>Option 2: size<select value={size} onChange={(event) => setSize(event.target.value)}><option value="58">58 mm</option><option value="32" disabled>32 mm — currently unavailable</option></select></label>
          <label>Option 3: quantity<input type="number" min={30} step={1} value={quantity} onChange={(event) => setQuantity(Math.max(30, Number(event.target.value) || 30))} /><span>Minimum 30 pieces</span></label>
        </div>
        <div className="badge-pricing__summary"><span>{size === "58" ? `$${unitPrice.toFixed(2)} each for ${quantity} pieces` : "Pricing is currently available for 58 mm only"}</span><label><input type="checkbox" checked={rush} onChange={(event) => setRush(event.target.checked)} /> Rush processing (+$50, ready in 2 days)</label></div>
        <p className="badge-pricing__note">These badges are handmade. After your design is confirmed, standard production takes about 2 weeks. Need them sooner? Choose rush processing for completion in 2 days with a $50 processing fee.</p>
      </div>
      <div className="badge-facts" aria-label="Round badge quick facts">
        {quickFacts.map(([label, value, Icon]) => (
          <article key={label}>
            <Icon size={20} aria-hidden="true" />
            <div><strong>{label}</strong><span>{value}</span></div>
          </article>
        ))}
      </div>
      <div className="badge-guidance-grid">
        <article>
          <p className="eyebrow">Design tips</p>
          <h3>Keep important details inside the circle</h3>
          <p>Leave a safe margin around the edge so text and fine details are not cut off or folded under during pressing. Bold, clear artwork works best on 32 mm badges; 75 mm gives more room for detail.</p>
        </article>
        <article>
          <p className="eyebrow">How to order</p>
          <ol>
            <li>Choose your badge size.</li>
            <li>Send us your logo, photo, or design.</li>
            <li>Confirm the quotation and approve the order.</li>
            <li>We print, press, and prepare your badges.</li>
          </ol>
        </article>
      </div>
      <div className="badge-cta">
        <p>Get your design pressed into a badge, from just one piece.</p>
        <TrackedWhatsAppButton location="badges" href={whatsappHref}>Enquire about badges</TrackedWhatsAppButton>
      </div>
    </section>
  );
}
