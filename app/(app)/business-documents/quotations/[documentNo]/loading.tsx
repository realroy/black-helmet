import { FormQuotation } from "../../_components/FormQuotation";
import { HeaderDocument } from "../../_components/HeaderQuotation";

export default function Loading() {
  return (
    <>
      <HeaderDocument title="แก้ไขใบแจ้งหนี้" documentNo="" isLoading />
      <FormQuotation isLoading />
    </>
  );
}