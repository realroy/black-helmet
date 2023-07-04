import { getAppServerSession } from "./get-app-server-session";

export class GetCurrentUserError extends Error {}

export async function getCurrentUser() {
  const session = await getAppServerSession({ isAuthRequired: true });

  return session?.user;
}
