import type { ReactNode } from "react";
import Image from "next/image";
import { GalleryFrameProfileGuideSection } from "./GalleryFrameProfileGuideSection";
import { GalleryProtectiveFilmGuideSection } from "./GalleryProtectiveFilmGuideSection";
import { GalleryWallMountingOptionsSection } from "./GalleryWallMountingOptionsSection";
import { HighDefinitionQualitySection } from "./HighDefinitionQualitySection";
import { PhotoOrientationSelectionSection } from "./PhotoOrientationSelectionSection";
import { PrintColourGuideSection } from "./PrintColourGuideSection";
import { ProtectiveFilmGuideSection } from "./ProtectiveFilmGuideSection";
import { UsageGuideSection } from "./UsageGuideSection";

type InformationSectionProps = {
  title: string;
  points: string[];
  image: string;
  imageAlt: string;
  children?: ReactNode;
};

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

const compactSizes = [
  ['6"', "10.2 × 15.2 cm"],
  ['7"', "12.7 × 17.8 cm"],
  ['8"', "15 × 20 cm"],
  ['10"', "18 × 27 cm / 20 × 25 cm"],
  ['12"', "20 × 30 cm / 25 × 30 cm"],
  ['14"', "25 × 35 cm"],
  ["A4", "21 × 29.7 cm"],
  ["A3", "29.7 × 42 cm"],
  ['16"', "30 × 40 cm"],
];

const largeSizes = [
  ['18"', "35 × 45 cm"],
  ['20"', "40 × 50 cm"],
  ['24"', "40 × 60 cm / 50 × 60 cm"],
  ['30"', "60 × 75 cm"],
  ['32"', "60 × 80 cm"],
  ['36"', "60 × 90 cm"],
  ['40"', "75 × 100 cm"],
  ['42"', "75 × 110 cm"],
  ['48"', "75 × 120 cm"],
];

function SizeColumn({ sizes }: { sizes: string[][] }) {
  return (
    <div className="product-size-column">
      <table>
        <thead>
          <tr>
            <th>Panel size</th>
            <th>Image area</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map(([size, dimensions]) => (
            <tr key={size}>
              <td>{size}</td>
              <td>{dimensions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ProductSizeGuide() {
  return (
    <section
      className="product-size-guide"
      aria-labelledby="product-size-guide-title"
    >
      <div>
        <p className="eyebrow">PRODUCT SIZE GUIDE</p>
        <h3 id="product-size-guide-title">Product size information</h3>
        <ul>
          <li>Measurements are a guide for your image layout</li>
          <li>Final cropping preserves the strongest composition</li>
          <li>Selected format may change the visible image area slightly</li>
        </ul>
      </div>
      <div className="product-size-columns">
        <SizeColumn sizes={compactSizes} />
        <SizeColumn sizes={largeSizes} />
      </div>
    </section>
  );
}

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
      <ProductSizeGuide />
      <HighDefinitionQualitySection />
      <UsageGuideSection />
      <PhotoOrientationSelectionSection />
      <PrintColourGuideSection />
      <ProtectiveFilmGuideSection />
      {isGalleryWoodenFrame && (
        <>
          <GalleryProtectiveFilmGuideSection />
          <GalleryWallMountingOptionsSection />
          <GalleryFrameProfileGuideSection />
        </>
      )}
    </div>
  );
}
