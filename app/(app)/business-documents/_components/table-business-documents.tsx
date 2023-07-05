"use client";

import { useRouter } from "next/navigation";
import { Loader2, MoreVerticalIcon, PrinterIcon, Trash } from "lucide-react";
import { useTransition } from "react";
import Link from "next/link";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/dropdown-menu";

import { deleteBusinessDocumentAction } from "../_actions";
import { formatCurrency } from "@/app/_utils";

import type { BusinessDocument } from "@/types";

export type TableBusinessDocumentsProps = {
  businessDocuments: Pick<
    BusinessDocument,
    | "createdAt"
    | "documentNo"
    | "id"
    | "customerName"
    | "projectName"
    | "paymentAmount"
    | "kind"
    | "userId"
  >[];
};

export function TableBusinessDocuments({
  businessDocuments,
}: TableBusinessDocumentsProps) {
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const navigateToEdit = ({
    documentNo,
    kind,
  }: TableBusinessDocumentsProps["businessDocuments"][number]) => {
    const url = `/business-documents/${kind
      .toLowerCase()
      .replaceAll("_", "-")}s/${documentNo}`;

    // @ts-ignore
    router.push(url);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">วันที่</TableHead>
          <TableHead>เลขที่เอกสาร </TableHead>
          <TableHead>ชื่อลูกค้า/ชื่อโปรเจ็ค</TableHead>
          <TableHead className="text-right">ยอดรวมสุทธิ</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businessDocuments.map((businessDocument) => {
          const handleClick = () => navigateToEdit(businessDocument);
          return (
            <TableRow key={businessDocument.id} className="cursor-pointer">
              <TableCell className="font-medium" onClick={handleClick}>
                {businessDocument.createdAt.toLocaleDateString("th")}
              </TableCell>
              <TableCell onClick={handleClick}>
                {businessDocument.documentNo}
              </TableCell>
              <TableCell onClick={handleClick}>
                <p>{businessDocument.customerName}</p>
                <p className="text-sm text-slate-500">
                  {businessDocument.projectName}
                </p>
              </TableCell>
              <TableCell onClick={handleClick} className="text-right">
                {formatCurrency(+businessDocument.paymentAmount)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVerticalIcon className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link
                      href={`/print/documents/${businessDocument.id}`}
                      target="_blank"
                      rel="noreferer"
                    >
                      <DropdownMenuItem className="cursor-pointer">
                        <PrinterIcon className="h-4 w-4 mr-2" />
                        พิมพ์
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();

                        startDeleteTransition(() => {
                          deleteBusinessDocumentAction({
                            businessDocumentId: businessDocument.id,
                            userId: businessDocument.userId,
                            kind: businessDocument.kind,
                          });
                        });
                      }}
                      disabled={isDeletePending}
                    >
                      {isDeletePending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4 mr-2" />
                      )}
                      ลบ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
