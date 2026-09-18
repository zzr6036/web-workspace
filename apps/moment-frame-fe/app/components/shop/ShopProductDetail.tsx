"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { useCart } from "../cart/CartProvider";
import { getProductSlides, ProductSlide } from "../../lib/productSlideLists";
import { ShopSubcategory } from "../../lib/shopCatalog";
import { ShopProduct } from "../../lib/shopProductData";

type ShopProductDetailProps = {
  subcategory: ShopSubcategory;
  products: ShopProduct[];
};
type Orientation = "landscape" | "portrait";
type DesignDraft = {
  id: number;
  orientation: Orientation;
  imageDataUrl?: string;
  crop: { x: number; y: number };
  zoom: number;
  croppedAreaPixels: Area | null;
  imageMetadata?: {
    fileName: string;
    mimeType: string;
    fileSizeBytes: number;
    imageWidth: number;
    imageHeight: number;
  };
};

const newDraft = (id: number): DesignDraft => ({
  id,
  orientation: "landscape",
  crop: { x: 0, y: 0 },
  zoom: 1,
  croppedAreaPixels: null,
});

function productType(product: ShopProduct) {
  if (product.type === "Tabletop") return "Tabletop";
  if (product.type === "Wall-mounted") return "Wall Mount";
  return product.type || "Frame";
}

function fileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function imageDimensions(imageDataUrl: string) {
  return new Promise<{ imageWidth: number; imageHeight: number }>(
    (resolve, reject) => {
      const image = new window.Image();
      image.onload = () =>
        resolve({
          imageWidth: image.naturalWidth,
          imageHeight: image.naturalHeight,
        });
      image.onerror = () =>
        reject(new Error("Unable to read image dimensions"));
      image.src = imageDataUrl;
    },
  );
}

function SlideMedia({
  slide,
  alt,
  thumbnail = false,
}: {
  slide: ProductSlide;
  alt: string;
  thumbnail?: boolean;
}) {
  if (slide.mediaType === "video")
    return (
      <video
        src={slide.src}
        muted={thumbnail}
        controls={!thumbnail}
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    );
  return (
    <Image
      src={slide.src}
      alt={alt}
      fill
      sizes={thumbnail ? "64px" : "(max-width: 800px) 88vw, 500px"}
      priority={!thumbnail}
    />
  );
}

function ProductDetails({
  product,
  fallbackName,
}: {
  product: ShopProduct;
  fallbackName: string;
}) {
  return (
    <section
      className="product-details"
      aria-labelledby="product-details-title"
    >
      <h3 id="product-details-title">Product details</h3>
      <dl>
        <div>
          <dt>Name</dt>
          <dd>{product.name || fallbackName}</dd>
        </div>
        <div>
          <dt>Color</dt>
          <dd>{product.color || "To be confirmed"}</dd>
        </div>
        <div>
          <dt>Craftsmanship</dt>
          <dd>{product.craftsmanship || "To be confirmed"}</dd>
        </div>
        <div>
          <dt>Photo included</dt>
          <dd>{product.photoIncluded || "To be confirmed"}</dd>
        </div>
        <div>
          <dt>Material</dt>
          <dd>{product.material || "To be confirmed"}</dd>
        </div>
        <div className="product-details-size">
          <dt>Type</dt>
          <dd>{product.type}</dd>
        </div>
        <div className="product-details-size">
          <dt>Size</dt>
          <dd>{product.size}</dd>
        </div>
        <div className="product-details-suitable">
          <dt>Suitable for</dt>
          <dd>
            High-definition photos · Wedding photos · Baby photos · Family
            portraits · Lifestyle portraits and more
          </dd>
        </div>
      </dl>
    </section>
  );
}

