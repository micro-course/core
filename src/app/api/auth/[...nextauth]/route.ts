import { nextAuthConfig } from "@/kernel/lib/next-auth/next-auth-config";
import NextAuth from "next-auth/next";

const authHandler = NextAuth(nextAuthConfig);

export { authHandler as GET, authHandler as POST };
