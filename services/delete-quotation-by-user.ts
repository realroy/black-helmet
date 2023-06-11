import { db, quotation } from "@/db";
import { and, eq } from "drizzle-orm";

import type { Quotation, User } from "@/types";

export type DeleteQuotationByUserInput = {
  quotationId: Quotation["id"];
  userId: User["id"];
};

export function deleteQuotationByUser({
  quotationId,
  userId,
}: DeleteQuotationByUserInput) {
  return db
    .delete(quotation)
    .where(and(eq(quotation.id, quotationId), eq(quotation.userId, userId)))
    .returning({ id: quotation.id })
    .execute();
}
