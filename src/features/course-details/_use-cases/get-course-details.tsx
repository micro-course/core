import { WithSession, checkAbility } from "@/entities/user/session.server";
import { courseRepository } from "@/entities/course/course.server";
import { CourseSlug } from "@/entities/course/course";
import { createCourseDetailsAbility } from "../_domain/ablility";
import { CourseDetails } from "../_domain/projections";
import { courseEntityToCourseDetails } from "../_domain/mappers";
import { NotFoundError } from "@/shared/lib/errors";

type Query = {
  courseSlug: CourseSlug;
};

export class GetCourseDetailsUseCase {
  @checkAbility({
    createAbility: createCourseDetailsAbility,
    check: (ability) => ability.canView(),
  })
  async exec({}: WithSession, query: Query): Promise<CourseDetails> {
    const courseEntity = await courseRepository.compiledCourseBySlug(
      query.courseSlug,
    );

    if (!courseEntity) {
      throw new NotFoundError(`Course by slug ${query.courseSlug} not found`);
    }

    return courseEntityToCourseDetails(courseEntity);
  }
}

export const getCourseDetailsUseCase = new GetCourseDetailsUseCase();
