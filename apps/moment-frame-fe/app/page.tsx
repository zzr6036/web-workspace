import { BrandStrip } from "./components/home/BrandStrip";
import { BestSellerCarousel } from "./components/home/BestSellerCarousel";
import { CollectionSection } from "./components/home/CollectionSection";
import { HeroSection } from "./components/home/HeroSection";
import { InspirationSection } from "./components/home/InspirationSection";
import { StorySection } from "./components/home/StorySection";

export default function Home() {
  return (
    <main id="main">
      <HeroSection />
      <BrandStrip />
      <BestSellerCarousel />
      <CollectionSection />
      <InspirationSection />
      <StorySection />
    </main>
  );
}
