import { z } from "zod";

export const CourseId = z.string().brand("CourseId");
export type CourseId = z.infer<typeof CourseId>;

export const CourseLandingId = z.string().brand("CourseLandingId");
export type CourseLandingId = z.infer<typeof CourseLandingId>;

export const CourseSlug = z.string().brand("CourseSlug");
export type CourseSlug = z.infer<typeof CourseSlug>;

export const LessonId = z.string().brand("LessonId");
export type LessonId = z.infer<typeof LessonId>;

export const LessonSlug = z.string().brand("LessonSlug");
export type LessonSlug = z.infer<typeof LessonSlug>;

export const ContentBlockId = z.string().brand("ContentBlockId");
export type ContentBlockId = z.infer<typeof ContentBlockId>;

export const CourseDependencyId = z.string().brand("CourseDependencyId");
export type CourseDependentId = z.infer<typeof CourseDependencyId>;

export type CourseProduct =
  | {
      access: "free";
    }
  | {
      access: "paid";
      price: number;
    };
