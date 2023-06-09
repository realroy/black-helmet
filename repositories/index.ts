import { and, desc, eq, inArray } from "drizzle-orm";

import { businessDocuments, db } from "@/db";
import { getCurrentUser } from "@/app/_utils/get-current-user";
import type { BusinessDocumentKind } from "@/types";

type GetBusinessDocumentsInput = {
  kinds?: BusinessDocumentKind[];
  page?: number;
  limit?: number;
};

export async function getBusinessDocuments({
  kinds,
  page = 1,
  limit = 10,
}: GetBusinessDocumentsInput) {
  const currentUser = await getCurrentUser({ isThrowOnFailure: true });
  const userId = currentUser?.id ?? 0;

  const whereConditions = [eq(businessDocuments.userId, +userId)];

  if (Array.isArray(kinds)) {
    whereConditions.push(inArray(businessDocuments.kind, kinds));
  }

  const queryBuilder = db
    .select({
      documentNo: businessDocuments.documentNo,
      id: businessDocuments.id,
      createdAt: businessDocuments.createdAt,
      paymentAmount: businessDocuments.paymentAmount,
      customerName: businessDocuments.customerName,
      projectName: businessDocuments.projectName,
      userId: businessDocuments.userId,
      kind: businessDocuments.kind,
    })
    .from(businessDocuments)
    .where(and(...whereConditions))
    .orderBy(desc(businessDocuments.documentNo))
    .offset((page - 1) * limit)
    .limit(limit);

  return queryBuilder.execute();
}
