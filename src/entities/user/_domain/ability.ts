import { SharedSession, UserId, ROLES } from "@/kernel/domain/user";

export const createUserAbility = (session: SharedSession) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});

export const createProfileAbility = (session: SharedSession) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
