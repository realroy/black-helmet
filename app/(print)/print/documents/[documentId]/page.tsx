import { db, quotation } from "@/db";
import { eq } from "drizzle-orm";

import { PrintableBussinessDocument } from "../../_components/printable-business-document";

type Props = {
  params: { documentId: string };
};

export default async function Page({ params: { documentId } }: Props) {
  const [document] = await db
    .select()
    .from(quotation)
    .where(eq(quotation.id, +documentId))
    .limit(1);

  return <PrintableBussinessDocument document={document} />;
}
