import { Node } from "reactflow";
import { MapNode } from "../../../_domain/projections";

export type ReactFlowNode = Node<MapNode, MapNode["data"]["type"]>;
