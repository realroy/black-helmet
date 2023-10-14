import { eq } from "drizzle-orm";

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

  const { sourceBusinessDocumentNewStatus, targetBusinessDocumentStatus } =
    resolveBusinessDocumentStatuses({
      sourceBusinessDocumentKind: input.businessDocument.kind,
      sourceBusinessDocumentStatus: input.businessDocument.status,
      targetBusinessDocumentKind: input.targetKind,
    });

  await db.transaction(async (tx) => {
    const insertResults = await tx
      .insert(businessDocuments)
      .values({
        ...sourceBusinessDocumentData,
        documentNo: input.targetDocumentNo,
        issueDate: new Date(),
        status: targetBusinessDocumentStatus,
        kind: input.targetKind,
      })
      .returning();

    output = insertResults[0];

    await tx
      .update(businessDocuments)
      .set({
        status: sourceBusinessDocumentNewStatus,
      })
      .where(eq(businessDocuments.id, input.businessDocument.id));

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

function resolveBusinessDocumentStatuses(input: {
  sourceBusinessDocumentKind: BusinessDocument["kind"];
  sourceBusinessDocumentStatus: BusinessDocument["status"];
  targetBusinessDocumentKind: BusinessDocument["kind"];
}): {
  sourceBusinessDocumentNewStatus: BusinessDocument["status"];
  targetBusinessDocumentStatus: BusinessDocument["status"];
} {
  const {
    sourceBusinessDocumentKind,
    sourceBusinessDocumentStatus,
    targetBusinessDocumentKind,
  } = input;

  if (
    sourceBusinessDocumentKind === "QUOTATION" &&
    sourceBusinessDocumentStatus === "PENDING" &&
    targetBusinessDocumentKind === "INVOICE"
  ) {
    return {
      sourceBusinessDocumentNewStatus: "ISSUED",
      targetBusinessDocumentStatus: "PENDING",
    };
  }

  if (
    sourceBusinessDocumentKind === "INVOICE" &&
    sourceBusinessDocumentStatus === "PENDING" &&
    targetBusinessDocumentKind === "RECEIPT"
  ) {
    return {
      sourceBusinessDocumentNewStatus: "RECEIPT_CREATED",
      targetBusinessDocumentStatus: "PENDING",
    };
  }

  throw new Error(
    `Cannot resolve source business document status from source.kind = ${sourceBusinessDocumentKind} and source.status = ${sourceBusinessDocumentStatus} to target.kind ${targetBusinessDocumentKind}`
  );
}
