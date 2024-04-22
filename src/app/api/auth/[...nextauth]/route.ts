import { server } from "@/app/server";
import { NextAuthConfig } from "@/kernel/lib/next-auth/_next-auth-config";
import NextAuth from "next-auth/next";

const authHandler = NextAuth(server.get(NextAuthConfig).options);

export { authHandler as GET, authHandler as POST };
