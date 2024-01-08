import { PrismaClient } from "@prisma/client";
import { ADMIN, USER, USER_2 } from "../tests/stabs/users";
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      id: ADMIN.id,
      email: ADMIN.email,
      testPassword: ADMIN.testPassword,
      role: ADMIN.role,
      emailVerified: new Date().toISOString(),
    },
  });

  const user = await prisma.user.create({
    data: {
      id: USER.id,
      email: USER.email,
      testPassword: USER.testPassword,
      role: USER.role,
      emailVerified: new Date().toISOString(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: USER_2.id,
      email: USER_2.email,
      testPassword: USER_2.testPassword,
      role: USER_2.role,
      emailVerified: new Date().toISOString(),
    },
  });

  console.log({ adminUser, user, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
