#!/bin/node

import { SignJWT } from "jose";
import { createPrivateKey } from "crypto";
import { readFile } from "fs/promises";

import "dotenv/config";

// if (process.argv.includes("--help") || process.argv.includes("-h")) {
//   console.log(`
//   Creates a JWT from the components found at Apple.
//   By default, the JWT has a 6 months expiry date.
//   Read more: https://developer.apple.com/documentation/sign_in_with_apple/generate_and_validate_tokens#3262048
//   Usage:
//   node apple.mjs [--kid] [--iss] [--private_key] [--sub] [--expires_in] [--exp]

//   Options:
//     --help                 Print this help message
//     --kid, --key_id        The key id of the private key
//     --iss, --team_id       The Apple team ID
//     --private_key          The private key to use to sign the JWT. (Starts with -----BEGIN PRIVATE KEY-----)
//     --sub, --client_id     The client id to use in the JWT.
//     --expires_in           Number of seconds from now when the JWT should expire. Defaults to 6 months.
//     --exp                  Future date in seconds when the JWT expires
//   `);
// } else {
//   const args = process.argv.slice(2).reduce((acc, arg, i) => {
//     if (arg.match(/^--\w/)) {
//       const key = arg.replace(/^--/, "").toLowerCase();
//       acc[key] = process.argv[i + 3];
//     }
//     return acc;
//   }, {});

//   const {
//     team_id,
//     iss = team_id,

//     private_key,

//     client_id,
//     sub = client_id,

//     key_id,
//     kid = key_id,

//     expires_in = 86400 * 180,
//     exp = Math.ceil(Date.now() / 1000) + expires_in,
//   } = args;

//   /**
//    * How long is the secret valid in seconds.
//    * @default 15780000
//    */
//   const expiresAt = Math.ceil(Date.now() / 1000) + expires_in;
//   const expirationTime = exp ?? expiresAt;
//   console.log(`
// Apple client secret generated. Valid until: ${new Date(expirationTime * 1000)}
// ${await new SignJWT({})
//   .setAudience("https://appleid.apple.com")
//   .setIssuer(iss)
//   .setIssuedAt()
//   .setExpirationTime(expirationTime)
//   .setSubject(sub)
//   .setProtectedHeader({ alg: "ES256", kid })
//   .sign(createPrivateKey(private_key.replace(/\\n/g, "\n")))}`);
// }
async function main() {
  const privateKey = await readFile(process.env.APPLE_P8_PATH, "utf8");

  return await new SignJWT({})
    .setAudience("https://appleid.apple.com")
    .setIssuer(process.env.APPLE_TEAM_ID)
    .setIssuedAt()
    .setExpirationTime(Math.ceil(Date.now() / 1000) + 15780000)
    .setSubject(process.env.APPLE_CLIENT_ID)
    .setProtectedHeader({ alg: "ES256", kid: process.env.APPLE_KEY_ID })
    .sign(createPrivateKey(privateKey.replace(/\\n/g, "\n")));
}

main()
  .then(console.log)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
