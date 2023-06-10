import { generateDocNo } from "@/app/_utils";

import { FormQuotation } from "../_components/FormQuotation";

export const metadata = {
  title: "New Quotations | Black Helmet",
};

export default async function Page() {
  const documentNo = await generateDocNo("QT");
  // const no = 'a'

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
        }}
      />
    </>
  );
}
