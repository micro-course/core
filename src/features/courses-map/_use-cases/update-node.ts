import { createMapAbility } from "../_domain/ability";
import { CoursesMapNode } from "../_domain/projections";
import { WithSession, checkAbility } from "@/entities/user/session.server";
import { mapNodeRepository } from "@/entities/map/map-node.server";
import {
  MapNodeSettings,
  MapNodeDimensions,
  MapNodePosition,
  MapNodeId,
} from "@/entities/map/map-node";
import { createMapNode } from "../_domain/mappers";
import { NotFoundError } from "@/shared/lib/errors";
import { courseRepository } from "@/entities/course/course.server";
import { studentProgressRepository } from "@/entities/student-progress/student-progress.server";

export type UpdateNodeCommand = {
  id: MapNodeId;
} & Partial<MapNodePosition & MapNodeDimensions & MapNodeSettings>;

export class UpdateNodeUseCase {
  @checkAbility({
    createAbility: createMapAbility,
    check: (ability) => ability.canMangeNodes(),
  })
  async exec(
    { session }: WithSession,
    command: UpdateNodeCommand,
  ): Promise<CoursesMapNode> {
    const nodeEntity = await mapNodeRepository.getNodeById(command.id);
    const studentProgress = await studentProgressRepository.getByStudentId(
      session.user.id,
    );

    if (!nodeEntity) {
      throw new NotFoundError();
    }

    Object.assign(nodeEntity, command);

    return createMapNode(
      ...(await Promise.all([
        mapNodeRepository.save(nodeEntity),
        nodeEntity.data.type === "course"
          ? courseRepository.courseById(nodeEntity.data.courseId)
          : undefined,
        undefined,
      ])),
    );
  }
}

export const updateNodeUseCase = new UpdateNodeUseCase();
