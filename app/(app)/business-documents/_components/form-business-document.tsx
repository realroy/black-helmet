"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Printer, Save } from "lucide-react";

import { upsertBusinessDocumentAction } from "../_actions";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { DatePicker } from "@/components/date-picker";
import { FormInput } from "@/components/form-input";
import { useToast } from "@/hooks";
import {
  isError,
  formatCurrency,
  calculateProductsPriceData,
} from "@/app/_utils";

import { TableBusinessDocumentProducts } from "./table-business-document-products";

import type { ComponentPropsWithoutRef } from "react";
import type {
  BusinessDocumentKind,
  CreateBusinessDocument,
  UpdateBusinessDocument,
  User,
} from "@/types";

const schema = z.object({
  customerTaxId: z.string().length(13),
  documentNo: z.string().nonempty(),
  customerName: z.string().nonempty(),
  customerAddress: z.string().nonempty(),
  customerZipCode: z.string().nonempty(),
  customerBranch: z.string().nonempty(),
  issueDate: z.date(),
  dueDate: z.date(),
  projectName: z.string(),
  sellerName: z.string(),
  products: z
    .array(
      z.object({
        name: z.string().nonempty(),
        quantity: z.coerce.number().min(1),
        unit: z.string().nonempty(),
        unitPrice: z.coerce.number(),
      })
    )
    .optional(),
});

type Schema = z.infer<typeof schema>;

export type FormBusinessDocumentProps = ComponentPropsWithoutRef<"form"> & {
  businessDocument?: CreateBusinessDocument | UpdateBusinessDocument;
  userId: User["id"];
  isLoading?: boolean;
  kind: BusinessDocumentKind;
};

export function FormBusinessDocument({
  businessDocument,
  isLoading = false,
  kind,
  userId,
  ...props
}: FormBusinessDocumentProps) {
  const router = useRouter();
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const products = methods.watch("products", []) ?? [];
  const withholdingTax = +(businessDocument?.withholdingTax ?? 0.03);

  const { total, amount } = calculateProductsPriceData(
    products,
    withholdingTax
  );

  const grandTotal = +(businessDocument?.grandTotal ?? 0);

  const formattedTotal = formatCurrency(total);
  const formattedWithholdingTax = `${withholdingTax * 100}%`;
  const formattedAmount = formatCurrency(amount);
  const toast = useToast();

  useEffect(() => {
    // @ts-ignore
    methods.reset(businessDocument);
  }, [businessDocument, methods]);

  return (
    <Form {...props} {...methods}>
      <form
        onSubmit={methods.handleSubmit(async (data) => {
          const newBusinessDocument = {
            ...businessDocument,
            ...data,
            kind,
            userId,
          };

          try {
            await upsertBusinessDocumentAction(newBusinessDocument);
            const url = `/business-documents/${kind
              .toLowerCase()
              .replace("_", "-")}s`;
            // @ts-ignore
            router.replace(url);
          } catch (error) {
            if (isError(error)) {
              toast.toast({ title: "Error", description: error.message });
            }
          }
        })}
      >
        <div className="flex w-full justify-end">
          <Button
            type="button"
            onClick={() => {
              window.open(`/print/documents/${businessDocument?.id}`);
            }}
            variant={"outline"}
            icon={<Printer />}
            className="mr-2"
          >
            Print
          </Button>
          <Button
            type="submit"
            icon={<Save />}
            isLoading={isLoading || methods.formState.isSubmitting}
          >
            Save
          </Button>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <FormInput
              name="customerName"
              label="ชื่อลูกค้า"
              placeholder="ชื่อลูกค้า"
            />

            <fieldset>
              <FormInput
                name="customerAddress"
                label="ที่อยู่ลูกต้า"
                placeholder="ที่อยู่ลูกต้า"
              />

              <FormInput
                name="customerZipCode"
                label="รหัสไปรษณีย์"
                placeholder="รหัสไปรษณีย์"
                pattern="\d{5}"
                maxLength={5}
              />

              <FormInput
                name="customerTaxId"
                label="เลขประจำตัวผู้เสียภาษี"
                placeholder="เลขประจำตัวผู้เสียภาษีลูกค้า"
                pattern="\d{13}"
                maxLength={13}
                minLength={13}
              />

              <FormInput
                name="customerBranch"
                label="สาขา"
                placeholder="สาขา"
              />
            </fieldset>
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-4">
            <DatePicker name="issueDate" label="วันที่" />
            <DatePicker name="dueDate" label="ครบกำหนด" />
            <FormInput
              name="sellerName"
              label="พนักงานขาย"
              placeholder="พนักงานขาย"
            />
          </div>
        </div>

        <FormInput name="projectName" label="โปรเจค" placeholder="โปรเจค" />

        <div className="py-2">
          <TableBusinessDocumentProducts />
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-8"></div>
          <div className="col-span-4 border border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">รวมเป็นเงิน</span>
              <span>{formattedTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">หักภาษี ณ ที่จ่าย</span>
              <span>{formattedWithholdingTax}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">ยอดชำระ</span>
              <span>{formattedAmount}</span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
