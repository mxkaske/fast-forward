import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_KEY,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    }),
  ],
});
