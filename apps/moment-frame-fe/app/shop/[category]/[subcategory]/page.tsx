import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopContent } from "../../../components/shop/ShopContent";
import { getFrameCategory } from "../../../lib/frameCategories";
import { getSubcategory } from "../../../lib/shopCatalog";

type SubcategoryPageProps = { params: Promise<{ category: string; subcategory: string }> };

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category: categoryKey, subcategory: subcategoryKey } = await params;
  const category = getFrameCategory(categoryKey);
  const subcategory = category ? getSubcategory(category.key, subcategoryKey) : undefined;
  if (!category || !subcategory) return {};

  return {
    title: `${subcategory.englishName} Photo Frame`,
    description: `Create a personalised ${subcategory.englishName.toLowerCase()} photo frame in Singapore. Choose your photo, size and display style with MomentFrame.`,
    alternates: { canonical: `/shop/${category.key}/${subcategory.key}` },
  };
}

export default async function SubcategoryShopPage({ params }: SubcategoryPageProps) {
  const { category: categoryKey, subcategory: subcategoryKey } = await params;
  const category = getFrameCategory(categoryKey);
  if (!category) notFound();
  const subcategory = getSubcategory(category.key, subcategoryKey);
  if (!subcategory) notFound();
  return <ShopContent category={category} subcategory={subcategory} />;
}
