import {
  FormBusinessDocument,
  HeaderBusinessDocument,
} from "../../_components";

export default function Loading() {
  return (
    <>
      <HeaderBusinessDocument title="แก้ไขใบเสนอราคา" documentNo="" isLoading />
      <FormBusinessDocument isLoading userId={0} kind={"QUOTATION"} />
    </>
  );
}
