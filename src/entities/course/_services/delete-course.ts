import { CourseId } from "@/kernel/domain/course";
import { courseDbRepository } from "../_repositories/course-db";
import { TRPCError } from "@trpc/server";

type Command = {
  id: CourseId;
};

class DeleteCourseService {
  async exec(command: Command) {
    const course = await courseDbRepository.getCourse({ id: command.id });

    if (!course) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Course not found",
      });
    }

    return courseDbRepository.deleteCourse(command.id);
  }
}

export const deleteCourseService = new DeleteCourseService();
