import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User extends DefaultUser {
    role?: ROLE;
    testPassword?: string;
  }
}
