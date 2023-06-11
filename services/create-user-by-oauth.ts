import { db, user } from "@/db";

import type { User } from "@/types";

export type CreateUserByOauthInput = {
  email: User["email"];
};

export function createUserByOauth({ email }: CreateUserByOauthInput) {
  return db
    .insert(user)
    .values({
      email,
      password: generatePassword(),
    })
    .onConflictDoNothing({ target: [user.email] })
    .returning({ id: user.id, email: user.email });
}

function generatePassword() {
  const random = Array.from(crypto.getRandomValues(new Uint8Array(16)));
  const generatedPassword = String.fromCharCode(...random);

  return generatedPassword;
}
