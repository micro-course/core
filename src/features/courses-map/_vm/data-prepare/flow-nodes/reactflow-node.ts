import { Node } from "reactflow";
import { MapNodeProjection } from "../../../_domain/projections";

export type ReactFlowNode = Node<
  MapNodeProjection,
  MapNodeProjection["data"]["type"]
>;
