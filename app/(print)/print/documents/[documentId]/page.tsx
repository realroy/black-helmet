import { get } from "http";
import { PrintableBussinessDocument } from "../../_components/printable-business-document";

import type { PageProps } from "@/types";
import { getBusinessDocumentById } from "@/repositories";

export default async function Page({
  params: { documentId },
}: PageProps<{ documentId: string }>) {
  const document = await getBusinessDocumentById(+documentId);

  return <PrintableBussinessDocument document={document} />;
}
