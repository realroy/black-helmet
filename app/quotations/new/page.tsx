import { generateDocNo } from "@/app/_utils";

import { FormQuotation } from "../_components/FormQuotation";

export default async function Page() {
  const documentNo = await generateDocNo("QT");
  // const no = 'a'

  return (
    <main className="mx-auto max-w-[1024px]">
      <h1 className="text-4xl">Create Quotations</h1>
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
    </main>
  );
}
