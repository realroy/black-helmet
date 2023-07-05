"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

import {
  type DeleteQuotationByUserInput,
  deleteQuotationByUser,
} from "@/services/delete-quotation-by-user";
import {
  type UpsertQuotationByUserInput,
  upsertQuotationByUser,
} from "@/services/upsert-quotation-by-user";

import {
  upsertBusinessDocumentByUser,
  deleteBusinessDocumentByUser,
} from "@/services";
import type {
  UpsertBusinessDocumentByUserInput,
  DeleteBusinessDocumentByUserInput,
} from "@/services";
import { BusinessDocumentKind } from "@/types";

function reinvalidateQuotations() {
  return revalidatePath("/quotations");
}

function reinvalidateBusinessDocument(kind: BusinessDocumentKind) {
  return () =>
    revalidatePath(
      `/business-documents/${kind.toLowerCase().replace("_", "-")}`
    );
}

async function getUser() {
  const token = cookies().get("next-auth.session-token")?.value;
  if (!token) {
    return;
  }

  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  return {
    id: +(decoded?.sub ?? decoded?.uid ?? 0) || undefined,
    email: decoded?.email,
  };
}

export async function upsertQuotationAction(input: UpsertQuotationByUserInput) {
  getUser();
  return upsertQuotationByUser(input).then(reinvalidateQuotations);
}

export async function deleteQuotationAction(input: DeleteQuotationByUserInput) {
  return deleteQuotationByUser(input).then(reinvalidateQuotations);
}

export async function upsertBusinessDocumentAction(
  input: UpsertBusinessDocumentByUserInput
) {
  getUser();
  return upsertBusinessDocumentByUser(input).then(
    reinvalidateBusinessDocument(input.newBusinessDocument.kind)
  );
}

export async function deleteBusinessDocumentAction(
  input: DeleteBusinessDocumentByUserInput & { kind: BusinessDocumentKind }
) {
  return deleteBusinessDocumentByUser(input).then(
    reinvalidateBusinessDocument(input.kind)
  );
}
