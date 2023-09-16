"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

import {
  upsertBusinessDocumentByUser,
  deleteBusinessDocumentByUser,
} from "@/services";
import type {
  UpsertBusinessDocumentByUserInput,
  DeleteBusinessDocumentByUserInput,
} from "@/services";
import { BusinessDocumentKind } from "@/types";

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

export async function upsertBusinessDocumentAction(
  input: UpsertBusinessDocumentByUserInput
) {
  return upsertBusinessDocumentByUser(input).then(
    reinvalidateBusinessDocument(input.kind)
  );
}

export async function deleteBusinessDocumentAction(
  input: DeleteBusinessDocumentByUserInput & { kind: BusinessDocumentKind }
) {
  return deleteBusinessDocumentByUser(input).then(
    reinvalidateBusinessDocument(input.kind)
  );
}
