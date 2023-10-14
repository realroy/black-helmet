import { businessDocuments } from "@/db";
import {
  BUSINESS_DOCUMENT_KINDS,
  BUSINESS_DOCUMENT_KIND_ABBREVIATIONS,
  BUSINESS_STATUSES,
} from "@/configs";

export type BusinessDocumentKind = (typeof BUSINESS_DOCUMENT_KINDS)[number];

export type BusinessDocumentKindAbbreviation =
  (typeof BUSINESS_DOCUMENT_KIND_ABBREVIATIONS)[number];

export type BusinessDocumentProduct = {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
};

export type BusinessDocument = typeof businessDocuments.$inferSelect;

export type CreateBusinessDocument = typeof businessDocuments.$inferInsert;

export type UpdateBusinessDocument = CreateBusinessDocument;

export type BusinessDocumentStatus = (typeof BUSINESS_STATUSES)[number];
