import { signIn } from "next-auth/react";

export async function login(email: string, password: string) {
  await signIn("credentials", {
    redirect: false,
    email: email,
    password: password,
  });
}
