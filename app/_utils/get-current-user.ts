import {
  type GetAppServerSessionOptions,
  getAppServerSession,
} from "./get-app-server-session";

export async function getCurrentUser() {
  const session = await getAppServerSession({ isAuthRequired: true });

  return session?.user;
}
