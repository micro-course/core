import { UserId } from "@/kernel";
import { record, z } from "zod";
import { USER_COURSE_ACCESS_VERSION } from "../_const";
import { START } from "@eventstore/db-client";

export const courseAccessGrantReasonSchema = z.enum(["paid", "free", "manual"]);
export type CourseAccessGrantReason = z.infer<
  typeof courseAccessGrantReasonSchema
>;
export const courseAccessSchema = z.object({
  userId: z.string(),
  courseId: z.string(),
  reason: courseAccessGrantReasonSchema,
  adminId: z.string().optional(),
});

export type CourseAccess = z.infer<typeof courseAccessSchema>;

export const userAccessSchema = z.object({
  userId: z.string(),
  meta: z.object({
    version: z.string(),
    revision: z.string(),
  }),
  byCourseId: record(courseAccessSchema.optional()),
});

export type UserAccess = z.infer<typeof userAccessSchema>;

export const userAccess = (userId: UserId): UserAccess => {
  return {
    userId,
    meta: {
      version: USER_COURSE_ACCESS_VERSION,
      revision: START,
    },
    byCourseId: {},
  };
};
