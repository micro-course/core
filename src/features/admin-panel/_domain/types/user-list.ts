import { Role } from "@/entities/user/user";
import { UserId } from "@/kernel";

export type UserListItem = {
  id: UserId;
  email: string;
  name?: string;
  image?: string;
  role: Role;
};
