import { getCurrentUser } from "@/app/_utils/get-current-user";
import {
  GenerateDocNoError,
  generateDocNo,
} from "@/services/utils/generate-doc-no";

import type { Session } from "next-auth";
import type { BusinessDocumentKind, CreateBusinessDocument } from "@/types";

export type NewBusinessDocumentByUserInput = {
  kind: BusinessDocumentKind;
};

export async function newBusinessDocumentByUser({
  kind,
}: NewBusinessDocumentByUserInput) {
  const [generateDocNoResponse, getCurrentUserResponse] =
    await Promise.allSettled([generateDocNo(kind), getCurrentUser()]);

  if (generateDocNoResponse.status === "rejected") {
    throw new GenerateDocNoError();
  }

  if (getCurrentUserResponse.status === "rejected") {
    throw new Error("Cannot get current user");
  }

  const currentUser = getCurrentUserResponse.value as NonNullable<
    Session["user"]
  >;

  return {
    documentNo: generateDocNoResponse.value,
    customerName: "",
    customerAddress: "",
    customerZipCode: "",
    customerTaxId: "",
    customerBranch: "",
    issueDate: new Date(),
    dueDate: new Date(),
    projectName: "",
    userId: +currentUser.id,
    products: [],
    subTotal: "0.0",
    grandTotal: "0.0",
    withholdingTax: "0.0",
    paymentAmount: "0.0",
    sellerName: "",
    kind,
  } satisfies CreateBusinessDocument;
}
