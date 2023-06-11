import { db, quotation } from "@/db";
import { calculateProductsPriceData } from "./calculate-products-price-data";
import type { Quotation } from "@/types";

export type UpsertQuotationByUserInput = {
  newQuotation: Quotation | Omit<Quotation, "id">;
};

export async function upsertQuotationByUser({
  newQuotation,
}: UpsertQuotationByUserInput) {
  const { total, amount } = calculateProductsPriceData(
    newQuotation.products ?? [],
    +newQuotation.withholdingTax
  );

  newQuotation.subTotal = total.toFixed(2);
  newQuotation.grandTotal = total.toFixed(2);
  newQuotation.paymentAmount = amount.toFixed(2);

  return db
    .insert(quotation)
    .values(newQuotation)
    .onConflictDoUpdate({ target: [quotation.id], set: newQuotation })
    .returning();
}
