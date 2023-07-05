import { newBusinessDocumentByUser } from "@/services";

import {
  HeaderBusinessDocument,
  FormBusinessDocument,
} from "../../_components";

export const metadata = {
  title: "สร้างใบเสนอราคา | Black Helmet",
};

export default async function Page() {
  const quotation = await newBusinessDocumentByUser({ kind: "QUOTATION" });

  return (
    <>
      <HeaderBusinessDocument
        documentNo={quotation.documentNo}
        title="สร้างใบเสนอราคา"
      />
      <FormBusinessDocument
        businessDocument={quotation}
        userId={quotation.userId}
        kind={"QUOTATION"}
      />
    </>
  );
}
