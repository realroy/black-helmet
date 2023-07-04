import "./globals.css";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Black Helmet",
  description: "...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex min-h-full")}>{children}</body>
    </html>
  );
}
