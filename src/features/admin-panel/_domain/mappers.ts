import { UserEntity } from "@/entities/user/user";
import { UserListItem } from "./types/user-list";

export const userToUserListItem = (user: UserEntity): UserListItem => ({
  id: user.id,
  email: user.email,
  name: user.name ?? undefined,
  image: user.image ?? undefined,
  role: user.role,
});
