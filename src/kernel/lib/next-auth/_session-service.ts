import { getServerSession } from "next-auth";
import { NextAuthConfig } from "./_next-auth-config";
import { injectable } from "inversify";

@injectable()
export class SessionService {
  constructor(private nextAuthConfig: NextAuthConfig) {}

  get() {
    return getServerSession(this.nextAuthConfig.options);
  }
}
