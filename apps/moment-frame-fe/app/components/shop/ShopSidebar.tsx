import { frameCategories, FrameCategoryKey } from "../../lib/frameCategories";
import { getSubcategories } from "../../lib/shopCatalog";

type ShopSidebarProps = {
  activeCategory?: FrameCategoryKey;
  activeSubcategory?: string;
};

export function ShopSidebar({
  activeCategory,
  activeSubcategory,
}: ShopSidebarProps) {
  return (
    <aside className="shop-sidebar" aria-label="Frame categories">
      <a
        className={`shop-sidebar-link${!activeCategory ? " is-active" : ""}`}
        href="/shop"
      >
        All frames
      </a>
      {frameCategories.map((category) => (
        <div className="shop-sidebar-category" key={category.key}>
          <a
            className={`shop-sidebar-link${activeCategory === category.key ? " is-active" : ""}`}
            href={`/shop/${category.key}`}
          >
            {category.name}
          </a>
          <div className="shop-sidebar-subcategories">
            {getSubcategories(category.key).map((subcategory) => (
              <a
                className={`shop-sidebar-subcategory${activeSubcategory === subcategory.key ? " is-active" : ""}`}
                href={`/shop/${category.key}/${subcategory.key}`}
                key={subcategory.key}
              >
                {subcategory.englishName}
              </a>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
