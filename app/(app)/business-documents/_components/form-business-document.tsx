"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Printer, Save } from "lucide-react";

import { Button } from "@/components/button";
import { Form } from "@/components/form";
import { DatePicker } from "@/components/date-picker";
import { FormInput } from "@/components/form-input";
import { useToast } from "@/hooks";
import { isError, formatCurrency } from "@/app/_utils";
import { calculateBusinessDocumentPriceData } from "@/services/calculate-business-document-price-data";

import { upsertBusinessDocumentAction } from "../_actions";

import { TableBusinessDocumentProducts } from "./table-business-document-products";

import { useEffect, type ComponentPropsWithoutRef } from "react";
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

  withholdingTax: z.coerce.number().min(0).default(0),
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
    defaultValues: {
      ...businessDocument,
      products: businessDocument?.products ?? [],
      withholdingTax: +(businessDocument?.withholdingTax ?? "0"),
    },
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    methods.reset({
      ...businessDocument,
      products: businessDocument?.products ?? [],
      withholdingTax: +(businessDocument?.withholdingTax ?? "0"),
    });
  }, [isLoading, methods, businessDocument]);

  const products = methods.watch("products", []) ?? [];
  const withholdingTax = methods.watch("withholdingTax");

  const {
    subTotal: total,
    paymentAmount: amount,
    grandTotal = 0,
  } = calculateBusinessDocumentPriceData({
    products,
    withholdingTax: withholdingTax.toString(),
  });

  const formattedTotal = formatCurrency(+(total ?? 0));
  const formattedWithholdingTax = formatCurrency(
    +(total ?? 0) * (withholdingTax / 100)
  );
  const formattedAmount = formatCurrency(+(amount ?? 0));
  const toast = useToast();

  return (
    <Form {...props} {...methods}>
      <form
        className="pb-[72px] lg:pb-0"
        onSubmit={methods.handleSubmit(async (data) => {
          const newBusinessDocument = {
            ...businessDocument,
            ...data,
            kind,
            userId,
            withholdingTax: data.withholdingTax.toString(),
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
        <div className="flex w-full lg:justify-end fixed lg:relative bottom-0 bg-white py-4">
          <Button
            type="button"
            onClick={() => {
              if (!businessDocument?.id) {
                const values = methods.getValues();

                const serializedValue = {
                  ...values,
                  products: JSON.stringify(values.products),
                  issueDate: values.issueDate.toISOString(),
                  dueDate: values.dueDate.toISOString(),
                  withholdingTax: values.withholdingTax.toString(),
                };

                const urlSearchParams = new URLSearchParams(
                  serializedValue
                ).toString();
                window.open(`/print/documents/preview?${urlSearchParams}`);
              } else {
                window.open(`/print/documents/${businessDocument?.id}`);
              }
            }}
            isLoading={isLoading || methods.formState.isSubmitting}
            variant={"outline"}
            icon={<Printer />}
            className="mr-2"
          >
            พิมพ์
          </Button>
          <Button
            type="submit"
            icon={<Save />}
            isLoading={isLoading || methods.formState.isSubmitting}
          >
            บันทึก
          </Button>
        </div>
        <div className="grid grid-cols-12 lg:gap-x-4">
          <div className="col-span-12 lg:col-span-6">
            <FormInput
              name="customerName"
              label="ชื่อลูกค้า"
              placeholder="ชื่อลูกค้า"
              isLoading={isLoading}
            />

            <fieldset>
              <FormInput
                name="customerAddress"
                label="ที่อยู่ลูกต้า"
                placeholder="ที่อยู่ลูกต้า"
                isLoading={isLoading}
              />

              <FormInput
                name="customerZipCode"
                label="รหัสไปรษณีย์"
                placeholder="รหัสไปรษณีย์"
                pattern="\d{5}"
                maxLength={5}
                isLoading={isLoading}
              />

              <FormInput
                name="customerTaxId"
                label="เลขประจำตัวผู้เสียภาษี"
                placeholder="เลขประจำตัวผู้เสียภาษีลูกค้า"
                pattern="\d{13}"
                maxLength={13}
                minLength={13}
                isLoading={isLoading}
              />

              <FormInput
                name="customerBranch"
                label="สาขา"
                placeholder="สาขา"
                isLoading={isLoading}
              />
            </fieldset>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <DatePicker
              name="issueDate"
              label="วันที่"
              locale="th"
              isLoading={isLoading}
            />
            <DatePicker
              name="dueDate"
              label="ครบกำหนด"
              locale="th"
              isLoading={isLoading}
            />
            <FormInput
              name="sellerName"
              label="พนักงานขาย"
              placeholder="พนักงานขาย"
              isLoading={isLoading}
            />
          </div>
        </div>

        <FormInput
          name="projectName"
          label="โปรเจค"
          placeholder="โปรเจค"
          isLoading={isLoading}
        />

        <div className="py-2">
          <TableBusinessDocumentProducts isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-0 lg:col-span-8"></div>
          <div className="col-span-12 lg:col-span-4 border border-slate-200 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">รวมเป็นเงิน</span>
              <span>{formattedTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium mr-3">หักภาษี ณ ที่จ่าย</span>
                <div className="flex items-center">
                  <FormInput
                    name="withholdingTax"
                    label=""
                    placeholder="0.0"
                    isLoading={isLoading}
                    className="w-14"
                    formItem={{ className: "py-0 space-y-0 flex items-center" }}
                  />
                  <span className="ml-2">%</span>
                </div>
              </div>

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
