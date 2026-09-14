import { SectionHeading } from "elij-ui-library";
import BadgeSection from "../component/BadgeSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function GiftsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section gifts-page-intro">
        <SectionHeading
          eyebrow="Keepsake gifts"
          title="Gifts for your event"
          description="Choose a personalised keepsake for guests. More gift options will be added here over time."
        />
      </section>
      <BadgeSection />
      <SiteFooter />
    </main>
  );
}
