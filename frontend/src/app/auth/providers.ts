import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

const providers = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        console.log("user", user);

        if (!res.ok || !user) {
          throw new Error("Invalid email or password");
        }

        if (res.status === 401 || res.status === 400) {
          throw new Error(user.error);
        }

        return {
          token: user.token,
          refreshToken: user.refreshToken,
          user_id: user.user_id,
        };
      },
    }),
  ],
  callbacks: {},
};

export const { signIn, handlers, signOut, auth } = NextAuth(providers);
