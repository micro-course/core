import { SessionEntity } from "@/entities/user/session";

export const createLearnAbility = (session: SessionEntity) => ({
  canViewCourses: () => true,
  canViewLesson: () => true,
});

export type LearnAbility = ReturnType<typeof createLearnAbility>;
