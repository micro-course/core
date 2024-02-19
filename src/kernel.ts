import { compact } from "lodash-es";

// IDS
export type UserId = string;
export type CourseId = string;
export type LessonId = string;
export type ContentBlockId = string;
export type ProductId = CourseId;
export type PaymentId = string;

// Slug
export type CourseSlug = string;
export type LessonSlug = string;

// Data type
export type DateTimeISOString = string;

// Query keys

export const courseDetailsKey = (courseSlug?: CourseSlug) =>
  compact(["course-details", courseSlug]);

export const learnBaseKey = "learn";
export const learnCoursesKey = ["learn", "courses"];
export const learnCourseKey = (courseSlug?: CourseSlug) => [
  "learn",
  "clurse",
  courseSlug,
];

export const mapKey = () => ["map"];
