import type { CartItem } from "../../lib/cartStore";

const valueOrPending = (value: string) => value || "To be confirmed";

type CartItemCardProps = {
  item: CartItem;
  index: number;
  readonly?: boolean;
  onRemove?: () => void;
};

export function CartItemCard({
  item,
  index,
  readonly,
  onRemove,
}: CartItemCardProps) {
  return (
    <article className="cart-page-item">
      <img
        src={item.designs[0]?.imageDataUrl}
        alt={`Uploaded design ${index + 1}`}
      />
    <div className="cart-page-item-copy">
        <div className="cart-page-item-heading">
          <div>
            <p>Frame {index + 1}</p>
            <h2>{item.productName}</h2>
          </div>
          <div className="cart-page-item-actions">
            {!readonly && (
              <button
                type="button"
                onClick={onRemove}
                aria-label={`Remove frame ${index + 1}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 7h16m-10 4v6m4-6v6M9 7l1-3h4l1 3m-8 0 1 13h8l1-13" />
                </svg>
              </button>
            )}
            <strong>SGD {item.unitPrice.toFixed(2)}</strong>
          </div>
        </div>
        <dl>
          <div><dt>Type</dt><dd>{item.type}</dd></div>
          <div><dt>Size</dt><dd>{item.size}</dd></div>
          <div><dt>Color</dt><dd>{valueOrPending(item.color)}</dd></div>
          <div><dt>Craftsmanship</dt><dd>{valueOrPending(item.craftsmanship)}</dd></div>
          <div><dt>Photo included</dt><dd>{valueOrPending(item.photoIncluded)}</dd></div>
          <div><dt>Material</dt><dd>{valueOrPending(item.material)}</dd></div>
        </dl>
      </div>
    </article>
  );
}
