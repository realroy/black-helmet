"use client";

import { useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formatCurrency } from "@/app/_utils";

import { TableQuotation } from "./TableQuotation";

import { upsertQuotation } from "../_actions";

import type { ComponentPropsWithoutRef } from "react";
import type { Quotation } from "@/types";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/form";
import { DatePicker } from "@/components/date-picker";
import { Save } from "lucide-react";
import { FormInput } from "@/components/form-input";
import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";

export type FormQuotationProps = ComponentPropsWithoutRef<"form"> & {
  quotation?: Partial<Quotation>;
};

export function FormQuotation({ quotation, ...props }: FormQuotationProps) {
  const [isSubmitTransition, startSubmitTransition] = useTransition();
  const router = useRouter();
  const methods = useForm<Quotation>({ defaultValues: quotation });

  const products = methods.watch("products", []) ?? [];
  const total: number =
    products?.reduce?.(
      (acc, { quantity = 0, unitPrice = 0 }) => acc + quantity * unitPrice,
      0
    ) ?? 0;
  const grandTotal = +(quotation?.grandTotal ?? 0);

  const formattedTotal = formatCurrency(total);
  const withholdingTax = +(quotation?.withholdingTax ?? 0.03);
  const formattedWithholdingTax = `${withholdingTax * 100}%`;
  const amount = total * (1 - withholdingTax);
  const formattedAmount = formatCurrency(amount);
  const toast = useToast();

  useEffect(() => {
    methods.reset(quotation);
  }, [quotation, methods]);

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          startSubmitTransition(async () => {
            try {
              await upsertQuotation({
                ...data,
                ...(quotation && { id: quotation.id }),
              });
              router.replace("/quotations");
            } catch (error) {
              const message = (error as Error).message;
              toast.toast({ title: "Error", description: message });
            }
          });
        })}
      >
        <div className="flex w-full justify-end">
          <Button type="submit" icon={<Save />}>
            Save
          </Button>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <FormInput
              name="customerName"
              label="Customer Name"
              placeholder="Customer Name"
            />

            <fieldset>
              <FormInput
                name="customerAddress"
                label="Customer Address"
                placeholder="Customer Address"
              />

              <FormInput
                name="customerZipCode"
                label="Customer Zip Code"
                placeholder="Zip Code"
                pattern="\d{5}"
                maxLength={5}
              />

              <FormInput
                name="customerTaxId"
                label="Tax ID"
                placeholder="Tax ID"
                pattern="\d{13}"
                maxLength={13}
                minLength={13}
              />

              <FormInput
                name="customerBranch"
                label="Branch"
                placeholder="Branch"
              />
            </fieldset>
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-4">
            <DatePicker name="issueDate" label="Issue Date" />
            <DatePicker name="dueDate" label="Due Date" />
            <FormInput
              name="sellerName"
              label="Seller Name"
              placeholder="Seller Name"
            />
          </div>
        </div>

        {/* <hr className="border-b border-slate-300 py-2" /> */}

        <FormInput
          name="projectName"
          label="Project"
          placeholder="Project Name"
        />

        {/* <FormField
          name={"projectName"}
          control={methods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Input placeholder="Project" {...field} />
              </FormControl>
            </FormItem>
          )}
        /> */}

        <div className="py-2">
          <TableQuotation />
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-8"></div>
          <div className="col-span-4 border border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span>{formattedTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Withholding Tax</span>
              <span>{formattedWithholdingTax}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Amount</span>
              <span>{formattedAmount}</span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
