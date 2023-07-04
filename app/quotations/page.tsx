import { db, quotation } from "@/db";
import { desc } from "drizzle-orm";

import { TableQuotations } from "./_components/TableQuotations";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: { no: string } }) {
  const quotations = await db
    .select({
      documentNo: quotation.documentNo,
      id: quotation.id,
      createdAt: quotation.createdAt,
      paymentAmount: quotation.paymentAmount,
      customerName: quotation.customerName,
      projectName: quotation.projectName,
    })
    .from(quotation)
    .orderBy(desc(quotation.documentNo))
    .limit(10);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl">ใบแจ้งหนี้</h1>
        <Link href={"/quotations/new"}>
          <Button icon={<Plus />}>สร้าง</Button>
        </Link>
      </div>
      <TableQuotations quotations={quotations} />
    </>
  );
}
