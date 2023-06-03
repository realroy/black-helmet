import { db, quotation } from "@/db";
import { desc } from "drizzle-orm";

import { TableQuotations } from "./_components/TableQuotations";

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
    <main className="mx-auto max-w-[1024px]">
      <h1 className="text-4xl">Quotations</h1>
      <TableQuotations quotations={quotations} />
    </main>
  );
}

