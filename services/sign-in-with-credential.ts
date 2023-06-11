import { eq } from "drizzle-orm";

import { db, user } from "@/db";
import type { User } from "@/types";

export type SignInWithCredentialInput = Pick<User, "email" | "password">;

export class InvalidCredentialError extends Error {
  constructor() {
    super("Invalid credential");
  }
}

export async function signInWithCredential({
  email,
  password,
}: SignInWithCredentialInput) {
  const [matchedUser] = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (!matchedUser) {
    throw new InvalidCredentialError();
  }

  if (matchedUser.password !== password) {
    throw new InvalidCredentialError();
  }

  return { id: matchedUser.id, name: "", email: matchedUser.email };
}
