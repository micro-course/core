import { SessionEntity } from "@/entities/user/session";

export const createCourseDetailsAbility = (_: SessionEntity) => ({
  canView: () => true,
  canEnter: () => true,
});

export type MapAbility = ReturnType<typeof createCourseDetailsAbility>;
