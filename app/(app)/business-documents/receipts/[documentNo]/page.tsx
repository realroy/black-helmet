import { and, eq } from "drizzle-orm";

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
    title: `แก้ไขใบเสร็จรับเงิน ${documentNo} | Black Helmet`,
  };
}

export default async function Page({ params: { documentNo } }: Props) {
  const [receipt] = await db
    .select()
    .from(businessDocuments)
    .where(
      and(
        eq(businessDocuments.documentNo, documentNo),
        eq(businessDocuments.kind, "RECEIPTS")
      )
    )
    .limit(1);

  return (
    <>
      <HeaderBusinessDocument
        title="แก้ไขใบเสร็จรับเงิน"
        documentNo={receipt.documentNo}
      />
      <FormBusinessDocument
        businessDocument={receipt}
        userId={receipt.userId}
        kind={"RECEIPTS"}
      />
    </>
  );
}
