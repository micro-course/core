/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/ui/utils";
import { ImageNodeProjection } from "../../../_domain/projections";

import { NodeProps } from "reactflow";
import Toolbar from "../_toolbar";

export default function ImageNode(props: NodeProps<ImageNodeProjection>) {
  return (
    <>
      <Toolbar {...props} />

      <img
        src={props.data.data.src}
        className={cn(
          props.selected && "outline-primary outline ",
          props.data.hidden && "opacity-50",
        )}
        alt=""
        style={{
          width: `${props.data.width * props.data.scale}px`,
          height: `${props.data.height * props.data.scale}px`,
          transform: `rotate(${props.data.rotation}deg)`,
          transformOrigin: "center center",
        }}
      />
    </>
  );
}
