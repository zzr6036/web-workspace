import { jsPDF } from "jspdf";
import type { CartItem } from "../components/cart/CartProvider";
import {
  createQuoteOrderId,
  fetchImageAsDataUrl,
  fitImage,
} from "./quote/quotePdfUtils";

type QuoteOptions = {
  recipientName: string;
  contact: string;
  email: string;
  deliveryAddress: string;
  deliveryPrice: number;
};

export async function downloadQuotePdf(items: CartItem[], total: number, options: QuoteOptions) {
  const document = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = document.internal.pageSize.getWidth();
  const pageHeight = document.internal.pageSize.getHeight();
  const createdAt = new Date();
  const quoteId = createQuoteOrderId(createdAt);
  const grandTotal = total + options.deliveryPrice;

  try {
    document.addImage(await fetchImageAsDataUrl("/logo_circle.png"), "PNG", 16, 13, 17, 17);
  } catch {
    // The quote remains usable when the brand image cannot be loaded.
  }

  document.setTextColor(45, 27, 95);
  document.setFontSize(21);
  document.text("MomentFrame", 38, 23);
  document.setFontSize(9);
  document.setTextColor(96, 84, 122);
  document.text("Print Your Story. Frame Your Memories.", 38, 29);
  document.setTextColor(45, 27, 95);
  document.setFontSize(25);
  document.text("QUOTE", pageWidth - 16, 23, { align: "right" });
  document.setFontSize(9);
  document.setTextColor(96, 84, 122);
  document.text(quoteId, pageWidth - 16, 29, { align: "right" });
  document.setDrawColor(205, 180, 237);
  document.line(16, 36, pageWidth - 16, 36);

  document.setFillColor(248, 246, 253);
  document.roundedRect(16, 43, pageWidth - 32, 29, 2, 2, "F");
  document.setTextColor(86, 69, 121);
  document.setFontSize(8);
  document.text("DELIVER TO", 21, 51);
  document.setTextColor(40, 29, 71);
  document.setFontSize(10);
  document.text(options.recipientName, 21, 58);
  document.text(options.contact, 21, 63);
  document.text(options.email, 21, 68);
  const addressLines = document.splitTextToSize(options.deliveryAddress, 92);
  document.text(addressLines, 21, 73);
  document.setTextColor(86, 69, 121);
  document.setFontSize(8);
  document.text("QUOTE DATE", 122, 51);
  document.setTextColor(40, 29, 71);
  document.setFontSize(10);
  document.text(createdAt.toLocaleDateString("en-SG"), 122, 58);
  document.setTextColor(86, 69, 121);
  document.setFontSize(8);
  document.text("DELIVERY PRICE", 122, 65);
  document.setTextColor(40, 29, 71);
  document.setFontSize(10);
  document.text(`SGD ${options.deliveryPrice.toFixed(2)}`, 122, 70);

  let y = 84;

  items.forEach((item, index) => {
    if (y > 214) {
      document.addPage();
      y = 22;
    }
    document.setFillColor(252, 251, 255);
    document.roundedRect(16, y, pageWidth - 32, 88, 2, 2, "F");
    const design = item.designs[0];
    if (design?.imageDataUrl) {
      const imageSize = fitImage(design.imageWidth || 1, design.imageHeight || 1, 62, 62);
      document.addImage(design.imageDataUrl, 22 + (62 - imageSize.width) / 2, y + 8 + (62 - imageSize.height) / 2, imageSize.width, imageSize.height);
    }
    document.setTextColor(45, 27, 95);
    document.setFontSize(14);
    document.text(`Frame ${index + 1}`, 92, y + 13);
    document.setFontSize(11);
    document.text(item.productName, 92, y + 20);
    document.setFontSize(9);
    document.setTextColor(66, 51, 97);
    const details = [
      `Size / format: ${item.size}`,
      `Color: ${item.color || "To be confirmed"}`,
      `Price: SGD ${item.unitPrice.toFixed(2)}`,
    ];
    details.forEach((detail, detailIndex) => {
      document.text(detail, 92, y + 29 + detailIndex * 7);
    });
    y += 96;
  });

  if (y > 238) {
    document.addPage();
    y = 22;
  }
  const summaryX = pageWidth - 83;
  y = pageHeight - 68;
  document.setFillColor(45, 27, 95);
  document.roundedRect(summaryX, y, 67, 44, 3, 3, "F");
  document.setTextColor(255, 255, 255);
  document.setFontSize(12);
  document.text("ORDER SUMMARY", summaryX + 6, y + 10);
  document.setFontSize(9);
  document.text(`Frames: ${items.length}`, summaryX + 6, y + 18);
  document.text(`Subtotal: SGD ${total.toFixed(2)}`, summaryX + 6, y + 24);
  document.text(`Delivery: SGD ${options.deliveryPrice.toFixed(2)}`, summaryX + 6, y + 30);
  document.setDrawColor(208, 193, 244);
  document.line(summaryX + 6, y + 34, summaryX + 61, y + 34);
  document.setFontSize(13);
  document.text(`TOTAL: SGD ${grandTotal.toFixed(2)}`, summaryX + 6, y + 40);

  document.setTextColor(96, 84, 122);
  document.setFontSize(9);
  document.text("Print Your Story. Frame Your Memories.", pageWidth / 2, pageHeight - 12, { align: "center" });
  document.save(`MomentFrame-Quote-${quoteId}.pdf`);
}
