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
const statusRows = XLSX.utils.sheet_to_json(workbook.Sheets["Product Status"], { header: 1, defval: "" });
const statusHeaders = statusRows[3];
const statusColumn = (name) => statusHeaders.indexOf(name);
const statusKeyByLabel = new Map(
  statusRows
    .slice(4)
    .filter((row) => row[statusColumn("Status key")] && row[statusColumn("Status label")])
    .map((row) => [String(row[statusColumn("Status label")]), String(row[statusColumn("Status key")])]),
);
const sizeRows = XLSX.utils.sheet_to_json(workbook.Sheets["Product Sizes"], { header: 1, defval: "" });
const sizeHeaders = sizeRows[3];
const sizeColumn = (name) => sizeHeaders.indexOf(name);
const sizeByKey = new Map(
  sizeRows
    .slice(4)
    .filter((row) => row[sizeColumn("Size key")])
    .map((row) => [String(row[sizeColumn("Size key")]), {
      sizeCm: String(row[sizeColumn("CM size")]),
      sizeLabel: String(row[sizeColumn("Display label")]),
    }]),
);

function getStatusKey(statusLabel) {
  const statusKey = statusKeyByLabel.get(String(statusLabel));
  if (!statusKey) throw new Error(`Unknown product status: ${statusLabel}`);
  return statusKey;
}

function getSize(sizeKey) {
  const size = sizeByKey.get(String(sizeKey));
  if (!size) throw new Error(`Unknown product size key: ${sizeKey}`);
  return size;
}

const products = values.map((row) => {
  const sizeKey = String(row[column("Size Key")]);
  const size = getSize(sizeKey);
  return {
    subcategoryKey: String(row[column("Subcategory Key")]).toLowerCase(),
    sku: String(row[column("Product SKU")]),
    imageSku: String(row[column("Image SKU")]),
    status: getStatusKey(row[column("Status")]),
    name: String(row[column("Product Name English")]),
    size: String(row[column("Size")]),
    sizeKey,
    ...size,
    type: String(row[column("Type")]),
    price: Number(row[column("Selling Price (SGD)")]),
    color: String(row[column("Color")]),
    craftsmanship: String(row[column("Craftsmanship")]),
    photoIncluded: String(row[column("Photo Included")]),
    material: String(row[column("Material")]),
    description: String(row[column("Product Description")]),
  };
});

const content = `import type { ProductStatusValue } from "./productStatus";

export type ShopProduct = { subcategoryKey: string; sku: string; imageSku: string; status: ProductStatusValue; name: string; size: string; sizeKey: string; sizeCm: string; sizeLabel: string; type: string; price: number; color: string; craftsmanship: string; photoIncluded: string; material: string; description: string };

// Generated from data/MomentFrame_Product_DB.xlsx by yarn sync:catalog. Do not edit by hand.
export const shopProducts: ShopProduct[] = ${JSON.stringify(products, null, 2)};

export function getProductsForSubcategory(subcategoryKey: string) {
  return shopProducts.filter((product) => product.subcategoryKey === subcategoryKey);
}
`;

await fs.writeFile(outputPath, content);
console.log(`Synced ${products.length} products to app/lib/shopProductData.ts`);