export function ShopProductDetail({
  subcategory,
  products,
}: ShopProductDetailProps) {
  const { addItem } = useCart();
  const types = useMemo(
    () => Array.from(new Set(products.map(productType))),
    [products],
  );
  const defaultProduct = useMemo(
    () =>
      products.reduce((lowest, product) =>
        product.price < lowest.price ? product : lowest,
      ),
    [products],
  );
  const [selectedType, setSelectedType] = useState(productType(defaultProduct));
  const [selectedSku, setSelectedSku] = useState(defaultProduct.sku);
  const [selectedSlide, setSelectedSlide] = useState(
    getProductSlides(subcategory.key)[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [drafts, setDrafts] = useState<DesignDraft[]>([newDraft(0)]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedTypeProducts = products.filter(
    (product) => productType(product) === selectedType,
  );
  const selectedProduct =
    selectedTypeProducts.find((product) => product.sku === selectedSku) ??
    selectedTypeProducts.reduce((lowest, product) =>
      product.price < lowest.price ? product : lowest,
    );
  const slides = getProductSlides(subcategory.key);

  useEffect(() => {
    setDrafts((current) =>
      Array.from(
        { length: quantity },
        (_, index) => current[index] ?? newDraft(index),
      ),
    );
  }, [quantity]);

  function chooseType(type: string) {
    const lowest = products
      .filter((product) => productType(product) === type)
      .reduce((current, product) =>
        product.price < current.price ? product : current,
      );
    setSelectedType(type);
    setSelectedSku(lowest.sku);
  }

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
    if (file) {
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
  }

  function selectOrientation(index: number, orientation: Orientation) {
    updateDraft(index, {
      orientation,
      crop: { x: 0, y: 0 },
      zoom: 1,
      croppedAreaPixels: null,
    });
  }

  function addToCart() {
    if (!drafts.every((draft) => draft.imageDataUrl && draft.croppedAreaPixels))
      return;
    addItem({
      sku: selectedProduct.sku,
      productName: subcategory.englishName,
      type: selectedType,
      size: selectedProduct.size,
      unitPrice: selectedProduct.price,
      quantity,
      color: selectedProduct.color,
      craftsmanship: selectedProduct.craftsmanship,
      photoIncluded: selectedProduct.photoIncluded,
      material: selectedProduct.material,
      designs: drafts.map((draft) => ({
        orientation: draft.orientation,
        imageDataUrl: draft.imageDataUrl!,
        cropArea: draft.croppedAreaPixels!,
        zoom: draft.zoom,
        ...draft.imageMetadata,
      })),
    });
    setIsModalOpen(false);
  }

  return (
    <section className="shop-product-detail">
      <div className="shop-product-media-column">
        <div className="shop-product-images">
          <div
            className="shop-product-rail"
            aria-label={`${subcategory.englishName} product images`}
          >
            {slides.map((slide, index) => (
              <button
                className={`shop-product-thumbnail${selectedSlide.src === slide.src ? " is-active" : ""}`}
                type="button"
                key={slide.src}
                onClick={() => setSelectedSlide(slide)}
                aria-label={`View product slide ${index + 1}`}
              >
                <SlideMedia slide={slide} alt="" thumbnail />
              </button>
            ))}
          </div>
          <div className="shop-product-image">
            <SlideMedia
              slide={selectedSlide}
              alt={`${subcategory.englishName} product image`}
            />
          </div>
        </div>
      </div>
      <div className="shop-product-copy">
        <h2>{subcategory.englishName}</h2>
        <p className="shop-product-price">SGD {selectedProduct.price.toFixed(2)}</p>
        <label className="shop-size-select">
          <span>Type</span>
          <select
            value={selectedType}
            onChange={(event) => chooseType(event.target.value)}
          >
            {types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="shop-size-select">
          <span>Available size</span>
          <select
            value={selectedProduct.sku}
            onChange={(event) => setSelectedSku(event.target.value)}
          >
            {selectedTypeProducts.map((product) => (
              <option value={product.sku} key={product.sku}>
                {product.size}
              </option>
            ))}
          </select>
        </label>
        <label className="shop-quantity">
          <span>Quantity</span>
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(event) =>
              setQuantity(
                Math.max(1, Math.min(10, Number(event.target.value) || 1)),
              )
            }
            onBlur={(event) => {
              const nextQuantity = Number(event.target.value);
              setQuantity(
                Number.isInteger(nextQuantity) &&
                  nextQuantity >= 1 &&
                  nextQuantity <= 10
                  ? nextQuantity
                  : 1,
              );
            }}
            inputMode="numeric"
          />
        </label>
        <button
          className="shop-add-button"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 15V3m0 0-4 4m4-4 4 4M5 13v6h14v-6" />
          </svg>
          Upload Photo
        </button>
        {/* <p className="shop-total-note">
          {quantity} {quantity === 1 ? "panel" : "panels"} · SGD{" "}
          {(selectedProduct.price * quantity).toFixed(2)}
        </p> */}
      </div>
      <ProductDetails
        product={selectedProduct}
        fallbackName={subcategory.englishName}
      />
      {isModalOpen && (
        <div className="upload-modal-backdrop" role="presentation">
          <section
            className="upload-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upload-title"
          >
            <button
              className="upload-modal-close"
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close upload dialog"
            >
              ×
            </button>
            <p className="eyebrow"> Upload Photo</p>
            <h2 id="upload-title">Prepare your photo panels.</h2>
            <p className="upload-intro">
              Choose an orientation and crop one photo for each panel.
            </p>
            <div className="upload-design-list">
              {drafts.map((draft, index) => (
                <article className="upload-design-card" key={draft.id}>
                  <div className="upload-design-heading">
                    <h3>Design {index + 1}</h3>
                    <span>{selectedProduct.size}</span>
                  </div>
                  <div className="orientation-options">
                    <button
                      className={
                        draft.orientation === "landscape" ? "is-active" : ""
                      }
                      type="button"
                      onClick={() => selectOrientation(index, "landscape")}
                    >
                      Landscape
                    </button>
                    <button
                      className={
                        draft.orientation === "portrait" ? "is-active" : ""
                      }
                      type="button"
                      onClick={() => selectOrientation(index, "portrait")}
                    >
                      Portrait
                    </button>
                  </div>
                  {draft.imageDataUrl ? (
                    <div
                      className={`upload-cropper upload-${draft.orientation}`}
                    >
                      <Cropper
                        image={draft.imageDataUrl}
                        crop={draft.crop}
                        zoom={draft.zoom}
                        aspect={
                          draft.orientation === "landscape" ? 4 / 3 : 3 / 4
                        }
                        onCropChange={(crop) => updateDraft(index, { crop })}
                        onZoomChange={(zoom) => updateDraft(index, { zoom })}
                        onCropComplete={(_, croppedAreaPixels) =>
                          updateDraft(index, { croppedAreaPixels })
                        }
                      />
                      <label className="upload-replace">
                        <span>Replace photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => selectUpload(index, event)}
                        />
                      </label>
                    </div>
                  ) : (
                    <label
                      className={`upload-dropzone upload-${draft.orientation}`}
                    >
                      <strong>Upload photo {index + 1}</strong>
                      <span>
                        {draft.orientation === "landscape"
                          ? "Landscape image"
                          : "Portrait image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => selectUpload(index, event)}
                      />
                    </label>
                  )}
                  {draft.imageDataUrl && (
                    <label className="upload-zoom">
                      <span>Zoom</span>
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.05"
                        value={draft.zoom}
                        onChange={(event) =>
                          updateDraft(index, {
                            zoom: Number(event.target.value),
                          })
                        }
                      />
                    </label>
                  )}
                </article>
              ))}
            </div>
            <button
              className="upload-confirm"
              type="button"
              onClick={addToCart}
              disabled={
                !drafts.every(
                  (draft) => draft.imageDataUrl && draft.croppedAreaPixels,
                )
              }
            >
              ADD TO CART · SGD {(selectedProduct.price * quantity).toFixed(2)}
            </button>
          </section>
        </div>
      )}
    </section>
  );
}
