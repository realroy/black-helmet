import { getAppServerSession } from "../_utils/get-app-server-session";
import { Navbar } from "../_components/navbar";

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
    <>
      <Navbar user={user} />
      {children}
    </>
  );
}
