import { SharedSession, UserId, ROLES } from "@/kernel/domain/user";

export const createProfileAbility = (session: SharedSession) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
  canGetProfile: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
