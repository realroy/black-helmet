import { businessDocuments, db } from "@/db";
import { calculateProductsPriceData } from "./calculate-products-price-data";

import type { CreateBusinessDocument, UpdateBusinessDocument } from "@/types";

export type UpsertBusinessDocumentByUserInput =
  | CreateBusinessDocument
  | UpdateBusinessDocument;

export async function upsertBusinessDocumentByUser(
  newBusinessDocument: UpsertBusinessDocumentByUserInput
) {
  const products = newBusinessDocument.products ?? [];
  const withholdingTax = +(newBusinessDocument.withholdingTax ?? 0);

  const { total, amount } = calculateProductsPriceData(
    products,
    withholdingTax
  );

  newBusinessDocument.subTotal = total.toFixed(2);
  newBusinessDocument.grandTotal = total.toFixed(2);
  newBusinessDocument.paymentAmount = amount.toFixed(2);

  const businessDocument = await db
    .insert(businessDocuments)
    .values(newBusinessDocument)
    .onConflictDoUpdate({
      target: [businessDocuments.id],
      set: newBusinessDocument,
    })
    .returning();

  return businessDocument;
}
