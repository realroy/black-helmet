import { FormQuotation } from "../_components/FormQuotation";
import { newQuotation } from "@/services/new-quotation";

export const metadata = {
  title: "New Quotations | Black Helmet",
};

export default async function Page() {
  const quotation = await newQuotation();

  return (
    <>
      <h1 className="text-4xl">New Quotations</h1>
      <h2 className="text-xl text-slate-600 mt-4">{quotation.documentNo}</h2>
      <FormQuotation quotation={quotation} />
    </>
  );
}
