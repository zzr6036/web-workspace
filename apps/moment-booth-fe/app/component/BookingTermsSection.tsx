import { SectionHeading } from "elij-ui-library";

const bookingNotes = [
  ["Weather and outdoor events", "Outdoor setups require a suitable sheltered area and safe operating conditions. Rain, lightning, strong wind, flooding, extreme heat or other weather conditions may require the service to be paused, relocated or stopped. If the service cannot operate because of weather after the team has prepared or attended, no refund will be provided. We will suggest a practical alternative where timing, venue and crew availability allow."],
  ["Power, access and venue readiness", "The client or venue must provide safe, stable power, clear access for load-in and teardown, and a suitable setup area. No refund will be provided when a venue power failure, unavailable power supply, restricted access, delayed access, insufficient space or unsafe venue condition prevents the service from operating. Please confirm venue requirements with us before booking."],
  ["Booking time and additional hours", "Coverage starts and ends at the agreed booking time. Delays caused by the client, venue or event programme do not extend the included service period. Additional time may be requested at $200 per hour, subject to crew and equipment availability."],
  ["Equipment and guest safety", "Our team may pause or stop operation if equipment is being used unsafely, moved without permission, exposed to liquid or placed in an unsuitable area. The client may be responsible for repair or replacement costs resulting from damage or loss caused by guests, venue staff or other third parties."],
  ["Photo frames and gallery artwork", "For printed frames and Signature Photo Gallery services, production begins after the final layout and crop have been approved. Please provide original, high-resolution images and review the preview carefully. Changes requested after approval may affect the delivery schedule and may incur additional charges."],
  ["Styling, delivery and teardown", "Floral and styling elements are subject to availability and may be substituted with a comparable option where necessary. Delivery, setup and teardown times must be coordinated with the venue. Venue delays or access restrictions may shorten the available setup or service time."],
  ["Unavoidable events", "If an event outside either party’s reasonable control affects the booking, we will communicate promptly and work with you on the most practical available option. Any reschedule, credit or refund will follow the confirmed quotation and the circumstances of the booking."],
];

export default function BookingTermsSection() {
  return (
    <section className="section booking-terms-section" id="booking-notes">
      <SectionHeading className="section-heading" eyebrow="Before you book" title="Important booking notes." description="A few practical details help us deliver a smooth, safe experience for every event." />
      <div className="booking-terms-list">
        {bookingNotes.map(([title, description]) => (
          <details key={title}>
            <summary>{title}<span>+</span></summary>
            <p>{description}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
