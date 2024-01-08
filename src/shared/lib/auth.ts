import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";
import { compact } from "lodash-es";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { env } from "@/shared/config";

const emailToken = env.TEST_EMAIL_TOKEN
  ? {
      generateVerificationToken: () => env.TEST_EMAIL_TOKEN ?? "",
      sendVerificationRequest: () =>
        console.log("we don't send emails in test mode"),
    }
  : {};

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },

  providers: compact([
    EmailProvider({
      ...emailToken,
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),

    env.GITHUB_ID &&
      env.GITHUB_SECRET &&
      GitHubProvider({
        clientId: env.GITHUB_ID,
        clientSecret: env.GITHUB_SECRET,
      }),
  ]),
  pages: {
    signIn: "/auth/sign-in",
    newUser: "/auth/new-user",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          role: user.role ?? "USER",
        },
      };
    },
  },
};
