"use server";

import { revalidatePath } from "next/cache";

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
