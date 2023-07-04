import { nextAuthOptions } from "@/configs/next-auth-options";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <h1>Profile</h1>
      {JSON.stringify(session, null, 2)}
    </>
  );
}
