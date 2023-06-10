"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db, quotation } from "@/db";
import type { Quotation } from "@/types";
import { calculateProductsPriceData } from "@/services/calculate-products-price-data";

export async function upsertQuotation(
  newQuotation: Quotation | Omit<Quotation, "id">
) {
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
    .returning()
    .then(() => revalidatePath("/quotations"));
}

export async function deleteQuotation(id: Quotation["id"]) {
  return db
    .delete(quotation)
    .where(eq(quotation.id, id))
    .then(() => revalidatePath("/quotations"));
}
