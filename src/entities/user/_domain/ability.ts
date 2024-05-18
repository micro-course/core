import { ROLES, SessionEntity, UserId } from "./types";

/** @deprecated */
export const createUserAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});

/** @deprecated */
export const createProfileAbility = (session: SessionEntity) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
