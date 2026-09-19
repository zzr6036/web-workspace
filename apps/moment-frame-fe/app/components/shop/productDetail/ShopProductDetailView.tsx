"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useCart } from "../../cart/CartProvider";
import {
  getCroppedImg,
  imageDimensions,
  fileAsDataUrl,
} from "../../../lib/imageUpload";
import { ShopSubcategory } from "../../../lib/shopCatalog";
import { ShopProduct } from "../../../lib/shopProductData";
import { DesignUploadModal } from "./DesignUploadModal";
import { FrameMockupPreview } from "./FrameMockupPreview";
import { ProductConfigurator } from "./ProductConfigurator";
import { ProductDetails } from "./ProductDetails";
import { ProductMediaGallery } from "./ProductMediaGallery";
import { ProductInformation } from "../productInformation/ProductInformation";
import { createDesignDraft, DesignDraft, Orientation } from "./types";
import { useProductConfiguration } from "./useProductConfiguration";

export function ShopProductDetailView({
  subcategory,
  products,
}: {
  subcategory: ShopSubcategory;
  products: ShopProduct[];
}) {
  const { addItem } = useCart();
  const configuration = useProductConfiguration(products);
  const [quantity, setQuantity] = useState(1);
  const [drafts, setDrafts] = useState<DesignDraft[]>([createDesignDraft(0)]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    setDrafts((current) =>
      Array.from(
        { length: quantity },
        (_, index) => current[index] ?? createDesignDraft(index),
      ),
    );
  }, [quantity]);

  function updateDraft(index: number, changes: Partial<DesignDraft>) {
    setDrafts((current) =>
      current.map((draft, draftIndex) =>
        draftIndex === index ? { ...draft, ...changes } : draft,
      ),
    );
  }

  async function selectUpload(
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageDataUrl = await fileAsDataUrl(file);
    const dimensions = await imageDimensions(imageDataUrl);
    updateDraft(index, {
      imageDataUrl,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
      imageMetadata: {
        fileName: file.name,
        mimeType: file.type || "image/unknown",
        fileSizeBytes: file.size,
        ...dimensions,
      },
    });
  }

  async function addToCart() {
    if (!drafts.every((draft) => draft.imageDataUrl && draft.croppedAreaPixels))
      return;
    const product = configuration.selectedProduct;
    const designs = await Promise.all(
      drafts.map(async (draft) => {
        const originalImageDataUrl = draft.imageDataUrl!;
        const imageDataUrl = await getCroppedImg(
          originalImageDataUrl,
          draft.croppedAreaPixels,
          draft.orientation,
        );
        const zoomedDimensions = await imageDimensions(imageDataUrl);
        return {
          orientation: draft.orientation,
          imageDataUrl,
          originalImageDataUrl,
          cropArea: draft.croppedAreaPixels!,
          zoom: draft.zoom,
          fileName: draft.imageMetadata?.fileName,
          mimeType: draft.imageMetadata?.mimeType,
          fileSizeBytes: draft.imageMetadata?.fileSizeBytes,
          imageWidth: zoomedDimensions.imageWidth,
          imageHeight: zoomedDimensions.imageHeight,
          originalImageWidth: draft.imageMetadata?.imageWidth,
          originalImageHeight: draft.imageMetadata?.imageHeight,
        };
      }),
    );
    addItem({
      sku: product.sku,
      frameImageSku: product.imageSku,
      productName: subcategory.englishName,
      type: configuration.selectedType,
      size: product.size,
      unitPrice: product.price,
      quantity,
      color: product.color,
      craftsmanship: product.craftsmanship,
      photoIncluded: product.photoIncluded,
      material: product.material,
      designs,
    });
    setIsModalOpen(false);
    setIsPreviewOpen(false);
  }

  return (
    <section className="shop-product-detail">
      <ProductMediaGallery
        subcategoryKey={subcategory.key}
        productName={subcategory.englishName}
        imageSku={configuration.selectedProduct.imageSku}
      />
      <ProductConfigurator
        name={subcategory.englishName}
        price={configuration.selectedProduct.price}
        types={configuration.types}
        selectedType={configuration.selectedType}
        selectedSku={configuration.selectedSku}
        products={configuration.selectedTypeProducts}
        quantity={quantity}
        onTypeChange={configuration.chooseType}
        onSkuChange={configuration.setSelectedSku}
        onQuantityChange={setQuantity}
        onUpload={() => setIsModalOpen(true)}
      />
      <ProductDetails
        product={configuration.selectedProduct}
        fallbackName={subcategory.englishName}
      />
      <ProductInformation
        displayTypes={configuration.types}
        isGalleryWoodenFrame={subcategory.categoryKey === "gallery"}
      />
      {isModalOpen && (
        <DesignUploadModal
          drafts={drafts}
          productSize={configuration.selectedProduct.size}
          total={configuration.selectedProduct.price * quantity}
          onClose={() => setIsModalOpen(false)}
          onUpload={selectUpload}
          onOrientationChange={(index, orientation: Orientation) =>
            updateDraft(index, {
              orientation,
              crop: { x: 0, y: 0 },
              zoom: 1,
              croppedAreaPixels: null,
            })
          }
          onDraftChange={updateDraft}
          onAddToCart={addToCart}
          onOpenPreview={() => setIsPreviewOpen(true)}
        />
      )}
      <FrameMockupPreview
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        drafts={drafts}
        subcategoryKey={subcategory.key}
        productName={subcategory.englishName}
        onAddToCart={addToCart}
        isReadyToAddToCart={drafts.every(
          (d) => d.imageDataUrl && d.croppedAreaPixels,
        )}
      />
    </section>
  );
}
