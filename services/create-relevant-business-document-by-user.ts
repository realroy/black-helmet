import { businessDocuments, db, relevantBusinessDocuments } from "@/db";

import type { BusinessDocument, User } from "@/types";

export type CreateRelevantBusinessDocumentByUserInput = {
  businessDocument: BusinessDocument;
  targetDocumentNo: BusinessDocument["documentNo"];
  targetKind: BusinessDocument["kind"];
  userId: User["id"];
};

export async function createRelevantBusinessDocumentByUser(
  input: CreateRelevantBusinessDocumentByUserInput
) {
  const {
    id,
    createdAt,
    updatedAt,
    issueDate,
    dueDate,
    ...sourceBusinessDocumentData
  } = input.businessDocument;

  let output: BusinessDocument | undefined;

  await db.transaction(async (tx) => {
    const insertResults = await tx
      .insert(businessDocuments)
      .values({
        ...sourceBusinessDocumentData,
        documentNo: input.targetDocumentNo,
        issueDate: new Date(),
        kind: input.targetKind,
      })
      .returning();

    output = insertResults[0];

    await tx.insert(relevantBusinessDocuments).values({
      userId: input.userId,
      sourceBusinessDocumentId: input.businessDocument.id,
      targetBusinessDocumentId: output.id,
    });

    await tx.insert(relevantBusinessDocuments).values({
      userId: input.userId,
      sourceBusinessDocumentId: output.id,
      targetBusinessDocumentId: input.businessDocument.id,
    });
  });

  return output;
}
