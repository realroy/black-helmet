import "./globals.css";
import { Inter } from "next/font/google";

import { Navbar } from "./_components/navbar";
import { getAppServerSession } from "./_utils/get-app-server-session";
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
  const session = await getAppServerSession({ isAuthRequired: false });
  const user = session?.user;

  return (
    <html lang="en">
      <body className={cn(inter.className, "flex min-h-full")}>
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
