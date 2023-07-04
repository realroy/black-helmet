import { db, quotation } from "@/db";
import { eq } from "drizzle-orm";
import { FormQuotation } from "../../_components/FormQuotation";

import type { Metadata } from "next";
import { HeaderDocument } from "../../_components/HeaderQuotation";

type Props = {
  params: { documentNo: string };
};

export function generateMetadata({ params: { documentNo } }: Props): Metadata {
  return {
    title: `แก้ไขใบเสนอราคา ${documentNo} | Black Helmet`,
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
      <HeaderDocument
        title="แก้ไขใบเสนอราคา"
        documentNo={quotations[0].documentNo}
      />
      <FormQuotation quotation={quotations[0]} />
    </>
  );
}
