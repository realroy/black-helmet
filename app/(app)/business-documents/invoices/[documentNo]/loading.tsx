import {
  FormBusinessDocument,
  HeaderBusinessDocument,
} from "../../_components";

export default function Loading() {
  return (
    <>
      <HeaderBusinessDocument title="แก้ไขใบแจ้งหนี้" documentNo="" isLoading />
      <FormBusinessDocument isLoading userId={0} kind={"INVOICE"} />
    </>
  );
}
