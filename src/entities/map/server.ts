import { ContainerModule } from "inversify";
import { MapNodeRepository } from "./_repositories/map-node";
import { GetMapNodesService } from "./_service/get-map-nodes";
import { DeleteMapNodeService } from "./_service/delete-map-node";
import { UpdateMapNodeService } from "./_service/update-map-node";
import { CreateMapNodeService } from "./_service/create-map-node";

export type { UpdateMapNodeCommand } from "./_service/update-map-node";
export type { CreateMapNodeCommand } from "./_service/create-map-node";

export const MapEntityModule = new ContainerModule((bind) => {
  bind(MapNodeRepository).toSelf();
  bind(GetMapNodesService).toSelf();
  bind(DeleteMapNodeService).toSelf();
  bind(UpdateMapNodeService).toSelf();
  bind(CreateMapNodeService).toSelf();
});

export {
  GetMapNodesService,
  DeleteMapNodeService,
  UpdateMapNodeService,
  CreateMapNodeService,
};
