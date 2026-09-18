import { QuadCorners } from "./homography";

export type MockupVariant = {
  slideSrc: string;
  corners: QuadCorners; // [TL, TR, BR, BL] in % (0..100)
  borderRadius?: string;
  glareType?: "diagonal" | "top" | "soft" | "none";
  note?: string;
};

export type ProductMockupSpec = {
  portrait: MockupVariant;
  landscape: MockupVariant;
};

/**
 * Registry of calibrated frame mockup perspective mappings per product.
 * Supports distinct slides and 4-corner perspective mappings for Portrait and Landscape.
 */
export const FRAME_MOCKUP_CONFIG: Record<string, ProductMockupSpec> = {
  // Frameless Rounded Corner
  "s1-t1": {
    portrait: {
      slideSrc: "/frames/product-slides/s1-t1/slide-01.png",
      corners: [
        [28.8, 37.6], // Top-Left
        [55.8, 35.5], // Top-Right
        [59.1, 72.9], // Bottom-Right
        [33.2, 79.2], // Bottom-Left
      ],
      borderRadius: "13px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s1-t1/slide-03.png",
      corners: [
        [10.5, 18.8], // Top-Left
        [91.1, 19], // Top-Right
        [91.8, 81], // Bottom-Right
        [9.8, 81.2], // Bottom-Left
      ],
      borderRadius: "8px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  // Classic Bordered Frame - White Rounded Border
  "s2-t1": {
    portrait: {
      slideSrc: "/frames/product-slides/s2-t1/slide-01.png",
      corners: [
        [21.5, 15.0],
        [78.5, 15.0],
        [80.0, 85.0],
        [20.0, 85.0],
      ],
      borderRadius: "18px",
      glareType: "diagonal",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s2-t1/slide-02.png",
      corners: [
        [15.2, 6.8], // Top-Left
        [83.2, 6.8], // Top-Right
        [82.7, 52.8], // Bottom-Right
        [15.2, 53], // Bottom-Left
      ],
      borderRadius: "18px",
      glareType: "diagonal",
    },
  },

  // Classic Bordered Frame - Gold Rounded Border
  "s2-t2": {
    portrait: {
      slideSrc: "/frames/product-slides/s2-t2/slide-02.png",
      corners: [
        [89.3, 26.3], // Top-Left
        [84.1, 90.4], // Top-Right
        [7.5, 81.7], // Bottom-Right
        [15.4, 23.8], // Bottom-Left
      ],
      borderRadius: "52px",
      glareType: "top",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s2-t2/slide-01.png",
      corners: [
        [14.9, 6.3], // Top-Left
        [83.4, 6.5], // Top-Right
        [83.4, 53.4], // Bottom-Right
        [14.7, 53.4], // Bottom-Left
      ],
      borderRadius: "14px",
      glareType: "top",
    },
  },

  // Classic Bordered Frame - Silver Rounded Border
  "s2-t3": {
    portrait: {
      slideSrc: "/frames/product-slides/s2-t3/slide-02.png",
      corners: [
        [25.7, 4.9], // Top-Left
        [83, 4.6], // Top-Right
        [77.4, 97.1], // Bottom-Right
        [19.1, 91.1], // Bottom-Left
      ],
      borderRadius: "57px",
      glareType: "diagonal",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s2-t3/slide-01.png",
      corners: [
        [15.2, 7], // Top-Left
        [83.2, 7], // Top-Right
        [83.4, 53.2], // Bottom-Right
        [15.2, 53.2], // Bottom-Left
      ],
      borderRadius: "18px",
      glareType: "diagonal",
    },
  },
  // Classic Bordered Frame - Black Rounded Border
  "s2-t4": {
    portrait: {
      slideSrc: "/frames/product-slides/s2-t4/slide-02.png",
      corners: [
        [25.2, 18.9], // Top-Left
        [74.7, 15.7], // Top-Right
        [82.2, 82.9], // Bottom-Right
        [30.8, 89], // Bottom-Left
      ],
      borderRadius: "23px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s2-t4/slide-01.png",
      corners: [
        [14.7, 6.5], // Top-Left
        [83.2, 6.6], // Top-Right
        [83.4, 53.5], // Bottom-Right
        [14.9, 53.3], // Bottom-Left
      ],
      borderRadius: "20px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },


};

export const DEFAULT_PRODUCT_SPEC: ProductMockupSpec = {
  portrait: {
    slideSrc: "/frames/product-slides/s2-t4/slide-02.png",
    corners: [
      [26.4, 20.2],
      [74.3, 16.8],
      [81.6, 81.7],
      [30.8, 88.0],
    ],
    borderRadius: "14px 14px 4px 4px",
    glareType: "diagonal",
  },
  landscape: {
    slideSrc: "/frames/product-slides/s2-t4/slide-01.png",
    corners: [
      [20.0, 22.0],
      [80.0, 22.0],
      [82.0, 78.0],
      [18.0, 78.0],
    ],
    borderRadius: "14px",
    glareType: "diagonal",
  },
};

export function getProductMockupSpec(
  subcategoryKey: string,
  orientation: "portrait" | "landscape" = "portrait"
): MockupVariant {
  const productSpec = FRAME_MOCKUP_CONFIG[subcategoryKey] ?? DEFAULT_PRODUCT_SPEC;
  return productSpec[orientation] ?? productSpec.portrait;
}
