export const metadata = {
  title: "Black Helmet",
  description: "...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full mx-auto max-w-[1024px]">{children}</div>;
}
