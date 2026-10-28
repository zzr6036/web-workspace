import { Title } from "elij-ui-library";

const faqs = [
  [
    "How much space do you need?",
    "A comfortable 2.5m × 2.5m area is usually enough for the booth, lighting, and a small prop table.",
  ],
  [
    "Can the prints match our event?",
    "Yes. We personalise the print design using your names, date, colours, and event style.",
  ],
  [
    "Where do you operate?",
    "Moment Booth serves events across Singapore. Share your venue and we will confirm the setup details.",
  ],
  ["Weather and outdoor events", "Outdoor setups require a suitable sheltered area and safe operating conditions. Rain, lightning, strong wind, flooding, extreme heat or other weather conditions may require the service to be paused, relocated or stopped. If the service cannot operate because of weather after the team has prepared or attended, no refund will be provided. We will suggest a practical alternative where timing, venue and crew availability allow."],
  ["Power, access and venue readiness", "The client or venue must provide safe, stable power, clear access for load-in and teardown, and a suitable setup area. No refund will be provided when a venue power failure, unavailable power supply, restricted access, delayed access, insufficient space or unsafe venue condition prevents the service from operating. Please confirm venue requirements with us before booking."],
  ["Booking time and additional hours", "Coverage starts and ends at the agreed booking time. Delays caused by the client, venue or event programme do not extend the included service period. Additional time may be requested at $200 per hour, subject to crew and equipment availability."],
  ["Equipment and guest safety", "Our team may pause or stop operation if equipment is being used unsafely, moved without permission, exposed to liquid or placed in an unsuitable area. The client may be responsible for repair or replacement costs resulting from damage or loss caused by guests, venue staff or other third parties."],
  ["Photo frames and gallery artwork", "For printed frames and Signature Photo Gallery services, production begins after the final layout and crop have been approved. Please provide original, high-resolution images and review the preview carefully. Changes requested after approval may affect the delivery schedule and may incur additional charges."],
  ["Styling, delivery and teardown", "Floral and styling elements are subject to availability and may be substituted with a comparable option where necessary. Delivery, setup and teardown times must be coordinated with the venue. Venue delays or access restrictions may shorten the available setup or service time."],
  ["Unavoidable events", "If an event outside either party’s reasonable control affects the booking, we will communicate promptly and work with you on the most practical available option. Any reschedule, credit or refund will follow the confirmed quotation and the circumstances of the booking."],
];

export default function FAQSection() {
  return (
    <section className="section faq-section" id="faq">
      <div>
        <p className="eyebrow">FAQ &amp; booking notes</p>
        <Title level={2}>
          Frequently asked
          <br />
          questions.
        </Title>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>
              {question}
              <span>+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
