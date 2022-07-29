import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { sendVerificationRequest } from "@/lib/mailer";
import { signInEvent } from "@/lib/next-auth";
import { config } from "@/lib/nodemailer";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_OAUTH_CLIENT_KEY,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    }),
    EmailProvider({
      server: config.server,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user = user;
      return Promise.resolve(session);
    },
  },
  events: {
    signIn: signInEvent,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
