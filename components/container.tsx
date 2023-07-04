import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type ContainerProps = ComponentPropsWithoutRef<"main">;

export function Container({ children, className }: ContainerProps) {
  return (
    <main className={cn("w-full p-4 min-h-screen", className)}>{children}</main>
  );
}
