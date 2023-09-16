import { businessDocuments, db } from "@/db";

import { calculateBusinessDocumentPriceData } from "./calculate-business-document-price-data";

import type { CreateBusinessDocument, UpdateBusinessDocument } from "@/types";

export type UpsertBusinessDocumentByUserInput =
  | CreateBusinessDocument
  | UpdateBusinessDocument;

export async function upsertBusinessDocumentByUser(
  newBusinessDocument: UpsertBusinessDocumentByUserInput
) {
  calculateBusinessDocumentPriceData(newBusinessDocument);

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
