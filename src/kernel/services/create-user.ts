import { AdapterUser } from "next-auth/adapters";

export interface CreateUserService {
  exec(data: Omit<AdapterUser, "id">): Promise<AdapterUser>;
}
