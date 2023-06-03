"use server";

import { db, quotation } from "@/db";
import { Quotation } from "@/types";
import { revalidatePath } from "next/cache";

export async function upsertQuotation(newQuotation: Quotation) {
  await db
    .insert(quotation)
    .values(newQuotation)
    .onConflictDoUpdate({ target: [quotation.id], set: newQuotation })
    .returning();

  revalidatePath('/quotations')
}
