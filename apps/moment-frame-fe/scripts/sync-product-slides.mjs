import fs from "node:fs/promises";
import path from "node:path";

const appRoot = path.resolve(import.meta.dirname, "..");
const slidesRoot = path.join(appRoot, "public", "frames", "product-slides");
const outputPath = path.join(appRoot, "app", "lib", "productSlideLists.ts");
const supportedExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webm", ".mp4"]);

const directoryEntries = await fs.readdir(slidesRoot, { withFileTypes: true });
const productSlides = {};

for (const directory of directoryEntries.filter((entry) => entry.isDirectory()).sort((a, b) => a.name.localeCompare(b.name))) {
  const directoryPath = path.join(slidesRoot, directory.name);
  const files = await fs.readdir(directoryPath, { withFileTypes: true });
  const slides = files
    .filter((file) => file.isFile())
    .filter((file) => /^slide-\d+\.[a-z0-9]+$/i.test(file.name))
    .filter((file) => supportedExtensions.has(path.extname(file.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    .map((file) => ({
      src: `/frames/product-slides/${directory.name}/${file.name}`,
      mediaType: [".webm", ".mp4"].includes(path.extname(file.name).toLowerCase()) ? "video" : "image",
    }));

  if (slides.length) productSlides[directory.name] = slides;
}

const content = `export type ProductSlide = { src: string; mediaType: "image" | "video" };

// Generated from public/frames/product-slides by yarn sync:slides. Do not edit by hand.
export const productSlidesBySubcategory: Record<string, ProductSlide[]> = ${JSON.stringify(productSlides, null, 2)};

export function getProductSlides(subcategoryKey: string) {
  return productSlidesBySubcategory[subcategoryKey] || [];
}
`;

await fs.writeFile(outputPath, content);
console.log(`Synced ${Object.keys(productSlides).length} product slide collections to app/lib/productSlideLists.ts`);
