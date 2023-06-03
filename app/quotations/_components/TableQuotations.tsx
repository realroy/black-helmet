"use client";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/table";
import type { Quotation } from "@/types";
import { useRouter } from "next/navigation";

export type TableQuotationsProps = {
  quotations: Pick<
    Quotation,
    | "createdAt"
    | "documentNo"
    | "id"
    | "customerName"
    | "projectName"
    | "paymentAmount"
  >[];
};

export function TableQuotations({ quotations }: TableQuotationsProps) {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Doc Date</TableHead>
          <TableHead>Doc No.</TableHead>
          <TableHead>Customer / Project</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotations.map((quotation) => (
          <TableRow
            key={quotation.id}
            className="cursor-pointer"
            onClick={() => router.push(`/quotations/${quotation.documentNo}`)}
          >
            <TableCell className="font-medium">
              {quotation.createdAt.toLocaleDateString("th")}
            </TableCell>
            <TableCell>{quotation.documentNo}</TableCell>
            <TableCell>
              <p>{quotation.customerName}</p>
              <p className="text-sm text-muted">{quotation.projectName}</p>
            </TableCell>
            <TableCell className="text-right">
              {quotation.paymentAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
