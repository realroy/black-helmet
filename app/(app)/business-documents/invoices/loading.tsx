import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/button";
import { TableBusinessDocuments } from "../_components";

export default async function Loading() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl">ใบแจ้งหนี้</h1>
        <Link href={"/business-documents/quotations/new"}>
          <Button icon={<Plus />}>สร้าง</Button>
        </Link>
      </div>
      <TableBusinessDocuments businessDocuments={[]} />
    </>
  );
}
