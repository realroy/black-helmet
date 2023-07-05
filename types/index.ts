import { InferModel } from "drizzle-orm";

import { z } from "zod";

import {
  createBusinessDocumentSchema,
  createQuotationSchema,
  updateBusinessDocumentSchema,
  updateQuotationSchema,
} from "@/schemas";
import { businessDocuments, quotation, user } from "@/db";
import {
  BUSINESS_DOCUMENT_KINDS,
  BUSINESS_DOCUMENT_KIND_ABBREVIATIONS,
} from "@/configs";

export type Quotation = InferModel<typeof quotation>;
export type QuotationProduct = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};
export type CreateQuotation = z.infer<typeof createQuotationSchema>;
export type UpdateQuotation = z.infer<typeof updateQuotationSchema>;

export type User = InferModel<typeof user>;

export type BusinessDocumentKind = (typeof BUSINESS_DOCUMENT_KINDS)[number];
export type BusinessDocumentKindAbbreviation =
  (typeof BUSINESS_DOCUMENT_KIND_ABBREVIATIONS)[number];
export type BusinessDocumentProduct = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};
export type BusinessDocument = InferModel<typeof businessDocuments>;
export type CreateBusinessDocument = z.infer<
  typeof createBusinessDocumentSchema
>;
export type UpdateBusinessDocument = z.infer<
  typeof updateBusinessDocumentSchema
>;

export type PaginationQueries = {
  page?: number;
  limit?: number;
  sortBy?: `${string}-${"ASC" | "DESC"}`;
};
