import { PrintableBussinessDocument } from "../../_components/printable-business-document";
import { z } from "zod";

import type { PageProps } from "@/types";
import { createBusinessDocumentSchema } from "@/schemas";
import { BUSINESS_DOCUMENT_KINDS } from "@/configs";

const previewBussinessDocumentSchema = createBusinessDocumentSchema.extend({
  issueDate: z
    .string()
    .optional()
    .transform((data) => (data ? new Date(data) : new Date())),
  dueDate: z
    .string()
    .optional()
    .transform((data) => (data ? new Date(data) : new Date())),
  products: z
    .string()
    .optional()
    .transform((data) => (data ? JSON.parse(data) : [])),
  kind: z.enum(BUSINESS_DOCUMENT_KINDS),
  userId: z
    .string()
    .optional()
    .transform((data) => +(data ?? 0)),
});

export default async function Page({ searchParams = {} }: PageProps) {
  const parsedResult = await previewBussinessDocumentSchema.safeParseAsync(
    searchParams
  );

  if (parsedResult.success) {
    return <PrintableBussinessDocument document={parsedResult.data} />;
  }

  return <PrintableBussinessDocument document={{}} />;
}
