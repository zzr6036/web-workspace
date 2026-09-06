import Image from "next/image";
import { Button, WhatsAppButton } from "elij-ui-library";
import { whatsappHref } from "../lib/contact";
import {
  Camera,
  HandHeart,
  Images,
  MessageCircle,
  Palette,
  PartyPopper,
} from "lucide-react";

const boothBenefits = [
  {
    icon: MessageCircle,
    title: "Break the Ice",
    description:
      "Fun props and an easy photo experience help guests relax, mingle, and enjoy the event.",
  },
  {
    icon: Images,
    title: "Instant Keepsakes",
    description:
      "Guests leave with a high-quality printed memory they can hold onto and share.",
  },
  {
    icon: PartyPopper,
    title: "Entertainment for Everyone",
    description:
      "A photo booth gives guests of different ages something enjoyable to do throughout the event.",
  },
  {
    icon: Camera,
    title: "Capture Candid Moments",
    description:
      "Beyond formal photography, the booth captures spontaneous smiles and playful interactions.",
  },
  {
    icon: Palette,
    title: "Made for Your Event",
    description:
      "Customised templates can match your colours, names, logo, theme, and event date.",
  },
  {
    icon: HandHeart,
    title: "Easy, Hassle-Free Experience",
    description:
      "Our crew handles delivery, setup, guest assistance, printing, and teardown from start to finish.",
  },
];

export default function HeroSection() {
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
          <WhatsAppButton
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
          </WhatsAppButton>
          <a href="#gallery">
            <Button variant="secondary" size="large">
              Explore moments
            </Button>
          </a>
        </div>
      </div>
      <div className="hero-benefits">
        <div className="hero-benefits-heading">
          <p className="eyebrow">Why choose a photo booth?</p>
          <h2>More than photos. A better guest experience.</h2>
        </div>
        <div className="hero-benefits-grid">
          {boothBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title}>
                <span className="benefit-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
