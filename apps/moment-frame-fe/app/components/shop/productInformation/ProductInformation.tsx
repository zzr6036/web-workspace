// import type { ReactNode } from "react";
import { GalleryFrameProfileGuideSection } from "./GalleryFrameProfileGuideSection";
import { GalleryProtectiveFilmGuideSection } from "./GalleryProtectiveFilmGuideSection";
import { GalleryWallMountingOptionsSection } from "./GalleryWallMountingOptionsSection";
import { HighDefinitionQualitySection } from "./HighDefinitionQualitySection";
import { PhotoOrientationSelectionSection } from "./PhotoOrientationSelectionSection";
import { PrintColourGuideSection } from "./PrintColourGuideSection";
import { ProtectiveFilmGuideSection } from "./ProtectiveFilmGuideSection";
import { UsageGuideSection } from "./UsageGuideSection";
import { ProductSizeGuide } from "./ProductSizeGuide";

// type InformationSectionProps = {
//   title: string;
//   points: string[];
//   image: string;
//   imageAlt: string;
//   children?: ReactNode;
// };

// export function ProductInformationSection({
//   title,
//   points,
//   image,
//   imageAlt,
//   children,
// }: InformationSectionProps) {
//   return (
//     <section className="product-information-section">
//       <div className="product-information-image">
//         <Image
//           src={image}
//           alt={imageAlt}
//           fill
//           sizes="(max-width: 760px) 100vw, 48vw"
//         />
//       </div>
//       <div className="product-information-copy">
//         <h3>{title}</h3>
//         <ul>
//           {points.map((point) => (
//             <li key={point}>{point}</li>
//           ))}
//         </ul>
//         {children}
//       </div>
//     </section>
//   );
// }

// export function GalleryWoodenFrameInformation() {
//   const finishes = [
//     "Walnut Poem",
//     "Walnut Grain",
//     "Linen Grey",
//     "Breeze Elegance",
//     "Golden Years Frame",
//     "Time Imprint",
//     "Monet Window",
//     "Gilded Elegance",
//   ];
//   return (
//     <section className="gallery-wooden-frame-information">
//       <div className="gallery-wooden-frame-copy">
//         <h3>Crafted for a statement wall</h3>
//         <ul>
//           <li>Selected solid-wood frame options</li>
//           <li>Soft matte surface finish</li>
//           <li>Made for bedrooms, living rooms and feature walls</li>
//           <li>Suitable for wedding, family, baby and portrait photography</li>
//         </ul>
//       </div>
//       <div className="gallery-wooden-frame-images">
//         <Image
//           src="/frames/product-information/gallery/frame-finishes.png"
//           alt="Gallery wooden frame finish details"
//           width={900}
//           height={1100}
//         />
//         <Image
//           src="/frames/product-information/gallery/frame-detail-finishes.png"
//           alt="Gallery wooden frame trim details"
//           width={900}
//           height={500}
//         />
//       </div>
//       <div className="gallery-wooden-frame-finishes">
//         {finishes.map((finish) => (
//           <span key={finish}>{finish}</span>
//         ))}
//       </div>
//     </section>
//   );
// }

export function ProductInformation({
  displayTypes,
  isGalleryWoodenFrame,
}: {
  displayTypes: string[];
  isGalleryWoodenFrame: boolean;
}) {
  // Kept in the shared component API for product configurations that provide display types.
  void displayTypes;

  return (
    <div className="product-information">
      <div className="size-and-film-layout">
        <ProductSizeGuide />
        <ProtectiveFilmGuideSection />
      </div>
      <UsageGuideSection />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
        <HighDefinitionQualitySection />
        <PrintColourGuideSection />
      </div>
      <PhotoOrientationSelectionSection />
      {isGalleryWoodenFrame && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
            <GalleryProtectiveFilmGuideSection />
            <GalleryWallMountingOptionsSection />
          </div>
          <GalleryFrameProfileGuideSection />
        </>
      )}
    </div>
  );
}
