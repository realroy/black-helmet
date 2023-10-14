import { newBusinessDocumentByUser } from "@/services";

import {
  HeaderBusinessDocument,
  FormBusinessDocument,
} from "../../_components";

export const metadata = {
  title: "สร้างใบเสร็จรับเงิน | Black Helmet",
};

export default async function Page() {
  const receipt = await newBusinessDocumentByUser({ kind: "RECEIPTS" });

  return (
    <>
      <HeaderBusinessDocument
        documentNo={receipt.documentNo}
        title="สร้างใบเสร็จรับเงิน"
      />
      <FormBusinessDocument
        businessDocument={receipt}
        userId={receipt.userId}
        kind={"RECEIPTS"}
      />
    </>
  );
}
