"use client";

import {
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
import { Plus, X } from "lucide-react";

import {
  Table,
  TableCell,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/table";
import { Button } from "@/components/button";
import { FormInput } from "@/components/form-input";
import { formatCurrency } from "@/app/_utils";

import type { CreateBusinessDocument, UpdateBusinessDocument } from "@/types";

export type TableBusinessDocumentProductsProps = {
  isLoading?: boolean;
};

export function TableBusinessDocumentProducts({
  isLoading = false,
}: TableBusinessDocumentProductsProps) {
  const { control } = useFormContext<
    CreateBusinessDocument | UpdateBusinessDocument
  >();

  const {
    fields: productsFields = [],
    append,
    remove,
  } = useFieldArray({
    control,
    name: "products",
  });

  const formState = useFormState();

  return (
    <section>
      <Table className="w-full p-4">
        <TableHeader>
          <TableRow>
            <TableHead>ลำดับ</TableHead>
            <TableHead>ชื่อสินค้า / รายละเอียด</TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>หน่วย</TableHead>
            <TableHead>ราคาต่อหน่วย</TableHead>
            <TableHead>ราคารวม</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsFields.map((product, index) => (
            <Row
              {...product}
              index={index}
              key={product.id}
              isLoading={isLoading}
              onDelete={() => remove(index)}
            />
          ))}
        </TableBody>
      </Table>
      <div className="py-2">
        <Button
          variant="outline"
          type="button"
          icon={<Plus />}
          isLoading={isLoading || formState.isSubmitting || formState.isLoading}
          onClick={(e) => {
            e.preventDefault();

            append({
              name: "",
              quantity: 1,
              unit: "",
              unitPrice: 0,
            });
          }}
        >
          Add
        </Button>
      </div>
    </section>
  );
}

type RowProps = {
  index: number;
  onDelete: () => void;
  isLoading?: boolean;
};

function Row({ index, onDelete, isLoading = false }: RowProps) {
  const quantity = useWatch({
    name: `products.${index}.quantity`,
    defaultValue: 0,
  });

  const unitPrice = useWatch({
    name: `products.${index}.unitPrice`,
    defaultValue: 0,
  });

  const total = formatCurrency(quantity * unitPrice);

  return (
    <TableRow className="py-12">
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <FormInput
          type="text"
          name={`products.${index}.name`}
          placeholder="ชื่อสินค้า / รายละเอียด"
          isLoading={isLoading}
        />
      </TableCell>
      <TableCell>
        <FormInput
          type="text"
          name={`products.${index}.quantity`}
          pattern="\d+"
          required
          placeholder="จำนวน"
          isLoading={isLoading}
        />
      </TableCell>
      <TableCell>
        <FormInput
          type="text"
          name={`products.${index}.unit`}
          placeholder="หน่วย"
          isLoading={isLoading}
        />
      </TableCell>
      <TableCell>
        <FormInput
          type="text"
          pattern="\d+"
          name={`products.${index}.unitPrice`}
          placeholder="ราคาต่อหน่วย"
          isLoading={isLoading}
        />
      </TableCell>
      <TableCell>{total}</TableCell>
      <TableCell>
        <button
          title="ลบ"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}
