import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        // "repo" scope is required so the owner's token can commit content
        // changes back to the GitHub repo that stores the portfolio data.
        params: { scope: "read:user user:email repo" },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile && "login" in profile) {
        token.login = (profile as { login: string }).login;
      }
      return token;
    },
    async session({ session, token }) {
      const login = (token.login as string | undefined) ?? undefined;
      const owner = process.env.OWNER_GITHUB_USERNAME;

      return {
        ...session,
        accessToken: token.accessToken as string | undefined,
        login,
        isOwner: Boolean(
          login && owner && login.toLowerCase() === owner.toLowerCase()
        ),
      };
    },
  },
};
