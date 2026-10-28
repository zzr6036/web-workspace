"use client";

import { useEffect, useState } from "react";
import { PhotoBagSection } from "./AddOnProductsSection";
import GallerySection from "./GallerySection";
import LibrarySection from "./LibrarySection";

type ShowcaseTab = "selected-moments" | "props-library" | "photo-bags";

const getTabFromHash = (): ShowcaseTab =>
  typeof window !== "undefined" && window.location.hash === "#props-library"
    ? "props-library"
    : typeof window !== "undefined" && window.location.hash === "#photo-bags"
      ? "photo-bags"
      : "selected-moments";

export default function PhotoboothShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("selected-moments");

  useEffect(() => {
    const handleHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const selectTab = (tab: ShowcaseTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
  };

  return (
    <section className="photobooth-showcase" aria-label="Photo Booth examples and library">
      <div className="photobooth-showcase__tabs" role="tablist" aria-label="Photo Booth content">
        <button
          className={activeTab === "selected-moments" ? "is-active" : ""}
          type="button"
          role="tab"
          aria-selected={activeTab === "selected-moments"}
          aria-controls="selected-moments"
          onClick={() => selectTab("selected-moments")}
        >
          Selected moments
        </button>
        <button
          className={activeTab === "props-library" ? "is-active" : ""}
          type="button"
          role="tab"
          aria-selected={activeTab === "props-library"}
          aria-controls="props-library"
          onClick={() => selectTab("props-library")}
        >
          Props &amp; template library
        </button>
        <button
          className={activeTab === "photo-bags" ? "is-active" : ""}
          type="button"
          role="tab"
          aria-selected={activeTab === "photo-bags"}
          aria-controls="photo-bags"
          onClick={() => selectTab("photo-bags")}
        >
          Photo Print Bags
        </button>
      </div>
      <div id={activeTab} role="tabpanel" tabIndex={0}>
        {activeTab === "selected-moments" ? <GallerySection /> : activeTab === "props-library" ? <LibrarySection /> : <PhotoBagSection />}
      </div>
    </section>
  );
}
