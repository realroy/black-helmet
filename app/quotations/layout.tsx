import { Container } from "@/components/container";

import type { ReactNode } from "react";
import { getAppServerSession } from "../_utils/get-app-server-session";

export const metadata = {
  title: "Quotations - Black Helmet",
  description: "...",
};

export default async function Layout({ children }: { children: ReactNode }) {
  await getAppServerSession();

  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
