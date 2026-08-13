import { PasswordSession } from "@atproto/lex-password-session";

const session = await PasswordSession.login({
  service: "https://bsky.social",
  identifier: "adophilus.bsky.social",
  password: "your-app-password",
});
