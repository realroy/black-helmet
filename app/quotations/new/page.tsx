import { generateDocNo } from "@/app/_utils";

import { FormQuotation } from "../_components/FormQuotation";
import { getCurrentUser } from "@/app/_utils/get-current-user";

export const metadata = {
  title: "New Quotations | Black Helmet",
};

export default async function Page() {
  const [documentNo, currentUser] = await Promise.all([
    generateDocNo("QT"),
    getCurrentUser(),
  ]);

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
          userId: +currentUser?.id ?? undefined,
        }}
      />
    </>
  );
}
