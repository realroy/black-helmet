"use server";

import { nextAuthOptions } from "@/configs/next-auth-options";
import { type Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export type GetAppServerSessionOptions = {
  isAuthRequired?: boolean;
};

export async function getAppServerSession({
  isAuthRequired = true,
}: GetAppServerSessionOptions = {}) {
  const session = await getServerSession(nextAuthOptions);

  if (isAuthRequired && (!session || !session.user || !session.user)) {
    return redirect("/api/auth/signin");
  }

  return session;
}
