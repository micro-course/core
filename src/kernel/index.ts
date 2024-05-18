import { compact } from "lodash-es";

// IDS
/** @deprecated */
export type UserId = string;
/** @deprecated */
export type CourseId = string;
/** @deprecated */
export type LessonId = string;
/** @deprecated */
export type ContentBlockId = string;
/** @deprecated */
export type ProductId = CourseId;
/** @deprecated */
export type PaymentId = string;

// Slug
/** @deprecated */
export type CourseSlug = string;
/** @deprecated */
export type LessonSlug = string;

// Data type
/** @deprecated */
export type DateTimeISOString = string;

// Query keys

/** @deprecated */
export const courseDetailsKey = (courseSlug?: CourseSlug) =>
  compact(["course-details", courseSlug]);

/** @deprecated */
export const learnBaseKey = "learn";
/** @deprecated */
export const learnCoursesKey = ["learn", "courses"];
/** @deprecated */
export const learnCourseKey = (courseSlug?: CourseSlug) => [
  "learn",
  "clurse",
  courseSlug,
];

/** @deprecated */
export const mapKey = () => ["map"];
