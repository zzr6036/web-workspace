import type { MetadataRoute } from "next";
import { frameCategories } from "./lib/frameCategories";
import { getSubcategories } from "./lib/shopCatalog";

const siteUrl = "https://www.momentframesg.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const collectionPages = frameCategories.flatMap((category) => [
    { url: `${siteUrl}/shop/${category.key}`, changeFrequency: "weekly" as const, priority: 0.8 },
    ...getSubcategories(category.key).map((subcategory) => ({
      url: `${siteUrl}/shop/${category.key}/${subcategory.key}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]);

  return [...staticPages, ...collectionPages];
}
