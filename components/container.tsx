import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type ContainerProps = ComponentPropsWithoutRef<"main">;

export function Container({ children, className }: ContainerProps) {
  return (
    <main className={cn("mx-auto max-w-[1024px] p-4", className)}>
      {children}
    </main>
  );
}
