import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export type ContainerProps = ComponentPropsWithoutRef<"main">;

export function Container({ children, className }: ContainerProps) {
  return (
    <main
      className={cn("mx-auto lg:w-[1024px] p-4 pt-8 min-h-screen", className)}
    >
      {children}
    </main>
  );
}
