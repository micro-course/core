import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { dbClient } from "@/shared/lib/db";

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient) as AuthOptions["adapter"],
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
};
