import { desc, eq } from "drizzle-orm";

import { BUSINESS_DOCUMENT_KIND_ABBREVIATIONS_MAP } from "@/configs";
import { businessDocuments, db } from "@/db";
import type { BusinessDocumentKind } from "@/types";

export class GenerateDocNoError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "GenerateDocNoError";
  }
}

export async function generateDocNo(kind: BusinessDocumentKind) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const date = `${year}${month.toString().padStart(2, "0")}${day
    .toString()
    .padStart(2, "0")}`;

  const [rawBusinessDocument] = await db
    .select({ id: businessDocuments.id })
    .from(businessDocuments)
    .where(eq(businessDocuments.kind, kind))
    .orderBy(desc(businessDocuments.id))
    .limit(1);

  const id = rawBusinessDocument?.id.toString().padStart(4, "0") ?? "0001";
  const abbreviation = BUSINESS_DOCUMENT_KIND_ABBREVIATIONS_MAP[kind];
  const result = `${abbreviation}${date}${id}`;

  return result;
}
