import type { BusinessDocument } from "@/types";

export function calculateBusinessDocumentPriceData(
  businessDocument: Partial<BusinessDocument>
) {
  const withholdingTax = +(businessDocument.withholdingTax ?? 0) / 100;
  const total =
    businessDocument.products?.reduce(
      (acc, { quantity = 0, unitPrice = 0 }) => acc + quantity * unitPrice,
      0
    ) ?? 0;

  const amount = total * (1 - withholdingTax) ?? 0;

  businessDocument.subTotal = total.toFixed(2);
  businessDocument.grandTotal = total.toFixed(2);
  businessDocument.paymentAmount = amount.toFixed(2);

  return businessDocument;
}
