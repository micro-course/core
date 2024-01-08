import { PrismaClient } from "@prisma/client";

declare global {
  var dbClient: PrismaClient | undefined;
}
// See here: https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
let dbClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  dbClient = new PrismaClient();
} else {
  if (!global.dbClient) {
    global.dbClient = new PrismaClient();
  }
  dbClient = global.dbClient;
}

export { dbClient };
