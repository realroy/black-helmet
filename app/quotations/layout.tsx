import { Container } from "@/components/container";

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
