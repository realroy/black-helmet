import { newBusinessDocumentByUser } from "@/services";

import {
  HeaderBusinessDocument,
  FormBusinessDocument,
} from "../../_components";

export const metadata = {
  title: "สร้างใบแจ้งหนี้ | Black Helmet",
};

export default async function Page() {
  const invoice = await newBusinessDocumentByUser({ kind: "INVOICE" });

  return (
    <>
      <HeaderBusinessDocument
        documentNo={invoice.documentNo}
        title="สร้างใบแจ้งหนี้"
      />
      <FormBusinessDocument
        businessDocument={invoice}
        userId={invoice.userId}
        kind={"INVOICE"}
      />
    </>
  );
}
