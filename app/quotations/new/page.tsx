import { generateDocNo } from "@/app/_utils";

import { FormQuotation } from "../_components/FormQuotation";
import { getCurrentUser } from "@/app/_utils/get-current-user";

export const metadata = {
  title: "New Quotations | Black Helmet",
};

export default async function Page() {
  const [documentNoResponse, currentUserResponse] = await Promise.allSettled([
    generateDocNo("QT"),
    getCurrentUser(),
  ]);

  const documentNo =
    documentNoResponse.status === "fulfilled"
      ? documentNoResponse.value
      : undefined;

  const currentUser =
    currentUserResponse.status === "fulfilled"
      ? currentUserResponse.value
      : undefined;

  const userId = +(currentUser?.id ?? 0) || undefined;

  return (
    <>
      <h1 className="text-4xl">New Quotations</h1>
      <h2 className="text-xl text-slate-600 mt-4">{documentNo}</h2>
      <FormQuotation
        quotation={{
          documentNo,
          customerName: "",
          customerAddress: "",
          customerZipCode: "",
          customerTaxId: "",
          customerBranch: "",
          issueDate: new Date(),
          dueDate: new Date(),
          userId,
        }}
      />
    </>
  );
}
