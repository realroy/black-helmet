import { InferModel } from "drizzle-orm";

import { z } from "zod";

import { createQuotationSchema, updateQuotationSchema } from "@/schemas";
import { quotation, user } from "@/db";

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
