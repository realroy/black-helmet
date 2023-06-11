import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthOptions } from "next-auth";
import type { Provider } from "next-auth/providers";
import { signInWithCredential } from "@/services/sign-in-with-credential";
import { createUserByOauth } from "@/services/create-user-by-oauth";

const providers: Provider[] = [
  AppleProvider({
    clientId: process.env.APPLE_CLIENT_ID as string,
    clientSecret: process.env.APPLE_SECRET as string,
  }),
];

if (process.env.IS_CREDENTIAL_PROVIDER_ENABLED === "true") {
  providers.push(
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await signInWithCredential({
          email: credentials.email,
          password: credentials.password,
        });

        return { ...user, id: user.id.toString() };
      },
    })
  );
}

export const nextAuthOptions = {
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   newUser: "/auth/new-user",
  // },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (profile && profile.email) {
        await createUserByOauth({ email: profile.email });
      }

      return true;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers,
} satisfies NextAuthOptions;
