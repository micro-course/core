import { ROLES, SharedSession } from "@/kernel/domain/user";

export const createCoursesMapAbility = (session: SharedSession) => ({
  canUpdateCoursesMap: () => session.user.role === ROLES.ADMIN,
});
