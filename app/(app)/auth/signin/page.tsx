import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";

import { nextAuthOptions } from "@/configs/next-auth-options";
import { ProviderSignInButton } from "../_components/provider-sign-in-button";

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);
  const providers = await getProviders();

  const providerValue = Object.values(providers ?? {}) ?? [];

  return (
    <>
      {providerValue.map((provider) => (
        <div key={provider.name}>
          <ProviderSignInButton provider={provider} />
        </div>
      ))}
    </>
  );
}
