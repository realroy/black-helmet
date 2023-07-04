import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getCurrentUserFromToken() {
  const token = cookies().get("next-auth.session-token")?.value;
  if (!token) {
    throw new Error("Cannot get token from cookies");
  }

  if (process.env.NEXTAUTH_SECRET === undefined) {
    throw new Error("NEXTAUTH_SECRET is undefined");
  }

  const decoded = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return {
    id: +(decoded?.sub ?? decoded?.uid ?? 0) || undefined,
    email: decoded?.email,
  };
}
