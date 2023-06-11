"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import { ComponentPropsWithoutRef } from "react";

export type ProviderSignInButtonProps = {
  provider: ClientSafeProvider;
} & ComponentPropsWithoutRef<"button">;

export function ProviderSignInButton({
  provider,
  ...props
}: ProviderSignInButtonProps) {
  const handleClick = () => signIn(provider.id);

  if (provider.id === "apple") {
    return <AppleSignInButton provider={provider} {...props} />;
  }

  return (
    <button onClick={handleClick} {...props}>
      Sign in with {provider.name}
    </button>
  );
}

function AppleSignInButton({ provider, ...props }: ProviderSignInButtonProps) {
  return (
    <button {...props} className="bg-slate-900 text-white">
      Sign in with {provider.name}
    </button>
  );
}
