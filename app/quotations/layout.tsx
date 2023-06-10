import { Container } from "@/components/container";

import type { ReactNode } from "react";

export const metadata = {
  title: "Quotations - Black Helmet",
  description: "...",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
