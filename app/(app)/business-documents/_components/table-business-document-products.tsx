"use client";

import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
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

export function TableBusinessDocumentProducts() {
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

  return (
    <section>
      <Table className="w-full p-4">
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name / Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Total</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsFields.map((product, index) => (
            <Row
              {...product}
              index={index}
              key={product.id}
              onDelete={() => remove(index)}
            />
          ))}
        </TableBody>
      </Table>
      <div className="py-2">
        <Button
          variant="outline"
          type="button"
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
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
    </section>
  );
}

type RowProps = {
  index: number;
  onDelete: () => void;
};

function Row({ index, onDelete }: RowProps) {
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
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <FormInput
          type="text"
          name={`products.${index}.name`}
          placeholder="Name / Description"
        />
      </TableCell>
      <TableCell>
        <FormInput
          type="text"
          name={`products.${index}.quantity`}
          pattern="\d+"
          required
          placeholder="Quantity"
        />
      </TableCell>
      <TableCell>
        <FormInput
          type="text"
          name={`products.${index}.unit`}
          placeholder="Unit"
        />
      </TableCell>
      <TableCell>
        <FormInput
          type="text"
          pattern="\d+"
          name={`products.${index}.unitPrice`}
          placeholder="Unit Price"
        />
      </TableCell>
      <TableCell>{total}</TableCell>
      <TableCell>
        <button
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
