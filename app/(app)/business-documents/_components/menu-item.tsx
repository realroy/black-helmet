"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

export type MenuItemProps = {
  href: string;
  children: ReactNode;
  icon: ReactNode;
};

export function MenuItem({ href, children, icon }: MenuItemProps) {
  const isActive = usePathname() === href;

  return (
    // @ts-ignore
    <Link href={href}>
      <li
        className={cn("p-4 flex", {
          "bg-slate-200 hover:bg-slate-300": isActive,
          "hover:bg-slate-200": !isActive,
        })}
      >
        {icon}
        <span className="flex-1">{children}</span>
      </li>
    </Link>
  );
}
