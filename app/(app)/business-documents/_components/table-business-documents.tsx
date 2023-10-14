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
import { Skeleton } from "@/components/skeleton";

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
  isLoading?: boolean;
};

export function TableBusinessDocuments({
  businessDocuments,
  isLoading,
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
          <TableHead className="text-right">สถานะ</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <>
            <TableBusinessDocumentRowSkeleton />
            <TableBusinessDocumentRowSkeleton />
            <TableBusinessDocumentRowSkeleton />
            <TableBusinessDocumentRowSkeleton />
            <TableBusinessDocumentRowSkeleton />
          </>
        ) : (
          businessDocuments.map((businessDocument) => (
            <TableBusinessDocumentRow
              key={businessDocument.id}
              isLoading={isDeletePending}
              businessDocument={businessDocument}
              onClick={() => navigateToEdit(businessDocument)}
              onDelete={() => {
                startDeleteTransition(() => {
                  deleteBusinessDocumentAction({
                    businessDocumentId: businessDocument.id,
                    userId: businessDocument.userId,
                    kind: businessDocument.kind,
                  });
                });
              }}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}

function TableBusinessDocumentRowSkeleton() {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-[68px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[340px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[322.445px] mb-2" />
        <Skeleton className="h-4 w-[322.445px]" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-4 w-[222.859px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[16px]" />
      </TableCell>
    </TableRow>
  );
}

type TableBusinessDocumentRowProps = {
  onClick: () => void;
  onDelete: () => void;
  businessDocument: TableBusinessDocumentsProps["businessDocuments"][number];
  isLoading: boolean;
};

function TableBusinessDocumentRow({
  businessDocument,
  isLoading,
  onDelete,
  onClick,
}: TableBusinessDocumentRowProps) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="font-medium" onClick={onClick}>
        {businessDocument.createdAt.toLocaleDateString("th")}
      </TableCell>
      <TableCell onClick={onClick}>{businessDocument.documentNo}</TableCell>
      <TableCell onClick={onClick}>
        <p>{businessDocument.customerName}</p>
        <p className="text-sm text-slate-500">{businessDocument.projectName}</p>
      </TableCell>
      <TableCell onClick={onClick} className="text-right">
        {formatCurrency(+businessDocument.paymentAmount)}
      </TableCell>
      <TableCell onClick={onClick} className="text-right">
        {"yeah"}
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
                onDelete();
              }}
              disabled={isLoading}
            >
              {isLoading ? (
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
}
