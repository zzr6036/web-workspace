import { FrameCategoryKey } from "./frameCategories";

export type ShopSubcategory = {
  key: string;
  categoryKey: FrameCategoryKey;
  chineseName: string;
  englishName: string;
  imageSku: string;
  sizes: string[];
};

const tabletopAndWallSizes = [
  "7 in Tabletop", "8 in Tabletop", "10 in Tabletop", "12 in Tabletop", "14 in Tabletop",
  "16 in Wall Mount", "18 in Wall Mount", "20 in Wall Mount", "24 in Wall Mount",
  "30 in Wall Mount", "32 in Wall Mount", "36 in Wall Mount", "40 in Wall Mount", "48 in Wall Mount",
];

const woodenFrameSizes = ["6 in", "7 in", "8 in", "10 in", "A4", "A3"];
const galleryFrameSizes = ["24 in Wall Mount", "30 in Wall Mount", "36 in Wall Mount", "40 in Wall Mount", "48 in Wall Mount"];

type SubcategoryInput = Omit<ShopSubcategory, "categoryKey" | "imageSku" | "sizes">;

function getLeadImageSku(key: string) {
  if (key.startsWith("s4-")) return `IMG-${key.toUpperCase()}-24-WALL`;
  if (key.startsWith("s3-")) return `IMG-${key.toUpperCase()}-06-STAND`;
  return `IMG-${key.toUpperCase()}-07-STAND`;
}

const subcategoriesByCategory: Record<FrameCategoryKey, { items: SubcategoryInput[]; sizes: string[] }> = {
  [FrameCategoryKey.Frameless]: {
    sizes: tabletopAndWallSizes,
    items: [{ key: "s1-t1", chineseName: "无边框-圆角", englishName: "Frameless Rounded Corner" }],
  },
  [FrameCategoryKey.Bordered]: {
    sizes: tabletopAndWallSizes,
    items: [
      { key: "s2-t1", chineseName: "白色边框-圆角", englishName: "White Rounded Border" },
      { key: "s2-t2", chineseName: "金色边框-圆角", englishName: "Gold Rounded Border" },
      { key: "s2-t3", chineseName: "银色边框-圆角", englishName: "Silver Rounded Border" },
      { key: "s2-t4", chineseName: "黑色边框-圆角", englishName: "Black Rounded Border" },
      { key: "s2-t5", chineseName: "黑色边框-直角", englishName: "Black Square Corner" },
      { key: "s2-t6", chineseName: "黑色边框-金色", englishName: "Gold Square Corner" },
    ],
  },
  [FrameCategoryKey.Signature]: {
    sizes: woodenFrameSizes,
    items: [
      { key: "s3-t1", chineseName: "实木-复古胡桃色", englishName: "Solid Wood - Vintage Walnut" },
      { key: "s3-t2", chineseName: "实木-暖胡桃色", englishName: "Solid Wood - Warm Walnut" },
      { key: "s3-t3", chineseName: "清新浅麦色", englishName: "Fresh Light Wheat" },
      { key: "s3-t4", chineseName: "焦茶色", englishName: "Roasted Tea" },
      { key: "s3-t5", chineseName: "黑胡桃色", englishName: "Black Walnut" },
    ],
  },
  [FrameCategoryKey.Gallery]: {
    sizes: galleryFrameSizes,
    items: [
      { key: "s4-t1", chineseName: "三秋暖木", englishName: "Autumn Warm Wood" },
      { key: "s4-t2", chineseName: "亚麻灰", englishName: "Linen Grey" },
      { key: "s4-t3", chineseName: "微风雅框", englishName: "Breeze Elegance" },
      { key: "s4-t4", chineseName: "时光印记", englishName: "Time Imprint" },
      { key: "s4-t5", chineseName: "棕木诗韵", englishName: "Walnut Poem" },
      { key: "s4-t6", chineseName: "流砂金棕", englishName: "Golden Sand Walnut" },
      { key: "s4-t7", chineseName: "白月光系", englishName: "Moonlight White" },
      { key: "s4-t8", chineseName: "胡桃木纹", englishName: "Walnut Grain" },
      { key: "s4-t9", chineseName: "臻品银灰", englishName: "Premium Silver Grey" },
      { key: "s4-t10", chineseName: "莫奈窗台", englishName: "Monet Window" },
      { key: "s4-t11", chineseName: "象牙白", englishName: "Ivory White" },
      { key: "s4-t12", chineseName: "鎏金雅框", englishName: "Gilded Elegance" },
      { key: "s4-t13", chineseName: "韶华映框", englishName: "Golden Years Frame" },
      { key: "s4-t14", chineseName: "墨影时光", englishName: "Ink Shadow Time" },
    ],
  },
};

export function getSubcategories(categoryKey: FrameCategoryKey): ShopSubcategory[] {
  const category = subcategoriesByCategory[categoryKey];
  return category.items.map((item) => ({ ...item, imageSku: getLeadImageSku(item.key), categoryKey, sizes: category.sizes }));
}

export function getSubcategory(categoryKey: FrameCategoryKey, subcategoryKey: string) {
  return getSubcategories(categoryKey).find((subcategory) => subcategory.key === subcategoryKey);
}
