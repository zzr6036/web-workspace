"use client";

import { useMemo, useState } from "react";
import { ShopProduct } from "../../../lib/shopProductData";

export function productType(product: ShopProduct) {
  if (product.type === "Tabletop") return "Tabletop";
  if (product.type === "Wall-mounted") return "Wall Mount";
  return product.type || "Frame";
}

export function useProductConfiguration(products: ShopProduct[]) {
  const defaultProduct = useMemo(() => products.reduce((lowest, product) => product.price < lowest.price ? product : lowest), [products]);
  const types = useMemo(() => Array.from(new Set(products.map(productType))), [products]);
  const [selectedType, setSelectedType] = useState(productType(defaultProduct));
  const [selectedSku, setSelectedSku] = useState(defaultProduct.sku);
  const selectedTypeProducts = products.filter((product) => productType(product) === selectedType);
  const selectedProduct = selectedTypeProducts.find((product) => product.sku === selectedSku) ?? selectedTypeProducts.reduce((lowest, product) => product.price < lowest.price ? product : lowest);

  function chooseType(type: string) {
    const lowest = products.filter((product) => productType(product) === type).reduce((current, product) => product.price < current.price ? product : current);
    setSelectedType(type);
    setSelectedSku(lowest.sku);
  }

  return { selectedProduct, selectedSku, selectedType, selectedTypeProducts, setSelectedSku, chooseType, types };
}
