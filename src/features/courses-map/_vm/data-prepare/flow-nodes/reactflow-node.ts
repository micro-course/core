import { Node } from "reactflow";
import { CoursesMapNode } from "../../../_domain/projections";

export type ReactFlowNode = Node<CoursesMapNode, CoursesMapNode["data"]["type"]>;
