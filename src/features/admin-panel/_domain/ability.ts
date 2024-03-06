import { SessionEntity } from "@/entities/user/session";
import { ROLES } from "@/entities/user/user";

export const createAdminAbility = (session: SessionEntity) => ({
  canViewUsersList: () => session.user.role === ROLES.ADMIN,
  canAddCourseAccess: () => session.user.role === ROLES.ADMIN,
  canViewProgressStatistics: () => session.user.role === ROLES.ADMIN,
});

export type AdminAbility = ReturnType<typeof createAdminAbility>;
