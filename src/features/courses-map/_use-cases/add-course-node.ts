import { createMapAbility } from "../_domain/ability";
import { MapNodeProjection } from "../_domain/projections";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import {
  MapNodePosition,
  MapNodeDimensions,
  MapNodeSettings,
  createCourseMapNodeEntity,
} from "@/entities/map/map-node";
import { createMapNodeProjection } from "../_domain/mappers";
import { CourseId } from "@/entities/course/course";

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
  ): Promise<MapNodeProjection> {
    let entity = createCourseMapNodeEntity(command);

    entity = await mapNodeRepository.save(entity);

    return createMapNodeProjection(entity);
  }
}

export const addCourseNodeUseCase = new AddCourseNodeUseCase();
