"use client";

import { Button, SectionHeading } from "elij-ui-library";
import AddOnProductsSection from "../component/AddOnProductsSection";
import OptionalAddOnsSection from "../component/OptionalAddOnsSection";
import PackagesSection from "../component/PackagesSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function PackagesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="packages-page-intro section">
        <SectionHeading
          className="section-heading"
          eyebrow="Packages & extras"
          title="Everything you need for your event."
          description="Choose a core photobooth package, then add the details that make your celebration feel like yours."
        />
        <a href="/#contact" className="packages-page-intro__cta">
          <Button variant="primary" size="large">Enquire about your event</Button>
        </a>
      </section>
      <PackagesSection />
      <OptionalAddOnsSection />
      <AddOnProductsSection />
      <SiteFooter />
    </main>
  );
}
