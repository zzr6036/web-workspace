import { SectionHeading } from "elij-ui-library";

const steps = [
  [
    "Step 1",
    "Check availability",
    "Share your event date, hours, venue, and guest count so we can confirm the right setup.",
  ],
  [
    "Step 2",
    "Secure your slot",
    "Lock in your preferred date with a SGD 100 deposit after we confirm availability.",
  ],
  [
    "Step 3",
    "Choose your template",
    "Pick a favourite design and send us your names, colours, logo, or event theme.",
  ],
  [
    "Step 4",
    "Complete payment",
    "Settle the remaining balance one week before your event, then enjoy the day.",
  ],
];

export default function BookingStepsSection() {
  return (
    <section className="section booking-section" id="booking-steps">
      <SectionHeading className="section-heading" eyebrow="Book in 4 easy steps" title="Your booth, sorted." />
      <div className="booking-grid">
        {steps.map(([number, title, description]) => (
          <article key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      {/* <p className="booking-note">
        Plans changed? Cancellation is available at any time with a SGD 20
        administration fee.
      </p> */}
    </section>
  );
}
