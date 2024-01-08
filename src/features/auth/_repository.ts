import { dbClient } from "@/shared/lib/db";

export class UserRepository {
  updateUserRole(email: string, role: ROLE) {
    return dbClient.user.update({
      where: {
        email,
      },
      data: {
        role,
      },
    });
  }
  getUserByEmail(email: string) {
    return dbClient.user.findUnique({
      where: {
        email,
      },
    });
  }
}

export const userRepository = new UserRepository();
