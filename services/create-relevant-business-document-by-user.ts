import { businessDocuments, db, relevantBusinessDocuments } from "@/db";

import type { BusinessDocument, User } from "@/types";

export type CreateRelevantBusinessDocumentByUserInput = {
  businessDocument: BusinessDocument;
  userId: User["id"];
};

export async function createRelevantBusinessDocumentByUser(
  input: CreateRelevantBusinessDocumentByUserInput
) {
  const { id, createdAt, updatedAt, issueDate, ...sourceBusinessDocumentData } =
    input.businessDocument;

  let targetBusinessDocument: BusinessDocument | undefined;

  await db.transaction(async (tx) => {
    const insertResults = await tx
      .insert(businessDocuments)
      .values(sourceBusinessDocumentData)
      .returning();

    targetBusinessDocument = insertResults[0];

    await tx.insert(relevantBusinessDocuments).values({
      userId: input.userId,
      sourceBusinessDocumentId: input.businessDocument.id,
      targetBusinessDocumentId: targetBusinessDocument.id,
    });

    await tx.insert(relevantBusinessDocuments).values({
      userId: input.userId,
      sourceBusinessDocumentId: targetBusinessDocument.id,
      targetBusinessDocumentId: input.businessDocument.id,
    });
  });

  return targetBusinessDocument;
}
