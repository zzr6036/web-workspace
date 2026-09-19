import { ShopProduct } from "../../../lib/shopProductData";

type ProductConfiguratorProps = {
  name: string;
  price: number;
  types: string[];
  selectedType: string;
  selectedSku: string;
  products: ShopProduct[];
  quantity: number;
  onTypeChange: (type: string) => void;
  onSkuChange: (sku: string) => void;
  onQuantityChange: (quantity: number) => void;
  onUpload: () => void;
};

export function ProductConfigurator({
  name,
  price,
  types,
  selectedType,
  selectedSku,
  products,
  quantity,
  onTypeChange,
  onSkuChange,
  onQuantityChange,
  onUpload,
}: ProductConfiguratorProps) {
  return (
    <div className="shop-product-copy">
      <h2>{name}</h2>
      <p className="shop-product-price">SGD {price.toFixed(2)}</p>
      <label className="shop-size-select">
        <span>Type</span>
        <select
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value)}
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
          value={selectedSku}
          onChange={(event) => onSkuChange(event.target.value)}
        >
          {products.map((product) => (
            <option value={product.sku} key={product.sku}>
              {product.sizeLabel}
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
            onQuantityChange(
              Math.max(1, Math.min(10, Number(event.target.value) || 1)),
            )
          }
          onBlur={(event) => {
            const next = Number(event.target.value);
            onQuantityChange(
              Number.isInteger(next) && next >= 1 && next <= 10 ? next : 1,
            );
          }}
          inputMode="numeric"
        />
      </label>
      <button className="shop-add-button" type="button" onClick={onUpload}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 15V3m0 0-4 4m4-4 4 4M5 13v6h14v-6" />
        </svg>
        Upload Photo
      </button>
    </div>
  );
}
