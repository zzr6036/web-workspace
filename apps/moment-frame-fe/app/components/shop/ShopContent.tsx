import { FrameCategory, frameCategories } from "../../lib/frameCategories";
import { getSubcategories, ShopSubcategory } from "../../lib/shopCatalog";
import { getProductsForSubcategory } from "../../lib/shopProductData";
import { ShopProductDetailView } from "./productDetail/ShopProductDetailView";
import { ShopSidebar } from "./ShopSidebar";

type ShopContentProps = {
  category?: FrameCategory;
  subcategory?: ShopSubcategory;
};

import { MultiFormatImage } from "../MultiFormatImage";

function Placeholder({ label, imageSku }: { label: string; imageSku: string }) {
  return (
    <div className="shop-subcategory-placeholder">
      <MultiFormatImage
        baseSrc={`/frames/product-placeholders/${imageSku}`}
        alt={`${label} placeholder`}
      />
    </div>
  );
}
function SubcategoryCard({ subcategory }: { subcategory: ShopSubcategory }) {
  return (
    <a
      className="shop-subcategory-card"
      href={`/shop/${subcategory.categoryKey}/${subcategory.key}`}
    >
      <Placeholder
        label={subcategory.englishName}
        imageSku={subcategory.imageSku}
      />
      <div className="shop-subcategory-copy">
        {/* <p>{subcategory.chineseName}</p> */}
        <h3>{subcategory.englishName}</h3>
        <span className="shop-subcategory-action">
          View sizes <b aria-hidden="true">→</b>
        </span>
      </div>
    </a>
  );
}
function CategorySection({ category }: { category: FrameCategory }) {
  return (
    <section className="shop-category-section">
      <div className="shop-category-heading">
        <h2>{category.name}</h2>
        <p>{category.detail}</p>
      </div>
      <div className="shop-subcategory-grid">
        {getSubcategories(category.key).map((subcategory) => (
          <SubcategoryCard key={subcategory.key} subcategory={subcategory} />
        ))}
      </div>
    </section>
  );
}

export function ShopContent({ category, subcategory }: ShopContentProps) {
  const displayedCategories = category ? [category] : frameCategories;
  const title = subcategory
    ? subcategory.englishName
    : category
      ? category.name
      : "Find the frame for your story.";
  const description = subcategory
    ? "Choose a size to make this photo frame your own."
    : category
      ? category.detail
      : "Explore a frame style, then choose its finish and size.";

  return (
    <main className="shop-page" id="main">
      {!subcategory && (
        <header className="shop-intro">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
      )}
      <div className="shop-layout">
        <ShopSidebar
          activeCategory={category?.key}
          activeSubcategory={subcategory?.key}
        />
        <section className="shop-results" aria-label={title}>
          {subcategory ? (
            <ShopProductDetailView
              subcategory={subcategory}
              products={getProductsForSubcategory(subcategory.key)}
            />
          ) : (
            displayedCategories.map((item) => (
              <CategorySection category={item} key={item.key} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}
