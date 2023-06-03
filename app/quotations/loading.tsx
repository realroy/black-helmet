import { TableQuotations } from "./_components/TableQuotations";
import { Button } from "@/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Loading({ params }: { params: { no: string } }) {
  return (
    <main className="mx-auto max-w-[1024px] p-4">
      <div className="flex justify-between">
        <h1 className="text-4xl">Quotations</h1>
        <Link href={'/quotations/new'}>
          <Button icon={<Plus />}>New</Button>
        </Link>
      </div>
      <TableQuotations quotations={[]} />
    </main>
  );
}

