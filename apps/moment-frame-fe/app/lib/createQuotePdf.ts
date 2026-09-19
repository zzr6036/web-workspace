import { jsPDF } from "jspdf";
import type { CartItem } from "../components/cart/CartProvider";
import { createQuoteOrderId, fetchImageAsDataUrl, fitImage } from "./quote/quotePdfUtils";

type QuoteOptions = { recipientName: string; contact: string; email: string; deliveryAddress: string; deliveryPrice: number };

const navy = [31, 48, 82] as const;
const ink = [33, 42, 62] as const;
const muted = [94, 108, 136] as const;
const line = [207, 214, 226] as const;
const paper = [247, 249, 253] as const;
const margin = 16;

function valueOrDash(value: string | undefined | null) {
  const text = value?.trim();
  return text || "-";
}

export async function downloadQuotePdf(items: CartItem[], total: number, options: QuoteOptions) {
  const document = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = document.internal.pageSize.getWidth();
  const pageHeight = document.internal.pageSize.getHeight();
  const createdAt = new Date();
  const quoteId = createQuoteOrderId(createdAt);
  const grandTotal = total + options.deliveryPrice;
  const contentWidth = pageWidth - margin * 2;
  const logo = fetchImageAsDataUrl("/logo_circle.png");

  const setTextColor = (color: readonly [number, number, number]) => document.setTextColor(color[0], color[1], color[2]);

  async function drawPageHeader(compact = false) {
    if (!compact) {
      try {
        document.addImage(await logo, "PNG", margin, 12, 14, 14);
      } catch {
        // The quote remains usable when the brand image cannot be loaded.
      }
    }
    setTextColor(navy);
    document.setFont("helvetica", "bold");
    document.setFontSize(compact ? 18 : 21);
    document.text("MomentFrame", compact ? margin : 35, compact ? 19 : 21);
    document.setFont("helvetica", "normal");
    document.setFontSize(8.5);
    setTextColor(muted);
    document.text("Print Your Story. Frame Your Memories.", compact ? margin : 35, compact ? 25 : 27);
    setTextColor(navy);
    document.setFont("helvetica", "bold");
    document.setFontSize(compact ? 20 : 25);
    document.text("QUOTE", pageWidth - margin, compact ? 19 : 21, { align: "right" });
    document.setFontSize(9);
    setTextColor(muted);
    document.text(quoteId, pageWidth - margin, compact ? 25 : 27, { align: "right" });
    document.setDrawColor(213, 157, 41);
    document.line(margin, compact ? 31 : 34, pageWidth - margin, compact ? 31 : 34);
  }

  function drawTableHeader(y: number) {
    const columns = [16, 96, 128, 142, 167, 194];
    document.setFillColor(navy[0], navy[1], navy[2]);
    document.rect(margin, y, contentWidth, 12, "F");
    setTextColor([255, 255, 255]);
    document.setFont("helvetica", "bold");
    document.setFontSize(8.5);
    document.text("DESCRIPTION", columns[0] + 3, y + 7.5);
    document.text("SKU", columns[1] + 3, y + 7.5);
    document.text("QTY", (columns[2] + columns[3]) / 2, y + 7.5, { align: "center" });
    document.text("RATE (SGD)", columns[3] + 3, y + 7.5);
    document.text("AMOUNT (SGD)", columns[4] + 3, y + 7.5);
    return { columns, nextY: y + 12 };
  }

  await drawPageHeader();
  document.setFillColor(paper[0], paper[1], paper[2]);
  document.setDrawColor(line[0], line[1], line[2]);
  document.rect(margin, 43, contentWidth, 38, "FD");
  document.line(113, 43, 113, 81);
  document.setFont("helvetica", "bold");
  document.setFontSize(8.5);
  setTextColor(muted);
  document.text("BILL TO", 20, 51);
  document.text("QUOTE DATE", 117, 51);
  document.text("PAYMENT TERMS", 117, 66);
  document.setFont("helvetica", "normal");
  document.setFontSize(10);
  setTextColor(ink);
  document.text(valueOrDash(options.recipientName), 20, 58);
  document.text(valueOrDash(options.contact), 20, 64);
  document.text(valueOrDash(options.email), 20, 70);
  document.setFontSize(8.5);
  document.text(document.splitTextToSize(valueOrDash(options.deliveryAddress), 86), 20, 76);
  document.setFontSize(10);
  document.text(createdAt.toLocaleDateString("en-SG"), 117, 58);
  document.text("Confirmed via WhatsApp", 117, 73);

  let y = 95;
  document.setFont("helvetica", "bold");
  document.setFontSize(12);
  setTextColor(navy);
  document.text("FRAME SUMMARY", margin, 89);
  let table = drawTableHeader(y);
  y = table.nextY;

  for (const [index, item] of items.entries()) {
    const design = item.designs[0];
    const nameLines = document.splitTextToSize(`Frame ${index + 1} - ${item.productName}`, 74) as string[];
    const detailLines = document.splitTextToSize(`${valueOrDash(item.size)} | ${valueOrDash(item.color)}`, 74) as string[];
    const rowHeight = Math.max(76, 49 + nameLines.length * 4.2 + detailLines.length * 3.8 + 5);
    if (y + rowHeight > pageHeight - 48) {
      document.addPage();
      await drawPageHeader(true);
      y = 41;
      table = drawTableHeader(y);
      y = table.nextY;
    }
    const [descriptionStart, skuStart, qtyStart, rateStart, amountStart, tableEnd] = table.columns;
    document.setDrawColor(line[0], line[1], line[2]);
    document.rect(margin, y, contentWidth, rowHeight, "S");
    for (const column of [skuStart, qtyStart, rateStart, amountStart]) document.line(column, y, column, y + rowHeight);
    if (design?.imageDataUrl) {
      const imageSize = fitImage(design.imageWidth || 1, design.imageHeight || 1, 68, 42);
      document.addImage(design.imageDataUrl, descriptionStart + 3, y + 3 + (42 - imageSize.height) / 2, imageSize.width, imageSize.height);
    } else {
      document.setFont("helvetica", "normal");
      document.setFontSize(11);
      setTextColor(muted);
      document.text("-", descriptionStart + 3, y + 25);
    }
    document.setFont("helvetica", "bold");
    document.setFontSize(9.5);
    setTextColor(ink);
    document.text(nameLines, descriptionStart + 3, y + 50);
    document.setFont("helvetica", "normal");
    document.setFontSize(8);
    setTextColor(muted);
    document.text(detailLines, descriptionStart + 3, y + 50 + nameLines.length * 4.2 + 4);
    document.setFontSize(7.5);
    document.text(valueOrDash(item.sku), skuStart + 3, y + rowHeight / 2 + 1.5);
    document.setFontSize(9);
    setTextColor(ink);
    document.text(String(item.quantity), (qtyStart + rateStart) / 2, y + rowHeight / 2 + 1.5, { align: "center" });
    document.text(item.unitPrice.toFixed(2), rateStart + 21, y + rowHeight / 2 + 1.5, { align: "right" });
    document.text((item.unitPrice * item.quantity).toFixed(2), tableEnd - 3, y + rowHeight / 2 + 1.5, { align: "right" });
    y += rowHeight;
  }

  if (y + 64 > pageHeight - 20) {
    document.addPage();
    await drawPageHeader(true);
    y = 44;
  }
  const summaryStart = pageWidth - margin - 79;
  document.setDrawColor(line[0], line[1], line[2]);
  document.rect(summaryStart, y + 9, 79, 20, "S");
  document.line(summaryStart + 49, y + 9, summaryStart + 49, y + 29);
  document.line(summaryStart, y + 19, summaryStart + 79, y + 19);
  document.setFont("helvetica", "bold");
  document.setFontSize(9);
  setTextColor(muted);
  document.text("Subtotal", summaryStart + 46, y + 15, { align: "right" });
  document.text("Delivery", summaryStart + 46, y + 25, { align: "right" });
  setTextColor(ink);
  document.text(total.toFixed(2), summaryStart + 75, y + 15, { align: "right" });
  document.text(options.deliveryPrice.toFixed(2), summaryStart + 75, y + 25, { align: "right" });
  document.setFillColor(navy[0], navy[1], navy[2]);
  document.rect(summaryStart, y + 29, 79, 13, "F");
  setTextColor([255, 255, 255]);
  document.setFontSize(10);
  document.text("TOTAL QUOTE (SGD)", summaryStart + 46, y + 37.5, { align: "right" });
  document.setFontSize(11);
  document.text(grandTotal.toFixed(2), summaryStart + 75, y + 37.5, { align: "right" });

  const noteY = y + 55;
  document.setFont("helvetica", "bold");
  document.setFontSize(10);
  setTextColor(navy);
  document.text("NOTES", margin, noteY);
  document.setFont("helvetica", "normal");
  document.setFontSize(8.5);
  setTextColor(muted);
  document.text("- This quote is confirmed after we review the details with you on WhatsApp.", margin + 2, noteY + 7);
  document.text("- Production begins after quote and payment confirmation.", margin + 2, noteY + 13);
  document.setDrawColor(line[0], line[1], line[2]);
  document.line(margin, pageHeight - 17, pageWidth - margin, pageHeight - 17);
  document.setFontSize(8);
  document.text("Print Your Story. Frame Your Memories.", pageWidth / 2, pageHeight - 11, { align: "center" });
  document.save(`MomentFrame-Quote-${quoteId}.pdf`);
}
