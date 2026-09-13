"use client";

import ContactSection from "../component/ContactSection";
import BookingStepsSection from "../component/BookingStepsSection";
import EventTypesSection from "../component/EventTypesSection";
import FloatingContact from "../component/FloatingContact";
import GallerySection from "../component/GallerySection";
import HeroSection from "../component/HeroSection";
import LibrarySection from "../component/LibrarySection";
import PackagesPreviewSection from "../component/PackagesPreviewSection";
import WhyChooseUsSection from "../component/WhyChooseUsSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <FloatingContact />
      <HeroSection />
      <div className="gallery-collection-group">
        <GallerySection />
        <LibrarySection />
      </div>
      <PackagesPreviewSection />
      <BookingStepsSection />
      <EventTypesSection />
      <WhyChooseUsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
