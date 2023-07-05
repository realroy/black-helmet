import { businessDocuments, db, quotation } from "@/db";
import { calculateProductsPriceData } from "./calculate-products-price-data";
import type { BusinessDocument } from "@/types";

export type UpsertBusinessDocumentByUserInput = {
  newBusinessDocument: BusinessDocument | Omit<BusinessDocument, "id">;
};

export async function upsertBusinessDocumentByUser({
  newBusinessDocument,
}: UpsertBusinessDocumentByUserInput) {
  const { total, amount } = calculateProductsPriceData(
    newBusinessDocument.products ?? [],
    +newBusinessDocument.withholdingTax
  );

  newBusinessDocument.subTotal = total.toFixed(2);
  newBusinessDocument.grandTotal = total.toFixed(2);
  newBusinessDocument.paymentAmount = amount.toFixed(2);

  return db
    .insert(businessDocuments)
    .values(newBusinessDocument)
    .onConflictDoUpdate({ target: [quotation.id], set: newBusinessDocument })
    .returning();
}
