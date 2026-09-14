import { Check, Circle, Palette, Pin, Ruler, ShieldCheck } from "lucide-react";
import { SectionHeading } from "elij-ui-library";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppButton } from "./TrackedWhatsApp";

const quickFacts = [
  ["Sizes", "32 mm, 44 mm, 58 mm, or 75 mm", Ruler],
  ["Minimum order", "From just 1 piece", Check],
  ["Print", "Full-colour HD with no colour limit", Palette],
  ["Finish", "Clear, scratch-resistant protective top", ShieldCheck],
  ["Backing", "Built-in pin back, ready to wear", Pin],
  ["Perfect for", "Events, schools, campaigns, merch, and personal designs", Circle],
] as const;

export default function BadgeSection() {
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
          <img src="/products/badge/fridge.png" alt="Custom fridge magnet badge" />
          <div>
            <p className="eyebrow">Style option</p>
            <h3>Custom Fridge Magnet</h3>
            <p>A round keepsake that turns your design into a bright display for the fridge.</p>
          </div>
        </article>
        <article className="badge-style-card">
          <img src="/products/badge/keychain.png" alt="Custom keychain badge" />
          <div>
            <p className="eyebrow">Style option</p>
            <h3>Custom Keychain</h3>
            <p>A portable everyday keepsake with your logo, photo, or artwork.</p>
          </div>
        </article>
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
