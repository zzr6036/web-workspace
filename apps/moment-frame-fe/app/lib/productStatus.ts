/**
 * Stable product-status keys for catalog data and future localized labels.
 * Keep UI copy outside the key so translations can map each status consistently.
 */
export enum ProductStatusKey {
  ReadyStock = "ready-stock",
  MadeToOrder = "made-to-order",
  PreOrder = "pre-order",
  OutOfStock = "out-of-stock",
  SoldOut = "sold-out",
  ComingSoon = "coming-soon",
  Unavailable = "unavailable",
}

export type ProductStatusValue = `${ProductStatusKey}`;

export type ProductStatusOption = {
  key: ProductStatusKey;
  label: string;
};

export const productStatusOptions: readonly ProductStatusOption[] = [
  { key: ProductStatusKey.ReadyStock, label: "Ready Stock" },
  { key: ProductStatusKey.MadeToOrder, label: "Made to Order" },
  { key: ProductStatusKey.PreOrder, label: "Pre-Order" },
  { key: ProductStatusKey.OutOfStock, label: "Out of Stock" },
  { key: ProductStatusKey.SoldOut, label: "Sold Out" },
  { key: ProductStatusKey.ComingSoon, label: "Coming Soon" },
  { key: ProductStatusKey.Unavailable, label: "Unavailable" },
];

export const productStatusByKey = Object.fromEntries(
  productStatusOptions.map((status) => [status.key, status]),
) as Record<ProductStatusKey, ProductStatusOption>;
