import { LessonEntity } from "@/entities/course/lesson";
import { CourseListItem, LearnLesson, LessonListItem } from "./projections";
import { CourseEntity } from "@/entities/course/course";
import {
  CourseProgressPercent,
  StudentProgress,
} from "@/entities/student-progress/student-progress";

export const lessontEntityToLesson = (lesson: LessonEntity): LearnLesson => ({
  id: lesson.id,
  slug: lesson.slug,
  courseId: lesson.courseId,
  title: lesson.title,
  shortDescription: lesson.shortDescription,
  blocks: lesson.blocks,
});

export const lessonToListItem = (lesson: LessonEntity): LessonListItem => {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
  };
};

export const courseToListItem = (
  course: CourseEntity,
  progress?: CourseProgressPercent,
): CourseListItem => {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    progress,
  };
};

const lessonEntityBlockToContentBlock = (
  block: LessonEntity["blocks"][number],
): LearnLesson["blocks"][number] => {
  const blockType = block.type;
  if (block.type === "text") {
    return {
      id: block.id,
      type: block.type,
      text: block.text,
    };
  }

  throw new Error(`Unknown block type: ${blockType}`);
};

export const lessonEntityToLearnLesson = (
  lesson: LessonEntity,
): LearnLesson => {
  return {
    id: lesson.id,
    slug: lesson.slug,
    courseId: lesson.courseId,
    title: lesson.title,
    shortDescription: lesson.shortDescription,
    blocks: lesson.blocks.map(lessonEntityBlockToContentBlock),
  };
};
