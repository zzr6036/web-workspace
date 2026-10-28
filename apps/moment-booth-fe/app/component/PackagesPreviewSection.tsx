import AddOnProductsSection from "./AddOnProductsSection";
import OptionalAddOnsSection from "./OptionalAddOnsSection";
import PackagesSection from "./PackagesSection";

export default function PackagesPreviewSection() {
  return (
    <>
      <PackagesSection />
      <OptionalAddOnsSection />
      <AddOnProductsSection />
    </>
  );
}
