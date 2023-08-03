import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { TableBusinessDocuments } from "../_components/table-business-documents";
import { getBusinessDocuments } from "@/repositories";

import type { PageProps } from "@/types";

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams?.page ? Number(searchParams.page) : 1;
  const limit = searchParams?.limit ? Number(searchParams.limit) : 10;

  const businessDocuments = await getBusinessDocuments({
    kinds: ["INVOICE"],
    page,
    limit,
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
