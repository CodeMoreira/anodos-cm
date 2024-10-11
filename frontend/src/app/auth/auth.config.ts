import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: { signIn: "/auth/signin" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPrivateRoutes = nextUrl.pathname.startsWith("/protected");
      const isAuthRoutes = nextUrl.pathname.startsWith("/auth");

      if (!isLoggedIn && isPrivateRoutes) {
        return false;
      }

      if (isLoggedIn && isAuthRoutes) {
        return Response.redirect(new URL("/protected/groups", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) token.id = user.id as string;
      return token;
    },
    session({ session, token }) {
      if (token.token) session.user.token = token.token;
      if (token.refreshToken) session.user.refreshToken = token.refreshToken;
      if (token.user_id) session.user.user_id = token.user_id;
      return session;
    },
  },
  providers: [],
} as NextAuthConfig;
