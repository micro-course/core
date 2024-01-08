import { User } from "./_domain";
import { userRepository } from "./_repository";

export const setInitialUserRole = async (user: User) => {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];

  if (adminEmails.includes(user.email)) {
    await userRepository.updateUserRole(user.email, "ADMIN");
  } else {
    await userRepository.updateUserRole(user.email, "USER");
  }
};
