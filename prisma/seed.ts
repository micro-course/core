import { PrismaClient } from "@prisma/client";
import { ADMIN, USER, USER_2 } from "../tests/stabs/users";
const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.create({
    data: {
      id: ADMIN.id,
      email: ADMIN.email,
      role: ADMIN.role,
      name: ADMIN.name,
      emailVerified: new Date().toISOString(),
    },
  });

  const user = await prisma.user.create({
    data: {
      id: USER.id,
      email: USER.email,
      role: USER.role,
      emailVerified: new Date().toISOString(),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: USER_2.id,
      email: USER_2.email,
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
