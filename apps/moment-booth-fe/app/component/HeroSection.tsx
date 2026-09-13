import Image from "next/image";
import { Button } from "elij-ui-library";
import { whatsappHref } from "../lib/contact";
import { TrackedWhatsAppButton } from "./TrackedWhatsApp";

type HeroSectionProps = {
  exploreHref?: string;
};

export default function HeroSection({ exploreHref = "#gallery" }: HeroSectionProps) {
  return (
    <section className="hero" id="top">
      <div className="hero-glow hero-glow--left" />
      <div className="hero-glow hero-glow--right" />
      <div className="hero-copy">
        <h1>
          Capture Every Smile.<span>Print Every Memory.</span>
        </h1>
        <p>
          Premium photo booth experiences with high-quality instant prints,
          beautiful customised templates, and a friendly crew your guests will
          love.
        </p>
        <div className="hero-summary" aria-label="Why choose Moment Booth">
          <span>
            <strong>Studio quality</strong> Canon DSLR + professional lighting
          </span>
          <span>
            <strong>Professional prints</strong> DNP DS620 with vibrant,
            water-resistant photos
          </span>
          <span>
            <strong>Fast & easy</strong> Live preview and 6–8 second prints
          </span>
          <span>
            <strong>Every format</strong> Instant prints, QR downloads, and a
            full gallery
          </span>
        </div>
        <div className="hero-actions">
          <TrackedWhatsAppButton
            location="hero"
            href={whatsappHref}
            className="whatsapp-enquire-button"
            size="large"
            icon={
              <Image
                src="/icons/whatsapp.png"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
            }
          >
            Enquire
          </TrackedWhatsAppButton>
          <a href={exploreHref}>
            <Button variant="secondary" size="large">
              Explore moments
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
