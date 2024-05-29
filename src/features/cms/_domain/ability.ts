import { SharedSession, ROLES } from "@/kernel/domain/user";

export const createCmsAbility = (session: SharedSession) => ({
  canManageCourses: () => session.user.role === ROLES.ADMIN,
});
