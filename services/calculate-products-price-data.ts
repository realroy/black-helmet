import { QuotationProduct } from "@/types";

export function calculateProductsPriceData(
  products: QuotationProduct[],
  withholdingTax: number
) {
  const total = products.reduce(
    (acc, { quantity = 0, unitPrice = 0 }) => acc + quantity * unitPrice,
    0
  );

  const amount = total * (1 - withholdingTax) ?? 0;

  return {
    total,
    grandTotal: 0,
    withholdingTax,
    amount,
  };
}
