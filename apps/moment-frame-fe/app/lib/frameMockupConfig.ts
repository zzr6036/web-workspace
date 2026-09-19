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
  "s2-t5": {
    portrait: {
      slideSrc: "/frames/product-slides/s2-t5/slide-01.jpeg",
      corners: [
        [78.7, 23.3], // Top-Left
        [84.1, 77.1], // Top-Right
        [18.9, 82], // Bottom-Right
        [14.2, 26.6], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s2-t5/slide-01.jpeg",
      corners: [
        [14.3, 26.6], // Top-Left
        [78.8, 23.6], // Top-Right
        [84.3, 77], // Bottom-Right
        [18.9, 82], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s2-t6": {
    portrait: {
      slideSrc: "/frames/product-slides/s2-t6/slide-01.png",
      corners: [
        [21.2, 75.2], // Bottom-Left
        [19.2, 23.5], // Top-Left
        [80.9, 22.8], // Top-Right
        [83.9, 71.9], // Bottom-Right

      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s2-t6/slide-01.png",
      corners: [
        [19.2, 23.5], // Top-Left
        [80.9, 22.8], // Top-Right
        [83.9, 71.9], // Bottom-Right
        [21.2, 75.2], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s3-t1": {
    portrait: {
      slideSrc: "/frames/product-slides/s3-t1/slide-05.png",
      corners: [
        [70.3, 8.6], // Top-Left
        [94.8, 9.6], // Top-Right
        [90.6, 48.6], // Bottom-Right
        [66.6, 45.7], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s3-t1/slide-01.png",
      corners: [
        [14.5, 22.6], // Top-Left
        [83.2, 20.7], // Top-Right
        [86.9, 74.2], // Bottom-Right
        [18, 79.4], // Bottom-Left
      ],

      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s3-t2": {
    portrait: {
      slideSrc: "/frames/product-slides/s3-t2/slide-05.png",
      corners: [
        [70.3, 8.6], // Top-Left
        [94.8, 9.6], // Top-Right
        [90.6, 48.6], // Bottom-Right
        [66.6, 45.7], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s3-t2/slide-01.png",
      corners: [
        [14.5, 28.9], // Top-Left
        [82.5, 26.3], // Top-Right
        [86, 76.8], // Bottom-Right
        [17.5, 82.2], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s3-t3": {
    portrait: {
      slideSrc: "/frames/product-slides/s3-t3/slide-01.jpg",
      corners: [
        [34.6, 19.3], // Top-Left
        [75.5, 19.8], // Top-Right
        [78.8, 82.5], // Bottom-Right
        [36.7, 84.8], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s3-t3/slide-02.png",
      corners: [
        [17.8, 22.4], // Top-Left
        [85.8, 24.9], // Top-Right
        [82.3, 78.5], // Bottom-Right
        [14.2, 72.8], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s3-t4": {
    portrait: {
      slideSrc: "/frames/product-slides/s3-t4/slide-01.png",
      corners: [
        [83.2, 22.4], // Top-Right
        [86.7, 72.6], // Bottom-Right
        [16.1, 78], // Bottom-Left
        [12.8, 25], // Top-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s3-t4/slide-01.png",
      corners: [
        [12.8, 25], // Top-Left
        [83.2, 22.4], // Top-Right
        [86.7, 72.6], // Bottom-Right
        [16.1, 78], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s3-t5": {
    portrait: {
      slideSrc: "/frames/product-slides/s3-t5/slide-01.png",
      corners: [
        [85, 26.1], // Top-Right
        [81.5, 78.4], // Bottom-Right
        [13.1, 73.3], // Bottom-Left
        [17.1, 23.1], // Top-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s3-t5/slide-01.png",
      corners: [
        [17.1, 23.1], // Top-Left
        [85, 26.1], // Top-Right
        [81.5, 78.4], // Bottom-Right
        [13.1, 73.3], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t1": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t1/slide-01.png",
      corners: [
        [85.5, 24], // Top-Left
        [85.7, 73.5], // Top-Right
        [13.8, 73.5], // Bottom-Right
        [14, 24.2], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t1/slide-02.png",
      corners: [
        [25, 12.1], // Top-Left
        [75.2, 12.1], // Top-Right
        [75.3, 46.9], // Bottom-Right
        [24.8, 46.9], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t2": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t2/slide-01.png",
      corners: [
        [91.4, 22.4], // Top-Left
        [91.6, 74.5], // Top-Right
        [8.7, 74.3], // Bottom-Right
        [8.7, 22.6], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t2/slide-02.jpeg",
      corners: [
        [11.4, 11], // Top-Left
        [91.4, 10.7], // Top-Right
        [91.4, 60.7], // Bottom-Right
        [11.2, 60.9], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t3": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t3/slide-01.png",
      corners: [
        [90.4, 23.3], // Top-Left
        [90.4, 75], // Top-Right
        [9.6, 74.9], // Bottom-Right
        [9.6, 23.3], // Bottom-Left

      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t3/slide-02.png",
      corners: [
        [13.3, 15.1], // Top-Left
        [86.2, 15.1], // Top-Right
        [86, 61.4], // Bottom-Right
        [13.1, 61.4], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t4": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t4/slide-01.png",
      corners: [
        [90.2, 22.4], // Top-Left
        [90, 74.5], // Top-Right
        [9.8, 74.7], // Bottom-Right
        [10, 22.4], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t4/slide-02.png",
      corners: [
        [16.4, 17.2], // Top-Left
        [83.9, 17], // Top-Right
        [83.7, 60.3], // Bottom-Right
        [16.3, 60.5], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t5": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t5/slide-01.png",
      corners: [
        [90.4, 20.1], // Top-Left
        [90.6, 74.9], // Top-Right
        [9.8, 74.7], // Bottom-Right
        [9.3, 20], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t5/slide-02.png",
      corners: [
        [12.1, 14.2], // Top-Left
        [88.6, 14.2], // Top-Right
        [88.5, 63.7], // Bottom-Right
        [12.6, 63.3], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t6": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t6/slide-01.png",
      corners: [
        [89.7, 20.1], // Top-Left
        [89.7, 78.2], // Top-Right
        [11, 78.2], // Bottom-Right
        [10.7, 20.1], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t6/slide-02.jpeg",
      corners: [
        [18.7, 13.7], // Top-Left
        [93, 13.8], // Top-Right
        [92.8, 60.3], // Bottom-Right
        [18.7, 60.3], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t7": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t7/slide-01.png",
      corners: [
        [89.2, 20], // Top-Left
        [89.3, 77.3], // Top-Right
        [10.7, 77.3], // Bottom-Right
        [10.7, 20.1], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t7/slide-02.png",
      corners: [
        [12.2, 11], // Top-Left
        [89.7, 11], // Top-Right
        [89.7, 60.2], // Bottom-Right
        [12.6, 60.5], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t8": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t8/slide-01.png",
      corners: [
        [90.2, 21], // Top-Left
        [90.4, 74], // Top-Right
        [9.6, 73.8], // Bottom-Right
        [9.6, 21.2], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t8/slide-02.png",
      corners: [
        [10.3, 12.4], // Top-Left
        [88.6, 12.4], // Top-Right
        [88.5, 61.6], // Bottom-Right
        [10, 61.4], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t9": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t9/slide-01.png",
      corners: [
        [88.8, 22.9], // Top-Left
        [88.8, 74], // Top-Right
        [11.2, 74], // Bottom-Right
        [11.2, 22.9], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t9/slide-02.png",
      corners: [
        [11.9, 10.5], // Top-Left
        [88.5, 10.9], // Top-Right
        [88.5, 60.9], // Bottom-Right
        [12.1, 61], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t10": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t10/slide-01.png",
      corners: [
        [90.9, 18.7], // Top-Left
        [90.6, 81.3], // Top-Right
        [9.3, 81], // Bottom-Right
        [8.9, 18.7], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t10/slide-02.png",
      corners: [
        [12.4, 11.4], // Top-Left
        [90.2, 11.4], // Top-Right
        [90.2, 63.3], // Bottom-Right
        [11.9, 63.3], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t11": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t11/slide-01.png",
      corners: [
        [89.2, 23.3], // Top-Left
        [89.3, 77.5], // Top-Right
        [10.8, 77.5], // Bottom-Right
        [10.8, 23.3], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t11/slide-02.jpeg",
      corners: [
        [16.3, 10.3], // Top-Left
        [85, 10.3], // Top-Right
        [84.8, 55.8], // Bottom-Right
        [16.3, 55.6], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t12": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t12/slide-01.png",
      corners: [
        [90.2, 24.3], // Top-Left
        [90, 74.3], // Top-Right
        [9.8, 74.7], // Bottom-Right
        [10, 24], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t12/slide-02.jpeg",
      corners: [
        [16.4, 12.8], // Top-Left
        [90, 12.8], // Top-Right
        [90, 58.1], // Bottom-Right
        [16.6, 58.4], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t13": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t13/slide-01.png",
      corners: [
        [91.1, 19.3], // Top-Left
        [91.1, 72.4], // Top-Right
        [9.1, 72.2], // Bottom-Right
        [9.1, 19.3], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t13/slide-02.png",
      corners: [
        [13.1, 16.5], // Top-Left
        [88.6, 16.6], // Top-Right
        [88.8, 64.4], // Bottom-Right
        [13.1, 64.4], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Landscape overview slide",
    },
  },
  "s4-t14": {
    portrait: {
      slideSrc: "/frames/product-slides/s4-t14/slide-01.png",
      corners: [
        [89.3, 23.5], // Top-Left
        [89, 74.5], // Top-Right
        [11, 74.5], // Bottom-Right
        [10.7, 23.6], // Bottom-Left
      ],
      borderRadius: "0px",
      glareType: "diagonal",
      note: "Tabletop vertical frame on marble table",
    },
    landscape: {
      slideSrc: "/frames/product-slides/s4-t14/slide-02.png",
      corners: [
        [14.5, 15.2], // Top-Left
        [85, 14.9], // Top-Right
        [85.3, 61], // Bottom-Right
        [14.5, 61.2], // Bottom-Left
      ],
      borderRadius: "0px",
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
