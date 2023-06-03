import { db, quotation } from "@/db";
import { eq } from "drizzle-orm";
import { FormQuotation } from "../_components/FormQuotation";

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
      <h1 className="text-4xl">Update Quotation</h1>
      <h2 className="text-xl text-slate-600 mt-4">{documentNo}</h2>
      <FormQuotation quotation={quotations[0]} />
    </>
  );
}
