"use client";

import AddOnProductsSection from "../component/AddOnProductsSection";
import HeroSection from "../component/HeroSection";
import OptionalAddOnsSection from "../component/OptionalAddOnsSection";
import PackagesSection from "../component/PackagesSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function PackagesPage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection exploreHref="/#gallery" />
      <PackagesSection />
      <OptionalAddOnsSection />
      <AddOnProductsSection />
      <SiteFooter />
    </main>
  );
}
