import fs from "node:fs/promises";
import path from "node:path";
import XLSX from "xlsx";

const appRoot = path.resolve(import.meta.dirname, "..");
const workbookPath = path.join(appRoot, "data", "MomentFrame_Product_DB.xlsx");
const outputPath = path.join(appRoot, "app", "lib", "shopProductData.ts");

const workbook = XLSX.readFile(workbookPath);
const rows = XLSX.utils.sheet_to_json(workbook.Sheets.Products, { header: 1, defval: "" });
const headers = rows[3];
const column = (name) => headers.indexOf(name);
const values = rows.slice(4).filter((row) => row[column("Product SKU")]);

const products = values.map((row) => ({
  subcategoryKey: String(row[column("Subcategory Key")]).toLowerCase(),
  sku: String(row[column("Product SKU")]),
  imageSku: String(row[column("Image SKU")]),
  name: String(row[column("Product Name English")]),
  size: String(row[column("Size")]),
  type: String(row[column("Type")]),
  price: Number(row[column("Selling Price (SGD)")]),
  color: String(row[column("Color")]),
  craftsmanship: String(row[column("Craftsmanship")]),
  photoIncluded: String(row[column("Photo Included")]),
  material: String(row[column("Material")]),
  description: String(row[column("Product Description")]),
}));

const content = `export type ShopProduct = { subcategoryKey: string; sku: string; imageSku: string; name: string; size: string; type: string; price: number; color: string; craftsmanship: string; photoIncluded: string; material: string; description: string };

// Generated from data/MomentFrame_Product_DB.xlsx by yarn sync:catalog. Do not edit by hand.
export const shopProducts: ShopProduct[] = ${JSON.stringify(products, null, 2)};

export function getProductsForSubcategory(subcategoryKey: string) {
  return shopProducts.filter((product) => product.subcategoryKey === subcategoryKey);
}
`;

await fs.writeFile(outputPath, content);
console.log(`Synced ${products.length} products to app/lib/shopProductData.ts`);
