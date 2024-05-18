import { ROLES, SharedUser } from "@/kernel/domain/user";
import { userRepository } from "../_repositories/user";
import { AdapterUser } from "next-auth/adapters";
import { privateConfig } from "@/shared/config/private";
import { createId } from "@/shared/lib/id";
import { CreateUserService } from "@/kernel/services/create-user";

export class CreateUserServiceImpl implements CreateUserService {
  async exec(data: Omit<AdapterUser, "id">): Promise<AdapterUser> {
    const adminEmails = privateConfig.ADMIN_EMAILS?.split(",") ?? [];

    const role = adminEmails.includes(data.email) ? ROLES.ADMIN : ROLES.USER;

    const user: SharedUser = {
      id: createId(),
      ...data,
      role,
    };

    const res = await userRepository.createUser(user);

    return { ...res, emailVerified: res.emailVerified ?? null };
  }
}

export const createUserService = new CreateUserServiceImpl();
