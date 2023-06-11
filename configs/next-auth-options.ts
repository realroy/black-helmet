import AppleProvider from "next-auth/providers/apple";

import type { NextAuthOptions } from "next-auth";

export const nextAuthOptions = {
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   newUser: "/auth/new-user",
  // },
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
  ],
} satisfies NextAuthOptions;
