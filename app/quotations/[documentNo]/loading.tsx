import { FormQuotation } from "../_components/FormQuotation";

export default function Loading() {
  return (
    <>
      <h1 className="text-4xl">Edit Quotation</h1>
      <h2 className="bg-slate-200 h-6 w-40 animate-pulse mt-4"></h2>
      <FormQuotation isLoading />
    </>
  );
}
