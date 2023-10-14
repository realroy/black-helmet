import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { TableBusinessDocuments } from "../_components/table-business-documents";
import { getBusinessDocuments } from "@/repositories";

import type { PageProps } from "@/types";

export default async function Page({ searchParams }: PageProps) {
  const page = searchParams?.page ?? 1;
  const limit = searchParams?.limit ?? 10;

  const businessDocuments = await getBusinessDocuments({
    kinds: ["RECEIPT"],
    page: +page ?? 1,
    limit: +limit,
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl">ใบเสร็จรับเงิน</h1>
        <Link href={"/business-documents/receipts/new"}>
          <Button icon={<Plus />}>สร้าง</Button>
        </Link>
      </div>
      <TableBusinessDocuments businessDocuments={businessDocuments} />
    </>
  );
}
