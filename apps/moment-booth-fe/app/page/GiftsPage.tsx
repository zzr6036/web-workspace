import BadgeSection from "../component/BadgeSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function GiftsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section gifts-page-intro" aria-labelledby="gifts-page-title">
        <div className="section-heading">
          <p className="eyebrow">Keepsake gifts</p>
          <h1 id="gifts-page-title">Gifts for your event</h1>
          <p>Choose a personalised keepsake for guests. More gift options will be added here over time.</p>
        </div>
      </section>
      <BadgeSection />
      <SiteFooter />
    </main>
  );
}
