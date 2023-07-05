import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { TableBusinessDocuments } from "../_components/table-business-documents";
import { getBusinessDocuments } from "@/repositories";
import { PaginationQueries } from "@/types";

type Props = {
  params: {};
  query?: PaginationQueries;
};

export default async function Page({ query }: Props) {
  const businessDocuments = await getBusinessDocuments({
    kinds: ["INVOICE"],
    page: query?.page,
    limit: query?.limit,
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl">ใบแจ้งหนี้</h1>
        <Link href={"/business-documents/invoices/new"}>
          <Button icon={<Plus />}>สร้าง</Button>
        </Link>
      </div>
      <TableBusinessDocuments businessDocuments={businessDocuments} />
    </>
  );
}
