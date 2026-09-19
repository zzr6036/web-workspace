import { getProductsForSubcategory } from "./app/lib/shopProductData.js";
const products = getProductsForSubcategory("s3-t5");
console.log("Total products for s3-t5:", products.length);
if (products.length > 0) console.log("First product:", products[0]);
