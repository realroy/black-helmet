import Link from "next/link";
import { Plus } from "lucide-react";

import { getBusinessDocuments } from "@/repositories";
import { Button } from "@/components/button";
import { TableBusinessDocuments } from "../_components/table-business-documents";

type Props = {
  params: {};
  query?: {
    page?: number;
    limit?: number;
  };
};

export default async function Page({
  query: { page = 1, limit = 10 } = {},
}: Props) {
  const businessDocuments = await getBusinessDocuments({
    kinds: ["INVOICE"],
    page: page,
    limit: limit,
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl">ใบแจ้งหนี้</h1>
        <Link href={"/business-documents/quotations/new"}>
          <Button icon={<Plus />}>สร้าง</Button>
        </Link>
      </div>
      <TableBusinessDocuments businessDocuments={businessDocuments} />
    </>
  );
}
