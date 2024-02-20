import { CourseEntity } from "@/entities/course/course";
import { LessonEntity } from "@/entities/course/lesson";
import { StudentProgress } from "@/entities/student-progress/student-progress";
import { CourseAction } from "../projections";

export async function getCourseAction({
  studentProgress,
  course,
  lessons,
  hasAccess,
}: {
  studentProgress: StudentProgress;
  course: CourseEntity;
  lessons: LessonEntity[];
  hasAccess?: boolean;
}): Promise<CourseAction> {
  const courseProgress = studentProgress.courses[course.id];
  const firstLessonSlug = lessons[0]?.slug;

  if (!hasAccess && course.product.access === "paid") {
    return {
      type: "buy",
      price: course.product.price,
    };
  }

  // Если урока нет, то скорее всего это демо курс
  if (!firstLessonSlug) {
    return {
      type: "comming-soon",
    };
  }

  // Если прогресса нет, значит к уроку ещё не приступили
  if (!courseProgress?.enteredAt) {
    return {
      type: "enter",
    };
  }

  const lastViewedBlock = courseProgress?.lastViewedBlock;

  const lessonSlug = lessons.find(
    (lesson) => lesson.id === lastViewedBlock?.lessonId,
  )?.slug;

  // Либо пользователь не попал в урок после успешного начала, либо курс уже удалён
  if (!lessonSlug) {
    return {
      type: "continue",
      targetLesson: {
        courseSlug: course.slug,
        lessonSlug: firstLessonSlug,
      },
    };
  }

  return {
    type: "continue",
    targetLesson: {
      courseSlug: course.slug,
      lessonSlug: lessonSlug,
      contentBlockId: lastViewedBlock?.contentBlockId,
    },
  };
}
