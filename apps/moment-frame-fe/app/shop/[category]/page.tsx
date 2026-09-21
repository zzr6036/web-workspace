import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopContent } from "../../components/shop/ShopContent";
import { getFrameCategory } from "../../lib/frameCategories";

type CategoryPageProps = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categoryKey } = await params;
  const category = getFrameCategory(categoryKey);
  if (!category) return {};

  return {
    title: `${category.name} | Custom Photo Frames`,
    description: `${category.detail} Explore personalised ${category.name.toLowerCase()} and photo frame printing in Singapore with MomentFrame.`,
    alternates: { canonical: `/shop/${category.key}` },
  };
}

export default async function CategoryShopPage({ params }: CategoryPageProps) {
  const { category: categoryKey } = await params;
  const category = getFrameCategory(categoryKey);

  if (!category) notFound();

  return <ShopContent category={category} />;
}
