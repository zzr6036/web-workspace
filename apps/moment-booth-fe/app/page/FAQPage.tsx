"use client";

import FAQSection from "../component/FAQSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function FAQPage() {
  return (
    <main>
      <SiteHeader />
      <FAQSection />
      <SiteFooter />
    </main>
  );
}
