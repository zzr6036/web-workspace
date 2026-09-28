"use client";

import { frameCategories, FrameCategoryKey } from "../../lib/frameCategories";
import { getSubcategories } from "../../lib/shopCatalog";
import { useState } from "react";

type ShopSidebarProps = {
  activeCategory?: FrameCategoryKey;
  activeSubcategory?: string;
};

export function ShopSidebar({
  activeCategory,
  activeSubcategory,
}: ShopSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="shop-sidebar" aria-label="Frame categories">
      <button
        className="shop-sidebar-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="shop-category-list"
        onClick={() => setIsOpen((open) => !open)}
      >
        Browse frames <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      <div id="shop-category-list" className={isOpen ? "shop-sidebar-list is-open" : "shop-sidebar-list"}>
        <a
          className={`shop-sidebar-link${!activeCategory ? " is-active" : ""}`}
          href="/shop"
          onClick={() => setIsOpen(false)}
        >
          All frames
        </a>
        {frameCategories.map((category) => (
          <div className="shop-sidebar-category" key={category.key}>
          <a
            className={`shop-sidebar-link${activeCategory === category.key ? " is-active" : ""}`}
            href={`/shop/${category.key}`}
            onClick={() => setIsOpen(false)}
          >
            {category.name}
          </a>
          <div className="shop-sidebar-subcategories">
            {getSubcategories(category.key).map((subcategory) => (
              <a
                className={`shop-sidebar-subcategory${activeSubcategory === subcategory.key ? " is-active" : ""}`}
                href={`/shop/${category.key}/${subcategory.key}`}
                key={subcategory.key}
                onClick={() => setIsOpen(false)}
              >
                {subcategory.englishName}
              </a>
            ))}
          </div>
        </div>
        ))}
      </div>
    </aside>
  );
}
