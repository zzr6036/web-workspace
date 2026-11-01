export enum FrameCategoryKey {
  Frameless = "frameless",
  Bordered = "bordered",
  Signature = "signature",
  Gallery = "gallery",
  Collage = "collage",
}

export type FrameCategory = {
  key: FrameCategoryKey;
  name: string;
  detail: string;
  image: string;
  alt: string;
};

export const frameCategories: FrameCategory[] = [
  {
    key: FrameCategoryKey.Frameless,
    name: "Classic Frameless Photo Panel",
    detail: "Clean, glossy panels that let your photos take the lead.",
    image: "/frames/categories/classic-frameless-photo-panel.png",
    alt: "A collection of glossy frameless photo panels",
  },
  {
    key: FrameCategoryKey.Bordered,
    name: "Classic Bordered Frame",
    detail: "A polished border that gives every memory a little definition.",
    image: "/frames/categories/classic-bordered-frame.png",
    alt: "Classic bordered photo frames arranged on a wooden table",
  },
  {
    key: FrameCategoryKey.Signature,
    name: "Signature Wooden Frame",
    detail: "Warm natural grain for the photos you return to every day.",
    image: "/frames/categories/signature-wooden-frame.jpg",
    alt: "A signature wooden photo frame with a family portrait",
  },
  {
    key: FrameCategoryKey.Gallery,
    name: "Gallery Wooden Frame",
    detail: "A statement finish for the moments made to be seen.",
    image: "/frames/categories/gallery-wooden-frame.png",
    alt: "An ornate gallery wooden frame above a bed",
  },
  {
    key: FrameCategoryKey.Collage,
    name: "Collage Wooden Frame",
    detail: "Multiple favourite photographs arranged together in one considered wooden frame.",
    image: "/frames/categories/collage-wooden-frame.jpeg",
    alt: "A wooden collage frame displaying multiple photographs",
  },
];

export function getFrameCategory(key: string) {
  return frameCategories.find((category) => category.key === key);
}
