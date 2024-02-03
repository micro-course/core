/* eslint-disable @next/next/no-img-element */
import { CourseNodeProjection } from "../../../_domain/projections";

import { Handle, Position } from "reactflow";

import { NodeProps } from "reactflow";

export default function CourseNode(props: NodeProps<CourseNodeProjection>) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div>{props.data.data.title}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
