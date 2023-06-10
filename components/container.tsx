export type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <main className="mx-auto max-w-[1024px] p-4">{children}</main>;
}
