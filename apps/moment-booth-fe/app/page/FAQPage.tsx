"use client";

import FAQSection from "../component/FAQSection";
import HomeBanner from "../component/HomeBanner";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function FAQPage() {
  return (
    <main>
      <SiteHeader />
      <HomeBanner />
      <FAQSection />
      <SiteFooter />
    </main>
  );
}
