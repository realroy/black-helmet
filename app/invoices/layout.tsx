import { Container } from "@/components/container";

import type { ReactNode } from "react";
import { getAppServerSession } from "../_utils/get-app-server-session";
import Link from "next/link";

export const metadata = {
  title: "Quotations - Black Helmet",
  description: "...",
};

export default async function Layout({ children }: { children: ReactNode }) {
  await getAppServerSession();

  return (
    <div className="flex w-full">
      <nav className="bg-slate-50 w-60">
        <div className="py-3 px-4 pb-10">
          <h2 className="text-xl font-semibold">เอกสารขาย</h2>
        </div>
        <ul>
          <Link href={"/quotations"}>
            <li className="p-4 hover:bg-slate-200">ใบเสนอราคา</li>
          </Link>
          <Link href={"/invoices"}>
            <li className="p-4 hover:bg-slate-200">ใบแจ้งหนี้</li>
          </Link>
        </ul>
      </nav>
      <Container>{children}</Container>;
    </div>
  );
}
