import { GetCurrentUserError } from "@/exceptions";

import { getAppServerSession } from "./get-app-server-session";
import { db, user as users } from "@/db";
import { eq } from "drizzle-orm";

type GetCurrentUserInput = {
  isThrowOnFailure?: boolean;
};

export async function getCurrentUser({
  isThrowOnFailure = false,
}: GetCurrentUserInput = {}) {
  const session = await getAppServerSession({ isAuthRequired: true });

  if (isThrowOnFailure && !session?.user) {
    throw new GetCurrentUserError("No current user");
  }

  const email = session?.user?.email ?? "";

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .execute();

  return user;
}
