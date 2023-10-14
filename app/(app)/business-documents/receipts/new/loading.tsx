import {
  FormBusinessDocument,
  HeaderBusinessDocument,
} from "../../_components";

export default function Loading() {
  return (
    <>
      <HeaderBusinessDocument
        title="สร้างใบเสร็จรับเงิน"
        documentNo=""
        isLoading
      />
      <FormBusinessDocument isLoading userId={0} kind={"RECEIPTS"} />
    </>
  );
}
