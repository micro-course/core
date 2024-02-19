import { createMapAbility } from "../_domain/ability";
import { CoursesMapNode } from "../_domain/projections";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import {
  MapNodePosition,
  MapNodeDimensions,
  MapNodeSettings,
  createCourseMapNodeEntity,
} from "@/entities/map/map-node";
import { createMapNode } from "../_domain/mappers";
import { CourseId } from "@/entities/course/course";
import { courseRepository } from "@/entities/course/course.server";

export type AddCourseNodeCommand = {
  courseId: CourseId;
} & MapNodeDimensions &
  MapNodePosition &
  MapNodeSettings;

export class AddCourseNodeUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canMangeNodes(),
  })
  async exec(
    _: WithSession,
    command: AddCourseNodeCommand,
  ): Promise<CoursesMapNode> {
    let entity = createCourseMapNodeEntity(command);

    entity = await mapNodeRepository.save(entity);

    const course = await courseRepository.courseById(command.courseId);

    return createMapNode(entity, course, undefined);
  }
}

export const addCourseNodeUseCase = new AddCourseNodeUseCase();
