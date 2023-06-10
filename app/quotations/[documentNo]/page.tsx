import { db, quotation } from "@/db";
import { eq } from "drizzle-orm";
import { FormQuotation } from "../_components/FormQuotation";

import type { Metadata } from "next";

type Props = {
  params: { documentNo: string };
};

export function generateMetadata({ params: { documentNo } }: Props): Metadata {
  return {
    title: `Edit ${documentNo} | Black Helmet`,
  };
}

export default async function Page({ params: { documentNo } }: Props) {
  const quotations = await db
    .select()
    .from(quotation)
    .where(eq(quotation.documentNo, documentNo))
    .limit(1);

  return (
    <>
      <h1 className="text-4xl">Edit Quotation</h1>
      <h2 className="text-xl text-slate-600 mt-4">{documentNo}</h2>
      <FormQuotation quotation={quotations[0]} />
    </>
  );
}
