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

export default function HeroBenefitsSection() {
  return (
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
  );
}
