"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db, quotation } from "@/db";
import type { Quotation } from "@/types";

export async function upsertQuotation(
  newQuotation: Quotation | Omit<Quotation, "id">
) {
  return db
    .insert(quotation)
    .values(newQuotation)
    .onConflictDoUpdate({ target: [quotation.id], set: newQuotation })
    .returning()
    .then(() => revalidatePath("/quotations"));
}

export async function deleteQuotation(id: Quotation["id"]) {
  return db
    .delete(quotation)
    .where(eq(quotation.id, id))
    .then(() => revalidatePath("/quotations"));
}
