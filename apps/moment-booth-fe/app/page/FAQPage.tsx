"use client";

import FAQSection from "../component/FAQSection";
import HeroSection from "../component/HeroSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function FAQPage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection exploreHref="/#gallery" />
      <FAQSection />
      <SiteFooter />
    </main>
  );
}
