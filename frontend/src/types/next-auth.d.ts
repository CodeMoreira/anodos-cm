import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    refreshToken: string;
    user_id: string;
  }
  interface Session {
    user: {
      token: string;
      refreshToken: string;
      user_id: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    token: string;
    refreshToken: string;
    user_id: string;
  }
}
