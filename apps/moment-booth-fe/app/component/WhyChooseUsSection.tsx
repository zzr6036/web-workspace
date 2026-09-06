import { Title } from "elij-ui-library";

const reasons = [
  "Premium DSLR photography",
  "Fast, high-quality instant printing",
  "Beautiful customised print designs",
  "Friendly and experienced event crew",
  "Transparent pricing with no hidden fees",
  "Suitable for small gatherings and events",
];

export default function WhyChooseUsSection() {
  return (
    <section className="section why-section">
      <div>
        <p className="eyebrow">Why choose us</p>
        <Title level={2}>More than a photo booth.</Title>
        <p>
          We help create unforgettable moments and lasting memories for you and
          your guests.
        </p>
      </div>
      <ul>
        {reasons.map((reason) => (
          <li key={reason}>
            <span>✓</span>
            {reason}
          </li>
        ))}
      </ul>
    </section>
  );
}
