import { UserId } from "@/kernel";
import { STUDENT_PROGRESS_VERSION } from "../_const";
import { START } from "@eventstore/db-client";
import { z } from "zod";
import {
  luxonDateTimeOptionalSchema,
  luxonDateTimeSchema,
} from "@/shared/lib/zod";

export type StudentId = UserId;

export const lastViewedBlock = z
  .object({
    courseId: z.string(),
    lessonId: z.string(),
    contentBlockId: z.string(),
  })
  .optional();

const courseProgressSchema = z.object({
  courseId: z.string(),
  studentId: z.string(),
  enteredAt: luxonDateTimeSchema,
  lastViewedBlock: lastViewedBlock,
  lastInteractionAt: luxonDateTimeSchema,
  completedAt: luxonDateTimeOptionalSchema,
  completedLessonsCount: z.number(),
});
export type CourseProgress = z.infer<typeof courseProgressSchema>;

const lessonProgressSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  lessonId: z.string(),
  completedAt: luxonDateTimeOptionalSchema,
  completedBlocksCount: z.number(),
});
export type LessonProgress = z.infer<typeof lessonProgressSchema>;

export const studentProgressSchema = z.object({
  studentId: z.string(),
  meta: z.object({
    version: z.string(),
    revision: z.string(),
  }),
  lastViewedBlock: lastViewedBlock,
  courses: z.record(courseProgressSchema.optional()),
  lessons: z.record(lessonProgressSchema.optional()),
});

export type StudentProgress = z.infer<typeof studentProgressSchema>;

export const createStudentProgress = (
  studentId: StudentId,
): StudentProgress => {
  return {
    studentId,
    meta: {
      version: STUDENT_PROGRESS_VERSION,
      revision: START,
    },
    courses: {},
    lessons: {},
  };
};
