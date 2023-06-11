"use server";

import { revalidatePath } from "next/cache";

import {
  type DeleteQuotationByUserInput,
  deleteQuotationByUser,
} from "@/services/delete-quotation-by-user";
import {
  type UpsertQuotationByUserInput,
  upsertQuotationByUser,
} from "@/services/upsert-quotation-by-user";
import { getCurrentUser } from "../_utils/get-current-user";

function reinvalidateQuotations() {
  return revalidatePath("/quotations");
}

function hasId<T, TId = number>(obj: T): obj is T & { id: TId } {
  return true;
}

export async function upsertQuotationAction(input: UpsertQuotationByUserInput) {
  return upsertQuotationByUser(input).then(reinvalidateQuotations);
}

export async function deleteQuotationAction(input: DeleteQuotationByUserInput) {
  return deleteQuotationByUser(input).then(reinvalidateQuotations);
}
