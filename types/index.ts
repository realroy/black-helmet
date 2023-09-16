export * from "./auth";

import { InferModel } from "drizzle-orm";

import { z } from "zod";

import {
  createBusinessDocumentSchema,
  createQuotationSchema,
  updateBusinessDocumentSchema,
  updateQuotationSchema,
} from "@/schemas";
import { businessDocuments, quotation, user } from "@/db";

export * from "./auth";
export * from "./business-document";
export * from "./common";

export type Quotation = typeof quotation.$inferInsert;
export type QuotationProduct = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

export type CreateQuotation = z.infer<typeof createQuotationSchema>;
export type UpdateQuotation = z.infer<typeof updateQuotationSchema>;
