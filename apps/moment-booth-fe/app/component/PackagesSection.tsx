import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Paragraph,
  Tag,
} from "elij-ui-library";
import { SectionHeading } from "elij-ui-library";

const includedFeatures = [
  {
    title: "Unlimited Instant Prints",
    description: "Keep the photos coming throughout your booked booth time.",
  },
  {
    title: "Professional DSLR Camera",
    description: "A high-quality Canon DSLR delivers sharp and vibrant photos.",
  },
  {
    title: "Professional Studio Lighting",
    description:
      "LED studio lights and flash ensure everyone looks their best.",
  },
  {
    title: "Fast Instant Printing",
    description: "Professional prints are ready in approximately 6–8 seconds.",
  },
  {
    title: "Live Preview Monitor",
    description: "Guests can preview every shot before printing.",
  },
  {
    title: "Fun Props Collection",
    description:
      "Themed props and funny signboards make every photo memorable.",
  },
  {
    title: "Friendly On-Site Booth Crew",
    description:
      "Experienced staff assist your guests for a smooth and enjoyable experience.",
  },
  {
    title: "Full Digital Gallery",
    description:
      "Receive all original high-resolution photos after your event via a download link.",
  },
];

const rentalFeatures = includedFeatures.filter(
  (feature) => feature.title !== "Friendly On-Site Booth Crew",
);

const packages = [
  {
    name: "2 Hours",
    price: "$368",
    note: "Promotional package",
    description:
      "A complete photo booth experience for intimate celebrations and focused event programmes.",
    features: includedFeatures,
  },
  {
    name: "3 Hours",
    price: "$538",
    note: "Promotional package",
    description:
      "More time for larger guest lists, weddings, corporate events, and full celebrations.",
    features: includedFeatures,
    featured: true,
  },
  {
    name: "4 Hours",
    price: "$698",
    note: "Extended package",
    description:
      "Extended coverage for large celebrations, full-day programmes, and events with a steady guest flow.",
    features: includedFeatures,
  },
  {
    name: "Long-term rental",
    price: "Custom quote",
    note: "Multi-day & long-term rental",
    description:
      "For activations, exhibitions, and pop-ups lasting days, weeks, or months.",
    features: rentalFeatures,
    rental: true,
  },
];

export default function PackagesSection() {
  return (
    <section className="section packages-section" id="packages">
      <SectionHeading
        className="section-heading"
        eyebrow="Promotional packages"
        title="Simple, transparent pricing."
        description="No minimum booking hours, no hidden charges, and free setup and teardown."
      />
      <div className="packages-grid">
        {packages.map((item) => (
          <Card
            key={item.name}
            className={
              item.featured
                ? "package-card package-card--featured"
                : "package-card"
            }
          >
            <CardHeader>
              <span>{item.note}</span>
              {item.featured && <Tag color="primary">Popular</Tag>}
            </CardHeader>
            <CardBody>
              <h3
                className={
                  item.rental
                    ? "package-offer package-offer--custom"
                    : "package-offer"
                }
              >
                <strong>{item.price}</strong>
                {!item.rental && <span>/ {item.name}</span>}
              </h3>
              <Paragraph>{item.description}</Paragraph>
              {item.rental && (
                <div className="rental-highlight">
                  <strong>Flexible project pricing</strong>
                  <p>Project pricing considers duration, venue, and scope.</p>
                  <p>Longer bookings receive better-value rates. We reply within 24 hours.</p>
                </div>
              )}
              <ul>
                {item.features?.map((feature) => (
                  <li key={feature.title}>
                    <span>
                      <strong>{feature.title}</strong>
                      {feature.description}
                    </span>
                  </li>
                ))}
              </ul>
            </CardBody>
            <CardFooter>
              <a href="#contact">
                {item.rental ? "Request a custom quote" : "Request details"}{" "}
                <span>↗</span>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
