import { businessDocuments, db } from "@/db";
import { and, eq } from "drizzle-orm";

import type { BusinessDocument, User } from "@/types";

export type DeleteBusinessDocumentByUserInput = {
  businessDocumentId: BusinessDocument["id"];
  userId: User["id"];
};

export function deleteBusinessDocumentByUser({
  businessDocumentId,
  userId,
}: DeleteBusinessDocumentByUserInput) {
  return db
    .delete(businessDocuments)
    .where(
      and(
        eq(businessDocuments.id, businessDocumentId),
        eq(businessDocuments.userId, userId)
      )
    )
    .returning({ id: businessDocuments.id })
    .execute();
}
