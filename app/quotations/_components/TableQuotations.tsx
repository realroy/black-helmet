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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/dropdown-menu";
import { useRouter } from "next/navigation";
import { Loader2, MoreVerticalIcon, Trash } from "lucide-react";
import { useTransition } from "react";
import { deleteQuotation } from "../_actions";

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
  const [isDeletePending, startDeleteTransition] = useTransition();

  const navigateToEdit = (documentNo: Quotation["documentNo"]) =>
    router.push(`/quotations/${documentNo}`);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Doc Date</TableHead>
          <TableHead>Doc No.</TableHead>
          <TableHead>Customer / Project</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotations.map((quotation) => (
          <TableRow key={quotation.id} className="cursor-pointer">
            <TableCell
              className="font-medium"
              onClick={() => navigateToEdit(quotation.documentNo)}
            >
              {quotation.createdAt.toLocaleDateString("th")}
            </TableCell>
            <TableCell onClick={() => navigateToEdit(quotation.documentNo)}>
              {quotation.documentNo}
            </TableCell>
            <TableCell onClick={() => navigateToEdit(quotation.documentNo)}>
              <p>{quotation.customerName}</p>
              <p className="text-sm text-muted">{quotation.projectName}</p>
            </TableCell>
            <TableCell
              onClick={() => navigateToEdit(quotation.documentNo)}
              className="text-right"
            >
              {quotation.paymentAmount}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVerticalIcon className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();

                      startDeleteTransition(() => {
                        deleteQuotation(quotation.id);
                      });
                    }}
                    disabled={isDeletePending}
                  >
                    {isDeletePending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4 mr-2" />
                    )}
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
