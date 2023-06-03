import { db, quotation } from "@/db";
import { eq } from "drizzle-orm";
import { PrintableQuotation } from "../../_components/PrintableQuotation";

export default async function Page({
  params: { documentNo },
}: {
  params: { documentNo: string };
}) {
  const quotations = await db
    .select()
    .from(quotation)
    .where(eq(quotation.documentNo, documentNo))
    .limit(1);

  return (
    <>
      <PrintableQuotation quotation={quotations[0]} />
    </>
  );
}
