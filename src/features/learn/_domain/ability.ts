import { SessionEntity } from "@/entities/user/session";
import { ROLES } from "@/entities/user/user";

export const createLearnAbility = (session: SessionEntity) => ({
  canViewCourses: () => session.user.role === ROLES.ADMIN,
});

export type LearnAbility = ReturnType<typeof createLearnAbility>;
