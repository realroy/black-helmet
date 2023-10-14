import { createInsertSchema } from "drizzle-zod";

import { businessDocuments } from "@/db";

export const updateBusinessDocumentSchema = createInsertSchema(
  businessDocuments
).omit({
  updatedAt: true,
  createdAt: true,
});

export const createBusinessDocumentSchema = updateBusinessDocumentSchema.omit({
  id: true,
});
