import { Course, getIsCourseInDraft, Lesson } from "@/entities/course";
import { CourseAction } from "./types";

export async function getCourseAction({
  course,
  lessons,
  hasAccess,
}: {
  course: Course;
  lessons: Lesson[];
  hasAccess?: boolean;
}): Promise<CourseAction> {
  if (!hasAccess && course.product.access === "paid") {
    return {
      type: "buy",
      price: course.product.price,
    };
  }

  // Если урока нет, то скорее всего это демо курс
  if (!getIsCourseInDraft(lessons)) {
    return {
      type: "comming-soon",
    };
  }

  // Если прогресса нет, значит к уроку ещё не приступили
  return {
    type: "enter",
    targetLesson: {
      courseSlug: course.slug,
      lessonSlug: lessons[0]?.slug,
    },
  };
}
