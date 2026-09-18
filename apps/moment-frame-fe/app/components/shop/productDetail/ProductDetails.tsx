import { ShopProduct } from "../../../lib/shopProductData";

export function ProductDetails({
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
