import { notFound } from "next/navigation";
import { ShopContent } from "../../../components/shop/ShopContent";
import { getFrameCategory } from "../../../lib/frameCategories";
import { getSubcategory } from "../../../lib/shopCatalog";

type SubcategoryPageProps = { params: Promise<{ category: string; subcategory: string }> };

export default async function SubcategoryShopPage({ params }: SubcategoryPageProps) {
  const { category: categoryKey, subcategory: subcategoryKey } = await params;
  const category = getFrameCategory(categoryKey);
  if (!category) notFound();
  const subcategory = getSubcategory(category.key, subcategoryKey);
  if (!subcategory) notFound();
  return <ShopContent category={category} subcategory={subcategory} />;
}
