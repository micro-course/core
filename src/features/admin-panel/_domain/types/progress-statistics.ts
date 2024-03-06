import { z } from "zod";

export const ProgressStatisticsQuery = z.object({
  userId: z.string().optional(),
  courseId: z.string().optional(),
});

export type ProgressStatisticsQuery = z.infer<typeof ProgressStatisticsQuery>;

const LessonStatistics = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  started: z.number(),
  completed: z.number(),
});

const CourseStatistics = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  started: z.number(),
  completed: z.number(),
  lessons: z.array(LessonStatistics),
});

export type CourseStatistics = z.infer<typeof CourseStatistics>;

export const ProgressStatistics = z.object({
  query: ProgressStatisticsQuery,
  coursesStatistics: CourseStatistics.array(),
  allUsers: z
    .object({
      id: z.string(),
      email: z.string(),
    })
    .array(),
  allCourses: z
    .object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
    })
    .array(),
});

export type ProgressStatistics = z.infer<typeof ProgressStatistics>;
