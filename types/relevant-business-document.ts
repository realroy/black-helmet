import { relevantBusinessDocuments } from "@/db";

export type RelevantBusinessDocument =
  typeof relevantBusinessDocuments.$inferSelect;

export type CreateRelevantBusinessDocument =
  typeof relevantBusinessDocuments.$inferInsert;

export type UpdateRelevantBusinessDocument = CreateRelevantBusinessDocument;
