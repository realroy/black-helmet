"use server";

import { db, quotation } from "@/db";
import { desc } from "drizzle-orm";

export async function generateDocNo(abrv: "QT" | "INV") {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const date = `${year}${month.toString().padStart(2, "0")}${day
    .toString()
    .padStart(2, "0")}`;

  let id;
  if (abrv === "QT") {
    const [rawQuotation] = await db
      .select({ id: quotation.id })
      .from(quotation)
      .orderBy(desc(quotation.id))
      .limit(1);

    id = rawQuotation?.id.toString().padStart(4, "0") ?? "0001";
  }
  const result = `${abrv}${date}${id}`;

  return result;
}
