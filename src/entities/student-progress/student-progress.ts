export type { StudentProgress, CourseProgress } from "./_domain/projections";
export type {
  StudentProgressEvent,
  StudentProgressEventData,
} from "./_domain/events";
export { studentProgressProducer } from "./_domain/producer";

export { getCourseProgressPercent } from "./_domain/methods/get-course-progress-percent";
export type { CourseProgressPercent } from "./_domain/methods/get-course-progress-percent";

export { getLessonProgressPercent } from "./_domain/methods/get-lesson-progress-percent";
export type { LessonProgressPercent } from "./_domain/methods/get-lesson-progress-percent";

export { CourseProgressCircle } from "./_ui/course-progress-circle";
export { LessonProgressCircle } from "./_ui/lesson-progress-circle";
