import { notFound } from "next/navigation";
import { ShopContent } from "../../components/shop/ShopContent";
import { getFrameCategory } from "../../lib/frameCategories";

type CategoryPageProps = { params: Promise<{ category: string }> };

export default async function CategoryShopPage({ params }: CategoryPageProps) {
  const { category: categoryKey } = await params;
  const category = getFrameCategory(categoryKey);

  if (!category) notFound();

  return <ShopContent category={category} />;
}
