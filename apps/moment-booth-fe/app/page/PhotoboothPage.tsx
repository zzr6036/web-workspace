"use client";

import ContactSection from "../component/ContactSection";
import BookingStepsSection from "../component/BookingStepsSection";
import BookingTermsSection from "../component/BookingTermsSection";
import EventTypesSection from "../component/EventTypesSection";
import FloatingContact from "../component/FloatingContact";
import HeroSection from "../component/HeroSection";
import PackagesPreviewSection from "../component/PackagesPreviewSection";
import PhotoboothShowcaseTabs from "../component/PhotoboothShowcaseTabs";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function PhotoboothPage() {
  return (
    <main>
      <SiteHeader /><FloatingContact /><HeroSection />
      <PhotoboothShowcaseTabs />
      <PackagesPreviewSection /><BookingTermsSection /><BookingStepsSection /><EventTypesSection /><ContactSection /><SiteFooter />
    </main>
  );
}
