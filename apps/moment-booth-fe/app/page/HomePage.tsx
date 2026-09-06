"use client";

import ContactSection from "../component/ContactSection";
import BookingStepsSection from "../component/BookingStepsSection";
import EventTypesSection from "../component/EventTypesSection";
import FAQSection from "../component/FAQSection";
import FloatingContact from "../component/FloatingContact";
import GallerySection from "../component/GallerySection";
import HeroSection from "../component/HeroSection";
import LibrarySection from "../component/LibrarySection";
import PackagesSection from "../component/PackagesSection";
import WhyChooseUsSection from "../component/WhyChooseUsSection";
import SiteFooter from "../layout/SiteFooter";
import SiteHeader from "../layout/SiteHeader";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <FloatingContact />
      <HeroSection />
      <GallerySection />
      <LibrarySection />
      <PackagesSection />
      <BookingStepsSection />
      <EventTypesSection />
      <WhyChooseUsSection />
      <FAQSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
