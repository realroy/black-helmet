import { businessDocuments, db } from "@/db";
import { UnauthorizedError } from "@/exceptions";

import type { User, Quotation } from "@/types";

export type RejectQuotationByUserInput = {
  quotation: Quotation;
  userId: User["id"];
};

export async function rejectQuotationByUser(input: RejectQuotationByUserInput) {
  if (input.quotation.kind !== "QUOTATION") {
    throw new Error("Invalid business document kind");
  }

  if (input.quotation.userId !== input.userId) {
    throw new UnauthorizedError();
  }

  input.quotation.status = "REJECTED";

  const updatedQuotation = await db
    .update(businessDocuments)
    .set({
      status: "REJECTED",
    })
    .returning();

  return updatedQuotation;
}
