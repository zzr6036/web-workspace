import { SectionHeading } from 'elij-ui-library';

const events = ['Weddings', 'Solemnisations & ROMs', 'Birthday Parties', 'Baby Showers & Full Month', 'Corporate Events', 'Dinner & Dance', 'Award Ceremonies', 'Graduation Parties', 'School Events', 'Family Days & Carnivals', 'Year-End Parties', 'Appreciation Events'];

export default function EventTypesSection() {
  return (
    <section className="section event-types-section">
      <SectionHeading className="section-heading" eyebrow="Perfect for" title="Every reason to celebrate." description="Available for private events, schools, hotels, restaurants, corporate functions, and event venues across Singapore." />
      <div className="event-types-grid">{events.map((event) => <span key={event}>{event}</span>)}</div>
    </section>
  );
}
