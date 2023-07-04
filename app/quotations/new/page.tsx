import { ArrowLeftCircleIcon } from "lucide-react";
import { FormQuotation } from "../_components/FormQuotation";
import { newQuotation } from "@/services/new-quotation";
import { HeaderDocument } from "../_components/HeaderQuotation";

export const metadata = {
  title: "สร้างใบแจ้งหนี้ | Black Helmet",
};

export default async function Page() {
  const quotation = await newQuotation();

  return (
    <>
      <HeaderDocument
        documentNo={quotation.documentNo}
        title="สร้างใบแจ้งหนี้"
      />
      <FormQuotation quotation={quotation} />
    </>
  );
}
