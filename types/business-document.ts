import { businessDocuments } from "@/db";
import {
  BUSINESS_DOCUMENT_KINDS,
  BUSINESS_DOCUMENT_KIND_ABBREVIATIONS,
  BUSINESS_DOCUMENT_STATUSES,
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

export type BusinessDocumentStatus =
  (typeof BUSINESS_DOCUMENT_STATUSES)[number];

export type Invoice = BusinessDocument & {
  kind: (typeof BUSINESS_DOCUMENT_KINDS)["1"];
};

export type Quotation = BusinessDocument & {
  kind: (typeof BUSINESS_DOCUMENT_KINDS)["2"];
};

export type Receipt = BusinessDocument & {
  kind: (typeof BUSINESS_DOCUMENT_KINDS)["3"];
};
