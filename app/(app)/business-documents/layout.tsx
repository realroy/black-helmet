import { DollarSignIcon, FilesIcon } from "lucide-react";

import { Container } from "@/components/container";

import { getAppServerSession } from "@/app/_utils/get-app-server-session";

import { MenuItem } from "./_components/menu-item";

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
          <MenuItem
            href={"/business-documents/quotations"}
            icon={<FilesIcon className="mr-2" />}
          >
            ใบเสนอราคา
          </MenuItem>

          <MenuItem
            href={"/business-documents/invoices"}
            icon={<FilesIcon className="mr-2" />}
          >
            ใบแจ้งหนี้
          </MenuItem>
        </ul>
      </nav>
      <Container>{children}</Container>
    </div>
  );
}
