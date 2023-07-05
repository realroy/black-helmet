import { getAppServerSession } from "./get-app-server-session";

export class GetCurrentUserError extends Error {}

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

  return session?.user;
}
