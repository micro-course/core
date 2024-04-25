/* eslint-disable @next/next/no-img-element */
import { cn } from "@/shared/ui/utils";
import type { ImageNode } from "../../../_domain/types";

import { NodeProps } from "reactflow";
import { Toolbar } from "../toolbar";

export default function ImageNode(props: NodeProps<ImageNode>) {
  return (
    <>
      <Toolbar {...props} />
      <img
        src={props.data.src}
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
