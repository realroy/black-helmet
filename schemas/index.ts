import { quotation, businessDocuments } from "@/db";
import { createInsertSchema } from "drizzle-zod";

export const updateQuotationSchema = createInsertSchema(quotation).omit({
  updatedAt: true,
  createdAt: true,
});

export const createQuotationSchema = updateQuotationSchema.omit({ id: true });

export const updateBusinessDocumentSchema = createInsertSchema(
  businessDocuments
).omit({
  updatedAt: true,
  createdAt: true,
});

export const createBusinessDocumentSchema = updateBusinessDocumentSchema.omit({
  id: true,
});
