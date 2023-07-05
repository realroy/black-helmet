import { eq } from "drizzle-orm";

import { businessDocuments, db } from "@/db";

import {
  FormBusinessDocument,
  HeaderBusinessDocument,
} from "../../_components";

import type { Metadata } from "next";

type Props = {
  params: { documentNo: string };
};

export function generateMetadata({ params: { documentNo } }: Props): Metadata {
  return {
    title: `แก้ไขใบแจ้งหนี้ ${documentNo} | Black Helmet`,
  };
}

export default async function Page({ params: { documentNo } }: Props) {
  const [invoice] = await db
    .select()
    .from(businessDocuments)
    .where(eq(businessDocuments.documentNo, documentNo))
    .limit(1);

  return (
    <>
      <HeaderBusinessDocument
        title="แก้ไขใบแจ้งหนี้"
        documentNo={invoice.documentNo}
      />
      <FormBusinessDocument
        businessDocument={invoice}
        userId={invoice.userId}
        kind={"INVOICE"}
      />
    </>
  );
}
