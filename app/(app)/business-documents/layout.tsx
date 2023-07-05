import { DollarSignIcon, FilesIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/container";

import { getAppServerSession } from "@/app/_utils/get-app-server-session";

import type { ReactNode } from "react";

export const metadata = {
  title: "เอกสารขาย | Black Helmet",
  description: "...",
};

export default async function Layout({ children }: { children: ReactNode }) {
  await getAppServerSession();

  return (
    <div className="flex w-full">
      <nav className="bg-slate-50 w-60">
        <div className="py-3 px-4 flex">
          <DollarSignIcon className="mr-2" />
          <h2 className="text-xl font-semibold">เอกสารขาย</h2>
        </div>
        <ul>
          <Link href={"/business-documents/quotations"}>
            <li className="p-4 flex hover:bg-slate-200">
              <FilesIcon className="mr-2" />
              <span className="flex-1">ใบเสนอราคา</span>
            </li>
          </Link>
          <Link href={"/business-documents/invoices"}>
            <li className="p-4 flex hover:bg-slate-200">
              <FilesIcon className="mr-2" />
              <span className="flex-1">ใบแจ้งหนี้</span>
            </li>
          </Link>
        </ul>
      </nav>
      <Container>{children}</Container>
    </div>
  );
}
